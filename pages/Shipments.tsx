import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l } from '../lib/app';
import { useStore, useNames, Line, Ship, lineFor } from '../lib/store';

export const title = 'Shipments';

const fmt = (n: number) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
const sum = (ls: Line[], k: 'bags' | 'net' | 'gross') => ls.reduce((a, r) => a + r[k], 0);

export default function Shipments() {
  const { t, x, role } = useApp();
  void role;
  const { ships, setShips, fins, customers } = useStore();
  const { custL } = useNames();
  const activeCustomers = customers.filter((c) => c.active);
  const [open, setOpen] = useState('SH-261025-01');
  const [confirm, setConfirm] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [newCustomer, setNewCustomer] = useState('');
  const [newContainer, setNewContainer] = useState('');
  const [addInput, setAddInput] = useState('');
  const [addMsg, setAddMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [toast, setToast] = useState('');
  const [seq, setSeq] = useState(3);

  const inShipments = new Set(ships.flatMap((s) => s.lines.map((r) => r.lot)));
  const available: Line[] = fins.filter((f) => !inShipments.has(f.code)).map(lineFor);

  const update = (id: string, fn: (s: Ship) => Ship) => setShips((all) => all.map((s) => (s.id === id ? fn(s) : s)));

  const addLot = (s: Ship) => {
    const code = addInput.trim().toUpperCase();
    if (!code) return;
    if (s.lines.some((r) => r.lot === code)) return setAddMsg({ text: t(`${code} is already in this shipment.`, `${code} موجودة بالفعل في هذه الشحنة.`), ok: false });
    const line = available.find((r) => r.lot === code);
    if (!line) return setAddMsg({ text: t(`No approved finished lot ${code} in stock.`, `لا توجد دفعة نهائية معتمدة ${code} في المخزون.`), ok: false });
    update(s.id, (a) => ({ ...a, lines: [...a.lines, line] }));
    setAddMsg({ text: t(`Added ${code} · ${line.bags} bags.`, `تمت إضافة ${code} · ${line.bags} كيساً.`), ok: true });
    setAddInput('');
  };
  const createShipment = () => {
    const id = `SH-261022-0${seq}`;
    setShips([{ id, customer: newCustomer || (activeCustomers[0] ? activeCustomers[0].id : ''), container: newContainer.trim(), date: '22/10', shipped: false, lines: [] }, ...ships]);
    setSeq(seq + 1); setOpen(id); setShowNew(false); setNewContainer(''); setAddMsg(null);
    setToast(`${id} · ${t('created. Add the lots below.', 'تم الإنشاء. أضف الدفعات من الأسفل.')}`);
  };
  const ship = (s: Ship) => {
    update(s.id, (a) => ({ ...a, shipped: true, date: '22/10' }));
    setConfirm(''); setOpen('');
    setToast(`${s.id} · ${t('shipped to', 'شُحنت إلى')} ${x(custL(s.customer))}.`);
  };
  const toggle = (id: string) => { setOpen(open === id ? '' : id); setConfirm(''); setAddMsg(null); setAddInput(''); };

  const table = (list: Ship[]) => (
    <div className="m-tbl"><div>
      <div className="m-tr h">
        <span className="m-td w">{t('Shipment', 'الشحنة')}</span>
        <span className="m-td w">{t('Customer', 'العميل')}</span>
        <span className="m-td">{t('Container', 'الحاوية')}</span>
        <span className="m-td">{t('Date', 'التاريخ')}</span>
        <span className="m-td n">{t('Bags', 'الأكياس')}</span>
        <span className="m-td n">{t('Net kg', 'الصافي كجم')}</span>
        <span className="m-td act" style={{ flex: '0 0 130px', minWidth: 130 }} />
      </div>
      {list.map((s) => {
        const isOpen = open === s.id;
        return (
          <React.Fragment key={s.id}>
            <div className="m-tr">
              <span className="m-td w mono">{s.id}</span>
              <span className="m-td w">{x(custL(s.customer))}</span>
              <span className="m-td mono">{s.container}</span>
              <span className="m-td">{s.date}</span>
              <span className="m-td n">{sum(s.lines, 'bags')}</span>
              <span className="m-td n">{fmt(sum(s.lines, 'net'))}</span>
              <span className="m-td act" style={{ flex: '0 0 130px', minWidth: 130 }}>
                <button type="button" className={'m-btn sm' + (isOpen ? '' : s.shipped ? '' : ' pri')} onClick={() => toggle(s.id)}>
                  {isOpen ? t('Close', 'إغلاق') : s.shipped ? t('View', 'عرض') : t('Open', 'فتح')}
                </button>
              </span>
            </div>
            {isOpen ? <div className="m-expand">{detail(s)}</div> : null}
          </React.Fragment>
        );
      })}
    </div></div>
  );

  const detail = (s: Ship) => (
    <>
      <div className="m-card" style={{ overflow: 'hidden' }}>
        {s.lines.length === 0 ? <div className="m-empty" style={{ borderTop: 0 }}>{t('No lots yet. Add a finished lot below.', 'لا توجد دفعات بعد. أضف دفعة نهائية من الأسفل.')}</div> : (
          <div className="m-tbl"><div>
            <div className="m-tr h">
              <span className="m-td w">{t('Lot', 'الدفعة')}</span>
              <span className="m-td">{t('Product', 'المنتج')}</span>
              <span className="m-td w">{t('Packaging', 'العبوة')}</span>
              <span className="m-td n">{t('Bags', 'الأكياس')}</span>
              <span className="m-td n">{t('Net kg', 'الصافي كجم')}</span>
              <span className="m-td n">{t('Gross kg', 'القائم كجم')}</span>
              <span className="m-td">{t('Label', 'الملصق')}</span>
              {!s.shipped ? <span className="m-td" style={{ flex: '0 0 90px', minWidth: 90 }} /> : null}
            </div>
            {s.lines.map((r) => (
              <div key={r.lot} className="m-tr" style={{ minHeight: 48 }}>
                <span className="m-td w"><a className="mono" href={`#/Lot?code=${r.lot}`}>{r.lot}</a></span>
                <span className="m-td">{x(r.product)}</span>
                <span className="m-td w">{x(r.pack)}</span>
                <span className="m-td n">{r.bags}</span>
                <span className="m-td n">{fmt(r.net)}</span>
                <span className="m-td n">{fmt(r.gross)}</span>
                <span className="m-td">{r.label}</span>
                {!s.shipped ? (
                  <span className="m-td" style={{ flex: '0 0 90px', minWidth: 90 }}>
                    <button type="button" className="m-link" onClick={() => update(s.id, (a) => ({ ...a, lines: a.lines.filter((q) => q.lot !== r.lot) }))}>{t('Remove', 'إزالة')}</button>
                  </span>
                ) : null}
              </div>
            ))}
            <div className="m-tr" style={{ minHeight: 48, fontWeight: 600, background: '#FAFBFA' }}>
              <span className="m-td w">{t('Total', 'الإجمالي')}</span><span className="m-td" /><span className="m-td w" />
              <span className="m-td n">{sum(s.lines, 'bags')}</span><span className="m-td n">{fmt(sum(s.lines, 'net'))}</span><span className="m-td n">{fmt(sum(s.lines, 'gross'))}</span>
              <span className="m-td" />{!s.shipped ? <span className="m-td" style={{ flex: '0 0 90px', minWidth: 90 }} /> : null}
            </div>
          </div></div>
        )}
      </div>

      {!s.shipped ? (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-end' }}>
            <div className="m-fl" style={{ flex: '1 1 320px' }}>
              <label htmlFor={'add-' + s.id}>{t('Add a finished lot or blend', 'إضافة دفعة نهائية أو خلطة')}</label>
              <input id={'add-' + s.id} className="mono txt" list="ship-available" autoComplete="off" value={addInput}
                placeholder={t('Scan, type or pick a code', 'امسح أو اكتب أو اختر رقماً')}
                onChange={(e) => { setAddInput(e.target.value); setAddMsg(null); }}
                onKeyDown={(e) => { if (e.key === 'Enter') addLot(s); }} />
              <datalist id="ship-available">{available.map((r) => <option key={r.lot} value={r.lot}>{`${x(r.product)} · ${fmt(r.net)} kg · ${x(r.pack)}`}</option>)}</datalist>
            </div>
            <button type="button" className="m-btn" onClick={() => addLot(s)}>{t('Add', 'إضافة')}</button>
          </div>
          {addMsg ? <div className={'m-note ' + (addMsg.ok ? 'ok' : 'bad')} role="status">{addMsg.text}</div> : null}
          {available.length ? <div className="m-muted" style={{ fontSize: 13 }}>{t('In stock and approved:', 'في المخزون ومعتمدة:')} {available.map((r) => r.lot).join(' · ')}</div> : null}
        </>
      ) : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <a className="m-btn" href={`#/Trace?code=${s.id}`}>{t('Trace this shipment', 'تتبع هذه الشحنة')}</a>
        <span className="m-grow" />
        {!s.shipped && confirm !== s.id ? <button type="button" className="m-btn pri" disabled={s.lines.length === 0} onClick={() => setConfirm(s.id)}>{t('Mark as shipped', 'تحديد كمشحونة')}</button> : null}
        {!s.shipped && confirm === s.id ? (
          <>
            <span className="m-muted">{t('This locks the shipment.', 'سيؤدي هذا إلى قفل الشحنة.')}</span>
            <button type="button" className="m-btn" onClick={() => setConfirm('')}>{t('Cancel', 'إلغاء')}</button>
            <button type="button" className="m-btn pri" onClick={() => ship(s)}>{t('Confirm shipped', 'تأكيد الشحن')}</button>
          </>
        ) : null}
        {s.shipped ? <span className="m-badge ok">{t('Shipped', 'تم الشحن')} · {s.date}</span> : null}
      </div>
    </>
  );

  const openList = ships.filter((s) => !s.shipped);
  const doneList = ships.filter((s) => s.shipped);

  return (
    <Shell
      active="Shipments"
      title={t('Shipments', 'الشحنات')}
      subtitle={t('Open a shipment to add lots and ship it.', 'افتح شحنة لإضافة الدفعات وشحنها.')}
      actions={<button type="button" className="m-btn pri" onClick={() => setShowNew(!showNew)}>{t('New shipment', 'شحنة جديدة')}</button>}
    >
      {toast ? <div className="m-toast" role="status"><span>{toast}</span><button type="button" onClick={() => setToast('')}>{t('Dismiss', 'إخفاء')}</button></div> : null}

      {showNew ? (
        <section className="m-card" style={{ padding: 18, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
          <div className="m-fl" style={{ flex: '1 1 240px' }}>
            <label htmlFor="new-cust">{t('Customer', 'العميل')}</label>
            <select id="new-cust" value={newCustomer || (activeCustomers[0] ? activeCustomers[0].id : '')} onChange={(e) => setNewCustomer(e.target.value)}>{activeCustomers.map((c) => <option key={c.id} value={c.id}>{x(custL(c.id))}</option>)}</select>
          </div>
          <div className="m-fl" style={{ flex: '1 1 240px' }}>
            <label htmlFor="new-cont">{t('Container number', 'رقم الحاوية')}</label>
            <input id="new-cont" className="mono" autoFocus value={newContainer} onChange={(e) => setNewContainer(e.target.value)} placeholder="MSKU 000000-0" />
          </div>
          <button type="button" className="m-btn" onClick={() => setShowNew(false)}>{t('Cancel', 'إلغاء')}</button>
          <button type="button" className="m-btn pri" disabled={!newContainer.trim()} onClick={createShipment}>{t('Create', 'إنشاء')}</button>
        </section>
      ) : null}

      <section className="m-card">
        <h2 className="m-cardh">{t('Open', 'مفتوحة')} <span className="m-muted">{openList.length}</span></h2>
        {openList.length ? table(openList) : <div className="m-empty">{t('No open shipments.', 'لا توجد شحنات مفتوحة.')}</div>}
      </section>

      <section className="m-card">
        <h2 className="m-cardh">{t('Shipped', 'تم شحنها')} <span className="m-muted">{doneList.length}</span></h2>
        {doneList.length ? table(doneList) : <div className="m-empty">{t('Nothing shipped yet.', 'لم يتم شحن شيء بعد.')}</div>}
      </section>
    </Shell>
  );
}
