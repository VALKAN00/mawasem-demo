import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l, L } from '../lib/app';
import { useStore, useNames, nameL, Fin } from '../lib/store';

export const title = 'Trace';

type Kind = 'supplier' | 'raw' | 'batch' | 'byproduct' | 'fg' | 'blend' | 'shipment';

const KIND: Record<Kind, { one: L; many: L; badge: string }> = {
  supplier: { one: l('Supplier', 'مورد'), many: l('suppliers', 'موردين'), badge: 'mute' },
  raw: { one: l('Raw lot', 'دفعة خام'), many: l('raw lots', 'دفعات خام'), badge: 'ok' },
  batch: { one: l('Batch', 'دفعة تشغيل'), many: l('batches', 'دفعات تشغيل'), badge: 'info' },
  byproduct: { one: l('By-product', 'منتج ثانوي'), many: l('by-products', 'منتجات ثانوية'), badge: 'warn' },
  fg: { one: l('Finished lot', 'دفعة نهائية'), many: l('finished lots', 'دفعات نهائية'), badge: 'ok' },
  blend: { one: l('Blend', 'خلطة'), many: l('blends', 'خلطات'), badge: 'info' },
  shipment: { one: l('Shipment', 'شحنة'), many: l('shipments', 'شحنات'), badge: 'info' },
};

interface Node { kind: Kind; name?: L; kg?: number; where: L; href?: string }
/** History from before the system: lots whose lineage is not in the store. Live lots override these. */
const STATIC_NODES: Record<string, Node> = {
  'SUP:AL-NOUR-F7': { kind: 'supplier', name: l('Al-Nour Farm · Field 7', 'مزرعة النور · الحقل 7'), where: l('Conventional', 'تقليدي') },
  'SUP:DELTA-F1': { kind: 'supplier', name: l('Delta Herbs · Field 1', 'أعشاب الدلتا · الحقل 1'), where: l('Conventional', 'تقليدي') },
  'RM-MNT-261020-01': { kind: 'raw', kg: 1000, where: l('Fully processed', 'تمت معالجتها بالكامل'), href: '#/Lot' },
  'RM-CHM-261016-02': { kind: 'raw', kg: 800, where: l('Fully processed', 'تمت معالجتها بالكامل'), href: '#/Lot' },
  'PB-MNT-261021-01': { kind: 'batch', kg: 600, where: l('Completed', 'مكتملة'), href: '#/LotBatch' },
  'PB-MNT-261021-02': { kind: 'batch', kg: 400, where: l('Completed', 'مكتملة'), href: '#/LotBatch' },
  'PB-CHM-261018-01': { kind: 'batch', kg: 800, where: l('Completed', 'مكتملة'), href: '#/LotBatch' },
  'BP-RESIDUE': { kind: 'byproduct', name: l('Sieving residue', 'مخلفات التنخيل'), kg: 95, where: l('Sold 21/10', 'بيعت 21/10') },
  'BP-FINES': { kind: 'byproduct', name: l('Fines', 'المسحوق الناعم'), kg: 45, where: l('In the by-product store', 'في مخزن المنتجات الثانوية') },
  'FG-MNT-261022-01': { kind: 'fg', kg: 450, where: l('Loading bay', 'منصة التحميل'), href: '#/LotFinished' },
  'FG-MNT-261022-02': { kind: 'fg', kg: 300, where: l('Used in a blend', 'استُخدمت في خلطة'), href: '#/LotFinished' },
  'FG-CHM-261019-03': { kind: 'fg', kg: 450, where: l('Rack 04', 'رف 04'), href: '#/LotFinished' },
  'BL-MNT-261023-01': { kind: 'blend', kg: 500, where: l('Rack 04', 'رف 04'), href: '#/LotBlend' },
  'SH-261025-01': { kind: 'shipment', kg: 450, where: l('Verde Herbal Co. · loading', 'فيردي هيربال · قيد التحميل'), href: '#/Shipments' },
  'SH-261028-02': { kind: 'shipment', kg: 500, where: l('Northfield Teas · planned', 'نورثفيلد تي · مخطط'), href: '#/Shipments' },
};
/** from → to */
const STATIC_EDGES: [string, string][] = [
  ['SUP:AL-NOUR-F7', 'RM-MNT-261020-01'], ['SUP:DELTA-F1', 'RM-CHM-261016-02'],
  ['RM-MNT-261020-01', 'PB-MNT-261021-01'], ['RM-MNT-261020-01', 'PB-MNT-261021-02'], ['RM-CHM-261016-02', 'PB-CHM-261018-01'],
  ['PB-MNT-261021-01', 'FG-MNT-261022-01'], ['PB-MNT-261021-01', 'BP-RESIDUE'], ['PB-MNT-261021-01', 'BP-FINES'],
  ['PB-MNT-261021-02', 'FG-MNT-261022-02'], ['PB-MNT-261021-02', 'BP-RESIDUE'], ['PB-MNT-261021-02', 'BP-FINES'],
  ['PB-CHM-261018-01', 'FG-CHM-261019-03'],
  ['FG-MNT-261022-02', 'BL-MNT-261023-01'], ['FG-CHM-261019-03', 'BL-MNT-261023-01'],
  ['FG-MNT-261022-01', 'SH-261025-01'], ['BL-MNT-261023-01', 'SH-261028-02'],
];

/** Breadth-first walk. Returns every record reached with its distance from the start. */
function walk(edges: [string, string][], start: string, forward: boolean): { id: string; level: number }[] {
  const out: { id: string; level: number }[] = [];
  const seen = new Set([start]);
  let frontier = [start];
  for (let level = 1; frontier.length && level < 10; level++) {
    const next: string[] = [];
    edges.forEach(([a, b]) => {
      const from = forward ? a : b;
      const to = forward ? b : a;
      if (frontier.includes(from) && !seen.has(to)) { seen.add(to); next.push(to); out.push({ id: to, level }); }
    });
    frontier = next;
  }
  return out;
}

const EXAMPLES = ['RM-MNT-261020-01', 'PB-HIB-261021-01', 'BL-MNT-261023-01'];
const hrefFor = (id: string) => (id.startsWith('SUP:') || id.startsWith('BP-') ? undefined : id.startsWith('SH-') ? '#/Shipments' : `#/Lot?code=${id}`);
const fmt = (n: number) => n.toLocaleString('en-US');
const initialCode = () => {
  const q = (window.location.hash.split('?')[1] || '');
  return new URLSearchParams(q).get('code') || '';
};

export default function Trace() {
  const { t, x, lang } = useApp();
  const store = useStore();
  const { locL, custL, supL } = useNames();
  const { nodes: NODES, edges: EDGES } = liveGraph(store, locL, custL, supL);
  const [input, setInput] = useState(initialCode);
  const [code, setCode] = useState(() => initialCode().trim().toUpperCase());
  const node = NODES[code];
  const label = (id: string) => (NODES[id].name ? x(NODES[id].name) : id);

  const before = node ? walk(EDGES, code, false).sort((a, b) => b.level - a.level) : [];
  const after = node ? walk(EDGES, code, true) : [];
  const maxBefore = before.length ? before[0].level : 0;

  const summary = (list: { id: string }[]) => {
    const kinds = Object.keys(KIND) as Kind[];
    return kinds.map((k) => {
      const n = list.filter((r) => NODES[r.id].kind === k).length;
      return n ? `${n} ${x(n === 1 ? KIND[k].one : KIND[k].many).toLowerCase()}` : '';
    }).filter(Boolean).join(' · ') || t('nothing', 'لا شيء');
  };

  const exportCsv = () => {
    const rows: string[][] = [[t('Section', 'القسم'), t('Code', 'الرقم'), t('Type', 'النوع'), t('kg', 'كجم'), t('Where it is now', 'أين هي الآن')]];
    const add = (section: string, id: string) => rows.push([section, label(id), x(KIND[NODES[id].kind].one), NODES[id].kg === undefined ? '' : String(NODES[id].kg), x(NODES[id].where)]);
    before.forEach((r) => add(t('Came from', 'جاءت من'), r.id));
    add(t('Searched', 'المطلوبة'), code);
    after.forEach((r) => add(t('Went to', 'ذهبت إلى'), r.id));
    const csv = '﻿' + rows.map((r) => r.map((c) => '"' + c.replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `trace-${code}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const run = (v: string) => { setInput(v); setCode(v.trim().toUpperCase()); };

  const row = (id: string, indent: number, current = false) => {
    const n = NODES[id];
    return (
      <div key={id + (current ? '*' : '')} className={'m-tr' + (current ? ' held' : '')} style={current ? { background: '#F4F8F5' } : undefined}>
        <span className="m-td w" style={{ paddingInlineStart: 12 + indent * 20 }}>
          {indent > 0 ? <span aria-hidden="true" className="m-muted">{lang === 'ar' ? '↲ ' : '↳ '}</span> : null}
          {hrefFor(id) ? <a className="mono" href={hrefFor(id)}>{label(id)}</a> : <span className={n.name ? '' : 'mono'}>{label(id)}</span>}
        </span>
        <span className="m-td"><span className={'m-badge ' + KIND[n.kind].badge}>{x(KIND[n.kind].one)}</span></span>
        <span className="m-td n">{n.kg === undefined ? '—' : fmt(n.kg)}</span>
        <span className="m-td w">{x(n.where)}</span>
      </div>
    );
  };
  const header = (text: string, sum: string) => (
    <div className="m-tr h" style={{ minHeight: 44, background: '#F1F3F0' }}>
      <span className="m-td w" style={{ fontSize: 13, fontWeight: 600, color: '#1B2420' }}>{text}</span>
      <span className="m-td" style={{ flex: '3 1 0', color: '#5C6862', fontWeight: 400, fontSize: 13 }}>{sum}</span>
    </div>
  );

  return (
    <Shell
      active="Trace"
      title={t('Trace', 'التتبع')}
      subtitle={t('Scan or type a lot, batch, blend or shipment code to see where it came from and where it went.', 'امسح أو اكتب رقم دفعة أو دفعة تشغيل أو خلطة أو شحنة لمعرفة مصدرها ووجهتها.')}
      actions={node ? <button type="button" className="m-btn" onClick={exportCsv}>{t('Export to Excel', 'تصدير إلى إكسل')}</button> : null}
    >
      <form className="m-card" style={{ padding: 18, display: 'flex', flexWrap: 'wrap', gap: 12 }} onSubmit={(e) => { e.preventDefault(); run(input); }}>
        <div className="m-fl" style={{ flex: '1 1 320px' }}>
          <label htmlFor="trace-code">{t('Code', 'الرقم')}</label>
          <input id="trace-code" className="mono" list="trace-codes" autoFocus autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t('RM-, PB-, FG-, BL- or SH- code', 'رقم يبدأ بـ RM- أو PB- أو FG- أو BL- أو SH-')} />
          <datalist id="trace-codes">{Object.keys(NODES).filter((k) => !k.startsWith('SUP:') && !k.startsWith('BP-')).map((k) => <option key={k} value={k} />)}</datalist>
        </div>
        <button type="submit" className="m-btn pri" style={{ alignSelf: 'flex-end', minHeight: 50 }}>{t('Trace', 'تتبع')}</button>
      </form>

      {!code ? (
        <div className="m-card m-empty" style={{ border: '1px solid #E3E6E1' }}>
          {t('Try one:', 'جرّب أحدها:')}{' '}
          {EXAMPLES.map((c) => <button key={c} type="button" className="m-btn sm mono" style={{ marginInline: 4 }} onClick={() => run(c)}>{c}</button>)}
        </div>
      ) : !node || code.startsWith('SUP:') || code.startsWith('BP-') ? (
        <div className="m-note warn">{t(`No record matches ${code}. Check the code and try again.`, `لا يوجد سجل مطابق لـ ${code}. تحقق من الرقم وحاول مرة أخرى.`)}</div>
      ) : (
        <section className="m-card">
          <div className="m-tbl"><div>
            <div className="m-tr h">
              <span className="m-td w">{t('Record', 'السجل')}</span>
              <span className="m-td">{t('Type', 'النوع')}</span>
              <span className="m-td n">{t('kg', 'كجم')}</span>
              <span className="m-td w">{t('Where it is now', 'أين هي الآن')}</span>
            </div>
            {before.length ? header(t('Came from', 'جاءت من'), summary(before)) : null}
            {before.map((r) => row(r.id, maxBefore - r.level))}
            {header(t('Searched', 'المطلوبة'), '')}
            {row(code, 0, true)}
            {header(t('Went to', 'ذهبت إلى'), after.length ? summary(after) : t('nothing yet', 'لا شيء بعد'))}
            {after.map((r) => row(r.id, r.level))}
          </div></div>
        </section>
      )}
    </Shell>
  );
}

/**
 * The trace graph: the history above plus everything the store knows (raw lot → batch → finished lot or blend → shipment).
 * Live records replace the history for the same code. Supplier links of live raw lots come from the store.
 */
function liveGraph(st: ReturnType<typeof useStore>, locL: (id: string) => L, custL: (id: string) => L, supL: (id: string) => L) {
  const nodes: Record<string, Node> = { ...STATIC_NODES };
  const edges = new Map<string, [string, string]>();
  const add = (a: string, b: string) => edges.set(a + '>' + b, [a, b]);
  const liveRaw = new Set(st.raws.map((r) => r.id));
  STATIC_EDGES.forEach(([a, b]) => { if (!(a.startsWith('SUP:') && liveRaw.has(b))) add(a, b); });

  const rawWhere = { wait: l('Waiting approval', 'بانتظار الاعتماد'), ready: l('Approved, not started', 'معتمدة ولم تبدأ'), used: l('Processed', 'تمت معالجتها'), rejected: l('Rejected', 'مرفوضة') };
  st.raws.forEach((r) => {
    const sup = st.suppliers.find((o) => o.id === r.supplier);
    const field = sup && sup.fields.find((f) => f.id === r.field);
    const sid = field ? `SUP:${r.supplier}:${field.id}` : `SUP:${r.supplier}`;
    nodes[sid] = { kind: 'supplier', name: field ? l(`${supL(r.supplier).en} · ${field.name}`, `${supL(r.supplier).ar} · ${field.ar || field.name}`) : supL(r.supplier), where: r.organic ? l('Organic', 'عضوي') : l('Conventional', 'تقليدي') };
    nodes[r.id] = { kind: 'raw', kg: r.kg, where: rawWhere[r.status] };
    add(sid, r.id);
  });
  st.batches.forEach((b) => {
    nodes[b.id] = { kind: 'batch', kg: b.kgIn, where: b.closed ? (b.rejected ? l('Rejected', 'مرفوضة') : l('Completed', 'مكتملة')) : b.held ? l('On hold', 'موقوفة') : l('In process', 'قيد التشغيل') };
    b.sources.forEach((o) => add(o.raw, b.id));
    if (b.by > 0) {
      nodes['BP-' + b.id] = { kind: 'byproduct', name: l(`By-products of ${b.id}`, `منتجات ثانوية لـ ${b.id}`), kg: b.by, where: l('In the by-product store', 'في مخزن المنتجات الثانوية') };
      add(b.id, 'BP-' + b.id);
    }
  });
  st.fins.forEach((f: Fin) => {
    nodes[f.code] = { kind: f.code.startsWith('BL-') ? 'blend' : 'fg', kg: f.kg, where: locL(f.loc) };
    if (f.batch) add(f.batch, f.code);
    (f.recipe || []).forEach((o) => add(o.code, f.code));
  });
  st.ships.forEach((sh) => {
    nodes[sh.id] = { kind: 'shipment', kg: sh.lines.reduce((a, r) => a + r.net, 0), where: l(`${custL(sh.customer).en} · ${sh.shipped ? 'shipped' : 'open'}`, `${custL(sh.customer).ar} · ${sh.shipped ? 'تم الشحن' : 'مفتوحة'}`) };
    sh.lines.forEach((r) => add(r.lot, sh.id));
  });
  return { nodes, edges: Array.from(edges.values()) };
}
