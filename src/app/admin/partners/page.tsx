import type { Metadata } from "next";
import { fetchPartners } from "@/lib/admin/partners";

export const metadata: Metadata = {
  title: "Partners",
  robots: { index: false, follow: false },
};

const statusStyles: Record<string, string> = {
  prospect: "bg-border text-text-muted",
  active: "bg-green-light text-green-dark",
  mou_signed: "bg-gold-light text-text-dark",
  dormant: "bg-navy-light text-navy",
};

const typeLabels: Record<string, string> = {
  un_agency: "UN Agency",
  ingo: "INGO",
  local_ngo: "Local NGO",
  donor: "Donor",
  government: "Government",
  private: "Private",
};

export default async function AdminPartnersPage() {
  const { rows, error } = await fetchPartners();

  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-bold text-navy">Partners</h1>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        Partnership and MoU records.
      </p>

      {error && (
        <p className="mt-4 rounded-xl border border-gold/40 bg-gold-light/50 px-4 py-3 font-inter text-sm text-text-dark">
          {error}
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left font-inter text-sm">
          <thead className="border-b border-border bg-navy-light/50 text-text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Focus areas</th>
              <th className="px-4 py-3">MoU</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-text-muted" colSpan={5}>
                  No partners yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border/80 align-top hover:bg-cream/50">
                  <td className="px-4 py-3 font-medium text-text-dark">
                    {row.name}
                    {row.contact_email && (
                      <a href={`mailto:${row.contact_email}`} className="mt-0.5 block text-xs text-navy hover:underline">
                        {row.contact_name ?? row.contact_email}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-mid">{typeLabels[row.partner_type] ?? row.partner_type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[row.status] ?? "bg-navy-light text-navy"}`}
                    >
                      {row.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-mid">
                    {row.focus_areas && row.focus_areas.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {row.focus_areas.map((a) => (
                          <span key={a} className="rounded bg-cream px-1.5 py-0.5 text-xs">{a}</span>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                    {row.mou_signed_at
                      ? new Date(row.mou_signed_at).toLocaleDateString("en-GB", { dateStyle: "medium" })
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
