import { useState } from 'react'
import { motion } from 'motion/react'
import { Reveal, Section, SectionHeading } from '../ui/Primitives'
import Zip from '../games/Zip'
import Dispatch from '../games/Dispatch'
import Signal from '../games/Signal'

const GAMES = [
  {
    id: 'zip',
    name: 'Zip',
    tagline:
      'One unbroken line through every cell, hitting the numbers in order.',
    from: 'a route-planning problem — every board is generated solvable',
  },
  {
    id: 'dispatch',
    name: 'Dispatch',
    tagline: 'Route a truck across 12 wards before the bins overflow.',
    from: 'Vehicle Tracking System',
  },
  {
    id: 'signal',
    name: 'Signal',
    tagline: 'Flag the readings that breach their limit. Ignore the clean ones.',
    from: 'CAAQMS',
  },
] as const

type GameId = (typeof GAMES)[number]['id']

export default function Play() {
  const [active, setActive] = useState<GameId>('zip')
  const current = GAMES.find((g) => g.id === active)!

  return (
    <Section id="play">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Play"
          title="Three games. Two of them are the systems above, stripped down."
          description="Zip is a path puzzle — one unbroken line through every cell, and every board is generated from a known solution so it is always winnable. Dispatch and Signal are the real problems I shipped for: routing a fleet, and telling a genuine threshold breach from noise. All three keep score."
        />

        <Reveal className="mt-10">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Games"
            className="mb-4 inline-flex rounded-lg border border-line bg-surface p-1"
          >
            {GAMES.map((game) => (
              <button
                key={game.id}
                role="tab"
                aria-selected={active === game.id}
                onClick={() => setActive(game.id)}
                className={`relative rounded-md px-4 py-2 text-sm transition-colors ${
                  active === game.id ? 'text-ink' : 'text-body hover:text-heading'
                }`}
              >
                {active === game.id && (
                  <motion.span
                    layoutId="game-tab"
                    className="absolute inset-0 rounded-md bg-heading"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{game.name}</span>
              </button>
            ))}
          </div>

          <p className="mb-6 max-w-xl text-sm text-body">
            {current.tagline}{' '}
            <span className="text-muted">Based on {current.from}.</span>
          </p>

          {/* Each game keeps its own state; unmounting on tab switch is
              intentional so a half-finished round does not linger. */}
          {active === 'zip' && <Zip />}
          {active === 'dispatch' && <Dispatch />}
          {active === 'signal' && <Signal />}
        </Reveal>
      </div>
    </Section>
  )
}
