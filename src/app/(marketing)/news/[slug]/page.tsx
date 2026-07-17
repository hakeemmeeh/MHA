import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { newsItems } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return {};
  return marketingPageMetadata({
    title: item.title,
    description: item.excerpt,
    pathname: `/news/${slug}`,
    image: item.image,
    type: "article",
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) notFound();

  const date = new Date(item.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: item.title, path: `/news/${slug}` },
        ]}
      />
      <article className="bg-cream pb-20">
        {item.image && (
          <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden px-4 pt-10 sm:px-6">
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-md">
              <Image
                src={item.image}
                alt=""
                fill
                priority
                className="object-cover photo-brighten"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        )}
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
          <p className="font-inter text-xs font-semibold uppercase tracking-wide text-green">
            {date}
          </p>
          <h1 className="mt-3 font-playfair text-3xl font-normal text-navy md:text-4xl">
            {item.title}
          </h1>
          <div className="mt-8 space-y-4 font-inter text-base leading-relaxed text-text-mid">
            {item.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <p className="mt-10 border-t border-border pt-8">
            <Link href="/stories" className="font-inter text-sm font-semibold text-green hover:text-green-dark">
              Field stories →
            </Link>
            <span className="mx-2 text-text-muted">·</span>
            <Link href="/news" className="font-inter text-sm font-semibold text-navy hover:underline">
              ← All news
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
