import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    template: "%s | Mobile Humanitarian Agency",
    default: "MHA — Humanitarian Response in South Sudan",
  },
  description:
    "MHA is a South Sudanese NGO (NGOs Act 2016) serving IDPs, returnees, refugees, and host communities with protection, GBV, child protection, youth, WASH, livelihoods, and more—field-led since 2017.",
  keywords: [
    "MHA",
    "Mobile Humanitarian Agency",
    "South Sudan NGO",
    "humanitarian",
    "protection",
    "GBV",
    "child protection",
    "IDPs",
    "Juba",
    "displacement",
  ],
  metadataBase: new URL("https://mha-ss.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mha-ss.org",
    siteName: "Mobile Humanitarian Agency",
    title: "MHA — Humanitarian Response in South Sudan",
    description:
      "Registered under South Sudan’s NGOs Act (2016), MHA delivers principled, field-led humanitarian assistance—including protection, GBV, child protection, and youth programming—for displaced people and host communities.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHA — Humanitarian Response in South Sudan",
    description:
      "Registered under South Sudan’s NGOs Act (2016), MHA delivers principled, field-led humanitarian assistance—including protection, GBV, child protection, and youth programming—for displaced people and host communities.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
};
