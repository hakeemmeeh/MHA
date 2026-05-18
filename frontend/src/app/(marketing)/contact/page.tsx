import { MapPin } from "lucide-react";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { coverage, site } from "@/lib/content";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Contact",
  description: `Reach MHA in Juba and field offices — feedback, complaints, partnerships: ${site.phone}, ${site.email}.`,
  pathname: "/contact",
  image: "/images/programs/logistics.jpg",
});

const heroImg = "/images/programs/logistics.jpg";

export default function ContactPage() {
  return (
    <>
      <PageHero
        animate
        title="Contact"
        subtitle="We respond within 48 hours — call us if the matter is urgent."
        image={heroImg}
      />
      <section className="bg-cream py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <MarketingScrollReveal className="min-w-0">
            <div data-marketing-reveal className="min-w-0">
              <h2 className="font-playfair text-2xl font-bold text-navy">Reach us</h2>
              <ul className="mt-6 space-y-4 font-inter text-text-mid">
                <li>
                  <span className="font-semibold text-text-dark">Phone:</span>{" "}
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-navy underline">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-text-dark">Email:</span>{" "}
                  <a href={`mailto:${site.email}`} className="text-navy underline">
                    {site.email}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-text-dark">Address:</span>{" "}
                  {site.address}
                </li>
              </ul>
              <h3 className="mt-10 font-playfair text-xl font-bold text-navy">Offices</h3>
              <ul className="mt-4 space-y-3">
                {coverage.offices.map((o) => (
                  <li
                    key={o.name}
                    className="flex gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <MapPin className="h-5 w-5 shrink-0 text-green" aria-hidden />
                    <div>
                      <p className="font-inter font-semibold text-text-dark">{o.name}</p>
                      <p className="font-inter text-xs text-text-muted">
                        {o.type === "headquarters" ? "Headquarters" : "Field office"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                id="feedback-complaints"
                className="mt-10 scroll-mt-28 rounded-xl border border-green/25 bg-green-light/40 p-6"
              >
                <h3 className="font-playfair text-lg font-bold text-navy">
                  Community feedback &amp; complaints
                </h3>
                <p className="mt-2 font-inter text-sm text-text-mid">
                  For questions about assistance, timelines, or eligibility—or to share feedback or
                  raise a complaint—please use the same email or phone numbers. Messages are routed
                  to the appropriate focal point; include location and a safe way to reply where
                  possible.
                </p>
                <p className="mt-3 font-inter text-sm text-text-mid">
                  <a href={`mailto:${site.email}`} className="font-semibold text-navy underline">
                    {site.email}
                  </a>{" "}
                  ·{" "}
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-navy underline">
                    {site.phone}
                  </a>
                </p>
              </div>
              <div className="mt-10 rounded-xl border border-border bg-navy-light/50 p-6">
                <h3 className="font-playfair text-lg font-bold text-navy">
                  Case manager / partner referral
                </h3>
                <p className="mt-2 font-inter text-sm text-text-mid">
                  For structured referrals, include consent details and preferred contact windows in
                  your message — our team will coordinate securely with relevant clusters.
                </p>
              </div>
            </div>
          </MarketingScrollReveal>
          <MarketingScrollReveal subtle className="min-w-0">
            <div
              data-marketing-reveal
              className="rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <h2 className="font-playfair text-2xl font-bold text-navy">Send a message</h2>
              <ContactForm />
            </div>
          </MarketingScrollReveal>
        </div>
      </section>
    </>
  );
}
