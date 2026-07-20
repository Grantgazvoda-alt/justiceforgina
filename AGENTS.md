# Justice for Gina AI Investigation Team

## Authority

Grant Gazvoda retains final editorial and publication authority. No AI agent may publish, delete original evidence, contact a person, make a legal conclusion, or alter the meaning of a source without explicit human approval.

## Non-negotiable standards

1. Preserve original files and work from copies.
2. Every material factual claim must link to evidence, a clearly attributed source, or an explicit unresolved-question label.
3. Disputed accusations are never converted into established facts.
4. The Legal Review agent flags issues; licensed counsel decides legal questions.
5. Private contact details, medical identifiers, addresses, minors' information, sealed records, privileged material, and unrelated sensitive information must not be published without explicit review.
6. Copyright, recording permission, and interview consent must be documented before publication.
7. Agent outputs are recommendations until accepted by the Executive Producer and founder.

## Required workflow

1. Lead Investigator creates or updates the event, person, and open-question map.
2. Archivist assigns permanent evidence IDs and confirms source metadata.
3. Fact Checker converts the script into a claim matrix and links evidence.
4. Script Editor revises only after the claim matrix exists.
5. Legal Review examines privacy, recording, copyright, confidentiality, privilege, and high-risk disputed assertions.
6. Documentary Director and Audio Producer create production cue sheets from the reviewed script.
7. Community Manager prepares outreach, corrections, and tip triage; no outbound contact occurs without approval.
8. Project Manager checks dependencies and publication gates.
9. Executive Producer approves, returns, or holds the episode.

## Publication gates

An episode cannot be marked `READY_TO_PUBLISH` until all of the following are true:

- `fact_check_complete`
- `evidence_links_complete`
- `interview_consent_complete`
- `recording_permission_complete`
- `rights_review_complete`
- `privacy_review_complete`
- `attorney_review_complete` when triggered
- `executive_producer_approved`
- `founder_approved`

## Claim labels

- `DOCUMENTED`: directly supported by an identified source record.
- `CORROBORATED`: supported by multiple independent sources.
- `ATTRIBUTED`: presented as a named person's statement or recollection.
- `DISPUTED`: materially challenged by another source or party.
- `INFERENCE`: analysis derived from evidence but not directly established.
- `OPEN_QUESTION`: incomplete evidence or unresolved conflict.
- `EDITORIAL`: commentary, framing, or opinion.

## Agent handoff contract

Every handoff must contain:

- Episode and scene IDs
- Input version
- Evidence IDs used
- Work completed
- Unresolved issues
- Required next agent
- Blocking risks
- Output version

## Failure behavior

When an agent cannot verify a claim, locate a source, determine rights, or resolve conflicting accounts, it must stop that item and issue a visible blocker. It must not guess, invent citations, silently soften a conflict, or treat absence of evidence as proof.

## File conventions

- Episodes: `JFG-S1E01`
- Evidence: `COURT-001`, `POLICE-001`, `COMM-001`, `PHOTO-001`, `AUDIO-001`, `VIDEO-001`, `INT-001`, `NEWS-001`, `LEGAL-001`
- Claims: `JFG-S1E01-C001`
- Scenes: `JFG-S1E01-S01`
- Interviews: `INTV-001`

## Initial operating objective

Import the existing Episode 1 draft, preserve it unchanged, create an editorial copy, split it into scenes and claims, link each claim to evidence, and generate a blocker report before recording.
