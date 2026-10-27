import React, { useRef, useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l, L } from '../lib/app';
import { useStore, useNames, useStepsFor, useBatchActions, Raw, Batch, Step } from '../lib/store';

export const title = 'Production';

const STEP_NAME: Record<Step, L> = {
  sieving: l('Sieving', 'التنخيل'),
  sizing: l('Sizing', 'التدريج'),
  metal: l('Metal detector', 'كاشف المعادن'),
  packing: l('Pack & label', 'التعبئة والملصق'),
};
const STEP_ACTION: Record<Step, L> = {
  sieving: l('Record sieving', 'تسجيل التنخيل'),
  sizing: l('Record sizing', 'تسجيل التدريج'),
  metal: l('Metal detector check', 'فحص كاشف المعادن'),
  packing: l('Pack and label', 'تعبئة ووضع ملصق'),
};
const fmt = (n: number) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
const num = (s: string) => Number(s) || 0;

const ORDER: Step[] = ['sieving', 'sizing', 'metal', 'packing'];

export default function Production() {
  const { t, x, role } = useApp();
  const qm = role === 'qm';
  const { raws: allRaws, setRaws, batches: allBatches, setBatches, fins, log } = useStore();
  const act = useBatchActions();
  const who = role === 'qm' ? 'QM' : 'IM';
  const { prodL, supL, packL, locL } = useNames();
  const stepsFor = useStepsFor();
  const raws = allRaws.filter((r) => r.status === 'ready');
  const batches = allBatches.filter((b) => !b.closed);
  const waitingApproval = allRaws.filter((r) => r.status === 'wait').length;
  const [group, setGroup] = useState<string[]>([]);
  const [open, setOpen] = useState<string>('PB-HIB-261022-01');
  const [toast, setToast] = useState('');
  const [seq, setSeq] = useState(2);
  const [lastLoc, setLastLoc] = useState('');
  const [filter, setFilter] = useState<'' | Step | 'hold'>('');
  const readyRef = useRef<HTMLElement>(null);
  const kg = (n: number) => fmt(n) + ' ' + t('kg', 'كجم');

  const saved = (id: string) => { setOpen(''); setToast(`${id} · ${t('saved', 'تم الحفظ')}`); };

  // ---- starting a batch: one tap on one lot, or tick several lots first
  const inGroup = raws.filter((r) => group.includes(r.id));
  const first = inGroup[0];
  const compatible = (r: Raw) => !first || (r.pc === first.pc && r.organic === first.organic);
  const whyNot = (r: Raw) => (first && r.pc !== first.pc ? t('Different product', 'منتج مختلف') : t("Organic and conventional can't be mixed", 'لا يمكن خلط العضوي بالتقليدي'));
  const groupKg = inGroup.reduce((a, r) => a + r.kg, 0);
  const expectedKg = Math.round(inGroup.reduce((a, r) => a + (r.kg * r.rate) / 100, 0));
  const startFrom = (lots: Raw[]) => {
    const id = `PB-${lots[0].pc}-261022-0${seq}`;
    const total = lots.reduce((a, r) => a + r.kg, 0);
    setBatches((bs) => [...bs, { id, pc: lots[0].pc, kg: total, kgIn: total, step: 'sieving', held: false, rejects: 0, organic: lots[0].organic, sources: lots.map((r) => ({ raw: r.id, kg: r.kg })), log: [], by: 0, waste: 0 }]);
    log(role, l(`Started ${id} with ${fmt(total)} kg`, `بدء ${id} بـ ${fmt(total)} كجم`));
    setRaws((rs) => rs.map((r) => (lots.some((q) => q.id === r.id) ? { ...r, status: 'used' } : r)));
    setGroup([]);
    setSeq(seq + 1);
    setFilter('');
    setOpen(id);
    setToast(`${id} · ${t('started', 'بدأت')}`);
  };

  // ---- batch actions
  const savePack = (b: Batch, p: { packId: string; bags: number; total: number; locId: string }) => {
    const fg = act.pack(b, { ...p, who });
    setLastLoc(p.locId);
    setOpen('');
    log(role, l(`Created ${fg}, ${fmt(p.total)} kg`, `إنشاء ${fg}، ${fmt(p.total)} كجم`));
    setToast(`${fg} · ${t('created. Labels sent to the printer.', 'تم الإنشاء. أُرسلت الملصقات إلى الطابعة.')}`);
  };
  const clearHold = (b: Batch) => { act.clearHold(b, who); log(role, l(`Metal detector check cleared on ${b.id}`, `السماح بمتابعة ${b.id} بعد فحص المعادن`), 'appr'); saved(b.id); };
  const rejectBatch = (b: Batch) => { act.reject(b); setToast(`${b.id} · ${t('rejected', 'مرفوضة')}`); };

  const fromText = (b: Batch) => b.sources.length > 1 ? t(`From ${b.sources.length} raw lots`, `من ${b.sources.length} دفعات خام`) : `${t('From', 'من')} ${b.sources[0] ? b.sources[0].raw : '—'}`;
  const farmBadge = (organic: boolean) => <span className={'m-badge ' + (organic ? 'ok' : 'mute')}>{organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي')}</span>;

  // ---- the pipeline bar: where the work is, in the order the factory runs. It also filters the batch table.
  const heldCount = batches.filter((b) => b.held).length;
  const atStep = (s: Step) => batches.filter((b) => !b.held && b.step === s).length;
  const shown = batches
    .filter((b) => (filter === '' ? true : filter === 'hold' ? b.held : !b.held && b.step === filter))
    // held first, then the batches nearest the end, so work that can finish gets finished
    .sort((a, b) => Number(b.held) - Number(a.held) || ORDER.indexOf(b.step) - ORDER.indexOf(a.step));
  const pick = (f: Step | 'hold') => setFilter(filter === f ? '' : f);
  const item = (key: string, count: number, label: string, onClick?: () => void, extra = '', href?: string) => {
    const cls = 'it' + (filter === key ? ' on' : '') + (count === 0 ? ' zero' : '') + extra;
    const body = <><b>{count}</b><span>{label}</span></>;
    return href ? <a key={key} className={cls} href={href}>{body}</a> : <button key={key} type="button" className={cls} aria-pressed={filter === key} onClick={onClick}>{body}</button>;
  };

  const recent = [...fins].reverse().slice(0, 5);

  return (
    <Shell
      active="Production"
      title={t('Production', 'التشغيل')}
      subtitle={t('Start a batch, then do the next step on each batch.', 'ابدأ دفعة ثم نفّذ الخطوة التالية لكل دفعة.')}
    >
      {toast ? (
        <div className="m-toast" role="status"><span>{toast}</span><button type="button" onClick={() => setToast('')}>{t('Dismiss', 'إخفاء')}</button></div>
      ) : null}

      <div className="m-pipe" role="group" aria-label={t('Where the work is', 'أين العمل الآن')}>
        {qm ? item('wait', waitingApproval, t('Waiting approval', 'بانتظار الاعتماد'), undefined, '', '#/Approvals') : item('wait', waitingApproval, t('Waiting approval', 'بانتظار الاعتماد'), () => {})}
        {item('ready', raws.length, t('Ready to start', 'جاهزة للبدء'), () => readyRef.current && readyRef.current.scrollIntoView({ behavior: 'smooth' }))}
        {ORDER.map((s) => item(s, atStep(s), x(STEP_NAME[s]), () => pick(s)))}
        {item('hold', heldCount, t('On hold', 'موقوفة'), () => pick('hold'), heldCount ? ' bad' : '')}
      </div>

      <section className="m-card" ref={readyRef}>
        <h2 className="m-cardh">
          <span>{t('Ready to start', 'جاهزة للبدء')} <span className="m-muted">{raws.length}</span></span>
          {raws.length > 1 && !group.length ? <span className="m-muted" style={{ fontSize: 13, fontWeight: 400 }}>{t('Tick lots to combine them into one batch', 'اختر الدفعات لدمجها في دفعة تشغيل واحدة')}</span> : null}
        </h2>
        {inGroup.length ? (
          <div className="m-selbar">
            <span className="m-note ok" style={{ flex: '1 1 300px' }}>{t(`${inGroup.length} lot(s) · ${fmt(groupKg)} kg · expected finished ${fmt(expectedKg)} kg`, `${inGroup.length} دفعة · ${fmt(groupKg)} كجم · الناتج النهائي المتوقع ${fmt(expectedKg)} كجم`)}</span>
            <button type="button" className="m-btn sm" onClick={() => setGroup([])}>{t('Cancel', 'إلغاء')}</button>
            <button type="button" className="m-btn sm pri" onClick={() => startFrom(inGroup)}>{t('Start batch', 'بدء دفعة تشغيل')}</button>
          </div>
        ) : null}
        {raws.length === 0 ? <div className="m-empty">{t('No approved raw lots waiting.', 'لا توجد دفعات خام معتمدة بانتظار التشغيل.')}</div> : (
          <div className="m-tbl"><div>
            <div className="m-tr h">
              <span className="m-td cb" />
              <span className="m-td w">{t('Raw lot', 'الدفعة الخام')}</span>
              <span className="m-td">{t('Product', 'المنتج')}</span>
              <span className="m-td f">{t('Farming', 'نوع الزراعة')}</span>
              <span className="m-td w">{t('Supplier', 'المورد')}</span>
              <span className="m-td n">{t('kg', 'كجم')}</span>
              <span className="m-td n">{t('Agreed yield', 'الإنتاجية المتفق عليها')}</span>
              <span className="m-td act" />
            </div>
            {raws.map((r) => {
              const added = group.includes(r.id);
              const locked = group.length > 0 && !added && !compatible(r);
              return (
                <div key={r.id} className="m-tr">
                  <span className="m-td cb">
                    <input type="checkbox" aria-label={r.id} checked={added} disabled={locked}
                      onChange={() => setGroup(added ? group.filter((g) => g !== r.id) : [...group, r.id])} />
                  </span>
                  <span className="m-td w"><a className="mono" href={`#/Lot?code=${r.id}`}>{r.id}</a></span>
                  <span className="m-td">{x(prodL(r.pc))}</span>
                  <span className="m-td f">{farmBadge(r.organic)}</span>
                  <span className="m-td w">{x(supL(r.supplier))}</span>
                  <span className="m-td n">{fmt(r.kg)}</span>
                  <span className="m-td n">{r.rate}%</span>
                  <span className="m-td act">
                    {locked ? <span className="m-muted">{whyNot(r)}</span>
                      : !group.length ? <button type="button" className="m-btn sm pri" onClick={() => startFrom([r])}>{t('Start batch', 'بدء دفعة تشغيل')}</button> : null}
                  </span>
                </div>
              );
            })}
          </div></div>
        )}
      </section>

      <section className="m-card">
        <h2 className="m-cardh">
          <span>{t('In process', 'قيد التشغيل')} <span className="m-muted">{shown.length}{filter ? ` / ${batches.length}` : ''}</span></span>
          {filter ? <button type="button" className="m-act" onClick={() => setFilter('')}>{t('Show all', 'عرض الكل')} ✕</button> : null}
        </h2>
        {shown.length === 0 ? <div className="m-empty">{batches.length === 0 ? t('No batches in process. Start one above.', 'لا توجد دفعات قيد التشغيل. ابدأ دفعة من الأعلى.') : t('No batches at this step.', 'لا توجد دفعات في هذه المرحلة.')}</div> : (
          <div className="m-tbl"><div>
            <div className="m-tr h">
              <span className="m-td w">{t('Batch', 'الدفعة')}</span>
              <span className="m-td">{t('Product', 'المنتج')}</span>
              <span className="m-td f">{t('Farming', 'نوع الزراعة')}</span>
              <span className="m-td n">{t('kg', 'كجم')}</span>
              <span className="m-td w">{t('Step', 'المرحلة')}</span>
              <span className="m-td act" />
            </div>
            {shown.map((b) => {
              const list = stepsFor(b.pc);
              const idx = list.indexOf(b.step);
              const isOpen = open === b.id;
              const blocked = b.held && !qm;
              return (
                <React.Fragment key={b.id}>
                  <div className={'m-tr' + (b.held ? ' held' : '')}>
                    <span className="m-td w"><a className="mono" href={`#/Lot?code=${b.id}`}>{b.id}</a><div className="m-sub">{fromText(b)}</div></span>
                    <span className="m-td">{x(prodL(b.pc))}</span>
                    <span className="m-td f">{farmBadge(b.organic)}</span>
                    <span className="m-td n">{fmt(b.kg)}</span>
                    <span className="m-td w">
                      {x(STEP_NAME[b.step])} · {idx + 1} {t('of', 'من')} {list.length} {b.held ? <span className="m-badge bad" style={{ marginInlineStart: 6 }}>{t('On hold', 'موقوفة')}</span> : null}
                      <div className="m-prog" aria-hidden="true">{list.map((s, i) => <i key={s} className={i < idx ? 'd' : i === idx ? (b.held ? 'x' : 'n') : ''} />)}</div>
                    </span>
                    <span className="m-td act">
                      {blocked
                        ? <span className="m-muted">{t('Waiting for the quality manager', 'بانتظار مدير الجودة')}</span>
                        : <button type="button" className={'m-btn sm' + (isOpen ? '' : ' pri')} onClick={() => setOpen(isOpen ? '' : b.id)}>
                            {b.held ? t('Clear or reject', 'السماح أو الرفض') : x(STEP_ACTION[b.step])}
                          </button>}
                    </span>
                  </div>
                  {isOpen && !blocked ? (
                    <div className="m-expand">
                      {b.held ? <HoldPanel b={b} onClear={() => clearHold(b)} onReject={() => rejectBatch(b)} kg={kg} />
                        : b.step === 'metal' ? <MetalPanel b={b} onPass={(rej) => { act.metalPass(b, rej, who); saved(b.id); }} onFail={(rej) => { act.metalFail(b, rej, who); setOpen(''); setToast(`${b.id} · ${t('failed. Batch put on hold.', 'فشل. أُوقفت الدفعة.')}`); }} />
                        : b.step === 'packing' ? <PackPanel b={b} defaultLoc={lastLoc} onSave={(p) => savePack(b, p)} />
                        : <StepPanel key={b.id + b.step} b={b} onSave={(out, by) => { act.recordStep(b, out, by, who); saved(b.id); }} kg={kg} />}
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div></div>
        )}
      </section>

      <section className="m-card">
        <h2 className="m-cardh">
          <span>{t('Recently finished', 'انتهت مؤخراً')}</span>
          <a className="m-act" href="#/Stock">{t('See all in Stock', 'عرض الكل في المخزون')} →</a>
        </h2>
        <div className="m-tbl"><div>
          <div className="m-tr h">
            <span className="m-td w">{t('Finished lot', 'الدفعة النهائية')}</span>
            <span className="m-td f">{t('Farming', 'نوع الزراعة')}</span>
            <span className="m-td n">{t('kg', 'كجم')}</span>
            <span className="m-td n">{t('Bags', 'الأكياس')}</span>
            <span className="m-td w">{t('Packaging', 'العبوة')}</span>
            <span className="m-td">{t('Location', 'الموقع')}</span>
          </div>
          {recent.map((f) => (
            <div key={f.code} className="m-tr" style={{ minHeight: 48 }}>
              <span className="m-td w"><a className="mono" href={`#/Lot?code=${f.code}`}>{f.code}</a></span>
              <span className="m-td f">{farmBadge(f.organic)}</span>
              <span className="m-td n">{fmt(f.kg)}</span>
              <span className="m-td n">{f.bags}</span>
              <span className="m-td w">{x(f.pack)}</span>
              <span className="m-td">{x(locL(f.loc))}</span>
            </div>
          ))}
        </div></div>
      </section>
    </Shell>
  );
}

/** Sieving and sizing: kg out and by-product. Waste is whatever is left. Fields start empty so nothing is invented. */
function StepPanel({ b, onSave, kg }: { b: Batch; onSave: (out: number, by: number) => void; kg: (n: number) => string }) {
  const { t, x } = useApp();
  const [out, setOut] = useState('');
  const [by, setBy] = useState('');
  const [more, setMore] = useState(false);
  const [notes, setNotes] = useState('');
  const waste = b.kg - num(out) - num(by);
  const over = waste < 0;
  const byLabel = b.step === 'sieving' ? t('Residue kg', 'المخلفات (كجم)') : t('Fines kg', 'المسحوق الناعم (كجم)');
  return (
    <>
      <div style={{ fontWeight: 600 }}>{x(STEP_ACTION[b.step])} · <span className="mono">{b.id}</span> · {kg(b.kg)} {t('in', 'داخل')}</div>
      <div className="m-grid">
        <div className="m-fl"><label>{t('kg out', 'الخارج (كجم)')}</label><input type="number" autoFocus placeholder="0" value={out} onChange={(e) => setOut(e.target.value)} /></div>
        <div className="m-fl"><label>{byLabel}</label><input type="number" placeholder="0" value={by} onChange={(e) => setBy(e.target.value)} /></div>
      </div>
      {out === '' ? null : (
        <div className={'m-note ' + (over ? 'bad' : 'ok')}>
          {over ? t(`Out + ${byLabel.replace(/ kg$/, '').toLowerCase()} is ${kg(-waste)} more than kg in.`, `الخارج + ${byLabel.replace(/ \(كجم\)$/, '')} أكثر من الداخل بمقدار ${kg(-waste)}.`)
            : t(`Waste: ${kg(waste)} (calculated)`, `الفاقد: ${kg(waste)} (محسوب)`)}
        </div>
      )}
      {more ? <div className="m-fl"><label>{t('Notes', 'ملاحظات')}</label><input className="txt" value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
        : <button type="button" className="m-link" onClick={() => setMore(true)}>{t('Add a note', 'إضافة ملاحظة')}</button>}
      <button type="button" className="m-btn pri full" disabled={over || num(out) <= 0} onClick={() => onSave(num(out), num(by))}>{t('Save', 'حفظ')}</button>
    </>
  );
}

/** Two big buttons. Rejects kg is optional and shared by both. */
function MetalPanel({ b, onPass, onFail }: { b: Batch; onPass: (rejects: number) => void; onFail: (rejects: number) => void }) {
  const { t } = useApp();
  const [rej, setRej] = useState('');
  return (
    <>
      <div style={{ fontWeight: 600 }}>{t('Metal detector (CCP 2)', 'كاشف المعادن (نقطة التحكم الحرجة 2)')} · <span className="mono">{b.id}</span></div>
      <div className="m-fl" style={{ maxWidth: 240 }}><label>{t('Rejects kg (optional)', 'المرفوضات (كجم) - اختياري')}</label><input type="number" placeholder="0" value={rej} onChange={(e) => setRej(e.target.value)} /></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" className="m-btn pri" style={{ flex: '1 1 200px', minHeight: 60, fontSize: 17 }} onClick={() => onPass(num(rej))}>{t('Pass', 'ناجح')}</button>
        <button type="button" className="m-btn neg" style={{ flex: '1 1 200px', minHeight: 60, fontSize: 17 }} onClick={() => onFail(num(rej))}>{t('Fail · put on hold', 'فاشل · إيقاف الدفعة')}</button>
      </div>
    </>
  );
}

function HoldPanel({ b, onClear, onReject, kg }: { b: Batch; onClear: () => void; onReject: () => void; kg: (n: number) => string }) {
  const { t } = useApp();
  return (
    <>
      <div className="m-note bad">{t(`Metal detector failed with ${kg(b.rejects)} rejects. Clear it once the rejects are removed and the batch passes a re-test.`, `فشل كاشف المعادن مع ${kg(b.rejects)} مرفوضات. اسمح بالمتابعة بعد إزالة المرفوضات ونجاح إعادة الفحص.`)}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" className="m-btn pri" onClick={onClear}>{t('Clear and continue', 'السماح بالمتابعة')}</button>
        <button type="button" className="m-btn neg" onClick={onReject}>{t('Reject batch', 'رفض الدفعة')}</button>
      </div>
    </>
  );
}

/** Packing, weighing, labeling and storage in one form. Net per bag defaults to the pack size. */
function PackPanel({ b, defaultLoc, onSave }: { b: Batch; defaultLoc: string; onSave: (p: { packId: string; bags: number; total: number; locId: string }) => void }) {
  const { t, x } = useApp();
  const { packs, locs } = useStore();
  const { packL, locL } = useNames();
  const activePacks = packs.filter((p) => p.active);
  // a location only takes stock of its own farming type, so organic and conventional can't mix
  const okLocs = locs.filter((o) => o.active && (o.allowed === 'any' || (o.allowed === 'organic') === b.organic));
  const [packId, setPackId] = useState(activePacks[0] ? activePacks[0].id : '');
  const pack = activePacks.find((p) => p.id === packId) || activePacks[0];
  const [bags, setBags] = useState('');
  const [net, setNet] = useState(String(pack ? pack.net : 25));
  const [loc, setLoc] = useState(okLocs.some((o) => o.id === defaultLoc) ? defaultLoc : okLocs[0] ? okLocs[0].id : '');
  const [more, setMore] = useState(false);
  const total = num(bags) * num(net);
  const left = b.kg - total;
  const fg = b.id.replace('PB-', 'FG-');
  const pick = (id: string) => {
    const p = activePacks.find((a) => a.id === id);
    setPackId(id); if (p) setNet(String(p.net));
  };
  return (
    <>
      <div style={{ fontWeight: 600 }}>{t('Pack and label', 'تعبئة ووضع ملصق')} · <span className="mono">{b.id}</span> · {fmt(b.kg)} {t('kg', 'كجم')}</div>
      <div className="m-grid">
        <div className="m-fl"><label>{t('Packaging', 'العبوة')}</label>
          <select value={packId} onChange={(e) => pick(e.target.value)}>{activePacks.map((p) => <option key={p.id} value={p.id}>{x(packL(p.id))}</option>)}</select>
        </div>
        <div className="m-fl"><label>{t('Bag count', 'عدد الأكياس')}</label><input type="number" autoFocus placeholder={String(pack ? Math.floor(b.kg / pack.net) : 0)} value={bags} onChange={(e) => setBags(e.target.value)} /></div>
        <div className="m-fl"><label>{t('Storage location', 'موقع التخزين')}</label>
          <select value={loc} onChange={(e) => setLoc(e.target.value)}>{okLocs.map((o) => <option key={o.id} value={o.id}>{x(locL(o.id))}</option>)}</select>
        </div>
      </div>
      {more ? <div className="m-fl" style={{ maxWidth: 240 }}><label>{t('Net kg per bag', 'الوزن الصافي لكل كيس (كجم)')}</label><input type="number" value={net} onChange={(e) => setNet(e.target.value)} /></div>
        : <button type="button" className="m-link" onClick={() => setMore(true)}>{t(`Net per bag: ${net} kg. Change`, `الصافي لكل كيس: ${net} كجم. تغيير`)}</button>}
      {bags !== '' ? (
        <div className={'m-note ' + (left < 0 ? 'bad' : 'ok')}>
          {left < 0
            ? t(`Packed weight is ${fmt(-left)} kg more than the batch has.`, `الوزن المعبأ أكثر مما في الدفعة بمقدار ${fmt(-left)} كجم.`)
            : t(`Total packed ${fmt(total)} kg · ${fmt(left)} kg stays in the batch.`, `إجمالي المعبأ ${fmt(total)} كجم · يتبقى ${fmt(left)} كجم في الدفعة.`)}
        </div>
      ) : null}
      <div className="m-muted">{t('Finished lot code', 'رقم الدفعة النهائية')}: <span className="mono">{fg}</span> · {b.organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي')}</div>
      <button type="button" className="m-btn pri full" disabled={left < 0 || total <= 0 || !pack || !loc} onClick={() => onSave({ packId, bags: num(bags), total, locId: loc })}>
        {t('Create finished lot and print labels', 'إنشاء الدفعة النهائية وطباعة الملصقات')}
      </button>
    </>
  );
}
