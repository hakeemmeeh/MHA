# Site cleanup implementation

Documentation of repetition, overcrowding, and CTA cleanup across the MHA marketing site (July 2026).

---

## Goals

1. One job per section; avoid restating the same facts on every page.
2. One primary conversion moment per page (no MidPageCTA + CTABand stacks).
3. Canonical homes for shared content (About for story/values; Impact for metrics/log; Resources for documents; Home for geography tease).
4. Keep real MHA content — shorten and dedupe, do not invent new claims.

---

## Content ownership (canonical homes)

| Content | Canonical page | Elsewhere |
|---------|----------------|-----------|
| Org story / ED message / canoe quote | `/about` | Home AboutSection = teaser only |
| Core values | `/about#values` | Removed from homepage |
| Stats strip | Homepage `#impact-stats` | Removed from About & Impact |
| Impact dashboard + activity log | `/impact` | Linked from About Trust |
| Geography / offices map | Homepage `#presence` | Contact links here; removed from Impact |
| Policies & documents | `/resources` | About Policies = summary + link |
| Transparency narrative | `/about#transparency` | Impact opener bridges + links |
| CTABand (generic take-action) | Homepage only | Removed from secondary pages |

---

## Phase A — About page (prior pass)

**Files:** `AboutBody.tsx`, `AboutPageNav.tsx`, `content.ts`, `about/page.tsx`

| Fix | Detail |
|-----|--------|
| Removed checklist band | Duplicated Story + Stats (NGOs Act, 85%, islands, dual focus) |
| Trimmed founding / canoe repeats | Story keeps origin + quote; Timeline owns NGOs Act; offerings no longer restate canoe islands |
| How we work | Strategic purpose only — dropped second `site.description` block |
| Trust section | Transparency prose + 3 links (activity log, leadership, documents); removed governance/finance cards (Leadership owns people) |
| Dropped activity-log CTA band | MidPageCTA remains as About conversion |
| Affiliations | Dropped “Since 2019” labels (timeline covers milestone) |
| Sticky nav | Added Mission + Affiliations |

**Copy edits in `content.ts`:** shorter `aboutPreview` paragraph 2; softer last-mile capability bullet; leaner `partnershipTransparency`; timeline “Today” without island restatement.

---

## Phase B — Full-site cleanup (this pass)

### 1. Impact (`/impact`)

**Files:** `impact/page.tsx`, `ImpactPageNav.tsx`

| Removed | Kept |
|---------|------|
| `StatsBar` | Opener (1 short paragraph + links) |
| “At a glance” band | `ImpactDashboard` |
| `WhereWeWork` | Featured field story |
| `CTABand` | Project activity log |
| Reprint of `partnershipTransparency` paragraphs | Contextual `MidPageCTA` (due diligence) |

**Nav trimmed to:** Overview · Dashboard · Activity log.

---

### 2. Homepage (`/`)

**Files:** `page.tsx`, `HomeSectionNav.tsx`, `AboutSection.tsx`, `FieldStories.tsx`

| Change | Why |
|--------|-----|
| Removed `MidPageCTA` | Stacked with DonateBand + CTABand |
| Removed `CoreValuesSection` | Canonical on About |
| Shortened `AboutSection` | One paragraph + “Read our full story →” |
| Removed `ctaQuote` from FieldStories | Quote lives on About director message |
| Kept DonateBand + CTABand | Two clear conversion moments (donate early, act at end) |
| Kept StatsBar + WhereWeWork | Home owns glance metrics + footprint |

**HomeSectionNav:** dropped Values pill (section gone).

---

### 3. Programs

**Files:** `programs/page.tsx`, `programs/[slug]/page.tsx`

| Page | Change |
|------|--------|
| Index | Removed `CTABand`; shortened hero subtitle; kept contact line under grid |
| Detail | Removed `MidPageCTA`; kept related stories + `EditorialContinueStrip` + `CTABand` |

---

### 4. CTABand policy

**Kept on:** homepage, program detail (single bottom conversion after continue strip).

**Removed from:** About, Impact, Programs index, Stories, News, Blog, Get Involved, Donate, Contact, Resources.

**Still contextual:**
- About → `MidPageCTA` (get involved)
- Impact → `MidPageCTA` (due diligence / resources)

---

### 5. Contact / Donate / Get Involved

| Page | Change |
|------|--------|
| Contact | Removed `CTABand`; HQ only + link to `/#presence` for field offices |
| Donate | Removed `CTABand`; hero differentiated from DonateBand copy |
| Get Involved | Removed `CTABand` (page is already the action hub + form) |

---

### 6. Content listings & Resources

| Page | Change |
|------|--------|
| Stories | Removed `CTABand` |
| News | Removed `CTABand`; shortened hero (grid keeps content-type disclaimer) |
| Blog / Insights | Removed `CTABand`; shortened hero |
| Resources | Removed `CTABand`; hero title only (list intro carries detail) |

---

### 7. About polish (this pass)

| Change | Why |
|--------|-----|
| Removed About stats navy band | Stats live on home / dashboard on Impact |
| Policies → summary + Resources CTA | Full document library is `/resources` |
| Added `#values` anchor | Canonical Core Values section |
| Removed page-level `CTABand` | MidPageCTA is enough |

---

### 8. Footer & Careers

| Change | Why |
|--------|-----|
| Footer feedback line → link to Contact | Avoid repeating email/phone already on Contact |
| Careers: light “Contact the team” line | Soft CTA without full CTABand |

---

## Page composition after cleanup

| Page | Structure (high level) |
|------|------------------------|
| **Home** | Hero → nav → Stats → DonateBand → About teaser → Programs → Stories → Presence → Partners → CTABand |
| **About** | Hero → sticky nav → Story → Offerings → Timeline → How we work → Trust → Mission → Values → Leadership → MidPageCTA → Policies summary → Affiliations |
| **Impact** | Hero → sticky nav → Overview → Dashboard → Featured story → Activity log → MidPageCTA |
| **Programs** | Hero → intro → grid → contact line |
| **Program detail** | Hero → overview → stories → continue strip → CTABand |
| **Get Involved** | Hero → pathways → form |
| **Donate** | Hero → methods → form |
| **Contact** | Hero → details + form |
| **Resources** | Hero → document library |
| **Stories / News / Blog** | Hero → grid (+ wayfinder) |
| **Careers** | Hero → vacancies + soft contact link |

---

## Files touched (summary)

```
src/app/(marketing)/page.tsx
src/app/(marketing)/about/page.tsx
src/app/(marketing)/impact/page.tsx
src/app/(marketing)/programs/page.tsx
src/app/(marketing)/programs/[slug]/page.tsx
src/app/(marketing)/contact/page.tsx
src/app/(marketing)/donate/page.tsx
src/app/(marketing)/get-involved/page.tsx
src/app/(marketing)/stories/page.tsx
src/app/(marketing)/news/page.tsx
src/app/(marketing)/blog/page.tsx
src/app/(marketing)/resources/page.tsx
src/components/sections/AboutBody.tsx
src/components/sections/AboutPageNav.tsx
src/components/sections/AboutSection.tsx
src/components/sections/FieldStories.tsx
src/components/sections/HomeSectionNav.tsx
src/components/sections/ImpactPageNav.tsx
src/components/sections/CareersSection.tsx
src/components/layout/Footer.tsx
src/lib/content.ts
IMPLEMENTATION.md  (this file)
```

Removed unused: `CoreValuesSection.tsx`, `TrustStrip.tsx`, and unused `managementModel` / `financialAccountability` content blocks (governance lives under Leadership).

---

## Verification

- [x] Typecheck (`tsc --noEmit`) passes
- [ ] Manual smoke: Home, About, Impact, Programs detail, Contact, Donate, Get Involved
- [ ] Sticky navs (About / Impact) still highlight active sections
- [ ] `/#presence` and `/about#transparency` / `#values` / `#policies` anchors resolve

---

## Out of scope (intentionally deferred)

- Grouping Stories thematic filter chips into clusters
- Collapsing Careers vacancy bullet lists
- Removing Footer “Explore” column (mirror of top nav — common pattern)
- Media page CTABand (left without generic band)
- Inventing new testimonials or metrics
