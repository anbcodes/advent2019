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
    this.Program.on(99, () => {}, opcodes.length + 1)

    this.Program.run(opcodes)
  }

  onAdd({ opcodes }, addend1Arg, addend2Arg, resultPos) {
    let addend1 = addend1Arg.mode === 0 ? opcodes[addend1Arg.value] : addend1Arg.value
    let addend2 = addend2Arg.mode === 0 ? opcodes[addend2Arg.value] : addend2Arg.value

    opcodes[resultPos.value] = addend1 + addend2

  }

  onMul({ opcodes }, factor1Arg, factor2Arg, resultPos) {
    let factor1 = factor1Arg.mode === 0 ? opcodes[factor1Arg.value] : factor1Arg.value
    let factor2 = factor2Arg.mode === 0 ? opcodes[factor2Arg.value] : factor2Arg.value

    opcodes[resultPos.value] = factor1 * factor2
  }

  onOutput({ opcodes }, valueArg) {
    let value = valueArg.mode === 0 ? opcodes[valueArg.value] : valueArg.value

    console.log(this.currentColor + String(value) + $.e)

    this.currentColor = this.currentColor === $.r ? $.g : $.r
  }

  onInput({ opcodes }, toWrite) {
    process.stdout.write(this.currentColor)    
    let value = +readLine.question('Input: ')
    process.stdout.write($.e)    

    opcodes[toWrite.value] = value

    this.currentColor = this.currentColor === $.r ? $.g : $.r
  }
}