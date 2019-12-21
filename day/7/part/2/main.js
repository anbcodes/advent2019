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
    computers[0].stdin.splice(0, 0, value.value)
    return;
  }
  computers[computer.id + 1].stdin.splice(0, 0, value.value)

}

let input = require('fs').readFileSync('input.txt').toString().split(',').map(v => +v)
let greatest = 0
async function run() {
  console.time('test')
  let permutations = permute([5, 6, 7, 8, 9])
  for (let x = 0; x < permutations.length; x += 1) {
    let permutation = permutations[x]
    computers = []
    let promises = []
    for (let i = 0; i < 5; i += 1) {
      computers.push(new IntCodeComputer(input, i, $.a[i], true))
      computers[i].stdin.push(+permutation[i])
      computers[i].customOnOutput = onOutput
    }
    for (let i = 0; i < 5; i += 1) {
      if (i === 0) {
        computers[0].stdin.splice(0, 0, 0)
      }
      promises.push(computers[i].run())
    }
    await Promise.all(promises)
    if (+computers[4].stdout.slice(-1)[0] > greatest) {
      greatest = +computers[4].stdout.slice(-1)[0]
    }
  }
  console.timeEnd('test')
  console.log($.r + 'Output: ' + $.g + greatest)
}

run()

