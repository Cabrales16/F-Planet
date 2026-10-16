import { Flame, Leaf, Map as MapIcon, ShieldCheck, Ticket, Lock } from 'lucide-react'
import { ACHIEVEMENTS, SHOP } from '../lib/content'
import { useCommunity } from '../lib/community'
import { useStore } from '../lib/store'
import { useLoc, useT, useDateFmt } from '../lib/hooks'
import { Avatar } from '../components/ui'

const ICON = { leaf: Leaf, flame: Flame, map: MapIcon, shield: ShieldCheck }

function Podium({ people }) {
  const [first, second, third] = people
  const slot = (p, h, n, avatar = 46) => (
    <div className="flex flex-1 flex-col items-center justify-end">
      <Avatar name={p.name} variant={p.avatar} size={avatar} ring />
      <p className="mt-1 max-w-full truncate text-xs font-extrabold">{p.name}</p>
      <p className="text-[11px] font-bold text-ink/55">{p.xp} XP</p>
      <div className="mt-1.5 grid w-full place-items-start rounded-t-2xl bg-ink pt-2" style={{ height: h }}>
        <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-white font-display text-xl font-extrabold">{n}</span>
      </div>
    </div>
  )
  return (
    <div className="flex items-end gap-2 px-6 pt-4">
      {slot(second, 96, 2)}
      {slot(first, 130, 1, 54)}
      {slot(third, 70, 3)}
    </div>
  )
}

export default function Prizes() {
  const t = useT()
  const loc = useLoc()
  const fmt = useDateFmt()
  const c = useCommunity()
  const owned = useStore((s) => s.achievements)
  const redeemed = useStore((s) => s.redeemed)

  return (
    <div className="px-4 pb-8 pt-4">
      <Podium people={c.people} />
      <p className="mt-2 text-center text-sm font-bold text-ink/60">{t('prize.yourRank', { n: String(c.myRank) })}</p>

      <h3 className="mt-6 font-display text-lg font-extrabold">{t('prize.achievements')}</h3>
      <div className="mt-2 grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const has = owned.includes(a.id)
          const I = ICON[a.icon]
          return (
            <div key={a.id} className={`rounded-2xl p-3 text-center shadow-sm ring-1 ${has ? 'bg-white ring-ink/5' : 'bg-white/50 ring-ink/5'}`}>
              <span className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${has ? 'bg-gold/30 text-sun-600' : 'bg-ink/10 text-ink/30'}`}>{has ? <I size={26} /> : <Lock size={22} />}</span>
              <p className={`mt-1.5 text-sm font-extrabold ${has ? '' : 'text-ink/40'}`}>{loc(a).t}</p>
              <p className="text-[11px] font-semibold leading-tight text-ink/55">{loc(a).d}</p>
            </div>
          )
        })}
      </div>

      <h3 className="mt-6 font-display text-lg font-extrabold">{t('prize.coupons')}</h3>
      {redeemed.length === 0 ? (
        <p className="mt-2 rounded-2xl bg-white p-4 text-sm font-semibold text-ink/60 ring-1 ring-ink/5">{t('prize.noCoupons')}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {redeemed.map((r) => {
            const item = SHOP.find((s) => s.id === r.itemId)
            return (
              <li key={r.code} className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-deep/40 bg-white p-3">
                <Ticket className="text-deep" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">{loc(item).title}</p>
                  <p className="text-xs font-semibold text-ink/55">{fmt.short(new Date(r.date))}</p>
                </div>
                <code className="rounded-lg bg-mist px-2 py-1 text-sm font-extrabold tracking-wider text-deep">{r.code}</code>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
