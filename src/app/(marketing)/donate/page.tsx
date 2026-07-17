import { DonateSection } from "@/components/sections/DonateSection";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Donate",
  description:
    "Support MHA in South Sudan — bank transfer, in-kind gifts, and partnership funding pathways with transparent stewardship.",
  pathname: "/donate",
  image: "/images/hero/home-hero.jpg",
});

export default function DonatePage() {
  return (
    <>
      <PageHero
        animate
        title="Donate to MHA"
        subtitle="Choose a giving pathway — bank transfer, in-kind support, or partnership funding — with transparent stewardship."
        image="/images/hero/home-hero.jpg"
      />
      <DonateSection />
    </>
  );
}
