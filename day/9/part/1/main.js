const IntCodeComputer = require('./src/IntcodeComputer')
const $ = require('./src/Colors')

let memory = require('fs').readFileSync('input.txt').toString().split(',').map(v => +v)

async function run() {
  let computer = new IntCodeComputer(memory, 'main', $.r, false)
  computer.stdin.push(2)
  await computer.run()
  console.log('done')
}

run()