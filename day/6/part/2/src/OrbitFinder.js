module.exports = class OrbitFinder {
  constructor(input) {
    this.input = input
    this.objects = this.getObjectsWithDirectOrbits()
    this.getIndirectOrbitsForAllObjects()
  }

  getObjectsWithDirectOrbits() {
    let objects = {}

    for (let i = 0; i < this.input.length; i += 1) {
      let pair = this.input[i]

      this.createObjectIfNotExists(objects, pair)
      
      objects[pair[0]].orbiters.push(pair[1])
      objects[pair[1]].orbits.push(pair[0])

      objects[pair[0]].connections.push(pair[1])
      objects[pair[1]].connections.push(pair[0])

    }

    return objects
  }

  createObjectIfNotExists(objects, pair) {
    if (!objects[pair[0]]) {
      objects[pair[0]] = {orbits: [], orbiters: [], connections: []}
    }
    if (!objects[pair[1]]) {
      objects[pair[1]] = {orbits: [], orbiters: [], connections: []}
    }
  }

  getIndirectOrbitsForAllObjects() {
    let keys = Object.keys(this.objects)
    for (let i = 0; i < keys.length; i += 1) {
      let object = this.objects[keys[i]]
      this.addIndirectOrbits(object, keys[i])
    } 
  }

  addIndirectOrbits(object, key) {
    // console.log('adding indirect orbits', object, key)
    let orbitObject = this.objects[object.orbits[0]]
    if (object.indirectOrbits) {
      return
    }
    if (object.orbits.length === 0) {
      object.indirectOrbits = []
      return;
    }
    if (!orbitObject.indirectOrbits) {
      this.addIndirectOrbits(orbitObject, object.orbits[0])
    }
    object.indirectOrbits = [ ...orbitObject.indirectOrbits ]
    object.indirectOrbits.push(orbitObject.orbits[0])
    object.indirectOrbits = object.indirectOrbits.filter(v => v)
  }

  getPart1Count() {
    let count = 0
    Object.keys(this.objects).forEach(objectKey => {
      let object = this.objects[objectKey]
      count += object.indirectOrbits.length
      count += object.orbits.length
    })
    return count
  }
}

//start 1:30