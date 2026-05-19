import Image from "next/image";
import Link from "next/link";
import { Globe, MessageCircle, Share2 } from "lucide-react";
import { mhaLogoOnDarkClass } from "@/lib/brand";
import { nav, site, thematicAreas } from "@/lib/content";
import { cn } from "@/lib/utils";

const quick = nav.map((n) => ({ label: n.label, href: n.href }));

const programLinks = thematicAreas.slice(0, 5).map((t) => ({
  label: t.title,
  href: `/programs/${t.slug}`,
}));

export function Footer() {
  return (
    <footer className="relative z-20 shrink-0 border-t-4 border-green/50 bg-navy text-white shadow-[0_-8px_32px_rgba(0,0,0,0.12)]">
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
          <p className="mt-4 font-inter text-sm text-white/50">{site.tagline}</p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://facebook.com"
              className="rounded-full bg-white/10 p-2 transition hover:bg-green"
              aria-label="Facebook"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              className="rounded-full bg-white/10 p-2 transition hover:bg-green"
              aria-label="Social"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              className="rounded-full bg-white/10 p-2 transition hover:bg-green"
              aria-label="Website"
            >
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-playfair text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-white/50">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-playfair text-lg font-semibold">Our Programs</h3>
          <ul className="mt-4 space-y-2 font-inter text-sm text-white/50">
            {programLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-playfair text-lg font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 font-inter text-sm text-white/50">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>Hai Magateen, Juba, South Sudan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="font-inter text-sm leading-relaxed text-white/55">
            <span className="font-semibold text-white/80">Safeguarding: </span>
            Concerns about the conduct of MHA staff, volunteers, or representatives — including
            sexual exploitation, abuse, or harassment — can be reported confidentially to{" "}
            <a href={`mailto:${site.email}`} className="text-green underline-offset-2 hover:underline">
              {site.email}
            </a>
            . We take reports seriously and route them to the appropriate focal point.
          </p>
          <p className="mt-4 font-inter text-sm leading-relaxed text-white/55">
            <span className="font-semibold text-white/80">Feedback &amp; complaints: </span>
            For questions about assistance or to raise a complaint about programming, use{" "}
            <a href={`mailto:${site.email}`} className="text-green underline-offset-2 hover:underline">
              {site.email}
            </a>{" "}
            or call{" "}
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-green underline-offset-2 hover:underline">
              {site.phone}
            </a>
            .{" "}
            <Link href="/contact#feedback-complaints" className="text-green underline-offset-2 hover:underline">
              More detail on the contact page
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 font-inter text-xs text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} Mobile Humanitarian Agency. All rights reserved.</p>
          <p>Privacy Policy · Terms · Sitemap</p>
        </div>
      </div>
    </footer>
  );
}
