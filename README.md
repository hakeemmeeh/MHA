# MHA Website

Marketing site and admin UI for **Mobile Humanitarian Agency**, built with [Next.js](https://nextjs.org/) (App Router).

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (`package-lock.json` at repo root)

## Local development

```bash
cp .env.example .env.local
# Edit .env.local with your keys (Supabase / Resend as needed)
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Purpose              |
| --------------- | -------------------- |
| `npm run dev`   | Dev server           |
| `npm run build` | Production build     |
| `npm run start` | Serve production build |
| `npm run lint`  | ESLint               |

## Environment variables

See `.env.example`. On Vercel, add the same keys under **Settings → Environment Variables**.

## Deploy on Vercel

1. Import the GitHub repo; leave **Root Directory** empty (repository root).
2. **Framework Preset:** Next.js · **Node.js:** 20.x
3. **Install:** `npm ci` · **Build:** `npm run build` (defaults)
4. Redeploy after connecting the repo.

## Website releases & content ownership

- **Preview:** Use Vercel **Preview** deployments per PR before merge.
- **Production:** Merge to `main` after smoke-testing home, programs, one story, and contact.
- **Content:** Update `src/lib/content.ts` and images in `public/images/` when programs or stories change.
- **Checks:** Run `npm run lint` and `npm run build` before opening a PR.

## Contributing

1. Branch from `main`.
2. Run `npm run lint` and `npm run build`.
3. CI runs the same checks on push and pull requests.
