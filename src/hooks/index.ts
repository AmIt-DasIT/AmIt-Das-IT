import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ *
 *  Environment
 * ------------------------------------------------------------------ */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

/* ------------------------------------------------------------------ *
 *  Theme
 * ------------------------------------------------------------------ */

export type Theme = 'light' | 'dark'

const THEME_KEY = 'portfolio-theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  })

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0A0A0B' : '#FBFBFA')
  }, [theme])

  const toggle = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return { theme, setTheme, toggle }
}

/* ------------------------------------------------------------------ *
 *  Utility
 * ------------------------------------------------------------------ */

/** Live clock string for an IANA timezone. */
export function useClock(timeZone: string): string {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now)
}

/** Copy-to-clipboard with a self-resetting "copied" flag. */
export function useCopy(resetAfter = 1800) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        // Clipboard API needs a secure context; fall back to the old trick.
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), resetAfter)
    },
    [resetAfter],
  )

  return { copied, copy }
}

/** Tracks which section is in view, for nav highlighting. */
export function useSectionSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (!sections.length) return

    // Entries only carry sections whose state *changed*, so keep a running
    // tally of what is on screen rather than reading each batch in isolation.
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ratios.set(entry.target.id, entry.intersectionRatio)
          } else {
            ratios.delete(entry.target.id)
          }
        }
        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0]
        setActive(best ? best[0] : null)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}

/**
 * requestAnimationFrame loop with a stable callback and automatic teardown.
 * `active` gates the loop so games can pause without unmounting.
 */
export function useAnimationFrame(
  callback: (deltaMs: number, elapsedMs: number) => void,
  active = true,
): void {
  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    if (!active) return
    let raf = 0
    let last = performance.now()
    const start = last

    const loop = (now: number) => {
      // Clamp: a backgrounded tab returns a huge delta on resume.
      const delta = Math.min(now - last, 100)
      last = now
      cbRef.current(delta, now - start)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active])
}

/** Number persisted to localStorage — used for game high scores. */
export function usePersistentNumber(
  key: string,
  initial = 0,
): [number, (value: number) => void] {
  const [value, setValue] = useState<number>(() => {
    if (typeof window === 'undefined') return initial
    const raw = localStorage.getItem(key)
    const parsed = raw === null ? NaN : Number(raw)
    return Number.isFinite(parsed) ? parsed : initial
  })

  const set = useCallback(
    (next: number) => {
      setValue(next)
      try {
        localStorage.setItem(key, String(next))
      } catch {
        // Private browsing can reject writes; the in-memory value still works.
      }
    },
    [key],
  )

  return [value, set]
}
