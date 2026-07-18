import type { Metadata } from "next";
import { fetchDonors } from "@/lib/admin/donors";

export const metadata: Metadata = {
  title: "Donors",
  robots: { index: false, follow: false },
};

const statusStyles: Record<string, string> = {
  prospect: "bg-border text-text-muted",
  active: "bg-green-light text-green-dark",
  major: "bg-gold-light text-text-dark",
  lapsed: "bg-navy-light text-navy",
};

function money(n: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function AdminDonorsPage() {
  const { rows, error } = await fetchDonors();

  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-bold text-navy">Donors</h1>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        Donor CRM records, highest lifetime giving first.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-gold/40 bg-gold-light/50 px-4 py-3 font-inter text-sm text-text-dark">
          {error}
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left font-inter text-sm">
          <thead className="border-b border-border bg-navy-light/50 text-text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Lifetime</th>
              <th className="px-4 py-3">Last gift</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-text-muted" colSpan={5}>
                  No donors yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border/80 align-top hover:bg-cream/50">
                  <td className="px-4 py-3 font-medium text-text-dark">
                    {row.name}
                    {row.organization && (
                      <p className="mt-0.5 text-xs text-text-muted">{row.organization}</p>
                    )}
                    {row.email && (
                      <a href={`mailto:${row.email}`} className="mt-0.5 block text-xs text-navy hover:underline">
                        {row.email}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 capitalize text-text-mid">{row.donor_type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[row.status] ?? "bg-navy-light text-navy"}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-text-dark">
                    {money(row.total_given, row.currency)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                    {row.last_gift_at
                      ? new Date(row.last_gift_at).toLocaleDateString("en-GB", { dateStyle: "medium" })
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
