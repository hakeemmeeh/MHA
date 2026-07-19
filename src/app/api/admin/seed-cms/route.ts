import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog";
import { fieldStories, mediaVideos, newsItems } from "@/lib/content";
import { getSupabaseService } from "@/lib/supabase";

export async function POST() {
  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const storyRows = fieldStories.map((s) => ({
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    outcome: s.outcome ?? null,
    location: s.location,
    image: s.image,
    thematic_slug: s.thematicSlug,
    body: s.body ?? [],
    status: "published",
  }));

  const newsRows = newsItems.map((n) => ({
    slug: n.slug,
    title: n.title,
    date: n.date,
    category: n.category,
    excerpt: n.excerpt,
    body: n.body ?? [],
    image: n.image ?? null,
    story_slug: n.storySlug ?? null,
    status: "published",
  }));

  const blogRows = getBlogPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    published_at: p.publishedAt,
    category: p.category,
    image: p.image,
    body: p.body ?? [],
    author: p.author ?? null,
    story_slug: p.storySlug ?? null,
    gallery: p.gallery ?? null,
    status: "published",
  }));

  const videoRows = mediaVideos.map((v) => ({
    slug: v.slug,
    title: v.title,
    description: v.description,
    youtube_id: v.youtubeId ?? null,
    poster_image: v.posterImage,
    duration_label: v.durationLabel ?? null,
    location: v.location ?? null,
    featured: v.featured ?? false,
    status: "published",
  }));

  const results: Record<string, number | string> = {};

  const { data: storyData, error: storiesErr } = await supabase
    .from("stories")
    .upsert(storyRows, { onConflict: "slug" })
    .select("slug");
  if (storiesErr) results.stories = storiesErr.message;
  else results.stories = storyData?.length ?? storyRows.length;

  const { data: newsData, error: newsErr } = await supabase
    .from("news")
    .upsert(newsRows, { onConflict: "slug" })
    .select("slug");
  if (newsErr) results.news = newsErr.message;
  else results.news = newsData?.length ?? newsRows.length;

  const { data: blogData, error: blogErr } = await supabase
    .from("blog_posts")
    .upsert(blogRows, { onConflict: "slug" })
    .select("slug");
  if (blogErr) results.blog = blogErr.message;
  else results.blog = blogData?.length ?? blogRows.length;

  const { data: videoData, error: videosErr } = await supabase
    .from("videos")
    .upsert(videoRows, { onConflict: "slug" })
    .select("slug");
  if (videosErr) results.videos = videosErr.message;
  else results.videos = videoData?.length ?? videoRows.length;

  const failed = Object.values(results).some((v) => typeof v === "string");
  return NextResponse.json(
    { success: !failed, seeded: results },
    { status: failed ? 500 : 200 },
  );
}
