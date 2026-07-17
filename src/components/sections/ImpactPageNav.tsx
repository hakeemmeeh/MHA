"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#overview", id: "overview", label: "Overview" },
  { href: "#impact-dashboard", id: "impact-dashboard", label: "Dashboard" },
  { href: "#project-log", id: "project-log", label: "Activity log" },
] as const;

export function ImpactPageNav() {
  const [active, setActive] = useState<string>("overview");

  useEffect(() => {
    const elements = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-40 border-b border-border/80 bg-cream/95 py-3 backdrop-blur-md"
    >
      <div className="page-x mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto scrollbar-thin">
        <ul className="flex min-w-0 gap-1.5">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.href} className="shrink-0">
                <Link
                  href={l.href}
                  className={`rounded-full px-3.5 py-2 font-inter text-xs font-medium transition ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-text-mid hover:bg-white hover:text-navy"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
