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

      const titleLineInners = titlePrep.lineInners;
      const lineAxis = getLineRevealAxis(h1);

      ctx = gsap.context(() => {
        if (image && maskRef.current && imageLayerRef.current) {
          playEditorialHeroReveal({
            maskEl: maskRef.current,
            imageLayerEl: imageLayerRef.current,
            overlayEl: overlayRef.current,
            lineInners: titleLineInners,
            secondaryLineInners: subtitlePrep?.lineInners,
            lineSecondaryDelay: 0.38,
            extraFadeEls: [],
            lineAxis,
          });
        } else {
          playEditorialTextReveal({
            lineInners: titleLineInners,
            secondaryLineInners: subtitlePrep?.lineInners,
            lineSecondaryDelay: 0.38,
            lineAxis,
          });
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
      data-mha-scroll-hero
      className="relative min-h-[42vh] overflow-hidden bg-navy-dark pb-16 lg:min-h-[48vh]"
    >
      {image && showMaskedImage && (
        <>
          <div
            ref={maskRef}
            className="editorial-hero-mask-init absolute inset-0 overflow-hidden"
          >
            <div
              ref={imageLayerRef}
              className="absolute inset-x-0 top-0 min-h-[118%] w-full scale-[1.18] transform-gpu will-change-transform"
            >
              <Image
                src={image}
                alt={`${title} — header image`}
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/25 to-transparent"
            aria-hidden
          />
        </>
      )}
      {image && !showMaskedImage && (
        <div className="absolute inset-x-0 top-0 min-h-[118%] w-full">
          <Image
            src={image}
            alt={`${title} — header image`}
            fill
            priority
            quality={85}
            className="size-full min-h-full min-w-full object-cover object-center photo-brighten photo-focal"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-dark/75 via-navy-dark/20 to-transparent"
            aria-hidden
          />
        </div>
      )}
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-dark" />
      )}
      <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-5xl flex-col justify-end px-6 pb-10 pt-28 md:pb-12 md:pt-32 lg:min-h-[48vh]">
        <h1
          ref={animate ? titleRef : undefined}
          className="font-playfair text-4xl font-normal text-white md:text-5xl"
          style={{ fontWeight: 400 }}
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
