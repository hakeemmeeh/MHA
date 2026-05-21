import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { mhaLogoOnDarkClass } from "@/lib/brand";
import { nav, site, socialLinks, thematicAreas } from "@/lib/content";
import { cn } from "@/lib/utils";

const quick = nav.map((n) => ({ label: n.label, href: n.href }));

const programLinks = thematicAreas.slice(0, 5).map((t) => ({
  label: t.title,
  href: `/programs/${t.slug}`,
}));

const moreLinks = [
  { label: "Donate", href: "/donate" },
  { label: "Resources", href: "/resources" },
  { label: "News", href: "/news" },
  { label: "Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="relative z-20 shrink-0 border-t-4 border-green/50 bg-navy-light text-text-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/mha-logo.png"
            alt="Mobile Humanitarian Agency"
            width={535}
            height={378}
            quality={85}
            sizes="(max-width: 768px) 260px, 320px"
            className={cn("h-16 w-auto sm:h-[4.5rem]", mhaLogoOnDarkClass)}
          />
          <p className="mt-4 font-inter text-sm text-text-mid">{site.tagline}</p>
          <a
            href={socialLinks.website}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy/10 px-4 py-2 font-inter text-sm text-navy transition hover:bg-green hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {socialLinks.website.replace("https://", "")}
          </a>
        </div>
        <div>
          <h3 className="font-playfair text-lg font-semibold text-navy">Quick Links</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-text-mid">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
            {moreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-playfair text-lg font-semibold text-navy">Our Programs</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-text-mid">
            {programLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-navy">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-playfair text-lg font-semibold text-navy">Contact</h3>
          <ul className="mt-4 space-y-3 font-inter text-sm text-text-mid">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-navy">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-navy">
                {site.email}
              </a>
            </li>
            <li>Hai Magateen, Juba, South Sudan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="font-inter text-sm leading-relaxed text-text-mid">
            <span className="font-semibold text-text-dark">Safeguarding: </span>
            Concerns about the conduct of MHA staff, volunteers, or representatives — including
            sexual exploitation, abuse, or harassment — can be reported confidentially to{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-navy underline-offset-2 hover:text-green hover:underline">
              {site.email}
            </a>
            . We take reports seriously and route them to the appropriate focal point.
          </p>
          <p className="mt-4 font-inter text-sm leading-relaxed text-text-mid">
            <span className="font-semibold text-text-dark">Feedback &amp; complaints: </span>
            For questions about assistance or to raise a complaint about programming, use{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-navy underline-offset-2 hover:text-green hover:underline">
              {site.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-medium text-navy underline-offset-2 hover:text-green hover:underline">
              {site.phone}
            </a>
            .{" "}
            <Link href="/contact#feedback-complaints" className="font-medium text-navy underline-offset-2 hover:text-green hover:underline">
              More detail on the contact page
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 font-inter text-xs text-text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Mobile Humanitarian Agency. All rights reserved.</p>
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
