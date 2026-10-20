# Phonehaus Deployment Strategy

## Submission status

| Deliverable                             | Location / status                                                                                                                                                 |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Live application URL                    | **Pending the first successful GitHub Actions deployment.** No Vercel project exists yet.                                                                         |
| Repository                              | [VincentThis/GreenShop](https://github.com/VincentThis/GreenShop) — Phonehaus redesign and deployment setup are prepared on the `codex/phonehaus-deployment` review branch. |
| CI/CD configuration                     | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)                                                                                                    |
| Repository workflow link for submission | [GitHub workflow file](https://github.com/VincentThis/GreenShop/blob/main/.github/workflows/deploy.yml) — available after pushing this file to `main`.            |
| Architecture justification              | This document, `DEPLOYMENT.md`                                                                                                                                    |

Review-branch files: [workflow](https://github.com/VincentThis/GreenShop/blob/codex/phonehaus-deployment/.github/workflows/deploy.yml) and [architecture document](https://github.com/VincentThis/GreenShop/blob/codex/phonehaus-deployment/DEPLOYMENT.md).

After the workflow succeeds, replace the pending live URL with the verified production domain from Vercel. Keep the successful Actions run as deployment evidence. Do not submit a localhost URL or an invented `vercel.app` address.

## 1. Architecture and chosen infrastructure

Phonehaus is a React 18 / TypeScript single-page phone-store application. Vite builds static HTML, CSS, JavaScript, and local SVG illustrations into `dist/`. Tailwind CSS and shadcn/ui provide styling. `HashRouter` handles routes such as `/#/shop?brand=Samsung`; the URL fragment stays in the browser, so the host only needs to serve the root document and static assets. There is no Next.js server, container, custom operating-system dependency, or long-running application process.

The selected infrastructure is **Vercel for the static frontend**, **a new Supabase project for authentication and PostgreSQL**, and **GitHub Actions for CI/CD**. The previous Supabase project is inaccessible and is not reused.

```text
Pull request / main push
        |
GitHub Actions: install -> lint -> typecheck -> build -> package -> tests
        |
main only: optional Supabase migrations -> Vercel prebuilt deployment
        |                                      |
        |                               Public HTTPS / CDN
        |                                      |
        +------------------------ Browser: React application
                                               |
                                    Supabase Auth + PostgreSQL
                                    (when explicitly enabled)
```

### Why Vercel and Supabase fit

- **Stack fit:** Vercel serves the Vite output directly. Supabase fits the existing client library, authentication flow, typed database schema, and SQL migrations. Neither service requires maintaining a VM.
- **Cost:** A personal, non-commercial course demo fits Vercel Hobby's intended use. Supabase offers a free tier, but inactivity can pause free projects. This is a budget starting point, not a guarantee of perpetual availability. Recheck provider limits before grading. A real commercial shop requires an appropriate Vercel plan. See [Vercel Hobby](https://vercel.com/docs/plans/hobby) and [Supabase pricing](https://supabase.com/pricing).
- **Scaling:** The CDN serves frontend assets independently of database traffic. Supabase capacity must be monitored separately as authenticated users and order queries grow. Add indexes and query limits, then increase database capacity when measurements justify it. Static frontend delivery does not automatically scale PostgreSQL.
- **Operations:** HTTPS and frontend distribution are managed. An explicit build artifact lets the pipeline deploy the files it tested, without a second provider-side build.

## 2. Trade-offs and alternatives

| Option                           | Assessment for Phonehaus                                                                                                                                                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Vercel + Supabase — selected** | Low operational overhead and a direct fit for static React plus managed Auth/PostgreSQL. Trade-offs include provider dependence, plan limits, separate frontend/database monitoring, and build-time frontend configuration.                                                    |
| Netlify                          | A viable static host with a similar deployment model. Rejected because the project owner chose a fresh Vercel setup and no longer controls the earlier Netlify account. Maintaining both hosts adds no value here.                                                             |
| Cloudflare Pages / Workers       | A viable choice for static delivery or an application needing custom edge logic. This project has no edge-processing requirement; Vercel satisfies its present needs without another runtime or integration to maintain.                                                       |
| Docker + AWS ECS                 | Appropriate if a future backend requires custom native dependencies, persistent processes, or several services. Today it would add image management, IAM, networking, load balancing, monitoring, and potentially idle infrastructure charges to an otherwise static frontend. |
| Local / on-premise server        | Offers control for an internal application with strict privacy constraints. This public course demo needs external access; on-premise hosting would require maintaining uptime, certificates, public routing, patches, and backups.                                            |

The application uses hash URLs rather than clean server-routed paths, and client rendering limits search-engine visibility. A future storefront needing SEO or server rendering should revisit the architecture. Public browser variables are embedded during the build: changing them requires another deployment. Frontend rollback does not roll back database migrations.

## 3. CI/CD pipeline

The workflow is `.github/workflows/deploy.yml`. It runs automatically for pull requests targeting `main` and pushes to `main`, including successful merges. No manual workflow trigger or manual artifact upload is required.

1. **Install:** Use Node.js 22 and `npm ci` with `package-lock.json` for reproducible application dependencies.
2. **CI checks:** Run ESLint and TypeScript checks for both the application and Vite configuration. Lint errors stop deployment; existing warnings remain visible.
3. **Build:** Validate frontend environment settings, then run Vite's production build. Pull requests use the offline catalogue; `main` uses the repository's configured public frontend variables.
4. **Package and test:** Copy `dist/` into `.vercel/output/static`, add Build Output API v3 configuration, and run Node tests. Tests verify compiled entry assets, all eight catalogue illustrations, and byte-for-byte agreement between the build and deployment package.
5. **Artifact handoff:** Store the verified package as a commit-specific GitHub artifact. The deployment job depends on successful verification and runs only for a push to `main`.
6. **Database:** When Supabase is explicitly enabled, validate that its URL and project reference match, then apply pending migrations with the pinned Supabase CLI. Missing credentials or failed migrations stop the frontend deployment. Migration privileges are only available to the deployment job.
7. **CD:** Deploy the downloaded artifact with the pinned Vercel CLI using `--prebuilt --prod`. `vercel.json` disables Vercel's parallel Git deployment path so the Actions checks remain the release gate. The application is not rebuilt during deployment.
8. **Verification:** Record the returned deployment URL in the Actions summary, then check public HTTPS access, the Phonehaus document, compiled JavaScript/CSS, and sample phone illustrations. A failed check marks the run failed; it does not automatically undo a published release.

GitHub token permissions are read-only. Production runs are serialized to avoid overlapping releases. Protect `main` with required CI checks and restrict the `production` environment to `main`. Leave environment approval gates off if fully unattended deployment is required by the course.

The package sets security response headers and immutable caching for Vite's hashed assets. Existing hash-based links need no catch-all rewrite; missing files can return a real 404. See [Vercel Build Output API](https://vercel.com/docs/build-output-api/configuration), [prebuilt deployments](https://vercel.com/docs/cli/deploy#prebuilt), and [Git deployment configuration](https://vercel.com/docs/project-configuration/git-configuration).

## 4. One-time account setup

### Vercel

Use an account you control. The following commands provision and link an empty project; they do **not** upload or deploy the application:

```sh
npx --yes vercel@64.7.0 login
npx --yes vercel@64.7.0 project add phonehaus
npx --yes vercel@64.7.0 link --project phonehaus
```

If the project name is unavailable, use another name consistently. Select the same account/team for creation and linking. `.vercel/project.json` contains `orgId` and `projectId`; it is ignored by Git. Generate a Vercel access token for that account/team and add these **GitHub Actions secrets**, preferably in the `production` environment:

| Secret              | Value                                                      |
| ------------------- | ---------------------------------------------------------- |
| `VERCEL_TOKEN`      | Vercel access token with permission to deploy this project |
| `VERCEL_ORG_ID`     | `orgId` from the local linking file                        |
| `VERCEL_PROJECT_ID` | `projectId` from the local linking file                    |

Keep production publicly accessible for the grader. The live smoke check deliberately does not use an authentication bypass token. Never commit tokens or the linking file.

### New Supabase project

Create a new project in an account you control. Select a region close to the expected users, keep its database password in a password manager, and configure authentication Site URL and allowed redirect URLs to the actual Vercel production origin after the first deployment.

Initially, `VITE_ENABLE_SUPABASE` defaults to `false`: the catalogue and browser-saved bag work, while account/order screens clearly say they are unavailable. This is **not** a completed database-backed deployment. To enable accounts and demo orders, add these **GitHub repository Actions variables**:

| Variable                        | Value                                                                |
| ------------------------------- | -------------------------------------------------------------------- |
| `VITE_ENABLE_SUPABASE`          | `true` only when the new project and migration credentials are ready |
| `VITE_SUPABASE_URL`             | `https://<new-project-ref>.supabase.co`                              |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser publishable key, or legacy `anon` key                        |
| `SUPABASE_PROJECT_REF`          | New project reference; must match the URL                            |

Add **production environment secrets** `SUPABASE_ACCESS_TOKEN` and `SUPABASE_DB_PASSWORD`. The token must have access to the new project. The workflow applies all pending SQL migrations, including the owner-only profile SELECT policy, before deploying the enabled frontend. Do not run a production database reset.

Because GitHub Actions builds the frontend, set these build variables in **GitHub**, not only the Vercel dashboard. Variables in `.env.local` affect local development only. No Supabase credentials are required for the disabled catalogue demo.

Enable row-level security and review migrations before real data is entered. The browser publishable key is public by design; service-role keys, database passwords, and access tokens must never appear in `VITE_*`, source code, or the static package. The build rejects a service-role/secret key in the browser-key field. See [Supabase API key guidance](https://supabase.com/docs/guides/getting-started/api-keys) and [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 5. Release, verification, rollback, and costs

Commit the Phonehaus source, deployment files, lockfile, tests, and this document. Push a feature branch and open a pull request; after its checks pass, merge to `main`. The merge triggers deployment automatically. For the initial repository setup, a push to `main` also triggers the same pipeline.

After deployment, verify the production domain in a signed-out browser: homepage, all four brands, direct `/#/product/101` navigation and reload, search, filters, images, cart quantity updates, and bag persistence. If Supabase is enabled, create test accounts, confirm email redirects, edit a profile, and verify two users cannot read each other's profiles or orders. The automated HTTP check does not replace those authenticated browser tests. Confirm that the default production domain is also accessible, not just the deployment-specific URL.

The contact form currently previews a message locally; it does not send it. Demo orders do not process payments, trust client-supplied prices, and insert orders/items separately. Server-validated pricing and transactional writes are required before real commerce. Migrating the schema does not restore the old project's users or orders.

For a failed release, revert its source commit through a pull request and merge to `main`; the pipeline deploys the corrected version. If the site needs immediate recovery, restore a known-good deployment using Vercel's available rollback controls. Treat database changes separately: retain backups and prefer additive migrations that older frontend versions can still use.

Use free plans for grading where eligible. Check usage dashboards and enable available billing/usage notifications before selecting a paid tier. If paid services are added, set spending controls and alerts before release. After grading, export any needed data, remove unused paid resources, and revoke deployment tokens. Resume a paused Supabase free project before the grading session if necessary. No paid infrastructure has been provisioned by these repository changes.

## Local validation

Node.js 22: production build, application/configuration typechecks, workflow YAML parsing, and all four deployment tests passed. ESLint passed with eight pre-existing warnings and no errors. The tests also verify rejection of missing backend settings and privileged keys in the browser configuration. GitHub-hosted execution, public HTTPS checks, and remote Supabase migrations remain unverified until the accounts and credentials are configured.
