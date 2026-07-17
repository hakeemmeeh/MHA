import { fetchInquiries } from "@/lib/admin/inquiries";

export const metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const statusStyles: Record<string, string> = {
  new: "bg-green-light text-green-dark",
  contacted: "bg-navy-light text-navy",
  qualified: "bg-gold-light text-text-dark",
  closed: "bg-border text-text-muted",
};

export default async function AdminInquiriesPage() {
  const { rows, error } = await fetchInquiries();

  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-normal text-navy">Inquiries</h1>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        Contact form submissions from the public site. Requires{" "}
        <code className="text-navy">SUPABASE_SERVICE_ROLE_KEY</code> on the server.
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
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-8 text-center text-text-muted" colSpan={5}>
                  No inquiries yet — submit the contact form on the live site to test.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border/80 align-top hover:bg-cream/50">
                  <td className="px-4 py-3 font-light text-text-dark">{row.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${row.email}`} className="text-navy hover:underline">
                      {row.email}
                    </a>
                    {row.phone && (
                      <p className="mt-0.5 text-xs text-text-muted">{row.phone}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-text-mid">{row.inquiry_type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[row.status] ?? "bg-navy-light text-navy"}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">
                    {formatWhen(row.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {rows.length > 0 && (
        <details className="mt-8 rounded-xl border border-border bg-white p-4">
          <summary className="cursor-pointer font-inter text-sm font-semibold text-navy">
            View latest message preview
          </summary>
          <p className="mt-3 font-inter text-sm text-text-mid whitespace-pre-wrap">
            {rows[0].message}
          </p>
        </details>
      )}
    </div>
  );
}
