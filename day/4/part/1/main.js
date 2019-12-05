let range = [387638, 919123]
let numberFound = 0
console.log(range[0] - range[1])
for (let x = range[0]; x < range[1]; x++) {
  let bigestDigit = 0
  let lastDigit = null
  let strNumber = x.toString()
  let found = false
  let failed = false
  for (let i = 0; i < strNumber.length; i++) {
    digit = +strNumber[i]
    if (digit < bigestDigit) {
      failed = true
      break;
    }
    if (digit > bigestDigit) {
      bigestDigit = digit
    }
    if (digit === lastDigit) {
      found = true
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
  if (found && !failed) {
    console.log(x)
    numberFound += 1
  } 
}

console.log(`Part 1: ${numberFound}`)