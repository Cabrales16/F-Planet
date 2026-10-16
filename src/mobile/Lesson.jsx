import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { X, Check, Hand, Droplet, Star, Lightbulb } from 'lucide-react'
import { MISSIONS } from '../lib/content'
import { actions, useStore } from '../lib/store'
import { useLoc, useT } from '../lib/hooks'
import { Mascot } from '../components/ui'
import { beep } from '../lib/sound'

function SignVideo() {
  const t = useT()
  return (
    <div className="absolute right-3 top-16 z-10 w-28 overflow-hidden rounded-xl border-2 border-ink bg-ink shadow-lg" role="img" aria-label={t('lesson.sign')}>
      <div className="grid h-20 place-items-center bg-gradient-to-b from-deep to-ink">
        <Hand size={36} className="anim-bob text-white" />
      </div>
      <p className="bg-ink px-1 py-0.5 text-center text-[10px] font-bold leading-tight text-white">{t('lesson.sign')}</p>
    </div>
  )
}

export default function Lesson() {
  const { id } = useParams()
  const t = useT()
  const loc = useLoc()
  const nav = useNavigate()
  const m = MISSIONS.find((x) => x.id === id)
  const signVideo = useStore((s) => s.settings.signVideo)
  const [step, setStep] = useState(0) // 0 tip, 1 quiz, 2 acción, 3 premio
  const [picked, setPicked] = useState(null)
  const [committed, setCommitted] = useState(false)
  const [earned, setEarned] = useState(null)

  if (!m) return <Navigate to="/app" replace />
  const c = loc(m)
  const correct = picked === m.correct
  const idx = MISSIONS.indexOf(m)

  const finish = () => {
    const ok = actions.completeMission(m.id, { xp: m.xp, gotas: m.gotas })
    setEarned(ok ? { xp: m.xp, gotas: m.gotas } : { xp: 0, gotas: 0 })
    beep('win')
    setStep(3)
  }

  const pick = (i) => {
    if (picked !== null && correct) return
    setPicked(i)
    beep(i === m.correct ? 'ok' : 'bad')
  }

  const progress = [0, 1, 2, 3].map((n) => (n <= step ? 'bg-leaf-600' : 'bg-ink/15'))

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-white">
      {signVideo && step < 3 && <SignVideo />}
      <div className="flex items-center gap-3 px-4 pb-2 pt-4">
        <button onClick={() => nav('/app')} aria-label={t('common.close')} className="grid h-10 w-10 place-items-center rounded-full text-ink/60 hover:bg-mist"><X size={26} /></button>
        <div className="flex flex-1 gap-1.5" aria-hidden="true">{progress.map((p, i) => <span key={i} className={`h-3 flex-1 rounded-full ${p}`} />)}</div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-2">
        <p className="text-xs font-extrabold uppercase tracking-wide text-deep">{t('lesson.mission', { n: String(idx + 1) })}</p>
        <h2 className="font-display text-2xl font-extrabold leading-tight">{c.title}</h2>

        {step === 0 && (
          <div className="mt-4 flex flex-1 flex-col">
            <div className="flex items-end gap-2">
              <Mascot mood="happy" size={92} className="anim-bob shrink-0" />
              <div className="relative rounded-3xl rounded-bl-md bg-sky/60 p-4 text-[15px] font-semibold leading-snug">
                <Lightbulb size={18} className="mb-1 text-sun-600" />
                {c.tip}
              </div>
            </div>
            <div className="mt-auto pt-6">
              <button onClick={() => setStep(1)} className="w-full rounded-2xl bg-sun py-4 font-display text-lg font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_#b85c0a] active:translate-y-0.5 active:shadow-none">{t('common.continue')}</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4 flex flex-1 flex-col">
            <p className="font-display text-lg font-bold leading-snug">{c.q}</p>
            <div className="mt-4 space-y-3" role="radiogroup" aria-label={c.q}>
              {c.options.map((o, i) => {
                const sel = picked === i
                const state = !sel ? 'border-ink/15 bg-white' : i === m.correct ? 'border-leaf-600 bg-leaf/40' : 'border-alert bg-alert/10'
                return (
                  <button key={o} role="radio" aria-checked={sel} onClick={() => pick(i)} className={`w-full rounded-2xl border-2 px-4 py-3.5 text-left font-bold transition ${state}`}>
                    {o}
                  </button>
                )
              })}
            </div>
            {picked !== null && (
              <div className={`anim-pop mt-4 rounded-2xl p-3.5 text-sm font-bold ${correct ? 'bg-leaf/40' : 'bg-alert/10'}`} role="status">
                {correct ? '✅ ' + t('lesson.right') : '💡 ' + t('lesson.wrong')} <span className="font-semibold">{c.explain}</span>
              </div>
            )}
            <div className="mt-auto pt-6">
              <button disabled={!correct} onClick={() => setStep(2)} className="w-full rounded-2xl bg-sun py-4 font-display text-lg font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_#b85c0a] disabled:bg-ink/15 disabled:text-ink/40 disabled:shadow-none">{t('common.continue')}</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 flex flex-1 flex-col">
            <div className="rounded-3xl bg-mist p-5">
              <p className="text-xs font-extrabold uppercase tracking-wide text-ink/55">{t('lesson.challenge')}</p>
              <p className="mt-1 font-display text-xl font-bold leading-snug">{c.action}</p>
            </div>
            <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-ink/15 p-4 font-bold">
              <input type="checkbox" checked={committed} onChange={(e) => setCommitted(e.target.checked)} className="h-6 w-6 accent-[#1d7f84]" />
              {t('lesson.commit')}
            </label>
            <div className="mt-auto pt-6">
              <button disabled={!committed} onClick={finish} className="w-full rounded-2xl bg-sun py-4 font-display text-lg font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_#b85c0a] disabled:bg-ink/15 disabled:text-ink/40 disabled:shadow-none">{t('lesson.finish')}</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="relative mt-2 flex flex-1 flex-col items-center justify-center text-center">
            {[12, 28, 46, 64, 80].map((l, i) => (
              <Droplet key={l} size={18 + (i % 3) * 5} className="absolute top-8 text-aqua" fill="currentColor" style={{ left: `${l}%`, animation: `drip ${1.6 + i * 0.25}s ease-in ${i * 0.15}s infinite` }} />
            ))}
            <Mascot mood="cheer" size={130} className="anim-pop" />
            <h2 className="mt-3 font-display text-3xl font-extrabold">{earned?.xp ? t('lesson.done') : t('lesson.again')}</h2>
            {earned?.xp > 0 && (
              <div className="mt-4 flex gap-3">
                <span className="anim-pop inline-flex items-center gap-1.5 rounded-2xl bg-gold/30 px-4 py-2 font-display text-xl font-extrabold"><Star className="text-gold" fill="currentColor" size={22} />+{earned.xp} XP</span>
                <span className="anim-pop inline-flex items-center gap-1.5 rounded-2xl bg-sky px-4 py-2 font-display text-xl font-extrabold"><Droplet className="text-deep" fill="currentColor" size={22} />+{earned.gotas}</span>
              </div>
            )}
            <p className="mt-3 max-w-[16rem] text-sm font-semibold text-ink/70">{earned?.xp ? t('lesson.earned') : t('lesson.noreward')}</p>
            <button onClick={() => nav('/app')} className="mt-8 w-full rounded-2xl bg-sun py-4 font-display text-lg font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_#b85c0a]"><Check className="mr-1 inline" size={22} />{t('common.continue')}</button>
          </div>
        )}
      </div>
    </div>
  )
}
