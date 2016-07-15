# Hydrophone
[![Build Status](https://travis-ci.org/grindcode/hydrophone.svg?branch=master)](https://travis-ci.org/grindcode/hydrophone) [![Test Coverage](https://codeclimate.com/github/grindcode/hydrophone/badges/coverage.svg)](https://codeclimate.com/github/grindcode/hydrophone/coverage) [![Dependency Status](https://david-dm.org/grindcode/hydrophone.svg)](https://david-dm.org/grindcode/hydrophone) [![devDependency Status](https://david-dm.org/grindcode/hydrophone/dev-status.svg)](https://david-dm.org/grindcode/hydrophone#info=devDependencies)

Track when a DOM node enters or leaves the screen.

## Get Started
```bash
npm install hydrophone
```

## API
### add(node, events)
Start tracking a DOM node.
* `node`: DOM node object. (**Node**)
* `events`: Object, containing zero or more of the following properties:
  *  `appear`: Function called when the element enters the viewport. (**Function**)
  *  `disappear`: Function called when the element exits the viewport. (**Function**)

### remove(node)
Stop tracking a DOM node.
* `node`: DOM node object. (**Node**)

### Usage
```javascript
import { add, remove } from 'hydrophone'

var node = document.getElementById('node')
add(node, {
  onappear: () => {
    remove(node) // optional
  }
})

```

## License
See the [License](LICENSE) file.
