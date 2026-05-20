import { leadershipTeam } from "@/lib/content";
import { cn } from "@/lib/utils";

const groupLabels = {
  management: "Executive leadership",
  board: "Governance",
  technical: "Programme & operations",
} as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => w.length > 1 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function LeadershipSection() {
  const groups = ["management", "board", "technical"] as const;

  return (
    <section id="leadership" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-playfair text-3xl font-bold text-navy md:text-4xl">
          Leadership &amp; governance
        </h2>
        <p className="mt-4 max-w-2xl font-inter text-text-mid">
          MHA links board oversight with field delivery — so accountability and programme quality
          stay connected.
        </p>

        <div className="mt-12 space-y-14">
          {groups.map((group) => {
            const members = leadershipTeam.filter((m) => m.group === group);
            if (!members.length) return null;
            return (
              <div key={group}>
                <h3 className="font-inter text-xs font-semibold uppercase tracking-widest text-green">
                  {groupLabels[group]}
                </h3>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                  {members.map((m) => (
                    <li
                      key={m.name}
                      className="flex gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm"
                    >
                      <span
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
                          "bg-navy font-inter text-sm font-bold text-white",
                        )}
                        aria-hidden
                      >
                        {initials(m.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-playfair text-lg font-bold text-navy">{m.name}</p>
                        <p className="mt-1 font-inter text-xs font-semibold uppercase tracking-wide text-text-muted">
                          {m.role}
                        </p>
                        <p className="mt-3 font-inter text-sm leading-relaxed text-text-mid">
                          {m.bio}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
