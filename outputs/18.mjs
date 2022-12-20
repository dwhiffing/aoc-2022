import { input } from '../inputs/18.mjs'

const grid = {}
for (let [x, y, z] of input) grid[`${x},${y},${z}`] = 1

const getAdjCoords = (x, y, z) => [
  [x - 1, y, z], [x + 1, y, z],
  [x, y - 1, z], [x, y + 1, z],
  [x, y, z - 1], [x, y, z + 1]
]

const getAdjCount = (x, y, z) =>
  getAdjCoords(x, y, z).map(c => grid[c.join(',')]).filter(Boolean).length

const part1 = (
  Object.keys(grid)
    .map(k => getAdjCount(...k.split(',').map(Number))))
  .reduce((sum, n) => (6 - n) + sum, 0)

let airPockets = []
const bounds = {
  minX: Math.min(...input.map(i => i[0])) - 1,
  maxX: Math.max(...input.map(i => i[0])) + 1,
  minY: Math.min(...input.map(i => i[1])) - 1,
  maxY: Math.max(...input.map(i => i[1])) + 1,
  minZ: Math.min(...input.map(i => i[2])) - 1,
  maxZ: Math.max(...input.map(i => i[2])) + 1,
}

for (let x = bounds.minX; x < bounds.maxX; x++) {
  for (let y = bounds.minY; y < bounds.maxY; y++) {
    for (let z = bounds.minZ; z < bounds.maxZ; z++) {
      const diffs = {
        minX: Math.abs(bounds.minX - x), maxX: Math.abs(bounds.maxX - x),
        minY: Math.abs(bounds.minY - y), maxY: Math.abs(bounds.maxY - y),
        minZ: Math.abs(bounds.minZ - z), maxZ: Math.abs(bounds.maxZ - z),
      }
      const closest = Object.entries(diffs).sort((a, b) => a[1] - b[1])[0][0]
      const exit = { x, y, z }
      exit[`${closest[3].toLowerCase()}`] = bounds[closest]

      //  try to pathfind to boundary
      let coord, queue = [{ x, y, z }]
      let seen = [`${x},${y},${z}`]
      let external = false
      while (coord = queue.shift()) {
        let { x, y, z } = coord

        const neighbours = getAdjCoords(x, y, z)
        if (grid[`${x},${y},${z}`] || exit.x === x && exit.y === y && exit.z === z) {
          external = true
          break
        }

        for (const nCoord of neighbours) {
          let [x, y, z] = nCoord
          if (seen.includes(`${x},${y},${z}`) || grid[`${x},${y},${z}`]) continue
          seen.push(`${x},${y},${z}`)
          queue.push({ x, y, z })
        }
      }

      if (!external) airPockets.push(`${x},${y},${z}`)
    }
  }
}

const internalSideCount = airPockets
  .map(c => getAdjCount(...c.split(',').map(Number)))
  .reduce((sum, n) => sum + n, 0)

const part2 = part1 - internalSideCount

console.log(part1, part2)