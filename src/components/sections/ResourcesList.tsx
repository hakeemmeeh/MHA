import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { publicDocuments, site } from "@/lib/content";

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
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="font-inter text-sm text-text-mid">
          Upload finalized PDFs to <code className="text-navy">public/documents/</code> and set
          each item&apos;s download link in <code className="text-navy">content.ts</code>. Until
          then, request copies by email — we respond to partner due-diligence requests promptly.
        </p>

        <div className="mt-10 space-y-12">
          {categoryOrder.map((cat) => {
            const docs = publicDocuments.filter((d) => d.category === cat);
            if (!docs.length) return null;
            return (
              <div key={cat}>
                <h2 className="font-playfair text-2xl font-bold text-navy">
                  {categoryLabels[cat]}
                </h2>
                <ul className="mt-6 space-y-4">
                  {docs.map((doc) => (
                    <li
                      key={doc.title}
                      className="flex flex-col gap-4 rounded-xl border border-border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-inter font-semibold text-text-dark">{doc.title}</p>
                        {doc.year && (
                          <p className="mt-0.5 font-inter text-xs text-text-muted">{doc.year}</p>
                        )}
                        <p className="mt-2 font-inter text-sm text-text-mid">{doc.description}</p>
                      </div>
                      {doc.href && !doc.onRequest ? (
                        <a
                          href={doc.href}
                          download
                          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-inter text-sm font-semibold text-white hover:bg-navy-dark"
                        >
                          <Download className="h-4 w-4" aria-hidden />
                          Download
                        </a>
                      ) : (
                        <a
                          href={requestMailto}
                          className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-navy px-5 py-2.5 font-inter text-sm font-semibold text-navy hover:bg-navy-light"
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

        <p className="mt-12 rounded-xl border border-green/25 bg-green-light/40 p-6 font-inter text-sm text-text-mid">
          For full audit trails, procurement packs, or donor-specific reports,{" "}
          <Link href="/contact" className="font-semibold text-navy hover:underline">
            contact us
          </Link>{" "}
          and we will route your request to the right focal point.
        </p>
      </div>
    </section>
  );
}
