"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { hero } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        if (bg.current) gsap.set(bg.current, { scale: 1.08, yPercent: 0, force3D: true });
        if (overlay.current) gsap.set(overlay.current, { opacity: 1 });
        const reducedTargets = content.current?.querySelectorAll(
          "[data-hero-eyebrow],[data-hero-line],[data-hero-sub],[data-hero-ctas]",
        );
        if (reducedTargets?.length) gsap.set(reducedTargets, { y: 0, opacity: 1 });
        return;
      }

      if (bg.current) {
        gsap.fromTo(
          bg.current,
          { scale: 1.18 },
          { scale: 1.08, duration: 1.75, ease: "power2.out", force3D: true },
        );
      }
      if (overlay.current) {
        gsap.fromTo(
          overlay.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.95, ease: "power1.out" },
        );
      }
      const eyebrow = content.current?.querySelector("[data-hero-eyebrow]");
      const titleLines = content.current?.querySelectorAll("[data-hero-line]");
      const subtext = content.current?.querySelector("[data-hero-sub]");
      const ctas = content.current?.querySelector("[data-hero-ctas]");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.62 },
          0.48,
        );
      }
      if (titleLines?.length) {
        tl.fromTo(
          titleLines,
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 1.08, stagger: 0.18, ease: "power3.out" },
          0.78,
        );
      }
      if (subtext) {
        tl.fromTo(
          subtext,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72 },
          1.12,
        );
      }
      if (ctas) {
        tl.fromTo(
          ctas,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.62 },
          1.38,
        );
      }
      if (bg.current && scope) {
        /** Slight scrub smoothing + GPU layer: avoids 1:1 scrub jitter with Lenis while staying subtle. */
        gsap.to(bg.current, {
          yPercent: -3,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom top",
            scrub: 0.22,
          },
        });
      }
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-mha-scroll-hero
      className="relative -mt-[72px] min-h-[100dvh] w-full overflow-hidden bg-navy-dark pt-[72px] lg:-mt-[120px] lg:pt-[120px]"
    >
      <div
        ref={bg}
        className="absolute inset-x-0 top-0 min-h-[118%] w-full transform-gpu will-change-transform"
      >
        <Image
          src={hero.image}
          alt="Community engagement in South Sudan — MHA field presence"
          fill
          priority
          quality={85}
          className="size-full min-h-full min-w-full object-cover object-center photo-brighten"
          sizes="100vw"
        />
      </div>
      <div
        ref={overlay}
        className="absolute inset-0 bg-gradient-to-b from-navy-dark/38 to-navy-dark/55 opacity-0"
        aria-hidden
      />
      <div
        ref={content}
        className="relative z-10 mx-auto flex min-h-[calc(100dvh-72px)] max-w-5xl flex-col items-center justify-center px-4 pb-16 text-center sm:px-6 lg:min-h-[calc(100dvh-120px)]"
      >
        <p data-hero-eyebrow className="eyebrow justify-center text-green">
          {hero.eyebrow}
        </p>
        <h1 className="font-bodoni-display text-4xl font-bold leading-tight text-white md:text-6xl md:leading-[1.1]">
          {hero.titleLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p
          data-hero-sub
          className="mt-6 max-w-xl font-inter text-base text-white/80 md:text-lg"
        >
          {hero.subtext}
        </p>
        <div
          data-hero-ctas
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/get-involved"
            className="inline-flex rounded-full bg-green px-8 py-3 font-inter text-sm font-semibold text-white transition hover:bg-green-dark"
          >
            Get Involved
          </Link>
          <Link
            href="/programs"
            className="inline-flex rounded-full border-2 border-white px-8 py-3 font-inter text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Our Programs
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/50">
          <span className="font-inter text-xs uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce-scroll" aria-hidden />
        </div>
      </div>
    </section>
  );
}
