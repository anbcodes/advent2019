const IntcodeComputer = require('@anbcodes/intcodecomputer')
const Jimp = require('jimp')
const readLineSync = require('readline-sync')

let fs = require('fs')
let codes = fs.readFileSync('input.txt').toString().split(',').map(v => +v)

let screen = {}

let output = []

function toStr(x, y) {
  if (typeof x === 'number') {
    return `${x},${y}`
  }
  if (typeof x === 'object') {
    if (x.x) {
      return `${x.x},${x.y}`
    } else if (x[0]) {
      return `${x[0]},${x[1]}`
    }
  }
  
}

let score = 0;
let ballPos = {};
let paddlePos = {};

function onOutput(computer, {}, value) {
  output.push(value.value)
  if (output.length === 3) {
    if (+output[0] === -1) {
      score = output[2]
    }
    if (+output[2] === 4) {
      draw()
      ballPos = {x: output[0], y: output[1]}
    }
    if (+output[2] === 3) {
      draw()
      paddlePos = {x: output[0], y: output[1]}
    }
    screen[toStr(output)] = output[2]
    output = []
  }
}

function onInput(computer, {}) {
  return new Promise((resolve) => {
    if (ballPos.x < paddlePos.x) {
      computer.stdin.push(-1)
    }
    if (ballPos.x > paddlePos.x) {
      computer.stdin.push(1)
    }
    if (ballPos.x === paddlePos.x) {
      computer.stdin.push(0)
    }
    resolve()
  })
}

let scale = 12

function setBigPixel(image, color, x, y) {
  for (let x2 = 0; x2 < scale; x2 += 1) {
    for (let y2 = 0; y2 < scale; y2 += 1) {
      image.setPixelColor(Jimp.rgbaToInt(...color), x * scale + x2, y * scale + y2)
    }
  } 
}

let computer = new IntcodeComputer(codes, 'main')
computer.addOutputHandler(onOutput, 'out')
computer.addInputHandler(onInput, 'in');
computer.run()

let frameNum = 0
function draw() {
  let blockCount = 0;
  let image = new Jimp(37 * scale, 24 * scale, async (er, image) => {
    for (let y = 0; y < 24; y += 1) {
      for (let x = 0; x < 37; x += 1) {
        switch (+screen[toStr(x, y)]) {
          case 0:
            setBigPixel(image, [0, 0, 0, 255], x, y)
            break;
          case 1:
            setBigPixel(image, [255, 255, 255, 255], x, y)
            break;
          case 2:
            setBigPixel(image, [0, 0, 255, 255], x, y)
            blockCount += 1
            break;
          case 3:
            setBigPixel(image, [255, 0, 0, 255], x, y)
            break;
          case 4:
            setBigPixel(image, [0, 255, 0, 255], x, y) 
            break;
          default:
            setBigPixel(image, [0, 0, 0, 0], x, y)
        } 
      }
    }
    
    process.stdout.write(`\rScore, count: ${score}, ${blockCount}`)
    let padToFour = number => number <= 99999 ? `0000${number}`.slice(-5) : number;
    image.write(`images/${padToFour(frameNum)}.png`, (err) => {
      if (err) throw err;
    });
    frameNum += 1
  })
}

// setInterval(() => {
//   draw()
// }, 500)