"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const tickerFn = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      /** Shorter than default (1.2) so scroll — especially scrubbed hero motion — feels responsive, not “behind” the wheel. */
      duration: 0.55,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const fn = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickerFn.current = fn;
    gsap.ticker.add(fn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (tickerFn.current) {
        gsap.ticker.remove(tickerFn.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
