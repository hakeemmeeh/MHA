import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protects every /admin route. Unauthenticated visitors are sent to /admin-login.
// The login page sets an httpOnly cookie after checking ADMIN_PASSWORD.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page and the login API through.
  if (pathname === "/admin-login" || pathname.startsWith("/api/admin-login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const session = req.cookies.get("mha_admin")?.value;
    const expected = process.env.ADMIN_SESSION_SECRET;

    if (!session || !expected || session !== expected) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin-login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
