"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { mhaLogoOnDarkClass } from "@/lib/brand";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/layout/lenis-context";
import type Lenis from "lenis";

/** Dark full-bleed hero sits under the fixed nav (negative top margin). Elsewhere keep solid bar + navy text. */
function normalizePathname(p: string) {
  if (!p) return "/";
  const t = p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
  return t === "" ? "/" : t;
}

function hasFullBleedHero(pathname: string) {
  const path = normalizePathname(pathname);
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

/** True when scroll position is effectively at the document top (Lenis can leave a small offset). */
function isDocumentAtTop(lenis: Lenis | null): boolean {
  const y = Math.max(
    0,
    window.scrollY || 0,
    document.documentElement.scrollTop || 0,
    lenis?.actualScroll ?? 0,
    lenis?.scroll ?? 0,
  );
  return y < 12;
}

/**
 * True when a marked full-bleed hero still sits behind the fixed nav (scrim bar + light text).
 */
function isHeroBehindNav(lenis: Lenis | null): boolean {
  const el = document.querySelector<HTMLElement>("[data-mha-scroll-hero]");
  if (!el) return false;

  if (isDocumentAtTop(lenis)) return true;

  const { top, bottom } = el.getBoundingClientRect();
  const navH = navHeroOverlapPx();
  return top <= navH + 8 && bottom > navH + 40;
}

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

    const onHeroRoute = hasFullBleedHero(pathname);
    setScrolled(
      onHeroRoute
        ? false
        : Math.max(
            0,
            window.scrollY || document.documentElement.scrollTop || 0,
            lenis?.actualScroll ?? 0,
          ) > 100,
    );

    const bucketRef = { current: null as boolean | null };
    const sync = () => {
      const over = onHeroRoute
        ? !isHeroBehindNav(lenis)
        : Math.max(
            0,
            window.scrollY || document.documentElement.scrollTop || 0,
            lenis?.actualScroll ?? 0,
          ) > 100;

      if (bucketRef.current !== over) {
        bucketRef.current = over;
        setScrolled(over);
      }
    };

    bucketRef.current = null;
    sync();
    const raf = requestAnimationFrame(sync);

    const cleanups: (() => void)[] = [() => cancelAnimationFrame(raf)];
    window.addEventListener("scroll", sync, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", sync));
    window.addEventListener("scrollend", sync, { passive: true });
    cleanups.push(() => window.removeEventListener("scrollend", sync));
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

  /** Over a dark hero: light text on a navy scrim (readable during hero load / view transitions). */
  const overHero = !scrolled && hasFullBleedHero(pathname);

  return (
    <>
      <div className="fixed top-0 z-50 w-full overflow-visible">
        <div className="hidden bg-navy-dark text-white lg:block">
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
            "mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-4 transition-[background-color,box-shadow] duration-500 ease-out md:px-6",
            overHero
              ? "bg-navy-dark/90 text-white shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-navy-dark/80"
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
                overHero && mhaLogoOnDarkClass,
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
              mobileOpen && !overHero && "ring-2 ring-navy/15",
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
                  overHero ? "text-white" : "text-navy",
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "h-7 w-7",
                  overHero ? "text-white" : "text-navy",
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
