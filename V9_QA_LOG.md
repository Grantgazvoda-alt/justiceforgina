# Justice for Gina V9 — QA and Release Verification Ledger

**Target release:** August 2, 2026  
**Branch:** `release/v9-2026-08-02`  
**Draft pull request:** #17  
**Production state:** V8 remains on `main`; no V9 merge or deployment has occurred.

## Purpose

This ledger records each deterministic, browser, privacy, security, docket, deployment, and approval gate. A failed tool or stale workflow run is recorded as such and is not misrepresented as a product failure or successful verification.

## Repository comparison

- Base: `main` at `4fe1358a552bbd2c24579dcff54c3b2edcdc3141`
- Head ref: `release/v9-2026-08-02`
- Comparison at the time of this entry: **ahead by 59 commits, behind by 0**.
- The comparison includes the V9 evidence dataset, claim register, document catalog, public evidence modules, core page rewrites, publication-standard rewrites, manifest, fallback page, security policy, and QA workflow.

## Isolated-runtime clone attempt

### Result

**Blocked by environment — not a repository failure.**

The QA runtime attempted to clone the public branch using:

```text
git clone --depth 1 --branch release/v9-2026-08-02 --single-branch https://github.com/Grantgazvoda-alt/justiceforgina.git
```

The runtime returned `Could not resolve host: github.com`. This establishes that the isolated container lacked outbound DNS at that time. It does not establish a GitHub outage, branch defect, or site defect.

### Response

Deterministic checks were moved into GitHub Actions, where the repository contents and case-sensitive paths can be tested directly.

## GitHub Actions V9 release gate

### Workflow

`.github/workflows/v8-release-qa.yml` now contains the **V9 Release QA** workflow. The filename is retained to avoid a destructive rename; the workflow name and checks are V9-specific.

### Checks installed

1. Required V9 files and datasets.
2. Release markers, manifest path compatibility, security directives, presumption-of-innocence language, and controlled-conclusion safeguards.
3. JSON parsing for manifest, evidence index, public evidence dataset, document catalog, and claim register.
4. Exact counts: 20 public evidence records, 20 catalog records, and 24 public claims.
5. Unique IDs and parity between the public dataset and document catalog.
6. Required structured-record fields, nonempty proof statements, and real local route targets.
7. Complete `record.html?id=` coverage for all twenty records.
8. Sitemap coverage for every catalog route.
9. Recursive HTML review for local links, path casing, repository escapes, project-path compatibility, language, title, single H1, duplicate IDs, image alt text, and `target=_blank` protections.
10. Prohibited conclusory language scan.
11. Secret-pattern and restricted-binary scan.
12. Primary-page sitemap coverage.

## Initial pull-request workflow run

- Run ID: `30517286368`
- Job ID: `90789863307`
- Tested commit: `c24e5e8c00b02950b9e8deab722900dc017a4f96`
- Result: failed during the release-marker safeguard step.

### Classification

**Stale-head diagnostic.** The run tested the pull-request head before the later homepage, Case Status, manifest, fallback, security, and other release-plumbing corrections were synchronized into the PR metadata snapshot. The failure is preserved and must not be called a passing QA run or the final V9 result.

## Release-plumbing corrections completed after the initial run

- `site.webmanifest` uses `./` for `start_url`, `id`, and `scope`, supporting both custom-domain and GitHub Pages project-path hosting.
- `404.html` identifies V9 and exposes only approved navigation, with a no-index directive.
- `_headers` adds `object-src 'none'`, `frame-ancestors 'none'`, `Cross-Origin-Opener-Policy`, `X-Permitted-Cross-Domain-Policies`, and project-compatible source restrictions.
- The optional `CNAME` check no longer treats an absent custom-domain file as a QA failure.
- `index.html` and `case-status.html` now use the V9 structured-record counts, claim classifications, controlled homicide conclusion, docket-refresh safeguard, and external-evidence phase.
- Shared navigation includes Documents, Funding, and Standards, and nested-route injection was corrected in `script.js`.

## Current unresolved release gates

- [ ] Latest-head GitHub Actions V9 Release QA passes.
- [ ] Any workflow failures are fixed and rerun.
- [ ] Manual browser review of primary and nested routes is completed.
- [ ] Mobile navigation, keyboard, focus, reduced-motion, contrast, and accessible-name checks are completed.
- [ ] Official criminal docket is refreshed from a current official source immediately before release.
- [ ] Actual production URL, custom-domain status, canonical behavior, and GitHub Pages fallback are verified.
- [ ] Final privacy and sensitive-artifact review is completed.
- [ ] Final PR diff and known limitations are reviewed.
- [ ] Founder approval is recorded immediately before merge and deployment.

## Approval and rollback posture

- Draft PR #17 does not authorize merge or deployment.
- No DNS action is included.
- No paid service, witness contact, filing, external submission, or destructive source-record action is included.
- V8 remains the production baseline.
- Previously documented rollback point: `9b012aed87a7d576aa052d33a5f4ae541cb17a63`.
