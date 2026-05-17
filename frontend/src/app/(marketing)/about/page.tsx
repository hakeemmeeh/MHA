import type { Metadata } from "next";
import { CTABand } from "@/components/sections/CTABand";
import { AboutBody } from "@/components/sections/AboutBody";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const heroImg = "/images/hero/home-hero.jpg";

export default function AboutPage() {
  return (
    <>
      <PageHero animate title="About MHA" subtitle={site.tagline} image={heroImg} />
      <AboutBody />
      <CTABand />
    </>
  );
}
