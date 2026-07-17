"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { nav } from "@/lib/content";
import { useLenis } from "@/components/layout/lenis-context";

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
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

  return (
    <>
      <header className="relative z-50 w-full overflow-visible text-navy">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-visible px-4 py-4 md:px-6">
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
              className="h-[58px] w-auto md:h-[4.5rem]"
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
                  className={`inline-flex items-center gap-1 font-inter text-sm font-medium transition hover:opacity-80 ${
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                      ? "text-green"
                      : "text-current"
                  }`}
                  aria-current={
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                      ? "page"
                      : undefined
                  }
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
              className="inline-flex rounded-full bg-green px-6 py-2.5 font-inter text-sm font-semibold uppercase tracking-[0.05em] text-white transition hover:bg-green-dark"
            >
              Get Involved
            </Link>
          </div>

          <button
            type="button"
            className="relative z-[60] inline-flex items-center justify-center p-1 lg:hidden focus-visible:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="primary-mobile-navigation"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="h-7 w-7 text-white" />
            ) : (
              <Menu className="h-7 w-7 text-navy" />
            )}
          </button>
        </nav>
      </header>

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
