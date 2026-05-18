"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  afterFontsAndLayoutReady,
  getLineRevealAxis,
  playEditorialHeroReveal,
  prepareLineReveal,
  prefersReducedMotion,
  setEditorialHeroFinalState,
} from "@/lib/editorialReveal";
import type { FieldStory, ThematicArea } from "@/types";

type StoryPageHeroProps = {
  story: FieldStory;
  thematic?: ThematicArea;
};

export function StoryPageHero({ story, thematic }: StoryPageHeroProps) {
  const root = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const thematicWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rootEl = root.current;
    const mask = maskRef.current;
    const imageLayer = imageLayerRef.current;
    const overlay = overlayRef.current;
    const h1 = titleRef.current;
    if (!rootEl || !mask || !imageLayer || !h1) return;

    const reduce = prefersReducedMotion();
    let titlePrep: ReturnType<typeof prepareLineReveal> | null = null;
    let locPrep: ReturnType<typeof prepareLineReveal> | null = null;
    let ctx: gsap.Context | null = null;

    if (reduce) {
      ctx = gsap.context(() => {
        setEditorialHeroFinalState({
          maskEl: mask,
          imageLayerEl: imageLayer,
          overlayEl: overlay,
          lineInners: [],
          extraFadeEls: [],
        });
      }, rootEl);
      return () => {
        ctx?.revert();
      };
    }

    const cancelFonts = afterFontsAndLayoutReady(() => {
      if (!rootEl.isConnected) return;
      const titleEl = titleRef.current;
      if (!titleEl) return;

      titlePrep = prepareLineReveal(titleEl);
      if (!titlePrep) return;
      if (locationRef.current) {
        locPrep = prepareLineReveal(locationRef.current);
      }

      const titleLineInners = titlePrep.lineInners;
      const extras = thematicWrapRef.current ? [thematicWrapRef.current] : [];
      const lineAxis = getLineRevealAxis(titleEl);

      ctx = gsap.context(() => {
        playEditorialHeroReveal({
          maskEl: mask,
          imageLayerEl: imageLayer,
          overlayEl: overlay,
          lineInners: locPrep?.lineInners ?? titleLineInners,
          secondaryLineInners: locPrep ? titleLineInners : undefined,
          lineSecondaryDelay: 0.38,
          extraFadeEls: extras,
          lineAxis,
        });
      }, rootEl);
    });

    return () => {
      cancelFonts();
      ctx?.revert();
      titlePrep?.restore();
      locPrep?.restore();
    };
  }, [story.title, story.location, thematic?.slug]);

  return (
    <header
      ref={root}
      data-mha-scroll-hero
      className="relative -mt-[72px] min-h-[50vh] overflow-hidden bg-navy-dark pt-[72px] lg:-mt-[120px] lg:pt-[120px]"
    >
      <div
        ref={maskRef}
        className="editorial-hero-mask-init absolute inset-0 overflow-hidden"
      >
        <div
          ref={imageLayerRef}
          className="absolute inset-x-0 top-0 min-h-[118%] w-full scale-[1.18] transform-gpu will-change-transform"
        >
          <Image
            src={story.image}
            alt={story.title}
            fill
            priority
            quality={85}
            className="size-full min-h-full min-w-full object-cover object-center photo-brighten photo-focal"
            sizes="100vw"
          />
        </div>
      </div>
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/58 via-navy-dark/32 to-navy-dark/10 opacity-0"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col justify-end px-6 pb-12 pt-32">
        <p
          ref={locationRef}
          className="font-inter text-xs font-bold uppercase tracking-widest text-gold"
        >
          {story.location}
        </p>
        <h1
          ref={titleRef}
          className="mt-3 font-bodoni-display text-4xl font-bold text-white md:text-5xl"
        >
          {story.title}
        </h1>
        {thematic && (
          <div ref={thematicWrapRef} className="mt-4">
            <Link
              href={`/programs/${thematic.slug}`}
              className="inline-flex w-fit rounded-full bg-white/15 px-4 py-1.5 font-inter text-xs text-white backdrop-blur hover:bg-white/25"
            >
              Related program: {thematic.title}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
