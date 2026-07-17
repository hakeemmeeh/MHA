import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Handshake, MessageSquare, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const cards = [
  { label: "New Inquiries", value: "—", icon: MessageSquare, hint: "Supabase `inquiries`" },
  { label: "Total Donors", value: "—", icon: Heart, hint: "Supabase `donors`" },
  { label: "Active Partners", value: "—", icon: Handshake, hint: "Supabase `partners`" },
  { label: "Volunteers", value: "—", icon: Users, hint: "Supabase `volunteers`" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <h1 className="font-bodoni-display text-3xl font-normal text-navy">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <Icon className="h-8 w-8 text-navy" aria-hidden />
              <p className="mt-4 font-inter text-sm text-text-muted">{c.label}</p>
              <p className="font-playfair text-3xl font-bold text-navy">{c.value}</p>
              <p className="mt-2 font-inter text-xs text-text-muted">{c.hint}</p>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="font-playfair text-xl font-normal text-navy">Recent inquiries</h2>
        <p className="mt-2 font-inter text-sm text-text-mid">
          Connect your Supabase project and service role key to list submissions here. The
          contact API already inserts into <code className="text-navy">inquiries</code> when
          configured.
        </p>
        <Link
          href="/admin/inquiries"
          className="mt-4 inline-block font-inter text-sm font-semibold text-green hover:underline"
        >
          Open inquiries →
        </Link>
      </div>
    </div>
  );
}
