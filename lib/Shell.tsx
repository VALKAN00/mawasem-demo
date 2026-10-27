import React from 'react';
import { useApp } from './app';
import { useCounts } from './store';

const ICONS: Record<string, React.ReactNode> = {
  approvals: <><path d="M9 11l3 3 8-8" /><path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11" /></>,
  receive: <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />,
  production: <><rect x="3" y="4" width="5" height="16" rx="1" /><rect x="10" y="4" width="5" height="10" rx="1" /><rect x="17" y="4" width="4" height="13" rx="1" /></>,
  stock: <><path d="M3 7l9-4 9 4v10l-9 4-9-4z" /><path d="M3 7l9 4 9-4M12 11v10" /></>,
  shipments: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  trace: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="12" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8.5 7l7 4M8.5 17l7-4" /></>,
  reports: <path d="M5 20V11M11 20V5M17 20v-7M3 20h18" />,
  master: <><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></>,
};

export type NavKey = 'Approvals' | 'Receive' | 'Production' | 'Stock' | 'Shipments' | 'Trace' | 'Reports' | 'MasterData';

export function Shell({ active, title, subtitle, actions, children }: {
  active: NavKey;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { t, lang, setLang, role, setRole } = useApp();
  const qm = role === 'qm';
  const counts = useCounts();
  const items: { key: NavKey; href: string; icon: string; label: string; qmOnly?: boolean; count?: number }[] = [
    { key: 'Approvals', href: '#/Approvals', icon: 'approvals', label: t('Approvals', 'الاعتمادات'), qmOnly: true, count: counts.approvals },
    { key: 'Receive', href: '#/Receive', icon: 'receive', label: t('Receive', 'الاستلام') },
    { key: 'Production', href: '#/Production', icon: 'production', label: t('Production', 'التشغيل'), count: counts.production },
    { key: 'Stock', href: '#/Stock', icon: 'stock', label: t('Stock', 'المخزون') },
    { key: 'Shipments', href: '#/Shipments', icon: 'shipments', label: t('Shipments', 'الشحنات'), count: counts.shipments },
    { key: 'Trace', href: '#/Trace', icon: 'trace', label: t('Trace', 'التتبع') },
    { key: 'Reports', href: '#/Reports', icon: 'reports', label: t('Reports', 'التقارير'), qmOnly: true },
    { key: 'MasterData', href: '#/MasterData', icon: 'master', label: t('Master data', 'البيانات الأساسية') },
  ];
  return (
    <div className="m-app">
      <nav className="m-nav" aria-label={t('Main', 'القائمة الرئيسية')}>
        <a className="m-brand" href="#/" style={{ textDecoration: 'none', color: 'inherit' }}><span className="m-logo">M</span>{t('Mawasem', 'مواسم')}</a>
        {items.filter((i) => !i.qmOnly || qm).map((i) => (
          <a key={i.key} href={i.href} className={'m-nv' + (i.key === active ? ' on' : '')} aria-current={i.key === active ? 'page' : undefined}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[i.icon]}</svg>
            <span className="m-grow">{i.label}</span>
            {i.count ? <span className="m-count" aria-label={String(i.count)}>{i.count}</span> : null}
          </a>
        ))}
        <div className="m-grow" />
        <button type="button" className="m-lang" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
        <div className="m-user">
          <span className={'m-avatar' + (qm ? ' qm' : '')}>{qm ? 'QM' : 'IM'}</span>
          <div className="m-grow">
            <div className="m-user-name">{qm ? t('Quality manager', 'مدير الجودة') : t('Inventory manager', 'مدير المخزون')}</div>
            <button type="button" className="m-link" onClick={() => setRole(qm ? 'im' : 'qm')}>
              {qm ? t('Switch to inventory manager', 'التبديل إلى مدير المخزون') : t('Switch to quality manager', 'التبديل إلى مدير الجودة')}
            </button>
          </div>
        </div>
      </nav>
      <main className="m-main">
        <div className="m-wrap">
          <header className="m-head">
            <div>
              <h1>{title}</h1>
              {subtitle ? <div className="m-muted">{subtitle}</div> : null}
            </div>
            {actions ? <div className="m-actions">{actions}</div> : null}
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}
