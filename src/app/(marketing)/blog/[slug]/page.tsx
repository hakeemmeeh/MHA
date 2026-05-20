import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { marketingPageMetadata } from "@/lib/social-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return marketingPageMetadata({
    title: post.title,
    description: post.excerpt,
    pathname: `/blog/${slug}`,
    image: post.image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]}
      />
      <article className="bg-cream pb-20">
        <div className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden px-4 pt-10 sm:px-6">
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-md">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              className="object-cover photo-brighten"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
          <p className="font-inter text-xs font-semibold uppercase tracking-wide text-green">
            {date}
            {post.author ? ` · ${post.author}` : ""}
          </p>
          <h1 className="mt-3 font-playfair text-3xl font-bold text-navy md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-8 space-y-4 font-inter text-base leading-relaxed text-text-mid">
            {post.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
          <p className="mt-10 border-t border-border pt-8">
            <Link href="/blog" className="font-inter text-sm font-semibold text-navy hover:underline">
              ← All insights
            </Link>
            {" · "}
            <Link href="/stories" className="font-inter text-sm font-semibold text-green hover:text-green-dark">
              Field stories
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
