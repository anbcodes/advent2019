import fs from 'fs'

let file = fs.readFileSync('./data.txt')
let masses = file.toString().split('\n')
let total = 0


masses.forEach(massStr => {
  let mass = +massStr
  total += Math.floor(mass/3) - 2
})

console.log('Total fuel required:', total)