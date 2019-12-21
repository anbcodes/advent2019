const IntCodeComputer = require('@anbcodes/intcodecomputer')
const Jimp = require('jimp')

const Robot = require('./src/Robot')
const $ = require('./src/Colors')

let memory = require('fs').readFileSync('input.txt').toString().split(',').map(v => +v)

function addPicture() {

}

async function run() {
  let computer = new IntCodeComputer(memory, 'main', $.r, false)
  let robot = new Robot();
  let onDir = false;
  computer.addInputHandler((com) => com.stdin.push(robot.currentColor), 'in')
  computer.addOutputHandler((com, {}, value) => {
    if (onDir) {
      robot.turn(value.value)
      robot.move()
      onDir = false
    } else {
      robot.paint(value.value)
      addPicture(robot.wall)
      onDir = true
    }
  }, 'out')

  await computer.run()
  console.log([...robot.painted].length)
  console.log('done')
}

run()