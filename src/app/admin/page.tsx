import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Handshake, MessageSquare, Users } from "lucide-react";
import { fetchDashboardStats } from "@/lib/admin/stats";
import { fetchInquiries } from "@/lib/admin/inquiries";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminDashboardPage() {
  const { stats, error } = await fetchDashboardStats();
  const { rows } = await fetchInquiries(5);

  const cards = [
    { label: "New Inquiries", value: stats.new_inquiries, icon: MessageSquare, hint: `${stats.total_inquiries} total` },
    { label: "Total Donors", value: stats.total_donors, icon: Heart, hint: `${stats.active_donors} active / major` },
    { label: "Active Partners", value: stats.active_partners, icon: Handshake, hint: "active + MoU signed" },
    { label: "Volunteers", value: stats.total_volunteers, icon: Users, hint: `${stats.active_volunteers} active` },
  ];

  return (
    <div className="space-y-10">
      <h1 className="font-bodoni-display text-3xl font-bold text-navy">Overview</h1>

      {error && (
        <p className="rounded-xl border border-gold/40 bg-gold-light/50 px-4 py-3 font-inter text-sm text-text-dark">
          {error}
        </p>
      )}

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
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-xl font-bold text-navy">Recent inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="font-inter text-sm font-semibold text-green hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-4 divide-y divide-border">
          {rows.length === 0 ? (
            <p className="py-4 font-inter text-sm text-text-mid">
              No inquiries yet — submit the contact form on the live site to test.
            </p>
          ) : (
            rows.map((row) => (
              <div key={row.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-inter text-sm font-medium text-text-dark">{row.name}</p>
                  <p className="font-inter text-xs text-text-muted">
                    {row.inquiry_type} · {formatWhen(row.created_at)}
                  </p>
                </div>
                <span className="rounded-full bg-navy-light px-2.5 py-0.5 font-inter text-xs font-semibold capitalize text-navy">
                  {row.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
