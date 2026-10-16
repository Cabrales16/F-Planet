import { useState } from 'react'
import { NavLink, Outlet, Route, Routes, useLocation, Link } from 'react-router-dom'
import {
  Home as HomeIcon, Lightbulb, ChartColumn, Trophy, ShoppingCart, Menu, X, Bell, Globe, Newspaper, Gauge, Settings, Monitor, RotateCcw, Droplet, Flame,
} from 'lucide-react'
import { Avatar, Wordmark } from '../components/ui'
import { actions, useStore } from '../lib/store'
import { useStats, useT } from '../lib/hooks'
import { buildAlerts } from '../lib/alerts'
import Onboarding from './Onboarding'
import Home from './Home'
import Lesson from './Lesson'
import Tips from './Tips'
import Ranking from './Ranking'
import Prizes from './Prizes'
import Shop from './Shop'
import News from './News'
import Consumo from './Consumo'
import SettingsPage from './SettingsPage'

function PhoneShell({ children }) {
  return (
    <div className="min-h-dvh sm:flex sm:items-center sm:justify-center sm:bg-brand sm:p-6">
      <div className="relative mx-auto flex h-dvh w-full flex-col overflow-hidden bg-white sm:h-[820px] sm:max-h-[calc(100dvh-3rem)] sm:w-[390px] sm:rounded-[44px] sm:border-[10px] sm:border-ink sm:shadow-2xl">
        {children}
      </div>
    </div>
  )
}

const TITLES = {
  '': 'nav.home',
  tips: 'nav.tips',
  ranking: 'nav.ranking',
  premios: 'nav.prizes',
  tienda: 'nav.shop',
  novedades: 'nav.news',
  consumo: 'nav.stats',
  ajustes: 'nav.settings',
}

function Shell() {
  const t = useT()
  const loc = useLocation()
  const [open, setOpen] = useState(false)
  const user = useStore((s) => s.user)
  const progress = useStore((s) => s.progress)
  const settings = useStore((s) => s.settings)
  const ackd = useStore((s) => s.alertsAck)
  const stats = useStats()
  const pending = buildAlerts(stats, settings).filter((a) => a.sev !== 'good' && !ackd.includes(a.id)).length
  const seg = loc.pathname.replace(/^\/app\/?/, '').split('/')[0]
  const titleKey = TITLES[seg] ?? 'nav.home'

  const nav = [
    { to: '/app', end: true, icon: HomeIcon, label: t('nav.home') },
    { to: '/app/tips', icon: Lightbulb, label: t('nav.tips') },
    { to: '/app/ranking', icon: ChartColumn, label: t('nav.ranking.short') },
    { to: '/app/premios', icon: Trophy, label: t('nav.prizes.short') },
    { to: '/app/tienda', icon: ShoppingCart, label: t('nav.shop') },
  ]
  const drawer = [
    { to: '/app', end: true, icon: HomeIcon, label: t('nav.home') },
    { to: '/app/tips', icon: Lightbulb, label: t('nav.tips') },
    { to: '/app/tienda', icon: ShoppingCart, label: t('nav.shop') },
    { to: '/app/premios', icon: Trophy, label: t('nav.prizes') },
    { to: '/app/novedades', icon: Newspaper, label: t('nav.news'), badge: pending },
    { to: '/app/consumo', icon: Gauge, label: t('nav.stats') },
    { to: '/app/ajustes', icon: Settings, label: t('nav.settings') },
  ]

  return (
    <>
      <header className="relative z-10 flex h-14 shrink-0 items-center gap-2 border-b border-ink/10 bg-white px-3">
        <button onClick={() => setOpen(true)} aria-label={t('nav.menu')} className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-mist">
          <Menu size={24} />
        </button>
        <h1 className="flex-1 truncate font-display text-xl font-extrabold">{seg === '' ? <Wordmark size="sm" /> : t(titleKey)}</h1>
        <button
          onClick={() => actions.setSettings({ lang: settings.lang === 'es' ? 'en' : 'es' })}
          aria-label={t('settings.language')}
          className="inline-flex h-9 items-center gap-1 rounded-full border border-ink/15 px-2.5 text-xs font-extrabold text-deep hover:bg-mist"
        >
          <Globe size={14} /> {settings.lang.toUpperCase()}
        </button>
        <Link to="/app/novedades" aria-label={t('nav.news')} className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/15 hover:bg-mist">
          <Bell size={19} />
          {pending > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-[11px] font-extrabold text-white">{pending}</span>}
        </Link>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto bg-mist">
        <Outlet />
      </main>

      <nav aria-label="Principal" className="grid shrink-0 grid-cols-5 border-t border-ink/10 bg-white pb-[env(safe-area-inset-bottom)]">
        {nav.map(({ to, end, icon: I, label }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold ${isActive ? 'text-sun-600' : 'text-ink/60'}`}>
            <I size={23} strokeWidth={2.2} />
            {label}
          </NavLink>
        ))}
      </nav>

      {open && (
        <div className="absolute inset-0 z-30 flex" role="dialog" aria-modal="true" aria-label={t('nav.menu')}>
          <div className="flex w-[78%] max-w-[300px] flex-col bg-white shadow-2xl">
            <div className="flex items-center gap-3 bg-brand p-4">
              <Avatar name={user.name} variant={user.avatar} size={48} ring />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-lg font-extrabold leading-tight">{user.name}</p>
                <p className="flex items-center gap-2 text-xs font-bold text-ink/70">
                  <span className="inline-flex items-center gap-0.5"><Flame size={13} className="text-sun" />{progress.streak}</span>
                  <span className="inline-flex items-center gap-0.5"><Droplet size={13} className="text-deep" />{progress.gotas}</span>
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t('common.close')} className="grid h-9 w-9 place-items-center rounded-full bg-white/60"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {drawer.map(({ to, end, icon: I, label, badge }) => (
                <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-4 px-5 py-3.5 font-display text-lg font-bold ${isActive ? 'bg-mist text-deep' : ''}`}>
                  <I size={24} />
                  <span className="flex-1">{label}</span>
                  {badge > 0 && <span className="rounded-full bg-sun px-2 text-xs font-extrabold text-white">{badge}</span>}
                </NavLink>
              ))}
              <button
                onClick={() => actions.setSettings({ lang: settings.lang === 'es' ? 'en' : 'es' })}
                className="flex w-full items-center gap-4 px-5 py-3.5 text-left font-display text-lg font-bold"
              >
                <Globe size={24} />
                <span className="flex-1">{t('nav.language')}</span>
                <span className="rounded-full bg-mist px-2 text-xs font-extrabold text-deep">{settings.lang === 'es' ? 'Español' : 'English'}</span>
              </button>
            </div>
            <div className="space-y-1 border-t border-ink/10 p-3 text-sm font-bold">
              <Link to="/panel" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-deep hover:bg-mist"><Monitor size={20} /> {t('nav.panel')}</Link>
              <button onClick={() => { actions.reset(); setOpen(false) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-ink/70 hover:bg-mist"><RotateCcw size={20} /> {t('demo.reset')}</button>
            </div>
          </div>
          <button className="flex-1 bg-black/45" aria-label={t('common.close')} onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  )
}

export default function MobileApp() {
  const onboarded = useStore((s) => s.user.onboarded)
  if (!onboarded) {
    return (
      <PhoneShell>
        <Onboarding />
      </PhoneShell>
    )
  }
  return (
    <PhoneShell>
      <Routes>
        <Route path="mision/:id" element={<Lesson />} />
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="tips" element={<Tips />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="premios" element={<Prizes />} />
          <Route path="tienda" element={<Shop />} />
          <Route path="novedades" element={<News />} />
          <Route path="consumo" element={<Consumo />} />
          <Route path="ajustes" element={<SettingsPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </PhoneShell>
  )
}
