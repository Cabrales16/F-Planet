import { useMemo, useSyncExternalStore } from 'react'
import { computeStats, getLive, subscribeLive } from './sim'
import { useStore } from './store'
import { dict } from './i18n'

export const useLive = () => useSyncExternalStore(subscribeLive, getLive)

export const useLang = () => useStore((s) => s.settings.lang)

export function useT() {
  const lang = useLang()
  return (key, vars) => {
    let s = dict[lang]?.[key] ?? dict.es[key] ?? key
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v)
    return s
  }
}

// Elige el idioma activo de un objeto { es, en }
export function useLoc() {
  const lang = useLang()
  return (o) => o?.[lang] ?? o?.es
}

export function useStats() {
  const settings = useStore((s) => s.settings)
  const live = useLive()
  return useMemo(() => computeStats(settings, live.extra), [settings, live.extra])
}

export const nf = (n, d = 0) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: d, minimumFractionDigits: d }).format(n)

export const money = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export function useDateFmt() {
  const lang = useLang()
  const locale = lang === 'en' ? 'en-US' : 'es-CO'
  return {
    day: (d) => d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' }),
    short: (d) => d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
    time: (d) => d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    long: (d) => d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' }),
  }
}
