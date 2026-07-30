# Justice for Gina V9 — QA and Release Verification Ledger

**Target release:** August 2, 2026  
**Candidate branch:** `integration/v9-seo-dns-2026-07-30`  
**Draft pull request:** #23  
**Production state:** V8 remains on `main`; no V9 merge or deployment has occurred.

## Purpose

This ledger records deterministic, browser, accessibility, privacy, security, docket, deployment, and approval gates. A failed run remains part of the audit trail and is never relabeled as a successful verification.

## Current V9 candidate

- 21 structured public evidence records.
- 21 route-matched document-catalog records.
- 25 classified public claims.
- 11 controlled intake entries separating court findings, official records, sworn testimony, expert material, party pleadings, duplicates, drafts, secondary leads, and derivative operational material.
- Public-safe modules include the November 3, 2025 funeral-home summary-judgment order and the corrected Connecticut § 20-230c production status.

## Deterministic QA installed

### Evidence and route controls

1. Required V9 pages, datasets, catalogs, work logs, docket memo, accessibility ledger, and public modules.
2. Exact 21-record, 21-catalog, 25-claim, and 11-intake-entry counts.
3. Unique record, claim, catalog, and intake identifiers.
4. Parity between the public evidence dataset and route catalog.
5. Required provenance, source class, verification, publication, sensitivity, proof, limitation, records-needed, and revision fields.
6. Real route targets and complete Evidence-page record-ID coverage.
7. Sitemap coverage for every catalog route.
8. A hard restriction keeping the secondary civil-docket mirror classified as an internal verification lead rather than a public factual source.

### Publication-language controls

1. Prohibited unsupported homicide, poisoning, perjury, obstruction, and conclusory legality wording.
2. Prohibited superseded statements that the statutory cremation form was entirely absent or that the completed original was simply not located.
3. Prohibited stale 20-record and 24-claim language on public pages.
4. Required presumption-of-innocence language and controlled cause-of-death conclusion.
5. Required scope language for the November 3, 2025 Superior Court order.

### HTML, accessibility, security, and privacy controls

1. Recursive HTML parsing, one title, one H1, English language declaration, duplicate-ID review, image-alt review, and safe new-tab relationships.
2. Local-link existence, path casing, project-path compatibility, repository-escape prevention, and sitemap XML validation.
3. JavaScript syntax, JSON-LD parsing, manifest, canonical-domain identity, IndexNow, DNS runbook, and site-health workflow checks.
4. Sitewide visible `:focus-visible` indicators.
5. Reduced-motion rules.
6. Mobile-menu accessible-label, focus-transfer, Escape, Tab-containment, and responsive-close behavior.
7. Secret-pattern and review-required binary-artifact scans.
8. Public contact allowlist: only the designated Garrison Gazvoda press email and telephone number may appear in public HTML or public datasets.
9. Social Security number pattern scan.

## Material QA events

### Early stale-head diagnostic

An early pull-request run failed because it tested a stale candidate before release plumbing was synchronized. The failure remains preserved and is not treated as product verification.

### July 30 source reconciliation

A new-upload review established that the earlier V9 statutory-form wording was too broad. The production contains an apparent § 20-230c-type disposition page and a separate Stone authorization. V9 was corrected to state the actual completeness, execution, authentication, copy-delivery, retention, and record-relationship questions.

The same review source-locked a November 3, 2025 Superior Court order granting Maiorano Funeral Home summary judgment on counts 5–7 while stating counts 1–4 remained pending. V9 added a separately scoped court-record module.

### Public-count and homepage reconciliation

The evidence dataset expanded to 21 records and 25 claims, but the homepage and Press page retained 20/24 language. The visible pages, metadata, social descriptions, and route cards were corrected, and QA now rejects the stale counts.

### JSON-LD diagnostic

After normalizing the Gina identity page to V9, the integration workflow identified malformed JSON-LD. The deterministic V9 branch checks passed, but the integration workflow correctly failed at the JSON-LD step. The graph closing structure was repaired and is subject to a fresh final-head run.

## Accessibility work completed in source

- Sitewide focus-visible styling.
- Mobile navigation focus transfer and containment.
- Escape-to-close with focus restoration.
- Responsive menu cleanup on desktop resize.
- Existing reduced-motion and responsive layout rules preserved.
- Detailed manual test matrix recorded in `V9_ACCESSIBILITY_AND_BROWSER_QA_2026-07-30.md`.

These controls do not constitute a claim of full WCAG conformance. Rendered desktop, mobile, keyboard, screen-reader, zoom, contrast, forced-colors, and audio-equivalent review remain required.

## Docket verification posture

- The November 3, 2025 civil order is source-locked.
- Later civil entries found through a secondary mirror remain verification leads only.
- Current official civil post-order status must be obtained before expanding public case-status claims.
- The pending criminal docket must be refreshed from the official source immediately before release.
- The official Connecticut lookup endpoints were not reliably accessible through the connected browser during this pass; that is a tool-access limitation, not proof of unchanged status.

## Deployment posture

- The custom domain returned HTTP 404 during the July 30 check.
- The GitHub Pages fallback was not independently verified as live through the connected browser.
- `CNAME`, DNS recovery instructions, IndexNow controls, and scheduled site-health monitoring are present in the candidate.
- No DNS change or deployment action has been taken in this pass.

## Current release gates

- [ ] Both required workflows pass on the exact final head after the JSON-LD repair and privacy-allowlist installation.
- [ ] Official criminal docket refreshed immediately before release.
- [ ] Official civil docket checked for post-November 3, 2025 proceedings.
- [ ] Production custom-domain and fallback behavior verified.
- [ ] Manual desktop and mobile browser review completed.
- [ ] Keyboard, focus, zoom, contrast, reduced-motion, forced-colors, accessible-name, and screen-reader review completed.
- [ ] Final human privacy and sensitive-information review completed.
- [ ] Final diff and known limitations reviewed.
- [ ] Explicit founder approval recorded immediately before merge and deployment.

## Approval and rollback posture

- Draft PR #23 does not authorize merge or deployment.
- No DNS modification, spending, filing, witness contact, agency contact, external submission, or destructive source-record action is authorized by this ledger.
- V8 remains the production baseline.
- Previously documented rollback point: `9b012aed87a7d576aa052d33a5f4ae541cb17a63`.
