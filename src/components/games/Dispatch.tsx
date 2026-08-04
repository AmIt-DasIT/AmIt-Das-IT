import { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimationFrame, usePersistentNumber, useReducedMotion } from '../../hooks'
import GameShell, { type GameStatus } from './GameShell'

/* ------------------------------------------------------------------ *
 *  DISPATCH
 *  Route a collection truck across 12 wards before any bin overflows.
 *  Mirrors the Vehicle Tracking System: 12 wards, live vehicle position,
 *  and a miss that has to be caught before it becomes a complaint.
 * ------------------------------------------------------------------ */

const COLS = 4
const ROWS = 3
const WARDS = COLS * ROWS

const TRUCK_SPEED = 2.7 // cells per second
const DRAIN_RATE = 1.25 // fill units per second while parked
const BASE_FILL = 0.03 // fill units per second, per ward
// Tuned so a competent run lasts roughly 90s before the fill rate outpaces
// what one truck can drain. Lower it to make the shift longer.
const FILL_RAMP = 0.0008 // added to BASE_FILL for every second elapsed
const MAX_STRIKES = 3
const ARRIVE_EPS = 0.06

const WARD_NAMES = [
  'W-01', 'W-02', 'W-03', 'W-04',
  'W-05', 'W-06', 'W-07', 'W-08',
  'W-09', 'W-10', 'W-11', 'W-12',
]

interface Vec {
  x: number
  y: number
}

/** All fast-changing state lives in a ref; React state is only for paint. */
interface World {
  fill: number[]
  truck: Vec
  target: Vec
  score: number
  strikes: number
  elapsed: number
  collected: number
}

function freshWorld(): World {
  return {
    fill: Array.from({ length: WARDS }, () => Math.random() * 0.25),
    truck: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    score: 0,
    strikes: 0,
    elapsed: 0,
    collected: 0,
  }
}

export default function Dispatch() {
  const world = useRef<World>(freshWorld())
  const [status, setStatus] = useState<GameStatus>('idle')
  const [, forceRender] = useState(0)
  const [best, setBest] = usePersistentNumber('dispatch-best', 0)
  const reduced = useReducedMotion()

  const start = useCallback(() => {
    world.current = freshWorld()
    setStatus('running')
  }, [])

  const tick = useCallback(
    (deltaMs: number) => {
      const w = world.current
      const dt = deltaMs / 1000
      w.elapsed += dt

      /* --- Truck: move along one axis at a time, like streets. --- */
      const dx = w.target.x - w.truck.x
      const dy = w.target.y - w.truck.y
      const step = TRUCK_SPEED * dt

      if (Math.abs(dx) > ARRIVE_EPS) {
        w.truck.x += Math.sign(dx) * Math.min(step, Math.abs(dx))
      } else {
        w.truck.x = w.target.x
        if (Math.abs(dy) > ARRIVE_EPS) {
          w.truck.y += Math.sign(dy) * Math.min(step, Math.abs(dy))
        } else {
          w.truck.y = w.target.y
        }
      }

      /* --- Bins fill, faster as the shift goes on. --- */
      const rate = BASE_FILL + w.elapsed * FILL_RAMP

      // Only the ward the truck is parked on gets emptied.
      const atX = Math.round(w.truck.x)
      const atY = Math.round(w.truck.y)
      const parked =
        Math.abs(w.truck.x - atX) < 0.2 && Math.abs(w.truck.y - atY) < 0.2
      const parkedIndex = parked ? atY * COLS + atX : -1

      for (let i = 0; i < WARDS; i++) {
        if (i === parkedIndex) {
          const before = w.fill[i]
          w.fill[i] = Math.max(0, before - DRAIN_RATE * dt)
          const drained = before - w.fill[i]
          // Fuller bins are worth more — rewards leaving it late, but only just.
          w.score += drained * (60 + before * 140)
          if (before > 0.05 && w.fill[i] <= 0.05) w.collected += 1
        } else {
          w.fill[i] += rate * dt
          if (w.fill[i] >= 1) {
            w.fill[i] = 0.35 // crew catches up, but it counts against you
            w.strikes += 1
          }
        }
      }

      if (w.strikes >= MAX_STRIKES) {
        const final = Math.round(w.score)
        if (final > best) setBest(final)
        setStatus('over')
      }

      forceRender((n) => n + 1)
    },
    [best, setBest],
  )

  useAnimationFrame(tick, status === 'running')

  /* Keyboard: arrows / WASD nudge the target one ward at a time. */
  useEffect(() => {
    if (status !== 'running') return

    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Vec> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      }
      const delta = map[e.key] ?? map[e.key.toLowerCase()]
      if (!delta) return
      e.preventDefault()

      const t = world.current.target
      t.x = Math.min(COLS - 1, Math.max(0, t.x + delta.x))
      t.y = Math.min(ROWS - 1, Math.max(0, t.y + delta.y))
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status])

  const w = world.current
  const score = Math.round(w.score)

  const overlay =
    status === 'idle'
      ? {
          title: 'Dispatch',
          body: `Twelve wards, one truck. Bins fill on their own — drive over a ward to empty it. ${MAX_STRIKES} overflows and the shift is over.`,
          action: 'Start shift',
        }
      : status === 'over'
        ? {
            title: 'Shift over',
            body: `${score} points · ${w.collected} bins cleared · ${formatTime(w.elapsed)} on the clock.${
              score >= best && score > 0 ? ' New personal best.' : ''
            }`,
            action: 'Run it again',
          }
        : null

  return (
    <GameShell
      status={status}
      onStart={start}
      overlay={overlay}
      hint="Click a ward to route there · arrow keys or WASD also work"
      readouts={[
        { label: 'Score', value: String(score), emphasis: true },
        { label: 'Cleared', value: String(w.collected) },
        { label: 'Overflows', value: `${w.strikes} / ${MAX_STRIKES}` },
        { label: 'Best', value: String(best) },
      ]}
    >
      <div className="p-4 md:p-6">
        <div
          className="relative mx-auto w-full max-w-lg"
          style={{ aspectRatio: `${COLS} / ${ROWS}` }}
        >
          {/* Wards */}
          <div
            className="grid h-full w-full gap-2"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {w.fill.map((level, i) => (
              <Ward
                key={i}
                name={WARD_NAMES[i]}
                level={level}
                disabled={status !== 'running'}
                onSelect={() => {
                  world.current.target = { x: i % COLS, y: Math.floor(i / COLS) }
                }}
              />
            ))}
          </div>

          {/* Truck — positioned in grid space, so it reads as one vehicle
              moving across wards rather than a token snapping between them. */}
          <div
            className="pointer-events-none absolute z-10 flex items-center justify-center"
            style={{
              width: `${100 / COLS}%`,
              height: `${100 / ROWS}%`,
              left: `${(w.truck.x / COLS) * 100}%`,
              top: `${(w.truck.y / ROWS) * 100}%`,
              // rAF already updates this every frame; a transition would lag it.
              transition: reduced ? 'none' : undefined,
            }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent shadow-lg">
              <TruckGlyph />
            </span>
          </div>
        </div>
      </div>
    </GameShell>
  )
}

/* ------------------------------------------------------------------ */

function Ward({
  name,
  level,
  disabled,
  onSelect,
}: {
  name: string
  level: number
  disabled: boolean
  onSelect: () => void
}) {
  const pct = Math.min(100, Math.round(level * 100))
  const critical = level > 0.75

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      aria-label={`${name}, ${pct}% full`}
      className={`relative overflow-hidden rounded-lg border transition-colors ${
        critical ? 'border-accent' : 'border-line'
      } bg-ink disabled:cursor-default`}
    >
      {/* Fill level rises from the bottom. */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 ${
          critical ? 'bg-accent/40' : 'bg-line-strong/70'
        }`}
        style={{ height: `${pct}%` }}
      />
      {/* Corners, not centre — the truck parks in the middle of the tile. */}
      <span className="relative flex h-full flex-col justify-between p-2 text-left">
        <span className="mono-label text-[9px]">{name}</span>
        <span className={`numeric text-xs ${critical ? 'text-accent' : 'text-body'}`}>
          {pct}%
        </span>
      </span>
    </button>
  )
}

function TruckGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d="M3 16V8h9v8M12 11h4l3 3v2M3 16h1.5M9 16h4.5M19 16h1"
        stroke="var(--on-accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="17.5" r="1.6" fill="var(--on-accent)" />
      <circle cx="16.5" cy="17.5" r="1.6" fill="var(--on-accent)" />
    </svg>
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
