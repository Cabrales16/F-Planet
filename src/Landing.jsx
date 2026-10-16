import { Link } from 'react-router-dom'
import { Activity, BellRing, Globe, Gamepad2, Gift, Gauge, Monitor, Radio, Smartphone, Users, Wallet, CalendarClock } from 'lucide-react'
import { BASE, Wordmark } from './components/ui'
import { actions, useStore } from './lib/store'
import { useT } from './lib/hooks'

const REPO = 'https://github.com/Cabrales16/F-Planet'

const FEATURES = [
  { icon: Radio, k: 'sensors' },
  { icon: Activity, k: 'live' },
  { icon: BellRing, k: 'leaks' },
  { icon: Wallet, k: 'cost' },
  { icon: CalendarClock, k: 'cuts' },
  { icon: Users, k: 'block' },
]

export default function Landing() {
  const t = useT()
  const lang = useStore((s) => s.settings.lang)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Wordmark />
          <nav className="flex items-center gap-2 text-sm font-extrabold">
            <a href="#como" className="hidden rounded-full px-3 py-2 hover:bg-white/50 sm:block">{t('land.nav.how')}</a>
            <a href="#experiencias" className="hidden rounded-full px-3 py-2 hover:bg-white/50 sm:block">{t('land.nav.exp')}</a>
            <button onClick={() => actions.setSettings({ lang: lang === 'es' ? 'en' : 'es' })} className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-2 text-deep" aria-label={t('settings.language')}><Globe size={14} /> {lang.toUpperCase()}</button>
          </nav>
        </div>
      </header>

      <section className="bg-brand pb-16 pt-24 md:pb-20 md:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-deep">{t('land.badge')}</span>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-ink md:text-6xl">{t('land.h1a')} <span className="text-deep">{t('land.h1b')}</span></h1>
            <p className="mt-5 max-w-xl text-lg font-semibold text-ink/75">{t('land.sub')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-2xl bg-sun px-6 py-3.5 font-display text-lg font-extrabold text-white shadow-lg shadow-sun/30 hover:bg-sun-600"><Smartphone size={22} /> {t('land.cta.app')}</Link>
              <Link to="/panel" className="inline-flex items-center gap-2 rounded-2xl bg-ink px-6 py-3.5 font-display text-lg font-extrabold text-white hover:bg-deep-700"><Monitor size={22} /> {t('land.cta.panel')}</Link>
            </div>
            <p className="mt-4 text-sm font-bold text-ink/60">{t('demo.note')}</p>
          </div>

          <div className="mx-auto w-full max-w-[330px]">
            <div className="rounded-[42px] border-[9px] border-ink bg-ink shadow-2xl shadow-ink/30">
              <iframe title="F-Planet app" src={`${BASE}#/app`} loading="lazy" className="block h-[620px] w-full rounded-[32px] bg-white" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="mx-auto max-w-3xl text-center font-display text-2xl font-bold leading-snug text-ink md:text-3xl">{t('land.problem')}</p>
      </section>

      <section id="como" className="bg-mist py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center font-display text-3xl font-extrabold md:text-4xl">{t('land.how.title')}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: Radio, n: 1 },
              { icon: Gamepad2, n: 2 },
              { icon: Gauge, n: 3 },
            ].map(({ icon: I, n }) => (
              <div key={n} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky/70 text-deep"><I size={28} /></span>
                <p className="mt-4 font-display text-sm font-extrabold uppercase tracking-wide text-sun-600">{t('land.step', { n: String(n) })}</p>
                <h3 className="font-display text-xl font-extrabold">{t(`land.how${n}.t`)}</h3>
                <p className="mt-1 font-semibold text-ink/70">{t(`land.how${n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencias" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-3xl font-extrabold md:text-4xl">{t('land.exp.title')}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-brand p-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-extrabold uppercase text-deep"><Smartphone size={14} /> {t('land.exp.mobile')}</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold">{t('land.exp.mobile.t')}</h3>
            <ul className="mt-3 space-y-2 font-bold">
              {['land.m1', 'land.m2', 'land.m3', 'land.m4'].map((k) => <li key={k} className="flex gap-2"><Gift size={18} className="mt-0.5 shrink-0 text-deep" />{t(k)}</li>)}
            </ul>
            <Link to="/app" className="mt-5 inline-flex rounded-xl bg-sun px-5 py-2.5 font-display font-extrabold text-white hover:bg-sun-600">{t('land.cta.app')}</Link>
          </div>
          <div className="rounded-3xl bg-ink p-7 text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase text-sky"><Monitor size={14} /> {t('land.exp.web')}</span>
            <h3 className="mt-3 font-display text-2xl font-extrabold">{t('land.exp.web.t')}</h3>
            <ul className="mt-3 space-y-2 font-bold">
              {['land.w1', 'land.w2', 'land.w3', 'land.w4'].map((k) => <li key={k} className="flex gap-2"><Activity size={18} className="mt-0.5 shrink-0 text-leaf" />{t(k)}</li>)}
            </ul>
            <Link to="/panel" className="mt-5 inline-flex rounded-xl bg-white px-5 py-2.5 font-display font-extrabold text-ink hover:bg-sky">{t('land.cta.panel')}</Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: I, k }) => (
            <div key={k} className="flex gap-3 rounded-2xl bg-mist p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-deep shadow-sm"><I size={22} /></span>
              <div><p className="font-display font-extrabold">{t(`land.f.${k}`)}</p><p className="text-sm font-semibold text-ink/65">{t(`land.f.${k}.d`)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-ink py-10 text-center text-sm font-semibold text-white/70">
        <div className="mx-auto max-w-3xl px-5">
          <Wordmark light />
          <p className="mt-3">{t('land.footer.team')}</p>
          <p className="mt-1">{t('demo.footer')}</p>
          <a href={REPO} className="mt-3 inline-block font-extrabold text-sky underline" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
