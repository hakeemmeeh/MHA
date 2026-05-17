import { site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NGO"],
  name: site.name,
  alternateName: site.acronym,
  url: site.website,
  foundingDate: "2017",
  foundingLocation: { "@type": "Place", name: "Juba, South Sudan" },
  areaServed: { "@type": "Place", name: "South Sudan" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+211911828150",
    email: site.email,
  },
};

export function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
