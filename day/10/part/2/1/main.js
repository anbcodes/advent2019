Object.prototype.$Log = function(name) {
  console.log(name || '', this)
  return this
}
let input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((v, y) => v
    .split('')
    .map((v, x) => [x, y, v])
  ).reduce((o, l) => {
    l.forEach(v => {
      o[`${v[0]},${v[1]}`] = v[2]
    })
    return o
  }, {}).$Log('Input:')

/*
  takes a startPos + slope
  nextPos = (X) pos.x + slope.x (Y) pos.y + slope.y
  while(input[nextPos])
    if (input[nextPos] === '#')
      return true
    else if (input[nextPos] === '.')
      Do Nothing
    else
      return false
    nextPos.x += slope.x
    nextPos.y += slope.y
*/
// function isAstriod(pos, slope, blocked) {
//   let newPos = {...pos}
//   newPos.x += slope.x
//   newPos.y += slope.y
//   let found
//   while (input[`${newPos.x},${newPos.y}`]) {
//     // newPos.$Log('Pos')
//     // slope.$Log('slope')
//     if (input[`${newPos.x},${newPos.y}`] === '#' && !found) {
//       // newPos.$Log('Found (newPos):')
//       found = `${newPos.x},${newPos.y}`
//       // input[`${newPos.x},${newPos.y}`].$Log('Found (input):')
//       // console.log('Found: ', newPos.x, newPos.y, )
//     } else if (input[`${newPos.x},${newPos.y}`] === '.') {
      
//     } else {
//       return false
//     }
    
//     newPos.x += slope.x
//     newPos.y += slope.y
//     if (found) {
//       blocked[`${newPos.x},${newPos.y}`] = true
//     }
    
//   }
//   return found
// }
/*
  takes x, y

  found = Array
  for sy in -35-35
    for sx in -35-35
      if (!sy && !sx) 
        continue
      
      astroid = isAstroid({x: x, y: y}, {x: sx, y: sy})
      if (astroid && !found.includes(astroid) && astroid !== x,y)
        found.push(astroid)
*/


function toStr(pos) {
  return `${pos.x},${pos.y}`
}

function toStr2(pos) {
  return `${pos[0]},${pos[1]}`
}
function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/Math.abs(gcd), denominator/Math.abs(gcd)];
}
/* HERE
// function erase(pos, dir, otherDir, inputCopy) {
//   let nextPos = {...pos}
//   nextPos.x += dir.x
//   nextPos.y += dir.y
//   while(inputCopy[toStr(nextPos)]) {
//     inputCopy[toStr(nextPos)] = '%'
//     nextPos.x += otherDir.x
//     nextPos.y += otherDir.y
//   }
// }
function getIntersections(pos, dir, inCopy) {
  let [sx, sy] = reduce(dir.x, dir.y)
  let newPos = {...pos}
  newPos.x += sx
  newPos.y += sy
  let intersecitons = []
  let found = false;
  while (inCopy[toStr(newPos)]) {
    if (found) {
      inCopy[toStr(newPos)] = '%'
    }
    if (inCopy[toStr(newPos)] === '#') {
      found = true
      intersecitons.push(toStr(newPos))
    }
    newPos.x += sx
    newPos.y += sy
  }
  return intersecitons
}

function findNumber(x, y, copy) {
  let found = []
  for (let sy = -35; sy < 36; sy += 1) {
    for (let sx = -35; sx < 36; sx += 1) {
      // console.log(x, y, sx, sy)
      if (!sy && !sx) {
        continue
      }
      // console.log('checkingSlope', sx, sy)
      let intersecitons = getIntersections({x, y}, {x: sx, y: sy}, copy)
      if (intersecitons.length > 0 && !found.includes(intersecitons[0])) {
        found.push(intersecitons[0])
      }
    }
  }
  return found
}
// function out(x, y, inputCopy) {
//   let astroids = []
//   let outLength = 1
//   while (true) {
//     let num = 0;
//     let notExist = 0;
//     for (let ny = y - outLength; ny <= y + outLength; ny += 1) {
//       for (let nx = x - outLength; nx <= x + outLength; nx += 1) {
//         if (
//           !((
//             ny === y - outLength
//             || ny === y + outLength 
//           ) || (
//             nx === x - outLength
//             || nx === x + outLength 
//           ))
//         ) {
//           continue
//         }
//         if (!astroids.includes(toStr({x: nx, y: ny})) && inputCopy[toStr({x: nx, y: ny})] === '#' && ((nx - outLength) || (ny - outLength))) {
//           // console.log('Found: ', nx, ny, astroids.length)
//           astroids.push(toStr({x: nx, y: ny}))
//           // console.log(nx - x, ny - y, sx, sy)
//           let [sx, sy] = reduce(nx - x, ny - y)
//           erase({x: nx, y: ny}, {x: nx - x, y: ny - y}, {x: sx, y: sy}, inputCopy)
//           // console.log(inputCopy[toStr({x: nx, y: ny})])
//         } else if (inputCopy[toStr({x: nx, y: ny})] === undefined) {
//           notExist += 1
//         }
//         num += 1
//       }
//     }
//     if (num === notExist) {
//       break
//     }
//     outLength += 1
//   }
//   return { astroids, inputCopy };
// }
let greatest = 0
let mostFound
let mostPos = [0, 0]
let greatestInputCopy
/*
for y in 0-35
  for x in 0-35
    if input[x,y] == #
      astroids = findNumber(x, y)
      if (astroids.length > greatest)
        mostFound = astroids
        greatest = astroids.length 
*/
/* HERE
for (let y = 0; y < 36; y += 1) {
  for (let x = 0; x < 36; x += 1) {
    if (input[`${x},${y}`] === '#') {
      let copy = {...input}
      let astroids = findNumber(x, y, copy)
      console.log(x, y, astroids.length)
      if (astroids.length > greatest) {
        mostPos = [x, y]
        greatestInputCopy = copy
        mostFound = astroids
        greatest = astroids.length
      }
    }
  }
}

console.dir(mostFound, {maxArrayLength: null})
console.log(greatest)
console.log('Pos:', mostPos)

let toWrite = []

for (let y = 0; y < 36; y += 1) {
  let current = []
  for (let x = 0; x < 36; x += 1) {
    if (x === mostPos[0] && y === mostPos[1]) {
      current.push('O')
    } else if (mostFound.includes(`${x},${y}`)) {
      current.push('X')
    } else {
      current.push(greatestInputCopy[`${x},${y}`])
    }
  }
  toWrite.push(current.join(''))
}

const Jimp = require('jimp');

let image = new Jimp(36, 36, function (err, image) {
  if (err) throw err;

  toWrite.forEach((row, y) => {
    row.split('').forEach((color, x) => {
      if (color === 'O') {
        image.setPixelColor(Jimp.rgbaToInt(0, 0, 255, 255), x, y);
      }
      if (color === 'X') {
        image.setPixelColor(Jimp.rgbaToInt(0, 255, 0, 255), x, y);
      }
      if (color === '#') {
        image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), x, y);
      }
      if (color === '.') {
        image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), x, y);
      }
      if (color === '%') {
        image.setPixelColor(Jimp.rgbaToInt(255, 0, 0, 255), x, y);
      }
    });
  });

  image.write('test.png', (err) => {
    if (err) throw err;
  });
});
*/
let mostPos = [25, 31]

// function getIntersectionsForBlast(pos, dir) {
//   let [sx, sy] = reduce(dir.x, dir.y)
//   let newPos = {...pos}
//   newPos.x += sx
//   newPos.y += sy
//   let intersecitons = []
//   let found = false;
//   while (input[toStr(newPos)]) {
//     if (input[toStr(newPos)] === '#') {
//       found = true
//       intersecitons.push(toStr(newPos))
//     }
//     newPos.x += sx
//     newPos.y += sy
//   }
//   return intersecitons
// }

let blastCount = 0

// function blast(x, y, sx, sy) {
//   let interseciton = getIntersectionsForBlast({x, y}, {x:sx, y:sy})[0]
//   if (interseciton) {
//     console.log('Blasting: ', sx, sy)
//     input[interseciton] = '@'
//     blastCount += 1
//   }
//   if (blastCount === 200) {
//     console.log('FOUND: ', interseciton)
//     return true
//   }
// }
function getCartFromAngAndDist(pos, ang, dist) {
  return [ pos.x - (dist * Math.round(Math.cos(ang))) , pos.y - (dist * Math.round(Math.sin(ang)))  ]
}

function getIntersectionsForBlast(pos, ang) {
  let dist = 1
  let myAng = ang
  let intersecitons = []
  let found = false;

  while (input[toStr2(getCartFromAngAndDist(pos, ang, dist))]) {
    console.log('Checking', pos, ang, dist, input[toStr2(getCartFromAngAndDist(pos, ang, dist))])
    // 
    if (!intersecitons.includes(toStr2(getCartFromAngAndDist(pos, ang, dist))) && input[toStr2(getCartFromAngAndDist(pos, ang, dist))] === '#' || input[toStr2(getCartFromAngAndDist(pos, ang, dist))] === '$') {
      found = true
      input[toStr2(getCartFromAngAndDist(pos, ang, dist))] = '$'
      intersecitons.push(toStr2(getCartFromAngAndDist(pos, ang, dist)))
    } else {
      input[toStr2(getCartFromAngAndDist(pos,ang, dist))] = '%'
    }
    dist += 1
  }
  return intersecitons
}
function blast(x, y, ang) {
  let interseciton = getIntersectionsForBlast({x, y}, ang)[0]
  if (interseciton) {
    console.log('Blasting: ', ang)
    input[interseciton] = '@'
    blastCount += 1
  }
  if (blastCount === 10) {
    console.log('FOUND: ', interseciton)
    return true
  }
}

function findNumber2(x, y) {
  let found = []
  w:
  while (blastCount <= 200) {
    let d = 180
    let changed = false
    while (d !== 179) {
      console.log('Dir', d)
      d += 1
      if (d > 360) {
        d = 0
      }
      if (blast(x, y, d)) {
        break w;
        break;
      }
    }
    // f1:
    // for (let x = 0; x < 36; x += 1) {
    //   let sx = x
    //   let sy = -35
    //   if (!sy && !sx) {
    //     continue
    //   }
    //   // console.log('checkingSlope', sx, sy)
    //   if (blast(x, y, sx, sy)) {
    //     break w;
    //     break f1;
    //     break;
    //   }
    // }
    // f1:
    // for (let y = -35; y < 36; y += 1) {
    //   let sx = 35
    //   let sy = y
    //   if (!sy && !sx) {
    //     continue
    //   }
    //   // console.log('checkingSlope', sx, sy)
    //   if (blast(x, y, sx, sy)) {
    //     break w;
    //     break f1;
    //     break;
    //   }
    // }
    // f1:
    // for (let x = 35; x > -36; x -= 1) {
    //   let sx = x
    //   let sy = 35
    //   if (!sy && !sx) {
    //     continue
    //   }
    //   // console.log('checkingSlope', sx, sy)
    //   if (blast(x, y, sx, sy)) {
    //     break w;
    //     break f1;
    //     break;
    //   }
    // }
    // f1:
    // for (let y = 35; y > -36; y -= 1) {
    //   let sx = -35
    //   let sy = y
    //   if (!sy && !sx) {
    //     continue
    //   }
    //   // console.log('checkingSlope', sx, sy)
    //   if (blast(x, y, sx, sy)) {
    //     break w;
    //     break f1;
    //     break;
    //   }
    // }
    // f1:
    // for (let x = -35; x < 0; x += 1) {
    //   let sx = x
    //   let sy = -35
    //   if (!sy && !sx) {
    //     continue
    //   }
    //   // console.log('checkingSlope', sx, sy)
    //   if (blast(x, y, sx, sy)) {
    //     break w;
    //     break f1;
    //     break;
    //   }
    // }
    // for (let sy = -35; sy < 36; sy += 1) {
    //   for (let sx = -35; sx < 36; sx += 1) {
    //     // console.log(x, y, sx, sy)
        
    //   }
    // }
  }
}
console.log(getCartFromAngAndDist({x:0, y:0}, 0, 2))
console.log(getCartFromAngAndDist({x:0, y:0}, 90, 2))
console.log(getCartFromAngAndDist({x:0, y:0}, 180, 2))
console.log(getCartFromAngAndDist({x:0, y:0}, 360, 2))

findNumber2(mostPos[0], mostPos[1])

let toWrite2 = []

for (let y = 0; y < 36; y += 1) {
  let current = []
  for (let x = 0; x < 36; x += 1) {
    if (x === mostPos[0] && y === mostPos[1]) {
      current.push('O')
    } else {
      current.push(input[`${x},${y}`])
    }
  }
  toWrite2.push(current.join(''))
}

const Jimp = require('jimp')

let image2 = new Jimp(36, 36, function (err, image) {
  if (err) throw err;

  toWrite2.forEach((row, y) => {
    row.split('').forEach((color, x) => {
      if (color === 'O') {
        image.setPixelColor(Jimp.rgbaToInt(0, 0, 255, 255), x, y);
      }
      if (color === '%' || color === '$') {
        image.setPixelColor(Jimp.rgbaToInt(0, 255, 0, 255), x, y);
      }
      if (color === '#') {
        image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), x, y);
      }
      if (color === '.') {
        image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), x, y);
      }
      if (color === '@') {
        image.setPixelColor(Jimp.rgbaToInt(255, 0, 0, 255), x, y);
      }
    });
  });

  image.write('test.png', (err) => {
    if (err) throw err;
  });
});