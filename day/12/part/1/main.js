let moons = [
  {x: -13, y: -13, z: -13, vx: 0, vy: 0, vz: 0, id: '0'},
  {x: 5, y: -8, z: 3, vx: 0, vy: 0, vz: 0, id: '1'},
  {x: -6, y: -10, z: -3, vx: 0, vy: 0, vz: 0, id: '2'},
  {x: 0, y: 5, z: -5, vx: 0, vy: 0, vz: 0, id: '3'},
]


function getPairs(arr) {
  return arr.map( (v, i) => arr.slice(i + 1).map(w => [v, w]) ).flat()
}

let pairs = getPairs(moons)

console.log(pairs)

function step() {
  pairs.forEach(pair => {
    ['x', 'y', 'z'].forEach(cord => {
      if (pair[0][cord] === pair[1][cord]) {
        
      } else if (pair[0][cord] > pair[1][cord]) {
        pair[0]['v' + cord] -= 1
        pair[1]['v' + cord] += 1
      } else if (pair[0][cord] < pair[1][cord]) {
        pair[0]['v' + cord] += 1
        pair[1]['v' + cord] -= 1
      }
    })
  })

  moons.forEach(moon => {
    ['x', 'y', 'z'].forEach(cord => {
      moon[cord] += moon['v' + cord]
    })
  })
}

function toStr(obj) {
  let str = []
  obj.forEach(ob => {
    ['x', 'y', 'z', 'vx', 'vy', 'vz'].forEach(c => {
      str.push(ob[c])
    })
  })
  return str.join(',')
}
let objs = new Set()
let steps = 0
console.time('time')
while (true) {
  steps += 1
  step()
  if (objs.has(toStr(moons))) {
    console.log(toStr(moons))
    break
  } else {
    objs.add(toStr(moons))
  }
  if (steps % 10000 === 0) {
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
