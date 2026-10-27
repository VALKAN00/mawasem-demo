# Mawasem Factory Traceability — Simplified (v3)

React + TypeScript prototype of the factory traceability screens, in English and Arabic (RTL).

## Run locally
npm install
npm run dev   # http://localhost:3000

## Structure
- `App.tsx` — hash router (`#/Production`, `#/Trace?code=RM-…`). No Home page: the quality manager opens on Approvals, the inventory manager on Production.
- `lib/app.tsx` — language (English/Arabic, sets `dir`) and role. Text is written as `t('Save', 'حفظ')`.
- `lib/store.tsx` — shared mock data (raw lots, batches, finished lots, shipments, yield alerts). Every screen reads and writes it, so lists and sidebar counts stay in step. A backend would replace it.
- `lib/Shell.tsx`, `lib/ui.css` — sidebar, language switch, role switch, shared styles (logical properties, so they flip for RTL).
- `lib/lots.ts` — builds a lot page from the store (raw lot, batch, finished lot, blend). `lib/records.ts` — fixed sample records, used only for old lots the store has no lineage for. `lib/ImportPanel.tsx` — opening-stock CSV import (used on Stock).
- `pages/*.tsx` — Approvals, Production, Receive, Stock, Shipments, Trace, Reports, Master data, and the lot pages (one `LotView` shared by Lot, LotBatch, LotBlend, LotFinished, LotHold, LotRun).

## How yield works
Every batch records which raw lots it used, and every step records kg out and by-product (waste is what is left). When the last batch of a raw lot is packed, the lot is compared with its agreed yield (kg × rate). A shortfall beyond the threshold on Approvals raises an alert. Per step, waste and unexplained loss are one figure.

## Known limits
- Data is in memory; a refresh resets it.
- Excel export is CSV with a byte-order mark (opens in Excel). Opening-stock import reads CSV.
- Old lots (for example RM-MNT-261020-01) are fixed samples. Lots received and processed in the app are computed from the store.
- Master data (suppliers with fields, products, customers, packaging, locations) is read by Receive, Production, Shipments and Stock. The yield alert threshold is on Approvals and only affects how Reports colours the variance.
- The audit log is on Reports. Opening-stock import is on Stock.
