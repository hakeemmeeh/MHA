import type { Metadata } from "next";
import { fetchVolunteers } from "@/lib/admin/volunteers";

export const metadata: Metadata = {
  title: "Volunteers",
  robots: { index: false, follow: false },
};

const statusStyles: Record<string, string> = {
  applied: "bg-gold-light text-text-dark",
  screening: "bg-navy-light text-navy",
  active: "bg-green-light text-green-dark",
  inactive: "bg-border text-text-muted",
};

export default async function AdminVolunteersPage() {
  const { rows, error } = await fetchVolunteers();

  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-bold text-navy">Volunteers</h1>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        Volunteer applications and active pool.
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
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Skills</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Applied</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-text-muted" colSpan={5}>
                  No volunteers yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border/80 align-top hover:bg-cream/50">
                  <td className="px-4 py-3 font-medium text-text-dark">
                    {row.name}
                    <a href={`mailto:${row.email}`} className="mt-0.5 block text-xs text-navy hover:underline">
                      {row.email}
                    </a>
                    {row.phone && <p className="text-xs text-text-muted">{row.phone}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[row.status] ?? "bg-navy-light text-navy"}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-mid">
                    {row.skills && row.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {row.skills.map((s) => (
                          <span key={s} className="rounded bg-cream px-1.5 py-0.5 text-xs">{s}</span>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                    {row.interest_area && (
                      <p className="mt-1 text-xs text-text-muted">Interest: {row.interest_area}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-mid">
                    {row.location ?? "—"}
                    {row.availability && (
                      <p className="text-xs text-text-muted">{row.availability}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                    {new Date(row.applied_at).toLocaleDateString("en-GB", { dateStyle: "medium" })}
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
