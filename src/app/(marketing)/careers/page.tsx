import { CareersSection } from "@/components/sections/CareersSection";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Careers",
  description:
    "Work with Mobile Humanitarian Agency in South Sudan — protection, programme, and operations roles in field and coordination contexts.",
  pathname: "/careers",
  image: "/images/stories/capacity-building-cbp-leaders.jpg",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        animate
        title="Careers"
        subtitle="Join a South Sudanese team delivering principled humanitarian assistance in hard-to-reach places."
        image="/images/stories/capacity-building-cbp-leaders.jpg"
      />
      <CareersSection />
    </>
  );
}
