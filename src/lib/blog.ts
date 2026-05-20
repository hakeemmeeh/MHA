import type { BlogPost } from "@/types";

/**
 * Insights / blog — editorial & commentary only.
 * Field narratives live exclusively on /stories (no mirroring).
 */
const editorialPosts: BlogPost[] = [
  {
    slug: "local-ngos-last-mile",
    title: "Why local NGOs still matter at the last mile",
    excerpt:
      "South Sudanese organizations carry context, language, and relationships that outside actors cannot replicate — especially where roads end and canoes begin.",
    publishedAt: "2026-04-10",
    category: "editorial",
    image: "/images/hero/home-hero.jpg",
    author: "MHA Communications",
    body: [
      "Humanitarian access is not only about vehicles and visas. It is about trust built over years in the same counties where families return, flee, and rebuild.",
      "MHA’s field-led model keeps decision-making close to community priorities — and accountability mechanisms close to the people affected when something goes wrong.",
      "Partners who invest in local NGOs invest in sustained presence, not only surge capacity.",
    ],
  },
];

export function getBlogPosts(): BlogPost[] {
  return [...editorialPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

/** Redirect legacy story-mirror URLs (if any were shared) to canonical stories. */
export const legacyBlogStoryRedirects: Record<string, string> = {
  "story-listening-posts-leer": "/stories/listening-posts-leer",
  "story-safe-space-mayiandit": "/stories/safe-space-mayiandit",
  "story-youth-launch-leer-june-2023": "/stories/youth-launch-leer-june-2023",
  "story-youth-skills-dukor": "/stories/youth-skills-dukor",
  "story-cbp-centre-pigi-canal-jonglei": "/stories/cbp-centre-pigi-canal-jonglei",
  "story-cbp-training-dablual-mayiandit": "/stories/cbp-training-dablual-mayiandit",
  "story-cbp-centre-dablual-mayiandit": "/stories/cbp-centre-dablual-mayiandit",
  "story-mayiandit-leaders-cultural-norms": "/stories/mayiandit-leaders-cultural-norms",
  "story-nfi-torit-eastern-equatoria-unhcr": "/stories/nfi-torit-eastern-equatoria-unhcr",
  "story-capacity-building-cbp-leaders": "/stories/capacity-building-cbp-leaders",
};
