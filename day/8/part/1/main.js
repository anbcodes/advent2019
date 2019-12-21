const input = require('fs').readFileSync('input.txt').toString()

let layers = []

let curr = []
let nums = new Array(10).fill(0)
for (let x = 0; x < input.length; x += 1) {
  if (x % (25 * 6) === 0) {
    layers.push({value: curr.join(''), count: [...nums]})
    nums = new Array(10).fill(0)
    curr = []
  }
  nums[+input[x]] += 1
  curr.push(input[x])
}

layers.splice(0, 1)

let fewestLayer = {count: [1e10]}

for (let y = 0; y < layers.length; y += 1) {
  if (layers[y].count[0] < fewestLayer.count[0]) {
    fewestLayer = layers[y]
  }
}

let str = layers.map(v => v.value).join('\n')
require('fs').writeFileSync('out.txt', str)

console.log(fewestLayer)
console.log('Part 1:', fewestLayer.count[1] * fewestLayer.count[2])