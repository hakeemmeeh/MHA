import Link from "next/link";
import { contentLayers } from "@/lib/content-layers";
import { cn } from "@/lib/utils";

type LayerKey = keyof typeof contentLayers;

type Props = {
  /** Which section the visitor is on — that row is highlighted */
  current: LayerKey;
  className?: string;
};

export function ContentWayfinder({ current, className }: Props) {
  const keys = Object.keys(contentLayers) as LayerKey[];

  return (
    <aside
      className={cn(
        "rounded-xl border border-border bg-white px-5 py-4 font-inter text-sm text-text-mid",
        className,
      )}
      aria-label="How our content is organized"
    >
      <p className="font-semibold text-navy">One topic, one home</p>
      <ul className="mt-3 space-y-2">
        {keys.map((key) => {
          const layer = contentLayers[key];
          const isCurrent = key === current;
          return (
            <li key={key}>
              {isCurrent ? (
                <span className="block">
                  <span className="font-semibold text-green">{layer.label}</span>
                  <span className="mt-0.5 block text-xs text-text-muted">{layer.short}</span>
                </span>
              ) : (
                <Link href={layer.href} className="block transition hover:text-navy">
                  <span className="font-semibold text-navy">{layer.label}</span>
                  <span className="mt-0.5 block text-xs text-text-muted">{layer.short}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
