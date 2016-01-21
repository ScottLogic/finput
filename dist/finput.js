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
  },
  currency: null,
  valueStep: 1
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
   * @param {Options.currency} Optional currency to prepend to value
   * @param {Options.valueStep OR false} Change how much the value changes when pressing up/down arrow keys
   */

  function Finput(element, options) {
    var _this = this;

    _classCallCheck(this, Finput);

    this._element = element;
    this._options = Object.assign(DEFAULTS, options);
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

  var integerPart = val.slice(0, decimalIndex);
  var decimalPart = val.slice(decimalIndex + 1);

  if (options.fixed) {

    // If there should be some decimals
    if (options.scale > 0) {
      decimalPart = decimalPart.length >= options.scale ? decimalPart.slice(0, options.scale) : decimalPart + Array(options.scale - decimalPart.length + 1).join('0');

      if (!integerPart.length) {
        integerPart = '0';
      }

      return '' + integerPart + options.decimal + decimalPart;
    } else {
      return integerPart;
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

  var integerPart = val.slice(0, decimalIndex + 1);
  var decimalPart = val.slice(decimalIndex + 1);

  var i = integerPart[0] === '-' ? 1 : 0;

  while (integerPart[i] == 0 && integerPart[i + 1] !== options.decimal && integerPart.length > 1) {
    integerPart = integerPart.slice(0, i) + integerPart.slice(i + 1);
  }

  return '' + integerPart + decimalPart;
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
  if (integerPart && caretPos < integerPart.length + 1) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QjtzQkFLZ0IsQ0FBQyxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCOzs7d0JBTmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDeEM7OztTQWhCa0IsWUFBWTs7O2tCQUFaLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcclxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcclxuICBCQUNLU1BBQ0U6ICdCQUNLU1BBQ0UnLFxyXG4gIERFTEVURTogJ0RFTEVURScsXHJcbiAgVU5ETzogJ1VORE8nLFxyXG4gIFJFRE86ICdSRURPJyxcclxuICBIT01FOiAnSE9NRScsXHJcbiAgRU5EOiAnRU5EJ1xyXG59XHJcblxyXG5leHBvcnRzLkRSQUdfU1RBVEVTID0ge1xyXG4gIE5PTkU6ICdOT05FJyxcclxuICBJTlRFUk5BTDogJ0lOVEVSTkFMJyxcclxuICBFWFRFUk5BTDogJ0VYVEVSTkFMJ1xyXG59XHJcblxyXG5leHBvcnRzLlJBTkdFID0ge1xyXG4gIEFMTDogJ0FMTCcsXHJcbiAgUE9TSVRJVkU6ICdQT1NJVElWRSdcclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgQWxpIFNoZWVoYW4tRGFyZSwgYWxsIHJpZ2h0cyBhbmQgcHJvZml0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xyXG5pbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENPTlNUQU5UU1xyXG4gKi9cclxuY29uc3QgREVGQVVMVFMgPSB7XHJcbiAgc2NhbGU6IDIsXHJcbiAgcmFuZ2U6IFJBTkdFLkFMTCxcclxuICBmaXhlZDogdHJ1ZSxcclxuICB0aG91c2FuZHM6ICcsJyxcclxuICBkZWNpbWFsOiAnLicsXHJcbiAgc2hvcnRjdXRzOiB7XHJcbiAgICAnayc6IDEwMDAsXHJcbiAgICAnbSc6IDEwMDAwMDAsXHJcbiAgICAnYic6IDEwMDAwMDAwMDBcclxuICB9LFxyXG4gIGN1cnJlbmN5OiBudWxsLFxyXG4gIHZhbHVlU3RlcDogMVxyXG59XHJcblxyXG4vKipcclxuICogRklOUFVUIENPTVBPTkVOVCBDTEFTU1xyXG4gKiBAY2xhc3NcclxuICovXHJcbmNsYXNzIEZpbnB1dCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtET00gRWxlbWVudH0gVGhlIG51bWJlciBpbnB1dFxyXG4gICAqIEBwYXJhbSB7T3B0aW9uc30gT3B0aW9ucyBmb3IgdGhlIG51bWJlciBpbnB1dCdzIGJlaGF2aW91clxyXG4gICAqXHJcbiAgICogRGV0YWlsZWQgbGlzdCBvZiBwb3NzaWJsZSBvcHRpb25zOlxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zY2FsZX0gbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBkaWdpdHNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMucmFuZ2V9IFdoZXRoZXIgbnVtYmVyIGNhbiB0YWtlIGFueSB2YWx1ZSBvciBtdXN0IGJlIHBvc2l0aXZlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmZpeGVkfSBBZnRlciBmb2N1cyBpcyBsb3N0IC0gdmFsdWUgaXMgZm9ybWF0dGVkIHRvICpzY2FsZSogbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnRob3VzYW5kc30gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZGVjaW1hbH0gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIGRlY2ltYWwgcG9pbnRcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2hvcnRjdXRzfSBPYmplY3QgbWFwIG9mIHNob3J0Y3V0IGNoYXJhY3RlcnMgdG8gbXVsdGlwbGllciAoZS5nLiB7IGs6IDEwMDAgfSlcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuY3VycmVuY3l9IE9wdGlvbmFsIGN1cnJlbmN5IHRvIHByZXBlbmQgdG8gdmFsdWVcclxuICAgKiBAcGFyYW0ge09wdGlvbnMudmFsdWVTdGVwIE9SIGZhbHNlfSBDaGFuZ2UgaG93IG11Y2ggdGhlIHZhbHVlIGNoYW5nZXMgd2hlbiBwcmVzc2luZyB1cC9kb3duIGFycm93IGtleXNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKERFRkFVTFRTLCBvcHRpb25zKTtcclxuICAgIHRoaXMuX2FjdGlvblR5cGVzID0gdGhpcy5jcmVhdGVBY3Rpb25UeXBlcygpO1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IG5ldyBWYWx1ZUhpc3RvcnkoKTtcclxuXHJcbiAgICAvLyBTZXR1cCBsaXN0ZW5lcnNcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGUpID0+IHRoaXMub25Gb2N1c291dChlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4gdGhpcy5vbkZvY3VzaW4oZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4gdGhpcy5vbkRyb3AoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgKGUpID0+IHRoaXMub25QYXN0ZShlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB0aGlzLm9uS2V5ZG93bihlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gdGhpcy5vbklucHV0KGUpKTtcclxuXHJcbiAgICAvLyBEcmFnZ2luZyBsaXN0ZW5lcnNcclxuICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hldGhlciBhIGRyYWcgc3RhcnRlZCBpbnRlcm5hbGx5IG9yIGV4dGVybmFsbHlcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB0aGlzLm9uRHJhZ3N0YXJ0KGUpKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4gdGhpcy5vbkRyYWdlbmQoZSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBlbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG4gIGdldCBvcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGZvcm1hdHRlZFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZFZhbHVlO1xyXG4gIH1cclxuICBnZXQgYWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uVHlwZXM7XHJcbiAgfVxyXG4gIGdldCBkcmFnU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZHJhZ1N0YXRlO1xyXG4gIH1cclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFNFVFRFUlNcclxuICBzZXQgZHJhZ1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSBzdGF0ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHZhbCkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7XHJcbiAgfVxyXG4gIHNldCBmb3JtYXR0ZWRWYWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX2Zvcm1hdHRlZFZhbHVlID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZSB0byBjaGFyL2tleSBjb2RlcyBhcnJheSB3aXRoIHRoZVxyXG4gICAqIGNvcnJlY3QgZGVjaW1hbCBhbmQgdGhvdXNhbmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgKGRlcGVuZGluZyBvbiBsYW5ndWFnZSlcclxuICAgKi9cclxuICBjcmVhdGVBY3Rpb25UeXBlcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTlVNQkVSLFxyXG4gICAgICAgIG5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk1JTlVTLFxyXG4gICAgICAgIG5hbWVzOiBbJy0nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPTUUsXHJcbiAgICAgICAgbmFtZXM6IFsnaG9tZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuRU5ELFxyXG4gICAgICAgIG5hbWVzOiBbJ2VuZCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVDSU1BTCxcclxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy5kZWNpbWFsXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTElNSVRFUixcclxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy50aG91c2FuZHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuU0hPUlRDVVQsXHJcbiAgICAgICAgbmFtZXM6IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5zaG9ydGN1dHMpXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuQkFDS1NQQUNFLFxyXG4gICAgICAgIG5hbWVzOiBbJ2JhY2tzcGFjZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMRVRFLFxyXG4gICAgICAgIG5hbWVzOiBbJ2RlbGV0ZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVyxcclxuICAgICAgICBuYW1lczogWydsZWZ0JywgJ3JpZ2h0J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVyxcclxuICAgICAgICBuYW1lczogWyd1cCcsICdkb3duJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5VTkRPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3onXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuUkVETyxcclxuICAgICAgICBuYW1lczogWyd5J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgd2hhdCB0eXBlIG9mIGFjdGlvbiBuZWVkcyB0byBiZSBkZWFsdCB3aXRoIGZyb20gdGhlIGN1cnJlbnRcclxuICAgKiBrZXlkb3duIGV2ZW50LiBFLmcuIHZlcnRpY2FsIGFycm93IHByZXNzZWQsIG51bWJlciBwcmVzc2VkIGV0Yy4uLlxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBnZXRBY3Rpb25UeXBlKG5hbWUsIGUpIHtcclxuICAgIGZvciAobGV0IGFjdGlvblR5cGUgb2YgdGhpcy5hY3Rpb25UeXBlcykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGFjdGlvblR5cGUubmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgY29uc3QgdHlwZU1hdGNoID0gaW5kZXggPiAtMTtcclxuXHJcbiAgICAgIGlmICh0eXBlTWF0Y2ggJiYgKGFjdGlvblR5cGUuY3RybCA/IGUuY3RybEtleSA6IHRydWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvblR5cGUudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFDVElPTl9UWVBFUy5VTktOT1dOO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB0aGlzLmhpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vXHJcbiAgLy8gRVZFTlQgSEFORExFUlNcclxuICAvL1xyXG5cclxuICAvKipcclxuICAgKiBPbiBmb2N1c2luZyBPVVQgb2YgdGhlIGlucHV0IC0gZm9ybWF0IGZ1bGx5XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNvdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3VzaW4oZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgSU4gZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcclxuICAgKiB3aXRoIHRoaXMgbmV3IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZHJhZ1N0YXRlKSB7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuSU5URVJOQUw6XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLkVYVEVSTkFMOlxyXG4gICAgICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKGZvcm1hdHRlZCkge1xyXG4gICAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gZm9ybWF0dGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG8gbm90aGluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHN0YXJ0IG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdzdGFydChlKSB7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxyXG4gICAgICA/IERSQUdfU1RBVEVTLklOVEVSTkFMXHJcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHBhc3Rpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBDbGlwYm9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvblBhc3RlKGUpIHtcclxuICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcclxuICAgIGNvbnN0IGZvcm1hdHRlZCA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBpZiAoZm9ybWF0dGVkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IGZvcm1hdHRlZDtcclxuICAgIH1cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcHJlc3NpbmcgYW55IGtleSBpbnNpZGUgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uS2V5ZG93bihlKSB7XHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkgPyBrZXljb2RlKGUpLnJlcGxhY2UoJ251bXBhZCAnLCAnJykgOiBudWxsLFxyXG4gICAgICBjYXJldFN0YXJ0OiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgbmV3VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSB0aGlzLmdldEFjdGlvblR5cGUoa2V5SW5mby5rZXlOYW1lLCBlKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25OdW1iZXIoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25NaW51cyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1c6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPTUU6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkVORDpcclxuICAgICAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG4gICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3VyXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblZlcnRpY2FsQXJyb3coa2V5SW5mbywgdGhpcy5vcHRpb25zLnZhbHVlU3RlcCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkJhY2tzcGFjZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVsZXRlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVW5kbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25SZWRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBJZiBjdHJsIGtleSBtb2RpZmllciBpcyBwcmVzc2VkIHRoZW4gYWxsb3cgc3BlY2lmaWMgZXZlbnQgaGFuZGxlclxyXG4gICAgICAgIC8vIHRvIGhhbmRsZSB0aGlzXHJcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gaGVscGVycy5wYXJ0aWFsRm9ybWF0KGtleUluZm8ubmV3VmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBrZXlJbmZvLm5ld1ZhbHVlO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgIGNvbnN0IG9mZnNldCA9IGhlbHBlcnMuY2FsY3VsYXRlT2Zmc2V0KFxyXG4gICAgICBjdXJyZW50VmFsdWUsXHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICB0aGlzLm9wdGlvbnNcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXdDYXJldFBvcyA9IGtleUluZm8uY2FyZXRTdGFydCArIG9mZnNldDtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShuZXdDYXJldFBvcywgbmV3Q2FyZXRQb3MpO1xyXG4gICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQmFja3VwIGV2ZW50IGlmIGlucHV0IGNoYW5nZXMgZm9yIGFueSBvdGhlciByZWFzb24sIGp1c3QgZm9ybWF0IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBFdmVudFxyXG4gICAqL1xyXG4gIG9uSW5wdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1Zygnb24gSU5QVVQnLCBlKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaW5wdXQ7XHJcbiIsIlxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cclxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XHJcbiAqIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgJ3RvQWRkJyBzdHJpbmdcclxuICovXHJcbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xyXG4gIGNvbnN0IGZpcnN0SGFsZiA9IHN0ci5zbGljZSgwLCBjYXJldFN0YXJ0KTtcclxuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcclxuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XHJcbn1cclxuXHJcbmV4cG9ydHMuZm9ybWF0VGhvdXNhbmRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3Qgc3RhcnRJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxyXG4gICAgOiB2YWwubGVuZ3RoIC0gMTtcclxuICBjb25zdCBlbmRJbmRleCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDA7XHJcblxyXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxyXG4gIGxldCBpID0gc3RhcnRJbmRleDtcclxuICBsZXQgaiA9IDE7XHJcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XHJcbiAgICAvLyBFdmVyeSAzIGNoYXJhY2VycywgYWRkIGEgY29tbWFcclxuICAgIGlmIChqICUgMyA9PT0gMCkge1xyXG4gICAgICB2YWwgPSB0aGlzLmVkaXRTdHJpbmcodmFsLCAnLCcsIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnRpYWxseSBmb3JtYXQgdGhlIHZhbHVlLCBvbmx5IGFkZGluZyBjb21tYXMgYXMgbmVlZGVkIChEb25lIG9uIGtleXByZXNzL2tleXVwKVxyXG4gKi9cclxuZXhwb3J0cy5wYXJ0aWFsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgdmFsID0gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKTtcclxuICB2YWwgPSB0aGlzLnJlbW92ZWxlYWRpbmdaZXJvcyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlRXh0cmFEZWNpbWFscyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMuZm9ybWF0VGhvdXNhbmRzKHZhbCwgb3B0aW9ucyk7XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdWxseSBmb3JtYXQgdGhlIHZhbHVlXHJcbiAqL1xyXG5leHBvcnRzLmZ1bGxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB0aGlzLnBhcnRpYWxGb3JtYXQodmFsLCBvcHRpb25zKTtcclxuXHJcbiAgaWYgKHZhbCA9PSBudWxsIHx8IHZhbCA9PSAnJykge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgLy8gRnVsbHkgZm9ybWF0IGRlY2ltYWwgcGxhY2VzXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCk7XHJcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBpZiAob3B0aW9ucy5maXhlZCkge1xyXG5cclxuICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBzb21lIGRlY2ltYWxzXHJcbiAgICBpZiAob3B0aW9ucy5zY2FsZSA+IDApIHtcclxuICAgICAgZGVjaW1hbFBhcnQgPSBkZWNpbWFsUGFydC5sZW5ndGggPj0gb3B0aW9ucy5zY2FsZVxyXG4gICAgICAgID8gZGVjaW1hbFBhcnQuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSlcclxuICAgICAgICA6IGRlY2ltYWxQYXJ0ICsgQXJyYXkob3B0aW9ucy5zY2FsZSAtIGRlY2ltYWxQYXJ0Lmxlbmd0aCArIDEpLmpvaW4oJzAnKTtcclxuXHJcbiAgICAgIGlmICghaW50ZWdlclBhcnQubGVuZ3RoKSB7XHJcbiAgICAgICAgaW50ZWdlclBhcnQgPSAnMCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgJHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gaW50ZWdlclBhcnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcclxuICogQHBhcmFtIHtzdHJ9IFRoZSBzdHJpbmcgdmFsdWUgKHdpdGggbm8gdGhvdXNhbmQgc2VwYXJhdG9ycylcclxuICovXHJcbmV4cG9ydHMucmVtb3ZlbGVhZGluZ1plcm9zID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgLy8gUmVtb3ZlIHVubmVjZXNzYXJ5IHplcm9zXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBsZXQgaSA9IChpbnRlZ2VyUGFydFswXSA9PT0gJy0nKSA/IDEgOiAwO1xyXG5cclxuICB3aGlsZSAoXHJcbiAgICBpbnRlZ2VyUGFydFtpXSA9PSAwXHJcbiAgICAgICYmIGludGVnZXJQYXJ0W2kgKyAxXSAhPT0gb3B0aW9ucy5kZWNpbWFsXHJcbiAgICAgICYmIGludGVnZXJQYXJ0Lmxlbmd0aCA+IDFcclxuICApIHtcclxuICAgIGludGVnZXJQYXJ0ID0gaW50ZWdlclBhcnQuc2xpY2UoMCwgaSkgKyBpbnRlZ2VyUGFydC5zbGljZShpICsgMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG5leHBvcnRzLnJlbW92ZUV4dHJhRGVjaW1hbHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSlcclxuICAgIC5zbGljZSgwLCBvcHRpb25zLnNjYWxlID09IG51bGwgPyBkZWNpbWFsUGFydC5sZW5ndGggOiBvcHRpb25zLnNjYWxlKTtcclxuXHJcbiAgcmV0dXJuIGAke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIG9wdGlvbnMpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIHByZXZTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBjdXJyZW50U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFN5bWJvbHMgLSBwcmV2U3ltYm9scztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcclxuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcclxuICogQHBhcmFtIHt2YWx9IHZhbHVlIHRvIGNoZWNrIGFnYWluc3RcclxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXHJcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XHJcbiAgaWYgKGNoYXIgIT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKChpc05lZ2F0aXZlID8gMSA6IDApLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBzb21lIGludGVnZXIgcGFydCBhbmQgdGhlIGNhcmV0IGlzIHRvIHRoZSBsZWZ0IG9mXHJcbiAgLy8gdGhlIGRlY2ltYWwgcG9pbnRcclxuICBpZiAoaW50ZWdlclBhcnQgJiYgY2FyZXRQb3MgPCBpbnRlZ2VyUGFydC5sZW5ndGggKyAxKSB7XHJcbiAgICAvLyBJRiBpbnRlZ2VyIHBhcnQgaXMganVzdCBhIHplcm8gdGhlbiBubyB6ZXJvcyBjYW4gYmUgYWRkZWRcclxuICAgIC8vIEVMU0UgdGhlIHplcm8gY2FuIG5vdCBiZSBhZGRlZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHZhbHVlXHJcbiAgICByZXR1cm4gaW50ZWdlclBhcnQgPT0gMCA/IGZhbHNlIDogY2FyZXRQb3MgPiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHZhbHVlIHRvIGl0cyBudW1iZXIgZXF1aXZhbGVudFxyXG4gKiBAcGFyYW0ge3ZhbH0gc3RyaW5nIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBudW1iZXJcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICByZXR1cm4gdmFsICYmIE51bWJlcih2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpKTtcclxufVxyXG5cclxuZXhwb3J0cy5wYXJzZVN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xyXG4gIGxldCBtdWx0aXBsaWVyID0gMTtcclxuICBsZXQgcGFyc2VkID0gJyc7XHJcblxyXG4gIGZvciAobGV0IGMgb2Ygc3RyKSB7XHJcbiAgICAvLyBJZiBhIG51bWJlclxyXG4gICAgaWYgKCFpc05hTihjKSkge1xyXG4gICAgICBwYXJzZWQgKz0gYztcclxuICAgIH1cclxuICAgIC8vIElmIGEgZGVjaW1hbCAoYW5kIG5vIGRlY2ltYWxzIGV4aXN0IHNvIGZhcilcclxuICAgIGVsc2UgaWYgKGMgPT09IG9wdGlvbnMuZGVjaW1hbCAmJiBwYXJzZWQuaW5kZXhPZihjKSA9PT0gLTEpIHtcclxuICAgICAgcGFyc2VkICs9IG9wdGlvbnMuZGVjaW1hbDtcclxuICAgIH1cclxuICAgIC8vIElmIGEgc2hvcnRjdXRcclxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvcnRjdXRzW2NdKSB7XHJcbiAgICAgIG11bHRpcGxpZXIgKj0gb3B0aW9ucy5zaG9ydGN1dHNbY107XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIG1pbnVzIHNpZ24gKGFuZCBwYXJzZWQgc3RyaW5nIGlzIGN1cnJlbnRseSBlbXB0eSlcclxuICAgIGVsc2UgaWYgKGMgPT09ICctJyAmJiAhcGFyc2VkLmxlbmd0aCkge1xyXG4gICAgICBwYXJzZWQgPSBjO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT3RoZXJ3aXNlIGlnbm9yZSB0aGUgY2hhcmFjdGVyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyc2VkID8gU3RyaW5nKE51bWJlcihwYXJzZWQpICogbXVsdGlwbGllcikgOiAnJztcclxufVxyXG4iLCIvLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyAgICAgS0VZIEhBTkRMRVJTICAgICAvL1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyBBbGwgZnVuY3Rpb25zIGRlYWxpbmcgd2l0aCBrZXlwcmVzc2VzIChsaXN0ZW5lZCB0byBvbiB0aGUga2V5ZG93biBldmVudClcclxuLy8gYXJlIGhlcmUsIHdpdGggc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIGZvciBtb3N0IHR5cGVzIG9mIGtleVxyXG5cclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTlVNQkVSIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk51bWJlcjogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgLy8gUmVtb3ZlIGNoYXJhY3RlcnMgaW4gY3VycmVudCBzZWxlY3Rpb25cclxuICAgIGNvbnN0IHRlbXAgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsICcnLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG5cclxuICAgIGNvbnN0IGFsbG93ZWROdW1iZXIgPVxyXG4gICAgICAhKGtleUluZm8uY3VycmVudFZhbHVlWzBdID09PSAnLSdcclxuICAgICAgJiYga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRFbmQgPT09IDApXHJcbiAgICAgICYmIGhlbHBlcnMuYWxsb3dlZFplcm8odGVtcCwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChhbGxvd2VkTnVtYmVyKSB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTUlOVVMgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTWludXM6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG1pbnVzQWxsb3dlZCA9IGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiAoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gIT09ICctJyB8fCBrZXlJbmZvLmNhcmV0RW5kID4gMClcclxuICAgICAgJiYgb3B0aW9ucy5yYW5nZSAhPT0gUkFOR0UuUE9TSVRJVkU7XHJcblxyXG4gICAgIGlmIChtaW51c0FsbG93ZWQpIHtcclxuICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgICAnLScsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICAgKTtcclxuICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgIH1cclxuICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVDSU1BTCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIG9uRGVjaW1hbDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0ga2V5SW5mby5jdXJyZW50VmFsdWUuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vdCBhbHJlYWR5IGEgZGVjaW1hbCBvciB0aGUgb3JpZ2luYWwgd291bGQgYmUgcmVwbGFjZWRcclxuICAgIC8vIEFkZCB0aGUgZGVjaW1hbFxyXG4gICAgY29uc3QgZGVjaW1hbEFsbG93ZWQgPVxyXG4gICAgICBvcHRpb25zLnNjYWxlID4gMFxyXG4gICAgICAmJiAoZGVjaW1hbEluZGV4ID09PSAtMVxyXG4gICAgICAgICAgfHwgKGRlY2ltYWxJbmRleCA+PSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICAgICAmJiBkZWNpbWFsSW5kZXggPCBrZXlJbmZvLmNhcmV0RW5kKSlcclxuXHJcbiAgICBpZiAoZGVjaW1hbEFsbG93ZWQpXHJcbiAgICB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgb3B0aW9ucy5kZWNpbWFsLFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTSE9SVENVVCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtvcHRpb25zfSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIG9uU2hvcnRjdXQ6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBvcHRpb25zLnNob3J0Y3V0c1trZXlJbmZvLmtleU5hbWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICBjb25zdCBhZGp1c3RlZFZhbCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICBjb25zdCByYXdWYWx1ZSA9IGhlbHBlcnMudG9OdW1iZXIoYWRqdXN0ZWRWYWwsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChtdWx0aXBsaWVyKSB7XHJcbiAgICAgIC8vIElmIHdob2xlIHZhbHVlIGlzIHNlbGVjdGVkXHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBTdHJpbmcoKHJhd1ZhbHVlIHx8IDEpICogbXVsdGlwbGllcik7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IGtleUluZm8ubmV3VmFsdWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJBQ0tTUEFDRSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIG9uQmFja3NwYWNlOiBmdW5jdGlvbihrZXlJbmZvLCB0aG91c2FuZHMpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEJFRk9SRSBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9ICcnO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGJlZm9yZSBpdFxyXG4gICAgICAgIGxldCBjYXJldEp1bXAgPSAxO1xyXG5cclxuICAgICAgICBjYXJldEp1bXAgPSAoKGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCkgPj0gMCkgPyBjYXJldEp1bXAgOiAwO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IC1jYXJldEp1bXA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkRlbGV0ZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFTEVURSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHt0aG91c2FuZHN9IENoYXJhY3RlciB1c2VkIGZvciB0aGUgdGhvdXNhbmRzIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIG9uRGVsZXRlOiBmdW5jdGlvbihrZXlJbmZvLCB0aG91c2FuZHMpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgY29uc3QgbmV4dENoYXIgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZVtrZXlJbmZvLmNhcmV0U3RhcnRdO1xyXG5cclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9ICcnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBhZnRlciBpdFxyXG4gICAgICAgIGNvbnN0IHRob3VzYW5kc05leHQgPSBuZXh0Q2hhciA9PT0gdGhvdXNhbmRzO1xyXG5cclxuICAgICAgICAvLyBJZiBjaGFyIHRvIGRlbGV0ZSBpcyB0aG91c2FuZHMgYW5kIG51bWJlciBpcyBub3QgdG8gYmUgZGVsZXRlZCAtIHNraXAgb3ZlciBpdFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSB0aG91c2FuZHNOZXh0ID8gMSA6IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RIYWxmU3RhcnQgPSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICsgKHRob3VzYW5kc05leHQgPyAwIDogMSk7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGxhc3RIYWxmU3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkJhY2tzcGFjZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFZFUlRJQ0FMIEFSUk9XIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3N0ZXB9IEhvdyBtdWNoIHRvIGluY3JlYXNlL2RlY3JlYXNlIHZhbHVlIGJ5XHJcbiAgICovXHJcbiAgb25WZXJ0aWNhbEFycm93OiBmdW5jdGlvbihrZXlJbmZvLCBzdGVwKSB7XHJcbiAgICAvLyBJZiBzdGVwIGlzIDAgKG9yIGZhbHNleSkgdGhlbiBhc3N1bWUgYXJyb3cga2V5IHZhbHVlIGNoYW5naW5nIGlzIGRpc2FibGVkXHJcbiAgICBpZiAoc3RlcCAmJiAhaXNOYU4oc3RlcCkpIHtcclxuICAgICAgc3dpdGNoIChrZXlJbmZvLmtleU5hbWUpIHtcclxuICAgICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgICAvLyBUT0RPIC0gVXAgYXJyb3cgc3RlcFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICAvLyBUT0RPIC0gRG93biBhcnJvdyBzdGVwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICB9XHJcbiAgICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBVTkRPIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHVuZG9cclxuICAgKi9cclxuICBvblVuZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcclxuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Lmhpc3RvcnkudW5kbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFJFRE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgcmVkb1xyXG4gICAqL1xyXG4gIG9uUmVkbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuaGlzdG9yeS5yZWRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxufVxyXG4iLCJcclxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gNTA7XHJcblxyXG4vKipcclxuICogVmFsdWUgSGlzdG9yeSAtIE1hbmFnZXMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHRyYWNrZWQsIHN1cHBvcnRpbmdcclxuICogdGhlIHVuZG8gYW5kIHJlZG8gb3BlcmF0aW9ucyBpbiB0aGUgaW5wdXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlSGlzdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IFtudWxsXTtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRJbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEluZGV4XTtcclxuICB9XHJcblxyXG4gIHNldCBjdXJyZW50SW5kZXgoaSkge1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaTtcclxuICB9XHJcbiAgc2V0IGhpc3RvcnkoaGlzdG9yeSkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIHByZXZpb3VzIHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZWRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIG5leHQgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgbmV3IHZhbHVlIHRvIGhpc3RvcnkgYXJyYXkuIEFueSBwb3NzaWJsZSAncmVkbydzJyBhcmUgcmVtb3ZlZCBmcm9tIGFycmF5XHJcbiAgICogYXMgYSBuZXcgJ2JyYW5jaCcgb2YgaGlzdG9yeSBpcyBjcmVhdGVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYWRkZWRcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gYWRkIHRvIGhpc3RvcnlcclxuICAgKi9cclxuICBhZGRWYWx1ZSh2YWwpIHtcclxuICAgIC8vIERlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGN1cnJlbnQgdmFsdWVcclxuICAgIGlmICh2YWwgIT09IHRoaXMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaGlzdG9yeS5zcGxpY2UodGhpcy5jdXJyZW50SW5kZXggKyAxLCBudWxsLCB2YWwpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiBNQVhfQlVGRkVSX1NJWkUpIHtcclxuICAgICAgICB0aGlzLmhpc3Rvcnkuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=
