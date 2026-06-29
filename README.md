# Pulse Market (mg-notion-demo)

A small marketplace web app used to demo the **Notion-as-Linear** workflow for Mythical Games.
Issues live in Notion (prefix `PULSE`); Claude Code builds them here and opens PRs whose
titles carry the issue ID, which links the work back to the Notion Issue.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## The demo feature: Collection View
The baseline app shows a flat "All Items" grid. The "Collections" tab is a placeholder.
Building it out is the live demo, broken into five Notion issues:

- **PULSE-1** Define Collection View requirements -> `docs/collection-view.md`
- **PULSE-2** Add collection view API endpoint -> `src/api/collections.ts`
- **PULSE-3** Build frontend collection grid -> `src/components/CollectionGrid.tsx` + wire the tab
- **PULSE-4** Add analytics events -> track collection views/clicks
- **PULSE-5** QA collection filtering -> filter control + tests

## Workflow convention
Branch: `pulse-<n>-<slug>`  ·  PR title: `PULSE-<n> <summary>`
