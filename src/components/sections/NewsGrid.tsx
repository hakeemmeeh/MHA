import Image from "next/image";
import Link from "next/link";
import { ContentWayfinder } from "@/components/ui/ContentWayfinder";
import { newsItems } from "@/lib/content";

const categoryLabels = {
  field: "Field update",
  partnership: "Partnership",
  programme: "Programme",
  announcement: "Announcement",
} as const;

const FALLBACK_IMAGE = "/images/stories/listening-posts-leer.jpg";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function cardImage(src?: string) {
  if (!src || src.endsWith(".svg")) return FALLBACK_IMAGE;
  return src;
}

export function NewsGrid() {
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="section-y bg-cream">
      <div className="page-x mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-12">
          <div>
            <p className="max-w-2xl font-inter text-base leading-relaxed text-text-mid">
              <strong className="text-navy">News</strong> is for brief organizational
              announcements — site updates, new tools, and partnership notes. Programme work in
              communities is reported on{" "}
              <Link href="/stories" className="font-semibold text-green hover:text-green-dark">
                Field stories
              </Link>{" "}
              and the{" "}
              <Link href="/impact#project-log" className="font-semibold text-green hover:text-green-dark">
                activity log
              </Link>
              .
            </p>
            <ul className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((item) => {
                const image = cardImage(item.image);
                return (
                  <li key={item.slug}>
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
                      <div className="relative aspect-[16/10] bg-navy-light">
                        <Image
                          src={image}
                          alt=""
                          fill
                          className="object-cover photo-brighten photo-focal"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <p className="font-inter text-xs font-semibold uppercase tracking-wide text-green">
                          {categoryLabels[item.category]} · {formatDate(item.date)}
                        </p>
                        <h2 className="mt-2 font-playfair text-xl font-normal text-navy">
                          <Link href={`/news/${item.slug}`} className="hover:text-navy-mid">
                            {item.title}
                          </Link>
                        </h2>
                        <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-text-mid">
                          {item.excerpt}
                        </p>
                        <Link
                          href={`/news/${item.slug}`}
                          className="link-cta mt-5 w-fit text-xs"
                        >
                          Read announcement →
                        </Link>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
          <ContentWayfinder current="news" className="lg:sticky lg:top-28" />
        </div>
      </div>
    </section>
  );
}
