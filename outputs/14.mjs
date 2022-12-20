import { input } from '../inputs/14.mjs'

const board = {}

// place rocks
for (let line of input) {
  const points = line.split(' -> ').map(p => p.split(',').map(Number))

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    let x = Math.min(x1, x2)
    let y = Math.min(y1, y2)

    if (x1 === x2) while (y <= Math.max(y1, y2)) board[`${x1},${y++}`] = '#'
    else while (x <= Math.max(x1, x2)) board[`${x++},${y1}`] = '#'
  }
}

let floorY = 0
let minX = Infinity
let maxX = -Infinity

Object.keys(board).forEach((key) => {
  const [x, y] = key.split(',')
  if (+y > floorY) floorY = +y
  if (+x > maxX) maxX = +x
  if (+x < minX) minX = +x
})
floorY += 2
const board2 = { ...board }
for (let x = minX - 1000; x < maxX + 1000; x++) board2[`${x},${floorY}`] = '#'

const simulate = (board, floorY, hasFloor) => {
  let result = 0
  if (hasFloor)
    for (let x = minX - 1000; x < maxX + 1000; x++) board[`${x},${floorY}`] = '#'

  while (true) {
    const s = { x: 500, y: 0 }
    while (true) {
      const canFallDown = !board[`${s.x},${s.y + 1}`]
      const canFallLeft = !board[`${s.x - 1},${s.y + 1}`]
      const canFallRight = !board[`${s.x + 1},${s.y + 1}`]
      if (!canFallDown && !canFallLeft && !canFallRight) {
        board[`${s.x},${s.y}`] = 'o'
        break
      }
      s.y++
      if (!canFallDown) s.x += canFallLeft ? -1 : 1
      if (s.y >= floorY) break
    }

    result++

    if (hasFloor ? (s.x === 500 && s.y === 0) : s.y >= floorY) break
  }

  return result + (hasFloor ? 0 : -1)
}

const part1 = simulate(board, floorY, false)
const part2 = simulate(board2, floorY, true)

console.log(part1, part2)