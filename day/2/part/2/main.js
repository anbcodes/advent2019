const fs = require('fs')
let file = fs.readFileSync('input.txt')
let inputOrg = file.toString().split(',')
inputOrg = inputOrg.map(v => +v)

function getValue(v1, v2, inputOrg) {
  let input = [ ...inputOrg ]
  input[1] = v1
  input[2] = v2
  for (let i = 0; i < input.length; i += 4) {
    if (input[i] === 1) {
      input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]]
    } else if (input[i] === 2) {
      input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]]
    } else if (input[i] === 99) {
      break;
    }
  }
  return input[0]
}

for (let x = 0; x < 100; x += 1) {
  for (let y = 0; y < 100; y += 1) {
    if (getValue(x, y, inputOrg) === 19690720) {
      console.log(`Value: noun=${x} verb=${y}`)
    }
  }
}