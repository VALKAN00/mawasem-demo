import { l, L } from './app';

export type Tone = 'ok' | 'warn' | 'bad' | 'info' | 'mute';
type T = L | string;

export interface LotRecord {
  kind: L;
  back: { label: L; href: string };
  code: string;
  line: L;
  chips: [L, Tone][];
  /** 'review' marks the yield alert as reviewed; 'link' opens a page; 'done' shows "nothing left to do". */
  action: { type: 'review' | 'link' | 'done'; label?: L; href?: string; qmOnly?: boolean; imNote?: L };
  details: [L, T][];
  where: { a: T; b: T; tag: T; tone: Tone; sale?: boolean }[];
  stepHead: L;
  steps: [string, L, string, string, string, T, string][];
  nums: [L, string, T, 'bad' | 'ok' | ''][];
  barTitle: L;
  bar: [number, string, L][];
  chain: T[];
  traceNote: L;
  editField: L;
  editNow: string;
  editNew: string;
  history: [string, T, 'IM' | 'QM' | 'SYS'][];
}

const SIEV = l('Sieving', 'التنخيل');
const SIZE = l('Sizing', 'التدريج');
const MD = l('Metal detector', 'كاشف المعادن');
const PACK = l('Packing', 'التعبئة');
const PASS = l('Pass', 'ناجح');
const FAIL = l('Failed', 'فاشل');
const STOCK_BACK = { label: l('Stock', 'المخزون'), href: '#/Stock' };
const PROD_BACK = { label: l('Production', 'التشغيل'), href: '#/Production' };
const STEP_HEAD = l('Batch', 'دفعة التشغيل');
const GREEN = '#1F6B4F', LIGHT = '#7FB496', GREY = '#B9C2BC', RED = '#C8372D', BLUE = '#2D6DB5', GOLD = '#D9A13B';

export const RECORDS: Record<string, LotRecord> = {
  raw: {
    kind: l('Raw lot', 'دفعة خام'), back: STOCK_BACK, code: 'RM-MNT-261020-01',
    line: l('Mint · 1,000 kg · Al-Nour Farm', 'نعناع · 1,000 كجم · مزرعة النور'),
    chips: [[l('Approved', 'معتمدة'), 'ok'], [l('Locked', 'مقفلة'), 'mute']],
    action: { type: 'review', label: l('Review yield alert', 'مراجعة تنبيه الإنتاجية'), qmOnly: true, imNote: l('Waiting for the quality manager to review the yield alert.', 'بانتظار مراجعة مدير الجودة لتنبيه الإنتاجية.') },
    details: [
      [l('Supplier', 'المورد'), l('Al-Nour Farm', 'مزرعة النور')],
      [l('Field', 'الحقل'), l('Field 7 — River plot', 'الحقل 7 — قطعة النهر')],
      [l('Farming', 'نوع الزراعة'), l('Conventional', 'تقليدي')],
      [l('Gross / net weight', 'الوزن القائم / الصافي'), l('1,036 / 1,000 kg', '1,036 / 1,000 كجم')],
      [l('Moisture · foreign matter', 'الرطوبة · الشوائب'), '10.8% · 0.6%'],
      [l('Agreed yield', 'الإنتاجية المتفق عليها'), l('80% · farmer paid for 800 kg', '80% · يُدفع للمزارع ثمن 800 كجم')],
    ],
    where: [
      { a: 'FG-MNT-261022-01', b: l('450 kg · loading bay', '450 كجم · منصة التحميل'), tag: 'SH-261025-01', tone: 'info' },
      { a: 'FG-MNT-261022-02', b: l('300 kg · in blend', '300 كجم · ضمن خلطة'), tag: 'BL-MNT-261023-01', tone: 'info' },
      { a: l('Sieving residue', 'مخلفات التنخيل'), b: l('95 kg', '95 كجم'), tag: l('Sold', 'مباع'), tone: 'mute' },
      { a: l('Fines', 'المسحوق الناعم'), b: l('45 kg', '45 كجم'), tag: l('In stock', 'في المخزون'), tone: 'ok', sale: true },
    ],
    stepHead: STEP_HEAD,
    steps: [
      ['PB-MNT-261021-01', SIEV, '600', '530', '14', l('Residue 56 kg', 'مخلفات 56 كجم'), '21/10'],
      ['PB-MNT-261021-01', SIZE, '530', '494', '9', l('Fines 27 kg', 'ناعم 27 كجم'), '21/10'],
      ['PB-MNT-261021-01', MD, '494', '494', '0', PASS, '21/10'],
      ['PB-MNT-261021-01', PACK, '494', '450', '27', l('18 bags', '18 كيساً'), '22/10'],
      ['PB-MNT-261021-02', SIEV, '400', '350', '11', l('Residue 39 kg', 'مخلفات 39 كجم'), '21/10'],
      ['PB-MNT-261021-02', SIZE, '350', '322', '10', l('Fines 18 kg', 'ناعم 18 كجم'), '21/10'],
      ['PB-MNT-261021-02', MD, '322', '322', '0', PASS, '21/10'],
      ['PB-MNT-261021-02', PACK, '322', '300', '14', l('12 bags', '12 كيساً'), '22/10'],
    ],
    nums: [
      [l('Expected (80%)', 'المتوقع (80%)'), '800 kg', '', ''],
      [l('Actual (75.0%)', 'الفعلي (75.0%)'), '750 kg', '', ''],
      [l('Variance', 'الفرق'), '−50 kg', l('6.25% below expected', '6.25% أقل من المتوقع'), 'bad'],
    ],
    barTitle: l('Where the 1,000 kg went', 'أين ذهبت الـ 1,000 كجم'),
    bar: [[75, GREEN, l('Finished 750 kg', 'نهائي 750 كجم')], [14, LIGHT, l('By-products 140 kg', 'منتجات ثانوية 140 كجم')], [8.5, GREY, l('Waste 85 kg', 'فاقد 85 كجم')], [2.5, RED, l('Unexplained 25 kg', 'غير مفسَّر 25 كجم')]],
    chain: [l('Al-Nour Farm · Field 7', 'مزرعة النور · الحقل 7'), 'RM-MNT-261020-01', l('2 batches', 'دفعتا تشغيل'), l('2 finished lots · 1 blend', 'دفعتان نهائيتان · خلطة'), l('Verde Herbal Co. · Northfield Teas', 'فيردي هيربال · نورثفيلد تي')],
    traceNote: l('Nothing has left the factory yet except 95 kg of sieving residue sold on 21/10.', 'لم يخرج شيء من المصنع بعد سوى 95 كجم من مخلفات التنخيل بيعت في 21/10.'),
    editField: l('Moisture (%)', 'الرطوبة (%)'), editNow: '10.8', editNew: '10.6',
    history: [
      ['22/10 11:20', l('Yield alert raised: −50 kg against 800 kg expected', 'تنبيه إنتاجية: −50 كجم مقابل 800 كجم متوقعة'), 'SYS'],
      ['22/10 09:40', 'FG-MNT-261022-01 · FG-MNT-261022-02', 'IM'],
      ['21/10 08:00', 'PB-MNT-261021-01 · PB-MNT-261021-02', 'IM'],
      ['20/10 14:05', l('Approved. Agreed yield 80% locked.', 'اعتماد. تم قفل نسبة الإنتاجية 80%.'), 'QM'],
      ['20/10 09:10', l('Received, 1,000 kg net', 'استلام، 1,000 كجم صافي'), 'IM'],
    ],
  },

  batch: {
    kind: l('Batch', 'دفعة تشغيل'), back: PROD_BACK, code: 'PB-MNT-261021-01',
    line: l('Mint · 600 kg in · conventional', 'نعناع · 600 كجم داخل · تقليدي'),
    chips: [[l('Completed', 'مكتملة'), 'ok'], [l('CCP 2 pass', 'نقطة التحكم 2: ناجح'), 'ok']],
    action: { type: 'done' },
    details: [
      [l('Input lot', 'الدفعة الخام'), l('RM-MNT-261020-01 · 600 kg', 'RM-MNT-261020-01 · 600 كجم')],
      [l('Product', 'المنتج'), l('Mint · conventional', 'نعناع · تقليدي')],
      [l('Started', 'البدء'), '21/10/2026 08:00'],
      [l('Operator', 'المشغّل'), l('Inventory manager', 'مدير المخزون')],
      [l('Finished', 'الانتهاء'), '22/10/2026 09:40'],
    ],
    where: [
      { a: 'FG-MNT-261022-01', b: l('450 kg · loading bay', '450 كجم · منصة التحميل'), tag: 'SH-261025-01', tone: 'info' },
      { a: l('Sieving residue', 'مخلفات التنخيل'), b: l('56 kg', '56 كجم'), tag: l('Sold', 'مباع'), tone: 'mute' },
      { a: l('Fines', 'المسحوق الناعم'), b: l('27 kg', '27 كجم'), tag: l('In stock', 'في المخزون'), tone: 'ok' },
    ],
    stepHead: STEP_HEAD,
    steps: [
      ['PB-MNT-261021-01', SIEV, '600', '530', '14', l('Residue 56 kg', 'مخلفات 56 كجم'), '21/10'],
      ['PB-MNT-261021-01', SIZE, '530', '494', '9', l('Fines 27 kg', 'ناعم 27 كجم'), '21/10'],
      ['PB-MNT-261021-01', MD, '494', '494', '0', PASS, '21/10'],
      ['PB-MNT-261021-01', PACK, '494', '450', '27', l('18 bags', '18 كيساً'), '22/10'],
    ],
    nums: [
      [l('In', 'الداخل'), '600 kg', '', ''],
      [l('Finished', 'النهائي'), '450 kg', l('75.0% of input', '75.0% من الداخل'), ''],
      [l('Unexplained', 'غير مفسَّر'), '17 kg', l('2.8% of input', '2.8% من الداخل'), 'bad'],
    ],
    barTitle: l('Where the 600 kg went', 'أين ذهبت الـ 600 كجم'),
    bar: [[75, GREEN, l('Finished 450 kg', 'نهائي 450 كجم')], [13.8, LIGHT, l('By-products 83 kg', 'منتجات ثانوية 83 كجم')], [8.3, GREY, l('Waste 50 kg', 'فاقد 50 كجم')], [2.9, RED, l('Unexplained 17 kg', 'غير مفسَّر 17 كجم')]],
    chain: ['RM-MNT-261020-01', 'PB-MNT-261021-01', 'FG-MNT-261022-01', l('Verde Herbal Co.', 'فيردي هيربال')],
    traceNote: l('Its finished lot is in the loading bay for SH-261025-01.', 'دفعتها النهائية في منصة التحميل للشحنة SH-261025-01.'),
    editField: l('Step output (kg)', 'ناتج المرحلة (كجم)'), editNow: '450', editNew: '452',
    history: [
      ['22/10 09:40', l('Packed 18 bags into FG-MNT-261022-01', 'تعبئة 18 كيساً في FG-MNT-261022-01'), 'IM'],
      ['21/10 15:10', l('Metal detector: pass', 'كاشف المعادن: ناجح'), 'IM'],
      ['21/10 12:05', l('Sizing recorded: 494 kg out', 'تسجيل التدريج: 494 كجم خارج'), 'IM'],
      ['21/10 09:30', l('Sieving recorded: 530 kg out', 'تسجيل التنخيل: 530 كجم خارج'), 'IM'],
      ['21/10 08:00', l('Batch started with 600 kg of RM-MNT-261020-01', 'بدء الدفعة بـ 600 كجم من RM-MNT-261020-01'), 'IM'],
    ],
  },

  fg: {
    kind: l('Finished lot', 'دفعة نهائية'), back: STOCK_BACK, code: 'FG-MNT-261022-01',
    line: l('Dried mint · 450 kg · 18 × 25 kg bags', 'نعناع مجفف · 450 كجم · 18 × كيس 25 كجم'),
    chips: [[l('Approved', 'معتمدة'), 'ok'], [l('For SH-261025-01', 'للشحنة SH-261025-01'), 'info']],
    action: { type: 'link', label: l('Open shipment', 'فتح الشحنة'), href: '#/Shipments' },
    details: [
      [l('Made from', 'مصنوعة من'), 'PB-MNT-261021-01 · RM-MNT-261020-01'],
      [l('Packaging', 'العبوة'), l('25 kg PP bag · label v3', 'كيس بولي بروبيلين 25 كجم · ملصق v3')],
      [l('Net / gross weight', 'الوزن الصافي / القائم'), l('450.0 / 454.5 kg', '450.0 / 454.5 كجم')],
      [l('Farming', 'نوع الزراعة'), l('Conventional', 'تقليدي')],
      [l('Location', 'الموقع'), l('Loading bay', 'منصة التحميل')],
    ],
    where: [{ a: 'SH-261025-01', b: l('Verde Herbal Co. · MSKU 482193-0', 'فيردي هيربال · MSKU 482193-0'), tag: l('Loading', 'قيد التحميل'), tone: 'warn' }],
    stepHead: l('Lot', 'الدفعة'),
    steps: [
      ['FG-MNT-261022-01', l('Weighing & sewing', 'الوزن والخياطة'), '450', '450', '0', l('18 bags', '18 كيساً'), '22/10'],
      ['FG-MNT-261022-01', l('Labeling', 'وضع الملصقات'), '450', '450', '0', l('Label v3 printed', 'طباعة الملصق v3'), '22/10'],
      ['FG-MNT-261022-01', l('Storage', 'التخزين'), '450', '450', '0', l('Rack 04 → loading bay', 'رف 04 ← منصة التحميل'), '24/10'],
    ],
    nums: [
      [l('Bags', 'الأكياس'), '18', l('25 kg PP', 'بولي بروبيلين 25 كجم'), ''],
      [l('Net', 'الصافي'), '450.0 kg', '', ''],
      [l('Gross', 'القائم'), '454.5 kg', '', ''],
    ],
    barTitle: l('', ''), bar: [],
    chain: [l('Al-Nour Farm', 'مزرعة النور'), 'RM-MNT-261020-01', 'PB-MNT-261021-01', 'FG-MNT-261022-01', l('Verde Herbal Co.', 'فيردي هيربال')],
    traceNote: l('Backward to one raw lot and one field. Forward to one customer.', 'للخلف إلى دفعة خام وحقل واحد. للأمام إلى عميل واحد.'),
    editField: l('Location', 'الموقع'), editNow: 'Loading bay', editNew: 'Rack 04',
    history: [
      ['24/10 10:00', l('Moved to loading bay for SH-261025-01', 'نُقلت إلى منصة التحميل للشحنة SH-261025-01'), 'IM'],
      ['22/10 09:45', l('18 labels printed (v3)', 'طباعة 18 ملصقاً (v3)'), 'IM'],
      ['22/10 09:40', l('Created from PB-MNT-261021-01, 450 kg', 'أُنشئت من PB-MNT-261021-01، 450 كجم'), 'IM'],
    ],
  },

  blend: {
    kind: l('Blend', 'خلطة'), back: STOCK_BACK, code: 'BL-MNT-261023-01',
    line: l('Mint & chamomile · 500 kg · conventional', 'نعناع وبابونج · 500 كجم · تقليدي'),
    chips: [[l('Approved', 'معتمدة'), 'ok'], [l('For SH-261028-02', 'للشحنة SH-261028-02'), 'info']],
    action: { type: 'link', label: l('Open shipment', 'فتح الشحنة'), href: '#/Shipments' },
    details: [
      [l('Recipe', 'الوصفة'), 'FG-MNT-261022-02 60% · FG-CHM-261019-03 40%'],
      [l('Mint used', 'النعناع المستخدم'), l('300 kg', '300 كجم')],
      [l('Chamomile used', 'البابونج المستخدم'), l('200 kg', '200 كجم')],
      [l('Farming', 'نوع الزراعة'), l('Conventional (both inputs)', 'تقليدي (كلا المدخلين)')],
      [l('Location', 'الموقع'), l('Rack 04', 'رف 04')],
    ],
    where: [{ a: 'SH-261028-02', b: l('Northfield Teas · TGHU 730415-2', 'نورثفيلد تي · TGHU 730415-2'), tag: l('Planned', 'مخطط'), tone: 'mute' }],
    stepHead: l('Input', 'المُدخل'),
    steps: [
      ['FG-MNT-261022-02', l('Mixing', 'الخلط'), '300', '300', '0', '60%', '23/10'],
      ['FG-CHM-261019-03', l('Mixing', 'الخلط'), '200', '200', '0', '40%', '23/10'],
      ['BL-MNT-261023-01', PACK, '500', '500', '0', l('20 bags', '20 كيساً'), '23/10'],
    ],
    nums: [
      [l('Inputs', 'المدخلات'), '500 kg', l('2 finished lots', 'دفعتان نهائيتان'), ''],
      [l('Blend', 'الخلطة'), '500 kg', '', ''],
      [l('Difference', 'الفرق'), '0 kg', l('Balanced', 'متوازن'), 'ok'],
    ],
    barTitle: l('Recipe', 'الوصفة'),
    bar: [[60, GREEN, l('Mint 300 kg', 'نعناع 300 كجم')], [40, GOLD, l('Chamomile 200 kg', 'بابونج 200 كجم')]],
    chain: [l('Al-Nour Farm · Delta Herbs', 'مزرعة النور · أعشاب الدلتا'), 'RM-MNT-261020-01 · RM-CHM-261016-02', 'FG-MNT-261022-02 · FG-CHM-261019-03', 'BL-MNT-261023-01', l('Northfield Teas', 'نورثفيلد تي')],
    traceNote: l('A trace from either input lot reaches this blend and its customer.', 'التتبع من أي دفعة داخلة يصل إلى هذه الخلطة ثم إلى العميل.'),
    editField: l('Location', 'الموقع'), editNow: 'Rack 04', editNew: 'Rack 05',
    history: [
      ['23/10 14:00', l('Packed into 20 × 25 kg bags', 'تعبئة في 20 كيساً × 25 كجم'), 'IM'],
      ['23/10 13:20', l('Blend created: 300 kg mint + 200 kg chamomile', 'إنشاء الخلطة: 300 كجم نعناع + 200 كجم بابونج'), 'QM'],
    ],
  },

  hold: {
    kind: l('Batch', 'دفعة تشغيل'), back: PROD_BACK, code: 'PB-HIB-261021-01',
    line: l('Hibiscus · 1,000 kg in · organic', 'كركديه · 1,000 كجم داخل · عضوي'),
    chips: [[l('On hold', 'موقوفة'), 'bad'], [l('CCP 2 failed', 'نقطة التحكم 2: فاشل'), 'bad']],
    action: { type: 'link', label: l('Clear or reject in Production', 'السماح أو الرفض من التشغيل'), href: '#/Production', qmOnly: true, imNote: l('Waiting for the quality manager to clear or reject this batch.', 'بانتظار مدير الجودة للسماح بمتابعة هذه الدفعة أو رفضها.') },
    details: [
      [l('Input lots', 'الدفعات الخام'), 'RM-HIB-261020-01 · 600, RM-HIB-261020-02 · 400'],
      [l('Product', 'المنتج'), l('Hibiscus · organic', 'كركديه · عضوي')],
      [l('Started', 'البدء'), '21/10/2026 08:30'],
      [l('Metal detector', 'كاشف المعادن'), l('Failed 21/10 15:40 · 3.2 kg rejects', 'فشل 21/10 15:40 · 3.2 كجم مرفوضات')],
      [l('In process now', 'قيد التشغيل الآن'), l('905 kg', '905 كجم')],
    ],
    where: [
      { a: l('Batch kg', 'كمية الدفعة'), b: l('905 kg · at metal detector', '905 كجم · عند كاشف المعادن'), tag: l('On hold', 'موقوفة'), tone: 'bad' },
      { a: l('Sieving residue', 'مخلفات التنخيل'), b: l('40 kg', '40 كجم'), tag: l('In stock', 'في المخزون'), tone: 'ok' },
      { a: l('Fines', 'المسحوق الناعم'), b: l('25 kg', '25 كجم'), tag: l('In stock', 'في المخزون'), tone: 'ok' },
    ],
    stepHead: STEP_HEAD,
    steps: [
      ['PB-HIB-261021-01', SIEV, '1,000', '940', '20', l('Residue 40 kg', 'مخلفات 40 كجم'), '21/10'],
      ['PB-HIB-261021-01', SIZE, '940', '905', '10', l('Fines 25 kg', 'ناعم 25 كجم'), '21/10'],
      ['PB-HIB-261021-01', MD, '905', '—', '3.2', FAIL, '21/10'],
      ['PB-HIB-261021-01', PACK, '—', '—', '—', l('Blocked', 'محجوبة'), '—'],
    ],
    nums: [
      [l('In', 'الداخل'), '1,000 kg', '', ''],
      [l('In process', 'قيد التشغيل'), '905 kg', l('on hold', 'موقوفة'), 'bad'],
      [l('Rejects', 'المرفوضات'), '3.2 kg', l('metal detector', 'كاشف المعادن'), 'bad'],
    ],
    barTitle: l('Where the 1,000 kg is now', 'أين الـ 1,000 كجم الآن'),
    bar: [[90.5, BLUE, l('In process 905 kg', 'قيد التشغيل 905 كجم')], [6.5, LIGHT, l('By-products 65 kg', 'منتجات ثانوية 65 كجم')], [3, GREY, l('Waste 30 kg', 'فاقد 30 كجم')]],
    chain: [l('Wadi Green Co-op · Al-Nour Farm', 'تعاونية وادي الأخضر · مزرعة النور'), 'RM-HIB-261020-01 · RM-HIB-261020-02', 'PB-HIB-261021-01'],
    traceNote: l('Nothing has left this batch yet. No finished lots exist.', 'لم يخرج شيء من هذه الدفعة بعد. لا توجد دفعات نهائية.'),
    editField: l('Rejects (kg)', 'المرفوضات (كجم)'), editNow: '3.2', editNew: '3.0',
    history: [
      ['21/10 15:40', l('Metal detector failed, 3.2 kg rejects. Batch put on hold.', 'فشل كاشف المعادن، 3.2 كجم مرفوضات. أُوقفت الدفعة.'), 'IM'],
      ['21/10 12:10', l('Sizing recorded: 905 kg out', 'تسجيل التدريج: 905 كجم خارج'), 'IM'],
      ['21/10 09:30', l('Sieving recorded: 940 kg out', 'تسجيل التنخيل: 940 كجم خارج'), 'IM'],
      ['21/10 08:30', l('Batch started with 1,000 kg from 2 raw lots', 'بدء الدفعة بـ 1,000 كجم من دفعتين خام'), 'IM'],
    ],
  },

  run: {
    kind: l('Batch', 'دفعة تشغيل'), back: PROD_BACK, code: 'PB-CHM-261022-01',
    line: l('Chamomile · 1,100 kg in · conventional', 'بابونج · 1,100 كجم داخل · تقليدي'),
    chips: [[l('In process', 'قيد التشغيل'), 'info'], [l('CCP 2 pass', 'نقطة التحكم 2: ناجح'), 'ok']],
    action: { type: 'link', label: l('Pack and label', 'تعبئة ووضع ملصق'), href: '#/Production' },
    details: [
      [l('Input lot', 'الدفعة الخام'), l('RM-CHM-261019-01 · 1,100 kg', 'RM-CHM-261019-01 · 1,100 كجم')],
      [l('Product', 'المنتج'), l('Chamomile · conventional', 'بابونج · تقليدي')],
      [l('Steps', 'المراحل'), l('Sieving, metal detector, packing (no sizing)', 'تنخيل، كاشف معادن، تعبئة (بدون تدريج)')],
      [l('Started', 'البدء'), '22/10/2026 07:40'],
      [l('In process now', 'قيد التشغيل الآن'), l('1,045 kg', '1,045 كجم')],
    ],
    where: [
      { a: l('Batch kg', 'كمية الدفعة'), b: l('1,045 kg · at packing', '1,045 كجم · عند التعبئة'), tag: l('In process', 'قيد التشغيل'), tone: 'info' },
      { a: l('Fines', 'المسحوق الناعم'), b: l('35 kg', '35 كجم'), tag: l('In stock', 'في المخزون'), tone: 'ok' },
    ],
    stepHead: STEP_HEAD,
    steps: [
      ['PB-CHM-261022-01', SIEV, '1,100', '1,050', '15', l('Fines 35 kg', 'ناعم 35 كجم'), '22/10'],
      ['PB-CHM-261022-01', MD, '1,050', '1,045', '5', PASS, '22/10'],
      ['PB-CHM-261022-01', PACK, '1,045', '—', '—', l('Next', 'التالي'), '—'],
    ],
    nums: [
      [l('In', 'الداخل'), '1,100 kg', '', ''],
      [l('In process', 'قيد التشغيل'), '1,045 kg', l('at packing', 'عند التعبئة'), ''],
      [l('By-products', 'منتجات ثانوية'), '35 kg', l('fines', 'ناعم'), ''],
    ],
    barTitle: l('Where the 1,100 kg is now', 'أين الـ 1,100 كجم الآن'),
    bar: [[95, BLUE, l('In process 1,045 kg', 'قيد التشغيل 1,045 كجم')], [3.2, LIGHT, l('By-products 35 kg', 'منتجات ثانوية 35 كجم')], [1.8, GREY, l('Waste 20 kg', 'فاقد 20 كجم')]],
    chain: [l('Delta Herbs · Field 1', 'أعشاب الدلتا · الحقل 1'), 'RM-CHM-261019-01', 'PB-CHM-261022-01'],
    traceNote: l('No finished lots yet. They are created when this batch is packed and labelled.', 'لا توجد دفعات نهائية بعد. تُنشأ عند تعبئة هذه الدفعة ووضع الملصقات.'),
    editField: l('Step output (kg)', 'ناتج المرحلة (كجم)'), editNow: '1,045', editNew: '1,046',
    history: [
      ['22/10 11:20', l('Metal detector passed, 5 kg rejects removed', 'نجح كاشف المعادن، إزالة 5 كجم مرفوضات'), 'IM'],
      ['22/10 09:00', l('Sieving recorded: 1,050 kg out', 'تسجيل التنخيل: 1,050 كجم خارج'), 'IM'],
      ['22/10 07:40', l('Batch started with 1,100 kg of RM-CHM-261019-01', 'بدء الدفعة بـ 1,100 كجم من RM-CHM-261019-01'), 'IM'],
    ],
  },
};
