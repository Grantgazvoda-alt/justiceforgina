# Justice for Gina V9 — QA and Release Verification Ledger

**Target release:** August 2, 2026  
**Candidate branch:** `integration/v9-seo-dns-2026-07-30`  
**Draft pull request:** #23  
**Production state:** V8 remains on `main`; no V9 merge or deployment has occurred.

## Purpose

This ledger records deterministic, browser, accessibility, privacy, security, evidence-catalog, docket, deployment, and approval gates. A failed run remains part of the audit trail and is never relabeled as a successful verification.

## Current V9 candidate

- 21 structured public evidence records.
- 21 route-matched document-catalog records.
- 25 classified public claims.
- 11 controlled intake entries separating court findings, official records, sworn testimony, expert material, party pleadings, duplicates, drafts, secondary leads, and derivative operational material.
- 3 separately controlled official agency communications: OVA docket guidance, OVS compensation screening, and DCJ routing.
- Public-safe modules include the November 3, 2025 funeral-home summary-judgment order, corrected Connecticut § 20-230c production status, dated criminal-docket snapshot, and source-scoped agency-response status.

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

### Agency communications controls

1. Exact three-message agency catalog.
2. Unique Gmail source identifiers and received timestamps.
3. Required sender, subject, source-class, attachment, proof, limitation, publication, route, and next-action fields.
4. OVA docket snapshot must preserve the July 22, 2026 at 5:13 a.m. source accuracy timestamp.
5. OVS attachment inventory must contain the six supplied program files.
6. DCJ correspondence must remain classified as routing rather than a merits decision.

### Publication-language controls

1. Prohibited unsupported homicide, poisoning, perjury, obstruction, and conclusory legality wording.
2. Prohibited superseded statements that the statutory cremation form was entirely absent or that the completed original was simply not located.
3. Prohibited stale 20-record and 24-claim language on public pages.
4. Required presumption-of-innocence language and controlled cause-of-death conclusion.
5. Required scope language for the November 3, 2025 Superior Court order.
6. Criminal-docket language is limited to the dated July 22 agency reproduction unless a fresh official lookup is obtained.

### HTML, accessibility, security, and privacy controls

1. Recursive HTML parsing, one title, one H1, English language declaration, duplicate-ID review, image-alt review, and safe new-tab relationships.
2. Local-link existence, path casing, project-path compatibility, repository-escape prevention, and sitemap XML validation.
3. JavaScript syntax, JSON-LD parsing, manifest, canonical-domain identity, IndexNow, DNS runbook, and site-health workflow checks.
4. Sitewide visible `:focus-visible` indicators.
5. Reduced-motion rules.
6. Mobile-menu accessible-label, focus-transfer, Escape, Tab-containment, and responsive-close behavior.
7. Shared runtime creates the menu control on nested document routes that do not contain a static menu button.
8. Secret-pattern and review-required binary-artifact scans.
9. Public contact allowlist: only the designated Garrison Gazvoda press email and telephone number may appear in public HTML or public datasets.
10. Social Security number pattern scan.

### GitHub Pages deployment controls

1. Deployment remains triggered only by `main` or manual dispatch.
2. Workflow permissions remain `contents: read`, `pages: write`, and `id-token: write`.
3. `actions/configure-pages@v5` configures the existing Pages site without `enablement: true`.
4. `actions/upload-pages-artifact@v3` uploads the static site.
5. `actions/deploy-pages@v4` targets the `github-pages` environment.
6. Both QA workflows fail if administrative enablement returns or required deployment steps disappear.

## Material QA events

### Early stale-head diagnostic

An early pull-request run failed because it tested a stale candidate before release plumbing was synchronized. The failure remains preserved and is not treated as product verification.

### July 30 source reconciliation

A new-upload review established that the earlier V9 statutory-form wording was too broad. The production contains an apparent § 20-230c-type disposition page and a separate Stone authorization. V9 was corrected to state the actual completeness, execution, authentication, copy-delivery, retention, and record-relationship questions.

The same review source-locked a November 3, 2025 Superior Court order granting Maiorano Funeral Home summary judgment on counts 5–7 while stating counts 1–4 remained pending. V9 added a separately scoped court-record module.

### Public-count and homepage reconciliation

The evidence dataset expanded to 21 records and 25 claims, but Home, Press, Support, and Funding retained older 20/24 language. Visible pages, metadata, social descriptions, route cards, and milestones were corrected. QA rejects the stale count phrases.

### JSON-LD diagnostic

After normalizing the Gina identity page to V9, integration run `30531763918` correctly failed at the JSON-LD parsing step while deterministic evidence QA passed. The graph closing structure was repaired.

### Dated criminal-docket source control

Gmail message `19f8b6a3caa396b6` source-locks an OVA email received July 22, 2026. The reproduced Judicial Branch case detail states that it was accurate as of July 22, 2026 at 5:13 a.m. V9 now reports the charges, pleas, pre-trial activity, bond, release status, and August 24 date only as historical snapshot fields. No newer matching docket notice was located in the connected mailbox search. A same-day official lookup remains mandatory.

### Official agency communications catalog

V9 separately catalogs:

- OVA victim-rights guidance and dated pending-case reproduction;
- OVS compensation screening based on police information, with six program attachments; and
- DCJ routing of the family's request to the Waterbury State's Attorney.

The public agency-status module states that guidance, program screening, and routing do not constitute an independent cause-of-death finding, investigation confirmation, suspect designation, or merits decision.

### Pages workflow correction

The production workflow had used `configure-pages@v5` with administrative enablement. V9 retains the official setup, upload, and deploy pattern but removes only `enablement: true`, avoiding the unsafe administration-permission proposal. Superseded deployment PRs #15 and #16 were closed without merge. The standalone V9 snapshot PR #19 was also closed without merge so PR #23 remains the only integration candidate.

## Passing expanded candidate snapshot

Commit `8c8f0783e7c765f62337c758c84f50ecea2c1d5e` passed both required workflows:

- V9 Integration Release QA — run `30533269512` — **passed**.
- V9 Branch QA — run `30533269692` — **passed**.

The expanded checks covered the evidence system, intake catalog, three-message agency catalog, privacy allowlist, JavaScript syntax, nested-route mobile navigation, JSON-LD, manifest, sitemap, and existing-site Pages workflow.

This ledger update creates a documentation-only head that must receive its own exact-head workflow result before release review.

## Accessibility work completed in source

- Sitewide focus-visible styling.
- Mobile navigation focus transfer and containment.
- Escape-to-close with focus restoration.
- Responsive menu cleanup on desktop resize.
- Automatic mobile-menu creation for nested document modules.
- Existing reduced-motion and responsive layout rules preserved.
- Detailed manual test matrix recorded in `V9_ACCESSIBILITY_AND_BROWSER_QA_2026-07-30.md`.

These controls do not constitute a claim of full WCAG conformance. Rendered desktop, mobile, keyboard, screen-reader, zoom, contrast, forced-colors, and audio-equivalent review remain required.

## Docket verification posture

- The November 3, 2025 civil order is source-locked.
- Later civil entries found through a secondary mirror remain verification leads only.
- No matching motion-to-cite or amended-complaint email was found in the connected inbox search.
- Current official civil post-order status must be obtained before expanding public case-status claims.
- The criminal page is limited to the July 22, 2026 time-stamped agency reproduction.
- The pending criminal docket must be refreshed from the official source immediately before release.
- The official Connecticut lookup endpoints were not reliably accessible through the connected browser during this pass; that is a tool-access limitation, not proof of unchanged status.

## Deployment posture

- The custom domain returned HTTP 404 during the July 30 check.
- The GitHub Pages fallback was not independently verified as live through the connected browser.
- `CNAME`, DNS recovery instructions, IndexNow controls, scheduled site-health monitoring, and the corrected Pages workflow are present in the candidate.
- No DNS change or deployment action has been taken in this pass.

## Current release gates

- [ ] Both required workflows pass on the exact final documentation head.
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
