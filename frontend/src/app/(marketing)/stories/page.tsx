import type { Metadata } from "next";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { StoriesGrid } from "@/components/sections/StoriesGrid";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Stories",
  description: "Field stories from MHA teams across Unity and Jonglei states.",
};

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
      <MarketingScrollReveal>
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-6">
            <StoriesGrid />
          </div>
        </section>
      </MarketingScrollReveal>
    </>
  );
}
