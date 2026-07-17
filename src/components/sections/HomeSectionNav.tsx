import Link from "next/link";

const LINKS = [
  { href: "#impact-stats", label: "Impact" },
  { href: "#donate-band", label: "Donate" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#stories", label: "Stories" },
  { href: "#presence", label: "Presence" },
  { href: "#partners", label: "Partners" },
  { href: "#take-action", label: "Act" },
] as const;

/** In-page anchors only — no JS; complements existing scroll behavior */
export function HomeSectionNav() {
  return (
    <nav
      aria-label="On this page"
      className="border-b border-border/80 bg-cream/95 py-3.5 backdrop-blur-md"
    >
      <div className="page-x mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto scrollbar-thin">
        <ul className="flex min-w-0 gap-1.5">
          {LINKS.map((l) => (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                className="rounded-full px-3.5 py-2 font-inter text-xs font-medium text-text-mid transition hover:bg-white hover:text-navy"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
