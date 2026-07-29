# Justice for Gina V8 — Controlled Release Plan

Prepared July 29, 2026.

## Release objective

Launch a source-controlled public case command center that makes the current record easier to understand without converting allegations, missing records, expert opinions, or family interpretations into established criminal conclusions.

## Public release scope

- Replace the homepage with the V8 command-center experience.
- Add a dedicated case-status page that separates court findings, pending charges, official records, sworn testimony, and unresolved evidence.
- Preserve the existing evidence archive, timeline, focused reviews, press room, funding transparency page, and publication standards.
- Add V8 navigation and visual treatment across preserved pages through the shared stylesheet and script.
- Keep the last known-good site deployable from `main` until V8 passes all gates.

## Controlling evidence rules

- Use exact court findings only within their stated scope.
- Describe pending charges as pending and preserve the presumption of innocence.
- Treat OCME intake statements as attributed reports, not independent examination findings.
- State that no autopsy, toxicology, scene examination, or independent OCME body examination is documented in the controlled record; do not claim this proves a cause of death.
- Describe the Panwar pronouncer issue as an apparent statutory conflict unless and until a competent adjudication establishes more.
- Do not attribute authorship, alteration, intent, concealment, theft, homicide, or obstruction without authenticated evidence or an applicable finding.
- Keep restricted medical, personal, financial, device, and unredacted discovery material outside the public site.

## Technical gates

- Required public files exist and are non-empty.
- `CNAME`, sitemap, robots file, canonical URLs, and deployment workflow agree on `justiceforgina.org`.
- All local HTML links resolve.
- Every external `target="_blank"` link includes `noopener`.
- V8 homepage and case-status page include required legal and source-classification language.
- The custom-domain fallback page provides clear navigation rather than a dead end.
- Content Security Policy permits only the approved external font, image, and media hosts already used by the site.
- Mobile navigation, archive filtering, keyboard focus, and reduced-motion behavior remain functional.

## Launch sequence

1. Keep the last known-good build on `main`.
2. Complete V8 on `release/v8-public-command-center`.
3. Open a pull request and run automated V8 release QA.
4. Review the exact diff for factual, privacy, legal-context, fundraising, and source-access issues.
5. Merge only after the automated gate passes and no blocking review issue remains.
6. Allow the existing GitHub Pages workflow to deploy `main`.
7. Verify the root domain and critical public routes; retain the previous commit as the rollback point.

## Current release status

- Pull request: `#13 — Launch Justice for Gina V8 public command center`.
- Stable fallback remains on `main`.
- V8 remains isolated on `release/v8-public-command-center`.
- The V8 QA workflow is installed on `main` through merged operations PR `#14`.
- This commit triggers the enforceable pull-request validation against the default-branch workflow.
- Manual factual and publication review remains required before merge.

## Rollback point

The fallback deployment-trigger commit on `main` is `9b012aed87a7d576aa052d33a5f4ae541cb17a63`. If V8 creates a production failure, restore `main` to the last verified public commit and investigate on the release branch.
