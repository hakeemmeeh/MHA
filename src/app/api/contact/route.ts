import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";
import { inquiryTypes } from "@/lib/content";
import { getSupabaseService } from "@/lib/supabase";
import { verifyTurnstileToken } from "@/lib/turnstile";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(80).optional().default(""),
  inquiry_type: z.enum(inquiryTypes),
  message: z.string().trim().min(10).max(5000),
  turnstileToken: z.string().nullable().optional(),
});

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Please submit a valid form." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your name, email, inquiry type, and message, then try again." },
        { status: 400 },
      );
    }

    const { name, email, phone, inquiry_type, message, turnstileToken } = parsed.data;

    if (!(await verifyTurnstileToken(turnstileToken ?? undefined))) {
      return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
    }

    const supabase = getSupabaseService();
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!supabase && !apiKey) {
      return NextResponse.json(
        { error: "Contact submissions are not configured. Please email or call MHA directly." },
        { status: 503 },
      );
    }

    let delivered = false;
    if (supabase) {
      const { error: dbError } = await supabase.from("inquiries").insert([
        {
          name,
          email,
          phone: phone || null,
          inquiry_type,
          message,
          status: "new",
          created_at: new Date().toISOString(),
        },
      ]);
      if (dbError) {
        console.error("Supabase insert:", dbError);
      } else {
        delivered = true;
      }
    }

    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        const { error: notifyError } = await resend.emails.send({
          from: "MHA Website <onboarding@resend.dev>",
          to: [process.env.CONTACT_NOTIFY_EMAIL?.trim() || "mobilehumanitarianagency@gmail.com"],
          subject: `New ${inquiry_type} from ${name.replace(/[\r\n]+/g, " ")}`,
          html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${phone ? escapeHtml(phone) : "Not provided"}</p>
          <p><strong>Type:</strong> ${escapeHtml(inquiry_type)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message)}</p>
        `,
        });
        if (notifyError) {
          console.error("Resend notification:", notifyError);
        } else {
          delivered = true;
          const { error: replyError } = await resend.emails.send({
            from: "Mobile Humanitarian Agency <onboarding@resend.dev>",
            to: [email],
            subject: "Thank you for contacting MHA",
            html: `
            <h2>Thank you, ${escapeHtml(name)}!</h2>
            <p>We have received your message and will respond within 48 hours.</p>
            <p>If this is urgent, please call us directly at +211 911828150.</p>
          `,
          });
          if (replyError) console.error("Resend acknowledgment:", replyError);
        }
      } catch (error) {
        console.error("Resend notification:", error);
      }
    }

    if (!delivered) {
      return NextResponse.json(
        { error: "We could not deliver your message. Please email or call MHA directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
