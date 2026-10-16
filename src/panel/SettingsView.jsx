import { RotateCcw } from 'lucide-react'
import A11yControls from '../components/A11yControls'
import { Switch } from '../components/ui'
import { actions, useStore } from '../lib/store'
import { useT, money, nf } from '../lib/hooks'
import { Card, PageTitle } from './parts'

function Field({ label, hint, children }) {
  return (
    <label className="flex items-center justify-between gap-4 border-b border-ink/10 py-3.5 last:border-0">
      <span className="min-w-0"><span className="block font-display font-bold">{label}</span>{hint && <span className="block text-xs font-semibold text-ink/55">{hint}</span>}</span>
      {children}
    </label>
  )
}

const num = 'w-28 rounded-xl border-2 border-ink/15 px-3 py-2 text-right font-bold outline-none focus:border-deep'

export default function SettingsView() {
  const t = useT()
  const s = useStore((x) => x.settings)
  const set = actions.setSettings
  const n = (v, min, max) => Math.min(max, Math.max(min, Number(v) || 0))

  return (
    <>
      <PageTitle title={t('panel.settings')} subtitle={t('set.subtitle')} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card title={t('set.home')}>
          <Field label={t('set.people')}>
            <input type="number" min={1} max={12} value={s.personas} onChange={(e) => set({ personas: n(e.target.value, 1, 12) })} className={num} />
          </Field>
          <Field label={t('set.goal')} hint={t('set.goalHint', { p: nf(s.metaDiaL / s.personas) })}>
            <span className="flex items-center gap-3">
              <input type="range" min={150} max={1200} step={10} value={s.metaDiaL} onChange={(e) => set({ metaDiaL: Number(e.target.value) })} className="w-36 accent-[#1d7f84]" aria-label={t('set.goal')} />
              <span className="w-20 text-right font-display font-extrabold">{s.metaDiaL} L</span>
            </span>
          </Field>
          <Field label={t('set.rate')} hint={t('set.rateHint')}>
            <input type="number" min={0} step={100} value={s.tarifaM3} onChange={(e) => set({ tarifaM3: n(e.target.value, 0, 100000) })} className={num} />
          </Field>
          <Field label={t('set.fixed')} hint={money(s.cargoFijo)}>
            <input type="number" min={0} step={500} value={s.cargoFijo} onChange={(e) => set({ cargoFijo: n(e.target.value, 0, 500000) })} className={num} />
          </Field>
        </Card>

        <Card title={t('set.alerts')}>
          <Field label={t('set.leak')} hint={t('set.leakHint')}><Switch checked={s.alertaFuga} onChange={(v) => set({ alertaFuga: v })} label={t('set.leak')} /></Field>
          <Field label={t('set.excess')} hint={t('set.excessHint')}><Switch checked={s.alertaExceso} onChange={(v) => set({ alertaExceso: v })} label={t('set.excess')} /></Field>
          <Field label={t('set.cuts')} hint={t('set.cutsHint')}><Switch checked={s.avisoCortes} onChange={(v) => set({ avisoCortes: v })} label={t('set.cuts')} /></Field>
          <Field label={t('set.shower')} hint={t('set.showerHint')}>
            <span className="flex items-center gap-2"><input type="number" min={1} max={60} value={s.umbralDuchaMin} onChange={(e) => set({ umbralDuchaMin: n(e.target.value, 1, 60) })} className={num + ' w-20'} /><span className="text-sm font-bold text-ink/50">min</span></span>
          </Field>
        </Card>

        <Card title={t('set.access')}><A11yControls /></Card>

        <Card title={t('set.data')}>
          <p className="text-sm font-semibold text-ink/65">{t('demo.resetHint')}</p>
          <button onClick={() => actions.reset()} className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-alert/40 px-4 py-2.5 font-display font-extrabold text-alert hover:bg-alert/5"><RotateCcw size={18} /> {t('demo.reset')}</button>
        </Card>
      </div>
    </>
  )
}
