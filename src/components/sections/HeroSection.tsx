"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { fieldStories, hero } from "@/lib/content";
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
    const ctaButtons = copy.querySelectorAll<HTMLElement>("[data-hero-cta]");
    const mainImage = scope.querySelector<HTMLElement>("[data-hero-bento-main]");
    const storyImage = scope.querySelector<HTMLElement>("[data-hero-bento-story]");

    if (reduceMotion) {
      const textEls = [eyebrow, ...titleLines, subtext, ...ctaButtons].filter(Boolean);
      gsap.set(textEls, { y: 0, opacity: 1, yPercent: 0 });
      if (mainImage) gsap.set(mainImage, { opacity: 1, x: 0, y: 0 });
      if (storyImage) gsap.set(storyImage, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (mainImage) gsap.set(mainImage, { opacity: 0, x: 72 });
      if (storyImage) gsap.set(storyImage, { opacity: 0, y: 32 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (mainImage) {
        tl.fromTo(
          mainImage,
          { opacity: 0, x: 72 },
          { opacity: 1, x: 0, duration: 1.15, ease: "power3.out" },
          0.12,
        );
      }

      if (storyImage) {
        tl.fromTo(
          storyImage,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.92, ease: "power3.out" },
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

      if (ctaButtons.length) {
        gsap.set(ctaButtons, { y: 22, opacity: 0 });
        tl.fromTo(
          ctaButtons,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.58, stagger: 0.14, ease: "power3.out" },
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
        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-5 lg:min-h-[min(72vh,720px)]">
          <div
            ref={copyCol}
            className="flex flex-col gap-5 lg:col-span-5 lg:row-span-2 lg:justify-center lg:gap-6 lg:pr-2"
          >
            <div className="space-y-4">
              <p data-hero-eyebrow className="opacity-0">
                <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
              </p>
              <h1 className="font-playfair text-3xl font-bold leading-tight text-text-dark md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
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
            </div>

            <p
              data-hero-sub
              className="max-w-lg font-inter text-base text-text-mid opacity-0 md:text-lg lg:max-w-md"
            >
              {hero.subtext}
            </p>

            <div data-hero-ctas className="flex flex-wrap gap-3">
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

          <div
            data-hero-bento-main
            className="relative min-h-[min(52vw,280px)] overflow-hidden rounded-2xl opacity-0 shadow-md lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:min-h-0"
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
            data-hero-bento-story
            className="group relative min-h-[180px] overflow-hidden rounded-2xl opacity-0 shadow-sm transition hover:shadow-md sm:min-h-[200px] lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:min-h-0"
          >
            <Image
              src={featuredStory.image}
              alt={featuredStory.title}
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-dark/75 via-navy-dark/20 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-4 left-4 right-4 font-inter text-sm font-semibold text-white">
              {featuredStory.location}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
