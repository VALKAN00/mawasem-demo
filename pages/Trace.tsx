// @ts-nocheck
// Generated from v2/Trace.dc.html (Factory Traceability UI · Simplified v2). Design unchanged.
import React from 'react';
import { DCLogic, dcCss, dcHref, dcStr, dcTxt, dcNoop } from '../lib/dc';

export const title = "Trace and recall";

const STYLE = "\nbody{margin:0;font-family:'IBM Plex Sans',system-ui,sans-serif;color:#1B2420;background:#F6F7F5}\na{color:#1F6B4F}a:hover{color:#14503A}\n.nv{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 14px;border-radius:10px;color:#3C4742;text-decoration:none;font-size:15px;font-weight:500}\n.nv:hover{background:#F1F3F0;color:#1B2420}\n.nv.on{background:#1F6B4F;color:#FFFFFF}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:10px;border:1px solid #CBD2CC;background:#FFFFFF;color:#1B2420;font:inherit;font-size:15px;font-weight:500;text-decoration:none;cursor:pointer;box-sizing:border-box;white-space:nowrap}\n.btn:hover{background:#F1F3F0;color:#1B2420}\n.btn.pri{background:#1F6B4F;border-color:#1F6B4F;color:#FFFFFF;font-weight:600}\n.btn.pri:hover{background:#14503A;color:#FFFFFF}\n.btn.red{background:#B42318;border-color:#B42318;color:#FFFFFF;font-weight:600}\n.btn.red:hover{background:#912018;color:#FFFFFF}\n.btn.full{width:100%}\n.mono{font-family:'IBM Plex Mono',monospace}\n.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap}\n.ok{background:#E6F0EA;color:#14503A}.warn{background:#FFF4E0;color:#7A4700}.bad{background:#FDECEA;color:#A41E14}.info{background:#E8F0FA;color:#1A5598}.mute{background:#EEF0ED;color:#3C4742}\n.seg{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:0;background:transparent;font:inherit;font-size:14px;font-weight:500;cursor:pointer;color:#3C4742;border-radius:7px}\n.seg.on{background:#FFFFFF;color:#14503A;box-shadow:0 1px 2px rgba(20,30,25,0.12)}\n.chip{display:inline-flex;align-items:center;min-height:36px;padding:0 12px;border-radius:999px;border:1px solid #CBD2CC;background:#FFFFFF;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#3C4742;cursor:pointer}\n.col{flex:0 0 190px;display:flex;flex-direction:column;gap:10px}\n.colh{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#5C6862;font-weight:600;min-height:18px}\n.node{display:flex;flex-direction:column;gap:3px;text-align:left;width:100%;padding:12px;border-radius:10px;border:1px solid #E3E6E1;background:#FFFFFF;font:inherit;color:#1B2420;cursor:pointer;box-sizing:border-box}\n.node:hover{border-color:#1F6B4F}\n.node.root{border:2px solid #1F6B4F;background:#F4F8F5;padding:11px}\n.ty{font-size:11px;letter-spacing:.05em;text-transform:uppercase;font-weight:600}\n.kg{font-size:12px;font-weight:600;color:#14503A;background:#E6F0EA;border-radius:6px;padding:3px 7px;align-self:flex-start;margin-top:4px}\n.arrow{flex:none;width:18px;display:flex;align-items:center;justify-content:center;color:#8A958F;font-size:18px;padding-top:28px}\n.kv{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid #EEF0ED;font-size:14px}\ninput{font:inherit;font-size:16px;min-height:50px;padding:8px 14px;border:1px solid #CBD2CC;border-radius:10px;background:#FFFFFF;color:#1B2420;box-sizing:border-box;width:100%}\n";

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
roleVals() {
const qm = ((this.state && this.state.role) || 'qm') === 'qm';
return {
isQM: qm,
homeLink: qm ? 'HomeQM.dc.html' : 'HomeIM.dc.html',
roleName: qm ? 'Quality manager' : 'Inventory manager',
roleInitials: qm ? 'QM' : 'IM',
otherRole: qm ? 'inventory manager' : 'quality manager',
switchRole: () => this.setState({ role: qm ? 'im' : 'qm' })
};
}
constructor(props) {
super(props);
this.state = { focus: 'RM-MNT-261020-01', q: 'RM-MNT-261020-01', dir: 'fwd', mode: 'info', confirming: false, held: false };
}
graph() {
const nodes = {
'SUP:AL-NOUR-F7': { type: 'Supplier', title: 'Al-Nour Farm', sub: 'Field 7 · conventional' },
'SUP:DELTA-F1': { type: 'Supplier', title: 'Delta Herbs', sub: 'Field 1 · conventional' },
'RM-MNT-261020-01': { type: 'Raw lot', sub: 'Mint · 1,000 kg · 20 Oct' },
'RM-CHM-261016-02': { type: 'Raw lot', sub: 'Chamomile · 800 kg · 16 Oct' },
'PB-MNT-261021-01': { type: 'Batch', sub: '600 kg in · CCP 2 pass' },
'PB-MNT-261021-02': { type: 'Batch', sub: '400 kg in · CCP 2 pass' },
'PB-CHM-261018-01': { type: 'Batch', sub: '800 kg in · CCP 2 pass' },
'BP-RESIDUE': { type: 'By-product', title: 'Sieving residue', sub: '95 kg · sold 21 Oct', left: 95, cust: '[BUYER]' },
'BP-FINES': { type: 'By-product', title: 'Fines', sub: '45 kg · in stock', onsite: 45, loc: 'By-product store' },
'FG-MNT-261022-01': { type: 'Finished lot', sub: '450 kg · loading bay', onsite: 450, loc: 'Loading bay · SH-261025-01' },
'FG-MNT-261022-02': { type: 'Finished lot', sub: '300 kg · used in blend' },
'FG-CHM-261019-03': { type: 'Finished lot', sub: '450 kg left · Rack 04', onsite: 450, loc: 'Rack 04' },
'BL-MNT-261023-01': { type: 'Blend', sub: '500 kg · mint 60%', onsite: 500, loc: 'Rack 04 · SH-261028-02' },
'SH-261025-01': { type: 'Shipment', sub: 'Verde Herbal Co. · loading', cust: 'Verde Herbal Co.', stop: true },
'SH-261028-02': { type: 'Shipment', sub: 'Northfield Teas · planned', cust: 'Northfield Teas', stop: true }
};
const edges = [
['SUP:AL-NOUR-F7', 'RM-MNT-261020-01', 1000], ['SUP:DELTA-F1', 'RM-CHM-261016-02', 800],
['RM-MNT-261020-01', 'PB-MNT-261021-01', 600], ['RM-MNT-261020-01', 'PB-MNT-261021-02', 400],
['RM-CHM-261016-02', 'PB-CHM-261018-01', 800],
['PB-MNT-261021-01', 'FG-MNT-261022-01', 450], ['PB-MNT-261021-01', 'BP-RESIDUE', 56], ['PB-MNT-261021-01', 'BP-FINES', 27],
['PB-MNT-261021-02', 'FG-MNT-261022-02', 300], ['PB-MNT-261021-02', 'BP-RESIDUE', 39], ['PB-MNT-261021-02', 'BP-FINES', 18],
['PB-CHM-261018-01', 'FG-CHM-261019-03', 650],
['FG-MNT-261022-02', 'BL-MNT-261023-01', 300], ['FG-CHM-261019-03', 'BL-MNT-261023-01', 200],
['FG-MNT-261022-01', 'SH-261025-01', 450], ['BL-MNT-261023-01', 'SH-261028-02', 500]
];
return { nodes: nodes, edges: edges };
}
walk(edges, start, fwd) {
const levels = [[start]];
const seen = { [start]: true };
for (let d = 0; d < 8; d++) {
const next = [];
edges.forEach(([a, b]) => {
const from = fwd ? a : b;
const to = fwd ? b : a;
if (levels[d].indexOf(from) !== -1 && !seen[to]) { seen[to] = true; next.push(to); }
});
if (!next.length) break;
levels.push(next);
}
return levels;
}
renderVals() {
const s = this.state;
const { nodes, edges } = this.graph();
const fwd = s.dir === 'fwd';
const fmt = (n) => n.toLocaleString('en-US');
const name = (k) => nodes[k].title || k;
const colors = { 'Supplier': '#3C4742', 'Raw lot': '#14503A', 'Batch': '#1A5598', 'By-product': '#7A4700', 'Finished lot': '#14503A', 'Blend': '#6B3FA0', 'Shipment': '#1A5598' };
const levels = this.walk(edges, s.focus, fwd);
const rsrc = s.rsrc || 'focus';
const startKey = s.mode === 'recall' && rsrc !== 'focus' ? rsrc : s.focus;
const reach = this.walk(edges, startKey, true).reduce((a, c) => a.concat(c), []);
const heldSet = s.held ? reach.filter((k) => nodes[k].onsite) : [];
const cols = levels.map((codes, d) => ({
showArrow: d > 0,
head: d === 0 ? 'Start' : codes.map((k) => nodes[k].type).filter((t, i, a) => a.indexOf(t) === i).join(' · '),
nodes: codes.map((k) => {
const prev = d > 0 ? levels[d - 1] : [];
const links = edges.filter(([a, b]) => fwd ? (b === k && prev.indexOf(a) !== -1) : (a === k && prev.indexOf(b) !== -1));
return {
type: nodes[k].type, color: colors[nodes[k].type], title: name(k), sub: nodes[k].sub,
font: nodes[k].title ? 'inherit' : "'IBM Plex Mono', monospace",
held: heldSet.indexOf(k) !== -1,
cls: k === s.focus ? 'node root' : 'node',
edges: links.map(([a, b, kg]) => fwd ? fmt(kg) + ' kg from ' + name(a) : fmt(kg) + ' kg into ' + name(b)),
pick: () => this.setState({ focus: k, q: name(k), confirming: false, held: false })
};
})
}));
const reached = levels.slice(1).reduce((a, c) => a.concat(c), []);
const count = (t) => reached.filter((k) => nodes[k].type === t).length;
const parts = fwd ? [['Batch', 'batch', 'batches'], ['Finished lot', 'finished lot', 'finished lots'], ['Blend', 'blend', 'blends'], ['By-product', 'by-product', 'by-products'], ['Shipment', 'shipment', 'shipments']] : [['Finished lot', 'finished lot', 'finished lots'], ['Batch', 'batch', 'batches'], ['Raw lot', 'raw lot', 'raw lots'], ['Supplier', 'supplier', 'suppliers']];
const summary = (fwd ? '→ ' : '← ') + parts.map(([t, one, many]) => { const n = count(t); return n ? n + ' ' + (n === 1 ? one : many) : ''; }).filter(Boolean).join(' · ');
const onsite = reach.filter((k) => nodes[k].onsite);
const left = reach.filter((k) => nodes[k].left);
const contacts = left.map((k) => ({ who: nodes[k].cust, tag: 'Shipped', badge: 'badge bad' })).concat(reach.filter((k) => nodes[k].stop).map((k) => ({ who: nodes[k].cust, tag: 'Stop ' + k, badge: 'badge warn' })));
const qk = String(s.q || '').trim().toUpperCase();
const match = Object.keys(nodes).find((k) => k === qk || (nodes[k].title || '').toUpperCase() === qk);
return {
...this.scanVals(),
...this.roleVals(),
q: s.q,
setQ: (e) => { const v = e.target.value; const k = String(v).trim().toUpperCase(); this.setState(nodes[k] ? { q: v, focus: k, held: false } : { q: v }); },
notFound: qk.length >= 6 && !match,
tries: ['RM-MNT-261020-01', 'BL-MNT-261023-01', 'SH-261028-02'].map((c) => ({ code: c, pick: () => this.setState({ focus: c, q: c, held: false }) })),
fwdCls: fwd ? 'seg on' : 'seg', bwdCls: fwd ? 'seg' : 'seg on',
fwdPressed: fwd ? 'true' : 'false', bwdPressed: fwd ? 'false' : 'true',
goFwd: () => this.setState({ dir: 'fwd' }), goBwd: () => this.setState({ dir: 'bwd' }),
arrow: fwd ? '→' : '←',
cols: cols, summary: summary,
focusTitle: name(s.focus), focusType: nodes[s.focus].type, focusSub: nodes[s.focus].sub,
recallTitle: name(startKey),
recallScope: startKey.indexOf('SUP:') === 0 ? ' · all their lots this season' : '',
recallSources: [['focus', name(s.focus)], ['SUP:AL-NOUR-F7', 'Al-Nour Farm'], ['SUP:DELTA-F1', 'Delta Herbs']].map(([k, label]) => ({ label: k === 'focus' ? (s.focus.indexOf('SUP:') === 0 ? label : 'This lot · ' + label) : 'Supplier · ' + label, cls: k === rsrc ? 'seg on' : 'seg', pressed: k === rsrc ? 'true' : 'false', pick: () => this.setState({ rsrc: k, held: false, confirming: false }) })),
infoMode: s.mode === 'info', recallMode: s.mode === 'recall',
openRecall: () => this.setState({ mode: 'recall', dir: 'fwd', rsrc: 'focus' }),
closeRecall: () => this.setState({ mode: 'info', confirming: false }),
leftKg: fmt(left.reduce((a, k) => a + nodes[k].left, 0)),
onsiteKg: fmt(onsite.reduce((a, k) => a + nodes[k].onsite, 0)),
onsiteCount: onsite.length,
onsite: onsite.map((k) => ({ title: name(k), loc: nodes[k].loc, kg: fmt(nodes[k].onsite), status: s.held ? 'On hold' : 'Not held', badge: s.held ? 'badge warn' : 'badge mute' })),
contacts: contacts,
canHold: !s.held && !s.confirming && onsite.length > 0 && (s.role || 'qm') === 'qm',
imNoHold: !s.held && onsite.length > 0 && (s.role || 'qm') !== 'qm',
focusLink: s.focus.indexOf('PB-') === 0 ? 'LotBatch.dc.html' : s.focus.indexOf('FG-') === 0 ? 'LotFinished.dc.html' : s.focus.indexOf('BL-') === 0 ? 'LotBlend.dc.html' : s.focus.indexOf('SH-') === 0 ? 'Shipments.dc.html' : 'Lot.dc.html',
confirming: s.confirming,
askHold: () => this.setState({ confirming: true }),
cancelHold: () => this.setState({ confirming: false }),
confirmHold: () => this.setState({ confirming: false, held: true }),
held: s.held,
release: () => this.setState({ held: false })
};
}
}

export default class TracePage extends Component {
  template(v) {
    return (<><style>{STYLE}</style>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "minHeight": "900px", "background": "#F6F7F5"}}>{" "}<nav aria-label={"Main"} style={{"flex": "1 1 240px", "maxWidth": "280px", "background": "#FFFFFF", "borderRight": "1px solid #E3E6E1", "padding": "20px 14px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "4px"}}>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "4px 8px 16px"}}>{" "}<div style={{"width": "36px", "height": "36px", "borderRadius": "9px", "background": "#1F6B4F", "color": "#FFFFFF", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontWeight": "600", "fontSize": "16px"}}>{"M"}</div>{" "}<div style={{"fontWeight": "600", "fontSize": "16px"}}>{"Mawasem"}</div>{" "}</div>{" "}<div style={{"padding": "0 0 14px"}}><label htmlFor={"scan"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Search by product code"}</label><div style={{"display": "flex", "alignItems": "center", "gap": "10px", "minHeight": "50px", "padding": "0 12px", "border": "1px solid #CBD2CC", "borderRadius": "10px", "background": "#F6F7F5"}}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"#3C4742"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"} style={{"flex": "none"}}><circle cx={"11"} cy={"11"} r={"6"}></circle><path d={"M20 20l-4.2-4.2"}></path></svg><input id={"scan"} type={"search"} value={v.scanQ} onChange={v.setScan} placeholder={"Product code (HIB, MNT\u2026)"} style={{"flex": "1", "minWidth": "0", "border": "0", "outline": "none", "background": "transparent", "font": "inherit", "fontSize": "14px", "minHeight": "48px", "color": "#1B2420", "padding": "0"}} /></div>{(v.scanHit) ? (<><div style={{"marginTop": "8px", "border": "1px solid #D5E5DA", "background": "#F4F8F5", "borderRadius": "10px", "padding": "8px 10px"}}><div style={{"fontSize": "12px", "fontWeight": "600", "color": "#14503A", "marginBottom": "4px"}}>{dcTxt(v.scanHead)}</div>{(v.scanResults || []).map((r, $index) => (<React.Fragment key={$index}><a href={dcHref(r?.link)} style={{"display": "block", "padding": "5px 0", "textDecoration": "none", "color": "#1B2420", "fontSize": "12.5px"}}><span style={{"fontFamily": "'IBM Plex Mono', monospace"}}>{dcTxt(r?.code)}</span>{" "}<span style={{"color": "#5C6862"}}>{"\u00b7 "}{dcTxt(r?.kind)}</span></a></React.Fragment>))}{(v.scanHasMore) ? (<><div style={{"fontSize": "12px", "color": "#5C6862", "paddingTop": "4px"}}>{dcTxt(v.scanMore)}</div></>) : null}</div></>) : null}{(v.scanMiss) ? (<><div role={"status"} style={{"marginTop": "8px", "padding": "10px 12px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "13px"}}>{"No product with that code. Try MNT, HIB or CHM"}</div></>) : null}</div>{" "}<a className={"nv"} href={dcHref(v.homeLink)}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"}></path></svg>{"Home"}</a>{" "}<a className={"nv"} href={dcHref("Receive.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M12 3v12M7 10l5 5 5-5M4 20h16"}></path></svg>{"Receive"}</a>{" "}<a className={"nv"} href={dcHref("Production.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><rect x={"3"} y={"4"} width={"5"} height={"16"} rx={"1"}></rect><rect x={"10"} y={"4"} width={"5"} height={"10"} rx={"1"}></rect><rect x={"17"} y={"4"} width={"4"} height={"13"} rx={"1"}></rect></svg>{"Production"}</a>{" "}<a className={"nv"} href={dcHref("Stock.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 7l9-4 9 4v10l-9 4-9-4z"}></path><path d={"M3 7l9 4 9-4M12 11v10"}></path></svg>{"Stock"}</a>{" "}<a className={"nv"} href={dcHref("Shipments.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 6h11v10H3zM14 10h4l3 3v3h-7"}></path><circle cx={"7"} cy={"18"} r={"2"}></circle><circle cx={"17"} cy={"18"} r={"2"}></circle></svg>{"Shipments"}</a>{" "}<a className={"nv on"} href={dcHref("Trace.dc.html")} aria-current={"page"}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}><circle cx={"6"} cy={"6"} r={"2.5"}></circle><circle cx={"18"} cy={"12"} r={"2.5"}></circle><circle cx={"6"} cy={"18"} r={"2.5"}></circle><path d={"M8.5 7l7 4M8.5 17l7-4"}></path></svg>{"Trace"}</a>{" "}{(v.isQM) ? (<><a className={"nv"} href={dcHref("Reports.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"}><path d={"M5 20V11M11 20V5M17 20v-7M3 20h18"}></path></svg>{"Reports"}</a><a className={"nv"} href={dcHref("MasterData.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><ellipse cx={"12"} cy={"6"} rx={"8"} ry={"3"}></ellipse><path d={"M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"}></path></svg>{"Master data"}</a></>) : null}{" "}<div style={{"flexGrow": "1", "minHeight": "24px"}}></div>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "14px 8px 4px", "borderTop": "1px solid #E3E6E1"}}>{" "}<div style={{"width": "34px", "height": "34px", "borderRadius": "999px", "background": "#E6F0EA", "color": "#14503A", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600"}}>{dcTxt(v.roleInitials)}</div>{" "}<div style={{"flex": "1", "minWidth": "0"}}><div style={{"fontSize": "14px", "fontWeight": "500"}}>{dcTxt(v.roleName)}</div><button type={"button"} onClick={v.switchRole} style={{"border": "0", "background": "transparent", "padding": "0", "font": "inherit", "fontSize": "12px", "color": "#1F6B4F", "cursor": "pointer", "minHeight": "24px"}}>{"Switch to "}{dcTxt(v.otherRole)}</button></div>{" "}</div>{" "}</nav>{" "}<main style={{"flex": "999 1 640px", "minWidth": "0", "padding": "28px 28px 40px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "18px"}}>{" "}<header>{" "}<h1 style={{"margin": "0", "fontSize": "28px", "fontWeight": "600"}}>{"Trace"}</h1>{" "}<div style={{"fontSize": "14px", "color": "#5C6862", "marginTop": "4px"}}>{"Scan or type any code. Click a box to follow it."}</div>{" "}</header>{" "}<section aria-label={"Search"} style={{"display": "flex", "flexWrap": "wrap", "gap": "12px", "alignItems": "center"}}>{" "}<div style={{"flex": "1 1 320px", "maxWidth": "460px"}}><label htmlFor={"q"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Code to trace"}</label><input id={"q"} className={"mono"} type={"search"} value={v.q} onChange={v.setQ} placeholder={"RM-, PB-, FG-, BL- or SH- code"} autoComplete={"off"} /></div>{" "}<div role={"group"} aria-label={"Direction"} style={{"display": "inline-flex", "padding": "4px", "background": "#EEF0ED", "borderRadius": "10px", "gap": "2px"}}>{" "}<button type={"button"} className={v.fwdCls} aria-pressed={v.fwdPressed} onClick={v.goFwd}>{"Where did it go?"}</button>{" "}<button type={"button"} className={v.bwdCls} aria-pressed={v.bwdPressed} onClick={v.goBwd}>{"Where did it come from?"}</button>{" "}</div>{" "}<div style={{"display": "flex", "gap": "6px", "flexWrap": "wrap"}}>{" "}{(v.tries || []).map((t, $index) => (<React.Fragment key={$index}><button type={"button"} className={"chip"} onClick={t?.pick}>{dcTxt(t?.code)}</button></React.Fragment>))}{" "}</div>{" "}</section>{" "}{(v.notFound) ? (<><div role={"status"} style={{"padding": "10px 14px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "14px"}}>{"No record matches "}<span className={"mono"}>{dcTxt(v.q)}</span>{". Showing the last trace."}</div></>) : null}{" "}<div style={{"display": "flex", "flexWrap": "wrap", "gap": "18px", "alignItems": "flex-start"}}>{" "}<section aria-label={"Trace map"} style={{"flex": "1 1 640px", "minWidth": "0", "background": "#FFFFFF", "border": "1px solid #E3E6E1", "borderRadius": "14px", "padding": "20px", "boxSizing": "border-box"}}>{" "}<div style={{"fontSize": "15px", "marginBottom": "14px"}}><strong>{dcTxt(v.focusTitle)}</strong>{" "}<span style={{"color": "#3C4742"}}>{dcTxt(v.summary)}</span></div>{" "}<div style={{"overflowX": "auto", "paddingBottom": "4px"}}>{" "}<div style={{"display": "flex", "gap": "6px", "minWidth": "min-content"}}>{" "}{(v.cols || []).map((c, $index) => (<React.Fragment key={$index}>{" "}{(c?.showArrow) ? (<><div className={"arrow"} aria-hidden={"true"}>{dcTxt(v.arrow)}</div></>) : null}{" "}<div className={"col"}>{" "}<div className={"colh"}>{dcTxt(c?.head)}</div>{" "}{(c?.nodes || []).map((n, $index) => (<React.Fragment key={$index}>{" "}<button type={"button"} className={n?.cls} onClick={n?.pick} aria-label={"Trace from " + dcStr(n?.title) + ""}>{" "}<span className={"ty"} style={dcCss("color: " + dcStr(n?.color))}>{dcTxt(n?.type)}</span>{" "}<span style={dcCss("font-family: " + dcStr(n?.font) + "; font-size: 13px; font-weight: 600")}>{dcTxt(n?.title)}</span>{" "}<span style={{"fontSize": "12px", "color": "#5C6862", "lineHeight": "1.4"}}>{dcTxt(n?.sub)}</span>{" "}{(n?.held) ? (<><span className={"badge warn"} style={{"alignSelf": "flex-start"}}>{"On hold"}</span></>) : null}{" "}{(n?.edges || []).map((e, $index) => (<React.Fragment key={$index}><span className={"kg"}>{dcTxt(e)}</span></React.Fragment>))}{" "}</button>{" "}</React.Fragment>))}{" "}</div>{" "}</React.Fragment>))}{" "}</div>{" "}</div>{" "}</section>{" "}<aside aria-label={"Selected"} style={{"flex": "0 1 360px", "minWidth": "300px", "background": "#FFFFFF", "border": "1px solid #E3E6E1", "borderRadius": "14px", "padding": "22px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "14px"}}>{" "}{(v.infoMode) ? (<>{" "}<div><div className={"ty"} style={{"color": "#5C6862"}}>{dcTxt(v.focusType)}</div><h2 style={{"margin": "4px 0 4px", "fontSize": "20px", "fontWeight": "600"}}>{dcTxt(v.focusTitle)}</h2><div style={{"fontSize": "14px", "color": "#3C4742"}}>{dcTxt(v.focusSub)}</div></div>{" "}<a className={"btn pri full"} href={dcHref(v.focusLink)}>{"Open lot page"}</a>{" "}<a className={"btn full"} href={dcHref("TraceReport.dc.html")}>{"Print trace report"}</a>{" "}<div style={{"borderTop": "1px solid #EEF0ED", "paddingTop": "14px"}}>{" "}<div style={{"fontSize": "15px", "fontWeight": "600"}}>{"Problem with this lot?"}</div>{" "}<div style={{"fontSize": "14px", "color": "#5C6862", "margin": "4px 0 12px"}}>{"See everything made from it and stop what's still here."}</div>{" "}<button className={"btn red full"} type={"button"} onClick={v.openRecall}>{"Start recall"}</button>{" "}</div>{" "}</>) : null}{" "}{(v.recallMode) ? (<>{" "}<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "8px"}}><h2 style={{"margin": "0", "fontSize": "20px", "fontWeight": "600"}}>{"Recall"}</h2><button type={"button"} onClick={v.closeRecall} style={{"border": "0", "background": "transparent", "font": "inherit", "fontSize": "14px", "color": "#1F6B4F", "cursor": "pointer", "minHeight": "40px"}}>{"Close"}</button></div>{" "}<div>{" "}<div style={{"fontSize": "13px", "fontWeight": "500", "color": "#3C4742", "marginBottom": "6px"}}>{"Recall everything from"}</div>{" "}<div role={"group"} aria-label={"Recall source"} style={{"display": "flex", "flexWrap": "wrap", "padding": "3px", "background": "#EEF0ED", "borderRadius": "10px", "gap": "2px"}}>{(v.recallSources || []).map((r, $index) => (<React.Fragment key={$index}><button type={"button"} className={r?.cls} aria-pressed={r?.pressed} onClick={r?.pick} style={{"minHeight": "40px", "padding": "0 12px", "fontSize": "13px"}}>{dcTxt(r?.label)}</button></React.Fragment>))}</div>{" "}</div>{" "}<div style={{"fontSize": "14px", "color": "#3C4742"}}>{"Everything made from "}<strong>{dcTxt(v.recallTitle)}</strong>{dcTxt(v.recallScope)}</div>{" "}<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "10px"}}>{" "}<div style={{"padding": "12px", "borderRadius": "10px", "background": "#FDECEA"}}><div style={{"fontSize": "12px", "color": "#7E1810"}}>{"Already left"}</div><div style={{"fontSize": "22px", "fontWeight": "600", "color": "#A41E14"}}>{dcTxt(v.leftKg)}{" kg"}</div></div>{" "}<div style={{"padding": "12px", "borderRadius": "10px", "background": "#F4F8F5"}}><div style={{"fontSize": "12px", "color": "#14503A"}}>{"Still here"}</div><div style={{"fontSize": "22px", "fontWeight": "600", "color": "#14503A"}}>{dcTxt(v.onsiteKg)}{" kg"}</div></div>{" "}</div>{" "}<div>{" "}<div style={{"fontSize": "14px", "fontWeight": "600"}}>{"Still here"}</div>{" "}{(v.onsite || []).map((o, $index) => (<React.Fragment key={$index}><div className={"kv"}><span><span className={"mono"} style={{"fontSize": "13px"}}>{dcTxt(o?.title)}</span><br /><span style={{"fontSize": "12px", "color": "#5C6862"}}>{dcTxt(o?.loc)}</span></span><span style={{"textAlign": "right"}}>{dcTxt(o?.kg)}{" kg"}<br /><span className={o?.badge}>{dcTxt(o?.status)}</span></span></div></React.Fragment>))}{" "}</div>{" "}<div>{" "}<div style={{"fontSize": "14px", "fontWeight": "600"}}>{"Who to contact"}</div>{" "}{(v.contacts || []).map((p, $index) => (<React.Fragment key={$index}><div className={"kv"}><span style={{"color": "#1B2420", "fontWeight": "500"}}>{dcTxt(p?.who)}</span><span className={p?.badge}>{dcTxt(p?.tag)}</span></div></React.Fragment>))}{" "}</div>{" "}{(v.imNoHold) ? (<><div style={{"padding": "12px 14px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "14px"}}>{"Only the quality manager can put lots on hold. They have been notified."}</div></>) : null}{" "}{(v.canHold) ? (<><button className={"btn red full"} type={"button"} onClick={v.askHold}>{"Put "}{dcTxt(v.onsiteCount)}{" lots on hold"}</button></>) : null}{" "}{(v.confirming) ? (<>{" "}<div role={"alertdialog"} aria-label={"Confirm hold"} style={{"padding": "14px", "borderRadius": "10px", "border": "1px solid #E9B8B2", "background": "#FFFBFA", "display": "flex", "flexDirection": "column", "gap": "10px"}}>{" "}<div style={{"fontSize": "14px", "color": "#7E1810"}}>{dcTxt(v.onsiteKg)}{" kg will be blocked from processing, packing and shipping. Planned shipments are stopped."}</div>{" "}<div style={{"display": "flex", "gap": "8px"}}><button className={"btn"} type={"button"} onClick={v.cancelHold}>{"Cancel"}</button><button className={"btn red"} type={"button"} onClick={v.confirmHold} style={{"flex": "1"}}>{"Confirm hold"}</button></div>{" "}</div>{" "}</>) : null}{" "}{(v.held) ? (<><div role={"status"} style={{"padding": "12px 14px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#5C3600", "fontSize": "14px"}}><strong>{"On hold."}</strong>{" Logged by quality manager. "}<button type={"button"} onClick={v.release} style={{"border": "0", "background": "transparent", "font": "inherit", "color": "#1F6B4F", "fontWeight": "600", "cursor": "pointer"}}>{"Release"}</button></div></>) : null}{" "}<button className={"btn full"} type={"button"}>{"Export recall list"}</button>{" "}</>) : null}{" "}</aside>{" "}</div>{" "}</main>{" "}</div>{" "}</>);
  }
}
