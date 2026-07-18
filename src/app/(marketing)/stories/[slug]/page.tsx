import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialContinueStripStory } from "@/components/sections/EditorialContinueStrip";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { StoryPageHero } from "@/components/sections/StoryPageHero";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { fieldStories, thematicAreas } from "@/lib/content";
import { getStory } from "@/lib/published-content";
import { shareCardMeta } from "@/lib/social-metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return fieldStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story" };
  const description = story.outcome ?? story.excerpt;
  return {
    title: story.title,
    description,
    ...shareCardMeta({
      pathname: `/stories/${story.slug}`,
      title: story.title,
      description,
      image: story.image,
      type: "article",
    }),
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const thematic = thematicAreas.find((t) => t.slug === story.thematicSlug);

  return (
    <article>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Stories", path: "/stories" },
          { name: story.title, path: `/stories/${story.slug}` },
        ]}
      />
      <StoryPageHero story={story} thematic={thematic} />
      <MarketingScrollReveal>
        <div data-marketing-reveal className="bg-cream px-6 py-16">
          <p
            data-editorial-scroll-lines
            className="mx-auto max-w-3xl font-inter text-lg text-text-mid"
          >
            {story.outcome ? (
              <>
                <span className="mb-3 block font-semibold text-navy">{story.outcome}</span>
                {story.excerpt}
              </>
            ) : (
              story.excerpt
            )}
          </p>
          <div className="mx-auto mt-8 max-w-3xl">
            {story.body?.map((p) => (
              <p key={p.slice(0, 40)} className="mt-6 font-inter text-text-mid">
                {p}
              </p>
            ))}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/stories"
                className="font-inter font-semibold text-navy underline"
              >
                ← All stories
              </Link>
              {thematic ? (
                <Link
                  href={`/programs/${thematic.slug}`}
                  className="font-inter font-semibold text-navy underline"
                >
                  {thematic.title} program →
                </Link>
              ) : null}
              <Link
                href="/contact"
                className="rounded-full bg-green px-6 py-2.5 font-inter text-sm font-semibold text-white"
              >
                Partner with MHA
              </Link>
            </div>
          </div>
        </div>
      </MarketingScrollReveal>
      <EditorialContinueStripStory currentSlug={slug} />
    </article>
  );
}
