import { MediaVideoHub } from "@/components/sections/MediaVideoHub";
import { VideoFeatureHero } from "@/components/sections/VideoFeatureHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Film & media",
  description:
    "Documentary and programme video from MHA teams across South Sudan — field presence, protection, and last-mile delivery.",
  pathname: "/media",
  image: "/images/hero/home-hero.jpg",
});

export default function MediaPage() {
  return (
    <>
      <VideoFeatureHero />
      <div id="watch">
        <MediaVideoHub />
      </div>
    </>
  );
}
