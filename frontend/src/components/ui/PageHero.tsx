"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  afterFontsAndLayoutReady,
  getLineRevealAxis,
  playEditorialHeroReveal,
  playEditorialTextReveal,
  prepareLineReveal,
  prefersReducedMotion,
  setEditorialHeroFinalState,
  setEditorialTextFinalState,
} from "@/lib/editorialReveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
  id?: string;
  /** Cinematic intro: masked image + line-based type (Rhye-style editorial). */
  animate?: boolean;
};

export function PageHero({ title, subtitle, image, id, animate = false }: PageHeroProps) {
  const root = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!animate || !root.current) return;

    const rootEl = root.current;
    const reduce = prefersReducedMotion();
    let titlePrep: ReturnType<typeof prepareLineReveal> | null = null;
    let subtitlePrep: ReturnType<typeof prepareLineReveal> | null = null;
    let ctx: gsap.Context | null = null;

    if (reduce) {
      ctx = gsap.context(() => {
        if (image && maskRef.current && imageLayerRef.current) {
          setEditorialHeroFinalState({
            maskEl: maskRef.current,
            imageLayerEl: imageLayerRef.current,
            overlayEl: overlayRef.current,
            lineInners: [],
            extraFadeEls: [],
          });
        } else {
          setEditorialTextFinalState({ lineInners: [], extraFadeEls: [] });
        }
      }, rootEl);
      return () => {
        ctx?.revert();
      };
    }

    const cancelFonts = afterFontsAndLayoutReady(() => {
      if (!rootEl.isConnected) return;
      const h1 = titleRef.current;
      if (!h1) return;

      titlePrep = prepareLineReveal(h1);
      if (!titlePrep) return;
      if (subtitle && subtitleRef.current) {
        subtitlePrep = prepareLineReveal(subtitleRef.current);
      }

      const lineAxis = getLineRevealAxis(h1);
      const lineInners = [...titlePrep.lineInners, ...(subtitlePrep?.lineInners ?? [])];

      ctx = gsap.context(() => {
        if (image && maskRef.current && imageLayerRef.current) {
          playEditorialHeroReveal({
            maskEl: maskRef.current,
            imageLayerEl: imageLayerRef.current,
            overlayEl: overlayRef.current,
            lineInners,
            lineAxis,
          });
        } else {
          playEditorialTextReveal({ lineInners, lineAxis });
        }
      }, rootEl);
    });

    return () => {
      cancelFonts();
      ctx?.revert();
      titlePrep?.restore();
      subtitlePrep?.restore();
    };
  }, [animate, title, subtitle, image]);

  const showMaskedImage = Boolean(animate && image);

  return (
    <section
      ref={root}
      id={id}
      className="relative -mt-[72px] min-h-[42vh] overflow-hidden pt-[72px] pb-16 lg:-mt-[120px] lg:min-h-[48vh] lg:pt-[120px]"
    >
      {image && showMaskedImage && (
        <>
          <div
            ref={maskRef}
            className="editorial-hero-mask-init absolute inset-0 overflow-hidden"
          >
            <div
              ref={imageLayerRef}
              className="absolute inset-0 scale-[1.14] transform-gpu will-change-transform"
            >
              <Image
                src={image}
                alt={`${title} — header image`}
                fill
                priority
                quality={92}
                className="object-cover photo-brighten photo-focal"
                sizes="100vw"
              />
            </div>
          </div>
          <div
            ref={overlayRef}
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-dark/38 to-navy-dark/55",
              animate && "opacity-0",
            )}
            aria-hidden
          />
        </>
      )}
      {image && !showMaskedImage && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={`${title} — header image`}
            fill
            priority
            quality={92}
            className="object-cover photo-brighten photo-focal"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-navy-dark/38 to-navy-dark/55"
            aria-hidden
          />
        </div>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark" />
      )}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col justify-end px-6 pt-16 pb-4 md:pt-24">
        <h1
          ref={animate ? titleRef : undefined}
          className="font-bodoni-display text-4xl font-bold text-white md:text-5xl"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={animate ? subtitleRef : undefined}
            className="mt-4 max-w-2xl font-inter text-lg text-white/75"
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
