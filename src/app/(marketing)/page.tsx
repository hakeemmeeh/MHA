import { AboutSection } from "@/components/sections/AboutSection";
import { CTABand } from "@/components/sections/CTABand";
import { DonateBand } from "@/components/sections/DonateBand";
import { FieldStories } from "@/components/sections/FieldStories";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeSectionNav } from "@/components/sections/HomeSectionNav";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { StatsBar } from "@/components/sections/StatsBar";
import { ThematicGrid } from "@/components/sections/ThematicGrid";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { marketingPageMetadata } from "@/lib/social-metadata";
import { getStories } from "@/lib/published-content";
import { site } from "@/lib/content";

export const metadata = marketingPageMetadata({
  title: { absolute: "MHA — Humanitarian Response in South Sudan" },
  description: site.description,
  pathname: "/",
  image: "/og-image.svg",
});

export default async function HomePage() {
  const stories = await getStories();

  return (
    <>
      <HeroSection />
      <HomeSectionNav />
      <StatsBar />
      <DonateBand />
      <AboutSection />
      <ThematicGrid />
      <FieldStories stories={stories} />
      <WhereWeWork />
      <PartnersStrip />
      <CTABand />
    </>
  );
}
