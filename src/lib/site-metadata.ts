import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-url";

const description =
  "MHA is a South Sudanese NGO (NGOs Act 2016) serving IDPs, returnees, refugees, and host communities with protection, GBV, child protection, youth, WASH, livelihoods, and more—field-led since 2017.";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const siteMetadata: Metadata = {
  title: {
    template: "%s | Mobile Humanitarian Agency",
    default: "MHA — Humanitarian Response in South Sudan",
  },
  description,
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
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
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
  verification: googleVerification ? { google: googleVerification } : undefined,
  other: {
    "geo.region": "SS",
    "geo.placename": "Juba, South Sudan",
    "geo.position": "4.8594;31.5713",
    ICBM: "4.8594, 31.5713",
  },
};
