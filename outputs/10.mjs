import { input } from '../inputs/10.mjs'

const S = [20, 60, 100, 140, 180, 220]
const screen = new Array(6).fill().map(() => new Array(40).fill(' '))

let cycle = 1
let sprite = 1
let part1 = 0

for (let line of input) {
  const [ins, arg] = line.split(' ')
  let time = ins === 'addx' ? 2 : 1
  while (time-- > 0) {
    const x = (cycle - 1) % 40
    const y = Math.floor((cycle - 1) / 40)
    if (Math.abs(x - sprite) < 2) screen[y][x] = '@'

    if (S.includes(cycle)) part1 += cycle * sprite
    cycle++
  }
  if (ins === 'addx') sprite += +arg
}

console.log(part1)

for (let y = 0; y < 6; y++) console.log(screen[y].join(''))
