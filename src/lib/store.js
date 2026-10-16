import { useSyncExternalStore } from 'react'

// Estado persistido en localStorage. Es la "base de datos" de la demo: la app
// móvil y el panel comparten origen, así que lo que haces en uno se ve en el otro.

const KEY = 'fplanet-demo-v1'

export const DEFAULTS = {
  user: { name: 'Camila', avatar: 'a', barrio: 'Cuadra 4 · Sector 4', onboarded: false },
  progress: { completed: ['m1', 'm2', 'm3'], xp: 180, gotas: 95, streak: 5, lastDay: null },
  redeemed: [],
  achievements: ['first-mission', 'streak-3'],
  alertsAck: [],
  settings: {
    lang: 'es',
    sound: true,
    font: 'default', // 'default' | 'dyslexic'
    fontScale: 1, // 0.9 | 1 | 1.15 | 1.3
    signVideo: false,
    personas: 4,
    metaDiaL: 450,
    tarifaM3: 7800, // COP por m³ (valor de ejemplo)
    cargoFijo: 16500, // COP cargo fijo mensual (valor de ejemplo)
    umbralDuchaMin: 8,
    alertaFuga: true,
    alertaExceso: true,
    avisoCortes: true,
  },
}

const clone = (o) => JSON.parse(JSON.stringify(o))

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!raw) return clone(DEFAULTS)
    return {
      ...clone(DEFAULTS),
      ...raw,
      user: { ...DEFAULTS.user, ...raw.user },
      progress: { ...DEFAULTS.progress, ...raw.progress },
      settings: { ...DEFAULTS.settings, ...raw.settings },
    }
  } catch {
    return clone(DEFAULTS)
  }
}

let state = load()
const listeners = new Set()

function commit(next) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* almacenamiento lleno o bloqueado: la demo sigue en memoria */
  }
  applyA11y()
  listeners.forEach((l) => l())
}

export function applyA11y() {
  const root = document.documentElement
  root.dataset.font = state.settings.font
  root.style.setProperty('--fp-scale', String(state.settings.fontScale))
  root.lang = state.settings.lang
}

export const getState = () => state
export function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
export const useStore = (selector = (s) => s) => useSyncExternalStore(subscribe, () => selector(state))

// Sincroniza entre pestañas / iframes del mismo origen
window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    state = load()
    applyA11y()
    listeners.forEach((l) => l())
  }
})

export const actions = {
  reset() {
    commit(clone(DEFAULTS))
  },
  setUser(patch) {
    commit({ ...state, user: { ...state.user, ...patch } })
  },
  setSettings(patch) {
    commit({ ...state, settings: { ...state.settings, ...patch } })
  },
  completeMission(id, { xp, gotas }) {
    const p = state.progress
    if (p.completed.includes(id)) return false
    const today = new Date().toDateString()
    const streak = p.lastDay === today ? p.streak : p.streak + 1
    const completed = [...p.completed, id]
    const achievements = new Set(state.achievements)
    achievements.add('first-mission')
    if (streak >= 3) achievements.add('streak-3')
    if (completed.length >= 6) achievements.add('half-path')
    if (completed.length >= 12) achievements.add('guardian')
    commit({
      ...state,
      progress: { completed, xp: p.xp + xp, gotas: p.gotas + gotas, streak, lastDay: today },
      achievements: [...achievements],
    })
    return true
  },
  redeem(item) {
    if (state.progress.gotas < item.cost) return null
    const code = 'FP-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + String(item.id).slice(0, 3).toUpperCase()
    commit({
      ...state,
      progress: { ...state.progress, gotas: state.progress.gotas - item.cost },
      redeemed: [{ itemId: item.id, code, date: new Date().toISOString() }, ...state.redeemed],
    })
    return code
  },
  ackAlert(id) {
    if (state.alertsAck.includes(id)) return
    commit({ ...state, alertsAck: [...state.alertsAck, id] })
  },
  unackAll() {
    commit({ ...state, alertsAck: [] })
  },
}

applyA11y()
