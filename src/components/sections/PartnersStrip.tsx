import Image from "next/image";
import { partners } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function PartnersStrip() {
  const row = [...partners, ...partners];

  return (
    <section
      id="partners"
      className="section-y relative overflow-hidden border-y border-border bg-cream"
      aria-labelledby="partners-strip-heading"
    >
      <div className="page-x relative z-[1] mx-auto max-w-7xl text-center">
        <SectionEyebrow className="justify-center">Partners &amp; donors</SectionEyebrow>
        <h2
          id="partners-strip-heading"
          className="section-title mt-2 text-text-dark"
        >
          Trusted by leading humanitarian organizations
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-inter text-base leading-relaxed text-text-mid">
          Collaboration with agencies and funds that help us reach communities others cannot.
        </p>
      </div>

      <div className="relative z-[1] mt-12 md:mt-14">
        {/* Reduced motion: static logo row */}
        <div className="hidden flex-wrap items-center justify-center gap-10 px-6 motion-reduce:flex sm:gap-14 sm:px-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-16 w-40 shrink-0 items-center justify-center sm:h-20 sm:w-48"
            >
              <Image
                src={p.logo}
                alt={`${p.name} logo`}
                width={320}
                height={80}
                quality={85}
                className="h-10 w-auto max-w-full object-contain opacity-80 md:h-12"
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

          <div className="overflow-hidden py-2">
            <div className="flex w-max animate-marquee items-center gap-8 px-5 sm:gap-10 sm:px-6 md:gap-14 md:px-8">
              {row.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex h-16 w-40 shrink-0 items-center justify-center sm:h-20 sm:w-48"
                >
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={320}
                    height={80}
                    quality={85}
                    className="h-10 w-auto max-w-full object-contain opacity-80 transition hover:opacity-100 md:h-12"
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
