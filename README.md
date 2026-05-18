# MHA Website

Marketing site and admin UI for **Mobile Humanitarian Agency**, built with [Next.js](https://nextjs.org/) (App Router).

## Repository layout

| Path        | Description                    |
| ----------- | ------------------------------ |
| `frontend/` | Next.js 16 app — run dev here |

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (lockfile is `frontend/package-lock.json`)

## Local development

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your keys (Supabase / Resend as needed)
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts (from `frontend/`)

| Command        | Purpose        |
| -------------- | -------------- |
| `npm run dev`  | Dev server     |
| `npm run build`| Production build |
| `npm run start`| Serve production build |
| `npm run lint` | ESLint         |

## Environment variables

See `frontend/.env.example`. Production hosts (e.g. Vercel) should define the same keys in the project environment settings.

## Website releases & content ownership

- **Preview:** Use Vercel (or your host) **Preview** deployments for each pull request so staff can review copy and images before merge.
- **Production:** Merge to the default branch only after a quick smoke test (home, programs, one story, contact form).
- **Ownership:** Name a **content owner** (e.g. communications lead) who updates `frontend/src/lib/content.ts` and hero images in `frontend/public/images/` when programs or stories change.
- **Checks:** From `frontend/`, run `npm run lint` and `npm run build` before opening a PR; CI should mirror the same commands.

## Contributing

1. Create a branch from `main`.
2. Run `npm run lint` and `npm run build` in `frontend/` before opening a PR.
3. CI runs the same checks on push and pull requests.
