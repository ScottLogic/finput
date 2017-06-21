(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.finput = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],2:[function(require,module,exports){
'use strict';

exports.ACTION_TYPES = {
  NUMBER: 'NUMBER',
  SHORTCUT: 'SHORTCUT',
  DECIMAL: 'DECIMAL',
  DELIMITER: 'DELIMITER',
  MINUS: 'MINUS',
  UNKNOWN: 'UNKNOWN',
  HORIZONTAL_ARROW: 'HORIZONTAL_ARROW',
  VERTICAL_ARROW: 'VERTICAL_ARROW',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DELETE',
  UNDO: 'UNDO',
  REDO: 'REDO',
  HOME: 'HOME',
  END: 'END',
  TAB: 'TAB'
};

exports.DRAG_STATES = {
  NONE: 'NONE',
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
};

exports.RANGE = {
  ALL: 'ALL',
  POSITIVE: 'POSITIVE'
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (element, options) {

  if (!element) {
    throw 'Input element must be supplied as first argument';
  }

  var input = new Finput(element, options || {});
  element.setRawValue = function (v) {
    return input.setRawValue(v);
  };
  element.setValue = function (v) {
    return input.setValue(v);
  };

  return function () {
    input.removeListeners();
    delete element.setRawValue;
    delete element.setValue;
  };
};

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _keyHandlers = require('./keyHandlers');

var _keyHandlers2 = _interopRequireDefault(_keyHandlers);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _valueHistory = require('./valueHistory');

var _valueHistory2 = _interopRequireDefault(_valueHistory);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CONSTANTS
 */
var DEFAULTS = {
  scale: 2,
  range: _constants.RANGE.ALL,
  fixed: true,
  thousands: ',',
  decimal: '.',
  shortcuts: {
    'k': 1000,
    'm': 1000000,
    'b': 1000000000
  }

  /**
   * FINPUT COMPONENT CLASS
   * @class
   */
};
var Finput = function () {

  /**
   * Constructor
   * @param {DOM Element} The number input
   * @param {Options} Options for the number input's behaviour
   *
   * Detailed list of possible options:
   * @param {Options.scale} maximum number of decimal digits
   * @param {Options.range} Whether number can take any value or must be positive
   * @param {Options.fixed} After focus is lost - value is formatted to *scale* number of decimal places
   * @param {Options.thousands} Character to use for the thousands separator
   * @param {Options.decimal} Character to use for the decimal point
   * @param {Options.shortcuts} Object map of shortcut characters to multiplier (e.g. { k: 1000 })
   */
  function Finput(element, options) {
    _classCallCheck(this, Finput);

    this._element = element;
    this._options = _extends({}, DEFAULTS, options);

    this._actionTypes = this.createActionTypes();
    this._history = new _valueHistory2.default();

    this._listeners = {
      blur: { element: this.element, handler: this.onFocusout.bind(this) },
      focus: { element: this.element, handler: this.onFocusin.bind(this) },
      drop: { element: this.element, handler: this.onDrop.bind(this) },
      paste: { element: this.element, handler: this.onPaste.bind(this) },
      keydown: { element: this.element, handler: this.onKeydown.bind(this) },
      input: { element: this.element, handler: this.onInput.bind(this) },

      dragstart: { element: document, handler: this.onDragstart.bind(this) },
      dragend: { element: document, handler: this.onDragend.bind(this) }

      // Setup listeners
    };this.removeListeners();
    for (var e in this._listeners) {
      this._listeners[e].element.addEventListener(e, this._listeners[e].handler);
    }
  }

  // GETTERS


  _createClass(Finput, [{
    key: 'createActionTypes',


    /**
     * Creates the correct action type to char/key codes array with the
     * correct decimal and thousand separator characters (depending on language)
     */
    value: function createActionTypes() {
      return [{
        type: _constants.ACTION_TYPES.NUMBER,
        names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      }, {
        type: _constants.ACTION_TYPES.MINUS,
        names: ['-']
      }, {
        type: _constants.ACTION_TYPES.HOME,
        names: ['home']
      }, {
        type: _constants.ACTION_TYPES.END,
        names: ['end']
      }, {
        type: _constants.ACTION_TYPES.TAB,
        names: ['tab']
      }, {
        type: _constants.ACTION_TYPES.DECIMAL,
        names: [this.options.decimal]
      }, {
        type: _constants.ACTION_TYPES.DELIMITER,
        names: [this.options.thousands]
      }, {
        type: _constants.ACTION_TYPES.SHORTCUT,
        names: Object.keys(this.options.shortcuts)
      }, {
        type: _constants.ACTION_TYPES.BACKSPACE,
        names: ['backspace']
      }, {
        type: _constants.ACTION_TYPES.DELETE,
        names: ['delete']
      }, {
        type: _constants.ACTION_TYPES.HORIZONTAL_ARROW,
        names: ['left', 'right']
      }, {
        type: _constants.ACTION_TYPES.VERTICAL_ARROW,
        names: ['up', 'down']
      }, {
        type: _constants.ACTION_TYPES.UNDO,
        names: ['z'],
        ctrl: true
      }, {
        type: _constants.ACTION_TYPES.REDO,
        names: ['y'],
        ctrl: true
      }];
    }
    /**
     * Determines what type of action needs to be dealt with from the current
     * keydown event. E.g. vertical arrow pressed, number pressed etc...
     * @param {e} Keyboard event
     */

  }, {
    key: 'getActionType',
    value: function getActionType(name, e) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._actionTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var actionType = _step.value;

          var index = actionType.names.indexOf(name);
          var typeMatch = index > -1;

          if (typeMatch && (actionType.ctrl ? e.ctrlKey : true)) {
            return actionType.type;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _constants.ACTION_TYPES.UNKNOWN;
    }

    /**
     * Get numerical value of the given value
     * @param {val} Value to convert
     */

  }, {
    key: 'getRawValue',
    value: function getRawValue(val) {
      return Number(this.element.value.replace(new RegExp(this.options.thousands, 'g'), ''));
    }

    /**
     * Sets the value, fully formatted, for the input
     * @param {val} New value to set
     * @param {notNull} When true, restricts setting the value if it is null.
     */

  }, {
    key: 'setValue',
    value: function setValue(val, notNull) {
      var newValue = _helpers2.default.fullFormat(val, this.options);

      if (notNull ? val : true) {
        this.element.value = newValue;
        this.element.rawValue = this.getRawValue(this.element.value);
        this._history.addValue(newValue);
      }
    }

    /**
     * Sets and formats the value for the input
     * @param {val} New value to set
     */

  }, {
    key: 'setRawValue',
    value: function setRawValue(val) {
      var value = void 0;
      if (!val) {
        value = '';
      } else if (typeof val === 'number' && !isNaN(val)) {
        value = val.toString();
      } else if (typeof val === 'string') {
        value = val;
      } else {
        return;
      }

      var newValue = _helpers2.default.parseString(value, this.options);
      this.setValue(newValue, false);
    }

    //
    // EVENT HANDLERS
    //

    /**
     * On focusing OUT of the input - format fully
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusout',
    value: function onFocusout(e) {
      
      this.setValue(this.element.value);
    }
    /**
     * On focus of the input - Select all text
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusin',
    value: function onFocusin(e) {
      
      this.element.selectionStart = 0;
      this.element.selectionEnd = this.element.value.length;
    }
    /**
     * On dropping something into the input - replace the WHOLE value
     * with this new value
     * @param {e} Drag event
     */

  }, {
    key: 'onDrop',
    value: function onDrop(e) {
      
      switch (this._dragState) {
        case _constants.DRAG_STATES.INTERNAL:
          // This case is handled by the 'onInput' function
          break;
        case _constants.DRAG_STATES.EXTERNAL:
          var val = _helpers2.default.parseString(e.dataTransfer.getData('text'), this.options);
          this.setValue(val, true);
          e.preventDefault();
          break;
        default:
          // Do nothing;
          break;
      }
    }

    /**
     * On start of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragstart',
    value: function onDragstart(e) {
      this._dragState = e.target === this.element ? _constants.DRAG_STATES.INTERNAL : _constants.DRAG_STATES.EXTERNAL;
      
    }
    /**
     * On end of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragend',
    value: function onDragend(e) {
      
      this._dragState = _constants.DRAG_STATES.NONE;
    }
    /**
     * On pasting something into the input
     * @param {e} Clipboard event
     */

  }, {
    key: 'onPaste',
    value: function onPaste(e) {
      var val = _helpers2.default.parseString(e.clipboardData.getData('text'), this.options);
      this.setValue(val, true);
      e.preventDefault();
    }
    /**
     * On pressing any key inside the input
     * @param {e} Keyboard event
     */

  }, {
    key: 'onKeydown',
    value: function onKeydown(e) {
      var keyInfo = {
        event: e,
        code: e.which || e.keyCode,
        keyName: (0, _keycode2.default)(e) ? (0, _keycode2.default)(e).replace('numpad ', '') : null,
        caretStart: this.element.selectionStart,
        caretEnd: this.element.selectionEnd,
        currentValue: this.element.value,
        newValue: this.element.value
      };

      var actionType = this.getActionType(keyInfo.keyName, e);

      

      switch (actionType) {
        case _constants.ACTION_TYPES.NUMBER:
          _keyHandlers2.default.onNumber(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.DECIMAL:
          _keyHandlers2.default.onDecimal(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.MINUS:
          _keyHandlers2.default.onMinus(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.SHORTCUT:
          _keyHandlers2.default.onShortcut(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.HORIZONTAL_ARROW:
        case _constants.ACTION_TYPES.VERTICAL_ARROW:
        case _constants.ACTION_TYPES.HOME:
        case _constants.ACTION_TYPES.END:
        case _constants.ACTION_TYPES.TAB:
          
          // Default behaviour
          return;
        case _constants.ACTION_TYPES.BACKSPACE:
          _keyHandlers2.default.onBackspace(keyInfo, this.options.thousands);
          break;
        case _constants.ACTION_TYPES.DELETE:
          _keyHandlers2.default.onDelete(keyInfo, this.options.thousands);
          break;
        case _constants.ACTION_TYPES.UNDO:
          _keyHandlers2.default.onUndo(this, e);
          return;
        case _constants.ACTION_TYPES.REDO:
          _keyHandlers2.default.onRedo(this, e);
          return;
        default:
          // If ctrl key modifier is pressed then allow specific event handler
          // to handle this
          if (!e.ctrlKey) {
            e.preventDefault();
          }
          return;
      }

      var newValue = _helpers2.default.partialFormat(keyInfo.newValue, this.options);
      var currentValue = keyInfo.newValue;

      this.element.value = newValue;
      this.element.rawValue = this.getRawValue(this.element.value);

      var offset = _helpers2.default.calculateOffset(currentValue, this.element.value, keyInfo.caretStart, this.options);
      var newCaretPos = keyInfo.caretStart + offset;
      this.element.setSelectionRange(newCaretPos, newCaretPos);
      this._history.addValue(newValue);
    }
    /**
     * Backup event if input changes for any other reason, just format value
     * @param {e} Event
     */

  }, {
    key: 'onInput',
    value: function onInput(e) {
      
      this.setValue(this.element.value);
    }

    /**
     * Removes all listeners from the input
     */

  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      for (var e in this._listeners) {
        this._listeners[e].element.removeEventListener(e, this._listeners[e].handler);
      }
    }
  }, {
    key: 'element',
    get: function get() {
      return this._element;
    }
  }, {
    key: 'options',
    get: function get() {
      return this._options;
    }
  }]);

  return Finput;
}();

// Factory function


;
module.exports = exports['default'];

},{"./constants":2,"./helpers":4,"./keyHandlers":5,"./valueHistory":6,"keycode":1}],4:[function(require,module,exports){
'use strict';

var _constants = require('./constants');

/**
 * Edit a string with a new string to add.
 * Handles the case if text is highlighted also, in which case that text
 * will be replaced with the 'toAdd' string
 */
exports.editString = function (str, toAdd, caretStart) {
  var caretEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : caretStart;

  var firstHalf = str.slice(0, caretStart);
  var secondHalf = str.slice(caretEnd, str.length);
  return '' + firstHalf + toAdd + secondHalf;
};

exports.formatThousands = function (val, options) {
  var startIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) - 1 : val.length - 1;
  var endIndex = val[0] === '-' ? 1 : 0;

  // i must be greater than zero because number cannot start with comma
  var i = startIndex;
  var j = 1;
  for (i, j; i > endIndex; i--, j++) {
    // Every 3 characers, add a comma
    if (j % 3 === 0) {
      val = this.editString(val, options.thousands, i);
    }
  }

  return val;
};

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function (val, options) {
  val = val.replace(new RegExp('[' + options.thousands + ']', 'g'), '');
  val = this.removeleadingZeros(val, options);
  val = this.removeExtraDecimals(val, options);
  val = this.formatThousands(val, options);

  return val;
};

/**
 * Fully format the value
 */
exports.fullFormat = function (val, options) {
  val = this.partialFormat(val, options);

  if (val == null || val == '') {
    return '';
  }

  // Fully format decimal places
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var sign = val[0] === '-' ? val[0] : '';
  var integerPart = val.slice(sign ? 1 : 0, decimalIndex);
  var decimalPart = val.slice(decimalIndex + 1);

  if (options.fixed) {

    // If there should be some decimals
    if (options.scale > 0) {
      decimalPart = decimalPart.length >= options.scale ? decimalPart.slice(0, options.scale) : decimalPart + Array(options.scale - decimalPart.length + 1).join('0');

      if (!integerPart.length) {
        integerPart = '0';
      }

      return '' + sign + integerPart + options.decimal + decimalPart;
    } else {
      return '' + sign + integerPart;
    }
  } else {
    return val;
  }
};

/**
 * Remove any surplus zeros from the beginning of the integer part of the number
 * @param {str} The string value (with no thousand separators)
 */
exports.removeleadingZeros = function (val, options) {
  // Remove unnecessary zeros
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var sign = val[0] === '-' ? val[0] : '';
  var integerPart = val.slice(sign ? 1 : 0, decimalIndex + 1);
  var decimalPart = val.slice(decimalIndex + 1);

  var i = 0;

  while (integerPart[i] == 0 && integerPart[i + 1] !== options.decimal && integerPart.length > 1) {
    integerPart = integerPart.slice(0, i) + integerPart.slice(i + 1);
  }

  return '' + sign + integerPart + decimalPart;
};

exports.removeExtraDecimals = function (val, options) {
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var integerPart = val.slice(0, decimalIndex + 1);
  var decimalPart = val.slice(decimalIndex + 1).slice(0, options.scale == null ? decimalPart.length : options.scale);

  return '' + integerPart + decimalPart;
};

/**
 * Calculate how many characters have been added (or removed) before the given
 * caret position after formatting. Caret is then adjusted by the returned offset
 * Currency symbol or thousand separators may have been added
 */
exports.calculateOffset = function (prev, curr, pos, options) {
  var i = void 0,
      prevSymbols = 0,
      currentSymbols = 0;
  for (i = 0; i < pos; i++) {
    if (prev[i] === options.thousands) {
      prevSymbols++;
    }
  }
  for (i = 0; i < pos; i++) {
    if (curr[i] === options.thousands) {
      currentSymbols++;
    }
  }
  return currentSymbols - prevSymbols;
};

/**
 * Check (if the char is a zero) whether or not a zero can be placed at this
 * position in the value. If it is an unncessary zero - do not allow it
 * @param {val} value to check against
 * @param {char} the character being added
 * @param {caretPos} Current caret position in input
 * @param {options} Finput options object
 */
exports.allowedZero = function (val, char, caretPos, options) {
  if (char != 0) {
    return true;
  }

  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var isNegative = val[0] === '-';
  var integerPart = val.slice(isNegative ? 1 : 0, decimalIndex);
  caretPos = isNegative ? caretPos - 1 : caretPos;

  // If there is some integer part and the caret is to the left of
  // the decimal point
  if (integerPart.length > 0 && caretPos < integerPart.length + 1) {
    // IF integer part is just a zero then no zeros can be added
    // ELSE the zero can not be added at the front of the value
    return integerPart == 0 ? false : caretPos > 0;
  } else {
    return true;
  }
};

/**
 * Convert a string value to its number equivalent
 * @param {val} string value to convert to a number
 * @param {options} Finput options object
 */
exports.toNumber = function (val, options) {
  return val && Number(val.replace(new RegExp('[' + options.thousands + ']', 'g'), ''));
};

exports.parseString = function (str, options) {
  var multiplier = 1;
  var parsed = '';

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      // If a number
      if (!isNaN(c)) {
        parsed += c;
      }
      // If a decimal (and no decimals exist so far)
      else if (c === options.decimal && parsed.indexOf(c) === -1) {
          parsed += options.decimal;
        }
        // If a shortcut
        else if (options.shortcuts[c]) {
            multiplier *= options.shortcuts[c];
          }
          // If a minus sign (and parsed string is currently empty)
          else if (c === '-' && !parsed.length) {
              parsed = c;
            } else {
              // Otherwise ignore the character
            }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!parsed.length) {
    return '';
  }

  // Need to ensure that delimiter is a '.' before parsing to number
  var normalisedNumber = Number(parsed.replace(new RegExp('[' + options.decimal + ']', 'g'), '.'));
  // Then swap it back in
  var adjusted = String(normalisedNumber * multiplier).replace(new RegExp('[.]', 'g'), options.decimal);
  var tooLarge = adjusted.indexOf('e') !== -1;

  if (tooLarge) {
    return '';
  } else {
    return adjusted;
  }
};

},{"./constants":2}],5:[function(require,module,exports){
'use strict';

var _constants = require('./constants');

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//======================//
//     KEY HANDLERS     //
//======================//
// All functions dealing with keypresses (listened to on the keydown event)
// are here, with specific implementations for most types of key

module.exports = {

  /**
   * NUMBER HANDLER
   * @param {keyInfo} Information about the keypress/action
   */
  onNumber: function onNumber(keyInfo, options) {
    // Remove characters in current selection
    var temp = _helpers2.default.editString(keyInfo.currentValue, '', keyInfo.caretStart, keyInfo.caretEnd);

    var allowedNumber = !(keyInfo.currentValue[0] === '-' && keyInfo.caretStart === 0 && keyInfo.caretEnd === 0) && _helpers2.default.allowedZero(temp, keyInfo.keyName, keyInfo.caretStart, options);

    if (allowedNumber) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, keyInfo.keyName, keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * MINUS HANDLER
   * @param {keyInfo} Information about the keypress/action
   */
  onMinus: function onMinus(keyInfo, options) {
    var minusAllowed = keyInfo.caretStart === 0 && (keyInfo.currentValue[0] !== '-' || keyInfo.caretEnd > 0) && options.range !== _constants.RANGE.POSITIVE;

    if (minusAllowed) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, '-', keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * DECIMAL HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {options} Configuration options for the input
   */
  onDecimal: function onDecimal(keyInfo, options) {
    var decimalIndex = keyInfo.currentValue.indexOf(options.decimal);

    // If there is not already a decimal or the original would be replaced
    // Add the decimal
    var decimalAllowed = options.scale > 0 && (decimalIndex === -1 || decimalIndex >= keyInfo.caretStart && decimalIndex < keyInfo.caretEnd);

    if (decimalAllowed) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, options.decimal, keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }

    keyInfo.event.preventDefault();
  },

  /**
   * SHORTCUT HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {options} Configuration options for the input
   */
  onShortcut: function onShortcut(keyInfo, options) {
    var multiplier = options.shortcuts[keyInfo.keyName.toLowerCase()] || 1;
    var adjustedVal = _helpers2.default.editString(keyInfo.currentValue, '', keyInfo.caretStart, keyInfo.caretEnd);
    var rawValue = (_helpers2.default.toNumber(adjustedVal, options) || 1) * multiplier;

    if (multiplier) {
      // If number contains 'e' then it is too large to display
      if (rawValue.toString().indexOf('e') === -1) {
        keyInfo.newValue = String(rawValue);
      }
      keyInfo.caretStart = keyInfo.newValue.length + Math.log10(1000);
    }
    keyInfo.event.preventDefault();
  },

  /**
   * BACKSPACE HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {thousands} Character used for the thousands delimiter
   */
  onBackspace: function onBackspace(keyInfo, thousands) {
    var firstHalf = void 0,
        lastHalf = void 0;

    if (keyInfo.caretStart === keyInfo.caretEnd) {
      if (keyInfo.event.ctrlKey) {
        // If CTRL key is held down - delete everything BEFORE caret
        firstHalf = '';
        lastHalf = keyInfo.currentValue.slice(keyInfo.caretStart, keyInfo.currentValue.length);
        keyInfo.caretStart = 0;
      } else {
        // Assume as there is a comma then there must be a number before it
        var caretJump = 1;

        caretJump = keyInfo.caretStart - caretJump >= 0 ? caretJump : 0;
        firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart - caretJump);
        lastHalf = keyInfo.currentValue.slice(keyInfo.caretStart, keyInfo.currentValue.length);
        keyInfo.caretStart += -caretJump;
      }
    } else {
      // Same code as onDelete handler for deleting a selection range
      firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
      lastHalf = keyInfo.currentValue.slice(keyInfo.caretEnd, keyInfo.currentValue.length);
    }

    keyInfo.newValue = firstHalf + lastHalf;
    keyInfo.event.preventDefault();
  },

  /**
   * DELETE HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {thousands} Character used for the thousands delimiter
   */
  onDelete: function onDelete(keyInfo, thousands) {
    var firstHalf = void 0,
        lastHalf = void 0;

    if (keyInfo.caretStart === keyInfo.caretEnd) {
      var nextChar = keyInfo.currentValue[keyInfo.caretStart];

      if (keyInfo.event.ctrlKey) {
        // If CTRL key is held down - delete everything AFTER caret
        firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
        lastHalf = '';
      } else {
        // Assume as there is a comma then there must be a number after it
        var thousandsNext = nextChar === thousands;

        // If char to delete is thousands and number is not to be deleted - skip over it
        keyInfo.caretStart += thousandsNext ? 1 : 0;

        var lastHalfStart = keyInfo.caretStart + (thousandsNext ? 0 : 1);
        firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
        lastHalf = keyInfo.currentValue.slice(lastHalfStart, keyInfo.currentValue.length);
      }
    } else {
      // Same code as onBackspace handler for deleting a selection range
      firstHalf = keyInfo.currentValue.slice(0, keyInfo.caretStart);
      lastHalf = keyInfo.currentValue.slice(keyInfo.caretEnd, keyInfo.currentValue.length);
    }

    keyInfo.newValue = firstHalf + lastHalf;
    keyInfo.event.preventDefault();
  },

  /**
   * UNDO HANDLER
   * @param {finput} the Finput object
   * @param {event} The keydown event which triggered the undo
   */
  onUndo: function onUndo(finput, event) {
    finput.element.value = finput._history.undo();
    finput.element.setSelectionRange(finput.element.value.length, finput.element.value.length);
    event.preventDefault();
  },
  /**
   * REDO HANDLER
   * @param {finput} the Finput object
   * @param {event} The keydown event which triggered the redo
   */
  onRedo: function onRedo(finput, event) {
    finput.element.value = finput._history.redo();
    finput.element.setSelectionRange(finput.element.value.length, finput.element.value.length);
    event.preventDefault();
  }
};

},{"./constants":2,"./helpers":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_BUFFER_SIZE = 50;

/**
 * Value History - Manages an array of values that can be tracked, supporting
 * the undo and redo operations in the input
 */

var ValueHistory = function () {
  function ValueHistory() {
    _classCallCheck(this, ValueHistory);

    this._history = [null];
    this._currentIndex = 0;
  }

  // GETTERS


  _createClass(ValueHistory, [{
    key: "undo",


    /**
     * Undo change, so return to previous value in history array
     */
    value: function undo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      return this.currentValue;
    }
    /**
     * Redo change, so return to next value in history array
     */

  }, {
    key: "redo",
    value: function redo() {
      if (this.currentIndex < this.history.length - 1) {
        this.currentIndex++;
      }
      return this.currentValue;
    }
    /**
     * Add new value to history array. Any possible 'redo's' are removed from array
     * as a new 'branch' of history is created when a new value is added
     * @param {val} Value to add to history
     */

  }, {
    key: "addValue",
    value: function addValue(val) {
      // Delete everything AFTER current value
      if (val !== this.currentValue) {
        this.history.splice(this.currentIndex + 1, null, val);

        if (this.history.length > MAX_BUFFER_SIZE) {
          this.history.shift();
        }
      }

      this.currentIndex = this.history.length - 1;

      return this.currentValue;
    }
  }, {
    key: "history",
    get: function get() {
      return this._history;
    },
    set: function set(history) {
      this._history = history;
    }
  }, {
    key: "currentIndex",
    get: function get() {
      return this._currentIndex;
    },
    set: function set(i) {
      this._currentIndex = i;
    }
  }, {
    key: "currentValue",
    get: function get() {
      return this.history[this.currentIndex];
    }
  }]);

  return ValueHistory;
}();

exports.default = ValueHistory;
module.exports = exports['default'];

},{}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFLLFlBQVo7QUFDRDtBQUNEOzs7Ozs7MkJBR087QUFDTCxVQUFJLEtBQUssWUFBTCxHQUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQTlDLEVBQWlEO0FBQy9DLGFBQUssWUFBTDtBQUNEO0FBQ0QsYUFBTyxLQUFLLFlBQVo7QUFDRDtBQUNEOzs7Ozs7Ozs2QkFLUyxHLEVBQUs7QUFDWjtBQUNBLFVBQUksUUFBUSxLQUFLLFlBQWpCLEVBQStCO0FBQzdCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxZQUFMLEdBQW9CLENBQXhDLEVBQTJDLElBQTNDLEVBQWlELEdBQWpEOztBQUVBLFlBQUksS0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixlQUExQixFQUEyQztBQUN6QyxlQUFLLE9BQUwsQ0FBYSxLQUFiO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLLFlBQUwsR0FBb0IsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixDQUExQzs7QUFFQSxhQUFPLEtBQUssWUFBWjtBQUNEOzs7d0JBckRhO0FBQ1osYUFBTyxLQUFLLFFBQVo7QUFDRCxLO3NCQVdXLE8sRUFBUztBQUNuQixXQUFLLFFBQUwsR0FBZ0IsT0FBaEI7QUFDRDs7O3dCQVprQjtBQUNqQixhQUFPLEtBQUssYUFBWjtBQUNELEs7c0JBS2dCLEMsRUFBRztBQUNsQixXQUFLLGFBQUwsR0FBcUIsQ0FBckI7QUFDRDs7O3dCQU5rQjtBQUNqQixhQUFPLEtBQUssT0FBTCxDQUFhLEtBQUssWUFBbEIsQ0FBUDtBQUNEOzs7Ozs7a0JBaEJrQixZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAnbGVmdCBjb21tYW5kJzogOTEsXG4gICdyaWdodCBjb21tYW5kJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjJcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzNCxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcclxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcclxuICBCQUNLU1BBQ0U6ICdCQUNLU1BBQ0UnLFxyXG4gIERFTEVURTogJ0RFTEVURScsXHJcbiAgVU5ETzogJ1VORE8nLFxyXG4gIFJFRE86ICdSRURPJyxcclxuICBIT01FOiAnSE9NRScsXHJcbiAgRU5EOiAnRU5EJyxcclxuICBUQUI6ICdUQUInXHJcbn1cclxuXHJcbmV4cG9ydHMuRFJBR19TVEFURVMgPSB7XHJcbiAgTk9ORTogJ05PTkUnLFxyXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxyXG4gIEVYVEVSTkFMOiAnRVhURVJOQUwnXHJcbn1cclxuXHJcbmV4cG9ydHMuUkFOR0UgPSB7XHJcbiAgQUxMOiAnQUxMJyxcclxuICBQT1NJVElWRTogJ1BPU0lUSVZFJ1xyXG59XHJcbiIsImltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xyXG5pbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogQ09OU1RBTlRTXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUUyA9IHtcclxuICBzY2FsZTogMixcclxuICByYW5nZTogUkFOR0UuQUxMLFxyXG4gIGZpeGVkOiB0cnVlLFxyXG4gIHRob3VzYW5kczogJywnLFxyXG4gIGRlY2ltYWw6ICcuJyxcclxuICBzaG9ydGN1dHM6IHtcclxuICAgICdrJzogMTAwMCxcclxuICAgICdtJzogMTAwMDAwMCxcclxuICAgICdiJzogMTAwMDAwMDAwMFxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZJTlBVVCBDT01QT05FTlQgQ0xBU1NcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBGaW5wdXQge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RE9NIEVsZW1lbnR9IFRoZSBudW1iZXIgaW5wdXRcclxuICAgKiBAcGFyYW0ge09wdGlvbnN9IE9wdGlvbnMgZm9yIHRoZSBudW1iZXIgaW5wdXQncyBiZWhhdmlvdXJcclxuICAgKlxyXG4gICAqIERldGFpbGVkIGxpc3Qgb2YgcG9zc2libGUgb3B0aW9uczpcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2NhbGV9IG1heGltdW0gbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnJhbmdlfSBXaGV0aGVyIG51bWJlciBjYW4gdGFrZSBhbnkgdmFsdWUgb3IgbXVzdCBiZSBwb3NpdGl2ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5maXhlZH0gQWZ0ZXIgZm9jdXMgaXMgbG9zdCAtIHZhbHVlIGlzIGZvcm1hdHRlZCB0byAqc2NhbGUqIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy50aG91c2FuZHN9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSB0aG91c2FuZHMgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmRlY2ltYWx9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSBkZWNpbWFsIHBvaW50XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNob3J0Y3V0c30gT2JqZWN0IG1hcCBvZiBzaG9ydGN1dCBjaGFyYWN0ZXJzIHRvIG11bHRpcGxpZXIgKGUuZy4geyBrOiAxMDAwIH0pXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLl9vcHRpb25zID0ge1xyXG4gICAgICAuLi5ERUZBVUxUUyxcclxuICAgICAgLi4ub3B0aW9uc1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9hY3Rpb25UeXBlcyA9IHRoaXMuY3JlYXRlQWN0aW9uVHlwZXMoKTtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XHJcblxyXG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge1xyXG4gICAgICBibHVyOiAgICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c291dC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGZvY3VzOiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkZvY3VzaW4uYmluZCh0aGlzKSB9LFxyXG4gICAgICBkcm9wOiAgICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Ecm9wLmJpbmQodGhpcykgfSxcclxuICAgICAgcGFzdGU6ICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uUGFzdGUuYmluZCh0aGlzKSB9LFxyXG4gICAgICBrZXlkb3duOiAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25LZXlkb3duLmJpbmQodGhpcykgfSxcclxuICAgICAgaW5wdXQ6ICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uSW5wdXQuYmluZCh0aGlzKSB9LFxyXG5cclxuICAgICAgZHJhZ3N0YXJ0OiAgICB7IGVsZW1lbnQ6IGRvY3VtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJhZ3N0YXJ0LmJpbmQodGhpcykgfSxcclxuICAgICAgZHJhZ2VuZDogICAgeyBlbGVtZW50OiBkb2N1bWVudCwgaGFuZGxlcjogdGhpcy5vbkRyYWdlbmQuYmluZCh0aGlzKSB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0dXAgbGlzdGVuZXJzXHJcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpO1xyXG4gICAgZm9yIChsZXQgZSBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgdGhpcy5fbGlzdGVuZXJzW2VdLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9saXN0ZW5lcnNbZV0uaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcclxuICB9XHJcbiAgZ2V0IG9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcclxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXHJcbiAgICovXHJcbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcclxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcclxuICAgICAgICBuYW1lczogWyctJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT01FLFxyXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcclxuICAgICAgICBuYW1lczogWydlbmQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlRBQixcclxuICAgICAgICBuYW1lczogWyd0YWInXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuX2FjdGlvblR5cGVzKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gYWN0aW9uVHlwZS5uYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBjb25zdCB0eXBlTWF0Y2ggPSBpbmRleCA+IC0xO1xyXG5cclxuICAgICAgaWYgKHR5cGVNYXRjaCAmJiAoYWN0aW9uVHlwZS5jdHJsID8gZS5jdHJsS2V5IDogdHJ1ZSkpIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uVHlwZS50eXBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQUNUSU9OX1RZUEVTLlVOS05PV047XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgbnVtZXJpY2FsIHZhbHVlIG9mIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBjb252ZXJ0XHJcbiAgICovXHJcbiAgZ2V0UmF3VmFsdWUodmFsKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMuZWxlbWVudC52YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnRob3VzYW5kcywgJ2cnKSwgJycpKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB2YWx1ZSwgZnVsbHkgZm9ybWF0dGVkLCBmb3IgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHt2YWx9IE5ldyB2YWx1ZSB0byBzZXRcclxuICAgKiBAcGFyYW0ge25vdE51bGx9IFdoZW4gdHJ1ZSwgcmVzdHJpY3RzIHNldHRpbmcgdGhlIHZhbHVlIGlmIGl0IGlzIG51bGwuXHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsLCBub3ROdWxsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG5vdE51bGwgPyB2YWwgOiB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICB0aGlzLmVsZW1lbnQucmF3VmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgIHRoaXMuX2hpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhbmQgZm9ybWF0cyB0aGUgdmFsdWUgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0UmF3VmFsdWUodmFsKSB7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBpZiAoIXZhbCkge1xyXG4gICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICB2YWx1ZSA9IHZhbC50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IHZhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFyc2VTdHJpbmcodmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIEVWRU5UIEhBTkRMRVJTXHJcbiAgLy9cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXNpbmcgT1VUIG9mIHRoZSBpbnB1dCAtIGZvcm1hdCBmdWxseVxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3Vzb3V0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIE9VVCBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBmb2N1cyBvZiB0aGUgaW5wdXQgLSBTZWxlY3QgYWxsIHRleHRcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c2luKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIElOIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGRyb3BwaW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dCAtIHJlcGxhY2UgdGhlIFdIT0xFIHZhbHVlXHJcbiAgICogd2l0aCB0aGlzIG5ldyB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJvcChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcm9wIGV2ZW50JywgZSk7XHJcbiAgICBzd2l0Y2ggKHRoaXMuX2RyYWdTdGF0ZSkge1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLklOVEVSTkFMOlxyXG4gICAgICAgIC8vIFRoaXMgY2FzZSBpcyBoYW5kbGVkIGJ5IHRoZSAnb25JbnB1dCcgZnVuY3Rpb25cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5FWFRFUk5BTDpcclxuICAgICAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIERvIG5vdGhpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBzdGFydCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnc3RhcnQoZSkge1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gKGUudGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQpXHJcbiAgICAgID8gRFJBR19TVEFURVMuSU5URVJOQUxcclxuICAgICAgOiBEUkFHX1NUQVRFUy5FWFRFUk5BTDtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgU1RBUlRFRCcsIHRoaXMuX2RyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLl9kcmFnU3RhdGUsIGUpO1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gRFJBR19TVEFURVMuTk9ORTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcGFzdGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IENsaXBib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uUGFzdGUoZSkge1xyXG4gICAgY29uc3QgdmFsID0gaGVscGVycy5wYXJzZVN0cmluZyhlLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh2YWwsIHRydWUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwcmVzc2luZyBhbnkga2V5IGluc2lkZSB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25LZXlkb3duKGUpIHtcclxuICAgIGNvbnN0IGtleUluZm8gPSB7XHJcbiAgICAgIGV2ZW50OiBlLFxyXG4gICAgICBjb2RlOiBlLndoaWNoIHx8IGUua2V5Q29kZSxcclxuICAgICAga2V5TmFtZToga2V5Y29kZShlKSA/IGtleWNvZGUoZSkucmVwbGFjZSgnbnVtcGFkICcsICcnKSA6IG51bGwsXHJcbiAgICAgIGNhcmV0U3RhcnQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgY2FyZXRFbmQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgIGN1cnJlbnRWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBuZXdWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aW9uVHlwZSA9IHRoaXMuZ2V0QWN0aW9uVHlwZShrZXlJbmZvLmtleU5hbWUsIGUpO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk5VTUJFUjpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk51bWJlcihrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5ERUNJTUFMOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVjaW1hbChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5NSU5VUzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk1pbnVzKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlNIT1JUQ1VUOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uU2hvcnRjdXQoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVzpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPTUU6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkVORDpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVEFCOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBiZWhhdmlvdXJcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkJhY2tzcGFjZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVsZXRlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVW5kbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25SZWRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBJZiBjdHJsIGtleSBtb2RpZmllciBpcyBwcmVzc2VkIHRoZW4gYWxsb3cgc3BlY2lmaWMgZXZlbnQgaGFuZGxlclxyXG4gICAgICAgIC8vIHRvIGhhbmRsZSB0aGlzXHJcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gaGVscGVycy5wYXJ0aWFsRm9ybWF0KGtleUluZm8ubmV3VmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBrZXlJbmZvLm5ld1ZhbHVlO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy5lbGVtZW50LnJhd1ZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG5cclxuICAgIGNvbnN0IG9mZnNldCA9IGhlbHBlcnMuY2FsY3VsYXRlT2Zmc2V0KFxyXG4gICAgICBjdXJyZW50VmFsdWUsXHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICB0aGlzLm9wdGlvbnNcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXdDYXJldFBvcyA9IGtleUluZm8uY2FyZXRTdGFydCArIG9mZnNldDtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShuZXdDYXJldFBvcywgbmV3Q2FyZXRQb3MpO1xyXG4gICAgdGhpcy5faGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEJhY2t1cCBldmVudCBpZiBpbnB1dCBjaGFuZ2VzIGZvciBhbnkgb3RoZXIgcmVhc29uLCBqdXN0IGZvcm1hdCB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRXZlbnRcclxuICAgKi9cclxuICBvbklucHV0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ29uIElOUFVUJywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSB0aGUgaW5wdXRcclxuICAgKi9cclxuICByZW1vdmVMaXN0ZW5lcnMoKSB7XHJcbiAgICBmb3IgKGxldCBlIGluIHRoaXMuX2xpc3RlbmVycykge1xyXG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZV0uZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHRoaXMuX2xpc3RlbmVyc1tlXS5oYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xyXG5cclxuICBpZiAoIWVsZW1lbnQpIHtcclxuICAgIHRocm93ICdJbnB1dCBlbGVtZW50IG11c3QgYmUgc3VwcGxpZWQgYXMgZmlyc3QgYXJndW1lbnQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5wdXQgPSBuZXcgRmlucHV0KGVsZW1lbnQsIG9wdGlvbnMgfHwge30pO1xyXG4gIGVsZW1lbnQuc2V0UmF3VmFsdWUgPSAodikgPT4gaW5wdXQuc2V0UmF3VmFsdWUodik7XHJcbiAgZWxlbWVudC5zZXRWYWx1ZSA9ICh2KSA9PiBpbnB1dC5zZXRWYWx1ZSh2KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGlucHV0LnJlbW92ZUxpc3RlbmVycygpO1xyXG4gICAgZGVsZXRlIGVsZW1lbnQuc2V0UmF3VmFsdWU7XHJcbiAgICBkZWxldGUgZWxlbWVudC5zZXRWYWx1ZTtcclxuICB9XHJcbn07XHJcbiIsIlxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cclxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XHJcbiAqIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgJ3RvQWRkJyBzdHJpbmdcclxuICovXHJcbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xyXG4gIGNvbnN0IGZpcnN0SGFsZiA9IHN0ci5zbGljZSgwLCBjYXJldFN0YXJ0KTtcclxuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcclxuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XHJcbn1cclxuXHJcbmV4cG9ydHMuZm9ybWF0VGhvdXNhbmRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3Qgc3RhcnRJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxyXG4gICAgOiB2YWwubGVuZ3RoIC0gMTtcclxuICBjb25zdCBlbmRJbmRleCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDA7XHJcblxyXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxyXG4gIGxldCBpID0gc3RhcnRJbmRleDtcclxuICBsZXQgaiA9IDE7XHJcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XHJcbiAgICAvLyBFdmVyeSAzIGNoYXJhY2VycywgYWRkIGEgY29tbWFcclxuICAgIGlmIChqICUgMyA9PT0gMCkge1xyXG4gICAgICB2YWwgPSB0aGlzLmVkaXRTdHJpbmcodmFsLCBvcHRpb25zLnRob3VzYW5kcywgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogUGFydGlhbGx5IGZvcm1hdCB0aGUgdmFsdWUsIG9ubHkgYWRkaW5nIGNvbW1hcyBhcyBuZWVkZWQgKERvbmUgb24ga2V5cHJlc3Mva2V5dXApXHJcbiAqL1xyXG5leHBvcnRzLnBhcnRpYWxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlbGVhZGluZ1plcm9zKHZhbCwgb3B0aW9ucyk7XHJcbiAgdmFsID0gdGhpcy5yZW1vdmVFeHRyYURlY2ltYWxzKHZhbCwgb3B0aW9ucyk7XHJcbiAgdmFsID0gdGhpcy5mb3JtYXRUaG91c2FuZHModmFsLCBvcHRpb25zKTtcclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bGx5IGZvcm1hdCB0aGUgdmFsdWVcclxuICovXHJcbmV4cG9ydHMuZnVsbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHZhbCA9IHRoaXMucGFydGlhbEZvcm1hdCh2YWwsIG9wdGlvbnMpO1xyXG5cclxuICBpZiAodmFsID09IG51bGwgfHwgdmFsID09ICcnKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICAvLyBGdWxseSBmb3JtYXQgZGVjaW1hbCBwbGFjZXNcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBsZXQgc2lnbiA9IHZhbFswXSA9PT0gJy0nID8gdmFsWzBdIDogJyc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4KTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGlmIChvcHRpb25zLmZpeGVkKSB7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgc2hvdWxkIGJlIHNvbWUgZGVjaW1hbHNcclxuICAgIGlmIChvcHRpb25zLnNjYWxlID4gMCkge1xyXG4gICAgICBkZWNpbWFsUGFydCA9IGRlY2ltYWxQYXJ0Lmxlbmd0aCA+PSBvcHRpb25zLnNjYWxlXHJcbiAgICAgICAgPyBkZWNpbWFsUGFydC5zbGljZSgwLCBvcHRpb25zLnNjYWxlKVxyXG4gICAgICAgIDogZGVjaW1hbFBhcnQgKyBBcnJheShvcHRpb25zLnNjYWxlIC0gZGVjaW1hbFBhcnQubGVuZ3RoICsgMSkuam9pbignMCcpO1xyXG5cclxuICAgICAgaWYgKCFpbnRlZ2VyUGFydC5sZW5ndGgpIHtcclxuICAgICAgICBpbnRlZ2VyUGFydCA9ICcwJztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fWA7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcclxuICogQHBhcmFtIHtzdHJ9IFRoZSBzdHJpbmcgdmFsdWUgKHdpdGggbm8gdGhvdXNhbmQgc2VwYXJhdG9ycylcclxuICovXHJcbmV4cG9ydHMucmVtb3ZlbGVhZGluZ1plcm9zID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgLy8gUmVtb3ZlIHVubmVjZXNzYXJ5IHplcm9zXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZShzaWduID8gMSA6IDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBsZXQgaSA9IDA7XHJcblxyXG4gIHdoaWxlIChcclxuICAgIGludGVnZXJQYXJ0W2ldID09IDBcclxuICAgICAgJiYgaW50ZWdlclBhcnRbaSArIDFdICE9PSBvcHRpb25zLmRlY2ltYWxcclxuICAgICAgJiYgaW50ZWdlclBhcnQubGVuZ3RoID4gMVxyXG4gICkge1xyXG4gICAgaW50ZWdlclBhcnQgPSBpbnRlZ2VyUGFydC5zbGljZSgwLCBpKSArIGludGVnZXJQYXJ0LnNsaWNlKGkgKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG5leHBvcnRzLnJlbW92ZUV4dHJhRGVjaW1hbHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSlcclxuICAgIC5zbGljZSgwLCBvcHRpb25zLnNjYWxlID09IG51bGwgPyBkZWNpbWFsUGFydC5sZW5ndGggOiBvcHRpb25zLnNjYWxlKTtcclxuXHJcbiAgcmV0dXJuIGAke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIG9wdGlvbnMpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIHByZXZTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBjdXJyZW50U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFN5bWJvbHMgLSBwcmV2U3ltYm9scztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcclxuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcclxuICogQHBhcmFtIHt2YWx9IHZhbHVlIHRvIGNoZWNrIGFnYWluc3RcclxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXHJcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XHJcbiAgaWYgKGNoYXIgIT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKChpc05lZ2F0aXZlID8gMSA6IDApLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBzb21lIGludGVnZXIgcGFydCBhbmQgdGhlIGNhcmV0IGlzIHRvIHRoZSBsZWZ0IG9mXHJcbiAgLy8gdGhlIGRlY2ltYWwgcG9pbnRcclxuICBpZiAoKGludGVnZXJQYXJ0Lmxlbmd0aCA+IDApICYmIChjYXJldFBvcyA8IGludGVnZXJQYXJ0Lmxlbmd0aCArIDEpKSB7XHJcbiAgICAvLyBJRiBpbnRlZ2VyIHBhcnQgaXMganVzdCBhIHplcm8gdGhlbiBubyB6ZXJvcyBjYW4gYmUgYWRkZWRcclxuICAgIC8vIEVMU0UgdGhlIHplcm8gY2FuIG5vdCBiZSBhZGRlZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHZhbHVlXHJcbiAgICByZXR1cm4gaW50ZWdlclBhcnQgPT0gMCA/IGZhbHNlIDogY2FyZXRQb3MgPiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHZhbHVlIHRvIGl0cyBudW1iZXIgZXF1aXZhbGVudFxyXG4gKiBAcGFyYW0ge3ZhbH0gc3RyaW5nIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBudW1iZXJcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICByZXR1cm4gdmFsICYmIE51bWJlcih2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpKTtcclxufVxyXG5cclxuZXhwb3J0cy5wYXJzZVN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xyXG4gIGxldCBtdWx0aXBsaWVyID0gMTtcclxuICBsZXQgcGFyc2VkID0gJyc7XHJcblxyXG4gIGZvciAobGV0IGMgb2Ygc3RyKSB7XHJcbiAgICAvLyBJZiBhIG51bWJlclxyXG4gICAgaWYgKCFpc05hTihjKSkge1xyXG4gICAgICBwYXJzZWQgKz0gYztcclxuICAgIH1cclxuICAgIC8vIElmIGEgZGVjaW1hbCAoYW5kIG5vIGRlY2ltYWxzIGV4aXN0IHNvIGZhcilcclxuICAgIGVsc2UgaWYgKGMgPT09IG9wdGlvbnMuZGVjaW1hbCAmJiBwYXJzZWQuaW5kZXhPZihjKSA9PT0gLTEpIHtcclxuICAgICAgcGFyc2VkICs9IG9wdGlvbnMuZGVjaW1hbDtcclxuICAgIH1cclxuICAgIC8vIElmIGEgc2hvcnRjdXRcclxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvcnRjdXRzW2NdKSB7XHJcbiAgICAgIG11bHRpcGxpZXIgKj0gb3B0aW9ucy5zaG9ydGN1dHNbY107XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIG1pbnVzIHNpZ24gKGFuZCBwYXJzZWQgc3RyaW5nIGlzIGN1cnJlbnRseSBlbXB0eSlcclxuICAgIGVsc2UgaWYgKGMgPT09ICctJyAmJiAhcGFyc2VkLmxlbmd0aCkge1xyXG4gICAgICBwYXJzZWQgPSBjO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT3RoZXJ3aXNlIGlnbm9yZSB0aGUgY2hhcmFjdGVyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoIXBhcnNlZC5sZW5ndGgpIHsgcmV0dXJuICcnIH1cclxuXHJcbiAgLy8gTmVlZCB0byBlbnN1cmUgdGhhdCBkZWxpbWl0ZXIgaXMgYSAnLicgYmVmb3JlIHBhcnNpbmcgdG8gbnVtYmVyXHJcbiAgY29uc3Qgbm9ybWFsaXNlZE51bWJlciA9IE51bWJlcihwYXJzZWQucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLmRlY2ltYWx9XWAsICdnJyksICcuJykpO1xyXG4gIC8vIFRoZW4gc3dhcCBpdCBiYWNrIGluXHJcbiAgY29uc3QgYWRqdXN0ZWQgPSBTdHJpbmcobm9ybWFsaXNlZE51bWJlciAqIG11bHRpcGxpZXIpLnJlcGxhY2UobmV3IFJlZ0V4cChgW1xcLl1gLCAnZycpLCBvcHRpb25zLmRlY2ltYWwpO1xyXG4gIGNvbnN0IHRvb0xhcmdlID0gYWRqdXN0ZWQuaW5kZXhPZignZScpICE9PSAtMTtcclxuXHJcbiAgaWYgKHRvb0xhcmdlKSB7XHJcbiAgICByZXR1cm4gJydcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGFkanVzdGVkO1xyXG4gIH1cclxufVxyXG4iLCIvLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyAgICAgS0VZIEhBTkRMRVJTICAgICAvL1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyBBbGwgZnVuY3Rpb25zIGRlYWxpbmcgd2l0aCBrZXlwcmVzc2VzIChsaXN0ZW5lZCB0byBvbiB0aGUga2V5ZG93biBldmVudClcclxuLy8gYXJlIGhlcmUsIHdpdGggc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIGZvciBtb3N0IHR5cGVzIG9mIGtleVxyXG5cclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTlVNQkVSIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk51bWJlcjogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgLy8gUmVtb3ZlIGNoYXJhY3RlcnMgaW4gY3VycmVudCBzZWxlY3Rpb25cclxuICAgIGNvbnN0IHRlbXAgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsICcnLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG5cclxuICAgIGNvbnN0IGFsbG93ZWROdW1iZXIgPVxyXG4gICAgICAhKGtleUluZm8uY3VycmVudFZhbHVlWzBdID09PSAnLSdcclxuICAgICAgJiYga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRFbmQgPT09IDApXHJcbiAgICAgICYmIGhlbHBlcnMuYWxsb3dlZFplcm8odGVtcCwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChhbGxvd2VkTnVtYmVyKSB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTUlOVVMgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTWludXM6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG1pbnVzQWxsb3dlZCA9IGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiAoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gIT09ICctJyB8fCBrZXlJbmZvLmNhcmV0RW5kID4gMClcclxuICAgICAgJiYgb3B0aW9ucy5yYW5nZSAhPT0gUkFOR0UuUE9TSVRJVkU7XHJcblxyXG4gICAgIGlmIChtaW51c0FsbG93ZWQpIHtcclxuICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgICAnLScsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICAgKTtcclxuICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgIH1cclxuICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVDSU1BTCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIG9uRGVjaW1hbDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0ga2V5SW5mby5jdXJyZW50VmFsdWUuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vdCBhbHJlYWR5IGEgZGVjaW1hbCBvciB0aGUgb3JpZ2luYWwgd291bGQgYmUgcmVwbGFjZWRcclxuICAgIC8vIEFkZCB0aGUgZGVjaW1hbFxyXG4gICAgY29uc3QgZGVjaW1hbEFsbG93ZWQgPVxyXG4gICAgICBvcHRpb25zLnNjYWxlID4gMFxyXG4gICAgICAmJiAoZGVjaW1hbEluZGV4ID09PSAtMVxyXG4gICAgICAgICAgfHwgKGRlY2ltYWxJbmRleCA+PSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICAgICAmJiBkZWNpbWFsSW5kZXggPCBrZXlJbmZvLmNhcmV0RW5kKSlcclxuXHJcbiAgICBpZiAoZGVjaW1hbEFsbG93ZWQpXHJcbiAgICB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgb3B0aW9ucy5kZWNpbWFsLFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTSE9SVENVVCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIG9uU2hvcnRjdXQ6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBvcHRpb25zLnNob3J0Y3V0c1trZXlJbmZvLmtleU5hbWUudG9Mb3dlckNhc2UoKV0gfHwgMTtcclxuICAgIGNvbnN0IGFkanVzdGVkVmFsID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgIGNvbnN0IHJhd1ZhbHVlID0gKGhlbHBlcnMudG9OdW1iZXIoYWRqdXN0ZWRWYWwsIG9wdGlvbnMpIHx8IDEpICogbXVsdGlwbGllcjtcclxuXHJcbiAgICBpZiAobXVsdGlwbGllcikge1xyXG4gICAgICAvLyBJZiBudW1iZXIgY29udGFpbnMgJ2UnIHRoZW4gaXQgaXMgdG9vIGxhcmdlIHRvIGRpc3BsYXlcclxuICAgICAgaWYgKHJhd1ZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignZScpID09PSAtMSkge1xyXG4gICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBTdHJpbmcocmF3VmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IGtleUluZm8ubmV3VmFsdWUubGVuZ3RoICsgTWF0aC5sb2cxMCgxMDAwKTtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBCQUNLU1BBQ0UgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7dGhvdXNhbmRzfSBDaGFyYWN0ZXIgdXNlZCBmb3IgdGhlIHRob3VzYW5kcyBkZWxpbWl0ZXJcclxuICAgKi9cclxuICBvbkJhY2tzcGFjZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBCRUZPUkUgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSAnJztcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBiZWZvcmUgaXRcclxuICAgICAgICBsZXQgY2FyZXRKdW1wID0gMTtcclxuXHJcbiAgICAgICAgY2FyZXRKdW1wID0gKChrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApID49IDApID8gY2FyZXRKdW1wIDogMDtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAtY2FyZXRKdW1wO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25EZWxldGUgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcclxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUxFVEUgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7dGhvdXNhbmRzfSBDaGFyYWN0ZXIgdXNlZCBmb3IgdGhlIHRob3VzYW5kcyBkZWxpbWl0ZXJcclxuICAgKi9cclxuICBvbkRlbGV0ZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGNvbnN0IG5leHRDaGFyID0ga2V5SW5mby5jdXJyZW50VmFsdWVba2V5SW5mby5jYXJldFN0YXJ0XTtcclxuXHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSAnJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYWZ0ZXIgaXRcclxuICAgICAgICBjb25zdCB0aG91c2FuZHNOZXh0ID0gbmV4dENoYXIgPT09IHRob3VzYW5kcztcclxuXHJcbiAgICAgICAgLy8gSWYgY2hhciB0byBkZWxldGUgaXMgdGhvdXNhbmRzIGFuZCBudW1iZXIgaXMgbm90IHRvIGJlIGRlbGV0ZWQgLSBza2lwIG92ZXIgaXRcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gdGhvdXNhbmRzTmV4dCA/IDEgOiAwO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0SGFsZlN0YXJ0ID0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICArICh0aG91c2FuZHNOZXh0ID8gMCA6IDEpO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShsYXN0SGFsZlN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25CYWNrc3BhY2UgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcclxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBVTkRPIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHVuZG9cclxuICAgKi9cclxuICBvblVuZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcclxuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Ll9oaXN0b3J5LnVuZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBSRURPIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHJlZG9cclxuICAgKi9cclxuICBvblJlZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcclxuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Ll9oaXN0b3J5LnJlZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5jb25zdCBNQVhfQlVGRkVSX1NJWkUgPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBIaXN0b3J5IC0gTWFuYWdlcyBhbiBhcnJheSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgdHJhY2tlZCwgc3VwcG9ydGluZ1xyXG4gKiB0aGUgdW5kbyBhbmQgcmVkbyBvcGVyYXRpb25zIGluIHRoZSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVIaXN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gW251bGxdO1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuICBnZXQgY3VycmVudEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgc2V0IGN1cnJlbnRJbmRleChpKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpO1xyXG4gIH1cclxuICBzZXQgaGlzdG9yeShoaXN0b3J5KSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gaGlzdG9yeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gcHJldmlvdXMgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHVuZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gbmV4dCB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBuZXcgdmFsdWUgdG8gaGlzdG9yeSBhcnJheS4gQW55IHBvc3NpYmxlICdyZWRvJ3MnIGFyZSByZW1vdmVkIGZyb20gYXJyYXlcclxuICAgKiBhcyBhIG5ldyAnYnJhbmNoJyBvZiBoaXN0b3J5IGlzIGNyZWF0ZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhZGRlZFxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBhZGQgdG8gaGlzdG9yeVxyXG4gICAqL1xyXG4gIGFkZFZhbHVlKHZhbCkge1xyXG4gICAgLy8gRGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY3VycmVudCB2YWx1ZVxyXG4gICAgaWYgKHZhbCAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5oaXN0b3J5LnNwbGljZSh0aGlzLmN1cnJlbnRJbmRleCArIDEsIG51bGwsIHZhbCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IE1BWF9CVUZGRVJfU0laRSkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeS5zaGlmdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==
