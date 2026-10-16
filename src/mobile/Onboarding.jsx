import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Globe, Radio } from 'lucide-react'
import { Logo, Mascot, Avatar } from '../components/ui'
import { actions, useStore } from '../lib/store'
import { useT } from '../lib/hooks'
import { beep } from '../lib/sound'

const AVATARS = ['a', 'b', 'c', 'd', 'e', 'f']

export default function Onboarding() {
  const t = useT()
  const [step, setStep] = useState(0)
  const settings = useStore((s) => s.settings)
  const user = useStore((s) => s.user)
  const [name, setName] = useState(user.name)
  const [avatar, setAvatar] = useState(user.avatar)
  const [people, setPeople] = useState(settings.personas)

  const finish = () => {
    actions.setSettings({ personas: people, metaDiaL: Math.round(people * 112.5) })
    actions.setUser({ name: name.trim() || 'Camila', avatar, onboarded: true })
    beep('win')
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-brand">
      <button
        onClick={() => actions.setSettings({ lang: settings.lang === 'es' ? 'en' : 'es' })}
        className="absolute left-4 top-4 inline-flex h-9 items-center gap-1 rounded-full bg-white/70 px-3 text-xs font-extrabold text-deep"
        aria-label={t('settings.language')}
      >
        <Globe size={14} /> {settings.lang.toUpperCase()}
      </button>

      {step === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <Logo size={170} className="anim-bob" />
          <h1 className="mt-2 font-display text-5xl font-extrabold text-ink">F-Planet</h1>
          <p className="mt-2 max-w-[16rem] font-semibold text-deep">{t('app.tagline')}</p>
          <button onClick={() => setStep(1)} className="mt-10 w-full rounded-2xl bg-sun px-6 py-4 font-display text-lg font-extrabold text-white shadow-lg shadow-sun/30 hover:bg-sun-600">
            {t('onb.start')}
          </button>
          <p className="mt-4 text-xs font-bold text-ink/60">{t('demo.note')}</p>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-1 flex-col px-6 pb-6 pt-16">
          <div className="mx-auto flex items-center gap-3">
            <Mascot mood="cheer" size={72} />
            <p className="max-w-[12rem] rounded-2xl bg-white p-3 text-sm font-bold shadow">{t('onb.hello')}</p>
          </div>
          <form
            className="mt-5 space-y-4 rounded-3xl bg-white p-5 shadow-xl"
            onSubmit={(e) => {
              e.preventDefault()
              setStep(2)
            }}
          >
            <label className="block">
              <span className="text-sm font-extrabold">{t('onb.name')}</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={24} required className="mt-1 w-full rounded-xl border-2 border-ink/15 px-4 py-3 font-semibold outline-none focus:border-deep" />
            </label>
            <fieldset>
              <legend className="text-sm font-extrabold">{t('onb.avatar')}</legend>
              <div className="mt-2 flex gap-2">
                {AVATARS.map((a) => (
                  <button type="button" key={a} onClick={() => setAvatar(a)} aria-pressed={avatar === a} aria-label={`Avatar ${a}`} className={`rounded-full p-0.5 ${avatar === a ? 'ring-4 ring-sun' : ''}`}>
                    <Avatar name={name || '?'} variant={a} size={40} />
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <span className="text-sm font-extrabold">{t('onb.people')}</span>
              <div className="mt-2 flex items-center gap-3">
                <button type="button" onClick={() => setPeople(Math.max(1, people - 1))} className="h-10 w-10 rounded-full bg-mist text-xl font-extrabold" aria-label="-">−</button>
                <span className="w-8 text-center font-display text-2xl font-extrabold">{people}</span>
                <button type="button" onClick={() => setPeople(Math.min(10, people + 1))} className="h-10 w-10 rounded-full bg-mist text-xl font-extrabold" aria-label="+">+</button>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-mist p-3 text-sm">
              <Radio className="mt-0.5 shrink-0 text-deep" size={20} />
              <p className="font-semibold">{t('onb.sensors')}</p>
            </div>
            <button type="submit" className="w-full rounded-2xl bg-sun py-3.5 font-display text-lg font-extrabold text-white hover:bg-sun-600">{t('onb.create')}</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="w-full rounded-3xl bg-white/90 p-7 shadow-xl">
            <Logo size={84} className="mx-auto" />
            <p className="mt-3 font-display text-2xl font-extrabold text-deep">{name.trim() || 'Camila'},</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight">{t('onb.thanks')}</h2>
            <p className="mt-1 font-semibold text-deep">{t('onb.take')}</p>
            <ul className="mt-4 space-y-1 text-left text-sm font-semibold">
              <li className="flex gap-2"><Check size={18} className="shrink-0 text-leaf-600" />{t('onb.ok1')}</li>
              <li className="flex gap-2"><Check size={18} className="shrink-0 text-leaf-600" />{t('onb.ok2', { n: String(Math.round(people * 112.5)) })}</li>
            </ul>
            <button onClick={finish} className="mt-6 w-full rounded-xl bg-sun px-6 py-3.5 font-display text-lg font-extrabold text-white hover:bg-sun-600">{t('onb.go')}</button>
          </div>
          <Link to="/" className="mt-5 text-sm font-bold text-ink/60 underline">{t('common.backSite')}</Link>
        </div>
      )}
    </div>
  )
}
