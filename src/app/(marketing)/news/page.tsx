import { NewsGrid } from "@/components/sections/NewsGrid";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "News & updates",
  description:
    "Organizational announcements from MHA — site updates and partnership notes. Field reporting is on Stories.",
  pathname: "/news",
  image: "/og-image.svg",
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        animate
        title="News"
        subtitle="Brief organizational announcements — not duplicate field narratives."
        image="/og-image.svg"
      />
      <NewsGrid />
    </>
  );
}
