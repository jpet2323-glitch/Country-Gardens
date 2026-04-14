# Deploying to Vercel

This guide covers the two-environment setup you picked:

- **Production** — live site at your custom domain. Only `main` deploys here.
- **Preview** — every other branch and every pull request gets its own temporary
  URL for sharing/QA. Indexing is blocked automatically.

Nothing here runs against production until you explicitly wire up your real
domain (see step 5). Everything before that is safe to play with.

## 0. Prerequisites

- A Vercel account (free hobby plan is fine while testing)
- Your repo pushed to GitHub/GitLab/Bitbucket
- The Next.js project committed on a branch (now at repo root)

## 1. Import the project

1. Sign in at <https://vercel.com>
2. Click **Add New → Project** and pick the Git repo
3. Leave the root directory at `./` — Vercel auto-detects Next.js
4. Leave framework, build command, output directory at defaults — Vercel reads
   them from `package.json` and `next.config.mjs`

## 2. Environment variables

In the project settings → **Environment Variables**, add:

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | your Formspree endpoint | Production, Preview |

You can copy the same value to both, or use a separate "test" Formspree form
for previews so form submissions from QA don't hit the owner's real inbox.

## 3. Branch strategy

| Branch | Deploys to |
|---|---|
| `main` | Production (once you promote it in step 5) |
| Any PR / feature branch | A unique **Preview** URL |

Recommended flow:

1. Work on a feature branch, e.g. `feature/update-hours`
2. Open a pull request to `main` — Vercel posts a preview URL comment on the PR
3. Review it, share with the family for sign-off
4. Merge to `main` — Vercel deploys that commit to production

For small text tweaks you can commit directly to `main` too; Vercel still runs
the build first and rolls back on failure.

## 4. Indexing / robots.txt

`src/app/robots.ts` reads Vercel's built-in `VERCEL_ENV` variable:

- `production` → normal `robots.txt` (allow all, include sitemap)
- anything else → disallow everything

This prevents preview URLs from being crawled. No extra config needed.

## 5. Pointing your real domain (when you're ready)

Once the family gives you access to the domain (e.g. `countrygardensnj.com`):

1. In Vercel → **Settings → Domains → Add** → enter the domain
2. Vercel tells you what DNS records to set. Two options:
   - **Nameserver swap** — let Vercel run DNS (simplest)
   - **A/CNAME records** — keep your current DNS host, point records at Vercel
3. Wait for DNS to propagate (usually minutes, up to a few hours)
4. Vercel provisions the SSL certificate automatically

Before the cutover, you can verify everything looks right on the Vercel-assigned
`*.vercel.app` URL — that domain stays working forever.

### Dry-run tip

If you want to see the exact production HTML before flipping DNS:

1. Keep DNS pointed at the current HTML site
2. Visit the `countrygardens-xxxx.vercel.app` URL Vercel gives you — that's
   your production build
3. Only when it looks right do you change the domain

## 6. Rollbacks

Every deploy on Vercel is immutable. If a push breaks production:

- **Vercel dashboard → Deployments** → find the last good one → **Promote to
  Production**

This takes a few seconds and doesn't require a git revert.

## 7. Upgrading the Hobby plan

The free Hobby plan is fine for getting started but has a couple of rules that
bite small businesses:

- **No commercial use** — technically a terms-of-service issue for a real
  business site. Upgrade to **Pro** (~$20/mo) before you put real traffic
  through it.
- Pro gets you larger build/minute quotas, team seats, and analytics.

That's the only plan bump you need for this size of site.

## 8. Monitoring

Free + built-in:

- **Vercel Analytics** (toggle on in project settings) — traffic, top pages
- **Build logs** — every deploy keeps logs for 30 days

Optional:

- Add **Vercel Speed Insights** (one line in `layout.tsx`) for Core Web Vitals
- Add **Sentry** if you want error tracking later

## 9. Checklist before going live

- [ ] `NEXT_PUBLIC_FORMSPREE_ENDPOINT` set in both Production and Preview
- [ ] Test form submission on a preview URL and confirm the email lands
- [ ] Open `/sitemap.xml` and `/robots.txt` on the production URL and check
      they look right
- [ ] Update `metadataBase` in `src/app/layout.tsx` if the real domain is
      different from `https://countrygardensnj.com`
- [ ] Update the `business` object in `src/lib/nav.ts` if any contact info
      needs to change
- [ ] Swap placeholder Unsplash photos with real Country Gardens photos
      (in each `page.tsx` and `src/app/page.tsx`)
- [ ] Promote the latest deploy to Production and flip DNS
