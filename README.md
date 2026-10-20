# Phonehaus

A phone-store concept built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. The catalogue includes Apple, Samsung, Xiaomi, and Redmi.

## Local development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:8080).

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npm run package:vercel
npm run test:deployment
```

## What works now

- Responsive home page and brand collections.
- Search, brand and budget filters, and price sorting.
- Shared product catalogue with individual detail pages.
- Shopping bag with quantity controls and browser storage.
- About page and a local-only contact message preview.
- Clear account and checkout placeholders while the new backend is being set up.

Prices in PHP, inventory, and product illustrations are demonstration content. No payments are processed. Phonehaus is independent of the brands displayed.

## Fresh Supabase setup

The inaccessible original Supabase connection has been disabled and its environment file removed. Browsing and the bag do not need Supabase.

When a new project is ready, copy `.env.example` to `.env.local`, add the new project's URL and browser publishable key, and set `VITE_ENABLE_SUPABASE=true`. Restart Vite after changing environment variables. Never put a service-role key or database password in a `VITE_` variable.

Before enabling accounts and demo ordering, apply and review the SQL migrations under `supabase/migrations`, apply the included owner-only profile policy, configure authentication redirect URLs, and verify access with separate test users. Existing users and orders cannot be restored without a backup of the old project.

The legacy order flow is a course demo: it accepts client-supplied prices, does not process payments, and does not create orders and items atomically. It needs server-side validation and a transaction before real commerce.

## Deployment status

GitHub Actions CI/CD is configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Pull requests run lint, TypeScript, production build, and deployment tests. Successful pushes to `main` deploy the tested artifact to Vercel once the required secrets are configured.

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for architecture, platform trade-offs, account setup, environment settings, verification, and submission links. The new Vercel and Supabase projects have not been created yet, so no live URL is claimed.
