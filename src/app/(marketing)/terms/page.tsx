import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Terms of Use",
  description: "Terms for using the Mobile Humanitarian Agency website.",
  pathname: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" subtitle="Last updated: May 2026" />
      <div className="bg-cream py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-6 font-inter text-sm leading-relaxed text-text-mid">
          <p>
            By using {site.website}, you agree to these terms. If you do not agree, please do not use
            the site.
          </p>
          <h2 className="font-playfair text-xl font-normal text-navy">Content</h2>
          <p>
            Text, images, and materials on this site are published for general information about{" "}
            {site.name}&apos;s humanitarian work. They do not constitute legal advice or a guarantee
            of service availability in every location.
          </p>
          <h2 className="font-playfair text-xl font-normal text-navy">Acceptable use</h2>
          <p>You agree not to misuse the site, including attempting to disrupt services, submit false safeguarding reports in bad faith, or scrape content for unrelated commercial use without permission.</p>
          <h2 className="font-playfair text-xl font-normal text-navy">External links</h2>
          <p>
            Links to partner or reference sites are provided for convenience. MHA is not responsible
            for third-party content or privacy practices.
          </p>
          <h2 className="font-playfair text-xl font-normal text-navy">Limitation of liability</h2>
          <p>
            The site is provided &ldquo;as is.&rdquo; To the extent permitted by law, MHA is not
            liable for indirect damages arising from use of the website.
          </p>
          <h2 className="font-playfair text-xl font-normal text-navy">Contact</h2>
          <p>
            <a href={`mailto:${site.email}`} className="text-navy hover:underline">
              {site.email}
            </a>
            {" · "}
            <Link href="/privacy" className="text-navy hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
