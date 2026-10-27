import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l } from '../lib/app';
import { useStore, useNames, useBatchActions, Batch } from '../lib/store';

export const title = 'Approvals';

const fmt = (n: number) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });

/** The quality manager's three decisions: approve raw lots, clear holds, review yield alerts. */
export default function Approvals() {
  const { t, x, role } = useApp();
  const { raws, setRaws, batches, alerts, setAlerts, threshold, setThreshold, log } = useStore();
  const { prodL, supL } = useNames();
  const act = useBatchActions();
  const [toast, setToast] = useState('');
  const qm = role === 'qm';
  const kg = (n: number) => fmt(n) + ' ' + t('kg', 'كجم');

  const waiting = raws.filter((r) => r.status === 'wait');
  const held = batches.filter((b) => b.held && !b.closed);
  const open = alerts.filter((a) => !a.reviewed);
  const total = waiting.length + held.length + open.length;

  const decideRaw = (id: string, status: 'ready' | 'rejected') => {
    setRaws((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    log('qm', l(`${status === 'ready' ? 'Approved' : 'Rejected'} ${id}`, `${status === 'ready' ? 'اعتماد' : 'رفض'} ${id}`), 'appr');
    setToast(`${id} · ${status === 'ready' ? t('approved. It is ready to process.', 'معتمدة. جاهزة للتشغيل.') : t('rejected. It cannot be processed.', 'مرفوضة. لا يمكن تشغيلها.')}`);
  };
  const clearHold = (b: Batch) => {
    act.clearHold(b, 'QM');
    log('qm', l(`Metal detector check cleared on ${b.id}`, `السماح بمتابعة ${b.id} بعد فحص المعادن`), 'appr');
    setToast(`${b.id} · ${t('cleared. It can continue to packing.', 'تم السماح. يمكنها المتابعة إلى التعبئة.')}`);
  };
  const rejectBatch = (b: Batch) => { act.reject(b); setToast(`${b.id} · ${t('rejected', 'مرفوضة')}`); };
  const review = (id: string, code: string) => {
    setAlerts((as) => as.map((a) => (a.id === id ? { ...a, reviewed: true } : a)));
    setToast(`${code} · ${t('yield alert reviewed', 'تمت مراجعة تنبيه الإنتاجية')}`);
  };

  if (!qm) {
    return (
      <Shell active="Approvals" title={t('Approvals', 'الاعتمادات')}>
        <div className="m-note warn">{t('Only the quality manager can approve, clear or review. Switch role to continue.', 'يقوم مدير الجودة فقط بالاعتماد أو السماح أو المراجعة. بدّل الدور للمتابعة.')}</div>
      </Shell>
    );
  }

  return (
    <Shell
      active="Approvals"
      title={total ? t(`${total} need your decision`, `${total} بانتظار قرارك`) : t('You are all caught up', 'لا يوجد شيء بانتظارك')}
      subtitle={t('Approve raw lots, clear holds and review yield alerts.', 'اعتمد الدفعات الخام، واسمح بمتابعة الدفعات الموقوفة، وراجع تنبيهات الإنتاجية.')}
    >
      {toast ? <div className="m-toast" role="status"><span>{toast}</span><button type="button" onClick={() => setToast('')}>{t('Dismiss', 'إخفاء')}</button></div> : null}

      {held.length ? (
        <section className="m-card">
          <h2 className="m-cardh">{t('Batches on hold', 'دفعات موقوفة')} <span className="m-muted">{held.length}</span></h2>
          {held.map((b) => (
            <div key={b.id} className="m-row held">
              <div className="m-row-main">
                <div className="m-row-title"><span className="mono">{b.id}</span><span>{x(prodL(b.pc))}</span><span className="m-badge bad">{t('Metal detector failed', 'فشل كاشف المعادن')}</span></div>
                <div className="m-row-sub">{kg(b.kg)} · {t('rejects', 'مرفوضات')} {kg(b.rejects)}</div>
              </div>
              <a className="m-btn sm" href={`#/Lot?code=${b.id}`}>{t('Details', 'التفاصيل')}</a>
              <button type="button" className="m-btn sm neg" onClick={() => rejectBatch(b)}>{t('Reject', 'رفض')}</button>
              <button type="button" className="m-btn sm pri" onClick={() => clearHold(b)}>{t('Clear check', 'السماح بالمتابعة')}</button>
            </div>
          ))}
        </section>
      ) : null}

      {waiting.length ? (
        <section className="m-card">
          <h2 className="m-cardh">{t('Raw lots to approve', 'دفعات خام للاعتماد')} <span className="m-muted">{waiting.length}</span></h2>
          {waiting.map((r) => (
            <div key={r.id} className="m-row">
              <div className="m-row-main">
                <div className="m-row-title">
                  <span className="mono">{r.id}</span><span>{x(prodL(r.pc))}</span>
                  <span className={'m-badge ' + (r.organic ? 'ok' : 'mute')}>{r.organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي')}</span>
                </div>
                <div className="m-row-sub">{kg(r.kg)} · {x(supL(r.supplier))} · {t('moisture', 'الرطوبة')} {r.moisture} · {t('agreed yield', 'الإنتاجية المتفق عليها')} {r.rate}%</div>
                {r.moistureHigh ? <div className="m-warn">{t('Moisture is above the 12% limit', 'الرطوبة أعلى من الحد 12%')}</div> : null}
              </div>
              <button type="button" className="m-btn sm" onClick={() => decideRaw(r.id, 'rejected')}>{t('Reject', 'رفض')}</button>
              <button type="button" className="m-btn sm pri" onClick={() => decideRaw(r.id, 'ready')}>{t('Approve', 'اعتماد')}</button>
            </div>
          ))}
        </section>
      ) : null}

      {open.length ? (
        <section className="m-card">
          <h2 className="m-cardh">{t('Yield alerts', 'تنبيهات الإنتاجية')} <span className="m-muted">{open.length}</span></h2>
          {open.map((a) => (
            <div key={a.id} className="m-row">
              <div className="m-row-main">
                <div className="m-row-title"><span className="m-badge bad">{t('Yield', 'الإنتاجية')}</span>{x(a.title)}</div>
                <div className="m-row-sub"><span className="mono">{a.code}</span> · {x(a.detail)}</div>
              </div>
              <a className="m-btn sm" href={`#/Lot?code=${a.code}`}>{t('Details', 'التفاصيل')}</a>
              <button type="button" className="m-btn sm pri" onClick={() => review(a.id, a.code)}>{t('Mark reviewed', 'تمت المراجعة')}</button>
            </div>
          ))}
        </section>
      ) : null}

      <div className="m-card" style={{ padding: '14px 22px', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <label htmlFor="thr" style={{ fontSize: 14 }}>{t('Yield alert threshold', 'حد تنبيه الإنتاجية')}</label>
        <input id="thr" type="number" min="0" step="0.5" value={threshold} onChange={(e) => setThreshold(Math.max(0, Number(e.target.value) || 0))}
          style={{ width: 90, minHeight: 44, padding: '0 10px', border: '1px solid #CBD2CC', borderRadius: 10, font: 'inherit', fontSize: 16 }} />
        <span className="m-muted" style={{ fontSize: 13 }}>% {t('below the agreed yield. The default is 0, so any shortfall raises an alert.', 'أقل من الإنتاجية المتفق عليها. الافتراضي 0، لذا أي نقص يرفع تنبيهاً.')}</span>
      </div>

      {total === 0 ? <div className="m-card m-empty">{t('Nothing is waiting for a decision.', 'لا يوجد شيء بانتظار قرار.')}</div> : null}
    </Shell>
  );
}
