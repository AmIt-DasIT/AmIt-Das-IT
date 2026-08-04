import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '../../hooks'

/* ------------------------------------------------------------------ *
 *  Reveal — the single scroll-entrance primitive used site-wide.
 * ------------------------------------------------------------------ */
interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'p' | 'span'
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = '',
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]
  const reduced = useReducedMotion()

  return (
    <MotionTag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ *
 *  SplitText — per-word masked rise. The one signature type effect.
 * ------------------------------------------------------------------ */
interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  as = 'span',
}: SplitTextProps) {
  const MotionTag = motion[as]
  const Tag = as as ElementType
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) return <Tag className={className}>{text}</Tag>

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10%' }}
      variants={{
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] align-bottom"
        >
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { y: '105%' },
              show: {
                y: '0%',
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}

/* ------------------------------------------------------------------ *
 *  CountUp — animates once when scrolled into view.
 * ------------------------------------------------------------------ */
interface CountUpProps {
  value: number
  decimals?: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function CountUp({
  value,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 1400,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast arrival, long settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className="numeric">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 *  Marquee — seamless loop; duplicated track, translated 50%.
 * ------------------------------------------------------------------ */
const FADE = 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)'

export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div
      className="group/marquee relative flex overflow-hidden"
      // Both spellings: Safari still wants the prefixed property.
      style={{ WebkitMaskImage: FADE, maskImage: FADE }}
    >
      <div className="flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover/marquee:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-3 font-mono text-xs whitespace-nowrap text-muted"
          >
            {item}
            <span className="text-line-strong">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 *  Layout
 * ------------------------------------------------------------------ */
export function Section({
  id,
  children,
  className = '',
  divider = true,
}: {
  id: string
  children: ReactNode
  className?: string
  /** Full-bleed rule at the top. Off where a neighbour already draws one. */
  divider?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 py-20 md:py-28 ${
        divider ? 'border-t border-line' : ''
      } ${className}`}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string
  label: string
  title: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <Reveal className="mb-4 flex items-center gap-3" y={10}>
        <span className="mono-label text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="mono-label">{label}</span>
      </Reveal>

      <SplitText as="h2" text={title} className="block text-title text-heading" />

      {description && (
        <Reveal delay={0.1} className="mt-5 text-base leading-relaxed text-body md:text-lg">
          {description}
        </Reveal>
      )}
    </div>
  )
}

/** Bordered surface. One card style, used everywhere, no glow. */
export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`hairline rounded-xl border border-line bg-surface ${className}`}>
      {children}
    </div>
  )
}

/** Small monospace chip for stack/tech tokens. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}
