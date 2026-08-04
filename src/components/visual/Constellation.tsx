import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/**
 * Canvas particle field. Nodes drift and link to nearby neighbours; the pointer
 * carries a soft repulsion field and brightens links inside its radius.
 *
 * Strictly greyscale — it reads as structure, not decoration. Colours are
 * sampled from the CSS custom properties so it follows the theme.
 *
 * Deliberately cheap: O(n²) proximity over a small node count, DPR capped at 2,
 * and the loop is skipped entirely when off-screen or reduced-motion is set.
 */
export default function Constellation({ density = 0.00007 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    let running = true
    const pointer = { x: -9999, y: -9999, active: false }

    const readPalette = () => {
      const s = getComputedStyle(document.documentElement)
      return {
        line: s.getPropertyValue('--line-strong').trim() || '#35353b',
        dot: s.getPropertyValue('--muted').trim() || '#6d6d76',
        hot: s.getPropertyValue('--heading').trim() || '#fafafa',
      }
    }
    let palette = readPalette()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(
        Math.min(Math.max(width * height * density, 26), 90),
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.2 + 0.6,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const maxLink = width < 640 ? 88 : 124
      const influence = 140

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        // Wrap rather than bounce — avoids visible edge clustering.
        if (n.x < -10) n.x = width + 10
        if (n.x > width + 10) n.x = -10
        if (n.y < -10) n.y = height + 10
        if (n.y > height + 10) n.y = -10

        if (pointer.active) {
          const dx = n.x - pointer.x
          const dy = n.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < influence && dist > 0.01) {
            const push = ((influence - dist) / influence) * 0.7
            n.x += (dx / dist) * push
            n.y += (dy / dist) * push
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > maxLink) continue

          const near =
            pointer.active &&
            Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) <
              influence

          ctx.globalAlpha = (1 - dist / maxLink) * (near ? 0.5 : 0.18)
          ctx.strokeStyle = near ? palette.hot : palette.line
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const near =
          pointer.active && Math.hypot(n.x - pointer.x, n.y - pointer.y) < influence
        ctx.globalAlpha = near ? 0.75 : 0.35
        ctx.fillStyle = near ? palette.hot : palette.dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * (near ? 1.5 : 1), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      if (running) raf = requestAnimationFrame(draw)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    // Pause when scrolled away — no point burning frames off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running && !raf) raf = requestAnimationFrame(draw)
        if (!running) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      palette = readPalette()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [density, reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
