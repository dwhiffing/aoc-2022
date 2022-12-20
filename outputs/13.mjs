import { input } from '../inputs/13.mjs'

const toArr = x => (Array.isArray(x) ? [...x] : [x])

function compare(a, b) {
  while (a.length > 0 && b.length > 0) {
    const _a = a.shift()
    const _b = b.shift()

    if (typeof _a === 'number' && typeof _b === 'number') {
      if (_a === _b) continue
      return _a < _b ? 1 : 0
    }

    const result = compare(toArr(_a), toArr(_b))
    if (typeof result === 'number') return result
  }

  if (b.length && !a.length) return 1
  if (a.length && !b.length) return 0
}


const lines = input.replace(/\n\s*\n/g, '\n').split('\n').map(JSON.parse)

const sortedIndexes = []

for (let i = 0; i < lines.length; i += 2) {
  const a = lines[i]
  const b = lines[i + 1]
  const result = compare(toArr(a), toArr(b))

  if (result === 1) sortedIndexes.push((i / 2) + 1)
}

const part1 = sortedIndexes.reduce((sum, n) => n + sum, 0)

const one = [[2]]
const two = [[6]]
const sorted = lines.concat([one, two]).sort((a, b) => compare(toArr(a), toArr(b)) === 1 ? -1 : 1)
const part2 = (sorted.findIndex(f => f === one) + 1) * (sorted.findIndex(f => f === two) + 1)

console.log(part1, part2)
