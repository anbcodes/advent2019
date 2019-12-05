const Computer = require('./src/IntcodeComputer')

const fs = require('fs')

const input = fs.readFileSync('input.txt').toString().split(',').map(v => +v)

const myComputer = new Computer(input)