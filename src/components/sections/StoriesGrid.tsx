"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContentWayfinder } from "@/components/ui/ContentWayfinder";
import { fieldStories, thematicAreas } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const ALL = "all";

export function StoriesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>(ALL);
  const options = useMemo(
    () => [{ slug: ALL, title: "All areas" }, ...thematicAreas.map((t) => ({ slug: t.slug, title: t.title }))],
    [],
  );
  const filtered = useMemo(
    () =>
      filter === ALL ? fieldStories : fieldStories.filter((s) => s.thematicSlug === filter),
    [filter],
  );

  const filteredSlugs = useMemo(() => filtered.map((s) => s.slug).join(), [filtered]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>(":scope > article");
    if (!cards.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, { y: 0, opacity: 1 });
      cards.forEach((card) => {
        const heading = card.querySelector<HTMLElement>("h2");
        if (heading) gsap.set(heading, { y: 0, opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const heading = card.querySelector<HTMLElement>("h2");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
        tl.fromTo(
          card,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.72, ease: "power2.out" },
          0,
        );
        if (heading) {
          tl.fromTo(
            heading,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
            0.14,
          );
        }
      });
    }, grid);

    return () => ctx.revert();
  }, [filteredSlugs]);

  return (
    <>
      {/**
       * Filter row: `data-marketing-reveal` must be a direct child of `MarketingScrollReveal`
       * so ScrollTrigger staggers the chips when that row enters the viewport.
       * Story cards: each `article` uses a small timeline (card fade-up, then `h2` fade-up)
       * with its own ScrollTrigger so rows reveal as you scroll.
       */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <ContentWayfinder current="stories" className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1" />
        <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1 lg:row-span-2">
      <div
        data-marketing-reveal
        className="flex flex-wrap gap-2 pb-8 sm:pb-10"
      >
        {options.map((o) => (
          <button
            key={o.slug}
            type="button"
            onClick={() => setFilter(o.slug)}
            className={`rounded-full px-4 py-2 font-inter text-sm font-medium transition ${
              filter === o.slug
                ? "bg-navy text-white"
                : "bg-white text-navy ring-1 ring-border hover:bg-navy-light"
            }`}
          >
            {o.title}
          </button>
        ))}
      </div>
      <div
        ref={gridRef}
        className="grid gap-8 pb-12 sm:gap-10 sm:pb-16 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
      >
        {filtered.map((s) => (
          <article
            key={s.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
          >
            <Link href={`/stories/${s.slug}`} className="relative aspect-[16/10]">
              <Image
                src={s.image}
                alt={s.title}
                fill
                quality={85}
                className="object-cover photo-brighten photo-focal"
                sizes="(max-width:768px) 100vw, 33vw"
              />
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <p className="font-inter text-xs font-semibold uppercase tracking-wide text-gold">
                {s.location}
              </p>
              <h2 className="mt-2 font-playfair text-xl font-bold text-navy">
                <Link href={`/stories/${s.slug}`} className="hover:underline">
                  {s.title}
                </Link>
              </h2>
              <p className="mt-3 line-clamp-3 flex-1 font-inter text-sm text-text-mid">
                {s.excerpt}
              </p>
              <Link
                href={`/stories/${s.slug}`}
                className="mt-4 font-inter text-sm font-semibold text-green"
              >
                Read story →
              </Link>
            </div>
          </article>
        ))}
        {filtered.length === 0 ? (
          <p className="col-span-full py-12 text-center font-inter text-text-muted">
            No stories in this thematic area yet.
          </p>
        ) : null}
      </div>
        </div>
      </div>
    </>
  );
}
