# Mythical Games — Engineering Workflow (Pulse Market)

Notion is the source of truth for work, docs, decisions, and priorities.
This repo (`chrislee-spec/mg-notion-demo`) is the Pulse Market app — where engineering work lands.
Every Notion **Issue** has a Unique ID with the prefix `PULSE` (e.g. `PULSE-7`).
That ID is the link between the code and the Notion Issue — always carry it through.

## Connected tools
- **Notion MCP** — read Issues / Projects / Docs, write progress back.
- **GitHub CLI (`gh`)** — create branches, push, open PRs.

## Working any issue
When asked to work on an issue (e.g. "start PULSE-7"):

1. **Read the issue from Notion via MCP** by its `PULSE-n` ID. The issue is the spec — do not rely on
   this file for specifics. From the issue, take:
   - the **Summary** (what to build),
   - the **Acceptance criteria** (the visible result + the target file paths),
   - the **Implementation notes (for Claude Code)** (how to build it, which files),
   - the **Dependencies** (issues that should land first).
2. Read the parent **Project** and any linked **Spec** or **Decision** docs for context.
3. If required context is missing, stop and write the gap back to the Notion Issue instead of guessing.
4. Create a branch named `pulse-<n>-<short-slug>`.
5. Set the Notion Issue **Status** to **In Progress** via MCP.

## Building
- Build exactly what the issue's acceptance criteria and implementation notes describe. Keep changes
  scoped to that issue. Prefer small, mergeable PRs.
- Vite + React + TypeScript app. Conventions:
  - Mock data: `src/data/items.ts`. Components: `src/components/`. Shared utils: `src/lib/`.
    Data-shaping logic: `src/api/`. App shell + tabs: `src/App.tsx`.
  - No new dependencies or routing library unless the issue explicitly calls for it. Keep it lean.
- Run `npm run build` (and `npm run test` if the issue adds tests) before opening the PR.

## Opening the PR
- Commit, push the branch, and open the PR with `gh`.
- **The PR title MUST start with the issue ID**, e.g. `PULSE-7 Add marketplace search bar`.
  This is what makes the link work: the Issues <-> Pull Requests relation auto-maps the PR to the
  Issue whose Unique ID matches the `PULSE-n` in the title. If you omit the ID, it will not map.
- In the PR body, summarize what changed and reference the acceptance criteria.

## Linking back to Notion
The PR-to-Issue relation **auto-maps** from the `PULSE-n` in the PR title — you do NOT set the
relation by hand. Your only manual step via MCP is to walk the **Status**:
1. Set Status to **Review** once the PR is open.
2. If the auto-mapped relation hasn't appeared yet, leave it — it maps once the PR syncs into Notion.

## Finishing (after merge)
- Set the Issue **Status** to **Done**.
- Add a short closing note on the Issue (what shipped, any follow-up).
- If a real decision or tradeoff was made, capture it as a **Decision / Retro** doc in the Docs
  database, linked to the Project.

## Issue status vocabulary
Backlog · Ready · In Progress · Review · Done · Blocked

## Golden rule
Local memory is not the source of truth. If it matters, write it back to Notion.
The issue defines the work; this file only defines the workflow.
