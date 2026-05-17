/**
 * Remote Unsplash imagery only for selected thematic areas (per editorial request).
 * All other programs and stories use MHA assets under `public/images/programs/` and
 * `public/images/stories/`. License: https://unsplash.com/license
 */
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&q=80`;

/** Thematic slugs that use Unsplash instead of local MHA JPEGs */
const UNSPLASH_THEMATIC_SLUGS = new Set([
  "wash",
  "hlp",
  "youth-engagement",
  "food-security-livelihoods",
  "nutrition",
]);

/** Program card / hero imagery for those slugs only */
const PROGRAM_UNSPLASH: Record<string, string> = {
  wash: unsplash("1548839140-29a749e1cf4d"), // water access
  hlp: unsplash("1560518883-ce09059eeffa"), // home / keys
  "youth-engagement": unsplash("1523240795612-9a054b0db644"), // students / learning
  "food-security-livelihoods": unsplash("1464226184884-fa280b87c399"), // produce / farming
  nutrition: unsplash("1490645935967-10de6ba17061"), // healthy meal
};

/** When multiple stories share an Unsplash thematic, override per slug */
const STORY_UNSPLASH_BY_SLUG: Record<string, string> = {
  "youth-skills-dukor": unsplash("1523580494863-6f3031224c94"),
  "youth-launch-leer-june-2023": unsplash("1524178232363-1fb2b075b655"),
};

const localProgram = (slug: string) => `/images/programs/${slug}.jpg`;
const localStory = (slug: string) => `/images/stories/${slug}.jpg`;

export function programImage(slug: string): string {
  return PROGRAM_UNSPLASH[slug] ?? localProgram(slug);
}

export function storyImage(slug: string, thematicSlug: string): string {
  if (!UNSPLASH_THEMATIC_SLUGS.has(thematicSlug)) {
    return localStory(slug);
  }
  return STORY_UNSPLASH_BY_SLUG[slug] ?? PROGRAM_UNSPLASH[thematicSlug] ?? localStory(slug);
}
