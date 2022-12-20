import { input } from '../inputs/6.mjs'

const getFirstSequence = (n, i = 0) => {
  for (const char of input) {
    const arr = [char]
    while (arr.length < n) arr[arr.length] = input[i - arr.length]
    i++

    if (arr.every(Boolean) && new Set(arr).size === arr.length) return i
  }
}

console.log(getFirstSequence(4), getFirstSequence(14))
