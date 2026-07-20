# Company Idea Bank — Blueprinted Autonomous Site Builder Agent

Status: Concept approved for prototype
Project: Justice for Gina / reusable across company repositories
Owner authority: Grant Gazvoda
Working branch: team-2-ai-investigation

## Concept

Create a repository-native coding AI agent whose single mission is to fully build, improve, test, and maintain a website from a written blueprint. The agent lives inside the repository as configuration, prompts, schemas, workflows, and validation rules. It reads the site blueprint, inspects the current codebase, creates an implementation plan, edits files on a dedicated branch, runs checks, and produces a pull request for human review.

This is feasible with current tools when the agent is connected to a coding runtime such as GitHub Actions plus an external model/API, Codex, Copilot coding agent, or another MCP-capable coding system. GitHub itself stores and governs the agent; the model runtime performs the reasoning and code generation.

## Non-negotiable safety boundary

The agent may build autonomously, but it may not merge to production, publish, delete original evidence, change source meaning, contact third parties, expose secrets, or bypass review. All production releases require human approval.

## Primary Agent

Name: Site Architect
Role: Autonomous repository-native full-stack builder
Single mission: Build the complete site described by `SITE_BLUEPRINT.md` and keep it production-ready.

## Required repository files

```text
/agents/site-architect/
  agent.yaml
  system-prompt.md
  task-contract.json
  export-manifest.json
  adapters/
    github.json
    codex.json
    copilot.json
    lovable.json
  memory/
    decisions.md
    build-log.jsonl
    known-issues.json
/SITE_BLUEPRINT.md
/AGENTS.md
/.github/workflows/site-architect.yml
```

## Execution flow

```text
Read SITE_BLUEPRINT.md
  -> Inspect repository
  -> Build dependency and risk map
  -> Create implementation plan
  -> Work only on agent branch
  -> Generate or modify code
  -> Run lint, typecheck, tests, build, and link checks
  -> Produce evidence of results
  -> Open draft pull request
  -> Request reviews from investigation agents
  -> Revise after feedback
  -> Await founder approval
```

## Internal review team handoff

The Site Architect must request structured reviews from:

- Executive Producer: confirms site supports project goals.
- Lead Investigator: checks chronology and investigative organization.
- Archivist: checks evidence IDs, provenance, and record organization.
- Fact Checker: checks factual claims and source links.
- Legal Review: flags privacy, copyright, recording, and publication risks.
- Script Editor: checks readability and narrative clarity.
- Documentary Director: checks visual storytelling and media presentation.
- Audio Producer: checks podcast and audio experience.
- Community Manager: checks public-facing language and feedback paths.
- Project Manager: checks completion, blockers, and release status.

No agent may silently override another agent's blocking review. Conflicts go to the Executive Producer and Grant Gazvoda.

## Portable agent manifest

The following format is the canonical export package for moving the agent between systems.

```json
{
  "specVersion": "oit.agent.portable/v1",
  "agent": {
    "id": "site-architect",
    "name": "Site Architect",
    "version": "1.0.0",
    "mission": "Build and maintain the complete website defined by SITE_BLUEPRINT.md.",
    "authority": {
      "readRepository": true,
      "writeFeatureBranch": true,
      "runChecks": true,
      "openPullRequest": true,
      "merge": false,
      "deployProduction": false,
      "accessSecrets": "named-only"
    },
    "inputs": [
      "SITE_BLUEPRINT.md",
      "AGENTS.md",
      "repository tree",
      "approved evidence manifest",
      "design assets"
    ],
    "outputs": [
      "implementation plan",
      "code changes",
      "test results",
      "build artifact",
      "draft pull request",
      "change log"
    ],
    "qualityGates": [
      "lint",
      "typecheck",
      "tests",
      "production build",
      "accessibility review",
      "broken-link scan",
      "source-claim review",
      "human approval"
    ],
    "memory": {
      "format": "markdown+jsonl",
      "paths": [
        "agents/site-architect/memory/decisions.md",
        "agents/site-architect/memory/build-log.jsonl",
        "agents/site-architect/memory/known-issues.json"
      ]
    },
    "handoffs": [
      "executive-producer",
      "lead-investigator",
      "archivist",
      "fact-checker",
      "legal-review",
      "script-editor",
      "documentary-director",
      "audio-producer",
      "community-manager",
      "project-manager"
    ]
  }
}
```

## Export and import code

This TypeScript reference implementation packages the agent into a transportable JSON bundle and restores it into another repository or supported agent system.

```ts
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export type PortableAgentBundle = {
  specVersion: "oit.agent.portable/v1";
  exportedAt: string;
  sourceRepository?: string;
  manifest: unknown;
  files: Record<string, string>;
  checksums: Record<string, string>;
};

const AGENT_FILES = [
  "agents/site-architect/agent.yaml",
  "agents/site-architect/system-prompt.md",
  "agents/site-architect/task-contract.json",
  "agents/site-architect/export-manifest.json",
  "agents/site-architect/memory/decisions.md",
  "agents/site-architect/memory/build-log.jsonl",
  "agents/site-architect/memory/known-issues.json",
  "SITE_BLUEPRINT.md",
  "AGENTS.md"
];

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function assertSafeRelativePath(filePath: string): void {
  const normalized = path.posix.normalize(filePath.replaceAll("\\", "/"));
  if (normalized.startsWith("../") || normalized.startsWith("/") || normalized.includes("/../")) {
    throw new Error(`Unsafe path in agent bundle: ${filePath}`);
  }
}

export async function exportAgent(
  repositoryRoot: string,
  destinationFile: string,
  sourceRepository?: string
): Promise<void> {
  const files: Record<string, string> = {};
  const checksums: Record<string, string> = {};

  for (const relativePath of AGENT_FILES) {
    assertSafeRelativePath(relativePath);
    const absolutePath = path.join(repositoryRoot, relativePath);
    try {
      const content = await fs.readFile(absolutePath, "utf8");
      files[relativePath] = content;
      checksums[relativePath] = sha256(content);
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "ENOENT") throw error;
    }
  }

  const manifestText = files["agents/site-architect/export-manifest.json"];
  if (!manifestText) throw new Error("Missing export-manifest.json");

  const bundle: PortableAgentBundle = {
    specVersion: "oit.agent.portable/v1",
    exportedAt: new Date().toISOString(),
    sourceRepository,
    manifest: JSON.parse(manifestText),
    files,
    checksums
  };

  await fs.mkdir(path.dirname(destinationFile), { recursive: true });
  await fs.writeFile(destinationFile, JSON.stringify(bundle, null, 2) + "\n", "utf8");
}

export async function importAgent(
  bundleFile: string,
  destinationRoot: string,
  overwrite = false
): Promise<void> {
  const raw = await fs.readFile(bundleFile, "utf8");
  const bundle = JSON.parse(raw) as PortableAgentBundle;

  if (bundle.specVersion !== "oit.agent.portable/v1") {
    throw new Error(`Unsupported bundle version: ${bundle.specVersion}`);
  }

  for (const [relativePath, content] of Object.entries(bundle.files)) {
    assertSafeRelativePath(relativePath);

    const expected = bundle.checksums[relativePath];
    if (!expected || sha256(content) !== expected) {
      throw new Error(`Checksum failure: ${relativePath}`);
    }

    const destination = path.join(destinationRoot, relativePath);
    await fs.mkdir(path.dirname(destination), { recursive: true });

    if (!overwrite) {
      try {
        await fs.access(destination);
        throw new Error(`Refusing to overwrite existing file: ${relativePath}`);
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code !== "ENOENT") throw error;
      }
    }

    await fs.writeFile(destination, content, "utf8");
  }
}
```

## Adapter contract for moving between systems

Each platform adapter maps the portable manifest to the platform's own runtime without changing the agent's identity, mission, review gates, or memory files.

```ts
export interface AgentRuntimeAdapter {
  id: string;
  validate(bundle: PortableAgentBundle): Promise<void>;
  install(bundle: PortableAgentBundle, target: string): Promise<void>;
  translatePermissions(authority: unknown): Record<string, unknown>;
  translateTools(toolNames: string[]): Record<string, unknown>;
  exportRuntimeState(target: string): Promise<Record<string, unknown>>;
}
```

Required adapters:

- GitHub: branch writes, Actions checks, draft pull requests.
- Codex: repository instructions, tool policy, task prompt, validation commands.
- Copilot: repository instructions, coding-agent task definition, PR workflow.
- Lovable: project brief, UI constraints, route map, data contract.
- Generic MCP: tools, resources, prompts, and permissions mapping.

## Recommended GitHub workflow behavior

The workflow should run only by manual dispatch, approved issue label, or a blueprint change. It must use least-privilege permissions, create a dedicated branch, and never merge automatically.

```yaml
name: Site Architect

on:
  workflow_dispatch:
    inputs:
      task:
        description: Approved site-building task
        required: true
        type: string
  push:
    branches: [team-2-ai-investigation]
    paths:
      - SITE_BLUEPRINT.md
      - agents/site-architect/**

permissions:
  contents: write
  pull-requests: write
  issues: read

jobs:
  architect:
    if: github.ref_name == 'team-2-ai-investigation'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run agent:site-architect -- --task "${{ inputs.task || 'Reconcile the site with SITE_BLUEPRINT.md' }}"
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test --if-present
      - run: npm run build

      # The runtime must create a feature branch and draft PR.
      # It must never push directly to main or deploy production.
```

## Build contract

The agent is considered successful only when:

1. Every blueprint requirement has a linked implementation or documented blocker.
2. Every public factual claim has a source-status label.
3. No original evidence is modified.
4. Tests and production build pass.
5. Accessibility and responsive behavior are reviewed.
6. All changes are isolated to a feature branch.
7. A human-readable build report is included.
8. A draft pull request is opened.
9. Team 2 reviews are attached.
10. Grant Gazvoda approves any merge or production deployment.

## Product opportunity

This can become a reusable Official Intelligence product: a portable, repository-native AI employee blueprint. A company could define a role once, store the role as code, export the agent with its memory and governance, and reinstall it into GitHub, Codex, Copilot, Lovable, Replit, or another MCP-compatible system. The defensible value is not merely the model prompt; it is the portable manifest, permissions, memory format, tests, handoff contracts, and audit trail.

## Prototype decision

Build this first inside `team-2-ai-investigation` as a supervised Site Architect. Compare its site output against Team 1 using `TEAM_COMPARISON.md`. Do not merge the agent or its generated site into `main` until the comparison is complete and founder approval is recorded.
