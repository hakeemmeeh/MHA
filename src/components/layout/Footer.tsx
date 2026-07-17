import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { nav, site, socialLinks, thematicAreas } from "@/lib/content";

const exploreLinks = nav.map((n) => ({ label: n.label, href: n.href }));

const moreLinks = [
  { label: "Donate", href: "/donate" },
  { label: "Resources", href: "/resources" },
  { label: "Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

const programLinks = thematicAreas.slice(0, 5).map((t) => ({
  label: t.title,
  href: `/programs/${t.slug}`,
}));

export function Footer() {
  return (
    <footer className="relative z-20 shrink-0 border-t-4 border-green/50 bg-navy-light text-text-dark">
      <div className="page-x mx-auto grid max-w-7xl gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div>
          <Image
            src="/images/mha-logo.png"
            alt="Mobile Humanitarian Agency"
            width={535}
            height={378}
            quality={85}
            sizes="(max-width: 768px) 260px, 320px"
            className="h-16 w-auto sm:h-[4.5rem]"
          />
          <p className="mt-4 max-w-xs font-inter text-sm leading-relaxed text-text-mid">
            {site.tagline}
          </p>
          <a
            href={socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-inter text-sm text-navy underline-offset-2 transition hover:text-green hover:underline"
          >
            {socialLinks.website.replace("https://", "")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <div>
          <h3 className="font-playfair text-lg font-normal text-navy">Explore</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-text-mid">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-playfair text-lg font-normal text-navy">More</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-text-mid">
            {moreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-playfair text-lg font-normal text-navy">Programs</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-text-mid">
            {programLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/programs" className="link-cta mt-5 inline-flex text-xs text-navy">
            View all programs →
          </Link>
        </div>

        <div>
          <h3 className="font-playfair text-lg font-normal text-navy">Contact</h3>
          <ul className="mt-4 space-y-3 font-inter text-sm text-text-mid">
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition hover:text-navy"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition hover:text-navy">
                {site.email}
              </a>
            </li>
            <li>Hai Magateen, Juba, South Sudan</li>
          </ul>
          <Link href="/contact" className="link-cta mt-5 inline-flex text-xs text-navy">
            Contact page →
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="page-x mx-auto grid max-w-7xl gap-6 py-8 md:grid-cols-2">
          <p className="font-inter text-sm leading-relaxed text-text-mid">
            <span className="font-medium text-text-dark">Safeguarding: </span>
            Report concerns about MHA staff, volunteers, or representatives confidentially to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-navy underline-offset-2 hover:text-green hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
          <p className="font-inter text-sm leading-relaxed text-text-mid">
            <span className="font-medium text-text-dark">Feedback &amp; complaints: </span>
            <Link
              href="/contact#feedback-complaints"
              className="text-navy underline-offset-2 hover:text-green hover:underline"
            >
              Use the contact page channels
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="page-x mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-5 font-inter text-xs text-text-muted md:flex-row">
          <p>© 2026 Mobile Humanitarian Agency. All rights reserved.</p>
          <p className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            <Link href="/privacy" className="hover:text-navy">
              Privacy Policy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-navy">
              Terms
            </Link>
            <span aria-hidden>·</span>
            <Link href="/sitemap.xml" className="hover:text-navy">
              Sitemap
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
