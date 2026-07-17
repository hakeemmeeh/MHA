import Link from "next/link";
import { FileText, HeartHandshake, Shield } from "lucide-react";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250] as const;

/**
 * Homepage donation moment (Demo 9 pattern). Continues the navy block started
 * by StatsBar, with the transparency links folded into its base edge.
 */
export function DonateBand() {
  return (
    <section
      id="donate-band"
      className="bg-navy pb-12 sm:pb-14 lg:pb-16"
      aria-labelledby="donate-band-heading"
    >
      <div className="page-x mx-auto max-w-7xl">
        <div className="grid items-center gap-10 border-t border-white/15 pt-10 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p className="font-inter text-xs font-semibold uppercase tracking-wider text-green">
              Invest in dignity
            </p>
            <h2
              id="donate-band-heading"
              className="mt-3 font-playfair text-2xl font-normal text-white md:text-3xl"
            >
              Make a difference today
            </h2>
            <p className="mt-3 max-w-xl font-inter text-base leading-relaxed text-white/65">
              Every gift funds protection, GBV response, and life-saving assistance in
              communities others can&apos;t reach.
            </p>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-3">
              {PRESET_AMOUNTS.map((amount) => (
                <Link
                  key={amount}
                  href={`/donate?amount=${amount}`}
                  className="inline-flex min-w-[4.5rem] items-center justify-center rounded-full border border-white/25 px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:border-green hover:bg-green hover:text-white"
                >
                  ${amount}
                </Link>
              ))}
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 font-inter text-sm font-semibold text-white transition hover:border-green hover:bg-green"
              >
                Custom
              </Link>
            </div>
            <Link href="/donate" className="btn-primary mt-5 px-8">
              <HeartHandshake className="h-4 w-4" aria-hidden />
              Donate now
            </Link>
          </div>
        </div>

        {/* Transparency links — folded in from the former TrustStrip */}
        <div className="mt-10 flex min-w-0 flex-col gap-4 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-white/80">
            <Shield className="h-4 w-4 shrink-0 text-green" aria-hidden />
            Transparency &amp; accountability
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-inter text-sm font-medium">
            <li>
              <Link
                href="/impact#project-log"
                className="inline-flex items-center gap-1.5 text-white/70 underline-offset-4 transition hover:text-green hover:underline"
              >
                <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Public activity log
              </Link>
            </li>
            <li>
              <Link
                href="/about#transparency"
                className="text-white/70 underline-offset-4 transition hover:text-green hover:underline"
              >
                Governance &amp; policies
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="text-white/70 underline-offset-4 transition hover:text-green hover:underline"
              >
                Resources &amp; documents
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
