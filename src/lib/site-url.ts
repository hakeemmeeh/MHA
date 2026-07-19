/** Canonical public site origin (prefer www — matches Vercel production). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.mha-ss.org";
