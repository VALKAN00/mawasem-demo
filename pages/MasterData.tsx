import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp, l, L, Role } from '../lib/app';
import { useStore, Named, FieldRec, Supplier, Product, Pack, Loc, Customer } from '../lib/store';

export const title = 'Master data';

type Vals = Record<string, string | boolean>;
type Kind = 'text' | 'number' | 'farming' | 'allowed' | 'yesno' | 'code';
interface Col { k: string; label: L; kind: Kind; req?: boolean; grow?: number }

const FARMING: [string, L][] = [['conventional', l('Conventional', 'تقليدي')], ['organic', l('Organic', 'عضوي')]];
const ALLOWED: [string, L][] = [['any', l('Any stock', 'أي مخزون')], ['organic', l('Organic only', 'عضوي فقط')], ['conventional', l('Conventional only', 'تقليدي فقط')]];
const NAME: Col = { k: 'name', label: l('Name', 'الاسم'), kind: 'text', req: true, grow: 1.6 };
const AR: Col = { k: 'ar', label: l('Name in Arabic', 'الاسم بالعربية'), kind: 'text' };

/**
 * One table for every list: an add row on top, edit in place, Deactivate for anything in use,
 * Records are never deleted.
 */
function ListTable<T extends Named>({ items, cols, toVals, make, one, onChange, check, sub, expand, expandLabel }: {
  items: T[]; cols: Col[]; toVals: (r: T) => Vals; make: (v: Vals, old?: T) => T; one: L; onChange: (next: T[], what: L) => void;
  check?: (v: Vals, old?: T) => string[];
  sub?: (r: T) => React.ReactNode; expand?: (r: T) => React.ReactNode; expandLabel?: (r: T) => string;
}) {
  const { t, x } = useApp();
  const blank = (): Vals => cols.reduce((a, c) => ({ ...a, [c.k]: c.kind === 'yesno' ? true : c.kind === 'farming' ? 'conventional' : c.kind === 'allowed' ? 'any' : '' }), {});
  const [add, setAdd] = useState<Vals>(blank());
  const [editId, setEditId] = useState('');
  const [edit, setEdit] = useState<Vals>({});
  const [errs, setErrs] = useState<string[]>([]);
  const [open, setOpen] = useState('');

  const validate = (v: Vals, old?: T) => {
    const e: string[] = [];
    cols.forEach((c) => {
      const s = String(v[c.k] ?? '').trim();
      if (c.req && !s) e.push(`${x(c.label)}: ${t('is required.', 'مطلوب.')}`);
      if (c.kind === 'number' && s && !(Number(s) > 0)) e.push(`${x(c.label)}: ${t('must be more than 0.', 'يجب أن يكون أكبر من 0.')}`);
    });
    const nm = String(v.name ?? '').trim().toLowerCase();
    if (nm && items.some((r) => r.id !== old?.id && r.name.trim().toLowerCase() === nm)) e.push(t(`A ${x(one)} with this name already exists.`, `يوجد ${x(one)} بهذا الاسم بالفعل.`));
    return [...e, ...(check ? check(v, old) : [])];
  };
  const doAdd = () => {
    const e = validate(add);
    setErrs(e);
    if (e.length) return;
    const rec = make(add);
    onChange([...items, rec], l(`Added ${one.en} ${rec.name}`, `إضافة ${one.ar} ${rec.ar || rec.name}`));
    setAdd(blank());
  };
  const doSave = (old: T) => {
    const e = validate(edit, old);
    setErrs(e);
    if (e.length) return;
    const rec = make(edit, old);
    onChange(items.map((r) => (r.id === old.id ? rec : r)), l(`Changed ${one.en} ${rec.name}`, `تعديل ${one.ar} ${rec.ar || rec.name}`));
    setEditId('');
  };
  const toggle = (r: T) => onChange(items.map((o) => (o.id === r.id ? { ...o, active: !o.active } : o)), r.active ? l(`Deactivated ${one.en} ${r.name}`, `تعطيل ${one.ar} ${r.ar || r.name}`) : l(`Activated ${one.en} ${r.name}`, `تفعيل ${one.ar} ${r.ar || r.name}`));

  const input = (c: Col, v: Vals, set: (n: Vals) => void, locked = false, placeholder?: string) => {
    const val = v[c.k];
    if (c.kind === 'yesno') return <input type="checkbox" aria-label={x(c.label)} checked={!!val} onChange={(e) => set({ ...v, [c.k]: e.target.checked })} style={{ width: 22, height: 22, accentColor: '#1F6B4F' }} />;
    if (c.kind === 'farming' || c.kind === 'allowed') {
      const opts = c.kind === 'farming' ? FARMING : ALLOWED;
      return <select className="m-in" aria-label={x(c.label)} value={String(val)} onChange={(e) => set({ ...v, [c.k]: e.target.value })}>{opts.map(([k, lab]) => <option key={k} value={k}>{x(lab)}</option>)}</select>;
    }
    return <input className="m-in" aria-label={x(c.label)} type={c.kind === 'number' ? 'number' : 'text'} readOnly={locked} value={String(val ?? '')} placeholder={placeholder}
      onChange={(e) => set({ ...v, [c.k]: c.kind === 'code' ? e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) : e.target.value })}
      onKeyDown={(e) => { if (e.key === 'Enter' && !locked) (editId ? doSave(items.find((r) => r.id === editId)!) : doAdd()); }} />;
  };
  const show = (c: Col, r: T) => {
    const v = toVals(r)[c.k];
    if (c.kind === 'yesno') return v ? <span style={{ color: '#14503A', fontWeight: 600 }}>✓</span> : <span className="m-muted">—</span>;
    if (c.kind === 'farming') return <span className={'m-badge ' + (v === 'organic' ? 'ok' : 'mute')}>{x((FARMING.find(([k]) => k === v) || FARMING[0])[1])}</span>;
    if (c.kind === 'allowed') return x((ALLOWED.find(([k]) => k === v) || ALLOWED[0])[1]);
    if (c.kind === 'code') return <span className="mono">{String(v)}</span>;
    return String(v ?? '') || <span className="m-muted">—</span>;
  };
  const cell = (c: Col): React.CSSProperties => ({ flex: `${c.grow || 1} 1 0`, minWidth: c.kind === 'yesno' || c.kind === 'code' ? 80 : 140 });

  return (
    <div className="m-tbl md"><div style={{ minWidth: 760 }}>
      <div className="m-tr h">
        {cols.map((c) => <span key={c.k} className="m-td" style={cell(c)}>{x(c.label)}{c.req ? ' *' : ''}</span>)}
        <span className="m-td md-act" />
      </div>

      <div className="m-tr md-add">
        {cols.map((c, i) => <span key={c.k} className="m-td" style={cell(c)}>{input(c, add, setAdd, false, i === 0 ? t(`New ${x(one)}…`, `${x(one)} جديد…`) : c.kind === 'code' ? 'SAG' : undefined)}</span>)}
        <span className="m-td md-act"><button type="button" className="m-btn sm pri" onClick={doAdd}>+ {t('Add', 'إضافة')}</button></span>
      </div>
      {errs.length ? <div className="m-note bad" style={{ margin: '10px 22px' }} role="alert">{errs.join(' ')}</div> : null}

      {items.length === 0 ? <div className="m-empty">{t('Nothing here yet. Add the first one above.', 'لا يوجد شيء بعد. أضف الأول من الأعلى.')}</div> : null}
      {items.map((r) => {
        const editing = editId === r.id;
        return (
          <React.Fragment key={r.id}>
            <div className={'m-tr md-row' + (r.active ? '' : ' off')}>
              {cols.map((c, i) => (
                <span key={c.k} className="m-td" style={cell(c)}>
                  {editing ? input(c, edit, setEdit, c.kind === 'code') : (
                    <>
                      <span style={i === 0 ? { fontWeight: 600 } : undefined}>{show(c, r)}</span>
                      {i === 0 && !r.active ? <span className="m-badge mute" style={{ marginInlineStart: 8 }}>{t('Inactive', 'معطّل')}</span> : null}
                      {i === 0 && sub ? <div className="m-sub" style={{ whiteSpace: 'normal' }}>{sub(r)}</div> : null}
                    </>
                  )}
                </span>
              ))}
              <span className="m-td md-act">
                {editing ? (
                  <>
                    <button type="button" className="m-act" onClick={() => { setEditId(''); setErrs([]); }}>{t('Cancel', 'إلغاء')}</button>
                    <button type="button" className="m-btn sm pri" onClick={() => doSave(r)}>{t('Save', 'حفظ')}</button>
                  </>
                ) : (
                  <>
                    {expand ? <button type="button" className={'m-act' + (open === r.id ? ' on' : '')} aria-expanded={open === r.id} onClick={() => setOpen(open === r.id ? '' : r.id)}>{expandLabel ? expandLabel(r) : ''} {open === r.id ? '▴' : '▾'}</button> : null}
                    <button type="button" className="m-act" onClick={() => { setEditId(r.id); setEdit(toVals(r)); setErrs([]); }}>{t('Edit', 'تعديل')}</button>
                    <button type="button" className="m-act" onClick={() => toggle(r)}>{r.active ? t('Deactivate', 'تعطيل') : t('Activate', 'تفعيل')}</button>
                  </>
                )}
              </span>
            </div>
            {expand && open === r.id ? <div className="m-expand">{expand(r)}</div> : null}
          </React.Fragment>
        );
      })}
    </div></div>
  );
}

const slug = (s: string) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';
const uid = (name: string, taken: string[]) => { let id = slug(name), n = 2; while (taken.includes(id)) id = slug(name) + '-' + n++; return id; };
const nameBits = (v: Vals) => ({ name: String(v.name).trim(), ar: String(v.ar || '').trim() || undefined });

type Tab = 'sup' | 'prod' | 'cust' | 'pack' | 'loc';

export default function MasterData() {
  const { t, x, role } = useApp();
  const { suppliers, setSuppliers, products, setProducts, customers, setCustomers, packs, setPacks, locs, setLocs, log } = useStore();
  const [tab, setTab] = useState<Tab>('sup');
  const [toast, setToast] = useState('');
  const saved = (who: Role, what: L) => { log(who, what, 'edit'); setToast(x(what)); };

  const tabs: [Tab, string, L][] = [
    ['sup', t('Suppliers and fields', 'الموردون والحقول'), l('Suppliers and the fields their crops come from. Receive uses these.', 'الموردون والحقول التي تأتي منها المحاصيل. يستخدمها الاستلام.')],
    ['prod', t('Products', 'المنتجات'), l('Products and the steps each one goes through. The 3-letter code is part of every lot code.', 'المنتجات والمراحل التي تمر بها. الرمز المكوّن من 3 أحرف جزء من كل رقم دفعة.')],
    ['cust', t('Customers', 'العملاء'), l('Customers you ship to.', 'العملاء الذين تشحن إليهم.')],
    ['pack', t('Packaging', 'العبوات'), l('Packaging types used when packing and shipping.', 'أنواع العبوات المستخدمة في التعبئة والشحن.')],
    ['loc', t('Storage locations', 'مواقع التخزين'), l('Where finished goods are kept. A location can be limited to organic or conventional so they never mix.', 'أماكن حفظ المنتجات النهائية. يمكن حصر الموقع بالعضوي أو التقليدي حتى لا يختلطا.')],
  ];

  const fieldsOf = (s: Supplier) => (
    <>
      <div style={{ fontWeight: 600 }}>{t('Fields of', 'حقول')} {s.ar && x(l(s.name, s.ar)) || s.name}</div>
      <div className="m-card" style={{ overflow: 'hidden' }}>
        <ListTable<FieldRec>
          items={s.fields} one={l('field', 'حقل')}
          cols={[NAME, AR, { k: 'farming', label: l('Farming', 'نوع الزراعة'), kind: 'farming' }, { k: 'cert', label: l('Organic certificate no.', 'رقم الشهادة العضوية'), kind: 'text' }]}
          toVals={(r) => ({ name: r.name, ar: r.ar || '', farming: r.organic ? 'organic' : 'conventional', cert: r.cert })}
          make={(v, old) => ({ id: old ? old.id : uid(s.id + '-' + String(v.name), s.fields.map((f) => f.id)), ...nameBits(v), active: old ? old.active : true, organic: v.farming === 'organic', cert: String(v.cert || '').trim() })}
          check={(v) => (v.farming === 'organic' ? [] : v.cert ? [t('A certificate number is only for organic fields.', 'رقم الشهادة للحقول العضوية فقط.')] : [])}
          onChange={(next, what) => { setSuppliers((all) => all.map((o) => (o.id === s.id ? { ...o, fields: next } : o))); saved(role, what); }}
        />
      </div>
    </>
  );

  const current = tabs.find(([k]) => k === tab)!;

  return (
    <Shell active="MasterData" title={t('Master data', 'البيانات الأساسية')} subtitle={t('The lists the other screens use.', 'القوائم التي تستخدمها باقي الشاشات.')}>
      {toast ? <div className="m-toast" role="status"><span>{toast}</span><button type="button" onClick={() => setToast('')}>{t('Dismiss', 'إخفاء')}</button></div> : null}

      <div className="m-tabs" role="tablist" aria-label={t('List', 'القائمة')}>
        {tabs.map(([k, label]) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={'m-tab' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{label}</button>)}
      </div>

      <section className="m-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid #EEF0ED' }} className="m-muted">{x(current[2])}</div>
        {tab === 'sup' ? (
          <ListTable<Supplier>
            items={suppliers} one={l('supplier', 'مورد')} cols={[NAME, AR]}
            toVals={(r) => ({ name: r.name, ar: r.ar || '' })}
            make={(v, old) => ({ id: old ? old.id : uid(String(v.name), suppliers.map((o) => o.id)), ...nameBits(v), active: old ? old.active : true, fields: old ? old.fields : [] })}
            onChange={(next, what) => { setSuppliers(next); saved(role, what); }}
            sub={(r) => r.fields.length ? r.fields.map((f) => `${x(l(f.name, f.ar || f.name))} · ${f.organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي')}`).join('  |  ') : t('No fields yet. Open Fields to add one.', 'لا توجد حقول بعد. افتح الحقول لإضافة حقل.')}
            expand={fieldsOf} expandLabel={(r) => t(`Fields (${r.fields.length})`, `الحقول (${r.fields.length})`)}
          />
        ) : null}
        {tab === 'prod' ? (
          <ListTable<Product>
            items={products} one={l('product', 'منتج')}
            cols={[NAME, AR, { k: 'code', label: l('Code', 'الرمز'), kind: 'code', req: true }, { k: 'sieving', label: l('Sieving', 'التنخيل'), kind: 'yesno' }, { k: 'sizing', label: l('Sizing', 'التدريج'), kind: 'yesno' }]}
            toVals={(r) => ({ name: r.name, ar: r.ar || '', code: r.id, sieving: r.sieving, sizing: r.sizing })}
            make={(v, old) => ({ id: old ? old.id : String(v.code), ...nameBits(v), active: old ? old.active : true, sieving: !!v.sieving, sizing: !!v.sizing })}
            check={(v, old) => (!/^[A-Z]{3}$/.test(String(v.code)) ? [t('The code must be exactly 3 letters.', 'يجب أن يتكون الرمز من 3 أحرف بالضبط.')]
              : !old && products.some((p) => p.id === v.code) ? [t(`The code ${v.code} is already used.`, `الرمز ${v.code} مستخدم بالفعل.`)] : [])}
            onChange={(next, what) => { setProducts(next); saved(role, what); }}
          />
        ) : null}
        {tab === 'cust' ? (
          <ListTable<Customer>
            items={customers} one={l('customer', 'عميل')} cols={[NAME, AR]}
            toVals={(r) => ({ name: r.name, ar: r.ar || '' })}
            make={(v, old) => ({ id: old ? old.id : uid(String(v.name), customers.map((o) => o.id)), ...nameBits(v), active: old ? old.active : true })}
            onChange={(next, what) => { setCustomers(next); saved(role, what); }}
          />
        ) : null}
        {tab === 'pack' ? (
          <ListTable<Pack>
            items={packs} one={l('packaging type', 'نوع عبوة')} cols={[NAME, AR, { k: 'net', label: l('Net kg per unit', 'الصافي لكل وحدة (كجم)'), kind: 'number', req: true }]}
            toVals={(r) => ({ name: r.name, ar: r.ar || '', net: String(r.net) })}
            make={(v, old) => ({ id: old ? old.id : uid(String(v.name), packs.map((o) => o.id)), ...nameBits(v), active: old ? old.active : true, net: Number(v.net) })}
            onChange={(next, what) => { setPacks(next); saved(role, what); }}
          />
        ) : null}
        {tab === 'loc' ? (
          <ListTable<Loc>
            items={locs} one={l('location', 'موقع')} cols={[NAME, AR, { k: 'allowed', label: l('Allowed stock', 'المخزون المسموح'), kind: 'allowed' }]}
            toVals={(r) => ({ name: r.name, ar: r.ar || '', allowed: r.allowed })}
            make={(v, old) => ({ id: old ? old.id : uid(String(v.name), locs.map((o) => o.id)), ...nameBits(v), active: old ? old.active : true, allowed: v.allowed as Loc['allowed'] })}
            onChange={(next, what) => { setLocs(next); saved(role, what); }}
          />
        ) : null}
      </section>
      <div className="m-muted" style={{ fontSize: 13 }}>
        {t('Records are never deleted: deactivate one you no longer need. It leaves the dropdowns but stays in history.', 'لا تُحذف السجلات: عطّل ما لم تعد بحاجة إليه. يختفي من القوائم لكنه يبقى في السجل.')}
      </div>
    </Shell>
  );
}
