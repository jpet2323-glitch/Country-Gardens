# Country Gardens — Next.js Rewrite

React/Next.js 14 (App Router) rewrite of the Country Gardens Farm Market & Deli
site. The project lives at the repo root. The old single-file HTML site has
been retired — it's still recoverable from git history if you ever need it.

## Stack

- **Next.js 14.2** (App Router, React Server Components)
- **React 18.3** + **TypeScript 5.5**
- **Tailwind CSS 3.4** for utilities, paired with ported custom CSS in
  `src/app/globals.css` (preserves the original design tokens + classes)
- **next/font** for Cormorant Garamond + DM Sans (no external Google Fonts link)
- **next/image** for optimized images (both local and Unsplash via
  `remotePatterns` in `next.config.mjs`)
- **Formspree** for inquiry + donation form submissions

## Project layout

```
./
├─ public/
│  └─ images/            # logo.png, hero.jpg (extracted from the old site)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx       # <html>, fonts, sidebar shell, metadata
│  │  ├─ page.tsx         # Home
│  │  ├─ globals.css      # design tokens + all ported styles
│  │  ├─ robots.ts        # env-aware (disallow on previews)
│  │  ├─ sitemap.ts       # built from nav.ts
│  │  └─ <route>/page.tsx # one folder per route (19 routes)
│  ├─ components/         # shared UI + form components
│  └─ lib/
│     ├─ nav.ts           # nav groups, footer links, business info
│     └─ formspree.ts     # Formspree endpoint wrapper
├─ .env.local.example     # copy to .env.local and fill in
├─ next.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## Routes

Every tab/panel from the original SPA is now a real route (better SEO and
deep-linkable). The full set, built from `src/lib/nav.ts`:

`/` • `/farm-market` • `/deli` • `/bakery` • `/catering` • `/fundraising` •
`/landscape` • `/garden-center` • `/gallery` • `/about` • `/visit` •
`/mulch` • `/bruce-the-spruce` • `/rooted` • `/gift-cards` •
`/donation-request` • `/employment` • `/inquire`

`/menu` was a duplicate of `/deli` on the original site and now redirects.
`/visit` replaces the old `/hours` and `/contact` panels (they had identical
content).

## Running locally

```bash
# Install dependencies
npm install

# Copy env template and fill it in
cp .env.local.example .env.local

# Start the dev server
npm run dev
```

The dev server listens on **http://localhost:3000** by default. If port 3000
is already in use, run Next on a different port:

```bash
PORT=3001 npm run dev
```

### Other scripts

```bash
npm run build     # production build
npm run start     # run the production build locally
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Environment variables

Only one is required:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree endpoint for inquiry + donation forms. Falls back to the original endpoint used by the HTML site. |

## Content changes

Almost all static content is driven by a small number of files, so you rarely
need to hunt through JSX:

- **Business info** (phone, address, hours, Toast URL, socials): `src/lib/nav.ts`
  → `business`
- **Sidebar / footer nav items**: `src/lib/nav.ts` → `navGroups`, `footerLinks`
- **Metadata + social preview**: `src/app/layout.tsx` → `metadata`
- **Colors, fonts, spacing**: CSS variables at the top of `src/app/globals.css`

To add a new route, add a folder under `src/app/`, drop in a `page.tsx`, and add
an entry to `navGroups` in `nav.ts` — the sidebar + sitemap pick it up
automatically.

## Responsive behavior

- ≥ 901px: Fixed 220px sidebar, scrollable main content area
- ≤ 900px: Sidebar collapses behind a hamburger overlay; body scrolls normally

See `src/components/MobileToggle.tsx` and the media queries in `globals.css`
around `.sidebar`, `.app-shell`, and `.main-content`.

## Forms

`InquiryForm` (on `/inquire`) is a 3-step wizard with three variants
(Landscape / Catering / Other). `DonationForm` (on `/donation-request`) is a
single-page form. Both POST to the same Formspree endpoint with different
`_subject` and `form_type` hidden fields so the owner can filter emails.

## Deployment

See [`DEPLOY.md`](./DEPLOY.md) for the full Vercel walkthrough, including the
two-environment (production + previews) setup, DNS cutover, and branch
strategy.
