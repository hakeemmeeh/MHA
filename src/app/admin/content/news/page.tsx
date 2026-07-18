import type { Metadata } from "next";
import { ContentManager, type FieldDef } from "@/components/admin/ContentManager";

export const metadata: Metadata = { title: "News", robots: { index: false, follow: false } };

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true },
  { key: "date", label: "Date", type: "text", required: true, help: "e.g. 2026-05-01" },
  { key: "category", label: "Category", type: "select", options: ["field", "partnership", "programme", "announcement"] },
  { key: "excerpt", label: "Short summary", type: "textarea", required: true },
  { key: "image", label: "Image (optional)", type: "image" },
  { key: "body", label: "Body", type: "paragraphs", help: "One paragraph per line." },
  { key: "story_slug", label: "Linked story slug (optional)", type: "text" },
];

export default function AdminNewsPage() {
  return <ContentManager type="news" title="News & Announcements" fields={fields} />;
}
