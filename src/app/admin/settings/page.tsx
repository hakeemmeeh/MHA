import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-normal text-navy">Settings</h1>
      <ul className="mt-4 list-disc space-y-2 pl-5 font-inter text-sm text-text-mid">
        <li>
          <code className="text-navy">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-navy">SUPABASE_SERVICE_ROLE_KEY</code> for contact inserts
        </li>
        <li>
          <code className="text-navy">RESEND_API_KEY</code> for notification email
        </li>
        <li>
          <code className="text-navy">CONTACT_NOTIFY_EMAIL</code> optional override for inbound
          alerts
        </li>
      </ul>
    </div>
  );
}
