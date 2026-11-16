"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ThematicArea } from "@/types";
import { PROGRAM_ICONS } from "@/components/ui/programIcon";
import { initCardImageParallax } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export function ThematicCard({
  area,
  featured,
}: {
  area: ThematicArea;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgMoveRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const imgLayer = imgMoveRef.current;
    if (!card || !imgLayer) return;
    const ctx = gsap.context(() => {
      initCardImageParallax(card, imgLayer, 0.2);
    }, card);
    return () => ctx.revert();
  }, []);

  const Icon = PROGRAM_ICONS[area.icon] ?? PROGRAM_ICONS.shield;
  const illustrative = area.image.startsWith("https://images.unsplash.com/");

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border border-border/80 shadow-sm transition-shadow duration-300 hover:shadow-lg ${featured ? "bg-white" : "bg-navy-dark"}`}
    >
      <Link href={`/programs/${area.slug}`} className="block">
        <div
          className={`relative w-full overflow-hidden ${featured ? "aspect-[16/10] max-h-[260px]" : "aspect-[16/9]"}`}
        >
          <div
            ref={imgMoveRef}
            className="absolute inset-0 h-[118%] w-full -translate-y-[8%] will-change-transform"
          >
            <Image
              src={area.image}
              alt={illustrative ? `Illustrative photo for ${area.title}` : `${area.title} — MHA program`}
              fill
              quality={85}
              className="object-cover photo-brighten photo-focal transition duration-700 ease-out group-hover:scale-105"
              sizes={
                featured
                  ? "(max-width:768px) 100vw, 66vw"
                  : "(max-width:768px) 100vw, 50vw"
              }
            />
          </div>
          {!featured && (
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/25 to-transparent transition group-hover:from-navy-dark/85" />
          )}

          {illustrative && (
            <span className="absolute bottom-3 right-3 rounded bg-navy-dark/80 px-2 py-1 font-inter text-[10px] font-medium text-white">
              Illustrative image
            </span>
          )}

          {!featured && (
            <span className="absolute left-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-green shadow-[0_8px_20px_rgba(13,26,46,0.18)] ring-1 ring-black/[0.04] md:left-5 md:top-5 md:h-14 md:w-14">
              <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.35} aria-hidden />
            </span>
          )}

          {!featured && (
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h3 className="font-playfair text-2xl font-normal text-white md:text-[1.65rem]">
                {area.title}
              </h3>
              <p className="mt-2 line-clamp-2 max-w-xl font-inter text-sm leading-relaxed text-white/75">
                {area.shortDesc}
              </p>
              <span className="link-cta mt-4 text-xs text-green transition group-hover:translate-x-1">
                Explore program →
              </span>
            </div>
          )}
        </div>
        {featured && (
          <div className="px-5 py-5 md:px-6 md:py-6">
            <h3 className="font-playfair text-xl font-normal text-navy md:text-2xl">
              {area.title}
            </h3>
            <p className="mt-2 line-clamp-3 font-inter text-sm leading-relaxed text-text-mid">
              {area.shortDesc}
            </p>
            <span className="link-cta mt-4 text-xs text-green-dark transition group-hover:translate-x-1">
              Learn more →
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}
