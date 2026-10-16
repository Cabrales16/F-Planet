import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FIXTURES, dayByFixture, getHistory } from '../lib/sim'
import { useLive, useLoc, useT, nf } from '../lib/hooks'
import { FixtureIcon } from '../components/ui'
import { Card, ChartTooltip, PageTitle } from './parts'

export default function LiveView() {
  const t = useT()
  const loc = useLoc()
  const live = useLive()
  const today = dayByFixture(getHistory().at(-1))
  const total = Object.values(live.flows).reduce((a, b) => a + b, 0)
  const series = live.series.map((p, i) => ({ ...p, i }))

  return (
    <>
      <PageTitle title={t('panel.live')} subtitle={t('live.subtitle')} />
      <Card>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-ink/55">{t('live.total')}</p>
            <p className="font-display text-5xl font-extrabold leading-none text-deep">{nf(total, 1)} <span className="text-xl text-ink/50">L/min</span></p>
          </div>
          <p className="text-sm font-semibold text-ink/60">{t('live.session', { l: nf(live.extra, 1) })}</p>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="lv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4aa3df" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#4aa3df" stopOpacity="0.03" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#14363b" strokeOpacity="0.08" vertical={false} />
              <XAxis dataKey="i" hide />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} domain={[0, (m) => Math.max(20, Math.ceil(m + 4))]} />
              <Tooltip content={<ChartTooltip unit="L/min" />} />
              <Area type="stepAfter" dataKey="flow" name={t('live.flow')} stroke="#2a8fd8" strokeWidth={2.5} fill="url(#lv)" isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FIXTURES.map((f) => {
          const flow = live.flows[f.id]
          const on = flow > 0
          return (
            <div key={f.id} className={`rounded-2xl p-4 shadow-sm ring-1 transition ${on ? 'bg-sky/50 ring-deep/40' : 'bg-white ring-ink/5'}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: f.color }}><FixtureIcon id={f.id} size={24} /></span>
                <div className="flex-1">
                  <p className="font-display text-lg font-extrabold leading-tight">{loc(f)}</p>
                  <p className={`text-xs font-extrabold ${on ? 'text-deep' : 'text-ink/45'}`}>{on ? t('live.running') : t('cons.idle')}</p>
                </div>
                <p className="text-right font-display text-2xl font-extrabold leading-none">{nf(flow, 1)}<span className="block text-[11px] font-bold text-ink/50">L/min</span></p>
              </div>
              <div className="mt-3 flex justify-between text-xs font-bold text-ink/60">
                <span>{t('live.todayFx')}</span>
                <span>{nf(today[f.id] + live.byFixtureExtra[f.id], 1)} L</span>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
