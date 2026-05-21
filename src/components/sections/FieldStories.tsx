"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaQuote, fieldStories } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

/** Spec §5: three featured field stories — horizontal scroll (desktop), stacked (mobile). */
const FEATURED_STORIES = fieldStories.slice(0, 3);

export function FieldStories() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const cards = track?.querySelectorAll<HTMLElement>("[data-story-card]");
    const rootEl = root.current;
    if (!track || !cards?.length || !rootEl) return;

    const isMd = window.matchMedia("(min-width: 768px)").matches;

    const intros = rootEl.querySelectorAll<HTMLElement>("[data-mh-intro]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (intros.length) gsap.set(intros, { y: 0, opacity: 1 });
      gsap.set(track, { opacity: 1 });
      gsap.set(cards, { x: 0, y: 0, opacity: 1 });
      if (quote.current) gsap.set(quote.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(track, { opacity: 0 });
      gsap.set(cards, isMd ? { x: 56, opacity: 0 } : { y: 48, opacity: 0 });
      if (quote.current) {
        gsap.set(quote.current, { opacity: 0, y: 28 });
      }
      if (intros.length) {
        gsap.set(intros, { y: 32, opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: "top 74%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      if (intros.length) {
        tl.fromTo(
          intros,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, stagger: 0.14, ease: "power3.out" },
          0,
        );
      }

      tl.fromTo(
        track,
        { opacity: 0 },
        { opacity: 1, duration: 0.55 },
        intros.length ? ">+=0.08" : 0,
      );
      tl.fromTo(
        cards,
        isMd ? { x: 56, opacity: 0 } : { y: 48, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.88, stagger: 0.26 },
        intros.length ? "<0.45" : 0.1,
      );

      if (quote.current) {
        tl.fromTo(
          quote.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95 },
          "+=1.0",
        );
      }
    }, rootEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="stories" className="bg-navy py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-mh-intro>
          <SectionEyebrow className="text-green [&::before]:bg-green">
            From the Field
          </SectionEyebrow>
        </div>
        <h2
          data-mh-intro
          className="font-playfair text-3xl font-bold text-white md:text-[44px]"
        >
          Stories of Impact
        </h2>
        <p data-mh-intro className="mt-4 max-w-2xl font-inter text-sm text-white/65">
          A sample of field narratives. For every story and the public activity log for partners,
          see{" "}
          <Link href="/stories" className="font-semibold text-green underline">
            all stories
          </Link>{" "}
          and{" "}
          <Link href="/impact#project-log" className="font-semibold text-green underline">
            impact &amp; transparency
          </Link>
          .
        </p>

        <div
          ref={trackRef}
          className="mt-10 flex min-w-0 flex-col gap-10 sm:mt-12 md:-mx-2 md:flex-row md:snap-x md:snap-mandatory md:gap-8 md:overflow-x-auto md:overflow-y-visible md:px-2 md:pb-4 md:[scrollbar-width:thin]"
          role="region"
          aria-label="Featured field stories"
        >
          {FEATURED_STORIES.map((s, index) => (
            <article
              key={s.slug}
              data-story-card
              className={`shrink-0 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/15 md:snap-center md:p-6 lg:flex lg:min-h-0 lg:gap-8 ${
                index === 0
                  ? "md:w-[min(920px,92vw)] lg:min-h-[280px]"
                  : "md:w-[min(640px,82vw)]"
              }`}
            >
              <div className="relative mx-auto aspect-[16/10] w-full max-w-xl overflow-hidden rounded-lg lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-[240px] lg:w-96 lg:max-w-none lg:shrink-0">
                <Image
                  src={s.image}
                  alt={`Field story: ${s.title}`}
                  fill
                  quality={85}
                  className="object-cover photo-brighten photo-focal"
                  sizes="(max-width:768px) 100vw, 384px"
                />
              </div>
              <div className="mt-6 flex flex-1 flex-col justify-center lg:mt-0">
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-gold">
                  {s.location}
                </p>
                <h3 className="mt-2 font-playfair text-xl text-white md:text-2xl">{s.title}</h3>
                {s.outcome ? (
                  <p className="mt-2 font-inter text-sm font-semibold leading-snug text-green">
                    {s.outcome}
                  </p>
                ) : null}
                <p className="mt-3 line-clamp-3 font-inter text-sm leading-relaxed text-white/70">
                  {s.excerpt}
                </p>
                <Link
                  href={`/stories/${s.slug}`}
                  className="mt-4 font-inter text-sm font-semibold text-green hover:underline"
                >
                  Read Full Story →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p
          ref={quote}
          className="mx-auto mt-16 max-w-3xl text-center font-playfair text-xl italic text-white/60 md:text-2xl"
        >
          {ctaQuote}
        </p>
      </div>
    </section>
  );
}
