import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminSessionValid } from "@/lib/admin/session";

const PROTECTED_API_PREFIXES = ["/api/content/", "/api/inquiries/"] as const;
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
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/content/:path*",
    "/api/media",
    "/api/inquiries/:path*",
  ],
};
