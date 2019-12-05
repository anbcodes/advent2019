const PasswordCounter = require('./src/PasswordCounter')

let counter = new PasswordCounter([387638, 919123])

let $ = require('./src/Colors')

console.log(
`${$.r}Part 1: ${$.g}${counter.counts.part1}
${$.g}Part 2: ${$.r}${counter.counts.part2}`
)