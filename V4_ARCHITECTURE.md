# Operation Lantern V4 — Evidence Intelligence Architecture

## Goal

Evolve Justice for Gina from a structured public archive into an evidence-intelligence platform without weakening the credibility, privacy, or reliability established in V3.

## Public capabilities

- Full-text search across approved public records
- Interactive timeline linked to exact source records
- Evidence pages with title, date, source, category, status, provenance, and publication notes
- Connections among documents, events, people, organizations, claims, and corrections
- Page-level document citations
- Visible correction and revision history
- Downloadable press packet generated only from approved public materials
- AI-assisted archive questions grounded exclusively in approved evidence

## Restricted capabilities

- Authenticated reviewer portal for approved attorneys, experts, investigators, and journalists
- Restricted document viewer with access logging
- Secure evidence-tip intake with consent, anti-spam controls, and no automatic publication
- Internal review queue for redaction, classification, legal approval, and publication decisions
- Executor authorization ledger and reviewer-access ledger

## Data model

Each record must include:

- `record_id`
- `title`
- `record_type`
- `event_date`
- `source_name`
- `source_url_or_vault_id`
- `source_class`
- `publication_status`
- `verification_status`
- `sensitivity_class`
- `provenance`
- `related_people`
- `related_events`
- `related_claims`
- `page_citations`
- `redaction_notes`
- `publication_authority`
- `created_at`
- `updated_at`
- `revision_history`

## Trust rules

- The public site may read only records explicitly marked `public`.
- Restricted records must never be bundled into the static site build.
- AI output must return source citations and uncertainty labels.
- AI may summarize approved records but may not infer guilt, diagnose medical conditions, or convert allegations into facts.
- Every edit to status, authority, redaction, or publication must be auditable.
- Secrets, executor documents, medical source files, reviewer identities, and access logs must remain outside the public repository.

## Delivery order

1. Structured public evidence schema
2. Static full-text search and filters
3. Interactive timeline and relationship links
4. Citation-aware document viewer
5. Corrections and revision ledger
6. Restricted reviewer portal
7. Secure tip intake
8. Grounded archive-question assistant
9. Internal mission dashboard

## Production boundary

V3 remains the production site while V4 is developed on `site-v4`. V4 requires founder approval, legal/evidence review, security review, Red Team validation, and a reviewable pull request before merge.
