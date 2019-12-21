const OrbitFinder = require('./src/OrbitFinder')
const PathFinder = require('./src/PathFinder')

const fs = require('fs')

const input = fs
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(v => v.split(')'))

const finder = new OrbitFinder(input)
const pathFinder = new PathFinder(finder.objects)

console.log(pathFinder.findStepsBetween('YOU', 'SAN'))
// console.dir(finder.objects, { depth: null, maxArrayLength: null })

console.log(finder.getPart1Count())