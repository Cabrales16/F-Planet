import { FIXTURES } from './sim'
import { getCuts, MY_SECTOR } from './content'

// Construye las alertas del hogar a partir de las estadísticas y los ajustes.
// sev: high | med | low | good
export function buildAlerts(stats, settings) {
  const now = new Date()
  const out = []
  const fx = (id) => FIXTURES.find((f) => f.id === id)

  if (stats.leak && settings.alertaFuga) {
    const f = fx(stats.leak.fixture)
    out.push({
      id: 'leak',
      sev: 'high',
      fixture: f.id,
      when: new Date(now.getTime() - 2 * 3600000),
      es: {
        t: `Posible fuga en ${f.es.toLowerCase()}`,
        d: `Flujo continuo de ~${stats.leak.lph.toFixed(1)} L/h entre la 1 y las 4 a. m. durante las últimas 3 noches (≈ ${Math.round(stats.leak.lpd)} L/día). Revisa la válvula y la empaquetadura.`,
      },
      en: {
        t: `Possible leak in ${f.en.toLowerCase()}`,
        d: `Continuous flow of ~${stats.leak.lph.toFixed(1)} L/h between 1 and 4 a.m. over the last 3 nights (≈ ${Math.round(stats.leak.lpd)} L/day). Check the valve and seals.`,
      },
    })
  }

  if (settings.alertaExceso && stats.ayer > settings.metaDiaL) {
    const pct = Math.round((stats.ayer / settings.metaDiaL - 1) * 100)
    out.push({
      id: 'excess',
      sev: 'med',
      when: new Date(now.getTime() - 20 * 3600000),
      es: { t: 'Ayer superaste tu meta', d: `Consumiste ${Math.round(stats.ayer)} L, un ${pct} % por encima de tu meta de ${settings.metaDiaL} L.` },
      en: { t: 'You went over your goal yesterday', d: `You used ${Math.round(stats.ayer)} L, ${pct}% above your ${settings.metaDiaL} L goal.` },
    })
  }

  const minutes = 21
  if (settings.alertaExceso && minutes > settings.umbralDuchaMin) {
    out.push({
      id: 'shower',
      sev: 'med',
      fixture: 'ducha',
      when: new Date(now.getTime() - 26 * 3600000),
      es: { t: 'Ducha abierta por mucho tiempo', d: `La ducha estuvo abierta ${minutes} min seguidos (umbral: ${settings.umbralDuchaMin} min), unos ${minutes * 9} L.` },
      en: { t: 'Shower left running', d: `The shower ran ${minutes} min in a row (threshold: ${settings.umbralDuchaMin} min), about ${minutes * 9} L.` },
    })
  }

  if (settings.avisoCortes) {
    const mine = getCuts(now).find((c) => c.mine)
    const days = Math.ceil((mine.start - now) / 86400000)
    if (days <= 3) {
      out.push({
        id: 'cut',
        sev: 'low',
        when: new Date(now.getTime() - 5 * 3600000),
        es: { t: `Corte programado en tu sector (${MY_SECTOR})`, d: `Comienza en ${days} ${days === 1 ? 'día' : 'días'} a las 8:00 a. m. y dura unas 24 horas. Almacena agua en recipientes tapados.` },
        en: { t: `Scheduled cut in your sector (${MY_SECTOR})`, d: `Starts in ${days} ${days === 1 ? 'day' : 'days'} at 8:00 a.m. and lasts about 24 hours. Store water in covered containers.` },
      })
    }
  }

  if (stats.diasBajoMeta >= 3) {
    out.push({
      id: 'streak',
      sev: 'good',
      when: new Date(now.getTime() - 30 * 3600000),
      es: { t: `${stats.diasBajoMeta} días bajo la meta`, d: 'Tu hogar lleva varios días seguidos por debajo del consumo objetivo. ¡Sigue así!' },
      en: { t: `${stats.diasBajoMeta} days under the goal`, d: 'Your home has stayed under the target for several days in a row. Keep it up!' },
    })
  }

  return out
}
