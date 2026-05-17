import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export default function AdminInquiriesPage() {
  return (
    <div>
      <h1 className="font-bodoni-display text-3xl font-bold text-navy">Inquiries</h1>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        Filters, status badges, and CSV export can be wired to Supabase once your project is
        live. See the SQL schema in your build prompt for table columns.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-left font-inter text-sm">
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
            <tr>
              <td className="px-4 py-8 text-center text-text-muted" colSpan={5}>
                No rows yet — submit the contact form to test the pipeline.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
