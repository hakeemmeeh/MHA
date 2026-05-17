import { AboutSection } from "@/components/sections/AboutSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { CTABand } from "@/components/sections/CTABand";
import { FieldStories } from "@/components/sections/FieldStories";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { StatsBar } from "@/components/sections/StatsBar";
import { ThematicGrid } from "@/components/sections/ThematicGrid";
import { WhereWeWork } from "@/components/sections/WhereWeWork";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ThematicGrid />
      <FieldStories />
      <WhereWeWork />
      <PartnersStrip />
      <CoreValuesSection />
      <CTABand />
    </>
  );
}
