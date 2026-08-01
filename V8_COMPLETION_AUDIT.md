# Justice for Gina V8 — Completion Audit and Recovery Plan

Prepared July 29, 2026 after comparing the deployed repository with the Mom project memory, the source-controlled chronology, the 20-task completion audit, the investigative proof matrix, the project advances catalog, and the ranked missing-record queue.

## Corrected release status

V8 is **not complete**. The prior release implemented the new homepage, case-status page, shared V8 visual layer, navigation injection, fallback page, sitemap entry, headers, and an initial release gate. The remainder of the public platform still contains V4/V5 metadata, layouts, content models, structured data, and unresolved source synchronization.

**Working completion estimate: 45%.**

This estimate reflects completed architecture and two primary pages, but not full content migration, evidence-data reconciliation, domain restoration, public-claim traceability, or cross-page release QA.

## Controlling project sources

- Project Memory — Confirmed Findings, Unresolved Issues & Addressing Notes
  - https://docs.google.com/document/d/1gnHeFsVlyrwzyPf-1qOoKqicDRSvsnTIcvBQB5MxYlo
- Source-Controlled Master Chronology
  - https://docs.google.com/document/d/1dRGjT2kYnJhrfejgDIpuw9JLWhxiqRTYFUt1RdZh7lQ
- 20-Task Completion Audit & External Dependency Ledger
  - https://docs.google.com/document/d/18wr8nL8jBGxh6PLm_WWnfXbsfx8WfuKmYMV7EeMPNt8
- Investigative Proof Matrix & Completion Status
  - https://docs.google.com/document/d/129Ndq2LPSCl2Dr_nYmNibpqg3zfBv8zYEdprg5SXQfg
- Open Questions, Missing Records & Request Queue
  - https://docs.google.com/document/d/1h15d7TdMQnDXaOWPBVJs1UtNN6MLqt1sduDhVddWoAc
- Project Advances Catalog
  - https://docs.google.com/document/d/14g5QG0G2Ak9AvVfG_UNq97YkaL5lhCrd6X-uK57Rkn4
- All Hands Top Priorities & Work Plan
  - https://docs.google.com/document/d/18aVOPFfFEpHgnQ158rbNxi39M62ZqKQNfxAQhe1qS-o

## Completed V8 foundation

1. V8 command-center homepage.
2. Source-classified case-status page.
3. V8 visual stylesheet layered over the prior site.
4. Shared script that injects Case Status navigation and V8 branding at runtime.
5. Updated 404 page and security headers.
6. Sitemap entry for the case-status page.
7. Initial GitHub pull-request QA workflow.
8. Preserved rollback commit and production release record.

## Incomplete workstream 1 — Full V8 page migration

The following production pages remain authored as V4 or V5 and require actual source migration rather than runtime cosmetic replacement:

- `evidence.html`
- `timeline.html`
- `press.html`
- `support.html`
- `funding.html`
- `standards.html`
- `record.html`
- `911-call-analysis.html`
- `police-response-review.html`
- `records-request-status.html`
- `panwar-pronouncement-review.html`

Required work:

- replace V4/V5 page metadata, schema markup, release labels, navigation, footer language, and visual hierarchy;
- add Case Status and Funding navigation consistently in source HTML;
- remove reliance on JavaScript to correct core branding and navigation;
- add page-level update dates, classification summaries, limits, and correction links;
- ensure mobile, keyboard, reduced-motion, print, and screen-reader behavior across every route.

## Incomplete workstream 2 — Evidence-data reconciliation

The public evidence system is still version 4.

Known defects:

- `evidence-index.json` identifies version 4 and a July 19 publication date;
- `data/public-evidence.json` is version 4;
- the Police & EMS record remains `pending-review` with no public URL even though an approved redacted derivative is linked from the evidence and press pages;
- the structured dataset lacks many source-controlled records now central to the project;
- most structured records have no page-level citations;
- the record viewer still presents itself as V4 evidence intelligence;
- no V8 public-claim register exists.

Required records or record groups for review and controlled addition:

- April 22, 2026 Waterbury Probate Court decrees;
- May 29, 2026 PC-242 estate accounting;
- OCME telephone notice/contact history and declination record;
- Gina’s death certificate and version-history status;
- Panwar deposition and 828 production status;
- Kate Forte March 11, 2025 deposition and document-custody findings;
- official 911 WAV and public MP3 derivative;
- approved redacted Police & EMS derivative;
- funeral-home production metadata and completeness limits;
- Stone crematory timing records and variance limits;
- Wells Fargo death-certificate provenance request status;
- public records-request tracker;
- current criminal docket snapshot, carefully labeled as supplied and time-bounded.

## Incomplete workstream 3 — Timeline reconstruction

The production timeline remains a short V4 overview and does not reflect the source-controlled chronology.

Required public-safe chronology work:

- distinguish event time, report time, record-creation time, and later testimony;
- add the July 28, 2019 will event and later court disposition without implying broader findings;
- add November 21, 2021 dispatch, contact, pronouncement, OCME notification, and certificate-process entries with exact source classes;
- preserve the 17:15 versus approximately 19:06–19:15 timing conflict without calling it fabrication;
- add funeral-home, cremation, certificate, probate, deposition, civil-case, records-request, and 2026 court developments;
- mark every entry as court finding, official record, sworn testimony, attributed statement, expert material, family interpretation, project action, or unresolved conflict;
- link entries to structured evidence records and revision history.

## Incomplete workstream 4 — Public case modules

The current case-status page covers only five broad subjects. V8 still needs focused public-safe modules for:

1. Probate ruling and PC-242 financial classification.
2. OCME notice, declination, examination limits, and missing inquiry audit trail.
3. Death-certificate version history, pronouncer/certifier roles, and medical-source limits.
4. Relationship and authority labels across probate, funeral-home, police, OCME, Yale, and obituary records.
5. Kate Forte deposition and document-custody findings.
6. Police, dispatch, EMS, and 911 timing comparison.
7. Funeral-home production completeness and source-attribution gaps.
8. Stone cremation timing and record-variance review.
9. Wells Fargo document provenance and preservation status.
10. External-custodian dependency dashboard based on the 20-task audit.

Each module must state what the record establishes, what it does not establish, contradictions, missing proof, and the least-resistant lawful next action.

## Incomplete workstream 5 — Press and professional-review package

The press room is still a V4 briefing page.

Required work:

- add a current, source-classified fact sheet;
- add the probate decree scope and limits;
- add OCME and death-certificate distinctions;
- add a clear “not established” section;
- replace or time-bound any potentially stale docket details;
- link the one-page brief, public evidence map, approved redacted report, 911 review, and focused reviews;
- add reporter citation guidance and exact correction-contact procedure;
- create a professional packet request path that does not invite confidential material through ordinary email;
- provide a public revision date and source-control note.

## Incomplete workstream 6 — Fundraising conversion and accountability

The funding page provides broad categories but is not yet the complete court-cost fundraising system requested for the Mom project.

Required work:

- create a court-and-records budget framework without inventing amounts;
- separate court/counsel, certified records, transcripts, expert review, preservation, hosting, and communications;
- publish an update cadence and expense-documentation standard;
- add a donor progress/update area that can be maintained without exposing privilege or personal data;
- improve GoFundMe conversion paths from all major pages;
- add campaign-language checks so donor urgency never becomes an unsupported accusation;
- verify the fundraiser URL, title, current disclosures, and public contact details before final launch.

## Incomplete workstream 7 — Domain and deployment recovery

The custom domain is not resolving. The `CNAME` file was removed to activate the GitHub Pages fallback, but the site still contains custom-domain canonical and social URLs.

Required work:

- verify GitHub Pages deployment and the project fallback route;
- identify the registrar and current domain ownership/expiration state;
- restore nameservers and required DNS records;
- verify apex and `www` behavior, HTTPS, certificate issuance, redirects, and DNS propagation;
- re-add `CNAME` only after DNS ownership and records are confirmed;
- replace the one-off metadata-rewrite workflow with a controlled site-origin configuration;
- ensure canonical, Open Graph, sitemap, robots, structured-data, and social URLs match the active production origin during recovery;
- test a documented rollback and domain-failure fallback.

## Incomplete workstream 8 — Release engineering and QA

The initial V8 gate checked required files and selected phrases, but did not prove full release readiness.

Required work:

- validate all HTML, JSON, XML, manifest, and structured-data files;
- compare source HTML version labels rather than relying on runtime script changes;
- check duplicate IDs, missing headings, invalid active-navigation states, and empty links;
- verify all Drive and public-source links;
- test audio playback and fallback download paths;
- test mobile navigation at multiple widths;
- test keyboard focus, contrast, reduced motion, and screen-reader landmarks;
- check privacy-sensitive URLs and accidental Drive exposure;
- verify every public claim against a public-claim register;
- generate a release report and block merge on high-severity failures.

## Incomplete workstream 9 — Repository and project-control cleanup

- `MISSION_CONTROL.md` still identifies Operation Lantern V3 and the obsolete `site-v3` branch.
- README still describes the site as Phase One.
- V4 architecture and release documents remain without a V8 supersession index.
- `live-status.json` describes deployment but not content-completion state.
- No single V8 change log maps public statements to the controlling project-memory finding.

Required work:

- update mission control to V8 Completion Pass;
- update README deployment, architecture, and domain-recovery instructions;
- preserve older architecture documents but mark their status;
- add a V8 public-claim register and change log;
- maintain a release checklist that distinguishes code complete, content complete, domain complete, and externally dependent.

## Release order

### Gate A — Stabilize and reconcile

1. Keep public production isolated from completion work.
2. Update project controls and V8 completion checklist.
3. Reconcile the structured dataset with the approved public record.
4. Correct false or stale source-status labels.
5. Establish active-origin and domain-recovery configuration.

### Gate B — Complete core public experience

6. Migrate evidence, timeline, press, funding, support, standards, and record viewer.
7. Add missing source-classified case modules.
8. Add public-claim register and linked citations.
9. Complete fundraising conversion and accountability layer.

### Gate C — Red team and release

10. Run factual, privacy, legal-context, accessibility, mobile, link, media, SEO, and deployment tests.
11. Open a completion PR with the exact audit result.
12. Merge only after all blocking defects are closed.
13. Restore the custom domain only after verified DNS ownership and configuration.
14. Verify every critical public route from an external browser.

## Definition of V8 complete

V8 is complete only when:

- every primary page is authored as V8 in source;
- the public evidence dataset and visible pages agree;
- material public claims trace to a controlled source and classification;
- memory findings are reflected without overstatement;
- restricted material is not exposed;
- fundraising pages clearly explain lawful use and accountability;
- the active production URL resolves over HTTPS;
- automated and manual QA pass;
- a verified rollback path remains available.
