import { useState } from 'react'
import { TriangleAlert, CircleCheck, Info, Droplets, Check } from 'lucide-react'
import { NEWS, getCuts, MY_SECTOR } from '../lib/content'
import { buildAlerts } from '../lib/alerts'
import { actions, useStore } from '../lib/store'
import { useDateFmt, useLoc, useStats, useT } from '../lib/hooks'
import { Segmented } from '../components/ui'

const SEV = {
  high: { ring: 'ring-alert/40 bg-alert/10', icon: TriangleAlert, color: 'text-alert' },
  med: { ring: 'ring-gold/50 bg-gold/15', icon: TriangleAlert, color: 'text-sun-600' },
  low: { ring: 'ring-deep/30 bg-sky/40', icon: Info, color: 'text-deep' },
  good: { ring: 'ring-leaf-600/40 bg-leaf/30', icon: CircleCheck, color: 'text-leaf-600' },
}

export default function News() {
  const t = useT()
  const loc = useLoc()
  const fmt = useDateFmt()
  const stats = useStats()
  const settings = useStore((s) => s.settings)
  const ackd = useStore((s) => s.alertsAck)
  const [tab, setTab] = useState('alerts')
  const alerts = buildAlerts(stats, settings)
  const cuts = getCuts(new Date(), 9)
  const now = new Date()

  return (
    <div className="px-4 pb-8 pt-4">
      <div className="flex justify-center">
        <Segmented
          label={t('nav.news')}
          value={tab}
          onChange={setTab}
          options={[
            { value: 'alerts', label: t('news.alerts') },
            { value: 'cuts', label: t('news.cuts') },
            { value: 'news', label: t('news.news') },
          ]}
        />
      </div>

      {tab === 'alerts' && (
        <ul className="mt-4 space-y-3">
          {alerts.length === 0 && <li className="rounded-2xl bg-white p-4 text-sm font-semibold">{t('news.noAlerts')}</li>}
          {alerts.map((a) => {
            const S = SEV[a.sev]
            const done = ackd.includes(a.id)
            return (
              <li key={a.id} className={`rounded-2xl p-3.5 ring-1 ${S.ring} ${done ? 'opacity-55' : ''}`}>
                <div className="flex gap-3">
                  <S.icon className={`mt-0.5 shrink-0 ${S.color}`} size={24} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-extrabold leading-tight">{loc(a).t}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-ink/75">{loc(a).d}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-ink/50">{fmt.day(a.when)} · {fmt.time(a.when)}</span>
                      {a.sev !== 'good' && (done ? <span className="inline-flex items-center gap-1 text-xs font-extrabold text-deep"><Check size={14} />{t('news.seen')}</span> : (
                        <button onClick={() => actions.ackAlert(a.id)} className="rounded-lg bg-white px-3 py-1 text-xs font-extrabold text-deep shadow-sm">{t('news.markSeen')}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {tab === 'cuts' && (
        <>
          <p className="mt-4 text-sm font-semibold text-ink/65">{t('news.cuts.desc', { s: String(MY_SECTOR) })}</p>
          <ul className="mt-3 space-y-2">
            {cuts.map((c) => {
              const days = Math.ceil((c.start - now) / 86400000)
              return (
                <li key={c.sector} className={`flex items-center gap-3 rounded-2xl p-3 shadow-sm ring-1 ${c.mine ? 'bg-sun/15 ring-sun/50' : 'bg-white ring-ink/5'}`}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-lg font-extrabold ${c.mine ? 'bg-sun text-white' : 'bg-mist text-deep'}`}>{c.sector}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold first-letter:uppercase">{fmt.long(c.start)}</p>
                    <p className="text-xs font-semibold text-ink/55">{fmt.time(c.start)} → {fmt.time(c.end)} · {t('news.sector')} {c.sector}{c.mine ? ` (${t('news.yours')})` : ''}</p>
                  </div>
                  <span className="text-xs font-extrabold text-ink/60">{t('news.inDays', { n: String(days) })}</span>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-xs font-semibold text-ink/50">{t('news.cuts.note')}</p>
        </>
      )}

      {tab === 'news' && (
        <ul className="mt-4 space-y-3">
          {NEWS.map((n) => (
            <li key={n.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
              <div className="flex items-center gap-2 text-xs font-bold text-deep"><Droplets size={14} /> F-Planet · {fmt.short(new Date(now.getTime() - n.daysAgo * 86400000))}</div>
              <p className="mt-1 font-display text-lg font-extrabold leading-tight">{loc(n).t}</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-ink/70">{loc(n).d}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
