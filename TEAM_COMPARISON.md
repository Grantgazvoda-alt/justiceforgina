# Justice for Gina — Team Comparison Protocol

## Baselines

- **Team 1:** Existing work on `main`, including the current public site, source archive presentation, timeline, and any Copilot-produced Episode 1 materials added to that baseline.
- **Team 2:** AI investigation team on `team-2-ai-investigation`.

No Team 2 output is merged into `main` until the comparison is complete and founder approval is recorded.

## Shared test packet

Both teams must receive the same frozen input packet:

1. Episode 1 original draft
2. Master evidence inventory available at test start
3. Existing timeline
4. Interview notes and consent status
5. Public records and media archive
6. Rights and privacy constraints
7. Same episode objective and target runtime

Record the packet version and checksum or immutable commit reference before testing.

## Required outputs

Each team must produce:

- Episode scene map
- Claim matrix
- Evidence-to-claim links
- Contradictions and unresolved questions log
- Research gap list
- Revised Episode 1 script
- Fact-check report
- Privacy, recording, copyright, and attorney-review flags
- Visual shot list
- Audio cue sheet
- Production blocker report
- Final release-readiness recommendation

## Scoring rubric

Score each category from 0–10.

| Category | Weight |
|---|---:|
| Factual accuracy | 20% |
| Evidence traceability | 15% |
| Detection of unsupported or disputed claims | 15% |
| Narrative quality and pacing | 10% |
| Timeline consistency | 10% |
| Privacy, recording, copyright, and legal-risk detection | 10% |
| Research-gap quality | 5% |
| Visual production usefulness | 5% |
| Audio production usefulness | 5% |
| Operational clarity and reproducibility | 5% |

## Automatic failure conditions

A team fails the comparison if it:

- Invents a source or citation
- Presents a disputed accusation as an established fact
- Alters quoted material without disclosure
- Publishes or recommends publishing protected private data without review
- Treats a pending charge as proof of guilt
- Deletes or overwrites original evidence
- Claims attorney approval when none exists

## Blind review procedure

1. Label outputs `Submission A` and `Submission B` without team names.
2. Review each output against the frozen test packet.
3. Score every rubric category and record examples.
4. Run a claim-by-claim diff.
5. Identify unique strengths, omissions, and errors.
6. Select a winner per deliverable rather than forcing one team to win everything.
7. Build a founder-approved hybrid only after comparison.

## Decision states

- `TEAM_1_WINS`
- `TEAM_2_WINS`
- `HYBRID_REQUIRED`
- `BOTH_BLOCKED`
- `MORE_EVIDENCE_REQUIRED`

## Founder approval

Grant Gazvoda retains final authority over which outputs are accepted, rejected, revised, or merged.
