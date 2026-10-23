# Mawasem Factory Traceability — Simplified (v2)

React + TypeScript export of the "Simplified (v2)" canvas page, converted 1:1 (same screens, copy, data and interactions).

## Google AI Studio
In AI Studio → Build, upload this zip (or drag the files into a new app). Entry: `index.html` → `index.tsx` → `App.tsx`.

## Run locally
npm install
npm run dev   # http://localhost:3000

## Structure
- `App.tsx` — hash router (`#/HomeIM`, `#/Production`, …); default screen is Home (inventory manager)
- `pages/*.tsx` — one file per artboard (15 screens)
- `lib/dc.ts` — small helpers the screens share
