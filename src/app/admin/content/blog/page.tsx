import type { Metadata } from "next";
import { ContentManager, type FieldDef } from "@/components/admin/ContentManager";

export const metadata: Metadata = { title: "Insights", robots: { index: false, follow: false } };

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true },
  { key: "published_at", label: "Published date", type: "text", required: true, help: "e.g. 2026-04-10" },
  { key: "category", label: "Category", type: "select", options: ["field-reflection", "programme", "partnership", "editorial"] },
  { key: "excerpt", label: "Short summary", type: "textarea", required: true },
  { key: "author", label: "Author (optional)", type: "text" },
  { key: "image", label: "Cover image", type: "image" },
  { key: "body", label: "Body", type: "paragraphs", help: "One paragraph per line." },
  { key: "story_slug", label: "Linked story slug (optional)", type: "text" },
];

export default function AdminBlogPage() {
  return <ContentManager type="blog" title="Insights / Blog" fields={fields} />;
}
