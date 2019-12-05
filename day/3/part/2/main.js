class Line {
  constructor() {
    this.len = 0
    this.position = [0, 0]
    this.points = {}
  }

  runCode(code) {
    switch (code[0]) {
      case 'U':
        this.move(0, 1, code[1])
        break;
      case 'D':
        this.move(0, -1, code[1])
        break;
      case 'L':
        this.move(-1, 0, code[1])
        break;
      case 'R':
        this.move(1, 0, code[1])
        break;
    }
  }

  move(dx, dy, dist) {
    for (let i = 0; i < dist; i += 1) {
      this.position[0] += dx
      this.position[1] += dy

      this.len += 1

      this.points[this.positionString] = this.len
    }
  }

  getIntersectionsWith(line) {
    let intersections = {}
    Object.keys(this.points).forEach(point => {
      if (line.points[point] && !intersections[point]) {
        let myDistanceToPoint = this.points[point]
        let lineDistanceToPoint = line.points[point]
        intersections[point] = [myDistanceToPoint, lineDistanceToPoint]
      }
    })
    return intersections
  }

  get positionString() {
    return `${this.position[0]},${this.position[1]}`
  }
}


class IntersectionFinder {
  constructor(filename) {
    this.input = this.getInput(filename)
    this.lines = this.getLines()
    this.intersections = this.getIntersections()
  }

  getInput(filename) {
    const fs = require('fs')
    let file = fs.readFileSync(filename)
    let lines = file
      .toString()
      .split('\n')
      .map(line => line
        .split(',')
        .map(v => [v[0], +v.slice(1)])
      )
    return lines
  }

  getLines() {    
    let lines = []

    this.input.forEach(codes => {
      let line = new Line()
      codes.forEach(code => {
        line.runCode(code)
      })
      lines.push(line)
    })

    return lines
  }

  getIntersections() {
    let intersections = []
    this.lines.forEach(lineToCheck => {
      this.lines.forEach(line => {
        if (line !== lineToCheck) {
          intersections.push(lineToCheck.getIntersectionsWith(line))
        }
      })
    })
    return Object.assign({}, ...intersections)
  }

  getClosestIntersectionDistance() {
    let closestDistance = 1e10

    Object.keys(this.intersections).forEach(intersection => {
      let pos = intersection.split(',')
      if (Math.abs(+pos[0]) + Math.abs(+pos[1]) < closestDistance) {
        closestDistance = +pos[0] + +pos[1]
      }
    })

    return closestDistance
  }

  getShortestIntersectionDistance() {
    let closestDistance = 1e10

    Object.keys(this.intersections).forEach(intersection => {
      let dist = this.intersections[intersection]
      if (dist[0] + dist[1] < closestDistance) {
        closestDistance = dist[0] + dist[1]
      }
    })

    return closestDistance
  }
}


// r, g, b, w, c, m, y, k
const colors = [ ['r', 1], ['g', 2], ['b', 4], ['w', 7],
['c', 6], ['m', 5], ['y', 3], ['k', 0] ]
const $ = colors.reduce((cs, c) => { cs[c[0]] = c[0] === 'e' ? `\x1b[0m` : `\x1b[3${c[1]}m`; return cs}, {}) 

let finder = new IntersectionFinder('input.txt')
console.log(
`${$.g}Part 1: ${$.r}${finder.getClosestIntersectionDistance()}
${$.r}Part 2: ${$.g}${finder.getShortestIntersectionDistance()}`
)