import type { Metadata } from "next";
import Link from "next/link";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { PageHero } from "@/components/ui/PageHero";
import { StatsBar } from "@/components/sections/StatsBar";
import { TransparencyProjectLog } from "@/components/sections/TransparencyProjectLog";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { fieldStories, partnershipTransparency, projectHighlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact & transparency",
  description:
    "MHA impact across South Sudan — coverage, representative project activities, and transparency for partners and donors.",
};

const heroImg = "/images/hero/home-hero.jpg";

export default function ImpactPage() {
  return (
    <>
      <PageHero
        animate
        title="Impact & transparency"
        subtitle="Field-led results, honest geography, and a public activity log so partners can see what we deliver — alongside deeper field stories."
        image={heroImg}
      />
      <MarketingScrollReveal>
      <section className="bg-navy-light py-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-inter text-text-mid">{partnershipTransparency.paragraphs[0]}</p>
          <Link
            href="/about#transparency"
            className="mt-4 inline-block font-inter text-sm font-semibold text-navy underline hover:text-green-dark"
          >
            Read our transparency approach →
          </Link>
        </div>
      </section>
      <StatsBar />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-playfair text-3xl font-bold text-navy">At a glance</h2>
          <ul className="mt-8 space-y-6 font-inter text-text-mid">
            <li>
              <strong className="text-navy">2017–present:</strong> sustained operations
              through conflict cycles with dual focus on emergency response and resilience.
            </li>
            <li>
              <strong className="text-navy">Core coverage:</strong> active programming across
              eight counties in Unity and Jonglei states, coordinated from Juba and field
              offices — with select partner-funded activities in other locations when agreed
              (see activity log).
            </li>
            <li>
              <strong className="text-navy">Stories:</strong>{" "}
              <Link href="/stories" className="font-semibold text-green underline">
                {fieldStories.length} field narratives
              </Link>{" "}
              — consent-led, updated as communities agree to share outcomes.
            </li>
          </ul>
        </div>
      </section>
      <TransparencyProjectLog
        anchorId="project-log"
        title="Project & activity log"
        intro="Documented milestones and programme lines from MHA’s organizational profile, with links to longer field stories where available."
        items={projectHighlights}
      />
      <WhereWeWork />
      </MarketingScrollReveal>
    </>
  );
}
