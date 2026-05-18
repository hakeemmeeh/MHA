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
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: imgRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
      const items = textRef.current?.querySelectorAll("[data-about-item]");
      if (items?.length) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          },
        );
      }
      const checks = root.current?.querySelectorAll("[data-check]");
      if (checks?.length) {
        gsap.fromTo(
          checks,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: checks[0],
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div ref={imgRef} className="relative overflow-hidden rounded-2xl shadow-2xl">
          <Image
            src={aboutImg}
            alt="MHA field team supporting displaced communities in South Sudan"
            width={900}
            height={640}
            quality={92}
            className="photo-brighten photo-focal h-auto w-full object-cover"
          />
          <div className="absolute bottom-4 right-4 rounded-2xl bg-navy p-4 text-white shadow-lg">
            <p className="font-playfair text-2xl font-bold">Est. 2017</p>
            <p className="font-inter text-sm text-white/60">South Sudan</p>
          </div>
        </div>
        <div ref={textRef} className="max-w-prose lg:max-w-none">
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
