# MHA Website — Full Cursor Build Prompt
## Mobile Humanitarian Agency | mha-ss.org
## Editorial Cinematic + Strapi CMS + Supabase CRM
## Reference: Asli by ArtemSemkin + Leksa by pethemes + charitywater.org

---

## OBJECTIVE

Build a **cinematic editorial magazine-style** humanitarian website that feels ALIVE. Not a template. Not a static WordPress site. A scroll-driven storytelling experience powered by GSAP + Lenis smooth scroll, with full-bleed field photography from South Sudan, animated text reveals, parallax image layers, and a custom CRM backend.

**Open these in a browser tab while building:**
- https://themeforest.net/item/asli-ajax-portfolio-elementor-theme/50449818 (animation DNA)
- https://www.charitywater.org (storytelling DNA)
- https://theoceancleanup.com (dark cinematic DNA)

---

## TECH STACK

```bash
npx create-next-app@latest mha-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd mha-website
npm install gsap @studio-freight/lenis framer-motion lucide-react react-hook-form zod @supabase/supabase-js resend
npm install -D @types/node
```

```
Framework:        Next.js 14 App Router + TypeScript
Styling:          Tailwind CSS (custom config)
Scroll:           Lenis (smooth scroll) + GSAP ScrollTrigger
Animation:        GSAP 3 (primary) + Framer Motion (fallback)
Icons:            Lucide React
Forms:            React Hook Form + Zod
Database/CRM:     Supabase (PostgreSQL + Auth)
CMS:              Strapi v4 (headless, separate deployment)
Email:            Resend (transactional emails)
Fonts:            Google Fonts — Playfair Display (display) + Inter (body)
Images:           next/image (WebP, AVIF auto-conversion)
Hosting:          Vercel (frontend) + Supabase Cloud (DB) + Strapi Cloud (CMS)
```

---

## BRAND COLORS (FROM MHA LOGO)

MHA logo = navy blue silhouette of hands around a person + green accents. Brand colors:

```typescript
// tailwind.config.ts → theme.extend.colors
colors: {
  navy: {
    DEFAULT: '#1A3D6B',    // primary — logo navy
    dark:    '#0D1A2E',    // footer, dark sections, overlays
    mid:     '#2B5A8F',    // hover states, gradients
    light:   '#E8EFF6',    // light section backgrounds
    50:      '#F0F4FA',    // very light tint
  },
  green: {
    DEFAULT: '#4CAF50',    // secondary — logo green
    dark:    '#2E7D32',    // hover
    light:   '#E8F5E9',    // light green tint
  },
  gold: {
    DEFAULT: '#D4A574',    // warm humanitarian accent
    light:   '#FDF0E6',    // soft gold tint
  },
  cream:      '#F5F5F0',    // page background
  'text-dark':'#0D1A2E',    // near-black navy body text
  'text-mid': '#3A4F6B',    // subheadings
  'text-muted':'#6B7A8C',   // secondary text, captions
  border:     '#E0E5EB',    // dividers, card borders
}
```

**Color usage rules:**
- **Navbar, headings, buttons** → `navy` (#1A3D6B)
- **Footer, CTA band, dark cinematic sections** → `navy-dark` (#0D1A2E)
- **Alternating light sections** → `navy-light` (#E8EFF6)
- **Success states, checkmarks, active tabs** → `green` (#4CAF50)
- **Warm accent highlights, partner logos, badges** → `gold` (#D4A574)
- **Default page bg** → `cream` (#F5F5F0)
- **Body text** → `text-dark` (#0D1A2E)
- **On dark backgrounds** → `white` or `navy-light`

---

## TYPOGRAPHY

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})
```

```css
/* globals.css */
body {
  font-family: var(--font-inter), sans-serif;
  background: #F5F5F0;
  color: #0D1A2E;
  line-height: 1.75;
}
h1, h2, h3 { font-family: var(--font-playfair), serif; }

/* Editorial eyebrow label — used above every section heading */
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-inter);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #4CAF50;
  margin-bottom: 16px;
}
.eyebrow::before {
  content: '';
  display: block;
  width: 32px;
  height: 2px;
  background: #4CAF50;
}
```

**Typography scale:**
```
H1: font-playfair, 56px desktop / 32px mobile, font-weight 700, line-height 1.1
H2: font-playfair, 44px desktop / 28px mobile, font-weight 700, line-height 1.15
H3: font-playfair, 28px desktop / 22px mobile, font-weight 600
H4: font-inter, 20px, font-weight 600
Body: font-inter, 16px, font-weight 400, line-height 1.75
Caption: font-inter, 13px, font-weight 500, text-muted
Button: font-inter, 14px, font-weight 600, letter-spacing 0.02em
```

---

## TAILWIND CONFIG

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A3D6B',
          dark: '#0D1A2E',
          mid: '#2B5A8F',
          light: '#E8EFF6',
          50: '#F0F4FA',
        },
        green: {
          DEFAULT: '#4CAF50',
          dark: '#2E7D32',
          light: '#E8F5E9',
        },
        gold: {
          DEFAULT: '#D4A574',
          light: '#FDF0E6',
        },
        cream: '#F5F5F0',
        'text-dark': '#0D1A2E',
        'text-mid': '#3A4F6B',
        'text-muted': '#6B7A8C',
        border: '#E0E5EB',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

---

## FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, Navbar, Footer, Lenis)
│   ├── page.tsx                      # Homepage (composes all sections)
│   ├── globals.css                   # Global styles, eyebrow, smooth scroll
│   ├── about/page.tsx
│   ├── programs/page.tsx
│   ├── programs/[slug]/page.tsx      # Dynamic: individual thematic area
│   ├── impact/page.tsx
│   ├── stories/page.tsx
│   ├── stories/[slug]/page.tsx
│   ├── get-involved/page.tsx
│   ├── contact/page.tsx
│   ├── admin/                        # CRM Dashboard (protected)
│   │   ├── layout.tsx                # Admin layout (sidebar, auth check)
│   │   ├── page.tsx                  # Dashboard overview
│   │   ├── inquiries/page.tsx
│   │   ├── donors/page.tsx
│   │   ├── partners/page.tsx
│   │   └── volunteers/page.tsx
│   └── api/
│       ├── contact/route.ts          # Contact form → Supabase + email
│       └── auth/[...nextauth]/route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SmoothScroll.tsx          # Lenis wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ThematicGrid.tsx
│   │   ├── FieldStories.tsx
│   │   ├── ImpactSection.tsx
│   │   ├── PartnersStrip.tsx
│   │   ├── WhereWeWork.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTABand.tsx
│   ├── ui/
│   │   ├── SectionEyebrow.tsx
│   │   ├── ThematicCard.tsx
│   │   ├── StoryCard.tsx
│   │   ├── StatCounter.tsx
│   │   ├── ParallaxImage.tsx
│   │   ├── TextReveal.tsx
│   │   └── ContactForm.tsx
│   ├── admin/
│   │   ├── Sidebar.tsx
│   │   ├── InquiryTable.tsx
│   │   ├── DonorTable.tsx
│   │   ├── PartnerTable.tsx
│   │   ├── VolunteerTable.tsx
│   │   ├── StatusBadge.tsx
│   │   └── QuickActions.tsx
│   └── seo/
│       └── SchemaOrg.tsx
├── lib/
│   ├── content.ts                    # All MHA content data
│   ├── animations.ts                 # GSAP variants + scroll config
│   ├── supabase.ts                   # Supabase client
│   └── utils.ts                      # Helpers
└── types/
    └── index.ts                      # TypeScript interfaces
```

---

## LENIS SMOOTH SCROLL SETUP

```typescript
// components/layout/SmoothScroll.tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}
```

```typescript
// app/layout.tsx — wrap everything in SmoothScroll
import { SmoothScroll } from '@/components/layout/SmoothScroll'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
```

---

## GSAP ANIMATION LIBRARY

```typescript
// lib/animations.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Text reveal (split lines, fade up one by one) ──
// Reference: Asli by ArtemSemkin — text enters from bottom, line by line
export function initTextReveal(selector: string) {
  gsap.utils.toArray(selector).forEach((el: any) => {
    gsap.fromTo(el, 
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}

// ── Parallax image (slow-scroll depth effect) ──
// Reference: Leksa — images scroll at different speed than content
export function initParallax(selector: string, speed: number = 0.3) {
  gsap.utils.toArray(selector).forEach((el: any) => {
    gsap.to(el, {
      yPercent: -15 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  })
}

// ── Stagger fade-up (cards, grid items) ──
export function initStaggerFadeUp(containerSelector: string, childSelector: string) {
  gsap.utils.toArray(containerSelector).forEach((container: any) => {
    const items = container.querySelectorAll(childSelector)
    gsap.fromTo(items,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}

// ── Counter animation (stats) ──
export function initCountUp(selector: string) {
  gsap.utils.toArray(selector).forEach((el: any) => {
    const target = parseInt(el.dataset.target || '0')
    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}

// ── Image clip reveal (image unveils from left/right) ──
// Reference: Asli — images clip-path from 0 to full
export function initImageReveal(selector: string, direction: 'left' | 'right' = 'left') {
  gsap.utils.toArray(selector).forEach((el: any) => {
    const from = direction === 'left'
      ? 'polygon(0 0, 0 0, 0 100%, 0 100%)'
      : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
    const to = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'

    gsap.fromTo(el,
      { clipPath: from },
      {
        clipPath: to,
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}

// ── Horizontal line expand (decorative dividers) ──
export function initLineExpand(selector: string) {
  gsap.utils.toArray(selector).forEach((el: any) => {
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )
  })
}
```

---

## CONTENT FILE

```typescript
// lib/content.ts

export const site = {
  name: 'Mobile Humanitarian Agency',
  acronym: 'MHA',
  tagline: 'Safeguarding Rights. Restoring Dignity.',
  description: 'A nonprofit, non-governmental organization established in 2017 with the mission of safeguarding the rights and well-being of individuals forced to flee their homes in South Sudan.',
  phone: '+211 911828150',
  phone2: '+211 920 680 775',
  email: 'mobilehumanitarianagency@gmail.com',
  email2: 'chuol@mha-ss.org',
  address: 'Hai Magateen Residential area, left turn after Ezentus heading Bilpam Road/Hai Referendum Road, Juba, South Sudan',
  website: 'https://mha-ss.org',
  established: 2017,
  contactPerson: 'John Gatyiel Chuol, Executive Director',
}

export const vision = 'To be a trusted humanitarian service provider across South Sudan'

export const mission = 'To provide timely assistance to conflict-affected communities by empowering them to identify and address their own needs through sustainable initiatives and collaborative support.'

export const coreValues = [
  { title: 'Integrity & Transparency', desc: 'We operate with the highest ethical standards, ensuring accountability in every action.' },
  { title: 'Partnership & Collaboration', desc: 'We work hand-in-hand with communities, partners, and stakeholders for lasting impact.' },
  { title: 'Commitment & Excellence', desc: 'We deliver quality services with dedication and professionalism in every context.' },
]

export const stats = [
  { value: 82, label: 'Full-Time Staff', suffix: '' },
  { value: 85, label: 'Field-Based Workforce', suffix: '%' },
  { value: 8, label: 'Counties Covered', suffix: '' },
  { value: 7, label: 'Years of Service', suffix: '+' },
  { value: 5, label: 'Major Donors & Partners', suffix: '' },
  { value: 12, label: 'Thematic Areas', suffix: '' },
]

export const thematicAreas = [
  {
    slug: 'protection',
    title: 'Protection',
    shortDesc: 'Enhancing civilian safety through monitoring, risk mitigation, and community-based protection networks.',
    fullDesc: 'MHA\'s protection work focuses on enhancing the safety of civilians at risk from violence, coercion, and lack of access to essential services. Our team conducts routine protection monitoring to pinpoint key risks and devise strategies to prevent and mitigate them.',
    icon: 'shield',
    image: '/images/protection-training.jpg',
  },
  {
    slug: 'gbv',
    title: 'Gender-Based Violence',
    shortDesc: 'Protecting women and children from sexual and gender-based violence through advocacy, justice, and prevention.',
    fullDesc: 'We engage with organizations, healthcare providers, and local authorities to protect women and children from sexual and gender-based violence. We assist women in bringing perpetrators to justice and train gender activists to be change agents.',
    icon: 'heart',
    image: '/images/gbv-awareness.jpg',
  },
  {
    slug: 'child-protection',
    title: 'Child Protection',
    shortDesc: 'Immediate support for children affected by disasters — safe spaces, psychological first aid, and family reunification.',
    fullDesc: 'MHA provides immediate support to children affected by disasters, including safe spaces, psychological first aid, and emergency supplies. We conduct community awareness about child rights and safeguarding practices.',
    icon: 'baby',
    image: '/images/child-protection.jpg',
  },
  {
    slug: 'hlp',
    title: 'Housing, Land & Property',
    shortDesc: 'Legal awareness, dispute resolution, and documentation for HLP rights of displaced communities.',
    fullDesc: 'MHA conducts community sensitization and raises legal awareness of HLP rights. We assist beneficiaries in exploring alternative dispute resolution options, especially for lost documents and land registration claims.',
    icon: 'home',
    image: '/images/hlp-rights.jpg',
  },
  {
    slug: 'youth-engagement',
    title: 'Youth Engagement',
    shortDesc: 'Literacy, numeracy, vocational training, and peer-led activities empowering South Sudanese youth.',
    fullDesc: 'MHA offers workshops to improve reading and writing skills, financial literacy, and vocational training in agriculture, entrepreneurship, and technology. We partner with EDC, DRC, SFCG, and national NGOs across multiple counties.',
    icon: 'graduation-cap',
    image: '/images/youth-training.jpg',
  },
]

export const partners = [
  { name: 'USAID', logo: '/images/partners/usaid.png' },
  { name: 'SSHF', logo: '/images/partners/sshf.png' },
  { name: 'UNHCR', logo: '/images/partners/unhcr.png' },
  { name: 'UNICEF', logo: '/images/partners/unicef.png' },
  { name: 'JVC', logo: '/images/partners/jvc.png' },
]

export const coverage = {
  states: [
    {
      name: 'Unity State',
      counties: ['Leer', 'Mayiandit', 'Panyijiar'],
    },
    {
      name: 'Jonglei State',
      counties: ['Akobo', 'Uror', 'Duk', 'Pigi/Canal'],
    },
  ],
  offices: [
    { name: 'Juba Head Office', type: 'headquarters' },
    { name: 'Leer Field Office', type: 'field', state: 'Unity' },
    { name: 'Duk Field Office', type: 'field', state: 'Jonglei' },
    { name: 'Bentiu Field Office', type: 'field', state: 'Unity' },
  ],
}

export const boardInfo = {
  size: 5,
  meetingFrequency: 'Quarterly visits',
  executiveDirector: 'John Gatyiel Chuol',
}

export const policies = [
  'Procurement Guidelines',
  'Child Safeguarding Policy',
  'PSEA Policy',
  'HR Policy',
  'Security Policy',
  'Financial Policy',
  'Fleet Management Guidelines',
  'Stock Management Guidelines',
  'Assets Management Guidelines',
  'Staff Code of Conduct',
  'Anti-Fraud and Bribery Policy',
  'Whistle-blowing Policy',
]

export const affiliations = [
  'International Humanitarian Charter on Inclusion of Persons with Disabilities',
  'Global Legal Empowerment Network (Namati)',
  'National Protection Cluster (Full Member)',
  'National GBV Sub-Cluster (Full Member)',
  'National FSL Cluster (Full Member)',
  'NGO Forum',
  'INSO',
]

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', children: [
    { label: 'Our Story', href: '/about#story' },
    { label: 'Mission & Vision', href: '/about#mission' },
    { label: 'Leadership', href: '/about#leadership' },
  ]},
  { label: 'Programs', href: '/programs', children: [
    { label: 'Protection', href: '/programs/protection' },
    { label: 'Gender-Based Violence', href: '/programs/gbv' },
    { label: 'Child Protection', href: '/programs/child-protection' },
    { label: 'Housing, Land & Property', href: '/programs/hlp' },
    { label: 'Youth Engagement', href: '/programs/youth-engagement' },
  ]},
  { label: 'Impact', href: '/impact' },
  { label: 'Stories', href: '/stories' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
]

export const inquiryTypes = [
  'I want to donate',
  'I want to partner with MHA',
  'I want to volunteer',
  'Media inquiry',
  'General inquiry',
]
```

---

## HOMEPAGE — SECTION BY SECTION

### ─── SECTION 0: NAVBAR ───
**Reference: Asli — transparent on hero, solid on scroll**

```
TOP BAR (desktop only):
  bg: navy-dark (#0D1A2E)
  Left: 📞 +211 911828150
  Right: 📧 mobilehumanitarianagency@gmail.com

MAIN NAVBAR:
  Position: fixed, z-50
  On hero: bg-transparent, white text, white logo
  On scroll (>100px): bg-white, navy text, colored logo, shadow-md
  Transition: all 0.4s ease

  Left: Logo (/public/logo.png) — h-14 w-auto
  Center: Nav links — font-inter font-medium text-sm
  Right: "Get Involved" CTA button — bg-green text-white rounded-full px-6 py-2.5

  Dropdown: bg-white rounded-xl shadow-2xl border border-border py-3
  Each item: px-5 py-2.5 hover:bg-navy-light hover:text-navy

  MOBILE:
  Hamburger → full-screen overlay
  Overlay bg: navy-dark (#0D1A2E), white text
  Logo: white (brightness-0 invert)
  Links: stacked, font-playfair text-3xl, stagger animation
  Close: X button top-right
  Framer Motion: clipPath circle expand from hamburger position
```

### ─── SECTION 1: HERO ───
**Reference: charitywater.org hero + Asli text reveal animations**

This is the most important section. Full viewport, cinematic, immersive.

```
LAYOUT:
  Full viewport height (100vh), overflow hidden
  Background: Full-bleed field photo (community leaders Mayiandit engagement)
  Dark gradient overlay: linear-gradient(to bottom, rgba(13,26,46,0.7) 0%, rgba(13,26,46,0.85) 100%)

  Content centered vertically:
    Eyebrow: "Humanitarian Response · South Sudan" — .eyebrow class (green)
    H1: "Safeguarding Rights.<br/>Restoring Dignity." — font-playfair text-white text-6xl (desktop) text-4xl (mobile)
    Subtext: "Since 2017, MHA has delivered life-saving assistance to displaced communities across South Sudan — reaching remote areas others can't." — text-white/80 max-w-xl
    Two CTAs: "Our Programs" (bg-green text-white rounded-full) + "Get Involved" (border-2 border-white text-white rounded-full)

  Bottom of hero:
    Scroll indicator — animated bouncing chevron (white, opacity 50%)

GSAP ANIMATION:
  1. Hero image: scale from 1.1 → 1.0 over 1.5s (Ken Burns slow zoom out)
  2. Overlay: opacity 0 → 0.85 over 0.8s
  3. Eyebrow: y:30 → y:0, opacity 0 → 1, delay 0.4s
  4. H1: split by line, each line y:60 → y:0, stagger 0.15s, delay 0.6s
  5. Subtext: y:30 → y:0, opacity 0 → 1, delay 1.0s
  6. CTAs: y:20 → y:0, opacity 0 → 1, delay 1.2s
  7. Scroll indicator: infinite y bounce (y:0 → y:10 → y:0), 1.5s loop

PARALLAX:
  Background image scrolls at 0.5x speed (GSAP ScrollTrigger scrub)
  Content scrolls at normal speed
  Creates depth when user begins scrolling
```

### ─── SECTION 2: STATS BAR ───
**Reference: charitywater.org counter bar**

```
LAYOUT:
  Full-width bg-navy (#1A3D6B), py-12
  6 stats in a row (3-col on mobile, 6-col on desktop)
  Each stat: centered, divided by border-r border-white/15

  Stat structure:
    Value: font-playfair text-4xl font-bold text-white (animated count-up)
    Suffix: text-green (%, +)
    Label: font-inter text-sm text-white/60 mt-1

STATS DATA:
  82 — Full-Time Staff
  85% — Field-Based Workforce
  8 — Counties Covered
  7+ — Years of Service
  5 — Major Donors & Partners
  12 — Thematic Areas

GSAP:
  Each number counts up from 0 when section enters viewport
  Stagger: 0.1s between each stat
  Duration: 2s, ease: power1.out
  snap: { textContent: 1 } — whole numbers only
```

### ─── SECTION 3: ABOUT PREVIEW ───
**Reference: Asli — split layout with image reveal + text**

```
LAYOUT:
  bg-cream, py-24
  Two columns: image left (45%), text right (55%)
  Gap: 64px

  LEFT — Image Composition:
    Main image: field team photo (rounded-2xl, shadow-2xl)
    GSAP: clipPath reveal from left (polygon animation)
    Overlapping badge bottom-right: bg-navy text-white rounded-2xl p-4
      "Est. 2017" (font-playfair bold text-2xl) + "South Sudan" (font-inter text-sm text-white/60)

  RIGHT — Text:
    Eyebrow: "About MHA"
    H2: font-playfair — "Delivering Life-Saving Assistance to Displaced Communities"
    Body: Two paragraphs from MHA profile (who they are, what they do)
    Checklist (green checkmarks):
      "Registered under NGOs Act 2016"
      "85% workforce deployed in the field"
      "Operating in hard-to-reach areas including islands reachable only by canoe"
      "Dual focus: emergency response + community resilience"
    CTA: "Read Our Full Story →" (text-navy font-semibold, underline on hover)

GSAP:
  Image: clipPath reveal from left, 1.2s
  Text content: stagger fadeUp, 0.12s between each element
  Checklist items: stagger fadeUp, 0.1s, start when checklist enters viewport
```

### ─── SECTION 4: THEMATIC AREAS GRID ───
**Reference: Asli card grid + charitywater.org program sections**

This is the signature section — MHA's 12 thematic areas as editorial cards.

```
LAYOUT:
  bg-navy-light (#E8EFF6), py-24
  Eyebrow: "Our Work"
  H2: "Thematic Areas of Focus"
  Subtext: "MHA operates across 12 interconnected thematic areas — from frontline protection to youth empowerment."

  Grid: 2 cols desktop, 1 col mobile
  Card layout (NOT square cards — editorial rectangles):

  THEMATIC CARD:
    Aspect ratio: 16:9-ish (wide rectangle)
    Full-width image bg with dark overlay (60% opacity)
    Content overlaid on image:
      Category badge top-left: bg-green/90 text-white rounded-full px-3 py-1 text-xs font-inter
      H3 bottom-left: font-playfair text-white text-2xl font-bold
      One-liner description: text-white/80 text-sm font-inter, max-w-md
      "Explore →" link: text-green font-inter font-semibold text-sm

    Hover effect:
      Image scales to 1.05 (CSS transform, 0.6s ease)
      Overlay lightens slightly (50% → 40%)
      "Explore →" shifts right 8px

  FIRST TWO CARDS (Protection + GBV): span full width (featured, larger)
  REMAINING CARDS: standard 2-col grid

GSAP:
  Cards stagger in: y:60 → y:0, opacity 0 → 1, stagger 0.12s
  Images: parallax at 0.2x speed within each card (subtle depth)
```

### ─── SECTION 5: IMPACT / FIELD STORIES ───
**Reference: theoceancleanup.com — dark cinematic storytelling section**

```
LAYOUT:
  bg-navy-dark (#0D1A2E), py-24
  Full dark section — cinematic feel

  Eyebrow: "From the Field" (text-green)
  H2: "Stories of Impact" (text-white)

  Horizontal scroll carousel (desktop) / vertical stack (mobile):
    3 story cards, each:
      Left: Full-height image (rounded-xl, w-96)
      Right:
        Location badge: "Leer County, Unity State" — text-gold font-inter text-xs uppercase
        H3: font-playfair text-white text-xl
        Story excerpt: text-white/70 text-sm, 3 lines max
        "Read Full Story →" — text-green

  Bottom: Large stat callout:
    "We reach communities others can't — including islands accessible only by canoe."
    font-playfair italic text-white/60 text-2xl, centered, max-w-3xl

GSAP:
  Section entry: dark overlay fades in
  Story cards: horizontal slide-in on desktop, stagger 0.2s
  Quote: fade up with 0.8s delay after cards
```

### ─── SECTION 6: WHERE WE WORK ───
**Reference: rescue.org/where-we-work**

```
LAYOUT:
  bg-cream, py-24
  Eyebrow: "Our Presence"
  H2: "Where We Work in South Sudan"

  Two columns:
    LEFT (60%): SVG map of South Sudan with highlighted counties
      Highlighted (fill: navy): Leer, Mayiandit, Panyijiar (Unity State)
      Highlighted (fill: green): Akobo, Uror, Duk, Pigi/Canal (Jonglei State)
      Unhighlighted: fill: #E0E5EB (light gray)
      Tooltip on hover: county name + "MHA Active"

    RIGHT (40%):
      State cards:
        "Unity State" — 3 counties listed (Leer, Mayiandit, Panyijiar)
        "Jonglei State" — 4 counties listed (Akobo, Uror, Duk, Pigi/Canal)

      Office locations:
        4 office cards: Juba HQ, Leer, Duk, Bentiu
        Each: icon (MapPin) + name + type (headquarters/field)

GSAP:
  Map: SVG paths draw in on scroll (stroke-dasharray animation)
  County highlights: fill transitions to color, stagger 0.15s
  Office cards: fadeUp stagger
```

### ─── SECTION 7: PARTNERS ───
**Reference: charitywater.org partner logos**

```
LAYOUT:
  bg-white, py-12, border-y border-border
  Text: "Trusted by leading humanitarian organizations"
  Auto-scrolling marquee of partner logos:
    USAID, SSHF, UNHCR, UNICEF, JVC
    (duplicated for infinite scroll)

  Logo treatment: grayscale by default, color on hover
  filter: grayscale(100%) → grayscale(0%)

CSS animation:
  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  animation: marquee 20s linear infinite
```

### ─── SECTION 8: CORE VALUES ───

```
LAYOUT:
  bg-navy (#1A3D6B), py-16
  3 columns (1 col mobile), divide-x divide-white/15

  Each value:
    Icon: Lucide icon in bg-white/10 rounded-xl p-3
    Title: font-playfair text-white text-xl font-bold
    Desc: font-inter text-white/60 text-sm

  Values:
    Integrity & Transparency
    Partnership & Collaboration
    Commitment & Excellence

GSAP:
  Fade up stagger, 0.15s between each
```

### ─── SECTION 9: CTA BAND ───
**Reference: Asli/Leksa dark CTA sections**

```
LAYOUT:
  bg-navy-dark (#0D1A2E), py-20, overflow-hidden
  Decorative: large circle (bg-white/5, 400px) positioned top-right, partially offscreen

  Grid: text left, contact cards right

  LEFT:
    Eyebrow: "Take Action"
    H2: "Join Us in Safeguarding Displaced Communities" — font-playfair text-white text-4xl
    Subtext: "Whether you're a donor, partner, or volunteer — your contribution can change lives." — text-white/60

  RIGHT:
    Two cards side by side:
      CARD 1 (phone): bg-white/10 rounded-3xl p-6 border border-white/10
        Phone icon in bg-green rounded-xl p-3
        "Call Us" — text-white/60 text-sm
        "+211 911828150" — font-playfair text-white text-xl font-bold

      CARD 2 (CTA): bg-green rounded-3xl p-6
        Mail icon in bg-white/20 rounded-xl p-3
        "Ready to help?" — text-white/80 text-sm
        "Contact Us Today" button — bg-white text-green font-inter font-bold rounded-full px-6 py-3

GSAP:
  Left text: fadeUp stagger
  Right cards: scaleIn from 0.9, stagger 0.2s
```

### ─── SECTION 10: FOOTER ───

```
LAYOUT:
  bg-navy-dark (#0D1A2E), text-white

  TOP: py-16, 4 columns (2-col on mobile)

  COL 1 — Brand:
    Logo (white: brightness-0 invert), h-12
    Tagline: "Safeguarding Rights. Restoring Dignity." — text-white/50 text-sm
    Social icons: Facebook, Twitter, LinkedIn — bg-white/10 hover:bg-green rounded-full p-2

  COL 2 — Quick Links:
    Home, About, Programs, Impact, Stories, Get Involved, Contact
    text-white/50 hover:text-white text-sm

  COL 3 — Our Programs:
    Protection, GBV, Child Protection, HLP, Youth Engagement
    text-white/50 hover:text-white text-sm

  COL 4 — Contact:
    Phone: +211 911828150
    Email: mobilehumanitarianagency@gmail.com
    Address: Hai Magateen, Juba, South Sudan
    All in text-white/50 text-sm

  BOTTOM: border-t border-white/10, py-5
    Left: "© 2025 Mobile Humanitarian Agency. All rights reserved."
    Right: "Privacy Policy · Terms · Sitemap"
    font-inter text-white/30 text-xs
```

---

## INNER PAGES

### /about
1. Full-viewport hero: field team photo, dark overlay, "About MHA" H1
2. Strategic Purpose section (dual focus: emergency + community resilience)
3. Mission & Vision (two cards: navy bg + green bg)
4. Core Values (3 cards, white bg)
5. Board of Directors overview (5 members, quarterly meetings)
6. Organizational capacity (management structure, 82 staff, policies)
7. Affiliations & memberships (list with badges)
8. CTA Band (reuse)

### /programs
1. Page hero: dark, "Our Programs"
2. Featured thematic areas (Protection, GBV, CP — large editorial blocks)
3. Full thematic grid (all 12 areas)
4. Link to individual program pages

### /programs/[slug]
1. Full-bleed hero image for that thematic area
2. Full description
3. Key activities list
4. Related field stories
5. Impact statistics for that area
6. CTA: "Support this program"

### /impact
1. Page hero: NFI distribution photo
2. Large animated stat counters (beneficiaries, counties, staff, years)
3. Coverage map (reuse Where We Work component)
4. Before/after stories
5. Annual highlights timeline

### /stories
1. Page hero
2. Editorial grid of field stories (image + headline + excerpt + location tag)
3. Filter by thematic area
4. Pagination

### /get-involved
1. Page hero
2. Three pathways: Donate, Partner, Volunteer
3. Each pathway: icon, description, CTA
4. Contact form (simplified: name, email, how you want to help)

### /contact
1. Page hero
2. Two columns:
   Left: Contact info + office locations + map
   Right: Contact form (full, with inquiry type dropdown)
3. Case manager / partner referral block

---

## CONTACT FORM → SUPABASE CRM

### Form Component
```typescript
// components/ui/ContactForm.tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  inquiry_type: z.enum([
    'I want to donate',
    'I want to partner with MHA',
    'I want to volunteer',
    'Media inquiry',
    'General inquiry',
  ]),
  message: z.string().min(10, 'Please write at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      // Show success toast
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className="font-inter text-sm font-medium text-text-dark mb-1 block">Full Name *</label>
        <input {...register('name')} className="w-full px-4 py-3 rounded-xl border border-border bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="font-inter text-sm font-medium text-text-dark mb-1 block">Email Address *</label>
        <input type="email" {...register('email')} className="w-full px-4 py-3 rounded-xl border border-border bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="font-inter text-sm font-medium text-text-dark mb-1 block">Phone (Optional)</label>
        <input type="tel" {...register('phone')} className="w-full px-4 py-3 rounded-xl border border-border bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all" />
      </div>

      {/* Inquiry Type */}
      <div>
        <label className="font-inter text-sm font-medium text-text-dark mb-1 block">How Can We Help? *</label>
        <select {...register('inquiry_type')} className="w-full px-4 py-3 rounded-xl border border-border bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all">
          <option value="">Select an option</option>
          <option>I want to donate</option>
          <option>I want to partner with MHA</option>
          <option>I want to volunteer</option>
          <option>Media inquiry</option>
          <option>General inquiry</option>
        </select>
        {errors.inquiry_type && <p className="text-red-500 text-xs mt-1">{errors.inquiry_type.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="font-inter text-sm font-medium text-text-dark mb-1 block">Your Message *</label>
        <textarea {...register('message')} rows={5} className="w-full px-4 py-3 rounded-xl border border-border bg-white font-inter text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all resize-none" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isSubmitting}
        className="w-full bg-navy text-white font-inter font-semibold text-sm rounded-full py-3.5 hover:bg-navy-dark disabled:opacity-50 transition-all">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

### API Route
```typescript
// app/api/contact/route.ts
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, inquiry_type, message } = body

    // 1. Store in Supabase
    const { error: dbError } = await supabase
      .from('inquiries')
      .insert([{
        name,
        email,
        phone: phone || null,
        inquiry_type,
        message,
        status: 'new',
        created_at: new Date().toISOString(),
      }])

    if (dbError) throw dbError

    // 2. Send notification email to MHA
    await resend.emails.send({
      from: 'MHA Website <noreply@mha-ss.org>',
      to: ['mobilehumanitarianagency@gmail.com', 'chuol@mha-ss.org'],
      subject: `New ${inquiry_type} from ${name}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Type:</strong> ${inquiry_type}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>View all inquiries at mha-ss.org/admin/inquiries</small></p>
      `,
    })

    // 3. Send confirmation email to user
    await resend.emails.send({
      from: 'Mobile Humanitarian Agency <noreply@mha-ss.org>',
      to: [email],
      subject: 'Thank you for contacting MHA',
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We have received your message and will respond within 48 hours.</p>
        <p>If this is urgent, please call us directly at +211 911828150.</p>
        <br>
        <p>Warm regards,</p>
        <p><strong>Mobile Humanitarian Agency</strong></p>
        <p>Safeguarding Rights. Restoring Dignity.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
```

---

## SUPABASE SCHEMA (Run in Supabase SQL Editor)

```sql
-- Inquiries table (contact form submissions)
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donors table
CREATE TABLE donors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  donation_amount DECIMAL(10,2),
  donation_date DATE,
  recurring BOOLEAN DEFAULT FALSE,
  relationship_start DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  last_contact TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners table
CREATE TABLE partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  org_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  partnership_type TEXT CHECK (partnership_type IN ('funder', 'ngo', 'government', 'un_agency', 'media', 'other')),
  current_projects TEXT,
  relationship_since DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteers table
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills TEXT,
  availability TEXT,
  interest_areas TEXT[],
  volunteer_since DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admin) can read/write
CREATE POLICY "Admin full access on inquiries" ON inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on donors" ON donors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on volunteers" ON volunteers FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous inserts on inquiries (contact form)
CREATE POLICY "Anyone can submit inquiry" ON inquiries FOR INSERT WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## ADMIN DASHBOARD (/admin)

### Layout
```
SIDEBAR (bg-navy-dark, w-64, fixed):
  Logo (white) top
  Nav items:
    Dashboard (LayoutDashboard icon)
    Inquiries (MessageSquare icon) — with count badge
    Donors (Heart icon)
    Partners (Handshake icon)
    Volunteers (Users icon)
    Settings (Settings icon)
  Bottom: "Logged in as Admin" + Sign Out

MAIN CONTENT (ml-64, bg-navy-50):
  Top bar: breadcrumb + search + profile
  Content area: cards, tables, actions
```

### Dashboard Overview (/admin)
```
ROW 1 — Stat Cards (4 across):
  "New Inquiries" — count, bg-white, navy icon
  "Total Donors" — count, bg-white, green icon
  "Active Partners" — count, bg-white, gold icon
  "Volunteers" — count, bg-white, navy icon

ROW 2 — Recent Inquiries Table:
  Columns: Name, Email, Type, Status, Date, Actions
  Status badges: New (green), Contacted (navy), Qualified (gold), Closed (gray)
  Actions: View, Quick Reply, Assign

ROW 3 — Quick Actions:
  "Export This Month's Report" (CSV)
  "Send Follow-up Email" (template selector)
```

### Inquiries Page (/admin/inquiries)
```
FILTERS: Status (all/new/contacted/qualified/closed) + Date range + Type
TABLE: Full inquiry list
  Columns: Name, Email, Phone, Type, Message (truncated), Status, Assigned To, Date
  Row click: expand to full detail view
  Quick actions: Change status, Assign, Add note, Send template email
BULK ACTIONS: Select multiple → Mark as contacted, Export CSV
```

### Color Theme for Admin
```
Sidebar: bg-navy-dark (#0D1A2E)
Active link: bg-navy text-white
Inactive link: text-white/50 hover:text-white/80
Top bar: bg-white border-b border-border
Cards: bg-white rounded-xl shadow-sm border border-border
Buttons: bg-navy (primary), bg-green (success), bg-gold (warning)
Status badges: 
  new = bg-green-light text-green
  contacted = bg-navy-light text-navy
  qualified = bg-gold-light text-gold
  closed = bg-gray-100 text-gray-500
```

---

## SEO (Same pattern as Amal Foundation / Dirir Realtors)

### Root Metadata
```typescript
export const metadata: Metadata = {
  title: {
    template: '%s | Mobile Humanitarian Agency',
    default: 'MHA — Humanitarian Response in South Sudan',
  },
  description: 'Mobile Humanitarian Agency (MHA) is a nonprofit NGO in South Sudan delivering protection, GBV response, child protection, and youth engagement services to displaced communities since 2017.',
  keywords: ['MHA', 'Mobile Humanitarian Agency', 'South Sudan NGO', 'humanitarian', 'protection', 'GBV', 'child protection', 'Juba', 'displacement'],
  metadataBase: new URL('https://mha-ss.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mha-ss.org',
    siteName: 'Mobile Humanitarian Agency',
    title: 'MHA — Humanitarian Response in South Sudan',
    description: 'Delivering life-saving assistance to displaced communities across South Sudan since 2017.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: 'PASTE_VERIFICATION_HERE' },
}
```

### Sitemap + Robots
Same pattern as Amal Foundation — create /src/app/sitemap.ts and /src/app/robots.ts with all pages listed.

### JSON-LD Schema
```typescript
// NGO + Organization schema
{
  '@type': ['Organization', 'NGO'],
  name: 'Mobile Humanitarian Agency',
  alternateName: 'MHA',
  url: 'https://mha-ss.org',
  foundingDate: '2017',
  foundingLocation: { '@type': 'Place', name: 'Juba, South Sudan' },
  areaServed: { '@type': 'Place', name: 'South Sudan' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+211911828150',
    email: 'mobilehumanitarianagency@gmail.com',
  },
}
```

---

## PERFORMANCE RULES

1. **Images:** All via next/image. Hero image: `priority`. Below-fold: lazy loaded. Format: WebP + AVIF.
2. **Fonts:** next/font/google with `display: 'swap'`. Never load via `<link>`.
3. **GSAP:** Import only what's needed: `gsap` + `ScrollTrigger`. Tree-shake everything else.
4. **Lenis:** Single instance in SmoothScroll wrapper. Never instantiate twice.
5. **WebGL:** HERO ONLY, lazy-loaded via `React.lazy()` + `Suspense`. Disabled on mobile.
6. **Code splitting:** Each admin page is a separate chunk (dynamic imports).
7. **Cache:** Static assets cached 1 year. Images cached 30 days.
8. **Target:** Lighthouse 85+ mobile, 95+ desktop.

---

## BUILD ORDER FOR CURSOR

```
PHASE 1 — Foundation:
1. Create Next.js project + install all dependencies
2. Configure tailwind.config.ts with MHA colors
3. Set up app/layout.tsx (fonts, SmoothScroll wrapper)
4. Create /src/lib/content.ts (paste full content above)
5. Create /src/lib/animations.ts (paste GSAP library above)
6. Create globals.css (eyebrow, smooth scroll styles)

PHASE 2 — Layout:
7. Build Navbar.tsx (transparent → solid on scroll)
8. Build Footer.tsx (4-col dark footer)

PHASE 3 — Homepage Sections (in order):
9.  HeroSection.tsx (full-viewport, dark overlay, text reveal)
10. StatsBar.tsx (navy band, animated counters)
11. AboutSection.tsx (split layout, image reveal, checklist)
12. ThematicGrid.tsx (editorial card grid, 12 thematic areas)
13. FieldStories.tsx (dark section, story cards)
14. WhereWeWork.tsx (SVG map + office cards)
15. PartnersStrip.tsx (auto-scroll logo marquee)
16. CTABand.tsx (dark CTA with phone + contact cards)

PHASE 4 — Homepage Assembly:
17. app/page.tsx — compose all sections in order

PHASE 5 — Inner Pages:
18. /about
19. /programs + /programs/[slug]
20. /impact
21. /stories + /stories/[slug]
22. /get-involved
23. /contact (with ContactForm component)

PHASE 6 — CRM Backend:
24. Set up Supabase project + run SQL schema
25. Create /src/lib/supabase.ts client
26. Build /app/api/contact/route.ts
27. Set up Resend for email
28. Build admin layout (sidebar, auth)
29. Build admin pages (dashboard, inquiries, donors, partners, volunteers)

PHASE 7 — SEO + Performance:
30. Add metadata to all pages
31. Create sitemap.ts + robots.ts
32. Create SchemaOrg.tsx
33. Create opengraph-image.tsx
34. Optimize all images
35. Lighthouse audit → fix issues

PHASE 8 — Deploy:
36. Deploy to Vercel
37. Connect domain (mha-ss.org)
38. Set up Google Search Console
39. Connect Cloudflare CDN
40. Final QA
```

---

## HARD RULES FOR CURSOR

1. **Colors are #1A3D6B navy + #4CAF50 green** — from MHA logo. Not blue-500, not teal, not indigo.
2. **Logo is always `<Image src="/logo.png" />`** — never text. On dark bg: `className="brightness-0 invert"`.
3. **Font-playfair for ALL headings** — never Inter or sans-serif for H1/H2/H3.
4. **No Lorem ipsum** — use content.ts for all text. Every word is real MHA content.
5. **No shadcn, MUI, Radix** — Tailwind custom components only (except admin dashboard may use basic shadcn).
6. **GSAP for scroll animations, Framer Motion ONLY as fallback** — don't mix both on same element.
7. **Lenis smooth scroll wraps entire app** — never initialize twice.
8. **viewport={{ once: true }}** on every scroll animation — no re-triggering.
9. **Mobile-first** — every component works at 375px before desktop.
10. **All images use next/image** — no `<img>` tags ever.
11. **Accessibility** — all images have descriptive alt, all buttons have aria-label, all form fields have label.
12. **Dark sections use navy-dark (#0D1A2E)** — not black, not gray-900.
13. **Field photos are REAL from MHA documents** — placed in /public/images/ folder.
