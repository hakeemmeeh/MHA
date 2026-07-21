import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ContactForm } from "@/components/ui/ContactForm";
import { coverage, site } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";
import { getTurnstileSiteKey } from "@/lib/turnstile-config";

export const metadata = marketingPageMetadata({
  title: "Contact",
  description: `Reach MHA in Juba and field offices — feedback, complaints, partnerships: ${site.phone}, ${site.email}.`,
  pathname: "/contact",
  image: "/images/programs/logistics.jpg",
});

const heroImg = "/images/programs/logistics.jpg";

export default function ContactPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <PageHero
        animate
        title="Contact"
        subtitle="We respond within 48 hours — call us if the matter is urgent."
        image={heroImg}
      />
      <section className="section-y bg-cream">
        <div className="page-x mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionEyebrow>Reach us</SectionEyebrow>
            <h2 className="section-title text-text-dark">Talk to the team</h2>
            <ul className="mt-6 space-y-4 font-inter text-text-mid">
              <li>
                <span className="font-semibold text-text-dark">Phone:</span>{" "}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-navy underline-offset-2 hover:underline"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-text-dark">Email:</span>{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-navy underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <span className="font-semibold text-text-dark">Address:</span> {site.address}
              </li>
            </ul>

            <h3 className="mt-12 font-playfair text-xl font-normal text-navy">Headquarters</h3>
            {coverage.offices
              .filter((o) => o.type === "headquarters")
              .map((o) => (
                <div key={o.name} className="mt-4 flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden />
                  <div>
                    <p className="font-inter font-medium text-text-dark">{o.name}</p>
                    <p className="font-inter text-xs text-text-muted">Juba, South Sudan</p>
                  </div>
                </div>
              ))}
            <Link href="/#presence" className="link-cta mt-5 inline-flex text-sm text-navy">
              Field offices &amp; county footprint →
            </Link>

            <div
              id="feedback-complaints"
              className="mt-10 scroll-mt-28 border-t-2 border-green pt-6"
            >
              <h3 className="font-playfair text-lg font-normal text-navy">
                Community feedback &amp; complaints
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-text-mid">
                For questions about assistance, timelines, or eligibility—or to share feedback or
                raise a complaint—please use the same email or phone numbers. Messages are routed
                to the appropriate focal point; include location and a safe way to reply where
                possible.
              </p>
              <p className="mt-3 font-inter text-sm text-text-mid">
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-navy underline-offset-2 hover:underline"
                >
                  {site.email}
                </a>{" "}
                ·{" "}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-semibold text-navy underline-offset-2 hover:underline"
                >
                  {site.phone}
                </a>
              </p>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <h3 className="font-playfair text-lg font-normal text-navy">
                Case manager / partner referral
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-text-mid">
                For structured referrals, include consent details and preferred contact windows in
                your message — our team will coordinate securely with relevant clusters.
              </p>
            </div>
          </div>

          <div className="min-w-0 border border-border bg-white p-8">
            <h2 className="font-playfair text-2xl font-normal text-navy">Send a message</h2>
            <ContactForm turnstileSiteKey={turnstileSiteKey} />
          </div>
        </div>
      </section>
    </>
  );
}
