function main() {
  const fs = require('fs')
  let file = fs.readFileSync('./data.txt')
  let masses = file.toString().split('\n')
  let total = 0

  function getFuel(mass) {
    let fuelForMass = Math.floor(mass/3) - 2
    if (fuelForMass > 0) {
      fuelForMass += getFuel(fuelForMass)
    }
    if (fuelForMass < 0) {
      return 0
    }
    return fuelForMass
  }

  masses.forEach(massStr => {
    let mass = +massStr
    total += getFuel(mass)
  })
}

function oneLine() {
  g=n=>Math.floor(+n/3)-2;v=String(require('fs').readFileSync('d')).split('\n').reduce((r, c)=>{while(g(c)>0) {r+=g(c);c=g(c)};return r}, 0)
}

let mainTotalTime = 0;
let number = 10000;
for(let x = 0; x < number; x++) {
  let mainStart = process.hrtime()
  main()
  let mainEnd = process.hrtime(mainStart)
  mainTotalTime += mainEnd[1] / 1000000
}

let mainTime = parseFloat(mainTotalTime/number).toFixed(5)
let mainOps = parseFloat(1000/(mainTotalTime/number)).toFixed(0)
console.log(`Main:\n\tTime: ${mainTime}ms\n\tOp/s: ${mainOps}`)


let oneTotalTime = 0;
for(let x = 0; x < number; x++) {
  let oneStart = process.hrtime()
  oneLine()
  let oneEnd = process.hrtime(oneStart)
  oneTotalTime += oneEnd[1] / 1000000
}

let oneTime = parseFloat(oneTotalTime/number).toFixed(5)
let oneOps = parseFloat(1000/(oneTotalTime/number)).toFixed(0)
console.log(`OneLine:\n\tTime: ${oneTime}ms\n\tOp/s: ${oneOps}`)