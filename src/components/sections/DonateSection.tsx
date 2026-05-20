import Link from "next/link";
import { Banknote, Building2, Heart, Package } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { donationMethods, site } from "@/lib/content";

const icons = [Banknote, Package, Building2, Heart] as const;

export function DonateSection() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="max-w-2xl font-inter text-lg text-text-mid">
            Every contribution helps MHA reach remote settlements, sustain protection monitoring,
            and keep field teams equipped. Choose the pathway that fits you — we will confirm
            details and acknowledge your support.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {donationMethods.map((method, i) => {
              const Icon = icons[i] ?? Heart;
              return (
                <div
                  key={method.title}
                  className="rounded-2xl border border-border bg-white p-8 shadow-sm"
                >
                  <span className="inline-flex rounded-xl bg-navy-light p-3 text-navy">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-playfair text-xl font-bold text-navy">
                    {method.title}
                  </h2>
                  <p className="mt-2 font-inter text-sm text-text-mid">{method.description}</p>
                  <ul className="mt-4 list-inside list-disc space-y-2 font-inter text-sm text-text-mid">
                    {method.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Donation inquiry")}`}
              className="inline-flex rounded-full bg-green px-8 py-3 font-inter text-sm font-semibold text-white hover:bg-green-dark"
            >
              Email finance team
            </a>
            <Link
              href="/resources"
              className="inline-flex rounded-full border-2 border-navy px-8 py-3 font-inter text-sm font-semibold text-navy hover:bg-navy-light"
            >
              Transparency resources
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-navy-light py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <h2 className="font-playfair text-2xl font-bold text-navy">Start a donation conversation</h2>
          <p className="mt-2 font-inter text-sm text-text-mid">
            Select &ldquo;I want to donate&rdquo; and tell us how you would like to give.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-white p-8 shadow-sm">
            <ContactForm simplified defaultInquiryType="I want to donate" />
          </div>
        </div>
      </section>
    </>
  );
}
