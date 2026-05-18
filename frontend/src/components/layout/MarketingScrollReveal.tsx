"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  afterFontsAndLayoutReady,
  attachEditorialScrollReveals,
  freezeEditorialScrollReveals,
} from "@/lib/editorialReveal";

gsap.registerPlugin(ScrollTrigger);

type MarketingScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Softer motion — best for form-heavy columns (Contact, Get Involved quick message). */
  subtle?: boolean;
};

function skipDefaultStagger(el: HTMLElement): boolean {
  return (
    el.hasAttribute("data-editorial-scroll-skip-stagger") ||
    el.hasAttribute("data-editorial-scroll-lines") ||
    el.hasAttribute("data-editorial-scroll-mask")
  );
}

/**
 * Fade-up + stagger direct children of each top-level section/article/reveal block.
 * Also wires Phase 3 opt-in scroll reveals: `[data-editorial-scroll-mask]`,
 * `[data-editorial-scroll-lines]` (see `src/lib/editorialReveal.ts`).
 */
export function MarketingScrollReveal({
  children,
  className,
  subtle = false,
}: MarketingScrollRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const el = root.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      freezeEditorialScrollReveals(el);
      return;
    }

    const y = subtle ? 18 : 30;
    const stagger = subtle ? 0.09 : 0.15;
    const duration = subtle ? 0.62 : 0.86;
    const start = subtle ? "top 88%" : "top 82%";
    const editorialStart = subtle ? "top 90%" : "top 84%";

    let detachEditorial: (() => void) | undefined;
    let ctx: gsap.Context | null = null;

    const cancelFonts = afterFontsAndLayoutReady(() => {
      if (!el.isConnected) return;
      ctx = gsap.context(() => {
        const blocks = el.querySelectorAll(
          ":scope > section, :scope > article, :scope > [data-marketing-reveal]",
        );
        blocks.forEach((block) => {
          const blockEl = block as HTMLElement;
          const kids = Array.from(blockEl.children).filter(
            (c): c is HTMLElement => c instanceof HTMLElement && !skipDefaultStagger(c),
          );
          if (!kids.length) return;

          const headings = Array.from(blockEl.querySelectorAll<HTMLElement>("h1, h2"));
          if (headings.length) {
            gsap.set(headings, { y, opacity: 0 });
          }

          const otherKids = kids.filter((c) => !c.matches("h1,h2"));
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: blockEl,
              start,
              toggleActions: "play none none none",
              once: true,
            },
          });

          if (otherKids.length) {
            tl.fromTo(
              otherKids,
              { y, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration,
                stagger,
                ease: "power2.out",
              },
              0,
            );
          }

          if (headings.length) {
            tl.to(
              headings,
              {
                y: 0,
                opacity: 1,
                duration: duration * 1.05,
                stagger: Math.min(stagger * 1.25, 0.18),
                ease: "power3.out",
              },
              otherKids.length ? "+=0.38" : 0.38,
            );
          }
        });

        detachEditorial = attachEditorialScrollReveals(el, { start: editorialStart });
      }, el);
    });

    return () => {
      cancelFonts();
      ctx?.revert();
      detachEditorial?.();
    };
  }, [subtle]);

  return (
    <div ref={root} className={className ?? "w-full"}>
      {children}
    </div>
  );
}
