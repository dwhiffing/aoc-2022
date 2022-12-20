import { input } from '../inputs/9.mjs'

const moves = input.flatMap((line) => {
  const [move, count] = line.split(' ')
  return new Array(+count).fill(move)
})

const simulateRopes = (length = 2) => {
  const ropes = new Array(length).fill().map(() => [0, 0])
  const history = new Set()

  for (let move of moves) {
    const head = ropes[0]
    if (move === 'L') head[0]--
    if (move === 'U') head[1]--
    if (move === 'R') head[0]++
    if (move === 'D') head[1]++

    for (let i = 0; i < ropes.length - 1; i++) {
      const rope = ropes[i]
      const next = ropes[i + 1]
      const xDiff = next[0] - rope[0]
      const yDiff = next[1] - rope[1]
      const moveX = Math.abs(xDiff) > 1
      const moveY = Math.abs(yDiff) > 1
      if (moveX || moveY) {
        next[0] = rope[0] + (moveX ? Math.sign(xDiff) : 0)
        next[1] = rope[1] + (moveY ? Math.sign(yDiff) : 0)
      }
    }

    history.add(`${ropes[length - 1].join(',')}`)
  }

  return history.size
}

console.log(simulateRopes(2), simulateRopes(10))
