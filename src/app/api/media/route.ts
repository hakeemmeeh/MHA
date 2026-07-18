import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";

export const runtime = "nodejs";

// POST /api/media  (multipart form-data, field "file")
// Uploads to the public "media" bucket and returns { url }.
export async function POST(req: Request) {
  try {
    const supabase = getSupabaseService();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WebP, AVIF or GIF images are allowed." },
        { status: 400 }
      );
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 8 MB." }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safe = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .slice(0, 40);
    const path = `uploads/${Date.now()}-${safe || "image"}.${ext}`;

    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from("media")
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (e) {
    console.error("Media upload error:", e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

// GET /api/media — list recent uploads
export async function GET() {
  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ files: [] });
  }
  const { data, error } = await supabase.storage
    .from("media")
    .list("uploads", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

  if (error || !data) return NextResponse.json({ files: [] });

  const files = data
    .filter((o) => o.name)
    .map((o) => {
      const { data: pub } = supabase.storage
        .from("media")
        .getPublicUrl(`uploads/${o.name}`);
      return { name: o.name, url: pub.publicUrl };
    });
  return NextResponse.json({ files });
}
