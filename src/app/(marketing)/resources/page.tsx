import { ResourcesList } from "@/components/sections/ResourcesList";
import { PageHero } from "@/components/ui/PageHero";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Resources & documents",
  description:
    "Governance, safeguarding, and financial documents from Mobile Humanitarian Agency — available for partner due diligence.",
  pathname: "/resources",
  image: "/og-image.svg",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        animate
        title="Resources & documents"
        subtitle="Policies, registration, and financial materials for partners, donors, and auditors."
      />
      <ResourcesList />
    </>
  );
}
