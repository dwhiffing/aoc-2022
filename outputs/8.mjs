import { input } from '../inputs/8.mjs'

const isVisible = (y, x) => {
  const tree = +input[y][x]
  const cols = input[y].split('')
  const up = input.slice(0, y).every((row) => +row[x] < tree)
  const down = input.slice(y + 1).every((row) => +row[x] < tree)
  const left = cols.slice(0, x).every((t) => +t < tree)
  const right = cols.slice(x + 1).every((t) => +t < tree)
  return up || down || left || right
}

const getScore = (y, x) => {
  const tree = +input[y][x]
  const cols = input[y].split('')

  const getCount = (array) => {
    let count = 0
    for (let n of array) {
      count++
      if (n >= tree) return count
    }
    return count
  }

  // prettier-ignore
  const up = getCount(input.slice(0, y).reverse().map((r) => +r[x]))
  const down = getCount(input.slice(y + 1).map((r) => +r[x]))
  const right = getCount(cols.slice(x + 1))
  const left = getCount(cols.slice(0, x).reverse())

  return up * down * left * right
}

let part1 = 0
let part2 = 0
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (isVisible(y, x)) part1 += 1
    const score = getScore(y, x)
    if (score > part2) part2 = score
  }
}

console.log(part1, part2)
