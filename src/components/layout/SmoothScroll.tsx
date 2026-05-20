"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/components/layout/lenis-context";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const tickerFn = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const instance = new Lenis({
      /** Shorter than default (1.2) — wheel should track input, not lag behind it. */
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      /** Native touch momentum feels lighter than smoothed touch on phones/tablets. */
      smoothWheel: !coarsePointer,
    });

    startTransition(() => {
      setLenis(instance);
    });

    instance.on("scroll", ScrollTrigger.update);

    const fn = (time: number) => {
      instance.raf(time * 1000);
    };
    tickerFn.current = fn;
    gsap.ticker.add(fn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      startTransition(() => {
        setLenis(null);
      });
      if (tickerFn.current) {
        gsap.ticker.remove(tickerFn.current);
      }
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
