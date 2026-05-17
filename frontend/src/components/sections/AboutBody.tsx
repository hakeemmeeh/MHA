"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  affiliations,
  boardInfo,
  capabilities,
  coreValues,
  financialAccountability,
  managementModel,
  mission,
  partnershipTransparency,
  policies,
  site,
  strategicPurpose,
  vision,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

function fadeUpBlock(
  block: Element,
  items: NodeListOf<Element> | Element[],
  opts?: { stagger?: number; y?: number; start?: string },
) {
  const arr = Array.from(items);
  if (!arr.length) return;
  gsap.fromTo(
    arr,
    { y: opts?.y ?? 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.68,
      stagger: opts?.stagger ?? 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: block,
        start: opts?.start ?? "top 86%",
        toggleActions: "play none none none",
      },
    },
  );
}

export function AboutBody() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-about-block]").forEach((block) => {
        const items = block.querySelectorAll("[data-about-item]");
        if (items.length) {
          fadeUpBlock(block, items);
        }
      });

      const missionGrid = el.querySelector("[data-about-mission-grid]");
      if (missionGrid) {
        const cards = missionGrid.querySelectorAll("[data-about-card]");
        gsap.fromTo(
          cards,
          { y: 52, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.78,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: missionGrid,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const valuesGrid = el.querySelector("[data-about-values-grid]");
      if (valuesGrid) {
        const cards = valuesGrid.querySelectorAll("[data-about-value-card]");
        gsap.fromTo(
          cards,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesGrid,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const policyList = el.querySelector("[data-about-policies]");
      if (policyList) {
        const lis = policyList.querySelectorAll("li");
        fadeUpBlock(policyList, lis, { stagger: 0.04, y: 22, start: "top 88%" });
      }

      const affiliationsList = el.querySelector("[data-about-affiliations]");
      if (affiliationsList) {
        const lis = affiliationsList.querySelectorAll("li");
        fadeUpBlock(affiliationsList, lis, { stagger: 0.07, y: 28, start: "top 86%" });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="story" className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6" data-about-block>
          <h2 data-about-item className="font-playfair text-3xl font-bold text-navy">
            {strategicPurpose.title}
          </h2>
          <p data-about-item className="mt-4 font-inter text-text-mid">
            {strategicPurpose.body}
          </p>
          <p data-about-item className="mt-6 font-inter text-text-mid">
            {site.description}
          </p>
        </div>
      </section>

      <section id="transparency" className="border-t border-border bg-white py-20">
        <div className="mx-auto max-w-3xl px-6" data-about-block>
          <h2 data-about-item className="font-playfair text-3xl font-bold text-navy">
            {partnershipTransparency.title}
          </h2>
          {partnershipTransparency.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} data-about-item className="mt-4 font-inter text-text-mid">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-navy-light py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div data-about-block>
            <h2 data-about-item className="font-playfair text-2xl font-bold text-navy md:text-3xl">
              {capabilities.title}
            </h2>
            <ul className="mt-6 space-y-4 font-inter text-text-mid">
              {capabilities.bullets.map((b) => (
                <li key={b} data-about-item className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div data-about-block>
            <h2 data-about-item className="font-playfair text-2xl font-bold text-navy md:text-3xl">
              {managementModel.title}
            </h2>
            {managementModel.paragraphs.map((p) => (
              <p key={p.slice(0, 48)} data-about-item className="mt-4 font-inter text-text-mid">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-6" data-about-block>
          <h2 data-about-item className="font-playfair text-3xl font-bold text-navy">
            {financialAccountability.title}
          </h2>
          {financialAccountability.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} data-about-item className="mt-4 font-inter text-text-mid">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section id="mission" className="bg-navy-light py-20">
        <div
          data-about-mission-grid
          className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2"
        >
          <div
            data-about-card
            className="rounded-2xl bg-navy p-8 text-white shadow-lg transition-shadow duration-500 hover:shadow-xl"
          >
            <h2 className="font-playfair text-2xl font-bold">Mission</h2>
            <p className="mt-4 font-inter text-white/80">{mission}</p>
          </div>
          <div
            data-about-card
            className="rounded-2xl bg-green p-8 text-white shadow-lg transition-shadow duration-500 hover:shadow-xl"
          >
            <h2 className="font-playfair text-2xl font-bold">Vision</h2>
            <p className="mt-4 font-inter text-white/90">{vision}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center" data-about-block>
            <h2 data-about-item className="font-playfair text-3xl font-bold text-navy">
              Core Values
            </h2>
          </div>
          <div
            data-about-values-grid
            className="mt-12 grid gap-8 md:grid-cols-3"
          >
            {coreValues.map((v) => (
              <div
                key={v.title}
                data-about-value-card
                className="rounded-2xl border border-border bg-cream p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-playfair text-xl font-bold text-navy">{v.title}</h3>
                <p className="mt-3 font-inter text-sm text-text-mid">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-6" data-about-block>
          <h2 data-about-item className="font-playfair text-3xl font-bold text-navy">
            Leadership
          </h2>
          <p data-about-item className="mt-4 font-inter text-text-mid">
            MHA is led by <strong>{site.contactPerson}</strong>, who also serves on the Board of
            Directors — linking governance to programme delivery.
          </p>
          <p data-about-item className="mt-4 font-inter text-text-mid">
            The Board comprises <strong>{boardInfo.size}</strong> members and conducts{" "}
            <strong>{boardInfo.meetingFrequency}</strong> to review progress, approve policies, and
            exercise oversight.
          </p>
        </div>
      </section>

      <section className="bg-navy-dark py-20 text-white">
        <div className="mx-auto max-w-3xl px-6" data-about-block>
          <h2 data-about-item className="font-playfair text-3xl font-bold">
            Policies & standards
          </h2>
          <p data-about-item className="mt-4 font-inter text-white/70">
            MHA maintains documented policies across procurement, safeguarding, PSEA, HR,
            security, finance, fleet, stock, assets, conduct, anti-fraud, and whistle-blowing.
            Partner due diligence packs can be shared on request where agreements allow.
          </p>
          <ul data-about-policies className="mt-8 grid gap-2 font-inter text-sm text-white/60 sm:grid-cols-2">
            {policies.map((p) => (
              <li
                key={p}
                className="rounded-lg bg-white/5 px-3 py-2 transition-colors duration-300 hover:bg-white/10"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6" data-about-block>
          <h2 data-about-item className="font-playfair text-3xl font-bold text-navy">
            Affiliations & memberships
          </h2>
          <ul data-about-affiliations className="mt-8 space-y-3">
            {affiliations.map((a) => (
              <li
                key={a.name}
                className="rounded-xl border border-border bg-navy-light/40 px-4 py-4 font-inter text-sm text-text-dark transition-colors duration-300 hover:border-green/30 hover:bg-navy-light/70"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <span>
                    {a.href ? (
                      <a
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-navy underline-offset-2 hover:underline"
                      >
                        {a.name}
                      </a>
                    ) : (
                      <span className="font-medium">{a.name}</span>
                    )}
                  </span>
                  {a.since && (
                    <span className="shrink-0 font-inter text-xs text-text-muted">
                      Since {a.since}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-light py-16">
        <div
          className="mx-auto max-w-3xl rounded-2xl border border-border bg-white px-8 py-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
          data-about-block
        >
          <h2 data-about-item className="font-playfair text-2xl font-bold text-navy">
            Public project &amp; activity log
          </h2>
          <p data-about-item className="mt-3 font-inter text-sm text-text-mid">
            The full table of representative activities (with links to field stories) lives on the
            Impact page so partners always have one place to bookmark.
          </p>
          <div data-about-item className="mt-6">
            <Link
              href="/impact#project-log"
              className="inline-flex rounded-full bg-navy px-8 py-3 font-inter text-sm font-semibold text-white transition hover:bg-navy-dark"
            >
              View activity log
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
