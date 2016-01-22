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
  'right click': 93,
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
  "'": 222,
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
  'pgdn': 33,
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, options) {

  if (!element) {
    throw error('Input element must be supplied as first argument');
  }

  var input = new Finput(element, options || {});

  return function () {
    input.removeListeners();
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
      return Number(this.element.value.replace(new RegExp(',', 'g'), ''));
    }

    /**
     * Sets the value, fully formatted, for the input
     * @param {val} New value to set
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
  var caretEnd = arguments.length <= 3 || arguments[3] === undefined ? caretStart : arguments[3];

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
      val = this.editString(val, ',', i);
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
  var i = undefined,
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

  return parsed ? String(Number(parsed) * multiplier) : '';
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
    var multiplier = options.shortcuts[keyInfo.keyName.toLowerCase()];
    var adjustedVal = _helpers2.default.editString(keyInfo.currentValue, '', keyInfo.caretStart, keyInfo.caretEnd);
    var rawValue = _helpers2.default.toNumber(adjustedVal, options);

    if (multiplier) {
      // If whole value is selected
      keyInfo.newValue = String((rawValue || 1) * multiplier);
      keyInfo.caretStart = keyInfo.newValue.length;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * BACKSPACE HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {thousands} Character used for the thousands delimiter
   */
  onBackspace: function onBackspace(keyInfo, thousands) {
    var firstHalf = undefined,
        lastHalf = undefined;

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
    var firstHalf = undefined,
        lastHalf = undefined;

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xKQSxPQUFPLENBQUMsWUFBWSxHQUFHO0FBQ3JCLFFBQU0sRUFBRSxRQUFRO0FBQ2hCLFVBQVEsRUFBRSxVQUFVO0FBQ3BCLFNBQU8sRUFBRSxTQUFTO0FBQ2xCLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLE9BQUssRUFBRSxPQUFPO0FBQ2QsU0FBTyxFQUFFLFNBQVM7QUFDbEIsa0JBQWdCLEVBQUUsa0JBQWtCO0FBQ3BDLGdCQUFjLEVBQUUsZ0JBQWdCO0FBQ2hDLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLFFBQU0sRUFBRSxRQUFRO0FBQ2hCLE1BQUksRUFBRSxNQUFNO0FBQ1osTUFBSSxFQUFFLE1BQU07QUFDWixNQUFJLEVBQUUsTUFBTTtBQUNaLEtBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQTs7QUFFRCxPQUFPLENBQUMsV0FBVyxHQUFHO0FBQ3BCLE1BQUksRUFBRSxNQUFNO0FBQ1osVUFBUSxFQUFFLFVBQVU7QUFDcEIsVUFBUSxFQUFFLFVBQVU7Q0FDckIsQ0FBQTs7QUFFRCxPQUFPLENBQUMsS0FBSyxHQUFHO0FBQ2QsS0FBRyxFQUFFLEtBQUs7QUFDVixVQUFRLEVBQUUsVUFBVTtDQUNyQixDQUFBOzs7Ozs7Ozs7Ozs7O2tCQzhUYyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRXhDLE1BQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixVQUFNLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0dBQ2pFOztBQUVELE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDLENBQUM7O0FBRWpELFNBQU8sWUFBTTtBQUNYLFNBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztHQUN6QixDQUFBO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTFWRCxJQUFNLFFBQVEsR0FBRztBQUNmLE9BQUssRUFBRSxDQUFDO0FBQ1IsT0FBSyxFQUFFLFdBUjBCLEtBQUssQ0FRekIsR0FBRztBQUNoQixPQUFLLEVBQUUsSUFBSTtBQUNYLFdBQVMsRUFBRSxHQUFHO0FBQ2QsU0FBTyxFQUFFLEdBQUc7QUFDWixXQUFTLEVBQUU7QUFDVCxPQUFHLEVBQUUsSUFBSTtBQUNULE9BQUcsRUFBRSxPQUFPO0FBQ1osT0FBRyxFQUFFLFVBQVU7R0FDaEI7Q0FDRjs7Ozs7O0FBQUE7SUFNSyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O0FBZVYsV0FmSSxNQUFNLENBZUUsT0FBTyxFQUFFLE9BQU8sRUFBRTswQkFmMUIsTUFBTTs7QUFnQlIsUUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFDeEIsUUFBSSxDQUFDLFFBQVEsZ0JBQ1IsUUFBUSxFQUNSLE9BQU8sQ0FDWCxDQUFDO0FBQ0YsUUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUM3QyxRQUFJLENBQUMsUUFBUSxHQUFHLDRCQUFrQixDQUFDOztBQUVuQyxRQUFJLENBQUMsVUFBVSxHQUFHO0FBQ2hCLFVBQUksRUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN4RSxXQUFLLEVBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkUsVUFBSSxFQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3BFLFdBQUssRUFBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNyRSxhQUFPLEVBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDdkUsV0FBSyxFQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFOztBQUVyRSxlQUFTLEVBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUN6RSxhQUFPLEVBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtLQUN0RTs7O0FBQUEsQUFHRCxTQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDN0IsVUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUU7R0FDRjs7O0FBQUE7ZUF4Q0csTUFBTTs7Ozs7Ozt3Q0FzRFU7QUFDbEIsYUFBTyxDQUNMO0FBQ0UsWUFBSSxFQUFFLFdBaEZOLFlBQVksQ0FnRk8sTUFBTTtBQUN6QixhQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7T0FDMUQsRUFDRDtBQUNFLFlBQUksRUFBRSxXQXBGTixZQUFZLENBb0ZPLEtBQUs7QUFDeEIsYUFBSyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ2IsRUFDRDtBQUNFLFlBQUksRUFBRSxXQXhGTixZQUFZLENBd0ZPLElBQUk7QUFDdkIsYUFBSyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ2hCLEVBQ0Q7QUFDRSxZQUFJLEVBQUUsV0E1Rk4sWUFBWSxDQTRGTyxHQUFHO0FBQ3RCLGFBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztPQUNmLEVBQ0Q7QUFDRSxZQUFJLEVBQUUsV0FoR04sWUFBWSxDQWdHTyxPQUFPO0FBQzFCLGFBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO09BQzlCLEVBQ0Q7QUFDRSxZQUFJLEVBQUUsV0FwR04sWUFBWSxDQW9HTyxTQUFTO0FBQzVCLGFBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO09BQ2hDLEVBQ0Q7QUFDRSxZQUFJLEVBQUUsV0F4R04sWUFBWSxDQXdHTyxRQUFRO0FBQzNCLGFBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO09BQzNDLEVBQ0Q7QUFDRSxZQUFJLEVBQUUsV0E1R04sWUFBWSxDQTRHTyxTQUFTO0FBQzVCLGFBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQztPQUNyQixFQUNEO0FBQ0UsWUFBSSxFQUFFLFdBaEhOLFlBQVksQ0FnSE8sTUFBTTtBQUN6QixhQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7T0FDbEIsRUFDRDtBQUNFLFlBQUksRUFBRSxXQXBITixZQUFZLENBb0hPLGdCQUFnQjtBQUNuQyxhQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO09BQ3pCLEVBQ0Q7QUFDRSxZQUFJLEVBQUUsV0F4SE4sWUFBWSxDQXdITyxjQUFjO0FBQ2pDLGFBQUssRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7T0FDdEIsRUFDRDtBQUNFLFlBQUksRUFBRSxXQTVITixZQUFZLENBNEhPLElBQUk7QUFDdkIsYUFBSyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ1osWUFBSSxFQUFFLElBQUk7T0FDWCxFQUNEO0FBQ0UsWUFBSSxFQUFFLFdBaklOLFlBQVksQ0FpSU8sSUFBSTtBQUN2QixhQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDWixZQUFJLEVBQUUsSUFBSTtPQUNYLENBQ0YsQ0FBQTtLQUNGOzs7Ozs7Ozs7a0NBTWEsSUFBSSxFQUFFLENBQUMsRUFBRTs7Ozs7O0FBQ3JCLDZCQUF1QixJQUFJLENBQUMsWUFBWSw4SEFBRTtjQUFqQyxVQUFVOztBQUNqQixjQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxjQUFNLFNBQVMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRTdCLGNBQUksU0FBUyxLQUFLLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQ3JELG1CQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUM7V0FDeEI7U0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELGFBQU8sV0FySkgsWUFBWSxDQXFKSSxPQUFPLENBQUM7S0FDN0I7Ozs7Ozs7OztnQ0FNVyxHQUFHLEVBQUU7QUFDZixhQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDckU7Ozs7Ozs7Ozs2QkFPUSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ3JCLFVBQU0sUUFBUSxHQUFHLGtCQUFRLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUV2RCxVQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFO0FBQ3hCLFlBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUM5QixZQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0QsWUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDbEM7S0FDRjs7Ozs7Ozs7Ozs7OzsrQkFVVSxDQUFDLEVBQUU7QUFDWixhQUFPLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQzs7Ozs7Ozs7OEJBS1MsQ0FBQyxFQUFFO0FBQ1gsYUFBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxVQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDaEMsVUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0tBQ3ZEOzs7Ozs7Ozs7MkJBTU0sQ0FBQyxFQUFFO0FBQ1IsYUFBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsY0FBUSxJQUFJLENBQUMsVUFBVTtBQUNyQixhQUFLLFdBNU1XLFdBQVcsQ0E0TVYsUUFBUTs7QUFFdkIsZ0JBQU07QUFBQSxBQUNSLGFBQUssV0EvTVcsV0FBVyxDQStNVixRQUFRO0FBQ3ZCLGNBQU0sR0FBRyxHQUFHLGtCQUFRLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUUsY0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekIsV0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLGdCQUFNO0FBQUEsQUFDUjs7QUFFRSxnQkFBTTtBQUFBLE9BQ1Q7S0FDRjs7Ozs7Ozs7O2dDQU1XLENBQUMsRUFBRTtBQUNiLFVBQUksQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxPQUFPLEdBQ3hDLFdBaE9jLFdBQVcsQ0FnT2IsUUFBUSxHQUNwQixXQWpPYyxXQUFXLENBaU9iLFFBQVEsQ0FBQztBQUN6QixhQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7Ozs7Ozs4QkFLUyxDQUFDLEVBQUU7QUFDWCxhQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hELFVBQUksQ0FBQyxVQUFVLEdBQUcsV0ExT0EsV0FBVyxDQTBPQyxJQUFJLENBQUM7S0FDcEM7Ozs7Ozs7OzRCQUtPLENBQUMsRUFBRTtBQUNULFVBQU0sR0FBRyxHQUFHLGtCQUFRLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0UsVUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekIsT0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3BCOzs7Ozs7Ozs4QkFLUyxDQUFDLEVBQUU7QUFDWCxVQUFNLE9BQU8sR0FBRztBQUNkLGFBQUssRUFBRSxDQUFDO0FBQ1IsWUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU87QUFDMUIsZUFBTyxFQUFFLHVCQUFRLENBQUMsQ0FBQyxHQUFHLHVCQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSTtBQUM5RCxrQkFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYztBQUN2QyxnQkFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTtBQUNuQyxvQkFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztBQUNoQyxnQkFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztPQUM3QixDQUFBOztBQUVELFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFMUQsYUFBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFMUIsY0FBUSxVQUFVO0FBQ2hCLGFBQUssV0F6UUgsWUFBWSxDQXlRSSxNQUFNO0FBQ3RCLGdDQUFZLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLGdCQUFNO0FBQUEsQUFDUixhQUFLLFdBNVFILFlBQVksQ0E0UUksT0FBTztBQUN2QixnQ0FBWSxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QyxnQkFBTTtBQUFBLEFBQ1IsYUFBSyxXQS9RSCxZQUFZLENBK1FJLEtBQUs7QUFDckIsZ0NBQVksT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsZ0JBQU07QUFBQSxBQUNSLGFBQUssV0FsUkgsWUFBWSxDQWtSSSxRQUFRO0FBQ3hCLGdDQUFZLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlDLGdCQUFNO0FBQUEsQUFDUixhQUFLLFdBclJILFlBQVksQ0FxUkksZ0JBQWdCLENBQUM7QUFDbkMsYUFBSyxXQXRSSCxZQUFZLENBc1JJLGNBQWMsQ0FBQztBQUNqQyxhQUFLLFdBdlJILFlBQVksQ0F1UkksSUFBSSxDQUFDO0FBQ3ZCLGFBQUssV0F4UkgsWUFBWSxDQXdSSSxHQUFHO0FBQ25CLGlCQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7QUFBQyxBQUUxQixpQkFBTztBQUFBLEFBQ1QsYUFBSyxXQTVSSCxZQUFZLENBNFJJLFNBQVM7QUFDekIsZ0NBQVksV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pELGdCQUFNO0FBQUEsQUFDUixhQUFLLFdBL1JILFlBQVksQ0ErUkksTUFBTTtBQUN0QixnQ0FBWSxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEQsZ0JBQU07QUFBQSxBQUNSLGFBQUssV0FsU0gsWUFBWSxDQWtTSSxJQUFJO0FBQ3BCLGdDQUFZLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUIsaUJBQU87QUFBQSxBQUNULGFBQUssV0FyU0gsWUFBWSxDQXFTSSxJQUFJO0FBQ3BCLGdDQUFZLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUIsaUJBQU87QUFBQSxBQUNUOzs7QUFHRSxjQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtBQUNkLGFBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztXQUNwQjtBQUNELGlCQUFPO0FBQUEsT0FDVjs7QUFFRCxVQUFNLFFBQVEsR0FBRyxrQkFBUSxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkUsVUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7QUFFdEMsVUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBQzlCLFVBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFN0QsVUFBTSxNQUFNLEdBQUcsa0JBQVEsZUFBZSxDQUNwQyxZQUFZLEVBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQ2xCLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztBQUNGLFVBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0FBQ2hELFVBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELFVBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7Ozs0QkFLTyxDQUFDLEVBQUU7QUFDVCxhQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixVQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7Ozs7O3NDQUtpQjtBQUNoQixXQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDN0IsWUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDL0U7S0FDRjs7O3dCQS9RYTtBQUNaLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7O3dCQUNhO0FBQ1osYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7U0FoREcsTUFBTTs7Ozs7QUF5VVgsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzVWRixPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVMsR0FBRyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQXlCO01BQXZCLFFBQVEseURBQUcsVUFBVTs7QUFDekUsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDM0MsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25ELGNBQVUsU0FBUyxHQUFHLEtBQUssR0FBRyxVQUFVLENBQUc7Q0FDNUMsQ0FBQTs7QUFFRCxPQUFPLENBQUMsZUFBZSxHQUFHLFVBQVMsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUMvQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDaEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUNoQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNuQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDOzs7QUFBQyxBQUd4QyxNQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDbkIsTUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsT0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRWpDLFFBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDZixTQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7Ozs7QUFBQSxBQUtELE9BQU8sQ0FBQyxhQUFhLEdBQUcsVUFBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzdDLEtBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxPQUFLLE9BQU8sQ0FBQyxTQUFTLFFBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakUsS0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUMsS0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0MsS0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUV6QyxTQUFPLEdBQUcsQ0FBQztDQUNaOzs7OztBQUFBLEFBS0QsT0FBTyxDQUFDLFVBQVUsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDMUMsS0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUV2QyxNQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRTtBQUM1QixXQUFPLEVBQUUsQ0FBQztHQUNYOzs7QUFBQSxBQUdELE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNsRCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQzs7QUFFZixNQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEMsTUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN4RCxNQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFOUMsTUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFOzs7QUFHakIsUUFBSSxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtBQUNyQixpQkFBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssR0FDN0MsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUNuQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFFLFVBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLG1CQUFXLEdBQUcsR0FBRyxDQUFDO09BQ25COztBQUVELGtCQUFVLElBQUksR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUc7S0FDaEUsTUFBTTtBQUNMLGtCQUFVLElBQUksR0FBRyxXQUFXLENBQUc7S0FDaEM7R0FDRixNQUFNO0FBQ0wsV0FBTyxHQUFHLENBQUM7R0FDWjtDQUNGOzs7Ozs7QUFBQSxBQU1ELE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7O0FBRWxELE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUNsRCxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FDNUIsR0FBRyxDQUFDLE1BQU0sQ0FBQzs7QUFFZixNQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEMsTUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUQsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRWhELE1BQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFVixTQUNFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQ2QsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxPQUFPLENBQUMsT0FBTyxJQUN0QyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDM0I7QUFDQSxlQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDbEU7O0FBRUQsY0FBVSxJQUFJLEdBQUcsV0FBVyxHQUFHLFdBQVcsQ0FBRztDQUM5QyxDQUFBOztBQUVELE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDbkQsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQ2xELEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUM1QixHQUFHLENBQUMsTUFBTSxDQUFDOztBQUVmLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNuRCxNQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FDMUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFeEUsY0FBVSxXQUFXLEdBQUcsV0FBVyxDQUFHO0NBQ3ZDOzs7Ozs7O0FBQUEsQUFPRCxPQUFPLENBQUMsZUFBZSxHQUFHLFVBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzNELE1BQUksQ0FBQyxZQUFBO01BQUUsV0FBVyxHQUFHLENBQUM7TUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQzNDLE9BQUssQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDakMsaUJBQVcsRUFBRSxDQUFDO0tBQ2Y7R0FDRjtBQUNELE9BQUssQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDakMsb0JBQWMsRUFBRSxDQUFDO0tBQ2xCO0dBQ0Y7QUFDRCxTQUFPLGNBQWMsR0FBRyxXQUFXLENBQUM7Q0FDckM7Ozs7Ozs7Ozs7QUFBQSxBQVVELE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDM0QsTUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO0FBQ2IsV0FBTyxJQUFJLENBQUM7R0FDYjs7QUFFRCxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FDbEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUM7O0FBRWYsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztBQUNsQyxNQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFHLFlBQVksQ0FBQyxDQUFDO0FBQ2hFLFVBQVEsR0FBRyxVQUFVLEdBQUcsUUFBUSxHQUFHLENBQUMsR0FBRyxRQUFROzs7O0FBQUMsQUFJaEQsTUFBSSxBQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQUFBQyxFQUFFOzs7QUFHbkUsV0FBTyxXQUFXLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0dBQ2hELE1BQU07QUFDTCxXQUFPLElBQUksQ0FBQztHQUNiO0NBQ0Y7Ozs7Ozs7QUFBQSxBQU9ELE9BQU8sQ0FBQyxRQUFRLEdBQUcsVUFBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ3hDLFNBQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxPQUFLLE9BQU8sQ0FBQyxTQUFTLFFBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztDQUNsRixDQUFBOztBQUVELE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBUyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQzNDLE1BQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNuQixNQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Ozs7Ozs7QUFFaEIseUJBQWMsR0FBRyw4SEFBRTtVQUFWLENBQUM7OztBQUVSLFVBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDYixjQUFNLElBQUksQ0FBQyxDQUFDOzs7QUFDYixXQUVJLElBQUksQ0FBQyxLQUFLLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxRCxnQkFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUM7OztBQUMzQixhQUVJLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM3QixzQkFBVSxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7OztBQUNwQyxlQUVJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDcEMsb0JBQU0sR0FBRyxDQUFDLENBQUM7YUFDWixNQUFNOzthQUVOO0tBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxTQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUMxRCxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMU1ELE1BQU0sQ0FBQyxPQUFPLEdBQUc7Ozs7OztBQU1mLFVBQVEsRUFBRSxrQkFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFOztBQUVuQyxRQUFNLElBQUksR0FBRyxrQkFBUSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWhHLFFBQU0sYUFBYSxHQUNqQixFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUM5QixPQUFPLENBQUMsVUFBVSxLQUFLLENBQUMsSUFDeEIsT0FBTyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUEsQUFBQyxJQUN2QixrQkFBUSxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFN0UsUUFBSSxhQUFhLEVBQUU7QUFDakIsYUFBTyxDQUFDLFFBQVEsR0FBRyxrQkFBUSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ25ILGFBQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO0tBQ3pCO0FBQ0QsV0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztHQUNoQzs7Ozs7O0FBTUQsU0FBTyxFQUFFLGlCQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7QUFDbEMsUUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFVBQVUsS0FBSyxDQUFDLEtBQ3ZDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBLEFBQUMsSUFDekQsT0FBTyxDQUFDLEtBQUssS0FBSyxXQWpDTCxLQUFLLENBaUNNLFFBQVEsQ0FBQzs7QUFFckMsUUFBSSxZQUFZLEVBQUU7QUFDaEIsYUFBTyxDQUFDLFFBQVEsR0FBRyxrQkFBUSxVQUFVLENBQ25DLE9BQU8sQ0FBQyxZQUFZLEVBQ3BCLEdBQUcsRUFDSCxPQUFPLENBQUMsVUFBVSxFQUNsQixPQUFPLENBQUMsUUFBUSxDQUNqQixDQUFDO0FBQ0YsYUFBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7S0FDekI7QUFDRCxXQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0dBQ2pDOzs7Ozs7O0FBT0QsV0FBUyxFQUFFLG1CQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7QUFDcEMsUUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7OztBQUFDLEFBSW5FLFFBQU0sY0FBYyxHQUNsQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsS0FDYixZQUFZLEtBQUssQ0FBQyxDQUFDLElBQ2YsWUFBWSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQy9CLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEFBQUMsQ0FBQTs7QUFFOUMsUUFBSSxjQUFjLEVBQ2xCO0FBQ0UsYUFBTyxDQUFDLFFBQVEsR0FBRyxrQkFBUSxVQUFVLENBQ25DLE9BQU8sQ0FBQyxZQUFZLEVBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQ2YsT0FBTyxDQUFDLFVBQVUsRUFDbEIsT0FBTyxDQUFDLFFBQVEsQ0FDakIsQ0FBQztBQUNGLGFBQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO0tBQ3pCOztBQUVELFdBQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDaEM7Ozs7Ozs7QUFPRCxZQUFVLEVBQUUsb0JBQVMsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUNyQyxRQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUNwRSxRQUFNLFdBQVcsR0FBRyxrQkFBUSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkcsUUFBTSxRQUFRLEdBQUcsa0JBQVEsUUFBUSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFeEQsUUFBSSxVQUFVLEVBQUU7O0FBRWQsYUFBTyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFBLEdBQUksVUFBVSxDQUFDLENBQUM7QUFDeEQsYUFBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztLQUM5QztBQUNELFdBQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDaEM7Ozs7Ozs7QUFPRCxhQUFXLEVBQUUscUJBQVMsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUN4QyxRQUFJLFNBQVMsWUFBQTtRQUFFLFFBQVEsWUFBQSxDQUFDOztBQUV4QixRQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUMzQyxVQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFOztBQUV6QixpQkFBUyxHQUFHLEVBQUUsQ0FBQztBQUNmLGdCQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZGLGVBQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO09BQ3hCLE1BQU07O0FBRUwsWUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVsQixpQkFBUyxHQUFHLEFBQUMsQUFBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFNBQVMsSUFBSyxDQUFDLEdBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNwRSxpQkFBUyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0FBQzFFLGdCQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZGLGVBQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLENBQUM7T0FDbEM7S0FDRixNQUFNOztBQUVMLGVBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlELGNBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdEY7O0FBRUQsV0FBTyxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLFdBQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDaEM7Ozs7Ozs7QUFPRCxVQUFRLEVBQUUsa0JBQVMsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUNyQyxRQUFJLFNBQVMsWUFBQTtRQUFFLFFBQVEsWUFBQSxDQUFDOztBQUV4QixRQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUMzQyxVQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFMUQsVUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTs7QUFFekIsaUJBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlELGdCQUFRLEdBQUcsRUFBRSxDQUFDO09BQ2YsTUFBTTs7QUFFTCxZQUFNLGFBQWEsR0FBRyxRQUFRLEtBQUssU0FBUzs7O0FBQUMsQUFHN0MsZUFBTyxDQUFDLFVBQVUsSUFBSSxhQUFhLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFNUMsWUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFDbkMsYUFBYSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFDO0FBQzVCLGlCQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5RCxnQkFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQ25GO0tBQ0YsTUFBTTs7QUFFTCxlQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5RCxjQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RGOztBQUVELFdBQU8sQ0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUN4QyxXQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0dBQ2hDOzs7Ozs7O0FBT0QsUUFBTSxFQUFFLGdCQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDOUIsVUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QyxVQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzRixTQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDeEI7Ozs7OztBQU1ELFFBQU0sRUFBRSxnQkFBUyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQzlCLFVBQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDOUMsVUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0YsU0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0dBQ3hCO0NBQ0YsQ0FBQTs7Ozs7Ozs7Ozs7OztBQzlMRCxJQUFNLGVBQWUsR0FBRyxFQUFFOzs7Ozs7QUFBQztJQU1OLFlBQVk7QUFFL0IsV0FGbUIsWUFBWSxHQUVqQjswQkFGSyxZQUFZOztBQUc3QixRQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkIsUUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7R0FDeEI7OztBQUFBO2VBTGtCLFlBQVk7Ozs7OzsyQkE0QnhCO0FBQ0wsVUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRTtBQUN6QixZQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7T0FDckI7QUFDRCxhQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozs7Ozs7MkJBSU07QUFDTCxVQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQy9DLFlBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztPQUNyQjtBQUNELGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7Ozs7Ozs7OzZCQU1RLEdBQUcsRUFBRTs7QUFFWixVQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQzdCLFlBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFdEQsWUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7QUFDekMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjtPQUNGOztBQUVELFVBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUU1QyxhQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozt3QkFyRGE7QUFDWixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7c0JBV1csT0FBTyxFQUFFO0FBQ25CLFVBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0tBQ3pCOzs7d0JBWmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjtzQkFLZ0IsQ0FBQyxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCOzs7d0JBTmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDeEM7OztTQWhCa0IsWUFBWTs7O2tCQUFaLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcclxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcclxuICBCQUNLU1BBQ0U6ICdCQUNLU1BBQ0UnLFxyXG4gIERFTEVURTogJ0RFTEVURScsXHJcbiAgVU5ETzogJ1VORE8nLFxyXG4gIFJFRE86ICdSRURPJyxcclxuICBIT01FOiAnSE9NRScsXHJcbiAgRU5EOiAnRU5EJ1xyXG59XHJcblxyXG5leHBvcnRzLkRSQUdfU1RBVEVTID0ge1xyXG4gIE5PTkU6ICdOT05FJyxcclxuICBJTlRFUk5BTDogJ0lOVEVSTkFMJyxcclxuICBFWFRFUk5BTDogJ0VYVEVSTkFMJ1xyXG59XHJcblxyXG5leHBvcnRzLlJBTkdFID0ge1xyXG4gIEFMTDogJ0FMTCcsXHJcbiAgUE9TSVRJVkU6ICdQT1NJVElWRSdcclxufVxyXG4iLCJpbXBvcnQga2V5Y29kZSBmcm9tICdrZXljb2RlJztcclxuaW1wb3J0IGtleUhhbmRsZXJzIGZyb20gJy4va2V5SGFuZGxlcnMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmFsdWVIaXN0b3J5IGZyb20gJy4vdmFsdWVIaXN0b3J5JztcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDT05TVEFOVFNcclxuICovXHJcbmNvbnN0IERFRkFVTFRTID0ge1xyXG4gIHNjYWxlOiAyLFxyXG4gIHJhbmdlOiBSQU5HRS5BTEwsXHJcbiAgZml4ZWQ6IHRydWUsXHJcbiAgdGhvdXNhbmRzOiAnLCcsXHJcbiAgZGVjaW1hbDogJy4nLFxyXG4gIHNob3J0Y3V0czoge1xyXG4gICAgJ2snOiAxMDAwLFxyXG4gICAgJ20nOiAxMDAwMDAwLFxyXG4gICAgJ2InOiAxMDAwMDAwMDAwXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRklOUFVUIENPTVBPTkVOVCBDTEFTU1xyXG4gKiBAY2xhc3NcclxuICovXHJcbmNsYXNzIEZpbnB1dCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtET00gRWxlbWVudH0gVGhlIG51bWJlciBpbnB1dFxyXG4gICAqIEBwYXJhbSB7T3B0aW9uc30gT3B0aW9ucyBmb3IgdGhlIG51bWJlciBpbnB1dCdzIGJlaGF2aW91clxyXG4gICAqXHJcbiAgICogRGV0YWlsZWQgbGlzdCBvZiBwb3NzaWJsZSBvcHRpb25zOlxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zY2FsZX0gbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBkaWdpdHNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMucmFuZ2V9IFdoZXRoZXIgbnVtYmVyIGNhbiB0YWtlIGFueSB2YWx1ZSBvciBtdXN0IGJlIHBvc2l0aXZlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmZpeGVkfSBBZnRlciBmb2N1cyBpcyBsb3N0IC0gdmFsdWUgaXMgZm9ybWF0dGVkIHRvICpzY2FsZSogbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnRob3VzYW5kc30gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZGVjaW1hbH0gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIGRlY2ltYWwgcG9pbnRcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2hvcnRjdXRzfSBPYmplY3QgbWFwIG9mIHNob3J0Y3V0IGNoYXJhY3RlcnMgdG8gbXVsdGlwbGllciAoZS5nLiB7IGs6IDEwMDAgfSlcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB7XHJcbiAgICAgIC4uLkRFRkFVTFRTLFxyXG4gICAgICAuLi5vcHRpb25zXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fYWN0aW9uVHlwZXMgPSB0aGlzLmNyZWF0ZUFjdGlvblR5cGVzKCk7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gbmV3IFZhbHVlSGlzdG9yeSgpO1xyXG5cclxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcclxuICAgICAgYmx1cjogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRm9jdXNvdXQuYmluZCh0aGlzKSB9LFxyXG4gICAgICBmb2N1czogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c2luLmJpbmQodGhpcykgfSxcclxuICAgICAgZHJvcDogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJvcC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIHBhc3RlOiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vblBhc3RlLmJpbmQodGhpcykgfSxcclxuICAgICAga2V5ZG93bjogIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGlucHV0OiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbklucHV0LmJpbmQodGhpcykgfSxcclxuXHJcbiAgICAgIGRyYWdzdGFydDogICAgeyBlbGVtZW50OiBkb2N1bWVudCwgaGFuZGxlcjogdGhpcy5vbkRyYWdzdGFydC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGRyYWdlbmQ6ICAgIHsgZWxlbWVudDogZG9jdW1lbnQsIGhhbmRsZXI6IHRoaXMub25EcmFnZW5kLmJpbmQodGhpcykgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xyXG4gICAgZm9yIChsZXQgZSBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgdGhpcy5fbGlzdGVuZXJzW2VdLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9saXN0ZW5lcnNbZV0uaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcclxuICB9XHJcbiAgZ2V0IG9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcclxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXHJcbiAgICovXHJcbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcclxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcclxuICAgICAgICBuYW1lczogWyctJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT01FLFxyXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcclxuICAgICAgICBuYW1lczogWydlbmQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuX2FjdGlvblR5cGVzKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gYWN0aW9uVHlwZS5uYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBjb25zdCB0eXBlTWF0Y2ggPSBpbmRleCA+IC0xO1xyXG5cclxuICAgICAgaWYgKHR5cGVNYXRjaCAmJiAoYWN0aW9uVHlwZS5jdHJsID8gZS5jdHJsS2V5IDogdHJ1ZSkpIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uVHlwZS50eXBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQUNUSU9OX1RZUEVTLlVOS05PV047XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgbnVtZXJpY2FsIHZhbHVlIG9mIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBjb252ZXJ0XHJcbiAgICovXHJcbiAgZ2V0UmF3VmFsdWUodmFsKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMuZWxlbWVudC52YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoJywnLCAnZycpLCAnJykpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHZhbHVlLCBmdWxseSBmb3JtYXR0ZWQsIGZvciB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldFZhbHVlKHZhbCwgbm90TnVsbCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChub3ROdWxsID8gdmFsIDogdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgdGhpcy5lbGVtZW50LnJhd1ZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gICAgICB0aGlzLl9oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gRVZFTlQgSEFORExFUlNcclxuICAvL1xyXG5cclxuICAvKipcclxuICAgKiBPbiBmb2N1c2luZyBPVVQgb2YgdGhlIGlucHV0IC0gZm9ybWF0IGZ1bGx5XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNvdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3VzaW4oZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgSU4gZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcclxuICAgKiB3aXRoIHRoaXMgbmV3IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcclxuICAgIHN3aXRjaCAodGhpcy5fZHJhZ1N0YXRlKSB7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuSU5URVJOQUw6XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLkVYVEVSTkFMOlxyXG4gICAgICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsLCB0cnVlKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG8gbm90aGluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHN0YXJ0IG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdzdGFydChlKSB7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSAoZS50YXJnZXQgPT09IHRoaXMuZWxlbWVudClcclxuICAgICAgPyBEUkFHX1NUQVRFUy5JTlRFUk5BTFxyXG4gICAgICA6IERSQUdfU1RBVEVTLkVYVEVSTkFMO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBTVEFSVEVEJywgdGhpcy5fZHJhZ1N0YXRlLCBlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZW5kIG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdlbmQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBFTkRFRCcsIHRoaXMuX2RyYWdTdGF0ZSwgZSk7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSBEUkFHX1NUQVRFUy5OT05FO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwYXN0aW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gQ2xpcGJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25QYXN0ZShlKSB7XHJcbiAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHByZXNzaW5nIGFueSBrZXkgaW5zaWRlIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvbktleWRvd24oZSkge1xyXG4gICAgY29uc3Qga2V5SW5mbyA9IHtcclxuICAgICAgZXZlbnQ6IGUsXHJcbiAgICAgIGNvZGU6IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxyXG4gICAgICBrZXlOYW1lOiBrZXljb2RlKGUpID8ga2V5Y29kZShlKS5yZXBsYWNlKCdudW1wYWQgJywgJycpIDogbnVsbCxcclxuICAgICAgY2FyZXRTdGFydDogdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBjYXJldEVuZDogdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgY3VycmVudFZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIG5ld1ZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3Rpb25UeXBlID0gdGhpcy5nZXRBY3Rpb25UeXBlKGtleUluZm8ua2V5TmFtZSwgZSk7XHJcblxyXG4gICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTlVNQkVSOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTnVtYmVyKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFQ0lNQUw6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWNpbWFsKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk1JTlVTOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTWludXMoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuU0hPUlRDVVQ6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25TaG9ydGN1dChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVzpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9NRTpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuRU5EOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBiZWhhdmlvdXJcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkJhY2tzcGFjZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVsZXRlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVW5kbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25SZWRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBJZiBjdHJsIGtleSBtb2RpZmllciBpcyBwcmVzc2VkIHRoZW4gYWxsb3cgc3BlY2lmaWMgZXZlbnQgaGFuZGxlclxyXG4gICAgICAgIC8vIHRvIGhhbmRsZSB0aGlzXHJcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gaGVscGVycy5wYXJ0aWFsRm9ybWF0KGtleUluZm8ubmV3VmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBrZXlJbmZvLm5ld1ZhbHVlO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy5lbGVtZW50LnJhd1ZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG5cclxuICAgIGNvbnN0IG9mZnNldCA9IGhlbHBlcnMuY2FsY3VsYXRlT2Zmc2V0KFxyXG4gICAgICBjdXJyZW50VmFsdWUsXHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICB0aGlzLm9wdGlvbnNcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXdDYXJldFBvcyA9IGtleUluZm8uY2FyZXRTdGFydCArIG9mZnNldDtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShuZXdDYXJldFBvcywgbmV3Q2FyZXRQb3MpO1xyXG4gICAgdGhpcy5faGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEJhY2t1cCBldmVudCBpZiBpbnB1dCBjaGFuZ2VzIGZvciBhbnkgb3RoZXIgcmVhc29uLCBqdXN0IGZvcm1hdCB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRXZlbnRcclxuICAgKi9cclxuICBvbklucHV0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ29uIElOUFVUJywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSB0aGUgaW5wdXRcclxuICAgKi9cclxuICByZW1vdmVMaXN0ZW5lcnMoKSB7XHJcbiAgICBmb3IgKGxldCBlIGluIHRoaXMuX2xpc3RlbmVycykge1xyXG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZV0uZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHRoaXMuX2xpc3RlbmVyc1tlXS5oYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xyXG5cclxuICBpZiAoIWVsZW1lbnQpIHtcclxuICAgIHRocm93IGVycm9yKCdJbnB1dCBlbGVtZW50IG11c3QgYmUgc3VwcGxpZWQgYXMgZmlyc3QgYXJndW1lbnQnKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbmV3IEZpbnB1dChlbGVtZW50LCBvcHRpb25zIHx8IHt9KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGlucHV0LnJlbW92ZUxpc3RlbmVycygpO1xyXG4gIH1cclxufTtcclxuIiwiXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLyoqXHJcbiAqIEVkaXQgYSBzdHJpbmcgd2l0aCBhIG5ldyBzdHJpbmcgdG8gYWRkLlxyXG4gKiBIYW5kbGVzIHRoZSBjYXNlIGlmIHRleHQgaXMgaGlnaGxpZ2h0ZWQgYWxzbywgaW4gd2hpY2ggY2FzZSB0aGF0IHRleHRcclxuICogd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSAndG9BZGQnIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0cy5lZGl0U3RyaW5nID0gZnVuY3Rpb24oc3RyLCB0b0FkZCwgY2FyZXRTdGFydCwgY2FyZXRFbmQgPSBjYXJldFN0YXJ0KSB7XHJcbiAgY29uc3QgZmlyc3RIYWxmID0gc3RyLnNsaWNlKDAsIGNhcmV0U3RhcnQpO1xyXG4gIGNvbnN0IHNlY29uZEhhbGYgPSBzdHIuc2xpY2UoY2FyZXRFbmQsIHN0ci5sZW5ndGgpO1xyXG4gIHJldHVybiBgJHtmaXJzdEhhbGZ9JHt0b0FkZH0ke3NlY29uZEhhbGZ9YDtcclxufVxyXG5cclxuZXhwb3J0cy5mb3JtYXRUaG91c2FuZHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBzdGFydEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgLSAxXHJcbiAgICA6IHZhbC5sZW5ndGggLSAxO1xyXG4gIGNvbnN0IGVuZEluZGV4ID0gdmFsWzBdID09PSAnLScgPyAxIDogMDtcclxuXHJcbiAgLy8gaSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvIGJlY2F1c2UgbnVtYmVyIGNhbm5vdCBzdGFydCB3aXRoIGNvbW1hXHJcbiAgbGV0IGkgPSBzdGFydEluZGV4O1xyXG4gIGxldCBqID0gMTtcclxuICBmb3IgKGksIGo7IGkgPiBlbmRJbmRleDsgaS0tLCBqKyspIHtcclxuICAgIC8vIEV2ZXJ5IDMgY2hhcmFjZXJzLCBhZGQgYSBjb21tYVxyXG4gICAgaWYgKGogJSAzID09PSAwKSB7XHJcbiAgICAgIHZhbCA9IHRoaXMuZWRpdFN0cmluZyh2YWwsICcsJywgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogUGFydGlhbGx5IGZvcm1hdCB0aGUgdmFsdWUsIG9ubHkgYWRkaW5nIGNvbW1hcyBhcyBuZWVkZWQgKERvbmUgb24ga2V5cHJlc3Mva2V5dXApXHJcbiAqL1xyXG5leHBvcnRzLnBhcnRpYWxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlbGVhZGluZ1plcm9zKHZhbCwgb3B0aW9ucyk7XHJcbiAgdmFsID0gdGhpcy5yZW1vdmVFeHRyYURlY2ltYWxzKHZhbCwgb3B0aW9ucyk7XHJcbiAgdmFsID0gdGhpcy5mb3JtYXRUaG91c2FuZHModmFsLCBvcHRpb25zKTtcclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bGx5IGZvcm1hdCB0aGUgdmFsdWVcclxuICovXHJcbmV4cG9ydHMuZnVsbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHZhbCA9IHRoaXMucGFydGlhbEZvcm1hdCh2YWwsIG9wdGlvbnMpO1xyXG5cclxuICBpZiAodmFsID09IG51bGwgfHwgdmFsID09ICcnKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICAvLyBGdWxseSBmb3JtYXQgZGVjaW1hbCBwbGFjZXNcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBsZXQgc2lnbiA9IHZhbFswXSA9PT0gJy0nID8gdmFsWzBdIDogJyc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4KTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGlmIChvcHRpb25zLmZpeGVkKSB7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgc2hvdWxkIGJlIHNvbWUgZGVjaW1hbHNcclxuICAgIGlmIChvcHRpb25zLnNjYWxlID4gMCkge1xyXG4gICAgICBkZWNpbWFsUGFydCA9IGRlY2ltYWxQYXJ0Lmxlbmd0aCA+PSBvcHRpb25zLnNjYWxlXHJcbiAgICAgICAgPyBkZWNpbWFsUGFydC5zbGljZSgwLCBvcHRpb25zLnNjYWxlKVxyXG4gICAgICAgIDogZGVjaW1hbFBhcnQgKyBBcnJheShvcHRpb25zLnNjYWxlIC0gZGVjaW1hbFBhcnQubGVuZ3RoICsgMSkuam9pbignMCcpO1xyXG5cclxuICAgICAgaWYgKCFpbnRlZ2VyUGFydC5sZW5ndGgpIHtcclxuICAgICAgICBpbnRlZ2VyUGFydCA9ICcwJztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fWA7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcclxuICogQHBhcmFtIHtzdHJ9IFRoZSBzdHJpbmcgdmFsdWUgKHdpdGggbm8gdGhvdXNhbmQgc2VwYXJhdG9ycylcclxuICovXHJcbmV4cG9ydHMucmVtb3ZlbGVhZGluZ1plcm9zID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgLy8gUmVtb3ZlIHVubmVjZXNzYXJ5IHplcm9zXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZShzaWduID8gMSA6IDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBsZXQgaSA9IDA7XHJcblxyXG4gIHdoaWxlIChcclxuICAgIGludGVnZXJQYXJ0W2ldID09IDBcclxuICAgICAgJiYgaW50ZWdlclBhcnRbaSArIDFdICE9PSBvcHRpb25zLmRlY2ltYWxcclxuICAgICAgJiYgaW50ZWdlclBhcnQubGVuZ3RoID4gMVxyXG4gICkge1xyXG4gICAgaW50ZWdlclBhcnQgPSBpbnRlZ2VyUGFydC5zbGljZSgwLCBpKSArIGludGVnZXJQYXJ0LnNsaWNlKGkgKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG5leHBvcnRzLnJlbW92ZUV4dHJhRGVjaW1hbHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSlcclxuICAgIC5zbGljZSgwLCBvcHRpb25zLnNjYWxlID09IG51bGwgPyBkZWNpbWFsUGFydC5sZW5ndGggOiBvcHRpb25zLnNjYWxlKTtcclxuXHJcbiAgcmV0dXJuIGAke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIG9wdGlvbnMpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIHByZXZTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBjdXJyZW50U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFN5bWJvbHMgLSBwcmV2U3ltYm9scztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcclxuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcclxuICogQHBhcmFtIHt2YWx9IHZhbHVlIHRvIGNoZWNrIGFnYWluc3RcclxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXHJcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XHJcbiAgaWYgKGNoYXIgIT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKChpc05lZ2F0aXZlID8gMSA6IDApLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBzb21lIGludGVnZXIgcGFydCBhbmQgdGhlIGNhcmV0IGlzIHRvIHRoZSBsZWZ0IG9mXHJcbiAgLy8gdGhlIGRlY2ltYWwgcG9pbnRcclxuICBpZiAoKGludGVnZXJQYXJ0Lmxlbmd0aCA+IDApICYmIChjYXJldFBvcyA8IGludGVnZXJQYXJ0Lmxlbmd0aCArIDEpKSB7XHJcbiAgICAvLyBJRiBpbnRlZ2VyIHBhcnQgaXMganVzdCBhIHplcm8gdGhlbiBubyB6ZXJvcyBjYW4gYmUgYWRkZWRcclxuICAgIC8vIEVMU0UgdGhlIHplcm8gY2FuIG5vdCBiZSBhZGRlZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHZhbHVlXHJcbiAgICByZXR1cm4gaW50ZWdlclBhcnQgPT0gMCA/IGZhbHNlIDogY2FyZXRQb3MgPiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHZhbHVlIHRvIGl0cyBudW1iZXIgZXF1aXZhbGVudFxyXG4gKiBAcGFyYW0ge3ZhbH0gc3RyaW5nIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBudW1iZXJcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICByZXR1cm4gdmFsICYmIE51bWJlcih2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpKTtcclxufVxyXG5cclxuZXhwb3J0cy5wYXJzZVN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xyXG4gIGxldCBtdWx0aXBsaWVyID0gMTtcclxuICBsZXQgcGFyc2VkID0gJyc7XHJcblxyXG4gIGZvciAobGV0IGMgb2Ygc3RyKSB7XHJcbiAgICAvLyBJZiBhIG51bWJlclxyXG4gICAgaWYgKCFpc05hTihjKSkge1xyXG4gICAgICBwYXJzZWQgKz0gYztcclxuICAgIH1cclxuICAgIC8vIElmIGEgZGVjaW1hbCAoYW5kIG5vIGRlY2ltYWxzIGV4aXN0IHNvIGZhcilcclxuICAgIGVsc2UgaWYgKGMgPT09IG9wdGlvbnMuZGVjaW1hbCAmJiBwYXJzZWQuaW5kZXhPZihjKSA9PT0gLTEpIHtcclxuICAgICAgcGFyc2VkICs9IG9wdGlvbnMuZGVjaW1hbDtcclxuICAgIH1cclxuICAgIC8vIElmIGEgc2hvcnRjdXRcclxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvcnRjdXRzW2NdKSB7XHJcbiAgICAgIG11bHRpcGxpZXIgKj0gb3B0aW9ucy5zaG9ydGN1dHNbY107XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIG1pbnVzIHNpZ24gKGFuZCBwYXJzZWQgc3RyaW5nIGlzIGN1cnJlbnRseSBlbXB0eSlcclxuICAgIGVsc2UgaWYgKGMgPT09ICctJyAmJiAhcGFyc2VkLmxlbmd0aCkge1xyXG4gICAgICBwYXJzZWQgPSBjO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT3RoZXJ3aXNlIGlnbm9yZSB0aGUgY2hhcmFjdGVyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyc2VkID8gU3RyaW5nKE51bWJlcihwYXJzZWQpICogbXVsdGlwbGllcikgOiAnJztcclxufVxyXG4iLCIvLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyAgICAgS0VZIEhBTkRMRVJTICAgICAvL1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyBBbGwgZnVuY3Rpb25zIGRlYWxpbmcgd2l0aCBrZXlwcmVzc2VzIChsaXN0ZW5lZCB0byBvbiB0aGUga2V5ZG93biBldmVudClcclxuLy8gYXJlIGhlcmUsIHdpdGggc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIGZvciBtb3N0IHR5cGVzIG9mIGtleVxyXG5cclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTlVNQkVSIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk51bWJlcjogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgLy8gUmVtb3ZlIGNoYXJhY3RlcnMgaW4gY3VycmVudCBzZWxlY3Rpb25cclxuICAgIGNvbnN0IHRlbXAgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsICcnLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG5cclxuICAgIGNvbnN0IGFsbG93ZWROdW1iZXIgPVxyXG4gICAgICAhKGtleUluZm8uY3VycmVudFZhbHVlWzBdID09PSAnLSdcclxuICAgICAgJiYga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRFbmQgPT09IDApXHJcbiAgICAgICYmIGhlbHBlcnMuYWxsb3dlZFplcm8odGVtcCwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChhbGxvd2VkTnVtYmVyKSB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTUlOVVMgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTWludXM6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG1pbnVzQWxsb3dlZCA9IGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiAoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gIT09ICctJyB8fCBrZXlJbmZvLmNhcmV0RW5kID4gMClcclxuICAgICAgJiYgb3B0aW9ucy5yYW5nZSAhPT0gUkFOR0UuUE9TSVRJVkU7XHJcblxyXG4gICAgIGlmIChtaW51c0FsbG93ZWQpIHtcclxuICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgICAnLScsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICAgKTtcclxuICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgIH1cclxuICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVDSU1BTCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIG9uRGVjaW1hbDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0ga2V5SW5mby5jdXJyZW50VmFsdWUuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vdCBhbHJlYWR5IGEgZGVjaW1hbCBvciB0aGUgb3JpZ2luYWwgd291bGQgYmUgcmVwbGFjZWRcclxuICAgIC8vIEFkZCB0aGUgZGVjaW1hbFxyXG4gICAgY29uc3QgZGVjaW1hbEFsbG93ZWQgPVxyXG4gICAgICBvcHRpb25zLnNjYWxlID4gMFxyXG4gICAgICAmJiAoZGVjaW1hbEluZGV4ID09PSAtMVxyXG4gICAgICAgICAgfHwgKGRlY2ltYWxJbmRleCA+PSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICAgICAmJiBkZWNpbWFsSW5kZXggPCBrZXlJbmZvLmNhcmV0RW5kKSlcclxuXHJcbiAgICBpZiAoZGVjaW1hbEFsbG93ZWQpXHJcbiAgICB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgb3B0aW9ucy5kZWNpbWFsLFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTSE9SVENVVCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIG9uU2hvcnRjdXQ6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBvcHRpb25zLnNob3J0Y3V0c1trZXlJbmZvLmtleU5hbWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICBjb25zdCBhZGp1c3RlZFZhbCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICBjb25zdCByYXdWYWx1ZSA9IGhlbHBlcnMudG9OdW1iZXIoYWRqdXN0ZWRWYWwsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChtdWx0aXBsaWVyKSB7XHJcbiAgICAgIC8vIElmIHdob2xlIHZhbHVlIGlzIHNlbGVjdGVkXHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBTdHJpbmcoKHJhd1ZhbHVlIHx8IDEpICogbXVsdGlwbGllcik7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IGtleUluZm8ubmV3VmFsdWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJBQ0tTUEFDRSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIG9uQmFja3NwYWNlOiBmdW5jdGlvbihrZXlJbmZvLCB0aG91c2FuZHMpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEJFRk9SRSBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9ICcnO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGJlZm9yZSBpdFxyXG4gICAgICAgIGxldCBjYXJldEp1bXAgPSAxO1xyXG5cclxuICAgICAgICBjYXJldEp1bXAgPSAoKGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCkgPj0gMCkgPyBjYXJldEp1bXAgOiAwO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IC1jYXJldEp1bXA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkRlbGV0ZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFTEVURSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIG9uRGVsZXRlOiBmdW5jdGlvbihrZXlJbmZvLCB0aG91c2FuZHMpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgY29uc3QgbmV4dENoYXIgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZVtrZXlJbmZvLmNhcmV0U3RhcnRdO1xyXG5cclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9ICcnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBhZnRlciBpdFxyXG4gICAgICAgIGNvbnN0IHRob3VzYW5kc05leHQgPSBuZXh0Q2hhciA9PT0gdGhvdXNhbmRzO1xyXG5cclxuICAgICAgICAvLyBJZiBjaGFyIHRvIGRlbGV0ZSBpcyB0aG91c2FuZHMgYW5kIG51bWJlciBpcyBub3QgdG8gYmUgZGVsZXRlZCAtIHNraXAgb3ZlciBpdFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSB0aG91c2FuZHNOZXh0ID8gMSA6IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RIYWxmU3RhcnQgPSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICsgKHRob3VzYW5kc05leHQgPyAwIDogMSk7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGxhc3RIYWxmU3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkJhY2tzcGFjZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVORE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xyXG4gICAqL1xyXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuX2hpc3RvcnkudW5kbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFJFRE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgcmVkb1xyXG4gICAqL1xyXG4gIG9uUmVkbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuX2hpc3RvcnkucmVkbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbn1cclxuIiwiXHJcbmNvbnN0IE1BWF9CVUZGRVJfU0laRSA9IDUwO1xyXG5cclxuLyoqXHJcbiAqIFZhbHVlIEhpc3RvcnkgLSBNYW5hZ2VzIGFuIGFycmF5IG9mIHZhbHVlcyB0aGF0IGNhbiBiZSB0cmFja2VkLCBzdXBwb3J0aW5nXHJcbiAqIHRoZSB1bmRvIGFuZCByZWRvIG9wZXJhdGlvbnMgaW4gdGhlIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWx1ZUhpc3Rvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBbbnVsbF07XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBoaXN0b3J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50SW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xyXG4gIH1cclxuICBnZXQgY3VycmVudFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgfVxyXG5cclxuICBzZXQgY3VycmVudEluZGV4KGkpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGk7XHJcbiAgfVxyXG4gIHNldCBoaXN0b3J5KGhpc3RvcnkpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBoaXN0b3J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5kbyBjaGFuZ2UsIHNvIHJldHVybiB0byBwcmV2aW91cyB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogUmVkbyBjaGFuZ2UsIHNvIHJldHVybiB0byBuZXh0IHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQWRkIG5ldyB2YWx1ZSB0byBoaXN0b3J5IGFycmF5LiBBbnkgcG9zc2libGUgJ3JlZG8ncycgYXJlIHJlbW92ZWQgZnJvbSBhcnJheVxyXG4gICAqIGFzIGEgbmV3ICdicmFuY2gnIG9mIGhpc3RvcnkgaXMgY3JlYXRlZCB3aGVuIGEgbmV3IHZhbHVlIGlzIGFkZGVkXHJcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGFkZCB0byBoaXN0b3J5XHJcbiAgICovXHJcbiAgYWRkVmFsdWUodmFsKSB7XHJcbiAgICAvLyBEZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjdXJyZW50IHZhbHVlXHJcbiAgICBpZiAodmFsICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmhpc3Rvcnkuc3BsaWNlKHRoaXMuY3VycmVudEluZGV4ICsgMSwgbnVsbCwgdmFsKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gTUFYX0JVRkZFUl9TSVpFKSB7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5LnNoaWZ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbn1cclxuIl19
