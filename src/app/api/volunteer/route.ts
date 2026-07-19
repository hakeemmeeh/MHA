import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, skills, availability, location, interest_area, turnstileToken } =
      body;

    if (!(await verifyTurnstileToken(turnstileToken))) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const supabase = getSupabaseService();
    if (supabase) {
      const { error: dbError } = await supabase.from("volunteers").insert([
        {
          name,
          email,
          phone: phone || null,
          skills: Array.isArray(skills) ? skills : skills ? [skills] : null,
          availability: availability || null,
          location: location || null,
          interest_area: interest_area || null,
          status: "applied",
        },
      ]);
      if (dbError) {
        console.error("Supabase insert (volunteers):", dbError);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "MHA Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_NOTIFY_EMAIL ?? "mobilehumanitarianagency@gmail.com"],
        subject: `New volunteer application — ${name}`,
        html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
        <p><strong>Location:</strong> ${location ? escapeHtml(location) : "Not provided"}</p>
        <p><strong>Interest area:</strong> ${interest_area ? escapeHtml(interest_area) : "Not specified"}</p>
        <p><strong>Availability:</strong> ${availability ? escapeHtml(availability) : "Not specified"}</p>
      `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Volunteer form error:", e);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
