export function Card({ title, action, children, className = '' }) {
  return (
    <section className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <h2 className="font-display text-lg font-extrabold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Kpi({ label, value, unit, hint, tone = 'default', icon: Icon }) {
  const tones = { default: 'text-ink', good: 'text-leaf-600', bad: 'text-alert', warn: 'text-sun-600' }
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
      <div className="flex items-start justify-between">
        <p className="text-xs font-extrabold uppercase tracking-wide text-ink/55">{label}</p>
        {Icon && <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky/60 text-deep"><Icon size={19} /></span>}
      </div>
      <p className={`mt-1 font-display text-3xl font-extrabold leading-tight ${tones[tone]}`}>
        {value}
        {unit && <span className="ml-1 text-base font-bold text-ink/50">{unit}</span>}
      </p>
      {hint && <p className="mt-0.5 text-xs font-semibold text-ink/55">{hint}</p>}
    </div>
  )
}

export function PageTitle({ title, subtitle, children }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-extrabold md:text-3xl">{title}</h1>
        {subtitle && <p className="text-sm font-semibold text-ink/60">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export function ChartTooltip({ active, payload, label, unit = 'L' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-ink px-3 py-2 text-xs font-bold text-white shadow-lg">
      {label && <p className="mb-1 text-white/70">{label}</p>}
      {payload.filter((p) => p.value > 0).map((p) => (
        <p key={p.dataKey} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
          {p.name ?? p.dataKey}: {Math.round(p.value * 10) / 10} {unit}
        </p>
      ))}
    </div>
  )
}
