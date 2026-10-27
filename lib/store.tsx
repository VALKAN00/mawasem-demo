import React, { createContext, useContext, useState } from 'react';
import { l, L, Role } from './app';

/** Shared mock data. Every screen reads and writes this, so counts and lists stay in step. A backend would replace it. */

export type Step = 'sieving' | 'sizing' | 'metal' | 'packing';

// ---- master data (FR1). Records are never deleted, only deactivated. ar = optional Arabic name.
export interface Named { id: string; name: string; ar?: string; active: boolean }
export interface FieldRec extends Named { organic: boolean; cert: string }
export interface Supplier extends Named { fields: FieldRec[] }
/** id is the 3-letter code used in every lot code. Steps are configurable per product. */
export interface Product extends Named { sieving: boolean; sizing: boolean }
export interface Pack extends Named { net: number }
export interface Loc extends Named { allowed: 'any' | 'organic' | 'conventional' }
export type Customer = Named

export const nameL = (o: Named | undefined, fallback: string): L => l(o ? o.name : fallback, o ? o.ar || o.name : fallback);

const SUPPLIERS: Supplier[] = [
  { id: 'wadi', name: 'Wadi Green Co-op', ar: 'تعاونية وادي الأخضر', active: true, fields: [{ id: 'wadi-3', name: 'Field 3 — North plot', ar: 'الحقل 3 — القطعة الشمالية', active: true, organic: true, cert: '' }] },
  { id: 'nour', name: 'Al-Nour Farm', ar: 'مزرعة النور', active: true, fields: [
    { id: 'nour-7', name: 'Field 7 — River plot', ar: 'الحقل 7 — قطعة النهر', active: true, organic: false, cert: '' },
    { id: 'nour-2', name: 'Field 2', ar: 'الحقل 2', active: true, organic: true, cert: '' }] },
  { id: 'sunrise', name: 'Sunrise Growers', ar: 'مزارعو الشروق', active: true, fields: [{ id: 'sunrise-4', name: 'Field 4', ar: 'الحقل 4', active: true, organic: false, cert: '' }] },
  { id: 'delta', name: 'Delta Herbs', ar: 'أعشاب الدلتا', active: true, fields: [{ id: 'delta-1', name: 'Field 1 — East plot', ar: 'الحقل 1 — القطعة الشرقية', active: true, organic: false, cert: '' }] },
];
const PRODUCTS: Product[] = [
  { id: 'HIB', name: 'Hibiscus', ar: 'كركديه', active: true, sieving: true, sizing: true },
  { id: 'MNT', name: 'Mint', ar: 'نعناع', active: true, sieving: true, sizing: true },
  { id: 'CHM', name: 'Chamomile', ar: 'بابونج', active: true, sieving: true, sizing: false },
];
const PACKS: Pack[] = [
  { id: 'pp25', name: '25 kg PP bag', ar: 'كيس بولي بروبيلين 25 كجم', active: true, net: 25 },
  { id: 'pa20', name: '20 kg paper bag', ar: 'كيس ورقي 20 كجم', active: true, net: 20 },
  { id: 'ct10', name: '10 kg carton', ar: 'كرتون 10 كجم', active: true, net: 10 },
];
const LOCS: Loc[] = [
  { id: 'r4', name: 'Rack 04', ar: 'رف 04', active: true, allowed: 'conventional' },
  { id: 'r5', name: 'Rack 05', ar: 'رف 05', active: true, allowed: 'organic' },
  { id: 'bay', name: 'Loading bay', ar: 'منصة التحميل', active: true, allowed: 'any' },
];
const CUSTOMERS: Customer[] = [
  { id: 'verde', name: 'Verde Herbal Co.', ar: 'فيردي هيربال', active: true },
  { id: 'north', name: 'Northfield Teas', ar: 'نورثفيلد تي', active: true },
];

// ---- operational data
export const MINT = l('Dried mint', 'نعناع مجفف');
export const HIB = l('Hibiscus', 'كركديه');
export const CHM = l('Chamomile', 'بابونج');
export const PP25 = l('25 kg PP bag', 'كيس بولي بروبيلين 25 كجم');
export const PA20 = l('20 kg paper bag', 'كيس ورقي 20 كجم');
export const CT10 = l('10 kg carton', 'كرتون 10 كجم');

export interface Raw { id: string; pc: string; kg: number; supplier: string; field?: string; rate: number; organic: boolean; status: 'wait' | 'ready' | 'used' | 'rejected'; moisture?: string; moistureHigh?: boolean }
/** closed = finished packing or rejected. Records are never deleted. */
/** One recorded step. waste is what is left after kg out and by-product, so it includes any unmeasured loss. */
export interface StepLog { step: Step; kgIn: number; kgOut: number; by: number; waste: number; date: string; who: 'IM' | 'QM'; result?: 'pass' | 'fail' | 'cleared' }
/** kgIn is what entered processing, kg is what is in the batch now. sources say which raw lots (and how much) it was made from. */
export interface Batch {
  id: string; pc: string; kg: number; kgIn: number; step: Step; held: boolean; rejects: number; organic: boolean;
  sources: { raw: string; kg: number }[]; log: StepLog[]; by: number; waste: number;
  /** closed = packed or rejected. finKg is what ended up in finished lots. Records are never deleted. */
  closed?: boolean; rejected?: boolean; finKg?: number;
}
export interface Line { lot: string; product: L; pack: L; bags: number; net: number; gross: number; label: string; href: string }
export interface Ship { id: string; customer: string; container: string; date: string; shipped: boolean; lines: Line[] }
/** loc is a Loc id. */
/** batch = the processing batch it came from. recipe = the lots a blend was made from. */
export interface Fin { code: string; pc: string; product: L; pack: L; bags: number; kg: number; organic: boolean; loc: string; batch?: string; recipe?: { code: string; kg: number }[] }
export interface Alert { id: string; code: string; title: L; detail: L; reviewed: boolean }
export interface AuditEntry { when: string; what: L; who: 'IM' | 'QM' | 'SYS'; kind: 'all' | 'appr' | 'edit'; reason?: L }

const RAWS: Raw[] = [
  { id: 'RM-HIB-261022-01', pc: 'HIB', kg: 1000, supplier: 'wadi', field: 'wadi-3', rate: 80, organic: true, status: 'wait', moisture: '11.2%' },
  { id: 'RM-HIB-261021-02', pc: 'HIB', kg: 850, supplier: 'sunrise', field: 'sunrise-4', rate: 82, organic: false, status: 'wait', moisture: '12.6%', moistureHigh: true },
  { id: 'RM-MNT-261021-03', pc: 'MNT', kg: 500, supplier: 'delta', field: 'delta-1', rate: 78, organic: false, status: 'wait', moisture: '10.4%' },
  { id: 'RM-HIB-261019-04', pc: 'HIB', kg: 600, supplier: 'wadi', field: 'wadi-3', rate: 84, organic: true, status: 'ready' },
  { id: 'RM-HIB-261018-05', pc: 'HIB', kg: 900, supplier: 'nour', field: 'nour-7', rate: 83, organic: false, status: 'ready' },
  { id: 'RM-CHM-261019-01', pc: 'CHM', kg: 1300, supplier: 'delta', field: 'delta-1', rate: 79, organic: false, status: 'ready' },
  { id: 'RM-HIB-261017-02', pc: 'HIB', kg: 760, supplier: 'nour', field: 'nour-7', rate: 80, organic: false, status: 'rejected' },
  { id: 'RM-MNT-261020-01', pc: 'MNT', kg: 1000, supplier: 'nour', field: 'nour-7', rate: 80, organic: false, status: 'used' },
  { id: 'RM-HIB-261020-01', pc: 'HIB', kg: 600, supplier: 'wadi', field: 'wadi-3', rate: 82, organic: true, status: 'used' },
  { id: 'RM-HIB-261020-02', pc: 'HIB', kg: 400, supplier: 'nour', field: 'nour-2', rate: 82, organic: true, status: 'used' },
  { id: 'RM-HIB-261021-08', pc: 'HIB', kg: 600, supplier: 'wadi', field: 'wadi-3', rate: 83, organic: true, status: 'used' },
  { id: 'RM-CHM-261018-03', pc: 'CHM', kg: 1100, supplier: 'delta', field: 'delta-1', rate: 79, organic: false, status: 'used' },
];
const BATCHES: Batch[] = [
  { id: 'PB-HIB-261022-01', pc: 'HIB', kg: 600, kgIn: 600, step: 'sieving', held: false, rejects: 0, organic: true, sources: [{ raw: 'RM-HIB-261021-08', kg: 600 }], log: [], by: 0, waste: 0 },
  { id: 'PB-HIB-261021-01', pc: 'HIB', kg: 905, kgIn: 1000, step: 'metal', held: true, rejects: 3.2, organic: true, sources: [{ raw: 'RM-HIB-261020-01', kg: 600 }, { raw: 'RM-HIB-261020-02', kg: 400 }], by: 65, waste: 30, log: [
    { step: 'sieving', kgIn: 1000, kgOut: 940, by: 40, waste: 20, date: '21/10', who: 'IM' },
    { step: 'sizing', kgIn: 940, kgOut: 905, by: 25, waste: 10, date: '21/10', who: 'IM' },
    { step: 'metal', kgIn: 905, kgOut: 905, by: 0, waste: 0, date: '21/10', who: 'IM', result: 'fail' }] },
  { id: 'PB-CHM-261022-01', pc: 'CHM', kg: 1045, kgIn: 1100, step: 'packing', held: false, rejects: 0, organic: false, sources: [{ raw: 'RM-CHM-261018-03', kg: 1100 }], by: 35, waste: 20, log: [
    { step: 'sieving', kgIn: 1100, kgOut: 1050, by: 35, waste: 15, date: '22/10', who: 'IM' },
    { step: 'metal', kgIn: 1050, kgOut: 1045, by: 0, waste: 5, date: '22/10', who: 'IM', result: 'pass' }] },
];
const SHIPS: Ship[] = [
  { id: 'SH-261025-01', customer: 'verde', container: 'MSKU 482193-0', date: '25/10', shipped: false, lines: [
    { lot: 'FG-MNT-261022-01', product: MINT, pack: PP25, bags: 18, net: 450, gross: 454.5, label: 'v3', href: '#/LotFinished' },
    { lot: 'FG-HIB-261019-02', product: HIB, pack: PA20, bags: 40, net: 800, gross: 812, label: 'v2', href: '#/LotFinished' },
    { lot: 'FG-CHM-261018-01', product: CHM, pack: CT10, bags: 30, net: 300, gross: 318, label: 'v3', href: '#/LotFinished' }] },
  { id: 'SH-261028-02', customer: 'north', container: 'TGHU 730415-2', date: '28/10', shipped: false, lines: [
    { lot: 'BL-MNT-261023-01', product: l('Mint & chamomile', 'نعناع وبابونج'), pack: PP25, bags: 20, net: 500, gross: 505, label: 'v1', href: '#/LotBlend' }] },
  { id: 'SH-261018-01', customer: 'verde', container: 'MSKU 118820-4', date: '18/10', shipped: true, lines: [
    { lot: 'FG-HIB-261016-02', product: HIB, pack: PA20, bags: 30, net: 600, gross: 609, label: 'v2', href: '#/LotFinished' },
    { lot: 'FG-MNT-261013-01', product: MINT, pack: PP25, bags: 32, net: 800, gross: 808, label: 'v3', href: '#/LotFinished' }] },
  { id: 'SH-261009-01', customer: 'north', container: 'TGHU 604417-8', date: '09/10', shipped: true, lines: [
    { lot: 'FG-MNT-261006-01', product: MINT, pack: PP25, bags: 16, net: 400, gross: 404, label: 'v3', href: '#/LotFinished' },
    { lot: 'FG-CHM-261005-01', product: CHM, pack: CT10, bags: 80, net: 800, gross: 848, label: 'v3', href: '#/LotFinished' }] },
];
const FINS: Fin[] = [
  { code: 'FG-MNT-261022-01', pc: 'MNT', product: MINT, pack: PP25, bags: 18, kg: 450, organic: false, loc: 'bay' },
  { code: 'FG-HIB-261019-02', pc: 'HIB', product: HIB, pack: PA20, bags: 40, kg: 800, organic: true, loc: 'bay' },
  { code: 'FG-CHM-261018-01', pc: 'CHM', product: CHM, pack: CT10, bags: 30, kg: 300, organic: false, loc: 'bay' },
  { code: 'FG-MNT-261014-02', pc: 'MNT', product: MINT, pack: PP25, bags: 40, kg: 1000, organic: false, loc: 'r4' },
  { code: 'FG-MNT-261010-01', pc: 'MNT', product: MINT, pack: PP25, bags: 20, kg: 500, organic: false, loc: 'r4' },
  { code: 'FG-HIB-261012-02', pc: 'HIB', product: HIB, pack: PA20, bags: 109, kg: 2175, organic: false, loc: 'r4' },
  { code: 'FG-CHM-261019-03', pc: 'CHM', product: CHM, pack: CT10, bags: 45, kg: 450, organic: false, loc: 'r4' },
  { code: 'FG-CHM-261015-02', pc: 'CHM', product: CHM, pack: CT10, bags: 175, kg: 1750, organic: false, loc: 'r4' },
  { code: 'FG-HIB-261019-03', pc: 'HIB', product: HIB, pack: PA20, bags: 21, kg: 425, organic: true, loc: 'r5' },
  { code: 'FG-HIB-261016-01', pc: 'HIB', product: HIB, pack: CT10, bags: 201, kg: 2010, organic: true, loc: 'r5' },
];
const ALERTS: Alert[] = [
  { id: 'y1', code: 'RM-MNT-261020-01', title: l('50 kg below agreed yield', '50 كجم أقل من الإنتاجية المتفق عليها'), detail: l('Mint · Al-Nour Farm · −6.25% · farmer paid for 800 kg', 'نعناع · مزرعة النور · −6.25% · يُدفع للمزارع ثمن 800 كجم'), reviewed: false },
  { id: 'y2', code: 'RM-HIB-261018-02', title: l('42 kg below agreed yield', '42 كجم أقل من الإنتاجية المتفق عليها'), detail: l('Hibiscus · Wadi Green Co-op · −2.06%', 'كركديه · تعاونية وادي الأخضر · −2.06%'), reviewed: false },
];
const AUDIT: AuditEntry[] = [
  { when: '22/10 11:20', what: l('Yield alert raised on RM-MNT-261020-01', 'تنبيه إنتاجية على RM-MNT-261020-01'), who: 'SYS', kind: 'all' },
  { when: '22/10 09:12', what: l('Metal detector check cleared on PB-HIB-261021-01', 'السماح بمتابعة PB-HIB-261021-01 بعد فحص المعادن'), who: 'QM', kind: 'appr', reason: l('Rejects removed, 3 clean passes', 'إزالة المرفوضات، 3 فحوصات ناجحة') },
  { when: '22/10 08:30', what: l('Received RM-HIB-261022-01, 1,000 kg', 'استلام RM-HIB-261022-01، 1,000 كجم'), who: 'IM', kind: 'all' },
  { when: '21/10 16:05', what: l('Changed locked record RM-HIB-261018-02: moisture 12.4% → 11.4%', 'تعديل سجل مقفل RM-HIB-261018-02: الرطوبة 12.4% ← 11.4%'), who: 'QM', kind: 'edit', reason: l('Typing error, lab sheet shows 11.4%', 'خطأ إدخال، ورقة المختبر تُظهر 11.4%') },
  { when: '20/10 14:05', what: l('Approved RM-MNT-261020-01, agreed yield 80% locked', 'اعتماد RM-MNT-261020-01، قفل الإنتاجية 80%'), who: 'QM', kind: 'appr' },
];

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
interface Store {
  raws: Raw[]; setRaws: Setter<Raw[]>;
  batches: Batch[]; setBatches: Setter<Batch[]>;
  ships: Ship[]; setShips: Setter<Ship[]>;
  alerts: Alert[]; setAlerts: Setter<Alert[]>;
  fins: Fin[]; setFins: Setter<Fin[]>;
  suppliers: Supplier[]; setSuppliers: Setter<Supplier[]>;
  products: Product[]; setProducts: Setter<Product[]>;
  packs: Pack[]; setPacks: Setter<Pack[]>;
  locs: Loc[]; setLocs: Setter<Loc[]>;
  customers: Customer[]; setCustomers: Setter<Customer[]>;
  /** Yield alert threshold in %. Default 0: any negative variance is flagged. */
  threshold: number; setThreshold: Setter<number>;
  audit: AuditEntry[];
  /** Adds a line to the audit log with the time. */
  log: (role: Role | 'sys', what: L, kind?: AuditEntry['kind'], reason?: L) => void;
}
const StoreCtx = createContext<Store>(null as any);
export const useStore = () => useContext(StoreCtx);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [raws, setRaws] = useState(RAWS);
  const [batches, setBatches] = useState(BATCHES);
  const [ships, setShips] = useState(SHIPS);
  const [alerts, setAlerts] = useState(ALERTS);
  const [fins, setFins] = useState(FINS);
  const [suppliers, setSuppliers] = useState(SUPPLIERS);
  const [products, setProducts] = useState(PRODUCTS);
  const [packs, setPacks] = useState(PACKS);
  const [locs, setLocs] = useState(LOCS);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [threshold, setThreshold] = useState(0);
  const [audit, setAudit] = useState(AUDIT);
  const log: Store['log'] = (role, what, kind = 'all', reason) => {
    const d = new Date();
    const when = '22/10 ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    setAudit((a) => [{ when, what, who: role === 'qm' ? 'QM' : role === 'im' ? 'IM' : 'SYS', kind, reason }, ...a]);
  };
  return (
    <StoreCtx.Provider value={{ raws, setRaws, batches, setBatches, ships, setShips, alerts, setAlerts, fins, setFins, suppliers, setSuppliers, products, setProducts, packs, setPacks, locs, setLocs, customers, setCustomers, threshold, setThreshold, audit, log }}>
      {children}
    </StoreCtx.Provider>
  );
}

/** Bilingual names for ids. They keep working for deactivated records, which stay in history. */
export function useNames() {
  const { products, suppliers, packs, locs, customers } = useStore();
  return {
    prodL: (id: string) => nameL(products.find((p) => p.id === id), id),
    supL: (id: string) => nameL(suppliers.find((s) => s.id === id), id),
    packL: (id: string) => nameL(packs.find((p) => p.id === id), id),
    locL: (id: string) => nameL(locs.find((o) => o.id === id), id),
    custL: (id: string) => nameL(customers.find((c) => c.id === id), id),
  };
}

/** Steps are configurable per product (for example chamomile skips sizing). */
export function useStepsFor() {
  const { products } = useStore();
  return (pc: string): Step[] => {
    const p = products.find((o) => o.id === pc);
    const out: Step[] = [];
    if (!p || p.sieving) out.push('sieving');
    if (!p || p.sizing) out.push('sizing');
    return [...out, 'metal', 'packing'];
  };
}

/** What is waiting, for sidebar badges. Held batches are the quality manager's job, so they count under Approvals. */
export function useCounts() {
  const { raws, batches, ships, alerts } = useStore();
  const live = batches.filter((b) => !b.closed);
  const approvals = raws.filter((r) => r.status === 'wait').length + live.filter((b) => b.held).length + alerts.filter((a) => !a.reviewed).length;
  const production = live.filter((b) => !b.held).length + raws.filter((r) => r.status === 'ready').length;
  const shipments = ships.filter((s) => !s.shipped).length;
  return { approvals, production, shipments };
}

/** A finished lot becomes a shipment line. Gross weight adds about 1% for the bags. */
export const lineFor = (f: Fin): Line => ({ lot: f.code, product: f.product, pack: f.pack, bags: f.bags, net: f.kg, gross: Math.round(f.kg * 1.01 * 10) / 10, label: 'v1', href: f.code.startsWith('BL-') ? '#/LotBlend' : '#/LotFinished' });

/**
 * Where the kilos of one raw lot went. Each batch is attributed to the lot by its share of the batch input.
 * waste includes unmeasured loss, because only kg out and by-product are recorded per step.
 * A lot is complete when every batch made from it is packed and none was rejected.
 */
export function rawSummary(raw: Raw, batches: Batch[]) {
  let fin = 0, by = 0, waste = 0, proc = 0, used = 0, rejected = false, open = false;
  const mine = batches.filter((b) => b.sources.some((o) => o.raw === raw.id));
  mine.forEach((b) => {
    const src = b.sources.find((o) => o.raw === raw.id)!;
    const share = src.kg / b.kgIn;
    used += src.kg;
    by += b.by * share;
    waste += b.waste * share;
    if (b.closed && b.rejected) { rejected = true; waste += b.kg * share; }
    else if (b.closed) fin += (b.finKg || 0) * share;
    else { open = true; proc += b.kg * share; }
  });
  const stock = Math.max(0, raw.kg - used);
  const expected = Math.round((raw.kg * raw.rate) / 100 * 10) / 10;
  const complete = mine.length > 0 && !open && !rejected && stock === 0;
  const r1 = (n: number) => Math.round(n * 10) / 10;
  return { fin: r1(fin), by: r1(by), waste: r1(waste), proc: r1(proc), stock, expected, variance: r1(fin - expected), pct: expected ? ((fin - expected) / expected) * 100 : 0, complete, started: mine.length > 0, batches: mine };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Everything that changes a batch. Shared by Production and Approvals so both behave the same.
 * Packing a batch checks the yield of every raw lot it used (FR8): when a lot is complete and came in
 * below the agreed yield by more than the threshold, an alert is raised for the quality manager.
 */
export function useBatchActions() {
  const { raws, batches, setBatches, setFins, alerts, setAlerts, threshold, log } = useStore();
  const stepsFor = useStepsFor();
  const { prodL, supL, packL } = useNames();
  const today = '22/10';
  const patch = (id: string, fn: (b: Batch) => Batch) => setBatches((bs) => bs.map((b) => (b.id === id ? fn(b) : b)));
  const next = (b: Batch) => { const list = stepsFor(b.pc); return list[list.indexOf(b.step) + 1]; };
  type Who = 'IM' | 'QM';
  return {
    /** Sieving or sizing: kg out and by-product. Waste is whatever is left. */
    recordStep(b: Batch, kgOut: number, by: number, who: Who) {
      const waste = r1(b.kg - kgOut - by);
      patch(b.id, (o) => ({ ...o, kg: kgOut, step: next(o), by: r1(o.by + by), waste: r1(o.waste + waste), log: [...o.log, { step: o.step, kgIn: o.kg, kgOut, by, waste, date: today, who }] }));
    },
    metalPass(b: Batch, rejects: number, who: Who) {
      patch(b.id, (o) => ({ ...o, kg: r1(o.kg - rejects), step: next(o), waste: r1(o.waste + rejects), log: [...o.log, { step: 'metal', kgIn: o.kg, kgOut: r1(o.kg - rejects), by: 0, waste: rejects, date: today, who, result: 'pass' }] }));
    },
    metalFail(b: Batch, rejects: number, who: Who) {
      patch(b.id, (o) => ({ ...o, held: true, rejects, log: [...o.log, { step: 'metal', kgIn: o.kg, kgOut: o.kg, by: 0, waste: 0, date: today, who, result: 'fail' }] }));
    },
    clearHold(b: Batch, who: Who) {
      patch(b.id, (o) => ({ ...o, held: false, kg: r1(o.kg - o.rejects), step: next(o), waste: r1(o.waste + o.rejects), log: [...o.log, { step: 'metal', kgIn: o.kg, kgOut: r1(o.kg - o.rejects), by: 0, waste: o.rejects, date: today, who, result: 'cleared' }] }));
    },
    reject(b: Batch) { patch(b.id, (o) => ({ ...o, closed: true, rejected: true })); },
    /** Packing, weighing, labeling and storage. Returns the new finished lot code. */
    pack(b: Batch, p: { packId: string; bags: number; total: number; locId: string; who: Who }) {
      const fg = b.id.replace('PB-', 'FG-');
      const leftover = Math.max(0, r1(b.kg - p.total));
      const done: Batch = { ...b, closed: true, finKg: p.total, waste: r1(b.waste + leftover), log: [...b.log, { step: 'packing', kgIn: b.kg, kgOut: p.total, by: 0, waste: leftover, date: today, who: p.who }] };
      const after = batches.map((o) => (o.id === b.id ? done : o));
      setBatches(after);
      setFins((fs) => [...fs, { code: fg, pc: b.pc, product: prodL(b.pc), pack: packL(p.packId), bags: p.bags, kg: p.total, organic: b.organic, loc: p.locId, batch: b.id }]);
      b.sources.forEach((src) => {
        const raw = raws.find((r) => r.id === src.raw);
        if (!raw) return;
        const sum = rawSummary(raw, after);
        if (!sum.complete || sum.variance >= 0 || -sum.pct <= threshold || alerts.some((a) => a.code === raw.id)) return;
        const kgShort = Math.abs(sum.variance);
        const pct = Math.abs(sum.pct).toFixed(2);
        const prod = prodL(raw.pc), sup = supL(raw.supplier);
        setAlerts((as) => [{
          id: 'y-' + raw.id, code: raw.id, reviewed: false,
          title: l(`${kgShort} kg below agreed yield`, `${kgShort} كجم أقل من الإنتاجية المتفق عليها`),
          detail: l(`${prod.en} · ${sup.en} · −${pct}% · farmer paid for ${sum.expected} kg`, `${prod.ar} · ${sup.ar} · −${pct}% · يُدفع للمزارع ثمن ${sum.expected} كجم`),
        }, ...as]);
        log('sys', l(`Yield alert raised on ${raw.id}`, `تنبيه إنتاجية على ${raw.id}`));
      });
      return fg;
    },
  };
}
