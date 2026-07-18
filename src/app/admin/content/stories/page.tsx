import type { Metadata } from "next";
import { ContentManager, type FieldDef } from "@/components/admin/ContentManager";

export const metadata: Metadata = { title: "Stories", robots: { index: false, follow: false } };

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true, help: "Lowercase words with hyphens, e.g. safe-space-mayiandit" },
  { key: "location", label: "Location", type: "text", required: true },
  { key: "excerpt", label: "Short summary", type: "textarea", required: true },
  { key: "outcome", label: "Outcome line (optional)", type: "text" },
  { key: "thematic_slug", label: "Thematic area slug", type: "text", help: "Must match a thematic area, e.g. protection, child-protection" },
  { key: "image", label: "Cover image", type: "image" },
  { key: "body", label: "Story body", type: "paragraphs", help: "One paragraph per line." },
];

export default function AdminStoriesPage() {
  return <ContentManager type="stories" title="Field Stories" fields={fields} />;
}
