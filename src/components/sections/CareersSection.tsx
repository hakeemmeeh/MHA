import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import { careerVacancies, careersIntro } from "@/lib/content";

export function CareersSection() {
  const applyHref = `mailto:${careersIntro.applyEmail}?subject=${encodeURIComponent("Job application — MHA")}`;

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {careersIntro.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 font-inter text-text-mid first:mt-0">
            {p}
          </p>
        ))}

        {careerVacancies.length > 0 ? (
          <ul className="mt-12 space-y-8">
            {careerVacancies.map((role) => (
              <li
                key={role.id}
                id={role.id}
                className="scroll-mt-28 rounded-2xl border border-border bg-white p-8 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-playfair text-2xl font-normal text-navy">{role.title}</h2>
                    <p className="mt-2 flex flex-wrap items-center gap-3 font-inter text-sm text-text-muted">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-green" aria-hidden />
                        {role.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-green" aria-hidden />
                        {role.type.replace("-", " ")}
                      </span>
                      {role.closingLabel && <span>{role.closingLabel}</span>}
                    </p>
                  </div>
                  <a
                    href={`${applyHref}&body=${encodeURIComponent(`Re: ${role.title}`)}`}
                    className="inline-flex shrink-0 rounded-full bg-green px-6 py-2.5 font-inter text-sm font-semibold text-white hover:bg-green-dark"
                  >
                    Apply
                  </a>
                </div>
                <p className="mt-6 font-inter text-text-mid">{role.summary}</p>
                <h3 className="mt-6 font-inter text-sm font-semibold uppercase tracking-wide text-navy">
                  Responsibilities
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1 font-inter text-sm text-text-mid">
                  {role.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <h3 className="mt-6 font-inter text-sm font-semibold uppercase tracking-wide text-navy">
                  Requirements
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1 font-inter text-sm text-text-mid">
                  {role.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-xl border border-border bg-white p-8 font-inter text-text-mid">
            No open vacancies are listed right now. Send your CV and area of interest to{" "}
            <a href={applyHref} className="font-semibold text-navy hover:underline">
              {careersIntro.applyEmail}
            </a>
            .
          </p>
        )}

        <p className="mt-10 font-inter text-sm text-text-muted">
          MHA is an equal-opportunity employer. Safeguarding clearance and references are required
          for roles involving communities. See our{" "}
          <Link href="/resources" className="text-navy hover:underline">
            policies
          </Link>{" "}
          and{" "}
          <Link href="/contact#feedback-complaints" className="text-navy hover:underline">
            complaints mechanism
          </Link>
          .
        </p>
        <p className="mt-6 font-inter text-sm text-text-mid">
          General interest in working with MHA?{" "}
          <Link href="/contact" className="font-semibold text-navy hover:underline">
            Contact the team
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
