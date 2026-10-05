# Getting PayMod indexed on Google & Bing

The site is live on **GitHub Pages** at
**https://bedful39-creator.github.io/Fakepay-site/** and is SEO-tagged for that
exact URL (canonical, og:url, JSON-LD, robots.txt, sitemap.xml all match).
Search engines can only see it because it is publicly hosted — nothing below
works for `localhost`.

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

GitHub Pages rebuilds and redeploys automatically on every push to `main`, so
edits go live without any extra step.

## Why Bing rejected it before

`paymod.net` does **not** serve this site — the domain currently points at an
unrelated "Login | PAYMOD" panel app (whose meta description is the 6-character
string `PAYMOD`), and `www` returns an nginx 404. Bing crawled that content and
its duplicate URL variants, so it reported "alternate of canonical
https://paymod.net/" and "meta description too long or too short". The site is
now hosted at a URL whose content actually matches its canonical, so both
errors clear on the next crawl.

## Bing Webmaster Tools (do this now)

1. Open <https://www.bing.com/webmasters> → **Get started** → add site
   **`https://bedful39-creator.github.io/Fakepay-site/`** (or import from Google
   Search Console, which skips most setup).
2. Verify ownership with the meta tag Bing gives you — paste it into the `<head>`
   of `index.html`, commit, push (Pages redeploys in ~1 min).
3. **Sitemaps** → submit
   `https://bedful39-creator.github.io/Fakepay-site/sitemap.xml`.
4. **URL Submission** → submit
   `https://bedful39-creator.github.io/Fakepay-site/` for an immediate crawl.
   Submit that exact URL (trailing slash) — not a `www`, `http`, or no-slash
   variant, which is what triggered the "alternate version" rejection.

## Google Search Console

1. <https://search.google.com/search-console> → **Add property** → **URL prefix**
   → `https://bedful39-creator.github.io/Fakepay-site/` (easiest with GitHub
   Pages), verify via the HTML tag method as above.
2. **Sitemaps** → submit `sitemap.xml`.
3. **URL Inspection** → paste the site URL → **Request indexing**.

## Moving to paymod.net later (optional)

`paymod.net` is currently occupied by a different app, so it is intentionally
*not* referenced anywhere in the site files. To switch later:

1. Point the domain at GitHub Pages (Cloudflare DNS): apex `A` records →
   `185.199.108.135`, `185.199.109.135`, `185.199.110.135`, `185.199.111.135`,
   and/or `www` `CNAME` → `bedful39-creator.github.io`.
2. Repo **Settings → Pages → Custom domain** → enter `paymod.net`, wait for the
   DNS check, tick **Enforce HTTPS**.
3. Update these four spots together (search for
   `https://bedful39-creator.github.io/Fakepay-site/`):
   `index.html` (canonical + og:url + og:image + twitter:image + JSON-LD),
   `robots.txt`, `sitemap.xml`, this file.
4. Re-submit the new URL in Search Console / Bing — the old host becomes an
   alternate and must be re-crawled as canonical.

## Good to know

- No indexing request is instant: new sites typically appear in results in a
  **few days to two weeks** after requesting indexing.
- Rankings depend on content/competition — the tags make the site *eligible* and
  control *how* it looks (title, description, favicon, preview card); they can't
  guarantee a position.
- Preview checkers for social cards: <https://cards-dev.twitter.com/validator> and
  <https://developers.facebook.com/tools/debug/>.
