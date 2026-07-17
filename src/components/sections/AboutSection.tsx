"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
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
        if (imgRef.current) {
          gsap.set(imgRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          });
        }
        const items = textRef.current?.querySelectorAll("[data-about-item]");
        if (items?.length) gsap.set(items, { y: 0, opacity: 1 });
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
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="section-y bg-cream">
      <div className="page-x mx-auto grid min-w-0 max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div
            ref={imgRef}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[3/4]"
          >
            <Image
              src={aboutImg}
              alt="MHA field team supporting displaced communities in South Sudan"
              fill
              quality={85}
              sizes="(max-width:1024px) 100vw, min(640px, 50vw)"
              className="object-cover photo-brighten photo-focal"
            />
            <Link
              href="/media"
              aria-label="Watch how MHA works — film and field media"
              className="group/play absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-green text-white shadow-xl ring-8 ring-white/25 transition duration-300 group-hover/play:scale-110 group-hover/play:bg-green-dark sm:h-20 sm:w-20">
                <Play
                  className="h-6 w-6 translate-x-0.5 fill-current sm:h-7 sm:w-7"
                  aria-hidden
                />
              </span>
            </Link>
          </div>
          <div className="absolute -bottom-5 -right-3 aspect-[4/3] w-32 overflow-hidden rounded-xl border-4 border-cream shadow-xl sm:-right-5 sm:w-44">
            <Image
              src="/images/programs/community-engagement.jpg"
              alt="Community engagement session with MHA facilitators"
              fill
              quality={85}
              sizes="176px"
              className="object-cover photo-brighten"
            />
          </div>
        </div>
        <div ref={textRef} className="min-w-0 max-w-prose lg:max-w-none">
          <div data-about-item>
            <SectionEyebrow>About MHA</SectionEyebrow>
          </div>
          <h2 data-about-item className="section-title text-text-dark">
            {aboutPreview.headline}
          </h2>
          <p
            data-about-item
            className="mt-5 font-inter text-base leading-relaxed text-text-mid md:text-lg"
          >
            {aboutPreview.paragraphs[0]}
          </p>
          <Link data-about-item href="/about" className="link-cta mt-8 text-navy">
            Read our full story →
          </Link>
        </div>
      </div>
    </section>
  );
}
