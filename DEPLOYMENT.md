# MIELOGOS — Production Deployment

Canonical public domain: `https://mielogos.org`  
Protective domain: `mielogos.com`  
Hosting: GitHub Pages  
Branch: `main` / repository root  
Site type: plain static HTML/CSS/vanilla JS; no build step

## Current production state — 4 October 2026

Public membership applications are **OPEN**.

The live submission path is:

`mielogos.org/join/`  
→ Google Apps Script Web App  
→ private Google Sheets Application Queue  
→ short administrator email notification  
→ confirmed application reference returned to the Join page.

The public repository contains the form UI and client-side behavior only. Private applications, administrative email addresses, declarations, verification details, and the private membership register are not stored in GitHub.

## Production checks

Before treating a deployment as complete:

1. Confirm the GitHub Pages workflow completed successfully.
2. Check Home, About, Symbiotic Authorship, Membership, Research & Ideas, Governance, Contact, Privacy, Join, and the custom 404 page.
3. Check desktop and mobile navigation.
4. Confirm there is no horizontal overflow at supported mobile widths.
5. Confirm the public `/join/` form loads and required fields validate.
6. Confirm a test submission produces the same `ML-APP-...` reference on-page and in the private Application Queue.
7. Confirm the administrator notification arrives without duplicating the applicant email or declaration.
8. Confirm `robots.txt`, `sitemap.xml`, canonical URLs, and governance-document links.
9. Confirm no temporary test page or test application data remains after QA.

## Membership backend

Current backend: Google Apps Script Web App.

Current protections include:
- server-side validation of required fields and acknowledgements;
- allowed membership-category and verification-route lists;
- honeypot bot field;
- spreadsheet-formula neutralization for user-controlled text;
- LockService around application-ID creation and row writes;
- cryptographic per-submission nonce echoed by the backend before the parent page displays success;
- administrator-notification failures do not falsely convert a safely stored application into a failed submission.

The backend does **not** make membership decisions.

## Privacy / data handling

The public Privacy Notice must remain synchronized with the actual production stack.

Current providers:
- GitHub / GitHub Pages — public website;
- Dynadot — domain, DNS, and institutional email routing;
- Google Apps Script — membership submission endpoint;
- Google Sheets / Drive — private membership administration;
- Google mail service — administrative notifications.

Do not commit applicant data, the private membership register, verification evidence, passwords, recovery codes, or private creative records to this repository.

## DNS and email

Website DNS and institutional mail DNS coexist. Changes to Pages records must not remove MX, SPF/TXT, DKIM, or other required email records.

The protective `.com` domain is intended to redirect to the canonical `.org` site.

## Maintenance

After any material change to the membership form, backend, data fields, provider stack, or retention practice:
- retest the full end-to-end workflow;
- update the Privacy Notice if needed;
- update this deployment record and README;
- preserve applicable governance history rather than silently rewriting normative instruments.
