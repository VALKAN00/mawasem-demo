import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'ar';
export type Role = 'im' | 'qm';
export type L = { en: string; ar: string };

/** A bilingual string. Keeps the English and Arabic text next to each other. */
export const l = (en: string, ar: string): L => ({ en, ar });

interface Ctx {
  lang: Lang;
  setLang: (v: Lang) => void;
  role: Role;
  setRole: (v: Role) => void;
  /** t('Save', 'حفظ') picks the current language. */
  t: (en: string, ar: string) => string;
  /** x(value) resolves a bilingual object, or passes a plain string (codes, numbers) through. */
  x: (v: L | string | undefined) => string;
}

const read = <T extends string>(key: string, fallback: T): T => {
  try { return (localStorage.getItem(key) as T) || fallback; } catch { return fallback; }
};
const write = (key: string, value: string) => {
  try { localStorage.setItem(key, value); } catch { /* storage can be blocked */ }
};

const AppCtx = createContext<Ctx>(null as any);
export const useApp = () => useContext(AppCtx);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => read<Lang>('mw-lang', 'en'));
  const [role, setRoleState] = useState<Role>(() => read<Role>('mw-role', 'im'));

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value: Ctx = {
    lang,
    role,
    setLang: (v) => { write('mw-lang', v); setLangState(v); },
    setRole: (v) => { write('mw-role', v); setRoleState(v); },
    t: (en, ar) => (lang === 'ar' ? ar : en),
    x: (v) => (v === undefined ? '' : typeof v === 'string' ? v : v[lang]),
  };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
