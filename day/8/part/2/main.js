const input = require('fs').readFileSync('input.txt').toString()

let layers = []

let curr = []
let nums = new Array(10).fill(0)
console.log(input.length / (25 * 6))
for (let x = 0; x < input.length; x += 1) {
  if (x % (25 * 6) === 0) {
    layers.push({value: curr.join(''), count: [...nums]})
    nums = new Array(10).fill(0)
    curr = []
  }
  nums[+input[x]] += 1
  curr.push(input[x])
}

layers.push({value: curr.join(''), count: [...nums]})
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

let joinedLayer = []

for (let x = 0; x < (25 * 6); x += 1) {
  let v;
  let layersV = []
  for (let i = 0; i < layers.length ; i += 1) {
    layersV.push(+layers[i].value[x])
    if (+layers[i].value[x] === 0) {
      v = 0
      break;
    } else if (+layers[i].value[x] === 1) {
      v = 1
      break;
    } else if (+layers[i].value[x] === 2) {
      v = 2;
      continue;
    }
  }
  if (v === 2) {
    console.log('!found:', x, layersV, layersV.length)
  }
  joinedLayer.push(v)
}

let toLog = ''

for (let x = 0; x < joinedLayer.length; x += 1) {
  if (x % 25 === 0) {
    toLog += `${joinedLayer.slice(x, x + 25).join('')}\n`
  }
}

console.log('Part 2')
console.log(toLog)
console.log(joinedLayer)

const Jimp = require('jimp');

let image = new Jimp(25, 6, function (err, image) {
  if (err) throw err;

  toLog.split('\n').forEach((row, y) => {
    row.split('').forEach((color, x) => {
      if (+color === 0) {
        image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), x, y);
      }
      if (+color === 1) {
        image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), x, y);
      }
      if (+color === 2) {
        image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 0), x, y);
      }
    });
  });

  image.write('test.png', (err) => {
    if (err) throw err;
  });
});
