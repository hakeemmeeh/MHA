import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { publicDocuments, site } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const categoryLabels = {
  registration: "Registration",
  governance: "Governance",
  safeguarding: "Safeguarding",
  finance: "Finance",
} as const;

const categoryOrder = ["registration", "governance", "safeguarding", "finance"] as const;

export function ResourcesList() {
  const requestMailto = `mailto:${site.email}?subject=${encodeURIComponent("Document request — MHA")}`;

  return (
    <section className="section-y bg-cream">
      <div className="page-x mx-auto max-w-4xl">
        <SectionEyebrow>Partner due diligence</SectionEyebrow>
        <h2 className="section-title text-text-dark">Document library</h2>
        <p className="mt-4 font-inter text-base leading-relaxed text-text-mid">
          Policies, registration, and financial materials for partners, donors, and auditors.
          Where a download is not yet published online, request a copy by email — we respond to
          partner due-diligence requests promptly.
        </p>

        <div className="mt-12 space-y-12">
          {categoryOrder.map((cat) => {
            const docs = publicDocuments.filter((d) => d.category === cat);
            if (!docs.length) return null;
            return (
              <div key={cat}>
                <h3 className="font-inter text-xs font-semibold uppercase tracking-wider text-green">
                  {categoryLabels[cat]}
                </h3>
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {docs.map((doc) => (
                    <li
                      key={doc.title}
                      className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-inter font-medium text-text-dark">{doc.title}</p>
                        {doc.year ? (
                          <p className="mt-0.5 font-inter text-xs text-text-muted">{doc.year}</p>
                        ) : null}
                        <p className="mt-2 font-inter text-sm text-text-mid">{doc.description}</p>
                      </div>
                      {doc.href && !doc.onRequest ? (
                        <a
                          href={doc.href}
                          download
                          className="btn-primary shrink-0 px-5 py-2.5 text-xs"
                        >
                          <Download className="h-4 w-4" aria-hidden />
                          Download
                        </a>
                      ) : (
                        <a
                          href={requestMailto}
                          className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-navy px-5 py-2.5 font-inter text-xs font-semibold uppercase tracking-[0.05em] text-navy transition hover:bg-navy-light"
                        >
                          <Mail className="h-4 w-4" aria-hidden />
                          Request copy
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-12 border-t-2 border-green pt-6 font-inter text-sm leading-relaxed text-text-mid">
          For full audit trails, procurement packs, or donor-specific reports,{" "}
          <Link href="/contact" className="font-semibold text-navy underline-offset-2 hover:underline">
            contact us
          </Link>{" "}
          and we will route your request to the right focal point.
        </p>
      </div>
    </section>
  );
}
