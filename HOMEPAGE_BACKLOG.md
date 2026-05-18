# MHA homepage roadmap (excluding full-bleed hero)

Assumed default priority mix: **field credibility first**, then **program discovery**, then **donor conversion**—reorder phases if your org optimizes for a different primary goal.

---

## Phase 1 — Foundation (ship first)

| # | Initiative | Component(s) / area | Outcome |
|---|------------|---------------------|---------|
| 1.1 | **Motion policy sitewide** | `MarketingScrollReveal`, any GSAP sections, `HeroSection` (pattern reference) | `prefers-reduced-motion` honored consistently; fewer surprise animations |
| 1.2 | **Keyboard / focus audit** | `Navbar`, `Footer`, `ThematicCard`, `FieldStories`, `ContactForm`, CTA links | Predictable tab order; visible focus on custom cards |
| 1.3 | **Trust strip** | New slim section or `Footer` + link to `TransparencyProjectLog` / static accountability URL | One-glance credibility (report, partners, how to verify) |
| 1.4 | **CTA hierarchy** | `CTABand`, `HeroSection` CTAs (non–full-bleed parts), `get-involved` | Single primary action per band; secondary de-emphasized |
| 1.5 | **Metadata baseline** | `layout.tsx`, `site-metadata.ts`, program/story templates | Unique titles/descriptions per major route and slug |

---

## Phase 2 — Stories, programs, geography

| # | Initiative | Component(s) / area | Outcome |
|---|------------|---------------------|---------|
| 2.1 | **Flagship story slot** | `FieldStories`, `content.ts` (or CMS) | One large story + dek; grid for the rest |
| 2.2 | **Outcome line per story** | `FieldStories`, story cards, `[slug]/page.tsx` | Plain-language “what changed” under titles |
| 2.3 | **Program → story bridge** | `ThematicGrid`, `programs/[slug]`, stories index/query | Programs feel tied to real field evidence |
| 2.4 | **Program grid density** | `ThematicGrid` | Fewer cards above fold + explicit “All programs” |
| 2.5 | **Where we work: scan + a11y** | `WhereWeWork` | Location chips or list + optional map as enhancement |
| 2.6 | **Structured data depth** | `SchemaOrg`, story/program pages | Breadcrumbs + article/program-appropriate JSON-LD |

---

## Phase 3 — Polish, conversion, ops

| # | Initiative | Component(s) / area | Outcome |
|---|------------|---------------------|---------|
| 3.1 | **Soft CTAs mid-page** | After `FieldStories`, after `ThematicGrid` (small bands or in-section links) | Repeat asks without bottom-only fatigue |
| 3.2 | **Section pacing / editorial measure** | `AboutSection`, long copy in marketing pages | Narrower reading measure; alternating dense vs. airy blocks |
| 3.3 | **Sticky chapter nav (optional)** | New client component + anchor IDs on home sections | Long-page orientation without competing with hero |
| 3.4 | **Safeguarding / complaints line** | `Footer` or slim band | Meets NGO expectations; clear contact |
| 3.5 | **Image & LCP pass** | `next/image` usage, hero/story assets | Faster mobile home and inner pages |
| 3.6 | **Preview deploys & ownership** | Vercel/GitHub, `README` or internal doc | Stakeholder review before merge; content freshness owner |

---

## Priority presets (re-sequence if needed)

- **Donor conversion first:** Move 1.4, 3.1, 3.4 earlier; add donation flow testing; keep 1.3 early for trust.
- **Field credibility first:** Default order above (1.3 → 2.1–2.3 early).
- **Program discovery first:** Move 2.4, 2.3, 2.6 toward end of Phase 1 / start of Phase 2.

---

## Component map (quick reference)

| Component | Primary backlog themes |
|-----------|------------------------|
| `HeroSection` | CTA hierarchy (non–full-bleed copy/CTAs only); motion reference |
| `StatsBar` | Trust + accuracy; footnote / “how we count” (Phase 2–3) |
| `AboutSection` | Editorial measure; pacing (Phase 3) |
| `ThematicGrid` | Density, program→story, mid-page CTA (Phases 2–3) |
| `FieldStories` | Flagship slot, outcome lines, freshness (Phase 2) |
| `WhereWeWork` | Chips/list + map fallback (Phase 2) |
| `PartnersStrip` | Align with trust strip; avoid logo fatigue (Phase 1–2) |
| `CoreValuesSection` | Pacing; optional pull-quote layout (Phase 3) |
| `CTABand` | Hierarchy; coordinate with mid-page CTAs (Phases 1, 3) |
| `Navbar` / `Footer` | Focus, safeguarding, trust links (Phases 1, 3) |
| `SchemaOrg` + route metadata | SEO depth (Phases 1–2) |
