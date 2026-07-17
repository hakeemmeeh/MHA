import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donors",
  robots: { index: false, follow: false },
};

export default function AdminDonorsPage() {
  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-normal text-navy">Donors</h1>
      <p className="mt-2 font-inter text-sm text-text-mid">
        Donor CRM records will appear here after Supabase connection.
      </p>
    </div>
  );
}
