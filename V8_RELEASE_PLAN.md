# Justice for Gina V8 — Controlled Release Plan

Prepared July 29, 2026.

## Release objective

Launch a source-controlled public case command center that makes the current record easier to understand without converting allegations, missing records, expert opinions, or family interpretations into established criminal conclusions.

## Public release scope

- Replace the homepage with the V8 command-center experience.
- Add a dedicated case-status page that separates court findings, pending charges, official records, sworn testimony, and unresolved evidence.
- Preserve the existing evidence archive, timeline, focused reviews, press room, funding transparency page, and publication standards.
- Add V8 navigation and visual treatment across preserved pages through the shared stylesheet and script.
- Keep the last known-good site available as the documented rollback point.

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
- New V8 local routes were manually reviewed for valid targets.
- New external `target="_blank"` links include `noopener`.
- V8 homepage and case-status page include required legal and source-classification language.
- The custom-domain fallback page provides clear navigation rather than a dead end.
- Content Security Policy permits the approved external font, image, and media hosts used by the site.
- Shared navigation, responsive styles, archive filtering, keyboard handling, and reduced-motion behavior remain in the source-controlled build.

## Launch sequence completed

1. Preserved the last known-good public build and rollback commit.
2. Completed V8 on `release/v8-public-command-center`.
3. Opened pull request `#13` and reviewed the exact production diff.
4. Installed the V8 QA workflow on `main` through operations pull request `#14`.
5. Completed the manual factual, privacy, legal-context, fundraising, source-access, navigation, fallback, and rollback review.
6. Merged V8 to `main` in production commit `f26164e8e89837920044032af38ba46b375b5979`.
7. Triggered the existing GitHub Pages workflow through the production push to `main`.

## Current release status

- Release: `Justice for Gina V8`.
- State: merged to `main`; Pages deployment triggered.
- Homepage source: V8 command center.
- New primary route: `case-status.html`.
- Stable fallback and rollback instructions remain documented.
- The connected GitHub status interface did not return a visible Actions run, so public-domain route verification remains a separate post-deployment check rather than a claimed completed fact.

## Rollback point

The pre-V8 fallback deployment-trigger commit is `9b012aed87a7d576aa052d33a5f4ae541cb17a63`. If V8 creates a production failure, restore `main` to the last verified public commit and investigate on a release branch.
