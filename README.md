# MIELOGOS Production Site v1.0

Public website for `mielogos.org`.

## Current state — 4 October 2026
- Home, About, Symbiotic Authorship, Membership, Research & Ideas, Governance, Contact, Privacy, and Join are public.
- Public membership applications are **OPEN**.
- The Join workflow is a custom Mielogos form backed by Google Apps Script and a private Google Sheets administrative queue.
- Applications receive a server-generated `ML-APP-YYYY-NNNN` reference after successful receipt.
- Application processing remains human-reviewed; the backend records and routes information but does not decide membership.
- The form uses server-side validation, a honeypot field, spreadsheet-formula neutralization, a submission lock, and a per-submission cryptographic nonce for reliable cross-frame confirmation.
- Applicant information is not stored in the public GitHub repository.
- The public site intentionally uses no advertising trackers, behavioral analytics, visitor accounts, or public membership database.
- `contact@mielogos.org` remains the public institutional contact.
- Public Member Directory participation, if introduced, is separate and opt-in.

## Site architecture
- Hosting: GitHub Pages
- Canonical domain: `https://mielogos.org`
- Site type: plain static HTML/CSS/vanilla JS; no build step
- Public form endpoint: Google Apps Script Web App
- Private application store: Google Sheets / Drive
- Administrative notifications: Google mail service
- Domain and institutional email routing: Dynadot

## Governance
The public Governance page exposes:
- five current ACTIVE normative instruments;
- adoption / constitutional-amendment / policy-decision history;
- a separate SUPERSEDED archive;
- `/data/governance.json` as a machine-readable public register.

Internal QA materials and private membership-administration records are not published.

## Privacy
The public Privacy Notice reflects the live membership stack and the Association's data-minimization model:
- public identity rather than routine civil-identity collection;
- no ordinary collection of passports, home addresses, telephone numbers, dates of birth, private AI chats, prompt histories, unpublished manuscripts, detector reports, or full revision histories;
- temporary verification evidence is discarded when no longer needed;
- unsuccessful or abandoned application materials are ordinarily deleted after 90 days absent a concrete reason to retain them.

## v1.0 membership launch
- Activated public `/join/` membership application workflow.
- Added Google Apps Script + private Google Sheets intake backend.
- Added server-side acknowledgement validation and category / verification-route validation.
- Added spreadsheet-formula neutralization and concurrency lock.
- Added short administrator email notifications without duplicating applicant email or declaration.
- Added cryptographic per-submission nonce confirmation for Apps Script sandboxed-frame responses.
- Published live membership Privacy Notice and updated Home, Membership, Contact, and sitemap.
- Completed end-to-end production test from the public `/join/` page.
- Removed the private `/join/intake-test.html` test page after successful production verification.
- Cleared launch-test application records from the private queue after verification.

## v0.9 production
- Converted GitHub Pages project-subpath URLs to root-domain URLs.
- Enabled search indexing for the public production site.
- Added `CNAME` for `mielogos.org`.
- Added production `robots.txt` and `sitemap.xml`.

## v0.8
- Mobile polish after first live GitHub Pages QA.
- Reduced Home hero headline size and vertical spacing on small screens.
- Tightened Home lead and “You are not alone.” spacing.
- Added viewport-safe scrolling and visual separation to the mobile navigation.

## v0.7
- Prepared the first GitHub Pages deployment.
- Added `.nojekyll`.
- Added public-launch Privacy and deployment documentation.

## v0.6
- Completed Contact around one institutional channel.
- Fixed `contact@mielogos.org` as the public address.

## v0.5
- Completed Research & Ideas.
- Added foundational research references and `/data/research.json`.
