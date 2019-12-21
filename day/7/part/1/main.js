const IntCodeComputer = require('./src/IntcodeComputer')
const $ = require('./src/Colors')

let computers = []

function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function onOutput(computer, {}, value) {
  if (!computers[computer.id + 1]) {
    console.log($.g + 'Part 1:' + $.r + value.value)
    return;
  }
  console.log('adding to stdin', value.value)
  computers[computer.id + 1].stdin.push(value.value)
}

let input = require('fs').readFileSync('input.txt').toString().split(',').map(v => +v)
let greatest = 0
console.time('test')
permute([0, 1, 2, 3, 4]).forEach(permutation => {
  computers = []
  for (let i = 0; i < 5; i += 1) {
    computers.push(new IntCodeComputer(input, i, $.a[i], true))
    computers[i].stdin.push(computers[i - 1] ? +computers[i - 1].stdout[0] : 0)
    // console.log(computers[i - 1] ? computers[i - 1].stdout[0] : 0)
    // console.log(permutation)
    computers[i].stdin.push(+permutation[i])
    computers[i].run()
  }
  // computers[4].run()
  console.log(computers[4])
  if (+computers[4].stdout[0] > greatest) {
    greatest = +computers[4].stdout[0]
  }
})

console.timeEnd('test')

console.log($.r + 'Output: ' + $.g + greatest)
