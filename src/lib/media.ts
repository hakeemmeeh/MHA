/**
 * MHA site photos: hero, partners, and other assets under `public/images/` (PDF extraction, SVG logos, etc.).
 * Selected program areas (WASH, HLP, youth, food security, nutrition) use Unsplash from
 * `src/lib/unsplashMedia.ts`; other programs and stories use local MHA JPEGs.
 * To restore local JPEGs for stories/programs, re-run extraction if the PDF updates:
 *   brew install poppler   # once
 *   bash scripts/extract-pdf-images.sh "/path/to/MHA profile.pdf"
 * Then copy JPEGs from `public/images/from-pdf/` into `hero/`, `stories/`, `programs/` and
 * point `content.ts` back at those paths if desired.
 */
export function isLocalImage(src: string): boolean {
  return src.startsWith("/");
}
