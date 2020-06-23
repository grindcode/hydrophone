var test = require('tape')
var jsdom = require('jsdom')
require('jsdom-global')()
var hydrophone = require('../index.js')

// Force scroll event in order to force recalculation. Could also be `resize`.
function fireEvent () {
  var scrollEvent = window.document.createEvent('Event')
  scrollEvent.initEvent('scroll', true, true)
  window.dispatchEvent(scrollEvent)
}

// Sets window height in jsdom
function setViewportHeight (height) {
  window.innerHeight = height
  document.documentElement.clientWidth = height
}

function enableViewport () {
  // Default window height value in jsdom.
  // Any positive numeric value will do the trick.
  setViewportHeight(768)
}

function disableViewport () {
  // Falsy window height fakes element not being inside the viewport.
  setViewportHeight(false)
}

// Element does not need to be present in DOM.
// In jsdom, `getBoundingClientRect` will always return
// an object with zero values. https://github.com/tmpvar/jsdom/pull/689
var node = document.createElement('div')

test('element is in viewport', function (t) {
  t.plan(1)
  enableViewport()
  hydrophone.remove(node)
  hydrophone.add(node, {
    enters: function () {
      t.pass()
    }
  })
})

test('element is not in viewport', function (t) {
  t.plan(1)
  disableViewport()
  hydrophone.remove(node)
  hydrophone.add(node, {
    enters: function () {
      t.fail()
    }
  })
  t.pass()
})

test('element enters the viewport', function (t) {
  t.plan(1)
  disableViewport()
  hydrophone.remove(node)
  hydrophone.add(node, {
    enters: function () {
      t.pass()
    }
  })
  enableViewport()
  fireEvent()
})

test('element leaves the viewport', function (t) {
  t.plan(1)
  enableViewport()
  hydrophone.remove(node)
  hydrophone.add(node, {
    leaves: function () {
      t.pass()
    }
  })
  disableViewport()
  fireEvent()
})
