import { Handshake, Heart, Users } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
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
    href: "/donate",
    cta: "How to donate",
  },
  {
    title: "Partner",
    desc: "UN agencies, NGOs, and community structures — we coordinate closely to align programs and accountability.",
    icon: Handshake,
    href: "/contact?type=partner",
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
      <section className="section-y bg-cream">
        <div className="page-x mx-auto max-w-7xl">
          <SectionEyebrow>Pathways</SectionEyebrow>
          <h2 className="section-title text-text-dark">Choose how you help</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {paths.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex flex-col border-t-2 border-green pt-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-green shadow-[0_8px_20px_rgba(13,26,46,0.1)] ring-1 ring-black/[0.04]">
                    <Icon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-playfair text-2xl font-normal text-navy">{p.title}</h3>
                  <p className="mt-3 flex-1 font-inter text-sm leading-relaxed text-text-mid">
                    {p.desc}
                  </p>
                  <Link href={p.href} className="link-cta mt-6 w-fit text-navy">
                    {p.cta} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-y bg-navy-light">
        <div className="page-x mx-auto max-w-xl">
          <SectionEyebrow>Quick message</SectionEyebrow>
          <h2 className="section-title text-text-dark">Tell us how you want to help</h2>
          <p className="mt-4 font-inter text-sm leading-relaxed text-text-mid">
            Name, email, and how you want to help — we will route your message to the right focal
            point.
          </p>
          <div className="mt-8 border border-border bg-white p-8">
            <ContactForm simplified />
          </div>
        </div>
      </section>
    </>
  );
}
