"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  affiliations,
  aboutPreview,
  aboutTimeline,
  capabilities,
  coreValues,
  ctaQuote,
  mission,
  partnershipTransparency,
  site,
  strategicPurpose,
  vision,
} from "@/lib/content";
import { AboutPageNav } from "@/components/sections/AboutPageNav";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MidPageCTA } from "@/components/sections/MidPageCTA";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { HandCoins, type LucideProps, UsersRound } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/** Line dove + olive — matches Savior Demo 1 “Impact Analysis” motif. */
function DoveIcon({ className, strokeWidth = 1.35, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M20 9c-1.5 0-2.7.6-3.5 1.5-.4-2.2-2.2-4-4.7-4.3C8.5 5.8 6 8 6 11c0 .6.1 1.1.3 1.6C4.3 13.3 3 15 3 17c2.5 0 4.2-1 5.3-2.2.7.4 1.5.7 2.4.7 1.4 0 2.6-.5 3.5-1.4.7 1.6 2.3 2.7 4.2 2.9" />
      <path d="M14.5 8.5c.8-.9 1.9-1.5 3.2-1.5" />
      <path d="M17 5.2 18.2 4" />
      <path d="M17.8 6.5c.6-.15 1.2-.1 1.7.25" />
      <circle cx="9.2" cy="9.8" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Motifs matched to Savior Demo 1 “What we offer” (family / dove / giving hand). */
const OFFERINGS = [
  {
    title: "Local knowledge",
    icon: UsersRound,
    body: capabilities.bullets[0],
    href: "/programs",
  },
  {
    title: "Field-first teams",
    icon: DoveIcon,
    body: capabilities.bullets[1],
    href: "/impact",
  },
  {
    title: "Last-mile reach",
    icon: HandCoins,
    body: capabilities.bullets[2],
    href: "/stories",
  },
] as const;

function fadeUpBlock(
  block: Element,
  items: NodeListOf<Element> | Element[],
  opts?: { stagger?: number; y?: number; start?: string },
) {
  const arr = Array.from(items);
  if (!arr.length) return;
  gsap.fromTo(
    arr,
    { y: opts?.y ?? 36, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.82,
      stagger: opts?.stagger ?? 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: block,
        start: opts?.start ?? "top 82%",
        toggleActions: "play none none none",
        once: true,
      },
    },
  );
}

export function AboutBody() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-about-block]").forEach((block) => {
        const items = block.querySelectorAll("[data-about-item]");
        if (items.length) fadeUpBlock(block, items);
      });

      const missionGrid = el.querySelector("[data-about-mission-grid]");
      if (missionGrid) {
        const cards = missionGrid.querySelectorAll("[data-about-card]");
        gsap.fromTo(
          cards,
          { y: 52, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.88,
            stagger: 0.22,
            ease: "power3.out",
            scrollTrigger: {
              trigger: missionGrid,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

      const valuesGrid = el.querySelector("[data-about-values-grid]");
      if (valuesGrid) {
        const cards = valuesGrid.querySelectorAll("[data-about-value-card]");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesGrid,
              start: "top 78%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

      const offerGrid = el.querySelector("[data-about-offers]");
      if (offerGrid) {
        const cards = offerGrid.querySelectorAll("[data-about-offer]");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: offerGrid,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

      const timeline = el.querySelector("[data-about-timeline]");
      if (timeline) {
        const items = timeline.querySelectorAll("[data-about-milestone]");
        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timeline,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <AboutPageNav />

      {/* Director message + collage opener */}
      <section id="story" className="section-y scroll-mt-20 bg-cream">
        <div
          className="page-x mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
          data-about-block
        >
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-[3/4]">
              <Image
                src="/images/stories/capacity-building-cbp-leaders.jpg"
                alt="MHA field team with community leaders in South Sudan"
                fill
                quality={85}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover photo-brighten photo-focal"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 aspect-[4/3] w-36 overflow-hidden rounded-xl border-4 border-cream shadow-xl sm:-right-5 sm:w-48">
              <Image
                src="/images/programs/community-engagement.jpg"
                alt="Community engagement session with MHA facilitators"
                fill
                quality={85}
                sizes="192px"
                className="object-cover photo-brighten"
              />
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <div data-about-item>
              <SectionEyebrow>From the Executive Director</SectionEyebrow>
            </div>
            <p
              data-about-item
              className="font-playfair text-4xl leading-none text-green"
              aria-hidden
            >
              &ldquo;
            </p>
            <h2 data-about-item className="section-title mt-2 text-text-dark">
              A message from leadership
            </h2>
            <p
              data-about-item
              className="mt-4 font-inter text-lg font-semibold leading-snug text-green md:text-xl"
            >
              {ctaQuote}
            </p>
            <p data-about-item className="mt-5 font-inter text-base leading-relaxed text-text-mid">
              {aboutPreview.paragraphs[0]}
            </p>
            <p data-about-item className="mt-4 font-inter text-base leading-relaxed text-text-mid">
              {aboutPreview.paragraphs[1]}
            </p>
            <p
              data-about-item
              className="mt-8 font-playfair text-xl italic text-navy"
            >
              — {site.contactPerson}
            </p>
          </div>
        </div>
      </section>

      {/* Offering cards (capabilities content) */}
      <section className="section-y bg-navy-light">
        <div className="page-x mx-auto max-w-7xl">
          <div className="max-w-2xl" data-about-block>
            <div data-about-item>
              <SectionEyebrow>What we bring</SectionEyebrow>
            </div>
            <h2 data-about-item className="section-title text-text-dark">
              {capabilities.title}
            </h2>
          </div>
          <div
            data-about-offers
            className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8"
          >
            {OFFERINGS.map((o) => {
              const Icon = o.icon;
              return (
                <article
                  key={o.title}
                  data-about-offer
                  className="flex flex-col items-center text-center"
                >
                  <span className="inline-flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full bg-white text-green shadow-[0_10px_28px_rgba(13,26,46,0.1)] ring-1 ring-black/[0.04]">
                    <Icon className="h-10 w-10" strokeWidth={1.35} aria-hidden />
                  </span>
                  <h3 className="mt-7 font-playfair text-xl text-navy">{o.title}</h3>
                  <p className="mt-3 max-w-xs flex-1 font-inter text-sm leading-relaxed text-text-mid">
                    {o.body}
                  </p>
                  <Link href={o.href} className="link-cta mt-6 text-xs text-navy">
                    Learn more →
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline — Since 2017 */}
      <section id="timeline" className="section-y scroll-mt-20 bg-cream">
        <div className="page-x mx-auto max-w-7xl">
          <div className="max-w-2xl" data-about-block>
            <div data-about-item>
              <SectionEyebrow>Since {site.established}</SectionEyebrow>
            </div>
            <h2 data-about-item className="section-title text-text-dark">
              Our path so far
            </h2>
            <p data-about-item className="mt-4 font-inter text-base leading-relaxed text-text-mid">
              From registration to cluster membership and last-mile delivery — milestones that
              shape how MHA works today.
            </p>
          </div>
          <ol
            data-about-timeline
            className="mt-12 grid gap-0 border-l border-green/40 pl-6 lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:border-t lg:pl-0"
          >
            {aboutTimeline.map((m) => (
              <li
                key={m.title}
                data-about-milestone
                className="relative pb-10 last:pb-0 lg:pb-0 lg:pt-8"
              >
                <span
                  className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-green ring-4 ring-cream lg:left-0 lg:top-0 lg:-translate-y-1/2"
                  aria-hidden
                />
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-green">
                  {m.year}
                </p>
                <h3 className="mt-2 font-playfair text-lg text-navy">{m.title}</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed text-text-mid">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we work — strategic purpose + registration context + photo */}
      <section id="how-we-work" className="section-y scroll-mt-20 bg-white">
        <div
          className="page-x mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
          data-about-block
        >
          <div className="min-w-0">
            <div data-about-item>
              <SectionEyebrow>How we work</SectionEyebrow>
            </div>
            <h2 data-about-item className="section-title text-text-dark">
              {strategicPurpose.title}
            </h2>
            <p data-about-item className="mt-5 font-inter text-base leading-relaxed text-text-mid">
              {strategicPurpose.body}
            </p>
          </div>
          <div data-about-item className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[5/4]">
            <Image
              src="/images/stories/listening-posts-leer.jpg"
              alt="MHA listening post engagement with community members"
              fill
              quality={85}
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover photo-brighten photo-focal"
            />
          </div>
        </div>
      </section>

      {/* Trust — transparency only; governance lives under Leadership */}
      <section
        id="transparency"
        className="section-y scroll-mt-20 bg-navy-light"
      >
        <div className="page-x mx-auto max-w-3xl" data-about-block>
          <div data-about-item>
            <SectionEyebrow>Trust &amp; accountability</SectionEyebrow>
          </div>
          <h2 data-about-item className="section-title text-text-dark">
            {partnershipTransparency.title}
          </h2>
          {partnershipTransparency.paragraphs.map((p, i) => (
            <p
              key={p.slice(0, 48)}
              data-about-item
              className={`font-inter text-base leading-relaxed text-text-mid ${i === 0 ? "mt-5" : "mt-4"}`}
            >
              {p}
            </p>
          ))}
          <ul
            data-about-item
            className="mt-8 flex flex-col gap-3 border-t border-border pt-6 font-inter text-sm sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2"
          >
            <li>
              <Link href="/impact#project-log" className="link-cta text-navy">
                View activity log →
              </Link>
            </li>
            <li>
              <Link href="#leadership" className="link-cta text-navy">
                Leadership &amp; governance →
              </Link>
            </li>
            <li>
              <Link href="/resources" className="link-cta text-navy">
                Request documents →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Mission / Vision */}
      <section id="mission" className="section-y scroll-mt-20 bg-cream">
        <div
          data-about-mission-grid
          className="page-x mx-auto grid max-w-7xl gap-6 md:grid-cols-2 md:gap-8"
        >
          <div
            data-about-card
            className="rounded-2xl bg-navy p-8 text-white md:p-10"
          >
            <h2 className="font-playfair text-2xl font-normal">Mission</h2>
            <p className="mt-4 font-inter leading-relaxed text-white/80">{mission}</p>
          </div>
          <div
            data-about-card
            className="rounded-2xl bg-green p-8 text-white md:p-10"
          >
            <h2 className="font-playfair text-2xl font-normal">Vision</h2>
            <p className="mt-4 font-inter leading-relaxed text-white/90">{vision}</p>
          </div>
        </div>
      </section>

      {/* Core values — canonical home (removed from homepage) */}
      <section id="values" className="section-y scroll-mt-20 bg-white">
        <div className="page-x mx-auto max-w-7xl">
          <div className="text-center" data-about-block>
            <h2 data-about-item className="section-title text-text-dark">
              Core Values
            </h2>
          </div>
          <div
            data-about-values-grid
            className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border"
          >
            {coreValues.map((v) => (
              <div
                key={v.title}
                data-about-value-card
                className="text-center md:px-10"
              >
                <h3 className="font-playfair text-xl text-navy">{v.title}</h3>
                <p className="mt-3 font-inter text-sm leading-relaxed text-text-mid">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadershipSection />

      <MidPageCTA
        id="cta-about-involve"
        eyebrow="Get involved"
        title="Are you ready to work with us?"
        body="Whether you fund operations, co-design programmes, or volunteer skills — there is a pathway to work with MHA."
        primaryHref="/get-involved"
        primaryLabel="Get involved"
        secondaryHref="/contact"
        secondaryLabel="Contact the team"
      />

      {/* Policies — summary; full documents on Resources */}
      <section id="policies" className="section-y scroll-mt-20 bg-navy-dark text-white">
        <div className="page-x mx-auto max-w-3xl" data-about-block>
          <h2 data-about-item className="section-title text-white">
            Policies &amp; standards
          </h2>
          <p data-about-item className="mt-5 font-inter text-base leading-relaxed text-white/65">
            MHA maintains documented policies across safeguarding, PSEA, HR, security, finance,
            procurement, fleet, stock, assets, conduct, anti-fraud, and whistle-blowing. For
            partner due diligence, request copies from the Resources library.
          </p>
          <div data-about-item className="mt-10">
            <Link href="/resources" className="btn-primary">
              View resources &amp; request documents
            </Link>
          </div>
        </div>
      </section>

      {/* Affiliations — detail list; timeline covers the 2019 milestone */}
      <section id="affiliations" className="section-y scroll-mt-20 bg-cream">
        <div className="page-x mx-auto max-w-7xl" data-about-block>
          <h2 data-about-item className="section-title text-text-dark">
            Affiliations &amp; memberships
          </h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {affiliations.map((a) => (
              <li
                key={a.name}
                data-about-item
                className="py-4 font-inter text-sm text-text-dark"
              >
                {a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-navy underline-offset-2 hover:underline"
                  >
                    {a.name}
                  </a>
                ) : (
                  <span className="font-medium">{a.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
