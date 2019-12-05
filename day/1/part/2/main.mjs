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

console.log('Total fuel required:', total)