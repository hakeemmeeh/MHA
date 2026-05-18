import { CTABand } from "@/components/sections/CTABand";
import { AboutBody } from "@/components/sections/AboutBody";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "About",
  description: site.description,
  pathname: "/about",
  image: "/images/hero/home-hero.jpg",
});

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
