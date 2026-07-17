"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function StatsBar() {
  const root = useRef<HTMLElement>(null);

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
      className="scroll-mt-20 bg-navy pb-10 pt-12 sm:pb-12 sm:pt-14 lg:pb-14 lg:pt-16"
    >
      <div className="page-x mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-6 lg:gap-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center font-playfair lg:border-r lg:border-white/15 lg:px-5 ${i === stats.length - 1 ? "lg:border-r-0" : ""}`}
          >
            {/* Light serif numerals with gold suffix — editorial display style */}
            <div className="text-[2.75rem] font-light leading-none text-white md:text-[3.25rem]">
              <span data-stat data-target={s.value}>
                0
              </span>
              {s.suffix ? (
                <span className="text-[0.6em] text-gold">{s.suffix}</span>
              ) : null}
            </div>
            <p className="mt-3 font-inter text-sm text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
