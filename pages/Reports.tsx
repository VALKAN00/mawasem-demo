import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l, L } from '../lib/app';
import { useStore, useNames, rawSummary } from '../lib/store';

export const title = 'Reports';

type Tab = 'stock' | 'yield' | 'sup' | 'mass' | 'audit';
const fmt = (n: number) => Number(n).toLocaleString('en-US');
const pct = (v: number) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(2) + '%';

/** Completed lots. Expected = raw kg × agreed rate. */
const YIELD = [
  { code: 'RM-MNT-261020-01', sup: 'nour', expected: 800, actual: 750 },
  { code: 'RM-HIB-261018-02', sup: 'wadi', expected: 2040, actual: 1998 },
  { code: 'RM-HIB-261015-01', sup: 'nour', expected: 1512, actual: 1490 },
  { code: 'RM-CHM-261012-01', sup: 'delta', expected: 1185, actual: 1201 },
];
const SUPPLIERS = [['nour', 6, -2.08, 3], ['wadi', 5, -0.54, 1], ['sunrise', 3, -0.42, 1], ['delta', 4, 0.78, 0]] as const;
/** History from before the system. Waste and unexplained loss are one figure, as they are for live lots. */
const MASS = [
  { code: 'RM-MNT-261020-01', input: 1000, fin: 750, by: 140, waste: 110, proc: 0 },
  { code: 'RM-HIB-261018-02', input: 2400, fin: 1998, by: 240, waste: 162, proc: 0 },
  { code: 'RM-CHM-261012-01', input: 1500, fin: 1201, by: 180, waste: 119, proc: 0 },
];

/** The quality manager's reports. Open yield alerts are on the Approvals page. */
export default function Reports() {
  const { t, x, role } = useApp();
  const { raws, batches, fins, alerts, products, audit, threshold, suppliers } = useStore();
  const { prodL, supL } = useNames();
  const [tab, setTab] = useState<Tab>('stock');

  if (role !== 'qm') {
    return <Shell active="Reports" title={t('Reports', 'التقارير')}><div className="m-note warn">{t('Reports are for the quality manager. Switch role to continue.', 'التقارير لمدير الجودة. بدّل الدور للمتابعة.')}</div></Shell>;
  }

  const stockRows = products.map((o) => o.id).map((pc) => ({
    name: prodL(pc),
    raw: raws.filter((r) => r.pc === pc && (r.status === 'wait' || r.status === 'ready')).reduce((s, r) => s + r.kg, 0),
    proc: batches.filter((b) => b.pc === pc && !b.closed).reduce((s, b) => s + b.kg, 0),
    fin: fins.filter((f) => f.pc === pc).reduce((s, f) => s + f.kg, 0),
  }));
  const sums = raws.map((r) => ({ r, s: rawSummary(r, batches) }));
  const liveDone = sums.filter((o) => o.s.complete);
  const liveCodes = new Set(sums.filter((o) => o.s.started).map((o) => o.r.id));
  const alertFor = (code: string): { label: L; tone: string } => {
    const a = alerts.find((o) => o.code === code);
    return !a ? { label: l('None', 'لا يوجد'), tone: '' } : a.reviewed ? { label: l('Reviewed', 'تمت المراجعة'), tone: 'mute' } : { label: l('Open', 'مفتوح'), tone: 'bad' };
  };

  // each tab describes itself once; the table and the Excel export both read from it
  const kgH = t('kg', 'كجم');
  const sheets: Record<Tab, { head: string[]; rows: { cells: (string | React.ReactNode)[]; csv: string[]; tone?: string[] }[]; note?: string }> = {
    audit: {
      head: [t('When', 'الوقت'), t('What', 'ماذا'), t('Who', 'من')],
      rows: audit.map((a) => ({
        cells: [a.when, <span>{x(a.what)}{a.reason ? <div className="m-muted" style={{ fontSize: 13 }}>{t('Reason', 'السبب')}: {x(a.reason)}</div> : null}</span>, a.who === 'QM' ? t('Quality manager', 'مدير الجودة') : a.who === 'IM' ? t('Inventory manager', 'مدير المخزون') : t('System', 'النظام')],
        csv: [a.when, x(a.what) + (a.reason ? ' (' + x(a.reason) + ')' : ''), a.who],
      })),
      note: t('Every create, edit and approval, with user and time.', 'كل إنشاء وتعديل واعتماد، مع المستخدم والوقت.'),
    },
    stock: {
      head: [t('Product', 'المنتج'), t('Raw', 'الخام') + ' ' + kgH, t('In production', 'قيد التشغيل') + ' ' + kgH, t('Finished', 'النهائي') + ' ' + kgH],
      rows: stockRows.map((r) => ({ cells: [x(r.name), fmt(r.raw), fmt(r.proc), fmt(r.fin)], csv: [x(r.name), String(r.raw), String(r.proc), String(r.fin)] })),
      note: t('Live stock from the lots in the system. Approved and waiting raw lots are counted as raw.', 'المخزون الحالي من الدفعات في النظام. تُحسب الدفعات الخام المعتمدة وتلك بانتظار الاعتماد ضمن الخام.'),
    },
    yield: {
      head: [t('Raw lot', 'الدفعة الخام'), t('Supplier', 'المورد'), t('Expected', 'المتوقع') + ' ' + kgH, t('Actual', 'الفعلي') + ' ' + kgH, t('Variance', 'الفرق'), t('Alert', 'التنبيه')],
      rows: [
        ...liveDone.map((o) => ({ code: o.r.id, sup: o.r.supplier, expected: o.s.expected, actual: o.s.fin })),
        ...YIELD.filter((r) => !liveDone.some((o) => o.r.id === r.code)),
      ].map((r) => {
        const v = ((r.actual - r.expected) / r.expected) * 100;
        const a = alertFor(r.code);
        return {
          cells: [<a className="mono" href={`#/Lot?code=${r.code}`}>{r.code}</a>, x(supL(r.sup)), fmt(r.expected), fmt(r.actual), <span style={{ color: -v > threshold ? '#A41E14' : '#14503A' }}>{pct(v)}</span>, a.tone ? <span className={'m-badge ' + a.tone}>{x(a.label)}</span> : x(a.label)],
          csv: [r.code, x(supL(r.sup)), String(r.expected), String(r.actual), pct(v), x(a.label)],
        };
      }),
      note: t('Actual against agreed yield, all completed lots. A negative variance raises an alert.', 'الفعلي مقابل الإنتاجية المتفق عليها لكل الدفعات المكتملة. الفرق السالب يرفع تنبيهاً.'),
    },
    sup: {
      head: [t('Supplier', 'المورد'), t('Lots', 'الدفعات'), t('Average variance', 'متوسط الفرق'), t('Alerts', 'التنبيهات')],
      rows: suppliers.map((sp) => {
        const h = SUPPLIERS.find((q) => q[0] === sp.id);
        const mine = liveDone.filter((o) => o.r.supplier === sp.id);
        const lots = (h ? h[1] : 0) + mine.length;
        const avg = lots ? ((h ? h[1] * h[2] : 0) + mine.reduce((a, o) => a + o.s.pct, 0)) / lots : 0;
        const al = (h ? h[3] : 0) + alerts.filter((a) => mine.some((o) => o.r.id === a.code)).length;
        return {
          cells: [x(supL(sp.id)), String(lots), lots ? <span style={{ color: -avg > threshold ? '#A41E14' : '#14503A', fontWeight: 600 }}>{pct(avg)}</span> : '—', String(al)],
          csv: [x(supL(sp.id)), String(lots), lots ? pct(avg) : '', String(al)],
        };
      }),
      note: t('Yield history per supplier: average of actual against agreed yield.', 'سجل الإنتاجية لكل مورد: متوسط الفعلي مقابل المتفق عليه.'),
    },
    mass: {
      head: [t('Raw lot', 'الدفعة الخام'), t('Input', 'الداخل'), t('Finished', 'النهائي'), t('By-products', 'المنتجات الثانوية'), t('Waste and loss', 'فاقد وهدر'), t('In process or stock', 'قيد التشغيل أو المخزون')],
      rows: [
        ...sums.filter((o) => o.s.started).map((o) => ({ code: o.r.id, input: o.r.kg, fin: o.s.fin, by: o.s.by, waste: o.s.waste, proc: Math.round((o.s.proc + o.s.stock) * 10) / 10 })),
        ...MASS.filter((r) => !liveCodes.has(r.code)),
      ].map((r) => ({
        cells: [<a className="mono" href={`#/Lot?code=${r.code}`}>{r.code}</a>, fmt(r.input), fmt(r.fin), fmt(r.by), fmt(r.waste), fmt(r.proc)],
        csv: [r.code, String(r.input), String(r.fin), String(r.by), String(r.waste), String(r.proc)],
      })),
      note: t('Input = finished + by-products + waste and loss + what is still in process or stock. Only kg out and by-product are recorded per step, so waste and unexplained loss are one figure.', 'الداخل = النهائي + المنتجات الثانوية + الفاقد والهدر + ما لا يزال قيد التشغيل أو في المخزون. يُسجَّل لكل مرحلة الخارج والمنتج الثانوي فقط، لذا يظهر الفاقد والهدر غير المفسَّر كرقم واحد.'),
    },
  };
  const sheet = sheets[tab];

  const exportCsv = () => {
    const csv = '﻿' + [sheet.head, ...sheet.rows.map((r) => r.csv)].map((r) => r.map((c) => '"' + c.replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const el = document.createElement('a');
    el.href = url; el.download = `report-${tab}.csv`; el.click();
    URL.revokeObjectURL(url);
  };

  const tabs: [Tab, string][] = [['stock', t('Stock', 'المخزون')], ['yield', t('Yield by lot', 'الإنتاجية لكل دفعة')], ['sup', t('Suppliers', 'الموردون')], ['mass', t('Mass balance', 'ميزان الكتلة')], ['audit', t('Audit log', 'سجل التدقيق')]];

  return (
    <Shell
      active="Reports"
      title={t('Reports', 'التقارير')}
      subtitle={t('Open alerts are on the Approvals page.', 'التنبيهات المفتوحة في صفحة الاعتمادات.')}
      actions={<button type="button" className="m-btn" onClick={exportCsv}>{t('Export to Excel', 'تصدير إلى إكسل')}</button>}
    >
      <section className="m-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '16px 22px' }} role="group" aria-label={t('Report', 'التقرير')}>
          {tabs.map(([k, label]) => <button key={k} type="button" className={'m-btn sm' + (tab === k ? ' pri' : '')} aria-pressed={tab === k} onClick={() => setTab(k)}>{label}</button>)}
        </div>
        <div className="m-tbl"><div>
          <div className="m-tr h">
            {sheet.head.map((h, i) => <span key={i} className={'m-td' + (i === 0 ? ' w' : tab !== 'audit' && (i > 1 || tab === 'stock' || tab === 'mass') ? ' n' : tab === 'audit' && i === 1 ? ' w' : '')}>{h}</span>)}
          </div>
          {sheet.rows.map((r, ri) => (
            <div key={ri} className="m-tr">
              {r.cells.map((c, i) => <span key={i} className={'m-td' + (i === 0 ? ' w' : tab !== 'audit' && (i > 1 || tab === 'stock' || tab === 'mass') && !(tab === 'yield' && i === 5) ? ' n' : '')}>{c}</span>)}
            </div>
          ))}
        </div></div>
        {sheet.note ? <div className="m-pad m-muted" style={{ fontSize: 13, paddingTop: 12 }}>{sheet.note}</div> : null}
      </section>
    </Shell>
  );
}
