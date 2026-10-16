import { lazy, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './Landing'

const MobileApp = lazy(() => import('./mobile/MobileApp'))
const PanelApp = lazy(() => import('./panel/PanelApp'))

// HashRouter: la demo vive en GitHub Pages (sin servidor) y no necesita redirecciones.
export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div className="grid min-h-dvh place-items-center bg-brand font-display text-xl font-extrabold text-ink">F-Planet…</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app/*" element={<MobileApp />} />
          <Route path="/panel/*" element={<PanelApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
