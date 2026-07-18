import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";

// Maps the URL :type segment to its table and the columns we accept.
const TABLES: Record<string, string> = {
  stories: "stories",
  news: "news",
  blog: "blog_posts",
  videos: "videos",
};

function table(type: string): string | null {
  return TABLES[type] ?? null;
}

// GET /api/content/:type  — list all rows (incl. drafts) for admin
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const t = table(type);
  if (!t) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });

  const supabase = getSupabaseService();
  if (!supabase) return NextResponse.json({ rows: [], error: "Supabase not configured." });

  const { data, error } = await supabase
    .from(t)
    .select("*")
    .order("sort_date", { ascending: false });

  if (error) return NextResponse.json({ rows: [], error: error.message });
  return NextResponse.json({ rows: data ?? [] });
}

// POST /api/content/:type  — create a row
export async function POST(
  req: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const t = table(type);
  if (!t) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });

  const supabase = getSupabaseService();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });

  const body = await req.json();
  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
  }

  const { data, error } = await supabase.from(t).insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ row: data });
}

// PATCH /api/content/:type?id=...  — update a row
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const t = table(type);
  if (!t) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const supabase = getSupabaseService();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });

  const body = await req.json();
  const { error } = await supabase.from(t).update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE /api/content/:type?id=...
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const t = table(type);
  if (!t) return NextResponse.json({ error: "Unknown content type." }, { status: 404 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const supabase = getSupabaseService();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured." }, { status: 503 });

  const { error } = await supabase.from(t).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
