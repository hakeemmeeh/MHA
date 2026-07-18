"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { mediaVideos } from "@/lib/content";
import type { MediaVideo } from "@/types";
import { cn } from "@/lib/utils";

function VideoEmbed({ video }: { video: MediaVideo }) {
  if (!video.youtubeId) {
    return (
      <div className="relative flex aspect-video items-center justify-center bg-navy-dark">
        <Image
          src={video.posterImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
        <div className="relative z-10 px-6 text-center">
          <span className="inline-flex rounded-full bg-white/15 p-4 text-white">
            <Play className="h-10 w-10" aria-hidden />
          </span>
          <p className="mt-4 font-inter text-sm font-semibold text-white">
            Video coming soon
          </p>
          <p className="mt-1 font-inter text-xs text-white/60">
            Footage will be published here when available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <iframe
        title={video.title}
        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="size-full rounded-b-2xl"
      />
    </div>
  );
}

export function MediaVideoHub({ videos }: { videos?: MediaVideo[] }) {
  const data = videos ?? mediaVideos;
  const featured = data.find((v) => v.featured) ?? data[0];
  const rest = data.filter((v) => v.slug !== featured?.slug);
  const [selected, setSelected] = useState<MediaVideo>(featured);

  return (
    <section className="bg-cream pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
          <VideoEmbed video={selected} />
          <div className="border-t border-border p-6 sm:p-8">
            <p className="font-inter text-xs font-semibold uppercase tracking-wide text-green">
              Now playing
              {selected.durationLabel ? ` · ${selected.durationLabel}` : ""}
            </p>
            <h2 className="mt-2 font-playfair text-2xl font-bold text-navy">{selected.title}</h2>
            {selected.location && (
              <p className="mt-1 font-inter text-sm text-text-muted">{selected.location}</p>
            )}
            <p className="mt-3 font-inter text-text-mid">{selected.description}</p>
          </div>
        </div>

        <h3 className="mt-14 font-playfair text-2xl font-bold text-navy">More from the field</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video) => (
            <li key={video.slug}>
              <button
                type="button"
                onClick={() => setSelected(video)}
                className={cn(
                  "group w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:shadow-md",
                  selected.slug === video.slug
                    ? "border-green ring-2 ring-green/30"
                    : "border-border",
                )}
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.posterImage}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-transparent transition group-hover:bg-navy-dark/15">
                    <span className="rounded-full bg-white/90 p-3 text-navy">
                      <Play className="h-6 w-6" aria-hidden />
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-inter text-sm font-semibold text-navy">{video.title}</p>
                  {video.durationLabel && (
                    <p className="mt-1 font-inter text-xs text-text-muted">
                      {video.durationLabel}
                    </p>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
