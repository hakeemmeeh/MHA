import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  coverage,
  fieldStories,
  hero,
  site,
  stats,
  thematicAreas,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const previewStory = fieldStories[0];
const previewProgram = thematicAreas[0];

function PreviewLabel({
  number,
  title,
  description,
  bestFor,
}: {
  number: string;
  title: string;
  description: string;
  bestFor: string;
}) {
  return (
    <div className="border-b border-border bg-navy-light/50 px-4 py-5 sm:px-6 lg:px-8">
      <p className="font-inter text-xs font-semibold uppercase tracking-widest text-green">
        {number}
      </p>
      <h2 className="mt-1 font-playfair text-2xl font-normal text-navy md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl font-inter text-sm text-text-mid">{description}</p>
      <p className="mt-2 font-inter text-xs text-text-muted">
        <span className="font-semibold text-navy">Best for:</span> {bestFor}
      </p>
    </div>
  );
}

/** 0 — Current full-bleed (reference) */
export function HeroPreviewFullBleed() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-navy-dark lg:min-h-[92vh]">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-dark/45 to-navy-dark/70"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-4 pb-16 text-center sm:px-6 lg:min-h-[92vh]">
        <SectionEyebrow className="justify-center text-green">{hero.eyebrow}</SectionEyebrow>
        <h1 className="mt-4 font-playfair text-4xl font-normal leading-tight text-white md:text-6xl">
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-xl font-inter text-base text-white/80 md:text-lg">
          {hero.subtext}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <span className="inline-flex rounded-full bg-green px-8 py-3 font-inter text-sm font-semibold text-white">
            Get Involved
          </span>
          <span className="inline-flex rounded-full border-2 border-white px-8 py-3 font-inter text-sm font-semibold text-white">
            Our Programs
          </span>
        </div>
      </div>
    </section>
  );
}

/** 1 — Split hero */
export function HeroPreviewSplit() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-0 lg:min-h-[72vh] lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
          <h1 className="mt-4 font-playfair text-4xl font-normal leading-tight text-text-dark md:text-5xl">
            {hero.titleLines.join(" ")}
          </h1>
          <p className="mt-5 max-w-lg font-inter text-base text-text-mid md:text-lg">
            {hero.subtext}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex rounded-full bg-green px-6 py-2.5 font-inter text-sm font-semibold text-white">
              Get Involved
            </span>
            <span className="inline-flex rounded-full border-2 border-navy px-6 py-2.5 font-inter text-sm font-semibold text-navy">
              Our Programs
            </span>
          </div>
        </div>
        <div className="relative min-h-[50vh] lg:min-h-0">
          <div className="absolute inset-4 overflow-hidden rounded-2xl shadow-xl lg:inset-6 lg:left-0">
            <Image
              src={hero.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-navy-dark/15" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

/** 2 — Contained magazine band */
export function HeroPreviewContained() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
        <h1 className="mt-4 font-playfair text-4xl font-normal text-text-dark md:text-5xl">
          Our Programs
        </h1>
        <p className="mt-4 max-w-2xl font-inter text-lg text-text-mid">
          Fourteen interconnected thematic areas — from protection and GBV to logistics
          that keep teams moving in remote South Sudan.
        </p>
        <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-2xl border border-border shadow-md">
          <Image
            src={previewProgram.image}
            alt=""
            fill
            className="object-cover object-center photo-brighten"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

/** 3 — Typography-first */
export function HeroPreviewTypography() {
  return (
    <section className="bg-gradient-to-br from-navy to-navy-dark px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <SectionEyebrow className="justify-center text-green">{hero.eyebrow}</SectionEyebrow>
        <h1 className="mt-5 font-playfair text-4xl font-normal text-white md:text-5xl lg:text-6xl">
          Contact MHA
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-inter text-lg text-white/75">
          Reach our Juba headquarters or field coordination — we respond to partnership,
          media, and safeguarding inquiries through secure channels.
        </p>
        <div className="mx-auto mt-10 max-w-md rounded-xl border border-white/15 bg-white/5 px-6 py-5 text-left font-inter text-sm text-white/90">
          <p className="font-semibold text-white">{site.contactPerson}</p>
          <p className="mt-2 text-white/70">{site.email}</p>
          <p className="text-white/70">{site.phone}</p>
        </div>
      </div>
    </section>
  );
}

/** 4 — Bento / collage */
export function HeroPreviewBento() {
  return (
    <section className="bg-cream px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5 lg:min-h-[70vh]">
          <div className="flex flex-col justify-center lg:col-span-5 lg:row-span-2 lg:pr-4">
            <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
            <h1 className="mt-4 font-playfair text-3xl font-normal text-text-dark md:text-4xl lg:text-5xl">
              {hero.titleLines[0]}
              <span className="block text-navy-mid">{hero.titleLines[1]}</span>
            </h1>
            <p className="mt-4 font-inter text-text-mid">{hero.subtext}</p>
          </div>
          <div className="relative min-h-[240px] overflow-hidden rounded-2xl lg:col-span-7 lg:row-span-2 lg:min-h-0">
            <Image src={hero.image} alt="" fill className="object-cover" sizes="60vw" />
          </div>
          <div className="relative min-h-[180px] overflow-hidden rounded-2xl lg:col-span-4">
            <Image
              src={previewStory.image}
              alt=""
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-navy p-6 text-white lg:col-span-3">
            <p className="font-playfair text-3xl font-bold">2017</p>
            <p className="mt-1 font-inter text-sm text-white/75">Established · NGOs Act 2016</p>
            <p className="mt-4 font-inter text-xs uppercase tracking-widest text-green">
              8 counties · 14 themes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 5 — Stats + statement */
export function HeroPreviewStats() {
  const topStats = stats.slice(0, 4);
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <SectionEyebrow>Impact at a glance</SectionEyebrow>
        <h1 className="mt-4 max-w-3xl font-playfair text-4xl font-normal text-text-dark md:text-5xl">
          Principled assistance where access is hardest
        </h1>
        <p className="mt-4 max-w-2xl font-inter text-lg text-text-mid">
          {site.description.slice(0, 160)}…
        </p>
        <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {topStats.map((s) => (
            <div key={s.label} className="border-l-2 border-green pl-4">
              <dt className="font-inter text-xs uppercase tracking-wide text-text-muted">
                {s.label}
              </dt>
              <dd className="mt-1 font-playfair text-3xl font-bold text-navy md:text-4xl">
                {s.value}
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** 6 — Story-led quote */
export function HeroPreviewQuote() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px] lg:items-center lg:gap-14">
        <div>
          <SectionEyebrow>Field story</SectionEyebrow>
          <blockquote className="mt-6 font-playfair text-2xl font-bold leading-snug text-text-dark md:text-4xl">
            &ldquo;{previewStory.excerpt}&rdquo;
          </blockquote>
          <footer className="mt-6 font-inter text-sm text-text-mid">
            <p className="font-semibold text-navy">{previewStory.title}</p>
            <p className="mt-1 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-green" aria-hidden />
              {previewStory.location}
            </p>
          </footer>
          <p className="mt-8 font-inter text-sm font-semibold text-green">Read full story →</p>
        </div>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl shadow-lg lg:mx-0">
          <Image
            src={previewStory.image}
            alt=""
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </div>
    </section>
  );
}

/** 7 — Map / presence */
export function HeroPreviewMap() {
  const counties = coverage.states.flatMap((st) =>
    st.counties.map((c) => ({ county: c, state: st.name })),
  );
  return (
    <section className="bg-navy-light/40 px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionEyebrow>Our presence</SectionEyebrow>
          <h1 className="mt-4 font-playfair text-4xl font-normal text-text-dark md:text-5xl">
            Where we work in South Sudan
          </h1>
          <p className="mt-4 font-inter text-text-mid">
            Unity and Jonglei states — field offices in Juba, Leer, Duk, and Bentiu reaching
            communities others cannot.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {counties.slice(0, 6).map(({ county, state }) => (
              <li key={`${state}-${county}`}>
                <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 font-inter text-xs font-light text-navy">
                  {county}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-6">
          <svg viewBox="0 0 400 420" className="h-auto w-full" aria-hidden>
            <rect width="400" height="420" fill="#F0F4FA" rx="12" />
            <path d="M60 120 L180 90 L200 200 L80 220 Z" fill="#1A3D6B" stroke="#fff" strokeWidth="2" />
            <path d="M180 90 L280 100 L260 210 L200 200 Z" fill="#1A3D6B" stroke="#fff" strokeWidth="2" />
            <path d="M80 220 L200 200 L220 320 L100 340 Z" fill="#1A3D6B" stroke="#fff" strokeWidth="2" />
            <path d="M280 100 L360 140 L330 280 L260 210 Z" fill="#4CAF50" stroke="#fff" strokeWidth="2" />
            <path d="M220 320 L330 280 L340 380 L240 400 Z" fill="#4CAF50" stroke="#fff" strokeWidth="2" />
            <text x="200" y="36" textAnchor="middle" fill="#1a3d6b" fontSize="13" fontWeight="700">
              Active counties
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

const VARIANTS = [
  {
    id: "full-bleed",
    number: "0 · Reference",
    title: "Full-bleed cinematic",
    description: "Current home hero — edge-to-edge photo, centered type, transparent nav over image.",
    bestFor: "Home only (one per site).",
    Component: HeroPreviewFullBleed,
  },
  {
    id: "split",
    number: "1",
    title: "Split hero",
    description: "Copy on cream, photo in a rounded panel — institutional and readable.",
    bestFor: "About, Impact, Programs index.",
    Component: HeroPreviewSplit,
  },
  {
    id: "contained",
    number: "2",
    title: "Contained magazine band",
    description: "Title first, wide 21:9 image block inside the content column — not viewport-wide.",
    bestFor: "Stories list, program pages, Get Involved.",
    Component: HeroPreviewContained,
  },
  {
    id: "typography",
    number: "3",
    title: "Typography-first",
    description: "No hero photo — headline, subcopy, and contact card on navy gradient.",
    bestFor: "Contact, forms, clarity-first pages.",
    Component: HeroPreviewTypography,
  },
  {
    id: "bento",
    number: "4",
    title: "Bento / collage",
    description: "Grid of image tiles plus a mission stat tile — multiple stories at once.",
    bestFor: "Home alternative, Programs hub.",
    Component: HeroPreviewBento,
  },
  {
    id: "stats",
    number: "5",
    title: "Stats + statement",
    description: "Short copy block with four credibility metrics inline.",
    bestFor: "Impact, About (credibility above the fold).",
    Component: HeroPreviewStats,
  },
  {
    id: "quote",
    number: "6",
    title: "Story-led quote",
    description: "Field excerpt and location with a portrait-format story image.",
    bestFor: "Home rotation, Stories landing.",
    Component: HeroPreviewQuote,
  },
  {
    id: "map",
    number: "7",
    title: "Map / presence",
    description: "Geography-first — stylized map and county chips, no full-bleed people photo.",
    bestFor: "Programs, presence / coverage pages.",
    Component: HeroPreviewMap,
  },
] as const;

export function HeroVariantsPreview() {
  return (
    <div className="min-w-0">
      <header className="border-b border-border bg-navy-dark px-4 py-10 text-white sm:px-6 lg:px-8">
        <p className="font-inter text-xs font-semibold uppercase tracking-widest text-green">
          Design preview
        </p>
        <h1 className="mt-2 font-playfair text-3xl font-normal md:text-4xl">
          Hero variants
        </h1>
        <p className="mt-3 max-w-2xl font-inter text-sm text-white/75">
          Scroll to compare layouts. None of these replace the live site until you choose
          variants per page. Solid navbar applies on all previews (no transparent-over-hero).
        </p>
        <nav
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Jump to hero variant"
        >
          {VARIANTS.map((v) => (
            <a
              key={v.id}
              href={`#hero-${v.id}`}
              className={cn(
                "rounded-full border border-white/25 px-3 py-1.5 font-inter text-xs font-medium",
                "text-white/90 transition hover:border-green hover:bg-white/10",
              )}
            >
              {v.number} {v.title.split(" ")[0]}
            </a>
          ))}
        </nav>
      </header>

      {VARIANTS.map((v) => (
        <article key={v.id} id={`hero-${v.id}`} className="scroll-mt-[72px] lg:scroll-mt-[120px]">
          <PreviewLabel
            number={v.number}
            title={v.title}
            description={v.description}
            bestFor={v.bestFor}
          />
          <v.Component />
        </article>
      ))}

      <footer className="bg-cream px-4 py-10 text-center sm:px-6">
        <p className="font-inter text-sm text-text-mid">
          Pick variants by page and we can wire them into <code className="text-navy">PageHero</code>{" "}
          with a <code className="text-navy">variant</code> prop.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex font-inter text-sm font-semibold text-green hover:text-green-dark"
        >
          ← Back to live site
        </Link>
      </footer>
    </div>
  );
}
