module.exports = class PathFinder {
  constructor(objects) {
    this.objects = objects
  }

  findStepsBetween(o1, o2, prev = [], steps = 0) {
    let object = this.objects[o1]
    prev.push(o1)
    let leastInfo = 1e10
    for (let x = 0; x < object.connections.length; x += 1) {
      let connection = object.connections[x]
      if (connection === 'SAN') {
        return { type: 'found', value: steps }
      }
      if (!prev.includes(connection)) {
        let info = this.findStepsBetween(connection, o2, [...prev], steps + 1)
        if (info.type === 'found') {
          console.log('Step ' + steps + ': ' + connection)
          if (info.value < leastInfo) {
            leastInfo = info.value
          }
        }
      }
    }
    return { value: leastInfo }
  }
}