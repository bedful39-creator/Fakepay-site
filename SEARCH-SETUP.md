# Getting PayMod indexed on Google & Bing

The site is live at **https://www.fakepay.net/** (hosted at Ultahost — the
apex `fakepay.net` 308-redirects to `www`, so `www` is the canonical host) and
is SEO-tagged for that exact URL (canonical, og:url, JSON-LD, robots.txt,
sitemap.xml all match). Search engines can only see it because it is publicly
hosted — nothing below works for `localhost`.

## What is already in place

| Piece | Where |
|---|---|
| Title + meta description (156 chars — in Bing's healthy range) | `index.html` `<head>` |
| Canonical URL = the live URL | `index.html` `<head>` |
| Open Graph + Twitter cards (with `og-image.png`) | `index.html` `<head>` |
| Structured data (SoftwareApplication, free / $0) | `index.html` JSON-LD |
| Site icon (real emerald block: 64/180/192/512) | `favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` |
| Manifest | `site.webmanifest` |
| Crawler rules | `robots.txt` (allows all + points to sitemap) |
| Sitemap | `sitemap.xml` |

Pushing to GitHub does **not** update the live site — after editing any file,
re-upload the changed files to the host so the served copy matches.

## Why Bing rejected it before

Bing rejected the live page because its `<link rel="canonical">` pointed at an
old, dead GitHub Pages URL — so `https://www.fakepay.net/` looked like an
"alternate version" of a canonical Bing could never fetch. The canonical now
equals the live URL, so that error clears on the next crawl. (An earlier
round of errors came from `paymod.net`, which serves an unrelated login app.)

## Bing Webmaster Tools (do this now)

1. Open <https://www.bing.com/webmasters> → **Get started** → add site
   **`https://www.fakepay.net/`** (or import from Google
   Search Console, which skips most setup).
2. Verify ownership with the meta tag Bing gives you — paste it into the `<head>`
   of `index.html`, commit, push, and re-upload to the host.
3. **Sitemaps** → submit
   `https://www.fakepay.net/sitemap.xml`.
4. **URL Submission** → submit
   `https://www.fakepay.net/` for an immediate crawl.
   Submit that exact URL (leading `www`, trailing slash) — the bare
   `fakepay.net` and `http://` forms redirect to it and are rejected as
   "alternate versions".

## Google Search Console

1. <https://search.google.com/search-console> → **Add property** → **URL prefix**
   → `https://www.fakepay.net/`, verify via the HTML tag method as above.
2. **Sitemaps** → submit `sitemap.xml`.
3. **URL Inspection** → paste the site URL → **Request indexing**.

## Changing domains later

To move the site to a different domain:

1. Point the new domain's DNS at the host that serves the site.
2. Update these four spots together (search for `https://www.fakepay.net/`):
   `index.html` (canonical + og:url + og:image + twitter:image + JSON-LD),
   `robots.txt`, `sitemap.xml`, this file — then re-upload to the host.
3. Re-submit the new URL in Search Console / Bing — the old URL becomes an
   alternate and must be re-crawled as the new canonical.

## Good to know

- No indexing request is instant: new sites typically appear in results in a
  **few days to two weeks** after requesting indexing.
- Rankings depend on content/competition — the tags make the site *eligible* and
  control *how* it looks (title, description, favicon, preview card); they can't
  guarantee a position.
- Preview checkers for social cards: <https://cards-dev.twitter.com/validator> and
  <https://developers.facebook.com/tools/debug/>.
