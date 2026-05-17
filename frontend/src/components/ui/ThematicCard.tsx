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
  const cardRef = useRef<HTMLAnchorElement>(null);
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
  return (
    <Link
      ref={cardRef}
      href={`/programs/${area.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-navy-dark shadow-lg ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div
          ref={imgMoveRef}
          className="absolute inset-0 h-[118%] w-full -translate-y-[8%] will-change-transform"
        >
          <Image
            src={area.image}
            alt={`${area.title} — MHA program`}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
            sizes={featured ? "(max-width:768px) 100vw, 66vw" : "(max-width:768px) 100vw, 50vw"}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-navy-dark/40 transition group-hover:via-navy-dark/40 group-hover:to-navy-dark/30" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-green/90 px-3 py-1 font-inter text-xs font-semibold text-white">
          <Icon className="h-3.5 w-3.5" aria-hidden />
          Program
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <h3 className="font-playfair text-2xl font-bold text-white md:text-3xl">
            {area.title}
          </h3>
          <p className="mt-2 max-w-xl font-inter text-sm text-white/80">
            {area.shortDesc}
          </p>
          <span className="mt-4 inline-flex font-inter text-sm font-semibold text-green transition group-hover:translate-x-2">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
