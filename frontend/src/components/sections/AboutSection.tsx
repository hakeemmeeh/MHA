"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { aboutPreview } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

const aboutImg = "/images/programs/protection.jpg";

export function AboutSection() {
  const root = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (imgRef.current) gsap.set(imgRef.current, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        const items = textRef.current?.querySelectorAll("[data-about-item]");
        const checks = scope.querySelectorAll("[data-check]");
        if (items?.length) gsap.set(items, { y: 0, opacity: 1 });
        if (checks?.length) gsap.set(checks, { y: 0, opacity: 1 });
        return;
      }
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.38,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imgRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
      const items = textRef.current?.querySelectorAll("[data-about-item]");
      if (items?.length) {
        gsap.fromTo(
          items,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 76%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
      const checks = scope.querySelectorAll("[data-check]");
      if (checks?.length) {
        gsap.fromTo(
          checks,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.58,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: checks[0],
              start: "top 86%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div
          ref={imgRef}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-[3/4]"
        >
          <Image
            src={aboutImg}
            alt="MHA field team supporting displaced communities in South Sudan"
            fill
            quality={85}
            sizes="(max-width:1024px) 100vw, min(640px, 50vw)"
            className="object-cover photo-brighten photo-focal"
          />
          <div className="absolute bottom-3 right-3 rounded-2xl bg-navy p-3 text-white shadow-lg sm:bottom-4 sm:right-4 sm:p-4">
            <p className="font-playfair text-2xl font-bold">Est. 2017</p>
            <p className="font-inter text-sm text-white/60">South Sudan</p>
          </div>
        </div>
        <div ref={textRef} className="min-w-0 max-w-prose lg:max-w-none">
          <div data-about-item>
            <SectionEyebrow>About MHA</SectionEyebrow>
          </div>
          <h2
            data-about-item
            className="font-playfair text-3xl font-bold leading-snug text-text-dark md:text-[44px] md:leading-[1.15]"
          >
            {aboutPreview.headline}
          </h2>
          {aboutPreview.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              data-about-item
              className="mt-4 font-inter text-text-mid"
            >
              {p}
            </p>
          ))}
          <ul className="mt-8 space-y-3">
            {aboutPreview.checklist.map((line) => (
              <li
                key={line}
                data-check
                className="flex items-start gap-3 font-inter text-sm text-text-dark"
              >
                <span className="mt-0.5 inline-flex rounded-full bg-green/15 p-1 text-green">
                  <Check className="h-4 w-4 shrink-0" aria-hidden />
                </span>
                {line}
              </li>
            ))}
          </ul>
          <Link
            data-about-item
            href="/about"
            className="mt-8 inline-block font-inter font-semibold text-navy underline-offset-4 hover:underline"
          >
            Read Our Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}
