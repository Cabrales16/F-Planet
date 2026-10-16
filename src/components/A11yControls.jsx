import { Segmented, Switch } from './ui'
import { actions, useStore } from '../lib/store'
import { useT } from '../lib/hooks'

// Accesibilidad e idioma: mismos ajustes que el mockup original
// (sonido, tipo de letra, tamaño de letra y video de señas).
export default function A11yControls() {
  const t = useT()
  const s = useStore((x) => x.settings)
  const set = actions.setSettings
  const Row = ({ label, hint, children }) => (
    <div className="flex items-center justify-between gap-3 border-b border-ink/10 py-3.5 last:border-0">
      <div className="min-w-0">
        <p className="font-display text-base font-bold">{label}</p>
        {hint && <p className="text-xs font-semibold text-ink/55">{hint}</p>}
      </div>
      {children}
    </div>
  )
  return (
    <div>
      <Row label={t('settings.language')}>
        <Segmented label={t('settings.language')} value={s.lang} onChange={(v) => set({ lang: v })} options={[{ value: 'es', label: 'ES' }, { value: 'en', label: 'EN' }]} />
      </Row>
      <Row label={t('settings.sound')} hint={t('settings.sound.hint')}>
        <Switch checked={s.sound} onChange={(v) => set({ sound: v })} label={t('settings.sound')} />
      </Row>
      <Row label={t('settings.font')} hint={t('settings.font.hint')}>
        <Segmented label={t('settings.font')} value={s.font} onChange={(v) => set({ font: v })} options={[{ value: 'default', label: 'Aa' }, { value: 'dyslexic', label: 'Dys' }]} />
      </Row>
      <Row label={t('settings.size')}>
        <Segmented
          label={t('settings.size')}
          value={s.fontScale}
          onChange={(v) => set({ fontScale: v })}
          options={[{ value: 0.9, label: 'A-' }, { value: 1, label: 'A' }, { value: 1.15, label: 'A+' }, { value: 1.3, label: 'A++' }]}
        />
      </Row>
      <Row label={t('settings.sign')} hint={t('settings.sign.hint')}>
        <Switch checked={s.signVideo} onChange={(v) => set({ signVideo: v })} label={t('settings.sign')} />
      </Row>
    </div>
  )
}
