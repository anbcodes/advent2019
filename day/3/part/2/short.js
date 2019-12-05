//used: dpi
let data = require('fs').readFileSync('input.txt').toString().split('\n').map(l=>l.split(',').map(v=>[v[0],+v.slice(1)])).map(l=>{d=0;p=[0,0];return l.reduce((o,c)=>{
  i=c[1]
  while(i--) {
    switch (c[0]) {
      case'U':
        p[0]++
        break
      case'D':
        p[0]--
        break
      case'L':
        p[1]--
        break
      case'R':
        p[1]++
    }
    d++
    o[JSON.stringify(p)]=d
  };return o}, {})})

console.log(data)
// let points = []
// let crossPoints = {}

// data.forEach((line, i) => {
//   let currentLinePoints = {}
//   let currentLoc = { x: 0, y: 0 }
//   let currentDist = 0
//   line.forEach(code => {
//     for (let x = 0; x < code.len; x += 1) {
//       switch (code.dir) {
//         case 'U':
//           currentLoc.y += 1
//           break
//         case 'D':
//           currentLoc.y -= 1
//           break
//         case 'L':
//           currentLoc.x -= 1
//           break
//         case 'R':
//           currentLoc.x += 1
//           break
//         default:
//           console.error('FAIL: No valid dir')
//       }
//       currentDist += 1

//       if (points[i-1] && points[i-1][`${currentLoc.x},${currentLoc.y}`] && !crossPoints[`${currentLoc.x},${currentLoc.y}`]) {
//         crossPoints[`${currentLoc.x},${currentLoc.y}`] = [ currentDist, points[i-1][`${currentLoc.x},${currentLoc.y}`] ]
//       }
//       currentLinePoints[`${currentLoc.x},${currentLoc.y}`] = currentDist
//     }
//   })
//   points.push(currentLinePoints)
// })

// let closest = 1e10

// Object.keys(crossPoints).forEach(point => {
//   let dist = crossPoints[point]
//   if (dist[0] + dist[1] < closest) {
//     closest = dist[0] + dist[1]
//   }
// })

// console.log(crossPoints, closest)