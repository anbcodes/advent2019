const fs = require('fs')

let file = String(fs.readFileSync('data.txt'))

let total = 0
const current = []

for (let x = 0; x < file.length; x += 1) {
  let char = file[x]
  if (char === '\n' && file[x + 1]) {
    let num = +current.join('')
    for (;Math.floor(num/3)-2 > 0;num = Math.floor(num/3)-2) {
      total += Math.floor(num/3)-2
    }
    current.length = 0
  } else {
    current.push(char)
  }
}

console.log(total)