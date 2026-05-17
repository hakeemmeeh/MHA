import Image from "next/image";
import Link from "next/link";
import { fieldStories, thematicAreas } from "@/lib/content";
import { getNextBySlugCircular } from "@/lib/editorialNav";

/** “Next story” strip at the end of a field story (Phase 4). */
export function EditorialContinueStripStory({ currentSlug }: { currentSlug: string }) {
  const next = getNextBySlugCircular(fieldStories, currentSlug);
  if (!next) return null;

  return (
    <section className="border-t-2 border-gold/50 bg-navy-light py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-inter text-xs font-bold uppercase tracking-widest text-navy">
          Continue reading
        </p>
        <Link
          href={`/stories/${next.slug}`}
          className="group mt-6 flex flex-col gap-4 rounded-2xl border-l-4 border-gold bg-white p-5 shadow-md transition hover:border-green sm:flex-row sm:items-stretch"
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-auto sm:h-28 sm:w-40">
            <Image
              src={next.image}
              alt=""
              fill
              role="presentation"
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p className="font-playfair text-lg font-semibold text-navy group-hover:underline md:text-xl">
              {next.title}
            </p>
            <p className="mt-2 line-clamp-2 font-inter text-sm text-text-mid">{next.excerpt}</p>
            <span className="mt-3 font-inter text-sm font-semibold text-green transition group-hover:translate-x-1">
              Next story →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/** “Next program” strip at the end of a program detail page (Phase 4). */
export function EditorialContinueStripProgram({ currentSlug }: { currentSlug: string }) {
  const next = getNextBySlugCircular(thematicAreas, currentSlug);
  if (!next) return null;

  return (
    <section className="border-t-2 border-gold/50 bg-navy-light py-16">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-inter text-xs font-bold uppercase tracking-widest text-navy">
          Explore another program
        </p>
        <Link
          href={`/programs/${next.slug}`}
          className="group mt-6 flex flex-col gap-4 rounded-2xl border-l-4 border-gold bg-white p-5 shadow-md transition hover:border-green sm:flex-row sm:items-stretch"
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl sm:aspect-auto sm:h-28 sm:w-40">
            <Image
              src={next.image}
              alt=""
              fill
              role="presentation"
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <p className="font-playfair text-lg font-semibold text-navy group-hover:underline md:text-xl">
              {next.title}
            </p>
            <p className="mt-2 line-clamp-2 font-inter text-sm text-text-mid">{next.shortDesc}</p>
            <span className="mt-3 font-inter text-sm font-semibold text-green transition group-hover:translate-x-1">
              Next program →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
