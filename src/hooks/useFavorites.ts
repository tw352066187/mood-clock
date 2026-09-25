import { useCallback, useEffect, useState } from 'react'
import { QUOTES, type Quote } from '../data/quotes'

const KEY = 'mood-clock:favorites'

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x): x is string => typeof x === 'string')
  } catch {
    return []
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(() => readIds())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids))
  }, [ids])

  const favorites: Quote[] = ids
    .map((id) => QUOTES.find((q) => q.id === id))
    .filter((q): q is Quote => Boolean(q))

  const isFav = useCallback((id: string) => ids.includes(id), [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  return { favorites, isFav, toggle, remove }
}
