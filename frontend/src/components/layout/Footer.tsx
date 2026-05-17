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
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/mha-logo.png"
            alt="Mobile Humanitarian Agency"
            width={535}
            height={378}
            quality={95}
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 font-inter text-xs text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} Mobile Humanitarian Agency. All rights reserved.</p>
          <p>Privacy Policy · Terms · Sitemap</p>
        </div>
      </div>
    </footer>
  );
}
