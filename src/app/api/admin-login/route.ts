import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!expected || !secret) {
      return NextResponse.json(
        { error: "Admin login is not configured on the server." },
        { status: 503 }
      );
    }

    if (password !== expected) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("mha_admin", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("mha_admin", "", { path: "/", maxAge: 0 });
  return res;
}
