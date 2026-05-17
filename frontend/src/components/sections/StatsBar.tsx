"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function StatsBar() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>("[data-stat]");
    if (!els?.length) return;
    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        const target = parseInt(el.dataset.target || "0", 10);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            delay: i * 0.1,
            ease: "power1.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-navy py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-0 lg:px-6">
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
