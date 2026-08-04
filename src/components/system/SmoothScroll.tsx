import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '../../hooks'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Installs Lenis inertial scrolling and exposes it on `window.__lenis` so nav
 * links and modals can drive or freeze the scroll position.
 * Disabled entirely under prefers-reduced-motion.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    window.__lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [reduced])

  return null
}

/** Scrolls to a hash target through Lenis when available. */
export function scrollToSection(hash: string): void {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Freeze/unfreeze background scroll while an overlay is open. */
export function setScrollLocked(locked: boolean): void {
  if (locked) window.__lenis?.stop()
  else window.__lenis?.start()
}
