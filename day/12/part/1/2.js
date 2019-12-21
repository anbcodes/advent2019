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

function step(types) {
  pairs.forEach(pair => {
    (types || ['x', 'y', 'z']).forEach(cord => {
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
    (types || ['x', 'y', 'z']).forEach(cord => {
      moon[cord] += moon['v' + cord]
    })
  })
}

function toStr(obj, types) {
  let str = []
  obj.forEach(ob => {
    (types || ['x', 'y', 'z', 'vx', 'vy', 'vz']).forEach(c => {
      str.push(ob[c])
    })
  })
  return str.join(',')
}

let xobjs = new Set()
let xsteps = 0
let xorg = toStr(moons, ['x', 'vx'])
console.time('time')
while (true) {
  step(['x'])
  xsteps += 1
  if (toStr(moons, ['x', 'vx']) === xorg) {
    console.log(moons, xsteps)
    break
  } else {
    // xobjs.add(toStr(moons, ['x', 'vx']))
  }
  // if (xsteps % 10000 === 0) {
  //   console.timeLog('time', xsteps)
  // }
}

let yobjs = new Set()
let ysteps = 0;
let yorg = toStr(moons, ['y', 'vy'])
while (true) {
  ysteps += xsteps
  step(['y'])
  if (toStr(moons, ['y', 'vy']) === yorg) {
    console.log(moons, ysteps)
    break
  } else {
    // yobjs.add(toStr(moons, ['y', 'vy']))
  }
  // if (ysteps % 10000 === 0) {
  //   console.timeLog('time', ysteps)
  // }
}
let zobjs = new Set()
let zsteps = 0;
let zorg = toStr(moons, ['z', 'vz'])
while (true) {
  zsteps += ysteps
  step(['z'])
  if (toStr(moons, ['z', 'vz']) === zorg) {
    console.log(moons)
    break
  } else {
    // zobjs.add(toStr(moons, ['z', 'vz']))
  }
  if (zsteps % 10000 === 0) {
    console.timeLog('time', zsteps)
  }
}

console.log(zsteps)
console.timeEnd('time')
