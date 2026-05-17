import Image from "next/image";
import { partners } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function PartnersStrip() {
  const row = [...partners, ...partners];

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-cream py-14 md:py-16"
      aria-labelledby="partners-strip-heading"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-6 text-center">
        <SectionEyebrow className="justify-center">Partners &amp; donors</SectionEyebrow>
        <h2
          id="partners-strip-heading"
          className="mt-3 font-playfair text-2xl font-bold tracking-tight text-text-dark md:text-3xl"
        >
          Trusted by leading humanitarian organizations
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-inter text-sm text-text-mid md:text-base">
          Collaboration with agencies and funds that help us reach communities others cannot.
        </p>
      </div>

      <div className="relative z-[1] mt-10 md:mt-12">
        {/* Reduced motion: static logo row */}
        <div className="hidden flex-wrap items-center justify-center gap-6 px-6 motion-reduce:flex md:gap-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="shrink-0 rounded-2xl border border-border bg-white px-5 py-3 shadow-sm"
            >
              <Image
                src={p.logo}
                alt={`${p.name} logo`}
                width={320}
                height={80}
                className="h-11 w-auto max-w-[min(100%,280px)] object-contain md:h-12"
              />
            </div>
          ))}
        </div>

        {/* Marquee with edge fades — fade to cream (same as Where We Work in South Sudan) */}
        <div className="relative motion-reduce:hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent md:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent md:w-28"
          />

          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-14 px-6 md:gap-24 md:px-10">
              {row.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 rounded-2xl border border-border bg-white px-5 py-3 shadow-sm transition duration-300 hover:border-green/40 hover:shadow-md"
                >
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={320}
                    height={80}
                    className="h-11 w-auto max-w-[min(100%,280px)] object-contain md:h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
