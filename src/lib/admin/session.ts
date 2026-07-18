import type { NextRequest } from "next/server";

export function isAdminSessionValid(req: NextRequest): boolean {
  const session = req.cookies.get("mha_admin")?.value;
  const expected = process.env.ADMIN_SESSION_SECRET;
  return Boolean(session && expected && session === expected);
}
