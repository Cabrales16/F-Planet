import { useMemo } from 'react'
import { BLOCKS, NEIGHBORS } from './content'
import { useStore } from './store'

export const MY_BLOCK = 4

// Clasificación de vecinos (incluye al usuario) y de cuadras.
export function useCommunity() {
  const user = useStore((s) => s.user)
  const progress = useStore((s) => s.progress)
  return useMemo(() => {
    const people = [...NEIGHBORS, { name: user.name, xp: progress.xp, avatar: user.avatar, me: true }].sort((a, b) => b.xp - a.xp)
    const extra = Math.max(0, progress.completed.length - 3) * 0.2
    const blocks = BLOCKS.map((b) => ({ ...b, ahorro: b.id === MY_BLOCK ? b.ahorro + extra : b.ahorro, me: b.id === MY_BLOCK }))
      .sort((a, b) => b.ahorro - a.ahorro)
      .map((b, i) => ({ ...b, rank: i + 1 }))
    return {
      people,
      myRank: people.findIndex((p) => p.me) + 1,
      blocks,
      myBlock: blocks.find((b) => b.me),
    }
  }, [user, progress])
}
