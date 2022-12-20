import { input } from '../inputs/15.mjs'

const REGEXP = /x=(.+), y=(.+): closest beacon is at x=(.+), y=(.+)/
const range = (s, e) =>
  Array(Math.ceil((e - s))).fill(s).map((x, y) => x + y)

const data = input.map(line => {
  const [sx, sy, bx, by] = line.match(REGEXP).slice(1).map(Number)
  const radius = Math.abs(sx - bx) + Math.abs(sy - by)
  return { sensor: { x: sx, y: sy }, beacon: { x: bx, y: by }, radius }
})

const getCoverage = (y,) => {
  const ranges = data.map(({ sensor, beacon, radius }) => {
    const cover = radius - Math.abs(sensor.y - y)
    return cover > 0 ? [sensor.x - cover, sensor.x + cover] : null
  }).filter(Boolean).sort((a, b) => a[0] - b[0])

  // try to merge the ranges into a single range
  for (let i = 0; i < ranges.length - 1; i++) {
    const a = ranges[i]
    const b = ranges[i + 1]
    if (a[1] >= b[0]) {
      a[1] = Math.max(a[1], b[1])
      ranges.splice(i-- + 1, 1)
    }
  }

  return ranges
}

const cover = getCoverage(2000000).flatMap(([x1, x2]) => range(x1, x2))
const part1 = new Set(cover).size

let part2 = 0
for (let y = 0; y < 4000000; y++) {
  const ranges = getCoverage(y)

  // if range can't be merged into a single range, the signal is at the gap
  if (ranges.length > 1) {
    const x = (ranges[0][1] + 1) * 4000000
    part2 = x + y
    break
  }
}

console.log(part1, part2)
