const pulsar = require('tiny-pulsar')

// Registered beacons
let beacons = []
// Is a browser enviroment
const isBrowser = typeof window !== 'undefined'
// Namespace used for pulsar
const pulsarID = 'hydrophone'

// Add a beacon
function add (node, events) {
  if (!isBrowser) return
  const beacon = scanBeacon({
    node: node,
    enters: events.enters,
    leaves: events.leaves,
    visible: false
  })
  beacons = beacons.concat(beacon)
  register()
}

// Remove a beacon
function remove (node) {
  if (!isBrowser) return
  beacons = beacons.filter(function (item) {
    return item.node !== node
  })
  deregister()
}

function register () {
  if (beacons.length !== 1) return
  pulsar.register(pulsarID, function () {
    beacons = beacons.map(scanBeacon)
  })
}

function deregister () {
  if (beacons.length) return
  pulsar.deregister(pulsarID)
}

function scanBeacon (beacon) {
  var visible = isVisible(beacon)
  if (beacon.visible === visible) return beacon
  beacon.visible = visible
  if (visible && beacon.enters) {
    beacon.enters()
  } else if (!visible && beacon.leaves) {
    beacon.leaves()
  }
  return beacon
}

function isVisible (beacon) {
  if (!isBrowser) return false
  const rect = beacon.node.getBoundingClientRect()
  const height = window.innerHeight || document.documentElement.clientHeight
  const width = window.innerWidth || document.documentElement.clientWidth
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= height &&
    rect.right <= width
  )
}

module.exports = {
  add: add,
  remove: remove
}
