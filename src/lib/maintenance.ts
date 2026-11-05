import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance mode.
 *
 * Turn ON:  in Vercel → Settings → Environment Variables, set MAINTENANCE_MODE = true, then redeploy.
 * Turn OFF: remove the variable (or set it to false) and redeploy.
 *
 * While it is on, visitors see a simple "back soon" page (HTTP 503 + Retry-After,
 * so Google keeps the site's rankings). The admin, its login and the API keep
 * working so staff can still update content.
 *
 * Preview the real site while it's on: set MAINTENANCE_BYPASS_TOKEN to a secret
 * word, then open https://mha-ss.org/?preview=<that word> once. A cookie keeps
 * you on the real site for 12 hours.
 */
const BYPASS_COOKIE = "mha_preview";

// Kept here (not imported from content.ts) so the check that runs on every request stays small.
const site = {
  name: "Mobile Humanitarian Agency",
  email: "mobilehumanitarianagency@gmail.com",
  phone: "+211 911828150",
};

export function isMaintenanceOn() {
  // Accepts true / TRUE / 1 / yes / on (spaces and quotes ignored)
  const v = (process.env.MAINTENANCE_MODE ?? "").trim().replace(/^["']|["']$/g, "").toLowerCase();
  return v === "true" || v === "1" || v === "yes" || v === "on";
}

/** Paths that always work, even during maintenance. */
function isAlwaysAllowed(pathname: string) {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/admin-login" ||
    pathname.startsWith("/api/") ||
    pathname === "/robots.txt"
  );
}

/** Returns a maintenance response, or null to let the request through. */
export function maintenanceResponse(req: NextRequest): NextResponse | null {
  if (!isMaintenanceOn()) return null;

  const { pathname, searchParams } = req.nextUrl;
  if (isAlwaysAllowed(pathname)) return null;

  const token = process.env.MAINTENANCE_BYPASS_TOKEN?.trim();
  if (token) {
    if (searchParams.get("preview") === token) {
      const url = req.nextUrl.clone();
      url.searchParams.delete("preview");
      const res = NextResponse.redirect(url);
      res.cookies.set(BYPASS_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 12,
      });
      return res;
    }
    if (req.cookies.get(BYPASS_COOKIE)?.value === token) return null;
  }

  return new NextResponse(maintenancePage(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "3600",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function maintenancePage() {
  const name = escape(site.name);
  const email = escape(site.email);
  const phone = escape(site.phone);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${name} — back shortly</title>
<link rel="icon" href="/favicon.ico">
<style>
  :root { --navy:#1a3d6b; --navy-dark:#0d1a2e; --green:#2e7d32; --gold:#d4a574; --cream:#f5f5f0; --muted:#5a6b7f; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px 16px;
    background:var(--cream); color:var(--navy-dark);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
  main { width:100%; max-width:560px; background:#fff; border-radius:20px; padding:40px 32px; text-align:center;
    box-shadow:0 10px 40px rgba(13,26,46,.08); border-top:4px solid var(--green); }
  img { height:72px; width:auto; }
  .label { margin:28px 0 8px; font-size:12px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--green); }
  h1 { margin:0; font-family: Georgia, "Times New Roman", serif; font-size:30px; line-height:1.2; color:var(--navy); }
  p { margin:16px 0 0; font-size:16px; line-height:1.6; color:var(--muted); }
  .contact { margin-top:28px; padding-top:24px; border-top:1px solid #e0e5eb; font-size:15px; }
  .contact div { margin-top:6px; }
  a { color:var(--navy); font-weight:600; text-decoration:none; word-break:break-word; }
  a:hover { text-decoration:underline; }
</style>
</head>
<body>
<main>
  <img src="/images/mha-logo.png" alt="${name} logo">
  <p class="label">Scheduled maintenance</p>
  <h1>We'll be back shortly</h1>
  <p>Our website is being updated to serve you better. Please check back soon.</p>
  <div class="contact">
    Need to reach us now?
    <div><a href="mailto:${email}">${email}</a></div>
    <div><a href="tel:${phone.replace(/\s/g, "")}">${phone}</a></div>
  </div>
</main>
</body>
</html>`;
}
