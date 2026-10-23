// @ts-nocheck
// Generated from v2/MasterData.dc.html (Factory Traceability UI · Simplified v2). Design unchanged.
import React from 'react';
import { DCLogic, dcCss, dcHref, dcStr, dcTxt, dcNoop } from '../lib/dc';

export const title = "Master data";

const STYLE = "\nbody{margin:0;font-family:'IBM Plex Sans',system-ui,sans-serif;color:#1B2420;background:#F6F7F5}\na{color:#1F6B4F}a:hover{color:#14503A}\n.nv{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 14px;border-radius:10px;color:#3C4742;text-decoration:none;font-size:15px;font-weight:500}\n.nv:hover{background:#F1F3F0;color:#1B2420}\n.card{background:#FFFFFF;border:1px solid #E3E6E1;border-radius:14px}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:10px;border:1px solid #CBD2CC;background:#FFFFFF;color:#1B2420;font:inherit;font-size:15px;font-weight:500;text-decoration:none;cursor:pointer;box-sizing:border-box;white-space:nowrap}\n.btn:hover{background:#F1F3F0;color:#1B2420}\n.btn.pri{background:#1F6B4F;border-color:#1F6B4F;color:#FFFFFF;font-weight:600}\n.btn.pri:hover{background:#14503A;color:#FFFFFF}\n.mono{font-family:'IBM Plex Mono',monospace}\n.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap}\n.ok{background:#E6F0EA;color:#14503A}.warn{background:#FFF4E0;color:#7A4700}.bad{background:#FDECEA;color:#A41E14}.info{background:#E8F0FA;color:#1A5598}.mute{background:#EEF0ED;color:#3C4742}\n.tab{min-height:48px;padding:0 4px;margin-right:24px;border:0;border-bottom:3px solid transparent;background:transparent;font:inherit;font-size:15px;font-weight:500;color:#5C6862;cursor:pointer}\n.tab.on{color:#14503A;border-bottom-color:#1F6B4F;font-weight:600}\n.chip{display:inline-flex;align-items:center;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid #CBD2CC;background:#FFFFFF;font:inherit;font-size:14px;color:#3C4742;cursor:pointer}\n.chip.on{background:#1B2420;border-color:#1B2420;color:#FFFFFF}\n.ln{display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;min-height:54px;padding:8px 0;border-top:1px solid #EEF0ED;font-size:15px}\n.opt{display:flex;align-items:center;gap:12px;min-height:48px;border-top:1px solid #EEF0ED;font-size:15px}\ninput[type=checkbox]{width:22px;height:22px;accent-color:#1F6B4F;margin:0}\ninput[type=number]{font:inherit;font-size:20px;font-weight:600;min-height:52px;width:140px;padding:8px 12px;border:1px solid #CBD2CC;border-radius:10px;box-sizing:border-box}\nh3{margin:0 0 4px;font-size:17px;font-weight:600}\ninput.fin,input.fin[type=number]{font:inherit;font-size:15px;font-weight:400;min-height:46px;width:100%;padding:8px 12px;border:1px solid #CBD2CC;border-radius:8px;background:#FFFFFF;color:#1B2420;box-sizing:border-box}\n.lim{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px;border-top:1px solid #EEF0ED;font-size:15px}\n.lim input{width:110px;font-size:17px;min-height:46px}\n";

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
seed() {
const v = (o, extra) => ({ vals: o, extra: extra || '' });
return {
sup: [
v({ name: 'Al-Nour Farm', contact: '[CONTACT NAME]', phone: '[PHONE]', address: '', products: 'Mint, hibiscus', notes: '' }, '2 fields · −2.08% yield'),
v({ name: 'Wadi Green Co-op', contact: '[CONTACT NAME]', phone: '[PHONE]', address: '', products: 'Hibiscus', notes: '' }, '1 field · −0.54% yield'),
v({ name: 'Delta Herbs', contact: '[CONTACT NAME]', phone: '[PHONE]', address: '', products: 'Chamomile, mint', notes: '' }, '1 field · +0.78% yield'),
v({ name: 'Sunrise Growers', contact: '[CONTACT NAME]', phone: '[PHONE]', address: '', products: 'Hibiscus', notes: '' }, '1 field · −0.42% yield')
],
prod: [
v({ name: 'Dried mint', code: 'MNT', rate: '80', shelf: '24', byproducts: 'Residue, fines', sieving: 'Yes', sizing: 'Yes' }),
v({ name: 'Hibiscus', code: 'HIB', rate: '84', shelf: '24', byproducts: 'Residue, fines', sieving: 'Yes', sizing: 'Yes' }),
v({ name: 'Chamomile', code: 'CHM', rate: '79', shelf: '18', byproducts: 'Fines', sieving: 'Yes', sizing: 'No' })
],
field: [
v({ name: 'Field 7 — River plot', supplier: 'Al-Nour Farm', farming: 'Conventional', cert: '', area: '' }),
v({ name: 'Field 2', supplier: 'Al-Nour Farm', farming: 'Organic', cert: '[CERT NO.]', area: '' }),
v({ name: 'Field 3 — North plot', supplier: 'Wadi Green Co-op', farming: 'Organic', cert: '[CERT NO.]', area: '' }),
v({ name: 'Field 1 — East plot', supplier: 'Delta Herbs', farming: 'Conventional', cert: '', area: '' })
],
cust: [
v({ name: 'Verde Herbal Co.', country: '[COUNTRY]', contact: '[CONTACT]', email: '' }, '4 shipments'),
v({ name: 'Northfield Teas', country: '[COUNTRY]', contact: '[CONTACT]', email: '' }, '2 shipments')
],
pack: [
v({ name: '25 kg PP bag', net: '25', tare: '0.25', material: 'Polypropylene' }),
v({ name: '20 kg paper bag', net: '20', tare: '0.3', material: 'Paper' }),
v({ name: '10 kg carton', net: '10', tare: '0.6', material: 'Cardboard' })
],
loc: [
v({ name: 'Raw store A', area: 'Raw material', allowed: 'Both zones', cap: '6000' }),
v({ name: 'Rack 04', area: 'Finished goods', allowed: 'Conventional only', cap: '8000' }),
v({ name: 'Rack 05', area: 'Finished goods', allowed: 'Organic only', cap: '4000' }),
v({ name: 'Loading bay', area: 'Loading', allowed: 'Any', cap: '2000' })
]
};
}
schemas() {
const supNames = this.state.records.sup.map((r) => r.vals.name);
const yesNo = ['Yes', 'No'];
return {
sup: { label: 'Suppliers', one: 'supplier', fields: [
{ k: 'name', label: 'Supplier name', req: true, ph: 'e.g. Green Valley Farm' },
{ k: 'contact', label: 'Contact person', req: true },
{ k: 'phone', label: 'Phone', req: true },
{ k: 'address', label: 'Address or country' },
{ k: 'products', label: 'Products supplied', ph: 'e.g. Mint, hibiscus' },
{ k: 'notes', label: 'Notes', wide: true }
] },
prod: { label: 'Products', one: 'product', fields: [
{ k: 'name', label: 'Product name', req: true, ph: 'e.g. Dried sage' },
{ k: 'code', label: 'Code (3 letters)', req: true, ph: 'SAG', hint: 'Used in every lot code, for example RM-SAG-261023-01.' },
{ k: 'rate', label: 'Usual agreed yield (%)', req: true, type: 'number', ph: '80', hint: 'Shown as a suggestion when a delivery is received.' },
{ k: 'shelf', label: 'Shelf life (months)', type: 'number', ph: '24' },
{ k: 'byproducts', label: 'By-products', ph: 'e.g. Residue, fines' },
{ k: 'sieving', label: 'Sieving step', type: 'choice', options: yesNo, def: 'Yes' },
{ k: 'sizing', label: 'Sizing step', type: 'choice', options: yesNo, def: 'Yes', hint: 'Metal detector (CCP 2) and packing are always included.' }
] },
field: { label: 'Fields', one: 'field', fields: [
{ k: 'name', label: 'Field name', req: true, ph: 'e.g. Field 9 — South plot' },
{ k: 'supplier', label: 'Supplier', req: true, type: 'choice', options: supNames, hint: supNames.length ? '' : 'Add a supplier first.' },
{ k: 'farming', label: 'Farming', req: true, type: 'choice', options: ['Organic', 'Conventional'] },
{ k: 'cert', label: 'Organic certificate no.', reqIf: (v) => v.farming === 'Organic', hint: 'Required for organic fields.' },
{ k: 'area', label: 'Area (hectares)', type: 'number' }
] },
cust: { label: 'Customers', one: 'customer', fields: [
{ k: 'name', label: 'Customer name', req: true },
{ k: 'country', label: 'Country', req: true },
{ k: 'contact', label: 'Contact person' },
{ k: 'email', label: 'Email' }
] },
pack: { label: 'Packaging', one: 'packaging type', fields: [
{ k: 'name', label: 'Packaging name', req: true, ph: 'e.g. 5 kg pouch' },
{ k: 'net', label: 'Net kg per unit', req: true, type: 'number' },
{ k: 'tare', label: 'Tare kg per unit', req: true, type: 'number', hint: 'Used to work out gross weight.' },
{ k: 'material', label: 'Material', type: 'choice', options: ['Polypropylene', 'Paper', 'Cardboard', 'Other'], def: 'Polypropylene' }
] },
loc: { label: 'Locations', one: 'location', fields: [
{ k: 'name', label: 'Location name', req: true, ph: 'e.g. Rack 06' },
{ k: 'area', label: 'Area', req: true, type: 'choice', options: ['Raw material', 'Finished goods', 'Quarantine', 'Loading'], def: 'Raw material' },
{ k: 'allowed', label: 'Allowed stock', req: true, type: 'choice', options: ['Organic only', 'Conventional only', 'Both zones', 'Any'], def: 'Both zones', hint: 'Organic and conventional are never mixed in one rack.' },
{ k: 'cap', label: 'Capacity (kg)', type: 'number' }
] }
};
}
masterVals() {
const s = this.state;
const sc = this.schemas();
const lk = s.list;
const L = sc[lk];
const recs = s.records[lk];
const f = s.form;
const titleOf = (k, v) => k === 'prod' ? v.name + ' (' + v.code + ')' : v.name;
const detailOf = (k, r) => {
const v = r.vals;
let d;
if (k === 'sup') d = [v.contact, v.phone, v.products].filter(Boolean).join(' · ');
else if (k === 'prod') d = 'Usual yield ' + v.rate + '% · ' + ['Sieving', 'Sizing'].filter((n, i) => (i === 0 ? v.sieving : v.sizing) === 'Yes').concat(['Metal detector', 'Packing']).join(', ') + (v.byproducts ? ' · by-products: ' + v.byproducts : '');
else if (k === 'field') d = v.supplier + ' · ' + v.farming.toLowerCase() + (v.cert ? ' · cert ' + v.cert : '') + (v.area ? ' · ' + v.area + ' ha' : '');
else if (k === 'cust') d = [v.country, v.contact].filter(Boolean).join(' · ');
else if (k === 'pack') d = 'Net ' + v.net + ' kg · tare ' + v.tare + ' kg' + (v.material ? ' · ' + v.material.toLowerCase() : '');
else d = v.area + ' · ' + v.allowed.toLowerCase() + (v.cap ? ' · capacity ' + Number(v.cap).toLocaleString('en-US') + ' kg' : '');
return d + (r.extra ? ' · ' + r.extra : (r.isNew && ['sup', 'prod', 'field'].indexOf(k) !== -1 ? ' · no lots yet' : ''));
};
const defaultsFor = (k) => sc[k].fields.reduce((a, fd) => ({ ...a, [fd.k]: fd.def || '' }), {});
const needs = (fd, vals) => !!(fd.req || (fd.reqIf && fd.reqIf(vals)));
const validate = (vals, idx) => {
const errs = [];
L.fields.forEach((fd) => {
const val = String(vals[fd.k] === undefined ? '' : vals[fd.k]).trim();
if (needs(fd, vals) && !val) errs.push(fd.label + ' is required.');
if (fd.type === 'number' && val && !(Number(val) > 0)) errs.push(fd.label + ' must be more than 0.');
});
const nm = String(vals.name || '').trim().toLowerCase();
if (nm && recs.some((r, i) => i !== idx && r.vals.name.trim().toLowerCase() === nm)) errs.push('A ' + L.one + ' named "' + vals.name.trim() + '" already exists.');
if (lk === 'prod' && vals.code) {
if (!/^[A-Z]{3}$/.test(vals.code)) errs.push('The code must be exactly 3 letters.');
else if (recs.some((r, i) => i !== idx && r.vals.code === vals.code)) errs.push('The code ' + vals.code + ' is already used by another product.');
}
return errs;
};
const openAdd = (k, preset) => this.setState({ list: k, form: { mode: 'add', idx: -1, values: { ...defaultsFor(k), ...(preset || {}) } }, err: '', toast: '', toastKind: '', mq: '' });
const q = String(s.mq || '').trim().toLowerCase();
const items = recs.map((r, i) => ({ r: r, i: i })).filter((x) => !q || (titleOf(lk, x.r.vals) + ' ' + detailOf(lk, x.r)).toLowerCase().indexOf(q) !== -1).map((x) => ({
title: titleOf(lk, x.r.vals), detail: detailOf(lk, x.r), isNew: !!x.r.isNew, isSup: lk === 'sup', notSup: lk !== 'sup',
edit: () => this.setState({ form: { mode: 'edit', idx: x.i, values: { ...x.r.vals } }, err: '', toast: '', toastKind: '' })
}));
return {
lists: Object.keys(sc).map((k) => ({ label: sc[k].label, count: s.records[k].length, cls: k === lk ? 'chip on' : 'chip', pressed: k === lk ? 'true' : 'false', pick: () => this.setState({ list: k, form: null, err: '', toast: '', toastKind: '', mq: '' }) })),
listOne: L.one, listLower: L.label.toLowerCase(),
items: items, noItems: items.length === 0,
mq: s.mq, setMq: (e) => this.setState({ mq: e.target.value }),
openAdd: () => openAdd(lk),
formOpen: !!f, formTitle: f ? (f.mode === 'add' ? 'Add ' : 'Edit ') + L.one : '',
formFields: f ? L.fields.map((fd) => {
const val = f.values[fd.k] === undefined ? '' : f.values[fd.k];
const isChoice = fd.type === 'choice';
const hint = fd.k === 'cert' ? (f.values.farming === 'Organic' ? fd.hint : '') : (fd.hint || '');
return {
label: fd.label, star: needs(fd, f.values) ? ' *' : '', span: fd.wide ? '1 / -1' : 'auto',
isInput: !isChoice, isChoice: isChoice, itype: fd.type === 'number' ? 'number' : 'text', value: val, ph: fd.ph || '',
set: (e) => this.setState({ form: { ...f, values: { ...f.values, [fd.k]: fd.k === 'code' ? e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) : e.target.value } } }),
options: isChoice ? fd.options.map((o) => ({ label: o, cls: val === o ? 'chip on' : 'chip', pressed: val === o ? 'true' : 'false', pick: () => this.setState({ form: { ...f, values: { ...f.values, [fd.k]: o } } }) })) : [],
hasHint: !!hint, hint: hint
};
}) : [],
hasErr: !!s.err, err: s.err,
cancel: () => this.setState({ form: null, err: '' }),
save: () => {
const vals = {};
Object.keys(f.values).forEach((k) => { vals[k] = String(f.values[k]).trim(); });
const errs = validate(vals, f.idx);
if (errs.length) return this.setState({ err: errs[0] + (errs.length > 1 ? ' (' + (errs.length - 1) + ' more to fix)' : '') });
const adding = f.mode === 'add';
const rec = adding ? { vals: vals, extra: '', isNew: true } : { ...recs[f.idx], vals: vals };
const next = adding ? [rec].concat(recs) : recs.map((r, i) => i === f.idx ? rec : r);
const name = titleOf(lk, vals);
const note = lk === 'sup' && adding ? 'Supplier saved. Add a field for it so its lots can be received.' : lk === 'prod' && adding ? 'Product saved. Its lot codes will start with ' + vals.code + ', for example RM-' + vals.code + '-261023-01.' : (adding ? 'Added ' : 'Saved changes to ') + L.one + ' "' + name + '".';
this.setState({
records: { ...s.records, [lk]: next }, form: null, err: '', toast: note, toastKind: lk === 'sup' && adding ? 'supField' : '', toastSup: vals.name,
auditExtra: [{ when: 'Just now', what: (adding ? 'Added ' : 'Edited ') + L.one + ': ' + name, who: 'Quality manager', kind: 'all' }].concat(s.auditExtra)
});
},
hasToast: !!s.toast, toast: s.toast,
hasToastAct: s.toastKind === 'supField', toastAct: 'Add a field for ' + (s.toastSup || ''),
toastRun: () => openAdd('field', { supplier: s.toastSup })
};
}
constructor(props) {
super(props);
this.state = { records: this.seed(), form: null, err: '', toast: '', toastKind: '', toastSup: '', mq: '', auditExtra: [], lim: { moist: 12, fm: 1, bagMin: 24.95, bagMax: 25.10, gap: 0.5, rateLo: 70, rateHi: 92 }, tab: 'master', th: 0, product: 'CHM', opt: { MNT: { s: true, z: true }, HIB: { s: true, z: true }, CHM: { s: true, z: false } }, list: 'sup', af: 'all' };
}
renderVals() {
const s = this.state;
const th = Math.max(0, Number(s.th) || 0);
const lots = [['RM-MNT-261020-01', -6.25], ['RM-HIB-261018-02', -2.06], ['RM-HIB-261015-01', -1.46], ['RM-CHM-261012-01', 1.35]];
const cur = s.opt[s.product];
const stepDefs = [['Receiving', null], ['Analysis', 'CCP 1'], ['Sieving', 's'], ['Sizing', 'z'], ['Metal detector', 'CCP 2'], ['Packing & labels', null]];
const audit = (s.auditExtra || []).concat([
{ when: '22 Oct, 11:20', what: 'Yield alert raised on RM-MNT-261020-01', who: 'System', kind: 'all' },
{ when: '22 Oct, 09:12', what: 'Metal detector check cleared on PB-HIB-261021-01', who: 'Quality manager', kind: 'appr', reason: 'Rejects removed, 3 clean passes' },
{ when: '22 Oct, 08:30', what: 'Received RM-HIB-261022-01, 1,000 kg', who: 'Inventory manager', kind: 'all' },
{ when: '21 Oct, 16:05', what: 'Changed locked record RM-HIB-261018-02: moisture 12.4% → 11.4%', who: 'Quality manager', kind: 'edit', reason: 'Typing error, lab sheet shows 11.4%' },
{ when: '20 Oct, 14:05', what: 'Approved RM-MNT-261020-01, agreed yield 80% locked', who: 'Quality manager', kind: 'appr' }
]);
return {
...this.scanVals(),
...this.masterVals(),
tabs: [['set', 'Settings'], ['master', 'Master data'], ['audit', 'Audit log'], ['import', 'Import stock']].map(([k, l]) => ({ label: l, cls: k === s.tab ? 'tab on' : 'tab', pressed: k === s.tab ? 'true' : 'false', pick: () => this.setState({ tab: k }) })),
tSet: s.tab === 'set', tMaster: s.tab === 'master', tAudit: s.tab === 'audit', tImport: s.tab === 'import',
th: s.th, setTh: (e) => this.setState({ th: e.target.value }),
lim: s.lim,
setLim: Object.keys(s.lim).reduce((a, k) => ({ ...a, [k]: (e) => this.setState({ lim: { ...s.lim, [k]: e.target.value } }) }), {}),
limSummary: 'Receiving warns above ' + s.lim.moist + '% moisture. Labels are blocked for bags outside ' + s.lim.bagMin + '–' + s.lim.bagMax + ' kg.',
preview: lots.map(([c, v]) => { const a = v < 0 && -v > th; return { code: c, v: (v > 0 ? '+' : '−') + Math.abs(v).toFixed(2) + '%', label: a ? 'Alert' : 'No alert', badge: a ? 'badge bad' : 'badge mute' }; }),
products: [['MNT', 'Mint'], ['HIB', 'Hibiscus'], ['CHM', 'Chamomile']].map(([k, l]) => ({ label: l, cls: k === s.product ? 'chip on' : 'chip', pressed: k === s.product ? 'true' : 'false', pick: () => this.setState({ product: k }) })),
steps: stepDefs.map(([name, key]) => {
const opt = key === 's' || key === 'z';
const on = opt ? cur[key] : true;
return { name: name, req: !opt, opt: opt, tag: key || 'Required', on: on, color: on ? '#1B2420' : '#8A958F', toggle: () => this.setState({ opt: { ...s.opt, [s.product]: { ...cur, [key]: !cur[key] } } }) };
}),
afilters: [['all', 'Everything'], ['appr', 'Approvals & clears'], ['edit', 'Locked edits']].map(([k, l]) => ({ label: l, cls: k === s.af ? 'chip on' : 'chip', pressed: k === s.af ? 'true' : 'false', pick: () => this.setState({ af: k }) })),
audit: audit.filter((a) => s.af === 'all' || a.kind === s.af).map((a) => ({ ...a, hasReason: !!a.reason }))
};
}
}

export default class MasterDataPage extends Component {
  template(v) {
    return (<><style>{STYLE}</style>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "minHeight": "900px", "background": "#F6F7F5"}}>{" "}<nav aria-label={"Main"} style={{"flex": "1 1 240px", "maxWidth": "280px", "background": "#FFFFFF", "borderRight": "1px solid #E3E6E1", "padding": "20px 14px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "4px"}}>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "4px 8px 16px"}}>{" "}<div style={{"width": "36px", "height": "36px", "borderRadius": "9px", "background": "#1F6B4F", "color": "#FFFFFF", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontWeight": "600", "fontSize": "16px"}}>{"M"}</div>{" "}<div style={{"fontWeight": "600", "fontSize": "16px"}}>{"Mawasem"}</div>{" "}</div>{" "}<div style={{"padding": "0 0 14px"}}><label htmlFor={"scan"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Search by product code"}</label><div style={{"display": "flex", "alignItems": "center", "gap": "10px", "minHeight": "50px", "padding": "0 12px", "border": "1px solid #CBD2CC", "borderRadius": "10px", "background": "#F6F7F5"}}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"#3C4742"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"} style={{"flex": "none"}}><circle cx={"11"} cy={"11"} r={"6"}></circle><path d={"M20 20l-4.2-4.2"}></path></svg><input id={"scan"} type={"search"} value={v.scanQ} onChange={v.setScan} placeholder={"Product code (HIB, MNT\u2026)"} style={{"flex": "1", "minWidth": "0", "border": "0", "outline": "none", "background": "transparent", "font": "inherit", "fontSize": "14px", "minHeight": "48px", "color": "#1B2420"}} /></div>{(v.scanHit) ? (<><div style={{"marginTop": "8px", "border": "1px solid #D5E5DA", "background": "#F4F8F5", "borderRadius": "10px", "padding": "8px 10px"}}><div style={{"fontSize": "12px", "fontWeight": "600", "color": "#14503A", "marginBottom": "4px"}}>{dcTxt(v.scanHead)}</div>{(v.scanResults || []).map((r, $index) => (<React.Fragment key={$index}><a href={dcHref(r?.link)} style={{"display": "block", "padding": "5px 0", "textDecoration": "none", "color": "#1B2420", "fontSize": "12.5px"}}><span style={{"fontFamily": "'IBM Plex Mono', monospace"}}>{dcTxt(r?.code)}</span>{" "}<span style={{"color": "#5C6862"}}>{"\u00b7 "}{dcTxt(r?.kind)}</span></a></React.Fragment>))}{(v.scanHasMore) ? (<><div style={{"fontSize": "12px", "color": "#5C6862", "paddingTop": "4px"}}>{dcTxt(v.scanMore)}</div></>) : null}</div></>) : null}{(v.scanMiss) ? (<><div role={"status"} style={{"marginTop": "8px", "padding": "10px 12px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "13px"}}>{"No product with that code. Try MNT, HIB or CHM"}</div></>) : null}</div>{" "}<a className={"nv"} href={dcHref("HomeQM.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"}></path></svg>{"Home"}</a>{" "}<a className={"nv"} href={dcHref("Receive.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M12 3v12M7 10l5 5 5-5M4 20h16"}></path></svg>{"Receive"}</a>{" "}<a className={"nv"} href={dcHref("Production.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><rect x={"3"} y={"4"} width={"5"} height={"16"} rx={"1"}></rect><rect x={"10"} y={"4"} width={"5"} height={"10"} rx={"1"}></rect><rect x={"17"} y={"4"} width={"4"} height={"13"} rx={"1"}></rect></svg>{"Production"}</a>{" "}<a className={"nv"} href={dcHref("Stock.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 7l9-4 9 4v10l-9 4-9-4z"}></path><path d={"M3 7l9 4 9-4M12 11v10"}></path></svg>{"Stock"}</a>{" "}<a className={"nv"} href={dcHref("Shipments.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 6h11v10H3zM14 10h4l3 3v3h-7"}></path><circle cx={"7"} cy={"18"} r={"2"}></circle><circle cx={"17"} cy={"18"} r={"2"}></circle></svg>{"Shipments"}</a>{" "}<a className={"nv"} href={dcHref("Trace.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}><circle cx={"6"} cy={"6"} r={"2.5"}></circle><circle cx={"18"} cy={"12"} r={"2.5"}></circle><circle cx={"6"} cy={"18"} r={"2.5"}></circle><path d={"M8.5 7l7 4M8.5 17l7-4"}></path></svg>{"Trace"}</a>{" "}<a className={"nv"} href={dcHref("Reports.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"}><path d={"M5 20V11M11 20V5M17 20v-7M3 20h18"}></path></svg>{"Reports"}</a><a className={"nv on"} href={dcHref("MasterData.dc.html")} aria-current={"page"}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><ellipse cx={"12"} cy={"6"} rx={"8"} ry={"3"}></ellipse><path d={"M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"}></path></svg>{"Master data"}</a>{" "}<div style={{"flexGrow": "1", "minHeight": "24px"}}></div>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "14px 8px 4px", "borderTop": "1px solid #E3E6E1"}}>{" "}<div style={{"width": "34px", "height": "34px", "borderRadius": "999px", "background": "#E6F0EA", "color": "#14503A", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600"}}>{"QM"}</div>{" "}<div style={{"flex": "1", "fontSize": "14px", "fontWeight": "500"}}>{"Quality manager"}</div>{" "}{" "}</div>{" "}</nav>{" "}<main style={{"flex": "999 1 560px", "minWidth": "0", "padding": "32px 36px 48px", "boxSizing": "border-box"}}>{" "}<div style={{"maxWidth": "1000px", "margin": "0 auto", "display": "flex", "flexDirection": "column", "gap": "20px"}}>{" "}<header>{" "}<h1 style={{"margin": "0", "fontSize": "30px", "fontWeight": "600"}}>{"Master data"}</h1>{" "}<div style={{"fontSize": "15px", "color": "#5C6862", "marginTop": "4px"}}>{"The lists used in every form: suppliers, products, fields, customers, packaging and locations. Every change is logged."}</div>{" "}</header>{" "}<section className={"card"} style={{"minWidth": "0"}}>{" "}{(v.tMaster) ? (<>{" "}<div style={{"padding": "18px 22px 24px", "display": "flex", "flexDirection": "column", "gap": "14px"}}>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "gap": "10px", "justifyContent": "space-between", "alignItems": "center"}}>{" "}<div role={"group"} aria-label={"List"} style={{"display": "flex", "gap": "8px", "flexWrap": "wrap"}}>{(v.lists || []).map((l, $index) => (<React.Fragment key={$index}><button type={"button"} className={l?.cls} aria-pressed={l?.pressed} onClick={l?.pick}>{dcTxt(l?.label)}{" "}<span style={{"opacity": "0.75", "marginLeft": "4px"}}>{dcTxt(l?.count)}</span></button></React.Fragment>))}</div>{" "}<button className={"btn pri"} type={"button"} onClick={v.openAdd}>{"Add "}{dcTxt(v.listOne)}</button>{" "}</div>{" "}{(v.hasToast) ? (<>{" "}<div role={"status"} style={{"display": "flex", "flexWrap": "wrap", "gap": "10px", "alignItems": "center", "justifyContent": "space-between", "padding": "12px 16px", "borderRadius": "10px", "background": "#1B2420", "color": "#FFFFFF", "fontSize": "14px"}}><span>{dcTxt(v.toast)}</span>{(v.hasToastAct) ? (<><button className={"btn"} type={"button"} onClick={v.toastRun} style={{"minHeight": "40px", "fontSize": "14px"}}>{dcTxt(v.toastAct)}</button></>) : null}</div>{" "}</>) : null}{" "}{(v.formOpen) ? (<>{" "}<section aria-label={v.formTitle} style={{"border": "2px solid #1F6B4F", "borderRadius": "14px", "padding": "20px", "background": "#F9FBF9", "display": "flex", "flexDirection": "column", "gap": "16px"}}>{" "}<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "baseline", "gap": "10px"}}><h3 style={{"margin": "0"}}>{dcTxt(v.formTitle)}</h3><span style={{"fontSize": "13px", "color": "#5C6862"}}>{"* required"}</span></div>{" "}<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(240px, 1fr))", "gap": "14px"}}>{" "}{(v.formFields || []).map((f, $index) => (<React.Fragment key={$index}>{" "}<div style={dcCss("grid-column: " + dcStr(f?.span) + "; display: flex; flex-direction: column; gap: 6px")}>{" "}<div style={{"fontSize": "13px", "fontWeight": "500", "color": "#3C4742"}}>{dcTxt(f?.label)}{dcTxt(f?.star)}</div>{" "}{(f?.isInput) ? (<><input className={"fin"} type={f?.itype} value={f?.value} onChange={f?.set} placeholder={f?.ph} aria-label={f?.label} /></>) : null}{" "}{(f?.isChoice) ? (<><div style={{"display": "flex", "gap": "6px", "flexWrap": "wrap"}}>{(f?.options || []).map((o, $index) => (<React.Fragment key={$index}><button type={"button"} className={o?.cls} aria-pressed={o?.pressed} onClick={o?.pick}>{dcTxt(o?.label)}</button></React.Fragment>))}</div></>) : null}{" "}{(f?.hasHint) ? (<><div style={{"fontSize": "12px", "color": "#5C6862"}}>{dcTxt(f?.hint)}</div></>) : null}{" "}</div>{" "}</React.Fragment>))}{" "}</div>{" "}{(v.hasErr) ? (<><div role={"alert"} style={{"padding": "10px 14px", "borderRadius": "8px", "background": "#FDECEA", "color": "#7E1810", "fontSize": "14px"}}>{dcTxt(v.err)}</div></>) : null}{" "}<div style={{"display": "flex", "justifyContent": "flex-end", "gap": "8px", "flexWrap": "wrap"}}><button className={"btn"} type={"button"} onClick={v.cancel}>{"Cancel"}</button><button className={"btn pri"} type={"button"} onClick={v.save}>{"Save "}{dcTxt(v.listOne)}</button></div>{" "}</section>{" "}</>) : null}{" "}<div style={{"maxWidth": "360px"}}><label htmlFor={"mq"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Search"}</label><input id={"mq"} className={"fin"} type={"search"} value={v.mq} onChange={v.setMq} placeholder={"Search " + dcStr(v.listLower) + ""} /></div>{" "}<div>{" "}{(v.items || []).map((i, $index) => (<React.Fragment key={$index}>{" "}<div className={"ln"}><span style={{"flex": "1 1 220px", "fontWeight": "600"}}>{(i?.isSup) ? (<><a href={dcHref("Supplier.dc.html")}>{dcTxt(i?.title)}</a></>) : null}{(i?.notSup) ? (<>{dcTxt(i?.title)}</>) : null}{" "}{(i?.isNew) ? (<><span className={"badge ok"} style={{"marginLeft": "6px"}}>{"New"}</span></>) : null}</span><span style={{"flex": "2 1 300px", "color": "#3C4742", "fontSize": "14px"}}>{dcTxt(i?.detail)}</span><button type={"button"} onClick={i?.edit} style={{"border": "0", "background": "transparent", "font": "inherit", "color": "#1F6B4F", "cursor": "pointer", "minHeight": "40px"}}>{"Edit"}</button></div>{" "}</React.Fragment>))}{" "}{(v.noItems) ? (<><div style={{"padding": "20px 0", "borderTop": "1px solid #EEF0ED", "fontSize": "14px", "color": "#5C6862"}}>{"Nothing matches."}</div></>) : null}{" "}</div>{" "}</div>{" "}</>) : null}{" "}</section>{" "}</div>{" "}</main>{" "}</div>{" "}</>);
  }
}
