"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { coverage } from "@/lib/content";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

/** Stylized map — county labels; not a geographic survey */
export function WhereWeWork() {
  const root = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path[data-county]");
    const cards = root.current?.querySelectorAll("[data-office]");
    const ctx = gsap.context(() => {
      if (paths?.length && svgRef.current) {
        paths.forEach((node, i) => {
          const p = node as SVGGeometryElement;
          const len = p.getTotalLength();
          const targetFill = p.getAttribute("data-fill") || "#1A3D6B";
          gsap.set(p, {
            fill: "none",
            stroke: "#1a3d6b",
            strokeWidth: 2,
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          const pathTl = gsap.timeline({
            scrollTrigger: {
              trigger: svgRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: i * 0.12,
          });
          pathTl
            .to(p, {
              strokeDashoffset: 0,
              duration: 1.1,
              ease: "power2.inOut",
            })
            .to(
              p,
              {
                fill: targetFill,
                stroke: "#ffffff",
                strokeWidth: 2,
                duration: 0.45,
                ease: "power1.out",
              },
              "-=0.12",
            );
        });
      }
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionEyebrow>Our Presence</SectionEyebrow>
        <h2 className="font-playfair text-3xl font-bold text-text-dark md:text-[44px]">
          Where We Work in South Sudan
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm lg:col-span-3">
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
              <text x="200" y="36" textAnchor="middle" className="fill-navy font-sans text-sm font-bold">
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
              Navy: Unity State counties · Green: Jonglei State counties. Hover tooltips: county
              name + “MHA Active”.
            </p>
          </div>
          <div className="space-y-8 lg:col-span-2">
            {coverage.states.map((st) => (
              <div
                key={st.name}
                className="rounded-2xl border border-border bg-navy-light/60 p-6"
              >
                <h3 className="font-playfair text-xl font-bold text-navy">{st.name}</h3>
                <ul className="mt-3 list-inside list-disc font-inter text-sm text-text-mid">
                  {st.counties.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="font-playfair text-lg font-bold text-navy">Offices</h3>
              <ul className="mt-4 space-y-3">
                {coverage.offices.map((o) => (
                  <li
                    key={o.name}
                    data-office
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
                  >
                    <span className="rounded-lg bg-green/15 p-2 text-green">
                      <MapPin className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-inter font-semibold text-text-dark">{o.name}</p>
                      <p className="font-inter text-xs uppercase tracking-wide text-text-muted">
                        {o.type === "headquarters" ? "Headquarters" : `Field · ${"state" in o ? o.state : ""}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
