import { input } from '../inputs/7.mjs'

const set = (obj, path, value) => {
  path.reduce((array, key, i) => {
    if (array[key] === undefined) array[key] = {}
    if (i === path.length - 1) array[key] = value
    return array[key]
  }, obj)
}

const getFiles = () => {
  let cwd = []
  const files = {}

  for (let line of input) {
    if (line.startsWith('$')) {
      if (!line.startsWith('$ cd')) continue
      const [_, dir] = line.split('$ cd ')
      if (dir === '/') cwd = []
      else if (dir === '..') cwd.pop()
      else cwd.push(dir)
    } else {
      const [size, name] = line.split(' ')
      set(files, [...cwd, name], size === 'dir' ? {} : +size)
    }
  }
  return files
}

const getDirectorySize = (files, sizes = []) => {
  let size = 0
  for (const value of Object.values(files)) {
    if (typeof value === 'number') size += value
    else size += getDirectorySize(value, sizes)[0]
  }
  sizes.unshift(size)
  return sizes
}

const sizes = getDirectorySize(getFiles(input))
const part1 = sizes.filter((n) => n <= 100000).reduce((sum, n) => sum + n, 0)

const missing = 30000000 - (70000000 - sizes[0])
const part2 = sizes.filter((x) => x >= missing).sort((a, b) => a - b)[0]

console.log(part1, part2)
