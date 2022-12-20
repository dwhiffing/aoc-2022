import { input } from '../inputs/20.mjs'

const data = input.map(n => ({ mixed: false, n }))
while (data.some(d => !d.mixed)) {
  const di = data.findIndex(d => !d.mixed)
  const [item] = data.splice(di, 1)
  item.mixed = true
  let thing = (di + item.n) % data.length
  if (thing <= 0) thing = Math.abs(data.length + thing)
  data.splice(thing, 0, item)
}

let n = data.findIndex(d => d.n === 0)
let part1 = 0

part1 += data[(n + 1000) % data.length].n
part1 += data[(n + 2000) % data.length].n
part1 += data[(n + 3000) % data.length].n

console.log(part1)
