"use client";

import { useState } from "react";
import { impactDashboardCharts } from "@/lib/content";
import type { ImpactChartItem } from "@/types";
import { cn } from "@/lib/utils";

type TabId = "overview" | "geography" | "programmes" | "activities";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "geography", label: "Geography" },
  { id: "programmes", label: "Programmes" },
  { id: "activities", label: "Activities" },
];

function maxValue(items: ImpactChartItem[]) {
  return Math.max(...items.map((i) => i.value), 1);
}

function BarChart({
  items,
  accent = "bg-green",
}: {
  items: ImpactChartItem[];
  accent?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const peak = maxValue(items);

  return (
    <ul className="space-y-4" role="list">
      {items.map((item, i) => {
        const pct = Math.round((item.value / peak) * 100);
        const isActive = active === i;
        return (
          <li key={item.label}>
            <button
              type="button"
              className="group w-full text-left"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span
                  className={cn(
                    "font-inter text-sm font-medium transition-colors",
                    isActive ? "text-navy" : "text-text-dark",
                  )}
                >
                  {item.label}
                </span>
                <span className="font-playfair text-lg font-normal text-navy tabular-nums">
                  {item.value}
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-navy-light">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 ease-out",
                    accent,
                    isActive ? "opacity-100" : "opacity-85",
                  )}
                  style={{ width: `${pct}%` }}
                  role="presentation"
                />
              </div>
              {item.hint && isActive && (
                <p className="mt-1.5 font-inter text-xs text-text-muted">{item.hint}</p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function DonutChart({ items }: { items: ImpactChartItem[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  const colors = ["#1a3d6b", "#4caf50", "#d4a574", "#2b5a8f"];
  let offset = 0;
  const segments = items.map((item, i) => {
    const pct = (item.value / total) * 100;
    const seg = { ...item, pct, color: colors[i % colors.length], offset };
    offset += pct;
    return seg;
  });

  const gradient = segments
    .map((s) => `${s.color} ${s.offset}% ${s.offset + s.pct}%`)
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
      <div
        className="relative h-44 w-44 shrink-0 rounded-full shadow-inner"
        style={{ background: `conic-gradient(${gradient})` }}
        role="img"
        aria-label="Activity distribution by region"
      >
        <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white">
          <span className="text-center font-inter text-xs font-semibold text-navy">
            {total}
            <span className="block text-[10px] font-normal text-text-muted">activities</span>
          </span>
        </div>
      </div>
      <ul className="flex-1 space-y-3">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-3 font-inter text-sm">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{ backgroundColor: s.color }}
              aria-hidden
            />
            <span className="flex-1 text-text-mid">{s.label}</span>
            <span className="font-semibold tabular-nums text-navy">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ImpactDashboard() {
  const [tab, setTab] = useState<TabId>("overview");

  const panelData: Record<TabId, ImpactChartItem[]> = {
    overview: impactDashboardCharts.headlineMetrics,
    geography: impactDashboardCharts.countiesByState,
    programmes: impactDashboardCharts.programmePortfolio,
    activities: impactDashboardCharts.activityByRegion,
  };

  return (
    <section
      id="impact-dashboard"
      className="section-y scroll-mt-20 border-y border-border bg-white"
      aria-labelledby="impact-dashboard-heading"
    >
      <div className="page-x mx-auto max-w-7xl">
        <h2 id="impact-dashboard-heading" className="section-title text-text-dark">
          Impact dashboard
        </h2>
        <p className="mt-4 max-w-2xl font-inter text-base leading-relaxed text-text-mid">
          Interactive summary of reach and programming — hover bars for detail. Figures are
          representative of published MHA data, not a live database feed.
        </p>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Impact chart views"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`impact-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-4 py-2 font-inter text-sm font-semibold transition",
                tab === t.id
                  ? "bg-navy text-white"
                  : "bg-navy-light text-navy hover:bg-navy/10",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id={`impact-panel-${tab}`}
          data-impact-panel
          role="tabpanel"
          className="mt-10 border border-border bg-cream/60 p-6 sm:p-8"
        >
          {tab === "activities" ? (
            <DonutChart items={panelData.activities} />
          ) : (
            <BarChart
              items={panelData[tab]}
              accent={tab === "geography" ? "bg-navy" : "bg-green"}
            />
          )}
        </div>

        <p className="mt-6 font-inter text-xs text-text-muted">
          For methodology and full activity lines, see the{" "}
          <a href="#project-log" className="text-navy underline hover:text-green-dark">
            project log
          </a>{" "}
          below.
        </p>
      </div>
    </section>
  );
}
