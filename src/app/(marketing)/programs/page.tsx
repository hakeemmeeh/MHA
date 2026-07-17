import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ThematicCard } from "@/components/ui/ThematicCard";
import {
  thematicAreas,
  thematicCrossCutting,
  thematicSectionIntro,
} from "@/lib/content";
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
  return (
    <>
      <PageHero
        animate
        title="Our Programs"
        subtitle="From frontline protection and community engagement to shelter, NFIs, and logistics."
        image={heroImg}
      />
      <section className="section-y bg-cream">
        <div className="page-x mx-auto max-w-3xl">
          <SectionEyebrow>How we work</SectionEyebrow>
          <h2 className="section-title text-text-dark">One portfolio, many entry points</h2>
          <p className="mt-5 font-inter text-base leading-relaxed text-text-mid">
            {thematicSectionIntro}
          </p>
          <p className="mt-4 font-inter text-base leading-relaxed text-text-mid">
            {thematicCrossCutting}
          </p>
        </div>
      </section>
      <section className="section-y bg-navy-light">
        <div className="page-x mx-auto max-w-7xl">
          <SectionEyebrow>All programs</SectionEyebrow>
          <h2 className="section-title text-text-dark">Thematic areas</h2>
          <div className="mt-10 grid gap-7 md:grid-cols-2 md:gap-8">
            {thematicAreas.map((a) => (
              <ThematicCard key={a.slug} area={a} />
            ))}
          </div>
          <p className="mt-12 text-center font-inter text-text-mid">
            Questions about a program?{" "}
            <Link href="/contact" className="link-cta text-navy">
              Contact our team →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
