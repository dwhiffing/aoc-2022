import { input } from '../inputs/2.mjs'

const OUTCOMES_US = { X: [3, 0, 6], Y: [6, 3, 0], Z: [0, 6, 3] }
const OUTCOMES_THEM = { A: [3, 6, 0], B: [0, 3, 6], C: [6, 0, 3] }
const US_TO_OUTCOME = { X: 0, Y: 3, Z: 6 }
const MOVES_US = Object.keys(OUTCOMES_US)
const MOVES_THEM = Object.keys(OUTCOMES_THEM)

let part1 = 0
let part2 = 0
for (let line of input) {
  const [them, us] = line.split(' ')

  part1 += MOVES_US.indexOf(us) + 1
  part1 += OUTCOMES_US[us][MOVES_THEM.indexOf(them)]

  const desiredOutcome = US_TO_OUTCOME[us]
  part2 += OUTCOMES_THEM[them].indexOf(desiredOutcome) + 1
  part2 += desiredOutcome
}

console.log(part1, part2)
