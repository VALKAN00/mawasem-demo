// @ts-nocheck
// Generated from v2/HomeQM.dc.html (Factory Traceability UI · Simplified v2). Design unchanged.
import React from 'react';
import { DCLogic, dcCss, dcHref, dcStr, dcTxt, dcNoop } from '../lib/dc';

export const title = "Home: quality manager";

const STYLE = "\nbody{margin:0;font-family:'IBM Plex Sans',system-ui,sans-serif;color:#1B2420;background:#F6F7F5}\na{color:#1F6B4F}a:hover{color:#14503A}\n.nv{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 14px;border-radius:10px;color:#3C4742;text-decoration:none;font-size:15px;font-weight:500}\n.nv:hover{background:#F1F3F0;color:#1B2420}\n.nv.on{background:#1F6B4F;color:#FFFFFF}\n.card{background:#FFFFFF;border:1px solid #E3E6E1;border-radius:14px}\n.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 20px;border-radius:10px;border:1px solid #CBD2CC;background:#FFFFFF;color:#1B2420;font:inherit;font-size:15px;font-weight:500;text-decoration:none;cursor:pointer;box-sizing:border-box;white-space:nowrap}\n.btn:hover{background:#F1F3F0;color:#1B2420}\n.btn.pri{background:#1F6B4F;border-color:#1F6B4F;color:#FFFFFF}\n.btn.pri:hover{background:#14503A;color:#FFFFFF}\n.btn.ghost{border-color:transparent;color:#1F6B4F}\n.mono{font-family:'IBM Plex Mono',monospace}\n.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap}\n.ok{background:#E6F0EA;color:#14503A}.warn{background:#FFF4E0;color:#7A4700}.bad{background:#FDECEA;color:#A41E14}.info{background:#E8F0FA;color:#1A5598}.mute{background:#EEF0ED;color:#3C4742}\n.chip{display:inline-flex;align-items:center;gap:6px;min-height:42px;padding:0 16px;border-radius:999px;border:1px solid #CBD2CC;background:#FFFFFF;font:inherit;font-size:14px;font-weight:500;color:#3C4742;cursor:pointer}\n.chip.on{background:#1B2420;border-color:#1B2420;color:#FFFFFF}\n.item{display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;padding:18px 22px;border-top:1px solid #EEF0ED}\n.stat{flex:1 1 150px;padding:14px 18px}\n.stat b{display:block;font-size:22px;font-weight:600;font-variant-numeric:tabular-nums;margin-top:2px}\n";

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
constructor(props) {
super(props);
this.state = { filter: 'all', handled: {}, last: null, doneOpen: true };
}
doneVals(items) {
const s = this.state;
const earlier = [
{ word: 'Approved', badge: 'badge ok', title: 'Approved raw lot', code: 'RM-HIB-261020-02', when: '08:50', note: 'Agreed yield 82% locked', link: 'Lot.dc.html' },
{ word: 'Reviewed', badge: 'badge mute', title: '22 kg below agreed yield', code: 'RM-HIB-261015-01', when: '08:15', note: 'Moisture higher than the sample. Supplier informed.', link: 'Supplier.dc.html' }
];
const now = items.filter((i) => s.handled[i.id]).map((i) => {
const w = s.handled[i.id];
return { word: w === 'Check cleared' ? 'Cleared' : w, badge: w === 'Rejected' ? 'badge bad' : w === 'Reviewed' ? 'badge mute' : 'badge ok', title: i.title, code: i.code, when: 'Just now', note: 'By quality manager', link: i.link };
});
const rows = now.concat(earlier);
return {
doneRows: rows, doneCount: rows.length, showDone: s.doneOpen !== false,
doneOpen: s.doneOpen !== false ? 'true' : 'false',
doneToggleText: s.doneOpen !== false ? 'Hide' : 'Show',
toggleDone: () => this.setState({ doneOpen: s.doneOpen === false })
};
}
renderVals() {
const s = this.state;
const items = [
{ id: 1, type: 'approval', kind: 'Approve', badge: 'badge warn', title: 'Approve raw lot', code: 'RM-HIB-261022-01', detail: 'Hibiscus · 1,000 kg · Wadi Green Co-op · moisture 11.2% · agreed 80%', action: 'Approve', done: 'Approved', link: 'Production.dc.html' },
{ id: 2, type: 'approval', kind: 'Approve', badge: 'badge warn', title: 'Approve raw lot', code: 'RM-HIB-261021-02', detail: 'Hibiscus · 850 kg · Sunrise Growers · agreed 82%', warn: 'Moisture 12.6% is above the 12% limit', action: 'Approve', done: 'Approved', link: 'Production.dc.html' },
{ id: 3, type: 'approval', kind: 'Approve', badge: 'badge warn', title: 'Approve raw lot', code: 'RM-MNT-261021-03', detail: 'Mint · 500 kg · Delta Herbs · moisture 10.4% · agreed 78%', action: 'Approve', done: 'Approved', link: 'Production.dc.html' },
{ id: 4, type: 'hold', kind: 'On hold', badge: 'badge bad', title: 'Metal detector failed', code: 'PB-HIB-261021-01', detail: 'Hibiscus · 905 kg · 3.2 kg rejects · re-tested clean', action: 'Clear check', done: 'Check cleared', link: 'Production.dc.html' },
{ id: 5, type: 'yield', kind: 'Yield', badge: 'badge bad', title: '50 kg below agreed yield', code: 'RM-MNT-261020-01', detail: 'Mint · Al-Nour Farm · −6.25% · farmer paid for 800 kg', action: 'Mark reviewed', done: 'Reviewed', link: 'Lot.dc.html' },
{ id: 6, type: 'yield', kind: 'Yield', badge: 'badge bad', title: '42 kg below agreed yield', code: 'RM-HIB-261018-02', detail: 'Hibiscus · Wadi Green Co-op · −2.06%', action: 'Mark reviewed', done: 'Reviewed', link: 'Lot.dc.html' }
];
const open = items.filter((i) => !s.handled[i.id]);
const shown = open.filter((i) => s.filter === 'all' || i.type === s.filter);
const mark = (i, word) => {
const h = { ...s.handled, [i.id]: word };
this.setState({ handled: h, last: { id: i.id, text: word + ' · ' + i.code } });
};
return {
...this.scanVals(),
headline: open.length ? open.length + ' things need your decision' : 'You are all caught up',
openCount: open.length,
filters: [['all', 'All'], ['approval', 'Approvals'], ['hold', 'Holds'], ['yield', 'Yield alerts']].map(([k, label]) => ({
label: label,
count: k === 'all' ? open.length : open.filter((i) => i.type === k).length,
cls: k === s.filter ? 'chip on' : 'chip',
pressed: k === s.filter ? 'true' : 'false',
pick: () => this.setState({ filter: k })
})),
rows: shown.map((i) => ({
...i,
hasWarn: !!i.warn,
isApproval: i.type === 'approval',
act: () => mark(i, i.done),
reject: () => mark(i, 'Rejected')
})),
empty: shown.length === 0,
...this.doneVals(items),
hasToast: !!s.last,
toast: s.last ? s.last.text : '',
undo: () => {
if (!s.last) return;
const h = { ...s.handled };
delete h[s.last.id];
this.setState({ handled: h, last: null });
}
};
}
}

export default class HomeQMPage extends Component {
  template(v) {
    return (<><style>{STYLE}</style>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "minHeight": "900px", "background": "#F6F7F5"}}>{" "}<nav aria-label={"Main"} style={{"flex": "1 1 240px", "background": "#FFFFFF", "borderRight": "1px solid #E3E6E1", "padding": "20px 14px", "boxSizing": "border-box", "display": "flex", "flexDirection": "column", "gap": "4px"}}>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "4px 8px 16px"}}>{" "}<div style={{"width": "36px", "height": "36px", "borderRadius": "9px", "background": "#1F6B4F", "color": "#FFFFFF", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontWeight": "600", "fontSize": "16px"}}>{"M"}</div>{" "}<div style={{"fontWeight": "600", "fontSize": "16px"}}>{"Mawasem"}</div>{" "}</div>{" "}<div style={{"padding": "0 0 14px"}}><label htmlFor={"scan"} style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden", "clip": "rect(0 0 0 0)"}}>{"Search by product code"}</label><div style={{"display": "flex", "alignItems": "center", "gap": "10px", "minHeight": "50px", "padding": "0 12px", "border": "1px solid #CBD2CC", "borderRadius": "10px", "background": "#F6F7F5"}}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"#3C4742"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"} style={{"flex": "none"}}><circle cx={"11"} cy={"11"} r={"6"}></circle><path d={"M20 20l-4.2-4.2"}></path></svg><input id={"scan"} type={"search"} value={v.scanQ} onChange={v.setScan} placeholder={"Product code (HIB, MNT\u2026)"} style={{"flex": "1", "minWidth": "0", "border": "0", "outline": "none", "background": "transparent", "font": "inherit", "fontSize": "14px", "minHeight": "48px", "color": "#1B2420"}} /></div>{(v.scanHit) ? (<><div style={{"marginTop": "8px", "border": "1px solid #D5E5DA", "background": "#F4F8F5", "borderRadius": "10px", "padding": "8px 10px"}}><div style={{"fontSize": "12px", "fontWeight": "600", "color": "#14503A", "marginBottom": "4px"}}>{dcTxt(v.scanHead)}</div>{(v.scanResults || []).map((r, $index) => (<React.Fragment key={$index}><a href={dcHref(r?.link)} style={{"display": "block", "padding": "5px 0", "textDecoration": "none", "color": "#1B2420", "fontSize": "12.5px"}}><span style={{"fontFamily": "'IBM Plex Mono', monospace"}}>{dcTxt(r?.code)}</span>{" "}<span style={{"color": "#5C6862"}}>{"\u00b7 "}{dcTxt(r?.kind)}</span></a></React.Fragment>))}{(v.scanHasMore) ? (<><div style={{"fontSize": "12px", "color": "#5C6862", "paddingTop": "4px"}}>{dcTxt(v.scanMore)}</div></>) : null}</div></>) : null}{(v.scanMiss) ? (<><div role={"status"} style={{"marginTop": "8px", "padding": "10px 12px", "borderRadius": "10px", "background": "#FFF4E0", "color": "#7A4700", "fontSize": "13px"}}>{"No product with that code. Try MNT, HIB or CHM"}</div></>) : null}</div>{" "}<a className={"nv on"} href={dcHref("HomeQM.dc.html")} aria-current={"page"}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"}></path></svg><span style={{"flex": "1"}}>{"Home"}</span><span style={{"fontSize": "12px", "fontWeight": "600", "padding": "1px 8px", "borderRadius": "999px", "background": "#FFFFFF", "color": "#14503A"}}>{dcTxt(v.openCount)}</span></a>{" "}<a className={"nv"} href={dcHref("Receive.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M12 3v12M7 10l5 5 5-5M4 20h16"}></path></svg>{"Receive"}</a>{" "}<a className={"nv"} href={dcHref("Production.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><rect x={"3"} y={"4"} width={"5"} height={"16"} rx={"1"}></rect><rect x={"10"} y={"4"} width={"5"} height={"10"} rx={"1"}></rect><rect x={"17"} y={"4"} width={"4"} height={"13"} rx={"1"}></rect></svg>{"Production"}</a>{" "}<a className={"nv"} href={dcHref("Stock.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 7l9-4 9 4v10l-9 4-9-4z"}></path><path d={"M3 7l9 4 9-4M12 11v10"}></path></svg>{"Stock"}</a>{" "}<a className={"nv"} href={dcHref("Shipments.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}><path d={"M3 6h11v10H3zM14 10h4l3 3v3h-7"}></path><circle cx={"7"} cy={"18"} r={"2"}></circle><circle cx={"17"} cy={"18"} r={"2"}></circle></svg>{"Shipments"}</a>{" "}<a className={"nv"} href={dcHref("Trace.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}><circle cx={"6"} cy={"6"} r={"2.5"}></circle><circle cx={"18"} cy={"12"} r={"2.5"}></circle><circle cx={"6"} cy={"18"} r={"2.5"}></circle><path d={"M8.5 7l7 4M8.5 17l7-4"}></path></svg>{"Trace"}</a>{" "}<a className={"nv"} href={dcHref("Reports.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"}><path d={"M5 20V11M11 20V5M17 20v-7M3 20h18"}></path></svg>{"Reports"}</a><a className={"nv"} href={dcHref("MasterData.dc.html")}><svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} strokeLinejoin={"round"} aria-hidden={"true"}><ellipse cx={"12"} cy={"6"} rx={"8"} ry={"3"}></ellipse><path d={"M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"}></path></svg>{"Master data"}</a>{" "}<div style={{"flexGrow": "1", "minHeight": "24px"}}></div>{" "}<div style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "14px 8px 4px", "borderTop": "1px solid #E3E6E1"}}>{" "}<div style={{"width": "34px", "height": "34px", "borderRadius": "999px", "background": "#E6F0EA", "color": "#14503A", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "12px", "fontWeight": "600"}}>{"QM"}</div>{" "}<div style={{"flex": "1", "minWidth": "0"}}>{" "}<div style={{"fontSize": "14px", "fontWeight": "500"}}>{"Quality manager"}</div>{" "}<a href={dcHref("HomeIM.dc.html")} style={{"fontSize": "12px"}}>{"Switch to inventory manager"}</a>{" "}</div>{" "}{" "}</div>{" "}</nav>{" "}<main style={{"flex": "999 1 560px", "minWidth": "0", "padding": "32px 36px 48px", "boxSizing": "border-box"}}>{" "}<div style={{"maxWidth": "1000px", "margin": "0 auto", "display": "flex", "flexDirection": "column", "gap": "22px"}}>{" "}<header style={{"display": "flex", "flexWrap": "wrap", "gap": "16px", "alignItems": "flex-end", "justifyContent": "space-between"}}>{" "}<div>{" "}<div style={{"fontSize": "14px", "color": "#5C6862"}}>{"Thursday, 22 October"}</div>{" "}<h1 style={{"margin": "4px 0 0", "fontSize": "30px", "fontWeight": "600"}}>{dcTxt(v.headline)}</h1>{" "}</div>{" "}<a className={"btn"} href={dcHref("Production.dc.html")}>{"Open production board"}</a>{" "}</header>{" "}<section className={"card"} aria-label={"Stock now"} style={{"display": "flex", "flexWrap": "wrap"}}>{" "}<div className={"stat"}><span style={{"fontSize": "13px", "color": "#5C6862"}}>{"Raw stock"}</span><b>{"12,480 kg"}</b></div>{" "}<div className={"stat"} style={{"borderLeft": "1px solid #EEF0ED"}}><span style={{"fontSize": "13px", "color": "#5C6862"}}>{"In production"}</span><b>{"3,150 kg"}</b></div>{" "}<div className={"stat"} style={{"borderLeft": "1px solid #EEF0ED"}}><span style={{"fontSize": "13px", "color": "#5C6862"}}>{"Finished stock"}</span><b>{"9,860 kg"}</b></div>{" "}<div className={"stat"} style={{"borderLeft": "1px solid #EEF0ED"}}><span style={{"fontSize": "13px", "color": "#5C6862"}}>{"Shipping this week"}</span><b>{"2,050 kg"}</b></div>{" "}</section>{" "}{(v.hasToast) ? (<>{" "}<div role={"status"} style={{"display": "flex", "flexWrap": "wrap", "gap": "12px", "alignItems": "center", "justifyContent": "space-between", "padding": "12px 16px", "borderRadius": "10px", "background": "#1B2420", "color": "#FFFFFF", "fontSize": "14px"}}><span>{dcTxt(v.toast)}</span><button type={"button"} onClick={v.undo} style={{"border": "0", "background": "transparent", "color": "#9FD3B5", "font": "inherit", "fontWeight": "600", "cursor": "pointer", "minHeight": "36px"}}>{"Undo"}</button></div>{" "}</>) : null}{" "}<section className={"card"} aria-labelledby={"ib"} style={{"minWidth": "0"}}>{" "}<div style={{"display": "flex", "flexWrap": "wrap", "gap": "12px", "alignItems": "center", "justifyContent": "space-between", "padding": "18px 22px"}}>{" "}<h2 id={"ib"} style={{"margin": "0", "fontSize": "18px", "fontWeight": "600"}}>{"Needs your decision"}</h2>{" "}<div role={"group"} aria-label={"Filter"} style={{"display": "flex", "flexWrap": "wrap", "gap": "8px"}}>{" "}{(v.filters || []).map((f, $index) => (<React.Fragment key={$index}>{" "}<button type={"button"} className={f?.cls} aria-pressed={f?.pressed} onClick={f?.pick}>{dcTxt(f?.label)}{" "}<span style={{"opacity": "0.75"}}>{dcTxt(f?.count)}</span></button>{" "}</React.Fragment>))}{" "}</div>{" "}</div>{" "}{(v.empty) ? (<>{" "}<div style={{"padding": "44px 20px", "textAlign": "center", "borderTop": "1px solid #EEF0ED"}}><div style={{"fontSize": "18px", "fontWeight": "600"}}>{"All clear"}</div><div style={{"fontSize": "15px", "color": "#5C6862", "marginTop": "6px"}}>{"Nothing is waiting for you here."}</div></div>{" "}</>) : null}{" "}{(v.rows || []).map((r, $index) => (<React.Fragment key={$index}>{" "}<div className={"item"}>{" "}<span className={r?.badge} style={{"width": "96px", "justifyContent": "center"}}>{dcTxt(r?.kind)}</span>{" "}<div style={{"flex": "1 1 320px", "minWidth": "0"}}>{" "}<div style={{"fontSize": "16px", "fontWeight": "600"}}>{dcTxt(r?.title)}</div>{" "}<div style={{"fontSize": "14px", "color": "#3C4742", "marginTop": "2px"}}><span className={"mono"}>{dcTxt(r?.code)}</span>{" \u00b7 "}{dcTxt(r?.detail)}</div>{" "}{(r?.hasWarn) ? (<><div style={{"fontSize": "13px", "color": "#7A4700", "marginTop": "4px", "fontWeight": "500"}}>{dcTxt(r?.warn)}</div></>) : null}{" "}</div>{" "}<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap", "alignItems": "center"}}>{" "}<a className={"btn ghost"} href={dcHref(r?.link)}>{"Details"}</a>{" "}{(r?.isApproval) ? (<><button className={"btn"} type={"button"} onClick={r?.reject}>{"Reject"}</button></>) : null}{" "}<button className={"btn pri"} type={"button"} onClick={r?.act}>{dcTxt(r?.action)}</button>{" "}</div>{" "}</div>{" "}</React.Fragment>))}{" "}</section>{" "}<section className={"card"} aria-labelledby={"dn"} style={{"minWidth": "0"}}>{" "}<button type={"button"} onClick={v.toggleDone} aria-expanded={v.doneOpen} style={{"width": "100%", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "10px", "padding": "18px 22px", "border": "0", "background": "transparent", "font": "inherit", "color": "#1B2420", "cursor": "pointer", "textAlign": "left"}}>{" "}<span id={"dn"} style={{"fontSize": "17px", "fontWeight": "600"}}>{"Handled today "}<span style={{"fontSize": "14px", "color": "#5C6862", "fontWeight": "500"}}>{dcTxt(v.doneCount)}</span></span>{" "}<span style={{"fontSize": "14px", "color": "#1F6B4F", "fontWeight": "500"}}>{dcTxt(v.doneToggleText)}</span>{" "}</button>{" "}{(v.showDone) ? (<>{" "}{(v.doneRows || []).map((d, $index) => (<React.Fragment key={$index}>{" "}<div className={"item"}><span className={d?.badge} style={{"width": "96px", "justifyContent": "center"}}>{dcTxt(d?.word)}</span><div style={{"flex": "1 1 320px", "minWidth": "0"}}><div style={{"fontSize": "15px", "fontWeight": "600"}}>{dcTxt(d?.title)}</div><div style={{"fontSize": "14px", "color": "#3C4742"}}><span className={"mono"}>{dcTxt(d?.code)}</span>{" \u00b7 "}{dcTxt(d?.when)}{" \u00b7 "}{dcTxt(d?.note)}</div></div><a className={"btn ghost"} href={dcHref(d?.link)}>{"Open"}</a></div>{" "}</React.Fragment>))}{" "}</>) : null}{" "}</section>{" "}</div>{" "}</main>{" "}</div>{" "}</>);
  }
}
