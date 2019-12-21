let moons = [
  {x: -13, y: -13, z: -13, vx: 0, vy: 0, vz: 0, id: '0'},
  {x: 5, y: -8, z: 3, vx: 0, vy: 0, vz: 0, id: '1'},
  {x: -6, y: -10, z: -3, vx: 0, vy: 0, vz: 0, id: '2'},
  {x: 0, y: 5, z: -5, vx: 0, vy: 0, vz: 0, id: '3'},
]

function toStr(obj) {
  let str = []
  obj.forEach(ob => {
    ['x', 'y', 'z', 'vx', 'vy', 'vz'].forEach(c => {
      str.push(ob[c])
    })
  })
  return str.join(',')
}

let orgStr = []
for (let i = 0; i < moons.length; i++) {
  orgStr.push(moons[i].x, moons[i].y, moons[i].z, moons[i].vx, moons[i].vy, moons[i].vz)
}
orgStr = orgStr.join(',')

function getPairs(arr) {
  return arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()
}

let pairs = getPairs(moons)

console.log(pairs)

function step() {
  
}


let objs = new Set()
let steps = 0
console.time('time')
while (true) {
  steps += 1
  
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i]

    if (pair[0].x === pair[1].x) {
        
    } else if (pair[0].x > pair[1].x) {
      pair[0].vx -= 1
      pair[1].vx += 1
    } else if (pair[0].x < pair[1].x) {
      pair[0].vx += 1
      pair[1].vx -= 1
    }

    if (pair[0].y === pair[1].y) {
        
    } else if (pair[0].y > pair[1].y) {
      pair[0].vy -= 1
      pair[1].vy += 1
    } else if (pair[0].y < pair[1].y) {
      pair[0].vy += 1
      pair[1].vy -= 1
    }

    if (pair[0].z === pair[1].z) {
        
    } else if (pair[0].z > pair[1].z) {
      pair[0].vz -= 1
      pair[1].vz += 1
    } else if (pair[0].z < pair[1].z) {
      pair[0].vz += 1
      pair[1].vz -= 1
    }
  }

  for (let i = 0; i < moons.length; i++) {
    moons[i].x += moons[i].vx
    moons[i].y += moons[i].vy
    moons[i].z += moons[i].vz

  }

  let str = []
  for (let i = 0; i < moons.length; i++) {
    str.push(moons[i].x, moons[i].y, moons[i].z, moons[i].vx, moons[i].vy, moons[i].vz)
  }
  str = str.join(',')

  if (str === orgStr) {
    console.log(str)
    break
  }

  if (steps % 1e6 === 0) {
    console.timeLog('time', steps)
  }
  // if (time % 100 === 0) {
  //   console.log(moons.map((v, i) => `${i}: ${v.vx}, ${v.vy}, ${v.vz},`))
  // }
}

// let total = 0

// moons.forEach(moon => {
//   total += (Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)) * (Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz))
// })

console.log(objs)
console.log(steps)
console.timeEnd('time')
