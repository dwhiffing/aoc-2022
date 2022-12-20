import { input } from '../inputs/16.mjs'

const permute = (arr, len = Math.floor(arr.length / 2)) => {
  if (len === 1) return arr.map(v => [v])
  return arr.reduce((a, v, i) => [
    ...a,
    ...permute(arr.slice(i + 1), len - 1).map(p => [v, ...p])
  ], [])
}

const REGEX = /Valve (\w\w) has flow rate=(\d+); tunnels? leads? to valves? (.+)/

const valves = input.map((line) => {
  const [_, name, flow, routes] = line.match(REGEX)
  return { name, flow: +flow, routes: routes.split(', '), depths: {} }
}).reduce((valves, valve, _, array) => {
  if (!valves) valves = Object.fromEntries(array.map(v => [v.name, v]))

  let name, queue = [valve.name]
  while (name = queue.shift()) {
    const seen = Object.keys(valve.depths)
    for (const routeName of valves[name].routes) {
      if (seen.includes(routeName)) continue
      valve.depths[routeName] = (valve.depths[name] || 0) + 1
      queue.push(routeName)
    }
  }

  // filter out paths to 0 flow valves
  valve.depths = Object.entries(valve.depths)
    .reduce((obj, [k, v]) => (
      valves[k].flow > 0 ? { ...obj, [k]: v } : obj
    ), {})

  return { ...valves, [valve.name]: valve }
}, undefined)

const simulate = (valve, time = 30, ignore = [], visited = [valve]) => {
  if (time <= 0) return 0

  const routes = Object.keys(valves[valve].depths)
    .filter(n => !visited.includes(n) && !ignore.includes(n))
  const rate = visited.map(k => valves[k].flow).reduce((sum, n) => sum + n, 0)
  if (routes.length === 0) return rate * time

  return Math.max(...routes.map(n => {
    const cost = valves[valve].depths[n] + 1
    if (cost > time) return rate * time

    return cost * rate + simulate(n, time - cost, ignore, [...visited, n])
  })) || 0
}

const part1 = simulate('AA', 30)

const usefulValveNames = Object.values(valves)
  .filter(v => v.flow > 0)
  .map(v => v.name)
const us = permute(usefulValveNames)
const them = us.map(valves =>
  usefulValveNames.filter(x => !valves.includes(x))
)

let part2 = 0
for (let i = 0; i < us.length; i++) {
  if (i % 1000 === 0) console.log(i, 'done of', us.length)
  const max1 = simulate('AA', 26, them[i])
  const max2 = simulate('AA', 26, us[i])
  let temp = part2
  part2 = Math.max(part2, max1 + max2)
  if (temp < part2) i = 0

  // give up if the answer seems pretty good
  if (i++ > 1000) break
}

console.log(part1, part2)
