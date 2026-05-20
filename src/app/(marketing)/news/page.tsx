import { NewsGrid } from "@/components/sections/NewsGrid";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "News & updates",
  description:
    "Latest field updates, programme launches, and announcements from MHA across South Sudan.",
  pathname: "/news",
  image: "/images/stories/youth-launch-leer-june-2023.jpg",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        animate
        title="News & updates"
        subtitle="Programme launches, partnership milestones, and field reporting from our teams."
        image="/images/stories/youth-launch-leer-june-2023.jpg"
      />
      <NewsGrid />
    </>
  );
}
