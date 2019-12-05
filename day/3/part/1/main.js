const Dirs = {
  UP: 'U',
  DOWN: 'D',
  LEFT: 'L',
  RIGHT: 'R'
}


const fs = require('fs')
let file = fs.readFileSync('input.txt')
let lines = file.toString().split('\n')

let data = lines.map(l => l.split(',').map(v => ({dir: v[0], len: +v.slice(1)})))

let points = []
let crossPoints = new Set();

data.forEach((line, i) => {
  let currentLinePoints = new Set()
  let currentLoc = { x: 0, y: 0 }
  line.forEach(code => {
    for (let x = 0; x < code.len; x += 1) {
      switch (code.dir) {
        case Dirs.UP:
          currentLoc.y += 1
          break
        case Dirs.DOWN:
          currentLoc.y -= 1
          break
        case Dirs.LEFT:
          currentLoc.x -= 1
          break
        case Dirs.RIGHT:
          currentLoc.x += 1
          break
        default:
          console.error('FAIL: No valid dir')
      }
      if (points[i-1] && points[i-1].has(`${currentLoc.x},${currentLoc.y}`)) {
        crossPoints.add(`${currentLoc.x},${currentLoc.y}`)
      }
      currentLinePoints.add(`${currentLoc.x},${currentLoc.y}`)
    }
  })
  points.push(currentLinePoints)
})

let closestPoint = 1e10

crossPoints.forEach(point => {
  let pointArray = point.split(',')
  if (Math.abs(pointArray[0]) + Math.abs(pointArray[1]) < closestPoint) {
    closestPoint = Math.abs(pointArray[0]) + Math.abs(pointArray[1])
  }
})

console.log(closestPoint)