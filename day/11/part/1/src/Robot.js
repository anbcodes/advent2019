module.exports = class Robot {
  constructor() {
    this.painted = new Set()
    this.wall = {}
    this.pos = {x: 0, y: 0}
    this.dir = 0
  }

  get posStr() {
    return `${this.pos.x},${this.pos.y}`
  }

  paint(color) {
    // console.log('paint')
    this.wall[this.posStr] = color
    this.painted.add(this.posStr)
  }

  turn(dir) {
    // console.log('turn')
    if (dir === 0) {
      this.dir -= 1
    } else {
      this.dir += 1
    }
  }

  move() {
    // console.log('move')
    switch (this.dir) {
      case 0:
        this.pos.y -= 1
      case 1:
        this.pos.x += 1
      case 2:
        this.pos.y += 1
      case 3:
        this.pos.x -= 1
    }
  }
}