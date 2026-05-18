"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { mhaLogoOnDarkClass } from "@/lib/brand";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/layout/lenis-context";

/** Dark full-bleed hero sits under the fixed nav (negative top margin). Elsewhere keep solid bar + navy text. */
function normalizePathname(p: string) {
  if (!p) return "/";
  const t = p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
  return t === "" ? "/" : t;
}

function hasFullBleedHero(pathname: string) {
  const path = normalizePathname(pathname);
  if (path === "/") return true;
  const roots = [
    "/about",
    "/programs",
    "/stories",
    "/contact",
    "/get-involved",
    "/impact",
  ];
  return roots.some((root) => path === root || path.startsWith(`${root}/`));
}

/** Matches hero `pt` / negative margin: utility bar + main nav. */
function navHeroOverlapPx(): number {
  if (typeof window === "undefined") return 72;
  return window.matchMedia("(min-width: 1024px)").matches ? 120 : 72;
}

/**
 * Lenis + native scroll can disagree at “resting top”, so `scrollY > 100` stays true and the bar
 * stays solid white. Use the hero block’s viewport position when present — it matches what you see.
 */
function readScrolledPastHeroFold(): boolean | null {
  const el = document.querySelector<HTMLElement>("[data-mha-scroll-hero]");
  if (!el) return null;
  const top = el.getBoundingClientRect().top;
  const band = navHeroOverlapPx() + 100;
  return top <= -band;
}

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const bucketRef = { current: null as boolean | null };
    const readY = () => {
      if (lenis) {
        /** `lenis.scroll` is smoothed and can lag or sit high; `actualScroll` tracks native position for bar state. */
        return Math.max(0, lenis.actualScroll);
      }
      return Math.max(
        0,
        window.scrollY || document.documentElement.scrollTop || 0,
      );
    };
    const sync = () => {
      const fromHero =
        hasFullBleedHero(pathname) ? readScrolledPastHeroFold() : null;
      const over =
        fromHero !== null ? fromHero : readY() > 100;
      if (bucketRef.current !== over) {
        bucketRef.current = over;
        setScrolled(over);
      }
    };
    bucketRef.current = null;
    sync();

    const cleanups: (() => void)[] = [];
    window.addEventListener("scroll", sync, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", sync));
    gsap.ticker.add(sync);
    cleanups.push(() => gsap.ticker.remove(sync));
    if (lenis) {
      cleanups.push(lenis.on("scroll", sync));
    }
    return () => {
      for (const fn of cleanups) fn();
    };
  }, [pathname, lenis]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const transparent = !scrolled && hasFullBleedHero(pathname);

  return (
    <>
      <div className="fixed top-0 z-50 w-full overflow-visible">
        <div
          className={cn(
            "hidden bg-navy-dark text-white lg:block",
            transparent && "bg-navy-dark/95",
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 font-inter text-sm">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-white/90 hover:text-white"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-white/90 hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>

        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-4 transition-all duration-500 ease-out md:px-6",
            transparent
              ? "bg-transparent text-white lg:bg-transparent"
              : "bg-white text-navy shadow-md",
          )}
        >
          <Link
            href="/"
            className="relative z-[60] flex shrink-0 items-center overflow-visible"
            aria-label="MHA home"
          >
            <Image
              src="/images/mha-logo.png"
              alt="Mobile Humanitarian Agency"
              width={535}
              height={378}
              priority
              quality={95}
              sizes="(max-width: 768px) 220px, 280px"
              className={cn(
                "h-[52px] w-auto transition-[filter] duration-500 ease-out md:h-16",
                transparent && mhaLogoOnDarkClass,
              )}
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 font-inter text-sm font-medium text-current hover:opacity-80"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="min-w-[220px] rounded-xl border border-border bg-white py-3 text-navy shadow-2xl">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block px-5 py-2.5 font-inter text-sm hover:bg-navy-light hover:text-navy"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/get-involved"
              className="inline-flex rounded-full bg-green px-6 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-green-dark"
            >
              Get Involved
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "relative z-[60] rounded-lg p-2 lg:hidden",
              mobileOpen && !transparent && "ring-2 ring-navy/15",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="primary-mobile-navigation"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X
                className={cn(
                  "h-7 w-7",
                  transparent ? "text-white" : "text-navy",
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "h-7 w-7",
                  transparent ? "text-white" : "text-navy",
                )}
              />
            )}
          </button>
        </nav>
      </div>

      <div className="h-[72px] lg:h-[120px]" aria-hidden />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="primary-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            initial={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-navy-dark lg:hidden"
          >
            <div className="flex h-full flex-col px-8 pb-12 pt-24">
              <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      className="font-playfair text-3xl text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="mt-3 flex flex-col gap-2 border-l border-white/15 pl-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="font-inter text-sm text-white/70 hover:text-white"
                            onClick={() => setMobileOpen(false)}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
              <Link
                href="/get-involved"
                className="mt-6 inline-flex justify-center rounded-full bg-green px-6 py-3 font-inter font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get Involved
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
