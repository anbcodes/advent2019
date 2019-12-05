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
let crossPoints = {}

data.forEach((line, i) => {
  let currentLinePoints = {}
  let currentLoc = { x: 0, y: 0 }
  let currentDist = 0
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
      currentDist += 1

      if (points[i-1] && points[i-1][`${currentLoc.x},${currentLoc.y}`] && !crossPoints[`${currentLoc.x},${currentLoc.y}`]) {
        crossPoints[`${currentLoc.x},${currentLoc.y}`] = [ currentDist, points[i-1][`${currentLoc.x},${currentLoc.y}`] ]
      }
      currentLinePoints[`${currentLoc.x},${currentLoc.y}`] = currentDist
    }
  })
  points.push(currentLinePoints)
})

let closest = 1e10

Object.keys(crossPoints).forEach(point => {
  let dist = crossPoints[point]
  if (dist[0] + dist[1] < closest) {
    closest = dist[0] + dist[1]
  }
})

console.log(crossPoints, closest)