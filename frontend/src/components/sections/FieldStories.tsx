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
    if (!track || !cards?.length || !root.current) return;

    const isMd = window.matchMedia("(min-width: 768px)").matches;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(track, { opacity: 0 });
      gsap.set(cards, isMd ? { x: 56, opacity: 0 } : { y: 48, opacity: 0 });
      if (quote.current) {
        gsap.set(quote.current, { opacity: 0, y: 28 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top 72%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(track, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0).fromTo(
        cards,
        isMd ? { x: 56, opacity: 0 } : { y: 48, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
        0.08,
      );

      if (quote.current) {
        tl.fromTo(
          quote.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "+=0.8",
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-navy-dark py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow className="text-green [&::before]:bg-green">
          From the Field
        </SectionEyebrow>
        <h2 className="font-playfair text-3xl font-bold text-white md:text-[44px]">
          Stories of Impact
        </h2>
        <p className="mt-4 max-w-2xl font-inter text-sm text-white/65">
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
          className="mt-12 flex flex-col gap-10 md:flex-row md:snap-x md:snap-mandatory md:gap-8 md:overflow-x-auto md:overflow-y-visible md:pb-4 md:[scrollbar-width:thin]"
          role="region"
          aria-label="Featured field stories"
        >
          {FEATURED_STORIES.map((s) => (
            <article
              key={s.slug}
              data-story-card
              className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/15 md:w-[min(720px,85vw)] md:snap-center md:p-6 lg:flex lg:min-h-0 lg:gap-8"
            >
              <div className="relative mx-auto aspect-[16/10] w-full max-w-xl overflow-hidden rounded-lg lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-[240px] lg:w-96 lg:max-w-none lg:shrink-0">
                <Image
                  src={s.image}
                  alt={`Field story: ${s.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 384px"
                />
              </div>
              <div className="mt-6 flex flex-1 flex-col justify-center lg:mt-0">
                <p className="font-inter text-xs font-semibold uppercase tracking-wider text-gold">
                  {s.location}
                </p>
                <h3 className="mt-2 font-playfair text-xl text-white md:text-2xl">{s.title}</h3>
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
