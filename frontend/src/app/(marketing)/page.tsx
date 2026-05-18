import { AboutSection } from "@/components/sections/AboutSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { CTABand } from "@/components/sections/CTABand";
import { FieldStories } from "@/components/sections/FieldStories";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomeSectionNav } from "@/components/sections/HomeSectionNav";
import { MidPageCTA } from "@/components/sections/MidPageCTA";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { StatsBar } from "@/components/sections/StatsBar";
import { ThematicGrid } from "@/components/sections/ThematicGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhereWeWork } from "@/components/sections/WhereWeWork";
import { marketingPageMetadata } from "@/lib/social-metadata";
import { site } from "@/lib/content";

export const metadata = marketingPageMetadata({
  title: { absolute: "MHA — Humanitarian Response in South Sudan" },
  description: site.description,
  pathname: "/",
  image: "/og-image.svg",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeSectionNav />
      <StatsBar />
      <TrustStrip />
      <AboutSection />
      <ThematicGrid />
      <MidPageCTA
        id="cta-after-programs"
        eyebrow="From the field"
        title="See how programs show up in communities"
        body="Field stories connect thematic work to real places and people across South Sudan."
        primaryHref="/stories"
        primaryLabel="Browse all stories"
        secondaryHref="/impact#project-log"
        secondaryLabel="Activity log"
      />
      <FieldStories />
      <MidPageCTA
        id="cta-after-stories"
        eyebrow="Get involved"
        title="Partners and volunteers expand our reach"
        body="Whether you fund operations, co-design programs, or volunteer skills—there is a pathway to work with MHA."
        primaryHref="/get-involved"
        primaryLabel="Get involved"
        secondaryHref="/contact"
        secondaryLabel="Contact the team"
      />
      <WhereWeWork />
      <PartnersStrip />
      <CoreValuesSection />
      <CTABand />
    </>
  );
}
