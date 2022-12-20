import { input } from '../inputs/12.mjs'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')
const startY = input.findIndex((l) => l.includes('S'))
const startX = input[startY].split('').findIndex((c) => c === 'S')
const endY = input.findIndex((l) => l.includes('E'))
const endX = input[endY].split('').findIndex((c) => c === 'E')

const getHeight = (s) =>
  s === 'E' ? 25 : s === 'S' ? 0 : LETTERS.findIndex((c) => c === s)

const getNeighbours = (grid, { x, y, i }, n = []) => {
  if (y < grid.length - 1) n.push(grid[y + 1][x])
  if (y > 0) n.push(grid[y - 1][x])
  if (x < grid[0].length - 1) n.push(grid[y][x + 1])
  if (x > 0) n.push(grid[y][x - 1])

  return n.filter((c) => c.i <= i + 1)
}

const dijkstra = (sx, sy, ex, ey) => {
  const grid = input.map((l, y) =>
    l.split('').map((c, x) => ({ x, y, i: getHeight(c) })),
  )

  const queue = [grid[sy][sx]]
  const seen = []

  while (queue.length > 0) {
    let node = queue.shift()

    if (node.x === ex && node.y === ey) {
      let path = []
      while ((node = node.parent)) path.push(node.parent)
      return path.length
    }

    seen.push(node)
    for (const neighbour of getNeighbours(grid, node)) {
      if (queue.includes(neighbour) || seen.includes(neighbour)) continue

      neighbour.parent = node
      queue.push(neighbour)
    }
  }
}

const part1 = dijkstra(startX, startY, endX, endY)
const part2 = input
  .flatMap((l, y) => l.split('').map((c, x) => (c === 'a' ? { x, y } : null)))
  .filter(Boolean)
  .map((start) => dijkstra(start.x, start.y, endX, endY))
  .sort((a, b) => a - b)[0]

console.log(part1, part2)
