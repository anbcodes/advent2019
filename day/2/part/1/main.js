const fs = require('fs')
let file = fs.readFileSync('input.txt')
let input = file.toString().split(',')
input = input.map(v => +v)

input[1] = 12
input[2] = 2

for (let i = 0; i < input.length; i += 4) {
  if (input[i] === 1) {
    input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]]
  } else if (input[i] === 2) {
    input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]]
  } else if (input[i] === 99) {
    break;
  }
}

console.log('The value is:', input[0])