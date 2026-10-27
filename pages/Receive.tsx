import React, { useState } from 'react';
import { Shell } from '../lib/Shell';
import { useApp } from '../lib/app';
import { useStore, useNames, nameL } from '../lib/store';

export const title = 'Receive a delivery';

const fmt = (n: number) => Number(n).toLocaleString('en-US');
const num = (s: string) => Number(s) || 0;

export default function Receive() {
  const { t, x, role } = useApp();
  const { raws, setRaws, suppliers, products, log } = useStore();
  const { prodL, supL } = useNames();
  // supplier and field come from Master data. Organic or conventional comes from the field, so it is never typed.
  const SOURCES = suppliers.filter((o) => o.active).flatMap((o) => o.fields.filter((f) => f.active).map((f) => ({ sup: o.id, fieldId: f.id, field: nameL(f, f.id), organic: f.organic })));
  const PRODUCTS = products.filter((p) => p.active).map((p) => p.id);
  const [pc, setPc] = useState(PRODUCTS[0] || '');
  const [src, setSrc] = useState(0);
  const [gross, setGross] = useState('');
  const [tare, setTare] = useState('');
  const [moist, setMoist] = useState('');
  const [fm, setFm] = useState('');
  const [test, setTest] = useState<'pass' | 'fail'>('pass');
  const [rate, setRate] = useState('');
  const [sent, setSent] = useState<string>('');

  const net = Math.max(0, num(gross) - num(tare));
  const badWeight = num(gross) > 0 && num(tare) >= num(gross);
  const moistHigh = num(moist) > 12;
  const rateOdd = rate !== '' && (num(rate) < 70 || num(rate) > 92);
  const source = SOURCES[src] || SOURCES[0];
  const ready = !!source && !!pc && num(gross) > 0 && !badWeight && moist !== '' && rate !== '' && num(rate) > 0 && num(rate) <= 100;

  const prefix = `RM-${pc}-261022-`;
  const nextCode = prefix + String(raws.filter((r) => r.id.startsWith(prefix)).length + 1).padStart(2, '0');

  const warns: string[] = [];
  if (moistHigh) warns.push(t('Moisture is above 12%.', 'الرطوبة أعلى من 12%.'));
  if (test === 'fail') warns.push(t('The test failed.', 'فشل الفحص.'));
  if (rateOdd) warns.push(t('The agreed rate is unusual. Lots this season were agreed at 78–85%.', 'نسبة الإنتاجية المتفق عليها غير معتادة. اتُّفق على 78–85% في دفعات هذا الموسم.'));

  const send = () => {
    setRaws((rs) => [...rs, { id: nextCode, pc, kg: net, supplier: source.sup, field: source.fieldId, rate: num(rate), organic: source.organic, status: 'wait', moisture: moist + '%', moistureHigh: moistHigh }]);
    log(role, { en: `Received ${nextCode}, ${fmt(net)} kg`, ar: `استلام ${nextCode}، ${fmt(net)} كجم` });
    setSent(nextCode);
  };
  const again = () => { setSent(''); setGross(''); setTare(''); setMoist(''); setFm(''); setRate(''); setTest('pass'); };

  if (sent) {
    return (
      <Shell active="Receive" title={t('Receive a delivery', 'استلام شحنة')}>
        <section className="m-card" style={{ padding: 28, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{t('Sent for approval', 'تم الإرسال للاعتماد')}</div>
          <div className="mono" style={{ fontSize: 22 }}>{sent}</div>
          <div className="m-muted">{t(`${fmt(net)} kg received. The quality manager will approve or reject it.`, `تم استلام ${fmt(net)} كجم. سيعتمدها مدير الجودة أو يرفضها.`)}</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" className="m-btn" onClick={() => window.print()}>{t('Print lot label', 'طباعة ملصق الدفعة')}</button>
            <button type="button" className="m-btn pri" onClick={again}>{t('Receive another', 'استلام شحنة أخرى')}</button>
            <a className="m-btn" href="#/Production">{t('Go to Production', 'الانتقال إلى التشغيل')}</a>
          </div>
        </section>
      </Shell>
    );
  }

  return (
    <Shell
      active="Receive"
      title={t('Receive a delivery', 'استلام شحنة')}
      subtitle={<>{t('New lot', 'دفعة جديدة')} <span className="mono">{nextCode}</span></>}
    >
      <section className="m-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <h2 className="m-h2" style={{ marginTop: 0 }}>{t('1. Product and source', '1. المنتج والمصدر')}</h2>
          <div className="m-seg" role="group" aria-label={t('Product', 'المنتج')}>
            {PRODUCTS.map((p) => <button key={p} type="button" className={pc === p ? 'on' : ''} onClick={() => setPc(p)}>{x(prodL(p))}</button>)}
          </div>
          <div className="m-seg" style={{ marginTop: 12 }} role="group" aria-label={t('Supplier and field', 'المورد والحقل')}>
            {SOURCES.map((o, i) => (
              <button key={i} type="button" className={src === i ? 'on' : ''} onClick={() => setSrc(i)}>
                {x(supL(o.sup))} · {x(o.field)} · {o.organic ? t('Organic', 'عضوي') : t('Conventional', 'تقليدي')}
              </button>
            ))}
          </div>
          <div className="m-muted" style={{ marginTop: 10, fontSize: 13 }}>{t('A new supplier or field?', 'مورد أو حقل جديد؟')} <a href="#/MasterData">{t('Add it in Master data', 'أضفه من البيانات الأساسية')}</a></div>
        </div>

        <div>
          <h2 className="m-h2" style={{ marginTop: 0 }}>{t('2. Weigh', '2. الوزن')}</h2>
          <div className="m-grid">
            <div className="m-fl"><label>{t('Gross weight (kg)', 'الوزن القائم (كجم)')}</label><input type="number" autoFocus value={gross} onChange={(e) => setGross(e.target.value)} /></div>
            <div className="m-fl"><label>{t('Tare (kg)', 'وزن التغليف (كجم)')}</label><input type="number" value={tare} onChange={(e) => setTare(e.target.value)} style={badWeight ? { borderColor: '#C8372D', borderWidth: 2 } : undefined} /></div>
            <div className="m-fl"><label>{t('Net weight', 'الوزن الصافي')}</label><div style={{ fontSize: 28, fontWeight: 600, color: '#14503A', minHeight: 50, display: 'flex', alignItems: 'center' }}>{fmt(net)} {t('kg', 'كجم')}</div></div>
          </div>
          {badWeight ? <div className="m-note bad" style={{ marginTop: 10 }} role="alert">{t('Tare must be less than the gross weight.', 'يجب أن يكون وزن التغليف أقل من الوزن القائم.')}</div> : null}
        </div>

        <div>
          <h2 className="m-h2" style={{ marginTop: 0 }}>{t('3. Analysis (CCP 1)', '3. التحليل (نقطة التحكم الحرجة 1)')}</h2>
          <div className="m-grid">
            <div className="m-fl"><label>{t('Moisture (%)', 'الرطوبة (%)')}</label><input type="number" value={moist} onChange={(e) => setMoist(e.target.value)} style={moistHigh ? { borderColor: '#D9A13B', borderWidth: 2 } : undefined} /></div>
            <div className="m-fl"><label>{t('Foreign matter (%)', 'الشوائب (%)')}</label><input type="number" value={fm} onChange={(e) => setFm(e.target.value)} /></div>
            <div className="m-fl"><label>{t('Agreed yield rate (%)', 'نسبة الإنتاجية المتفق عليها (%)')}</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} style={rateOdd ? { borderColor: '#D9A13B', borderWidth: 2 } : undefined} /></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginTop: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#3C4742' }}>{t('Test result', 'نتيجة الفحص')}</span>
            <div className="m-seg">
              <button type="button" className={test === 'pass' ? 'on' : ''} onClick={() => setTest('pass')}>{t('Pass', 'ناجح')}</button>
              <button type="button" className={test === 'fail' ? 'on bad' : ''} onClick={() => setTest('fail')}>{t('Fail', 'فاشل')}</button>
            </div>
          </div>
          {rate !== '' && net > 0 ? <div className="m-note ok" style={{ marginTop: 12 }}>{t(`The farmer is paid for ${fmt(Math.round((net * num(rate)) / 100))} kg (${fmt(net)} kg × ${rate}%).`, `يُدفع للمزارع ثمن ${fmt(Math.round((net * num(rate)) / 100))} كجم (${fmt(net)} كجم × ${rate}%).`)}</div> : null}
          {warns.length ? <div className="m-note warn" style={{ marginTop: 10 }}>{warns.join(' ')}</div> : null}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
          {!ready ? <span className="m-muted">{t('Enter the weights, moisture and agreed rate to continue.', 'أدخل الأوزان والرطوبة ونسبة الإنتاجية للمتابعة.')}</span> : null}
          <button type="button" className="m-btn pri big" style={{ minHeight: 54 }} disabled={!ready} onClick={send}>{t('Send for approval', 'إرسال للاعتماد')}</button>
        </div>
      </section>
    </Shell>
  );
}
