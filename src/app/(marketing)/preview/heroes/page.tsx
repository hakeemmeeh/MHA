import { HeroVariantsPreview } from "@/components/heroes/HeroVariantsPreview";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = {
  ...marketingPageMetadata({
    title: { absolute: "Hero variants preview — MHA" },
    description: "Internal design preview of alternative hero layouts.",
    pathname: "/preview/heroes",
  }),
  robots: { index: false, follow: false },
};

export default function HeroVariantsPreviewPage() {
  return <HeroVariantsPreview />;
}
