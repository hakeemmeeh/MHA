import Link from "next/link";

const LINKS = [
  { href: "#impact-stats", label: "Impact" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#stories", label: "Stories" },
  { href: "#presence", label: "Presence" },
  { href: "#partners", label: "Partners" },
  { href: "#values", label: "Values" },
  { href: "#take-action", label: "Act" },
] as const;

/** In-page anchors only — no JS; complements existing scroll behavior */
export function HomeSectionNav() {
  return (
    <nav
      aria-label="On this page"
      className="border-b border-border/80 bg-cream/95 py-2.5 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 scrollbar-thin md:px-6">
        <ul className="flex min-w-0 gap-1">
          {LINKS.map((l) => (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                className="rounded-full px-3 py-1.5 font-inter text-xs font-medium text-text-mid transition hover:bg-white hover:text-navy"
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
