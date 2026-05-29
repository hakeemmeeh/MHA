import type { BlogPost } from "@/types";
import { pictorialBlogPosts } from "@/lib/blog-pictorials";

/**
 * Insights / blog — editorial commentary and programme pictorials.
 * Long-form field narratives live on /stories.
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
  return [...pictorialBlogPosts, ...editorialPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

export { legacyBlogStoryRedirects } from "@/lib/blog-redirects";
