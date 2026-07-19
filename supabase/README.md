# MHA Backend — Supabase CRM Setup

The frontend was already wired for Supabase (contact API, admin pages, `supabase.ts`).
This adds the actual backend: database schema, data-access layer, live admin pages,
and two new API routes.

## What was added

**Database**
- `supabase/schema.sql` — tables (`inquiries`, `donors`, `donations`, `partners`, `volunteers`), enums, indexes, `updated_at` triggers, RLS, and a `dashboard_stats` view.
- `supabase/seed.sql` — optional sample data so the dashboard isn't empty.

**Data-access libs** (mirror the existing `src/lib/admin/inquiries.ts` pattern)
- `src/lib/admin/stats.ts` · `donors.ts` · `partners.ts` · `volunteers.ts`

**Admin pages — now read live data**
- `/admin` (dashboard cards + recent inquiries), `/admin/donors`, `/admin/partners`, `/admin/volunteers`

**API routes**
- `POST /api/volunteer` — volunteer applications → `volunteers` table + notify email
- `PATCH /api/inquiries/[id]` — update inquiry status/notes/assignment (admin workflow)
- (`POST /api/contact` already existed — unchanged)

## Setup (5 minutes)

1. **Create a Supabase project** at supabase.com.
2. **Run the schema:** Supabase → SQL Editor → paste `supabase/schema.sql` → Run.
   Optionally run `supabase/seed.sql` for demo data.
3. **Copy env vars** into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...           # Settings → API → anon
   SUPABASE_SERVICE_ROLE_KEY=eyJ...               # Settings → API → service_role (server only)
   RESEND_API_KEY=re_...                          # for email notifications
   CONTACT_NOTIFY_EMAIL=mobilehumanitarianagency@gmail.com
   ```
4. **In Vercel**, add the same vars under Project → Settings → Environment Variables.
5. `npm run dev`, submit the contact form, then open `/admin` — the inquiry appears.

## Security model

All CRM tables have **Row Level Security enabled with no public policies**. The site
reads/writes through the **service role key**, used only in server code (API routes and
server components), which bypasses RLS. The anon key never touches CRM data, so the
tables are sealed even if the anon key leaks. To let the browser insert inquiries
directly, uncomment the anon insert policy at the bottom of `schema.sql`.

> Note: `/admin` has no auth gate yet — it relies on the route being unlinked and
> `noindex`. Before going live, add Supabase Auth or a middleware password check.

---

# CMS — Content Publishing (added)

The client can now publish stories, news, insight posts and videos, and upload
images, directly from `/admin` — no developer or Supabase access needed for content.

## What was added

**Database**
- `supabase/cms-schema.sql` — tables `stories`, `news`, `blog_posts`, `videos`, plus
  a public Storage bucket `media` for image uploads. Public can read *published* rows
  only (drafts stay private); the service role writes everything.

**Public site (with fallback)**
- `src/lib/published-content.ts` — fetches published content from Supabase and merges
  it with the existing `src/lib/content.ts`. Supabase wins on slug; anything only in
  `content.ts` still shows. If Supabase is empty or unreachable, the site falls back to
  `content.ts` entirely, so pages never go blank.
- The stories / news / blog / media pages (and their `[slug]` pages) now read through
  this layer. `dynamicParams = true` lets newly-published slugs resolve.

**Admin**
- New menu items: Stories, News, Insights, Videos (under `/admin/content/...`).
- `ContentManager` + `ImageUploadField` components — add / edit / delete with a
  draft/published toggle and drag-free image upload.
- API routes: `POST/GET /api/media` (image upload to Storage) and
  `GET/POST/PATCH/DELETE /api/content/[type]` (content CRUD).

## Setup (in addition to the CRM steps above)

1. Run `supabase/cms-schema.sql` in the SQL Editor (after `schema.sql`).
2. That's it — the `media` Storage bucket and read policies are created by the script.
   Uploads and content management work as soon as the Supabase env vars are set.

## How content flows

Client clicks **Add new** in `/admin/content/stories` → fills the form → **Save** →
row lands in Supabase `stories` with `status = published` → the public `/stories`
page fetches it on next load. Until they publish anything, the original `content.ts`
stories keep showing. Migration is gradual and safe.

### One-time import (recommended)

After CMS schema is set up, sign in to `/admin/settings` and click **Import content to
Supabase**. This copies all built-in stories, news, insights, and videos into the CMS
so staff can edit them without retyping. Safe to run again — matching slugs are updated.
