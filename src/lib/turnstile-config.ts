/** Public Turnstile site key (safe in source — visible in the browser widget). */
const TURNSTILE_SITE_KEY = "0x4AAAAAAD6ndkSic9whznr3";

/** Turnstile site key — read on the server and pass into client forms. */
export function getTurnstileSiteKey(): string {
  const key =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ||
    process.env.TURNSTILE_SITE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_TURNTILE_SITE_KEY?.trim() ||
    process.env.TURNTILE_SITE_KEY?.trim();
  return key || TURNSTILE_SITE_KEY;
}
