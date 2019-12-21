const OrbitFinder = require('./src/OrbitFinder')

const fs = require('fs')

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(v => v.split(')'))

const finder = new OrbitFinder(input)

// console.log(finder.objects)

console.log(finder.getPart1Count())