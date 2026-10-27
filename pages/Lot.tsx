import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l, L } from '../lib/app';
import { RECORDS } from '../lib/records';
import { useStore, useNames } from '../lib/store';
import { recordFor } from '../lib/lots';

export const title = 'Lot page';

const WHO: Record<string, L> = {
  IM: l('Inventory manager', 'مدير المخزون'),
  QM: l('Quality manager', 'مدير الجودة'),
  SYS: l('System', 'النظام'),
};
const TONE_COLOR: Record<string, string> = { bad: '#A41E14', ok: '#14503A', '': '#1B2420' };

/** One screen for every record type: raw lot, batch, finished lot, blend. */
export function LotView({ kind }: { kind: string }) {
  const { t, x, lang, role } = useApp();
  const qm = role === 'qm';
  const store = useStore();
  const names = useNames();
  // /Lot?code=… shows that lot from the real data. Without a code it shows the sample for this page.
  const code = new URLSearchParams(window.location.hash.split('?')[1] || '').get('code') || '';
  const r = recordFor(code, kind, store, names);
  const isRaw = r.code.startsWith('RM-');

  // The yield alert lives in the shared store, so reviewing it here also clears it from Approvals.
  const { alerts, setAlerts } = store;
  const reviewed = alerts.some((a) => a.code === r.code && a.reviewed);
  const setReviewed = (v: boolean) => setAlerts((as) => as.map((a) => (a.code === r.code ? { ...a, reviewed: v } : a)));
  const [sold, setSold] = useState(false);
  const [modal, setModal] = useState<null | 'edit' | 'sale'>(null);
  const [reason, setReason] = useState('');
  const [newVal, setNewVal] = useState(r.editNew);
  const [extra, setExtra] = useState<[string, string, string][]>([]);

  const unit = (s: string) => (lang === 'ar' ? s.replace(/\bkg\b/g, 'كجم') : s);

  const history: [string, string, string][] = [
    ...extra,
    ...(isRaw && sold ? [[t('Just now', 'الآن'), t('Fines sold. Value credited to this lot.', 'بيع المسحوق الناعم. أُضيفت القيمة إلى هذه الدفعة.'), 'QM'] as [string, string, string]] : []),
    ...(isRaw && reviewed ? [[t('Just now', 'الآن'), t('Yield alert reviewed', 'تمت مراجعة تنبيه الإنتاجية'), 'QM'] as [string, string, string]] : []),
    ...r.history.map(([when, what, who]) => [when, x(what), who] as [string, string, string]),
  ];

  const chips = r.chips.map(([label, tone]) => ({ text: x(label), tone: tone as string }));
  const yieldAlert = alerts.find((a) => a.code === r.code);
  if (isRaw && yieldAlert) chips.push(reviewed ? { text: t('Yield alert reviewed', 'تمت مراجعة التنبيه'), tone: 'mute' } : { text: t('Yield alert', 'تنبيه الإنتاجية'), tone: 'bad' });

  const act = r.action;
  const canAct = !act.qmOnly || qm;

  const saveEdit = () => {
    setExtra([[t('Just now', 'الآن'), `${t('Corrected', 'تصحيح')} ${x(r.editField)}: ${r.editNow} → ${newVal}. ${t('Reason', 'السبب')}: ${reason}`, 'QM'], ...extra]);
    store.log('qm', l(`Changed locked record ${r.code}: ${r.editField.en} ${r.editNow} → ${newVal}`, `تعديل سجل مقفل ${r.code}: ${r.editField.ar} ${r.editNow} ← ${newVal}`), 'edit', l(reason, reason));
    setModal(null);
    setReason('');
  };

  const actions = (
    <>
      {qm ? <button type="button" className="m-btn" onClick={() => { setNewVal(r.editNew); setModal('edit'); }}>{t('Correct a value', 'تصحيح قيمة')}</button> : null}
      {act.type === 'review' && canAct && !reviewed ? <button type="button" className="m-btn pri" onClick={() => setReviewed(true)}>{x(act.label)}</button> : null}
      {act.type === 'link' && canAct ? <a className="m-btn pri" href={act.href}>{x(act.label)}</a> : null}
      {!canAct && !(act.type === 'review' && reviewed) ? <span className="m-muted" style={{ maxWidth: 300 }}>{x(act.imNote)}</span> : null}
      {act.type === 'done' || (act.type === 'review' && reviewed) ? <span style={{ color: '#14503A', fontWeight: 600 }}>{t('Nothing left to do ✓', 'لا يوجد ما يلزم فعله ✓')}</span> : null}
    </>
  );

  return (
    <Shell
      active="Stock"
      title={<span className="mono" style={{ fontWeight: 500, fontSize: 28 }}>{r.code}</span>}
      subtitle={
        <>
          <a href={r.back.href}>{x(r.back.label)}</a> › {x(r.kind)}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 8, color: '#1B2420', fontSize: 15 }}>
            <span>{x(r.line)}</span>
            {chips.map((c, i) => <span key={i} className={'m-badge ' + c.tone}>{c.text}</span>)}
          </div>
        </>
      }
      actions={actions}
    >
      <section className="m-card">
        <h2 className="m-cardh">{t('Summary', 'الملخص')}</h2>
        <div className="m-pad m-cols">
          <div>
            <h3 className="m-h2" style={{ marginTop: 0 }}>{t('Details', 'التفاصيل')}</h3>
            {r.details.map(([k, v], i) => <div key={i} className="m-kv"><span>{x(k)}</span><span>{unit(x(v))}</span></div>)}
          </div>
          <div>
            <h3 className="m-h2" style={{ marginTop: 0 }}>{t('Where it is now', 'أين هي الآن')}</h3>
            {r.where.map((w, i) => {
              const isCode = typeof w.a === 'string';
              const soldNow = w.sale && sold;
              return (
                <div key={i} className="m-out">
                  <span className={isCode ? 'mono' : ''} style={{ flex: '1 1 150px' }}>{x(w.a)}</span>
                  <span>{x(w.b)}</span>
                  <span className={'m-badge ' + (soldNow ? 'mute' : w.tone)}>{soldNow ? t('Sold · credited', 'مباع · تمت الإضافة') : x(w.tag)}</span>
                  {w.sale && !sold && qm ? <button type="button" className="m-btn sm" onClick={() => setModal('sale')}>{t('Record sale', 'تسجيل البيع')}</button> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="m-card">
        <h2 className="m-cardh">{t('Yield and kg', 'الإنتاجية والكميات')}</h2>
        <div className="m-nums">
          {r.nums.map(([k, v, sub, tone], i) => (
            <div key={i}>
              <div className="m-muted">{x(k)}</div>
              <div className="m-num-v" style={{ color: TONE_COLOR[tone] }}>{unit(v)}</div>
              <div style={{ fontSize: 13, color: TONE_COLOR[tone] }}>{x(sub)}</div>
            </div>
          ))}
        </div>
        {r.bar.length ? (
          <>
            <div style={{ fontSize: 14, fontWeight: 600, padding: '12px 22px 8px' }}>{x(r.barTitle)}</div>
            <div className="m-bar" role="img" aria-label={x(r.barTitle)}>
              {r.bar.map(([w, color], i) => <div key={i} style={{ width: w + '%', background: color }} />)}
            </div>
            <div className="m-legend">
              {r.bar.map(([, color, label], i) => <span key={i}><span style={{ color }}>■</span> {x(label)}</span>)}
            </div>
          </>
        ) : <div style={{ height: 14 }} />}
      </section>

      <section className="m-card">
        <h2 className="m-cardh">{t('Steps', 'المراحل')}</h2>
        <div className="m-tbl">
          <div>
            <div className="m-tr h">
              <span className="m-td w">{x(r.stepHead)}</span><span className="m-td">{t('Step', 'المرحلة')}</span>
              <span className="m-td n">{t('In kg', 'داخل كجم')}</span><span className="m-td n">{t('Out kg', 'خارج كجم')}</span><span className="m-td n">{t('Waste kg', 'فاقد كجم')}</span>
              <span className="m-td">{t('Result', 'النتيجة')}</span><span className="m-td">{t('Date', 'التاريخ')}</span>
            </div>
            {r.steps.map(([ref, step, a, b, c, res, date], i) => (
              <div key={i} className="m-tr">
                <span className="m-td w mono" style={{ fontSize: 13 }}>{ref}</span><span className="m-td">{x(step)}</span>
                <span className="m-td n">{a}</span><span className="m-td n">{b}</span><span className="m-td n">{c}</span>
                <span className="m-td">{x(res)}</span><span className="m-td">{date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-card">
        <h2 className="m-cardh">
          {t('Trace', 'التتبع')}
          <a className="m-btn sm" href={`#/Trace?code=${r.code}`}>{t('Open trace', 'فتح التتبع')}</a>
        </h2>
        <div className="m-chain">
          {r.chain.map((c, i) => (
            <React.Fragment key={i}>
              <span className={'m-badge mono ' + (c === r.code ? 'ok' : 'mute')}>{x(c)}</span>
              {i < r.chain.length - 1 ? <span aria-hidden="true">{lang === 'ar' ? '←' : '→'}</span> : null}
            </React.Fragment>
          ))}
        </div>
        <div className="m-pad m-muted" style={{ paddingTop: 8, color: '#3C4742' }}>{x(r.traceNote)}</div>
      </section>

      <section className="m-card">
        <h2 className="m-cardh">{t('History', 'السجل')}</h2>
        {history.map(([when, what, who], i) => (
          <div key={i} className="m-hist">
            <span className="when">{when}</span>
            <span className="what">{what}</span>
            <span className="who">{x(WHO[who])}</span>
          </div>
        ))}
      </section>

      {modal === 'edit' ? (
        <div className="m-overlay">
          <div role="dialog" aria-modal="true" className="m-card m-modal">
            <div>
              <h2>{t('Correct a locked value', 'تصحيح قيمة مقفلة')}</h2>
              <div className="m-muted" style={{ marginTop: 6 }}>{t('This record is locked. A written reason is required.', 'هذا السجل مقفل. يلزم ذكر السبب كتابةً.')}</div>
            </div>
            <div className="m-fl"><label>{t('Value to correct', 'القيمة المراد تصحيحها')}</label><input className="txt" value={x(r.editField)} readOnly /></div>
            <div className="m-grid">
              <div className="m-fl"><label>{t('Now', 'الحالية')}</label><input value={r.editNow} readOnly /></div>
              <div className="m-fl"><label>{t('Change to', 'تغيير إلى')}</label><input value={newVal} onChange={(e) => setNewVal(e.target.value)} /></div>
            </div>
            <div className="m-fl">
              <label>{t('Reason', 'السبب')}</label>
              <textarea rows={3} className="txt" placeholder={t('Why does this need to change?', 'لماذا يجب تغيير هذه القيمة؟')} value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
            <div className="m-muted" style={{ fontSize: 13 }}>{t('The old value, new value and reason go into History and the audit log.', 'تُسجَّل القيمة القديمة والجديدة والسبب في السجل وسجل التدقيق.')}</div>
            <div className="m-modal-actions">
              <button type="button" className="m-btn" onClick={() => { setModal(null); setReason(''); }}>{t('Cancel', 'إلغاء')}</button>
              <button type="button" className="m-btn pri" disabled={!reason.trim()} onClick={saveEdit}>{t('Save correction', 'حفظ التصحيح')}</button>
            </div>
          </div>
        </div>
      ) : null}

      {modal === 'sale' ? (
        <div className="m-overlay">
          <div role="dialog" aria-modal="true" className="m-card m-modal">
            <div>
              <h2>{t('Sell fines', 'بيع المسحوق الناعم')}</h2>
              <div className="m-muted" style={{ marginTop: 6 }}>{t('45 kg in the by-product store', '45 كجم في مخزن المنتجات الثانوية')}</div>
            </div>
            <div className="m-grid">
              <div className="m-fl"><label>{t('kg sold', 'الكمية المباعة (كجم)')}</label><input type="number" defaultValue={45} /></div>
              <div className="m-fl"><label>{t('Sale value', 'قيمة البيع')}</label><input className="txt" placeholder="0.00" /></div>
            </div>
            <div className="m-fl"><label>{t('Buyer', 'المشتري')}</label><input className="txt" /></div>
            <div className="m-note ok">{t('The value is credited to raw lot', 'تُضاف القيمة إلى الدفعة الخام')} <span className="mono">{r.code}</span>.</div>
            <div className="m-modal-actions">
              <button type="button" className="m-btn" onClick={() => setModal(null)}>{t('Cancel', 'إلغاء')}</button>
              <button type="button" className="m-btn pri" onClick={() => { setSold(true); setModal(null); }}>{t('Record sale', 'تسجيل البيع')}</button>
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}

export default function Lot() { return <LotView kind="raw" />; }
