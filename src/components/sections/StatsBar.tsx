"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function StatsBar() {
  const root = useRef<HTMLElement>(null);
  const featuredStats = stats.filter((stat) =>
    [
      "Full-Time Staff",
      "Field-Based Workforce",
      "Counties Covered",
      "Major Donors & Partners",
      "Thematic Areas",
    ].includes(stat.label),
  );

  useLayoutEffect(() => {
    const section = root.current;
    const els = section?.querySelectorAll<HTMLElement>("[data-stat]");
    if (!section || !els?.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        el.textContent = String(target);
      });
      return;
    }
    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const target = parseInt(el.dataset.target || "0", 10);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2.35,
            delay: i * 0.14,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="impact-stats"
      className="scroll-mt-20 bg-navy py-8 sm:py-10"
    >
      <div className="page-x mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5 lg:gap-0">
        {featuredStats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center font-playfair lg:border-r lg:border-white/15 lg:px-5 ${i === featuredStats.length - 1 ? "lg:border-r-0" : ""}`}
          >
            <div className="text-3xl font-light leading-none text-white sm:text-4xl">
              <span data-stat data-target={s.value}>
                0
              </span>
              {s.suffix ? (
                <span className="text-[0.6em] text-gold">{s.suffix}</span>
              ) : null}
            </div>
            <p className="mt-2 font-inter text-xs text-white/65 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
