import { Check } from 'lucide-react'
import { getCuts, MY_SECTOR } from '../lib/content'
import { useDateFmt, useT } from '../lib/hooks'
import { Card, PageTitle } from './parts'

export default function CutsView() {
  const t = useT()
  const fmt = useDateFmt()
  const cuts = getCuts(new Date(), 9)
  const now = new Date()
  const mine = cuts.find((c) => c.mine)

  return (
    <>
      <PageTitle title={t('panel.cuts')} subtitle={t('cuts.subtitle', { s: String(MY_SECTOR) })} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card title={t('cuts.schedule')} className="xl:col-span-2">
          <ul className="divide-y divide-ink/10">
            {cuts.map((c) => {
              const days = Math.ceil((c.start - now) / 86400000)
              return (
                <li key={c.sector} className={`flex items-center gap-4 py-3 ${c.mine ? '-mx-2 rounded-xl bg-sun/15 px-2' : ''}`}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-lg font-extrabold ${c.mine ? 'bg-sun text-white' : 'bg-mist text-deep'}`}>{c.sector}</span>
                  <div className="flex-1">
                    <p className="font-display font-extrabold first-letter:uppercase">{fmt.long(c.start)}</p>
                    <p className="text-sm font-semibold text-ink/60">{fmt.time(c.start)} → {fmt.day(c.end)} {fmt.time(c.end)}</p>
                  </div>
                  {c.mine && <span className="rounded-full bg-sun px-2.5 py-0.5 text-xs font-extrabold text-white">{t('news.yours')}</span>}
                  <span className="w-20 text-right text-sm font-bold text-ink/55">{t('news.inDays', { n: String(days) })}</span>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-xs font-semibold text-ink/50">{t('news.cuts.note')}</p>
        </Card>

        <Card title={t('cuts.prepare')}>
          <p className="mb-3 text-sm font-semibold text-ink/65">{t('cuts.prepare.desc', { d: fmt.day(mine.start) })}</p>
          <ul className="space-y-2.5">
            {['cuts.c1', 'cuts.c2', 'cuts.c3', 'cuts.c4', 'cuts.c5'].map((k) => (
              <li key={k} className="flex gap-2.5 text-sm font-bold"><Check size={18} className="mt-0.5 shrink-0 text-leaf-600" />{t(k)}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
