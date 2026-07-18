import { getSupabaseService } from "@/lib/supabase";
import type { FieldStory, NewsItem, BlogPost, MediaVideo } from "@/types";
import {
  fieldStories as fallbackStories,
  newsItems as fallbackNews,
  mediaVideos as fallbackVideos,
} from "@/lib/content";
import { getBlogPosts as fallbackBlogPosts } from "@/lib/blog";

// ---------------------------------------------------------------------
// Strategy: fetch PUBLISHED rows from Supabase. Merge with the hardcoded
// content.ts as a fallback so the site never goes blank during migration.
// Supabase rows win on slug collision; remaining fallback items fill in.
// Any Supabase error → return fallback only. The site always renders.
// ---------------------------------------------------------------------

function mergeBySlug<T extends { slug: string }>(primary: T[], fallback: T[]): T[] {
  const seen = new Set(primary.map((p) => p.slug));
  return [...primary, ...fallback.filter((f) => !seen.has(f.slug))];
}

// ---------- STORIES ----------
export async function getStories(): Promise<FieldStory[]> {
  const supabase = getSupabaseService();
  if (!supabase) return fallbackStories;

  const { data, error } = await supabase
    .from("stories")
    .select("slug, title, excerpt, outcome, location, image, thematic_slug, body, sort_date")
    .eq("status", "published")
    .order("sort_date", { ascending: false });

  if (error || !data) return fallbackStories;

  const rows: FieldStory[] = data.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    outcome: r.outcome ?? undefined,
    location: r.location,
    image: r.image,
    thematicSlug: r.thematic_slug,
    body: r.body ?? [],
  }));
  return mergeBySlug(rows, fallbackStories);
}

export async function getStory(slug: string): Promise<FieldStory | null> {
  const all = await getStories();
  return all.find((s) => s.slug === slug) ?? null;
}

// ---------- NEWS ----------
export async function getNews(): Promise<NewsItem[]> {
  const supabase = getSupabaseService();
  if (!supabase) return fallbackNews;

  const { data, error } = await supabase
    .from("news")
    .select("slug, title, date, category, excerpt, body, image, story_slug, sort_date")
    .eq("status", "published")
    .order("sort_date", { ascending: false });

  if (error || !data) return fallbackNews;

  const rows: NewsItem[] = data.map((r) => ({
    slug: r.slug,
    title: r.title,
    date: r.date,
    category: r.category,
    excerpt: r.excerpt,
    body: r.body ?? [],
    image: r.image ?? undefined,
    storySlug: r.story_slug ?? undefined,
  }));
  return mergeBySlug(rows, fallbackNews);
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const all = await getNews();
  return all.find((n) => n.slug === slug) ?? null;
}

// ---------- BLOG ----------
export async function getBlog(): Promise<BlogPost[]> {
  const supabase = getSupabaseService();
  const fallback = fallbackBlogPosts();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, published_at, category, image, body, author, story_slug, gallery, sort_date")
    .eq("status", "published")
    .order("sort_date", { ascending: false });

  if (error || !data) return fallback;

  const rows: BlogPost[] = data.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    publishedAt: r.published_at,
    category: r.category,
    image: r.image,
    body: r.body ?? [],
    author: r.author ?? undefined,
    storySlug: r.story_slug ?? undefined,
    gallery: r.gallery ?? undefined,
  }));
  return mergeBySlug(rows, fallback);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const all = await getBlog();
  return all.find((b) => b.slug === slug) ?? null;
}

// ---------- VIDEOS ----------
export async function getVideos(): Promise<MediaVideo[]> {
  const supabase = getSupabaseService();
  if (!supabase) return fallbackVideos;

  const { data, error } = await supabase
    .from("videos")
    .select("slug, title, description, youtube_id, poster_image, duration_label, location, featured, sort_date")
    .eq("status", "published")
    .order("sort_date", { ascending: false });

  if (error || !data) return fallbackVideos;

  const rows: MediaVideo[] = data.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    youtubeId: r.youtube_id ?? undefined,
    posterImage: r.poster_image,
    durationLabel: r.duration_label ?? undefined,
    location: r.location ?? undefined,
    featured: r.featured,
  }));
  return mergeBySlug(rows, fallbackVideos);
}
