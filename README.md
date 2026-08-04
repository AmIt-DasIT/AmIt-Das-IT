# Portfolio — Amit Das

Single-page developer portfolio. **Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion.**

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc -b, strict
npm run build      # typecheck + production build → dist/
npm run preview
```

---

## Editing content

All copy lives in one typed file:

```
src/data/content.ts
```

No component hardcodes text. Every export is typed, so a wrong shape fails
`npm run typecheck` rather than rendering blank.

| Export | Drives |
| --- | --- |
| `profile` | Name, role, bio, contact details, availability badge |
| `socials` | Social links (hero, about, contact, footer, palette) |
| `stats` | The four hero counters |
| `marqueeStack` | Scrolling tech rail |
| `skillGroups` | Capabilities grid |
| `experience` | The Distronix role and its bullets |
| `projects` | Work rows + case-study modals |
| `education` | Education block in About |
| `nav` | Header/footer links — `href` must match a section `id` |
| `terminalScript` | Lines the hero terminal types |

**Also update:** `index.html` (title, description, OG tags, canonical URL).

The résumé lives at `public/Amit_Das_Frontend_Developer_Resume.pdf` and both
buttons resolve to it through `profile.resumeUrl` — replace that file to publish
a new version, no code change needed. The Hero button opens it in a tab for a
quick look; the Experience button carries `download`, so it saves to disk.

---

## Design system

Greyscale plus **one** accent (blue). Status colours are deliberately absent —
hierarchy comes from weight, scale and space. All tokens are in
`src/index.css` under `:root` (light) and `.dark`:

```css
--ink  --surface  --raised  --line  --line-strong
--body --muted    --heading --accent --on-accent
```

Each is exposed to Tailwind as a var-of-a-var, so `bg-surface` and
`text-heading` follow the theme with **zero `dark:` prefixes**. Change
`--accent` in both blocks to re-skin the entire site.

Theme respects the OS preference on first visit, then remembers the choice.

---

## The games

Three playable games in the `#play` section. Scores and best times persist to
`localStorage`.

**Zip** (`components/games/Zip.tsx`, generator in `zipPuzzle.ts`) — draw one
unbroken line through every cell, hitting the numbered checkpoints in order.
Drag, or use arrow keys; drag back over the line to undo.

Boards are never searched for — they are built backwards from a guaranteed
solution. `zipPuzzle.ts` starts from a boustrophedon sweep (trivially a
Hamiltonian path) and shuffles it with **backbite** moves, each of which maps
one Hamiltonian path to another, so generation can never fail or stall the way
backtracking search can. Checkpoints are then dropped along that path. Tune
`SIZE` and `CHECKPOINTS` at the top of `Zip.tsx`.

**Dispatch** (`components/games/Dispatch.tsx`) — 12 wards, one truck. Bins fill
on their own; drive over a ward to empty it. Three overflows ends the shift.
Click a ward or use arrow keys / WASD.

**Signal** (`components/games/Signal.tsx`) — readings stream in from the station
network. Flag the ones breaching their limit before they expire; leave the clean
ones alone. False alarms and misses both cost you. 45-second rounds.

Dispatch and Signal run off a single `useAnimationFrame` loop with all
fast-changing state in a ref, so a game frame does not thrash React. Difficulty
constants sit at the top of each file — `FILL_RAMP` in Dispatch and
`LIFETIME_START` / `BREACH_CHANCE` in Signal are the ones worth touching.

---

## Structure

```
src/
├── data/content.ts        ← the only file you need for copy changes
├── hooks/index.ts         theme, clock, copy, section spy,
│                          animation frame, persistent score
├── components/
│   ├── ui/Primitives.tsx  Reveal, SplitText, CountUp, Marquee,
│   │                      Section, SectionHeading, Card, Chip
│   ├── ui/BrandIcons.tsx  GitHub / LinkedIn marks
│   ├── system/            SmoothScroll, ScrollProgress, Nav
│   ├── visual/            Constellation, Terminal
│   ├── games/             GameShell, Zip (+ zipPuzzle), Dispatch, Signal
│   └── sections/          Hero, Work, About, Experience,
│                          Skills, Play, Contact, Footer
└── index.css              tokens, theme, custom utilities
```

Section order is projects-first — `Work` sits above `Experience` on purpose,
since the résumé is one employer with three deep projects.

---

## Notes

- **The contact form has no backend.** It validates and opens a prefilled
  `mailto:` draft. Swap the `submit` handler in `sections/Contact.tsx` for a
  `fetch()` when you have an endpoint.
- `prefers-reduced-motion` disables smooth scroll, the hero particle canvas,
  the terminal typing and all scroll animation.
- Fonts (Inter, JetBrains Mono) load from Google Fonts in `index.html`.
  Self-host them if you need to build offline.
