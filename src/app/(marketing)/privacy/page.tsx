import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Privacy Policy",
  description: "How Mobile Humanitarian Agency handles personal data submitted through this website.",
  pathname: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="Last updated: May 2026" />
      <div className="bg-cream py-16">
        <div className="prose-navy mx-auto max-w-3xl space-y-6 px-6 font-inter text-sm leading-relaxed text-text-mid">
          <p>
            {site.name} ({site.acronym}) respects your privacy. This policy explains what we collect
            when you use {site.website} and how we use it.
          </p>
          <h2 className="font-playfair text-xl font-bold text-navy">Information we collect</h2>
          <p>
            When you submit the contact form, we collect your name, email, optional phone number,
            inquiry type, and message. Technical logs from our hosting provider may include IP
            address and browser type for security.
          </p>
          <h2 className="font-playfair text-xl font-bold text-navy">How we use it</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Respond to donations, partnerships, volunteering, media, and general inquiries</li>
            <li>Route safeguarding or complaints-related messages to the appropriate focal point</li>
            <li>Maintain internal records for accountability and follow-up</li>
          </ul>
          <h2 className="font-playfair text-xl font-bold text-navy">Sharing</h2>
          <p>
            We do not sell personal data. Messages may be stored in secure systems (e.g. email and
            database services) used to operate this website. We share information only when required
            by law or to protect the safety of staff and communities.
          </p>
          <h2 className="font-playfair text-xl font-bold text-navy">Retention</h2>
          <p>
            Inquiry records are kept as long as needed for operational and legal purposes, then
            deleted or archived according to internal policy.
          </p>
          <h2 className="font-playfair text-xl font-bold text-navy">Your rights</h2>
          <p>
            You may request access, correction, or deletion of your data by emailing{" "}
            <a href={`mailto:${site.email}`} className="text-navy hover:underline">
              {site.email}
            </a>
            .
          </p>
          <h2 className="font-playfair text-xl font-bold text-navy">Contact</h2>
          <p>
            Questions about this policy:{" "}
            <a href={`mailto:${site.email}`} className="text-navy hover:underline">
              {site.email}
            </a>
            . See also our{" "}
            <Link href="/terms" className="text-navy hover:underline">
              Terms of Use
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
