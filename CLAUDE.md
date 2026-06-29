# Mythical Games — Engineering Workflow (Pulse Market)

Notion is the source of truth for work, docs, decisions, and priorities.
This repo (`chrislee-spec/mg-notion-demo`) is where engineering work happens.
Each Notion **Issue** has a Unique ID with the prefix `PULSE` (e.g. `PULSE-2`).
That ID is the link between the code and the Notion Issue — always carry it through.

## Connected tools
- **Notion MCP** — read Issues / Projects / Docs, write progress back.
- **GitHub CLI (`gh`)** — create branches, push, open PRs.

## Starting an issue
When asked to work on an issue (e.g. "start PULSE-2"):
1. Read the Notion Issue by its ID via Notion MCP. Read its parent Project and any
   related Spec or Decision docs. Read linked Meeting Notes only if they clarify scope.
2. Summarize the goal and the acceptance criteria. If required context is missing,
   stop and write the gap back to the Notion Issue instead of guessing.
3. Create a branch named `pulse-<n>-<short-slug>` (e.g. `pulse-2-collections-api`).
4. Move the Notion Issue to **In Progress**.

## Doing the work
- Keep changes scoped to the issue's acceptance criteria. Prefer small, mergeable PRs.
- This is a Vite + React + TypeScript app:
  - Mock data: `src/data/items.ts` (items grouped by `collection`).
  - Components in `src/components/`; app shell + tabs in `src/App.tsx`.
  - Put data-shaping logic in `src/api/` (e.g. `src/api/collections.ts`).
- Run `npm run build` (and `npm run test` if tests exist) before opening the PR.

## Opening the PR
- Commit, push the branch, and open a PR with `gh`.
- **PR title MUST start with the issue ID**, e.g. `PULSE-2 Add collection view API endpoint`.
  This is what links the PR back to the Notion Issue. Do not omit it.
- In the PR body, summarize what changed and reference the acceptance criteria.
- Move the Notion Issue to **Review** and add a progress comment with the PR link.

## Finishing
- Do not mark an Issue **Done** yourself. Done follows the PR being merged.
- After merge, write a short closing note on the Notion Issue (what shipped, anything
  follow-up). If a real decision or tradeoff was made, capture it as a Decision doc.

## Issue status vocabulary
Backlog · Ready · In Progress · Review · Done · Blocked

## The Collection View build (this demo)
- PULSE-1 -> `docs/collection-view.md` (requirements)
- PULSE-2 -> `src/api/collections.ts` (group items by collection)
- PULSE-3 -> `src/components/CollectionGrid.tsx` + replace the placeholder in `App.tsx`
- PULSE-4 -> analytics events on collection view/click
- PULSE-5 -> collection filter control + `vitest` tests

## Golden rule
Local memory is not the source of truth. If it matters, write it back to Notion.
