import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l, L } from '../lib/app';
import { ImportPanel } from '../lib/ImportPanel';
import { useStore, useNames, PP25, Fin } from '../lib/store';

export const title = 'Stock';

const fmt = (n: number) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
const num = (s: string) => Number(s) || 0;

interface Row { code: string; href: string; product: L; where: L; organic: boolean; kg: number; statusLabel: L; tone: string; fin?: Fin }

const RAW_STATUS: Record<string, { label: L; tone: string }> = {
  wait: { label: l('Waiting approval', 'بانتظار الاعتماد'), tone: 'warn' },
  ready: { label: l('Ready', 'جاهزة'), tone: 'ok' },
  rejected: { label: l('Rejected', 'مرفوضة'), tone: 'bad' },
  used: { label: l('Fully used', 'مستخدمة بالكامل'), tone: 'mute' },
};

export default function Stock() {
  const { t, x, role } = useApp();
  const { raws, batches, ships, fins, setFins, locs, log } = useStore();
  const { prodL, supL, locL } = useNames();
  const [tab, setTab] = useState<'fin' | 'raw'>('fin');
  const [q, setQ] = useState('');
  const [showClosed, setShowClosed] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [blendOpen, setBlendOpen] = useState(false);
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [pctA, setPctA] = useState('60');
  const [outKg, setOutKg] = useState('');
  const [seq, setSeq] = useState(1);

  const allocated = new Map<string, string>();
  ships.filter((s) => !s.shipped).forEach((s) => s.lines.forEach((r) => allocated.set(r.lot, s.id)));

  // ---- rows. Fully used and rejected raw lots are hidden unless asked for: stock is what you have, not what is gone.
  const rawRows: Row[] = raws
    .filter((r) => showClosed || (r.status !== 'used' && r.status !== 'rejected'))
    .map((r) => ({
      code: r.id, href: `#/Lot?code=${r.id}`, product: prodL(r.pc), where: l(`${supL(r.supplier).en} · Raw store A`, `${supL(r.supplier).ar} · مخزن الخام أ`),
      organic: r.organic, kg: r.status === 'used' ? 0 : r.kg, statusLabel: RAW_STATUS[r.status].label, tone: RAW_STATUS[r.status].tone,
    }));
  const finRows: Row[] = fins.map((f) => {
    const sh = allocated.get(f.code);
    return { code: f.code, href: `#/Lot?code=${f.code}`, product: f.product, where: locL(f.loc), organic: f.organic, kg: f.kg, statusLabel: sh ? l(`For ${sh}`, `للشحنة ${sh}`) : l('Available', 'متاحة'), tone: sh ? 'info' : 'ok', fin: f };
  });
  const needle = q.trim().toLowerCase();
  const search = (r: Row) => !needle || `${r.code} ${x(r.product)} ${x(r.where)} ${r.organic ? 'organic عضوي' : 'conventional تقليدي'}`.toLowerCase().includes(needle);
  const rows = (tab === 'raw' ? rawRows : finRows).filter(search);
  const shownKg = rows.reduce((s, r) => s + r.kg, 0);

  // ---- totals
  const rawTotal = raws.filter((r) => r.status === 'wait' || r.status === 'ready').reduce((s, r) => s + r.kg, 0);
  const waitKg = raws.filter((r) => r.status === 'wait').reduce((s, r) => s + r.kg, 0);
  const procTotal = batches.filter((bt) => !bt.closed).reduce((s, bt) => s + bt.kg, 0);
  const procCount = batches.filter((bt) => !bt.closed).length;
  const finTotal = fins.reduce((s, f) => s + f.kg, 0);
  const allocKg = fins.filter((f) => allocated.has(f.code)).reduce((s, f) => s + f.kg, 0);

  // ---- a location only takes stock of its own farming type, so organic and conventional can't mix
  const move = (f: Fin, to: string) => {
    const dest = locs.find((o) => o.id === to);
    if (!dest || to === f.loc) return;
    if (dest.allowed === 'organic' && !f.organic) return setMsg({ text: t(`${f.code} is conventional. ${x(locL(to))} is for organic lots only.`, `${f.code} تقليدية. ${x(locL(to))} للدفعات العضوية فقط.`), ok: false });
    if (dest.allowed === 'conventional' && f.organic) return setMsg({ text: t(`${f.code} is organic. ${x(locL(to))} is for conventional lots only.`, `${f.code} عضوية. ${x(locL(to))} للدفعات التقليدية فقط.`), ok: false });
    setFins((fs) => fs.map((o) => (o.code === f.code ? { ...o, loc: to } : o)));
    log(role, l(`Moved ${f.code} to ${dest.name}`, `نقل ${f.code} إلى ${dest.ar || dest.name}`));
    setMsg({ text: t(`Moved ${f.code} to ${x(locL(to))}. Logged.`, `تم نقل ${f.code} إلى ${x(locL(to))}. تم التسجيل.`), ok: true });
  };

  // ---- blend (finished tab only)
  const free = fins.filter((f) => !allocated.has(f.code) && !f.code.startsWith('BL-'));
  const fa = free.find((f) => f.code === a);
  const fb = free.find((f) => f.code === b);
  const pA = num(pctA);
  const out = num(outKg);
  const kgA = Math.round(out * pA) / 100;
  const kgB = Math.round(out * (100 - pA)) / 100;
  const blendErr = !fa || !fb ? t('Pick two lots.', 'اختر دفعتين.')
    : fa.code === fb.code ? t('Pick two different lots.', 'اختر دفعتين مختلفتين.')
    : fa.organic !== fb.organic ? t("Organic and conventional can't be mixed.", 'لا يمكن خلط العضوي بالتقليدي.')
    : pA <= 0 || pA >= 100 ? t('The share must be between 1 and 99%.', 'يجب أن تكون النسبة بين 1 و99%.')
    : out <= 0 ? t('Enter the blend weight.', 'أدخل وزن الخلطة.')
    : kgA > fa.kg ? t(`Not enough in ${fa.code}: ${fmt(kgA)} kg needed, ${fmt(fa.kg)} kg in stock.`, `لا يكفي ما في ${fa.code}: المطلوب ${fmt(kgA)} كجم، المتوفر ${fmt(fa.kg)} كجم.`)
    : kgB > fb.kg ? t(`Not enough in ${fb.code}: ${fmt(kgB)} kg needed, ${fmt(fb.kg)} kg in stock.`, `لا يكفي ما في ${fb.code}: المطلوب ${fmt(kgB)} كجم، المتوفر ${fmt(fb.kg)} كجم.`) : '';
  const makeBlend = () => {
    if (!fa || !fb) return;
    const code = `BL-${fa.pc}-261022-0${seq}`;
    setFins((fs) => [
      ...fs.map((o) => (o.code === fa.code ? { ...o, kg: o.kg - kgA } : o.code === fb.code ? { ...o, kg: o.kg - kgB } : o)).filter((o) => o.kg > 0),
      { code, pc: fa.pc, product: l('Blend', 'خلطة'), pack: PP25, bags: Math.round(out / 25), kg: out, organic: fa.organic, recipe: [{ code: fa.code, kg: kgA }, { code: fb.code, kg: kgB }], loc: (locs.find((o) => o.active && (o.allowed === 'any' || (o.allowed === 'organic') === fa.organic)) || locs[0]).id },
    ]);
    setSeq(seq + 1); setBlendOpen(false); setA(''); setB(''); setOutKg('');
    log(role, l(`Blend ${code} created, ${fmt(out)} kg`, `إنشاء الخلطة ${code}، ${fmt(out)} كجم`));
    setMsg({ text: t(`Blend ${code} created · ${fmt(out)} kg. It can be traced back to both lots.`, `تم إنشاء الخلطة ${code} · ${fmt(out)} كجم. يمكن تتبعها إلى الدفعتين.`), ok: true });
  };

  const exportCsv = () => {
    const head = [t('Lot', 'الدفعة'), t('Product', 'المنتج'), t('Location', 'الموقع'), t('Farming', 'الزراعة'), t('kg', 'كجم'), t('Status', 'الحالة')];
    const lines = rows.map((r) => [r.code, x(r.product), x(r.where), r.organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي'), String(r.kg), x(r.statusLabel)]);
    const csv = '﻿' + [head, ...lines].map((r) => r.map((c) => '"' + c.replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const el = document.createElement('a');
    el.href = url; el.download = `stock-${tab}.csv`; el.click();
    URL.revokeObjectURL(url);
  };

  // the totals double as the tabs
  const card = (key: 'raw' | 'prod' | 'fin', label: string, value: number, sub: string) => {
    const on = key === tab;
    const body = (
      <>
        <div className="m-muted" style={{ fontSize: 13 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 600 }}>{fmt(value)} {t('kg', 'كجم')}</div>
        <div className="m-muted" style={{ fontSize: 13, minHeight: 18 }}>{sub}</div>
      </>
    );
    const style: React.CSSProperties = { flex: '1 1 200px', padding: '14px 20px', textAlign: 'start', font: 'inherit', color: 'inherit', textDecoration: 'none', border: 0, borderBottom: '3px solid ' + (on ? '#1F6B4F' : 'transparent'), background: on ? '#F4F8F5' : 'transparent', cursor: 'pointer', display: 'block' };
    return key === 'prod'
      ? <a key={key} href="#/Production" style={style}>{body}</a>
      : <button key={key} type="button" aria-pressed={on} style={style} onClick={() => { setTab(key); setMsg(null); setQ(''); }}>{body}</button>;
  };

  return (
    <Shell
      active="Stock"
      title={t('Stock', 'المخزون')}
      subtitle={t('Everything in the factory, in one list.', 'كل ما في المصنع في قائمة واحدة.')}
      actions={<>
        {tab === 'fin' ? <button type="button" className="m-btn" onClick={() => setBlendOpen(!blendOpen)}>{t('Make a blend', 'إنشاء خلطة')}</button> : null}
        {role === 'qm' ? <button type="button" className="m-btn" onClick={() => setImportOpen(!importOpen)}>{t('Import opening stock', 'استيراد المخزون الافتتاحي')}</button> : null}
        <button type="button" className="m-btn" onClick={exportCsv}>{t('Export to Excel', 'تصدير إلى إكسل')}</button>
      </>}
    >
      <section className="m-card" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
        {card('raw', t('Raw material', 'المواد الخام'), rawTotal, t(`${fmt(waitKg)} kg waiting approval`, `${fmt(waitKg)} كجم بانتظار الاعتماد`))}
        {card('prod', t('In production', 'قيد التشغيل'), procTotal, t(`${procCount} batches · open Production →`, `${procCount} دفعات · فتح التشغيل ←`))}
        {card('fin', t('Finished goods', 'المنتجات النهائية'), finTotal, t(`${fins.length} lots · ${fmt(allocKg)} kg allocated`, `${fins.length} دفعة · ${fmt(allocKg)} كجم مخصصة`))}
      </section>

      {importOpen && role === 'qm' ? <ImportPanel onDone={(text) => { setImportOpen(false); setMsg({ text, ok: true }); }} /> : null}
      {msg ? <div className={'m-note ' + (msg.ok ? 'ok' : 'bad')} role="status">{msg.text}</div> : null}

      {blendOpen && tab === 'fin' ? (
        <section className="m-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 className="m-cardh" style={{ padding: 0 }}>{t('Make a blend', 'إنشاء خلطة')}</h2>
          <div className="m-grid">
            <div className="m-fl"><label>{t('First lot', 'الدفعة الأولى')}</label>
              <select value={a} onChange={(e) => setA(e.target.value)}><option value="">—</option>{free.map((f) => <option key={f.code} value={f.code}>{f.code} · {fmt(f.kg)} kg</option>)}</select></div>
            <div className="m-fl"><label>{t('Share of first lot (%)', 'نسبة الدفعة الأولى (%)')}</label><input type="number" value={pctA} onChange={(e) => setPctA(e.target.value)} /></div>
            <div className="m-fl"><label>{t('Second lot', 'الدفعة الثانية')}</label>
              <select value={b} onChange={(e) => setB(e.target.value)}><option value="">—</option>{free.map((f) => <option key={f.code} value={f.code}>{f.code} · {fmt(f.kg)} kg</option>)}</select></div>
            <div className="m-fl"><label>{t('Blend weight (kg)', 'وزن الخلطة (كجم)')}</label><input type="number" value={outKg} onChange={(e) => setOutKg(e.target.value)} /></div>
          </div>
          <div className={'m-note ' + (blendErr ? (!fa || !fb || out <= 0 ? 'warn' : 'bad') : 'ok')}>
            {blendErr || t(`Uses ${fmt(kgA)} kg of ${fa?.code} and ${fmt(kgB)} kg of ${fb?.code}. The second share is ${100 - pA}%.`, `يستخدم ${fmt(kgA)} كجم من ${fa?.code} و${fmt(kgB)} كجم من ${fb?.code}. نسبة الثانية ${100 - pA}%.`)}
          </div>
          <div className="m-modal-actions">
            <button type="button" className="m-btn" onClick={() => setBlendOpen(false)}>{t('Cancel', 'إلغاء')}</button>
            <button type="button" className="m-btn pri" disabled={!!blendErr} onClick={makeBlend}>{t('Create blend lot', 'إنشاء دفعة الخلطة')}</button>
          </div>
        </section>
      ) : null}

      <section className="m-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: '16px 22px', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>
            {tab === 'raw' ? t('Raw material', 'المواد الخام') : t('Finished goods', 'المنتجات النهائية')}
            <span className="m-muted" style={{ fontWeight: 400, fontSize: 14 }}> · {rows.length} {t('lots', 'دفعة')} · {fmt(shownKg)} {t('kg', 'كجم')}</span>
          </h2>
          <span className="m-grow" />
          {tab === 'raw' ? (
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} style={{ width: 20, height: 20, accentColor: '#1F6B4F' }} />
              {t('Show used and rejected', 'إظهار المستخدمة والمرفوضة')}
            </label>
          ) : null}
          <input aria-label={t('Search', 'بحث')} placeholder={t('Search lot, product or place', 'ابحث عن دفعة أو منتج أو مكان')} value={q} onChange={(e) => setQ(e.target.value)}
            style={{ minHeight: 44, padding: '0 12px', border: '1px solid #CBD2CC', borderRadius: 10, font: 'inherit', fontSize: 14, minWidth: 240 }} />
        </div>
        <div className="m-tbl"><div>
          <div className="m-tr h">
            <span className="m-td w">{t('Lot', 'الدفعة')}</span>
            <span className="m-td w">{t('Product', 'المنتج')}</span>
            <span className="m-td w">{tab === 'raw' ? t('From', 'من') : t('Location', 'الموقع')}</span>
            <span className="m-td n">{t('kg', 'كجم')}</span>
            <span className="m-td">{t('Status', 'الحالة')}</span>
          </div>
          {rows.length === 0 ? <div className="m-empty">{t('Nothing matches. Try another search.', 'لا يوجد ما يطابق. جرّب بحثاً آخر.')}</div> : null}
          {rows.map((r) => (
            <div key={r.code} className="m-tr">
              <span className="m-td w"><a className="mono" href={r.href}>{r.code}</a></span>
              <span className="m-td w">{x(r.product)} <span className={'m-badge ' + (r.organic ? 'ok' : 'mute')}>{r.organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي')}</span></span>
              <span className="m-td w">
                {r.fin ? (
                  <select aria-label={t('Location', 'الموقع')} value={r.fin.loc} onChange={(e) => move(r.fin as Fin, e.target.value)}
                    style={{ minHeight: 38, border: '1px solid #E3E6E1', borderRadius: 8, font: 'inherit', fontSize: 14, background: '#fff', maxWidth: 170 }}>
                    {locs.filter((o) => o.active || o.id === r.fin!.loc).map((o) => <option key={o.id} value={o.id}>{x(locL(o.id))}</option>)}
                  </select>
                ) : x(r.where)}
              </span>
              <span className="m-td n">{fmt(r.kg)}</span>
              <span className="m-td"><span className={'m-badge ' + r.tone}>{x(r.statusLabel)}</span></span>
            </div>
          ))}
        </div></div>
      </section>
    </Shell>
  );
}
