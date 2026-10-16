// Simulador de sensores de agua.
// Genera un historial determinista (60 días, por hora y por llave) y un flujo
// "en vivo" que se actualiza cada ~1,5 s. No hay hardware real: todo ocurre en
// el navegador.

export const FIXTURES = [
  { id: 'ducha', es: 'Ducha', en: 'Shower', flow: 9, share: 0.28, color: '#35b3a8' },
  { id: 'cocina', es: 'Cocina', en: 'Kitchen', flow: 6, share: 0.2, color: '#1d7f84' },
  { id: 'inodoro', es: 'Inodoro', en: 'Toilet', flow: 8, share: 0.22, color: '#f5b942' },
  { id: 'lavadora', es: 'Lavadora', en: 'Washer', flow: 10, share: 0.14, color: '#4aa3df' },
  { id: 'lavamanos', es: 'Lavamanos', en: 'Sink', flow: 5, share: 0.08, color: '#86e07a' },
  { id: 'patio', es: 'Patio y riego', en: 'Yard & garden', flow: 14, share: 0.08, color: '#f58a1f' },
]

// Peso por hora del día (0-23) de cada llave.
const PROFILE = {
  ducha: [0, 0, 0, 0, 0.4, 3, 9, 8, 4, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 3, 7, 8, 5, 2, 0.5, 0],
  cocina: [0, 0, 0, 0, 0, 1, 4, 5, 3, 2, 2, 4, 8, 6, 3, 2, 2, 4, 8, 7, 4, 2, 1, 0],
  inodoro: [0.3, 0.2, 0.1, 0.1, 0.3, 2, 6, 6, 4, 3, 3, 3, 4, 3, 3, 3, 3, 4, 5, 5, 4, 3, 1.5, 0.6],
  lavadora: [0, 0, 0, 0, 0, 0, 0, 1, 3, 6, 7, 5, 2, 1, 2, 3, 4, 3, 1, 0, 0, 0, 0, 0],
  lavamanos: [0, 0, 0, 0, 0, 2, 6, 6, 3, 2, 2, 2, 5, 3, 2, 2, 2, 3, 5, 5, 4, 3, 2, 0.5],
  patio: [0, 0, 0, 0, 0, 3, 8, 6, 2, 0, 0, 0, 0, 0, 0, 0, 2, 6, 5, 1, 0, 0, 0, 0],
}

const DAY_MS = 86400000
export const HISTORY_DAYS = 60

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
export const dayKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

let cache = null

// days[0] = hace 59 días ... days[59] = hoy
export function getHistory() {
  const now = new Date()
  const key = dayKey(now) + ':' + now.getHours()
  if (cache && cache.key === key) return cache.days

  const today = startOfDay(now)
  const baseDaily = 540 // litros/día aprox. al inicio de la ventana
  const days = []
  for (let i = HISTORY_DAYS - 1; i >= 0; i--) {
    const date = new Date(today.getTime() - i * DAY_MS)
    const idx = Math.floor(date.getTime() / DAY_MS)
    const rnd = mulberry32(idx * 7919)
    const weekend = [0, 6].includes(date.getDay()) ? 1.12 : 1
    const trend = 1 - 0.22 * ((HISTORY_DAYS - 1 - i) / (HISTORY_DAYS - 1)) // ahorro gradual
    const dayFactor = baseDaily * weekend * trend * (0.92 + rnd() * 0.16)
    const f = {}
    for (const fx of FIXTURES) {
      const w = PROFILE[fx.id]
      const wsum = w.reduce((a, b) => a + b, 0)
      f[fx.id] = w.map((v) => (v / wsum) * dayFactor * fx.share * (0.9 + rnd() * 0.2))
    }
    // Fuga silenciosa en el inodoro durante los últimos 3 días (flujo nocturno continuo)
    if (i <= 2) for (let h = 1; h <= 4; h++) f.inodoro[h] += 4 + rnd() * 1.2
    // Hoy solo hasta la hora actual
    if (i === 0) {
      const h = now.getHours()
      const frac = (now.getMinutes() + 1) / 60
      for (const fx of FIXTURES) f[fx.id] = f[fx.id].map((v, hh) => (hh < h ? v : hh === h ? v * frac : 0))
    }
    days.push({ key: dayKey(date), date, f })
  }
  cache = { key, days }
  return days
}

export const sumArr = (a) => a.reduce((x, y) => x + y, 0)
export const dayTotal = (day) => FIXTURES.reduce((s, fx) => s + sumArr(day.f[fx.id]), 0)
export const dayByFixture = (day) => Object.fromEntries(FIXTURES.map((fx) => [fx.id, sumArr(day.f[fx.id])]))
export const dayHourly = (day) => Array.from({ length: 24 }, (_, h) => FIXTURES.reduce((s, fx) => s + day.f[fx.id][h], 0))

export function rangeTotals(days) {
  return days.reduce((s, d) => s + dayTotal(d), 0)
}

// Resumen de consumo con los ajustes del hogar
export function computeStats(settings, liveExtra = 0) {
  const days = getHistory()
  const today = days[days.length - 1]
  const yesterday = days[days.length - 2]
  const hoy = dayTotal(today) + liveExtra
  const ayer = dayTotal(yesterday)
  const last7 = days.slice(-7)
  const prom7 = rangeTotals(last7) / 7
  const last30 = rangeTotals(days.slice(-30))
  const prev30 = rangeTotals(days.slice(-60, -30))
  const now = new Date()
  const monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const mesDias = days.filter((d) => d.date.getMonth() === now.getMonth() && d.date.getFullYear() === now.getFullYear())
  const mesLitros = rangeTotals(mesDias) + liveExtra
  const proyeccion = (mesLitros / Math.max(1, mesDias.length)) * monthDays
  const costo = (litros) => settings.cargoFijo + (litros / 1000) * settings.tarifaM3
  const meta = settings.metaDiaL
  const diasBajoMeta = (() => {
    let n = 0
    for (let i = days.length - 2; i >= 0; i--) {
      if (dayTotal(days[i]) <= meta) n++
      else break
    }
    return n
  })()
  return {
    hoy,
    ayer,
    prom7,
    last30,
    prev30,
    ahorroPct: prev30 ? ((prev30 - last30) / prev30) * 100 : 0,
    mesLitros,
    proyeccion,
    costoMes: costo(mesLitros),
    costoProyectado: costo(proyeccion),
    costoLitros: costo,
    meta,
    pctMeta: hoy / meta,
    diasBajoMeta,
    perCapita: prom7 / settings.personas,
    leak: detectLeak(days),
  }
}

// Fuga: flujo nocturno (1-4 a. m.) sostenido durante varias noches
export function detectLeak(days) {
  const nights = days.slice(-3).map((d) => {
    const byFx = {}
    for (const fx of FIXTURES) byFx[fx.id] = d.f[fx.id].slice(1, 5).reduce((a, b) => a + b, 0)
    return byFx
  })
  const top = FIXTURES.map((fx) => ({ id: fx.id, avg: sumArr(nights.map((n) => n[fx.id])) / nights.length })).sort(
    (a, b) => b.avg - a.avg,
  )[0]
  if (top.avg > 12) return { fixture: top.id, lph: top.avg / 4, lpd: (top.avg / 4) * 24 }
  return null
}

/* ----------------------------- Flujo en vivo ----------------------------- */

const TICK = 1500
const live = {
  tick: 0,
  flows: Object.fromEntries(FIXTURES.map((f) => [f.id, 0])),
  active: Object.fromEntries(FIXTURES.map((f) => [f.id, false])),
  byFixtureExtra: Object.fromEntries(FIXTURES.map((f) => [f.id, 0])),
  extra: 0,
  series: [],
}
let snapshot = { ...live, series: [] }
const listeners = new Set()
let timer = null

// Estado inicial vistoso: una ducha en curso y serie previa
;(function seed() {
  const r = mulberry32(42)
  live.active.ducha = true
  live.flows.ducha = 9.2
  for (let i = 0; i < 40; i++) {
    const v = i > 18 && i < 34 ? 8 + r() * 2.5 : r() < 0.12 ? 4 + r() * 3 : 0
    live.series.push({ t: i, flow: Math.round(v * 10) / 10 })
  }
  live.tick = 40
  snapshot = { ...live, flows: { ...live.flows }, series: [...live.series], byFixtureExtra: { ...live.byFixtureExtra } }
})()

function step() {
  const hour = new Date().getHours()
  let total = 0
  for (const fx of FIXTURES) {
    const w = PROFILE[fx.id][hour] || 0.2
    if (live.active[fx.id]) {
      if (Math.random() < 0.1) live.active[fx.id] = false
    } else if (Math.random() < 0.01 + w * 0.006) {
      live.active[fx.id] = true
    }
    const flow = live.active[fx.id] ? fx.flow * (0.85 + Math.random() * 0.3) : 0
    live.flows[fx.id] = Math.round(flow * 10) / 10
    const liters = (flow / 60) * (TICK / 1000)
    live.byFixtureExtra[fx.id] += liters
    live.extra += liters
    total += flow
  }
  live.tick += 1
  live.series.push({ t: live.tick, flow: Math.round(total * 10) / 10 })
  if (live.series.length > 60) live.series.shift()
  snapshot = { ...live, flows: { ...live.flows }, series: [...live.series], byFixtureExtra: { ...live.byFixtureExtra } }
  listeners.forEach((l) => l())
}

export function subscribeLive(cb) {
  listeners.add(cb)
  if (!timer) timer = setInterval(step, TICK)
  return () => {
    listeners.delete(cb)
    if (!listeners.size && timer) {
      clearInterval(timer)
      timer = null
    }
  }
}
export const getLive = () => snapshot

export const fmtL = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d
