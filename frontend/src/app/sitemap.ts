import type { MetadataRoute } from "next";
import { fieldStories, thematicAreas } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mha-ss.org";
  const staticPages = [
    "",
    "/about",
    "/programs",
    "/impact",
    "/stories",
    "/get-involved",
    "/contact",
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
  return entries;
}
