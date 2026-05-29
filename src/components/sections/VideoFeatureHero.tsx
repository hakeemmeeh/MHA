"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { mediaHubIntro, mediaVideos } from "@/lib/content";

export function VideoFeatureHero() {
  const featured = mediaVideos.find((v) => v.featured) ?? mediaVideos[0];

  return (
    <section className="relative min-h-[56vh] overflow-hidden bg-navy-dark lg:min-h-[64vh]">
      <Image
        src={featured.posterImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-dark/85 via-navy-dark/45 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[56vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[64vh]">
        <p className="font-inter text-xs font-semibold uppercase tracking-widest text-green">
          Documentary hub
        </p>
        <h1 className="mt-4 max-w-2xl font-playfair text-4xl font-bold text-white md:text-5xl">
          {mediaHubIntro.title}
        </h1>
        <p className="mt-5 max-w-xl font-inter text-lg text-white/80">{mediaHubIntro.subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#watch"
            className="inline-flex items-center gap-2 rounded-full bg-green px-7 py-3 font-inter text-sm font-semibold text-white transition hover:bg-green-dark"
          >
            <Play className="h-5 w-5 fill-current" aria-hidden />
            Watch featured film
          </a>
          <Link
            href="/stories"
            className="inline-flex rounded-full border-2 border-white/50 px-7 py-3 font-inter text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Field stories
          </Link>
        </div>
      </div>
    </section>
  );
}
