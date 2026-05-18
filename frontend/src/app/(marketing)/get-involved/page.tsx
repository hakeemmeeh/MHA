import { Handshake, Heart, Users } from "lucide-react";
import Link from "next/link";
import { MarketingScrollReveal } from "@/components/layout/MarketingScrollReveal";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/ui/ContactForm";
import { marketingPageMetadata } from "@/lib/social-metadata";

export const metadata = marketingPageMetadata({
  title: "Get Involved",
  description:
    "Donate, partner, or volunteer with MHA in South Sudan — fund operations, co-design programs, or share professional skills.",
  pathname: "/get-involved",
  image: "/images/stories/youth-skills-dukor.jpg",
});

const heroImg = "/images/stories/youth-skills-dukor.jpg";

const paths = [
  {
    title: "Donate",
    desc: "Financial support helps us reach remote settlements, sustain protection monitoring, and keep field teams equipped.",
    icon: Heart,
    href: "/contact",
    cta: "Start a donation conversation",
  },
  {
    title: "Partner",
    desc: "UN agencies, NGOs, and community structures — we coordinate closely to align programs and accountability.",
    icon: Handshake,
    href: "/contact",
    cta: "Explore partnership",
  },
  {
    title: "Volunteer",
    desc: "Share your skills where they fit our mandate — from remote support to specialized deployments when appropriate.",
    icon: Users,
    href: "/contact",
    cta: "Offer your skills",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        animate
        title="Get Involved"
        subtitle="Donors, partners, and volunteers strengthen the same mission: safeguarding rights and restoring dignity."
        image={heroImg}
      />
      <MarketingScrollReveal>
        <section className="bg-cream py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
            {paths.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex flex-col rounded-2xl border border-border bg-white p-8 shadow-sm"
                >
                  <span className="inline-flex w-fit rounded-xl bg-navy-light p-3 text-navy">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-playfair text-2xl font-bold text-navy">{p.title}</h2>
                  <p className="mt-3 flex-1 font-inter text-sm text-text-mid">{p.desc}</p>
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex rounded-full bg-green px-5 py-2.5 text-center font-inter text-sm font-semibold text-white hover:bg-green-dark"
                  >
                    {p.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </MarketingScrollReveal>
      <MarketingScrollReveal subtle>
        <div data-marketing-reveal className="bg-navy-light py-20">
          <div className="mx-auto max-w-xl px-6">
            <h2 className="font-playfair text-2xl font-bold text-navy">Quick message</h2>
            <p className="mt-2 font-inter text-sm text-text-mid">
              Name, email, and how you want to help — we will route your message to the right focal
              point.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-white p-8 shadow-sm">
              <ContactForm simplified />
            </div>
          </div>
        </div>
      </MarketingScrollReveal>
    </>
  );
}
