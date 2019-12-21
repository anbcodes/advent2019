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
function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/Math.abs(gcd), denominator/Math.abs(gcd)];
}
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