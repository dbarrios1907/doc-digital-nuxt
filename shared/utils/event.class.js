import { assign, defineProperty, defineProperties, readonlyDescriptor } from './object'

class BvEvent {
  constructor(type, eventInit = {}) {
    // Start by emulating native Event constructor
    if (!type) {
      /* istanbul ignore next */
      throw new TypeError(`Failed to construct '${this.constructor.name}'. 1 argument required, ${arguments.length} given.`)
    }

    // Merge defaults first, the eventInit, and the type last
    // so it can't be overwritten
    assign(this, BvEvent.Defaults, this.constructor.Defaults, eventInit, { type })

    // Freeze some props as readonly, but leave them enumerable
    defineProperties(this, {
      type: readonlyDescriptor(),
      cancelable: readonlyDescriptor(),
      nativeEvent: readonlyDescriptor(),
      target: readonlyDescriptor(),
      relatedTarget: readonlyDescriptor(),
      vueTarget: readonlyDescriptor(),
      componentId: readonlyDescriptor(),
    })

    // Create a private variable using closure scoping
    let defaultPrevented = false
    // Recreate preventDefault method. One way setter
    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true
      }
    }

    // Create `defaultPrevented` publicly accessible prop that
    // can only be altered by the preventDefault method
    defineProperty(this, 'defaultPrevented', {
      enumerable: true,
      get() {
        return defaultPrevented
      },
    })
  }

  // prevent storybook warnings
  // on actions event capture
  toJSON() {
    return {
      componentId: '[String]',
      defaultPrevented: '[Boolean] Capture preventDefault call within Component',
      nativeEvent: '[Browser Event]',
      preventDefault: '[Function] Call to prevent event execution',
      relatedTarget: '[DOMElement]',
      target: '[DOMElement]',
      type: '[EventType]',
      vueTarget: '[VueTarget]',
    }
  }

  static get Defaults() {
    return {
      type: '',
      cancelable: true,
      nativeEvent: null,
      target: null,
      relatedTarget: null,
      vueTarget: null,
      componentId: null,
    }
  }
}

// Named Exports
export default BvEvent
