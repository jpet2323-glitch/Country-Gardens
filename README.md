# Country Gardens Farm Market & Deli — Website

Website for Country Gardens, 42 Robbinsville-Edinburg Rd, Robbinsville NJ 08691 · (609) 259-1221 · Est. 1986.

Plain HTML/CSS/JS with **Jekyll**, which GitHub Pages runs automatically every time you save a change. There's nothing to install or run. Each section is its own page, while the sidebar, footer and business details live in one shared place.

```
_config.yml             ← business details: phone, hours text, Toast/Formspree/social links, web address
_data/nav.yml           ← sidebar + footer menu
_includes/sidebar.html  ← sidebar
_includes/footer.html   ← footer (newsletter, links, contact)
_includes/mobile.html   ← phone header + Call / Directions / Order bar
_layouts/default.html   ← page wrapper (<head>, Google info, loads the CSS and script)
assets/site.css         ← all styling
assets/site.js          ← open/closed badge, seasonal content, forms, quote wizard, mobile menu
images/                 ← logo and photos
index.html, deli.html, … ← one file per page (just that page's content)
404.html                ← "page not found"
sitemap.xml, robots.txt ← help Google find every page
```

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Farm Market | `farm-market.html` |
| Deli | `deli.html` |
| Bakery | `bakery.html` |
| Catering | `catering.html` |
| Fundraising | `fundraising.html` |
| Landscaping & Hardscaping | `landscaping.html` |
| Garden Center | `garden-center.html` |
| Gallery | `gallery.html` |
| About Us | `about.html` |
| Visit Us | `visit.html` |
| Mulch Delivery | `mulch-delivery.html` |
| Bruce the Spruce | `bruce-the-spruce.html` |
| Rooted: Classes + Workshops | `classes-workshops.html` |
| Gift Cards | `gift-cards.html` |
| Donation Request Form | `donations.html` |
| Employment | `employment.html` |
| Request a Quote | `quote.html` (add `#landscape`, `#catering` or `#other` to pre-select a type) |

Each page file starts with a short block between `---` lines. The `title` and `description` there are what Google shows in search results, so keep them accurate. Old links from the one-page version (like `index.html#/deli`) redirect to the new pages automatically.

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
2. In the page's file (e.g. `deli.html`), search for `unsplash` and replace that `src="https://images.unsplash.com/..."` with `src="images/deli-counter.jpg"`.
3. Update the `alt="..."` text to describe the photo.

## Previewing on your computer (optional)

Opening the files directly won't show the sidebar and footer, because Jekyll assembles them. To preview locally, install Jekyll and run `jekyll serve`, then open http://localhost:4000/Country-Gardens/. Or just commit and check the live site a minute later.

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

- **Hours / phone:** change them in `_config.yml` (sidebar, footer, phone bar). Also update the home page top bar (`index.html`), the Visit Us table (`visit.html`), the Google info block in `_layouts/default.html`, and `var HOURS` in `assets/site.js`, which drives the "Open now / Closed" badge (always New Jersey time).
- **Seasonal content:** the home page's "What's Fresh" strip and the gold announcement bar change automatically by month (Winter, Spring, Summer, Fall, Holiday). Until Thanksgiving it promotes Thanksgiving orders, then switches to Christmas trees. Edit `var SEASONS` in `assets/site.js` to change the items or messages.
- **Years in business:** calculated automatically from 1986.
- **Web address:** once countrygardensnj.com is connected, open `_config.yml` and change `url` to `"https://countrygardensnj.com"` and `baseurl` to `""`. That updates link previews, the sitemap and Google's page addresses in one step.
