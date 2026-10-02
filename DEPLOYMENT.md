# MIELOGOS — Public Website Deployment

Canonical public domain: `mielogos.org`
Protective domain: `mielogos.com` (planned permanent redirect to `.org`)
Hosting target: GitHub Pages
Site type: plain static HTML/CSS/JS; no build step

## First deployment sequence
1. Create a public GitHub repository named `mielogos` under the `navimusaget` account.
2. Upload the **contents** of this package to the repository root (not the enclosing folder).
3. In GitHub: Settings → Pages → Deploy from a branch → `main` / `(root)`.
4. Verify the temporary `*.github.io` Pages URL before changing DNS.
5. In Pages settings, set custom domain to `mielogos.org`.
6. Add the GitHub Pages DNS records at Dynadot while preserving the existing mail MX/TXT/DKIM records.
7. Wait for DNS verification, then enable HTTPS in GitHub Pages.
8. Test desktop/mobile navigation, documents, 404, contact mail link, sitemap and robots.
9. Configure `mielogos.com` as a permanent redirect to `https://mielogos.org/` after the `.org` site is stable.

## Important
- Keep the existing email DNS records intact. Website DNS records and mail DNS records coexist.
- `/join/` remains pre-opening and contains no form.
- The public site currently uses no analytics, advertising trackers, accounts or membership backend.
- The privacy page documents the current public website and email-contact state; it must be revised again before a membership application processor is activated.
