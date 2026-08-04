import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RotateCcw, Shuffle } from 'lucide-react'
import { usePersistentNumber } from '../../hooks'
import { areAdjacent, colOf, generatePuzzle, rowOf, type Puzzle } from './zipPuzzle'

/* ------------------------------------------------------------------ *
 *  ZIP
 *  Draw one continuous line that passes through every cell exactly once
 *  and hits the numbered checkpoints in ascending order.
 * ------------------------------------------------------------------ */

const SIZE = 6
const CHECKPOINTS = 8
const TOTAL = SIZE * SIZE

/** Line thickness, as a percentage of the (square) board. */
const STROKE = 4.2

export default function Zip() {
  const [puzzle, setPuzzle] = useState<Puzzle>(() =>
    generatePuzzle(SIZE, CHECKPOINTS),
  )
  const [path, setPath] = useState<number[]>([])
  const [drawing, setDrawing] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [best, setBest] = usePersistentNumber('zip-best-seconds', 0)
  const startedAt = useRef<number | null>(null)

  const reached = useMemo(
    () => path.filter((c) => puzzle.checkpoints.has(c)).length,
    [path, puzzle],
  )
  const solved = path.length === TOTAL && reached === puzzle.checkpointCount

  /* Timer runs from the first move until the board is solved. */
  useEffect(() => {
    if (solved || startedAt.current === null) return
    const id = window.setInterval(() => {
      if (startedAt.current !== null) {
        setElapsed((performance.now() - startedAt.current) / 1000)
      }
    }, 100)
    return () => window.clearInterval(id)
  }, [solved, path.length])

  useEffect(() => {
    if (!solved) return
    const seconds = Math.round(elapsed)
    if (best === 0 || seconds < best) setBest(seconds)
  }, [solved, elapsed, best, setBest])

  const reset = useCallback(() => {
    setPath([])
    setElapsed(0)
    startedAt.current = null
  }, [])

  const newPuzzle = useCallback(() => {
    setPuzzle(generatePuzzle(SIZE, CHECKPOINTS))
    reset()
  }, [reset])

  /**
   * Extend, retract or restart the line at `cell`.
   * Returns silently when the move is not legal — an invalid drag should
   * feel inert, not throw the player back to the start.
   */
  const visit = useCallback(
    (cell: number) => {
      if (solved) return

      setPath((prev) => {
        // First move must be checkpoint 1.
        if (prev.length === 0) {
          if (puzzle.checkpoints.get(cell) !== 1) return prev
          startedAt.current = performance.now()
          return [cell]
        }

        const head = prev[prev.length - 1]
        if (cell === head) return prev

        // Dragging back over the line retracts it to that point.
        const existing = prev.indexOf(cell)
        if (existing !== -1) return prev.slice(0, existing + 1)

        if (!areAdjacent(cell, head, puzzle.size)) return prev

        // Checkpoints must be taken strictly in order.
        const number = puzzle.checkpoints.get(cell)
        if (number !== undefined) {
          const nextExpected =
            prev.filter((c) => puzzle.checkpoints.has(c)).length + 1
          if (number !== nextExpected) return prev
        }

        return [...prev, cell]
      })
    },
    [puzzle, solved],
  )

  /* Keyboard play: arrows extend the line from its head. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const deltas: Record<string, [number, number]> = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
      }
      const delta = deltas[e.key]
      if (!delta || path.length === 0) return
      e.preventDefault()

      const head = path[path.length - 1]
      const r = rowOf(head, puzzle.size) + delta[0]
      const c = colOf(head, puzzle.size) + delta[1]
      if (r < 0 || c < 0 || r >= puzzle.size || c >= puzzle.size) return
      visit(r * puzzle.size + c)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [path, puzzle.size, visit])

  useEffect(() => {
    const stop = () => setDrawing(false)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    return () => {
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
    }
  }, [])

  const nextNumber = Math.min(reached + 1, puzzle.checkpointCount)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {/* Readouts */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line px-5 py-3.5">
        <Readout label="Filled" value={`${path.length} / ${TOTAL}`} emphasis />
        <Readout label="Next" value={solved ? '—' : String(nextNumber)} />
        <Readout label="Time" value={formatTime(elapsed)} />
        <Readout label="Best" value={best === 0 ? '—' : formatTime(best)} />

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-heading"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </button>
          <button
            onClick={newPuzzle}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-heading"
          >
            <Shuffle className="h-3 w-3" />
            New
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="relative p-4 md:p-6">
        <div
          className="relative mx-auto aspect-square w-full max-w-md touch-none select-none"
          style={{ '--stroke': `${STROKE}%` } as React.CSSProperties}
        >
          {/* Cells */}
          <div
            className="absolute inset-0 grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${puzzle.size}, 1fr)`,
              gridTemplateRows: `repeat(${puzzle.size}, 1fr)`,
            }}
          >
            {Array.from({ length: TOTAL }, (_, cell) => {
              const number = puzzle.checkpoints.get(cell)
              const inPath = path.includes(cell)
              const isHead = path[path.length - 1] === cell
              const done = number !== undefined && inPath

              return (
                <div
                  key={cell}
                  onPointerDown={(e) => {
                    e.preventDefault()
                    setDrawing(true)
                    visit(cell)
                  }}
                  onPointerEnter={() => drawing && visit(cell)}
                  role="button"
                  tabIndex={-1}
                  aria-label={
                    number ? `Checkpoint ${number}` : `Cell ${cell + 1}`
                  }
                  className={`relative rounded-md border transition-colors duration-150 ${
                    isHead
                      ? 'border-accent'
                      : inPath
                        ? 'border-line-strong'
                        : 'border-line'
                  } ${inPath ? 'bg-raised' : 'bg-ink'} cursor-pointer`}
                >
                  {number !== undefined && (
                    <span
                      className={`absolute inset-0 z-20 m-auto flex h-[62%] w-[62%] items-center justify-center rounded-full text-xs font-medium transition-colors ${
                        done
                          ? 'bg-accent text-on-accent'
                          : 'bg-heading text-ink'
                      }`}
                    >
                      {number}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* The drawn line, rendered as segments between cell centres. */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {path.map((cell, i) => (
              <Node key={`n-${cell}`} cell={cell} size={puzzle.size} last={i === path.length - 1} />
            ))}
            {path.slice(1).map((cell, i) => (
              <Segment
                key={`s-${path[i]}-${cell}`}
                from={path[i]}
                to={cell}
                size={puzzle.size}
              />
            ))}
          </div>

          {/* Solved state */}
          {solved && (
            <div className="absolute inset-0 z-30 flex items-center justify-center rounded-lg bg-surface/92 backdrop-blur-[2px]">
              <div className="text-center">
                <p className="text-xl font-medium text-heading">Solved</p>
                <p className="numeric mt-1.5 text-sm text-body">
                  {formatTime(elapsed)}
                  {best !== 0 && Math.round(elapsed) <= best
                    ? ' · personal best'
                    : ''}
                </p>
                <button
                  onClick={newPuzzle}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-heading px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-85"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  Next puzzle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
        Drag from 1 to fill every cell, hitting each number in order · drag back
        to undo · arrow keys work too
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Readout({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div>
      <p className="mono-label">{label}</p>
      <p className={`numeric mt-0.5 text-lg ${emphasis ? 'text-accent' : 'text-heading'}`}>
        {value}
      </p>
    </div>
  )
}

const centre = (cell: number, size: number) => ({
  x: ((colOf(cell, size) + 0.5) / size) * 100,
  y: ((rowOf(cell, size) + 0.5) / size) * 100,
})

/** A rounded cap at each visited cell, so corners in the line stay square-free. */
function Node({ cell, size, last }: { cell: number; size: number; last: boolean }) {
  const { x, y } = centre(cell, size)
  return (
    <span
      className={`absolute rounded-[3px] ${last ? 'bg-accent' : 'bg-accent/85'}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: 'var(--stroke)',
        height: 'var(--stroke)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function Segment({ from, to, size }: { from: number; to: number; size: number }) {
  const a = centre(from, size)
  const b = centre(to, size)
  const horizontal = a.y === b.y

  return (
    <span
      className="absolute bg-accent/85"
      style={
        horizontal
          ? {
              left: `${Math.min(a.x, b.x)}%`,
              top: `${a.y}%`,
              width: `${Math.abs(b.x - a.x)}%`,
              height: 'var(--stroke)',
              transform: 'translateY(-50%)',
            }
          : {
              left: `${a.x}%`,
              top: `${Math.min(a.y, b.y)}%`,
              width: 'var(--stroke)',
              height: `${Math.abs(b.y - a.y)}%`,
              transform: 'translateX(-50%)',
            }
      }
    />
  )
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
