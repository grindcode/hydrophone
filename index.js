var pulsar = require('tiny-pulsar')

// Registered beacons
var beacons = []
// Is a browser enviroment
var isBrowser = typeof window !== "undefined"
// Namespace used for pulsar
var pulsarID = "hydrophone"

// Add a beacon
var add = function (node, events) {
  if (!isBrowser) return
  var beacon = scanBeacon({
    node: node,
    enters: events.enters,
    leaves: events.leaves,
    visible: false,
  })
  beacons = beacons.concat(beacon)
  register()
}

// Remove a beacon
var remove = function (node) {
  if (!isBrowser) return
  beacons = beacons.filter(function (item) {
    return item.node !== node
  })
  deregister()
}

var register = function () {
  if (beacons.length !== 1) return
  pulsar.register(pulsarID, function () {
    beacons = beacons.map(scanBeacon)
  })
}

var deregister = function () {
  if (beacons.length) return
  pulsar.deregister(pulsarID)
}

var scanBeacon = function (beacon) {
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

var isVisible = function (beacon) {
  if (!isBrowser) return false
  var rect = beacon.node.getBoundingClientRect()
  var height = window.innerHeight || document.documentElement.clientHeight
  var width = window.innerWidth || document.documentElement.clientWidth
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= height &&
    rect.right <= width
  )
}

module.exports = {
  add: add,
  remove: remove,
}
