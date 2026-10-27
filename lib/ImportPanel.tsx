import React, { useState } from 'react';
import { useApp } from './app';
import { useStore } from './store';

const TEMPLATE = 'lot,product,supplier,kg,agreed_yield,farming\nRM-HIB-260901-01,Hibiscus,Wadi Green Co-op,1200,82,Organic\n';

/** Opening raw stock at go-live (FR19). Reads a CSV, checks each row, then imports the good ones as ready lots. */
export function ImportPanel({ onDone }: { onDone: (msg: string) => void }) {
  const { t, role } = useApp();
  const { setRaws, products, suppliers, log } = useStore();
  const [rows, setRows] = useState<{ ok: boolean; line: string[]; why: string }[] | null>(null);

  const productId = (v: string) => products.find((p) => p.name.toLowerCase() === v.toLowerCase() || p.id.toLowerCase() === v.toLowerCase())?.id;
  const supplierId = (v: string) => suppliers.find((s) => s.name.toLowerCase() === v.toLowerCase())?.id;

  const read = (file: File) => {
    file.text().then((txt) => {
      const lines = txt.replace(/^﻿/, '').split(/\r?\n/).filter((r) => r.trim());
      setRows(lines.slice(1).map((ln) => {
        const c = ln.split(',').map((s) => s.trim().replace(/^"|"$/g, ''));
        const [lot, product, supplier, kg, rate] = c;
        const why = !lot ? t('Missing lot code', 'رقم الدفعة مفقود')
          : !productId(product || '') ? t('Unknown product', 'منتج غير معروف')
          : !supplierId(supplier || '') ? t('Unknown supplier', 'مورد غير معروف')
          : !(Number(kg) > 0) ? t('kg must be more than 0', 'يجب أن تكون الكمية أكبر من 0')
          : !(Number(rate) > 0 && Number(rate) <= 100) ? t('Agreed yield must be 1–100', 'يجب أن تكون الإنتاجية بين 1 و100') : '';
        return { ok: !why, line: c, why };
      }));
    });
  };
  const doImport = () => {
    if (!rows) return;
    const good = rows.filter((r) => r.ok);
    setRaws((rs) => [...rs, ...good.map((r) => {
      const [lot, product, supplier, kg, rate, farming] = r.line;
      return { id: lot, pc: productId(product)!, kg: Number(kg), supplier: supplierId(supplier)!, rate: Number(rate), organic: /organic|عضوي/i.test(farming || ''), status: 'ready' as const };
    })]);
    log(role, { en: `Imported ${good.length} opening lots`, ar: `استيراد ${good.length} دفعة افتتاحية` }, 'edit');
    onDone(t(`${good.length} opening lots imported. They are ready to start in Production.`, `تم استيراد ${good.length} دفعة افتتاحية. أصبحت جاهزة للبدء في التشغيل.`));
    setRows(null);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([TEMPLATE], { type: 'text/csv;charset=utf-8' }));
    const el = document.createElement('a'); el.href = url; el.download = 'opening-stock-template.csv'; el.click(); URL.revokeObjectURL(url);
  };

  return (
    <section className="m-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 className="m-cardh" style={{ padding: 0 }}>{t('Import opening stock', 'استيراد المخزون الافتتاحي')}</h2>
      <div className="m-muted">{t('Use this once at go-live. Save your Excel sheet as CSV. Columns: lot, product, supplier, kg, agreed_yield, farming. Products and suppliers must already be in Master data.', 'استخدمه مرة واحدة عند بدء التشغيل. احفظ جدول إكسل بصيغة CSV. الأعمدة: lot, product, supplier, kg, agreed_yield, farming. يجب أن تكون المنتجات والموردون موجودين في البيانات الأساسية.')}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <button type="button" className="m-btn" onClick={download}>{t('Download template', 'تنزيل النموذج')}</button>
        <input type="file" accept=".csv,text/csv" aria-label={t('Choose a CSV file', 'اختر ملف CSV')} onChange={(e) => e.target.files && e.target.files[0] && read(e.target.files[0])} />
      </div>
      {rows ? (
        <>
          <div className="m-tbl"><div>
            <div className="m-tr h"><span className="m-td w">{t('Lot', 'الدفعة')}</span><span className="m-td">{t('Product', 'المنتج')}</span><span className="m-td">{t('Supplier', 'المورد')}</span><span className="m-td n">{t('kg', 'كجم')}</span><span className="m-td w">{t('Check', 'الفحص')}</span></div>
            {rows.map((r, i) => (
              <div key={i} className="m-tr"><span className="m-td w mono">{r.line[0]}</span><span className="m-td">{r.line[1]}</span><span className="m-td">{r.line[2]}</span><span className="m-td n">{r.line[3]}</span>
                <span className="m-td w"><span className={'m-badge ' + (r.ok ? 'ok' : 'bad')}>{r.ok ? t('OK', 'سليم') : r.why}</span></span></div>
            ))}
          </div></div>
          <div className="m-modal-actions">
            <button type="button" className="m-btn" onClick={() => setRows(null)}>{t('Cancel', 'إلغاء')}</button>
            <button type="button" className="m-btn pri" disabled={!rows.some((r) => r.ok)} onClick={doImport}>{t(`Import ${rows.filter((r) => r.ok).length} lots`, `استيراد ${rows.filter((r) => r.ok).length} دفعة`)}</button>
          </div>
        </>
      ) : null}
    </section>
  );
}
