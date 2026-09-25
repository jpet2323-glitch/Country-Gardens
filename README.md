# Country Gardens Farm Market & Deli — Website

Website for Country Gardens, 42 Robbinsville-Edinburg Rd, Robbinsville NJ 08691 · (609) 259-1221 · Est. 1986.

Plain HTML/CSS/JS — no build step, no frameworks.

```
index.html               ← the whole site (every page lives in this one file)
images/logo.png          ← logo (sidebar, footer, browser tab icon)
images/storefront-sign.jpg ← home page hero photo
```

## Pages

Each page has its own link, so you can share them or bookmark them:

| Page | Link |
|---|---|
| Home | `#/home` |
| Farm Market | `#/farm-market` |
| Deli | `#/deli` |
| Bakery | `#/bakery` |
| Catering | `#/catering` |
| Fundraising | `#/fundraising` |
| Landscaping & Hardscaping | `#/landscaping` |
| Garden Center | `#/garden-center` |
| Gallery | `#/gallery` |
| About Us | `#/about` |
| Visit Us | `#/visit` |
| Mulch Delivery | `#/mulch-delivery` |
| Bruce the Spruce | `#/bruce-the-spruce` |
| Rooted: Classes + Workshops | `#/rooted` |
| Gift Cards | `#/gift-cards` |
| Donation Request Form | `#/donations` |
| Employment | `#/employment` |
| Request a Quote | `#/inquire` (or `#/inquire/landscape`, `#/inquire/catering`, `#/inquire/other` to pre-select a type) |

## Forms

All forms post to Formspree at `https://formspree.io/f/maqlgggp`. Each submission includes a `form_type` or `inquiry_type` field, so you can tell them apart in your inbox:

- Request a Quote (Landscape / Catering / Other)
- Donation Request
- Employment Application
- Newsletter Signup (footer, on every page)

**Before launch:** log in to Formspree and confirm the email address on the form is verified. Otherwise submissions won't reach you. Send one test from each form.

## Replacing placeholder photos

Most photos are Unsplash stock placeholders. To swap one in:

1. Put the real photo in `images/` (e.g. `images/deli-counter.jpg`). Keep it under ~500 KB. Landscape (4:3) works best.
2. In `index.html`, search for `unsplash` and replace that `src="https://images.unsplash.com/..."` with `src="images/deli-counter.jpg"`.
3. Update the `alt="..."` text to describe the photo.

## Hosting

### GitHub Pages
1. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / root → Save.
2. The site will be live at `https://<username>.github.io/Country-Gardens/` within a minute or two.

### Connecting countrygardensnj.com
1. In **Settings → Pages → Custom domain**, enter `countrygardensnj.com` and save. GitHub adds a `CNAME` file.
2. At your domain registrar, add DNS records:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<username>.github.io`
3. Once DNS resolves, tick **Enforce HTTPS**.

(Netlify works too. Drag the folder onto app.netlify.com/drop, then add the domain under *Domain settings*.)

## Quick edits

- **Hours / phone:** they appear in the sidebar, top bar, Visit Us page, footer, and the structured data block at the top of `index.html`. Search for `8am` or `259-1221` to find them all.
- **"What's Fresh" strip:** on the home page, search for `fresh-card`.
- **Years in business:** calculated automatically from 1986.
