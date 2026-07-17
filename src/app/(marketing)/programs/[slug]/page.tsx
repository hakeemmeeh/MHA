import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialContinueStripProgram } from "@/components/sections/EditorialContinueStrip";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
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

function splitDesc(text: string) {
  const parts = text.split(/(?<=\.)\s+/).filter(Boolean);
  if (parts.length <= 2) return [text];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = thematicAreas.find((t) => t.slug === slug);
  if (!area) notFound();

  const related = fieldStories.filter((s) => s.thematicSlug === slug);
  const paragraphs = splitDesc(area.fullDesc);

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

      <article className="section-y bg-cream">
        <div className="page-x mx-auto max-w-3xl">
          <SectionEyebrow>Program overview</SectionEyebrow>
          <h2 className="section-title text-text-dark">What we deliver</h2>
          {paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mt-5 font-inter text-base leading-relaxed text-text-mid md:text-lg"
            >
              {p}
            </p>
          ))}

          {area.keyActivities ? (
            <>
              <h2 className="mt-14 section-title text-text-dark">Key activities</h2>
              <ul className="mt-6 space-y-3 font-inter text-text-mid">
                {area.keyActivities.map((k) => (
                  <li key={k} className="flex gap-3 border-t border-border pt-3 first:border-0 first:pt-0">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                    {k}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {area.impactStats ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {area.impactStats.map((s) => (
                <div key={s.label} className="border-t-2 border-green pt-5">
                  <p className="font-playfair text-3xl font-normal text-navy">{s.value}</p>
                  <p className="mt-2 font-inter text-sm text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="section-y bg-white">
          <div className="page-x mx-auto max-w-7xl">
            <SectionEyebrow>From the field</SectionEyebrow>
            <h2 className="section-title text-text-dark">Related stories</h2>
            <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-text-mid">
              How this thematic area shows up in communities — read the full narrative on each
              story page.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
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
                  <h3 className="mt-4 font-playfair text-lg font-normal text-navy">
                    {s.title}
                  </h3>
                  {s.outcome ? (
                    <p className="mt-2 font-inter text-sm text-green">{s.outcome}</p>
                  ) : null}
                  <span className="link-cta mt-3 inline-flex text-xs text-navy">
                    Read story →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section-y-sm bg-white">
          <div className="page-x mx-auto max-w-2xl text-center">
            <h2 className="section-title text-text-dark">Field stories</h2>
            <p className="mt-4 font-inter text-base leading-relaxed text-text-mid">
              Browse field narratives across South Sudan — many stories connect thematically to
              multiple programs and partnerships.
            </p>
            <Link href="/stories" className="btn-primary mt-8">
              Browse all stories
            </Link>
          </div>
        </section>
      )}

      <EditorialContinueStripProgram currentSlug={slug} />
      <CTABand />
    </>
  );
}
