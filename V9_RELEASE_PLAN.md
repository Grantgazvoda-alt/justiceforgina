# Justice for Gina V9 Release Plan

**Target:** August 2, 2026  
**Working branch:** `release/v9-2026-08-02`  
**Baseline:** Launched V8 production site plus the completed V8 branch-consolidation evidence modules  
**Production rule:** No merge, deployment, DNS change, or publication of newly sensitive material without explicit approval and completed QA.

## V9 objective

V9 is a documentation-completion and evidence-navigation release. It does not change the project's evidentiary standard. Its purpose is to make every approved public proposition traceable to a classified source, clearly state what each record proves and does not prove, catalog remaining external dependencies, and give attorneys, reporters, experts, donors, and the public a coherent path through the record.

## Release outcomes

1. **Complete the remaining public-safe evidence modules.**
   - Funeral-home production and completeness audit.
   - Connecticut § 20-230c cremation-request-form status.
   - Relationship and disposition-authority label comparison.
   - Document-examiner scope and reproduction limits.
   - Agency-response and external-custodian status.
   - Pending criminal-docket status and presumption-of-innocence safeguard.
   - Witness and media evidence status, limited to authenticated public-safe facts.

2. **Replace stale structured evidence metadata.**
   - Promote `evidence-index.json` from V4 to V9.
   - Replace `data/public-evidence.json` with route-matched V9 records.
   - Add stable record IDs, source classes, provenance, publication status, verification status, sensitivity, proof limits, needed records, related events, and revision history.

3. **Finish the public catalog.**
   - Maintain a machine-readable document catalog.
   - Reconcile the Evidence page, Documents library, Timeline, Records Status, Press, Funding, Support, Standards, sitemap, and navigation.
   - Preserve restricted originals outside the public delivery layer.

4. **Release only after verification.**
   - Validate HTML, JSON, internal links, route casing, canonical URLs, accessibility, mobile behavior, privacy, security headers, and publication boundaries.
   - Confirm the actual production URL before announcing completion.

## Schedule

### July 30 — Source reconciliation and catalog foundation

- Freeze V8 as the launched baseline.
- Create the V9 branch and release log.
- Reconcile the V8 completion log, proof matrix, master evidence queue, evidence-intake register, and current repository routes.
- Create the V9 document catalog and remaining-module inventory.
- Draft the funeral-home, statutory-form, relationship-authority, expert-scope, agency-status, criminal-docket, and external-dependency modules.

### July 31 — Structured data and core public pages

- Replace V4 evidence metadata with V9 records.
- Rebuild `evidence.html` to consume or mirror the V9 catalog.
- Rebuild `timeline.html` with event time, report time, record time, and later recollection separated.
- Reconcile `documents/index.html` and all module routes.

### August 1 — Trust, funding, press, and full QA

- Reconcile Press, Records Status, Funding, Support, Standards, and reviewer guidance.
- Remove stale version labels, dead controls, unsupported statements, and orphan routes.
- Run privacy, accessibility, mobile, security, structured-data, and link QA.
- Prepare a draft pull request with release notes, known limitations, and rollback posture.

### August 2 — Approval-gated release

- Review the final diff and QA evidence.
- Verify deployment target and rollback commit.
- Obtain explicit approval for merge and production release.
- Merge, deploy, verify live routes, and record the release only after approval.

## Evidence and publication controls

- Court findings remain limited to their adjudicated scope.
- Official records are reported as records, not automatically as true conclusions about disputed events.
- Sworn testimony is attributed testimony, not a judicial finding.
- Expert opinions retain methodology, source-generation, and original-versus-copy limitations.
- Family observations and theories remain attributed.
- Missing records and inconsistent accounts are unresolved issues, not automatic proof of intent, concealment, or crime.
- Pending charges are not convictions and remain separate from cause-of-death analysis.
- Full medical, financial, device, account, private-contact, privileged, and unredacted discovery material remains restricted.

## Release gates

- [ ] Every public route has an owner, source class, proof statement, limitation statement, and privacy status.
- [ ] Every structured record points to a real route or an explicitly withheld source.
- [ ] No public page states homicide, poisoning, theft, forgery, obstruction, perjury, illegal cremation, or individual culpability as established beyond the controlling record.
- [ ] All external dependencies distinguish requested, pending, denied, unavailable, not located, and not yet requested.
- [ ] HTML and JSON validation pass.
- [ ] Internal links and sitemap routes pass.
- [ ] Mobile navigation and keyboard access pass.
- [ ] Restricted information is absent from the public repository.
- [ ] Production URL and rollback posture are verified.
- [ ] Founder approval is recorded immediately before merge and deployment.

## Controlling project sources

- Project Memory: `1gnHeFsVlyrwzyPf-1qOoKqicDRSvsnTIcvBQB5MxYlo`
- Investigative Proof Matrix: `129Ndq2LPSCl2Dr_nYmNibpqg3zfBv8zYEdprg5SXQfg`
- Open Questions and Missing Records Queue: `1h15d7TdMQnDXaOWPBVJs1UtNN6MLqt1sduDhVddWoAc`
- Evidence Intake Register: `10AEIDKbK2HxJDua0LrrqPqeDPM4t-iDOnUcRcHKYaLI`
- Project Advances Catalog: `14g5QG0G2Ak9AvVfG_UNq97YkaL5lhCrd6X-uK57Rkn4`

## Rollback posture

V9 is developed on a separate release branch. V8 production remains the operational baseline until explicit merge and deployment approval. No force push, history rewrite, destructive source-record change, or production modification is part of this plan.
