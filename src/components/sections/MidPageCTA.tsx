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
      className="section-y-sm border-y border-border bg-gradient-to-r from-navy/5 via-cream to-navy/5"
    >
      <div className="page-x mx-auto max-w-3xl text-center">
        <p className="font-inter text-xs font-semibold uppercase tracking-wider text-green">{eyebrow}</p>
        <h2 className="mt-3 font-playfair text-2xl font-normal text-navy md:text-3xl lg:text-[2.15rem]">{title}</h2>
        <p className="mt-4 font-inter text-base leading-relaxed text-text-mid">{body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="btn-primary"
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="link-cta py-3 text-navy"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
