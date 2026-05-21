"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { hero } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const copyCol = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    const copy = copyCol.current;
    if (!scope || !copy) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eyebrow = copy.querySelector<HTMLElement>("[data-hero-eyebrow]");
    const titleLines = copy.querySelectorAll<HTMLElement>("[data-hero-line]");
    const subtext = copy.querySelector<HTMLElement>("[data-hero-sub]");
    const ctaButtons = copy.querySelectorAll<HTMLElement>("[data-hero-cta]");
    const heroImage = scope.querySelector<HTMLElement>("[data-hero-split-image]");

    if (reduceMotion) {
      const textEls = [eyebrow, ...titleLines, subtext, ...ctaButtons].filter(Boolean);
      gsap.set(textEls, { y: 0, opacity: 1, yPercent: 0 });
      if (heroImage) gsap.set(heroImage, { opacity: 1, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (heroImage) gsap.set(heroImage, { opacity: 0, x: 56 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroImage) {
        tl.fromTo(
          heroImage,
          { opacity: 0, x: 56 },
          { opacity: 1, x: 0, duration: 1.1, ease: "power3.out" },
          0.1,
        );
      }

      if (eyebrow) {
        gsap.set(eyebrow, { y: 24, opacity: 0 });
        tl.fromTo(
          eyebrow,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.58 },
          0.35,
        );
      }

      if (titleLines.length) {
        gsap.set(titleLines, { yPercent: 110 });
        tl.fromTo(
          titleLines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.02, stagger: 0.16, ease: "power3.out" },
          0.62,
        );
      }

      if (subtext) {
        gsap.set(subtext, { y: 24, opacity: 0 });
        tl.fromTo(
          subtext,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.68 },
          0.98,
        );
      }

      if (ctaButtons.length) {
        gsap.set(ctaButtons, { y: 20, opacity: 0 });
        tl.fromTo(
          ctaButtons,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.12, ease: "power3.out" },
          1.18,
        );
      }
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-cream" aria-label="Introduction">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:min-h-[min(72vh,720px)] lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:py-0">
        <div
          ref={copyCol}
          className="flex flex-col justify-center lg:px-10 lg:py-20 xl:px-12"
        >
          <p data-hero-eyebrow className="opacity-0">
            <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
          </p>
          <h1 className="mt-4 font-playfair text-3xl font-bold leading-tight text-text-dark md:text-4xl lg:text-[2.75rem] lg:leading-[1.12] xl:text-5xl">
            {hero.titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  data-hero-line
                  className={cn("block", i === 1 && "text-navy-mid")}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-hero-sub
            className="mt-5 max-w-lg font-inter text-base text-text-mid opacity-0 md:text-lg"
          >
            {hero.subtext}
          </p>
          <div data-hero-ctas className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/get-involved"
              data-hero-cta
              className="group inline-flex items-center gap-2 rounded-full bg-green px-7 py-2.5 font-inter text-sm font-semibold text-white opacity-0 shadow-sm transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-green-dark hover:shadow-lg hover:shadow-green/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0"
            >
              Get Involved
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <Link
              href="/programs"
              data-hero-cta
              className="group inline-flex items-center gap-2 rounded-full border-2 border-navy px-7 py-2.5 font-inter text-sm font-semibold text-navy opacity-0 transition-[transform,box-shadow,background-color,color,border-color] duration-300 hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy active:translate-y-0"
            >
              Our Programs
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[min(52vw,320px)] lg:min-h-0">
          <div
            data-hero-split-image
            className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 shadow-xl sm:inset-2 lg:inset-6 lg:left-0"
          >
            <Image
              src={hero.image}
              alt="Community engagement in South Sudan — MHA field presence"
              fill
              priority
              quality={85}
              className="object-cover object-center photo-brighten"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-navy-dark/10" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
