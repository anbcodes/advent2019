const Program = require('./Program')
const $ = require('./Colors')
const readLine = require('readline-sync')

module.exports = class IntcodeComputer {
  constructor(opcodes) {
    this.currentColor = $.r
    this.Program = new Program()
    this.Program.on(1, this.onAdd.bind(this), 3)
    this.Program.on(2, this.onMul.bind(this), 3)
    this.Program.on(3, this.onInput.bind(this), 1)
    this.Program.on(4, this.onOutput.bind(this), 1)
    this.Program.on(5, this.onJumpIfTrue.bind(this), 2)
    this.Program.on(6, this.onJumpIfFalse.bind(this), 2)
    this.Program.on(7, this.onIsLessThen.bind(this), 3)
    this.Program.on(8, this.onIsEqualTo.bind(this), 3)


    this.Program.on(99, () => opcodes.length + 1, 1)

    this.Program.run(opcodes)
  }

  onAdd({ opcodes, index }, addend1Arg, addend2Arg, resultPos) {
    let addend1 = addend1Arg.mode === 0 ? opcodes[addend1Arg.value] : addend1Arg.value
    let addend2 = addend2Arg.mode === 0 ? opcodes[addend2Arg.value] : addend2Arg.value

    opcodes[resultPos.value] = addend1 + addend2
    return index + 4

  }

  onMul({ opcodes, index }, factor1Arg, factor2Arg, resultPos) {
    let factor1 = factor1Arg.mode === 0 ? opcodes[factor1Arg.value] : factor1Arg.value
    let factor2 = factor2Arg.mode === 0 ? opcodes[factor2Arg.value] : factor2Arg.value

    opcodes[resultPos.value] = factor1 * factor2

    return index + 4
  }

  onOutput({ opcodes, index }, valueArg) {
    let value = valueArg.mode === 0 ? opcodes[valueArg.value] : valueArg.value

    console.log(this.currentColor + String(value) + $.e)

    this.currentColor = this.currentColor === $.r ? $.g : $.r

    return index + 2
  }

  onInput({ opcodes, index }, toWrite) {
    process.stdout.write(this.currentColor)    
    let value = +readLine.question('Input: ')
    process.stdout.write($.e)    

    opcodes[toWrite.value] = value

    this.currentColor = this.currentColor === $.r ? $.g : $.r

    return index + 2
  }

  onJumpIfTrue({ opcodes, index }, valueArg, jumpPosArg) {
    let value = valueArg.mode === 0 ? opcodes[valueArg.value] : valueArg.value
    let jumpPos = jumpPosArg.mode === 0 ? opcodes[jumpPosArg.value] : jumpPosArg.value

    if (value !== 0) {
      return jumpPos
    } else {
      return index + 3
    }
  }

  onJumpIfFalse({ opcodes, index }, valueArg, jumpPosArg) {
    let value = valueArg.mode === 0 ? opcodes[valueArg.value] : valueArg.value
    let jumpPos = jumpPosArg.mode === 0 ? opcodes[jumpPosArg.value] : jumpPosArg.value

    if (value === 0) {
      return jumpPos
    } else {
      return index + 3
    }
  }

  onIsLessThen({ opcodes, index }, n1Arg, n2Arg, output) {
    let n1 = n1Arg.mode === 0 ? opcodes[n1Arg.value] : n1Arg.value
    let n2 = n2Arg.mode === 0 ? opcodes[n2Arg.value] : n2Arg.value

    if (n1 < n2) {
      opcodes[output.value] = 1
    } else {
      opcodes[output.value] = 0
    }
    return index + 4
  }

  onIsEqualTo({ opcodes, index }, n1Arg, n2Arg, output) {
    let n1 = n1Arg.mode === 0 ? opcodes[n1Arg.value] : n1Arg.value
    let n2 = n2Arg.mode === 0 ? opcodes[n2Arg.value] : n2Arg.value

    if (n1 === n2) {
      opcodes[output.value] = 1
    } else {
      opcodes[output.value] = 0
    }
    return index + 4
  }
}