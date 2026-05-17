import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { SchemaOrg } from "@/components/seo/SchemaOrg";
import { siteMetadata } from "@/lib/site-metadata";
import "./globals.css";

/** Section titles & in-component `font-playfair` — warm editorial serif (option B). */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

/** Body, UI, nav — `font-inter` utility still maps here for minimal churn. */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakarta.variable} h-full`}>
      <body className="font-inter min-h-full antialiased">
        <SchemaOrg />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
