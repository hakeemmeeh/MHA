"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Handshake, ShieldCheck } from "lucide-react";
import { coreValues } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const icons = [ShieldCheck, Handshake, Award];

export function CoreValuesSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const items = root.current?.querySelectorAll("[data-value]");
    if (!items?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="values" className="bg-navy py-16">
      <div className="mx-auto grid max-w-7xl divide-y divide-white/15 px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
        {coreValues.map((v, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <div
              key={v.title}
              data-value
              className="flex flex-col items-center px-6 py-10 text-center md:py-6"
            >
              <span className="rounded-xl bg-white/10 p-3 text-white">
                <Icon className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-4 font-playfair text-xl font-bold text-white">
                {v.title}
              </h3>
              <p className="mt-2 max-w-xs font-inter text-sm text-white/60">{v.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
