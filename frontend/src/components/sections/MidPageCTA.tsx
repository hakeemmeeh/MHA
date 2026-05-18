import Link from "next/link";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/** Static conversion band — no GSAP */
export function MidPageCTA({
  id,
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: Props) {
  return (
    <aside
      id={id}
      className="border-y border-border bg-gradient-to-r from-navy/5 via-cream to-navy/5 py-12"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-inter text-xs font-semibold uppercase tracking-wider text-green">{eyebrow}</p>
        <h2 className="mt-2 font-playfair text-2xl font-bold text-navy md:text-3xl">{title}</h2>
        <p className="mt-3 font-inter text-sm text-text-mid md:text-base">{body}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryHref}
            className="inline-flex rounded-full bg-green px-6 py-2.5 font-inter text-sm font-semibold text-white transition hover:bg-green-dark"
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="inline-flex rounded-full border border-navy/20 bg-white px-6 py-2.5 font-inter text-sm font-semibold text-navy transition hover:border-navy/40"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
