module.exports = class Program {
  constructor() {
    this.onOpcodeFunctions = {}
  }

  runOpcode(opcodes, index) {
    let { opcode, parameterModes } = this.parseOpcode(opcodes[index])

    this.checkIfOpcodeFunctionExists(opcode)

    let opcodeArgs = this.getOpcodeArgs(parameterModes, opcode, index, opcodes)

    let data = {
      opcode,
      opcodes,
      index,
    }

    this.onOpcodeFunctions[opcode].func(data, ...opcodeArgs)

    return index + this.onOpcodeFunctions[opcode].len + 1
  }

  parseOpcode(rawOpcode) {
    let opcode = +rawOpcode
      .toString()
      .slice(-2)
    
    let parameterModes = rawOpcode
      .toString()
      .split('')
      .slice(0, -2)
      .map(v => +v)
      .reverse()
    
    return {opcode, parameterModes}
  }

  checkIfOpcodeFunctionExists(opcode) {
    if (!this.onOpcodeFunctions[opcode]) {
      throw new TypeError('Invaild Opcode')
    }
  }

  getOpcodeArgs(parameterModes, opcode, index, opcodes) {
    let numberOfArgs = this.onOpcodeFunctions[opcode].len
    let firstArgIndex = index + 1
    let args = opcodes.slice(firstArgIndex, firstArgIndex + numberOfArgs)

    args = args.map((a, i) => ({ mode: parameterModes[i] || 0, value: +a }))
    
    return args;
  }

  run(opcodes) {
    let i = 0
    while (i < opcodes.length) {
      i = this.runOpcode(opcodes, i)
    }
  }

  on(opcode, func, numberOfArgs) {
    this.onOpcodeFunctions[opcode] = {func, len: numberOfArgs}
  }
}