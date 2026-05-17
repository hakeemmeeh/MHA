"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { fieldStories, thematicAreas } from "@/lib/content";

const ALL = "all";

export function StoriesGrid() {
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

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
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
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <article key={s.slug} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <Link href={`/stories/${s.slug}`} className="relative aspect-[16/10]">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
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
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center font-inter text-text-muted">
          No stories in this thematic area yet.
        </p>
      )}
    </div>
  );
}
