"use client";

import { useState } from "react";

export function SeedCmsButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [detail, setDetail] = useState<string | null>(null);

  async function seed() {
    if (!confirm("Import all site stories, news, insights, and videos into Supabase? Existing rows with the same slug will be updated.")) {
      return;
    }
    setStatus("loading");
    setDetail(null);
    try {
      const res = await fetch("/api/admin/seed-cms", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setStatus("err");
        setDetail(data.error || JSON.stringify(data.seeded ?? data));
        return;
      }
      setStatus("ok");
      setDetail(JSON.stringify(data.seeded));
    } catch {
      setStatus("err");
      setDetail("Request failed.");
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-sm">
      <h2 className="font-playfair text-xl font-bold text-navy">Import site content to CMS</h2>
      <p className="mt-2 max-w-2xl font-inter text-sm text-text-mid">
        One-time sync from the built-in site content into Supabase so you can edit stories, news,
        insights, and videos from the admin. Safe to run again — matching slugs are updated, not
        duplicated.
      </p>
      <button
        type="button"
        onClick={seed}
        disabled={status === "loading"}
        className="mt-4 rounded-lg bg-navy px-4 py-2.5 font-inter text-sm font-semibold text-white hover:bg-navy-dark disabled:opacity-50"
      >
        {status === "loading" ? "Importing…" : "Import content to Supabase"}
      </button>
      {status === "ok" && (
        <p className="mt-3 rounded-lg bg-green-light px-3 py-2 font-inter text-sm text-green-dark">
          Content imported. {detail}
        </p>
      )}
      {status === "err" && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 font-inter text-sm text-red-600">
          Import failed. {detail}
        </p>
      )}
    </div>
  );
}
