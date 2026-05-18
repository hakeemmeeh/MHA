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
    const left = root.current?.querySelectorAll("[data-cta-l]");
    const right = root.current?.querySelectorAll("[data-cta-r]");
    const ctx = gsap.context(() => {
      if (left?.length) {
        gsap.fromTo(
          left,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }
      if (right?.length) {
        gsap.fromTo(
          right,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="take-action" className="relative overflow-hidden bg-navy-dark py-20">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full bg-white/5"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div data-cta-r className="rounded-3xl bg-green p-6">
            <span className="inline-flex rounded-xl bg-white/20 p-3 text-white">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <p className="mt-4 font-inter text-sm text-white/80">Ready to help?</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full bg-white px-6 py-3 font-inter font-bold text-green transition hover:bg-cream"
            >
              Contact Us Today
            </Link>
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
