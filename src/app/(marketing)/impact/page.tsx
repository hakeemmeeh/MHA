import Image from "next/image";
import Link from "next/link";
import { ImpactDashboard } from "@/components/sections/ImpactDashboard";
import { ImpactPageNav } from "@/components/sections/ImpactPageNav";
import { MidPageCTA } from "@/components/sections/MidPageCTA";
import { TransparencyProjectLog } from "@/components/sections/TransparencyProjectLog";
import { PageHero } from "@/components/ui/PageHero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  fieldStories,
  projectHighlights,
  site,
} from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Impact & transparency",
  description:
    "MHA impact across South Sudan — coverage, representative project activities, and transparency for partners and donors.",
  pathname: "/impact",
  image: "/images/hero/home-hero.jpg",
});

const heroImg = "/images/hero/home-hero.jpg";

export default function ImpactPage() {
  const featured = fieldStories[0];

  return (
    <>
      <PageHero
        animate
        title="Impact & transparency"
        subtitle="Field-led results, honest geography, and a public activity log so partners can see what we deliver."
        image={heroImg}
      />
      <ImpactPageNav />

      <section id="overview" className="section-y scroll-mt-20 bg-cream">
        <div className="page-x mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionEyebrow>Accountability</SectionEyebrow>
            <h2 className="section-title text-text-dark">How we report impact</h2>
            <p className="mt-5 font-inter text-base leading-relaxed text-text-mid">
              MHA is accountable first to the communities we serve, and transparent with the
              donors and partners who make our work possible. This page holds the public activity
              log and programme snapshot — governance and policies live on About and Resources.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/about#transparency" className="btn-primary">
                Transparency approach
              </Link>
              <Link href="/resources" className="link-cta text-navy">
                Download resources →
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/stories/youth-launch-leer-june-2023.jpg"
              alt="MHA programme activity with youth in Leer County"
              fill
              quality={85}
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover photo-brighten photo-focal"
            />
          </div>
        </div>
      </section>

      <ImpactDashboard />

      {featured ? (
        <section className="section-y bg-white">
          <div className="page-x mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:order-2">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                quality={85}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover photo-brighten photo-focal"
              />
            </div>
            <div className="lg:order-1">
              <SectionEyebrow>Proof from the field</SectionEyebrow>
              <h2 className="section-title text-text-dark">{featured.title}</h2>
              <p className="mt-2 font-inter text-xs font-semibold uppercase tracking-wide text-text-muted">
                {featured.location}
              </p>
              <p className="mt-5 font-inter text-base leading-relaxed text-text-mid">
                {featured.excerpt}
              </p>
              <Link
                href={`/stories/${featured.slug}`}
                className="link-cta mt-8 inline-flex text-navy"
              >
                Read the field story →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <TransparencyProjectLog
        anchorId="project-log"
        title="Project & activity log"
        intro="Documented milestones and programme lines from MHA’s organizational profile, with links to longer field stories where available."
        items={projectHighlights}
      />

      <MidPageCTA
        id="cta-impact"
        eyebrow="Partner with us"
        title="Need a due-diligence pack or deeper reporting?"
        body={`Contact ${site.acronym} for procurement packs, donor-specific reports, or verification questions — we will route your request to the right focal point.`}
        primaryHref="/contact"
        primaryLabel="Contact the team"
        secondaryHref="/resources"
        secondaryLabel="View resources"
      />
    </>
  );
}
