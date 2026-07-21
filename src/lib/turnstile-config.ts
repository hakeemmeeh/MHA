/** Turnstile site key — read on the server and pass into client forms. */
export function getTurnstileSiteKey(): string | undefined {
  const key =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    process.env.TURNSTILE_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_TURNTILE_SITE_KEY?.trim() ||
    process.env.TURNTILE_SITE_KEY?.trim();
  return key || undefined;
}
