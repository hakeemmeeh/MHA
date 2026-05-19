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
    <section ref={root} id="impact-stats" className="bg-navy py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:gap-8 sm:px-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-0 lg:px-8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center font-playfair lg:border-r lg:border-white/15 lg:px-4 ${i === stats.length - 1 ? "lg:border-r-0" : ""}`}
          >
            <div className="text-4xl font-bold text-white">
              <span data-stat data-target={s.value}>
                0
              </span>
              {s.suffix ? (
                <span className="text-green">{s.suffix}</span>
              ) : null}
            </div>
            <p className="mt-1 font-inter text-sm text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
