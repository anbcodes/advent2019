let total = 0;
let number = 10000;
for(let x = 0; x < number; x++) {
  let start = process.hrtime()
  g=n=>Math.floor(+n/3)-2;String(require('fs').readFileSync('d')).split('\n').reduce((r, c)=>{while(g(c)>0) {r+=g(c);c=g(c)};return r}, 0)
  let end = process.hrtime(start)
  total += end[1] / 1000000
}

let time = parseFloat(total/number).toFixed(5)
let ops = parseFloat(1000/(total/number)).toFixed(0)
console.log(`Time: ${time}ms\nOp/s: ${ops}`)