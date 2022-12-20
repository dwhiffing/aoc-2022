import { input } from '../inputs/1.mjs'

const getElfCalorieSums = (data) => {
  let calorieSums = []
  let elfIndex = 0

  for (let entry of data) {
    if (typeof entry === 'number') {
      calorieSums[elfIndex] = calorieSums[elfIndex] || 0
      calorieSums[elfIndex] += entry
    } else {
      elfIndex++
    }
  }

  return calorieSums.sort((a, b) => b - a)
}

const calorieSums = getElfCalorieSums(input)

const part1 = calorieSums[0]
const part2 = calorieSums.slice(0, 3).reduce((sum, n) => sum + n, 0)

console.log(part1, part2)
