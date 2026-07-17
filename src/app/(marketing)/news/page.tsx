import { NewsGrid } from "@/components/sections/NewsGrid";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "News & updates",
  description:
    "Organizational announcements from MHA — site updates and partnership notes. Field reporting is on Stories.",
  pathname: "/news",
  image: "/images/stories/capacity-building-cbp-leaders.jpg",
});

const heroImg = "/images/stories/capacity-building-cbp-leaders.jpg";

export default function NewsPage() {
  return (
    <>
      <PageHero animate title="News" subtitle="Organizational announcements and updates." image={heroImg} />
      <NewsGrid />
    </>
  );
}
