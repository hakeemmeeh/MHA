import Link from "next/link";
import type { ProjectHighlight } from "@/types";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

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
      className="section-y scroll-mt-20 bg-cream"
      aria-labelledby="project-log-heading"
    >
      <div className="page-x mx-auto max-w-7xl">
        <SectionEyebrow>Public record</SectionEyebrow>
        <h2 id="project-log-heading" className="section-title text-text-dark">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-3xl font-inter text-base leading-relaxed text-text-mid">
            {intro}
          </p>
        )}

        {/* Desktop table */}
        <div className="mt-10 hidden overflow-x-auto border border-border bg-white md:block">
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
                <tr
                  key={`${row.dateLabel}-${row.title}`}
                  className="bg-white hover:bg-navy-light/30"
                >
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

        {/* Mobile stacked rows */}
        <ul className="mt-10 space-y-4 md:hidden">
          {items.map((row) => (
            <li
              key={`${row.dateLabel}-${row.title}-m`}
              className="border-t-2 border-green bg-white px-5 py-5"
            >
              <p className="font-inter text-xs font-semibold uppercase tracking-wide text-text-muted">
                {row.dateLabel}
              </p>
              <h3 className="mt-2 font-playfair text-lg text-navy">{row.title}</h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-text-mid">
                {row.summary}
              </p>
              <p className="mt-3 font-inter text-xs text-text-muted">
                {row.location}
                {row.partner ? ` · ${row.partner}` : ""}
              </p>
              {row.storySlug ? (
                <Link
                  href={`/stories/${row.storySlug}`}
                  className="link-cta mt-4 inline-flex text-xs text-navy"
                >
                  Field story →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-6 font-inter text-xs text-text-muted">
          Dates are shown where documented in MHA&apos;s public organizational profile; other
          rows reflect ongoing or multi-site programme lines. Contact MHA for partner-specific
          reporting or verification questions.
        </p>
      </div>
    </section>
  );
}
