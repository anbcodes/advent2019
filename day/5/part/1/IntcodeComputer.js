const Opcode = require('./Opcode')

module.exports = class IntcodeComputer {
  constructor() {

  }

  runProgram(opcodes) {
    let i = 0
    while (i < opcodes.length) {
      let opcode = new Opcode(opcodes, i)
      opcode.run()
      i += opcode.len
    }
  }
}