let range = [387638, 919123]
let numberFound = 0
let found = []
console.log(range[0] - range[1])
for (let x = range[0]; x <= range[1]; x++) {
  let bigestDigit = 0
  let strNumber = x.toString()
  let groups = {}
  let failed = false
  let repeatNumber = 0
  for (let i = 0; i < strNumber.length; i++) {
    digit = +strNumber[i]
    if (digit < bigestDigit) {
      failed = true
      break;
    }
    if (digit > bigestDigit) {
      bigestDigit = digit
      repeatNumber = 0
    }
    if (digit === +strNumber[i - 1]) {
      repeatNumber += 1
    }

    if (repeatNumber) {
      if (+strNumber[i + 1] !== digit) {
        groups[repeatNumber] = groups[repeatNumber] + 1 || 1
      }
    }

    lastDigit = digit
  }
  // console.log()
  // if (!failed) {
  //   console.log('failed = false')
  // }
  // if (found) {
  //   console.log('found = true')
  // }
  // console.log('outer')
  let keys = Object.keys(groups)
  if (found && !failed && groups['1']) {
    console.log(x)
    found.push([x, groups])
    numberFound += 1
  } 
}
// console.log(require('fs').writeFileSync('out.json', JSON.stringify(found, undefined, 2)))
// console.log(found)
console.log(`Part 1: ${numberFound}, ${found.length}`)