import type { ReactNode } from 'react'
import { RotateCcw, Play } from 'lucide-react'

export type GameStatus = 'idle' | 'running' | 'over'

export interface Readout {
  label: string
  value: string
  emphasis?: boolean
}

interface GameShellProps {
  status: GameStatus
  readouts: Readout[]
  /** Shown over the board before the first run and after a loss. */
  overlay: { title: string; body: string; action: string } | null
  onStart: () => void
  hint: string
  children: ReactNode
}

/**
 * Shared chrome for both games: a readout strip, the board, and a hint line.
 * The board itself is whatever `children` renders.
 */
export default function GameShell({
  status,
  readouts,
  overlay,
  onStart,
  hint,
  children,
}: GameShellProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {/* Readouts */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line px-5 py-3.5">
        {readouts.map((r) => (
          <div key={r.label}>
            <p className="mono-label">{r.label}</p>
            <p
              className={`numeric mt-0.5 text-lg ${
                r.emphasis ? 'text-accent' : 'text-heading'
              }`}
            >
              {r.value}
            </p>
          </div>
        ))}

        {status === 'running' && (
          <button
            onClick={onStart}
            className="ml-auto inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-heading"
          >
            <RotateCcw className="h-3 w-3" />
            Restart
          </button>
        )}
      </div>

      {/* Board */}
      <div className="relative">
        {children}

        {overlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface/92 px-6 backdrop-blur-[2px]">
            <div className="max-w-sm text-center">
              <h4 className="text-xl font-medium text-heading">{overlay.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-body">{overlay.body}</p>
              <button
                onClick={onStart}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-heading px-5 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-85"
              >
                <Play className="h-3.5 w-3.5" />
                {overlay.action}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
        {hint}
      </p>
    </div>
  )
}
