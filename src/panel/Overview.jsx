import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Droplets, Wallet, TrendingDown, Flame, TriangleAlert, CalendarClock, CircleCheck } from 'lucide-react'
import { FIXTURES, dayByFixture, dayTotal, getHistory, sumArr } from '../lib/sim'
import { getCuts } from '../lib/content'
import { buildAlerts } from '../lib/alerts'
import { useStore } from '../lib/store'
import { useDateFmt, useLive, useLoc, useStats, useT, nf, money } from '../lib/hooks'
import { Card, ChartTooltip, Kpi, PageTitle } from './parts'

export default function Overview() {
  const t = useT()
  const loc = useLoc()
  const fmt = useDateFmt()
  const s = useStats()
  const live = useLive()
  const settings = useStore((x) => x.settings)
  const ackd = useStore((x) => x.alertsAck)
  const days = getHistory()
  const area = days.slice(-30).map((d, i, a) => ({ name: fmt.short(d.date), v: Math.round(dayTotal(d) + (i === a.length - 1 ? live.extra : 0)) }))
  const byFx = FIXTURES.map((f) => ({
    id: f.id,
    name: loc(f),
    color: f.color,
    value: Math.round(sumArr(days.slice(-7).map((d) => dayByFixture(d)[f.id]))),
  })).sort((a, b) => b.value - a.value)
  const total7 = byFx.reduce((x, y) => x + y.value, 0)
  const alerts = buildAlerts(s, settings).filter((a) => !ackd.includes(a.id)).slice(0, 3)
  const cut = getCuts().find((c) => c.mine)
  const over = s.pctMeta >= 1

  return (
    <>
      <PageTitle title={t('panel.overview')} subtitle={t('ov.subtitle')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={Droplets} label={t('ov.today')} value={nf(s.hoy)} unit="L" tone={over ? 'bad' : s.pctMeta > 0.85 ? 'warn' : 'default'} hint={t('ov.ofGoal', { p: nf(s.pctMeta * 100), m: nf(s.meta) })} />
        <Kpi icon={Wallet} label={t('ov.cost')} value={money(s.costoProyectado)} hint={t('ov.costHint', { c: money(s.costoMes) })} />
        <Kpi icon={TrendingDown} label={t('ov.saving')} value={`${s.ahorroPct >= 0 ? '−' : '+'}${nf(Math.abs(s.ahorroPct), 1)}`} unit="%" tone={s.ahorroPct > 0 ? 'good' : 'bad'} hint={t('ov.savingHint')} />
        <Kpi icon={Flame} label={t('ov.streak')} value={String(s.diasBajoMeta)} unit={t('ov.days')} tone="good" hint={t('ov.streakHint')} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card title={t('ov.last30')} className="xl:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={area} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="ar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#35b3a8" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#35b3a8" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#14363b" strokeOpacity="0.08" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} interval={4} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} domain={[0, 'dataMax + 80']} />
                <Tooltip content={<ChartTooltip />} />
                <ReferenceLine y={s.meta} stroke="#e5484d" strokeDasharray="5 5" label={{ value: `${t('cons.goal')} ${s.meta} L`, position: 'insideTopRight', fontSize: 11, fill: '#e5484d', fontWeight: 700 }} />
                <Area type="monotone" dataKey="v" name={t('ov.liters')} stroke="#1d7f84" strokeWidth={2.5} fill="url(#ar)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title={t('ov.byFixture')}>
          <div className="relative mx-auto h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byFx} dataKey="value" nameKey="name" innerRadius={58} outerRadius={86} paddingAngle={2} stroke="none" isAnimationActive={false}>
                  {byFx.map((f) => <Cell key={f.id} fill={f.color} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div><p className="font-display text-2xl font-extrabold leading-none">{nf(total7 / 1000, 1)}</p><p className="text-[11px] font-bold text-ink/55">m³ · 7 {t('ov.days')}</p></div>
            </div>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm font-bold">
            {byFx.map((f) => (
              <li key={f.id} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: f.color }} />
                <span className="flex-1">{f.name}</span>
                <span className="text-ink/55">{nf((f.value / total7) * 100)}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title={t('panel.alerts')} action={<Link to="/panel/alertas" className="text-sm font-extrabold text-deep hover:underline">{t('common.seeAll')}</Link>}>
          {alerts.length === 0 ? (
            <p className="flex items-center gap-2 text-sm font-semibold text-ink/60"><CircleCheck className="text-leaf-600" /> {t('news.noAlerts')}</p>
          ) : (
            <ul className="space-y-3">
              {alerts.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <TriangleAlert size={20} className={`mt-0.5 shrink-0 ${a.sev === 'high' ? 'text-alert' : a.sev === 'good' ? 'text-leaf-600' : 'text-sun-600'}`} />
                  <div><p className="font-display font-extrabold leading-tight">{loc(a).t}</p><p className="text-sm font-semibold text-ink/65">{loc(a).d}</p></div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title={t('ov.nextCut')} action={<Link to="/panel/cortes" className="text-sm font-extrabold text-deep hover:underline">{t('common.seeAll')}</Link>}>
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-sun text-white"><CalendarClock size={32} /></span>
            <div>
              <p className="font-display text-xl font-extrabold first-letter:uppercase leading-tight">{fmt.long(cut.start)}</p>
              <p className="text-sm font-semibold text-ink/65">{fmt.time(cut.start)} → {fmt.time(cut.end)} · {t('news.sector')} {cut.sector}</p>
              <p className="mt-1 text-xs font-semibold text-ink/50">{t('ov.prepare')}</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
