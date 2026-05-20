"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

export function CTABand() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const section = root.current;
    const left = section?.querySelectorAll("[data-cta-l]");
    const right = section?.querySelectorAll("[data-cta-r]");
    if (!section || (!left?.length && !right?.length)) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      if (left?.length) {
        tl.fromTo(
          left,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, stagger: 0.14, ease: "power3.out" },
          0,
        );
      }
      if (right?.length) {
        tl.fromTo(
          right,
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.72, stagger: 0.2, ease: "power3.out" },
          "+=0.35",
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="take-action" className="relative overflow-hidden bg-navy-dark py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-white/5"
        aria-hidden
      />
      <div className="relative mx-auto grid min-w-0 max-w-7xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="min-w-0">
          <div data-cta-l>
            <SectionEyebrow className="text-green [&::before]:bg-green">Take Action</SectionEyebrow>
          </div>
          <h2
            data-cta-l
            className="font-playfair text-3xl font-bold text-white md:text-4xl"
          >
            Join Us in Safeguarding Displaced Communities
          </h2>
          <p data-cta-l className="mt-4 max-w-lg font-inter text-white/60">
            Whether you&apos;re a donor, partner, or volunteer — your contribution can
            change lives.
          </p>
        </div>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <div data-cta-r className="rounded-3xl bg-green p-6">
            <span className="inline-flex rounded-xl bg-white/20 p-3 text-white">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <p className="mt-4 font-inter text-sm text-white/80">Ready to help?</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/donate"
                className="inline-flex justify-center rounded-full bg-white px-6 py-3 font-inter font-bold text-green transition hover:bg-cream"
              >
                Donate
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex justify-center rounded-full border border-white/40 px-6 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Partner or volunteer
              </Link>
            </div>
          </div>
          <div
            data-cta-r
            className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
          >
            <span className="inline-flex rounded-xl bg-green p-3 text-white">
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <p className="mt-4 font-inter text-sm text-white/60">Call Us</p>
            <p className="font-playfair text-xl font-bold text-white">{site.phone}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
