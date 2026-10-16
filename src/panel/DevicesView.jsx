import { Battery, BatteryLow, Radio, Wifi } from 'lucide-react'
import { FIXTURES } from '../lib/sim'
import { useLive, useLoc, useStats, useT } from '../lib/hooks'
import { FixtureIcon } from '../components/ui'
import { Card, Kpi, PageTitle } from './parts'

const META = {
  ducha: { batt: 87, rssi: -58, fw: '1.4.2' },
  cocina: { batt: 74, rssi: -63, fw: '1.4.2' },
  inodoro: { batt: 69, rssi: -71, fw: '1.4.1' },
  lavadora: { batt: 92, rssi: -55, fw: '1.4.2' },
  lavamanos: { batt: 18, rssi: -66, fw: '1.4.2' },
  patio: { batt: 81, rssi: -79, fw: '1.3.9' },
}

function Bars({ rssi }) {
  const n = rssi > -60 ? 4 : rssi > -70 ? 3 : rssi > -80 ? 2 : 1
  return (
    <span className="inline-flex items-end gap-0.5" aria-label={`${rssi} dBm`}>
      {[1, 2, 3, 4].map((i) => <span key={i} className={`w-1.5 rounded-sm ${i <= n ? 'bg-deep' : 'bg-ink/15'}`} style={{ height: 4 + i * 3 }} />)}
    </span>
  )
}

export default function DevicesView() {
  const t = useT()
  const loc = useLoc()
  const live = useLive()
  const s = useStats()
  const low = Object.values(META).filter((m) => m.batt < 25).length

  return (
    <>
      <PageTitle title={t('panel.devices')} subtitle={t('dev.subtitle')} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi icon={Radio} label={t('dev.online')} value={`${FIXTURES.length}/${FIXTURES.length}`} hint={t('dev.gateway')} tone="good" />
        <Kpi icon={Wifi} label={t('dev.protocol')} value="LoRaWAN" hint={t('dev.protocolHint')} />
        <Kpi icon={BatteryLow} label={t('dev.lowBatt')} value={String(low)} tone={low ? 'warn' : 'good'} hint={t('dev.lowBattHint')} />
      </div>

      <Card className="mt-4 overflow-x-auto" title={t('dev.table')}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs font-extrabold uppercase tracking-wide text-ink/50">
              <th className="pb-2">{t('dev.sensor')}</th>
              <th className="pb-2">{t('dev.location')}</th>
              <th className="pb-2">{t('dev.battery')}</th>
              <th className="pb-2">{t('dev.signal')}</th>
              <th className="pb-2">FW</th>
              <th className="pb-2">{t('dev.status')}</th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {FIXTURES.map((f, i) => {
              const m = META[f.id]
              const flagged = s.leak?.fixture === f.id
              return (
                <tr key={f.id} className="border-b border-ink/5 last:border-0">
                  <td className="py-3"><code className="rounded bg-mist px-1.5 py-0.5 text-xs">FP-S{String(i + 1).padStart(2, '0')}</code></td>
                  <td className="py-3"><span className="inline-flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: f.color }}><FixtureIcon id={f.id} size={16} /></span>{loc(f)}</span></td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1.5 ${m.batt < 25 ? 'text-alert' : ''}`}>
                      {m.batt < 25 ? <BatteryLow size={18} /> : <Battery size={18} />}{m.batt}%
                    </span>
                  </td>
                  <td className="py-3"><Bars rssi={m.rssi} /> <span className="ml-1 text-xs text-ink/50">{m.rssi} dBm</span></td>
                  <td className="py-3 text-ink/60">{m.fw}</td>
                  <td className="py-3">
                    {flagged ? (
                      <span className="rounded-full bg-alert/10 px-2.5 py-0.5 text-xs font-extrabold text-alert">{t('dev.leak')}</span>
                    ) : live.flows[f.id] > 0 ? (
                      <span className="rounded-full bg-sky px-2.5 py-0.5 text-xs font-extrabold text-deep">{t('live.running')}</span>
                    ) : (
                      <span className="rounded-full bg-leaf/40 px-2.5 py-0.5 text-xs font-extrabold">{t('dev.ok')}</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-3 text-xs font-semibold text-ink/50">{t('dev.note')}</p>
      </Card>
    </>
  )
}
