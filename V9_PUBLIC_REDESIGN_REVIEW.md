# Justice for Gina V9 Public Redesign Review

Status: Draft review candidate. Do not merge or deploy without Grant Gazvoda's explicit approval.

## Production safety

- Repository: `Grantgazvoda-alt/justiceforgina`
- Production branch: `main`
- V9 redesign branch: `redesign/v9-high-profile-2026-08-01`
- The redesign branch starts from the source-controlled V9 integration candidate at commit `5fe4b003f24a840bae3ab1c97a2f3bbd2d8759e1`.
- No production, DNS, Cloudflare, GitHub Pages, domain, payment, or external-contact change is authorized by this branch.

## Public experience objective

The site should answer five questions in order:

1. Who was Gina?
2. What happened most recently?
3. What does the verified record establish?
4. What does the family believe, and how is that different from verified evidence?
5. How can a visitor review records or help?

## Primary navigation

The sitewide primary menu is limited to:

1. Home
2. Case Status
3. Evidence
4. Timeline
5. Gina
6. Press
7. Funding
8. Help Fund the Work

Documents, publication standards, support resources, record viewers, and issue modules remain available through contextual links and footer navigation. They no longer compete as equal top-level destinations.

## Homepage hierarchy

1. Gina and the mission
2. Current criminal-case panel
3. Four most important controlled developments
4. Clearly attributed family position
5. Six visitor pathways
6. Funding and accountability call to action

## Legal and evidentiary controls

- Pending charges are allegations, not convictions.
- The accused remains presumed innocent unless and until proven guilty.
- The pending charges do not establish Gina's cause of death.
- Any homicide or murder allegation appears only as an attributed family belief or allegation.
- Family belief is not described as a court finding, medical conclusion, toxicology result, police determination, or proven fact.
- Court findings, official records, sworn testimony, family allegations, and unresolved questions remain separately labeled.
- Missing records are described as not located or not produced, not automatically destroyed or concealed.

## Accessibility controls in source

- Skip link to main content.
- Semantic heading hierarchy.
- Definition list for docket details.
- Explicit labels for evidence classifications.
- Reduced-motion support inherited from the existing design system.
- Keyboard-operable menu with focus transfer, Escape-to-close, focus containment, and focus restoration.
- Shortened navigation for lower cognitive load and clearer screen-reader traversal.
- Descriptive links rather than repeated generic calls to action.

## Information-maintenance model

The redesign retains the V9 structured evidence and claim catalogs as the controlled evidence layer. Public pages should summarize those records rather than duplicate full analyses. New evidence should be added to the appropriate catalog or issue module, then linked from the homepage only when it changes the public case orientation.

## Manual review still required

- Desktop visual review.
- Mobile visual review.
- Screen-reader review.
- Keyboard-only review.
- 200% and 400% zoom review.
- Contrast and forced-colors review.
- Current official criminal-docket refresh immediately before release.
- Current civil-docket review for later orders.
- Final privacy review.
- Final legal-language and source-traceability review.
- Explicit founder approval before merge.
