import { TriangleAlert, CircleCheck, Info, Check } from 'lucide-react'
import { buildAlerts } from '../lib/alerts'
import { actions, useStore } from '../lib/store'
import { useDateFmt, useLoc, useStats, useT } from '../lib/hooks'
import { FixtureIcon } from '../components/ui'
import { Card, PageTitle } from './parts'

const SEV = {
  high: { label: 'alerts.high', cls: 'bg-alert text-white', icon: TriangleAlert, color: 'text-alert' },
  med: { label: 'alerts.med', cls: 'bg-gold text-ink', icon: TriangleAlert, color: 'text-sun-600' },
  low: { label: 'alerts.low', cls: 'bg-sky text-deep', icon: Info, color: 'text-deep' },
  good: { label: 'alerts.good', cls: 'bg-leaf text-ink', icon: CircleCheck, color: 'text-leaf-600' },
}

export default function AlertsView() {
  const t = useT()
  const loc = useLoc()
  const fmt = useDateFmt()
  const stats = useStats()
  const settings = useStore((s) => s.settings)
  const ackd = useStore((s) => s.alertsAck)
  const alerts = buildAlerts(stats, settings)
  const open = alerts.filter((a) => !ackd.includes(a.id))
  const closed = alerts.filter((a) => ackd.includes(a.id))

  const render = (a) => {
    const S = SEV[a.sev]
    const done = ackd.includes(a.id)
    return (
      <li key={a.id} className={`flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5 ${done ? 'opacity-60' : ''}`}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mist ${S.color}`}>{a.fixture ? <FixtureIcon id={a.fixture} size={24} /> : <S.icon size={24} />}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-lg font-extrabold leading-tight">{loc(a).t}</p>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${S.cls}`}>{t(S.label)}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-ink/70">{loc(a).d}</p>
          <p className="mt-1 text-xs font-bold first-letter:uppercase text-ink/45">{fmt.day(a.when)} · {fmt.time(a.when)}</p>
        </div>
        {a.sev !== 'good' && (done ? (
          <span className="inline-flex items-center gap-1 self-start text-xs font-extrabold text-deep"><Check size={14} /> {t('news.seen')}</span>
        ) : (
          <button onClick={() => actions.ackAlert(a.id)} className="self-start rounded-xl bg-deep px-3.5 py-2 text-sm font-extrabold text-white hover:bg-deep-700">{t('news.markSeen')}</button>
        ))}
      </li>
    )
  }

  return (
    <>
      <PageTitle title={t('panel.alerts')} subtitle={t('alerts.subtitle')}>
        {ackd.length > 0 && <button onClick={() => actions.unackAll()} className="rounded-xl border-2 border-ink/15 px-3 py-1.5 text-sm font-extrabold text-ink/70 hover:bg-white">{t('alerts.reopen')}</button>}
      </PageTitle>
      {open.length === 0 && <Card><p className="flex items-center gap-2 font-semibold text-ink/65"><CircleCheck className="text-leaf-600" /> {t('news.noAlerts')}</p></Card>}
      <ul className="space-y-3">{open.map(render)}</ul>
      {closed.length > 0 && (
        <>
          <h2 className="mb-2 mt-6 font-display text-lg font-extrabold text-ink/60">{t('alerts.history')}</h2>
          <ul className="space-y-3">{closed.map(render)}</ul>
        </>
      )}
      <Card title={t('alerts.how')} className="mt-6">
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-ink/70">
          <li>{t('alerts.how1')}</li>
          <li>{t('alerts.how2')}</li>
          <li>{t('alerts.how3')}</li>
        </ul>
      </Card>
    </>
  )
}
