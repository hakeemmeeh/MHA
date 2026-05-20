import type { MetadataRoute } from "next";
import { fieldStories, newsItems, thematicAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mha-ss.org";
  const staticPages = [
    "",
    "/about",
    "/programs",
    "/impact",
    "/news",
    "/stories",
    "/donate",
    "/get-involved",
    "/careers",
    "/resources",
    "/contact",
    "/privacy",
    "/terms",
  ];
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
  fieldStories.forEach((s) => {
    entries.push({
      url: `${base}/stories/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });
  newsItems.forEach((n) => {
    entries.push({
      url: `${base}/news/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "monthly",
      priority: 0.55,
    });
  });
  return entries;
}
