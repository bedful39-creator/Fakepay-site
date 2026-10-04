# Getting PayMod indexed on Google & Bing

The site is fully SEO-tagged for **https://paymod.net/**. Search engines can only
see it once it is **publicly hosted** — nothing below works for `localhost`.

## What is already in place

| Piece | Where |
|---|---|
| Title + meta description | `index.html` `<head>` |
| Canonical URL | `index.html` |
| Open Graph + Twitter cards (with `og-image.png`) | `index.html` `<head>` |
| Structured data (SoftwareApplication, free / $0) | `index.html` JSON-LD |
| Site icon (real emerald block: 64/180/192/512) | `favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` |
| Manifest | `site.webmanifest` |
| Crawler rules | `robots.txt` (allows all + points to sitemap) |
| Sitemap | `sitemap.xml` |

## Google Search Console (Google results)

1. Deploy the site to a public server under `paymod.net` (HTTPS strongly preferred).
2. Open <https://search.google.com/search-console> → **Add property** → choose
   **Domain** → enter `paymod.net`.
3. Verify ownership with the **DNS TXT record** Google gives you (add it at your
   domain registrar). Domain verification covers `www` and every subdomain.
4. Once verified, open **Sitemaps** (left sidebar) → enter `sitemap.xml` → **Submit**.
5. Use **URL Inspection** → paste `https://paymod.net/` → **Request indexing**.
   This is the fastest way to get a new site into Google's results.
6. The emerald-block favicon appears in results after Google recrawls the homepage
   (usually within days of indexing). Request a recrawl from URL Inspection if it
   doesn't show up.

## Bing / Microsoft (Bing results)

1. Open <https://www.bing.com/webmasters> → **Get started** → add `paymod.net`.
   (Bing lets you **import from Google Search Console**, which skips most setup.)
2. Verify ownership (DNS TXT, or an XML/Meta tag if you prefer).
3. **Sitemaps** → submit `https://paymod.net/sitemap.xml`.
4. Use **URL Submission** to ping `https://paymod.net/` for an immediate crawl —
   Bing indexes new sites much faster this way.

## Good to know

- No indexing request is instant: new sites typically appear in Google results in
  **a few days to two weeks** after requesting indexing.
- Rankings depend on content/competition — the tags make the site *eligible* and
  control *how* it looks (title, description, favicon, preview card); they can't
  guarantee a position.
- After changing the domain, update these three spots together:
  `index.html` (canonical + og:url + JSON-LD), `robots.txt`, `sitemap.xml`.
- Preview checkers for social cards: <https://cards-dev.twitter.com/validator> and
  <https://developers.facebook.com/tools/debug/>.
