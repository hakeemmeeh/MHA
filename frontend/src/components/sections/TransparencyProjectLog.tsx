import Link from "next/link";
import type { ProjectHighlight } from "@/types";

export function TransparencyProjectLog({
  items,
  title,
  intro,
  anchorId,
}: {
  items: ProjectHighlight[];
  title: string;
  intro?: string;
  /** Set on Impact page so /impact#project-log scrolls here */
  anchorId?: string;
}) {
  return (
    <section
      id={anchorId}
      className="bg-cream py-20"
      aria-labelledby="project-log-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="project-log-heading"
          className="font-playfair text-3xl font-bold text-navy md:text-[40px]"
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-3xl font-inter text-text-mid">{intro}</p>
        )}
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left font-inter text-sm">
            <thead className="border-b border-border bg-navy-light/60 text-xs font-semibold uppercase tracking-wide text-text-muted">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Where</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">More</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-text-dark">
              {items.map((row) => (
                <tr key={`${row.dateLabel}-${row.title}`} className="bg-white hover:bg-navy-light/30">
                  <td className="whitespace-nowrap px-4 py-4 text-text-muted">
                    {row.dateLabel}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-navy">{row.title}</span>
                    <p className="mt-1 max-w-md text-text-mid">{row.summary}</p>
                  </td>
                  <td className="px-4 py-4 text-text-mid">{row.location}</td>
                  <td className="px-4 py-4 text-text-mid">{row.partner ?? "—"}</td>
                  <td className="px-4 py-4">
                    {row.storySlug ? (
                      <Link
                        href={`/stories/${row.storySlug}`}
                        className="font-semibold text-green hover:underline"
                      >
                        Field story
                      </Link>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 font-inter text-xs text-text-muted">
          Dates are shown where documented in MHA&apos;s public organizational profile; other
          rows reflect ongoing or multi-site programme lines. Contact MHA for partner-specific
          reporting or verification questions.
        </p>
      </div>
    </section>
  );
}
