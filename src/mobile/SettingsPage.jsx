import { RotateCcw } from 'lucide-react'
import A11yControls from '../components/A11yControls'
import { actions } from '../lib/store'
import { useT } from '../lib/hooks'

export default function SettingsPage() {
  const t = useT()
  return (
    <div className="px-4 pb-8 pt-4">
      <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-ink/5">
        <A11yControls />
      </div>
      <button onClick={() => actions.reset()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink/15 py-3 font-display font-extrabold text-ink/70 hover:bg-white">
        <RotateCcw size={18} /> {t('demo.reset')}
      </button>
      <p className="mt-3 text-center text-xs font-semibold text-ink/50">{t('demo.resetHint')}</p>
    </div>
  )
}
