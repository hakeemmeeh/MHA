/**
 * Remote Unsplash imagery only for selected thematic areas (per editorial request).
 * All other programs and stories use MHA assets under `public/images/programs/` and
 * `public/images/stories/`. License: https://unsplash.com/license
 */
const unsplash = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=3840&q=92`;

/** Thematic slugs that use Unsplash instead of local MHA JPEGs */
const UNSPLASH_THEMATIC_SLUGS = new Set([
  "wash",
  "hlp",
  "youth-engagement",
  "food-security-livelihoods",
  "nutrition",
  "community-engagement",
  "shelter-nfis",
]);

/** Program card / hero imagery for those slugs only */
const PROGRAM_UNSPLASH: Record<string, string> = {
  wash: unsplash("1548839140-29a749e1cf4d"), // water access
  hlp: unsplash("1560518883-ce09059eeffa"), // home / keys
  "youth-engagement": unsplash("1523240795612-9a054b0db644"), // students / learning
  "food-security-livelihoods": unsplash("1464226184884-fa280b87c399"), // produce / farming
  nutrition: unsplash("1490645935967-10de6ba17061"), // healthy meal
  "community-engagement": unsplash("1522071820081-009f0129c71c"), // collaboration / community
  "shelter-nfis": unsplash("1516738901171-8eb4fc13bd20"), // humanitarian supplies / distribution
};

/** Field stories that always use MHA photos under public/images/stories/ */
const STORY_LOCAL_SLUGS = new Set([
  "youth-launch-leer-june-2023",
  "youth-skills-dukor",
]);

/** When multiple stories share an Unsplash thematic, override per slug */
const STORY_UNSPLASH_BY_SLUG: Record<string, string> = {};

const localProgram = (slug: string) => `/images/programs/${slug}.jpg`;
const localStory = (slug: string) => `/images/stories/${slug}.jpg`;

export function programImage(slug: string): string {
  return PROGRAM_UNSPLASH[slug] ?? localProgram(slug);
}

export function storyImage(slug: string, thematicSlug: string): string {
  if (STORY_LOCAL_SLUGS.has(slug)) {
    return localStory(slug);
  }
  if (!UNSPLASH_THEMATIC_SLUGS.has(thematicSlug)) {
    return localStory(slug);
  }
  return STORY_UNSPLASH_BY_SLUG[slug] ?? PROGRAM_UNSPLASH[thematicSlug] ?? localStory(slug);
}
