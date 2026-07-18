import type { Metadata } from "next";
import { ContentManager, type FieldDef } from "@/components/admin/ContentManager";

export const metadata: Metadata = { title: "Videos", robots: { index: false, follow: false } };

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "Slug (URL)", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "youtube_id", label: "YouTube ID", type: "text", help: "The part after watch?v= in a YouTube link. Leave blank to show ‘coming soon’." },
  { key: "poster_image", label: "Poster image", type: "image" },
  { key: "duration_label", label: "Duration label (optional)", type: "text", help: "e.g. 3:42" },
  { key: "location", label: "Location (optional)", type: "text" },
  { key: "featured", label: "Feature this video at the top", type: "checkbox" },
];

export default function AdminVideosPage() {
  return <ContentManager type="videos" title="Videos" fields={fields} />;
}
