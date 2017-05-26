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
  END: 'END'
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
};

/**
 * FINPUT COMPONENT CLASS
 * @class
 */

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
    };

    // Setup listeners
    this.removeListeners();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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YUFBSyxZQUFMO0FBQ0Q7QUFDRCxhQUFPLEtBQUssWUFBWjtBQUNEO0FBQ0Q7Ozs7Ozs7OzZCQUtTLEcsRUFBSztBQUNaO0FBQ0EsVUFBSSxRQUFRLEtBQUssWUFBakIsRUFBK0I7QUFDN0IsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLFlBQUwsR0FBb0IsQ0FBeEMsRUFBMkMsSUFBM0MsRUFBaUQsR0FBakQ7O0FBRUEsWUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLGVBQTFCLEVBQTJDO0FBQ3pDLGVBQUssT0FBTCxDQUFhLEtBQWI7QUFDRDtBQUNGOztBQUVELFdBQUssWUFBTCxHQUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQTFDOztBQUVBLGFBQU8sS0FBSyxZQUFaO0FBQ0Q7Ozt3QkFyRGE7QUFDWixhQUFPLEtBQUssUUFBWjtBQUNELEs7c0JBV1csTyxFQUFTO0FBQ25CLFdBQUssUUFBTCxHQUFnQixPQUFoQjtBQUNEOzs7d0JBWmtCO0FBQ2pCLGFBQU8sS0FBSyxhQUFaO0FBQ0QsSztzQkFLZ0IsQyxFQUFHO0FBQ2xCLFdBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNEOzs7d0JBTmtCO0FBQ2pCLGFBQU8sS0FBSyxPQUFMLENBQWEsS0FBSyxZQUFsQixDQUFQO0FBQ0Q7Ozs7OztrQkFoQmtCLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdsZWZ0IGNvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNvbW1hbmQnOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMlxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDM0LFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iLCJcclxuZXhwb3J0cy5BQ1RJT05fVFlQRVMgPSB7XHJcbiAgTlVNQkVSOiAnTlVNQkVSJyxcclxuICBTSE9SVENVVDogJ1NIT1JUQ1VUJyxcclxuICBERUNJTUFMOiAnREVDSU1BTCcsXHJcbiAgREVMSU1JVEVSOiAnREVMSU1JVEVSJyxcclxuICBNSU5VUzogJ01JTlVTJyxcclxuICBVTktOT1dOOiAnVU5LTk9XTicsXHJcbiAgSE9SSVpPTlRBTF9BUlJPVzogJ0hPUklaT05UQUxfQVJST1cnLFxyXG4gIFZFUlRJQ0FMX0FSUk9XOiAnVkVSVElDQUxfQVJST1cnLFxyXG4gIEJBQ0tTUEFDRTogJ0JBQ0tTUEFDRScsXHJcbiAgREVMRVRFOiAnREVMRVRFJyxcclxuICBVTkRPOiAnVU5ETycsXHJcbiAgUkVETzogJ1JFRE8nLFxyXG4gIEhPTUU6ICdIT01FJyxcclxuICBFTkQ6ICdFTkQnXHJcbn1cclxuXHJcbmV4cG9ydHMuRFJBR19TVEFURVMgPSB7XHJcbiAgTk9ORTogJ05PTkUnLFxyXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxyXG4gIEVYVEVSTkFMOiAnRVhURVJOQUwnXHJcbn1cclxuXHJcbmV4cG9ydHMuUkFOR0UgPSB7XHJcbiAgQUxMOiAnQUxMJyxcclxuICBQT1NJVElWRTogJ1BPU0lUSVZFJ1xyXG59XHJcbiIsImltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xyXG5pbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENPTlNUQU5UU1xyXG4gKi9cclxuY29uc3QgREVGQVVMVFMgPSB7XHJcbiAgc2NhbGU6IDIsXHJcbiAgcmFuZ2U6IFJBTkdFLkFMTCxcclxuICBmaXhlZDogdHJ1ZSxcclxuICB0aG91c2FuZHM6ICcsJyxcclxuICBkZWNpbWFsOiAnLicsXHJcbiAgc2hvcnRjdXRzOiB7XHJcbiAgICAnayc6IDEwMDAsXHJcbiAgICAnbSc6IDEwMDAwMDAsXHJcbiAgICAnYic6IDEwMDAwMDAwMDBcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSU5QVVQgQ09NUE9ORU5UIENMQVNTXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuY2xhc3MgRmlucHV0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RPTSBFbGVtZW50fSBUaGUgbnVtYmVyIGlucHV0XHJcbiAgICogQHBhcmFtIHtPcHRpb25zfSBPcHRpb25zIGZvciB0aGUgbnVtYmVyIGlucHV0J3MgYmVoYXZpb3VyXHJcbiAgICpcclxuICAgKiBEZXRhaWxlZCBsaXN0IG9mIHBvc3NpYmxlIG9wdGlvbnM6XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNjYWxlfSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0c1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5yYW5nZX0gV2hldGhlciBudW1iZXIgY2FuIHRha2UgYW55IHZhbHVlIG9yIG11c3QgYmUgcG9zaXRpdmVcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZml4ZWR9IEFmdGVyIGZvY3VzIGlzIGxvc3QgLSB2YWx1ZSBpcyBmb3JtYXR0ZWQgdG8gKnNjYWxlKiBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMudGhvdXNhbmRzfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgdGhvdXNhbmRzIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5kZWNpbWFsfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgZGVjaW1hbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zaG9ydGN1dHN9IE9iamVjdCBtYXAgb2Ygc2hvcnRjdXQgY2hhcmFjdGVycyB0byBtdWx0aXBsaWVyIChlLmcuIHsgazogMTAwMCB9KVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgLi4uREVGQVVMVFMsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fYWN0aW9uVHlwZXMgPSB0aGlzLmNyZWF0ZUFjdGlvblR5cGVzKCk7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gbmV3IFZhbHVlSGlzdG9yeSgpO1xyXG5cclxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcclxuICAgICAgYmx1cjogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRm9jdXNvdXQuYmluZCh0aGlzKSB9LFxyXG4gICAgICBmb2N1czogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c2luLmJpbmQodGhpcykgfSxcclxuICAgICAgZHJvcDogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJvcC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIHBhc3RlOiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vblBhc3RlLmJpbmQodGhpcykgfSxcclxuICAgICAga2V5ZG93bjogIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGlucHV0OiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbklucHV0LmJpbmQodGhpcykgfSxcclxuXHJcbiAgICAgIGRyYWdzdGFydDogICAgeyBlbGVtZW50OiBkb2N1bWVudCwgaGFuZGxlcjogdGhpcy5vbkRyYWdzdGFydC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGRyYWdlbmQ6ICAgIHsgZWxlbWVudDogZG9jdW1lbnQsIGhhbmRsZXI6IHRoaXMub25EcmFnZW5kLmJpbmQodGhpcykgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuICAgIGZvciAobGV0IGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XHJcbiAgICAgIHRoaXMuX2xpc3RlbmVyc1tlXS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZSwgdGhpcy5fbGlzdGVuZXJzW2VdLmhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBlbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG4gIGdldCBvcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBjb3JyZWN0IGFjdGlvbiB0eXBlIHRvIGNoYXIva2V5IGNvZGVzIGFycmF5IHdpdGggdGhlXHJcbiAgICogY29ycmVjdCBkZWNpbWFsIGFuZCB0aG91c2FuZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAoZGVwZW5kaW5nIG9uIGxhbmd1YWdlKVxyXG4gICAqL1xyXG4gIGNyZWF0ZUFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5OVU1CRVIsXHJcbiAgICAgICAgbmFtZXM6IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTUlOVVMsXHJcbiAgICAgICAgbmFtZXM6IFsnLSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9NRSxcclxuICAgICAgICBuYW1lczogWydob21lJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5FTkQsXHJcbiAgICAgICAgbmFtZXM6IFsnZW5kJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUNJTUFMLFxyXG4gICAgICAgIG5hbWVzOiBbdGhpcy5vcHRpb25zLmRlY2ltYWxdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMSU1JVEVSLFxyXG4gICAgICAgIG5hbWVzOiBbdGhpcy5vcHRpb25zLnRob3VzYW5kc11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5TSE9SVENVVCxcclxuICAgICAgICBuYW1lczogT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnNob3J0Y3V0cylcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5CQUNLU1BBQ0UsXHJcbiAgICAgICAgbmFtZXM6IFsnYmFja3NwYWNlJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxFVEUsXHJcbiAgICAgICAgbmFtZXM6IFsnZGVsZXRlJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XLFxyXG4gICAgICAgIG5hbWVzOiBbJ2xlZnQnLCAncmlnaHQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XLFxyXG4gICAgICAgIG5hbWVzOiBbJ3VwJywgJ2Rvd24nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlVORE8sXHJcbiAgICAgICAgbmFtZXM6IFsneiddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5SRURPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3knXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyB3aGF0IHR5cGUgb2YgYWN0aW9uIG5lZWRzIHRvIGJlIGRlYWx0IHdpdGggZnJvbSB0aGUgY3VycmVudFxyXG4gICAqIGtleWRvd24gZXZlbnQuIEUuZy4gdmVydGljYWwgYXJyb3cgcHJlc3NlZCwgbnVtYmVyIHByZXNzZWQgZXRjLi4uXHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIGdldEFjdGlvblR5cGUobmFtZSwgZSkge1xyXG4gICAgZm9yIChsZXQgYWN0aW9uVHlwZSBvZiB0aGlzLl9hY3Rpb25UeXBlcykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGFjdGlvblR5cGUubmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgY29uc3QgdHlwZU1hdGNoID0gaW5kZXggPiAtMTtcclxuXHJcbiAgICAgIGlmICh0eXBlTWF0Y2ggJiYgKGFjdGlvblR5cGUuY3RybCA/IGUuY3RybEtleSA6IHRydWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvblR5cGUudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFDVElPTl9UWVBFUy5VTktOT1dOO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG51bWVyaWNhbCB2YWx1ZSBvZiB0aGUgZ2l2ZW4gdmFsdWVcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gY29udmVydFxyXG4gICAqL1xyXG4gIGdldFJhd1ZhbHVlKHZhbCkge1xyXG4gICAgcmV0dXJuIE51bWJlcih0aGlzLmVsZW1lbnQudmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy50aG91c2FuZHMsICdnJyksICcnKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICogQHBhcmFtIHtub3ROdWxsfSBXaGVuIHRydWUsIHJlc3RyaWN0cyBzZXR0aW5nIHRoZSB2YWx1ZSBpZiBpdCBpcyBudWxsLlxyXG4gICAqL1xyXG4gIHNldFZhbHVlKHZhbCwgbm90TnVsbCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChub3ROdWxsID8gdmFsIDogdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgdGhpcy5lbGVtZW50LnJhd1ZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gICAgICB0aGlzLl9oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYW5kIGZvcm1hdHMgdGhlIHZhbHVlIGZvciB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldFJhd1ZhbHVlKHZhbCkge1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgaWYgKCF2YWwpIHtcclxuICAgICAgdmFsdWUgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbCkpIHtcclxuICAgICAgdmFsdWUgPSB2YWwudG9TdHJpbmcoKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdmFsdWUgPSB2YWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKHZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZShuZXdWYWx1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBFVkVOVCBIQU5ETEVSU1xyXG4gIC8vXHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzaW5nIE9VVCBvZiB0aGUgaW5wdXQgLSBmb3JtYXQgZnVsbHlcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c291dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBPVVQgZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXMgb2YgdGhlIGlucHV0IC0gU2VsZWN0IGFsbCB0ZXh0XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNpbihlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBJTiBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gMDtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQgPSB0aGlzLmVsZW1lbnQudmFsdWUubGVuZ3RoO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBkcm9wcGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXQgLSByZXBsYWNlIHRoZSBXSE9MRSB2YWx1ZVxyXG4gICAqIHdpdGggdGhpcyBuZXcgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyb3AoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJvcCBldmVudCcsIGUpO1xyXG4gICAgc3dpdGNoICh0aGlzLl9kcmFnU3RhdGUpIHtcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5JTlRFUk5BTDpcclxuICAgICAgICAvLyBUaGlzIGNhc2UgaXMgaGFuZGxlZCBieSB0aGUgJ29uSW5wdXQnIGZ1bmN0aW9uXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuRVhURVJOQUw6XHJcbiAgICAgICAgY29uc3QgdmFsID0gaGVscGVycy5wYXJzZVN0cmluZyhlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWwsIHRydWUpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEbyBub3RoaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gc3RhcnQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ3N0YXJ0KGUpIHtcclxuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxyXG4gICAgICA/IERSQUdfU1RBVEVTLklOVEVSTkFMXHJcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLl9kcmFnU3RhdGUsIGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBlbmQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ2VuZChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIEVOREVEJywgdGhpcy5fZHJhZ1N0YXRlLCBlKTtcclxuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHBhc3Rpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBDbGlwYm9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvblBhc3RlKGUpIHtcclxuICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodmFsLCB0cnVlKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcHJlc3NpbmcgYW55IGtleSBpbnNpZGUgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uS2V5ZG93bihlKSB7XHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkgPyBrZXljb2RlKGUpLnJlcGxhY2UoJ251bXBhZCAnLCAnJykgOiBudWxsLFxyXG4gICAgICBjYXJldFN0YXJ0OiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgbmV3VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSB0aGlzLmdldEFjdGlvblR5cGUoa2V5SW5mby5rZXlOYW1lLCBlKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25OdW1iZXIoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25NaW51cyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1c6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT01FOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5FTkQ6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW91clxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuQkFDS1NQQUNFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uQmFja3NwYWNlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5ERUxFVEU6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWxldGUoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlVORE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25VbmRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuUkVETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblJlZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIElmIGN0cmwga2V5IG1vZGlmaWVyIGlzIHByZXNzZWQgdGhlbiBhbGxvdyBzcGVjaWZpYyBldmVudCBoYW5kbGVyXHJcbiAgICAgICAgLy8gdG8gaGFuZGxlIHRoaXNcclxuICAgICAgICBpZiAoIWUuY3RybEtleSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLnBhcnRpYWxGb3JtYXQoa2V5SW5mby5uZXdWYWx1ZSwgdGhpcy5vcHRpb25zKTtcclxuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGtleUluZm8ubmV3VmFsdWU7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB0aGlzLmVsZW1lbnQucmF3VmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgY29uc3Qgb2Zmc2V0ID0gaGVscGVycy5jYWxjdWxhdGVPZmZzZXQoXHJcbiAgICAgIGN1cnJlbnRWYWx1ZSxcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgKTtcclxuICAgIGNvbnN0IG5ld0NhcmV0UG9zID0ga2V5SW5mby5jYXJldFN0YXJ0ICsgb2Zmc2V0O1xyXG4gICAgdGhpcy5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKG5ld0NhcmV0UG9zLCBuZXdDYXJldFBvcyk7XHJcbiAgICB0aGlzLl9oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQmFja3VwIGV2ZW50IGlmIGlucHV0IGNoYW5nZXMgZm9yIGFueSBvdGhlciByZWFzb24sIGp1c3QgZm9ybWF0IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBFdmVudFxyXG4gICAqL1xyXG4gIG9uSW5wdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1Zygnb24gSU5QVVQnLCBlKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHJlbW92ZUxpc3RlbmVycygpIHtcclxuICAgIGZvciAobGV0IGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XHJcbiAgICAgIHRoaXMuX2xpc3RlbmVyc1tlXS5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSwgdGhpcy5fbGlzdGVuZXJzW2VdLmhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gRmFjdG9yeSBmdW5jdGlvblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XHJcblxyXG4gIGlmICghZWxlbWVudCkge1xyXG4gICAgdGhyb3cgJ0lucHV0IGVsZW1lbnQgbXVzdCBiZSBzdXBwbGllZCBhcyBmaXJzdCBhcmd1bWVudCc7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpbnB1dCA9IG5ldyBGaW5wdXQoZWxlbWVudCwgb3B0aW9ucyB8fCB7fSk7XHJcbiAgZWxlbWVudC5zZXRSYXdWYWx1ZSA9ICh2KSA9PiBpbnB1dC5zZXRSYXdWYWx1ZSh2KTtcclxuICBlbGVtZW50LnNldFZhbHVlID0gKHYpID0+IGlucHV0LnNldFZhbHVlKHYpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgaW5wdXQucmVtb3ZlTGlzdGVuZXJzKCk7XHJcbiAgICBkZWxldGUgZWxlbWVudC5zZXRSYXdWYWx1ZTtcclxuICAgIGRlbGV0ZSBlbGVtZW50LnNldFZhbHVlO1xyXG4gIH1cclxufTtcclxuIiwiXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLyoqXHJcbiAqIEVkaXQgYSBzdHJpbmcgd2l0aCBhIG5ldyBzdHJpbmcgdG8gYWRkLlxyXG4gKiBIYW5kbGVzIHRoZSBjYXNlIGlmIHRleHQgaXMgaGlnaGxpZ2h0ZWQgYWxzbywgaW4gd2hpY2ggY2FzZSB0aGF0IHRleHRcclxuICogd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSAndG9BZGQnIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0cy5lZGl0U3RyaW5nID0gZnVuY3Rpb24oc3RyLCB0b0FkZCwgY2FyZXRTdGFydCwgY2FyZXRFbmQgPSBjYXJldFN0YXJ0KSB7XHJcbiAgY29uc3QgZmlyc3RIYWxmID0gc3RyLnNsaWNlKDAsIGNhcmV0U3RhcnQpO1xyXG4gIGNvbnN0IHNlY29uZEhhbGYgPSBzdHIuc2xpY2UoY2FyZXRFbmQsIHN0ci5sZW5ndGgpO1xyXG4gIHJldHVybiBgJHtmaXJzdEhhbGZ9JHt0b0FkZH0ke3NlY29uZEhhbGZ9YDtcclxufVxyXG5cclxuZXhwb3J0cy5mb3JtYXRUaG91c2FuZHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBzdGFydEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgLSAxXHJcbiAgICA6IHZhbC5sZW5ndGggLSAxO1xyXG4gIGNvbnN0IGVuZEluZGV4ID0gdmFsWzBdID09PSAnLScgPyAxIDogMDtcclxuXHJcbiAgLy8gaSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvIGJlY2F1c2UgbnVtYmVyIGNhbm5vdCBzdGFydCB3aXRoIGNvbW1hXHJcbiAgbGV0IGkgPSBzdGFydEluZGV4O1xyXG4gIGxldCBqID0gMTtcclxuICBmb3IgKGksIGo7IGkgPiBlbmRJbmRleDsgaS0tLCBqKyspIHtcclxuICAgIC8vIEV2ZXJ5IDMgY2hhcmFjZXJzLCBhZGQgYSBjb21tYVxyXG4gICAgaWYgKGogJSAzID09PSAwKSB7XHJcbiAgICAgIHZhbCA9IHRoaXMuZWRpdFN0cmluZyh2YWwsIG9wdGlvbnMudGhvdXNhbmRzLCBpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcclxuICovXHJcbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHZhbCA9IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJyk7XHJcbiAgdmFsID0gdGhpcy5yZW1vdmVsZWFkaW5nWmVyb3ModmFsLCBvcHRpb25zKTtcclxuICB2YWwgPSB0aGlzLnJlbW92ZUV4dHJhRGVjaW1hbHModmFsLCBvcHRpb25zKTtcclxuICB2YWwgPSB0aGlzLmZvcm1hdFRob3VzYW5kcyh2YWwsIG9wdGlvbnMpO1xyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogRnVsbHkgZm9ybWF0IHRoZSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgdmFsID0gdGhpcy5wYXJ0aWFsRm9ybWF0KHZhbCwgb3B0aW9ucyk7XHJcblxyXG4gIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwgPT0gJycpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIC8vIEZ1bGx5IGZvcm1hdCBkZWNpbWFsIHBsYWNlc1xyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGxldCBzaWduID0gdmFsWzBdID09PSAnLScgPyB2YWxbMF0gOiAnJztcclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2Uoc2lnbiA/IDEgOiAwLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGxldCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKTtcclxuXHJcbiAgaWYgKG9wdGlvbnMuZml4ZWQpIHtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBzaG91bGQgYmUgc29tZSBkZWNpbWFsc1xyXG4gICAgaWYgKG9wdGlvbnMuc2NhbGUgPiAwKSB7XHJcbiAgICAgIGRlY2ltYWxQYXJ0ID0gZGVjaW1hbFBhcnQubGVuZ3RoID49IG9wdGlvbnMuc2NhbGVcclxuICAgICAgICA/IGRlY2ltYWxQYXJ0LnNsaWNlKDAsIG9wdGlvbnMuc2NhbGUpXHJcbiAgICAgICAgOiBkZWNpbWFsUGFydCArIEFycmF5KG9wdGlvbnMuc2NhbGUgLSBkZWNpbWFsUGFydC5sZW5ndGggKyAxKS5qb2luKCcwJyk7XHJcblxyXG4gICAgICBpZiAoIWludGVnZXJQYXJ0Lmxlbmd0aCkge1xyXG4gICAgICAgIGludGVnZXJQYXJ0ID0gJzAnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fSR7b3B0aW9ucy5kZWNpbWFsfSR7ZGVjaW1hbFBhcnR9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9YDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYW55IHN1cnBsdXMgemVyb3MgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG51bWJlclxyXG4gKiBAcGFyYW0ge3N0cn0gVGhlIHN0cmluZyB2YWx1ZSAod2l0aCBubyB0aG91c2FuZCBzZXBhcmF0b3JzKVxyXG4gKi9cclxuZXhwb3J0cy5yZW1vdmVsZWFkaW5nWmVyb3MgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICAvLyBSZW1vdmUgdW5uZWNlc3NhcnkgemVyb3NcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBsZXQgc2lnbiA9IHZhbFswXSA9PT0gJy0nID8gdmFsWzBdIDogJyc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4ICsgMSk7XHJcbiAgY29uc3QgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGxldCBpID0gMDtcclxuXHJcbiAgd2hpbGUgKFxyXG4gICAgaW50ZWdlclBhcnRbaV0gPT0gMFxyXG4gICAgICAmJiBpbnRlZ2VyUGFydFtpICsgMV0gIT09IG9wdGlvbnMuZGVjaW1hbFxyXG4gICAgICAmJiBpbnRlZ2VyUGFydC5sZW5ndGggPiAxXHJcbiAgKSB7XHJcbiAgICBpbnRlZ2VyUGFydCA9IGludGVnZXJQYXJ0LnNsaWNlKDAsIGkpICsgaW50ZWdlclBhcnQuc2xpY2UoaSArIDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke2RlY2ltYWxQYXJ0fWA7XHJcbn1cclxuXHJcbmV4cG9ydHMucmVtb3ZlRXh0cmFEZWNpbWFscyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGxldCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKVxyXG4gICAgLnNsaWNlKDAsIG9wdGlvbnMuc2NhbGUgPT0gbnVsbCA/IGRlY2ltYWxQYXJ0Lmxlbmd0aCA6IG9wdGlvbnMuc2NhbGUpO1xyXG5cclxuICByZXR1cm4gYCR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIGhvdyBtYW55IGNoYXJhY3RlcnMgaGF2ZSBiZWVuIGFkZGVkIChvciByZW1vdmVkKSBiZWZvcmUgdGhlIGdpdmVuXHJcbiAqIGNhcmV0IHBvc2l0aW9uIGFmdGVyIGZvcm1hdHRpbmcuIENhcmV0IGlzIHRoZW4gYWRqdXN0ZWQgYnkgdGhlIHJldHVybmVkIG9mZnNldFxyXG4gKiBDdXJyZW5jeSBzeW1ib2wgb3IgdGhvdXNhbmQgc2VwYXJhdG9ycyBtYXkgaGF2ZSBiZWVuIGFkZGVkXHJcbiAqL1xyXG5leHBvcnRzLmNhbGN1bGF0ZU9mZnNldCA9IGZ1bmN0aW9uKHByZXYsIGN1cnIsIHBvcywgb3B0aW9ucykge1xyXG4gIGxldCBpLCBwcmV2U3ltYm9scyA9IDAsIGN1cnJlbnRTeW1ib2xzID0gMDtcclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAocHJldltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMpIHtcclxuICAgICAgcHJldlN5bWJvbHMrKztcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKGN1cnJbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIGN1cnJlbnRTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50U3ltYm9scyAtIHByZXZTeW1ib2xzO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgKGlmIHRoZSBjaGFyIGlzIGEgemVybykgd2hldGhlciBvciBub3QgYSB6ZXJvIGNhbiBiZSBwbGFjZWQgYXQgdGhpc1xyXG4gKiBwb3NpdGlvbiBpbiB0aGUgdmFsdWUuIElmIGl0IGlzIGFuIHVubmNlc3NhcnkgemVybyAtIGRvIG5vdCBhbGxvdyBpdFxyXG4gKiBAcGFyYW0ge3ZhbH0gdmFsdWUgdG8gY2hlY2sgYWdhaW5zdFxyXG4gKiBAcGFyYW0ge2NoYXJ9IHRoZSBjaGFyYWN0ZXIgYmVpbmcgYWRkZWRcclxuICogQHBhcmFtIHtjYXJldFBvc30gQ3VycmVudCBjYXJldCBwb3NpdGlvbiBpbiBpbnB1dFxyXG4gKiBAcGFyYW0ge29wdGlvbnN9IEZpbnB1dCBvcHRpb25zIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0cy5hbGxvd2VkWmVybyA9IGZ1bmN0aW9uKHZhbCwgY2hhciwgY2FyZXRQb3MsIG9wdGlvbnMpIHtcclxuICBpZiAoY2hhciAhPSAwKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGNvbnN0IGlzTmVnYXRpdmUgPSB2YWxbMF0gPT09ICctJztcclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoKGlzTmVnYXRpdmUgPyAxIDogMCksIGRlY2ltYWxJbmRleCk7XHJcbiAgY2FyZXRQb3MgPSBpc05lZ2F0aXZlID8gY2FyZXRQb3MgLSAxIDogY2FyZXRQb3M7XHJcblxyXG4gIC8vIElmIHRoZXJlIGlzIHNvbWUgaW50ZWdlciBwYXJ0IGFuZCB0aGUgY2FyZXQgaXMgdG8gdGhlIGxlZnQgb2ZcclxuICAvLyB0aGUgZGVjaW1hbCBwb2ludFxyXG4gIGlmICgoaW50ZWdlclBhcnQubGVuZ3RoID4gMCkgJiYgKGNhcmV0UG9zIDwgaW50ZWdlclBhcnQubGVuZ3RoICsgMSkpIHtcclxuICAgIC8vIElGIGludGVnZXIgcGFydCBpcyBqdXN0IGEgemVybyB0aGVuIG5vIHplcm9zIGNhbiBiZSBhZGRlZFxyXG4gICAgLy8gRUxTRSB0aGUgemVybyBjYW4gbm90IGJlIGFkZGVkIGF0IHRoZSBmcm9udCBvZiB0aGUgdmFsdWVcclxuICAgIHJldHVybiBpbnRlZ2VyUGFydCA9PSAwID8gZmFsc2UgOiBjYXJldFBvcyA+IDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgdG8gaXRzIG51bWJlciBlcXVpdmFsZW50XHJcbiAqIEBwYXJhbSB7dmFsfSBzdHJpbmcgdmFsdWUgdG8gY29udmVydCB0byBhIG51bWJlclxyXG4gKiBAcGFyYW0ge29wdGlvbnN9IEZpbnB1dCBvcHRpb25zIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0cy50b051bWJlciA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHJldHVybiB2YWwgJiYgTnVtYmVyKHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJykpO1xyXG59XHJcblxyXG5leHBvcnRzLnBhcnNlU3RyaW5nID0gZnVuY3Rpb24oc3RyLCBvcHRpb25zKSB7XHJcbiAgbGV0IG11bHRpcGxpZXIgPSAxO1xyXG4gIGxldCBwYXJzZWQgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgYyBvZiBzdHIpIHtcclxuICAgIC8vIElmIGEgbnVtYmVyXHJcbiAgICBpZiAoIWlzTmFOKGMpKSB7XHJcbiAgICAgIHBhcnNlZCArPSBjO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYSBkZWNpbWFsIChhbmQgbm8gZGVjaW1hbHMgZXhpc3Qgc28gZmFyKVxyXG4gICAgZWxzZSBpZiAoYyA9PT0gb3B0aW9ucy5kZWNpbWFsICYmIHBhcnNlZC5pbmRleE9mKGMpID09PSAtMSkge1xyXG4gICAgICBwYXJzZWQgKz0gb3B0aW9ucy5kZWNpbWFsO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYSBzaG9ydGN1dFxyXG4gICAgZWxzZSBpZiAob3B0aW9ucy5zaG9ydGN1dHNbY10pIHtcclxuICAgICAgbXVsdGlwbGllciAqPSBvcHRpb25zLnNob3J0Y3V0c1tjXTtcclxuICAgIH1cclxuICAgIC8vIElmIGEgbWludXMgc2lnbiAoYW5kIHBhcnNlZCBzdHJpbmcgaXMgY3VycmVudGx5IGVtcHR5KVxyXG4gICAgZWxzZSBpZiAoYyA9PT0gJy0nICYmICFwYXJzZWQubGVuZ3RoKSB7XHJcbiAgICAgIHBhcnNlZCA9IGM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBPdGhlcndpc2UgaWdub3JlIHRoZSBjaGFyYWN0ZXJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICghcGFyc2VkLmxlbmd0aCkgeyByZXR1cm4gJycgfVxyXG5cclxuICAvLyBOZWVkIHRvIGVuc3VyZSB0aGF0IGRlbGltaXRlciBpcyBhICcuJyBiZWZvcmUgcGFyc2luZyB0byBudW1iZXJcclxuICBjb25zdCBub3JtYWxpc2VkTnVtYmVyID0gTnVtYmVyKHBhcnNlZC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMuZGVjaW1hbH1dYCwgJ2cnKSwgJy4nKSk7XHJcbiAgLy8gVGhlbiBzd2FwIGl0IGJhY2sgaW5cclxuICBjb25zdCBhZGp1c3RlZCA9IFN0cmluZyhub3JtYWxpc2VkTnVtYmVyICogbXVsdGlwbGllcikucmVwbGFjZShuZXcgUmVnRXhwKGBbXFwuXWAsICdnJyksIG9wdGlvbnMuZGVjaW1hbCk7XHJcbiAgY29uc3QgdG9vTGFyZ2UgPSBhZGp1c3RlZC5pbmRleE9mKCdlJykgIT09IC0xO1xyXG5cclxuICBpZiAodG9vTGFyZ2UpIHtcclxuICAgIHJldHVybiAnJ1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gYWRqdXN0ZWQ7XHJcbiAgfVxyXG59XHJcbiIsIi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vICAgICBLRVkgSEFORExFUlMgICAgIC8vXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vIEFsbCBmdW5jdGlvbnMgZGVhbGluZyB3aXRoIGtleXByZXNzZXMgKGxpc3RlbmVkIHRvIG9uIHRoZSBrZXlkb3duIGV2ZW50KVxyXG4vLyBhcmUgaGVyZSwgd2l0aCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgZm9yIG1vc3QgdHlwZXMgb2Yga2V5XHJcblxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgUkFOR0V9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAvKipcclxuICAgKiBOVU1CRVIgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTnVtYmVyOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICAvLyBSZW1vdmUgY2hhcmFjdGVycyBpbiBjdXJyZW50IHNlbGVjdGlvblxyXG4gICAgY29uc3QgdGVtcCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcblxyXG4gICAgY29uc3QgYWxsb3dlZE51bWJlciA9XHJcbiAgICAgICEoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gPT09ICctJ1xyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYga2V5SW5mby5jYXJldEVuZCA9PT0gMClcclxuICAgICAgJiYgaGVscGVycy5hbGxvd2VkWmVybyh0ZW1wLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKGFsbG93ZWROdW1iZXIpIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBNSU5VUyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25NaW51czogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgbWludXNBbGxvd2VkID0ga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIChrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSAhPT0gJy0nIHx8IGtleUluZm8uY2FyZXRFbmQgPiAwKVxyXG4gICAgICAmJiBvcHRpb25zLnJhbmdlICE9PSBSQU5HRS5QT1NJVElWRTtcclxuXHJcbiAgICAgaWYgKG1pbnVzQWxsb3dlZCkge1xyXG4gICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICctJyxcclxuICAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICApO1xyXG4gICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICAgfVxyXG4gICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUNJTUFMIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgb25EZWNpbWFsOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm90IGFscmVhZHkgYSBkZWNpbWFsIG9yIHRoZSBvcmlnaW5hbCB3b3VsZCBiZSByZXBsYWNlZFxyXG4gICAgLy8gQWRkIHRoZSBkZWNpbWFsXHJcbiAgICBjb25zdCBkZWNpbWFsQWxsb3dlZCA9XHJcbiAgICAgIG9wdGlvbnMuc2NhbGUgPiAwXHJcbiAgICAgICYmIChkZWNpbWFsSW5kZXggPT09IC0xXHJcbiAgICAgICAgICB8fCAoZGVjaW1hbEluZGV4ID49IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgICAgICYmIGRlY2ltYWxJbmRleCA8IGtleUluZm8uY2FyZXRFbmQpKVxyXG5cclxuICAgIGlmIChkZWNpbWFsQWxsb3dlZClcclxuICAgIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBvcHRpb25zLmRlY2ltYWwsXHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNIT1JUQ1VUIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgb25TaG9ydGN1dDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IG9wdGlvbnMuc2hvcnRjdXRzW2tleUluZm8ua2V5TmFtZS50b0xvd2VyQ2FzZSgpXSB8fCAxO1xyXG4gICAgY29uc3QgYWRqdXN0ZWRWYWwgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsICcnLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG4gICAgY29uc3QgcmF3VmFsdWUgPSAoaGVscGVycy50b051bWJlcihhZGp1c3RlZFZhbCwgb3B0aW9ucykgfHwgMSkgKiBtdWx0aXBsaWVyO1xyXG5cclxuICAgIGlmIChtdWx0aXBsaWVyKSB7XHJcbiAgICAgIC8vIElmIG51bWJlciBjb250YWlucyAnZScgdGhlbiBpdCBpcyB0b28gbGFyZ2UgdG8gZGlzcGxheVxyXG4gICAgICBpZiAocmF3VmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCdlJykgPT09IC0xKSB7XHJcbiAgICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IFN0cmluZyhyYXdWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0ga2V5SW5mby5uZXdWYWx1ZS5sZW5ndGggKyBNYXRoLmxvZzEwKDEwMDApO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJBQ0tTUEFDRSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIG9uQmFja3NwYWNlOiBmdW5jdGlvbihrZXlJbmZvLCB0aG91c2FuZHMpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEJFRk9SRSBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9ICcnO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGJlZm9yZSBpdFxyXG4gICAgICAgIGxldCBjYXJldEp1bXAgPSAxO1xyXG5cclxuICAgICAgICBjYXJldEp1bXAgPSAoKGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCkgPj0gMCkgPyBjYXJldEp1bXAgOiAwO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IC1jYXJldEp1bXA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkRlbGV0ZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFTEVURSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIG9uRGVsZXRlOiBmdW5jdGlvbihrZXlJbmZvLCB0aG91c2FuZHMpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgY29uc3QgbmV4dENoYXIgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZVtrZXlJbmZvLmNhcmV0U3RhcnRdO1xyXG5cclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9ICcnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBhZnRlciBpdFxyXG4gICAgICAgIGNvbnN0IHRob3VzYW5kc05leHQgPSBuZXh0Q2hhciA9PT0gdGhvdXNhbmRzO1xyXG5cclxuICAgICAgICAvLyBJZiBjaGFyIHRvIGRlbGV0ZSBpcyB0aG91c2FuZHMgYW5kIG51bWJlciBpcyBub3QgdG8gYmUgZGVsZXRlZCAtIHNraXAgb3ZlciBpdFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSB0aG91c2FuZHNOZXh0ID8gMSA6IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RIYWxmU3RhcnQgPSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICsgKHRob3VzYW5kc05leHQgPyAwIDogMSk7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGxhc3RIYWxmU3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkJhY2tzcGFjZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVORE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xyXG4gICAqL1xyXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuX2hpc3RvcnkudW5kbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFJFRE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgcmVkb1xyXG4gICAqL1xyXG4gIG9uUmVkbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuX2hpc3RvcnkucmVkbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbn1cclxuIiwiXHJcbmNvbnN0IE1BWF9CVUZGRVJfU0laRSA9IDUwO1xyXG5cclxuLyoqXHJcbiAqIFZhbHVlIEhpc3RvcnkgLSBNYW5hZ2VzIGFuIGFycmF5IG9mIHZhbHVlcyB0aGF0IGNhbiBiZSB0cmFja2VkLCBzdXBwb3J0aW5nXHJcbiAqIHRoZSB1bmRvIGFuZCByZWRvIG9wZXJhdGlvbnMgaW4gdGhlIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWx1ZUhpc3Rvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBbbnVsbF07XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBoaXN0b3J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50SW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xyXG4gIH1cclxuICBnZXQgY3VycmVudFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgfVxyXG5cclxuICBzZXQgY3VycmVudEluZGV4KGkpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGk7XHJcbiAgfVxyXG4gIHNldCBoaXN0b3J5KGhpc3RvcnkpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBoaXN0b3J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5kbyBjaGFuZ2UsIHNvIHJldHVybiB0byBwcmV2aW91cyB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogUmVkbyBjaGFuZ2UsIHNvIHJldHVybiB0byBuZXh0IHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQWRkIG5ldyB2YWx1ZSB0byBoaXN0b3J5IGFycmF5LiBBbnkgcG9zc2libGUgJ3JlZG8ncycgYXJlIHJlbW92ZWQgZnJvbSBhcnJheVxyXG4gICAqIGFzIGEgbmV3ICdicmFuY2gnIG9mIGhpc3RvcnkgaXMgY3JlYXRlZCB3aGVuIGEgbmV3IHZhbHVlIGlzIGFkZGVkXHJcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGFkZCB0byBoaXN0b3J5XHJcbiAgICovXHJcbiAgYWRkVmFsdWUodmFsKSB7XHJcbiAgICAvLyBEZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjdXJyZW50IHZhbHVlXHJcbiAgICBpZiAodmFsICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmhpc3Rvcnkuc3BsaWNlKHRoaXMuY3VycmVudEluZGV4ICsgMSwgbnVsbCwgdmFsKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gTUFYX0JVRkZFUl9TSVpFKSB7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5LnNoaWZ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbn1cclxuIl19
