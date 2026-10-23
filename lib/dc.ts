// Minimal runtime that lets the original Design Component logic run as React.
import React from 'react';

export class DCLogic<P = any, S = any> extends React.Component<P, S> {
  renderVals(): any { return {}; }
  template(_v: any): React.ReactNode { return null; }
  render() { return this.template(this.renderVals() || {}); }
}

const cssCache = new Map<string, Record<string, string>>();
export function dcCss(s: string): Record<string, string> {
  const hit = cssCache.get(s);
  if (hit) return hit;
  const o: Record<string, string> = {};
  s.split(';').forEach((d) => {
    const i = d.indexOf(':');
    if (i < 0) return;
    const k = d.slice(0, i).trim();
    if (!k) return;
    o[k.startsWith('--') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = d.slice(i + 1).trim();
  });
  cssCache.set(s, o);
  return o;
}

/** Links between screens: "Lot.dc.html" -> "#/Lot" (hash routing). */
export function dcHref(h: any): string | undefined {
  if (h === undefined || h === null || h === '') return undefined;
  const s = String(h);
  const m = /^(?:\.\/|\/)?(?:v2\/)?([A-Za-z0-9_-]+)\.dc\.html(#.*)?$/.exec(s);
  return m ? '#/' + m[1] : s;
}
export const dcStr = (x: any) => (x === undefined || x === null ? '' : String(x));
export const dcTxt = (x: any) => (x === undefined || x === null || typeof x === 'boolean' ? '' : x);
export const dcNoop = () => {};
