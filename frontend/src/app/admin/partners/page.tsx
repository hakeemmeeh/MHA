import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
  robots: { index: false, follow: false },
};

export default function AdminPartnersPage() {
  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-bold text-navy">Partners</h1>
      <p className="mt-2 font-inter text-sm text-text-mid">
        Partnership records will appear here after Supabase connection.
      </p>
    </div>
  );
}
