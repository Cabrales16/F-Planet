import { useState } from 'react'
import { House } from 'lucide-react'
import { useCommunity } from '../lib/community'
import { useT } from '../lib/hooks'
import { Avatar, Segmented } from '../components/ui'

export default function Ranking() {
  const t = useT()
  const c = useCommunity()
  const [tab, setTab] = useState('blocks')
  const max = c.blocks[0].ahorro

  return (
    <div className="px-4 pb-8 pt-4">
      <div className="flex justify-center">
        <Segmented
          label={t('rank.title')}
          value={tab}
          onChange={setTab}
          options={[
            { value: 'blocks', label: t('rank.blocks') },
            { value: 'people', label: t('rank.neighbors') },
          ]}
        />
      </div>

      {tab === 'blocks' ? (
        <>
          <p className="mt-4 text-center text-sm font-semibold text-ink/70">{t('rank.blocks.desc')}</p>
          <div className="mt-3 rounded-3xl bg-white p-4 pb-0 shadow-sm ring-1 ring-ink/5">
            <div className="flex h-56 items-end gap-1.5" role="img" aria-label={t('rank.blocks')}>
              {c.blocks.map((b) => (
                <div key={b.id} className="flex flex-1 flex-col items-center justify-end">
                  <span className={`mb-1 text-[10px] font-extrabold ${b.me ? 'text-sun-600' : 'text-ink/55'}`}>{b.ahorro.toFixed(1)}%</span>
                  <span className={`relative mb-1 grid place-items-center ${b.me ? 'text-sun-600' : 'text-ink'}`}>
                    <House size={30} strokeWidth={1.8} />
                    <span className="absolute top-2.5 text-[11px] font-extrabold">{b.id}</span>
                  </span>
                  <div className={`w-full rounded-t-lg transition-all duration-700 ${b.me ? 'bg-sun' : 'bg-deep'}`} style={{ height: `${(b.ahorro / max) * 150}px` }} />
                </div>
              ))}
            </div>
            <p className="-mx-4 rounded-b-3xl bg-ink py-2 text-center font-display text-sm font-extrabold text-white">{t('rank.blockLabel')}</p>
          </div>
          <p className="mt-4 rounded-2xl bg-sun/15 p-3 text-center font-bold">
            {t('rank.yourBlock', { n: String(c.myBlock.id), r: String(c.myBlock.rank) })}
          </p>
        </>
      ) : (
        <ol className="mt-4 space-y-2">
          {c.people.map((p, i) => (
            <li key={p.name} className={`flex items-center gap-3 rounded-2xl p-3 shadow-sm ring-1 ${p.me ? 'bg-sun/15 ring-sun/40' : 'bg-white ring-ink/5'}`}>
              <span className="w-6 text-center font-display text-lg font-extrabold text-ink/50">{i + 1}</span>
              <Avatar name={p.name} variant={p.avatar} size={38} />
              <span className="flex-1 truncate font-bold">{p.name}{p.me && <span className="ml-1 text-xs text-sun-600">({t('rank.you')})</span>}</span>
              <span className="font-display font-extrabold">{p.xp} <small className="text-xs text-ink/50">XP</small></span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
