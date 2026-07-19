import type { Metadata } from "next";
import { SeedCmsButton } from "@/components/admin/SeedCmsButton";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-normal text-navy">Settings</h1>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        Environment variables are managed in Vercel. Use the import below once to copy existing
        site content into Supabase so you can edit it from the CMS.
      </p>

      <SeedCmsButton />

      <ul className="mt-8 list-disc space-y-2 pl-5 font-inter text-sm text-text-mid">
        <li>
          <code className="text-navy">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-navy">SUPABASE_SERVICE_ROLE_KEY</code> for database access
        </li>
        <li>
          <code className="text-navy">RESEND_API_KEY</code> for notification email
        </li>
        <li>
          <code className="text-navy">CONTACT_NOTIFY_EMAIL</code> optional override for inbound
          alerts
        </li>
        <li>
          <code className="text-navy">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> for Google Analytics
        </li>
        <li>
          <code className="text-navy">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code> for Search
          Console
        </li>
        <li>
          <code className="text-navy">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> and{" "}
          <code className="text-navy">TURNSTILE_SECRET_KEY</code> for contact form spam protection
        </li>
      </ul>
    </div>
  );
}
