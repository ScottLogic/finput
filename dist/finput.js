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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFHLENBQUMsQ0FBQzs7QUFFNUMsYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7d0JBckRhO0FBQ1osYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCO3NCQVdXLE9BQU8sRUFBRTtBQUNuQixVQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztLQUN6Qjs7O3dCQVprQjtBQUNqQixhQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDM0I7c0JBS2dCLENBQUMsRUFBRTtBQUNsQixVQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztLQUN4Qjs7O3dCQU5rQjtBQUNqQixhQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3hDOzs7U0FoQmtCLFlBQVk7OztrQkFBWixZQUFZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG5cblxuLyoqXG4gKiBDb25lbmllbmNlIG1ldGhvZCByZXR1cm5zIGNvcnJlc3BvbmRpbmcgdmFsdWUgZm9yIGdpdmVuIGtleU5hbWUgb3Iga2V5Q29kZS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWFyY2hJbnB1dCkge1xuICAvLyBLZXlib2FyZCBFdmVudHNcbiAgaWYgKHNlYXJjaElucHV0ICYmICdvYmplY3QnID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHtcbiAgICB2YXIgaGFzS2V5Q29kZSA9IHNlYXJjaElucHV0LndoaWNoIHx8IHNlYXJjaElucHV0LmtleUNvZGUgfHwgc2VhcmNoSW5wdXQuY2hhckNvZGVcbiAgICBpZiAoaGFzS2V5Q29kZSkgc2VhcmNoSW5wdXQgPSBoYXNLZXlDb2RlXG4gIH1cblxuICAvLyBOdW1iZXJzXG4gIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSByZXR1cm4gbmFtZXNbc2VhcmNoSW5wdXRdXG5cbiAgLy8gRXZlcnl0aGluZyBlbHNlIChjYXN0IHRvIHN0cmluZylcbiAgdmFyIHNlYXJjaCA9IFN0cmluZyhzZWFyY2hJbnB1dClcblxuICAvLyBjaGVjayBjb2Rlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyBjaGVjayBhbGlhc2VzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gYWxpYXNlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gd2VpcmQgY2hhcmFjdGVyP1xuICBpZiAoc2VhcmNoLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHNlYXJjaC5jaGFyQ29kZUF0KDApXG5cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ3JpZ2h0IGNsaWNrJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjIsXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdwZ3VwJzogMzMsXG4gICdwZ2RuJzogMzMsXG4gICdpbnMnOiA0NSxcbiAgJ2RlbCc6IDQ2LFxuICAnY21kJzogOTFcbn1cblxuXG4vKiFcbiAqIFByb2dyYW1hdGljYWxseSBhZGQgdGhlIGZvbGxvd2luZ1xuICovXG5cbi8vIGxvd2VyIGNhc2UgY2hhcnNcbmZvciAoaSA9IDk3OyBpIDwgMTIzOyBpKyspIGNvZGVzW1N0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaSAtIDMyXG5cbi8vIG51bWJlcnNcbmZvciAodmFyIGkgPSA0ODsgaSA8IDU4OyBpKyspIGNvZGVzW2kgLSA0OF0gPSBpXG5cbi8vIGZ1bmN0aW9uIGtleXNcbmZvciAoaSA9IDE7IGkgPCAxMzsgaSsrKSBjb2Rlc1snZicraV0gPSBpICsgMTExXG5cbi8vIG51bXBhZCBrZXlzXG5mb3IgKGkgPSAwOyBpIDwgMTA7IGkrKykgY29kZXNbJ251bXBhZCAnK2ldID0gaSArIDk2XG5cbi8qKlxuICogR2V0IGJ5IGNvZGVcbiAqXG4gKiAgIGV4cG9ydHMubmFtZVsxM10gLy8gPT4gJ0VudGVyJ1xuICovXG5cbnZhciBuYW1lcyA9IGV4cG9ydHMubmFtZXMgPSBleHBvcnRzLnRpdGxlID0ge30gLy8gdGl0bGUgZm9yIGJhY2t3YXJkIGNvbXBhdFxuXG4vLyBDcmVhdGUgcmV2ZXJzZSBtYXBwaW5nXG5mb3IgKGkgaW4gY29kZXMpIG5hbWVzW2NvZGVzW2ldXSA9IGlcblxuLy8gQWRkIGFsaWFzZXNcbmZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgY29kZXNbYWxpYXNdID0gYWxpYXNlc1thbGlhc11cbn1cbiIsIlxyXG5leHBvcnRzLkFDVElPTl9UWVBFUyA9IHtcclxuICBOVU1CRVI6ICdOVU1CRVInLFxyXG4gIFNIT1JUQ1VUOiAnU0hPUlRDVVQnLFxyXG4gIERFQ0lNQUw6ICdERUNJTUFMJyxcclxuICBERUxJTUlURVI6ICdERUxJTUlURVInLFxyXG4gIE1JTlVTOiAnTUlOVVMnLFxyXG4gIFVOS05PV046ICdVTktOT1dOJyxcclxuICBIT1JJWk9OVEFMX0FSUk9XOiAnSE9SSVpPTlRBTF9BUlJPVycsXHJcbiAgVkVSVElDQUxfQVJST1c6ICdWRVJUSUNBTF9BUlJPVycsXHJcbiAgQkFDS1NQQUNFOiAnQkFDS1NQQUNFJyxcclxuICBERUxFVEU6ICdERUxFVEUnLFxyXG4gIFVORE86ICdVTkRPJyxcclxuICBSRURPOiAnUkVETycsXHJcbiAgSE9NRTogJ0hPTUUnLFxyXG4gIEVORDogJ0VORCdcclxufVxyXG5cclxuZXhwb3J0cy5EUkFHX1NUQVRFUyA9IHtcclxuICBOT05FOiAnTk9ORScsXHJcbiAgSU5URVJOQUw6ICdJTlRFUk5BTCcsXHJcbiAgRVhURVJOQUw6ICdFWFRFUk5BTCdcclxufVxyXG5cclxuZXhwb3J0cy5SQU5HRSA9IHtcclxuICBBTEw6ICdBTEwnLFxyXG4gIFBPU0lUSVZFOiAnUE9TSVRJVkUnXHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IEFsaSBTaGVlaGFuLURhcmUsIGFsbCByaWdodHMgYW5kIHByb2ZpdHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQga2V5Y29kZSBmcm9tICdrZXljb2RlJztcclxuaW1wb3J0IGtleUhhbmRsZXJzIGZyb20gJy4va2V5SGFuZGxlcnMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmFsdWVIaXN0b3J5IGZyb20gJy4vdmFsdWVIaXN0b3J5JztcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDT05TVEFOVFNcclxuICovXHJcbmNvbnN0IERFRkFVTFRTID0ge1xyXG4gIHNjYWxlOiAyLFxyXG4gIHJhbmdlOiBSQU5HRS5BTEwsXHJcbiAgZml4ZWQ6IHRydWUsXHJcbiAgdGhvdXNhbmRzOiAnLCcsXHJcbiAgZGVjaW1hbDogJy4nLFxyXG4gIHNob3J0Y3V0czoge1xyXG4gICAgJ2snOiAxMDAwLFxyXG4gICAgJ20nOiAxMDAwMDAwLFxyXG4gICAgJ2InOiAxMDAwMDAwMDAwXHJcbiAgfSxcclxuICBjdXJyZW5jeTogbnVsbCxcclxuICB2YWx1ZVN0ZXA6IDFcclxufVxyXG5cclxuLyoqXHJcbiAqIEZJTlBVVCBDT01QT05FTlQgQ0xBU1NcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBGaW5wdXQge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RE9NIEVsZW1lbnR9IFRoZSBudW1iZXIgaW5wdXRcclxuICAgKiBAcGFyYW0ge09wdGlvbnN9IE9wdGlvbnMgZm9yIHRoZSBudW1iZXIgaW5wdXQncyBiZWhhdmlvdXJcclxuICAgKlxyXG4gICAqIERldGFpbGVkIGxpc3Qgb2YgcG9zc2libGUgb3B0aW9uczpcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2NhbGV9IG1heGltdW0gbnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnJhbmdlfSBXaGV0aGVyIG51bWJlciBjYW4gdGFrZSBhbnkgdmFsdWUgb3IgbXVzdCBiZSBwb3NpdGl2ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5maXhlZH0gQWZ0ZXIgZm9jdXMgaXMgbG9zdCAtIHZhbHVlIGlzIGZvcm1hdHRlZCB0byAqc2NhbGUqIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy50aG91c2FuZHN9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSB0aG91c2FuZHMgc2VwYXJhdG9yXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmRlY2ltYWx9IENoYXJhY3RlciB0byB1c2UgZm9yIHRoZSBkZWNpbWFsIHBvaW50XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNob3J0Y3V0c30gT2JqZWN0IG1hcCBvZiBzaG9ydGN1dCBjaGFyYWN0ZXJzIHRvIG11bHRpcGxpZXIgKGUuZy4geyBrOiAxMDAwIH0pXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmN1cnJlbmN5fSBPcHRpb25hbCBjdXJyZW5jeSB0byBwcmVwZW5kIHRvIHZhbHVlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnZhbHVlU3RlcCBPUiBmYWxzZX0gQ2hhbmdlIGhvdyBtdWNoIHRoZSB2YWx1ZSBjaGFuZ2VzIHdoZW4gcHJlc3NpbmcgdXAvZG93biBhcnJvdyBrZXlzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbihERUZBVUxUUywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLl9hY3Rpb25UeXBlcyA9IHRoaXMuY3JlYXRlQWN0aW9uVHlwZXMoKTtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XHJcblxyXG4gICAgLy8gU2V0dXAgbGlzdGVuZXJzXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB0aGlzLm9uRm9jdXNvdXQoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHRoaXMub25Gb2N1c2luKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHRoaXMub25Ecm9wKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIChlKSA9PiB0aGlzLm9uUGFzdGUoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gdGhpcy5vbktleWRvd24oZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHRoaXMub25LZXlwcmVzcyhlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gdGhpcy5vbklucHV0KGUpKTtcclxuXHJcbiAgICAvLyBEcmFnZ2luZyBsaXN0ZW5lcnNcclxuICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hldGhlciBhIGRyYWcgc3RhcnRlZCBpbnRlcm5hbGx5IG9yIGV4dGVybmFsbHlcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB0aGlzLm9uRHJhZ3N0YXJ0KGUpKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4gdGhpcy5vbkRyYWdlbmQoZSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBlbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG4gIGdldCBvcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGZvcm1hdHRlZFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZFZhbHVlO1xyXG4gIH1cclxuICBnZXQgYWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uVHlwZXM7XHJcbiAgfVxyXG4gIGdldCBkcmFnU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZHJhZ1N0YXRlO1xyXG4gIH1cclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFNFVFRFUlNcclxuICBzZXQgZHJhZ1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSBzdGF0ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHZhbCkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7XHJcbiAgfVxyXG4gIHNldCBmb3JtYXR0ZWRWYWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX2Zvcm1hdHRlZFZhbHVlID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZSB0byBjaGFyL2tleSBjb2RlcyBhcnJheSB3aXRoIHRoZVxyXG4gICAqIGNvcnJlY3QgZGVjaW1hbCBhbmQgdGhvdXNhbmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgKGRlcGVuZGluZyBvbiBsYW5ndWFnZSlcclxuICAgKi9cclxuICBjcmVhdGVBY3Rpb25UeXBlcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTlVNQkVSLFxyXG4gICAgICAgIG5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk1JTlVTLFxyXG4gICAgICAgIG5hbWVzOiBbJy0nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPTUUsXHJcbiAgICAgICAgbmFtZXM6IFsnaG9tZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuRU5ELFxyXG4gICAgICAgIG5hbWVzOiBbJ2VuZCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVDSU1BTCxcclxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy5kZWNpbWFsXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTElNSVRFUixcclxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy50aG91c2FuZHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuU0hPUlRDVVQsXHJcbiAgICAgICAgbmFtZXM6IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5zaG9ydGN1dHMpXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuQkFDS1NQQUNFLFxyXG4gICAgICAgIG5hbWVzOiBbJ2JhY2tzcGFjZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMRVRFLFxyXG4gICAgICAgIG5hbWVzOiBbJ2RlbGV0ZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVyxcclxuICAgICAgICBuYW1lczogWydsZWZ0JywgJ3JpZ2h0J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVyxcclxuICAgICAgICBuYW1lczogWyd1cCcsICdkb3duJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5VTkRPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3onXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuUkVETyxcclxuICAgICAgICBuYW1lczogWyd5J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgd2hhdCB0eXBlIG9mIGFjdGlvbiBuZWVkcyB0byBiZSBkZWFsdCB3aXRoIGZyb20gdGhlIGN1cnJlbnRcclxuICAgKiBrZXlkb3duIGV2ZW50LiBFLmcuIHZlcnRpY2FsIGFycm93IHByZXNzZWQsIG51bWJlciBwcmVzc2VkIGV0Yy4uLlxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBnZXRBY3Rpb25UeXBlKG5hbWUsIGUpIHtcclxuICAgIGZvciAobGV0IGFjdGlvblR5cGUgb2YgdGhpcy5hY3Rpb25UeXBlcykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGFjdGlvblR5cGUubmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgY29uc3QgdHlwZU1hdGNoID0gaW5kZXggPiAtMTtcclxuXHJcbiAgICAgIGlmICh0eXBlTWF0Y2ggJiYgKGFjdGlvblR5cGUuY3RybCA/IGUuY3RybEtleSA6IHRydWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvblR5cGUudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFDVElPTl9UWVBFUy5VTktOT1dOO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB0aGlzLmhpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vXHJcbiAgLy8gRVZFTlQgSEFORExFUlNcclxuICAvL1xyXG5cclxuICAvKipcclxuICAgKiBPbiBmb2N1c2luZyBPVVQgb2YgdGhlIGlucHV0IC0gZm9ybWF0IGZ1bGx5XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNvdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3VzaW4oZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgSU4gZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcclxuICAgKiB3aXRoIHRoaXMgbmV3IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZHJhZ1N0YXRlKSB7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuSU5URVJOQUw6XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLkVYVEVSTkFMOlxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG8gbm90aGluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHN0YXJ0IG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdzdGFydChlKSB7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxyXG4gICAgICA/IERSQUdfU1RBVEVTLklOVEVSTkFMXHJcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHBhc3Rpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBDbGlwYm9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvblBhc3RlKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1Bhc3RlIGV2ZW50JywgZSk7XHJcbiAgICBjb25zdCBjaGFycyA9IGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICBjb25zdCBwb3RlbnRpYWxWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBjaGFycyxcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0VmFsdWUocG90ZW50aWFsVmFsdWUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICBvbktleXByZXNzKGUpIHtcclxuICAgY29uc29sZS5kZWJ1Zygna2V5cHJlc3MnLCBlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcHJlc3NpbmcgYW55IGtleSBpbnNpZGUgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uS2V5ZG93bihlKSB7XHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkgPyBrZXljb2RlKGUpLnJlcGxhY2UoJ251bXBhZCAnLCAnJykgOiBudWxsLFxyXG4gICAgICBjYXJldFN0YXJ0OiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgbmV3VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSB0aGlzLmdldEFjdGlvblR5cGUoa2V5SW5mby5rZXlOYW1lLCBlKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25OdW1iZXIoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25NaW51cyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1c6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPTUU6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkVORDpcclxuICAgICAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG4gICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3VyXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblZlcnRpY2FsQXJyb3coa2V5SW5mbywgdGhpcy5vcHRpb25zLnZhbHVlU3RlcCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkJhY2tzcGFjZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVsZXRlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVW5kbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25SZWRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBJZiBjdHJsIGtleSBtb2RpZmllciBpcyBwcmVzc2VkIHRoZW4gYWxsb3cgc3BlY2lmaWMgZXZlbnQgaGFuZGxlclxyXG4gICAgICAgIC8vIHRvIGhhbmRsZSB0aGlzXHJcbiAgICAgICAgaWYgKCFlLmN0cmxLZXkpIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gaGVscGVycy5wYXJ0aWFsRm9ybWF0KGtleUluZm8ubmV3VmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBrZXlJbmZvLm5ld1ZhbHVlO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG5cclxuICAgIGNvbnN0IG9mZnNldCA9IGhlbHBlcnMuY2FsY3VsYXRlT2Zmc2V0KFxyXG4gICAgICBjdXJyZW50VmFsdWUsXHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICB0aGlzLm9wdGlvbnNcclxuICAgICk7XHJcbiAgICBjb25zdCBuZXdDYXJldFBvcyA9IGtleUluZm8uY2FyZXRTdGFydCArIG9mZnNldDtcclxuICAgIHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShuZXdDYXJldFBvcywgbmV3Q2FyZXRQb3MpO1xyXG4gICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQmFja3VwIGV2ZW50IGlmIGlucHV0IGNoYW5nZXMgZm9yIGFueSBvdGhlciByZWFzb24sIGp1c3QgZm9ybWF0IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBFdmVudFxyXG4gICAqL1xyXG4gIG9uSW5wdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1Zygnb24gSU5QVVQnLCBlKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaW5wdXQ7XHJcbiIsIlxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cclxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XHJcbiAqIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgJ3RvQWRkJyBzdHJpbmdcclxuICovXHJcbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xyXG4gIGNvbnN0IGZpcnN0SGFsZiA9IHN0ci5zbGljZSgwLCBjYXJldFN0YXJ0KTtcclxuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcclxuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XHJcbn1cclxuXHJcbmV4cG9ydHMuZm9ybWF0VGhvdXNhbmRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3Qgc3RhcnRJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxyXG4gICAgOiB2YWwubGVuZ3RoIC0gMTtcclxuICBjb25zdCBlbmRJbmRleCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDA7XHJcblxyXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxyXG4gIGxldCBpID0gc3RhcnRJbmRleDtcclxuICBsZXQgaiA9IDE7XHJcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XHJcbiAgICAvLyBFdmVyeSAzIGNoYXJhY2VycywgYWRkIGEgY29tbWFcclxuICAgIGlmIChqICUgMyA9PT0gMCkge1xyXG4gICAgICB2YWwgPSB0aGlzLmVkaXRTdHJpbmcodmFsLCAnLCcsIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnRpYWxseSBmb3JtYXQgdGhlIHZhbHVlLCBvbmx5IGFkZGluZyBjb21tYXMgYXMgbmVlZGVkIChEb25lIG9uIGtleXByZXNzL2tleXVwKVxyXG4gKi9cclxuZXhwb3J0cy5wYXJ0aWFsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgdmFsID0gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKTtcclxuICB2YWwgPSB0aGlzLnJlbW92ZWxlYWRpbmdaZXJvcyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlRXh0cmFEZWNpbWFscyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMuZm9ybWF0VGhvdXNhbmRzKHZhbCwgb3B0aW9ucyk7XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdWxseSBmb3JtYXQgdGhlIHZhbHVlXHJcbiAqL1xyXG5leHBvcnRzLmZ1bGxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB0aGlzLnBhcnRpYWxGb3JtYXQodmFsLCBvcHRpb25zKTtcclxuXHJcbiAgLy8gRnVsbHkgZm9ybWF0IGRlY2ltYWwgcGxhY2VzXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCk7XHJcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBpZiAob3B0aW9ucy5maXhlZCkge1xyXG5cclxuICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBzb21lIGRlY2ltYWxzXHJcbiAgICBpZiAob3B0aW9ucy5zY2FsZSA+IDApIHtcclxuICAgICAgZGVjaW1hbFBhcnQgPSBkZWNpbWFsUGFydC5sZW5ndGggPj0gb3B0aW9ucy5zY2FsZVxyXG4gICAgICAgID8gZGVjaW1hbFBhcnQuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSlcclxuICAgICAgICA6IGRlY2ltYWxQYXJ0ICsgQXJyYXkob3B0aW9ucy5zY2FsZSAtIGRlY2ltYWxQYXJ0Lmxlbmd0aCArIDEpLmpvaW4oJzAnKTtcclxuXHJcbiAgICAgIGlmICghaW50ZWdlclBhcnQubGVuZ3RoKSB7XHJcbiAgICAgICAgaW50ZWdlclBhcnQgPSAnMCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgJHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gaW50ZWdlclBhcnQ7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcclxuICogQHBhcmFtIHtzdHJ9IFRoZSBzdHJpbmcgdmFsdWUgKHdpdGggbm8gdGhvdXNhbmQgc2VwYXJhdG9ycylcclxuICovXHJcbmV4cG9ydHMucmVtb3ZlbGVhZGluZ1plcm9zID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgLy8gUmVtb3ZlIHVubmVjZXNzYXJ5IHplcm9zXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBsZXQgaSA9IChpbnRlZ2VyUGFydFswXSA9PT0gJy0nKSA/IDEgOiAwO1xyXG5cclxuICB3aGlsZSAoXHJcbiAgICBpbnRlZ2VyUGFydFtpXSA9PSAwXHJcbiAgICAgICYmIGludGVnZXJQYXJ0W2kgKyAxXSAhPT0gb3B0aW9ucy5kZWNpbWFsXHJcbiAgICAgICYmIGludGVnZXJQYXJ0Lmxlbmd0aCA+IDFcclxuICApIHtcclxuICAgIGludGVnZXJQYXJ0ID0gaW50ZWdlclBhcnQuc2xpY2UoMCwgaSkgKyBpbnRlZ2VyUGFydC5zbGljZShpICsgMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG5leHBvcnRzLnJlbW92ZUV4dHJhRGVjaW1hbHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSlcclxuICAgIC5zbGljZSgwLCBvcHRpb25zLnNjYWxlID09IG51bGwgPyBkZWNpbWFsUGFydC5sZW5ndGggOiBvcHRpb25zLnNjYWxlKTtcclxuXHJcbiAgcmV0dXJuIGAke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIG9wdGlvbnMpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIHByZXZTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBjdXJyZW50U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFN5bWJvbHMgLSBwcmV2U3ltYm9scztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcclxuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcclxuICogQHBhcmFtIHt2YWx9IHZhbHVlIHRvIGNoZWNrIGFnYWluc3RcclxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXHJcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XHJcbiAgaWYgKGNoYXIgIT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKChpc05lZ2F0aXZlID8gMSA6IDApLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBzb21lIGludGVnZXIgcGFydCBhbmQgdGhlIGNhcmV0IGlzIHRvIHRoZSBsZWZ0IG9mXHJcbiAgLy8gdGhlIGRlY2ltYWwgcG9pbnRcclxuICBpZiAoaW50ZWdlclBhcnQgJiYgY2FyZXRQb3MgPCBpbnRlZ2VyUGFydC5sZW5ndGggKyAxKSB7XHJcbiAgICAvLyBJRiBpbnRlZ2VyIHBhcnQgaXMganVzdCBhIHplcm8gdGhlbiBubyB6ZXJvcyBjYW4gYmUgYWRkZWRcclxuICAgIC8vIEVMU0UgdGhlIHplcm8gY2FuIG5vdCBiZSBhZGRlZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHZhbHVlXHJcbiAgICByZXR1cm4gaW50ZWdlclBhcnQgPT0gMCA/IGZhbHNlIDogY2FyZXRQb3MgPiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQ29udmVydCBhIHN0cmluZyB2YWx1ZSB0byBpdHMgbnVtYmVyIGVxdWl2YWxlbnRcclxuICogQHBhcmFtIHt2YWx9IHN0cmluZyB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgbnVtYmVyXHJcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnRzLnRvTnVtYmVyID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgcmV0dXJuIHZhbCAmJiBOdW1iZXIodmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKSk7XHJcbn1cclxuIiwiLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gICAgIEtFWSBIQU5ETEVSUyAgICAgLy9cclxuLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gQWxsIGZ1bmN0aW9ucyBkZWFsaW5nIHdpdGgga2V5cHJlc3NlcyAobGlzdGVuZWQgdG8gb24gdGhlIGtleWRvd24gZXZlbnQpXHJcbi8vIGFyZSBoZXJlLCB3aXRoIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCB0eXBlcyBvZiBrZXlcclxuXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5VTUJFUiBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIC8vIFJlbW92ZSBjaGFyYWN0ZXJzIGluIGN1cnJlbnQgc2VsZWN0aW9uXHJcbiAgICBjb25zdCB0ZW1wID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuXHJcbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cclxuICAgICAgIShrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSA9PT0gJy0nXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKVxyXG4gICAgICAmJiBoZWxwZXJzLmFsbG93ZWRaZXJvKHRlbXAsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZE51bWJlcikge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1JTlVTIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk1pbnVzOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtaW51c0FsbG93ZWQgPSBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYgKGtleUluZm8uY3VycmVudFZhbHVlWzBdICE9PSAnLScgfHwga2V5SW5mby5jYXJldEVuZCA+IDApXHJcbiAgICAgICYmIG9wdGlvbnMucmFuZ2UgIT09IFJBTkdFLlBPU0lUSVZFO1xyXG5cclxuICAgICBpZiAobWludXNBbGxvd2VkKSB7XHJcbiAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgJy0nLFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgICk7XHJcbiAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgICB9XHJcbiAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFQ0lNQUwgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvbkRlY2ltYWw6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlY2ltYWxJbmRleCA9IGtleUluZm8uY3VycmVudFZhbHVlLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXHJcbiAgICAvLyBBZGQgdGhlIGRlY2ltYWxcclxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cclxuICAgICAgb3B0aW9ucy5zY2FsZSA+IDBcclxuICAgICAgJiYgKGRlY2ltYWxJbmRleCA9PT0gLTFcclxuICAgICAgICAgIHx8IChkZWNpbWFsSW5kZXggPj0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICAgICAgJiYgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCkpXHJcblxyXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxyXG4gICAge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIG9wdGlvbnMuZGVjaW1hbCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICApO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU0hPUlRDVVQgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvblNob3J0Y3V0OiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gb3B0aW9ucy5zaG9ydGN1dHNba2V5SW5mby5rZXlOYW1lLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgY29uc3QgYWRqdXN0ZWRWYWwgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsICcnLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG4gICAgY29uc3QgcmF3VmFsdWUgPSBoZWxwZXJzLnRvTnVtYmVyKGFkanVzdGVkVmFsLCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAobXVsdGlwbGllcikge1xyXG4gICAgICAvLyBJZiB3aG9sZSB2YWx1ZSBpcyBzZWxlY3RlZFxyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gU3RyaW5nKChyYXdWYWx1ZSB8fCAxKSAqIG11bHRpcGxpZXIpO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSBrZXlJbmZvLm5ld1ZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBCQUNLU1BBQ0UgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7dGhvdXNhbmRzfSBDaGFyYWN0ZXIgdXNlZCBmb3IgdGhlIHRob3VzYW5kcyBkZWxpbWl0ZXJcclxuICAgKi9cclxuICBvbkJhY2tzcGFjZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBCRUZPUkUgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSAnJztcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBiZWZvcmUgaXRcclxuICAgICAgICBsZXQgY2FyZXRKdW1wID0gMTtcclxuXHJcbiAgICAgICAgY2FyZXRKdW1wID0gKChrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApID49IDApID8gY2FyZXRKdW1wIDogMDtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAtY2FyZXRKdW1wO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25EZWxldGUgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcclxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUxFVEUgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7dGhvdXNhbmRzfSBDaGFyYWN0ZXIgdXNlZCBmb3IgdGhlIHRob3VzYW5kcyBkZWxpbWl0ZXJcclxuICAgKi9cclxuICBvbkRlbGV0ZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGNvbnN0IG5leHRDaGFyID0ga2V5SW5mby5jdXJyZW50VmFsdWVba2V5SW5mby5jYXJldFN0YXJ0XTtcclxuXHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSAnJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYWZ0ZXIgaXRcclxuICAgICAgICBjb25zdCB0aG91c2FuZHNOZXh0ID0gbmV4dENoYXIgPT09IHRob3VzYW5kcztcclxuXHJcbiAgICAgICAgLy8gSWYgY2hhciB0byBkZWxldGUgaXMgdGhvdXNhbmRzIGFuZCBudW1iZXIgaXMgbm90IHRvIGJlIGRlbGV0ZWQgLSBza2lwIG92ZXIgaXRcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gdGhvdXNhbmRzTmV4dCA/IDEgOiAwO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0SGFsZlN0YXJ0ID0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICArICh0aG91c2FuZHNOZXh0ID8gMCA6IDEpO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShsYXN0SGFsZlN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25CYWNrc3BhY2UgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcclxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBWRVJUSUNBTCBBUlJPVyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtzdGVwfSBIb3cgbXVjaCB0byBpbmNyZWFzZS9kZWNyZWFzZSB2YWx1ZSBieVxyXG4gICAqL1xyXG4gIG9uVmVydGljYWxBcnJvdzogZnVuY3Rpb24oa2V5SW5mbywgc3RlcCkge1xyXG4gICAgLy8gSWYgc3RlcCBpcyAwIChvciBmYWxzZXkpIHRoZW4gYXNzdW1lIGFycm93IGtleSB2YWx1ZSBjaGFuZ2luZyBpcyBkaXNhYmxlZFxyXG4gICAgaWYgKHN0ZXAgJiYgIWlzTmFOKHN0ZXApKSB7XHJcbiAgICAgIHN3aXRjaCAoa2V5SW5mby5rZXlOYW1lKSB7XHJcbiAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgLy8gVE9ETyAtIFVwIGFycm93IHN0ZXBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICAgICAgLy8gVE9ETyAtIERvd24gYXJyb3cgc3RlcFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIC8vIERvIG5vdGhpbmdcclxuICAgICAgfVxyXG4gICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVU5ETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSB1bmRvXHJcbiAgICovXHJcbiAgb25VbmRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5oaXN0b3J5LnVuZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBSRURPIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHJlZG9cclxuICAgKi9cclxuICBvblJlZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcclxuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Lmhpc3RvcnkucmVkbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbn1cclxuIiwiXHJcbmNvbnN0IE1BWF9CVUZGRVJfU0laRSA9IDUwO1xyXG5cclxuLyoqXHJcbiAqIFZhbHVlIEhpc3RvcnkgLSBNYW5hZ2VzIGFuIGFycmF5IG9mIHZhbHVlcyB0aGF0IGNhbiBiZSB0cmFja2VkLCBzdXBwb3J0aW5nXHJcbiAqIHRoZSB1bmRvIGFuZCByZWRvIG9wZXJhdGlvbnMgaW4gdGhlIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWx1ZUhpc3Rvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBbbnVsbF07XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBoaXN0b3J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50SW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xyXG4gIH1cclxuICBnZXQgY3VycmVudFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgfVxyXG5cclxuICBzZXQgY3VycmVudEluZGV4KGkpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGk7XHJcbiAgfVxyXG4gIHNldCBoaXN0b3J5KGhpc3RvcnkpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBoaXN0b3J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5kbyBjaGFuZ2UsIHNvIHJldHVybiB0byBwcmV2aW91cyB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogUmVkbyBjaGFuZ2UsIHNvIHJldHVybiB0byBuZXh0IHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQWRkIG5ldyB2YWx1ZSB0byBoaXN0b3J5IGFycmF5LiBBbnkgcG9zc2libGUgJ3JlZG8ncycgYXJlIHJlbW92ZWQgZnJvbSBhcnJheVxyXG4gICAqIGFzIGEgbmV3ICdicmFuY2gnIG9mIGhpc3RvcnkgaXMgY3JlYXRlZCB3aGVuIGEgbmV3IHZhbHVlIGlzIGFkZGVkXHJcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGFkZCB0byBoaXN0b3J5XHJcbiAgICovXHJcbiAgYWRkVmFsdWUodmFsKSB7XHJcbiAgICAvLyBEZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjdXJyZW50IHZhbHVlXHJcbiAgICBpZiAodmFsICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmhpc3Rvcnkuc3BsaWNlKHRoaXMuY3VycmVudEluZGV4ICsgMSwgbnVsbCwgdmFsKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gTUFYX0JVRkZFUl9TSVpFKSB7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5LnNoaWZ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbn1cclxuIl19
