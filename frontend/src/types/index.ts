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
