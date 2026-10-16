import { useState } from 'react'
import { ShoppingCart, Wrench, Coffee, Gift, TreePine, Ticket, Droplet, X, Copy } from 'lucide-react'
import { SHOP } from '../lib/content'
import { actions, useStore } from '../lib/store'
import { useLoc, useT } from '../lib/hooks'
import { beep } from '../lib/sound'

const ICON = { cart: ShoppingCart, wrench: Wrench, coffee: Coffee, gift: Gift, tree: TreePine, ticket: Ticket }

export default function Shop() {
  const t = useT()
  const loc = useLoc()
  const gotas = useStore((s) => s.progress.gotas)
  const [won, setWon] = useState(null)

  const redeem = (item) => {
    const code = actions.redeem(item)
    if (code) {
      beep('win')
      setWon({ item, code })
    } else beep('bad')
  }

  return (
    <div className="px-4 pb-8 pt-4">
      <div className="flex items-center justify-between rounded-2xl bg-ink p-4 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-white/60">{t('shop.balance')}</p>
          <p className="flex items-center gap-1.5 font-display text-3xl font-extrabold"><Droplet className="text-sky" fill="currentColor" />{gotas}</p>
        </div>
        <p className="max-w-[9rem] text-right text-xs font-semibold text-white/70">{t('shop.earn')}</p>
      </div>
      <p className="mt-2 text-xs font-semibold text-ink/50">{t('shop.fictional')}</p>

      <ul className="mt-3 space-y-3">
        {SHOP.map((item) => {
          const I = ICON[item.icon]
          const can = gotas >= item.cost
          const c = loc(item)
          return (
            <li key={item.id} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-ink/5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sky/60 text-deep"><I size={28} /></span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[17px] font-extrabold leading-tight">{c.title}</p>
                <p className="truncate text-xs font-bold text-deep">{c.shop}</p>
                <p className="text-xs font-semibold text-ink/55">{c.desc}</p>
              </div>
              <button
                onClick={() => redeem(item)}
                disabled={!can}
                className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-sun px-3 py-2 font-display text-sm font-extrabold text-white disabled:bg-ink/15 disabled:text-ink/40"
                aria-label={`${t('shop.redeem')} ${c.title}`}
              >
                <Droplet size={14} fill="currentColor" />{item.cost}
              </button>
            </li>
          )
        })}
      </ul>

      {won && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-black/50 p-6" role="dialog" aria-modal="true">
          <div className="anim-pop relative w-full rounded-3xl bg-white p-6 text-center shadow-2xl">
            <button onClick={() => setWon(null)} aria-label={t('common.close')} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full hover:bg-mist"><X size={20} /></button>
            <p className="text-4xl" aria-hidden="true">🎉</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">{t('shop.won')}</h2>
            <p className="mt-1 font-bold">{loc(won.item).title}</p>
            <p className="text-sm font-semibold text-ink/60">{loc(won.item).shop}</p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-deep bg-mist p-3">
              <code className="font-display text-2xl font-extrabold tracking-widest text-deep">{won.code}</code>
              <button onClick={() => navigator.clipboard?.writeText(won.code)} aria-label={t('shop.copy')} className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow"><Copy size={16} /></button>
            </div>
            <p className="mt-3 text-xs font-semibold text-ink/50">{t('shop.demoCode')}</p>
            <button onClick={() => setWon(null)} className="mt-4 w-full rounded-xl bg-sun py-3 font-display font-extrabold text-white">{t('common.continue')}</button>
          </div>
        </div>
      )}
    </div>
  )
}
