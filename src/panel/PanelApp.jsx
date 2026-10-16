import { NavLink, Route, Routes, Link, Outlet } from 'react-router-dom'
import { LayoutDashboard, Activity, History, TriangleAlert, Users, CalendarClock, Cpu, Cog, Smartphone, Globe } from 'lucide-react'
import { Wordmark } from '../components/ui'
import { actions, useStore } from '../lib/store'
import { useDateFmt, useStats, useT } from '../lib/hooks'
import { buildAlerts } from '../lib/alerts'
import Overview from './Overview'
import LiveView from './LiveView'
import HistoryView from './HistoryView'
import AlertsView from './AlertsView'
import CommunityView from './CommunityView'
import CutsView from './CutsView'
import DevicesView from './DevicesView'
import SettingsView from './SettingsView'

function Layout() {
  const t = useT()
  const fmt = useDateFmt()
  const settings = useStore((s) => s.settings)
  const user = useStore((s) => s.user)
  const ackd = useStore((s) => s.alertsAck)
  const stats = useStats()
  const pending = buildAlerts(stats, settings).filter((a) => a.sev !== 'good' && !ackd.includes(a.id)).length

  const items = [
    { to: '/panel', end: true, icon: LayoutDashboard, label: t('panel.overview') },
    { to: '/panel/vivo', icon: Activity, label: t('panel.live') },
    { to: '/panel/historial', icon: History, label: t('panel.history') },
    { to: '/panel/alertas', icon: TriangleAlert, label: t('panel.alerts'), badge: pending },
    { to: '/panel/comunidad', icon: Users, label: t('panel.community') },
    { to: '/panel/cortes', icon: CalendarClock, label: t('panel.cuts') },
    { to: '/panel/dispositivos', icon: Cpu, label: t('panel.devices') },
    { to: '/panel/ajustes', icon: Cog, label: t('panel.settings') },
  ]

  return (
    <div className="flex min-h-dvh bg-mist">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-ink/10 bg-white md:flex">
        <div className="px-5 py-5"><Link to="/"><Wordmark size="md" /></Link></div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Panel">
          {items.map(({ to, end, icon: I, label, badge }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-[15px] font-bold transition ${isActive ? 'bg-deep text-white shadow' : 'text-ink/75 hover:bg-mist'}`}>
              <I size={20} />
              <span className="flex-1">{label}</span>
              {badge > 0 && <span className="rounded-full bg-sun px-2 text-xs font-extrabold text-white">{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="m-3 rounded-2xl bg-brand p-4 text-sm">
          <p className="font-display font-extrabold">{t('panel.mobileCta')}</p>
          <Link to="/app" className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-extrabold text-deep shadow-sm"><Smartphone size={14} /> {t('panel.openApp')}</Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-ink/10 bg-white/90 px-4 py-3 backdrop-blur md:px-8">
          <div className="md:hidden"><Link to="/"><Wordmark size="sm" /></Link></div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-extrabold leading-tight">{t('panel.home', { name: user.name })}</p>
            <p className="text-xs font-bold first-letter:uppercase text-ink/55">{fmt.long(new Date())} · {t('panel.sector', { s: '4' })}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-alert/10 px-3 py-1 text-xs font-extrabold text-alert"><span className="h-2 w-2 animate-pulse rounded-full bg-alert" /> {t('panel.liveTag')}</span>
          <button onClick={() => actions.setSettings({ lang: settings.lang === 'es' ? 'en' : 'es' })} className="inline-flex h-9 items-center gap-1 rounded-full border border-ink/15 px-3 text-xs font-extrabold text-deep hover:bg-mist" aria-label={t('settings.language')}>
            <Globe size={14} /> {settings.lang.toUpperCase()}
          </button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-ink/10 bg-white px-3 py-2 md:hidden" aria-label="Panel">
          {items.map(({ to, end, icon: I, label }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold ${isActive ? 'bg-deep text-white' : 'text-ink/70'}`}>
              <I size={16} /> {label}
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 px-4 py-6 md:px-8">
          <Outlet />
        </main>
        <footer className="px-8 pb-6 text-center text-xs font-semibold text-ink/45">{t('demo.footer')}</footer>
      </div>
    </div>
  )
}

export default function PanelApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="vivo" element={<LiveView />} />
        <Route path="historial" element={<HistoryView />} />
        <Route path="alertas" element={<AlertsView />} />
        <Route path="comunidad" element={<CommunityView />} />
        <Route path="cortes" element={<CutsView />} />
        <Route path="dispositivos" element={<DevicesView />} />
        <Route path="ajustes" element={<SettingsView />} />
        <Route path="*" element={<Overview />} />
      </Route>
    </Routes>
  )
}
