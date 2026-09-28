# RUNBOOK: cgclabs-website

## Preview locally
Open `index.html` in a browser, or from this folder run `python -m http.server 8000` and visit http://localhost:8000.

## Edit copy
Edit the HTML files directly. After any copy edit, run the greps in TESTING.md (banned words, proof points, pricing). Keep sentences short; no em dashes.

## Deploy
Any static host:
- **Vercel:** import the folder as a project, framework preset "Other", output directory `.`.
- **Netlify:** drag the folder into Netlify Drop.
- **GitHub Pages:** push this folder to a repo, enable Pages on main.

## Recover
Everything is plain text in git-able files. If a page breaks visually, the cause is almost always in `assets/style.css` (tokens at the top).

## [to fill]
- Calendly URL (swap the mailto CTAs when available)
- OG image (1200x630) if social previews are wanted
- robots.txt / sitemap if the domain goes live
