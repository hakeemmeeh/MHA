import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    template: "%s | Mobile Humanitarian Agency",
    default: "MHA — Humanitarian Response in South Sudan",
  },
  description:
    "Mobile Humanitarian Agency (MHA) is a nonprofit NGO in South Sudan delivering protection, GBV response, child protection, and youth engagement services to displaced communities since 2017.",
  keywords: [
    "MHA",
    "Mobile Humanitarian Agency",
    "South Sudan NGO",
    "humanitarian",
    "protection",
    "GBV",
    "child protection",
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
      "Delivering life-saving assistance to displaced communities across South Sudan since 2017.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
