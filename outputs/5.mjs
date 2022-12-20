import { start, input } from '../inputs/5.mjs'

const getLabel = (arr) => arr.map((a) => a[a.length - 1]).join('')

const followInstruction = (arr, source, dest, count, reverse) => {
  const crates = arr[source].splice(arr[source].length - count, count)
  arr[dest].push(...(reverse ? crates.reverse() : crates))
}

let part1 = [...start.map((s) => [...s])]
let part2 = [...start.map((s) => [...s])]
for (let line of input) {
  const [_, count, source, dest] = line.match(/move (\d+) from (\d+) to (\d+)/)
  followInstruction(part1, source - 1, dest - 1, +count, true)
  followInstruction(part2, source - 1, dest - 1, +count)
}

console.log(getLabel(part1), getLabel(part2))
