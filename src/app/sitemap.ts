import type { MetadataRoute } from "next";
import { getBlog, getNews, getStories } from "@/lib/published-content";
import { thematicAreas } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const staticPages = [
    "",
    "/about",
    "/programs",
    "/impact",
    "/news",
    "/blog",
    "/stories",
    "/media",
    "/donate",
    "/get-involved",
    "/careers",
    "/resources",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const [stories, news, blog] = await Promise.all([getStories(), getNews(), getBlog()]);

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  thematicAreas.forEach((t) => {
    entries.push({
      url: `${base}/programs/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  stories.forEach((s) => {
    entries.push({
      url: `${base}/stories/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  news.forEach((n) => {
    entries.push({
      url: `${base}/news/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "monthly",
      priority: 0.55,
    });
  });

  blog.forEach((p) => {
    entries.push({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return entries;
}
