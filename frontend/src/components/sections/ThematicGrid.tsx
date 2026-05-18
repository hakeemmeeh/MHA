"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { thematicAreas, thematicCrossCutting, thematicSectionIntro } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ThematicCard } from "@/components/ui/ThematicCard";

gsap.registerPlugin(ScrollTrigger);

export function ThematicGrid() {
  const grid = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const cards = grid.current?.querySelectorAll("[data-card]");
    if (!cards?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  const [first, second, ...restAll] = thematicAreas;
  const rest = restAll.slice(0, 4);

  return (
    <section id="programs" className="bg-navy-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionEyebrow>Our Work</SectionEyebrow>
            <h2 className="font-playfair text-3xl font-bold text-text-dark md:text-[44px] md:leading-[1.15]">
              Thematic Areas of Focus
            </h2>
            <p className="mt-4 max-w-2xl font-inter text-text-mid">
              {thematicSectionIntro}
            </p>
            <p className="mt-3 max-w-3xl font-inter text-sm leading-relaxed text-text-muted md:text-[15px]">
              {thematicCrossCutting}
            </p>
            <p className="mt-2 max-w-3xl font-inter text-xs text-text-muted md:text-[13px]">
              This page highlights six areas;{" "}
              <Link href="/programs" className="font-semibold text-navy underline-offset-2 hover:underline">
                all fourteen programs
              </Link>{" "}
              are listed on the programs page.
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex shrink-0 items-center gap-1 font-inter text-sm font-semibold text-navy underline-offset-4 hover:text-green hover:underline"
          >
            View all programs →
          </Link>
        </div>
        <div
          ref={grid}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {[first, second].map((area) => (
            <div key={area.slug} data-card className="md:col-span-2">
              <ThematicCard area={area} featured />
            </div>
          ))}
          {rest.map((area) => (
            <div key={area.slug} data-card>
              <ThematicCard area={area} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
