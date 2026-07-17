import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteers",
  robots: { index: false, follow: false },
};

export default function AdminVolunteersPage() {
  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-normal text-navy">Volunteers</h1>
      <p className="mt-2 font-inter text-sm text-text-mid">
        Volunteer records will appear here after Supabase connection.
      </p>
    </div>
  );
}
