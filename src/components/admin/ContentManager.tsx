"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export type FieldDef = {
  key: string;
  label: string;
  type: "text" | "textarea" | "paragraphs" | "image" | "select" | "checkbox";
  options?: string[];
  required?: boolean;
  help?: string;
};

type Row = Record<string, unknown> & { id?: string };

export function ContentManager({
  type,
  title,
  fields,
}: {
  type: string;
  title: string;
  fields: FieldDef[];
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/content/${type}`);
      const data = await res.json();
      setRows(data.rows ?? []);
      if (data.error) setError(data.error);
    } catch {
      setError("Could not load content.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/content/${type}`);
        const data = await res.json();
        if (cancelled) return;
        setRows(data.rows ?? []);
        if (data.error) setError(data.error);
      } catch {
        if (!cancelled) setError("Could not load content.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type]);

  function blank(): Row {
    const r: Row = { status: "published" };
    fields.forEach((f) => {
      if (f.type === "checkbox") r[f.key] = false;
      else if (f.type === "paragraphs") r[f.key] = "";
      else r[f.key] = "";
    });
    return r;
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);

    // Convert "paragraphs" textareas (newline-separated) to string[]
    const payload: Row = { ...editing };
    fields.forEach((f) => {
      if (f.type === "paragraphs" && typeof payload[f.key] === "string") {
        payload[f.key] = (payload[f.key] as string)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    });

    try {
      const isNew = !editing.id;
      const url = isNew ? `/api/content/${type}` : `/api/content/${type}?id=${editing.id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? payload : stripMeta(payload)),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed.");
      } else {
        setEditing(null);
        load();
      }
    } catch {
      setError("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  function stripMeta(r: Row): Row {
    const { id, created_at, updated_at, ...rest } = r;
    void id; void created_at; void updated_at;
    return rest;
  }

  async function remove(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`/api/content/${type}?id=${id}`, { method: "DELETE" });
    load();
  }

  function startEdit(row: Row) {
    // paragraphs come back as arrays — join for the textarea
    const e: Row = { ...row };
    fields.forEach((f) => {
      if (f.type === "paragraphs" && Array.isArray(e[f.key])) {
        e[f.key] = (e[f.key] as string[]).join("\n");
      }
    });
    setEditing(e);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bodoni-display text-3xl font-bold text-navy">{title}</h1>
        <button
          onClick={() => setEditing(blank())}
          className="flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 font-inter text-sm font-semibold text-white transition hover:bg-navy-dark"
        >
          <Plus className="h-4 w-4" /> Add new
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-gold/40 bg-gold-light/50 px-4 py-3 font-inter text-sm text-text-dark">
          {error}
        </p>
      )}

      {/* List */}
      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {loading ? (
          <p className="p-8 text-center font-inter text-sm text-text-muted">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center font-inter text-sm text-text-muted">
            Nothing here yet. Click “Add new” to publish your first item.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={String(r.id)} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate font-inter text-sm font-medium text-text-dark">
                    {String(r.title)}
                  </p>
                  <p className="font-inter text-xs text-text-muted">
                    {String(r.slug)}
                    {r.status === "draft" && (
                      <span className="ml-2 rounded bg-gold-light px-1.5 py-0.5 text-text-dark">
                        Draft
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(r)}
                    className="rounded-lg border border-border p-2 text-navy transition hover:bg-cream"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => remove(String(r.id))}
                    className="rounded-lg border border-border p-2 text-red-600 transition hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="font-playfair text-xl font-bold text-navy">
              {editing.id ? "Edit" : "New"} item
            </h2>
            <div className="mt-5 space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  {f.type === "image" ? (
                    <ImageUploadField
                      label={f.label}
                      value={String(editing[f.key] ?? "")}
                      onChange={(url) => setEditing({ ...editing, [f.key]: url })}
                    />
                  ) : f.type === "checkbox" ? (
                    <label className="flex items-center gap-2 font-inter text-sm text-text-dark">
                      <input
                        type="checkbox"
                        checked={Boolean(editing[f.key])}
                        onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      />
                      {f.label}
                    </label>
                  ) : f.type === "select" ? (
                    <>
                      <label className="mb-1 block font-inter text-sm font-medium text-text-dark">
                        {f.label}
                      </label>
                      <select
                        value={String(editing[f.key] ?? "")}
                        onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 font-inter text-sm outline-none focus:border-navy"
                      >
                        <option value="">Select…</option>
                        {f.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <label className="mb-1 block font-inter text-sm font-medium text-text-dark">
                        {f.label}
                        {f.required && <span className="text-red-500"> *</span>}
                      </label>
                      {f.type === "textarea" || f.type === "paragraphs" ? (
                        <textarea
                          rows={f.type === "paragraphs" ? 6 : 3}
                          value={String(editing[f.key] ?? "")}
                          onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 font-inter text-sm outline-none focus:border-navy"
                        />
                      ) : (
                        <input
                          type="text"
                          value={String(editing[f.key] ?? "")}
                          onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 font-inter text-sm outline-none focus:border-navy"
                        />
                      )}
                      {f.help && (
                        <p className="mt-1 font-inter text-xs text-text-muted">{f.help}</p>
                      )}
                    </>
                  )}
                </div>
              ))}

              {/* Publish status */}
              <div>
                <label className="mb-1 block font-inter text-sm font-medium text-text-dark">
                  Status
                </label>
                <select
                  value={String(editing.status ?? "published")}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value })}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 font-inter text-sm outline-none focus:border-navy"
                >
                  <option value="published">Published (visible on site)</option>
                  <option value="draft">Draft (hidden)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-border px-4 py-2 font-inter text-sm font-medium text-text-mid transition hover:bg-cream"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-green px-5 py-2 font-inter text-sm font-semibold text-white transition hover:bg-green-dark disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
