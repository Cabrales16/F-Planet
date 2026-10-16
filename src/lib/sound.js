import { getState } from './store'

let ctx = null

// Pequeños tonos con Web Audio (sin archivos). Respeta el ajuste "Sonido".
export function beep(kind = 'ok') {
  if (!getState().settings.sound) return
  try {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)()
    const notes = { ok: [660, 880], win: [523, 659, 784, 1047], bad: [220] }[kind] || [660]
    notes.forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = f
      const t = ctx.currentTime + i * 0.11
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
      o.connect(g).connect(ctx.destination)
      o.start(t)
      o.stop(t + 0.2)
    })
  } catch {
    /* sin audio disponible */
  }
}
