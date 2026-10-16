import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TIPS } from '../lib/content'
import { useLoc, useT } from '../lib/hooks'
import { Mascot } from '../components/ui'

const PER = 3

export default function Tips() {
  const t = useT()
  const loc = useLoc()
  const [page, setPage] = useState(0)
  const pages = Math.ceil(TIPS.length / PER)
  const items = TIPS.slice(page * PER, page * PER + PER)

  return (
    <div className="flex min-h-full flex-col px-4 pb-6 pt-4">
      <p className="text-center text-sm font-extrabold text-ink/60">{t('tips.page', { a: String(page + 1), b: String(pages) })}</p>
      <div className="mt-3 flex-1 space-y-5">
        {items.map((tip, i) => (
          <div key={tip.es} className={`flex items-end gap-2 ${i % 2 ? 'flex-row-reverse' : ''}`}>
            <Mascot mood={i === 1 ? 'cheer' : 'happy'} size={72} className="shrink-0" />
            <div className={`relative rounded-3xl bg-white p-4 text-[15px] font-bold leading-snug shadow-md ring-1 ring-ink/10 ${i % 2 ? 'rounded-br-md' : 'rounded-bl-md'}`}>
              {loc(tip)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button disabled={page === 0} onClick={() => setPage(page - 1)} aria-label={t('common.prev')} className="grid h-12 w-12 place-items-center rounded-full bg-white shadow ring-1 ring-ink/10 disabled:opacity-30"><ChevronLeft /></button>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: pages }, (_, i) => <span key={i} className={`h-2.5 rounded-full transition-all ${i === page ? 'w-6 bg-deep' : 'w-2.5 bg-ink/20'}`} />)}
        </div>
        <button disabled={page === pages - 1} onClick={() => setPage(page + 1)} aria-label={t('common.next')} className="grid h-12 w-12 place-items-center rounded-full bg-white shadow ring-1 ring-ink/10 disabled:opacity-30"><ChevronRight /></button>
      </div>
    </div>
  )
}
