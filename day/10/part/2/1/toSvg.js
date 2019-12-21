let input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map((v, y) => v
    .split('')
    .map((v, x) => [x, y, v])
  ).reduce((o, l) => {
    l.forEach(v => {
      o[`${v[0]},${v[1]}`] = v[2]
    })
    return o
  }, {})
function rect(x, y, w, h, fill) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"></rect>`
}
let svg = [`<svg>`]
for (let y = 0; y < 36; y += 1) {
  for (let x = 0; x < 36; x += 1) {
    svg.push(rect(x * 10 - 5, y * 10 - 5, 1, 1, input[`${x},${y}`] === '#' ? 'blue' : 'green'))
  }
}
svg.push('</svg>')

require('fs').writeFileSync('out.svg', svg.join(''))