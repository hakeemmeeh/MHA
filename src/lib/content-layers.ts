/** How public content types relate — used for wayfinder copy (avoid duplicate publishing). */

export const contentLayers = {
  stories: {
    href: "/stories",
    label: "Field stories",
    short:
      "Full, consent-led narratives from communities — the canonical place for field reporting.",
  },
  insights: {
    href: "/blog",
    label: "Insights",
    short: "Editorial commentary and analysis — not duplicate field stories.",
  },
  news: {
    href: "/news",
    label: "News",
    short: "Short organizational announcements — launches, site updates, partnerships.",
  },
  media: {
    href: "/media",
    label: "Film & media",
    short: "Video and documentary footage — watch, don’t re-read the same text.",
  },
} as const;
