"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export function ImageUploadField({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/media", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1 block font-inter text-sm font-medium text-text-dark">{label}</label>
      {value ? (
        <div className="relative inline-block">
          <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-border bg-cream">
            <Image src={value} alt="" fill className="object-cover" sizes="192px" />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -right-2 -top-2 rounded-full bg-navy p-1 text-white shadow"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-cream/40 text-text-muted transition hover:border-navy hover:text-navy disabled:opacity-50"
        >
          <Upload className="h-5 w-5" />
          <span className="font-inter text-xs">{uploading ? "Uploading…" : "Upload image"}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <p className="mt-1 font-inter text-xs text-text-muted">
        Or paste an image URL / path below.
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/… or https://…"
        className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 font-inter text-sm outline-none focus:border-navy"
      />
      {error && <p className="mt-1 font-inter text-xs text-red-600">{error}</p>}
    </div>
  );
}
