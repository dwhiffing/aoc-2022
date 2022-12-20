import { input } from '../inputs/19.mjs'

const MATERIALS = [0, 1, 2, 3]
const REGEX = /Blueprint \d+: Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./
const bps = input
  .split('\n')
  .map(bp => bp.match(REGEX).slice(1).map(Number))
  .map((b) => [[b[0]], [b[1]], [b[2], b[3]], [b[4], 0, b[5]]])

function getBest(bp, state, cache = {}) {
  if (state.t === 0) return state.m[3]

  state.m = state.m ?? [0, 0, 0, 0]
  state.r = state.r ?? [1, 0, 0, 0]

  const key = `${state.t}${state.r.join('')})${state.m.join('')})`
  if (key in cache) return cache[key]

  const oreCap = bp.slice(1).map((bp) => bp[0]).reduce((s, n) => Math.max(s, n), 0)
  const caps = [oreCap, Math.floor(bp[2][1]), Math.floor(bp[3][2]), 10000000]

  let max = state.m[3] + state.r[3] * state.t
  const results = MATERIALS
    .filter(m => state.r[m] < caps[m] && bp[m].every((_, v) => state.r[v]))
    .map(m => [m, Math.max(...bp[m].map((v, k) => Math.ceil((v - state.m[k]) / state.r[k])))])
    .filter(m => m[1] >= 0 && state.t - m[1] - 1 > 0)
    .map(([robotIndex, time]) => {
      const _state = JSON.parse(JSON.stringify(state))
      _state.t -= (time + 1)
      MATERIALS.forEach(i => _state.m[i] += _state.r[i] * (time + 1))
      _state.r[robotIndex]++
      bp[robotIndex].forEach((v, i) => _state.m[i] -= v)

      return getBest(bp, _state, cache)
    })

  max = Math.max(max, ...results)
  cache[key] = max

  return max
}

const start = Date.now()

const part1 = bps.reduce((sum, bp, i) =>
  sum + (getBest(bp, { t: 24 }) * (i + 1)), 0)

const part2 = bps.slice(0, 3).reduce((sum, bp) =>
  sum * getBest(bp, { t: 32 }), 1)

console.log(part1, part2, Date.now() - start)

