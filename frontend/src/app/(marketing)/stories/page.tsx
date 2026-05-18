import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { StoriesGrid } from "@/components/sections/StoriesGrid";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Stories",
  description:
    "Field stories from MHA teams across South Sudan — protection, child protection, youth engagement, logistics, and community-led response.",
  pathname: "/stories",
  image: "/images/stories/safe-space-mayiandit.jpg",
});

const heroImg = "/images/stories/safe-space-mayiandit.jpg";

export default function StoriesPage() {
  return (
    <>
      <PageHero
        animate
        title="Stories from the Field"
        subtitle="Voices and moments from the communities we serve — with dignity and consent at the center."
        image={heroImg}
      />
      <MarketingScrollReveal className="bg-cream">
        <StoriesGrid />
      </MarketingScrollReveal>
    </>
  );
}
