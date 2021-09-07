/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dat.gui/build/dat.gui.module.js":
/*!******************************************************!*\
  !*** ./node_modules/dat.gui/build/dat.gui.module.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "color": () => (/* binding */ color),
/* harmony export */   "controllers": () => (/* binding */ controllers),
/* harmony export */   "dom": () => (/* binding */ dom$1),
/* harmony export */   "gui": () => (/* binding */ gui),
/* harmony export */   "GUI": () => (/* binding */ GUI$1),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return obj instanceof Function;
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);
//# sourceMappingURL=dat.gui.module.js.map


/***/ }),

/***/ "./node_modules/gl-matrix/esm/common.js":
/*!**********************************************!*\
  !*** ./node_modules/gl-matrix/esm/common.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EPSILON": () => (/* binding */ EPSILON),
/* harmony export */   "ARRAY_TYPE": () => (/* binding */ ARRAY_TYPE),
/* harmony export */   "RANDOM": () => (/* binding */ RANDOM),
/* harmony export */   "setMatrixArrayType": () => (/* binding */ setMatrixArrayType),
/* harmony export */   "toRadian": () => (/* binding */ toRadian),
/* harmony export */   "equals": () => (/* binding */ equals)
/* harmony export */ });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

/***/ }),

/***/ "./node_modules/gl-matrix/esm/mat4.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/mat4.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "transpose": () => (/* binding */ transpose),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "adjoint": () => (/* binding */ adjoint),
/* harmony export */   "determinant": () => (/* binding */ determinant),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "fromTranslation": () => (/* binding */ fromTranslation),
/* harmony export */   "fromScaling": () => (/* binding */ fromScaling),
/* harmony export */   "fromRotation": () => (/* binding */ fromRotation),
/* harmony export */   "fromXRotation": () => (/* binding */ fromXRotation),
/* harmony export */   "fromYRotation": () => (/* binding */ fromYRotation),
/* harmony export */   "fromZRotation": () => (/* binding */ fromZRotation),
/* harmony export */   "fromRotationTranslation": () => (/* binding */ fromRotationTranslation),
/* harmony export */   "fromQuat2": () => (/* binding */ fromQuat2),
/* harmony export */   "getTranslation": () => (/* binding */ getTranslation),
/* harmony export */   "getScaling": () => (/* binding */ getScaling),
/* harmony export */   "getRotation": () => (/* binding */ getRotation),
/* harmony export */   "fromRotationTranslationScale": () => (/* binding */ fromRotationTranslationScale),
/* harmony export */   "fromRotationTranslationScaleOrigin": () => (/* binding */ fromRotationTranslationScaleOrigin),
/* harmony export */   "fromQuat": () => (/* binding */ fromQuat),
/* harmony export */   "frustum": () => (/* binding */ frustum),
/* harmony export */   "perspective": () => (/* binding */ perspective),
/* harmony export */   "perspectiveFromFieldOfView": () => (/* binding */ perspectiveFromFieldOfView),
/* harmony export */   "ortho": () => (/* binding */ ortho),
/* harmony export */   "lookAt": () => (/* binding */ lookAt),
/* harmony export */   "targetTo": () => (/* binding */ targetTo),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "frob": () => (/* binding */ frob),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiplyScalar": () => (/* binding */ multiplyScalar),
/* harmony export */   "multiplyScalarAndAdd": () => (/* binding */ multiplyScalarAndAdd),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "sub": () => (/* binding */ sub)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "./node_modules/gl-matrix/esm/vec3.js":
/*!********************************************!*\
  !*** ./node_modules/gl-matrix/esm/vec3.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "fromValues": () => (/* binding */ fromValues),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "subtract": () => (/* binding */ subtract),
/* harmony export */   "multiply": () => (/* binding */ multiply),
/* harmony export */   "divide": () => (/* binding */ divide),
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "squaredDistance": () => (/* binding */ squaredDistance),
/* harmony export */   "squaredLength": () => (/* binding */ squaredLength),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "inverse": () => (/* binding */ inverse),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "cross": () => (/* binding */ cross),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "hermite": () => (/* binding */ hermite),
/* harmony export */   "bezier": () => (/* binding */ bezier),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "transformMat4": () => (/* binding */ transformMat4),
/* harmony export */   "transformMat3": () => (/* binding */ transformMat3),
/* harmony export */   "transformQuat": () => (/* binding */ transformQuat),
/* harmony export */   "rotateX": () => (/* binding */ rotateX),
/* harmony export */   "rotateY": () => (/* binding */ rotateY),
/* harmony export */   "rotateZ": () => (/* binding */ rotateZ),
/* harmony export */   "angle": () => (/* binding */ angle),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "str": () => (/* binding */ str),
/* harmony export */   "exactEquals": () => (/* binding */ exactEquals),
/* harmony export */   "equals": () => (/* binding */ equals),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "sqrDist": () => (/* binding */ sqrDist),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "sqrLen": () => (/* binding */ sqrLen),
/* harmony export */   "forEach": () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/esm/common.js");

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__.ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__.RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "./src/glCapsule.ts":
/*!**************************!*\
  !*** ./src/glCapsule.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "glCapsule": () => (/* binding */ glCapsule)
/* harmony export */ });
var glCapsule = /** @class */ (function () {
    function glCapsule() {
        this.lastMilliseconds = 0;
        this.fps = 0;
        this.errorContainer = document.querySelector("#errormsg");
        this.canvas = document.querySelector("#c");
        this.gl = this.canvas.getContext("webgl2");
        if (!this.gl) {
            var msg = "Fatal error: WebGL2 not available. Please check your browser's compatibility.";
            alert("WebGL2 not available");
            this.displayError(msg);
            throw new Error(msg);
        }
        console.log("Got WebGL2");
        this.canvas.addEventListener("mousemove", this.updateMouseCoords.bind(this));
    }
    glCapsule.prototype.displayError = function (msg) {
        this.errorContainer.innerHTML = msg;
    };
    glCapsule.prototype.updateMouseCoords = function (event) {
        this.gl.uniform2f(this.uniformLoc("u_mouse"), event.clientX, event.clientY);
    };
    glCapsule.prototype.uniformLoc = function (name) {
        return this.gl.getUniformLocation(this.program, name);
    };
    glCapsule.prototype.createShader = function (type, src) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, src);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            var msg = "Cannot create shader of type " + type + "\n" +
                this.gl.getShaderInfoLog(shader);
            this.displayError(msg);
            this.gl.deleteShader(shader);
            throw new Error(msg);
        }
        return shader;
    };
    glCapsule.prototype.updateUniform1f = function (name) {
        var _this = this;
        return function (value) {
            _this.gl.uniform1f(_this.uniformLoc(name), value);
        };
    };
    glCapsule.prototype.updateUniform2f = function (name) {
        var _this = this;
        return function () {
            _this.gl.uniform2f(_this.uniformLoc(name), _this.parameters[name].x, _this.parameters[name].y);
        };
    };
    glCapsule.prototype.updateUniform3f = function (name) {
        var _this = this;
        return function () {
            _this.gl.uniform3f(_this.uniformLoc(name), _this.parameters[name].x, _this.parameters[name].y, _this.parameters[name].z);
        };
    };
    glCapsule.prototype.createAndLinkProgram = function (vertexShader, fragmentShader) {
        var prog = this.gl.createProgram();
        this.gl.attachShader(prog, vertexShader);
        this.gl.attachShader(prog, fragmentShader);
        this.gl.linkProgram(prog);
        if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
            var msg = "Cannot create WebGL2 program\n" + this.gl.getProgramInfoLog(prog);
            this.displayError(msg);
            this.gl.deleteProgram(prog);
            throw new Error(msg);
        }
        console.log("WebGL2 program created and linked without errors");
        return prog;
    };
    glCapsule.prototype.toggleFullscreen = function (fs) {
        this.canvas.width = fs ? window.innerWidth : 800;
        this.canvas.height = fs ? window.innerHeight : 600;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.uniform2f(this.uniformLoc("u_resolution"), this.canvas.width, this.canvas.height);
    };
    glCapsule.prototype.updateFps = function (milliseconds) {
        // console.debug("updateFps(%d)", milliseconds);
        if (milliseconds - this.lastMilliseconds >= 1000) {
            document.getElementById("fps").innerHTML = (this.fps + 1).toString();
            this.lastMilliseconds = milliseconds;
            this.fps = 0;
        }
        else {
            this.fps++;
        }
    };
    return glCapsule;
}());



/***/ }),

/***/ "./src/shaders/pointcloud-fragment.glsl":
/*!**********************************************!*\
  !*** ./src/shaders/pointcloud-fragment.glsl ***!
  \**********************************************/
/***/ ((module) => {

module.exports = "#version 300 es\n\nprecision highp float;\n\nin float zNorm;\nuniform float u_time;\nout vec4 outColor;\n\n\nvoid main(void){\n  outColor = vec4(1.-zNorm/2.);\n}";

/***/ }),

/***/ "./src/shaders/pointcloud-vertex.glsl":
/*!********************************************!*\
  !*** ./src/shaders/pointcloud-vertex.glsl ***!
  \********************************************/
/***/ ((module) => {

module.exports = "#version 300 es\n\nprecision highp float;\n\nuniform mat4 u_matrix;\nin vec4 coordinates;\nout float zNorm;\n\nvoid main(void) {\n  gl_Position = u_matrix * coordinates;\n  zNorm = gl_Position.z/gl_Position.w;\n  gl_PointSize = .5 + 3.5*abs(zNorm);\n}";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/pointcloud.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pointcloud": () => (/* binding */ Pointcloud)
/* harmony export */ });
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dat.gui */ "./node_modules/dat.gui/build/dat.gui.module.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/mat4.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/esm/vec3.js");
/* harmony import */ var _glCapsule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glCapsule */ "./src/glCapsule.ts");
/* harmony import */ var _shaders_pointcloud_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/pointcloud-fragment.glsl */ "./src/shaders/pointcloud-fragment.glsl");
/* harmony import */ var _shaders_pointcloud_vertex_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shaders/pointcloud-vertex.glsl */ "./src/shaders/pointcloud-vertex.glsl");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





/**
 * Point cloud
 */
var POINT_COUNT = 500;
var Pointcloud = /** @class */ (function (_super) {
    __extends(Pointcloud, _super);
    function Pointcloud() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Parameters handled by Dat.gui widgets
        _this.parameters = {
            fullscreen: false,
            // Frustum variables
            F_near: 10.0,
            F_far: 250.0,
            F_bottom: -6.0,
            F_top: 6.0,
            F_left: 0,
            F_right: 0,
            scale: 50,
            translate: -100,
        };
        // Cubo di lato 2 centrato in zero
        // coordinates = [0.02083333395421505, 16.66666603088379, -160.77694702148438, -150]; // -.1, -.1, 10, 0, .999, 10.5];
        _this.coordinates = new Array(POINT_COUNT * 3);
        return _this;
    }
    Pointcloud.prototype.drawScene = function (milliseconds) {
        var _this = this;
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.useProgram(this.program);
        this.gl.bindVertexArray(this.vao);
        var offset = 0;
        // N. di punti
        var count = POINT_COUNT;
        this.gl.drawArrays(this.gl.POINTS, offset, count);
        // Aggiorna le variabili uniform
        this.setMatrix(milliseconds);
        this.gl.uniform1f(this.uniformLoc("u_time"), milliseconds);
        window.requestAnimationFrame(function (m) {
            _this.drawScene(m);
            _this.updateFps(m);
        });
    };
    Pointcloud.prototype.setMatrix = function (milliseconds) {
        var m = gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__.translate(m, m, gl_matrix__WEBPACK_IMPORTED_MODULE_5__.fromValues(0, 0, this.parameters.translate));
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__.scale(m, m, gl_matrix__WEBPACK_IMPORTED_MODULE_5__.fromValues(this.parameters.scale, this.parameters.scale, this.parameters.scale));
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__.rotateY(m, m, milliseconds / 3000);
        this.projMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_4__.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__.frustum(this.projMatrix, this.parameters.F_left, this.parameters.F_right, this.parameters.F_bottom, this.parameters.F_top, this.parameters.F_near, this.parameters.F_far);
        this.projMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_4__.multiply(this.projMatrix, this.projMatrix, m);
        this.gl.uniformMatrix4fv(this.uniformLoc("u_matrix"), false, this.projMatrix);
    };
    /**
     * Assegna i valori iniziali alle variabili Uniform utilizzate dallo shader
     */
    Pointcloud.prototype.bindUniforms = function () {
        this.gl.uniform1f(this.uniformLoc("u_time"), 0);
        this.gl.uniform2f(this.uniformLoc("u_mouse"), 0, 0);
        // this.gl.uniform2f(
        //   this.uniformLoc("u_resolution"),
        //   this.canvas.width,
        //   this.canvas.height
        // );
    };
    Pointcloud.prototype.initGUI = function () {
        var gui = new dat_gui__WEBPACK_IMPORTED_MODULE_0__.GUI({ name: "Point cloud" });
        gui
            .add(this.parameters, "fullscreen")
            .onChange(this.toggleFullscreen.bind(this));
        gui
            .add(this.parameters, "F_near", 1, 100)
            .onChange(this.setMatrix.bind(this));
        gui.add(this.parameters, "F_far", 1.9, 2000);
        gui.add(this.parameters, "F_bottom", -20, 0);
        gui.add(this.parameters, "F_top", 0, 20);
        gui.add(this.parameters, "scale", 3, 100);
        gui.add(this.parameters, "translate", -300, -1);
        gui.open();
    };
    Pointcloud.prototype.doTheJob = function () {
        // Creazione degli shader e del programma
        // ======================================
        var _this = this;
        var vertexShader = this.createShader(this.gl.VERTEX_SHADER, _shaders_pointcloud_vertex_glsl__WEBPACK_IMPORTED_MODULE_3__);
        var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, _shaders_pointcloud_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__);
        console.log("Created vertex and fragment shaders");
        this.program = this.createAndLinkProgram(vertexShader, fragmentShader);
        var positionAttributeLocation = this.gl.getAttribLocation(this.program, "coordinates");
        console.log("Initializing array of random points...");
        for (var i = 0; i < POINT_COUNT; i++) {
            this.coordinates[i * 3] = -1 + Math.random() * 2;
            this.coordinates[i * 3 + 1] = -1 + Math.random() * 2;
            this.coordinates[i * 3 + 2] = -1 + Math.random() * 2;
        }
        var positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        // three 3d points
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.coordinates), this.gl.STATIC_DRAW);
        this.vao = this.gl.createVertexArray();
        // make 'vao' the current vertex array so that all of our attribute settings will apply to that set of attribute state
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        var size = 3; // 3 components per iteration
        var type = this.gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        this.gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        this.initGUI();
        this.gl.viewport(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        this.parameters.F_right =
            (this.canvas.clientWidth *
                (this.parameters.F_top - this.parameters.F_bottom)) /
                (this.canvas.clientHeight * 2);
        this.parameters.F_left = -this.parameters.F_right;
        this.gl.enable(this.gl.DEPTH_TEST);
        console.log("Init successful");
        window.requestAnimationFrame(function (milliseconds) {
            _this.drawScene(milliseconds);
        });
    };
    Pointcloud.prototype.toggleFullscreen = function (fs) {
        _super.prototype.toggleFullscreen.call(this, fs);
        this.parameters.F_right =
            (this.canvas.clientWidth *
                (this.parameters.F_top - this.parameters.F_bottom)) /
                (this.canvas.clientHeight * 2);
        this.parameters.F_left = -this.parameters.F_right;
    };
    return Pointcloud;
}(_glCapsule__WEBPACK_IMPORTED_MODULE_1__.glCapsule));


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJnbC10dHNoYWRlci8uL25vZGVfbW9kdWxlcy9kYXQuZ3VpL2J1aWxkL2RhdC5ndWkubW9kdWxlLmpzIiwid2VicGFjazovL3dlYmdsLXR0c2hhZGVyLy4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vY29tbW9uLmpzIiwid2VicGFjazovL3dlYmdsLXR0c2hhZGVyLy4vbm9kZV9tb2R1bGVzL2dsLW1hdHJpeC9lc20vbWF0NC5qcyIsIndlYnBhY2s6Ly93ZWJnbC10dHNoYWRlci8uL25vZGVfbW9kdWxlcy9nbC1tYXRyaXgvZXNtL3ZlYzMuanMiLCJ3ZWJwYWNrOi8vd2ViZ2wtdHRzaGFkZXIvLi9zcmMvZ2xDYXBzdWxlLnRzIiwid2VicGFjazovL3dlYmdsLXR0c2hhZGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYmdsLXR0c2hhZGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJnbC10dHNoYWRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYmdsLXR0c2hhZGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2ViZ2wtdHRzaGFkZXIvLi9zcmMvcG9pbnRjbG91ZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxhQUFhLG9DQUFvQztBQUNqRCxHQUFHO0FBQ0gsYUFBYSxnREFBZ0Q7QUFDN0QsR0FBRztBQUNILGFBQWEsb0NBQW9DO0FBQ2pELEdBQUc7QUFDSCxhQUFhLGdEQUFnRDtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsK0NBQStDLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7QUFRRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1LQUFtSyxpQ0FBaUM7QUFDcE07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhHQUE4RztBQUM5RyxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsMkpBQTJKO0FBQzNKLHdKQUF3SjtBQUN4SixtSkFBbUo7QUFDbkosb0pBQW9KO0FBQ3BKLGdKQUFnSjtBQUNoSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELDJEQUEyRDtBQUNuSDtBQUNBLHNEQUFzRCx1Q0FBdUM7QUFDN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVELHlDQUF5QyxnQkFBZ0IsU0FBUyxVQUFVLFdBQVcsV0FBVyxPQUFPLGVBQWUsTUFBTSxPQUFPLFFBQVEsU0FBUyxVQUFVLG1CQUFtQixnQkFBZ0IsU0FBUyxzQ0FBc0MsaUNBQWlDLG1DQUFtQyw4QkFBOEIsNEJBQTRCLGdCQUFnQiwwQ0FBMEMsVUFBVSxnQkFBZ0IsNkJBQTZCLGlDQUFpQyxxQkFBcUIseURBQXlELFVBQVUsdUJBQXVCLHNDQUFzQyxpQ0FBaUMsbUNBQW1DLDhCQUE4QixTQUFTLGlCQUFpQixZQUFZLGVBQWUsa0JBQWtCLHNCQUFzQixpQ0FBaUMsa0JBQWtCLG9DQUFvQyxrQkFBa0IsNkJBQTZCLHNCQUFzQixNQUFNLFlBQVksa0JBQWtCLG1CQUFtQiw0QkFBNEIsYUFBYSwrQkFBK0IsZ0JBQWdCLHlCQUF5QixhQUFhLGdCQUFnQixNQUFNLGFBQWEsMEJBQTBCLGtCQUFrQiw2QkFBNkIsZUFBZSxPQUFPLHVDQUF1QyxrQ0FBa0Msb0NBQW9DLCtCQUErQix1Q0FBdUMsa0NBQWtDLG9DQUFvQywrQkFBK0Isb0JBQW9CLFlBQVksWUFBWSxpQkFBaUIsb0JBQW9CLGNBQWMsVUFBVSxvQ0FBb0MsYUFBYSxlQUFlLGlCQUFpQixpRUFBaUUsU0FBUyxnQkFBZ0IsU0FBUyxRQUFRLFdBQVcsaUJBQWlCLFlBQVksZ0JBQWdCLG1CQUFtQixlQUFlLFdBQVcsV0FBVyxVQUFVLGdCQUFnQix1QkFBdUIsT0FBTyxXQUFXLFVBQVUsa0JBQWtCLHdCQUF3QixTQUFTLGVBQWUsWUFBWSxXQUFXLFlBQVksaUNBQWlDLFVBQVUsY0FBYyxZQUFZLFdBQVcsVUFBVSxpQkFBaUIsZUFBZSxZQUFZLGVBQWUsZUFBZSxZQUFZLDRCQUE0QixlQUFlLGNBQWMsZUFBZSxzR0FBc0csZUFBZSxjQUFjLGlCQUFpQixjQUFjLGFBQWEsa0JBQWtCLGlCQUFpQixnQkFBZ0IsV0FBVywwQ0FBMEMsY0FBYyxnQkFBZ0IsVUFBVSx3QkFBd0IscUJBQXFCLGdCQUFnQixhQUFhLHNCQUFzQixZQUFZLGFBQWEsZUFBZSxpQkFBaUIsb0JBQW9CLGFBQWEsV0FBVyw4QkFBOEIsZUFBZSxTQUFTLFlBQVksa0NBQWtDLHFCQUFxQixjQUFjLGNBQWMsWUFBWSxrQkFBa0IsYUFBYSxrQkFBa0Isa0JBQWtCLGFBQWEsZUFBZSxpQkFBaUIsa0JBQWtCLHNCQUFzQixZQUFZLGdCQUFnQix1QkFBdUIsZUFBZSxzQkFBc0IsYUFBYSxJQUFJLFdBQVcsc0NBQXNDLDBCQUEwQiw0QkFBNEIsVUFBVSxtQkFBbUIsbUNBQW1DLFNBQVMsYUFBYSxrQ0FBa0Msa0JBQWtCLG1CQUFtQixvQkFBb0IsbUJBQW1CLGdDQUFnQyxnQkFBZ0IsaUJBQWlCLG1CQUFtQixTQUFTLHVCQUF1QixnQkFBZ0IsWUFBWSx3QkFBd0IsZ0JBQWdCLGVBQWUsa0JBQWtCLGNBQWMsZ0JBQWdCLHdCQUF3QixtQkFBbUIsV0FBVyw0QkFBNEIsNEJBQTRCLGVBQWUsOEJBQThCLHNDQUFzQyxtZkFBbWYsV0FBVyxVQUFVLDhCQUE4Qix5QkFBeUIsNEJBQTRCLGNBQWMsZ0JBQWdCLGFBQWEsa0JBQWtCLG1DQUFtQyx3R0FBd0csZUFBZSw4Q0FBOEMscUJBQXFCLG9DQUFvQyxxRkFBcUYsZ0JBQWdCLDhCQUE4QixjQUFjLHNCQUFzQixpQkFBaUIsOEJBQThCLGVBQWUsOEJBQThCLGdDQUFnQyxjQUFjLGVBQWUsOEJBQThCLGdDQUFnQyxjQUFjLDZDQUE2QyxnQkFBZ0Isd0JBQXdCLG1CQUFtQixhQUFhLDhCQUE4QixtQkFBbUIsOEJBQThCLG1CQUFtQixXQUFXLGVBQWUsbUJBQW1CLGlCQUFpQixrQkFBa0IsbUJBQW1CLGVBQWUscUJBQXFCLG1CQUFtQixnQ0FBZ0MsbUJBQW1COztBQUVsdEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLCtFQUErRSx3RUFBd0U7QUFDdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9DQUFvQztBQUMzRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0NBQW9DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxhQUFhO0FBQ3hCO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxLQUFLO0FBQ2xCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsS0FBSztBQUNsQjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFhLEtBQUs7QUFDbEI7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYSxLQUFLO0FBQ2xCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsS0FBSztBQUNsQjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsYUFBYTtBQUN4QixhQUFhLEtBQUs7QUFDbEI7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYSxLQUFLO0FBQ2xCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLGFBQWE7QUFDeEIsYUFBYSxLQUFLO0FBQ2xCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLGFBQWE7QUFDeEIsYUFBYSxLQUFLO0FBQ2xCOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQixXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCLGFBQWEsS0FBSztBQUNsQjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEIsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsYUFBYTtBQUN4QixhQUFhLEtBQUs7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isd0NBQU8sRUFBRSxzQkFBc0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSw0REFBZTtBQUNuRix3RUFBd0UsOERBQWlCO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5Qix1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQ0FBQyxpREFBUztBQUNXIiwiZmlsZSI6InBvaW50Y2xvdWQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXQtZ3VpIEphdmFTY3JpcHQgQ29udHJvbGxlciBMaWJyYXJ5XG4gKiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZGF0LWd1aVxuICpcbiAqIENvcHlyaWdodCAyMDExIERhdGEgQXJ0cyBUZWFtLCBHb29nbGUgQ3JlYXRpdmUgTGFiXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICovXG5cbmZ1bmN0aW9uIF9fXyRpbnNlcnRTdHlsZShjc3MpIHtcbiAgaWYgKCFjc3MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcbiAgc3R5bGUuaW5uZXJIVE1MID0gY3NzO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICByZXR1cm4gY3NzO1xufVxuXG5mdW5jdGlvbiBjb2xvclRvU3RyaW5nIChjb2xvciwgZm9yY2VDU1NIZXgpIHtcbiAgdmFyIGNvbG9yRm9ybWF0ID0gY29sb3IuX19zdGF0ZS5jb252ZXJzaW9uTmFtZS50b1N0cmluZygpO1xuICB2YXIgciA9IE1hdGgucm91bmQoY29sb3Iucik7XG4gIHZhciBnID0gTWF0aC5yb3VuZChjb2xvci5nKTtcbiAgdmFyIGIgPSBNYXRoLnJvdW5kKGNvbG9yLmIpO1xuICB2YXIgYSA9IGNvbG9yLmE7XG4gIHZhciBoID0gTWF0aC5yb3VuZChjb2xvci5oKTtcbiAgdmFyIHMgPSBjb2xvci5zLnRvRml4ZWQoMSk7XG4gIHZhciB2ID0gY29sb3Iudi50b0ZpeGVkKDEpO1xuICBpZiAoZm9yY2VDU1NIZXggfHwgY29sb3JGb3JtYXQgPT09ICdUSFJFRV9DSEFSX0hFWCcgfHwgY29sb3JGb3JtYXQgPT09ICdTSVhfQ0hBUl9IRVgnKSB7XG4gICAgdmFyIHN0ciA9IGNvbG9yLmhleC50b1N0cmluZygxNik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCA2KSB7XG4gICAgICBzdHIgPSAnMCcgKyBzdHI7XG4gICAgfVxuICAgIHJldHVybiAnIycgKyBzdHI7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdDU1NfUkdCJykge1xuICAgIHJldHVybiAncmdiKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnKSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdDU1NfUkdCQScpIHtcbiAgICByZXR1cm4gJ3JnYmEoJyArIHIgKyAnLCcgKyBnICsgJywnICsgYiArICcsJyArIGEgKyAnKSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdIRVgnKSB7XG4gICAgcmV0dXJuICcweCcgKyBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnUkdCX0FSUkFZJykge1xuICAgIHJldHVybiAnWycgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnXSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdSR0JBX0FSUkFZJykge1xuICAgIHJldHVybiAnWycgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBhICsgJ10nO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnUkdCX09CSicpIHtcbiAgICByZXR1cm4gJ3tyOicgKyByICsgJyxnOicgKyBnICsgJyxiOicgKyBiICsgJ30nO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnUkdCQV9PQkonKSB7XG4gICAgcmV0dXJuICd7cjonICsgciArICcsZzonICsgZyArICcsYjonICsgYiArICcsYTonICsgYSArICd9JztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0hTVl9PQkonKSB7XG4gICAgcmV0dXJuICd7aDonICsgaCArICcsczonICsgcyArICcsdjonICsgdiArICd9JztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ0hTVkFfT0JKJykge1xuICAgIHJldHVybiAne2g6JyArIGggKyAnLHM6JyArIHMgKyAnLHY6JyArIHYgKyAnLGE6JyArIGEgKyAnfSc7XG4gIH1cbiAgcmV0dXJuICd1bmtub3duIGZvcm1hdCc7XG59XG5cbnZhciBBUlJfRUFDSCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIEFSUl9TTElDRSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBDb21tb24gPSB7XG4gIEJSRUFLOiB7fSxcbiAgZXh0ZW5kOiBmdW5jdGlvbiBleHRlbmQodGFyZ2V0KSB7XG4gICAgdGhpcy5lYWNoKEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cywgMSksIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHZhciBrZXlzID0gdGhpcy5pc09iamVjdChvYmopID8gT2JqZWN0LmtleXMob2JqKSA6IFtdO1xuICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVW5kZWZpbmVkKG9ialtrZXldKSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcbiAgZGVmYXVsdHM6IGZ1bmN0aW9uIGRlZmF1bHRzKHRhcmdldCkge1xuICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICB2YXIga2V5cyA9IHRoaXMuaXNPYmplY3Qob2JqKSA/IE9iamVjdC5rZXlzKG9iaikgOiBbXTtcbiAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmlzVW5kZWZpbmVkKHRhcmdldFtrZXldKSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfSxcbiAgY29tcG9zZTogZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgICB2YXIgdG9DYWxsID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgZm9yICh2YXIgaSA9IHRvQ2FsbC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhcmdzID0gW3RvQ2FsbFtpXS5hcHBseSh0aGlzLCBhcmdzKV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJnc1swXTtcbiAgICB9O1xuICB9LFxuICBlYWNoOiBmdW5jdGlvbiBlYWNoKG9iaiwgaXRyLCBzY29wZSkge1xuICAgIGlmICghb2JqKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChBUlJfRUFDSCAmJiBvYmouZm9yRWFjaCAmJiBvYmouZm9yRWFjaCA9PT0gQVJSX0VBQ0gpIHtcbiAgICAgIG9iai5mb3JFYWNoKGl0ciwgc2NvcGUpO1xuICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gb2JqLmxlbmd0aCArIDApIHtcbiAgICAgIHZhciBrZXkgPSB2b2lkIDA7XG4gICAgICB2YXIgbCA9IHZvaWQgMDtcbiAgICAgIGZvciAoa2V5ID0gMCwgbCA9IG9iai5sZW5ndGg7IGtleSA8IGw7IGtleSsrKSB7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqICYmIGl0ci5jYWxsKHNjb3BlLCBvYmpba2V5XSwga2V5KSA9PT0gdGhpcy5CUkVBSykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBfa2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaXRyLmNhbGwoc2NvcGUsIG9ialtfa2V5XSwgX2tleSkgPT09IHRoaXMuQlJFQUspIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRlZmVyOiBmdW5jdGlvbiBkZWZlcihmbmMpIHtcbiAgICBzZXRUaW1lb3V0KGZuYywgMCk7XG4gIH0sXG4gIGRlYm91bmNlOiBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB0aHJlc2hvbGQsIGNhbGxJbW1lZGlhdGVseSkge1xuICAgIHZhciB0aW1lb3V0ID0gdm9pZCAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghY2FsbEltbWVkaWF0ZWx5KSBmdW5jLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICB9XG4gICAgICB2YXIgY2FsbE5vdyA9IGNhbGxJbW1lZGlhdGVseSB8fCAhdGltZW91dDtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHRocmVzaG9sZCk7XG4gICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICBmdW5jLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgdG9BcnJheTogZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgICBpZiAob2JqLnRvQXJyYXkpIHJldHVybiBvYmoudG9BcnJheSgpO1xuICAgIHJldHVybiBBUlJfU0xJQ0UuY2FsbChvYmopO1xuICB9LFxuICBpc1VuZGVmaW5lZDogZnVuY3Rpb24gaXNVbmRlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xuICB9LFxuICBpc051bGw6IGZ1bmN0aW9uIGlzTnVsbChvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9LFxuICBpc05hTjogZnVuY3Rpb24gKF9pc05hTikge1xuICAgIGZ1bmN0aW9uIGlzTmFOKF94KSB7XG4gICAgICByZXR1cm4gX2lzTmFOLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGlzTmFOLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF9pc05hTi50b1N0cmluZygpO1xuICAgIH07XG4gICAgcmV0dXJuIGlzTmFOO1xuICB9KGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gaXNOYU4ob2JqKTtcbiAgfSksXG4gIGlzQXJyYXk6IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmouY29uc3RydWN0b3IgPT09IEFycmF5O1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG4gIH0sXG4gIGlzTnVtYmVyOiBmdW5jdGlvbiBpc051bWJlcihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBvYmogKyAwO1xuICB9LFxuICBpc1N0cmluZzogZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gb2JqICsgJyc7XG4gIH0sXG4gIGlzQm9vbGVhbjogZnVuY3Rpb24gaXNCb29sZWFuKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IGZhbHNlIHx8IG9iaiA9PT0gdHJ1ZTtcbiAgfSxcbiAgaXNGdW5jdGlvbjogZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRnVuY3Rpb247XG4gIH1cbn07XG5cbnZhciBJTlRFUlBSRVRBVElPTlMgPSBbXG57XG4gIGxpdG11czogQ29tbW9uLmlzU3RyaW5nLFxuICBjb252ZXJzaW9uczoge1xuICAgIFRIUkVFX0NIQVJfSEVYOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldKShbQS1GMC05XSkoW0EtRjAtOV0pJC9pKTtcbiAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsxXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFsyXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpICsgdGVzdFszXS50b1N0cmluZygpLCAwKVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBjb2xvclRvU3RyaW5nXG4gICAgfSxcbiAgICBTSVhfQ0hBUl9IRVg6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXiMoW0EtRjAtOV17Nn0pJC9pKTtcbiAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgaGV4OiBwYXJzZUludCgnMHgnICsgdGVzdFsxXS50b1N0cmluZygpLCAwKVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBjb2xvclRvU3RyaW5nXG4gICAgfSxcbiAgICBDU1NfUkdCOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL15yZ2JcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBjb2xvclRvU3RyaW5nXG4gICAgfSxcbiAgICBDU1NfUkdCQToge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiYVxcKFxccyooLispXFxzKixcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKlxcKS8pO1xuICAgICAgICBpZiAodGVzdCA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICByOiBwYXJzZUZsb2F0KHRlc3RbMV0pLFxuICAgICAgICAgIGc6IHBhcnNlRmxvYXQodGVzdFsyXSksXG4gICAgICAgICAgYjogcGFyc2VGbG9hdCh0ZXN0WzNdKSxcbiAgICAgICAgICBhOiBwYXJzZUZsb2F0KHRlc3RbNF0pXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGNvbG9yVG9TdHJpbmdcbiAgICB9XG4gIH1cbn0sXG57XG4gIGxpdG11czogQ29tbW9uLmlzTnVtYmVyLFxuICBjb252ZXJzaW9uczoge1xuICAgIEhFWDoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnSEVYJyxcbiAgICAgICAgICBoZXg6IG9yaWdpbmFsLFxuICAgICAgICAgIGNvbnZlcnNpb25OYW1lOiAnSEVYJ1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4gY29sb3IuaGV4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufSxcbntcbiAgbGl0bXVzOiBDb21tb24uaXNBcnJheSxcbiAgY29udmVyc2lvbnM6IHtcbiAgICBSR0JfQVJSQVk6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPT0gMykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICBiOiBvcmlnaW5hbFsyXVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xuICAgICAgfVxuICAgIH0sXG4gICAgUkdCQV9BUlJBWToge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICBpZiAob3JpZ2luYWwubGVuZ3RoICE9PSA0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgIHI6IG9yaWdpbmFsWzBdLFxuICAgICAgICAgIGc6IG9yaWdpbmFsWzFdLFxuICAgICAgICAgIGI6IG9yaWdpbmFsWzJdLFxuICAgICAgICAgIGE6IG9yaWdpbmFsWzNdXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYV07XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxue1xuICBsaXRtdXM6IENvbW1vbi5pc09iamVjdCxcbiAgY29udmVyc2lvbnM6IHtcbiAgICBSR0JBX09CSjoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmEpKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICAgIHI6IG9yaWdpbmFsLnIsXG4gICAgICAgICAgICBnOiBvcmlnaW5hbC5nLFxuICAgICAgICAgICAgYjogb3JpZ2luYWwuYixcbiAgICAgICAgICAgIGE6IG9yaWdpbmFsLmFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgYjogY29sb3IuYixcbiAgICAgICAgICBhOiBjb2xvci5hXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcbiAgICBSR0JfT0JKOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChDb21tb24uaXNOdW1iZXIob3JpZ2luYWwucikgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmcpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5iKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgIGI6IG9yaWdpbmFsLmJcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByOiBjb2xvci5yLFxuICAgICAgICAgIGc6IGNvbG9yLmcsXG4gICAgICAgICAgYjogY29sb3IuYlxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgSFNWQV9PQko6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgaWYgKENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzcGFjZTogJ0hTVicsXG4gICAgICAgICAgICBoOiBvcmlnaW5hbC5oLFxuICAgICAgICAgICAgczogb3JpZ2luYWwucyxcbiAgICAgICAgICAgIHY6IG9yaWdpbmFsLnYsXG4gICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgIHY6IGNvbG9yLnYsXG4gICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgSFNWX09CSjoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmgpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5zKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwudikpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICB2OiBvcmlnaW5hbC52XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaDogY29sb3IuaCxcbiAgICAgICAgICBzOiBjb2xvci5zLFxuICAgICAgICAgIHY6IGNvbG9yLnZcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1dO1xudmFyIHJlc3VsdCA9IHZvaWQgMDtcbnZhciB0b1JldHVybiA9IHZvaWQgMDtcbnZhciBpbnRlcnByZXQgPSBmdW5jdGlvbiBpbnRlcnByZXQoKSB7XG4gIHRvUmV0dXJuID0gZmFsc2U7XG4gIHZhciBvcmlnaW5hbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gQ29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKSA6IGFyZ3VtZW50c1swXTtcbiAgQ29tbW9uLmVhY2goSU5URVJQUkVUQVRJT05TLCBmdW5jdGlvbiAoZmFtaWx5KSB7XG4gICAgaWYgKGZhbWlseS5saXRtdXMob3JpZ2luYWwpKSB7XG4gICAgICBDb21tb24uZWFjaChmYW1pbHkuY29udmVyc2lvbnMsIGZ1bmN0aW9uIChjb252ZXJzaW9uLCBjb252ZXJzaW9uTmFtZSkge1xuICAgICAgICByZXN1bHQgPSBjb252ZXJzaW9uLnJlYWQob3JpZ2luYWwpO1xuICAgICAgICBpZiAodG9SZXR1cm4gPT09IGZhbHNlICYmIHJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB0b1JldHVybiA9IHJlc3VsdDtcbiAgICAgICAgICByZXN1bHQuY29udmVyc2lvbk5hbWUgPSBjb252ZXJzaW9uTmFtZTtcbiAgICAgICAgICByZXN1bHQuY29udmVyc2lvbiA9IGNvbnZlcnNpb247XG4gICAgICAgICAgcmV0dXJuIENvbW1vbi5CUkVBSztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gQ29tbW9uLkJSRUFLO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0b1JldHVybjtcbn07XG5cbnZhciB0bXBDb21wb25lbnQgPSB2b2lkIDA7XG52YXIgQ29sb3JNYXRoID0ge1xuICBoc3ZfdG9fcmdiOiBmdW5jdGlvbiBoc3ZfdG9fcmdiKGgsIHMsIHYpIHtcbiAgICB2YXIgaGkgPSBNYXRoLmZsb29yKGggLyA2MCkgJSA2O1xuICAgIHZhciBmID0gaCAvIDYwIC0gTWF0aC5mbG9vcihoIC8gNjApO1xuICAgIHZhciBwID0gdiAqICgxLjAgLSBzKTtcbiAgICB2YXIgcSA9IHYgKiAoMS4wIC0gZiAqIHMpO1xuICAgIHZhciB0ID0gdiAqICgxLjAgLSAoMS4wIC0gZikgKiBzKTtcbiAgICB2YXIgYyA9IFtbdiwgdCwgcF0sIFtxLCB2LCBwXSwgW3AsIHYsIHRdLCBbcCwgcSwgdl0sIFt0LCBwLCB2XSwgW3YsIHAsIHFdXVtoaV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IGNbMF0gKiAyNTUsXG4gICAgICBnOiBjWzFdICogMjU1LFxuICAgICAgYjogY1syXSAqIDI1NVxuICAgIH07XG4gIH0sXG4gIHJnYl90b19oc3Y6IGZ1bmN0aW9uIHJnYl90b19oc3YociwgZywgYikge1xuICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xuICAgIHZhciBoID0gdm9pZCAwO1xuICAgIHZhciBzID0gdm9pZCAwO1xuICAgIGlmIChtYXggIT09IDApIHtcbiAgICAgIHMgPSBkZWx0YSAvIG1heDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaDogTmFOLFxuICAgICAgICBzOiAwLFxuICAgICAgICB2OiAwXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAociA9PT0gbWF4KSB7XG4gICAgICBoID0gKGcgLSBiKSAvIGRlbHRhO1xuICAgIH0gZWxzZSBpZiAoZyA9PT0gbWF4KSB7XG4gICAgICBoID0gMiArIChiIC0gcikgLyBkZWx0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgfVxuICAgIGggLz0gNjtcbiAgICBpZiAoaCA8IDApIHtcbiAgICAgIGggKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IGggKiAzNjAsXG4gICAgICBzOiBzLFxuICAgICAgdjogbWF4IC8gMjU1XG4gICAgfTtcbiAgfSxcbiAgcmdiX3RvX2hleDogZnVuY3Rpb24gcmdiX3RvX2hleChyLCBnLCBiKSB7XG4gICAgdmFyIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KDAsIDIsIHIpO1xuICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMSwgZyk7XG4gICAgaGV4ID0gdGhpcy5oZXhfd2l0aF9jb21wb25lbnQoaGV4LCAwLCBiKTtcbiAgICByZXR1cm4gaGV4O1xuICB9LFxuICBjb21wb25lbnRfZnJvbV9oZXg6IGZ1bmN0aW9uIGNvbXBvbmVudF9mcm9tX2hleChoZXgsIGNvbXBvbmVudEluZGV4KSB7XG4gICAgcmV0dXJuIGhleCA+PiBjb21wb25lbnRJbmRleCAqIDggJiAweEZGO1xuICB9LFxuICBoZXhfd2l0aF9jb21wb25lbnQ6IGZ1bmN0aW9uIGhleF93aXRoX2NvbXBvbmVudChoZXgsIGNvbXBvbmVudEluZGV4LCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA8PCAodG1wQ29tcG9uZW50ID0gY29tcG9uZW50SW5kZXggKiA4KSB8IGhleCAmIH4oMHhGRiA8PCB0bXBDb21wb25lbnQpO1xuICB9XG59O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cblxuXG52YXIgZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgfVxufTtcblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxudmFyIENvbG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb2xvcigpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBDb2xvcik7XG4gICAgdGhpcy5fX3N0YXRlID0gaW50ZXJwcmV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHRoaXMuX19zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGludGVycHJldCBjb2xvciBhcmd1bWVudHMnKTtcbiAgICB9XG4gICAgdGhpcy5fX3N0YXRlLmEgPSB0aGlzLl9fc3RhdGUuYSB8fCAxO1xuICB9XG4gIGNyZWF0ZUNsYXNzKENvbG9yLCBbe1xuICAgIGtleTogJ3RvU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gY29sb3JUb1N0cmluZyh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd0b0hleFN0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvSGV4U3RyaW5nKCkge1xuICAgICAgcmV0dXJuIGNvbG9yVG9TdHJpbmcodGhpcywgdHJ1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndG9PcmlnaW5hbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvT3JpZ2luYWwoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmNvbnZlcnNpb24ud3JpdGUodGhpcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xvcjtcbn0oKTtcbmZ1bmN0aW9uIGRlZmluZVJHQkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29tcG9uZW50LCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlID09PSAnUkdCJykge1xuICAgICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgICB9XG4gICAgICBDb2xvci5yZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdSR0InKSB7XG4gICAgICAgIENvbG9yLnJlY2FsY3VsYXRlUkdCKHRoaXMsIGNvbXBvbmVudCwgY29tcG9uZW50SGV4SW5kZXgpO1xuICAgICAgICB0aGlzLl9fc3RhdGUuc3BhY2UgPSAnUkdCJztcbiAgICAgIH1cbiAgICAgIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdID0gdjtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gZGVmaW5lSFNWQ29tcG9uZW50KHRhcmdldCwgY29tcG9uZW50KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgfVxuICAgICAgQ29sb3IucmVjYWxjdWxhdGVIU1YodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSFNWJykge1xuICAgICAgICBDb2xvci5yZWNhbGN1bGF0ZUhTVih0aGlzKTtcbiAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hTVic7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG4gICAgfVxuICB9KTtcbn1cbkNvbG9yLnJlY2FsY3VsYXRlUkdCID0gZnVuY3Rpb24gKGNvbG9yLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG4gIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSEVYJykge1xuICAgIGNvbG9yLl9fc3RhdGVbY29tcG9uZW50XSA9IENvbG9yTWF0aC5jb21wb25lbnRfZnJvbV9oZXgoY29sb3IuX19zdGF0ZS5oZXgsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgfSBlbHNlIGlmIChjb2xvci5fX3N0YXRlLnNwYWNlID09PSAnSFNWJykge1xuICAgIENvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSwgQ29sb3JNYXRoLmhzdl90b19yZ2IoY29sb3IuX19zdGF0ZS5oLCBjb2xvci5fX3N0YXRlLnMsIGNvbG9yLl9fc3RhdGUudikpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29ycnVwdGVkIGNvbG9yIHN0YXRlJyk7XG4gIH1cbn07XG5Db2xvci5yZWNhbGN1bGF0ZUhTViA9IGZ1bmN0aW9uIChjb2xvcikge1xuICB2YXIgcmVzdWx0ID0gQ29sb3JNYXRoLnJnYl90b19oc3YoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG4gIENvbW1vbi5leHRlbmQoY29sb3IuX19zdGF0ZSwge1xuICAgIHM6IHJlc3VsdC5zLFxuICAgIHY6IHJlc3VsdC52XG4gIH0pO1xuICBpZiAoIUNvbW1vbi5pc05hTihyZXN1bHQuaCkpIHtcbiAgICBjb2xvci5fX3N0YXRlLmggPSByZXN1bHQuaDtcbiAgfSBlbHNlIGlmIChDb21tb24uaXNVbmRlZmluZWQoY29sb3IuX19zdGF0ZS5oKSkge1xuICAgIGNvbG9yLl9fc3RhdGUuaCA9IDA7XG4gIH1cbn07XG5Db2xvci5DT01QT05FTlRTID0gWydyJywgJ2cnLCAnYicsICdoJywgJ3MnLCAndicsICdoZXgnLCAnYSddO1xuZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3InLCAyKTtcbmRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdnJywgMSk7XG5kZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnYicsIDApO1xuZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2gnKTtcbmRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdzJyk7XG5kZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAndicpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2EnLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgIHJldHVybiB0aGlzLl9fc3RhdGUuYTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXQkJDEodikge1xuICAgIHRoaXMuX19zdGF0ZS5hID0gdjtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3IucHJvdG90eXBlLCAnaGV4Jywge1xuICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnSEVYJykge1xuICAgICAgdGhpcy5fX3N0YXRlLmhleCA9IENvbG9yTWF0aC5yZ2JfdG9faGV4KHRoaXMuciwgdGhpcy5nLCB0aGlzLmIpO1xuICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XG4gIH1cbn0pO1xuXG52YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29udHJvbGxlcik7XG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcbiAgICB0aGlzLl9fb25DaGFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gdW5kZWZpbmVkO1xuICB9XG4gIGNyZWF0ZUNsYXNzKENvbnRyb2xsZXIsIFt7XG4gICAga2V5OiAnb25DaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZShmbmMpIHtcbiAgICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uRmluaXNoQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25GaW5pc2hDaGFuZ2UoZm5jKSB7XG4gICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSBmbmM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzLCBuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlRGlzcGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc01vZGlmaWVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNNb2RpZmllZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcblxudmFyIEVWRU5UX01BUCA9IHtcbiAgSFRNTEV2ZW50czogWydjaGFuZ2UnXSxcbiAgTW91c2VFdmVudHM6IFsnY2xpY2snLCAnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlb3ZlciddLFxuICBLZXlib2FyZEV2ZW50czogWydrZXlkb3duJ11cbn07XG52YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xuQ29tbW9uLmVhY2goRVZFTlRfTUFQLCBmdW5jdGlvbiAodiwgaykge1xuICBDb21tb24uZWFjaCh2LCBmdW5jdGlvbiAoZSkge1xuICAgIEVWRU5UX01BUF9JTlZbZV0gPSBrO1xuICB9KTtcbn0pO1xudmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcbmZ1bmN0aW9uIGNzc1ZhbHVlVG9QaXhlbHModmFsKSB7XG4gIGlmICh2YWwgPT09ICcwJyB8fCBDb21tb24uaXNVbmRlZmluZWQodmFsKSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcbiAgaWYgKCFDb21tb24uaXNOdWxsKG1hdGNoKSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbnZhciBkb20gPSB7XG4gIG1ha2VTZWxlY3RhYmxlOiBmdW5jdGlvbiBtYWtlU2VsZWN0YWJsZShlbGVtLCBzZWxlY3RhYmxlKSB7XG4gICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICBlbGVtLm9uc2VsZWN0c3RhcnQgPSBzZWxlY3RhYmxlID8gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7fTtcbiAgICBlbGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgIGVsZW0uc3R5bGUuS2h0bWxVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICBlbGVtLnVuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUgPyAnb24nIDogJ29mZic7XG4gIH0sXG4gIG1ha2VGdWxsc2NyZWVuOiBmdW5jdGlvbiBtYWtlRnVsbHNjcmVlbihlbGVtLCBob3IsIHZlcnQpIHtcbiAgICB2YXIgdmVydGljYWwgPSB2ZXJ0O1xuICAgIHZhciBob3Jpem9udGFsID0gaG9yO1xuICAgIGlmIChDb21tb24uaXNVbmRlZmluZWQoaG9yaXpvbnRhbCkpIHtcbiAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKHZlcnRpY2FsKSkge1xuICAgICAgdmVydGljYWwgPSB0cnVlO1xuICAgIH1cbiAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIGVsZW0uc3R5bGUucmlnaHQgPSAwO1xuICAgIH1cbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gMDtcbiAgICB9XG4gIH0sXG4gIGZha2VFdmVudDogZnVuY3Rpb24gZmFrZUV2ZW50KGVsZW0sIGV2ZW50VHlwZSwgcGFycywgYXV4KSB7XG4gICAgdmFyIHBhcmFtcyA9IHBhcnMgfHwge307XG4gICAgdmFyIGNsYXNzTmFtZSA9IEVWRU5UX01BUF9JTlZbZXZlbnRUeXBlXTtcbiAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB0eXBlICcgKyBldmVudFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChjbGFzc05hbWUpO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICBjYXNlICdNb3VzZUV2ZW50cyc6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgY2xpZW50WCA9IHBhcmFtcy54IHx8IHBhcmFtcy5jbGllbnRYIHx8IDA7XG4gICAgICAgICAgdmFyIGNsaWVudFkgPSBwYXJhbXMueSB8fCBwYXJhbXMuY2xpZW50WSB8fCAwO1xuICAgICAgICAgIGV2dC5pbml0TW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLCBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlLCB3aW5kb3csIHBhcmFtcy5jbGlja0NvdW50IHx8IDEsIDAsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgIGNsaWVudFksXG4gICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICdLZXlib2FyZEV2ZW50cyc6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaW5pdCA9IGV2dC5pbml0S2V5Ym9hcmRFdmVudCB8fCBldnQuaW5pdEtleUV2ZW50O1xuICAgICAgICAgIENvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICAgICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICAgICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGtleUNvZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNoYXJDb2RlOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpbml0KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsIHBhcmFtcy5jYW5jZWxhYmxlLCB3aW5kb3csIHBhcmFtcy5jdHJsS2V5LCBwYXJhbXMuYWx0S2V5LCBwYXJhbXMuc2hpZnRLZXksIHBhcmFtcy5tZXRhS2V5LCBwYXJhbXMua2V5Q29kZSwgcGFyYW1zLmNoYXJDb2RlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSwgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29tbW9uLmRlZmF1bHRzKGV2dCwgYXV4KTtcbiAgICBlbGVtLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfSxcbiAgYmluZDogZnVuY3Rpb24gYmluZChlbGVtLCBldmVudCwgZnVuYywgbmV3Qm9vbCkge1xuICAgIHZhciBib29sID0gbmV3Qm9vbCB8fCBmYWxzZTtcbiAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgIH0gZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkge1xuICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZChlbGVtLCBldmVudCwgZnVuYywgbmV3Qm9vbCkge1xuICAgIHZhciBib29sID0gbmV3Qm9vbCB8fCBmYWxzZTtcbiAgICBpZiAoZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgIH0gZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudCkge1xuICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgIGlmIChjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJykucmVwbGFjZSgvXlxccysvLCAnJykucmVwbGFjZSgvXFxzKyQvLCAnJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb207XG4gIH0sXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IGNsYXNzTmFtZSkge1xuICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgIHZhciBpbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBkb207XG4gIH0sXG4gIGhhc0NsYXNzOiBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKS50ZXN0KGVsZW0uY2xhc3NOYW1lKSB8fCBmYWxzZTtcbiAgfSxcbiAgZ2V0V2lkdGg6IGZ1bmN0aW9uIGdldFdpZHRoKGVsZW0pIHtcbiAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItbGVmdC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1yaWdodC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlLndpZHRoKTtcbiAgfSxcbiAgZ2V0SGVpZ2h0OiBmdW5jdGlvbiBnZXRIZWlnaHQoZWxlbSkge1xuICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci10b3Atd2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItYm90dG9tLXdpZHRoJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy10b3AnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWJvdHRvbSddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGUuaGVpZ2h0KTtcbiAgfSxcbiAgZ2V0T2Zmc2V0OiBmdW5jdGlvbiBnZXRPZmZzZXQoZWwpIHtcbiAgICB2YXIgZWxlbSA9IGVsO1xuICAgIHZhciBvZmZzZXQgPSB7IGxlZnQ6IDAsIHRvcDogMCB9O1xuICAgIGlmIChlbGVtLm9mZnNldFBhcmVudCkge1xuICAgICAgZG8ge1xuICAgICAgICBvZmZzZXQubGVmdCArPSBlbGVtLm9mZnNldExlZnQ7XG4gICAgICAgIG9mZnNldC50b3AgKz0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICAgIGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudDtcbiAgICAgIH0gd2hpbGUgKGVsZW0pO1xuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9LFxuICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoZWxlbSkge1xuICAgIHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIChlbGVtLnR5cGUgfHwgZWxlbS5ocmVmKTtcbiAgfVxufTtcblxudmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKEJvb2xlYW5Db250cm9sbGVyLCBfQ29udHJvbGxlcik7XG4gIGZ1bmN0aW9uIEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBCb29sZWFuQ29udHJvbGxlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEJvb2xlYW5Db250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQm9vbGVhbkNvbnRyb2xsZXIpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcbiAgICB2YXIgX3RoaXMgPSBfdGhpczI7XG4gICAgX3RoaXMyLl9fcHJldiA9IF90aGlzMi5nZXRWYWx1ZSgpO1xuICAgIF90aGlzMi5fX2NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBfdGhpczIuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKCFfdGhpcy5fX3ByZXYpO1xuICAgIH1cbiAgICBkb20uYmluZChfdGhpczIuX19jaGVja2JveCwgJ2NoYW5nZScsIG9uQ2hhbmdlLCBmYWxzZSk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fY2hlY2tib3gpO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhCb29sZWFuQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcbiAgICAgIHZhciB0b1JldHVybiA9IGdldChCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUpLCAnc2V0VmFsdWUnLCB0aGlzKS5jYWxsKHRoaXMsIHYpO1xuICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlRGlzcGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgICBpZiAodGhpcy5nZXRWYWx1ZSgpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX19wcmV2ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX19wcmV2ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0KEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZSksICd1cGRhdGVEaXNwbGF5JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xufShDb250cm9sbGVyKTtcblxudmFyIE9wdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoT3B0aW9uQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIG9wdHMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBPcHRpb25Db250cm9sbGVyKTtcbiAgICB2YXIgX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoT3B0aW9uQ29udHJvbGxlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9wdGlvbkNvbnRyb2xsZXIpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHM7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5fX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIGlmIChDb21tb24uaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgQ29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgbWFwW2VsZW1lbnRdID0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgICAgb3B0aW9ucyA9IG1hcDtcbiAgICB9XG4gICAgQ29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBrZXk7XG4gICAgICBvcHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIF90aGlzLl9fc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgfSk7XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBkb20uYmluZChfdGhpczIuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGVzaXJlZFZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShkZXNpcmVkVmFsdWUpO1xuICAgIH0pO1xuICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX3NlbGVjdCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhPcHRpb25Db250cm9sbGVyLCBbe1xuICAgIGtleTogJ3NldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUodikge1xuICAgICAgdmFyIHRvUmV0dXJuID0gZ2V0KE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUpLCAnc2V0VmFsdWUnLCB0aGlzKS5jYWxsKHRoaXMsIHYpO1xuICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgaWYgKGRvbS5pc0FjdGl2ZSh0aGlzLl9fc2VsZWN0KSkgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9fc2VsZWN0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgcmV0dXJuIGdldChPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3VwZGF0ZURpc3BsYXknLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gT3B0aW9uQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbnZhciBTdHJpbmdDb250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKFN0cmluZ0NvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcbiAgZnVuY3Rpb24gU3RyaW5nQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RyaW5nQ29udHJvbGxlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFN0cmluZ0NvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTdHJpbmdDb250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIF90aGlzMi5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBfdGhpczIuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5dXAnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhTdHJpbmdDb250cm9sbGVyLCBbe1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgaWYgKCFkb20uaXNBY3RpdmUodGhpcy5fX2lucHV0KSkge1xuICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0KFN0cmluZ0NvbnRyb2xsZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUpLCAndXBkYXRlRGlzcGxheScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTdHJpbmdDb250cm9sbGVyO1xufShDb250cm9sbGVyKTtcblxuZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICB2YXIgX3ggPSB4LnRvU3RyaW5nKCk7XG4gIGlmIChfeC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgIHJldHVybiBfeC5sZW5ndGggLSBfeC5pbmRleE9mKCcuJykgLSAxO1xuICB9XG4gIHJldHVybiAwO1xufVxudmFyIE51bWJlckNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXIpO1xuICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE51bWJlckNvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOdW1iZXJDb250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIF9wYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgX3RoaXMuX19taW4gPSBfcGFyYW1zLm1pbjtcbiAgICBfdGhpcy5fX21heCA9IF9wYXJhbXMubWF4O1xuICAgIF90aGlzLl9fc3RlcCA9IF9wYXJhbXMuc3RlcDtcbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKF90aGlzLl9fc3RlcCkpIHtcbiAgICAgIGlmIChfdGhpcy5pbml0aWFsVmFsdWUgPT09IDApIHtcbiAgICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coTWF0aC5hYnMoX3RoaXMuaW5pdGlhbFZhbHVlKSkgLyBNYXRoLkxOMTApKSAvIDEwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gX3RoaXMuX19zdGVwO1xuICAgIH1cbiAgICBfdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKF90aGlzLl9faW1wbGllZFN0ZXApO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBjcmVhdGVDbGFzcyhOdW1iZXJDb250cm9sbGVyLCBbe1xuICAgIGtleTogJ3NldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUodikge1xuICAgICAgdmFyIF92ID0gdjtcbiAgICAgIGlmICh0aGlzLl9fbWluICE9PSB1bmRlZmluZWQgJiYgX3YgPCB0aGlzLl9fbWluKSB7XG4gICAgICAgIF92ID0gdGhpcy5fX21pbjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fX21heCAhPT0gdW5kZWZpbmVkICYmIF92ID4gdGhpcy5fX21heCkge1xuICAgICAgICBfdiA9IHRoaXMuX19tYXg7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX3N0ZXAgIT09IHVuZGVmaW5lZCAmJiBfdiAlIHRoaXMuX19zdGVwICE9PSAwKSB7XG4gICAgICAgIF92ID0gTWF0aC5yb3VuZChfdiAvIHRoaXMuX19zdGVwKSAqIHRoaXMuX19zdGVwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldChOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3NldFZhbHVlJywgdGhpcykuY2FsbCh0aGlzLCBfdik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWluJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWluKG1pblZhbHVlKSB7XG4gICAgICB0aGlzLl9fbWluID0gbWluVmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXgobWF4VmFsdWUpIHtcbiAgICAgIHRoaXMuX19tYXggPSBtYXhWYWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0ZXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGVwKHN0ZXBWYWx1ZSkge1xuICAgICAgdGhpcy5fX3N0ZXAgPSBzdGVwVmFsdWU7XG4gICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSBzdGVwVmFsdWU7XG4gICAgICB0aGlzLl9fcHJlY2lzaW9uID0gbnVtRGVjaW1hbHMoc3RlcFZhbHVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIHJvdW5kVG9EZWNpbWFsKHZhbHVlLCBkZWNpbWFscykge1xuICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHRlblRvKSAvIHRlblRvO1xufVxudmFyIE51bWJlckNvbnRyb2xsZXJCb3ggPSBmdW5jdGlvbiAoX051bWJlckNvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlckJveCwgX051bWJlckNvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyQm94KG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXJCb3gpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOdW1iZXJDb250cm9sbGVyQm94Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTnVtYmVyQ29udHJvbGxlckJveCkpLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSk7XG4gICAgX3RoaXMyLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuICAgIHZhciBfdGhpcyA9IF90aGlzMjtcbiAgICB2YXIgcHJldlkgPSB2b2lkIDA7XG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICB2YXIgYXR0ZW1wdGVkID0gcGFyc2VGbG9hdChfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICAgIGlmICghQ29tbW9uLmlzTmFOKGF0dGVtcHRlZCkpIHtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoYXR0ZW1wdGVkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25GaW5pc2goKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBvbkZpbmlzaCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG4gICAgICB2YXIgZGlmZiA9IHByZXZZIC0gZS5jbGllbnRZO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuZ2V0VmFsdWUoKSArIGRpZmYgKiBfdGhpcy5fX2ltcGxpZWRTdGVwKTtcbiAgICAgIHByZXZZID0gZS5jbGllbnRZO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBvbkZpbmlzaCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIHByZXZZID0gZS5jbGllbnRZO1xuICAgIH1cbiAgICBfdGhpczIuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgX3RoaXMyLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICAgIG9uRmluaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhOdW1iZXJDb250cm9sbGVyQm94LCBbe1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xuICAgICAgcmV0dXJuIGdldChOdW1iZXJDb250cm9sbGVyQm94LnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE51bWJlckNvbnRyb2xsZXJCb3gucHJvdG90eXBlKSwgJ3VwZGF0ZURpc3BsYXknLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcbn0oTnVtYmVyQ29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIG1hcCh2LCBpMSwgaTIsIG8xLCBvMikge1xuICByZXR1cm4gbzEgKyAobzIgLSBvMSkgKiAoKHYgLSBpMSkgLyAoaTIgLSBpMSkpO1xufVxudmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbiAoX051bWJlckNvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlclNsaWRlciwgX051bWJlckNvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIG1pbiwgbWF4LCBzdGVwKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTnVtYmVyQ29udHJvbGxlclNsaWRlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE51bWJlckNvbnRyb2xsZXJTbGlkZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOdW1iZXJDb250cm9sbGVyU2xpZGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogbWluLCBtYXg6IG1heCwgc3RlcDogc3RlcCB9KSk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19mb3JlZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19iYWNrZ3JvdW5kLCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCk7XG4gICAgZG9tLmFkZENsYXNzKF90aGlzMi5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcbiAgICBkb20uYWRkQ2xhc3MoX3RoaXMyLl9fZm9yZWdyb3VuZCwgJ3NsaWRlci1mZycpO1xuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBvbk1vdXNlRHJhZyhlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGJnUmVjdCA9IF90aGlzLl9fYmFja2dyb3VuZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIF90aGlzLnNldFZhbHVlKG1hcChlLmNsaWVudFgsIGJnUmVjdC5sZWZ0LCBiZ1JlY3QucmlnaHQsIF90aGlzLl9fbWluLCBfdGhpcy5fX21heCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZG9tLmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbiAgICAgIG9uVG91Y2hNb3ZlKGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICB2YXIgY2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgdmFyIGJnUmVjdCA9IF90aGlzLl9fYmFja2dyb3VuZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIF90aGlzLnNldFZhbHVlKG1hcChjbGllbnRYLCBiZ1JlY3QubGVmdCwgYmdSZWN0LnJpZ2h0LCBfdGhpcy5fX21pbiwgX3RoaXMuX19tYXgpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Ub3VjaEVuZCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd0b3VjaGVuZCcsIG9uVG91Y2hFbmQpO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBfdGhpczIuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKF90aGlzMi5fX2ZvcmVncm91bmQpO1xuICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2JhY2tncm91bmQpO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoTnVtYmVyQ29udHJvbGxlclNsaWRlciwgW3tcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikgLyAodGhpcy5fX21heCAtIHRoaXMuX19taW4pO1xuICAgICAgdGhpcy5fX2ZvcmVncm91bmQuc3R5bGUud2lkdGggPSBwY3QgKiAxMDAgKyAnJSc7XG4gICAgICByZXR1cm4gZ2V0KE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUpLCAndXBkYXRlRGlzcGxheScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xufShOdW1iZXJDb250cm9sbGVyKTtcblxudmFyIEZ1bmN0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xuICBpbmhlcml0cyhGdW5jdGlvbkNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcbiAgZnVuY3Rpb24gRnVuY3Rpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIHRleHQpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBGdW5jdGlvbkNvbnRyb2xsZXIpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChGdW5jdGlvbkNvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGdW5jdGlvbkNvbnRyb2xsZXIpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcbiAgICB2YXIgX3RoaXMgPSBfdGhpczI7XG4gICAgX3RoaXMyLl9fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fYnV0dG9uLmlubmVySFRNTCA9IHRleHQgPT09IHVuZGVmaW5lZCA/ICdGaXJlJyA6IHRleHQ7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgX3RoaXMuZmlyZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIGRvbS5hZGRDbGFzcyhfdGhpczIuX19idXR0b24sICdidXR0b24nKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19idXR0b24pO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoRnVuY3Rpb25Db250cm9sbGVyLCBbe1xuICAgIGtleTogJ2ZpcmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaXJlKCkge1xuICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2V0VmFsdWUoKS5jYWxsKHRoaXMub2JqZWN0KTtcbiAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbnZhciBDb2xvckNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoQ29sb3JDb250cm9sbGVyLCBfQ29udHJvbGxlcik7XG4gIGZ1bmN0aW9uIENvbG9yQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sb3JDb250cm9sbGVyKTtcbiAgICB2YXIgX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ29sb3JDb250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sb3JDb250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgX3RoaXMyLl9fY29sb3IgPSBuZXcgQ29sb3IoX3RoaXMyLmdldFZhbHVlKCkpO1xuICAgIF90aGlzMi5fX3RlbXAgPSBuZXcgQ29sb3IoMCk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKF90aGlzMi5kb21FbGVtZW50LCBmYWxzZSk7XG4gICAgX3RoaXMyLl9fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19zZWxlY3Rvci5jbGFzc05hbWUgPSAnc2VsZWN0b3InO1xuICAgIF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcbiAgICBfdGhpczIuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fZmllbGRfa25vYi5jbGFzc05hbWUgPSAnZmllbGQta25vYic7XG4gICAgX3RoaXMyLl9fZmllbGRfa25vYl9ib3JkZXIgPSAnMnB4IHNvbGlkICc7XG4gICAgX3RoaXMyLl9faHVlX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19odWVfa25vYi5jbGFzc05hbWUgPSAnaHVlLWtub2InO1xuICAgIF90aGlzMi5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIF90aGlzMi5fX2h1ZV9maWVsZC5jbGFzc05hbWUgPSAnaHVlLWZpZWxkJztcbiAgICBfdGhpczIuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgX3RoaXMyLl9faW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBfdGhpczIuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBvbkJsdXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NlbGVjdG9yLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKCkgICAgICAgIHtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLCAnZHJhZycpLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZ1bmN0aW9uICgpICAgICAgICB7XG4gICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fc2VsZWN0b3IsICd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKCkgICAgICAgIHtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLCAnZHJhZycpLmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSAgICAgICAge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19zZWxlY3Rvci5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMjJweCcsXG4gICAgICBoZWlnaHQ6ICcxMDJweCcsXG4gICAgICBwYWRkaW5nOiAnM3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xuICAgIH0pO1xuICAgIENvbW1vbi5leHRlbmQoX3RoaXMyLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICBib3JkZXI6IF90aGlzMi5fX2ZpZWxkX2tub2JfYm9yZGVyICsgKF90aGlzMi5fX2NvbG9yLnYgPCAwLjUgPyAnI2ZmZicgOiAnIzAwMCcpLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19odWVfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMnB4JyxcbiAgICAgIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNmZmYnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnM3B4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9KTtcbiAgICBDb21tb24uZXh0ZW5kKHZhbHVlRmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgIH0pO1xuICAgIGxpbmVhckdyYWRpZW50KHZhbHVlRmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19odWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBjdXJzb3I6ICducy1yZXNpemUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6ICczcHgnLFxuICAgICAgcmlnaHQ6ICczcHgnXG4gICAgfSk7XG4gICAgaHVlR3JhZGllbnQoX3RoaXMyLl9faHVlX2ZpZWxkKTtcbiAgICBDb21tb24uZXh0ZW5kKF90aGlzMi5fX2lucHV0LnN0eWxlLCB7XG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlcjogMCxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIHRleHRTaGFkb3c6IF90aGlzMi5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgwLDAsMCwwLjcpJ1xuICAgIH0pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQsICd0b3VjaHN0YXJ0JywgZmllbGREb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19maWVsZF9rbm9iLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19maWVsZF9rbm9iLCAndG91Y2hzdGFydCcsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faHVlX2ZpZWxkLCAnbW91c2Vkb3duJywgZmllbGREb3duSCk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faHVlX2ZpZWxkLCAndG91Y2hzdGFydCcsIGZpZWxkRG93bkgpO1xuICAgIGZ1bmN0aW9uIGZpZWxkRG93bihlKSB7XG4gICAgICBzZXRTVihlKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwU1YpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmaWVsZFVwU1YpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaWVsZERvd25IKGUpIHtcbiAgICAgIHNldEgoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIHNldEgpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZmllbGRVcEgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaWVsZFVwU1YoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZmllbGRVcFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmaWVsZFVwU1YpO1xuICAgICAgb25GaW5pc2goKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmllbGRVcEgoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd0b3VjaG1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmaWVsZFVwSCk7XG4gICAgICBvbkZpbmlzaCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLnZhbHVlKTtcbiAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuICAgICAgICBfdGhpcy5fX2NvbG9yLl9fc3RhdGUgPSBpO1xuICAgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlID0gX3RoaXMuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlRmllbGQpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX2ZpZWxkX2tub2IpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX2h1ZV9maWVsZCk7XG4gICAgX3RoaXMyLl9faHVlX2ZpZWxkLmFwcGVuZENoaWxkKF90aGlzMi5fX2h1ZV9rbm9iKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fc2VsZWN0b3IpO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgZnVuY3Rpb24gc2V0U1YoZSkge1xuICAgICAgaWYgKGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAtMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICB2YXIgZmllbGRSZWN0ID0gX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIF9yZWYgPSBlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdIHx8IGUsXG4gICAgICAgICAgY2xpZW50WCA9IF9yZWYuY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZID0gX3JlZi5jbGllbnRZO1xuICAgICAgdmFyIHMgPSAoY2xpZW50WCAtIGZpZWxkUmVjdC5sZWZ0KSAvIChmaWVsZFJlY3QucmlnaHQgLSBmaWVsZFJlY3QubGVmdCk7XG4gICAgICB2YXIgdiA9IDEgLSAoY2xpZW50WSAtIGZpZWxkUmVjdC50b3ApIC8gKGZpZWxkUmVjdC5ib3R0b20gLSBmaWVsZFJlY3QudG9wKTtcbiAgICAgIGlmICh2ID4gMSkge1xuICAgICAgICB2ID0gMTtcbiAgICAgIH0gZWxzZSBpZiAodiA8IDApIHtcbiAgICAgICAgdiA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocyA+IDEpIHtcbiAgICAgICAgcyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHMgPCAwKSB7XG4gICAgICAgIHMgPSAwO1xuICAgICAgfVxuICAgICAgX3RoaXMuX19jb2xvci52ID0gdjtcbiAgICAgIF90aGlzLl9fY29sb3IucyA9IHM7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEgoZSkge1xuICAgICAgaWYgKGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAtMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICB2YXIgZmllbGRSZWN0ID0gX3RoaXMuX19odWVfZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgX3JlZjIgPSBlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdIHx8IGUsXG4gICAgICAgICAgY2xpZW50WSA9IF9yZWYyLmNsaWVudFk7XG4gICAgICB2YXIgaCA9IDEgLSAoY2xpZW50WSAtIGZpZWxkUmVjdC50b3ApIC8gKGZpZWxkUmVjdC5ib3R0b20gLSBmaWVsZFJlY3QudG9wKTtcbiAgICAgIGlmIChoID4gMSkge1xuICAgICAgICBoID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoaCA8IDApIHtcbiAgICAgICAgaCA9IDA7XG4gICAgICB9XG4gICAgICBfdGhpcy5fX2NvbG9yLmggPSBoICogMzYwO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG4gIGNyZWF0ZUNsYXNzKENvbG9yQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdmFyIG1pc21hdGNoID0gZmFsc2U7XG4gICAgICAgIENvbW1vbi5lYWNoKENvbG9yLkNPTVBPTkVOVFMsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICBpZiAoIUNvbW1vbi5pc1VuZGVmaW5lZChpW2NvbXBvbmVudF0pICYmICFDb21tb24uaXNVbmRlZmluZWQodGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkgJiYgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XG4gICAgICAgICAgICBtaXNtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgaWYgKG1pc21hdGNoKSB7XG4gICAgICAgICAgQ29tbW9uLmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIENvbW1vbi5leHRlbmQodGhpcy5fX3RlbXAuX19zdGF0ZSwgdGhpcy5fX2NvbG9yLl9fc3RhdGUpO1xuICAgICAgdGhpcy5fX3RlbXAuYSA9IDE7XG4gICAgICB2YXIgZmxpcCA9IHRoaXMuX19jb2xvci52IDwgMC41IHx8IHRoaXMuX19jb2xvci5zID4gMC41ID8gMjU1IDogMDtcbiAgICAgIHZhciBfZmxpcCA9IDI1NSAtIGZsaXA7XG4gICAgICBDb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXG4gICAgICAgIG1hcmdpblRvcDogMTAwICogKDEgLSB0aGlzLl9fY29sb3IudikgLSA3ICsgJ3B4JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9fdGVtcC50b0hleFN0cmluZygpLFxuICAgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArICcpJ1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9faHVlX2tub2Iuc3R5bGUubWFyZ2luVG9wID0gKDEgLSB0aGlzLl9fY29sb3IuaCAvIDM2MCkgKiAxMDAgKyAncHgnO1xuICAgICAgdGhpcy5fX3RlbXAucyA9IDE7XG4gICAgICB0aGlzLl9fdGVtcC52ID0gMTtcbiAgICAgIGxpbmVhckdyYWRpZW50KHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbGVmdCcsICcjZmZmJywgdGhpcy5fX3RlbXAudG9IZXhTdHJpbmcoKSk7XG4gICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIENvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX2NvbG9yLnRvSGV4U3RyaW5nKCksXG4gICAgICAgIGNvbG9yOiAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKyAnKScsXG4gICAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArICcsLjcpJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xvckNvbnRyb2xsZXI7XG59KENvbnRyb2xsZXIpO1xudmFyIHZlbmRvcnMgPSBbJy1tb3otJywgJy1vLScsICctd2Via2l0LScsICctbXMtJywgJyddO1xuZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xuICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgQ29tbW9uLmVhY2godmVuZG9ycywgZnVuY3Rpb24gKHZlbmRvcikge1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogJyArIHZlbmRvciArICdsaW5lYXItZ3JhZGllbnQoJyArIHggKyAnLCAnICsgYSArICcgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcbiAgfSk7XG59XG5mdW5jdGlvbiBodWVHcmFkaWVudChlbGVtKSB7XG4gIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsICNmZjAwZmYgMTclLCAjMDAwMGZmIDM0JSwgIzAwZmZmZiA1MCUsICMwMGZmMDAgNjclLCAjZmZmZjAwIDg0JSwgI2ZmMDAwMCAxMDAlKTsnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7JztcbiAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7Jztcbn1cblxudmFyIGNzcyA9IHtcbiAgbG9hZDogZnVuY3Rpb24gbG9hZCh1cmwsIGluZG9jKSB7XG4gICAgdmFyIGRvYyA9IGluZG9jIHx8IGRvY3VtZW50O1xuICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgfSxcbiAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoY3NzQ29udGVudCwgaW5kb2MpIHtcbiAgICB2YXIgZG9jID0gaW5kb2MgfHwgZG9jdW1lbnQ7XG4gICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBpbmplY3RlZC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBpbmplY3RlZC5pbm5lckhUTUwgPSBjc3NDb250ZW50O1xuICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgdHJ5IHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoaW5qZWN0ZWQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBzYXZlRGlhbG9nQ29udGVudHMgPSBcIjxkaXYgaWQ9XFxcImRnLXNhdmVcXFwiIGNsYXNzPVxcXCJkZyBkaWFsb2d1ZVxcXCI+XFxuXFxuICBIZXJlJ3MgdGhlIG5ldyBsb2FkIHBhcmFtZXRlciBmb3IgeW91ciA8Y29kZT5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3I6XFxuXFxuICA8dGV4dGFyZWEgaWQ9XFxcImRnLW5ldy1jb25zdHJ1Y3RvclxcXCI+PC90ZXh0YXJlYT5cXG5cXG4gIDxkaXYgaWQ9XFxcImRnLXNhdmUtbG9jYWxseVxcXCI+XFxuXFxuICAgIDxpbnB1dCBpZD1cXFwiZGctbG9jYWwtc3RvcmFnZVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiLz4gQXV0b21hdGljYWxseSBzYXZlXFxuICAgIHZhbHVlcyB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IG9uIGV4aXQuXFxuXFxuICAgIDxkaXYgaWQ9XFxcImRnLWxvY2FsLWV4cGxhaW5cXFwiPlRoZSB2YWx1ZXMgc2F2ZWQgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiB3aWxsXFxuICAgICAgb3ZlcnJpZGUgdGhvc2UgcGFzc2VkIHRvIDxjb2RlPmRhdC5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3IuIFRoaXMgbWFrZXMgaXRcXG4gICAgICBlYXNpZXIgdG8gd29yayBpbmNyZW1lbnRhbGx5LCBidXQgPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBpcyBmcmFnaWxlLFxcbiAgICAgIGFuZCB5b3VyIGZyaWVuZHMgbWF5IG5vdCBzZWUgdGhlIHNhbWUgdmFsdWVzIHlvdSBkby5cXG5cXG4gICAgPC9kaXY+XFxuXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIjtcblxudmFyIENvbnRyb2xsZXJGYWN0b3J5ID0gZnVuY3Rpb24gQ29udHJvbGxlckZhY3Rvcnkob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB2YXIgaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgaWYgKENvbW1vbi5pc0FycmF5KGFyZ3VtZW50c1syXSkgfHwgQ29tbW9uLmlzT2JqZWN0KGFyZ3VtZW50c1syXSkpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdKTtcbiAgfVxuICBpZiAoQ29tbW9uLmlzTnVtYmVyKGluaXRpYWxWYWx1ZSkpIHtcbiAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1szXSkpIHtcbiAgICAgIGlmIChDb21tb24uaXNOdW1iZXIoYXJndW1lbnRzWzRdKSkge1xuICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgIH1cbiAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1s0XSkpIHtcbiAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSwgc3RlcDogYXJndW1lbnRzWzRdIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10gfSk7XG4gIH1cbiAgaWYgKENvbW1vbi5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICB9XG4gIGlmIChDb21tb24uaXNGdW5jdGlvbihpbml0aWFsVmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgJycpO1xuICB9XG4gIGlmIChDb21tb24uaXNCb29sZWFuKGluaXRpYWxWYWx1ZSkpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gIHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG59XG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG52YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENlbnRlcmVkRGl2KCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENlbnRlcmVkRGl2KTtcbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgQ29tbW9uLmV4dGVuZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuOCknLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDAnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJyxcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuICAgIGRvbS5tYWtlRnVsbHNjcmVlbih0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBDb21tb24uZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAxJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcicsXG4gICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBkb20uYmluZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5oaWRlKCk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoQ2VudGVyZWREaXYsIFt7XG4gICAga2V5OiAnc2hvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgQ29tbW9uLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIHZhciBoaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIH07XG4gICAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbGF5b3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGF5b3V0KCkge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBkb20uZ2V0V2lkdGgodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBkb20uZ2V0SGVpZ2h0KHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENlbnRlcmVkRGl2O1xufSgpO1xuXG52YXIgc3R5bGVTaGVldCA9IF9fXyRpbnNlcnRTdHlsZShcIi5kZyB1bHtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7Y2xlYXI6Ym90aH0uZGcuYWN7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjA7ei1pbmRleDowfS5kZzpub3QoLmFjKSAubWFpbntvdmVyZmxvdzpoaWRkZW59LmRnLm1haW57LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgbGluZWFyfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvd3tvdmVyZmxvdy15OmF1dG99LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b257b3BhY2l0eToxO21hcmdpbi10b3A6LTFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjMmMyYzJjfS5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MSAhaW1wb3J0YW50fS5kZy5tYWluOmhvdmVyIC5jbG9zZS1idXR0b24sLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFne29wYWNpdHk6MX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjtib3JkZXI6MDtsaW5lLWhlaWdodDoxOXB4O2hlaWdodDoyMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6IzAwMH0uZGcubWFpbiAuY2xvc2UtYnV0dG9uLmNsb3NlLXRvcHtwb3NpdGlvbjpyZWxhdGl2ZX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uLmNsb3NlLWJvdHRvbXtwb3NpdGlvbjphYnNvbHV0ZX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzExMX0uZGcuYXtmbG9hdDpyaWdodDttYXJnaW4tcmlnaHQ6MTVweDtvdmVyZmxvdy15OnZpc2libGV9LmRnLmEuaGFzLXNhdmU+dWwuY2xvc2UtdG9we21hcmdpbi10b3A6MH0uZGcuYS5oYXMtc2F2ZT51bC5jbG9zZS1ib3R0b217bWFyZ2luLXRvcDoyN3B4fS5kZy5hLmhhcy1zYXZlPnVsLmNsb3NlZHttYXJnaW4tdG9wOjB9LmRnLmEgLnNhdmUtcm93e3RvcDowO3otaW5kZXg6MTAwMn0uZGcuYSAuc2F2ZS1yb3cuY2xvc2UtdG9we3Bvc2l0aW9uOnJlbGF0aXZlfS5kZy5hIC5zYXZlLXJvdy5jbG9zZS1ib3R0b217cG9zaXRpb246Zml4ZWR9LmRnIGxpey13ZWJraXQtdHJhbnNpdGlvbjpoZWlnaHQgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246aGVpZ2h0IC4xcyBlYXNlLW91dDstbW96LXRyYW5zaXRpb246aGVpZ2h0IC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmhlaWdodCAuMXMgZWFzZS1vdXQ7LXdlYmtpdC10cmFuc2l0aW9uOm92ZXJmbG93IC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvdmVyZmxvdyAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvdmVyZmxvdyAuMXMgbGluZWFyO3RyYW5zaXRpb246b3ZlcmZsb3cgLjFzIGxpbmVhcn0uZGcgbGk6bm90KC5mb2xkZXIpe2N1cnNvcjphdXRvO2hlaWdodDoyN3B4O2xpbmUtaGVpZ2h0OjI3cHg7cGFkZGluZzowIDRweCAwIDVweH0uZGcgbGkuZm9sZGVye3BhZGRpbmc6MDtib3JkZXItbGVmdDo0cHggc29saWQgcmdiYSgwLDAsMCwwKX0uZGcgbGkudGl0bGV7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6LTRweH0uZGcgLmNsb3NlZCBsaTpub3QoLnRpdGxlKSwuZGcgLmNsb3NlZCB1bCBsaSwuZGcgLmNsb3NlZCB1bCBsaT4qe2hlaWdodDowO292ZXJmbG93OmhpZGRlbjtib3JkZXI6MH0uZGcgLmNye2NsZWFyOmJvdGg7cGFkZGluZy1sZWZ0OjNweDtoZWlnaHQ6MjdweDtvdmVyZmxvdzpoaWRkZW59LmRnIC5wcm9wZXJ0eS1uYW1le2N1cnNvcjpkZWZhdWx0O2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDt3aWR0aDo0MCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmRnIC5je2Zsb2F0OmxlZnQ7d2lkdGg6NjAlO3Bvc2l0aW9uOnJlbGF0aXZlfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JvcmRlcjowO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6M3B4O3dpZHRoOjEwMCU7ZmxvYXQ6cmlnaHR9LmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6MzAlO21hcmdpbi1sZWZ0OjB9LmRnIC5zbGlkZXJ7ZmxvYXQ6bGVmdDt3aWR0aDo2NiU7bWFyZ2luLWxlZnQ6LTVweDttYXJnaW4tcmlnaHQ6MDtoZWlnaHQ6MTlweDttYXJnaW4tdG9wOjRweH0uZGcgLnNsaWRlci1mZ3toZWlnaHQ6MTAwJX0uZGcgLmMgaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDo3cHh9LmRnIC5jIHNlbGVjdHttYXJnaW4tdG9wOjVweH0uZGcgLmNyLmZ1bmN0aW9uLC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsLmRnIC5jci5mdW5jdGlvbiAqLC5kZyAuY3IuYm9vbGVhbiwuZGcgLmNyLmJvb2xlYW4gKntjdXJzb3I6cG9pbnRlcn0uZGcgLmNyLmNvbG9ye292ZXJmbG93OnZpc2libGV9LmRnIC5zZWxlY3RvcntkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6LTlweDttYXJnaW4tdG9wOjIzcHg7ei1pbmRleDoxMH0uZGcgLmM6aG92ZXIgLnNlbGVjdG9yLC5kZyAuc2VsZWN0b3IuZHJhZ3tkaXNwbGF5OmJsb2NrfS5kZyBsaS5zYXZlLXJvd3twYWRkaW5nOjB9LmRnIGxpLnNhdmUtcm93IC5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowcHggNnB4fS5kZy5kaWFsb2d1ZXtiYWNrZ3JvdW5kLWNvbG9yOiMyMjI7d2lkdGg6NDYwcHg7cGFkZGluZzoxNXB4O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE1cHh9I2RnLW5ldy1jb25zdHJ1Y3RvcntwYWRkaW5nOjEwcHg7Y29sb3I6IzIyMjtmb250LWZhbWlseTpNb25hY28sIG1vbm9zcGFjZTtmb250LXNpemU6MTBweDtib3JkZXI6MDtyZXNpemU6bm9uZTtib3gtc2hhZG93Omluc2V0IDFweCAxcHggMXB4ICM4ODg7d29yZC13cmFwOmJyZWFrLXdvcmQ7bWFyZ2luOjEycHggMDtkaXNwbGF5OmJsb2NrO3dpZHRoOjQ0MHB4O292ZXJmbG93LXk6c2Nyb2xsO2hlaWdodDoxMDBweDtwb3NpdGlvbjpyZWxhdGl2ZX0jZGctbG9jYWwtZXhwbGFpbntkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MTdweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7cGFkZGluZzo4cHg7bWFyZ2luLXRvcDoxMHB4fSNkZy1sb2NhbC1leHBsYWluIGNvZGV7Zm9udC1zaXplOjEwcHh9I2RhdC1ndWktc2F2ZS1sb2NhbGx5e2Rpc3BsYXk6bm9uZX0uZGd7Y29sb3I6I2VlZTtmb250OjExcHggJ0x1Y2lkYSBHcmFuZGUnLCBzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgLTFweCAwICMxMTF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjVweDtiYWNrZ3JvdW5kOiMxYTFhMWF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lcntoZWlnaHQ6MDtkaXNwbGF5Om5vbmV9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQ6IzY3Njc2N30uZGcgbGk6bm90KC5mb2xkZXIpe2JhY2tncm91bmQ6IzFhMWExYTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMmMyYzJjfS5kZyBsaS5zYXZlLXJvd3tsaW5lLWhlaWdodDoyNXB4O2JhY2tncm91bmQ6I2RhZDVjYjtib3JkZXI6MH0uZGcgbGkuc2F2ZS1yb3cgc2VsZWN0e21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxMDhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbnttYXJnaW4tbGVmdDo1cHg7bWFyZ2luLXRvcDoxcHg7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjlweDtsaW5lLWhlaWdodDo3cHg7cGFkZGluZzo0cHggNHB4IDVweCA0cHg7YmFja2dyb3VuZDojYzViZGFkO2NvbG9yOiNmZmY7dGV4dC1zaGFkb3c6MCAxcHggMCAjYjBhNThmO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4ZjtjdXJzb3I6cG9pbnRlcn0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbi5nZWFyc3tiYWNrZ3JvdW5kOiNjNWJkYWQgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQXNBQUFBTkNBWUFBQUIvOVpRN0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBUUpKUkVGVWVOcGlZS0FVL1AvL1B3R0lDL0FwQ0FCaUJTQVcrSThBQ2xBY2dLeFE0VDlob01BRVVyeHgyUVNHTjYrZWdEWCsvdldUNGU3TjgyQU1Zb1BBeC9ldndXb1lvU1liQUNYMnM3S3hDeHpjc2V6RGgzZXZGb0RFQllURUVxeWNnZ1dBekE5QXVVU1FRZ2VZUGE5ZlB2Ni9ZV20vQWN4NUlQYjd0eS9mdytRWmJsdzY3dkRzOFIwWUh5UWhnT2J4K3lBSmtCcW1HNWRQUERoMWFQT0dSL2V1Z1cwRzR2bElvVElmeUZjQStRZWtoaEhKaFBkUXhiaUFJZ3VNQlRRWnJQRDcxMDhNNnJvV1lERlFpSUFBdjZBb3cvMWJGd1hnaXMrZjJMVUF5bndvSWFOY3o4WE54M0RsN01FSlVER1FweDlndFE4WUN1ZUIrRDI2T0VDQUFRRGFkdDdlNDZENDJRQUFBQUJKUlU1RXJrSmdnZz09KSAycHggMXB4IG5vLXJlcGVhdDtoZWlnaHQ6N3B4O3dpZHRoOjhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiYWIxOWU7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmfS5kZyBsaS5mb2xkZXJ7Ym9yZGVyLWJvdHRvbTowfS5kZyBsaS50aXRsZXtwYWRkaW5nLWxlZnQ6MTZweDtiYWNrZ3JvdW5kOiMwMDAgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsSStoS2dGeG9DZ0FPdz09KSA2cHggMTBweCBuby1yZXBlYXQ7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpfS5kZyAuY2xvc2VkIGxpLnRpdGxle2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsR0lXcU1DYldBRUFPdz09KX0uZGcgLmNyLmJvb2xlYW57Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICM4MDY3ODd9LmRnIC5jci5jb2xvcntib3JkZXItbGVmdDozcHggc29saWR9LmRnIC5jci5mdW5jdGlvbntib3JkZXItbGVmdDozcHggc29saWQgI2U2MWQ1Zn0uZGcgLmNyLm51bWJlcntib3JkZXItbGVmdDozcHggc29saWQgIzJGQTFENn0uZGcgLmNyLm51bWJlciBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMyRkExRDZ9LmRnIC5jci5zdHJpbmd7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMxZWQzNmZ9LmRnIC5jci5zdHJpbmcgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMWVkMzZmfS5kZyAuY3IuZnVuY3Rpb246aG92ZXIsLmRnIC5jci5ib29sZWFuOmhvdmVye2JhY2tncm91bmQ6IzExMX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtiYWNrZ3JvdW5kOiMzMDMwMzA7b3V0bGluZTpub25lfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpmb2N1c3tiYWNrZ3JvdW5kOiM0OTQ5NDk7Y29sb3I6I2ZmZn0uZGcgLmMgLnNsaWRlcntiYWNrZ3JvdW5kOiMzMDMwMzA7Y3Vyc29yOmV3LXJlc2l6ZX0uZGcgLmMgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiMyRkExRDY7bWF4LXdpZHRoOjEwMCV9LmRnIC5jIC5zbGlkZXI6aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyAuc2xpZGVyOmhvdmVyIC5zbGlkZXItZmd7YmFja2dyb3VuZDojNDRhYmRhfVxcblwiKTtcblxuY3NzLmluamVjdChzdHlsZVNoZWV0KTtcbnZhciBDU1NfTkFNRVNQQUNFID0gJ2RnJztcbnZhciBISURFX0tFWV9DT0RFID0gNzI7XG52YXIgQ0xPU0VfQlVUVE9OX0hFSUdIVCA9IDIwO1xudmFyIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSA9ICdEZWZhdWx0JztcbnZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJldHVybiAhIXdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0oKTtcbnZhciBTQVZFX0RJQUxPR1VFID0gdm9pZCAwO1xudmFyIGF1dG9QbGFjZVZpcmdpbiA9IHRydWU7XG52YXIgYXV0b1BsYWNlQ29udGFpbmVyID0gdm9pZCAwO1xudmFyIGhpZGUgPSBmYWxzZTtcbnZhciBoaWRlYWJsZUd1aXMgPSBbXTtcbnZhciBHVUkgPSBmdW5jdGlvbiBHVUkocGFycykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gcGFycyB8fCB7fTtcbiAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMuX191bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fdWwpO1xuICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBDU1NfTkFNRVNQQUNFKTtcbiAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcbiAgdGhpcy5fX2NvbnRyb2xsZXJzID0gW107XG4gIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cyA9IFtdO1xuICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzID0gW107XG4gIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcbiAgcGFyYW1zID0gQ29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgIGNsb3NlT25Ub3A6IGZhbHNlLFxuICAgIGF1dG9QbGFjZTogdHJ1ZSxcbiAgICB3aWR0aDogR1VJLkRFRkFVTFRfV0lEVEhcbiAgfSk7XG4gIHBhcmFtcyA9IENvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICByZXNpemFibGU6IHBhcmFtcy5hdXRvUGxhY2UsXG4gICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcbiAgfSk7XG4gIGlmICghQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5sb2FkKSkge1xuICAgIGlmIChwYXJhbXMucHJlc2V0KSB7XG4gICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSBwYXJhbXMucHJlc2V0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcbiAgfVxuICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5oaWRlYWJsZSkge1xuICAgIGhpZGVhYmxlR3Vpcy5wdXNoKHRoaXMpO1xuICB9XG4gIHBhcmFtcy5yZXNpemFibGUgPSBDb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnJlc2l6YWJsZTtcbiAgaWYgKHBhcmFtcy5hdXRvUGxhY2UgJiYgQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5zY3JvbGxhYmxlKSkge1xuICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgfVxuICB2YXIgdXNlTG9jYWxTdG9yYWdlID0gU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZSc7XG4gIHZhciBzYXZlVG9Mb2NhbFN0b3JhZ2UgPSB2b2lkIDA7XG4gIHZhciB0aXRsZVJvdyA9IHZvaWQgMDtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyxcbiAge1xuICAgIHBhcmVudDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xuICAgICAgfVxuICAgIH0sXG4gICAgc2Nyb2xsYWJsZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuc2Nyb2xsYWJsZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF1dG9QbGFjZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuYXV0b1BsYWNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2VPblRvcDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VPblRvcDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZXNldDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0Um9vdCgpLnByZXNldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQucHJlc2V0O1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgIF90aGlzLmdldFJvb3QoKS5wcmVzZXQgPSB2O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmFtcy5sb2FkLnByZXNldCA9IHY7XG4gICAgICAgIH1cbiAgICAgICAgc2V0UHJlc2V0U2VsZWN0SW5kZXgodGhpcyk7XG4gICAgICAgIF90aGlzLnJldmVydCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLndpZHRoO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgICAgcGFyYW1zLndpZHRoID0gdjtcbiAgICAgICAgc2V0V2lkdGgoX3RoaXMsIHYpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICAgIHBhcmFtcy5uYW1lID0gdjtcbiAgICAgICAgaWYgKHRpdGxlUm93KSB7XG4gICAgICAgICAgdGl0bGVSb3cuaW5uZXJIVE1MID0gcGFyYW1zLm5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb3NlZDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHY7XG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICAgIGlmIChfdGhpcy5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbG9hZDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVzZUxvY2FsU3RvcmFnZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiB1c2VMb2NhbFN0b3JhZ2U7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoYm9vbCkge1xuICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgICAgICAgIHVzZUxvY2FsU3RvcmFnZSA9IGJvb2w7XG4gICAgICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS51bmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2lzTG9jYWwnKSwgYm9vbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG4gICAgdGhpcy5jbG9zZWQgPSBwYXJhbXMuY2xvc2VkIHx8IGZhbHNlO1xuICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19NQUlOKTtcbiAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG4gICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgX3RoaXMudXNlTG9jYWxTdG9yYWdlID0gdHJ1ZTtcbiAgICAgICAgdmFyIHNhdmVkR3VpID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnZ3VpJykpO1xuICAgICAgICBpZiAoc2F2ZWRHdWkpIHtcbiAgICAgICAgICBwYXJhbXMubG9hZCA9IEpTT04ucGFyc2Uoc2F2ZWRHdWkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTik7XG4gICAgaWYgKHBhcmFtcy5jbG9zZU9uVG9wKSB7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfQ0xPU0VfVE9QKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5fX2Nsb3NlQnV0dG9uLCB0aGlzLmRvbUVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CT1RUT00pO1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jbG9zZUJ1dHRvbik7XG4gICAgfVxuICAgIGRvbS5iaW5kKHRoaXMuX19jbG9zZUJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLmNsb3NlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIHRpdGxlUm93TmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcbiAgICBkb20uYWRkQ2xhc3ModGl0bGVSb3dOYW1lLCAnY29udHJvbGxlci1uYW1lJyk7XG4gICAgdGl0bGVSb3cgPSBhZGRSb3coX3RoaXMsIHRpdGxlUm93TmFtZSk7XG4gICAgdmFyIG9uQ2xpY2tUaXRsZSA9IGZ1bmN0aW9uIG9uQ2xpY2tUaXRsZShlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgZG9tLmFkZENsYXNzKHRpdGxlUm93LCAndGl0bGUnKTtcbiAgICBkb20uYmluZCh0aXRsZVJvdywgJ2NsaWNrJywgb25DbGlja1RpdGxlKTtcbiAgICBpZiAoIXBhcmFtcy5jbG9zZWQpIHtcbiAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMuYXV0b1BsYWNlKSB7XG4gICAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuICAgICAgaWYgKGF1dG9QbGFjZVZpcmdpbikge1xuICAgICAgICBhdXRvUGxhY2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9QbGFjZUNvbnRhaW5lciwgQ1NTX05BTUVTUEFDRSk7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvUGxhY2VDb250YWluZXIsIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXV0b1BsYWNlQ29udGFpbmVyKTtcbiAgICAgICAgYXV0b1BsYWNlVmlyZ2luID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBhdXRvUGxhY2VDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19BVVRPX1BMQUNFKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgc2V0V2lkdGgoX3RoaXMsIHBhcmFtcy53aWR0aCk7XG4gICAgfVxuICB9XG4gIHRoaXMuX19yZXNpemVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIF90aGlzLm9uUmVzaXplRGVib3VuY2VkKCk7XG4gIH07XG4gIGRvbS5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcbiAgZG9tLmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcbiAgZG9tLmJpbmQodGhpcy5fX3VsLCAndHJhbnNpdGlvbmVuZCcsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcbiAgZG9tLmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XG4gIHRoaXMub25SZXNpemUoKTtcbiAgaWYgKHBhcmFtcy5yZXNpemFibGUpIHtcbiAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XG4gIH1cbiAgc2F2ZVRvTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdndWknKSwgSlNPTi5zdHJpbmdpZnkoX3RoaXMuZ2V0U2F2ZU9iamVjdCgpKSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUgPSBzYXZlVG9Mb2NhbFN0b3JhZ2U7XG4gIGZ1bmN0aW9uIHJlc2V0V2lkdGgoKSB7XG4gICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgcm9vdC53aWR0aCArPSAxO1xuICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICByb290LndpZHRoIC09IDE7XG4gICAgfSk7XG4gIH1cbiAgaWYgKCFwYXJhbXMucGFyZW50KSB7XG4gICAgcmVzZXRXaWR0aCgpO1xuICB9XG59O1xuR1VJLnRvZ2dsZUhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGhpZGUgPSAhaGlkZTtcbiAgQ29tbW9uLmVhY2goaGlkZWFibGVHdWlzLCBmdW5jdGlvbiAoZ3VpKSB7XG4gICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGhpZGUgPyAnbm9uZScgOiAnJztcbiAgfSk7XG59O1xuR1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XG5HVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIgPSAnYWMnO1xuR1VJLkNMQVNTX01BSU4gPSAnbWFpbic7XG5HVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xuR1VJLkNMQVNTX1RPT19UQUxMID0gJ3RhbGxlci10aGFuLXdpbmRvdyc7XG5HVUkuQ0xBU1NfQ0xPU0VEID0gJ2Nsb3NlZCc7XG5HVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XG5HVUkuQ0xBU1NfQ0xPU0VfVE9QID0gJ2Nsb3NlLXRvcCc7XG5HVUkuQ0xBU1NfQ0xPU0VfQk9UVE9NID0gJ2Nsb3NlLWJvdHRvbSc7XG5HVUkuQ0xBU1NfRFJBRyA9ICdkcmFnJztcbkdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xuR1VJLlRFWFRfQ0xPU0VEID0gJ0Nsb3NlIENvbnRyb2xzJztcbkdVSS5URVhUX09QRU4gPSAnT3BlbiBDb250cm9scyc7XG5HVUkuX2tleWRvd25IYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSAhPT0gJ3RleHQnICYmIChlLndoaWNoID09PSBISURFX0tFWV9DT0RFIHx8IGUua2V5Q29kZSA9PT0gSElERV9LRVlfQ09ERSkpIHtcbiAgICBHVUkudG9nZ2xlSGlkZSgpO1xuICB9XG59O1xuZG9tLmJpbmQod2luZG93LCAna2V5ZG93bicsIEdVSS5fa2V5ZG93bkhhbmRsZXIsIGZhbHNlKTtcbkNvbW1vbi5leHRlbmQoR1VJLnByb3RvdHlwZSxcbntcbiAgYWRkOiBmdW5jdGlvbiBhZGQob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBfYWRkKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHtcbiAgICAgIGZhY3RvcnlBcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG4gICAgfSk7XG4gIH0sXG4gIGFkZENvbG9yOiBmdW5jdGlvbiBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIF9hZGQodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwge1xuICAgICAgY29sb3I6IHRydWVcbiAgICB9KTtcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoY29udHJvbGxlcikge1xuICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChjb250cm9sbGVyLl9fbGkpO1xuICAgIHRoaXMuX19jb250cm9sbGVycy5zcGxpY2UodGhpcy5fX2NvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlciksIDEpO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgQ29tbW9uLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLm9uUmVzaXplKCk7XG4gICAgfSk7XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgdGhlIHJvb3QgR1VJIHNob3VsZCBiZSByZW1vdmVkIHdpdGggLmRlc3Ryb3koKS4gJyArICdGb3Igc3ViZm9sZGVycywgdXNlIGd1aS5yZW1vdmVGb2xkZXIoZm9sZGVyKSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgIGF1dG9QbGFjZUNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIENvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoc3ViZm9sZGVyKSB7XG4gICAgICBfdGhpcy5yZW1vdmVGb2xkZXIoc3ViZm9sZGVyKTtcbiAgICB9KTtcbiAgICBkb20udW5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBHVUkuX2tleWRvd25IYW5kbGVyLCBmYWxzZSk7XG4gICAgcmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuICB9LFxuICBhZGRGb2xkZXI6IGZ1bmN0aW9uIGFkZEZvbGRlcihuYW1lKSB7XG4gICAgaWYgKHRoaXMuX19mb2xkZXJzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgaGF2ZSBhIGZvbGRlciBpbiB0aGlzIEdVSSBieSB0aGUnICsgJyBuYW1lIFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICB9XG4gICAgdmFyIG5ld0d1aVBhcmFtcyA9IHsgbmFtZTogbmFtZSwgcGFyZW50OiB0aGlzIH07XG4gICAgbmV3R3VpUGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xuICAgIGlmICh0aGlzLmxvYWQgJiZcbiAgICB0aGlzLmxvYWQuZm9sZGVycyAmJlxuICAgIHRoaXMubG9hZC5mb2xkZXJzW25hbWVdKSB7XG4gICAgICBuZXdHdWlQYXJhbXMuY2xvc2VkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0uY2xvc2VkO1xuICAgICAgbmV3R3VpUGFyYW1zLmxvYWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXTtcbiAgICB9XG4gICAgdmFyIGd1aSA9IG5ldyBHVUkobmV3R3VpUGFyYW1zKTtcbiAgICB0aGlzLl9fZm9sZGVyc1tuYW1lXSA9IGd1aTtcbiAgICB2YXIgbGkgPSBhZGRSb3codGhpcywgZ3VpLmRvbUVsZW1lbnQpO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2ZvbGRlcicpO1xuICAgIHJldHVybiBndWk7XG4gIH0sXG4gIHJlbW92ZUZvbGRlcjogZnVuY3Rpb24gcmVtb3ZlRm9sZGVyKGZvbGRlcikge1xuICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChmb2xkZXIuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICBkZWxldGUgdGhpcy5fX2ZvbGRlcnNbZm9sZGVyLm5hbWVdO1xuICAgIGlmICh0aGlzLmxvYWQgJiZcbiAgICB0aGlzLmxvYWQuZm9sZGVycyAmJlxuICAgIHRoaXMubG9hZC5mb2xkZXJzW2ZvbGRlci5uYW1lXSkge1xuICAgICAgZGVsZXRlIHRoaXMubG9hZC5mb2xkZXJzW2ZvbGRlci5uYW1lXTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXJzKGZvbGRlcik7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBDb21tb24uZWFjaChmb2xkZXIuX19mb2xkZXJzLCBmdW5jdGlvbiAoc3ViZm9sZGVyKSB7XG4gICAgICBmb2xkZXIucmVtb3ZlRm9sZGVyKHN1YmZvbGRlcik7XG4gICAgfSk7XG4gICAgQ29tbW9uLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLm9uUmVzaXplKCk7XG4gICAgfSk7XG4gIH0sXG4gIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgfSxcbiAgaGlkZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSxcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9LFxuICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgdmFyIHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcbiAgICBpZiAocm9vdC5zY3JvbGxhYmxlKSB7XG4gICAgICB2YXIgdG9wID0gZG9tLmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcbiAgICAgIHZhciBoID0gMDtcbiAgICAgIENvbW1vbi5lYWNoKHJvb3QuX191bC5jaGlsZE5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoIShyb290LmF1dG9QbGFjZSAmJiBub2RlID09PSByb290Ll9fc2F2ZV9yb3cpKSB7XG4gICAgICAgICAgaCArPSBkb20uZ2V0SGVpZ2h0KG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xuICAgICAgICBkb20uYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm9vdC5fX3Jlc2l6ZV9oYW5kbGUpIHtcbiAgICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvb3QuX19yZXNpemVfaGFuZGxlLnN0eWxlLmhlaWdodCA9IHJvb3QuX191bC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChyb290Ll9fY2xvc2VCdXR0b24pIHtcbiAgICAgIHJvb3QuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHJvb3Qud2lkdGggKyAncHgnO1xuICAgIH1cbiAgfSxcbiAgb25SZXNpemVEZWJvdW5jZWQ6IENvbW1vbi5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICB9LCA1MCksXG4gIHJlbWVtYmVyOiBmdW5jdGlvbiByZW1lbWJlcigpIHtcbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKFNBVkVfRElBTE9HVUUpKSB7XG4gICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IENlbnRlcmVkRGl2KCk7XG4gICAgICBTQVZFX0RJQUxPR1VFLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gc2F2ZURpYWxvZ0NvbnRlbnRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBvbmx5IGNhbGwgcmVtZW1iZXIgb24gYSB0b3AgbGV2ZWwgR1VJLicpO1xuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIENvbW1vbi5lYWNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBhZGRTYXZlTWVudShfdGhpcyk7XG4gICAgICB9XG4gICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT09IC0xKSB7XG4gICAgICAgIF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgc2V0V2lkdGgodGhpcywgdGhpcy53aWR0aCk7XG4gICAgfVxuICB9LFxuICBnZXRSb290OiBmdW5jdGlvbiBnZXRSb290KCkge1xuICAgIHZhciBndWkgPSB0aGlzO1xuICAgIHdoaWxlIChndWkucGFyZW50KSB7XG4gICAgICBndWkgPSBndWkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gZ3VpO1xuICB9LFxuICBnZXRTYXZlT2JqZWN0OiBmdW5jdGlvbiBnZXRTYXZlT2JqZWN0KCkge1xuICAgIHZhciB0b1JldHVybiA9IHRoaXMubG9hZDtcbiAgICB0b1JldHVybi5jbG9zZWQgPSB0aGlzLmNsb3NlZDtcbiAgICBpZiAodGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xuICAgICAgaWYgKCF0b1JldHVybi5yZW1lbWJlcmVkKSB7XG4gICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgIH1cbiAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICB9XG4gICAgdG9SZXR1cm4uZm9sZGVycyA9IHt9O1xuICAgIENvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XG4gICAgICB0b1JldHVybi5mb2xkZXJzW2tleV0gPSBlbGVtZW50LmdldFNhdmVPYmplY3QoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG9SZXR1cm47XG4gIH0sXG4gIHNhdmU6IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xuICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlSWZQb3NzaWJsZSgpO1xuICB9LFxuICBzYXZlQXM6IGZ1bmN0aW9uIHNhdmVBcyhwcmVzZXROYW1lKSB7XG4gICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMsIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtwcmVzZXROYW1lXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgdGhpcy5wcmVzZXQgPSBwcmVzZXROYW1lO1xuICAgIGFkZFByZXNldE9wdGlvbih0aGlzLCBwcmVzZXROYW1lLCB0cnVlKTtcbiAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUoKTtcbiAgfSxcbiAgcmV2ZXJ0OiBmdW5jdGlvbiByZXZlcnQoZ3VpKSB7XG4gICAgQ29tbW9uLmVhY2godGhpcy5fX2NvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xuICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZShjb250cm9sbGVyLmluaXRpYWxWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XG4gICAgICB9XG4gICAgICBpZiAoY29udHJvbGxlci5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19vbkZpbmlzaENoYW5nZS5jYWxsKGNvbnRyb2xsZXIsIGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgQ29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uIChmb2xkZXIpIHtcbiAgICAgIGZvbGRlci5yZXZlcnQoZm9sZGVyKTtcbiAgICB9KTtcbiAgICBpZiAoIWd1aSkge1xuICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XG4gICAgfVxuICB9LFxuICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3Rlbihjb250cm9sbGVyKSB7XG4gICAgdmFyIGluaXQgPSB0aGlzLl9fbGlzdGVuaW5nLmxlbmd0aCA9PT0gMDtcbiAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XG4gICAgaWYgKGluaXQpIHtcbiAgICAgIHVwZGF0ZURpc3BsYXlzKHRoaXMuX19saXN0ZW5pbmcpO1xuICAgIH1cbiAgfSxcbiAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICBDb21tb24uZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcbiAgICBDb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24gKGZvbGRlcikge1xuICAgICAgZm9sZGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcbiAgfVxufSk7XG5mdW5jdGlvbiBhZGRSb3coZ3VpLCBuZXdEb20sIGxpQmVmb3JlKSB7XG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGlmIChuZXdEb20pIHtcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdEb20pO1xuICB9XG4gIGlmIChsaUJlZm9yZSkge1xuICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgbGlCZWZvcmUpO1xuICB9IGVsc2Uge1xuICAgIGd1aS5fX3VsLmFwcGVuZENoaWxkKGxpKTtcbiAgfVxuICBndWkub25SZXNpemUoKTtcbiAgcmV0dXJuIGxpO1xufVxuZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGd1aSkge1xuICBkb20udW5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIGd1aS5fX3Jlc2l6ZUhhbmRsZXIpO1xuICBpZiAoZ3VpLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUpIHtcbiAgICBkb20udW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIGd1aS5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlKTtcbiAgfVxufVxuZnVuY3Rpb24gbWFya1ByZXNldE1vZGlmaWVkKGd1aSwgbW9kaWZpZWQpIHtcbiAgdmFyIG9wdCA9IGd1aS5fX3ByZXNldF9zZWxlY3RbZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4XTtcbiAgaWYgKG1vZGlmaWVkKSB7XG4gICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZSArICcqJztcbiAgfSBlbHNlIHtcbiAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKSB7XG4gIGNvbnRyb2xsZXIuX19saSA9IGxpO1xuICBjb250cm9sbGVyLl9fZ3VpID0gZ3VpO1xuICBDb21tb24uZXh0ZW5kKGNvbnRyb2xsZXIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgb3B0aW9uczogZnVuY3Rpb24gb3B0aW9ucyhfb3B0aW9ucykge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcbiAgICAgICAgICBiZWZvcmU6IG5leHRTaWJsaW5nLFxuICAgICAgICAgIGZhY3RvcnlBcmdzOiBbQ29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoQ29tbW9uLmlzQXJyYXkoX29wdGlvbnMpIHx8IENvbW1vbi5pc09iamVjdChfb3B0aW9ucykpIHtcbiAgICAgICAgdmFyIF9uZXh0U2libGluZyA9IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcbiAgICAgICAgICBiZWZvcmU6IF9uZXh0U2libGluZyxcbiAgICAgICAgICBmYWN0b3J5QXJnczogW19vcHRpb25zXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG5hbWU6IGZ1bmN0aW9uIG5hbWUoX25hbWUpIHtcbiAgICAgIGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBfbmFtZTtcbiAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH0sXG4gICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oKSB7XG4gICAgICBjb250cm9sbGVyLl9fZ3VpLmxpc3Rlbihjb250cm9sbGVyKTtcbiAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBjb250cm9sbGVyLl9fZ3VpLnJlbW92ZShjb250cm9sbGVyKTtcbiAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH1cbiAgfSk7XG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlclNsaWRlcikge1xuICAgIHZhciBib3ggPSBuZXcgTnVtYmVyQ29udHJvbGxlckJveChjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XG4gICAgQ29tbW9uLmVhY2goWyd1cGRhdGVEaXNwbGF5JywgJ29uQ2hhbmdlJywgJ29uRmluaXNoQ2hhbmdlJywgJ3N0ZXAnLCAnbWluJywgJ21heCddLCBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICB2YXIgcGMgPSBjb250cm9sbGVyW21ldGhvZF07XG4gICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcbiAgICAgIGNvbnRyb2xsZXJbbWV0aG9kXSA9IGJveFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHBiLmFwcGx5KGJveCwgYXJncyk7XG4gICAgICAgIHJldHVybiBwYy5hcHBseShjb250cm9sbGVyLCBhcmdzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgZG9tLmFkZENsYXNzKGxpLCAnaGFzLXNsaWRlcicpO1xuICAgIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoYm94LmRvbUVsZW1lbnQsIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG4gIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJCb3gpIHtcbiAgICB2YXIgciA9IGZ1bmN0aW9uIHIocmV0dXJuZWQpIHtcbiAgICAgIGlmIChDb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21pbikgJiYgQ29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19tYXgpKSB7XG4gICAgICAgIHZhciBvbGROYW1lID0gY29udHJvbGxlci5fX2xpLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTDtcbiAgICAgICAgdmFyIHdhc0xpc3RlbmluZyA9IGNvbnRyb2xsZXIuX19ndWkuX19saXN0ZW5pbmcuaW5kZXhPZihjb250cm9sbGVyKSA+IC0xO1xuICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuICAgICAgICB2YXIgbmV3Q29udHJvbGxlciA9IF9hZGQoZ3VpLCBjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwge1xuICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbnRyb2xsZXIuX19taW4sIGNvbnRyb2xsZXIuX19tYXgsIGNvbnRyb2xsZXIuX19zdGVwXVxuICAgICAgICB9KTtcbiAgICAgICAgbmV3Q29udHJvbGxlci5uYW1lKG9sZE5hbWUpO1xuICAgICAgICBpZiAod2FzTGlzdGVuaW5nKSBuZXdDb250cm9sbGVyLmxpc3RlbigpO1xuICAgICAgICByZXR1cm4gbmV3Q29udHJvbGxlcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICB9O1xuICAgIGNvbnRyb2xsZXIubWluID0gQ29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xuICAgIGNvbnRyb2xsZXIubWF4ID0gQ29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5tYXgpO1xuICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBCb29sZWFuQ29udHJvbGxlcikge1xuICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJyk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgRnVuY3Rpb25Db250cm9sbGVyKSB7XG4gICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2J1dHRvbiwgJ2NsaWNrJyk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQobGksICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQobGksICdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQ29sb3JDb250cm9sbGVyKSB7XG4gICAgZG9tLmFkZENsYXNzKGxpLCAnY29sb3InKTtcbiAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkgPSBDb21tb24uY29tcG9zZShmdW5jdGlvbiAodmFsKSB7XG4gICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBjb250cm9sbGVyLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSwgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KTtcbiAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgfVxuICBjb250cm9sbGVyLnNldFZhbHVlID0gQ29tbW9uLmNvbXBvc2UoZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmIChndWkuZ2V0Um9vdCgpLl9fcHJlc2V0X3NlbGVjdCAmJiBjb250cm9sbGVyLmlzTW9kaWZpZWQoKSkge1xuICAgICAgbWFya1ByZXNldE1vZGlmaWVkKGd1aS5nZXRSb290KCksIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9LCBjb250cm9sbGVyLnNldFZhbHVlKTtcbn1cbmZ1bmN0aW9uIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKSB7XG4gIHZhciByb290ID0gZ3VpLmdldFJvb3QoKTtcbiAgdmFyIG1hdGNoZWRJbmRleCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKGNvbnRyb2xsZXIub2JqZWN0KTtcbiAgaWYgKG1hdGNoZWRJbmRleCAhPT0gLTEpIHtcbiAgICB2YXIgY29udHJvbGxlck1hcCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZEluZGV4XTtcbiAgICBpZiAoY29udHJvbGxlck1hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250cm9sbGVyTWFwID0ge307XG4gICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRJbmRleF0gPSBjb250cm9sbGVyTWFwO1xuICAgIH1cbiAgICBjb250cm9sbGVyTWFwW2NvbnRyb2xsZXIucHJvcGVydHldID0gY29udHJvbGxlcjtcbiAgICBpZiAocm9vdC5sb2FkICYmIHJvb3QubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICB2YXIgcHJlc2V0TWFwID0gcm9vdC5sb2FkLnJlbWVtYmVyZWQ7XG4gICAgICB2YXIgcHJlc2V0ID0gdm9pZCAwO1xuICAgICAgaWYgKHByZXNldE1hcFtndWkucHJlc2V0XSkge1xuICAgICAgICBwcmVzZXQgPSBwcmVzZXRNYXBbZ3VpLnByZXNldF07XG4gICAgICB9IGVsc2UgaWYgKHByZXNldE1hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdKSB7XG4gICAgICAgIHByZXNldCA9IHByZXNldE1hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHByZXNldFttYXRjaGVkSW5kZXhdICYmIHByZXNldFttYXRjaGVkSW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcHJlc2V0W21hdGNoZWRJbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gX2FkZChndWksIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgXCInICsgb2JqZWN0ICsgJ1wiIGhhcyBubyBwcm9wZXJ0eSBcIicgKyBwcm9wZXJ0eSArICdcIicpO1xuICB9XG4gIHZhciBjb250cm9sbGVyID0gdm9pZCAwO1xuICBpZiAocGFyYW1zLmNvbG9yKSB7XG4gICAgY29udHJvbGxlciA9IG5ldyBDb2xvckNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZhY3RvcnlBcmdzID0gW29iamVjdCwgcHJvcGVydHldLmNvbmNhdChwYXJhbXMuZmFjdG9yeUFyZ3MpO1xuICAgIGNvbnRyb2xsZXIgPSBDb250cm9sbGVyRmFjdG9yeS5hcHBseShndWksIGZhY3RvcnlBcmdzKTtcbiAgfVxuICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICBwYXJhbXMuYmVmb3JlID0gcGFyYW1zLmJlZm9yZS5fX2xpO1xuICB9XG4gIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKTtcbiAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRvbS5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xuICBuYW1lLmlubmVySFRNTCA9IGNvbnRyb2xsZXIucHJvcGVydHk7XG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlci5kb21FbGVtZW50KTtcbiAgdmFyIGxpID0gYWRkUm93KGd1aSwgY29udGFpbmVyLCBwYXJhbXMuYmVmb3JlKTtcbiAgZG9tLmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIENvbG9yQ29udHJvbGxlcikge1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2NvbG9yJyk7XG4gIH0gZWxzZSB7XG4gICAgZG9tLmFkZENsYXNzKGxpLCBfdHlwZW9mKGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSkpO1xuICB9XG4gIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpO1xuICBndWkuX19jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn1cbmZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCBrZXkpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XG59XG5mdW5jdGlvbiBhZGRQcmVzZXRPcHRpb24oZ3VpLCBuYW1lLCBzZXRTZWxlY3RlZCkge1xuICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gIG9wdC5pbm5lckhUTUwgPSBuYW1lO1xuICBvcHQudmFsdWUgPSBuYW1lO1xuICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gIGlmIChzZXRTZWxlY3RlZCkge1xuICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoIC0gMTtcbiAgfVxufVxuZnVuY3Rpb24gc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbikge1xuICBleHBsYWluLnN0eWxlLmRpc3BsYXkgPSBndWkudXNlTG9jYWxTdG9yYWdlID8gJ2Jsb2NrJyA6ICdub25lJztcbn1cbmZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xuICB2YXIgZGl2ID0gZ3VpLl9fc2F2ZV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBkb20uYWRkQ2xhc3MoZ3VpLmRvbUVsZW1lbnQsICdoYXMtc2F2ZScpO1xuICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcbiAgZG9tLmFkZENsYXNzKGRpdiwgJ3NhdmUtcm93Jyk7XG4gIHZhciBnZWFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZ2VhcnMuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG4gIGRvbS5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBidXR0b24uaW5uZXJIVE1MID0gJ1NhdmUnO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnYnV0dG9uJyk7XG4gIGRvbS5hZGRDbGFzcyhidXR0b24sICdzYXZlJyk7XG4gIHZhciBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBidXR0b24yLmlubmVySFRNTCA9ICdOZXcnO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ3NhdmUtYXMnKTtcbiAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGJ1dHRvbjMuaW5uZXJIVE1MID0gJ1JldmVydCc7XG4gIGRvbS5hZGRDbGFzcyhidXR0b24zLCAnYnV0dG9uJyk7XG4gIGRvbS5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XG4gIHZhciBzZWxlY3QgPSBndWkuX19wcmVzZXRfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gIGlmIChndWkubG9hZCAmJiBndWkubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgQ29tbW9uLmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGFkZFByZXNldE9wdGlvbihndWksIGtleSwga2V5ID09PSBndWkucHJlc2V0KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUsIGZhbHNlKTtcbiAgfVxuICBkb20uYmluZChzZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcbiAgICB9XG4gICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XG4gIH0pO1xuICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgZGl2LmFwcGVuZENoaWxkKGdlYXJzKTtcbiAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcbiAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjMpO1xuICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgIHZhciBleHBsYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLWV4cGxhaW4nKTtcbiAgICB2YXIgbG9jYWxTdG9yYWdlQ2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtc3RvcmFnZScpO1xuICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcbiAgICBzYXZlTG9jYWxseS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgIGxvY2FsU3RvcmFnZUNoZWNrQm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgfVxuICAgIHNob3dIaWRlRXhwbGFpbihndWksIGV4cGxhaW4pO1xuICAgIGRvbS5iaW5kKGxvY2FsU3RvcmFnZUNoZWNrQm94LCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgZ3VpLnVzZUxvY2FsU3RvcmFnZSA9ICFndWkudXNlTG9jYWxTdG9yYWdlO1xuICAgICAgc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbik7XG4gICAgfSk7XG4gIH1cbiAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XG4gIGRvbS5iaW5kKG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5tZXRhS2V5ICYmIChlLndoaWNoID09PSA2NyB8fCBlLmtleUNvZGUgPT09IDY3KSkge1xuICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XG4gICAgfVxuICB9KTtcbiAgZG9tLmJpbmQoZ2VhcnMsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XG4gICAgU0FWRV9ESUFMT0dVRS5zaG93KCk7XG4gICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5mb2N1cygpO1xuICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XG4gIH0pO1xuICBkb20uYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBndWkuc2F2ZSgpO1xuICB9KTtcbiAgZG9tLmJpbmQoYnV0dG9uMiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcmVzZXROYW1lID0gcHJvbXB0KCdFbnRlciBhIG5ldyBwcmVzZXQgbmFtZS4nKTtcbiAgICBpZiAocHJlc2V0TmFtZSkge1xuICAgICAgZ3VpLnNhdmVBcyhwcmVzZXROYW1lKTtcbiAgICB9XG4gIH0pO1xuICBkb20uYmluZChidXR0b24zLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgZ3VpLnJldmVydCgpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFJlc2l6ZUhhbmRsZShndWkpIHtcbiAgdmFyIHBtb3VzZVggPSB2b2lkIDA7XG4gIGd1aS5fX3Jlc2l6ZV9oYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQ29tbW9uLmV4dGVuZChndWkuX19yZXNpemVfaGFuZGxlLnN0eWxlLCB7XG4gICAgd2lkdGg6ICc2cHgnLFxuICAgIG1hcmdpbkxlZnQ6ICctM3B4JyxcbiAgICBoZWlnaHQ6ICcyMDBweCcsXG4gICAgY3Vyc29yOiAnZXctcmVzaXplJyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICB9KTtcbiAgZnVuY3Rpb24gZHJhZyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGd1aS53aWR0aCArPSBwbW91c2VYIC0gZS5jbGllbnRYO1xuICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xuICAgIGRvbS5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgZG9tLmFkZENsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XG4gICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZG9tLmJpbmQoZ3VpLl9fcmVzaXplX2hhbmRsZSwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG4gIGRvbS5iaW5kKGd1aS5fX2Nsb3NlQnV0dG9uLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcbiAgZ3VpLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsIGd1aS5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcbn1cbmZ1bmN0aW9uIHNldFdpZHRoKGd1aSwgdykge1xuICBndWkuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICBpZiAoZ3VpLl9fc2F2ZV9yb3cgJiYgZ3VpLmF1dG9QbGFjZSkge1xuICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gIH1cbiAgaWYgKGd1aS5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgfVxufVxuZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNldChndWksIHVzZUluaXRpYWxWYWx1ZXMpIHtcbiAgdmFyIHRvUmV0dXJuID0ge307XG4gIENvbW1vbi5lYWNoKGd1aS5fX3JlbWVtYmVyZWRPYmplY3RzLCBmdW5jdGlvbiAodmFsLCBpbmRleCkge1xuICAgIHZhciBzYXZlZFZhbHVlcyA9IHt9O1xuICAgIHZhciBjb250cm9sbGVyTWFwID0gZ3VpLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW2luZGV4XTtcbiAgICBDb21tb24uZWFjaChjb250cm9sbGVyTWFwLCBmdW5jdGlvbiAoY29udHJvbGxlciwgcHJvcGVydHkpIHtcbiAgICAgIHNhdmVkVmFsdWVzW3Byb3BlcnR5XSA9IHVzZUluaXRpYWxWYWx1ZXMgPyBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA6IGNvbnRyb2xsZXIuZ2V0VmFsdWUoKTtcbiAgICB9KTtcbiAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZFZhbHVlcztcbiAgfSk7XG4gIHJldHVybiB0b1JldHVybjtcbn1cbmZ1bmN0aW9uIHNldFByZXNldFNlbGVjdEluZGV4KGd1aSkge1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT09IGd1aS5wcmVzZXQpIHtcbiAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KSB7XG4gIGlmIChjb250cm9sbGVyQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEuY2FsbCh3aW5kb3csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSk7XG4gICAgfSk7XG4gIH1cbiAgQ29tbW9uLmVhY2goY29udHJvbGxlckFycmF5LCBmdW5jdGlvbiAoYykge1xuICAgIGMudXBkYXRlRGlzcGxheSgpO1xuICB9KTtcbn1cblxudmFyIGNvbG9yID0ge1xuICBDb2xvcjogQ29sb3IsXG4gIG1hdGg6IENvbG9yTWF0aCxcbiAgaW50ZXJwcmV0OiBpbnRlcnByZXRcbn07XG52YXIgY29udHJvbGxlcnMgPSB7XG4gIENvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIEJvb2xlYW5Db250cm9sbGVyOiBCb29sZWFuQ29udHJvbGxlcixcbiAgT3B0aW9uQ29udHJvbGxlcjogT3B0aW9uQ29udHJvbGxlcixcbiAgU3RyaW5nQ29udHJvbGxlcjogU3RyaW5nQ29udHJvbGxlcixcbiAgTnVtYmVyQ29udHJvbGxlcjogTnVtYmVyQ29udHJvbGxlcixcbiAgTnVtYmVyQ29udHJvbGxlckJveDogTnVtYmVyQ29udHJvbGxlckJveCxcbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlcjogTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbiAgRnVuY3Rpb25Db250cm9sbGVyOiBGdW5jdGlvbkNvbnRyb2xsZXIsXG4gIENvbG9yQ29udHJvbGxlcjogQ29sb3JDb250cm9sbGVyXG59O1xudmFyIGRvbSQxID0geyBkb206IGRvbSB9O1xudmFyIGd1aSA9IHsgR1VJOiBHVUkgfTtcbnZhciBHVUkkMSA9IEdVSTtcbnZhciBpbmRleCA9IHtcbiAgY29sb3I6IGNvbG9yLFxuICBjb250cm9sbGVyczogY29udHJvbGxlcnMsXG4gIGRvbTogZG9tJDEsXG4gIGd1aTogZ3VpLFxuICBHVUk6IEdVSSQxXG59O1xuXG5leHBvcnQgeyBjb2xvciwgY29udHJvbGxlcnMsIGRvbSQxIGFzIGRvbSwgZ3VpLCBHVUkkMSBhcyBHVUkgfTtcbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0Lmd1aS5tb2R1bGUuanMubWFwXG4iLCIvKipcclxuICogQ29tbW9uIHV0aWxpdGllc1xyXG4gKiBAbW9kdWxlIGdsTWF0cml4XHJcbiAqL1xuLy8gQ29uZmlndXJhdGlvbiBDb25zdGFudHNcbmV4cG9ydCB2YXIgRVBTSUxPTiA9IDAuMDAwMDAxO1xuZXhwb3J0IHZhciBBUlJBWV9UWVBFID0gdHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBGbG9hdDMyQXJyYXkgOiBBcnJheTtcbmV4cG9ydCB2YXIgUkFORE9NID0gTWF0aC5yYW5kb207XG4vKipcclxuICogU2V0cyB0aGUgdHlwZSBvZiBhcnJheSB1c2VkIHdoZW4gY3JlYXRpbmcgbmV3IHZlY3RvcnMgYW5kIG1hdHJpY2VzXHJcbiAqXHJcbiAqIEBwYXJhbSB7RmxvYXQzMkFycmF5Q29uc3RydWN0b3IgfCBBcnJheUNvbnN0cnVjdG9yfSB0eXBlIEFycmF5IHR5cGUsIHN1Y2ggYXMgRmxvYXQzMkFycmF5IG9yIEFycmF5XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0TWF0cml4QXJyYXlUeXBlKHR5cGUpIHtcbiAgQVJSQVlfVFlQRSA9IHR5cGU7XG59XG52YXIgZGVncmVlID0gTWF0aC5QSSAvIDE4MDtcbi8qKlxyXG4gKiBDb252ZXJ0IERlZ3JlZSBUbyBSYWRpYW5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgQW5nbGUgaW4gRGVncmVlc1xyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUmFkaWFuKGEpIHtcbiAgcmV0dXJuIGEgKiBkZWdyZWU7XG59XG4vKipcclxuICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxyXG4gKiBvciByZWxhdGl2ZSB0b2xlcmFuY2Ugb2YgZ2xNYXRyaXguRVBTSUxPTiAoYW4gYWJzb2x1dGUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIHZhbHVlcyBsZXNzXHJcbiAqIHRoYW4gb3IgZXF1YWwgdG8gMS4wLCBhbmQgYSByZWxhdGl2ZSB0b2xlcmFuY2UgaXMgdXNlZCBmb3IgbGFyZ2VyIHZhbHVlcylcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYSksIE1hdGguYWJzKGIpKTtcbn1cbmlmICghTWF0aC5oeXBvdCkgTWF0aC5oeXBvdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHkgPSAwLFxuICAgICAgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIHkgKz0gYXJndW1lbnRzW2ldICogYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguc3FydCh5KTtcbn07IiwiaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSBcIi4vY29tbW9uLmpzXCI7XG4vKipcclxuICogNHg0IE1hdHJpeDxicj5Gb3JtYXQ6IGNvbHVtbi1tYWpvciwgd2hlbiB0eXBlZCBvdXQgaXQgbG9va3MgbGlrZSByb3ctbWFqb3I8YnI+VGhlIG1hdHJpY2VzIGFyZSBiZWluZyBwb3N0IG11bHRpcGxpZWQuXHJcbiAqIEBtb2R1bGUgbWF0NFxyXG4gKi9cblxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0NFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDE2KTtcblxuICBpZiAoZ2xNYXRyaXguQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gIH1cblxuICBvdXRbMF0gPSAxO1xuICBvdXRbNV0gPSAxO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBtYXQ0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIG1hdHJpeCB0byBjbG9uZVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDE2KTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgb3V0WzNdID0gYVszXTtcbiAgb3V0WzRdID0gYVs0XTtcbiAgb3V0WzVdID0gYVs1XTtcbiAgb3V0WzZdID0gYVs2XTtcbiAgb3V0WzddID0gYVs3XTtcbiAgb3V0WzhdID0gYVs4XTtcbiAgb3V0WzldID0gYVs5XTtcbiAgb3V0WzEwXSA9IGFbMTBdO1xuICBvdXRbMTFdID0gYVsxMV07XG4gIG91dFsxMl0gPSBhWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdO1xuICBvdXRbMTRdID0gYVsxNF07XG4gIG91dFsxNV0gPSBhWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0NCB0byBhbm90aGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICBvdXRbM10gPSBhWzNdO1xuICBvdXRbNF0gPSBhWzRdO1xuICBvdXRbNV0gPSBhWzVdO1xuICBvdXRbNl0gPSBhWzZdO1xuICBvdXRbN10gPSBhWzddO1xuICBvdXRbOF0gPSBhWzhdO1xuICBvdXRbOV0gPSBhWzldO1xuICBvdXRbMTBdID0gYVsxMF07XG4gIG91dFsxMV0gPSBhWzExXTtcbiAgb3V0WzEyXSA9IGFbMTJdO1xuICBvdXRbMTNdID0gYVsxM107XG4gIG91dFsxNF0gPSBhWzE0XTtcbiAgb3V0WzE1XSA9IGFbMTVdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBtYXQ0IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMiBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA1KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA4KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjMgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTEpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzIgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTQpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBBIG5ldyBtYXQ0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVZhbHVlcyhtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDE2KTtcbiAgb3V0WzBdID0gbTAwO1xuICBvdXRbMV0gPSBtMDE7XG4gIG91dFsyXSA9IG0wMjtcbiAgb3V0WzNdID0gbTAzO1xuICBvdXRbNF0gPSBtMTA7XG4gIG91dFs1XSA9IG0xMTtcbiAgb3V0WzZdID0gbTEyO1xuICBvdXRbN10gPSBtMTM7XG4gIG91dFs4XSA9IG0yMDtcbiAgb3V0WzldID0gbTIxO1xuICBvdXRbMTBdID0gbTIyO1xuICBvdXRbMTFdID0gbTIzO1xuICBvdXRbMTJdID0gbTMwO1xuICBvdXRbMTNdID0gbTMxO1xuICBvdXRbMTRdID0gbTMyO1xuICBvdXRbMTVdID0gbTMzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0wMiBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA1KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcclxuICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA4KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMjMgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTEpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzIgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTQpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCBtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgb3V0WzBdID0gbTAwO1xuICBvdXRbMV0gPSBtMDE7XG4gIG91dFsyXSA9IG0wMjtcbiAgb3V0WzNdID0gbTAzO1xuICBvdXRbNF0gPSBtMTA7XG4gIG91dFs1XSA9IG0xMTtcbiAgb3V0WzZdID0gbTEyO1xuICBvdXRbN10gPSBtMTM7XG4gIG91dFs4XSA9IG0yMDtcbiAgb3V0WzldID0gbTIxO1xuICBvdXRbMTBdID0gbTIyO1xuICBvdXRbMTFdID0gbTIzO1xuICBvdXRbMTJdID0gbTMwO1xuICBvdXRbMTNdID0gbTMxO1xuICBvdXRbMTRdID0gbTMyO1xuICBvdXRbMTVdID0gbTMzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNldCBhIG1hdDQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkob3V0KSB7XG4gIG91dFswXSA9IDE7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IDE7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IDA7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSAxO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgaWYgKG91dCA9PT0gYSkge1xuICAgIHZhciBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdO1xuICAgIHZhciBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuICAgIHZhciBhMjMgPSBhWzExXTtcbiAgICBvdXRbMV0gPSBhWzRdO1xuICAgIG91dFsyXSA9IGFbOF07XG4gICAgb3V0WzNdID0gYVsxMl07XG4gICAgb3V0WzRdID0gYTAxO1xuICAgIG91dFs2XSA9IGFbOV07XG4gICAgb3V0WzddID0gYVsxM107XG4gICAgb3V0WzhdID0gYTAyO1xuICAgIG91dFs5XSA9IGExMjtcbiAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgb3V0WzEyXSA9IGEwMztcbiAgICBvdXRbMTNdID0gYTEzO1xuICAgIG91dFsxNF0gPSBhMjM7XG4gIH0gZWxzZSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzRdO1xuICAgIG91dFsyXSA9IGFbOF07XG4gICAgb3V0WzNdID0gYVsxMl07XG4gICAgb3V0WzRdID0gYVsxXTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbOV07XG4gICAgb3V0WzddID0gYVsxM107XG4gICAgb3V0WzhdID0gYVsyXTtcbiAgICBvdXRbOV0gPSBhWzZdO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgb3V0WzEyXSA9IGFbM107XG4gICAgb3V0WzEzXSA9IGFbN107XG4gICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogSW52ZXJ0cyBhIG1hdDRcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIHZhciBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gIHZhciBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gIHZhciBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gIHZhciBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICB2YXIgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gIGlmICghZGV0KSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBkZXQgPSAxLjAgLyBkZXQ7XG4gIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICBvdXRbMV0gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gIG91dFszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICBvdXRbNF0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICBvdXRbN10gPSAoYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxKSAqIGRldDtcbiAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gIG91dFs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICBvdXRbMTBdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgb3V0WzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICBvdXRbMTNdID0gKGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNikgKiBkZXQ7XG4gIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgb3V0WzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRqb2ludChvdXQsIGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIG91dFswXSA9IGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKTtcbiAgb3V0WzFdID0gLShhMDEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICBvdXRbMl0gPSBhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMik7XG4gIG91dFszXSA9IC0oYTAxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMSAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgb3V0WzRdID0gLShhMTAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICBvdXRbNV0gPSBhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMik7XG4gIG91dFs2XSA9IC0oYTAwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgb3V0WzddID0gYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpO1xuICBvdXRbOF0gPSBhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSk7XG4gIG91dFs5XSA9IC0oYTAwICogKGEyMSAqIGEzMyAtIGEyMyAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpKTtcbiAgb3V0WzEwXSA9IGEwMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpIC0gYTEwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTEzIC0gYTAzICogYTExKTtcbiAgb3V0WzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgb3V0WzEyXSA9IC0oYTEwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpKTtcbiAgb3V0WzEzXSA9IGEwMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKTtcbiAgb3V0WzE0XSA9IC0oYTAwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpKTtcbiAgb3V0WzE1XSA9IGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcclxuICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVybWluYW50KGEpIHtcbiAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICBhMDEgPSBhWzFdLFxuICAgICAgYTAyID0gYVsyXSxcbiAgICAgIGEwMyA9IGFbM107XG4gIHZhciBhMTAgPSBhWzRdLFxuICAgICAgYTExID0gYVs1XSxcbiAgICAgIGExMiA9IGFbNl0sXG4gICAgICBhMTMgPSBhWzddO1xuICB2YXIgYTIwID0gYVs4XSxcbiAgICAgIGEyMSA9IGFbOV0sXG4gICAgICBhMjIgPSBhWzEwXSxcbiAgICAgIGEyMyA9IGFbMTFdO1xuICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICBhMzEgPSBhWzEzXSxcbiAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgYTMzID0gYVsxNV07XG4gIHZhciBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gIHZhciBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gIHZhciBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gIHZhciBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xufVxuLyoqXHJcbiAqIE11bHRpcGxpZXMgdHdvIG1hdDRzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHkob3V0LCBhLCBiKSB7XG4gIHZhciBhMDAgPSBhWzBdLFxuICAgICAgYTAxID0gYVsxXSxcbiAgICAgIGEwMiA9IGFbMl0sXG4gICAgICBhMDMgPSBhWzNdO1xuICB2YXIgYTEwID0gYVs0XSxcbiAgICAgIGExMSA9IGFbNV0sXG4gICAgICBhMTIgPSBhWzZdLFxuICAgICAgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICBhMjEgPSBhWzldLFxuICAgICAgYTIyID0gYVsxMF0sXG4gICAgICBhMjMgPSBhWzExXTtcbiAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgYTMxID0gYVsxM10sXG4gICAgICBhMzIgPSBhWzE0XSxcbiAgICAgIGEzMyA9IGFbMTVdOyAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcblxuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdLFxuICAgICAgYjMgPSBiWzNdO1xuICBvdXRbMF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzFdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFsyXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbM10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgYjAgPSBiWzRdO1xuICBiMSA9IGJbNV07XG4gIGIyID0gYls2XTtcbiAgYjMgPSBiWzddO1xuICBvdXRbNF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzVdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gIG91dFs2XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbN10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgYjAgPSBiWzhdO1xuICBiMSA9IGJbOV07XG4gIGIyID0gYlsxMF07XG4gIGIzID0gYlsxMV07XG4gIG91dFs4XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICBvdXRbOV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgb3V0WzEwXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICBvdXRbMTFdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gIGIwID0gYlsxMl07XG4gIGIxID0gYlsxM107XG4gIGIyID0gYlsxNF07XG4gIGIzID0gYlsxNV07XG4gIG91dFsxMl0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgb3V0WzEzXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICBvdXRbMTRdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gIG91dFsxNV0gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2xhdGUgYSBtYXQ0IGJ5IHRoZSBnaXZlbiB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKG91dCwgYSwgdikge1xuICB2YXIgeCA9IHZbMF0sXG4gICAgICB5ID0gdlsxXSxcbiAgICAgIHogPSB2WzJdO1xuICB2YXIgYTAwLCBhMDEsIGEwMiwgYTAzO1xuICB2YXIgYTEwLCBhMTEsIGExMiwgYTEzO1xuICB2YXIgYTIwLCBhMjEsIGEyMiwgYTIzO1xuXG4gIGlmIChhID09PSBvdXQpIHtcbiAgICBvdXRbMTJdID0gYVswXSAqIHggKyBhWzRdICogeSArIGFbOF0gKiB6ICsgYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMV0gKiB4ICsgYVs1XSAqIHkgKyBhWzldICogeiArIGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbM10gKiB4ICsgYVs3XSAqIHkgKyBhWzExXSAqIHogKyBhWzE1XTtcbiAgfSBlbHNlIHtcbiAgICBhMDAgPSBhWzBdO1xuICAgIGEwMSA9IGFbMV07XG4gICAgYTAyID0gYVsyXTtcbiAgICBhMDMgPSBhWzNdO1xuICAgIGExMCA9IGFbNF07XG4gICAgYTExID0gYVs1XTtcbiAgICBhMTIgPSBhWzZdO1xuICAgIGExMyA9IGFbN107XG4gICAgYTIwID0gYVs4XTtcbiAgICBhMjEgPSBhWzldO1xuICAgIGEyMiA9IGFbMTBdO1xuICAgIGEyMyA9IGFbMTFdO1xuICAgIG91dFswXSA9IGEwMDtcbiAgICBvdXRbMV0gPSBhMDE7XG4gICAgb3V0WzJdID0gYTAyO1xuICAgIG91dFszXSA9IGEwMztcbiAgICBvdXRbNF0gPSBhMTA7XG4gICAgb3V0WzVdID0gYTExO1xuICAgIG91dFs2XSA9IGExMjtcbiAgICBvdXRbN10gPSBhMTM7XG4gICAgb3V0WzhdID0gYTIwO1xuICAgIG91dFs5XSA9IGEyMTtcbiAgICBvdXRbMTBdID0gYTIyO1xuICAgIG91dFsxMV0gPSBhMjM7XG4gICAgb3V0WzEyXSA9IGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIGFbMTJdO1xuICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICBvdXRbMTRdID0gYTAyICogeCArIGExMiAqIHkgKyBhMjIgKiB6ICsgYVsxNF07XG4gICAgb3V0WzE1XSA9IGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIGFbMTVdO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgbm90IHVzaW5nIHZlY3Rvcml6YXRpb25cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICoqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCB2KSB7XG4gIHZhciB4ID0gdlswXSxcbiAgICAgIHkgPSB2WzFdLFxuICAgICAgeiA9IHZbMl07XG4gIG91dFswXSA9IGFbMF0gKiB4O1xuICBvdXRbMV0gPSBhWzFdICogeDtcbiAgb3V0WzJdID0gYVsyXSAqIHg7XG4gIG91dFszXSA9IGFbM10gKiB4O1xuICBvdXRbNF0gPSBhWzRdICogeTtcbiAgb3V0WzVdID0gYVs1XSAqIHk7XG4gIG91dFs2XSA9IGFbNl0gKiB5O1xuICBvdXRbN10gPSBhWzddICogeTtcbiAgb3V0WzhdID0gYVs4XSAqIHo7XG4gIG91dFs5XSA9IGFbOV0gKiB6O1xuICBvdXRbMTBdID0gYVsxMF0gKiB6O1xuICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICBvdXRbMTJdID0gYVsxMl07XG4gIG91dFsxM10gPSBhWzEzXTtcbiAgb3V0WzE0XSA9IGFbMTRdO1xuICBvdXRbMTVdID0gYVsxNV07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgZ2l2ZW4gYXhpc1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCByYWQsIGF4aXMpIHtcbiAgdmFyIHggPSBheGlzWzBdLFxuICAgICAgeSA9IGF4aXNbMV0sXG4gICAgICB6ID0gYXhpc1syXTtcbiAgdmFyIGxlbiA9IE1hdGguaHlwb3QoeCwgeSwgeik7XG4gIHZhciBzLCBjLCB0O1xuICB2YXIgYTAwLCBhMDEsIGEwMiwgYTAzO1xuICB2YXIgYTEwLCBhMTEsIGExMiwgYTEzO1xuICB2YXIgYTIwLCBhMjEsIGEyMiwgYTIzO1xuICB2YXIgYjAwLCBiMDEsIGIwMjtcbiAgdmFyIGIxMCwgYjExLCBiMTI7XG4gIHZhciBiMjAsIGIyMSwgYjIyO1xuXG4gIGlmIChsZW4gPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsZW4gPSAxIC8gbGVuO1xuICB4ICo9IGxlbjtcbiAgeSAqPSBsZW47XG4gIHogKj0gbGVuO1xuICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgYyA9IE1hdGguY29zKHJhZCk7XG4gIHQgPSAxIC0gYztcbiAgYTAwID0gYVswXTtcbiAgYTAxID0gYVsxXTtcbiAgYTAyID0gYVsyXTtcbiAgYTAzID0gYVszXTtcbiAgYTEwID0gYVs0XTtcbiAgYTExID0gYVs1XTtcbiAgYTEyID0gYVs2XTtcbiAgYTEzID0gYVs3XTtcbiAgYTIwID0gYVs4XTtcbiAgYTIxID0gYVs5XTtcbiAgYTIyID0gYVsxMF07XG4gIGEyMyA9IGFbMTFdOyAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcblxuICBiMDAgPSB4ICogeCAqIHQgKyBjO1xuICBiMDEgPSB5ICogeCAqIHQgKyB6ICogcztcbiAgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XG4gIGIxMCA9IHggKiB5ICogdCAtIHogKiBzO1xuICBiMTEgPSB5ICogeSAqIHQgKyBjO1xuICBiMTIgPSB6ICogeSAqIHQgKyB4ICogcztcbiAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7XG4gIGIyMSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICBiMjIgPSB6ICogeiAqIHQgKyBjOyAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcbiAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICBvdXRbMl0gPSBhMDIgKiBiMDAgKyBhMTIgKiBiMDEgKyBhMjIgKiBiMDI7XG4gIG91dFszXSA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcbiAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICBvdXRbNV0gPSBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTI7XG4gIG91dFs2XSA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcbiAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICBvdXRbOF0gPSBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjI7XG4gIG91dFs5XSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcbiAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgb3V0WzExXSA9IGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMjtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB2YXIgYTEwID0gYVs0XTtcbiAgdmFyIGExMSA9IGFbNV07XG4gIHZhciBhMTIgPSBhWzZdO1xuICB2YXIgYTEzID0gYVs3XTtcbiAgdmFyIGEyMCA9IGFbOF07XG4gIHZhciBhMjEgPSBhWzldO1xuICB2YXIgYTIyID0gYVsxMF07XG4gIHZhciBhMjMgPSBhWzExXTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICBvdXRbNV0gPSBhMTEgKiBjICsgYTIxICogcztcbiAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICBvdXRbOF0gPSBhMjAgKiBjIC0gYTEwICogcztcbiAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgb3V0WzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB2YXIgYTAwID0gYVswXTtcbiAgdmFyIGEwMSA9IGFbMV07XG4gIHZhciBhMDIgPSBhWzJdO1xuICB2YXIgYTAzID0gYVszXTtcbiAgdmFyIGEyMCA9IGFbOF07XG4gIHZhciBhMjEgPSBhWzldO1xuICB2YXIgYTIyID0gYVsxMF07XG4gIHZhciBhMjMgPSBhWzExXTtcblxuICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICBvdXRbMV0gPSBhMDEgKiBjIC0gYTIxICogcztcbiAgb3V0WzJdID0gYTAyICogYyAtIGEyMiAqIHM7XG4gIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICBvdXRbOF0gPSBhMDAgKiBzICsgYTIwICogYztcbiAgb3V0WzldID0gYTAxICogcyArIGEyMSAqIGM7XG4gIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgb3V0WzExXSA9IGEwMyAqIHMgKyBhMjMgKiBjO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVaKG91dCwgYSwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICB2YXIgYTAwID0gYVswXTtcbiAgdmFyIGEwMSA9IGFbMV07XG4gIHZhciBhMDIgPSBhWzJdO1xuICB2YXIgYTAzID0gYVszXTtcbiAgdmFyIGExMCA9IGFbNF07XG4gIHZhciBhMTEgPSBhWzVdO1xuICB2YXIgYTEyID0gYVs2XTtcbiAgdmFyIGExMyA9IGFbN107XG5cbiAgaWYgKGEgIT09IG91dCkge1xuICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gIG91dFswXSA9IGEwMCAqIGMgKyBhMTAgKiBzO1xuICBvdXRbMV0gPSBhMDEgKiBjICsgYTExICogcztcbiAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gIG91dFszXSA9IGEwMyAqIGMgKyBhMTMgKiBzO1xuICBvdXRbNF0gPSBhMTAgKiBjIC0gYTAwICogcztcbiAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gIG91dFs2XSA9IGExMiAqIGMgLSBhMDIgKiBzO1xuICBvdXRbN10gPSBhMTMgKiBjIC0gYTAzICogcztcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21UcmFuc2xhdGlvbihvdXQsIHYpIHtcbiAgb3V0WzBdID0gMTtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gMTtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDE7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXTtcbiAgb3V0WzEzXSA9IHZbMV07XG4gIG91dFsxNF0gPSB2WzJdO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgU2NhbGluZyB2ZWN0b3JcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21TY2FsaW5nKG91dCwgdikge1xuICBvdXRbMF0gPSB2WzBdO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSB2WzFdO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gdlsyXTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlIGFyb3VuZCBhIGdpdmVuIGF4aXNcclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkLCBheGlzKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUm90YXRpb24ob3V0LCByYWQsIGF4aXMpIHtcbiAgdmFyIHggPSBheGlzWzBdLFxuICAgICAgeSA9IGF4aXNbMV0sXG4gICAgICB6ID0gYXhpc1syXTtcbiAgdmFyIGxlbiA9IE1hdGguaHlwb3QoeCwgeSwgeik7XG4gIHZhciBzLCBjLCB0O1xuXG4gIGlmIChsZW4gPCBnbE1hdHJpeC5FUFNJTE9OKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBsZW4gPSAxIC8gbGVuO1xuICB4ICo9IGxlbjtcbiAgeSAqPSBsZW47XG4gIHogKj0gbGVuO1xuICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgYyA9IE1hdGguY29zKHJhZCk7XG4gIHQgPSAxIC0gYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSB4ICogeCAqIHQgKyBjO1xuICBvdXRbMV0gPSB5ICogeCAqIHQgKyB6ICogcztcbiAgb3V0WzJdID0geiAqIHggKiB0IC0geSAqIHM7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHggKiB5ICogdCAtIHogKiBzO1xuICBvdXRbNV0gPSB5ICogeSAqIHQgKyBjO1xuICBvdXRbNl0gPSB6ICogeSAqIHQgKyB4ICogcztcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0geCAqIHogKiB0ICsgeSAqIHM7XG4gIG91dFs5XSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICBvdXRbMTBdID0geiAqIHogKiB0ICsgYztcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBYIGF4aXNcclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC5yb3RhdGVYKGRlc3QsIGRlc3QsIHJhZCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21YUm90YXRpb24ob3V0LCByYWQpIHtcbiAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICBvdXRbMF0gPSAxO1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBjO1xuICBvdXRbNl0gPSBzO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAtcztcbiAgb3V0WzEwXSA9IGM7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXHJcbiAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxyXG4gKlxyXG4gKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcclxuICogICAgIG1hdDQucm90YXRlWShkZXN0LCBkZXN0LCByYWQpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tWVJvdGF0aW9uKG91dCwgcmFkKSB7XG4gIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgb3V0WzBdID0gYztcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gLXM7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IDE7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHM7XG4gIG91dFs5XSA9IDA7XG4gIG91dFsxMF0gPSBjO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IDA7XG4gIG91dFsxM10gPSAwO1xuICBvdXRbMTRdID0gMDtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnJvdGF0ZVooZGVzdCwgZGVzdCwgcmFkKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVpSb3RhdGlvbihvdXQsIHJhZCkge1xuICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gIG91dFswXSA9IGM7XG4gIG91dFsxXSA9IHM7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IC1zO1xuICBvdXRbNV0gPSBjO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTBdID0gMTtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE0XSA9IDA7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xyXG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xyXG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xyXG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUm90YXRpb25UcmFuc2xhdGlvbihvdXQsIHEsIHYpIHtcbiAgLy8gUXVhdGVybmlvbiBtYXRoXG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeHkgPSB4ICogeTI7XG4gIHZhciB4eiA9IHggKiB6MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgeXogPSB5ICogejI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgb3V0WzFdID0geHkgKyB3ejtcbiAgb3V0WzJdID0geHogLSB3eTtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0geHkgLSB3ejtcbiAgb3V0WzVdID0gMSAtICh4eCArIHp6KTtcbiAgb3V0WzZdID0geXogKyB3eDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0geHogKyB3eTtcbiAgb3V0WzldID0geXogLSB3eDtcbiAgb3V0WzEwXSA9IDEgLSAoeHggKyB5eSk7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXTtcbiAgb3V0WzEzXSA9IHZbMV07XG4gIG91dFsxNF0gPSB2WzJdO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgZnJvbSBhIGR1YWwgcXVhdC5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgTWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBEdWFsIFF1YXRlcm5pb25cclxuICogQHJldHVybnMge21hdDR9IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUXVhdDIob3V0LCBhKSB7XG4gIHZhciB0cmFuc2xhdGlvbiA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuICB2YXIgYnggPSAtYVswXSxcbiAgICAgIGJ5ID0gLWFbMV0sXG4gICAgICBieiA9IC1hWzJdLFxuICAgICAgYncgPSBhWzNdLFxuICAgICAgYXggPSBhWzRdLFxuICAgICAgYXkgPSBhWzVdLFxuICAgICAgYXogPSBhWzZdLFxuICAgICAgYXcgPSBhWzddO1xuICB2YXIgbWFnbml0dWRlID0gYnggKiBieCArIGJ5ICogYnkgKyBieiAqIGJ6ICsgYncgKiBidzsgLy9Pbmx5IHNjYWxlIGlmIGl0IG1ha2VzIHNlbnNlXG5cbiAgaWYgKG1hZ25pdHVkZSA+IDApIHtcbiAgICB0cmFuc2xhdGlvblswXSA9IChheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgdHJhbnNsYXRpb25bMV0gPSAoYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBieikgKiAyIC8gbWFnbml0dWRlO1xuICAgIHRyYW5zbGF0aW9uWzJdID0gKGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngpICogMiAvIG1hZ25pdHVkZTtcbiAgfSBlbHNlIHtcbiAgICB0cmFuc2xhdGlvblswXSA9IChheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5KSAqIDI7XG4gICAgdHJhbnNsYXRpb25bMV0gPSAoYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBieikgKiAyO1xuICAgIHRyYW5zbGF0aW9uWzJdID0gKGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngpICogMjtcbiAgfVxuXG4gIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgYSwgdHJhbnNsYXRpb24pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxyXG4gKiAgbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLFxyXG4gKiAgdGhlIHJldHVybmVkIHZlY3RvciB3aWxsIGJlIHRoZSBzYW1lIGFzIHRoZSB0cmFuc2xhdGlvbiB2ZWN0b3JcclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXHJcbiAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSB0cmFuc2xhdGlvbiBjb21wb25lbnRcclxuICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxyXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbihvdXQsIG1hdCkge1xuICBvdXRbMF0gPSBtYXRbMTJdO1xuICBvdXRbMV0gPSBtYXRbMTNdO1xuICBvdXRbMl0gPSBtYXRbMTRdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHNjYWxpbmcgZmFjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXHJcbiAqICBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGggZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZVxyXG4gKiAgd2l0aCBhIG5vcm1hbGl6ZWQgUXVhdGVybmlvbiBwYXJhbXRlciwgdGhlIHJldHVybmVkIHZlY3RvciB3aWxsIGJlXHJcbiAqICB0aGUgc2FtZSBhcyB0aGUgc2NhbGluZyB2ZWN0b3JcclxuICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXHJcbiAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSBzY2FsaW5nIGZhY3RvciBjb21wb25lbnRcclxuICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxyXG4gKiBAcmV0dXJuIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsaW5nKG91dCwgbWF0KSB7XG4gIHZhciBtMTEgPSBtYXRbMF07XG4gIHZhciBtMTIgPSBtYXRbMV07XG4gIHZhciBtMTMgPSBtYXRbMl07XG4gIHZhciBtMjEgPSBtYXRbNF07XG4gIHZhciBtMjIgPSBtYXRbNV07XG4gIHZhciBtMjMgPSBtYXRbNl07XG4gIHZhciBtMzEgPSBtYXRbOF07XG4gIHZhciBtMzIgPSBtYXRbOV07XG4gIHZhciBtMzMgPSBtYXRbMTBdO1xuICBvdXRbMF0gPSBNYXRoLmh5cG90KG0xMSwgbTEyLCBtMTMpO1xuICBvdXRbMV0gPSBNYXRoLmh5cG90KG0yMSwgbTIyLCBtMjMpO1xuICBvdXRbMl0gPSBNYXRoLmh5cG90KG0zMSwgbTMyLCBtMzMpO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgYSBxdWF0ZXJuaW9uIHJlcHJlc2VudGluZyB0aGUgcm90YXRpb25hbCBjb21wb25lbnRcclxuICogIG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoXHJcbiAqICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiwgdGhlIHJldHVybmVkIHF1YXRlcm5pb24gd2lsbCBiZSB0aGVcclxuICogIHNhbWUgYXMgdGhlIHF1YXRlcm5pb24gb3JpZ2luYWxseSBzdXBwbGllZC5cclxuICogQHBhcmFtIHtxdWF0fSBvdXQgUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXHJcbiAqIEByZXR1cm4ge3F1YXR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdGF0aW9uKG91dCwgbWF0KSB7XG4gIHZhciBzY2FsaW5nID0gbmV3IGdsTWF0cml4LkFSUkFZX1RZUEUoMyk7XG4gIGdldFNjYWxpbmcoc2NhbGluZywgbWF0KTtcbiAgdmFyIGlzMSA9IDEgLyBzY2FsaW5nWzBdO1xuICB2YXIgaXMyID0gMSAvIHNjYWxpbmdbMV07XG4gIHZhciBpczMgPSAxIC8gc2NhbGluZ1syXTtcbiAgdmFyIHNtMTEgPSBtYXRbMF0gKiBpczE7XG4gIHZhciBzbTEyID0gbWF0WzFdICogaXMyO1xuICB2YXIgc20xMyA9IG1hdFsyXSAqIGlzMztcbiAgdmFyIHNtMjEgPSBtYXRbNF0gKiBpczE7XG4gIHZhciBzbTIyID0gbWF0WzVdICogaXMyO1xuICB2YXIgc20yMyA9IG1hdFs2XSAqIGlzMztcbiAgdmFyIHNtMzEgPSBtYXRbOF0gKiBpczE7XG4gIHZhciBzbTMyID0gbWF0WzldICogaXMyO1xuICB2YXIgc20zMyA9IG1hdFsxMF0gKiBpczM7XG4gIHZhciB0cmFjZSA9IHNtMTEgKyBzbTIyICsgc20zMztcbiAgdmFyIFMgPSAwO1xuXG4gIGlmICh0cmFjZSA+IDApIHtcbiAgICBTID0gTWF0aC5zcXJ0KHRyYWNlICsgMS4wKSAqIDI7XG4gICAgb3V0WzNdID0gMC4yNSAqIFM7XG4gICAgb3V0WzBdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgb3V0WzFdID0gKHNtMzEgLSBzbTEzKSAvIFM7XG4gICAgb3V0WzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gIH0gZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMTEgLSBzbTIyIC0gc20zMykgKiAyO1xuICAgIG91dFszXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgIG91dFswXSA9IDAuMjUgKiBTO1xuICAgIG91dFsxXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgIG91dFsyXSA9IChzbTMxICsgc20xMykgLyBTO1xuICB9IGVsc2UgaWYgKHNtMjIgPiBzbTMzKSB7XG4gICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTIyIC0gc20xMSAtIHNtMzMpICogMjtcbiAgICBvdXRbM10gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICBvdXRbMF0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICBvdXRbMV0gPSAwLjI1ICogUztcbiAgICBvdXRbMl0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgfSBlbHNlIHtcbiAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMzMgLSBzbTExIC0gc20yMikgKiAyO1xuICAgIG91dFszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgIG91dFswXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgIG91dFsxXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgIG91dFsyXSA9IDAuMjUgKiBTO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZVxyXG4gKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICpcclxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XHJcbiAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xyXG4gKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xyXG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xyXG4gKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcclxuICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcclxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gcyBTY2FsaW5nIHZlY3RvclxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZShvdXQsIHEsIHYsIHMpIHtcbiAgLy8gUXVhdGVybmlvbiBtYXRoXG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeHkgPSB4ICogeTI7XG4gIHZhciB4eiA9IHggKiB6MjtcbiAgdmFyIHl5ID0geSAqIHkyO1xuICB2YXIgeXogPSB5ICogejI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgdmFyIHN4ID0gc1swXTtcbiAgdmFyIHN5ID0gc1sxXTtcbiAgdmFyIHN6ID0gc1syXTtcbiAgb3V0WzBdID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICBvdXRbMl0gPSAoeHogLSB3eSkgKiBzeDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gIG91dFs1XSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICBvdXRbNl0gPSAoeXogKyB3eCkgKiBzeTtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gKHh6ICsgd3kpICogc3o7XG4gIG91dFs5XSA9ICh5eiAtIHd4KSAqIHN6O1xuICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gdlswXTtcbiAgb3V0WzEzXSA9IHZbMV07XG4gIG91dFsxNF0gPSB2WzJdO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZSwgcm90YXRpbmcgYW5kIHNjYWxpbmcgYXJvdW5kIHRoZSBnaXZlbiBvcmlnaW5cclxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAqXHJcbiAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xyXG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcclxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG9yaWdpbik7XHJcbiAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XHJcbiAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XHJcbiAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xyXG4gKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcclxuICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG5lZ2F0aXZlT3JpZ2luKTtcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBzIFNjYWxpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBvIFRoZSBvcmlnaW4gdmVjdG9yIGFyb3VuZCB3aGljaCB0byBzY2FsZSBhbmQgcm90YXRlXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luKG91dCwgcSwgdiwgcywgbykge1xuICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgdmFyIHggPSBxWzBdLFxuICAgICAgeSA9IHFbMV0sXG4gICAgICB6ID0gcVsyXSxcbiAgICAgIHcgPSBxWzNdO1xuICB2YXIgeDIgPSB4ICsgeDtcbiAgdmFyIHkyID0geSArIHk7XG4gIHZhciB6MiA9IHogKyB6O1xuICB2YXIgeHggPSB4ICogeDI7XG4gIHZhciB4eSA9IHggKiB5MjtcbiAgdmFyIHh6ID0geCAqIHoyO1xuICB2YXIgeXkgPSB5ICogeTI7XG4gIHZhciB5eiA9IHkgKiB6MjtcbiAgdmFyIHp6ID0geiAqIHoyO1xuICB2YXIgd3ggPSB3ICogeDI7XG4gIHZhciB3eSA9IHcgKiB5MjtcbiAgdmFyIHd6ID0gdyAqIHoyO1xuICB2YXIgc3ggPSBzWzBdO1xuICB2YXIgc3kgPSBzWzFdO1xuICB2YXIgc3ogPSBzWzJdO1xuICB2YXIgb3ggPSBvWzBdO1xuICB2YXIgb3kgPSBvWzFdO1xuICB2YXIgb3ogPSBvWzJdO1xuICB2YXIgb3V0MCA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICB2YXIgb3V0MSA9ICh4eSArIHd6KSAqIHN4O1xuICB2YXIgb3V0MiA9ICh4eiAtIHd5KSAqIHN4O1xuICB2YXIgb3V0NCA9ICh4eSAtIHd6KSAqIHN5O1xuICB2YXIgb3V0NSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICB2YXIgb3V0NiA9ICh5eiArIHd4KSAqIHN5O1xuICB2YXIgb3V0OCA9ICh4eiArIHd5KSAqIHN6O1xuICB2YXIgb3V0OSA9ICh5eiAtIHd4KSAqIHN6O1xuICB2YXIgb3V0MTAgPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgb3V0WzBdID0gb3V0MDtcbiAgb3V0WzFdID0gb3V0MTtcbiAgb3V0WzJdID0gb3V0MjtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gb3V0NDtcbiAgb3V0WzVdID0gb3V0NTtcbiAgb3V0WzZdID0gb3V0NjtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gb3V0ODtcbiAgb3V0WzldID0gb3V0OTtcbiAgb3V0WzEwXSA9IG91dDEwO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IHZbMF0gKyBveCAtIChvdXQwICogb3ggKyBvdXQ0ICogb3kgKyBvdXQ4ICogb3opO1xuICBvdXRbMTNdID0gdlsxXSArIG95IC0gKG91dDEgKiBveCArIG91dDUgKiBveSArIG91dDkgKiBveik7XG4gIG91dFsxNF0gPSB2WzJdICsgb3ogLSAob3V0MiAqIG94ICsgb3V0NiAqIG95ICsgb3V0MTAgKiBveik7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgYSA0eDQgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb25cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBRdWF0ZXJuaW9uIHRvIGNyZWF0ZSBtYXRyaXggZnJvbVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gIHZhciB4ID0gcVswXSxcbiAgICAgIHkgPSBxWzFdLFxuICAgICAgeiA9IHFbMl0sXG4gICAgICB3ID0gcVszXTtcbiAgdmFyIHgyID0geCArIHg7XG4gIHZhciB5MiA9IHkgKyB5O1xuICB2YXIgejIgPSB6ICsgejtcbiAgdmFyIHh4ID0geCAqIHgyO1xuICB2YXIgeXggPSB5ICogeDI7XG4gIHZhciB5eSA9IHkgKiB5MjtcbiAgdmFyIHp4ID0geiAqIHgyO1xuICB2YXIgenkgPSB6ICogeTI7XG4gIHZhciB6eiA9IHogKiB6MjtcbiAgdmFyIHd4ID0gdyAqIHgyO1xuICB2YXIgd3kgPSB3ICogeTI7XG4gIHZhciB3eiA9IHcgKiB6MjtcbiAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gIG91dFsxXSA9IHl4ICsgd3o7XG4gIG91dFsyXSA9IHp4IC0gd3k7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHl4IC0gd3o7XG4gIG91dFs1XSA9IDEgLSB4eCAtIHp6O1xuICBvdXRbNl0gPSB6eSArIHd4O1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB6eCArIHd5O1xuICBvdXRbOV0gPSB6eSAtIHd4O1xuICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gIG91dFsxMV0gPSAwO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSAwO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xyXG4gKiBAcGFyYW0ge051bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge051bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcnVzdHVtKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgdmFyIHJsID0gMSAvIChyaWdodCAtIGxlZnQpO1xuICB2YXIgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSk7XG4gIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gIG91dFswXSA9IG5lYXIgKiAyICogcmw7XG4gIG91dFsxXSA9IDA7XG4gIG91dFsyXSA9IDA7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IDA7XG4gIG91dFs1XSA9IG5lYXIgKiAyICogdGI7XG4gIG91dFs2XSA9IDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gIG91dFs5XSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgb3V0WzExXSA9IC0xO1xuICBvdXRbMTJdID0gMDtcbiAgb3V0WzEzXSA9IDA7XG4gIG91dFsxNF0gPSBmYXIgKiBuZWFyICogMiAqIG5mO1xuICBvdXRbMTVdID0gMDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXHJcbiAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xyXG4gKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGVyc3BlY3RpdmUob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICB2YXIgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKSxcbiAgICAgIG5mO1xuICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICBvdXRbMV0gPSAwO1xuICBvdXRbMl0gPSAwO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSAwO1xuICBvdXRbNV0gPSBmO1xuICBvdXRbNl0gPSAwO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSAwO1xuICBvdXRbOV0gPSAwO1xuICBvdXRbMTFdID0gLTE7XG4gIG91dFsxMl0gPSAwO1xuICBvdXRbMTNdID0gMDtcbiAgb3V0WzE1XSA9IDA7XG5cbiAgaWYgKGZhciAhPSBudWxsICYmIGZhciAhPT0gSW5maW5pdHkpIHtcbiAgICBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxNF0gPSAyICogZmFyICogbmVhciAqIG5mO1xuICB9IGVsc2Uge1xuICAgIG91dFsxMF0gPSAtMTtcbiAgICBvdXRbMTRdID0gLTIgKiBuZWFyO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBmaWVsZCBvZiB2aWV3LlxyXG4gKiBUaGlzIGlzIHByaW1hcmlseSB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgcHJvamVjdGlvbiBtYXRyaWNlcyB0byBiZSB1c2VkXHJcbiAqIHdpdGggdGhlIHN0aWxsIGV4cGVyaWVtZW50YWwgV2ViVlIgQVBJLlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBmb3YgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB2YWx1ZXM6IHVwRGVncmVlcywgZG93bkRlZ3JlZXMsIGxlZnREZWdyZWVzLCByaWdodERlZ3JlZXNcclxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXcob3V0LCBmb3YsIG5lYXIsIGZhcikge1xuICB2YXIgdXBUYW4gPSBNYXRoLnRhbihmb3YudXBEZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgdmFyIGRvd25UYW4gPSBNYXRoLnRhbihmb3YuZG93bkRlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgbGVmdFRhbiA9IE1hdGgudGFuKGZvdi5sZWZ0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gIHZhciByaWdodFRhbiA9IE1hdGgudGFuKGZvdi5yaWdodERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICB2YXIgeFNjYWxlID0gMi4wIC8gKGxlZnRUYW4gKyByaWdodFRhbik7XG4gIHZhciB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcbiAgb3V0WzBdID0geFNjYWxlO1xuICBvdXRbMV0gPSAwLjA7XG4gIG91dFsyXSA9IDAuMDtcbiAgb3V0WzNdID0gMC4wO1xuICBvdXRbNF0gPSAwLjA7XG4gIG91dFs1XSA9IHlTY2FsZTtcbiAgb3V0WzZdID0gMC4wO1xuICBvdXRbN10gPSAwLjA7XG4gIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICBvdXRbOV0gPSAodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNTtcbiAgb3V0WzEwXSA9IGZhciAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzExXSA9IC0xLjA7XG4gIG91dFsxMl0gPSAwLjA7XG4gIG91dFsxM10gPSAwLjA7XG4gIG91dFsxNF0gPSBmYXIgKiBuZWFyIC8gKG5lYXIgLSBmYXIpO1xuICBvdXRbMTVdID0gMC4wO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cclxuICogQHBhcmFtIHtudW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cclxuICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gb3J0aG8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCk7XG4gIHZhciBidCA9IDEgLyAoYm90dG9tIC0gdG9wKTtcbiAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgb3V0WzBdID0gLTIgKiBscjtcbiAgb3V0WzFdID0gMDtcbiAgb3V0WzJdID0gMDtcbiAgb3V0WzNdID0gMDtcbiAgb3V0WzRdID0gMDtcbiAgb3V0WzVdID0gLTIgKiBidDtcbiAgb3V0WzZdID0gMDtcbiAgb3V0WzddID0gMDtcbiAgb3V0WzhdID0gMDtcbiAgb3V0WzldID0gMDtcbiAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgb3V0WzE0XSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICBvdXRbMTVdID0gMTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpcy5cclxuICogSWYgeW91IHdhbnQgYSBtYXRyaXggdGhhdCBhY3R1YWxseSBtYWtlcyBhbiBvYmplY3QgbG9vayBhdCBhbm90aGVyIG9iamVjdCwgeW91IHNob3VsZCB1c2UgdGFyZ2V0VG8gaW5zdGVhZC5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGxvb2tBdChvdXQsIGV5ZSwgY2VudGVyLCB1cCkge1xuICB2YXIgeDAsIHgxLCB4MiwgeTAsIHkxLCB5MiwgejAsIHoxLCB6MiwgbGVuO1xuICB2YXIgZXlleCA9IGV5ZVswXTtcbiAgdmFyIGV5ZXkgPSBleWVbMV07XG4gIHZhciBleWV6ID0gZXllWzJdO1xuICB2YXIgdXB4ID0gdXBbMF07XG4gIHZhciB1cHkgPSB1cFsxXTtcbiAgdmFyIHVweiA9IHVwWzJdO1xuICB2YXIgY2VudGVyeCA9IGNlbnRlclswXTtcbiAgdmFyIGNlbnRlcnkgPSBjZW50ZXJbMV07XG4gIHZhciBjZW50ZXJ6ID0gY2VudGVyWzJdO1xuXG4gIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCBnbE1hdHJpeC5FUFNJTE9OICYmIE1hdGguYWJzKGV5ZXkgLSBjZW50ZXJ5KSA8IGdsTWF0cml4LkVQU0lMT04gJiYgTWF0aC5hYnMoZXlleiAtIGNlbnRlcnopIDwgZ2xNYXRyaXguRVBTSUxPTikge1xuICAgIHJldHVybiBpZGVudGl0eShvdXQpO1xuICB9XG5cbiAgejAgPSBleWV4IC0gY2VudGVyeDtcbiAgejEgPSBleWV5IC0gY2VudGVyeTtcbiAgejIgPSBleWV6IC0gY2VudGVyejtcbiAgbGVuID0gMSAvIE1hdGguaHlwb3QoejAsIHoxLCB6Mik7XG4gIHowICo9IGxlbjtcbiAgejEgKj0gbGVuO1xuICB6MiAqPSBsZW47XG4gIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgeDEgPSB1cHogKiB6MCAtIHVweCAqIHoyO1xuICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gIGxlbiA9IE1hdGguaHlwb3QoeDAsIHgxLCB4Mik7XG5cbiAgaWYgKCFsZW4pIHtcbiAgICB4MCA9IDA7XG4gICAgeDEgPSAwO1xuICAgIHgyID0gMDtcbiAgfSBlbHNlIHtcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHgwICo9IGxlbjtcbiAgICB4MSAqPSBsZW47XG4gICAgeDIgKj0gbGVuO1xuICB9XG5cbiAgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcbiAgbGVuID0gTWF0aC5oeXBvdCh5MCwgeTEsIHkyKTtcblxuICBpZiAoIWxlbikge1xuICAgIHkwID0gMDtcbiAgICB5MSA9IDA7XG4gICAgeTIgPSAwO1xuICB9IGVsc2Uge1xuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeTAgKj0gbGVuO1xuICAgIHkxICo9IGxlbjtcbiAgICB5MiAqPSBsZW47XG4gIH1cblxuICBvdXRbMF0gPSB4MDtcbiAgb3V0WzFdID0geTA7XG4gIG91dFsyXSA9IHowO1xuICBvdXRbM10gPSAwO1xuICBvdXRbNF0gPSB4MTtcbiAgb3V0WzVdID0geTE7XG4gIG91dFs2XSA9IHoxO1xuICBvdXRbN10gPSAwO1xuICBvdXRbOF0gPSB4MjtcbiAgb3V0WzldID0geTI7XG4gIG91dFsxMF0gPSB6MjtcbiAgb3V0WzExXSA9IDA7XG4gIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gIG91dFsxM10gPSAtKHkwICogZXlleCArIHkxICogZXlleSArIHkyICogZXlleik7XG4gIG91dFsxNF0gPSAtKHowICogZXlleCArIHoxICogZXlleSArIHoyICogZXlleik7XG4gIG91dFsxNV0gPSAxO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIG1hdHJpeCB0aGF0IG1ha2VzIHNvbWV0aGluZyBsb29rIGF0IHNvbWV0aGluZyBlbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdGFyZ2V0VG8ob3V0LCBleWUsIHRhcmdldCwgdXApIHtcbiAgdmFyIGV5ZXggPSBleWVbMF0sXG4gICAgICBleWV5ID0gZXllWzFdLFxuICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgIHVweCA9IHVwWzBdLFxuICAgICAgdXB5ID0gdXBbMV0sXG4gICAgICB1cHogPSB1cFsyXTtcbiAgdmFyIHowID0gZXlleCAtIHRhcmdldFswXSxcbiAgICAgIHoxID0gZXlleSAtIHRhcmdldFsxXSxcbiAgICAgIHoyID0gZXlleiAtIHRhcmdldFsyXTtcbiAgdmFyIGxlbiA9IHowICogejAgKyB6MSAqIHoxICsgejIgKiB6MjtcblxuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcbiAgfVxuXG4gIHZhciB4MCA9IHVweSAqIHoyIC0gdXB6ICogejEsXG4gICAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejIsXG4gICAgICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gIGxlbiA9IHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4MjtcblxuICBpZiAobGVuID4gMCkge1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB4MCAqPSBsZW47XG4gICAgeDEgKj0gbGVuO1xuICAgIHgyICo9IGxlbjtcbiAgfVxuXG4gIG91dFswXSA9IHgwO1xuICBvdXRbMV0gPSB4MTtcbiAgb3V0WzJdID0geDI7XG4gIG91dFszXSA9IDA7XG4gIG91dFs0XSA9IHoxICogeDIgLSB6MiAqIHgxO1xuICBvdXRbNV0gPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgb3V0WzZdID0gejAgKiB4MSAtIHoxICogeDA7XG4gIG91dFs3XSA9IDA7XG4gIG91dFs4XSA9IHowO1xuICBvdXRbOV0gPSB6MTtcbiAgb3V0WzEwXSA9IHoyO1xuICBvdXRbMTFdID0gMDtcbiAgb3V0WzEyXSA9IGV5ZXg7XG4gIG91dFsxM10gPSBleWV5O1xuICBvdXRbMTRdID0gZXllejtcbiAgb3V0WzE1XSA9IDE7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cihhKSB7XG4gIHJldHVybiBcIm1hdDQoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIsIFwiICsgYVs0XSArIFwiLCBcIiArIGFbNV0gKyBcIiwgXCIgKyBhWzZdICsgXCIsIFwiICsgYVs3XSArIFwiLCBcIiArIGFbOF0gKyBcIiwgXCIgKyBhWzldICsgXCIsIFwiICsgYVsxMF0gKyBcIiwgXCIgKyBhWzExXSArIFwiLCBcIiArIGFbMTJdICsgXCIsIFwiICsgYVsxM10gKyBcIiwgXCIgKyBhWzE0XSArIFwiLCBcIiArIGFbMTVdICsgXCIpXCI7XG59XG4vKipcclxuICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDRcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcclxuICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9iKGEpIHtcbiAgcmV0dXJuIE1hdGguaHlwb3QoYVswXSwgYVsxXSwgYVsyXSwgYVszXSwgYVs0XSwgYVs1XSwgYVs2XSwgYVs3XSwgYVs4XSwgYVs5XSwgYVsxMF0sIGFbMTFdLCBhWzEyXSwgYVsxM10sIGFbMTRdLCBhWzE1XSk7XG59XG4vKipcclxuICogQWRkcyB0d28gbWF0NCdzXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgb3V0WzddID0gYVs3XSArIGJbN107XG4gIG91dFs4XSA9IGFbOF0gKyBiWzhdO1xuICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF07XG4gIG91dFsxMV0gPSBhWzExXSArIGJbMTFdO1xuICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM107XG4gIG91dFsxNF0gPSBhWzE0XSArIGJbMTRdO1xuICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxyXG4gKlxyXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge21hdDR9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICBvdXRbNl0gPSBhWzZdIC0gYls2XTtcbiAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICBvdXRbOV0gPSBhWzldIC0gYls5XTtcbiAgb3V0WzEwXSA9IGFbMTBdIC0gYlsxMF07XG4gIG91dFsxMV0gPSBhWzExXSAtIGJbMTFdO1xuICBvdXRbMTJdID0gYVsxMl0gLSBiWzEyXTtcbiAgb3V0WzEzXSA9IGFbMTNdIC0gYlsxM107XG4gIG91dFsxNF0gPSBhWzE0XSAtIGJbMTRdO1xuICBvdXRbMTVdID0gYVsxNV0gLSBiWzE1XTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIG1hdHJpeCBieSBhIHNjYWxhci5cclxuICpcclxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XHJcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseVNjYWxhcihvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAqIGI7XG4gIG91dFsxXSA9IGFbMV0gKiBiO1xuICBvdXRbMl0gPSBhWzJdICogYjtcbiAgb3V0WzNdID0gYVszXSAqIGI7XG4gIG91dFs0XSA9IGFbNF0gKiBiO1xuICBvdXRbNV0gPSBhWzVdICogYjtcbiAgb3V0WzZdID0gYVs2XSAqIGI7XG4gIG91dFs3XSA9IGFbN10gKiBiO1xuICBvdXRbOF0gPSBhWzhdICogYjtcbiAgb3V0WzldID0gYVs5XSAqIGI7XG4gIG91dFsxMF0gPSBhWzEwXSAqIGI7XG4gIG91dFsxMV0gPSBhWzExXSAqIGI7XG4gIG91dFsxMl0gPSBhWzEyXSAqIGI7XG4gIG91dFsxM10gPSBhWzEzXSAqIGI7XG4gIG91dFsxNF0gPSBhWzE0XSAqIGI7XG4gIG91dFsxNV0gPSBhWzE1XSAqIGI7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQWRkcyB0d28gbWF0NCdzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiJ3MgZWxlbWVudHMgYnkgYmVmb3JlIGFkZGluZ1xyXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXJBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICBvdXRbNl0gPSBhWzZdICsgYls2XSAqIHNjYWxlO1xuICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICBvdXRbOF0gPSBhWzhdICsgYls4XSAqIHNjYWxlO1xuICBvdXRbOV0gPSBhWzldICsgYls5XSAqIHNjYWxlO1xuICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXSAqIHNjYWxlO1xuICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXSAqIHNjYWxlO1xuICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXSAqIHNjYWxlO1xuICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXSAqIHNjYWxlO1xuICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XSAqIHNjYWxlO1xuICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XSAqIHNjYWxlO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgVGhlIHNlY29uZCBtYXRyaXguXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XSAmJiBhWzZdID09PSBiWzZdICYmIGFbN10gPT09IGJbN10gJiYgYVs4XSA9PT0gYls4XSAmJiBhWzldID09PSBiWzldICYmIGFbMTBdID09PSBiWzEwXSAmJiBhWzExXSA9PT0gYlsxMV0gJiYgYVsxMl0gPT09IGJbMTJdICYmIGFbMTNdID09PSBiWzEzXSAmJiBhWzE0XSA9PT0gYlsxNF0gJiYgYVsxNV0gPT09IGJbMTVdO1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cclxuICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgVGhlIHNlY29uZCBtYXRyaXguXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdLFxuICAgICAgYTIgPSBhWzJdLFxuICAgICAgYTMgPSBhWzNdO1xuICB2YXIgYTQgPSBhWzRdLFxuICAgICAgYTUgPSBhWzVdLFxuICAgICAgYTYgPSBhWzZdLFxuICAgICAgYTcgPSBhWzddO1xuICB2YXIgYTggPSBhWzhdLFxuICAgICAgYTkgPSBhWzldLFxuICAgICAgYTEwID0gYVsxMF0sXG4gICAgICBhMTEgPSBhWzExXTtcbiAgdmFyIGExMiA9IGFbMTJdLFxuICAgICAgYTEzID0gYVsxM10sXG4gICAgICBhMTQgPSBhWzE0XSxcbiAgICAgIGExNSA9IGFbMTVdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdLFxuICAgICAgYjMgPSBiWzNdO1xuICB2YXIgYjQgPSBiWzRdLFxuICAgICAgYjUgPSBiWzVdLFxuICAgICAgYjYgPSBiWzZdLFxuICAgICAgYjcgPSBiWzddO1xuICB2YXIgYjggPSBiWzhdLFxuICAgICAgYjkgPSBiWzldLFxuICAgICAgYjEwID0gYlsxMF0sXG4gICAgICBiMTEgPSBiWzExXTtcbiAgdmFyIGIxMiA9IGJbMTJdLFxuICAgICAgYjEzID0gYlsxM10sXG4gICAgICBiMTQgPSBiWzE0XSxcbiAgICAgIGIxNSA9IGJbMTVdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiYgTWF0aC5hYnMoYTMgLSBiMykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpICYmIE1hdGguYWJzKGE0IC0gYjQpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJiBNYXRoLmFicyhhNSAtIGI1KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNSksIE1hdGguYWJzKGI1KSkgJiYgTWF0aC5hYnMoYTYgLSBiNikgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTYpLCBNYXRoLmFicyhiNikpICYmIE1hdGguYWJzKGE3IC0gYjcpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE3KSwgTWF0aC5hYnMoYjcpKSAmJiBNYXRoLmFicyhhOCAtIGI4KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOCksIE1hdGguYWJzKGI4KSkgJiYgTWF0aC5hYnMoYTkgLSBiOSkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTkpLCBNYXRoLmFicyhiOSkpICYmIE1hdGguYWJzKGExMCAtIGIxMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEwKSwgTWF0aC5hYnMoYjEwKSkgJiYgTWF0aC5hYnMoYTExIC0gYjExKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTEpLCBNYXRoLmFicyhiMTEpKSAmJiBNYXRoLmFicyhhMTIgLSBiMTIpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMiksIE1hdGguYWJzKGIxMikpICYmIE1hdGguYWJzKGExMyAtIGIxMykgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEzKSwgTWF0aC5hYnMoYjEzKSkgJiYgTWF0aC5hYnMoYTE0IC0gYjE0KSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTQpLCBNYXRoLmFicyhiMTQpKSAmJiBNYXRoLmFicyhhMTUgLSBiMTUpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExNSksIE1hdGguYWJzKGIxNSkpO1xufVxuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5tdWx0aXBseX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIG11bCA9IG11bHRpcGx5O1xuLyoqXHJcbiAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5zdWJ0cmFjdH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHN1YiA9IHN1YnRyYWN0OyIsImltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gXCIuL2NvbW1vbi5qc1wiO1xuLyoqXHJcbiAqIDMgRGltZW5zaW9uYWwgVmVjdG9yXHJcbiAqIEBtb2R1bGUgdmVjM1xyXG4gKi9cblxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzNcclxuICpcclxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgdmFyIG91dCA9IG5ldyBnbE1hdHJpeC5BUlJBWV9UWVBFKDMpO1xuXG4gIGlmIChnbE1hdHJpeC5BUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNsb25lXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgb3V0WzBdID0gYVswXTtcbiAgb3V0WzFdID0gYVsxXTtcbiAgb3V0WzJdID0gYVsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbGVuZ3RoKGEpIHtcbiAgdmFyIHggPSBhWzBdO1xuICB2YXIgeSA9IGFbMV07XG4gIHZhciB6ID0gYVsyXTtcbiAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeik7XG59XG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxyXG4gKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5LCB6KSB7XG4gIHZhciBvdXQgPSBuZXcgZ2xNYXRyaXguQVJSQVlfVFlQRSgzKTtcbiAgb3V0WzBdID0geDtcbiAgb3V0WzFdID0geTtcbiAgb3V0WzJdID0gejtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBzb3VyY2UgdmVjdG9yXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICBvdXRbMF0gPSBhWzBdO1xuICBvdXRbMV0gPSBhWzFdO1xuICBvdXRbMl0gPSBhWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gdGhlIGdpdmVuIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxyXG4gKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSwgeikge1xuICBvdXRbMF0gPSB4O1xuICBvdXRbMV0gPSB5O1xuICBvdXRbMl0gPSB6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEFkZHMgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE11bHRpcGxpZXMgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmlkZShvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjZWlsXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBmbG9vclxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZmxvb3Iob3V0LCBhKSB7XG4gIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbWluKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcm91bmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICBvdXRbMF0gPSBhWzBdICogYjtcbiAgb3V0WzFdID0gYVsxXSAqIGI7XG4gIG91dFsyXSA9IGFbMl0gKiBiO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEFkZHMgdHdvIHZlYzMncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2UoYSwgYikge1xuICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlKGEsIGIpIHtcbiAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbn1cbi8qKlxyXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3F1YXJlZExlbmd0aChhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG59XG4vKipcclxuICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlKG91dCwgYSkge1xuICBvdXRbMF0gPSAtYVswXTtcbiAgb3V0WzFdID0gLWFbMV07XG4gIG91dFsyXSA9IC1hWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBpbnZlcnRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF07XG4gIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gIG91dFsyXSA9IDEuMCAvIGFbMl07XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogTm9ybWFsaXplIGEgdmVjM1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBhKSB7XG4gIHZhciB4ID0gYVswXTtcbiAgdmFyIHkgPSBhWzFdO1xuICB2YXIgeiA9IGFbMl07XG4gIHZhciBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG5cbiAgaWYgKGxlbiA+IDApIHtcbiAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgfVxuXG4gIG91dFswXSA9IGFbMF0gKiBsZW47XG4gIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gIG91dFsyXSA9IGFbMl0gKiBsZW47XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG59XG4vKipcclxuICogQ29tcHV0ZXMgdGhlIGNyb3NzIHByb2R1Y3Qgb2YgdHdvIHZlYzMnc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICB2YXIgYXggPSBhWzBdLFxuICAgICAgYXkgPSBhWzFdLFxuICAgICAgYXogPSBhWzJdO1xuICB2YXIgYnggPSBiWzBdLFxuICAgICAgYnkgPSBiWzFdLFxuICAgICAgYnogPSBiWzJdO1xuICBvdXRbMF0gPSBheSAqIGJ6IC0gYXogKiBieTtcbiAgb3V0WzFdID0gYXogKiBieCAtIGF4ICogYno7XG4gIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICB2YXIgYXggPSBhWzBdO1xuICB2YXIgYXkgPSBhWzFdO1xuICB2YXIgYXogPSBhWzJdO1xuICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFBlcmZvcm1zIGEgaGVybWl0ZSBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYyB0aGUgdGhpcmQgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaGVybWl0ZShvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgdmFyIGZhY3RvclRpbWVzMiA9IHQgKiB0O1xuICB2YXIgZmFjdG9yMSA9IGZhY3RvclRpbWVzMiAqICgyICogdCAtIDMpICsgMTtcbiAgdmFyIGZhY3RvcjIgPSBmYWN0b3JUaW1lczIgKiAodCAtIDIpICsgdDtcbiAgdmFyIGZhY3RvcjMgPSBmYWN0b3JUaW1lczIgKiAodCAtIDEpO1xuICB2YXIgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqICgzIC0gMiAqIHQpO1xuICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgb3V0WzFdID0gYVsxXSAqIGZhY3RvcjEgKyBiWzFdICogZmFjdG9yMiArIGNbMV0gKiBmYWN0b3IzICsgZFsxXSAqIGZhY3RvcjQ7XG4gIG91dFsyXSA9IGFbMl0gKiBmYWN0b3IxICsgYlsyXSAqIGZhY3RvcjIgKyBjWzJdICogZmFjdG9yMyArIGRbMl0gKiBmYWN0b3I0O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFBlcmZvcm1zIGEgYmV6aWVyIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjIHRoZSB0aGlyZCBvcGVyYW5kXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBiZXppZXIob3V0LCBhLCBiLCBjLCBkLCB0KSB7XG4gIHZhciBpbnZlcnNlRmFjdG9yID0gMSAtIHQ7XG4gIHZhciBpbnZlcnNlRmFjdG9yVGltZXNUd28gPSBpbnZlcnNlRmFjdG9yICogaW52ZXJzZUZhY3RvcjtcbiAgdmFyIGZhY3RvclRpbWVzMiA9IHQgKiB0O1xuICB2YXIgZmFjdG9yMSA9IGludmVyc2VGYWN0b3JUaW1lc1R3byAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3IyID0gMyAqIHQgKiBpbnZlcnNlRmFjdG9yVGltZXNUd287XG4gIHZhciBmYWN0b3IzID0gMyAqIGZhY3RvclRpbWVzMiAqIGludmVyc2VGYWN0b3I7XG4gIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogdDtcbiAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gIHZhciByID0gZ2xNYXRyaXguUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICB2YXIgeiA9IGdsTWF0cml4LlJBTkRPTSgpICogMi4wIC0gMS4wO1xuICB2YXIgelNjYWxlID0gTWF0aC5zcXJ0KDEuMCAtIHogKiB6KSAqIHNjYWxlO1xuICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGU7XG4gIG91dFsyXSA9IHogKiBzY2FsZTtcbiAgcmV0dXJuIG91dDtcbn1cbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LlxyXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xyXG4gKlxyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07XG4gIHZhciB3ID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdO1xuICB3ID0gdyB8fCAxLjA7XG4gIG91dFswXSA9IChtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSkgLyB3O1xuICBvdXRbMV0gPSAobVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10pIC8gdztcbiAgb3V0WzJdID0gKG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSkgLyB3O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQzKG91dCwgYSwgbSkge1xuICB2YXIgeCA9IGFbMF0sXG4gICAgICB5ID0gYVsxXSxcbiAgICAgIHogPSBhWzJdO1xuICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl07XG4gIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XTtcbiAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcclxuICogQ2FuIGFsc28gYmUgdXNlZCBmb3IgZHVhbCBxdWF0ZXJuaW9ucy4gKE11bHRpcGx5IGl0IHdpdGggdGhlIHJlYWwgcGFydClcclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cclxuICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUXVhdChvdXQsIGEsIHEpIHtcbiAgLy8gYmVuY2htYXJrczogaHR0cHM6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tdHJhbnNmb3JtLXZlYzMtaW1wbGVtZW50YXRpb25zLWZpeGVkXG4gIHZhciBxeCA9IHFbMF0sXG4gICAgICBxeSA9IHFbMV0sXG4gICAgICBxeiA9IHFbMl0sXG4gICAgICBxdyA9IHFbM107XG4gIHZhciB4ID0gYVswXSxcbiAgICAgIHkgPSBhWzFdLFxuICAgICAgeiA9IGFbMl07IC8vIHZhciBxdmVjID0gW3F4LCBxeSwgcXpdO1xuICAvLyB2YXIgdXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCBhKTtcblxuICB2YXIgdXZ4ID0gcXkgKiB6IC0gcXogKiB5LFxuICAgICAgdXZ5ID0gcXogKiB4IC0gcXggKiB6LFxuICAgICAgdXZ6ID0gcXggKiB5IC0gcXkgKiB4OyAvLyB2YXIgdXV2ID0gdmVjMy5jcm9zcyhbXSwgcXZlYywgdXYpO1xuXG4gIHZhciB1dXZ4ID0gcXkgKiB1dnogLSBxeiAqIHV2eSxcbiAgICAgIHV1dnkgPSBxeiAqIHV2eCAtIHF4ICogdXZ6LFxuICAgICAgdXV2eiA9IHF4ICogdXZ5IC0gcXkgKiB1dng7IC8vIHZlYzMuc2NhbGUodXYsIHV2LCAyICogdyk7XG5cbiAgdmFyIHcyID0gcXcgKiAyO1xuICB1dnggKj0gdzI7XG4gIHV2eSAqPSB3MjtcbiAgdXZ6ICo9IHcyOyAvLyB2ZWMzLnNjYWxlKHV1diwgdXV2LCAyKTtcblxuICB1dXZ4ICo9IDI7XG4gIHV1dnkgKj0gMjtcbiAgdXV2eiAqPSAyOyAvLyByZXR1cm4gdmVjMy5hZGQob3V0LCBhLCB2ZWMzLmFkZChvdXQsIHV2LCB1dXYpKTtcblxuICBvdXRbMF0gPSB4ICsgdXZ4ICsgdXV2eDtcbiAgb3V0WzFdID0geSArIHV2eSArIHV1dnk7XG4gIG91dFsyXSA9IHogKyB1dnogKyB1dXZ6O1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHgtYXhpc1xyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCBiLCByYWQpIHtcbiAgdmFyIHAgPSBbXSxcbiAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gIHJbMF0gPSBwWzBdO1xuICByWzFdID0gcFsxXSAqIE1hdGguY29zKHJhZCkgLSBwWzJdICogTWF0aC5zaW4ocmFkKTtcbiAgclsyXSA9IHBbMV0gKiBNYXRoLnNpbihyYWQpICsgcFsyXSAqIE1hdGguY29zKHJhZCk7IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHktYXhpc1xyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVkob3V0LCBhLCBiLCByYWQpIHtcbiAgdmFyIHAgPSBbXSxcbiAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gIHJbMF0gPSBwWzJdICogTWF0aC5zaW4ocmFkKSArIHBbMF0gKiBNYXRoLmNvcyhyYWQpO1xuICByWzFdID0gcFsxXTtcbiAgclsyXSA9IHBbMl0gKiBNYXRoLmNvcyhyYWQpIC0gcFswXSAqIE1hdGguc2luKHJhZCk7IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHotYXhpc1xyXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcclxuICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZVoob3V0LCBhLCBiLCByYWQpIHtcbiAgdmFyIHAgPSBbXSxcbiAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gIHJbMF0gPSBwWzBdICogTWF0aC5jb3MocmFkKSAtIHBbMV0gKiBNYXRoLnNpbihyYWQpO1xuICByWzFdID0gcFswXSAqIE1hdGguc2luKHJhZCkgKyBwWzFdICogTWF0aC5jb3MocmFkKTtcbiAgclsyXSA9IHBbMl07IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICByZXR1cm4gb3V0O1xufVxuLyoqXHJcbiAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gM0QgdmVjdG9yc1xyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgZmlyc3Qgb3BlcmFuZFxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIG9wZXJhbmRcclxuICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBhbmdsZShhLCBiKSB7XG4gIHZhciBheCA9IGFbMF0sXG4gICAgICBheSA9IGFbMV0sXG4gICAgICBheiA9IGFbMl0sXG4gICAgICBieCA9IGJbMF0sXG4gICAgICBieSA9IGJbMV0sXG4gICAgICBieiA9IGJbMl0sXG4gICAgICBtYWcxID0gTWF0aC5zcXJ0KGF4ICogYXggKyBheSAqIGF5ICsgYXogKiBheiksXG4gICAgICBtYWcyID0gTWF0aC5zcXJ0KGJ4ICogYnggKyBieSAqIGJ5ICsgYnogKiBieiksXG4gICAgICBtYWcgPSBtYWcxICogbWFnMixcbiAgICAgIGNvc2luZSA9IG1hZyAmJiBkb3QoYSwgYikgLyBtYWc7XG4gIHJldHVybiBNYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpKTtcbn1cbi8qKlxyXG4gKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHplcm9cclxuICpcclxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcclxuICogQHJldHVybnMge3ZlYzN9IG91dFxyXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHplcm8ob3V0KSB7XG4gIG91dFswXSA9IDAuMDtcbiAgb3V0WzFdID0gMC4wO1xuICBvdXRbMl0gPSAwLjA7XG4gIHJldHVybiBvdXQ7XG59XG4vKipcclxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyKGEpIHtcbiAgcmV0dXJuIFwidmVjMyhcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiKVwiO1xufVxuLyoqXHJcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxyXG4gKlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgZmlyc3QgdmVjdG9yLlxyXG4gKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZXhhY3RFcXVhbHMoYSwgYikge1xuICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl07XG59XG4vKipcclxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXHJcbiAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICB2YXIgYTAgPSBhWzBdLFxuICAgICAgYTEgPSBhWzFdLFxuICAgICAgYTIgPSBhWzJdO1xuICB2YXIgYjAgPSBiWzBdLFxuICAgICAgYjEgPSBiWzFdLFxuICAgICAgYjIgPSBiWzJdO1xuICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gZ2xNYXRyaXguRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IGdsTWF0cml4LkVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBnbE1hdHJpeC5FUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSk7XG59XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnN1YnRyYWN0fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgc3ViID0gc3VidHJhY3Q7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgbXVsID0gbXVsdGlwbHk7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmRpdmlkZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGRpdiA9IGRpdmlkZTtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XHJcbiAqIEBmdW5jdGlvblxyXG4gKi9cblxuZXhwb3J0IHZhciBkaXN0ID0gZGlzdGFuY2U7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHNxckRpc3QgPSBzcXVhcmVkRGlzdGFuY2U7XG4vKipcclxuICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLmxlbmd0aH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIGxlbiA9IGxlbmd0aDtcbi8qKlxyXG4gKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cclxuICogQGZ1bmN0aW9uXHJcbiAqL1xuXG5leHBvcnQgdmFyIHNxckxlbiA9IHNxdWFyZWRMZW5ndGg7XG4vKipcclxuICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxyXG4gKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjM3MgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gYVxyXG4gKiBAZnVuY3Rpb25cclxuICovXG5cbmV4cG9ydCB2YXIgZm9yRWFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHZlYyA9IGNyZWF0ZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgIHZhciBpLCBsO1xuXG4gICAgaWYgKCFzdHJpZGUpIHtcbiAgICAgIHN0cmlkZSA9IDM7XG4gICAgfVxuXG4gICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgIG9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50KSB7XG4gICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbCA9IGEubGVuZ3RoO1xuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICB2ZWNbMF0gPSBhW2ldO1xuICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICB2ZWNbMl0gPSBhW2kgKyAyXTtcbiAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgIGFbaSArIDFdID0gdmVjWzFdO1xuICAgICAgYVtpICsgMl0gPSB2ZWNbMl07XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH07XG59KCk7IiwidmFyIGdsQ2Fwc3VsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBnbENhcHN1bGUoKSB7XG4gICAgICAgIHRoaXMubGFzdE1pbGxpc2Vjb25kcyA9IDA7XG4gICAgICAgIHRoaXMuZnBzID0gMDtcbiAgICAgICAgdGhpcy5lcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXJyb3Jtc2dcIik7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjXCIpO1xuICAgICAgICB0aGlzLmdsID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcbiAgICAgICAgaWYgKCF0aGlzLmdsKSB7XG4gICAgICAgICAgICB2YXIgbXNnID0gXCJGYXRhbCBlcnJvcjogV2ViR0wyIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBjaGVjayB5b3VyIGJyb3dzZXIncyBjb21wYXRpYmlsaXR5LlwiO1xuICAgICAgICAgICAgYWxlcnQoXCJXZWJHTDIgbm90IGF2YWlsYWJsZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUVycm9yKG1zZyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIkdvdCBXZWJHTDJcIik7XG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy51cGRhdGVNb3VzZUNvb3Jkcy5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgZ2xDYXBzdWxlLnByb3RvdHlwZS5kaXNwbGF5RXJyb3IgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIHRoaXMuZXJyb3JDb250YWluZXIuaW5uZXJIVE1MID0gbXNnO1xuICAgIH07XG4gICAgZ2xDYXBzdWxlLnByb3RvdHlwZS51cGRhdGVNb3VzZUNvb3JkcyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0yZih0aGlzLnVuaWZvcm1Mb2MoXCJ1X21vdXNlXCIpLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbiAgICB9O1xuICAgIGdsQ2Fwc3VsZS5wcm90b3R5cGUudW5pZm9ybUxvYyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sIG5hbWUpO1xuICAgIH07XG4gICAgZ2xDYXBzdWxlLnByb3RvdHlwZS5jcmVhdGVTaGFkZXIgPSBmdW5jdGlvbiAodHlwZSwgc3JjKSB7XG4gICAgICAgIHZhciBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0eXBlKTtcbiAgICAgICAgdGhpcy5nbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpO1xuICAgICAgICB0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICAgICAgaWYgKCF0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgICAgICB2YXIgbXNnID0gXCJDYW5ub3QgY3JlYXRlIHNoYWRlciBvZiB0eXBlIFwiICsgdHlwZSArIFwiXFxuXCIgK1xuICAgICAgICAgICAgICAgIHRoaXMuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IobXNnKTtcbiAgICAgICAgICAgIHRoaXMuZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hhZGVyO1xuICAgIH07XG4gICAgZ2xDYXBzdWxlLnByb3RvdHlwZS51cGRhdGVVbmlmb3JtMWYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBfdGhpcy5nbC51bmlmb3JtMWYoX3RoaXMudW5pZm9ybUxvYyhuYW1lKSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgZ2xDYXBzdWxlLnByb3RvdHlwZS51cGRhdGVVbmlmb3JtMmYgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuZ2wudW5pZm9ybTJmKF90aGlzLnVuaWZvcm1Mb2MobmFtZSksIF90aGlzLnBhcmFtZXRlcnNbbmFtZV0ueCwgX3RoaXMucGFyYW1ldGVyc1tuYW1lXS55KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGdsQ2Fwc3VsZS5wcm90b3R5cGUudXBkYXRlVW5pZm9ybTNmID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmdsLnVuaWZvcm0zZihfdGhpcy51bmlmb3JtTG9jKG5hbWUpLCBfdGhpcy5wYXJhbWV0ZXJzW25hbWVdLngsIF90aGlzLnBhcmFtZXRlcnNbbmFtZV0ueSwgX3RoaXMucGFyYW1ldGVyc1tuYW1lXS56KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIGdsQ2Fwc3VsZS5wcm90b3R5cGUuY3JlYXRlQW5kTGlua1Byb2dyYW0gPSBmdW5jdGlvbiAodmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcikge1xuICAgICAgICB2YXIgcHJvZyA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihwcm9nLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgICAgICB0aGlzLmdsLmF0dGFjaFNoYWRlcihwcm9nLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIHRoaXMuZ2wubGlua1Byb2dyYW0ocHJvZyk7XG4gICAgICAgIGlmICghdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2csIHRoaXMuZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgICAgICB2YXIgbXNnID0gXCJDYW5ub3QgY3JlYXRlIFdlYkdMMiBwcm9ncmFtXFxuXCIgKyB0aGlzLmdsLmdldFByb2dyYW1JbmZvTG9nKHByb2cpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IobXNnKTtcbiAgICAgICAgICAgIHRoaXMuZ2wuZGVsZXRlUHJvZ3JhbShwcm9nKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2ViR0wyIHByb2dyYW0gY3JlYXRlZCBhbmQgbGlua2VkIHdpdGhvdXQgZXJyb3JzXCIpO1xuICAgICAgICByZXR1cm4gcHJvZztcbiAgICB9O1xuICAgIGdsQ2Fwc3VsZS5wcm90b3R5cGUudG9nZ2xlRnVsbHNjcmVlbiA9IGZ1bmN0aW9uIChmcykge1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGZzID8gd2luZG93LmlubmVyV2lkdGggOiA4MDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGZzID8gd2luZG93LmlubmVySGVpZ2h0IDogNjAwO1xuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0yZih0aGlzLnVuaWZvcm1Mb2MoXCJ1X3Jlc29sdXRpb25cIiksIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH07XG4gICAgZ2xDYXBzdWxlLnByb3RvdHlwZS51cGRhdGVGcHMgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUuZGVidWcoXCJ1cGRhdGVGcHMoJWQpXCIsIG1pbGxpc2Vjb25kcyk7XG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMgLSB0aGlzLmxhc3RNaWxsaXNlY29uZHMgPj0gMTAwMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcHNcIikuaW5uZXJIVE1MID0gKHRoaXMuZnBzICsgMSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMubGFzdE1pbGxpc2Vjb25kcyA9IG1pbGxpc2Vjb25kcztcbiAgICAgICAgICAgIHRoaXMuZnBzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnBzKys7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBnbENhcHN1bGU7XG59KCkpO1xuZXhwb3J0IHsgZ2xDYXBzdWxlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgKiBhcyBkYXQgZnJvbSBcImRhdC5ndWlcIjtcbmltcG9ydCB7IG1hdDQsIHZlYzMgfSBmcm9tIFwiZ2wtbWF0cml4XCI7XG5pbXBvcnQgeyBnbENhcHN1bGUgfSBmcm9tIFwiLi9nbENhcHN1bGVcIjtcbmltcG9ydCBmcmFnbWVudFNoYWRlclNyYyBmcm9tIFwiLi9zaGFkZXJzL3BvaW50Y2xvdWQtZnJhZ21lbnQuZ2xzbFwiO1xuaW1wb3J0IHZlcnRleFNoYWRlclNyYyBmcm9tIFwiLi9zaGFkZXJzL3BvaW50Y2xvdWQtdmVydGV4Lmdsc2xcIjtcbi8qKlxuICogUG9pbnQgY2xvdWRcbiAqL1xudmFyIFBPSU5UX0NPVU5UID0gNTAwO1xudmFyIFBvaW50Y2xvdWQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBvaW50Y2xvdWQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUG9pbnRjbG91ZCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIC8vIFBhcmFtZXRlcnMgaGFuZGxlZCBieSBEYXQuZ3VpIHdpZGdldHNcbiAgICAgICAgX3RoaXMucGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgLy8gRnJ1c3R1bSB2YXJpYWJsZXNcbiAgICAgICAgICAgIEZfbmVhcjogMTAuMCxcbiAgICAgICAgICAgIEZfZmFyOiAyNTAuMCxcbiAgICAgICAgICAgIEZfYm90dG9tOiAtNi4wLFxuICAgICAgICAgICAgRl90b3A6IDYuMCxcbiAgICAgICAgICAgIEZfbGVmdDogMCxcbiAgICAgICAgICAgIEZfcmlnaHQ6IDAsXG4gICAgICAgICAgICBzY2FsZTogNTAsXG4gICAgICAgICAgICB0cmFuc2xhdGU6IC0xMDAsXG4gICAgICAgIH07XG4gICAgICAgIC8vIEN1Ym8gZGkgbGF0byAyIGNlbnRyYXRvIGluIHplcm9cbiAgICAgICAgLy8gY29vcmRpbmF0ZXMgPSBbMC4wMjA4MzMzMzM5NTQyMTUwNSwgMTYuNjY2NjY2MDMwODgzNzksIC0xNjAuNzc2OTQ3MDIxNDg0MzgsIC0xNTBdOyAvLyAtLjEsIC0uMSwgMTAsIDAsIC45OTksIDEwLjVdO1xuICAgICAgICBfdGhpcy5jb29yZGluYXRlcyA9IG5ldyBBcnJheShQT0lOVF9DT1VOVCAqIDMpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFBvaW50Y2xvdWQucHJvdG90eXBlLmRyYXdTY2VuZSA9IGZ1bmN0aW9uIChtaWxsaXNlY29uZHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpO1xuICAgICAgICB0aGlzLmdsLmNsZWFyKHRoaXMuZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IHRoaXMuZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgICAgIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pO1xuICAgICAgICB0aGlzLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZhbyk7XG4gICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICAvLyBOLiBkaSBwdW50aVxuICAgICAgICB2YXIgY291bnQgPSBQT0lOVF9DT1VOVDtcbiAgICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKHRoaXMuZ2wuUE9JTlRTLCBvZmZzZXQsIGNvdW50KTtcbiAgICAgICAgLy8gQWdnaW9ybmEgbGUgdmFyaWFiaWxpIHVuaWZvcm1cbiAgICAgICAgdGhpcy5zZXRNYXRyaXgobWlsbGlzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5nbC51bmlmb3JtMWYodGhpcy51bmlmb3JtTG9jKFwidV90aW1lXCIpLCBtaWxsaXNlY29uZHMpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICBfdGhpcy5kcmF3U2NlbmUobSk7XG4gICAgICAgICAgICBfdGhpcy51cGRhdGVGcHMobSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUG9pbnRjbG91ZC5wcm90b3R5cGUuc2V0TWF0cml4ID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xuICAgICAgICB2YXIgbSA9IG1hdDQuY3JlYXRlKCk7XG4gICAgICAgIG1hdDQudHJhbnNsYXRlKG0sIG0sIHZlYzMuZnJvbVZhbHVlcygwLCAwLCB0aGlzLnBhcmFtZXRlcnMudHJhbnNsYXRlKSk7XG4gICAgICAgIG1hdDQuc2NhbGUobSwgbSwgdmVjMy5mcm9tVmFsdWVzKHRoaXMucGFyYW1ldGVycy5zY2FsZSwgdGhpcy5wYXJhbWV0ZXJzLnNjYWxlLCB0aGlzLnBhcmFtZXRlcnMuc2NhbGUpKTtcbiAgICAgICAgbWF0NC5yb3RhdGVZKG0sIG0sIG1pbGxpc2Vjb25kcyAvIDMwMDApO1xuICAgICAgICB0aGlzLnByb2pNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpO1xuICAgICAgICBtYXQ0LmZydXN0dW0odGhpcy5wcm9qTWF0cml4LCB0aGlzLnBhcmFtZXRlcnMuRl9sZWZ0LCB0aGlzLnBhcmFtZXRlcnMuRl9yaWdodCwgdGhpcy5wYXJhbWV0ZXJzLkZfYm90dG9tLCB0aGlzLnBhcmFtZXRlcnMuRl90b3AsIHRoaXMucGFyYW1ldGVycy5GX25lYXIsIHRoaXMucGFyYW1ldGVycy5GX2Zhcik7XG4gICAgICAgIHRoaXMucHJvak1hdHJpeCA9IG1hdDQubXVsdGlwbHkodGhpcy5wcm9qTWF0cml4LCB0aGlzLnByb2pNYXRyaXgsIG0pO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy51bmlmb3JtTG9jKFwidV9tYXRyaXhcIiksIGZhbHNlLCB0aGlzLnByb2pNYXRyaXgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQXNzZWduYSBpIHZhbG9yaSBpbml6aWFsaSBhbGxlIHZhcmlhYmlsaSBVbmlmb3JtIHV0aWxpenphdGUgZGFsbG8gc2hhZGVyXG4gICAgICovXG4gICAgUG9pbnRjbG91ZC5wcm90b3R5cGUuYmluZFVuaWZvcm1zID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0xZih0aGlzLnVuaWZvcm1Mb2MoXCJ1X3RpbWVcIiksIDApO1xuICAgICAgICB0aGlzLmdsLnVuaWZvcm0yZih0aGlzLnVuaWZvcm1Mb2MoXCJ1X21vdXNlXCIpLCAwLCAwKTtcbiAgICAgICAgLy8gdGhpcy5nbC51bmlmb3JtMmYoXG4gICAgICAgIC8vICAgdGhpcy51bmlmb3JtTG9jKFwidV9yZXNvbHV0aW9uXCIpLFxuICAgICAgICAvLyAgIHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgICAvLyAgIHRoaXMuY2FudmFzLmhlaWdodFxuICAgICAgICAvLyApO1xuICAgIH07XG4gICAgUG9pbnRjbG91ZC5wcm90b3R5cGUuaW5pdEdVSSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGd1aSA9IG5ldyBkYXQuR1VJKHsgbmFtZTogXCJQb2ludCBjbG91ZFwiIH0pO1xuICAgICAgICBndWlcbiAgICAgICAgICAgIC5hZGQodGhpcy5wYXJhbWV0ZXJzLCBcImZ1bGxzY3JlZW5cIilcbiAgICAgICAgICAgIC5vbkNoYW5nZSh0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG4gICAgICAgIGd1aVxuICAgICAgICAgICAgLmFkZCh0aGlzLnBhcmFtZXRlcnMsIFwiRl9uZWFyXCIsIDEsIDEwMClcbiAgICAgICAgICAgIC5vbkNoYW5nZSh0aGlzLnNldE1hdHJpeC5iaW5kKHRoaXMpKTtcbiAgICAgICAgZ3VpLmFkZCh0aGlzLnBhcmFtZXRlcnMsIFwiRl9mYXJcIiwgMS45LCAyMDAwKTtcbiAgICAgICAgZ3VpLmFkZCh0aGlzLnBhcmFtZXRlcnMsIFwiRl9ib3R0b21cIiwgLTIwLCAwKTtcbiAgICAgICAgZ3VpLmFkZCh0aGlzLnBhcmFtZXRlcnMsIFwiRl90b3BcIiwgMCwgMjApO1xuICAgICAgICBndWkuYWRkKHRoaXMucGFyYW1ldGVycywgXCJzY2FsZVwiLCAzLCAxMDApO1xuICAgICAgICBndWkuYWRkKHRoaXMucGFyYW1ldGVycywgXCJ0cmFuc2xhdGVcIiwgLTMwMCwgLTEpO1xuICAgICAgICBndWkub3BlbigpO1xuICAgIH07XG4gICAgUG9pbnRjbG91ZC5wcm90b3R5cGUuZG9UaGVKb2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIENyZWF6aW9uZSBkZWdsaSBzaGFkZXIgZSBkZWwgcHJvZ3JhbW1hXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIsIHZlcnRleFNoYWRlclNyYyk7XG4gICAgICAgIHZhciBmcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSLCBmcmFnbWVudFNoYWRlclNyYyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlZCB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlcnNcIik7XG4gICAgICAgIHRoaXMucHJvZ3JhbSA9IHRoaXMuY3JlYXRlQW5kTGlua1Byb2dyYW0odmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XG4gICAgICAgIHZhciBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sIFwiY29vcmRpbmF0ZXNcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIGFycmF5IG9mIHJhbmRvbSBwb2ludHMuLi5cIik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUE9JTlRfQ09VTlQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jb29yZGluYXRlc1tpICogM10gPSAtMSArIE1hdGgucmFuZG9tKCkgKiAyO1xuICAgICAgICAgICAgdGhpcy5jb29yZGluYXRlc1tpICogMyArIDFdID0gLTEgKyBNYXRoLnJhbmRvbSgpICogMjtcbiAgICAgICAgICAgIHRoaXMuY29vcmRpbmF0ZXNbaSAqIDMgKyAyXSA9IC0xICsgTWF0aC5yYW5kb20oKSAqIDI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBvc2l0aW9uQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBwb3NpdGlvbkJ1ZmZlcik7XG4gICAgICAgIC8vIHRocmVlIDNkIHBvaW50c1xuICAgICAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5jb29yZGluYXRlcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuICAgICAgICB0aGlzLnZhbyA9IHRoaXMuZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgICAgICAgLy8gbWFrZSAndmFvJyB0aGUgY3VycmVudCB2ZXJ0ZXggYXJyYXkgc28gdGhhdCBhbGwgb2Ygb3VyIGF0dHJpYnV0ZSBzZXR0aW5ncyB3aWxsIGFwcGx5IHRvIHRoYXQgc2V0IG9mIGF0dHJpYnV0ZSBzdGF0ZVxuICAgICAgICB0aGlzLmdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZhbyk7XG4gICAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG4gICAgICAgIHZhciBzaXplID0gMzsgLy8gMyBjb21wb25lbnRzIHBlciBpdGVyYXRpb25cbiAgICAgICAgdmFyIHR5cGUgPSB0aGlzLmdsLkZMT0FUOyAvLyB0aGUgZGF0YSBpcyAzMmJpdCBmbG9hdHNcbiAgICAgICAgdmFyIG5vcm1hbGl6ZSA9IGZhbHNlOyAvLyBkb24ndCBub3JtYWxpemUgdGhlIGRhdGFcbiAgICAgICAgdmFyIHN0cmlkZSA9IDA7IC8vIDAgPSBtb3ZlIGZvcndhcmQgc2l6ZSAqIHNpemVvZih0eXBlKSBlYWNoIGl0ZXJhdGlvbiB0byBnZXQgdGhlIG5leHQgcG9zaXRpb25cbiAgICAgICAgdmFyIG9mZnNldCA9IDA7IC8vIHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGJ1ZmZlclxuICAgICAgICB0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgc2l6ZSwgdHlwZSwgbm9ybWFsaXplLCBzdHJpZGUsIG9mZnNldCk7XG4gICAgICAgIHRoaXMuaW5pdEdVSSgpO1xuICAgICAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuY2FudmFzLmNsaWVudFdpZHRoLCB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuRl9yaWdodCA9XG4gICAgICAgICAgICAodGhpcy5jYW52YXMuY2xpZW50V2lkdGggKlxuICAgICAgICAgICAgICAgICh0aGlzLnBhcmFtZXRlcnMuRl90b3AgLSB0aGlzLnBhcmFtZXRlcnMuRl9ib3R0b20pKSAvXG4gICAgICAgICAgICAgICAgKHRoaXMuY2FudmFzLmNsaWVudEhlaWdodCAqIDIpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuRl9sZWZ0ID0gLXRoaXMucGFyYW1ldGVycy5GX3JpZ2h0O1xuICAgICAgICB0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkRFUFRIX1RFU1QpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkluaXQgc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XG4gICAgICAgICAgICBfdGhpcy5kcmF3U2NlbmUobWlsbGlzZWNvbmRzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQb2ludGNsb3VkLnByb3RvdHlwZS50b2dnbGVGdWxsc2NyZWVuID0gZnVuY3Rpb24gKGZzKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudG9nZ2xlRnVsbHNjcmVlbi5jYWxsKHRoaXMsIGZzKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLkZfcmlnaHQgPVxuICAgICAgICAgICAgKHRoaXMuY2FudmFzLmNsaWVudFdpZHRoICpcbiAgICAgICAgICAgICAgICAodGhpcy5wYXJhbWV0ZXJzLkZfdG9wIC0gdGhpcy5wYXJhbWV0ZXJzLkZfYm90dG9tKSkgL1xuICAgICAgICAgICAgICAgICh0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQgKiAyKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLkZfbGVmdCA9IC10aGlzLnBhcmFtZXRlcnMuRl9yaWdodDtcbiAgICB9O1xuICAgIHJldHVybiBQb2ludGNsb3VkO1xufShnbENhcHN1bGUpKTtcbmV4cG9ydCB7IFBvaW50Y2xvdWQgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=