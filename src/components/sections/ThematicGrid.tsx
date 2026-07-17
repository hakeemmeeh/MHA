"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { thematicAreas } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ThematicCard } from "@/components/ui/ThematicCard";

gsap.registerPlugin(ScrollTrigger);

export function ThematicGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gridEl = grid.current;
    const cards = gridEl?.querySelectorAll<HTMLElement>("[data-card]");
    const headlineEls = section?.querySelectorAll<HTMLElement>("[data-mh-thematic-head]");
    const subtextEls = section?.querySelectorAll<HTMLElement>("[data-mh-thematic-sub]");
    if (!section || !gridEl || !cards?.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (headlineEls?.length) gsap.set(headlineEls, { y: 0, opacity: 1 });
      if (subtextEls?.length) gsap.set(subtextEls, { y: 0, opacity: 1 });
      gsap.set(cards, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      if (headlineEls?.length) gsap.set(headlineEls, { y: 28, opacity: 0 });
      if (subtextEls?.length) gsap.set(subtextEls, { y: 28, opacity: 0 });
      gsap.set(cards, { y: 48, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (headlineEls?.length) {
        tl.fromTo(
          headlineEls,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, stagger: 0.14 },
          0,
        );
      }
      if (subtextEls?.length) {
        tl.fromTo(
          subtextEls,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.68, stagger: 0.1, ease: "power2.out" },
          headlineEls?.length ? ">+=0.28" : 0,
        );
      }
      tl.fromTo(
        cards,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.88, stagger: 0.2, ease: "power3.out" },
        subtextEls?.length ? ">+=0.32" : headlineEls?.length ? ">+=0.32" : 0,
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const displayed = thematicAreas.slice(0, 6);

  return (
    <section ref={sectionRef} id="programs" className="section-y bg-navy-light">
      <div className="page-x mx-auto max-w-7xl">
        <div className="flex min-w-0 flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 flex-1">
            <div data-mh-thematic-head>
              <SectionEyebrow>Our Work</SectionEyebrow>
            </div>
            <h2 data-mh-thematic-head className="section-title text-text-dark">
              Thematic Areas of Focus
            </h2>
            <p
              data-mh-thematic-sub
              className="mt-4 max-w-xl font-inter text-base leading-relaxed text-text-mid md:text-lg"
            >
              Fourteen interconnected programs, one goal: protection and dignity for
              displaced communities.
            </p>
          </div>
          <div data-mh-thematic-sub className="shrink-0">
            <Link href="/programs" className="link-cta text-navy">
              View all programs →
            </Link>
          </div>
        </div>
        <div
          ref={grid}
          className="mt-10 grid min-w-0 grid-cols-1 gap-7 sm:mt-12 md:grid-cols-2 md:gap-8"
        >
          {displayed.map((area) => (
            <div key={area.slug} data-card>
              <ThematicCard area={area} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
