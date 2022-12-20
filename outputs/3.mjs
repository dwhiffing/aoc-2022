import { input } from '../inputs/3.mjs'

const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

let part1 = 0
for (let line of input) {
  const compSize = line.length / 2
  const comp1 = line.split('').slice(0, compSize)
  const comp2 = line.split('').slice(compSize)
  const shared = comp1.find((c1) => comp2.some((c2) => c1 === c2))
  const score = CHARS.indexOf(shared) + 1
  part1 += score
}

let part2 = 0
for (let i = 0; i < input.length; i += 3) {
  const line1 = input[i].split('')
  const line2 = input[i + 1].split('')
  const line3 = input[i + 2].split('')
  const shared = line1.find(
    (c1) => line2.some((c2) => c1 === c2) && line3.some((c2) => c1 === c2),
  )
  const score = CHARS.indexOf(shared) + 1
  part2 += score
}

console.log(part1, part2)
