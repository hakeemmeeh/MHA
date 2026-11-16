import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getSupabaseService } from "@/lib/supabase";
import { verifyTurnstileToken } from "@/lib/turnstile";

const volunteerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(80).optional().default(""),
  skills: z.union([z.array(z.string().trim().min(1).max(100)).max(30), z.string().trim().max(1000)]).optional(),
  availability: z.string().trim().max(500).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  interest_area: z.string().trim().max(200).optional().default(""),
  turnstileToken: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Please submit a valid application." }, { status: 400 });
    }

    const parsed = volunteerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your name and email, then try again." },
        { status: 400 },
      );
    }

    const { name, email, phone, skills, availability, location, interest_area, turnstileToken } =
      parsed.data;
    if (!(await verifyTurnstileToken(turnstileToken ?? undefined))) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }

    const supabase = getSupabaseService();
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!supabase && !apiKey) {
      return NextResponse.json(
        { error: "Volunteer applications are not configured. Please contact MHA directly." },
        { status: 503 },
      );
    }

    let delivered = false;
    if (supabase) {
      const { error } = await supabase.from("volunteers").insert([
        {
          name,
          email,
          phone: phone || null,
          skills: Array.isArray(skills)
            ? skills
            : skills
              ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
              : null,
          availability: availability || null,
          location: location || null,
          interest_area: interest_area || null,
          status: "applied",
        },
      ]);
      if (error) console.error("Supabase insert (volunteers):", error);
      else delivered = true;
    }

    if (apiKey) {
      try {
        const formattedSkills = Array.isArray(skills) ? skills.join(", ") : skills || "Not provided";
        const { error } = await new Resend(apiKey).emails.send({
          from: "MHA Website <onboarding@resend.dev>",
          to: [process.env.CONTACT_NOTIFY_EMAIL?.trim() || "mobilehumanitarianagency@gmail.com"],
          subject: `New volunteer application — ${name.replace(/[\r\n]+/g, " ")}`,
          html: `
            <h2>New Volunteer Application</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
            <p><strong>Location:</strong> ${location ? escapeHtml(location) : "Not provided"}</p>
            <p><strong>Interest area:</strong> ${interest_area ? escapeHtml(interest_area) : "Not specified"}</p>
            <p><strong>Availability:</strong> ${availability ? escapeHtml(availability) : "Not specified"}</p>
            <p><strong>Skills:</strong> ${escapeHtml(formattedSkills)}</p>
          `,
        });
        if (error) console.error("Resend notification (volunteers):", error);
        else delivered = true;
      } catch (error) {
        console.error("Resend notification (volunteers):", error);
      }
    }

    if (!delivered) {
      return NextResponse.json(
        { error: "We could not submit your application. Please contact MHA directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Volunteer form error:", error);
    return NextResponse.json({ error: "Failed to submit. Please contact MHA directly." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
