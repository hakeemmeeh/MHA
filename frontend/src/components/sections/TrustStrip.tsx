import Link from "next/link";
import { FileText, Shield } from "lucide-react";

/** Slim trust row — static; no scroll animations */
export function TrustStrip() {
  return (
    <section
      className="border-b border-border bg-white py-6"
      aria-labelledby="trust-strip-heading"
    >
      <div className="mx-auto flex max-w-7xl min-w-0 flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-navy/10 p-2 text-navy" aria-hidden>
            <Shield className="h-5 w-5" />
          </span>
          <h2 id="trust-strip-heading" className="font-playfair text-lg font-semibold text-navy">
            Transparency &amp; accountability
          </h2>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-inter text-sm font-medium text-text-mid">
          <li>
            <Link
              href="/impact#project-log"
              className="inline-flex items-center gap-1.5 text-navy underline-offset-4 hover:text-green hover:underline"
            >
              <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Public activity log
            </Link>
          </li>
          <li>
            <Link href="/about#transparency" className="text-navy underline-offset-4 hover:text-green hover:underline">
              Governance &amp; policies
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-navy underline-offset-4 hover:text-green hover:underline">
              Due diligence &amp; reports
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
