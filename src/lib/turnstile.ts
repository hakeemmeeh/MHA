/** Server-side Cloudflare Turnstile verification. Skips when secret is not configured. */
export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY?.trim() ||
    process.env.TURNTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}
