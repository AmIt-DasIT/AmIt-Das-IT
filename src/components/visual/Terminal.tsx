import { useEffect, useState } from 'react'
import { terminalScript, type TerminalLine } from '../../data/content'
import { useReducedMotion } from '../../hooks'

const TYPE_MS = 30
const LINE_PAUSE = 380

/** A faux shell that types the script out, line by line. */
export default function Terminal({ startDelay = 600 }: { startDelay?: number }) {
  const reduced = useReducedMotion()
  const [lines, setLines] = useState<TerminalLine[]>(reduced ? terminalScript : [])
  const [partial, setPartial] = useState('')
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) return

    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    const run = async () => {
      await wait(startDelay)
      for (const line of terminalScript) {
        if (cancelled) return
        // Commands type character by character; output lands at once.
        if (line.type === 'cmd') {
          for (let i = 1; i <= line.text.length; i++) {
            if (cancelled) return
            setPartial(line.text.slice(0, i))
            await wait(TYPE_MS)
          }
          await wait(180)
        }
        if (cancelled) return
        setPartial('')
        setLines((prev) => [...prev, line])
        await wait(LINE_PAUSE)
      }
      if (!cancelled) setDone(true)
    }

    void run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [reduced, startDelay])

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-1.5 font-mono text-[11px] text-muted">amit@portfolio</span>
      </div>

      <div className="h-42 overflow-hidden px-3.5 py-3 font-mono text-[12px] leading-relaxed">
        {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))}

        {partial && (
          <p className="flex gap-2">
            <span className="shrink-0 text-accent">$</span>
            <span className="text-heading">
              {partial}
              <Caret />
            </span>
          </p>
        )}

        {done && (
          <p className="flex gap-2">
            <span className="shrink-0 text-accent">$</span>
            <Caret />
          </p>
        )}
      </div>
    </div>
  )
}

function Line({ line }: { line: TerminalLine }) {
  if (line.type === 'cmd') {
    return (
      <p className="flex gap-2">
        <span className="shrink-0 text-accent">$</span>
        <span className="text-heading">{line.text}</span>
      </p>
    )
  }

  if (line.type === 'ok') {
    return (
      <p className="mb-1.5 flex gap-2 pl-3.5">
        <span className="shrink-0 text-accent">✓</span>
        <span className="text-heading">{line.text}</span>
      </p>
    )
  }

  return <p className="mb-1.5 pl-3.5 text-body">{line.text}</p>
}

const Caret = () => (
  <span className="ml-0.5 inline-block h-[1em] w-1.5 translate-y-0.5 animate-blink bg-accent" />
)
