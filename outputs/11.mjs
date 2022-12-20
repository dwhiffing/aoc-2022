import { input } from '../inputs/11.mjs'

const handleMonkeys = (input = [], count = 1, boredom = true) => {
  const monkeys = input.map((m) => ({ ...m, items: [...m.items] }))
  // divisors are all prime, so we can just multiply them together to get lcm
  const lcm = monkeys.map((m) => m.divisor).reduce((a, b) => a * b, 1)

  for (let i = 0; i < count; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        let item = monkey.mutate(monkey.items.shift())
        // if not bored, use lcm to reduce item without changing divisors
        item = boredom ? Math.floor(item / 3) : item % lcm
        const index = item % monkey.divisor === 0 ? 0 : 1
        monkeys[monkey.dest[index]].items.push(item)
        monkey.count++
      }
    }
  }

  const activity = monkeys.map((m) => m.count).sort((a, b) => b - a)
  return activity[0] * activity[1]
}

const part1 = handleMonkeys(input, 20, true)
const part2 = handleMonkeys(input, 10000, false)

console.log(part1, part2)
