import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";

const ALLOWED = ["new", "contacted", "qualified", "closed"];

// PATCH /api/inquiries/:id  { status, notes?, assigned_to? }
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes, assigned_to } = body;

    if (status && !ALLOWED.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = getSupabaseService();
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured." },
        { status: 503 }
      );
    }

    const patch: Record<string, unknown> = {};
    if (status !== undefined) patch.status = status;
    if (notes !== undefined) patch.notes = notes;
    if (assigned_to !== undefined) patch.assigned_to = assigned_to;

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    const { error } = await supabase.from("inquiries").update(patch).eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Inquiry update error:", e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
