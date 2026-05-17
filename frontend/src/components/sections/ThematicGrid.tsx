"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { thematicAreas } from "@/lib/content";
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

  const [first, second, ...rest] = thematicAreas;

  return (
    <section className="bg-navy-light py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>Our Work</SectionEyebrow>
        <h2 className="font-playfair text-3xl font-bold text-text-dark md:text-[44px] md:leading-[1.15]">
          Thematic Areas of Focus
        </h2>
        <p className="mt-4 max-w-2xl font-inter text-text-mid">
          MHA operates across 12 interconnected thematic areas — from frontline
          protection to youth empowerment.
        </p>
        <div
          ref={grid}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {[first, second].map((area) => (
            <div key={area.slug} data-card>
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
