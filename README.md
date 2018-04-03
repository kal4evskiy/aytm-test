# aytm-test

## Install and start

* git clone `git@github.com:kal4evskiy/aytm-test.git`
* cd aytm-test
* npm install
* npm start
* visit `http://localhost:8080/`
* to run tests: npm test



## Task

#### 1. Implement simple immutable Map class

##### Description

'Immutable Map' will be called 'IMap' in the following task description.

```
class IMap {
  static of(source)
  set(key, value)
  get(key)
  delete(key)
  map( (key, value) => value )
}
```

IMap object holds key-value pairs.
Any value (both objects and primitive values) may be used as either a key or a value.
Changes to IMap should produce a new IMap object that holds the same values as original IMap for pairs that are not changed and new values for pairs that was added/updated.
Removing by key from IMap should produce a new IMap object that holds the same key-value pairs except for removed pair
In any case existing IMap object should not be changed by any operations.

* `IMap.of(source)` should build a new `IMap` object from it's argument
`source` can be of type:
    * `object` - build IMap's key-value pairs from provided object (in this case keys are strings)
    * `[ [key, value], [key, value], ... ]` - build IMap from provided key-value pairs

* `map.set(key, value)` should return a new `IMap` object with updated / added key-value pair

* `map.get(key)` should return value assigned to provided key or `undefined` if key is not in the IMap

* `map.delete(key)` should return a new `IMap` object with removed key-value pair (if it exists in the IMap) or the same IMap object if key is not in the IMap.

* `map.map( (value, key) => value )` should return a new `IMap` object with values mapped by provided mapper function

##### Environment

* Use Node.JS or any browser for implementation
* You can use any of ES6 or later features, including experimental
* Solution should be covered by tests
* No external dependencies should be required by the IMap class itself
* You can use any node modules to compile source (i.e. babel, webpack)


##### Additional (not required, but welcomed)

* Make sure `IMap` is extendable. For example - create `class MapStr extends IMap` that converts all values you passе to it to strings by `.toString()`.
* Implement `.getIn(path: Array)` method that fethes value from nested Maps.
* Implement `.setIn(path: Array, value)` method that sets value in nested Maps and create Maps for missing path parts.
* Implement `.deleteIn(path: Array, value)` method that removes key-value pair in nested IMap. If there is no value in path - return the same IMap object.



------------------------------
#### 2. Implement linked React components

##### Description

Giving we have following React components:

```
class Container extends Component {
  state = {
    shown: true
  }
  componentWillMount() {
    this.setState({shown: true})
  }
  render() {
    const { children } = this.props
  const { shown } = this.state
    return shown ? children : null
  }
}

class Hide extends Component {
  hideContainer() {
    // ...
  }
  this.hideContainer = this.hideContainer.bind(this)

  render() {
    const { children } = this.props
    return (<span onClick={this.hideContainer}>{children}</span>)
  }
}

```

modify components in a way that clicking on `<Hide>` component that is inside `<Container>` component makes `Container.render` return `null`

`<Hide>` could be in any place and any level deep inside `<Container>` or it could be no `<Hide>` at all.

Examples:

```
<Container>
  Don't forget to kill all humans! <Hide>(close)</Hide>
</Container>

<Container>
  <ul>
    <li><b>Phase 1</b>: Write some code</li>
    <li>???</li>
    <li><b>Phase 3</b>: Profit</li>
    <li><Hide>or forget it and live a full life</Hide></li>
  </ul>
</Container>

<Container>
  What has been seen cannot be unseen!
</Container>
```


##### Environment

* Use any browser for implementation
* Solution should not use any external dependencies except for core React libraries
* Do not use any state management (i.e. Redux, Flux)



------------------------------
#### 3. Implement dragging functionality using RxJS

##### RxJS
(http://reactivex.io/rxjs)

##### Description

Using the following HTML and CSS sources

HTML:
```
<html><body>
  <div id="target"></div>
</body></html>
```

CSS:
```
#target { position: absolute; top: 50vh; left: 50vw; width: 40px; height: 40px; background: #FF5050; border-radius: 25px; border: 2px solid #FF9933; cursor: pointer }
```

implement JS code using RxJS that makes `#target` draggable by mouse

Dragging:
* when mouse button is pressed on target is should start following mouse cursor
* when mouse button is released target should stop following mouse cursor
* when target is following mouse cursor and mouse cursor is moved outside of the window - target should stop following mouse cursor

Snap to grid:
* when Shift key is pressed during dragging target should still follow mouse cursor but snap to 20px x 20px grid
* when Shift key is released during dragging target should continue following mouse cursor without snapping to grid

Snap to grid should be independent from mouse moves:
* if Shift key is pressed during dragging and mouse is not moving - snap target to grid immediately
* if Shift key is released during dragging and mouse is not moving - move target under mouse cursor immediately


##### Environment

* Use any browser for implementation
* Solution should not use any external dependencies except for RxJS library
