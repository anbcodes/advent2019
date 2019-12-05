module.exports = class Counter {
  constructor() {
    this.part1 = 0
    this.part2 = 0
  }

  run(n) {
    let isVaild = this.isVaild(n)
    if (isVaild.part1) {
      this.part1 += 1
    }
    if (isVaild.part2) {
      this.part2 += 1
    }
  }

  isVaild(number) {
    let isAcending = this.isAcending(number)
    let hasGroupOfSize = this.getGroupsOfSize(number)
    
    return {
      part1: hasGroupOfSize.any && isAcending,
      part2: hasGroupOfSize.two && isAcending
    }
  }

  isAcending(n) {
    return n.toString().split('').sort((a, b) => +a - +b).join('') === n.toString()
  }

  getGroupsOfSize(number) {
    let hasGroupOfSize = {}

    let strNum = number.toString()

    for (let i = 0; i < strNum.length; i += 1) {
      let digit = strNum[i]
      let prevDigit = strNum[i - 1]
      let nextDigit = strNum[i + 1]
      let prevPrevDigit = strNum[i - 2]
      if (digit === prevDigit) {
        let isOnlyToDigitsLong = digit !== nextDigit && digit !== prevPrevDigit

        if (isOnlyToDigitsLong) {
          hasGroupOfSize.two = true
        }
        hasGroupOfSize.any = true
      }
    }

    return hasGroupOfSize
  }
}