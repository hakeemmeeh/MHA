"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { coverage } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { AnimatedList } from "@/components/ui/animated-list";

gsap.registerPlugin(ScrollTrigger);

function useMinWidthLg() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => false,
  );
}

function OfficeRow({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 border-t border-border pt-4">
      <span className="mt-0.5 text-green">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-inter font-medium text-text-dark">{name}</p>
        <p className="font-inter text-xs uppercase tracking-wide text-text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

/** Stylized map — county labels; not a geographic survey */
export function WhereWeWork() {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapPanelRef = useRef<HTMLDivElement>(null);
  const sidebarRevealRef = useRef<HTMLDivElement>(null);
  const stateRegionsRef = useRef<HTMLDivElement>(null);
  const officesHeadingRef = useRef<HTMLHeadingElement>(null);
  const [playOfficesList, setPlayOfficesList] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isLg = useMinWidthLg();

  useLayoutEffect(() => {
    const scope = root.current;
    const mapPanel = mapPanelRef.current;
    const sidebarReveal = sidebarRevealRef.current;
    const stateRegions = stateRegionsRef.current;
    const officesHeading = officesHeadingRef.current;
    if (!scope) return;

    const intros = scope.querySelectorAll<HTMLElement>("[data-mh-intro]");
    const paths = svgRef.current?.querySelectorAll("path[data-county]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        if (intros.length) gsap.set(intros, { y: 0, opacity: 1 });
        if (mapPanel) gsap.set(mapPanel, { y: 0, opacity: 1 });
        if (sidebarReveal) gsap.set(sidebarReveal, { y: 0, opacity: 1 });
        if (stateRegions) gsap.set(stateRegions, { y: 0, opacity: 1 });
        if (officesHeading) gsap.set(officesHeading, { y: 0, opacity: 1 });
        setPlayOfficesList(true);
        if (paths?.length) {
          paths.forEach((node) => {
            const p = node as SVGGeometryElement;
            const targetFill = p.getAttribute("data-fill") || "#1A3D6B";
            gsap.set(p, {
              fill: targetFill,
              stroke: "#ffffff",
              strokeWidth: 2,
              strokeDasharray: "none",
              strokeDashoffset: 0,
            });
          });
        }
        return;
      }

      if (intros.length) gsap.set(intros, { y: 32, opacity: 0 });
      if (mapPanel) gsap.set(mapPanel, { y: 28, opacity: 0 });
      if (desktop && sidebarReveal) {
        gsap.set(sidebarReveal, { y: 28, opacity: 0 });
      } else {
        if (stateRegions) gsap.set(stateRegions, { y: 28, opacity: 0 });
        if (officesHeading) gsap.set(officesHeading, { y: 18, opacity: 0 });
      }

      if (paths?.length) {
        paths.forEach((node) => {
          const p = node as SVGGeometryElement;
          const len = p.getTotalLength();
          gsap.set(p, {
            fill: "none",
            stroke: "#1a3d6b",
            strokeWidth: 2,
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 74%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      if (intros.length) {
        tl.fromTo(
          intros,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, stagger: 0.14, ease: "power3.out" },
          0,
        );
      }

      if (mapPanel) {
        tl.fromTo(
          mapPanel,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.68, ease: "power3.out" },
          intros.length ? ">+=0.12" : 0,
        );
      }

      if (paths?.length) {
        /** Overlap path draws (original used `delay: i * 0.18` per path) — much faster than sequential `+=`. */
        tl.addLabel("countyPaths", mapPanel ? ">+=0.02" : ">+=0");
        paths.forEach((node, i) => {
          const p = node as SVGGeometryElement;
          const targetFill = p.getAttribute("data-fill") || "#1A3D6B";
          const pathTl = gsap.timeline();
          pathTl
            .to(p, {
              strokeDashoffset: 0,
              duration: 0.72,
              ease: "power2.inOut",
            })
            .to(
              p,
              {
                fill: targetFill,
                stroke: "#ffffff",
                strokeWidth: 2,
                duration: 0.36,
                ease: "power1.out",
              },
              "-=0.12",
            );
          tl.add(pathTl, `countyPaths+=${i * 0.16}`);
        });
      }

      const afterPathsOrMap =
        paths?.length ? ">+=0.2" : mapPanel ? ">+=0.24" : intros.length ? ">+=0.2" : 0;

      if (desktop && sidebarReveal) {
        tl.fromTo(
          sidebarReveal,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.78, ease: "power3.out" },
          afterPathsOrMap,
        );
        tl.add(() => {
          setPlayOfficesList(true);
        }, ">+=0.12");
      } else {
        if (stateRegions) {
          tl.fromTo(
            stateRegions,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72, ease: "power3.out" },
            afterPathsOrMap,
          );
        }

        if (officesHeading) {
          tl.fromTo(
            officesHeading,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.58, ease: "power3.out" },
            stateRegions ? ">+=0.14" : paths?.length ? ">+=0.2" : 0,
          );
        }

        tl.add(() => {
          setPlayOfficesList(true);
        }, officesHeading ? ">+=0.12" : stateRegions ? ">+=0.18" : ">+=0.2");
      }
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="presence" className="section-y scroll-mt-20 bg-cream">
      <div className="page-x mx-auto max-w-7xl">
        <div data-mh-intro>
          <SectionEyebrow>Our Presence</SectionEyebrow>
        </div>
        <h2
          data-mh-intro
          className="section-title text-text-dark"
        >
          Where We Work in South Sudan
        </h2>
        <p data-mh-intro className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-text-mid">
          Active counties across Unity and Jonglei — map and county lists side by side.
        </p>
        <div className="mt-10 grid min-w-0 gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-5">
          <div
            ref={mapPanelRef}
            className="min-w-0 border border-border bg-white p-4 sm:p-6 lg:col-span-3"
          >
            <svg
              ref={svgRef}
              viewBox="0 0 400 420"
              className="h-auto w-full"
              role="img"
              aria-label="Map of South Sudan highlighting counties where MHA is active"
            >
              <title>South Sudan presence map</title>
              <defs>
                <filter
                  id="map-county-label-shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                  colorInterpolationFilters="sRGB"
                >
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="1.8"
                    floodColor="#0d1a2e"
                    floodOpacity="0.65"
                  />
                </filter>
              </defs>
              <rect width="400" height="420" fill="#F0F4FA" rx="12" />
              <text x="200" y="36" textAnchor="middle" className="fill-navy font-sans text-sm font-normal">
                South Sudan — active counties
              </text>
              <path
                data-county
                data-fill="#1A3D6B"
                d="M60 120 L180 90 L200 200 L80 220 Z"
                fill="#E0E5EB"
                stroke="#fff"
                strokeWidth="2"
              />
              <path
                data-county
                data-fill="#1A3D6B"
                d="M180 90 L280 100 L260 210 L200 200 Z"
                fill="#E0E5EB"
                stroke="#fff"
                strokeWidth="2"
              />
              <path
                data-county
                data-fill="#1A3D6B"
                d="M80 220 L200 200 L220 320 L100 340 Z"
                fill="#E0E5EB"
                stroke="#fff"
                strokeWidth="2"
              />
              <path
                data-county
                data-fill="#4CAF50"
                d="M280 100 L360 140 L330 280 L260 210 Z"
                fill="#E0E5EB"
                stroke="#fff"
                strokeWidth="2"
              />
              <path
                data-county
                data-fill="#4CAF50"
                d="M220 320 L330 280 L340 380 L240 400 Z"
                fill="#E0E5EB"
                stroke="#fff"
                strokeWidth="2"
              />
              <text
                x="130"
                y="162"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
                fontFamily="system-ui, ui-sans-serif, sans-serif"
                filter="url(#map-county-label-shadow)"
                pointerEvents="none"
              >
                Leer
              </text>
              <text
                x="230"
                y="158"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
                fontFamily="system-ui, ui-sans-serif, sans-serif"
                filter="url(#map-county-label-shadow)"
                pointerEvents="none"
              >
                Mayiandit
              </text>
              <text
                x="150"
                y="268"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="600"
                fontFamily="system-ui, ui-sans-serif, sans-serif"
                filter="url(#map-county-label-shadow)"
                pointerEvents="none"
              >
                Panyijiar
              </text>
              <text
                x="305"
                y="188"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="system-ui, ui-sans-serif, sans-serif"
                filter="url(#map-county-label-shadow)"
                pointerEvents="none"
              >
                <tspan x="305" dy="0">
                  Akobo
                </tspan>
                <tspan x="305" dy="13">
                  Uror
                </tspan>
              </text>
              <text
                x="282"
                y="328"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="system-ui, ui-sans-serif, sans-serif"
                filter="url(#map-county-label-shadow)"
                pointerEvents="none"
              >
                <tspan x="282" dy="0">
                  Duk
                </tspan>
                <tspan x="282" dy="13">
                  Pigi/Canal
                </tspan>
              </text>
            </svg>
            <p className="mt-3 font-inter text-xs text-text-muted">
              Navy: Unity State · Green: Jonglei State. Labels show counties where MHA is active.
            </p>
          </div>
          <div
            ref={sidebarRevealRef}
            className="min-w-0 lg:col-span-2 lg:border lg:border-border lg:bg-white lg:p-6"
          >
            <div ref={stateRegionsRef} className="space-y-8">
              {coverage.states.map((st) => (
                <div key={st.name}>
                  <h3 className="font-playfair text-xl font-normal text-navy">{st.name}</h3>
                  <ul className="mt-3 space-y-1.5 font-inter text-sm text-text-mid">
                    {st.counties.map((c) => (
                      <li key={c} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-border pt-8">
              <h3
                ref={officesHeadingRef}
                className="font-playfair text-lg font-normal text-navy"
              >
                Offices
              </h3>
              {isLg || prefersReducedMotion ? (
                <ul className="mt-4 space-y-3" role="list">
                  {coverage.offices.map((o) => (
                    <li key={o.name} className="[list-style:none]">
                      <OfficeRow
                        name={o.name}
                        subtitle={
                          o.type === "headquarters"
                            ? "Headquarters"
                            : `Field · ${"state" in o ? o.state : ""}`
                        }
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <AnimatedList
                  className="mt-4"
                  delay={380}
                  enabled={playOfficesList}
                >
                  {coverage.offices.map((o) => (
                    <OfficeRow
                      key={o.name}
                      name={o.name}
                      subtitle={
                        o.type === "headquarters"
                          ? "Headquarters"
                          : `Field · ${"state" in o ? o.state : ""}`
                      }
                    />
                  ))}
                </AnimatedList>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
