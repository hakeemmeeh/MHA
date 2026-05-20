export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export type ThematicArea = {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  keyActivities?: string[];
  impactStats?: { value: string; label: string }[];
};

export type FieldStory = {
  slug: string;
  title: string;
  excerpt: string;
  /** One plain-language outcome line for cards and detail intros */
  outcome?: string;
  location: string;
  image: string;
  thematicSlug: string;
  body?: string[];
};

export type Stat = {
  value: number;
  label: string;
  suffix: string;
};

export type Affiliation = {
  name: string;
  href?: string;
  since?: string;
};

export type ProjectHighlight = {
  dateLabel: string;
  title: string;
  summary: string;
  location: string;
  partner?: string;
  storySlug?: string;
};

export type PublicDocument = {
  title: string;
  category: "registration" | "governance" | "safeguarding" | "finance";
  description: string;
  year?: string;
  /** Site-relative path under /documents/ when the file is uploaded */
  href?: string;
  /** When true, no file yet — visitors request via email */
  onRequest?: boolean;
};

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  category: "field" | "partnership" | "programme" | "announcement";
  excerpt: string;
  body: string[];
  image?: string;
  storySlug?: string;
};

export type LeadershipMember = {
  name: string;
  role: string;
  bio: string;
  /** Board | management | technical */
  group: "board" | "management" | "technical";
};

export type CareerVacancy = {
  id: string;
  title: string;
  location: string;
  type: "full-time" | "contract" | "consultancy";
  closingLabel?: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export type DonationMethod = {
  title: string;
  description: string;
  details: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: "field-reflection" | "programme" | "partnership" | "editorial";
  image: string;
  body: string[];
  /** When set, full narrative lives on /stories/[slug] */
  storySlug?: string;
  author?: string;
};

export type ImpactChartItem = {
  label: string;
  value: number;
  hint?: string;
};

export type MediaVideo = {
  slug: string;
  title: string;
  description: string;
  /** YouTube video ID — leave empty to show “coming soon” placeholder */
  youtubeId?: string;
  posterImage: string;
  durationLabel?: string;
  featured?: boolean;
  location?: string;
};
