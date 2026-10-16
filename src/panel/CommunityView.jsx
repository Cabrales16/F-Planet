import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useCommunity } from '../lib/community'
import { useT } from '../lib/hooks'
import { Avatar } from '../components/ui'
import { Card, ChartTooltip, PageTitle } from './parts'

export default function CommunityView() {
  const t = useT()
  const c = useCommunity()
  const data = c.blocks.map((b) => ({ name: `${t('rank.blockShort')} ${b.id}`, v: Math.round(b.ahorro * 10) / 10, me: b.me }))

  return (
    <>
      <PageTitle title={t('panel.community')} subtitle={t('comm.subtitle')} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card title={t('comm.blocks')} className="xl:col-span-3">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#14363b" strokeOpacity="0.08" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} unit="%" />
                <Tooltip content={<ChartTooltip unit="%" />} />
                <Bar dataKey="v" name={t('comm.saving')} radius={[6, 6, 0, 0]} isAnimationActive={false}>
                  {data.map((d) => <Cell key={d.name} fill={d.me ? '#f58a1f' : '#1d7f84'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 rounded-xl bg-sun/15 p-3 text-sm font-bold">{t('rank.yourBlock', { n: String(c.myBlock.id), r: String(c.myBlock.rank) })}</p>
        </Card>

        <Card title={t('comm.neighbors')} className="xl:col-span-2">
          <ol className="space-y-2">
            {c.people.map((p, i) => (
              <li key={p.name} className={`flex items-center gap-3 rounded-xl p-2.5 ${p.me ? 'bg-sun/15' : ''}`}>
                <span className="w-6 text-center font-display font-extrabold text-ink/45">{i + 1}</span>
                <Avatar name={p.name} variant={p.avatar} size={34} />
                <span className="flex-1 truncate font-bold">{p.name}{p.me && <span className="ml-1 text-xs text-sun-600">({t('rank.you')})</span>}</span>
                <span className="font-display font-extrabold">{p.xp} <small className="text-xs text-ink/50">XP</small></span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs font-semibold text-ink/50">{t('comm.note')}</p>
        </Card>
      </div>
    </>
  )
}
