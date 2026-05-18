import type { Metadata } from "next";

export const SITE_OG_NAME = "Mobile Humanitarian Agency";

type TitleInput = string | { absolute: string };

function titleForSocial(title: TitleInput): string {
  return typeof title === "string" ? title : title.absolute;
}

/**
 * Google / Open Graph / Twitter fields for a marketing route.
 * URLs under `/` resolve against `metadataBase` in `site-metadata.ts`.
 */
export function shareCardMeta(opts: {
  pathname: string;
  title: TitleInput;
  description: string;
  /** Site-relative (e.g. `/images/...`) or absolute image URL */
  image?: string;
  type?: "website" | "article";
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const path = opts.pathname.startsWith("/") ? opts.pathname : `/${opts.pathname}`;
  const title = titleForSocial(opts.title);
  const img = opts.image ?? "/og-image.svg";
  const ogImages = [{ url: img }];

  return {
    alternates: { canonical: path },
    openGraph: {
      type: opts.type ?? "website",
      url: path,
      siteName: SITE_OG_NAME,
      locale: "en_US",
      title,
      description: opts.description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
      images: [img],
    },
  };
}

export function marketingPageMetadata(opts: {
  title: TitleInput;
  description: string;
  pathname: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    ...shareCardMeta({
      pathname: opts.pathname,
      title: opts.title,
      description: opts.description,
      image: opts.image,
      type: opts.type,
    }),
  };
}
