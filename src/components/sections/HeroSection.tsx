"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fieldStories, hero, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const featuredStory = fieldStories[0];

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
    const ctas = copy.querySelector<HTMLElement>("[data-hero-ctas]");
    const mainImage = scope.querySelector<HTMLElement>("[data-hero-bento-main]");
    const secondaryTiles = scope.querySelectorAll<HTMLElement>(
      "[data-hero-bento-tile]:not([data-hero-bento-main])",
    );

    if (reduceMotion) {
      const textEls = [eyebrow, ...titleLines, subtext, ctas].filter(Boolean);
      gsap.set(textEls, { y: 0, opacity: 1, yPercent: 0 });
      if (mainImage) gsap.set(mainImage, { opacity: 1, x: 0, y: 0 });
      if (secondaryTiles.length) gsap.set(secondaryTiles, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (mainImage) gsap.set(mainImage, { opacity: 0, x: 72 });
      if (secondaryTiles.length) gsap.set(secondaryTiles, { opacity: 0, y: 36 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (mainImage) {
        tl.fromTo(
          mainImage,
          { opacity: 0, x: 72 },
          { opacity: 1, x: 0, duration: 1.15, ease: "power3.out" },
          0.12,
        );
      }

      if (secondaryTiles.length) {
        tl.to(
          secondaryTiles,
          { opacity: 1, y: 0, duration: 0.92, stagger: 0.11, ease: "power3.out" },
          0.28,
        );
      }

      if (eyebrow) {
        gsap.set(eyebrow, { y: 28, opacity: 0 });
        tl.fromTo(
          eyebrow,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.62 },
          0.42,
        );
      }

      if (titleLines.length) {
        gsap.set(titleLines, { yPercent: 110 });
        tl.fromTo(
          titleLines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.08, stagger: 0.18, ease: "power3.out" },
          0.72,
        );
      }

      if (subtext) {
        gsap.set(subtext, { y: 28, opacity: 0 });
        tl.fromTo(
          subtext,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72 },
          1.08,
        );
      }

      if (ctas) {
        gsap.set(ctas, { y: 22, opacity: 0 });
        tl.fromTo(
          ctas,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.62 },
          1.32,
        );
      }
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="bg-cream px-4 py-10 sm:px-6 sm:py-14 lg:py-16"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5 lg:min-h-[min(72vh,720px)]">
          <div
            ref={copyCol}
            className="flex flex-col justify-center lg:col-span-5 lg:row-span-2 lg:pr-2"
          >
            <p data-hero-eyebrow className="opacity-0">
              <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
            </p>
            <h1 className="mt-4 font-playfair text-3xl font-bold leading-tight text-text-dark md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
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
              className="mt-4 max-w-lg font-inter text-base text-text-mid opacity-0 md:text-lg"
            >
              {hero.subtext}
            </p>
            <div
              data-hero-ctas
              className="mt-8 flex flex-wrap gap-3 opacity-0"
            >
              <Link
                href="/get-involved"
                className="inline-flex rounded-full bg-green px-7 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-green-dark"
              >
                Get Involved
              </Link>
              <Link
                href="/programs"
                className="inline-flex rounded-full border-2 border-navy px-7 py-2.5 font-inter text-sm font-semibold text-navy transition hover:bg-navy-light"
              >
                Our Programs
              </Link>
            </div>
          </div>

          <div
            data-hero-bento-main
            data-hero-bento-tile
            className="relative min-h-[min(52vw,280px)] overflow-hidden rounded-2xl opacity-0 shadow-md lg:col-span-7 lg:row-span-2 lg:min-h-0"
          >
            <Image
              src={hero.image}
              alt="Community engagement in South Sudan — MHA field presence"
              fill
              priority
              quality={85}
              className="object-cover object-center photo-brighten"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          <Link
            href={`/stories/${featuredStory.slug}`}
            data-hero-bento-tile
            className="group relative min-h-[200px] overflow-hidden rounded-2xl opacity-0 shadow-sm transition hover:shadow-md lg:col-span-4 lg:min-h-[200px]"
          >
            <Image
              src={featuredStory.image}
              alt={featuredStory.title}
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-dark/75 via-navy-dark/20 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-4 left-4 right-4 font-inter text-sm font-semibold text-white">
              {featuredStory.location}
            </p>
          </Link>

          <div
            data-hero-bento-tile
            className="flex flex-col justify-center rounded-2xl bg-navy px-6 py-8 text-white opacity-0 lg:col-span-3"
          >
            <p className="font-playfair text-4xl font-bold">{site.established}</p>
            <p className="mt-1 font-inter text-sm text-white/80">
              Established · NGOs Act 2016
            </p>
            <p className="mt-5 font-inter text-xs font-semibold uppercase tracking-widest text-green">
              8 counties · 14 thematic areas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
