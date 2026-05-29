import { BlogGrid } from "@/components/sections/BlogGrid";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Insights",
  description:
    "Editorial perspectives from MHA — commentary on local humanitarian response. Field narratives are on Stories.",
  pathname: "/blog",
  image: "/images/hero/home-hero.jpg",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        animate
        title="Insights"
        subtitle="Programme pictorials from the field and editorial commentary. Full narratives live under Field stories."
        image="/images/hero/home-hero.jpg"
      />
      <BlogGrid />
    </>
  );
}
