"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const STORAGE_KEY = "chey-florist-cart-v1"

export type CartLine = {
  slug: string
  qty: number
}

type CartContextValue = {
  lines: CartLine[]
  add: (slug: string, qty?: number) => void
  setQty: (slug: string, qty: number) => void
  remove: (slug: string) => void
  clear: () => void
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

function normalizeQty(qty: number, min = 1): number {
  if (!Number.isFinite(qty)) return min
  return Math.max(min, Math.min(99, Math.trunc(qty)))
}

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((line) => ({
        slug: typeof line?.slug === "string" ? line.slug : "",
        qty: normalizeQty(Number(line?.qty)),
      }))
      .filter((line) => line.slug)
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])

  useEffect(() => {
    setLines(readStorage())
  }, [])

  const persist = useCallback((next: CartLine[]) => {
    setLines(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  const add = useCallback(
    (slug: string, qty = 1) => {
      const safeQty = normalizeQty(qty)
      const idx = lines.findIndex((l) => l.slug === slug)
      if (idx === -1) {
        persist([...lines, { slug, qty: safeQty }])
        return
      }
      const next = [...lines]
      next[idx] = { slug, qty: next[idx].qty + safeQty }
      persist(next)
    },
    [lines, persist],
  )

  const setQty = useCallback(
    (slug: string, qty: number) => {
      const safe = normalizeQty(qty, 0)
      if (safe === 0) {
        persist(lines.filter((l) => l.slug !== slug))
        return
      }
      const idx = lines.findIndex((l) => l.slug === slug)
      if (idx === -1) {
        persist([...lines, { slug, qty: safe }])
        return
      }
      const next = [...lines]
      next[idx] = { slug, qty: safe }
      persist(next)
    },
    [lines, persist],
  )

  const remove = useCallback(
    (slug: string) => {
      persist(lines.filter((l) => l.slug !== slug))
    },
    [lines, persist],
  )

  const clear = useCallback(() => persist([]), [persist])

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  )

  const value = useMemo(
    () => ({ lines, add, setQty, remove, clear, count }),
    [lines, add, setQty, remove, clear, count],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
