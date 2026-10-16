import { Droplets, Sprout, ShowerHead, CookingPot, Toilet, WashingMachine } from 'lucide-react'

export const BASE = import.meta.env.BASE_URL

export function Logo({ size = 40, className = '' }) {
  return <img src={`${BASE}logo.png`} width={size} height={size} alt="F-Planet" className={className} draggable="false" />
}

export function Wordmark({ light = false, size = 'md' }) {
  const s = size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-lg' : 'text-2xl'
  return (
    <span className="inline-flex items-center gap-2.5">
      <Logo size={size === 'lg' ? 64 : size === 'sm' ? 30 : 42} />
      <span className={`font-display font-extrabold leading-none ${s} ${light ? 'text-white' : 'text-ink'}`}>F-Planet</span>
    </span>
  )
}

const YARN = ['#e5484d', '#f58a1f', '#f5b942', '#86e07a', '#35b3a8', '#4aa3df', '#9b6bd6']

// Mascota "Gota": una gota de agua con flequillo de lana de colores.
export function Mascot({ mood = 'happy', size = 96, className = '' }) {
  const mouth =
    mood === 'worried'
      ? 'M40 78 Q50 70 60 78'
      : mood === 'cheer'
        ? 'M38 72 Q50 90 62 72 Z'
        : 'M40 74 Q50 84 60 74'
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} className={className} role="img" aria-label="Gota, la mascota de F-Planet">
      <defs>
        <linearGradient id="gota" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#7fd6f0" />
          <stop offset="1" stopColor="#2a9fc8" />
        </linearGradient>
      </defs>
      <path d="M50 14 C50 14 15 52 15 76 a35 35 0 0 0 70 0 C85 52 50 14 50 14Z" fill="url(#gota)" stroke="#14363b" strokeWidth="2.5" />
      {YARN.map((c, i) => {
        const a = ((i - 3) / 3) * 0.95
        const x1 = 50 + Math.sin(a) * 4
        const y1 = 26
        const x2 = 50 + Math.sin(a) * 26
        const y2 = 6 + Math.abs(Math.sin(a)) * 12
        return <path key={c} d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${y2 - 6} ${x2} ${y2}`} stroke={c} strokeWidth="6" strokeLinecap="round" fill="none" />
      })}
      <ellipse cx="36" cy="58" rx="7" ry="9" fill="#fff" opacity="0.28" transform="rotate(-18 36 58)" />
      <circle cx="40" cy="62" r="4.2" fill="#14363b" />
      <circle cx="60" cy="62" r="4.2" fill="#14363b" />
      <circle cx="41.4" cy="60.6" r="1.3" fill="#fff" />
      <circle cx="61.4" cy="60.6" r="1.3" fill="#fff" />
      <circle cx="31" cy="72" r="4.5" fill="#ff8fa3" opacity="0.7" />
      <circle cx="69" cy="72" r="4.5" fill="#ff8fa3" opacity="0.7" />
      <path d={mouth} fill={mood === 'cheer' ? '#14363b' : 'none'} stroke="#14363b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {mood === 'worried' && <path d="M78 44 q4 7 0 10 q-4 -3 0 -10z" fill="#bfe6f7" stroke="#14363b" strokeWidth="1.5" />}
    </svg>
  )
}

const AV = {
  a: ['#35b3a8', '#fff'],
  b: ['#f58a1f', '#fff'],
  c: ['#4aa3df', '#fff'],
  d: ['#9b6bd6', '#fff'],
  e: ['#e5484d', '#fff'],
  f: ['#f5b942', '#14363b'],
  g: ['#4cc55a', '#fff'],
  h: ['#14363b', '#fff'],
}
export function Avatar({ name = '?', variant = 'a', size = 40, ring = false }) {
  const [bg, fg] = AV[variant] || AV.a
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold ${ring ? 'ring-2 ring-white' : ''}`}
      style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      {name.trim()[0]?.toUpperCase()}
    </span>
  )
}

export const FIXTURE_ICON = { ducha: ShowerHead, cocina: CookingPot, inodoro: Toilet, lavadora: WashingMachine, lavamanos: Droplets, patio: Sprout }
export function FixtureIcon({ id, size = 20, className = '' }) {
  const I = FIXTURE_ICON[id] || Droplets
  return <I size={size} className={className} aria-hidden="true" />
}

export function Switch({ checked, onChange, label, id }) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-deep' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

export function Segmented({ value, options, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl bg-slate-100 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${value === o.value ? 'bg-white text-deep shadow' : 'text-slate-500 hover:text-ink'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

// Botellón de agua que se llena según el porcentaje (0-1.2)
export function Jug({ pct = 0.5, label, size = 190 }) {
  const p = Math.max(0, Math.min(1, pct))
  const bodyTop = 62
  const bodyBottom = 176
  const y = bodyBottom - (bodyBottom - bodyTop) * p
  return (
    <svg viewBox="0 0 120 190" width={size * 0.63} height={size} role="img" aria-label={label}>
      <defs>
        <clipPath id="jug-clip">
          <path d="M30 62 L30 168 a10 10 0 0 0 10 10 L80 178 a10 10 0 0 0 10 -10 L90 62 Q90 50 74 40 L66 30 L54 30 L46 40 Q30 50 30 62Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#jug-clip)">
        <rect x="20" y="20" width="90" height="170" fill="#fff" />
        <g style={{ transition: 'transform 1s ease' }} transform={`translate(0 ${y - 10})`}>
          <rect x="0" y="12" width="120" height="180" fill="#2a8fd8" />
          <path d="M-60 12 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V30 H-60Z" fill="#2a8fd8" style={{ animation: 'wave 3s linear infinite' }} />
        </g>
        <rect x="36" y="70" width="5" height="95" rx="2.5" fill="#fff" opacity="0.35" />
      </g>
      <path d="M30 62 L30 168 a10 10 0 0 0 10 10 L80 178 a10 10 0 0 0 10 -10 L90 62 Q90 50 74 40 L66 30 L54 30 L46 40 Q30 50 30 62Z" fill="none" stroke="#14363b" strokeWidth="4" strokeLinejoin="round" />
      <rect x="50" y="18" width="20" height="14" rx="4" fill="#fff" stroke="#14363b" strokeWidth="4" />
      <path d="M28 96 H92 M28 140 H92" stroke="#14363b" strokeWidth="4" opacity="0.55" />
    </svg>
  )
}

export function mood(pct) {
  if (pct < 0.6) return { face: '😁', key: 'great' }
  if (pct < 0.85) return { face: '😊', key: 'good' }
  if (pct < 1) return { face: '😐', key: 'warn' }
  return { face: '😠', key: 'over' }
}
