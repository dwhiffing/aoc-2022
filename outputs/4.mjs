import { input } from '../inputs/4.mjs'

let part1 = 0
let part2 = 0
for (let line of input) {
  const [a, b] = line.split(',')
  const [a1, a2] = a.split('-').map((d) => +d)
  const [b1, b2] = b.split('-').map((d) => +d)

  if ((a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)) {
    part1++
  }
  if ((a2 >= b1 && a2 <= b2) || (b2 >= a1 && b2 <= a2)) {
    part2++
  }
}

console.log(part1, part2)
