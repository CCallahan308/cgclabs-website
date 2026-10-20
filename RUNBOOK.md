# RUNBOOK: cgclabs-website

## Preview locally
Run `vercel dev --listen 8000` in this folder and visit http://localhost:8000. Plain file servers need equivalent clean URL handling for the extensionless service routes.

## Edit copy
Edit the HTML files directly. After any copy edit, run the greps in TESTING.md (banned words, proof points, pricing). Keep sentences short; no em dashes.

## Deploy
Any static host:
- **Vercel:** import the folder as a project, framework preset "Other", output directory `.`.
- **Netlify:** drag the folder into Netlify Drop.
- **GitHub Pages:** push this folder to a repo, enable Pages on main.

## Recover
Everything is plain text in git-able files. If a page breaks visually, the cause is almost always in `assets/style.css` (tokens at the top).

## Search visibility

1. Run `node scripts/check-seo.mjs` before publishing.
2. Keep internal links, canonical URLs, and sitemap entries on `https://cgclabs.org` with clean paths.
3. Update sitemap `lastmod` only for a significant page change.
4. Sign in to [Google Search Console](https://search.google.com/search-console) with the site owner's Google account.
5. Add `cgclabs.org` as a Domain property and complete Google's DNS verification instructions. If using a URL-prefix property instead, use `https://cgclabs.org/` and complete an offered verification method.
6. Submit `https://cgclabs.org/sitemap.xml` in Sitemaps after verification.
7. Inspect `/` and `/data-engineering` with URL Inspection and request indexing if appropriate.
8. Track impressions, clicks, and relevant consulting queries in Performance. Allow several weeks before assessing changes.

Search Console verification was not established during this edit; the browser was signed out. The user was unsure whether a property exists. No sitemap was submitted through Search Console. The robots file advertises it for crawlers.

At the audit, `www.cgclabs.org` did not resolve and was absent from this Vercel project's domain list. The apex domain was verified. To support `www`, add its DNS record and a Vercel redirect to the apex through the domain owner's account.

References: [Google's SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## [to fill]
- Calendly URL (swap the mailto CTAs when available)
- OG image (1200x630) if social previews are wanted
