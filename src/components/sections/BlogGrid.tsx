import Image from "next/image";
import Link from "next/link";
import { ContentWayfinder } from "@/components/ui/ContentWayfinder";
import { getBlogPosts } from "@/lib/blog";

const categoryLabels = {
  "field-reflection": "Field reflection",
  programme: "Programme",
  partnership: "Partnership",
  editorial: "Editorial",
} as const;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogGrid() {
  const posts = getBlogPosts();

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div>
            <p className="max-w-2xl font-inter text-sm text-text-mid">
              <strong className="text-navy">Insights</strong> includes programme pictorials from
              field reports and editorial commentary. Full narratives with communities&apos; voices live on{" "}
              <Link href="/stories" className="font-semibold text-green hover:text-green-dark">
                Field stories
              </Link>
              ; organizational bulletins are on{" "}
              <Link href="/news" className="font-semibold text-green hover:text-green-dark">
                News
              </Link>
              .
            </p>

            {posts.length === 0 ? (
              <p className="mt-10 rounded-xl border border-border bg-white p-8 font-inter text-text-mid">
                New insight posts will appear here. Browse{" "}
                <Link href="/stories" className="text-navy underline">
                  field stories
                </Link>{" "}
                in the meantime.
              </p>
            ) : (
              <ul className="mt-10 grid gap-8 md:grid-cols-2">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          className="object-cover photo-brighten"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-inter text-xs font-semibold uppercase tracking-wide text-green">
                          {categoryLabels[post.category]} · {formatDate(post.publishedAt)}
                        </p>
                        <h2 className="mt-2 font-playfair text-xl font-bold text-navy">
                          <Link href={`/blog/${post.slug}`} className="hover:text-navy-mid">
                            {post.title}
                          </Link>
                        </h2>
                        <p className="mt-3 flex-1 font-inter text-sm text-text-mid">
                          {post.excerpt}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 font-inter text-sm font-semibold text-green hover:text-green-dark"
                        >
                          Read insight →
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ContentWayfinder current="insights" className="lg:sticky lg:top-28" />
        </div>
      </div>
    </section>
  );
}
