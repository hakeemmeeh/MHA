import Link from "next/link";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { PageHero } from "@/components/ui/PageHero";
import { ThematicCard } from "@/components/ui/ThematicCard";
import { thematicAreas } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Programs",
  description:
    "Explore MHA thematic programs across protection, GBV, child protection, community engagement, HLP & justice, shelter & NFIs, youth, WASH, livelihoods, and more in South Sudan.",
  pathname: "/programs",
  image: "/images/stories/listening-posts-leer.jpg",
});

const heroImg = "/images/stories/listening-posts-leer.jpg";

export default function ProgramsPage() {
  const featured = thematicAreas.slice(0, 3);
  return (
    <>
      <PageHero
        animate
        title="Our Programs"
        subtitle="Fourteen interconnected thematic areas — from frontline protection and community engagement to shelter, NFIs, and logistics that keep teams moving."
        image={heroImg}
      />
      <MarketingScrollReveal>
      <section className="bg-navy-dark py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-playfair text-2xl font-bold md:text-3xl">
            Featured thematic areas
          </h2>
          <p className="mt-4 font-inter text-white/70">
            Protection, GBV response, and child protection anchor our field presence — with
            integrated support across livelihoods, WASH, and youth engagement.
          </p>
        </div>
      </section>
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-6">
          {featured.map((a) => (
            <ThematicCard key={a.slug} area={a} featured />
          ))}
        </div>
      </section>
      <section className="bg-navy-light py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-playfair text-3xl font-bold text-navy">All programs</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {thematicAreas.map((a) => (
              <ThematicCard key={a.slug} area={a} />
            ))}
          </div>
          <p className="mt-12 text-center font-inter text-text-mid">
            Questions about a program?{" "}
            <Link href="/contact" className="font-semibold text-navy underline">
              Contact our team
            </Link>
            .
          </p>
        </div>
      </section>
      </MarketingScrollReveal>
    </>
  );
}
