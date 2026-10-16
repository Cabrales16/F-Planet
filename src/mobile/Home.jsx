import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Lock, Droplet, Flame, Star, ChevronRight, ShowerHead, Sparkles, Toilet, CookingPot, WashingMachine, RotateCcw, Sprout, Gauge, Waves, Droplets, Users, Trophy } from 'lucide-react'
import { MISSIONS } from '../lib/content'
import { useStore } from '../lib/store'
import { useLoc, useStats, useT, nf } from '../lib/hooks'
import { Mascot, mood } from '../components/ui'
import { beep } from '../lib/sound'

const KIND_ICON = { shower: ShowerHead, tooth: Sparkles, toilet: Toilet, dishes: CookingPot, washer: WashingMachine, reuse: RotateCcw, garden: Sprout, meter: Gauge, tank: Waves, aerator: Droplets, community: Users, trophy: Trophy }
const XS = [50, 72, 34, 64, 28, 56, 76, 38, 62, 30, 56, 50]
const STEP = 108
const TOP = 54

export function TodayCard() {
  const t = useT()
  const s = useStats()
  const m = mood(s.pctMeta)
  const pct = Math.min(1, s.pctMeta)
  const bar = s.pctMeta < 0.85 ? 'bg-leaf-600' : s.pctMeta < 1 ? 'bg-gold' : 'bg-alert'
  return (
    <Link to="/app/consumo" className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-ink/5">
      <span className="text-3xl" aria-hidden="true">{m.face}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wide text-ink/55">{t('home.today')}</p>
        <p className="font-display text-xl font-extrabold leading-tight">
          {nf(s.hoy)} L <span className="text-sm font-bold text-ink/55">/ {nf(s.meta)} L</span>
        </p>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={Math.round(pct * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={t('home.today')}>
          <div className={`h-full rounded-full transition-all duration-700 ${bar}`} style={{ width: `${pct * 100}%` }} />
        </div>
      </div>
      <ChevronRight className="text-ink/40" />
    </Link>
  )
}

export default function Home() {
  const t = useT()
  const loc = useLoc()
  const nav = useNavigate()
  const progress = useStore((s) => s.progress)
  const [shake, setShake] = useState(null)
  const currentIdx = MISSIONS.findIndex((m) => !progress.completed.includes(m.id))
  const H = TOP + (MISSIONS.length - 1) * STEP + 90

  const pts = MISSIONS.map((_, i) => ({ x: XS[i % XS.length], y: TOP + i * STEP }))
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const q = pts[i - 1]
      const my = (q.y + p.y) / 2
      return `C ${q.x} ${my}, ${p.x} ${my}, ${p.x} ${p.y}`
    })
    .join(' ')

  const open = (i) => {
    if (i > currentIdx && currentIdx !== -1) {
      beep('bad')
      setShake(i)
      setTimeout(() => setShake(null), 500)
      return
    }
    nav(`/app/mision/${MISSIONS[i].id}`)
  }

  return (
    <div className="pb-6">
      <div className="mx-4 mt-3 flex items-center justify-around rounded-2xl bg-white py-2.5 text-sm font-extrabold shadow-sm ring-1 ring-ink/5">
        <span className="inline-flex items-center gap-1.5"><Flame className="text-sun" size={20} />{progress.streak} <small className="font-semibold text-ink/55">{t('home.streak')}</small></span>
        <span className="inline-flex items-center gap-1.5"><Droplet className="text-deep" size={20} />{progress.gotas} <small className="font-semibold text-ink/55">{t('home.drops')}</small></span>
        <span className="inline-flex items-center gap-1.5"><Star className="text-gold" size={20} fill="currentColor" />{progress.xp} <small className="font-semibold text-ink/55">XP</small></span>
      </div>

      <TodayCard />

      <div className="relative mx-auto mt-4" style={{ height: H }}>
        <svg className="absolute inset-0" width="100%" height={H} viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path d={d} fill="none" stroke="#14363b" strokeOpacity="0.28" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {MISSIONS.map((m, i) => {
          const done = progress.completed.includes(m.id)
          const current = i === currentIdx
          const locked = !done && !current
          const Icon = KIND_ICON[m.kind]
          const { x, y } = pts[i]
          const mascotLeft = x > 50
          return (
            <div key={m.id}>
              {(current || (done && i === currentIdx - 1) || (done && i === 0)) && (
                <div className={`absolute flex items-center gap-1 ${mascotLeft ? 'flex-row' : 'flex-row-reverse'}`} style={{ top: y - 34, [mascotLeft ? 'left' : 'right']: '4%' }}>
                  <Mascot mood={current ? 'cheer' : 'happy'} size={58} className="anim-bob" />
                  {current && (
                    <span className={`max-w-[6.5rem] rounded-2xl bg-white px-3 py-2 text-center text-xs font-extrabold leading-tight shadow ring-1 ring-ink/10 ${mascotLeft ? '-ml-1' : '-mr-1'}`}>{t('home.ontrack')}</span>
                  )}
                </div>
              )}
              <button
                onClick={() => open(i)}
                aria-label={`${i + 1}. ${loc(m).title}${done ? ' ✓' : locked ? ' 🔒' : ''}`}
                className={`absolute grid h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] shadow-md transition active:scale-95 ${shake === i ? 'animate-pulse' : ''} ${
                  done ? 'border-leaf-600 bg-leaf text-ink' : current ? 'anim-pulse-ring border-sun-600 bg-sun text-white' : 'border-ink/25 bg-white text-ink/35'
                }`}
                style={{ left: `${x}%`, top: y }}
              >
                {done ? <Check size={30} strokeWidth={3.5} /> : locked ? <Lock size={24} /> : <Icon size={30} />}
              </button>
              <span
                className={`pointer-events-none absolute w-28 -translate-x-1/2 text-center text-[11px] font-extrabold leading-tight ${locked ? 'text-ink/40' : 'text-ink'}`}
                style={{ left: `${x}%`, top: y + 40 }}
              >
                {loc(m).title}
              </span>
              {current && (
                <span className="absolute -translate-x-1/2 rounded-lg bg-ink px-2 py-0.5 text-[11px] font-extrabold text-white" style={{ left: `${x}%`, top: y - 58 }}>
                  {t('home.begin')}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
