import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSupabaseService } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiry_type, message } = body;

    if (!name || !email || !inquiry_type || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = getSupabaseService();
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
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "MHA Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_NOTIFY_EMAIL ?? "mobilehumanitarianagency@gmail.com"],
        subject: `New ${inquiry_type} from ${name}`,
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
      await resend.emails.send({
        from: "Mobile Humanitarian Agency <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting MHA",
        html: `
        <h2>Thank you, ${escapeHtml(name)}!</h2>
        <p>We have received your message and will respond within 48 hours.</p>
        <p>If this is urgent, please call us directly at +211 911828150.</p>
      `,
      });
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
