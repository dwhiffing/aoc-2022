import { input } from '../inputs/17.mjs'

const S = '1111,0000,0000,0000;0100,1110,0100,0000;1110,0010,0010,0000;1000,1000,1000,1000;1100,1100,0000,0000'.split(';')
const SHAPES = S.map(s => s.split(',').map(s => s.split('').map(Number)))
const WIDTHS = [4, 3, 3, 1, 2]

let sX, sY, shapeIndex = -1
let lastMaxY = 0
let maxY = 0
let maxShapeX = 3
let collided = true
let verbose = false
const map = {}

const getMapAt = (x, y) => {
  const shape = SHAPES[shapeIndex]
  let _x = x - sX
  let _y = y - sY
  if (map[`${x},${y}`]) return '#'
  return shape[_y]?.[_x] === 1 ? '@' : shape[_y]?.[_x] === 0 ? '_' : '.'
}

const isShapeColliding = () => {
  if (sY < 0) return true

  return SHAPES[shapeIndex].some((row, y) => row.some((n, x) =>
    map[`${x + sX},${y + sY}`] && n === 1
  ))
}

const newShape = () => {
  verbose && console.log('')
  shapeIndex++
  shapeIndex = shapeIndex % SHAPES.length
  collided = false
  sX = 2
  sY = maxY + 3
  maxShapeX = 7 - WIDTHS[shapeIndex]
  verbose && console.log('A new rock begins falling:')
  verbose && drawBoard()
}

const moveX = (dir) => {
  i = (i + 1) % input.length
  verbose && console.log(`Jet of gas pushes rock ${dir ? 'left' : 'right'}:`)
  let prev = sX
  sX = Math.min(maxShapeX, Math.max(0, sX + (dir ? -1 : 1)))
  if (isShapeColliding()) sX = prev
}

const moveY = () => {
  verbose && drawBoard()
  verbose && console.log('')
  let line = 'Rock falls 1 unit'
  sY--

  if (isShapeColliding()) {
    collided = true
    sY++
    SHAPES[shapeIndex].forEach((row, y) => row.forEach((n, x) => {
      if (n === 1) map[`${sX + x},${sY + y}`] = 1
    }))
    rockCount++
    maxY = Math.max(...Object.keys(map).map(k => +k.split(',')[1])) + 1
    line += `causing it to come to rest new max y: ${maxY}`
  }

  verbose && console.log(line + ':')
  verbose && drawBoard()
}

const drawBoard = () => {
  for (let y = maxY + 6; y > -2; y--) {
    let line = y === -1 ? '+' : '|'
    for (let x = 0; x < 7; x++) line += y === -1 ? '-' : getMapAt(x, y)
    line += y === -1 ? '+' : '|'
    console.log(line)
  }
}


let i = 0
let j = 0
let rockCount = 0
while (rockCount < 10000) {
  // console.log(i)
  if (collided) {
    newShape()
  } else {
    moveX(input[i] === '<')
    moveY()
  }

  if (j > 142) {
    let _j = j - 142
    if (_j % 200 === 0) {
      console.log(_j, maxY - lastMaxY, maxY)
      lastMaxY = maxY
    }
  }
  // if (i === 0) {
  //   console.log(j, maxY - lastMaxY, maxY)
  //   lastMaxY = maxY
  // }
  j++
}
