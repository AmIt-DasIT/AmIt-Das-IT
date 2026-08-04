import { useCallback, useRef, useState } from 'react'
import { useAnimationFrame, usePersistentNumber } from '../../hooks'
import GameShell, { type GameStatus } from './GameShell'

/* ------------------------------------------------------------------ *
 *  SIGNAL
 *  Readings stream in from the station network. Flag the ones breaching
 *  their limit before they expire; leave the clean ones alone.
 *  Mirrors CAAQMS: 8 pollutants, per-parameter thresholds, and the fact
 *  that a false alarm costs an analyst as much as a missed one.
 * ------------------------------------------------------------------ */

interface Parameter {
  code: string
  unit: string
  limit: number
  /** Typical clean range — breaches are generated above `limit`. */
  clean: [number, number]
}

const PARAMETERS: Parameter[] = [
  { code: 'PM2.5', unit: 'µg/m³', limit: 60, clean: [8, 55] },
  { code: 'PM10', unit: 'µg/m³', limit: 100, clean: [20, 92] },
  { code: 'SO₂', unit: 'µg/m³', limit: 80, clean: [4, 72] },
  { code: 'NO₂', unit: 'µg/m³', limit: 80, clean: [10, 74] },
  { code: 'CO', unit: 'mg/m³', limit: 4, clean: [0.3, 3.6] },
  { code: 'O₃', unit: 'µg/m³', limit: 100, clean: [12, 92] },
  { code: 'NH₃', unit: 'µg/m³', limit: 400, clean: [40, 360] },
  { code: 'Benzene', unit: 'µg/m³', limit: 5, clean: [0.4, 4.5] },
]

const LANES = 5
const ROUND_SECONDS = 45
const SPAWN_MIN = 0.55
const SPAWN_MAX = 1.15
const LIFETIME_START = 3.4
const LIFETIME_FLOOR = 1.5
const BREACH_CHANCE = 0.42

interface Reading {
  id: number
  lane: number
  param: Parameter
  value: number
  breach: boolean
  age: number
  lifetime: number
  /** Set on click/expiry so the card can animate out truthfully. */
  resolved: 'hit' | 'miss' | 'false' | 'clean' | null
}

interface World {
  readings: Reading[]
  nextId: number
  spawnIn: number
  elapsed: number
  score: number
  hits: number
  missed: number
  falseAlarms: number
  streak: number
  bestStreak: number
}

function freshWorld(): World {
  return {
    readings: [],
    nextId: 1,
    spawnIn: 0.3,
    elapsed: 0,
    score: 0,
    hits: 0,
    missed: 0,
    falseAlarms: 0,
    streak: 0,
    bestStreak: 0,
  }
}

function makeReading(id: number, lane: number, elapsed: number): Reading {
  const param = PARAMETERS[Math.floor(Math.random() * PARAMETERS.length)]
  const breach = Math.random() < BREACH_CHANCE
  const value = breach
    ? param.limit * (1.05 + Math.random() * 0.9)
    : param.clean[0] + Math.random() * (param.clean[1] - param.clean[0])

  // Readings get shorter-lived as the round progresses.
  const lifetime = Math.max(LIFETIME_FLOOR, LIFETIME_START - elapsed * 0.045)

  return { id, lane, param, value, breach, age: 0, lifetime, resolved: null }
}

function format(value: number): string {
  return value >= 100 ? value.toFixed(0) : value.toFixed(1)
}

export default function Signal() {
  const world = useRef<World>(freshWorld())
  const [status, setStatus] = useState<GameStatus>('idle')
  const [, forceRender] = useState(0)
  const [best, setBest] = usePersistentNumber('signal-best', 0)

  const start = useCallback(() => {
    world.current = freshWorld()
    setStatus('running')
  }, [])

  const tick = useCallback(
    (deltaMs: number) => {
      const w = world.current
      const dt = deltaMs / 1000
      w.elapsed += dt

      /* --- Spawn --- */
      w.spawnIn -= dt
      if (w.spawnIn <= 0) {
        // Only lanes with no live reading are eligible.
        const busy = new Set(
          w.readings.filter((r) => !r.resolved).map((r) => r.lane),
        )
        const free = Array.from({ length: LANES }, (_, i) => i).filter(
          (l) => !busy.has(l),
        )
        if (free.length) {
          const lane = free[Math.floor(Math.random() * free.length)]
          w.readings.push(makeReading(w.nextId++, lane, w.elapsed))
        }
        const ramp = Math.max(0.35, 1 - w.elapsed * 0.012)
        w.spawnIn = (SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN)) * ramp
      }

      /* --- Age and expire --- */
      for (const r of w.readings) {
        r.age += dt
        if (r.resolved) continue
        if (r.age >= r.lifetime) {
          if (r.breach) {
            // A breach that scrolled past unflagged is the expensive mistake.
            r.resolved = 'miss'
            w.missed += 1
            w.streak = 0
            w.score = Math.max(0, w.score - 40)
          } else {
            r.resolved = 'clean'
          }
        }
      }

      // Drop cards once their exit animation has had time to play.
      w.readings = w.readings.filter((r) => r.age < r.lifetime + 0.45)

      if (w.elapsed >= ROUND_SECONDS) {
        const final = Math.round(w.score)
        if (final > best) setBest(final)
        setStatus('over')
      }

      forceRender((n) => n + 1)
    },
    [best, setBest],
  )

  useAnimationFrame(tick, status === 'running')

  const flag = (id: number) => {
    const w = world.current
    const r = w.readings.find((x) => x.id === id)
    if (!r || r.resolved) return

    if (r.breach) {
      r.resolved = 'hit'
      w.hits += 1
      w.streak += 1
      w.bestStreak = Math.max(w.bestStreak, w.streak)
      // Faster reactions score more, and a streak multiplies it.
      const speed = 1 - r.age / r.lifetime
      w.score += Math.round((60 + speed * 90) * (1 + Math.min(w.streak, 10) * 0.1))
    } else {
      r.resolved = 'false'
      w.falseAlarms += 1
      w.streak = 0
      w.score = Math.max(0, w.score - 55)
    }
  }

  const w = world.current
  const score = Math.round(w.score)
  const remaining = Math.max(0, ROUND_SECONDS - w.elapsed)
  const accuracy =
    w.hits + w.missed + w.falseAlarms === 0
      ? 100
      : Math.round((w.hits / (w.hits + w.missed + w.falseAlarms)) * 100)

  const overlay =
    status === 'idle'
      ? {
          title: 'Signal',
          body: 'Readings stream in from 25 stations. Flag every one that breaches its limit before it expires — and leave the clean ones alone. False alarms cost you.',
          action: 'Start round',
        }
      : status === 'over'
        ? {
            title: 'Round complete',
            body: `${score} points · ${w.hits} caught · ${w.missed} missed · ${w.falseAlarms} false alarms · best streak ${w.bestStreak}.${
              score >= best && score > 0 ? ' New personal best.' : ''
            }`,
            action: 'Go again',
          }
        : null

  return (
    <GameShell
      status={status}
      onStart={start}
      overlay={overlay}
      hint="Click a reading only if its value exceeds the limit shown beside it"
      readouts={[
        { label: 'Score', value: String(score), emphasis: true },
        { label: 'Time', value: `${remaining.toFixed(1)}s` },
        { label: 'Streak', value: String(w.streak) },
        { label: 'Accuracy', value: `${accuracy}%` },
        { label: 'Best', value: String(best) },
      ]}
    >
      <div className="p-4 md:p-6">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-2">
          {Array.from({ length: LANES }, (_, lane) => {
            const reading = w.readings.find((r) => r.lane === lane)
            return (
              <div key={lane} className="h-14">
                {reading ? (
                  <ReadingCard reading={reading} onFlag={() => flag(reading.id)} />
                ) : (
                  <div className="flex h-full items-center rounded-lg border border-dashed border-line px-4">
                    <span className="mono-label text-[9px]">awaiting telemetry</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </GameShell>
  )
}

/* ------------------------------------------------------------------ */

function ReadingCard({
  reading,
  onFlag,
}: {
  reading: Reading
  onFlag: () => void
}) {
  const { param, value, resolved } = reading
  const remaining = Math.max(0, 1 - reading.age / reading.lifetime)

  const verdict = {
    hit: { label: 'FLAGGED', tone: 'text-accent', border: 'border-accent' },
    miss: { label: 'MISSED', tone: 'text-heading', border: 'border-heading' },
    false: { label: 'FALSE ALARM', tone: 'text-muted', border: 'border-line-strong' },
    clean: { label: 'CLEAR', tone: 'text-muted', border: 'border-line' },
  }[resolved ?? 'clean']

  return (
    <button
      onClick={onFlag}
      disabled={resolved !== null}
      className={`relative h-full w-full overflow-hidden rounded-lg border bg-ink px-4 text-left transition-opacity ${
        resolved ? `${verdict.border} opacity-55` : 'border-line hover:border-line-strong'
      }`}
    >
      {/* Time remaining drains left to right. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
        style={{ transform: `scaleX(${remaining})` }}
      />

      <span className="flex h-full items-center gap-4">
        <span className="w-16 shrink-0 font-mono text-xs text-heading">
          {param.code}
        </span>

        <span className="numeric text-lg text-heading">{format(value)}</span>
        {/* Units are case-sensitive — `mono-label` uppercases, which would
            turn µg/m³ into mg/m³ and misstate the reading by 1000×. */}
        <span className="font-mono text-[10px] text-muted">{param.unit}</span>

        <span className="ml-auto font-mono text-[10px] text-muted">
          limit {format(param.limit)} {param.unit}
        </span>

        {resolved && (
          <span className={`font-mono text-[10px] tracking-wider ${verdict.tone}`}>
            {verdict.label}
          </span>
        )}
      </span>
    </button>
  )
}
