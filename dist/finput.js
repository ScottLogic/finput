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
    this.element.addEventListener('keypress', function (e) {
      return _this.onKeypress(e);
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
          this.setValue(e.dataTransfer.getData('text'));
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
      console.debug('Paste event', e);
      var chars = e.clipboardData.getData('text');
      var potentialValue = _helpers2.default.editString(this.element.value, chars, this.element.selectionStart, this.element.selectionEnd);

      this.setValue(potentialValue);
      e.preventDefault();
    }
  }, {
    key: 'onKeypress',
    value: function onKeypress(e) {
      console.debug('keypress', e);
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

/**
 * Fully format the value
 */
exports.fullFormat = function (val, options) {
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var integerPart = val.slice(0, decimalIndex);
  var decimalPart = val.slice(decimalIndex + 1);

  if (options.fixed) {
    // If there should be some decimals
    if (options.scale > 0) {
      decimalPart = decimalPart.length >= options.scale ? decimalPart.slice(0, options.scale) : decimalPart + Array(options.scale - decimalPart.length + 1).join('0');
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
function removeleadingZeros(val, options) {
  // Remove unnecessary zeros
  var decimalIndex = val.indexOf(options.decimal) > -1 ? val.indexOf(options.decimal) : val.length;

  var integerPart = val.slice(0, decimalIndex + 1);
  var decimalPart = val.slice(decimalIndex + 1);

  var i = integerPart[0] === '-' ? 1 : 0;

  while (integerPart[i] == 0 && integerPart[i + 1] !== options.decimal && integerPart.length > 1) {
    integerPart = integerPart.slice(0, i) + integerPart.slice(i + 1);
  }

  return '' + integerPart + decimalPart;
}

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function (val, options) {
  var str = val.replace(new RegExp('[' + options.thousands + ']', 'g'), '');

  str = removeleadingZeros(str, options);

  var startIndex = str.indexOf(options.decimal) > -1 ? str.indexOf(options.decimal) - 1 : str.length - 1;
  var endIndex = str[0] === '-' ? 1 : 0;

  // i must be greater than zero because number cannot start with comma
  var i = startIndex;
  var j = 1;
  for (i, j; i > endIndex; i--, j++) {
    // Every 3 characers, add a comma
    if (j % 3 === 0) {
      str = this.editString(str, ',', i);
    }
  }

  return str;
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

  if (integerPart) {
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
    var allowedNumber = !(keyInfo.currentValue[0] === '-' && keyInfo.caretStart === 0 && keyInfo.caretEnd === 0) && _helpers2.default.allowedZero(keyInfo.currentValue, keyInfo.keyName, keyInfo.caretStart, options);

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QVEsQ0FBQztLQUN0QjtzQkFXVyxPQUFPLEVBQUU7QUFDbkIsVUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7S0FDekI7Ozt3QkFaa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQzNCO3NCQUtnQixDQUFDLEVBQUU7QUFDbEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7S0FDeEI7Ozt3QkFOa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4Qzs7O1NBaEJrQixZQUFZOzs7a0JBQVosWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iLCJcclxuZXhwb3J0cy5BQ1RJT05fVFlQRVMgPSB7XHJcbiAgTlVNQkVSOiAnTlVNQkVSJyxcclxuICBTSE9SVENVVDogJ1NIT1JUQ1VUJyxcclxuICBERUNJTUFMOiAnREVDSU1BTCcsXHJcbiAgREVMSU1JVEVSOiAnREVMSU1JVEVSJyxcclxuICBNSU5VUzogJ01JTlVTJyxcclxuICBVTktOT1dOOiAnVU5LTk9XTicsXHJcbiAgSE9SSVpPTlRBTF9BUlJPVzogJ0hPUklaT05UQUxfQVJST1cnLFxyXG4gIFZFUlRJQ0FMX0FSUk9XOiAnVkVSVElDQUxfQVJST1cnLFxyXG4gIEJBQ0tTUEFDRTogJ0JBQ0tTUEFDRScsXHJcbiAgREVMRVRFOiAnREVMRVRFJyxcclxuICBVTkRPOiAnVU5ETycsXHJcbiAgUkVETzogJ1JFRE8nLFxyXG4gIEhPTUU6ICdIT01FJyxcclxuICBFTkQ6ICdFTkQnXHJcbn1cclxuXHJcbmV4cG9ydHMuRFJBR19TVEFURVMgPSB7XHJcbiAgTk9ORTogJ05PTkUnLFxyXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxyXG4gIEVYVEVSTkFMOiAnRVhURVJOQUwnXHJcbn1cclxuXHJcbmV4cG9ydHMuUkFOR0UgPSB7XHJcbiAgQUxMOiAnQUxMJyxcclxuICBQT1NJVElWRTogJ1BPU0lUSVZFJ1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCBBbGkgU2hlZWhhbi1EYXJlLCBhbGwgcmlnaHRzIGFuZCBwcm9maXRzIHJlc2VydmVkLlxyXG5cclxuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XHJcbmltcG9ydCBrZXlIYW5kbGVycyBmcm9tICcuL2tleUhhbmRsZXJzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IFZhbHVlSGlzdG9yeSBmcm9tICcuL3ZhbHVlSGlzdG9yeSc7XHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFUywgUkFOR0V9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcblxyXG4vKipcclxuICogQ09OU1RBTlRTXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUUyA9IHtcclxuICBzY2FsZTogMixcclxuICByYW5nZTogUkFOR0UuQUxMLFxyXG4gIGZpeGVkOiB0cnVlLFxyXG4gIHRob3VzYW5kczogJywnLFxyXG4gIGRlY2ltYWw6ICcuJyxcclxuICBzaG9ydGN1dHM6IHtcclxuICAgICdrJzogMTAwMCxcclxuICAgICdtJzogMTAwMDAwMCxcclxuICAgICdiJzogMTAwMDAwMDAwMFxyXG4gIH0sXHJcbiAgY3VycmVuY3k6IG51bGwsXHJcbiAgdmFsdWVTdGVwOiAxXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSU5QVVQgQ09NUE9ORU5UIENMQVNTXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuY2xhc3MgRmlucHV0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RPTSBFbGVtZW50fSBUaGUgbnVtYmVyIGlucHV0XHJcbiAgICogQHBhcmFtIHtPcHRpb25zfSBPcHRpb25zIGZvciB0aGUgbnVtYmVyIGlucHV0J3MgYmVoYXZpb3VyXHJcbiAgICpcclxuICAgKiBEZXRhaWxlZCBsaXN0IG9mIHBvc3NpYmxlIG9wdGlvbnM6XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNjYWxlfSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0c1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5yYW5nZX0gV2hldGhlciBudW1iZXIgY2FuIHRha2UgYW55IHZhbHVlIG9yIG11c3QgYmUgcG9zaXRpdmVcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZml4ZWR9IEFmdGVyIGZvY3VzIGlzIGxvc3QgLSB2YWx1ZSBpcyBmb3JtYXR0ZWQgdG8gKnNjYWxlKiBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMudGhvdXNhbmRzfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgdGhvdXNhbmRzIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5kZWNpbWFsfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgZGVjaW1hbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zaG9ydGN1dHN9IE9iamVjdCBtYXAgb2Ygc2hvcnRjdXQgY2hhcmFjdGVycyB0byBtdWx0aXBsaWVyIChlLmcuIHsgazogMTAwMCB9KVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5jdXJyZW5jeX0gT3B0aW9uYWwgY3VycmVuY3kgdG8gcHJlcGVuZCB0byB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy52YWx1ZVN0ZXAgT1IgZmFsc2V9IENoYW5nZSBob3cgbXVjaCB0aGUgdmFsdWUgY2hhbmdlcyB3aGVuIHByZXNzaW5nIHVwL2Rvd24gYXJyb3cga2V5c1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVFMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fYWN0aW9uVHlwZXMgPSB0aGlzLmNyZWF0ZUFjdGlvblR5cGVzKCk7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gbmV3IFZhbHVlSGlzdG9yeSgpO1xyXG5cclxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4gdGhpcy5vbkZvY3Vzb3V0KGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB0aGlzLm9uRm9jdXNpbihlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB0aGlzLm9uRHJvcChlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoZSkgPT4gdGhpcy5vblBhc3RlKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMub25LZXlkb3duKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB0aGlzLm9uS2V5cHJlc3MoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHRoaXMub25JbnB1dChlKSk7XHJcblxyXG4gICAgLy8gRHJhZ2dpbmcgbGlzdGVuZXJzXHJcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgYSBkcmFnIHN0YXJ0ZWQgaW50ZXJuYWxseSBvciBleHRlcm5hbGx5XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4gdGhpcy5vbkRyYWdzdGFydChlKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHRoaXMub25EcmFnZW5kKGUpKTtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgZWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gIH1cclxuICBnZXQgb3B0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBmb3JtYXR0ZWRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9mb3JtYXR0ZWRWYWx1ZTtcclxuICB9XHJcbiAgZ2V0IGFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGlvblR5cGVzO1xyXG4gIH1cclxuICBnZXQgZHJhZ1N0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdTdGF0ZTtcclxuICB9XHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTRVRURVJTXHJcbiAgc2V0IGRyYWdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gc3RhdGU7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xyXG4gIH1cclxuICBzZXQgZm9ybWF0dGVkVmFsdWUodmFsKSB7XHJcbiAgICB0aGlzLl9mb3JtYXR0ZWRWYWx1ZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcclxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXHJcbiAgICovXHJcbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcclxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcclxuICAgICAgICBuYW1lczogWyctJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT01FLFxyXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcclxuICAgICAgICBuYW1lczogWydlbmQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuYWN0aW9uVHlwZXMpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBhY3Rpb25UeXBlLm5hbWVzLmluZGV4T2YobmFtZSk7XHJcbiAgICAgIGNvbnN0IHR5cGVNYXRjaCA9IGluZGV4ID4gLTE7XHJcblxyXG4gICAgICBpZiAodHlwZU1hdGNoICYmIChhY3Rpb25UeXBlLmN0cmwgPyBlLmN0cmxLZXkgOiB0cnVlKSkge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25UeXBlLnR5cGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBBQ1RJT05fVFlQRVMuVU5LTk9XTjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHZhbHVlLCBmdWxseSBmb3JtYXR0ZWQsIGZvciB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldFZhbHVlKHZhbCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9XHJcblxyXG5cclxuICAvL1xyXG4gIC8vIEVWRU5UIEhBTkRMRVJTXHJcbiAgLy9cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXNpbmcgT1VUIG9mIHRoZSBpbnB1dCAtIGZvcm1hdCBmdWxseVxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3Vzb3V0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIE9VVCBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBmb2N1cyBvZiB0aGUgaW5wdXQgLSBTZWxlY3QgYWxsIHRleHRcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c2luKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIElOIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGRyb3BwaW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dCAtIHJlcGxhY2UgdGhlIFdIT0xFIHZhbHVlXHJcbiAgICogd2l0aCB0aGlzIG5ldyB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJvcChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcm9wIGV2ZW50JywgZSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmRyYWdTdGF0ZSkge1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLklOVEVSTkFMOlxyXG4gICAgICAgIC8vIFRoaXMgY2FzZSBpcyBoYW5kbGVkIGJ5IHRoZSAnb25JbnB1dCcgZnVuY3Rpb25cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5FWFRFUk5BTDpcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQnKSk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIERvIG5vdGhpbmc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBzdGFydCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnc3RhcnQoZSkge1xyXG4gICAgdGhpcy5kcmFnU3RhdGUgPSAoZS50YXJnZXQgPT09IHRoaXMuZWxlbWVudClcclxuICAgICAgPyBEUkFHX1NUQVRFUy5JTlRFUk5BTFxyXG4gICAgICA6IERSQUdfU1RBVEVTLkVYVEVSTkFMO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBTVEFSVEVEJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBlbmQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ2VuZChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIEVOREVEJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG4gICAgdGhpcy5kcmFnU3RhdGUgPSBEUkFHX1NUQVRFUy5OT05FO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwYXN0aW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gQ2xpcGJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25QYXN0ZShlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdQYXN0ZSBldmVudCcsIGUpO1xyXG4gICAgY29uc3QgY2hhcnMgPSBlLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xyXG4gICAgY29uc3QgcG90ZW50aWFsVmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgY2hhcnMsXHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldFZhbHVlKHBvdGVudGlhbFZhbHVlKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbiAgb25LZXlwcmVzcyhlKSB7XHJcbiAgIGNvbnNvbGUuZGVidWcoJ2tleXByZXNzJywgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHByZXNzaW5nIGFueSBrZXkgaW5zaWRlIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvbktleWRvd24oZSkge1xyXG4gICAgY29uc3Qga2V5SW5mbyA9IHtcclxuICAgICAgZXZlbnQ6IGUsXHJcbiAgICAgIGNvZGU6IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxyXG4gICAgICBrZXlOYW1lOiBrZXljb2RlKGUpID8ga2V5Y29kZShlKS5yZXBsYWNlKCdudW1wYWQgJywgJycpIDogbnVsbCxcclxuICAgICAgY2FyZXRTdGFydDogdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBjYXJldEVuZDogdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgY3VycmVudFZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIG5ld1ZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3Rpb25UeXBlID0gdGhpcy5nZXRBY3Rpb25UeXBlKGtleUluZm8ua2V5TmFtZSwgZSk7XHJcblxyXG4gICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvblR5cGUpIHtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTlVNQkVSOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTnVtYmVyKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFQ0lNQUw6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWNpbWFsKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk1JTlVTOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTWludXMoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuU0hPUlRDVVQ6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25TaG9ydGN1dChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT01FOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5FTkQ6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW91clxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25WZXJ0aWNhbEFycm93KGtleUluZm8sIHRoaXMub3B0aW9ucy52YWx1ZVN0ZXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFTEVURTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlbGV0ZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgY29uc3QgY3VycmVudFZhbHVlID0ga2V5SW5mby5uZXdWYWx1ZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcbiAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcclxuICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcclxuICAgIHRoaXMuaGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEJhY2t1cCBldmVudCBpZiBpbnB1dCBjaGFuZ2VzIGZvciBhbnkgb3RoZXIgcmVhc29uLCBqdXN0IGZvcm1hdCB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRXZlbnRcclxuICAgKi9cclxuICBvbklucHV0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ29uIElOUFVUJywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlucHV0O1xyXG4iLCJcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogRWRpdCBhIHN0cmluZyB3aXRoIGEgbmV3IHN0cmluZyB0byBhZGQuXHJcbiAqIEhhbmRsZXMgdGhlIGNhc2UgaWYgdGV4dCBpcyBoaWdobGlnaHRlZCBhbHNvLCBpbiB3aGljaCBjYXNlIHRoYXQgdGV4dFxyXG4gKiB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlICd0b0FkZCcgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnRzLmVkaXRTdHJpbmcgPSBmdW5jdGlvbihzdHIsIHRvQWRkLCBjYXJldFN0YXJ0LCBjYXJldEVuZCA9IGNhcmV0U3RhcnQpIHtcclxuICBjb25zdCBmaXJzdEhhbGYgPSBzdHIuc2xpY2UoMCwgY2FyZXRTdGFydCk7XHJcbiAgY29uc3Qgc2Vjb25kSGFsZiA9IHN0ci5zbGljZShjYXJldEVuZCwgc3RyLmxlbmd0aCk7XHJcbiAgcmV0dXJuIGAke2ZpcnN0SGFsZn0ke3RvQWRkfSR7c2Vjb25kSGFsZn1gO1xyXG59XHJcblxyXG4vKipcclxuICogRnVsbHkgZm9ybWF0IHRoZSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoMCwgZGVjaW1hbEluZGV4KTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGlmIChvcHRpb25zLmZpeGVkKSB7XHJcbiAgICAvLyBJZiB0aGVyZSBzaG91bGQgYmUgc29tZSBkZWNpbWFsc1xyXG4gICAgaWYgKG9wdGlvbnMuc2NhbGUgPiAwKSB7XHJcbiAgICAgIGRlY2ltYWxQYXJ0ID0gZGVjaW1hbFBhcnQubGVuZ3RoID49IG9wdGlvbnMuc2NhbGVcclxuICAgICAgICA/IGRlY2ltYWxQYXJ0LnNsaWNlKDAsIG9wdGlvbnMuc2NhbGUpXHJcbiAgICAgICAgOiBkZWNpbWFsUGFydCArIEFycmF5KG9wdGlvbnMuc2NhbGUgLSBkZWNpbWFsUGFydC5sZW5ndGggKyAxKS5qb2luKCcwJyk7XHJcbiAgICAgIHJldHVybiBgJHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gaW50ZWdlclBhcnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcclxuICogQHBhcmFtIHtzdHJ9IFRoZSBzdHJpbmcgdmFsdWUgKHdpdGggbm8gdGhvdXNhbmQgc2VwYXJhdG9ycylcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZWxlYWRpbmdaZXJvcyh2YWwsIG9wdGlvbnMpIHtcclxuICAvLyBSZW1vdmUgdW5uZWNlc3NhcnkgemVyb3NcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoMCwgZGVjaW1hbEluZGV4ICsgMSk7XHJcbiAgY29uc3QgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGxldCBpID0gKGludGVnZXJQYXJ0WzBdID09PSAnLScpID8gMSA6IDA7XHJcblxyXG4gIHdoaWxlIChcclxuICAgIGludGVnZXJQYXJ0W2ldID09IDBcclxuICAgICAgJiYgaW50ZWdlclBhcnRbaSArIDFdICE9PSBvcHRpb25zLmRlY2ltYWxcclxuICAgICAgJiYgaW50ZWdlclBhcnQubGVuZ3RoID4gMVxyXG4gICkge1xyXG4gICAgaW50ZWdlclBhcnQgPSBpbnRlZ2VyUGFydC5zbGljZSgwLCBpKSArIGludGVnZXJQYXJ0LnNsaWNlKGkgKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBgJHtpbnRlZ2VyUGFydH0ke2RlY2ltYWxQYXJ0fWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcclxuICovXHJcbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGxldCBzdHIgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpO1xyXG5cclxuICBzdHIgPSByZW1vdmVsZWFkaW5nWmVyb3Moc3RyLCBvcHRpb25zKTtcclxuXHJcbiAgY29uc3Qgc3RhcnRJbmRleCA9IHN0ci5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyBzdHIuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxyXG4gICAgOiBzdHIubGVuZ3RoIC0gMTtcclxuICBjb25zdCBlbmRJbmRleCA9IHN0clswXSA9PT0gJy0nID8gMSA6IDA7XHJcblxyXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxyXG4gIGxldCBpID0gc3RhcnRJbmRleDtcclxuICBsZXQgaiA9IDE7XHJcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XHJcbiAgICAvLyBFdmVyeSAzIGNoYXJhY2VycywgYWRkIGEgY29tbWFcclxuICAgIGlmIChqICUgMyA9PT0gMCkge1xyXG4gICAgICBzdHIgPSB0aGlzLmVkaXRTdHJpbmcoc3RyLCAnLCcsIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIG9wdGlvbnMpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIHByZXZTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBjdXJyZW50U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFN5bWJvbHMgLSBwcmV2U3ltYm9scztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcclxuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcclxuICogQHBhcmFtIHt2YWx9IHZhbHVlIHRvIGNoZWNrIGFnYWluc3RcclxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXHJcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XHJcbiAgaWYgKGNoYXIgIT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKChpc05lZ2F0aXZlID8gMSA6IDApLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cclxuICBpZiAoaW50ZWdlclBhcnQpIHtcclxuICAgIC8vIElGIGludGVnZXIgcGFydCBpcyBqdXN0IGEgemVybyB0aGVuIG5vIHplcm9zIGNhbiBiZSBhZGRlZFxyXG4gICAgLy8gRUxTRSB0aGUgemVybyBjYW4gbm90IGJlIGFkZGVkIGF0IHRoZSBmcm9udCBvZiB0aGUgdmFsdWVcclxuICAgIHJldHVybiBpbnRlZ2VyUGFydCA9PSAwID8gZmFsc2UgOiBjYXJldFBvcyA+IDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgdG8gaXRzIG51bWJlciBlcXVpdmFsZW50XHJcbiAqIEBwYXJhbSB7dmFsfSBzdHJpbmcgdmFsdWUgdG8gY29udmVydCB0byBhIG51bWJlclxyXG4gKiBAcGFyYW0ge29wdGlvbnN9IEZpbnB1dCBvcHRpb25zIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0cy50b051bWJlciA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHJldHVybiB2YWwgJiYgTnVtYmVyKHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFske29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJykpO1xyXG59XHJcbiIsIi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vICAgICBLRVkgSEFORExFUlMgICAgIC8vXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vIEFsbCBmdW5jdGlvbnMgZGVhbGluZyB3aXRoIGtleXByZXNzZXMgKGxpc3RlbmVkIHRvIG9uIHRoZSBrZXlkb3duIGV2ZW50KVxyXG4vLyBhcmUgaGVyZSwgd2l0aCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgZm9yIG1vc3QgdHlwZXMgb2Yga2V5XHJcblxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgUkFOR0V9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAvKipcclxuICAgKiBOVU1CRVIgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTnVtYmVyOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cclxuICAgICAgIShrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSA9PT0gJy0nXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKVxyXG4gICAgICAmJiBoZWxwZXJzLmFsbG93ZWRaZXJvKGtleUluZm8uY3VycmVudFZhbHVlLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKGFsbG93ZWROdW1iZXIpIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBNSU5VUyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25NaW51czogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgbWludXNBbGxvd2VkID0ga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIChrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSAhPT0gJy0nIHx8IGtleUluZm8uY2FyZXRFbmQgPiAwKVxyXG4gICAgICAmJiBvcHRpb25zLnJhbmdlICE9PSBSQU5HRS5QT1NJVElWRTtcclxuXHJcbiAgICAgaWYgKG1pbnVzQWxsb3dlZCkge1xyXG4gICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICctJyxcclxuICAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICApO1xyXG4gICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICAgfVxyXG4gICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUNJTUFMIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgb25EZWNpbWFsOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm90IGFscmVhZHkgYSBkZWNpbWFsIG9yIHRoZSBvcmlnaW5hbCB3b3VsZCBiZSByZXBsYWNlZFxyXG4gICAgLy8gQWRkIHRoZSBkZWNpbWFsXHJcbiAgICBjb25zdCBkZWNpbWFsQWxsb3dlZCA9XHJcbiAgICAgIG9wdGlvbnMuc2NhbGUgPiAwXHJcbiAgICAgICYmIChkZWNpbWFsSW5kZXggPT09IC0xXHJcbiAgICAgICAgICB8fCAoZGVjaW1hbEluZGV4ID49IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgICAgICYmIGRlY2ltYWxJbmRleCA8IGtleUluZm8uY2FyZXRFbmQpKVxyXG5cclxuICAgIGlmIChkZWNpbWFsQWxsb3dlZClcclxuICAgIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBvcHRpb25zLmRlY2ltYWwsXHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNIT1JUQ1VUIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge29wdGlvbnN9IENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgb25TaG9ydGN1dDogZnVuY3Rpb24oa2V5SW5mbywgb3B0aW9ucykge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IG9wdGlvbnMuc2hvcnRjdXRzW2tleUluZm8ua2V5TmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIGNvbnN0IGFkanVzdGVkVmFsID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgIGNvbnN0IHJhd1ZhbHVlID0gaGVscGVycy50b051bWJlcihhZGp1c3RlZFZhbCwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIpIHtcclxuICAgICAgLy8gSWYgd2hvbGUgdmFsdWUgaXMgc2VsZWN0ZWRcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IFN0cmluZygocmF3VmFsdWUgfHwgMSkgKiBtdWx0aXBsaWVyKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0ga2V5SW5mby5uZXdWYWx1ZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQkFDS1NQQUNFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQkVGT1JFIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XHJcbiAgICAgICAgbGV0IGNhcmV0SnVtcCA9IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XHJcblxyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0gJyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGFmdGVyIGl0XHJcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIHRob3VzYW5kcyBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZTdGFydCA9IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVkVSVElDQUwgQVJST1cgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7c3RlcH0gSG93IG11Y2ggdG8gaW5jcmVhc2UvZGVjcmVhc2UgdmFsdWUgYnlcclxuICAgKi9cclxuICBvblZlcnRpY2FsQXJyb3c6IGZ1bmN0aW9uKGtleUluZm8sIHN0ZXApIHtcclxuICAgIC8vIElmIHN0ZXAgaXMgMCAob3IgZmFsc2V5KSB0aGVuIGFzc3VtZSBhcnJvdyBrZXkgdmFsdWUgY2hhbmdpbmcgaXMgZGlzYWJsZWRcclxuICAgIGlmIChzdGVwICYmICFpc05hTihzdGVwKSkge1xyXG4gICAgICBzd2l0Y2ggKGtleUluZm8ua2V5TmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgIC8vIFRPRE8gLSBVcCBhcnJvdyBzdGVwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkb3duJzpcclxuICAgICAgICAgIC8vIFRPRE8gLSBEb3duIGFycm93IHN0ZXBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH1cclxuICAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVORE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xyXG4gICAqL1xyXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuaGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5oaXN0b3J5LnJlZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5jb25zdCBNQVhfQlVGRkVSX1NJWkUgPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBIaXN0b3J5IC0gTWFuYWdlcyBhbiBhcnJheSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgdHJhY2tlZCwgc3VwcG9ydGluZ1xyXG4gKiB0aGUgdW5kbyBhbmQgcmVkbyBvcGVyYXRpb25zIGluIHRoZSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVIaXN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gW251bGxdO1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuICBnZXQgY3VycmVudEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgc2V0IGN1cnJlbnRJbmRleChpKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpO1xyXG4gIH1cclxuICBzZXQgaGlzdG9yeShoaXN0b3J5KSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gaGlzdG9yeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gcHJldmlvdXMgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHVuZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gbmV4dCB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBuZXcgdmFsdWUgdG8gaGlzdG9yeSBhcnJheS4gQW55IHBvc3NpYmxlICdyZWRvJ3MnIGFyZSByZW1vdmVkIGZyb20gYXJyYXlcclxuICAgKiBhcyBhIG5ldyAnYnJhbmNoJyBvZiBoaXN0b3J5IGlzIGNyZWF0ZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhZGRlZFxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBhZGQgdG8gaGlzdG9yeVxyXG4gICAqL1xyXG4gIGFkZFZhbHVlKHZhbCkge1xyXG4gICAgLy8gRGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY3VycmVudCB2YWx1ZVxyXG4gICAgaWYgKHZhbCAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5oaXN0b3J5LnNwbGljZSh0aGlzLmN1cnJlbnRJbmRleCArIDEsIG51bGwsIHZhbCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IE1BWF9CVUZGRVJfU0laRSkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeS5zaGlmdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==
