import Link from "next/link";
import { Banknote, Building2, Heart, Package } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { donationMethods, site } from "@/lib/content";

const icons = [Banknote, Package, Building2, Heart] as const;

export function DonateSection({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="page-x mx-auto max-w-6xl">
          <SectionEyebrow>Ways to give</SectionEyebrow>
          <h2 className="section-title text-text-dark">Support MHA</h2>
          <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-text-mid">
            Every contribution helps MHA reach remote settlements, sustain protection monitoring,
            and keep field teams equipped. Choose the pathway that fits you — we will confirm
            details and acknowledge your support.
          </p>
          <p className="mt-3 max-w-2xl font-inter text-sm text-text-muted">
            Card and mobile-money checkout is being finalized — gifts are currently arranged via
            bank transfer and the pathways below.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {donationMethods.map((method, i) => {
              const Icon = icons[i] ?? Heart;
              return (
                <div key={method.title} className="border-t-2 border-green pt-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-green shadow-[0_8px_20px_rgba(13,26,46,0.1)] ring-1 ring-black/[0.04]">
                    <Icon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-playfair text-xl font-normal text-navy">
                    {method.title}
                  </h3>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-text-mid">
                    {method.description}
                  </p>
                  <ul className="mt-4 space-y-2 font-inter text-sm text-text-mid">
                    {method.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Donation inquiry")}`}
              className="btn-primary"
            >
              Email finance team
            </a>
            <Link href="/resources" className="link-cta py-3 text-navy">
              Transparency resources →
            </Link>
          </div>
        </div>
      </section>
      <section className="section-y bg-navy-light">
        <div className="page-x mx-auto max-w-xl">
          <SectionEyebrow>Next step</SectionEyebrow>
          <h2 className="section-title text-text-dark">Start a donation conversation</h2>
          <p className="mt-4 font-inter text-sm leading-relaxed text-text-mid">
            Select &ldquo;I want to donate&rdquo; and tell us how you would like to give.
          </p>
          <div className="mt-8 border border-border bg-white p-8">
            <ContactForm simplified defaultInquiryType="I want to donate" turnstileSiteKey={turnstileSiteKey} />
          </div>
        </div>
      </section>
    </>
  );
}
