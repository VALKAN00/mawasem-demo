import { l, L } from './app';
import { LotRecord, RECORDS, Tone } from './records';
import { Alert, AuditEntry, Batch, Fin, Raw, Ship, Supplier, Step, rawSummary } from './store';

export interface Snapshot { raws: Raw[]; batches: Batch[]; fins: Fin[]; ships: Ship[]; suppliers: Supplier[]; audit: AuditEntry[]; alerts: Alert[] }
export interface Namer { prodL: (id: string) => L; supL: (id: string) => L; locL: (id: string) => L; custL: (id: string) => L; packL: (id: string) => L }

const kgL = (n: number) => l(`${fmt(n)} kg`, `${fmt(n)} كجم`);
const fmt = (n: number) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 });
const STEP: Record<Step, L> = { sieving: l('Sieving', 'التنخيل'), sizing: l('Sizing', 'التدريج'), metal: l('Metal detector', 'كاشف المعادن'), packing: l('Packing', 'التعبئة') };
const GREEN = '#1F6B4F', LIGHT = '#7FB496', GREY = '#B9C2BC', RED = '#C8372D', BLUE = '#2D6DB5', GOLD = '#D9A13B';
const date = (d: string) => d;
const farming = (organic: boolean) => (organic ? l('Organic', 'عضوي') : l('Conventional', 'تقليدي'));
const PROD_BACK = { label: l('Production', 'التشغيل'), href: '#/Production' };
const STOCK_BACK = { label: l('Stock', 'المخزون'), href: '#/Stock' };

const stepRows = (b: Batch): LotRecord['steps'] => b.log.map((s) => [b.id, STEP[s.step], fmt(s.kgIn), fmt(s.kgOut), fmt(s.waste), s.result === 'fail' ? l('Failed', 'فاشل') : s.result === 'cleared' ? l('Cleared', 'تم السماح') : s.result === 'pass' ? l('Pass', 'ناجح') : s.by ? l(`By-product ${fmt(s.by)} kg`, `ثانوي ${fmt(s.by)} كجم`) : '', date(s.date)]);
const history = (code: string, audit: AuditEntry[]): LotRecord['history'] => audit.filter((a) => a.what.en.includes(code) || a.what.ar.includes(code)).map((a) => [a.when, a.what, a.who]);
const bar = (total: number, parts: [number, string, L][]): LotRecord['bar'] => parts.filter(([n]) => n > 0.05).map(([n, color, label]) => [Math.round((n / total) * 1000) / 10, color, label]);

/** Has the store got enough on this code to describe it (instead of the fixed sample for that code)? */
function known(code: string, s: Snapshot): boolean {
  const sample = Object.values(RECORDS).some((o) => o.code === code);
  if (code.startsWith('RM-')) {
    const r = s.raws.find((o) => o.id === code);
    return !!r && (!sample || s.batches.some((b) => b.sources.some((o) => o.raw === code)));
  }
  if (code.startsWith('PB-')) return s.batches.some((b) => b.id === code);
  if (code.startsWith('FG-') || code.startsWith('BL-')) {
    const f = s.fins.find((o) => o.code === code);
    return !!f && (!sample || !!f.batch || !!f.recipe);
  }
  return false;
}

/** The record for a code: real data from the store when it has lineage, otherwise the fixed sample for that code. */
export function recordFor(code: string, kind: string, s: Snapshot, n: Namer): LotRecord {
  if (code && known(code, s)) { const r = build(code, s, n); if (r) return r; }
  const fixed = Object.values(RECORDS).find((o) => o.code === code);
  return fixed || RECORDS[kind] || RECORDS.raw;
}

function build(code: string, s: Snapshot, n: Namer): LotRecord | null {
  if (code.startsWith('RM-')) return rawRecord(code, s, n);
  if (code.startsWith('PB-')) return batchRecord(code, s, n);
  if (code.startsWith('FG-') || code.startsWith('BL-')) return finRecord(code, s, n);
  return null;
}

function rawRecord(code: string, s: Snapshot, n: Namer): LotRecord | null {
  const raw = s.raws.find((o) => o.id === code);
  if (!raw) return null;
  const sum = rawSummary(raw, s.batches);
  const sup = s.suppliers.find((o) => o.id === raw.supplier);
  const field = sup && sup.fields.find((f) => f.id === raw.field);
  const status: Record<Raw['status'], [L, Tone]> = { wait: [l('Waiting approval', 'بانتظار الاعتماد'), 'warn'], ready: [l('Approved', 'معتمدة'), 'ok'], used: [l('Approved', 'معتمدة'), 'ok'], rejected: [l('Rejected', 'مرفوضة'), 'bad'] };
  const fins = s.fins.filter((f) => f.batch && sum.batches.some((b) => b.id === f.batch));
  const alert = s.alerts.find((a) => a.code === code);
  const action: LotRecord['action'] = alert && !alert.reviewed ? { type: 'review', label: l('Review yield alert', 'مراجعة تنبيه الإنتاجية'), qmOnly: true, imNote: l('Waiting for the quality manager to review the yield alert.', 'بانتظار مراجعة مدير الجودة لتنبيه الإنتاجية.') }
    : raw.status === 'wait' ? { type: 'link', label: l('Approve in Approvals', 'الاعتماد من صفحة الاعتمادات'), href: '#/Approvals', qmOnly: true, imNote: l('Waiting for the quality manager to approve this lot.', 'بانتظار اعتماد مدير الجودة لهذه الدفعة.') }
    : raw.status === 'ready' ? { type: 'link', label: l('Start a batch', 'بدء دفعة تشغيل'), href: '#/Production' } : { type: 'done' };
  const total = raw.kg;
  return {
    kind: l('Raw lot', 'دفعة خام'), back: STOCK_BACK, code, line: l(`${n.prodL(raw.pc).en} · ${fmt(raw.kg)} kg · ${n.supL(raw.supplier).en}`, `${n.prodL(raw.pc).ar} · ${fmt(raw.kg)} كجم · ${n.supL(raw.supplier).ar}`),
    chips: [status[raw.status], ...(raw.status === 'ready' || raw.status === 'used' ? [[l('Locked', 'مقفلة'), 'mute'] as [L, Tone]] : [])],
    action,
    details: [
      [l('Supplier', 'المورد'), n.supL(raw.supplier)],
      [l('Field', 'الحقل'), field ? l(field.name, field.ar || field.name) : '—'],
      [l('Farming', 'نوع الزراعة'), farming(raw.organic)],
      [l('Net weight', 'الوزن الصافي'), kgL(raw.kg)],
      ...(raw.moisture ? [[l('Moisture', 'الرطوبة'), raw.moisture] as [L, string]] : []),
      [l('Agreed yield', 'الإنتاجية المتفق عليها'), l(`${raw.rate}% · farmer paid for ${fmt(sum.expected)} kg`, `${raw.rate}% · يُدفع للمزارع ثمن ${fmt(sum.expected)} كجم`)],
    ],
    where: [
      ...sum.batches.map((b) => ({ a: b.id as string | L, b: kgL(b.kg), tag: (b.closed ? (b.rejected ? l('Rejected', 'مرفوضة') : l('Packed', 'معبأة')) : b.held ? l('On hold', 'موقوفة') : l('In process', 'قيد التشغيل')) as string | L, tone: (b.rejected || b.held ? 'bad' : b.closed ? 'ok' : 'info') as Tone })),
      ...fins.map((f) => ({ a: f.code as string | L, b: kgL(f.kg), tag: n.locL(f.loc) as string | L, tone: 'info' as Tone })),
      ...(sum.stock > 0 ? [{ a: l('Not started', 'لم تبدأ'), b: kgL(sum.stock), tag: l('In stock', 'في المخزون'), tone: 'ok' as Tone }] : []),
    ],
    stepHead: l('Batch', 'دفعة التشغيل'),
    steps: sum.batches.flatMap(stepRows),
    nums: sum.complete
      ? [[l(`Expected (${raw.rate}%)`, `المتوقع (${raw.rate}%)`), `${fmt(sum.expected)} kg`, '', ''], [l(`Actual (${(sum.fin / total * 100).toFixed(1)}%)`, `الفعلي (${(sum.fin / total * 100).toFixed(1)}%)`), `${fmt(sum.fin)} kg`, '', ''],
        [l('Variance', 'الفرق'), `${sum.variance > 0 ? '+' : sum.variance < 0 ? '−' : ''}${fmt(Math.abs(sum.variance))} kg`, l(`${Math.abs(sum.pct).toFixed(2)}% ${sum.variance < 0 ? 'below' : 'above'} expected`, `${Math.abs(sum.pct).toFixed(2)}% ${sum.variance < 0 ? 'أقل من' : 'أكثر من'} المتوقع`), sum.variance < 0 ? 'bad' : 'ok']]
      : [[l('Expected (at the agreed rate)', 'المتوقع (بالنسبة المتفق عليها)'), `${fmt(sum.expected)} kg`, '', ''], [l('In process', 'قيد التشغيل'), `${fmt(sum.proc)} kg`, '', ''], [l('Finished so far', 'المنتج النهائي حتى الآن'), `${fmt(sum.fin)} kg`, '', '']],
    barTitle: l(`Where the ${fmt(total)} kg ${sum.complete ? 'went' : 'is'}`, `أين ${sum.complete ? 'ذهبت' : 'توجد'} الـ ${fmt(total)} كجم`),
    bar: bar(total, [[sum.fin, GREEN, l(`Finished ${fmt(sum.fin)} kg`, `نهائي ${fmt(sum.fin)} كجم`)], [sum.by, LIGHT, l(`By-products ${fmt(sum.by)} kg`, `منتجات ثانوية ${fmt(sum.by)} كجم`)], [sum.waste, GREY, l(`Waste and loss ${fmt(sum.waste)} kg`, `فاقد وهدر ${fmt(sum.waste)} كجم`)], [sum.proc, BLUE, l(`In process ${fmt(sum.proc)} kg`, `قيد التشغيل ${fmt(sum.proc)} كجم`)], [sum.stock, GOLD, l(`Not started ${fmt(sum.stock)} kg`, `لم تبدأ ${fmt(sum.stock)} كجم`)]]),
    chain: [l(`${n.supL(raw.supplier).en}${field ? ' · ' + field.name : ''}`, `${n.supL(raw.supplier).ar}${field ? ' · ' + (field.ar || field.name) : ''}`), code, ...(sum.batches.length ? [sum.batches.map((b) => b.id).join(' · ')] : []), ...(fins.length ? [fins.map((f) => f.code).join(' · ')] : [])],
    traceNote: l('Open the trace to follow every batch, finished lot and shipment made from this lot.', 'افتح التتبع لمتابعة كل دفعة تشغيل ودفعة نهائية وشحنة صُنعت من هذه الدفعة.'),
    editField: l('Moisture (%)', 'الرطوبة (%)'), editNow: raw.moisture || '', editNew: raw.moisture || '',
    history: history(code, s.audit),
  };
}

function batchRecord(code: string, s: Snapshot, n: Namer): LotRecord | null {
  const b = s.batches.find((o) => o.id === code);
  if (!b) return null;
  const fins = s.fins.filter((f) => f.batch === code);
  const inProc = b.closed ? 0 : b.kg;
  const total = b.kgIn;
  const chips: [L, Tone][] = b.closed ? (b.rejected ? [[l('Rejected', 'مرفوضة'), 'bad']] : [[l('Completed', 'مكتملة'), 'ok']]) : b.held ? [[l('On hold', 'موقوفة'), 'bad']] : [[l('In process', 'قيد التشغيل'), 'info']];
  const action: LotRecord['action'] = b.closed ? { type: 'done' } : b.held ? { type: 'link', label: l('Clear or reject', 'السماح أو الرفض'), href: '#/Approvals', qmOnly: true, imNote: l('Waiting for the quality manager to clear or reject this batch.', 'بانتظار مدير الجودة للسماح بمتابعة هذه الدفعة أو رفضها.') } : { type: 'link', label: l('Open in Production', 'فتح في التشغيل'), href: '#/Production' };
  return {
    kind: l('Batch', 'دفعة تشغيل'), back: PROD_BACK, code, line: l(`${n.prodL(b.pc).en} · ${fmt(b.kgIn)} kg in · ${b.organic ? 'organic' : 'conventional'}`, `${n.prodL(b.pc).ar} · ${fmt(b.kgIn)} كجم داخل · ${b.organic ? 'عضوي' : 'تقليدي'}`),
    chips, action,
    details: [
      [l('Input lots', 'الدفعات الخام'), b.sources.map((o) => `${o.raw} · ${fmt(o.kg)}`).join(', ')],
      [l('Product', 'المنتج'), l(`${n.prodL(b.pc).en} · ${farming(b.organic).en.toLowerCase()}`, `${n.prodL(b.pc).ar} · ${farming(b.organic).ar}`)],
      [l('Steps', 'المراحل'), b.log.length ? b.log.map((o) => STEP[o.step].en).join(', ') : '—'],
      [l('In process now', 'قيد التشغيل الآن'), kgL(inProc)],
      ...(b.closed && !b.rejected ? [[l('Finished', 'المنتج النهائي'), kgL(b.finKg || 0)] as [L, L]] : []),
    ],
    where: [
      ...fins.map((f) => ({ a: f.code as string | L, b: kgL(f.kg), tag: n.locL(f.loc) as string | L, tone: 'info' as Tone })),
      ...(b.by ? [{ a: l('By-products', 'منتجات ثانوية'), b: kgL(b.by), tag: l('In stock', 'في المخزون'), tone: 'ok' as Tone }] : []),
      ...(!b.closed ? [{ a: l('Batch kg', 'كمية الدفعة'), b: kgL(b.kg), tag: b.held ? l('On hold', 'موقوفة') : l('In process', 'قيد التشغيل'), tone: (b.held ? 'bad' : 'info') as Tone }] : []),
    ],
    stepHead: l('Batch', 'دفعة التشغيل'),
    steps: stepRows(b),
    nums: [[l('In', 'الداخل'), `${fmt(b.kgIn)} kg`, '', ''], [b.closed ? l('Finished', 'النهائي') : l('In process', 'قيد التشغيل'), `${fmt(b.closed ? b.finKg || 0 : b.kg)} kg`, '', b.held ? 'bad' : ''], [l('Waste and loss', 'فاقد وهدر'), `${fmt(b.waste)} kg`, '', '']],
    barTitle: l(`Where the ${fmt(total)} kg ${b.closed ? 'went' : 'is'}`, `أين ${b.closed ? 'ذهبت' : 'توجد'} الـ ${fmt(total)} كجم`),
    bar: bar(total, [[b.closed ? b.finKg || 0 : 0, GREEN, l(`Finished ${fmt(b.finKg || 0)} kg`, `نهائي ${fmt(b.finKg || 0)} كجم`)], [inProc, BLUE, l(`In process ${fmt(inProc)} kg`, `قيد التشغيل ${fmt(inProc)} كجم`)], [b.by, LIGHT, l(`By-products ${fmt(b.by)} kg`, `منتجات ثانوية ${fmt(b.by)} كجم`)], [b.waste, GREY, l(`Waste and loss ${fmt(b.waste)} kg`, `فاقد وهدر ${fmt(b.waste)} كجم`)]]),
    chain: [b.sources.map((o) => o.raw).join(' · '), code, ...(fins.length ? [fins.map((f) => f.code).join(' · ')] : [])],
    traceNote: fins.length ? l('Its finished lots can be followed to the customer in Trace.', 'يمكن تتبع دفعاتها النهائية حتى العميل من صفحة التتبع.') : l('No finished lots yet. They are created when this batch is packed and labelled.', 'لا توجد دفعات نهائية بعد. تُنشأ عند تعبئة هذه الدفعة ووضع الملصقات.'),
    editField: l('Step output (kg)', 'ناتج المرحلة (كجم)'), editNow: String(b.kg), editNew: String(b.kg),
    history: history(code, s.audit),
  };
}

function finRecord(code: string, s: Snapshot, n: Namer): LotRecord | null {
  const f = s.fins.find((o) => o.code === code);
  if (!f) return null;
  const isBlend = code.startsWith('BL-');
  const batch = f.batch ? s.batches.find((b) => b.id === f.batch) : undefined;
  const ship = s.ships.find((o) => o.lines.some((r) => r.lot === code));
  const line = ship && ship.lines.find((r) => r.lot === code);
  return {
    kind: isBlend ? l('Blend', 'خلطة') : l('Finished lot', 'دفعة نهائية'), back: STOCK_BACK, code,
    line: l(`${f.product.en} · ${fmt(f.kg)} kg · ${f.bags} bags`, `${f.product.ar} · ${fmt(f.kg)} كجم · ${f.bags} كيساً`),
    chips: [[l('Available', 'متاحة'), 'ok'], ...(ship ? [[l(`For ${ship.id}`, `للشحنة ${ship.id}`), 'info'] as [L, Tone]] : []), [farming(f.organic), f.organic ? 'ok' : 'mute']],
    action: ship ? { type: 'link', label: l('Open shipment', 'فتح الشحنة'), href: '#/Shipments' } : { type: 'link', label: l('Add to a shipment', 'إضافة إلى شحنة'), href: '#/Shipments' },
    details: [
      [isBlend ? l('Recipe', 'الوصفة') : l('Made from', 'مصنوعة من'), f.recipe ? f.recipe.map((o) => `${o.code} · ${fmt(o.kg)} kg`).join(', ') : batch ? `${batch.id} · ${batch.sources.map((o) => o.raw).join(', ')}` : '—'],
      [l('Packaging', 'العبوة'), f.pack],
      [l('Net weight', 'الوزن الصافي'), kgL(f.kg)],
      [l('Farming', 'نوع الزراعة'), farming(f.organic)],
      [l('Location', 'الموقع'), n.locL(f.loc)],
    ],
    where: ship ? [{ a: ship.id as string | L, b: l(`${n.custL(ship.customer).en} · ${ship.container}`, `${n.custL(ship.customer).ar} · ${ship.container}`), tag: ship.shipped ? l('Shipped', 'تم الشحن') : l('Open', 'مفتوحة'), tone: (ship.shipped ? 'ok' : 'warn') as Tone }] : [],
    stepHead: isBlend ? l('Input', 'المُدخل') : l('Batch', 'دفعة التشغيل'),
    steps: f.recipe ? f.recipe.map((o) => [o.code, l('Mixing', 'الخلط'), fmt(o.kg), fmt(o.kg), '0', `${Math.round((o.kg / f.kg) * 100)}%`, '']) : batch ? stepRows(batch).filter((r) => (r[1] as L).en === 'Packing') : [],
    nums: [[l('Bags', 'الأكياس'), String(f.bags), f.pack, ''], [l('Net', 'الصافي'), `${fmt(f.kg)} kg`, '', ''], [l('Gross', 'القائم'), `${fmt(line ? line.gross : Math.round(f.kg * 1.01 * 10) / 10)} kg`, '', '']],
    barTitle: l('Recipe', 'الوصفة'),
    bar: f.recipe ? f.recipe.map((o, i) => [Math.round((o.kg / f.kg) * 1000) / 10, i ? GOLD : GREEN, l(`${o.code} ${fmt(o.kg)} kg`, `${o.code} ${fmt(o.kg)} كجم`)] as [number, string, L]) : [],
    chain: [...(f.recipe ? [f.recipe.map((o) => o.code).join(' · ')] : batch ? [batch.sources.map((o) => o.raw).join(' · '), batch.id] : []), code, ...(ship ? [l(n.custL(ship.customer).en, n.custL(ship.customer).ar)] : [])],
    traceNote: l('Backward to the raw lots and fields. Forward to the customer.', 'للخلف إلى الدفعات الخام والحقول. للأمام إلى العميل.'),
    editField: l('Location', 'الموقع'), editNow: n.locL(f.loc).en, editNew: n.locL(f.loc).en,
    history: history(code, s.audit),
  };
}
