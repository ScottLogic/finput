(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Finput = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright Ali Sheehan-Dare, all rights and profits reserved.

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    var _this = this;

    _classCallCheck(this, Finput);

    this._element = element;
    this._options = _extends({}, DEFAULTS, options);
    this._actionTypes = this.createActionTypes();
    this._history = new _valueHistory2.default();

    // Setup listeners
    this.element.addEventListener('blur', function (e) {
      return _this.onFocusout(e);
    });
    this.element.addEventListener('focus', function (e) {
      return _this.onFocusin(e);
    });
    this.element.addEventListener('drop', function (e) {
      return _this.onDrop(e);
    });
    this.element.addEventListener('paste', function (e) {
      return _this.onPaste(e);
    });
    this.element.addEventListener('keydown', function (e) {
      return _this.onKeydown(e);
    });
    this.element.addEventListener('input', function (e) {
      return _this.onInput(e);
    });

    // Dragging listeners
    // Keep track of whether a drag started internally or externally
    document.addEventListener('dragstart', function (e) {
      return _this.onDragstart(e);
    });
    document.addEventListener('dragend', function (e) {
      return _this.onDragend(e);
    });
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
        for (var _iterator = this.actionTypes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
     * Sets the value, fully formatted, for the input
     * @param {val} New value to set
     */

  }, {
    key: 'setValue',
    value: function setValue(val) {
      var newValue = _helpers2.default.fullFormat(val, this.options);

      this.element.value = newValue;
      this.history.addValue(newValue);
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
      console.debug('Focus OUT event', e);
      this.setValue(this.element.value);
    }
    /**
     * On focus of the input - Select all text
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusin',
    value: function onFocusin(e) {
      console.debug('Focus IN event', e);
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
      console.debug('Drop event', e);

      switch (this.dragState) {
        case _constants.DRAG_STATES.INTERNAL:
          // This case is handled by the 'onInput' function
          break;
        case _constants.DRAG_STATES.EXTERNAL:
          var val = _helpers2.default.parseString(e.dataTransfer.getData('text'), this.options);
          var formatted = _helpers2.default.fullFormat(val, this.options);
          if (formatted) {
            this.element.value = formatted;
          }
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
      this.dragState = e.target === this.element ? _constants.DRAG_STATES.INTERNAL : _constants.DRAG_STATES.EXTERNAL;
      console.debug('Drag STARTED', this.dragState, e);
    }
    /**
     * On end of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragend',
    value: function onDragend(e) {
      console.debug('Drag ENDED', this.dragState, e);
      this.dragState = _constants.DRAG_STATES.NONE;
    }
    /**
     * On pasting something into the input
     * @param {e} Clipboard event
     */

  }, {
    key: 'onPaste',
    value: function onPaste(e) {
      var val = _helpers2.default.parseString(e.clipboardData.getData('text'), this.options);
      var formatted = _helpers2.default.fullFormat(val, this.options);
      if (formatted) {
        this.element.value = formatted;
      }
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

      console.debug(actionType);

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
        case _constants.ACTION_TYPES.HOME:
        case _constants.ACTION_TYPES.END:
          console.debug(actionType);
          // Default behaviour
          return;
        case _constants.ACTION_TYPES.VERTICAL_ARROW:
          _keyHandlers2.default.onVerticalArrow(keyInfo, this.options.valueStep);
          break;
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

      var offset = _helpers2.default.calculateOffset(currentValue, this.element.value, keyInfo.caretStart, this.options);
      var newCaretPos = keyInfo.caretStart + offset;
      this.element.setSelectionRange(newCaretPos, newCaretPos);
      this.history.addValue(newValue);
    }
    /**
     * Backup event if input changes for any other reason, just format value
     * @param {e} Event
     */

  }, {
    key: 'onInput',
    value: function onInput(e) {
      console.debug('on INPUT', e);
      this.setValue(this.element.value);
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
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(val) {
      this._value = val;
    }
  }, {
    key: 'formattedValue',
    get: function get() {
      return this._formattedValue;
    },
    set: function set(val) {
      this._formattedValue = val;
    }
  }, {
    key: 'actionTypes',
    get: function get() {
      return this._actionTypes;
    }
  }, {
    key: 'dragState',
    get: function get() {
      return this._dragState;
    },

    // SETTERS
    set: function set(state) {
      this._dragState = state;
    }
  }, {
    key: 'history',
    get: function get() {
      return this._history;
    }
  }]);

  return Finput;
}();

exports.default = Finput;
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
   * VERTICAL ARROW HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {step} How much to increase/decrease value by
   */
  onVerticalArrow: function onVerticalArrow(keyInfo, step) {
    // If step is 0 (or falsey) then assume arrow key value changing is disabled
    if (step && !isNaN(step)) {
      switch (keyInfo.keyName) {
        case 'up':
          // TODO - Up arrow step
          break;
        case 'down':
          // TODO - Down arrow step
          break;
        default:
        // Do nothing
      }
      keyInfo.event.preventDefault();
    }
  },

  /**
   * UNDO HANDLER
   * @param {finput} the Finput object
   * @param {event} The keydown event which triggered the undo
   */
  onUndo: function onUndo(finput, event) {
    finput.element.value = finput.history.undo();
    finput.element.setSelectionRange(finput.element.value.length, finput.element.value.length);
    event.preventDefault();
  },
  /**
   * REDO HANDLER
   * @param {finput} the Finput object
   * @param {event} The keydown event which triggered the redo
   */
  onRedo: function onRedo(finput, event) {
    finput.element.value = finput.history.redo();
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0FBQyxZQUFZLENBQUM7S0FDMUI7Ozt3QkFyRGE7QUFDWixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7c0JBV1csT0FBTyxFQUFFO0FBQ25CLFVBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0tBQ3pCOzs7d0JBWmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjtzQkFLZ0IsQ0FBQyxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCOzs7d0JBTmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDeEM7OztTQWhCa0IsWUFBWTs7O2tCQUFaLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcclxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcclxuICBCQUNLU1BBQ0U6ICdCQUNLU1BBQ0UnLFxyXG4gIERFTEVURTogJ0RFTEVURScsXHJcbiAgVU5ETzogJ1VORE8nLFxyXG4gIFJFRE86ICdSRURPJyxcclxuICBIT01FOiAnSE9NRScsXHJcbiAgRU5EOiAnRU5EJ1xyXG59XHJcblxyXG5leHBvcnRzLkRSQUdfU1RBVEVTID0ge1xyXG4gIE5PTkU6ICdOT05FJyxcclxuICBJTlRFUk5BTDogJ0lOVEVSTkFMJyxcclxuICBFWFRFUk5BTDogJ0VYVEVSTkFMJ1xyXG59XHJcblxyXG5leHBvcnRzLlJBTkdFID0ge1xyXG4gIEFMTDogJ0FMTCcsXHJcbiAgUE9TSVRJVkU6ICdQT1NJVElWRSdcclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgQWxpIFNoZWVoYW4tRGFyZSwgYWxsIHJpZ2h0cyBhbmQgcHJvZml0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xyXG5pbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENPTlNUQU5UU1xyXG4gKi9cclxuY29uc3QgREVGQVVMVFMgPSB7XHJcbiAgc2NhbGU6IDIsXHJcbiAgcmFuZ2U6IFJBTkdFLkFMTCxcclxuICBmaXhlZDogdHJ1ZSxcclxuICB0aG91c2FuZHM6ICcsJyxcclxuICBkZWNpbWFsOiAnLicsXHJcbiAgc2hvcnRjdXRzOiB7XHJcbiAgICAnayc6IDEwMDAsXHJcbiAgICAnbSc6IDEwMDAwMDAsXHJcbiAgICAnYic6IDEwMDAwMDAwMDBcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSU5QVVQgQ09NUE9ORU5UIENMQVNTXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuY2xhc3MgRmlucHV0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RPTSBFbGVtZW50fSBUaGUgbnVtYmVyIGlucHV0XHJcbiAgICogQHBhcmFtIHtPcHRpb25zfSBPcHRpb25zIGZvciB0aGUgbnVtYmVyIGlucHV0J3MgYmVoYXZpb3VyXHJcbiAgICpcclxuICAgKiBEZXRhaWxlZCBsaXN0IG9mIHBvc3NpYmxlIG9wdGlvbnM6XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNjYWxlfSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0c1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5yYW5nZX0gV2hldGhlciBudW1iZXIgY2FuIHRha2UgYW55IHZhbHVlIG9yIG11c3QgYmUgcG9zaXRpdmVcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZml4ZWR9IEFmdGVyIGZvY3VzIGlzIGxvc3QgLSB2YWx1ZSBpcyBmb3JtYXR0ZWQgdG8gKnNjYWxlKiBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMudGhvdXNhbmRzfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgdGhvdXNhbmRzIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5kZWNpbWFsfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgZGVjaW1hbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zaG9ydGN1dHN9IE9iamVjdCBtYXAgb2Ygc2hvcnRjdXQgY2hhcmFjdGVycyB0byBtdWx0aXBsaWVyIChlLmcuIHsgazogMTAwMCB9KVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgLi4uREVGQVVMVFMsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgICB0aGlzLl9hY3Rpb25UeXBlcyA9IHRoaXMuY3JlYXRlQWN0aW9uVHlwZXMoKTtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XHJcblxyXG4gICAgLy8gU2V0dXAgbGlzdGVuZXJzXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB0aGlzLm9uRm9jdXNvdXQoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHRoaXMub25Gb2N1c2luKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHRoaXMub25Ecm9wKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIChlKSA9PiB0aGlzLm9uUGFzdGUoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gdGhpcy5vbktleWRvd24oZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHRoaXMub25JbnB1dChlKSk7XHJcblxyXG4gICAgLy8gRHJhZ2dpbmcgbGlzdGVuZXJzXHJcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgYSBkcmFnIHN0YXJ0ZWQgaW50ZXJuYWxseSBvciBleHRlcm5hbGx5XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4gdGhpcy5vbkRyYWdzdGFydChlKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHRoaXMub25EcmFnZW5kKGUpKTtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgZWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gIH1cclxuICBnZXQgb3B0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBmb3JtYXR0ZWRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9mb3JtYXR0ZWRWYWx1ZTtcclxuICB9XHJcbiAgZ2V0IGFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGlvblR5cGVzO1xyXG4gIH1cclxuICBnZXQgZHJhZ1N0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdTdGF0ZTtcclxuICB9XHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTRVRURVJTXHJcbiAgc2V0IGRyYWdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gc3RhdGU7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xyXG4gIH1cclxuICBzZXQgZm9ybWF0dGVkVmFsdWUodmFsKSB7XHJcbiAgICB0aGlzLl9mb3JtYXR0ZWRWYWx1ZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcclxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXHJcbiAgICovXHJcbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcclxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcclxuICAgICAgICBuYW1lczogWyctJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT01FLFxyXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcclxuICAgICAgICBuYW1lczogWydlbmQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuYWN0aW9uVHlwZXMpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBhY3Rpb25UeXBlLm5hbWVzLmluZGV4T2YobmFtZSk7XHJcbiAgICAgIGNvbnN0IHR5cGVNYXRjaCA9IGluZGV4ID4gLTE7XHJcblxyXG4gICAgICBpZiAodHlwZU1hdGNoICYmIChhY3Rpb25UeXBlLmN0cmwgPyBlLmN0cmxLZXkgOiB0cnVlKSkge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25UeXBlLnR5cGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBBQ1RJT05fVFlQRVMuVU5LTk9XTjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHZhbHVlLCBmdWxseSBmb3JtYXR0ZWQsIGZvciB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldFZhbHVlKHZhbCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEVWRU5UIEhBTkRMRVJTXHJcbiAgLy9cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXNpbmcgT1VUIG9mIHRoZSBpbnB1dCAtIGZvcm1hdCBmdWxseVxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3Vzb3V0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIE9VVCBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBmb2N1cyBvZiB0aGUgaW5wdXQgLSBTZWxlY3QgYWxsIHRleHRcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c2luKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIElOIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGRyb3BwaW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dCAtIHJlcGxhY2UgdGhlIFdIT0xFIHZhbHVlXHJcbiAgICogd2l0aCB0aGlzIG5ldyB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJvcChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcm9wIGV2ZW50JywgZSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmRyYWdTdGF0ZSkge1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLklOVEVSTkFMOlxyXG4gICAgICAgIC8vIFRoaXMgY2FzZSBpcyBoYW5kbGVkIGJ5IHRoZSAnb25JbnB1dCcgZnVuY3Rpb25cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5FWFRFUk5BTDpcclxuICAgICAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWQgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChmb3JtYXR0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IGZvcm1hdHRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIERvIG5vdGhpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBzdGFydCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnc3RhcnQoZSkge1xyXG4gICAgdGhpcy5kcmFnU3RhdGUgPSAoZS50YXJnZXQgPT09IHRoaXMuZWxlbWVudClcclxuICAgICAgPyBEUkFHX1NUQVRFUy5JTlRFUk5BTFxyXG4gICAgICA6IERSQUdfU1RBVEVTLkVYVEVSTkFMO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBTVEFSVEVEJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBlbmQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ2VuZChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIEVOREVEJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG4gICAgdGhpcy5kcmFnU3RhdGUgPSBEUkFHX1NUQVRFUy5OT05FO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwYXN0aW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gQ2xpcGJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25QYXN0ZShlKSB7XHJcbiAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWQgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgaWYgKGZvcm1hdHRlZCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBmb3JtYXR0ZWQ7XHJcbiAgICB9XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHByZXNzaW5nIGFueSBrZXkgaW5zaWRlIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvbktleWRvd24oZSkge1xyXG4gICAgY29uc3Qga2V5SW5mbyA9IHtcclxuICAgICAgZXZlbnQ6IGUsXHJcbiAgICAgIGNvZGU6IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxyXG4gICAgICBrZXlOYW1lOiBrZXljb2RlKGUpID8ga2V5Y29kZShlKS5yZXBsYWNlKCdudW1wYWQgJywgJycpIDogbnVsbCxcclxuICAgICAgY2FyZXRTdGFydDogdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBjYXJldEVuZDogdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgY3VycmVudFZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIG5ld1ZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3Rpb25UeXBlID0gdGhpcy5nZXRBY3Rpb25UeXBlKGtleUluZm8ua2V5TmFtZSwgZSk7XHJcblxyXG4gICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTlVNQkVSOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTnVtYmVyKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFQ0lNQUw6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWNpbWFsKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk1JTlVTOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTWludXMoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuU0hPUlRDVVQ6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25TaG9ydGN1dChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT01FOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5FTkQ6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW91clxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25WZXJ0aWNhbEFycm93KGtleUluZm8sIHRoaXMub3B0aW9ucy52YWx1ZVN0ZXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFTEVURTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlbGV0ZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgY29uc3QgY3VycmVudFZhbHVlID0ga2V5SW5mby5uZXdWYWx1ZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcbiAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcclxuICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcclxuICAgIHRoaXMuaGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEJhY2t1cCBldmVudCBpZiBpbnB1dCBjaGFuZ2VzIGZvciBhbnkgb3RoZXIgcmVhc29uLCBqdXN0IGZvcm1hdCB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRXZlbnRcclxuICAgKi9cclxuICBvbklucHV0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ29uIElOUFVUJywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlucHV0O1xyXG4iLCJcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogRWRpdCBhIHN0cmluZyB3aXRoIGEgbmV3IHN0cmluZyB0byBhZGQuXHJcbiAqIEhhbmRsZXMgdGhlIGNhc2UgaWYgdGV4dCBpcyBoaWdobGlnaHRlZCBhbHNvLCBpbiB3aGljaCBjYXNlIHRoYXQgdGV4dFxyXG4gKiB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlICd0b0FkZCcgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnRzLmVkaXRTdHJpbmcgPSBmdW5jdGlvbihzdHIsIHRvQWRkLCBjYXJldFN0YXJ0LCBjYXJldEVuZCA9IGNhcmV0U3RhcnQpIHtcclxuICBjb25zdCBmaXJzdEhhbGYgPSBzdHIuc2xpY2UoMCwgY2FyZXRTdGFydCk7XHJcbiAgY29uc3Qgc2Vjb25kSGFsZiA9IHN0ci5zbGljZShjYXJldEVuZCwgc3RyLmxlbmd0aCk7XHJcbiAgcmV0dXJuIGAke2ZpcnN0SGFsZn0ke3RvQWRkfSR7c2Vjb25kSGFsZn1gO1xyXG59XHJcblxyXG5leHBvcnRzLmZvcm1hdFRob3VzYW5kcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGNvbnN0IHN0YXJ0SW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSAtIDFcclxuICAgIDogdmFsLmxlbmd0aCAtIDE7XHJcbiAgY29uc3QgZW5kSW5kZXggPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwO1xyXG5cclxuICAvLyBpIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8gYmVjYXVzZSBudW1iZXIgY2Fubm90IHN0YXJ0IHdpdGggY29tbWFcclxuICBsZXQgaSA9IHN0YXJ0SW5kZXg7XHJcbiAgbGV0IGogPSAxO1xyXG4gIGZvciAoaSwgajsgaSA+IGVuZEluZGV4OyBpLS0sIGorKykge1xyXG4gICAgLy8gRXZlcnkgMyBjaGFyYWNlcnMsIGFkZCBhIGNvbW1hXHJcbiAgICBpZiAoaiAlIDMgPT09IDApIHtcclxuICAgICAgdmFsID0gdGhpcy5lZGl0U3RyaW5nKHZhbCwgJywnLCBpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcclxuICovXHJcbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHZhbCA9IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJyk7XHJcbiAgdmFsID0gdGhpcy5yZW1vdmVsZWFkaW5nWmVyb3ModmFsLCBvcHRpb25zKTtcclxuICB2YWwgPSB0aGlzLnJlbW92ZUV4dHJhRGVjaW1hbHModmFsLCBvcHRpb25zKTtcclxuICB2YWwgPSB0aGlzLmZvcm1hdFRob3VzYW5kcyh2YWwsIG9wdGlvbnMpO1xyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogRnVsbHkgZm9ybWF0IHRoZSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgdmFsID0gdGhpcy5wYXJ0aWFsRm9ybWF0KHZhbCwgb3B0aW9ucyk7XHJcblxyXG4gIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwgPT0gJycpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIC8vIEZ1bGx5IGZvcm1hdCBkZWNpbWFsIHBsYWNlc1xyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGxldCBzaWduID0gdmFsWzBdID09PSAnLScgPyB2YWxbMF0gOiAnJztcclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2Uoc2lnbiA/IDEgOiAwLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGxldCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKTtcclxuXHJcbiAgaWYgKG9wdGlvbnMuZml4ZWQpIHtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBzaG91bGQgYmUgc29tZSBkZWNpbWFsc1xyXG4gICAgaWYgKG9wdGlvbnMuc2NhbGUgPiAwKSB7XHJcbiAgICAgIGRlY2ltYWxQYXJ0ID0gZGVjaW1hbFBhcnQubGVuZ3RoID49IG9wdGlvbnMuc2NhbGVcclxuICAgICAgICA/IGRlY2ltYWxQYXJ0LnNsaWNlKDAsIG9wdGlvbnMuc2NhbGUpXHJcbiAgICAgICAgOiBkZWNpbWFsUGFydCArIEFycmF5KG9wdGlvbnMuc2NhbGUgLSBkZWNpbWFsUGFydC5sZW5ndGggKyAxKS5qb2luKCcwJyk7XHJcblxyXG4gICAgICBpZiAoIWludGVnZXJQYXJ0Lmxlbmd0aCkge1xyXG4gICAgICAgIGludGVnZXJQYXJ0ID0gJzAnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fSR7b3B0aW9ucy5kZWNpbWFsfSR7ZGVjaW1hbFBhcnR9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9YDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbDtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYW55IHN1cnBsdXMgemVyb3MgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBpbnRlZ2VyIHBhcnQgb2YgdGhlIG51bWJlclxyXG4gKiBAcGFyYW0ge3N0cn0gVGhlIHN0cmluZyB2YWx1ZSAod2l0aCBubyB0aG91c2FuZCBzZXBhcmF0b3JzKVxyXG4gKi9cclxuZXhwb3J0cy5yZW1vdmVsZWFkaW5nWmVyb3MgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICAvLyBSZW1vdmUgdW5uZWNlc3NhcnkgemVyb3NcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBsZXQgc2lnbiA9IHZhbFswXSA9PT0gJy0nID8gdmFsWzBdIDogJyc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4ICsgMSk7XHJcbiAgY29uc3QgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGxldCBpID0gMDtcclxuXHJcbiAgd2hpbGUgKFxyXG4gICAgaW50ZWdlclBhcnRbaV0gPT0gMFxyXG4gICAgICAmJiBpbnRlZ2VyUGFydFtpICsgMV0gIT09IG9wdGlvbnMuZGVjaW1hbFxyXG4gICAgICAmJiBpbnRlZ2VyUGFydC5sZW5ndGggPiAxXHJcbiAgKSB7XHJcbiAgICBpbnRlZ2VyUGFydCA9IGludGVnZXJQYXJ0LnNsaWNlKDAsIGkpICsgaW50ZWdlclBhcnQuc2xpY2UoaSArIDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke2RlY2ltYWxQYXJ0fWA7XHJcbn1cclxuXHJcbmV4cG9ydHMucmVtb3ZlRXh0cmFEZWNpbWFscyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGxldCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKVxyXG4gICAgLnNsaWNlKDAsIG9wdGlvbnMuc2NhbGUgPT0gbnVsbCA/IGRlY2ltYWxQYXJ0Lmxlbmd0aCA6IG9wdGlvbnMuc2NhbGUpO1xyXG5cclxuICByZXR1cm4gYCR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIGhvdyBtYW55IGNoYXJhY3RlcnMgaGF2ZSBiZWVuIGFkZGVkIChvciByZW1vdmVkKSBiZWZvcmUgdGhlIGdpdmVuXHJcbiAqIGNhcmV0IHBvc2l0aW9uIGFmdGVyIGZvcm1hdHRpbmcuIENhcmV0IGlzIHRoZW4gYWRqdXN0ZWQgYnkgdGhlIHJldHVybmVkIG9mZnNldFxyXG4gKiBDdXJyZW5jeSBzeW1ib2wgb3IgdGhvdXNhbmQgc2VwYXJhdG9ycyBtYXkgaGF2ZSBiZWVuIGFkZGVkXHJcbiAqL1xyXG5leHBvcnRzLmNhbGN1bGF0ZU9mZnNldCA9IGZ1bmN0aW9uKHByZXYsIGN1cnIsIHBvcywgb3B0aW9ucykge1xyXG4gIGxldCBpLCBwcmV2U3ltYm9scyA9IDAsIGN1cnJlbnRTeW1ib2xzID0gMDtcclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAocHJldltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMpIHtcclxuICAgICAgcHJldlN5bWJvbHMrKztcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKGN1cnJbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIGN1cnJlbnRTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50U3ltYm9scyAtIHByZXZTeW1ib2xzO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2sgKGlmIHRoZSBjaGFyIGlzIGEgemVybykgd2hldGhlciBvciBub3QgYSB6ZXJvIGNhbiBiZSBwbGFjZWQgYXQgdGhpc1xyXG4gKiBwb3NpdGlvbiBpbiB0aGUgdmFsdWUuIElmIGl0IGlzIGFuIHVubmNlc3NhcnkgemVybyAtIGRvIG5vdCBhbGxvdyBpdFxyXG4gKiBAcGFyYW0ge3ZhbH0gdmFsdWUgdG8gY2hlY2sgYWdhaW5zdFxyXG4gKiBAcGFyYW0ge2NoYXJ9IHRoZSBjaGFyYWN0ZXIgYmVpbmcgYWRkZWRcclxuICogQHBhcmFtIHtjYXJldFBvc30gQ3VycmVudCBjYXJldCBwb3NpdGlvbiBpbiBpbnB1dFxyXG4gKiBAcGFyYW0ge29wdGlvbnN9IEZpbnB1dCBvcHRpb25zIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0cy5hbGxvd2VkWmVybyA9IGZ1bmN0aW9uKHZhbCwgY2hhciwgY2FyZXRQb3MsIG9wdGlvbnMpIHtcclxuICBpZiAoY2hhciAhPSAwKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGNvbnN0IGlzTmVnYXRpdmUgPSB2YWxbMF0gPT09ICctJztcclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoKGlzTmVnYXRpdmUgPyAxIDogMCksIGRlY2ltYWxJbmRleCk7XHJcbiAgY2FyZXRQb3MgPSBpc05lZ2F0aXZlID8gY2FyZXRQb3MgLSAxIDogY2FyZXRQb3M7XHJcblxyXG4gIC8vIElmIHRoZXJlIGlzIHNvbWUgaW50ZWdlciBwYXJ0IGFuZCB0aGUgY2FyZXQgaXMgdG8gdGhlIGxlZnQgb2ZcclxuICAvLyB0aGUgZGVjaW1hbCBwb2ludFxyXG4gIGlmICgoaW50ZWdlclBhcnQubGVuZ3RoID4gMCkgJiYgKGNhcmV0UG9zIDwgaW50ZWdlclBhcnQubGVuZ3RoICsgMSkpIHtcclxuICAgIC8vIElGIGludGVnZXIgcGFydCBpcyBqdXN0IGEgemVybyB0aGVuIG5vIHplcm9zIGNhbiBiZSBhZGRlZFxyXG4gICAgLy8gRUxTRSB0aGUgemVybyBjYW4gbm90IGJlIGFkZGVkIGF0IHRoZSBmcm9udCBvZiB0aGUgdmFsdWVcclxuICAgIHJldHVybiBpbnRlZ2VyUGFydCA9PSAwID8gZmFsc2UgOiBjYXJldFBvcyA+IDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgdG8gaXRzIG51bWJlciBlcXVpdmFsZW50XHJcbiAqIEBwYXJhbSB7dmFsfSBzdHJpbmcgdmFsdWUgdG8gY29udmVydCB0byBhIG51bWJlclxyXG4gKiBAcGFyYW0ge29wdGlvbnN9IEZpbnB1dCBvcHRpb25zIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0cy50b051bWJlciA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHJldHVybiB2YWwgJiYgTnVtYmVyKHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJykpO1xyXG59XHJcblxyXG5leHBvcnRzLnBhcnNlU3RyaW5nID0gZnVuY3Rpb24oc3RyLCBvcHRpb25zKSB7XHJcbiAgbGV0IG11bHRpcGxpZXIgPSAxO1xyXG4gIGxldCBwYXJzZWQgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgYyBvZiBzdHIpIHtcclxuICAgIC8vIElmIGEgbnVtYmVyXHJcbiAgICBpZiAoIWlzTmFOKGMpKSB7XHJcbiAgICAgIHBhcnNlZCArPSBjO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYSBkZWNpbWFsIChhbmQgbm8gZGVjaW1hbHMgZXhpc3Qgc28gZmFyKVxyXG4gICAgZWxzZSBpZiAoYyA9PT0gb3B0aW9ucy5kZWNpbWFsICYmIHBhcnNlZC5pbmRleE9mKGMpID09PSAtMSkge1xyXG4gICAgICBwYXJzZWQgKz0gb3B0aW9ucy5kZWNpbWFsO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYSBzaG9ydGN1dFxyXG4gICAgZWxzZSBpZiAob3B0aW9ucy5zaG9ydGN1dHNbY10pIHtcclxuICAgICAgbXVsdGlwbGllciAqPSBvcHRpb25zLnNob3J0Y3V0c1tjXTtcclxuICAgIH1cclxuICAgIC8vIElmIGEgbWludXMgc2lnbiAoYW5kIHBhcnNlZCBzdHJpbmcgaXMgY3VycmVudGx5IGVtcHR5KVxyXG4gICAgZWxzZSBpZiAoYyA9PT0gJy0nICYmICFwYXJzZWQubGVuZ3RoKSB7XHJcbiAgICAgIHBhcnNlZCA9IGM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBPdGhlcndpc2UgaWdub3JlIHRoZSBjaGFyYWN0ZXJcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWQgPyBTdHJpbmcoTnVtYmVyKHBhcnNlZCkgKiBtdWx0aXBsaWVyKSA6ICcnO1xyXG59XHJcbiIsIi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vICAgICBLRVkgSEFORExFUlMgICAgIC8vXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vIEFsbCBmdW5jdGlvbnMgZGVhbGluZyB3aXRoIGtleXByZXNzZXMgKGxpc3RlbmVkIHRvIG9uIHRoZSBrZXlkb3duIGV2ZW50KVxyXG4vLyBhcmUgaGVyZSwgd2l0aCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgZm9yIG1vc3QgdHlwZXMgb2Yga2V5XHJcblxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgUkFOR0V9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAvKipcclxuICAgKiBOVU1CRVIgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTnVtYmVyOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICAvLyBSZW1vdmUgY2hhcmFjdGVycyBpbiBjdXJyZW50IHNlbGVjdGlvblxyXG4gICAgY29uc3QgdGVtcCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcblxyXG4gICAgY29uc3QgYWxsb3dlZE51bWJlciA9XHJcbiAgICAgICEoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gPT09ICctJ1xyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYga2V5SW5mby5jYXJldEVuZCA9PT0gMClcclxuICAgICAgJiYgaGVscGVycy5hbGxvd2VkWmVybyh0ZW1wLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKGFsbG93ZWROdW1iZXIpIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBNSU5VUyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25NaW51czogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgbWludXNBbGxvd2VkID0ga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIChrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSAhPT0gJy0nIHx8IGtleUluZm8uY2FyZXRFbmQgPiAwKVxyXG4gICAgICAmJiBvcHRpb25zLnJhbmdlICE9PSBSQU5HRS5QT1NJVElWRTtcclxuXHJcbiAgICAgaWYgKG1pbnVzQWxsb3dlZCkge1xyXG4gICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICctJyxcclxuICAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICApO1xyXG4gICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICAgfVxyXG4gICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUNJTUFMIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgb25EZWNpbWFsOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm90IGFscmVhZHkgYSBkZWNpbWFsIG9yIHRoZSBvcmlnaW5hbCB3b3VsZCBiZSByZXBsYWNlZFxyXG4gICAgLy8gQWRkIHRoZSBkZWNpbWFsXHJcbiAgICBjb25zdCBkZWNpbWFsQWxsb3dlZCA9XHJcbiAgICAgIG9wdGlvbnMuc2NhbGUgPiAwXHJcbiAgICAgICYmIChkZWNpbWFsSW5kZXggPT09IC0xXHJcbiAgICAgICAgICB8fCAoZGVjaW1hbEluZGV4ID49IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgICAgICYmIGRlY2ltYWxJbmRleCA8IGtleUluZm8uY2FyZXRFbmQpKVxyXG5cclxuICAgIGlmIChkZWNpbWFsQWxsb3dlZClcclxuICAgIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBvcHRpb25zLmRlY2ltYWwsXHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNIT1JUQ1VUIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgb25TaG9ydGN1dDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IG9wdGlvbnMuc2hvcnRjdXRzW2tleUluZm8ua2V5TmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIGNvbnN0IGFkanVzdGVkVmFsID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgIGNvbnN0IHJhd1ZhbHVlID0gaGVscGVycy50b051bWJlcihhZGp1c3RlZFZhbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIpIHtcclxuICAgICAgLy8gSWYgd2hvbGUgdmFsdWUgaXMgc2VsZWN0ZWRcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IFN0cmluZygocmF3VmFsdWUgfHwgMSkgKiBtdWx0aXBsaWVyKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0ga2V5SW5mby5uZXdWYWx1ZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQkFDS1NQQUNFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQkVGT1JFIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XHJcbiAgICAgICAgbGV0IGNhcmV0SnVtcCA9IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XHJcblxyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0gJyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGFmdGVyIGl0XHJcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIHRob3VzYW5kcyBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZTdGFydCA9IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVkVSVElDQUwgQVJST1cgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7c3RlcH0gSG93IG11Y2ggdG8gaW5jcmVhc2UvZGVjcmVhc2UgdmFsdWUgYnlcclxuICAgKi9cclxuICBvblZlcnRpY2FsQXJyb3c6IGZ1bmN0aW9uKGtleUluZm8sIHN0ZXApIHtcclxuICAgIC8vIElmIHN0ZXAgaXMgMCAob3IgZmFsc2V5KSB0aGVuIGFzc3VtZSBhcnJvdyBrZXkgdmFsdWUgY2hhbmdpbmcgaXMgZGlzYWJsZWRcclxuICAgIGlmIChzdGVwICYmICFpc05hTihzdGVwKSkge1xyXG4gICAgICBzd2l0Y2ggKGtleUluZm8ua2V5TmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgIC8vIFRPRE8gLSBVcCBhcnJvdyBzdGVwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkb3duJzpcclxuICAgICAgICAgIC8vIFRPRE8gLSBEb3duIGFycm93IHN0ZXBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH1cclxuICAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVORE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xyXG4gICAqL1xyXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuaGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5oaXN0b3J5LnJlZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5jb25zdCBNQVhfQlVGRkVSX1NJWkUgPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBIaXN0b3J5IC0gTWFuYWdlcyBhbiBhcnJheSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgdHJhY2tlZCwgc3VwcG9ydGluZ1xyXG4gKiB0aGUgdW5kbyBhbmQgcmVkbyBvcGVyYXRpb25zIGluIHRoZSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVIaXN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gW251bGxdO1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuICBnZXQgY3VycmVudEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgc2V0IGN1cnJlbnRJbmRleChpKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpO1xyXG4gIH1cclxuICBzZXQgaGlzdG9yeShoaXN0b3J5KSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gaGlzdG9yeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gcHJldmlvdXMgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHVuZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gbmV4dCB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBuZXcgdmFsdWUgdG8gaGlzdG9yeSBhcnJheS4gQW55IHBvc3NpYmxlICdyZWRvJ3MnIGFyZSByZW1vdmVkIGZyb20gYXJyYXlcclxuICAgKiBhcyBhIG5ldyAnYnJhbmNoJyBvZiBoaXN0b3J5IGlzIGNyZWF0ZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhZGRlZFxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBhZGQgdG8gaGlzdG9yeVxyXG4gICAqL1xyXG4gIGFkZFZhbHVlKHZhbCkge1xyXG4gICAgLy8gRGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY3VycmVudCB2YWx1ZVxyXG4gICAgaWYgKHZhbCAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5oaXN0b3J5LnNwbGljZSh0aGlzLmN1cnJlbnRJbmRleCArIDEsIG51bGwsIHZhbCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IE1BWF9CVUZGRVJfU0laRSkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeS5zaGlmdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==
