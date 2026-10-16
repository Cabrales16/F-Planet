import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Download } from 'lucide-react'
import { FIXTURES, dayByFixture, dayHourly, dayTotal, getHistory } from '../lib/sim'
import { useDateFmt, useLoc, useStats, useT, nf, money } from '../lib/hooks'
import { Segmented } from '../components/ui'
import { Card, ChartTooltip, PageTitle } from './parts'

export default function HistoryView() {
  const t = useT()
  const loc = useLoc()
  const fmt = useDateFmt()
  const s = useStats()
  const [range, setRange] = useState(30)
  const days = getHistory().slice(-range)
  const data = days.map((d) => ({ name: fmt.short(d.date), ...Object.fromEntries(FIXTURES.map((f) => [f.id, Math.round(dayByFixture(d)[f.id] * 10) / 10])) }))
  const full = days.length > 1 ? days.slice(0, -1) : days // sin el día en curso
  const hourly = Array.from({ length: 24 }, (_, h) => ({
    name: `${String(h).padStart(2, '0')}h`,
    v: Math.round(full.reduce((a, d) => a + dayHourly(d)[h], 0) / full.length),
  }))
  const sum = days.reduce((a, d) => a + dayTotal(d), 0)

  const exportCsv = () => {
    const head = ['fecha', ...FIXTURES.map((f) => f.id), 'total_litros']
    const rows = days.map((d) => {
      const by = dayByFixture(d)
      return [d.key, ...FIXTURES.map((f) => by[f.id].toFixed(1)), dayTotal(d).toFixed(1)].join(',')
    })
    const blob = new Blob([[head.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `fplanet-consumo-${range}d.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  return (
    <>
      <PageTitle title={t('panel.history')} subtitle={t('hist.subtitle')}>
        <div className="flex items-center gap-2">
          <Segmented label={t('hist.range')} value={range} onChange={setRange} options={[{ value: 7, label: `7 ${t('ov.days')}` }, { value: 30, label: `30 ${t('ov.days')}` }, { value: 60, label: `60 ${t('ov.days')}` }]} />
          <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-xl bg-sun px-3.5 py-2 text-sm font-extrabold text-white hover:bg-sun-600"><Download size={16} /> CSV</button>
        </div>
      </PageTitle>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          [t('hist.total'), `${nf(sum / 1000, 1)} m³`],
          [t('hist.avg'), `${nf(sum / days.length)} L`],
          [t('hist.cost'), money(s.costoLitros(sum))],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5"><p className="text-xs font-extrabold uppercase tracking-wide text-ink/55">{k}</p><p className="font-display text-2xl font-extrabold">{v}</p></div>
        ))}
      </div>

      <Card title={t('hist.daily')}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14363b" strokeOpacity="0.08" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} interval={range > 30 ? 5 : range > 7 ? 2 : 0} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
              <ReferenceLine y={s.meta} stroke="#e5484d" strokeDasharray="5 5" />
              {FIXTURES.map((f) => <Bar key={f.id} dataKey={f.id} name={loc(f)} stackId="a" fill={f.color} isAnimationActive={false} />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title={t('hist.hourly')} className="mt-4">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourly} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14363b" strokeOpacity="0.08" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={1} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="v" name={t('ov.liters')} fill="#1d7f84" radius={[4, 4, 0, 0]} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs font-semibold text-ink/55">{t('hist.hourlyNote')}</p>
      </Card>
    </>
  )
}
