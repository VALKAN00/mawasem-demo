// @ts-nocheck
// Generated from v2/Production.dc.html (Factory Traceability UI · Simplified v2). Design unchanged.
import React from 'react';
import { DCLogic, dcCss, dcHref, dcStr, dcTxt, dcNoop } from '../lib/dc';

export const title = "Production board";

const STYLE = "\nbody{margin:0;font-family:'IBM Plex Sans',system-ui,sans-serif;color:#1B2420;background:#F6F7F5}\na{color:#1F6B4F}a:hover{color:#14503A}\n.nv{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 14px;border-radius:10px;color:#3C4742;text-decoration:none;font-size:15px;font-weight:500}\n.nv:hover{background:#F1F3F0;color:#1B2420}\n.nv.on{background:#1F6B4F;color:#FFFFFF}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:10px;border:1px solid #CBD2CC;background:#FFFFFF;color:#1B2420;font:inherit;font-size:15px;font-weight:500;text-decoration:none;cursor:pointer;box-sizing:border-box;white-space:nowrap}\n.btn:hover{background:#F1F3F0;color:#1B2420}\n.btn.pri{background:#1F6B4F;border-color:#1F6B4F;color:#FFFFFF}\n.btn.pri:hover{background:#14503A;color:#FFFFFF}\n.btn.neg{color:#A41E14;border-color:#E9B8B2}\n.btn.full{width:100%;min-height:54px;font-size:16px;font-weight:600}\n.btn.sm{min-height:40px;padding:0 14px;font-size:14px}\n.btn:disabled{opacity:.5;cursor:not-allowed}\n.mono{font-family:'IBM Plex Mono',monospace}\n.badge{display:inline-flex;align-items:center;gap:5px;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap}\n.ok{background:#E6F0EA;color:#14503A}.warn{background:#FFF4E0;color:#7A4700}.bad{background:#FDECEA;color:#A41E14}.info{background:#E8F0FA;color:#1A5598}.mute{background:#EEF0ED;color:#3C4742}\n.seg{display:inline-flex;align-items:center;min-height:40px;padding:0 12px;border:0;background:transparent;font:inherit;font-size:13px;font-weight:500;cursor:pointer;color:#3C4742;border-radius:7px}\n.seg.on{background:#FFFFFF;color:#14503A;box-shadow:0 1px 2px rgba(20,30,25,0.12)}\n.col{flex:0 0 190px;display:flex;flex-direction:column;gap:10px;background:#EEF0ED;border-radius:12px;padding:12px}\n.colh{display:flex;justify-content:space-between;align-items:baseline;gap:6px;padding:2px 2px 4px}\n.kcard{display:flex;flex-direction:column;gap:4px;text-align:left;width:100%;padding:12px;border-radius:10px;border:1px solid #E3E6E1;background:#FFFFFF;font:inherit;color:#1B2420;cursor:pointer;box-sizing:border-box}\n.kcard:hover{border-color:#1F6B4F}\n.kcard.sel{border:2px solid #1F6B4F;padding:11px;box-shadow:0 2px 8px rgba(20,30,25,0.12)}\n.kcard.held{border-color:#E9B8B2;background:#FFFBFA}\n.nxt{font-size:12px;font-weight:600;color:#14503A;margin-top:4px}\n.fl{display:flex;flex-direction:column;gap:6px}\n.fl label{font-size:13px;font-weight:500;color:#3C4742}\n.fl input,.fl textarea{font:inherit;font-size:18px;font-weight:600;min-height:50px;padding:8px 12px;border:1px solid #CBD2CC;border-radius:10px;background:#FFFFFF;color:#1B2420;box-sizing:border-box;width:100%;font-variant-numeric:tabular-nums}\n.fl input.sm,.fl textarea{font-size:14px;font-weight:400;min-height:44px}\n.fl input[readonly]{background:#F4F6F3;color:#3C4742}\n.kv{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid #EEF0ED;font-size:14px}\n.kv span:first-child{color:#5C6862}\n.pick{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #E3E6E1;border-radius:10px;font-size:14px;cursor:pointer}\n.pick input{width:22px;height:22px;accent-color:#1F6B4F;margin:0;flex:none}\n.sub{font-size:13px;font-weight:600;margin-top:4px}\n.kgin{width:110px;font:inherit;font-size:16px;font-weight:600;min-height:44px;padding:6px 10px;border:1px solid #CBD2CC;border-radius:8px;text-align:right;box-sizing:border-box;font-variant-numeric:tabular-nums}\n.kgin.err{border:2px solid #C8372D}\n.stp{display:inline-flex;padding:4px 10px;border-radius:999px;background:#EEF0ED;font-size:12px;font-weight:500}\n.pkt{min-height:40px;padding:0 12px;border-radius:8px;border:1px solid #CBD2CC;background:#FFFFFF;font:inherit;font-size:13px;font-weight:500;cursor:pointer;color:#1B2420}\n.pkt.on{border:2px solid #1F6B4F;background:#F4F8F5;padding:0 11px}\n.chip{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid #CBD2CC;background:#FFFFFF;font:inherit;font-size:13px;color:#3C4742;cursor:pointer}\n.chip.on{background:#1B2420;border-color:#1B2420;color:#FFFFFF}\n.bsearch{font:inherit;font-size:14px;min-height:44px;padding:8px 12px;border:1px solid #CBD2CC;border-radius:8px;box-sizing:border-box;width:100%}\n.brow{display:flex;align-items:center;min-height:62px;border-top:1px solid #EEF0ED;font-size:14px}\n.bc{flex:1 1 0;min-width:90px;padding:8px 12px;box-sizing:border-box}\n.bw2{flex:1.6 1 0;min-width:160px}\n.br{text-align:right;font-variant-numeric:tabular-nums}\n";

class Component extends DCLogic {
scanVals() {
const raw = (this.state && this.state.scanQ) || '';
const q = String(raw).trim().toUpperCase();
const prods = { MNT: 'Mint', HIB: 'Hibiscus', CHM: 'Chamomile' };
const codes = ['RM-HIB-261022-01', 'RM-HIB-261021-02', 'RM-MNT-261021-03', 'RM-HIB-261019-04', 'RM-HIB-261018-05', 'RM-CHM-261019-01', 'RM-HIB-261017-02', 'RM-MNT-261020-01', 'RM-HIB-261020-01', 'RM-HIB-261020-02',
'PB-HIB-261022-01', 'PB-HIB-261021-01', 'PB-CHM-261022-01', 'PB-MNT-261021-01', 'PB-MNT-261021-02', 'PB-HIB-261019-01',
'FG-MNT-261022-01', 'FG-HIB-261019-02', 'FG-CHM-261018-01', 'FG-MNT-261014-02', 'FG-MNT-261010-01', 'FG-HIB-261012-02', 'FG-CHM-261019-03', 'FG-CHM-261015-02', 'FG-HIB-261019-03', 'FG-HIB-261016-01',
'BL-MNT-261023-01', 'SH-261025-01', 'SH-261028-02'];
const pages = { RM: 'Lot.dc.html', PB: 'LotBatch.dc.html', FG: 'LotFinished.dc.html', BL: 'LotBlend.dc.html', SH: 'Shipments.dc.html' };
const kinds = { RM: 'raw lot', PB: 'batch', FG: 'finished lot', BL: 'blend', SH: 'shipment' };
const pc = prods[q] ? q : (q.length >= 3 ? Object.keys(prods).find((k) => prods[k].toUpperCase().indexOf(q) === 0) : undefined);
const found = pc ? codes.filter((c) => c.split('-')[1] === pc) : [];
const link = (c) => c === 'PB-HIB-261021-01' ? 'LotHold.dc.html' : (c === 'PB-CHM-261022-01' || c === 'PB-HIB-261022-01') ? 'LotRun.dc.html' : pages[c.slice(0, 2)];
return {
scanQ: raw,
setScan: (e) => this.setState({ scanQ: e.target.value }),
scanHit: found.length > 0,
scanMiss: q.length >= 3 && found.length === 0,
scanHead: pc ? prods[pc] + ' (' + pc + ') · ' + found.length + ' records' : found.length + (found.length === 1 ? ' match' : ' matches'),
scanResults: found.slice(0, 6).map((c) => ({ code: c, kind: kinds[c.slice(0, 2)], link: link(c) })),
scanHasMore: found.length > 6,
scanMore: found.length > 6 ? '+ ' + (found.length - 6) + ' more. Use Stock or Trace to see them all.' : ''
};
}
blank(kg) {
const out = Math.round(kg * 0.94);
const waste = Math.round(kg * 0.02);
return { out: out, waste: waste, bp: kg - out - waste, when: '22 Oct, 15:20', notes: '', rejects: 0, clearWhy: 'Rejects removed and re-tested. 3 clean passes.' };
}
constructor(props) {
super(props);
this.state = {
role: 'qm', sel: 'PB-HIB-261022-01', n: 2, toast: '', picks: {}, kgs: {}, startWhen: '22 Oct, 15:30', startNotes: '',
split: false, bagFixed: false, packType: 25, view: 'board', bq: '', bst: 'all', doneBatches: [],
logs: {
'PB-HIB-261021-01': [
{ name: 'Sieving', text: '1,000 → 940 kg · waste 20 · residue 40', when: '21 Oct, 09:30 · IM' },
{ name: 'Sizing', text: '940 → 905 kg · waste 10 · fines 25', when: '21 Oct, 12:10 · IM' },
{ name: 'Metal detector', text: '905 kg · 3.2 kg rejects · Failed', when: '21 Oct, 15:40 · IM' }
],
'PB-CHM-261022-01': [
{ name: 'Sieving', text: '1,100 → 1,050 kg · waste 15 · fines 35', when: '22 Oct, 09:00 · IM' },
{ name: 'Metal detector', text: '1,050 → 1,045 kg · 5 kg rejects · Passed', when: '22 Oct, 11:20 · IM' }
]
},
form: this.blank(1200),
cards: [
{ id: 'RM-HIB-261022-01', product: 'Hibiscus', pc: 'HIB', kg: 1000, stage: 'wait', sub: 'Wadi Green Co-op', moist: '11.2%', rate: 80, farming: 'Organic' },
{ id: 'RM-HIB-261021-02', product: 'Hibiscus', pc: 'HIB', kg: 850, stage: 'wait', sub: 'Sunrise Growers', moist: '12.6% · above limit', rate: 82, farming: 'Conventional' },
{ id: 'RM-MNT-261021-03', product: 'Mint', pc: 'MNT', kg: 500, stage: 'wait', sub: 'Delta Herbs', moist: '10.4%', rate: 78, farming: 'Conventional' },
{ id: 'RM-HIB-261019-04', product: 'Hibiscus', pc: 'HIB', kg: 600, stage: 'ready', sub: 'Wadi Green Co-op', org: true, rate: 84 },
{ id: 'RM-HIB-261018-05', product: 'Hibiscus', pc: 'HIB', kg: 900, stage: 'ready', sub: 'Al-Nour Farm', org: false, rate: 83 },
{ id: 'RM-CHM-261019-01', product: 'Chamomile', pc: 'CHM', kg: 1300, stage: 'ready', sub: 'Delta Herbs', org: false, rate: 79 },
{ id: 'PB-HIB-261022-01', product: 'Hibiscus', pc: 'HIB', kg: 1200, stage: 'sieving', sub: 'From RM-HIB-261019-04', org: true, logKey: 'PB-HIB-261022-01', kgIn: 1200, started: '22 Oct, 13:00' },
{ id: 'PB-HIB-261021-01', product: 'Hibiscus', pc: 'HIB', kg: 905, stage: 'metal', sub: 'From 2 raw lots', flag: 'On hold', org: true, rejects: 3.2, logKey: 'PB-HIB-261021-01', kgIn: 1000, started: '21 Oct, 08:30' },
{ id: 'PB-CHM-261022-01', product: 'Chamomile', pc: 'CHM', kg: 1045, stage: 'packing', sub: 'From RM-CHM-261019-01', org: false, logKey: 'PB-CHM-261022-01', kgIn: 1100, started: '22 Oct, 07:40' },
{ id: 'FG-MNT-261022-01', product: 'Dried mint', pc: 'MNT', kg: 450, stage: 'stored', sub: 'Loading bay' },
{ id: 'FG-HIB-261019-03', product: 'Hibiscus', pc: 'HIB', kg: 425, stage: 'stored', sub: 'Rack 05 · organic' }
]
};
}
renderVals() {
const s = this.state;
const fmt = (n) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
const qm = s.role === 'qm';
const opName = qm ? 'Quality manager' : 'Inventory manager';
const who = qm ? 'QM' : 'IM';
const stages = [['wait', 'Waiting approval'], ['ready', 'Ready'], ['sieving', 'Sieving'], ['sizing', 'Sizing'], ['metal', 'Metal detector'], ['packing', 'Packing'], ['stored', 'In storage']];
const stageName = { wait: 'Waiting approval', ready: 'Ready', sieving: 'Sieving', sizing: 'Sizing', metal: 'Metal detector', packing: 'Packing', stored: 'In storage' };
const live = s.cards.filter((c) => c.stage !== 'gone');
const after = (c) => c.stage === 'sieving' ? (c.pc === 'CHM' ? 'metal' : 'sizing') : 'metal';
const nextOf = (c) => {
if (c.stage === 'wait') return qm ? 'Next: approve or reject' : 'Waiting for quality manager';
if (c.stage === 'ready') return 'Next: start batch';
if (c.stage === 'sieving') return 'Next: record sieving';
if (c.stage === 'sizing') return 'Next: record sizing';
if (c.stage === 'metal') return c.flag ? (qm ? 'Next: clear or reject' : 'On hold') : 'Next: metal detector';
if (c.stage === 'packing') return 'Next: pack, weigh & label';
return 'Ready to ship';
};
const defaults = (c) => ({ ...this.blank(c.kg), rejects: c.rejects || 0 });
const sel = live.find((c) => c.id === s.sel);
const key = sel && sel.logKey;
const entries = key ? (s.logs[key] || []) : [];
const withLog = (entry) => ({ ...s.logs, [key]: entries.concat([entry]) });
const patch = (id, p, toast, newSel) => this.setState({ cards: s.cards.map((c) => c.id === id ? { ...c, ...p } : c), toast: toast, sel: newSel === undefined ? s.sel : newSel });
const choose = (c) => this.setState({ sel: c.id, form: defaults(c), toast: '', picks: c.stage === 'ready' ? { [c.id]: true } : {}, kgs: {}, split: false, bagFixed: false });
const cols = stages.map(([k, label]) => {
const cs = live.filter((c) => c.stage === k);
return {
label: label, count: cs.length, kg: fmt(cs.reduce((a, c) => a + c.kg, 0)), empty: cs.length === 0,
cards: cs.map((c) => ({ ...c, kgText: fmt(c.kg), flag: c.flag || '', next: nextOf(c), cls: 'kcard' + (c.flag ? ' held' : '') + (s.sel === c.id ? ' sel' : ''), pressed: s.sel === c.id ? 'true' : 'false', pick: () => choose(c) }))
};
});
// starting a batch from ready lots
const ready = live.filter((c) => c.stage === 'ready');
const chosen = ready.filter((c) => s.picks[c.id]);
const kgOf = (c) => s.kgs[c.id] === undefined ? c.kg : Number(s.kgs[c.id]) || 0;
const errOf = (c) => { const k = kgOf(c); return k <= 0 ? 'Enter kg' : k > c.kg ? 'Only ' + fmt(c.kg) + ' kg available' : ''; };
const prods = chosen.map((c) => c.product).filter((p, i, a) => a.indexOf(p) === i);
const farms = chosen.map((c) => !!c.org).filter((p, i, a) => a.indexOf(p) === i);
const kgErr = chosen.some((c) => !!errOf(c));
const mixErr = chosen.length === 0 ? 'Tick at least one lot.' : prods.length > 1 ? 'One product per batch. Untick the ' + prods[1].toLowerCase() + ' lot.' : farms.length > 1 ? "Organic and conventional can't be mixed. Untick one lot." : kgErr ? 'Check the kg to use. A lot can’t give more than it has.' : '';
const pickKg = chosen.reduce((a, c) => a + kgOf(c), 0);
const expected = Math.round(chosen.reduce((a, c) => a + kgOf(c) * (c.rate || 80) / 100, 0));
const stepList = (pc) => pc === 'CHM' ? ['Sieving', 'Metal detector (CCP 2)', 'Packing'] : ['Sieving', 'Sizing', 'Metal detector (CCP 2)', 'Packing'];
const stepsFor = chosen.length ? chosen[0].pc : (sel ? sel.pc : 'HIB');
// recording steps
const f = s.form;
const isStep = sel && (sel.stage === 'sieving' || sel.stage === 'sizing');
const acc = (Number(f.out) || 0) + (Number(f.waste) || 0) + (Number(f.bp) || 0);
const gap = sel ? sel.kg - acc : 0;
const over = gap < 0;
const warn = !over && sel && gap > sel.kg * 0.005;
const titles = { wait: 'Approve this lot?', ready: 'Start a batch', sieving: 'Record sieving', sizing: 'Record sizing', metal: sel && sel.flag ? 'Batch on hold' : 'Metal detector check', packing: 'Pack, weigh and label', stored: 'In storage' };
// packing
const packDefs = [[25, '25 kg PP bag', 'bags'], [20, '20 kg paper bag', 'bags'], [10, '10 kg carton', 'cartons']];
const pk = packDefs.find((p) => p[0] === s.packType);
const kg = sel ? sel.kg : 0;
const base = sel ? sel.id.replace('PB-', 'FG-') : '';
const bparts = base.split('-');
const seq = bparts.pop();
const second = bparts.concat(['0' + (Number(seq) + 1)]).join('-');
const pk2 = packDefs.find((p) => p[0] === (pk[0] === 10 ? 25 : 10));
const lot1 = s.split ? Math.floor(kg * 0.6 / pk[0]) * pk[0] : Math.floor(kg / pk[0]) * pk[0];
const lot2 = s.split ? Math.floor((kg - lot1) / pk2[0]) * pk2[0] : 0;
const plan = [{ id: base, kg: lot1, pack: pk[1], size: pk[0], unit: pk[2] }].concat(s.split ? [{ id: second, kg: lot2, pack: pk2[1], size: pk2[0], unit: pk2[2] }] : []);
const fgPlan = plan.map((p) => ({ ...p, kgText: fmt(p.kg), bags: p.kg / p.size }));
const bagList = [];
plan.forEach((p) => { for (let i = 0; i < p.kg / p.size; i++) bagList.push(p.size); });
const bagCount = bagList.length;
const leftover = kg - lot1 - lot2;
const offs = [0.02, -0.02, 0.05, -0.04, 0.01, 0, -0.01, 0.08, -0.03, 0.03, 0, -0.02, 0.02, -0.01, 0.01, -0.03, 0.04, 0];
const bagsBad = bagCount >= 18 && !s.bagFixed;
const bagGrid = bagList.map((size, i) => {
const low = i === 17 && bagsBad;
const w = i === 17 ? (s.bagFixed ? size : size - 0.06) : size + offs[i % offs.length];
return { n: i + 1, w: w.toFixed(2), border: low ? '#D9A13B' : '#E3E6E1', bg: low ? '#FFF8EC' : '#FAFBFA', labelColor: low ? '#7A4700' : '#5C6862' };
});
const sizes = plan.map((p) => p.size).filter((v, i, a) => a.indexOf(v) === i);
const rangeText = sizes.map((z) => (z - 0.05).toFixed(2) + '–' + (z + 0.1).toFixed(2) + ' kg' + (sizes.length > 1 ? ' (' + z + ' kg)' : '')).join(', ');
const unitOne = pk[2] === 'cartons' && !s.split ? 'carton' : 'bag';
const lowSize = bagList[17] || pk[0];
// all batches
const hist = [
{ id: 'PB-MNT-261021-01', product: 'Mint', farming: 'Conventional', started: '21 Oct, 08:00', kgIn: 600, kgOut: 450, loss: 'Waste 50 · by-products 83 · unexplained 17', lots: 'FG-MNT-261022-01' },
{ id: 'PB-MNT-261021-02', product: 'Mint', farming: 'Conventional', started: '21 Oct, 08:10', kgIn: 400, kgOut: 300, loss: 'Waste 35 · by-products 57 · unexplained 8', lots: 'FG-MNT-261022-02' },
{ id: 'PB-HIB-261019-01', product: 'Hibiscus', farming: 'Organic', started: '19 Oct, 07:30', kgIn: 1500, kgOut: 1225, loss: 'Waste 100 · by-products 150 · unexplained 25', lots: 'FG-HIB-261019-02, FG-HIB-261019-03' }
].concat(s.doneBatches.map((d) => ({ ...d, loss: 'Recorded in this session' })));
const doneRows = hist.map((h) => ({ id: h.id, product: h.product, farming: h.farming, started: h.started, stage: 'Done', kgIn: fmt(h.kgIn), result: fmt(h.kgOut) + ' kg · ' + (h.kgOut / h.kgIn * 100).toFixed(1) + '%', loss: h.loss, status: 'Completed', group: 'done', badge: 'badge ok', isDone: true, isLive: false, link: 'LotBatch.dc.html', lots: h.lots, open: () => {} }));
const liveRows = live.filter((c) => c.id.indexOf('PB-') === 0).map((c) => ({ id: c.id, product: c.product, farming: c.org ? 'Organic' : 'Conventional', started: c.started || '22 Oct', stage: stageName[c.stage], kgIn: fmt(c.kgIn || c.kg), result: '—', loss: fmt(c.kg) + ' kg in process', status: c.flag ? 'On hold' : 'In process', group: c.flag ? 'hold' : 'run', badge: c.flag ? 'badge bad' : 'badge info', isDone: false, isLive: true, link: '', lots: '', open: () => this.setState({ view: 'board', sel: c.id, form: defaults(c), toast: '' }) }));
const bq = String(s.bq || '').trim().toUpperCase();
const allRows = liveRows.concat(doneRows).filter((r) => !bq || (r.id + ' ' + r.product + ' ' + (r.lots || '')).toUpperCase().indexOf(bq) !== -1);
const bRows = allRows.filter((r) => s.bst === 'all' || r.group === s.bst);
const board = s.view === 'board';
return {
...this.scanVals(),
homeLink: qm ? 'HomeQM.dc.html' : 'HomeIM.dc.html',
roleName: opName, roleInitials: who,
qmCls: qm ? 'seg on' : 'seg', imCls: qm ? 'seg' : 'seg on',
qmPressed: qm ? 'true' : 'false', imPressed: qm ? 'false' : 'true',
asQM: () => this.setState({ role: 'qm' }), asIM: () => this.setState({ role: 'im' }),
isQM: qm, isIM: !qm,
isBoard: board, showAll: !board,
boardCls: board ? 'seg on' : 'seg', allCls: board ? 'seg' : 'seg on',
boardPressed: board ? 'true' : 'false', allPressed: board ? 'false' : 'true',
showBoardView: () => this.setState({ view: 'board' }), showAllView: () => this.setState({ view: 'all' }),
subtitle: board ? 'Click a card to see its next step' : 'Every batch, in process and completed',
bq: s.bq, setBq: (e) => this.setState({ bq: e.target.value }),
bChips: [['all', 'All', allRows.length], ['run', 'In process', allRows.filter((r) => r.group === 'run').length], ['hold', 'On hold', allRows.filter((r) => r.group === 'hold').length], ['done', 'Completed', allRows.filter((r) => r.group === 'done').length]].map(([k, l, n]) => ({ label: l, count: n, cls: k === s.bst ? 'chip on' : 'chip', pressed: k === s.bst ? 'true' : 'false', pick: () => this.setState({ bst: k }) })),
bRows: bRows, bEmpty: bRows.length === 0,
cols: cols,
hasToast: !!s.toast, toast: s.toast,
sel: sel || { id: '', product: '', sub: '' },
selKg: sel ? fmt(sel.kg) : '',
pNone: !sel, pSel: !!sel,
panelTitle: sel ? titles[sel.stage] : '',
pWait: !!sel && sel.stage === 'wait',
pReady: !!sel && sel.stage === 'ready',
pStep: !!isStep,
pMetal: !!sel && sel.stage === 'metal' && !sel.flag,
pHold: !!sel && sel.stage === 'metal' && !!sel.flag,
pPack: !!sel && sel.stage === 'packing',
pStored: !!sel && sel.stage === 'stored',
approve: () => patch(sel.id, { stage: 'ready', org: sel.farming === 'Organic' }, 'Approved ' + sel.id + '. It is ready to process.'),
reject: () => patch(sel.id, { stage: 'gone' }, 'Rejected ' + sel.id + '. It cannot be processed.', ''),
readyPicks: ready.map((c) => {
const on = !!s.picks[c.id];
const err = on ? errOf(c) : '';
const left = on && !err ? c.kg - kgOf(c) : 0;
return { id: c.id, product: c.product, kgText: fmt(c.kg), rate: c.rate, on: on, farm: c.org ? 'Organic' : 'Conventional', badge: c.org ? 'badge ok' : 'badge mute', kg: s.kgs[c.id] === undefined ? c.kg : s.kgs[c.id], kgCls: err ? 'kgin err' : 'kgin', note: err || (left > 0 ? fmt(left) + ' kg stays in stock' : 'whole lot'), noteColor: err ? '#A41E14' : '#5C6862', toggle: () => this.setState({ picks: { ...s.picks, [c.id]: !s.picks[c.id] } }), setKg: (e) => this.setState({ kgs: { ...s.kgs, [c.id]: e.target.value } }) };
}),
startWhen: s.startWhen, setStartWhen: (e) => this.setState({ startWhen: e.target.value }),
startNotes: s.startNotes, setStartNotes: (e) => this.setState({ startNotes: e.target.value }),
steps: stepList(stepsFor).map((n, i) => ({ n: i + 1, name: n })),
stepsNote: stepsFor === 'CHM' ? 'Chamomile skips sizing.' : 'Each step stores kg in and out, date, operator and notes.',
pickKg: fmt(pickKg), expected: fmt(expected),
mixMsg: mixErr || chosen.length + (chosen.length === 1 ? ' lot' : ' lots') + ' · ' + prods[0] + ' · ' + (farms[0] ? 'organic' : 'conventional') + '. Ready to start.',
mixBg: mixErr ? (chosen.length === 0 ? '#FFF4E0' : '#FDECEA') : '#EEF6F1', mixFg: mixErr ? (chosen.length === 0 ? '#7A4700' : '#7E1810') : '#14503A',
mixBlocked: !!mixErr,
startBatch: () => {
const first = chosen[0];
const id = 'PB-' + first.pc + '-261022-0' + s.n;
const used = {};
chosen.forEach((c) => { used[c.id] = kgOf(c); });
const nc = { id: id, product: first.product, pc: first.pc, kg: pickKg, stage: 'sieving', sub: chosen.length > 1 ? 'From ' + chosen.length + ' raw lots' : 'From ' + first.id, org: !!first.org, logKey: id, kgIn: pickKg, started: s.startWhen };
const rest = s.cards.map((c) => used[c.id] === undefined ? c : (used[c.id] >= c.kg ? { ...c, stage: 'gone' } : { ...c, kg: c.kg - used[c.id] })).concat([nc]);
const entry = { name: 'Started', text: fmt(pickKg) + ' kg from ' + chosen.map((c) => c.id + ' (' + fmt(kgOf(c)) + ')').join(', ') + (s.startNotes ? ' · note: ' + s.startNotes : ''), when: s.startWhen + ' · ' + who };
this.setState({ cards: rest, sel: id, n: s.n + 1, form: defaults(nc), picks: {}, kgs: {}, startNotes: '', logs: { ...s.logs, [id]: [entry] }, toast: 'Started ' + id + ' with ' + fmt(pickKg) + ' kg. Next: record sieving.' });
},
form: f,
bpName: sel && sel.stage === 'sizing' ? 'Fines' : 'Residue',
stepLower: sel && sel.stage === 'sizing' ? 'sizing' : 'sieving',
setOut: (e) => this.setState({ form: { ...f, out: e.target.value } }),
setWaste: (e) => this.setState({ form: { ...f, waste: e.target.value } }),
setBp: (e) => this.setState({ form: { ...f, bp: e.target.value } }),
setWhen: (e) => this.setState({ form: { ...f, when: e.target.value } }),
setNotes: (e) => this.setState({ form: { ...f, notes: e.target.value } }),
setRejects: (e) => this.setState({ form: { ...f, rejects: e.target.value } }),
setClearWhy: (e) => this.setState({ form: { ...f, clearWhy: e.target.value } }),
balBg: over ? '#FDECEA' : warn ? '#FFF4E0' : '#EEF6F1',
balFg: over ? '#7E1810' : warn ? '#7A4700' : '#14503A',
balTitle: over ? 'More out than in.' : warn ? fmt(gap) + ' kg missing.' : 'Balanced.',
balText: over ? 'Check the weights.' : warn ? 'Add a note or re-weigh.' : 'Every kilo is accounted for.',
stepBlocked: over,
saveStep: () => {
const out = Number(f.out) || 0;
const nm = sel.stage === 'sieving' ? 'Sieving' : 'Sizing';
const entry = { name: nm, text: fmt(sel.kg) + ' → ' + fmt(out) + ' kg · waste ' + fmt(Number(f.waste) || 0) + ' · ' + (sel.stage === 'sieving' ? 'residue ' : 'fines ') + fmt(Number(f.bp) || 0) + (f.notes ? ' · note: ' + f.notes : ''), when: f.when + ' · ' + who, snap: { stage: sel.stage, kg: sel.kg } };
const nextStage = after(sel);
this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, stage: nextStage, kg: out } : c), logs: withLog(entry), form: defaults({ kg: out }), toast: nm + ' saved. ' + fmt(out) + ' kg moved on to ' + (nextStage === 'sizing' ? 'sizing' : 'the metal detector') + '.' });
},
pass: () => {
const rj = Number(f.rejects) || 0;
const out = sel.kg - rj;
const entry = { name: 'Metal detector', text: fmt(sel.kg) + ' → ' + fmt(out) + ' kg · ' + fmt(rj) + ' kg rejects · Passed' + (f.notes ? ' · note: ' + f.notes : ''), when: f.when + ' · ' + who, snap: { stage: 'metal', kg: sel.kg } };
this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, stage: 'packing', kg: out } : c), logs: withLog(entry), form: defaults({ kg: out }), toast: 'Metal detector passed. ' + fmt(out) + ' kg moved to packing.' });
},
fail: () => {
const rj = Number(f.rejects) || 0;
const entry = { name: 'Metal detector', text: fmt(sel.kg) + ' kg · ' + fmt(rj) + ' kg rejects · Failed', when: f.when + ' · ' + who, snap: { stage: 'metal', kg: sel.kg, rejects: 0, noFlag: true } };
this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, flag: 'On hold', rejects: rj } : c), logs: withLog(entry), toast: 'Batch put on hold. The quality manager has been notified.' });
},
holdText: sel ? fmt(sel.kg) + ' kg is blocked. ' + (sel.rejects ? fmt(sel.rejects) + ' kg rejects found. ' : '') + 'Packing can’t start until the quality manager clears it.' : '',
noClearWhy: !String(f.clearWhy || '').trim(),
clear: () => {
const rj = sel.rejects || 0;
const out = sel.kg - rj;
const entry = { name: 'Metal detector', text: 'Failed check cleared by the quality manager · ' + fmt(sel.kg) + ' → ' + fmt(out) + ' kg · reason: ' + f.clearWhy, when: '22 Oct, 16:05 · QM', snap: { stage: 'metal', kg: sel.kg, rejects: rj, hold: true } };
this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, stage: 'packing', flag: '', kg: out, rejects: 0 } : c), logs: withLog(entry), form: defaults({ kg: out }), toast: 'Check cleared by the quality manager. ' + fmt(out) + ' kg moved to packing.' });
},
rejectBatch: () => this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, stage: 'gone' } : c), sel: '', toast: sel.id + ' rejected: ' + f.clearWhy + ' Logged in the audit log.' }),
packTypes: packDefs.map((p) => ({ label: p[1], cls: p[0] === s.packType ? 'pkt on' : 'pkt', pressed: p[0] === s.packType ? 'true' : 'false', pick: () => this.setState({ packType: p[0], bagFixed: false }) })),
fgPlan: fgPlan, fgFirst: base,
splitLabel: s.split ? 'Keep as 1 lot' : 'Split into 2 lots',
toggleSplit: () => this.setState({ split: !s.split, bagFixed: false }),
leftoverText: leftover > 0 ? fmt(leftover) + ' kg · kept for the next batch' : 'Nothing',
unitOne: unitOne, rangeText: rangeText,
bagGrid: bagGrid, bagCount: bagCount, bagsBad: bagsBad, bagsOk: !bagsBad && bagCount > 0,
bagMsg: 'Bag 18 is ' + (lowSize - 0.06).toFixed(2) + ' kg. Top it up and weigh again.',
fixBag: () => this.setState({ bagFixed: true, toast: 'Bag 18 topped up and re-weighed: ' + lowSize.toFixed(2) + ' kg.' }),
packBlocked: bagsBad || bagCount === 0,
labelFarm: sel && sel.org ? 'Organic' : 'Conventional',
labelNet: s.split ? plan.map((p) => p.size + ' kg').join(' / ') : pk[0] + ' kg',
store: sel && sel.org ? 'Rack 05 · organic' : 'Rack 04 · conventional',
pack: () => {
const extra = plan.slice(1).map((p) => ({ id: p.id, product: sel.product, pc: sel.pc, kg: p.kg, stage: 'stored', sub: p.pack + ' · in storage', org: sel.org }));
const entry = { name: 'Packing', text: bagCount + ' labels printed · ' + plan.map((p) => p.id).join(', '), when: f.when + ' · ' + who };
const done = s.doneBatches.concat([{ id: sel.logKey, product: sel.product, farming: sel.org ? 'Organic' : 'Conventional', started: sel.started || '22 Oct', kgIn: sel.kgIn || kg, kgOut: lot1 + lot2, lots: plan.map((p) => p.id).join(', ') }]);
this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, id: base, kg: lot1, stage: 'stored', sub: plan[0].pack + ' · in storage' } : c).concat(extra), sel: base, logs: withLog(entry), doneBatches: done, toast: bagCount + ' labels printed. ' + plan.map((p) => p.id).join(' and ') + ' in storage.' + (leftover > 0 ? ' ' + fmt(leftover) + ' kg left over.' : '') });
},
showLog: !!sel && entries.length > 0 && ['sieving', 'sizing', 'metal', 'packing'].indexOf(sel.stage) !== -1,
logRows: entries.map((e) => ({ name: e.name, text: e.text, when: e.when })),
canUndo: !!sel && entries.length > 0 && !!entries[entries.length - 1].snap && ['sieving', 'sizing', 'metal', 'packing'].indexOf(sel.stage) !== -1,
undo: () => {
const last = entries[entries.length - 1];
const sn = last.snap;
const restore = sn.noFlag ? { flag: '', rejects: 0 } : sn.hold ? { stage: sn.stage, kg: sn.kg, flag: 'On hold', rejects: sn.rejects } : { stage: sn.stage, kg: sn.kg, flag: '', rejects: 0 };
this.setState({ cards: s.cards.map((c) => c.id === sel.id ? { ...c, ...restore } : c), logs: { ...s.logs, [key]: entries.slice(0, -1) }, form: defaults({ kg: sn.kg, rejects: sn.rejects }), toast: last.name + ' removed. Record it again.' });
},
histLink: !sel ? 'Lot.dc.html' : sel.id.indexOf('RM-') === 0 ? 'Lot.dc.html' : sel.id.indexOf('FG-') === 0 ? 'LotFinished.dc.html' : sel.id === 'PB-HIB-261021-01' ? 'LotHold.dc.html' : 'LotRun.dc.html'
};
}
}

export default class ProductionPage extends Component {
  template(v) {
    return (<><style>{STYLE}</style>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "minHeight": "900px", "background": "#F6F7F5"}}>{" "}<nav aria-label={"Main"} style={{"flex": "1 1 240px", "maxWidth": "280px", "background": "#FFFFFF", "borderRight": "1px solid #E3E6E1", "padding": "20px 14px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "4px"}}>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "4px 8px 16px"}}>{" "}<div style={{"width": "36px", "height": "36px", "borderRadius": "9px", "background": "#1F6B4F", "color": "#FFFFFF", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontWeight": "600", "fontSize": "16px"}}>{"M"}</div>{" "}<div style={{"fontWeight": "600", "fontSize": "16px"}}>{"Mawasem"}</div>{" "}</div>{" "}<div style={{"padding": "0 0 14px"}}><label htmlFor={"scan"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Search by product code"}</label><div style={{"display": "flex", "alignItems": "center", "gap": "10px", "minHeight": "50px", "padding": "0 12px", "border": "1px solid #CBD2CC", "borderRadius": "10px", "background": "#F6F7F5"}}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"#3C4742"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"} style={{"flex": "none"}}><circle cx={"11"} cy={"11"} r={"6"}></circle><path d={"M20 20l-4.2-4.2"}></path></svg><input id={"scan"} type={"search"} value={v.scanQ} onChange={v.setScan} placeholder={"Product code (HIB, MNT\u2026)"} style={{"flex": "1", "minWidth": "0", "border": "0", "outline": "none", "background": "transparent", "font": "inherit", "fontSize": "14px", "minHeight": "48px", "color": "#1B2420"}} /></div>{(v.scanHit) ? (<><div style={{"marginTop": "8px", "border": "1px solid #D5E5DA", "background": "#F4F8F5", "borderRadius": "10px", "padding": "8px 10px"}}><div style={{"fontSize": "12px", "fontWeight": "600", "color": "#14503A", "marginBottom": "4px"}}>{dcTxt(v.scanHead)}</div>{(v.scanResults || []).map((r, $index) => (<React.Fragment key={$index}><a href={dcHref(r?.link)} style={{"display": "block", "padding": "5px 0", "textDecoration": "none", "color": "#1B2420", "fontSize": "12.5px"}}><span style={{"fontFamily": "'IBM Plex Mono', monospace"}}>{dcTxt(r?.code)}</span>{" "}<span style={{"color": "#5C6862"}}>{"\u00b7 "}{dcTxt(r?.kind)}</span></a></React.Fragment>))}{(v.scanHasMore) ? (<><div style={{"fontSize": "12px", "color": "#5C6862", "paddingTop": "4px"}}>{dcTxt(v.scanMore)}</div></>) : null}</div></>) : null}{(v.scanMiss) ? (<><div role={"status"} style={{"marginTop": "8px", "padding": "10px 12px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "13px"}}>{"No product with that code. Try MNT, HIB or CHM"}</div></>) : null}</div>{" "}<a className={"nv"} href={dcHref(v.homeLink)}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"}></path></svg>{"Home"}</a>{" "}<a className={"nv"} href={dcHref("Receive.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M12 3v12M7 10l5 5 5-5M4 20h16"}></path></svg>{"Receive"}</a>{" "}<a className={"nv on"} href={dcHref("Production.dc.html")} aria-current={"page"}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><rect x={"3"} y={"4"} width={"5"} height={"16"} rx={"1"}></rect><rect x={"10"} y={"4"} width={"5"} height={"10"} rx={"1"}></rect><rect x={"17"} y={"4"} width={"4"} height={"13"} rx={"1"}></rect></svg>{"Production"}</a>{" "}<a className={"nv"} href={dcHref("Stock.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 7l9-4 9 4v10l-9 4-9-4z"}></path><path d={"M3 7l9 4 9-4M12 11v10"}></path></svg>{"Stock"}</a>{" "}<a className={"nv"} href={dcHref("Shipments.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 6h11v10H3zM14 10h4l3 3v3h-7"}></path><circle cx={"7"} cy={"18"} r={"2"}></circle><circle cx={"17"} cy={"18"} r={"2"}></circle></svg>{"Shipments"}</a>{" "}<a className={"nv"} href={dcHref("Trace.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}><circle cx={"6"} cy={"6"} r={"2.5"}></circle><circle cx={"18"} cy={"12"} r={"2.5"}></circle><circle cx={"6"} cy={"18"} r={"2.5"}></circle><path d={"M8.5 7l7 4M8.5 17l7-4"}></path></svg>{"Trace"}</a>{" "}{(v.isQM) ? (<><a className={"nv"} href={dcHref("Reports.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"}><path d={"M5 20V11M11 20V5M17 20v-7M3 20h18"}></path></svg>{"Reports"}</a><a className={"nv"} href={dcHref("MasterData.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><ellipse cx={"12"} cy={"6"} rx={"8"} ry={"3"}></ellipse><path d={"M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"}></path></svg>{"Master data"}</a></>) : null}{" "}<div style={{"flexGrow": "1", "minHeight": "24px"}}></div>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "14px 8px 4px", "borderTop": "1px solid #E3E6E1"}}>{" "}<div style={{"width": "34px", "height": "34px", "borderRadius": "999px", "background": "#E6F0EA", "color": "#14503A", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600"}}>{dcTxt(v.roleInitials)}</div>{" "}<div style={{"fontSize": "14px", "fontWeight": "500"}}>{dcTxt(v.roleName)}</div>{" "}</div>{" "}</nav>{" "}<main style={{"flex": "999 1 640px", "minWidth": "0", "padding": "28px 28px 40px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "18px"}}>{" "}<header style={{"display": "flex", "flexWrap": "wrap", "gap": "14px", "alignItems": "flex-end", "justifyContent": "space-between"}}>{" "}<div>{" "}<h1 style={{"margin": "0", "fontSize": "28px", "fontWeight": "600"}}>{"Production"}</h1>{" "}<div style={{"fontSize": "14px", "color": "#5C6862", "marginTop": "4px"}}>{dcTxt(v.subtitle)}</div>{" "}</div>{" "}<div style={{"display": "flex", "gap": "10px", "flexWrap": "wrap", "alignItems": "center"}}>{" "}<div role={"group"} aria-label={"Show"} style={{"display": "inline-flex", "padding": "3px", "background": "#EEF0ED", "borderRadius": "10px", "gap": "2px"}}>{" "}<button type={"button"} className={v.boardCls} aria-pressed={v.boardPressed} onClick={v.showBoardView}>{"Board"}</button>{" "}<button type={"button"} className={v.allCls} aria-pressed={v.allPressed} onClick={v.showAllView}>{"All batches"}</button>{" "}</div>{" "}<span style={{"fontSize": "13px", "color": "#5C6862"}}>{"View as"}</span>{" "}<div role={"group"} aria-label={"View as"} style={{"display": "inline-flex", "padding": "3px", "background": "#EEF0ED", "borderRadius": "10px", "gap": "2px"}}>{" "}<button type={"button"} className={v.qmCls} aria-pressed={v.qmPressed} onClick={v.asQM}>{"Quality manager"}</button>{" "}<button type={"button"} className={v.imCls} aria-pressed={v.imPressed} onClick={v.asIM}>{"Inventory manager"}</button>{" "}</div>{" "}<a className={"btn pri"} href={dcHref("Receive.dc.html")}>{"Receive delivery"}</a>{" "}</div>{" "}</header>{" "}{(v.hasToast) ? (<>{" "}<div role={"status"} style={{"padding": "12px 16px", "borderRadius": "10px", "background": "#1B2420", "color": "#FFFFFF", "fontSize": "14px"}}>{dcTxt(v.toast)}</div>{" "}</>) : null}{" "}{(v.isBoard) ? (<>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "gap": "18px", "alignItems": "flex-start"}}>{" "}<section aria-label={"Production stages"} style={{"flex": "1 1 640px", "minWidth": "0", "overflowX": "auto", "paddingBottom": "6px"}}>{" "}<div style={{"display": "flex", "gap": "10px", "minWidth": "min-content"}}>{" "}{(v.cols || []).map((c, $index) => (<React.Fragment key={$index}>{" "}<div className={"col"}>{" "}<div className={"colh"}><span style={{"fontSize": "13px", "fontWeight": "600"}}>{dcTxt(c?.label)}</span><span style={{"fontSize": "12px", "color": "#5C6862"}}>{dcTxt(c?.count)}</span></div>{" "}<span style={{"fontSize": "12px", "color": "#5C6862", "margin": "-6px 2px 2px"}}>{dcTxt(c?.kg)}{" kg"}</span>{" "}{(c?.cards || []).map((k, $index) => (<React.Fragment key={$index}>{" "}<button type={"button"} className={k?.cls} onClick={k?.pick} aria-pressed={k?.pressed}>{" "}<span className={"mono"} style={{"fontSize": "12px", "fontWeight": "500"}}>{dcTxt(k?.id)}</span>{" "}<span style={{"fontSize": "14px", "fontWeight": "600"}}>{dcTxt(k?.product)}{" \u00b7 "}{dcTxt(k?.kgText)}{" kg"}</span>{" "}<span style={{"fontSize": "12px", "color": "#5C6862"}}>{dcTxt(k?.sub)}</span>{" "}{(k?.flag) ? (<><span className={"badge bad"} style={{"alignSelf": "flex-start"}}>{dcTxt(k?.flag)}</span></>) : null}{" "}<span className={"nxt"}>{dcTxt(k?.next)}</span>{" "}</button>{" "}</React.Fragment>))}{" "}{(c?.empty) ? (<><div style={{"fontSize": "12px", "color": "#5C6862", "padding": "8px 2px"}}>{"Nothing here"}</div></>) : null}{" "}</div>{" "}</React.Fragment>))}{" "}</div>{" "}</section>{" "}<aside aria-label={"Next step"} style={{"flex": "0 1 400px", "minWidth": "300px", "background": "#FFFFFF", "border": "1px solid #E3E6E1", "borderRadius": "14px", "padding": "22px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "14px"}}>{" "}{(v.pNone) ? (<>{" "}<div style={{"padding": "30px 6px", "textAlign": "center"}}><div style={{"fontSize": "17px", "fontWeight": "600"}}>{"Pick a card"}</div><div style={{"fontSize": "14px", "color": "#5C6862", "marginTop": "6px", "lineHeight": "1.5"}}>{"Every card shows its next step in green. Click one to do it here."}</div></div>{" "}</>) : null}{" "}{(v.pSel) ? (<>{" "}<div>{" "}<div className={"mono"} style={{"fontSize": "13px", "color": "#5C6862"}}>{dcTxt(v.sel?.id)}</div>{" "}<h2 style={{"margin": "4px 0 2px", "fontSize": "22px", "fontWeight": "600"}}>{dcTxt(v.panelTitle)}</h2>{" "}<div style={{"fontSize": "14px", "color": "#3C4742"}}>{dcTxt(v.sel?.product)}{" \u00b7 "}{dcTxt(v.selKg)}{" kg \u00b7 "}{dcTxt(v.sel?.sub)}</div>{" "}</div>{" "}</>) : null}{" "}{(v.pWait) ? (<>{" "}<div><div className={"kv"}><span>{"Moisture"}</span><span>{dcTxt(v.sel?.moist)}</span></div><div className={"kv"}><span>{"Agreed yield"}</span><span>{dcTxt(v.sel?.rate)}{"%"}</span></div><div className={"kv"}><span>{"Farming"}</span><span>{dcTxt(v.sel?.farming)}</span></div></div>{" "}{(v.isQM) ? (<>{" "}<button className={"btn pri full"} type={"button"} onClick={v.approve}>{"Approve lot"}</button>{" "}<button className={"btn neg"} type={"button"} onClick={v.reject}>{"Reject"}</button>{" "}</>) : null}{" "}{(v.isIM) ? (<><div style={{"padding": "12px 14px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "14px"}}>{"Waiting for the quality manager to approve. You can't start a batch with it yet."}</div></>) : null}{" "}</>) : null}{" "}{(v.pReady) ? (<>{" "}<div style={{"fontSize": "14px", "fontWeight": "600"}}>{"Lots in this batch"}</div>{" "}<div style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>{" "}{(v.readyPicks || []).map((r, $index) => (<React.Fragment key={$index}>{" "}<div style={{"display": "flex", "flexDirection": "column", "gap": "6px"}}>{" "}<label className={"pick"}><input type={"checkbox"} checked={r?.on} onChange={r?.toggle} /><span style={{"flex": "1"}}><span className={"mono"} style={{"fontSize": "12px"}}>{dcTxt(r?.id)}</span><br />{dcTxt(r?.product)}{" \u00b7 "}{dcTxt(r?.kgText)}{" kg available \u00b7 agreed "}{dcTxt(r?.rate)}{"%"}</span><span className={r?.badge}>{dcTxt(r?.farm)}</span></label>{" "}{(r?.on) ? (<>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "paddingLeft": "8px", "flexWrap": "wrap"}}>{" "}<input className={r?.kgCls} type={"number"} value={r?.kg} onChange={r?.setKg} aria-label={"kg to use from " + dcStr(r?.id) + ""} />{" "}<span style={{"fontSize": "13px"}}>{"kg to use"}</span>{" "}<span style={dcCss("font-size: 12px; font-weight: 500; color: " + dcStr(r?.noteColor))}>{dcTxt(r?.note)}</span>{" "}</div>{" "}</>) : null}{" "}</div>{" "}</React.Fragment>))}{" "}</div>{" "}<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "10px"}}>{" "}<div className={"fl"}><label htmlFor={"sw"}>{"Start"}</label><input id={"sw"} className={"sm"} type={"text"} value={v.startWhen} onChange={v.setStartWhen} /></div>{" "}<div className={"fl"}><label htmlFor={"so"}>{"Operator"}</label><input id={"so"} className={"sm"} type={"text"} value={v.roleName} readOnly={true} /></div>{" "}</div>{" "}<div>{" "}<div className={"sub"} style={{"marginTop": "0"}}>{"This batch will go through"}</div>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "gap": "6px", "marginTop": "6px"}}>{(v.steps || []).map((t, $index) => (<React.Fragment key={$index}><span className={"stp"}>{dcTxt(t?.n)}{" \u00b7 "}{dcTxt(t?.name)}</span></React.Fragment>))}</div>{" "}<div style={{"fontSize": "12px", "color": "#5C6862", "marginTop": "4px"}}>{dcTxt(v.stepsNote)}</div>{" "}</div>{" "}<div><div className={"kv"}><span>{"Total kg into batch"}</span><span style={{"fontWeight": "600", "color": "#1B2420"}}>{dcTxt(v.pickKg)}{" kg"}</span></div><div className={"kv"}><span>{"Expected finished (agreed yield)"}</span><span>{dcTxt(v.expected)}{" kg"}</span></div></div>{" "}<div className={"fl"}><label htmlFor={"sn"}>{"Notes"}</label><textarea id={"sn"} rows={"2"} placeholder={"Anything to note about this batch?"} value={v.startNotes} onChange={v.setStartNotes}></textarea></div>{" "}<div style={dcCss("padding: 12px 14px; border-radius: 10px; font-size: 14px; background: " + dcStr(v.mixBg) + "; color: " + dcStr(v.mixFg))}>{dcTxt(v.mixMsg)}</div>{" "}<button className={"btn pri full"} type={"button"} onClick={v.startBatch} disabled={v.mixBlocked}>{"Start batch \u00b7 "}{dcTxt(v.pickKg)}{" kg"}</button>{" "}</>) : null}{" "}{(v.pStep) ? (<>{" "}<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "12px"}}>{" "}<div className={"fl"} style={{"gridColumn": "1 / -1"}}><label htmlFor={"o"}>{"Output kg"}</label><input id={"o"} type={"number"} value={v.form?.out} onChange={v.setOut} /></div>{" "}<div className={"fl"}><label htmlFor={"w"}>{"Waste kg"}</label><input id={"w"} type={"number"} value={v.form?.waste} onChange={v.setWaste} /></div>{" "}<div className={"fl"}><label htmlFor={"b"}>{dcTxt(v.bpName)}{" kg"}</label><input id={"b"} type={"number"} value={v.form?.bp} onChange={v.setBp} /></div>{" "}<div className={"fl"}><label htmlFor={"d"}>{"Date and time"}</label><input id={"d"} className={"sm"} type={"text"} value={v.form?.when} onChange={v.setWhen} /></div>{" "}<div className={"fl"}><label htmlFor={"op"}>{"Operator"}</label><input id={"op"} className={"sm"} type={"text"} value={v.roleName} readOnly={true} /></div>{" "}<div className={"fl"} style={{"gridColumn": "1 / -1"}}><label htmlFor={"nt"}>{"Notes"}</label><textarea id={"nt"} rows={"2"} placeholder={"Anything unusual?"} value={v.form?.notes} onChange={v.setNotes}></textarea></div>{" "}</div>{" "}<div style={dcCss("padding: 12px 14px; border-radius: 10px; font-size: 14px; background: " + dcStr(v.balBg) + "; color: " + dcStr(v.balFg))}><strong>{dcTxt(v.balTitle)}</strong>{" "}{dcTxt(v.balText)}</div>{" "}<button className={"btn pri full"} type={"button"} onClick={v.saveStep} disabled={v.stepBlocked}>{"Save "}{dcTxt(v.stepLower)}</button>{" "}</>) : null}{" "}{(v.pMetal) ? (<>{" "}<div style={{"fontSize": "14px", "color": "#3C4742", "lineHeight": "1.5"}}>{"Run all "}{dcTxt(v.selKg)}{" kg through the metal detector with the test pieces, then record the result."}</div>{" "}<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "12px"}}>{" "}<div className={"fl"}><label htmlFor={"rj"}>{"Rejects kg"}</label><input id={"rj"} type={"number"} value={v.form?.rejects} onChange={v.setRejects} /></div>{" "}<div className={"fl"}><label htmlFor={"d2"}>{"Date and time"}</label><input id={"d2"} className={"sm"} type={"text"} value={v.form?.when} onChange={v.setWhen} /></div>{" "}<div className={"fl"} style={{"gridColumn": "1 / -1"}}><label htmlFor={"nt2"}>{"Notes"}</label><textarea id={"nt2"} rows={"2"} placeholder={"Test pieces used, anything unusual"} value={v.form?.notes} onChange={v.setNotes}></textarea></div>{" "}</div>{" "}<button className={"btn pri full"} type={"button"} onClick={v.pass}>{"Passed \u00b7 next: packing"}</button>{" "}<button className={"btn neg"} type={"button"} onClick={v.fail}>{"Failed \u00b7 put on hold"}</button>{" "}</>) : null}{" "}{(v.pHold) ? (<>{" "}<div style={{"padding": "12px 14px", "borderRadius": "10px", "background": "#FDECEA", "color": "#7E1810", "fontSize": "14px", "lineHeight": "1.5"}}><strong>{"On hold."}</strong>{" "}{dcTxt(v.holdText)}</div>{" "}{(v.isQM) ? (<>{" "}<div className={"fl"}><label htmlFor={"rs"}>{"Reason (required)"}</label><textarea id={"rs"} rows={"2"} value={v.form?.clearWhy} onChange={v.setClearWhy} placeholder={"What was found and how it was re-tested"}></textarea></div>{" "}<button className={"btn pri full"} type={"button"} onClick={v.clear} disabled={v.noClearWhy}>{"Clear check \u00b7 next: packing"}</button>{" "}<button className={"btn neg"} type={"button"} onClick={v.rejectBatch} disabled={v.noClearWhy}>{"Reject batch"}</button>{" "}</>) : null}{" "}{(v.isIM) ? (<><div style={{"fontSize": "14px", "color": "#3C4742"}}>{"The quality manager has been notified. Only they can clear or reject it."}</div></>) : null}{" "}</>) : null}{" "}{(v.pPack) ? (<>{" "}<div>{" "}<div className={"sub"} style={{"marginTop": "0"}}>{"Packaging"}</div>{" "}<div role={"group"} aria-label={"Packaging type"} style={{"display": "flex", "gap": "6px", "flexWrap": "wrap", "marginTop": "6px"}}>{(v.packTypes || []).map((p, $index) => (<React.Fragment key={$index}><button type={"button"} className={p?.cls} aria-pressed={p?.pressed} onClick={p?.pick}>{dcTxt(p?.label)}</button></React.Fragment>))}</div>{" "}</div>{" "}<div>{" "}<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "8px"}}><span style={{"fontSize": "14px", "fontWeight": "600"}}>{"Finished lots"}</span><button className={"btn sm"} type={"button"} onClick={v.toggleSplit}>{dcTxt(v.splitLabel)}</button></div>{" "}{(v.fgPlan || []).map((f, $index) => (<React.Fragment key={$index}><div className={"kv"}><span><span className={"mono"} style={{"fontSize": "12px", "color": "#1B2420"}}>{dcTxt(f?.id)}</span><br />{dcTxt(f?.pack)}</span><span style={{"textAlign": "right", "color": "#1B2420"}}>{dcTxt(f?.kgText)}{" kg"}<br /><span style={{"color": "#5C6862"}}>{dcTxt(f?.bags)}{" "}{dcTxt(f?.unit)}</span></span></div></React.Fragment>))}{" "}<div className={"kv"}><span>{"Left over"}</span><span>{dcTxt(v.leftoverText)}</span></div>{" "}</div>{" "}<div>{" "}<div className={"sub"} style={{"marginTop": "0"}}>{"Weight of every "}{dcTxt(v.unitOne)}{" \u00b7 allowed "}{dcTxt(v.rangeText)}</div>{" "}<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(62px, 1fr))", "gap": "6px", "marginTop": "8px", "maxHeight": "210px", "overflowY": "auto"}}>{" "}{(v.bagGrid || []).map((b, $index) => (<React.Fragment key={$index}><div style={dcCss("border: 1px solid " + dcStr(b?.border) + "; border-radius: 8px; padding: 5px 7px; background: " + dcStr(b?.bg))}><div style={dcCss("font-size: 10px; color: " + dcStr(b?.labelColor))}>{dcTxt(b?.n)}</div><div style={{"fontSize": "12.5px", "fontWeight": "600", "fontVariantNumeric": "tabular-nums"}}>{dcTxt(b?.w)}</div></div></React.Fragment>))}{" "}</div>{" "}{(v.bagsOk) ? (<><div style={{"fontSize": "14px", "color": "#14503A", "marginTop": "8px"}}>{"All "}{dcTxt(v.bagCount)}{" in range \u2713"}</div></>) : null}{" "}{(v.bagsBad) ? (<><div role={"alert"} style={{"display": "flex", "gap": "10px", "alignItems": "center", "justifyContent": "space-between", "marginTop": "8px", "padding": "10px 12px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "14px"}}><span>{dcTxt(v.bagMsg)}</span><button className={"btn sm"} type={"button"} onClick={v.fixBag}>{"Re-weigh"}</button></div></>) : null}{" "}</div>{" "}<div style={{"display": "flex", "gap": "14px", "alignItems": "center", "padding": "12px", "border": "1px solid #CBD2CC", "borderRadius": "10px"}}>{" "}<svg width={"58"} height={"58"} viewBox={"0 0 21 21"} role={"img"} aria-label={"QR code on the label"} shape-rendering={"crispEdges"} style={{"flex": "none"}}><rect width={"21"} height={"21"} fill={"#FFFFFF"}></rect><g fill={"#1B2420"}><path d={"M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2z"} fill-rule={"evenodd"}></path><path d={"M14 0h7v7h-7zM15 1v5h5V1zM16 2h3v3h-3z"} fill-rule={"evenodd"}></path><path d={"M0 14h7v7H0zM1 15v5h5v-5zM2 16h3v3H2z"} fill-rule={"evenodd"}></path><rect x={"9"} y={"2"} width={"2"} height={"2"}></rect><rect x={"8"} y={"8"} width={"3"} height={"1"}></rect><rect x={"12"} y={"10"} width={"2"} height={"3"}></rect><rect x={"15"} y={"9"} width={"3"} height={"2"}></rect><rect x={"9"} y={"14"} width={"2"} height={"3"}></rect><rect x={"14"} y={"15"} width={"3"} height={"2"}></rect><rect x={"18"} y={"18"} width={"2"} height={"2"}></rect></g></svg>{" "}<div style={{"fontSize": "13px", "lineHeight": "1.5"}}><div style={{"fontSize": "11px", "color": "#5C6862", "textTransform": "uppercase", "letterSpacing": ".05em"}}>{"Label preview"}</div><div style={{"fontWeight": "600"}}>{dcTxt(v.sel?.product)}{" \u00b7 "}{dcTxt(v.labelFarm)}</div><div className={"mono"}>{dcTxt(v.fgFirst)}</div><div>{"Net "}{dcTxt(v.labelNet)}{" \u00b7 v3"}</div></div>{" "}</div>{" "}<div className={"kv"}><span>{"Store in"}</span><span>{dcTxt(v.store)}</span></div>{" "}<button className={"btn pri full"} type={"button"} onClick={v.pack} disabled={v.packBlocked}>{"Print "}{dcTxt(v.bagCount)}{" labels and store"}</button>{" "}</>) : null}{" "}{(v.pStored) ? (<>{" "}<div style={{"fontSize": "14px", "color": "#3C4742", "lineHeight": "1.5"}}>{"Finished and in storage. Ready to add to a shipment."}</div>{" "}<a className={"btn pri full"} href={dcHref("LotFinished.dc.html")}>{"Open lot page"}</a>{" "}<a className={"btn"} href={dcHref("Shipments.dc.html")}>{"Add to shipment"}</a>{" "}</>) : null}{" "}{(v.showLog) ? (<>{" "}<div style={{"borderTop": "1px solid #EEF0ED", "paddingTop": "12px"}}>{" "}<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "8px"}}><span style={{"fontSize": "14px", "fontWeight": "600"}}>{"Recorded so far"}</span>{(v.canUndo) ? (<><button className={"btn sm"} type={"button"} onClick={v.undo}>{"Undo last step"}</button></>) : null}</div>{" "}{(v.logRows || []).map((x, $index) => (<React.Fragment key={$index}><div style={{"padding": "8px 0", "borderTop": "1px solid #EEF0ED", "fontSize": "13px", "lineHeight": "1.45", "marginTop": "6px"}}><strong>{dcTxt(x?.name)}</strong>{" \u00b7 "}{dcTxt(x?.text)}<div style={{"fontSize": "12px", "color": "#5C6862"}}>{dcTxt(x?.when)}</div></div></React.Fragment>))}{" "}</div>{" "}</>) : null}{" "}{(v.pSel) ? (<>{" "}<a href={dcHref(v.histLink)} style={{"fontSize": "14px", "textAlign": "center"}}>{"See full history and trace"}</a>{" "}</>) : null}{" "}</aside>{" "}</div>{" "}</>) : null}{" "}{(v.showAll) ? (<>{" "}<section aria-label={"All batches"} style={{"background": "#FFFFFF", "border": "1px solid #E3E6E1", "borderRadius": "14px", "minWidth": "0"}}>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "gap": "12px", "alignItems": "center", "padding": "16px 20px"}}>{" "}<div style={{"flex": "1 1 240px", "maxWidth": "320px"}}><label htmlFor={"bq"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Search batches"}</label><input id={"bq"} className={"bsearch"} type={"search"} value={v.bq} onChange={v.setBq} placeholder={"Search batch, product or lot"} /></div>{" "}<div role={"group"} aria-label={"Status"} style={{"display": "flex", "gap": "6px", "flexWrap": "wrap"}}>{(v.bChips || []).map((f, $index) => (<React.Fragment key={$index}><button type={"button"} className={f?.cls} aria-pressed={f?.pressed} onClick={f?.pick}>{dcTxt(f?.label)}{" "}<span style={{"opacity": "0.75", "marginLeft": "4px"}}>{dcTxt(f?.count)}</span></button></React.Fragment>))}</div>{" "}</div>{" "}<div style={{"overflowX": "auto", "borderTop": "1px solid #E3E6E1"}}>{" "}<div style={{"minWidth": "1060px"}}>{" "}<div className={"brow"} style={{"background": "#FAFBFA", "minHeight": "40px", "fontSize": "12px", "fontWeight": "500", "color": "#5C6862"}}><span className={"bc bw2"}>{"Batch"}</span><span className={"bc"}>{"Started"}</span><span className={"bc"}>{"Stage"}</span><span className={"bc br"}>{"kg in"}</span><span className={"bc bw2 br"}>{"Finished kg \u00b7 yield"}</span><span className={"bc bw2"}>{"Waste \u00b7 by-products \u00b7 unexplained"}</span><span className={"bc"}>{"Status"}</span><span className={"bc bw2"}>{"Open"}</span></div>{" "}{(v.bRows || []).map((b, $index) => (<React.Fragment key={$index}>{" "}<div className={"brow"}>{" "}<span className={"bc bw2"}><span className={"mono"} style={{"fontWeight": "500"}}>{dcTxt(b?.id)}</span><div style={{"fontSize": "12px", "color": "#5C6862"}}>{dcTxt(b?.product)}{" \u00b7 "}{dcTxt(b?.farming)}</div></span>{" "}<span className={"bc"}>{dcTxt(b?.started)}</span>{" "}<span className={"bc"}>{dcTxt(b?.stage)}</span>{" "}<span className={"bc br"}>{dcTxt(b?.kgIn)}</span>{" "}<span className={"bc bw2 br"}>{dcTxt(b?.result)}</span>{" "}<span className={"bc bw2"} style={{"fontSize": "13px"}}>{dcTxt(b?.loss)}</span>{" "}<span className={"bc"}><span className={b?.badge}>{dcTxt(b?.status)}</span></span>{" "}<span className={"bc bw2"}>{(b?.isLive) ? (<><button className={"btn sm"} type={"button"} onClick={b?.open}>{"Open on board"}</button></>) : null}{(b?.isDone) ? (<><a className={"btn sm"} href={dcHref(b?.link)}>{"Open batch"}</a><div style={{"fontSize": "12px", "color": "#5C6862", "marginTop": "2px"}}>{dcTxt(b?.lots)}</div></>) : null}</span>{" "}</div>{" "}</React.Fragment>))}{" "}{(v.bEmpty) ? (<><div style={{"padding": "32px 20px", "textAlign": "center", "color": "#5C6862", "borderTop": "1px solid #EEF0ED"}}>{"No batches match. Try another filter."}</div></>) : null}{" "}</div>{" "}</div>{" "}</section>{" "}</>) : null}{" "}</main>{" "}</div>{" "}</>);
  }
}
