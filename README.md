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

Repo on GitHub: **`hakeemmeeh/MHA`** · branch **`main`** · app at **repository root** (not `frontend/`).

1. [vercel.com/new](https://vercel.com/new) → Import **`hakeemmeeh/MHA`** (or reconnect Git in project **Settings → Git**).
2. **Root Directory:** leave **empty**. If it still says `frontend`, click **Edit**, clear it, save — otherwise every deploy 404s.
3. **Framework:** Next.js · **Node.js:** 20.x · **Build:** `npm run build` · **Install:** `npm ci` (also in root `vercel.json`).
4. **Deployments** → latest → **Redeploy** (or push to `main` to auto-deploy).

If nothing deploys after a push: **Settings → Git** → **Disconnect** → connect **`hakeemmeeh/MHA`** again, branch **`main`**, then redeploy.

## Website releases & content ownership

- **Preview:** Use Vercel **Preview** deployments per PR before merge.
- **Production:** Merge to `main` after smoke-testing home, programs, one story, and contact.
- **Content:** Update `src/lib/content.ts` and images in `public/images/` when programs or stories change.
- **Checks:** Run `npm run lint` and `npm run build` before opening a PR.

## Contributing

1. Branch from `main`.
2. Run `npm run lint` and `npm run build`.
3. CI runs the same checks on push and pull requests.
