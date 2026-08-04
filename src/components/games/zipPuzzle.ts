/* ------------------------------------------------------------------ *
 *  Puzzle generation for Zip.
 *
 *  A board is only fair if it is known to be solvable, so we work
 *  backwards: build a Hamiltonian path across the whole grid first, then
 *  drop the numbered checkpoints onto cells along it. Any board produced
 *  this way has at least one solution by construction.
 * ------------------------------------------------------------------ */

export interface Puzzle {
  size: number
  /** cell index → checkpoint number (1-based). */
  checkpoints: Map<number, number>
  checkpointCount: number
}

export const cellOf = (row: number, col: number, size: number) => row * size + col
export const rowOf = (cell: number, size: number) => Math.floor(cell / size)
export const colOf = (cell: number, size: number) => cell % size

export function neighbours(cell: number, size: number): number[] {
  const r = rowOf(cell, size)
  const c = colOf(cell, size)
  const out: number[] = []
  if (r > 0) out.push(cell - size)
  if (r < size - 1) out.push(cell + size)
  if (c > 0) out.push(cell - 1)
  if (c < size - 1) out.push(cell + 1)
  return out
}

export const areAdjacent = (a: number, b: number, size: number): boolean => {
  const dr = Math.abs(rowOf(a, size) - rowOf(b, size))
  const dc = Math.abs(colOf(a, size) - colOf(b, size))
  return dr + dc === 1
}

/** Boustrophedon sweep — a trivially valid Hamiltonian path to start from. */
function snake(size: number): number[] {
  const path: number[] = []
  for (let r = 0; r < size; r++) {
    for (let k = 0; k < size; k++) {
      const c = r % 2 === 0 ? k : size - 1 - k
      path.push(cellOf(r, c, size))
    }
  }
  return path
}

/**
 * "Backbite" shuffle. Repeatedly: take the path's tail, pick a random
 * neighbour of it, and reverse the section after that neighbour. Every move
 * maps one Hamiltonian path to another, so the result is always valid —
 * unlike backtracking search, this can never fail or stall.
 */
function shuffleHamiltonian(size: number, iterations: number): number[] {
  let path = snake(size)
  let index = new Map<number, number>()
  const reindex = () => {
    index = new Map()
    path.forEach((cell, i) => index.set(cell, i))
  }
  reindex()

  for (let i = 0; i < iterations; i++) {
    // Operating only on the tail is enough if we sometimes flip the path.
    if (Math.random() < 0.5) {
      path.reverse()
      reindex()
    }

    const tail = path[path.length - 1]
    const options = neighbours(tail, size)
    const pick = options[Math.floor(Math.random() * options.length)]
    const at = index.get(pick)!

    // Already the edge we arrived along — nothing to gain.
    if (at === path.length - 2) continue

    path = path.slice(0, at + 1).concat(path.slice(at + 1).reverse())
    reindex()
  }

  return path
}

/**
 * Spread `count` checkpoints along the path, always including both ends so
 * the puzzle has a defined start and finish. Jitter keeps the spacing from
 * looking mechanical.
 */
function pickCheckpointIndices(length: number, count: number): number[] {
  const chosen = new Set<number>([0, length - 1])
  const segment = (length - 1) / (count - 1)

  for (let k = 1; k < count - 1; k++) {
    const base = Math.round(k * segment)
    const jitter = Math.round((Math.random() - 0.5) * segment * 0.7)
    chosen.add(Math.min(length - 2, Math.max(1, base + jitter)))
  }

  // Jitter can collide two checkpoints onto one index; top back up.
  let guard = 0
  while (chosen.size < count && guard++ < 500) {
    chosen.add(1 + Math.floor(Math.random() * (length - 2)))
  }

  return [...chosen].sort((a, b) => a - b)
}

export function generatePuzzle(size = 6, checkpointCount = 8): Puzzle {
  const path = shuffleHamiltonian(size, size * size * 90)
  const indices = pickCheckpointIndices(path.length, checkpointCount)

  const checkpoints = new Map<number, number>()
  indices.forEach((pathIndex, n) => checkpoints.set(path[pathIndex], n + 1))

  return { size, checkpoints, checkpointCount: indices.length }
}
