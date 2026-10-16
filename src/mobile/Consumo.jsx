import { Bar, BarChart, Cell, ReferenceLine, ResponsiveContainer, XAxis } from 'recharts'
import { FIXTURES, dayTotal, getHistory } from '../lib/sim'
import { useDateFmt, useLive, useLoc, useStats, useT, nf, money } from '../lib/hooks'
import { FixtureIcon, Jug, mood } from '../components/ui'

const LEVELS = [
  { face: '😠', key: 'over' },
  { face: '😐', key: 'warn' },
  { face: '😊', key: 'good' },
  { face: '😁', key: 'great' },
]

export default function Consumo() {
  const t = useT()
  const loc = useLoc()
  const fmt = useDateFmt()
  const s = useStats()
  const live = useLive()
  const m = mood(s.pctMeta)
  const days = getHistory().slice(-7)
  const data = days.map((d, i) => ({ name: fmt.day(d.date).slice(0, 3), v: Math.round(dayTotal(d) + (i === 6 ? live.extra : 0)), today: i === 6 }))
  const fill = Math.min(1, s.pctMeta)
  const therm = Math.min(1, s.pctMeta / 1.1)

  return (
    <div className="px-4 pb-8 pt-4">
      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
        <div className="flex items-center justify-around">
          <div className="relative">
            <Jug pct={fill} size={170} label={t('cons.today')} />
          </div>
          <div className="flex items-end gap-2">
            <div className="relative h-40 w-8 rounded-full border-[3px] border-ink bg-white" aria-hidden="true">
              <div className={`absolute inset-x-1 bottom-1 rounded-full transition-all duration-700 ${s.pctMeta < 0.85 ? 'bg-leaf-600' : s.pctMeta < 1 ? 'bg-gold' : 'bg-alert'}`} style={{ height: `${therm * 88 + 6}%` }} />
            </div>
            <div className="flex h-40 flex-col justify-between py-1 text-xl" aria-hidden="true">
              {LEVELS.map((l) => <span key={l.key} className={l.key === m.key ? 'scale-125' : 'opacity-35 grayscale'}>{l.face}</span>)}
            </div>
          </div>
        </div>
        <p className="mt-1 text-center font-display text-4xl font-extrabold leading-none">{nf(s.hoy)} <span className="text-xl text-ink/50">L</span></p>
        <p className="mt-1 text-center font-display text-lg font-extrabold">{m.face} {t(`cons.mood.${m.key}`)}</p>
        <p className="text-center text-sm font-semibold text-ink/60">{t('cons.of', { m: nf(s.meta) })} · {t('cons.cost')} {money(s.costoLitros(s.mesLitros))}</p>
      </div>

      <h3 className="mt-5 font-display text-lg font-extrabold">{t('cons.week')}</h3>
      <div className="mt-2 h-40 rounded-3xl bg-white p-3 shadow-sm ring-1 ring-ink/5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 4, left: 4, bottom: 0 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
            <ReferenceLine y={s.meta} stroke="#e5484d" strokeDasharray="4 4" label={{ value: t('cons.goal'), position: 'insideTopRight', fontSize: 10, fill: '#e5484d', fontWeight: 700 }} />
            <Bar dataKey="v" radius={[6, 6, 0, 0]} isAnimationActive={false}>
              {data.map((d) => <Cell key={d.name + d.v} fill={d.today ? '#f58a1f' : d.v > s.meta ? '#e5484d' : '#35b3a8'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="mt-5 flex items-center gap-2 font-display text-lg font-extrabold">{t('cons.live')} <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-alert" /></span></h3>
      <ul className="mt-2 grid grid-cols-2 gap-2">
        {FIXTURES.map((f) => {
          const flow = live.flows[f.id]
          return (
            <li key={f.id} className={`flex items-center gap-2 rounded-2xl p-3 ring-1 ${flow > 0 ? 'bg-sky/50 ring-deep/30' : 'bg-white ring-ink/5'}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white" style={{ background: f.color }}><FixtureIcon id={f.id} size={19} /></span>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold leading-tight">{loc(f)}</p>
                <p className="text-xs font-bold text-ink/55">{flow > 0 ? `${nf(flow, 1)} L/min` : t('cons.idle')}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
