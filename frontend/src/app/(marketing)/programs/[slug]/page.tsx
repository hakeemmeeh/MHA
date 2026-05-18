import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialContinueStripProgram } from "@/components/sections/EditorialContinueStrip";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { fieldStories, thematicAreas } from "@/lib/content";
import { shareCardMeta } from "@/lib/social-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return thematicAreas.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = thematicAreas.find((t) => t.slug === slug);
  if (!area) return { title: "Program" };
  return {
    title: area.title,
    description: area.shortDesc,
    ...shareCardMeta({
      pathname: `/programs/${area.slug}`,
      title: area.title,
      description: area.shortDesc,
      image: area.image,
      type: "website",
    }),
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = thematicAreas.find((t) => t.slug === slug);
  if (!area) notFound();

  const related = fieldStories.filter((s) => s.thematicSlug === slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: area.title, path: `/programs/${area.slug}` },
        ]}
      />
      <PageHero animate title={area.title} subtitle={area.shortDesc} image={area.image} />
      <MarketingScrollReveal>
        <article data-marketing-reveal className="bg-cream py-16">
          <div
            data-editorial-scroll-mask
            className="editorial-hero-mask-init relative mx-auto mb-10 aspect-[21/9] max-w-3xl overflow-hidden rounded-2xl shadow-lg"
          >
            <div
              data-editorial-scroll-mask-inner
              className="absolute inset-0 scale-[1.12] transform-gpu will-change-transform"
            >
              <Image
                src={area.image}
                alt={`${area.title} — program`}
                fill
                quality={85}
                className="object-cover photo-brighten photo-focal"
                sizes="(max-width: 768px) 100vw, 42rem"
              />
            </div>
          </div>
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-inter text-lg text-text-mid">{area.fullDesc}</p>
            {area.keyActivities && (
              <>
                <h2
                  data-editorial-scroll-lines
                  className="mt-12 font-playfair text-2xl font-bold text-navy"
                >
                  Key activities
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 font-inter text-text-mid">
                  {area.keyActivities.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </>
            )}
            {area.impactStats && (
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {area.impactStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm"
                  >
                    <p className="font-playfair text-3xl font-bold text-navy">{s.value}</p>
                    <p className="mt-1 font-inter text-sm text-text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
        {related.length > 0 ? (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="font-playfair text-2xl font-bold text-navy">Field stories</h2>
              <p className="mt-2 max-w-2xl font-inter text-sm text-text-muted">
                Examples of how this thematic area shows up in communities — read the full narrative
                on each story page.
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {related.map((s) => (
                  <Link key={s.slug} href={`/stories/${s.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        quality={85}
                        className="object-cover photo-brighten photo-focal transition group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="mt-3 font-playfair text-lg font-semibold text-navy group-hover:underline">
                      {s.title}
                    </h3>
                    {s.outcome ? (
                      <p className="mt-2 font-inter text-sm font-medium text-green">{s.outcome}</p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-2xl px-6 text-center">
              <h2 className="font-playfair text-2xl font-bold text-navy">Field stories</h2>
              <p className="mt-4 font-inter text-text-mid">
                Browse field narratives across South Sudan — many stories connect thematically to
                multiple programs and partnerships.
              </p>
              <Link
                href="/stories"
                className="mt-6 inline-flex rounded-full bg-navy px-8 py-3 font-inter text-sm font-semibold text-white hover:bg-navy-dark"
              >
                Browse all stories
              </Link>
            </div>
          </section>
        )}
        <section className="bg-navy py-12 text-center text-white">
          <div className="mx-auto max-w-xl px-6">
            <h2 className="font-playfair text-2xl font-bold">Support this program</h2>
            <p className="mt-3 font-inter text-sm text-white/70">
              Partners and donors make this work possible in the hardest-to-reach locations.
            </p>
            <Link
              href="/get-involved"
              className="mt-6 inline-flex rounded-full bg-green px-8 py-3 font-inter text-sm font-semibold text-white hover:bg-green-dark"
            >
              Get Involved
            </Link>
          </div>
        </section>
      </MarketingScrollReveal>
      <EditorialContinueStripProgram currentSlug={slug} />
      <CTABand />
    </>
  );
}
