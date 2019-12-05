const Counter = require('./Counter')


module.exports = class PasswordCounter {
  constructor(range) {
    this.range = range
    this.counts = this.getCounts()
  }

  getCounts() {
    let counts = new Counter()
    for (let n = this.range[0]; n <= this.range[1]; n += 1) {
      counts.run(n)
    }
    return counts
  }
}