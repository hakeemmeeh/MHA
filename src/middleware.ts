import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminSessionValid } from "@/lib/admin/session";
import { maintenanceResponse } from "@/lib/maintenance";

const PROTECTED_API_PREFIXES = ["/api/content/", "/api/inquiries/", "/api/admin/"] as const;
const PROTECTED_API_EXACT = ["/api/media"] as const;

function isProtectedAdminApi(pathname: string): boolean {
  return (
    PROTECTED_API_EXACT.includes(pathname as (typeof PROTECTED_API_EXACT)[number]) ||
    PROTECTED_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

// Protects /admin pages and admin write APIs. Login sets an httpOnly cookie
// after checking ADMIN_PASSWORD.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Maintenance mode (off unless MAINTENANCE_MODE=true) — see src/lib/maintenance.ts
  const maintenance = maintenanceResponse(req);
  if (maintenance) return maintenance;

  if (pathname === "/admin-login" || pathname.startsWith("/api/admin-login")) {
    return NextResponse.next();
  }

  const protectedPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const protectedApi = isProtectedAdminApi(pathname);

  if (protectedPage || protectedApi) {
    if (!isAdminSessionValid(req)) {
      if (protectedApi) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
      }

      const url = req.nextUrl.clone();
      url.pathname = "/admin-login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Runs on every page (needed for maintenance mode), but not on build files,
  // images, fonts or other files with an extension.
  matcher: ["/((?!_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
