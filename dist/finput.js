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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFLLFlBQVo7QUFDRDtBQUNEOzs7Ozs7MkJBR087QUFDTCxVQUFJLEtBQUssWUFBTCxHQUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQTlDLEVBQWlEO0FBQy9DLGFBQUssWUFBTDtBQUNEO0FBQ0QsYUFBTyxLQUFLLFlBQVo7QUFDRDtBQUNEOzs7Ozs7Ozs2QkFLUyxHLEVBQUs7QUFDWjtBQUNBLFVBQUksUUFBUSxLQUFLLFlBQWpCLEVBQStCO0FBQzdCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsS0FBSyxZQUFMLEdBQW9CLENBQXhDLEVBQTJDLElBQTNDLEVBQWlELEdBQWpEOztBQUVBLFlBQUksS0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixlQUExQixFQUEyQztBQUN6QyxlQUFLLE9BQUwsQ0FBYSxLQUFiO0FBQ0Q7QUFDRjs7QUFFRCxXQUFLLFlBQUwsR0FBb0IsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFzQixDQUExQzs7QUFFQSxhQUFPLEtBQUssWUFBWjtBQUNEOzs7d0JBckRhO0FBQ1osYUFBTyxLQUFLLFFBQVo7QUFDRCxLO3NCQVdXLE8sRUFBUztBQUNuQixXQUFLLFFBQUwsR0FBZ0IsT0FBaEI7QUFDRDs7O3dCQVprQjtBQUNqQixhQUFPLEtBQUssYUFBWjtBQUNELEs7c0JBS2dCLEMsRUFBRztBQUNsQixXQUFLLGFBQUwsR0FBcUIsQ0FBckI7QUFDRDs7O3dCQU5rQjtBQUNqQixhQUFPLEtBQUssT0FBTCxDQUFhLEtBQUssWUFBbEIsQ0FBUDtBQUNEOzs7Ozs7a0JBaEJrQixZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAnbGVmdCBjb21tYW5kJzogOTEsXG4gICdyaWdodCBjb21tYW5kJzogOTMsXG4gICdudW1wYWQgKic6IDEwNixcbiAgJ251bXBhZCArJzogMTA3LFxuICAnbnVtcGFkIC0nOiAxMDksXG4gICdudW1wYWQgLic6IDExMCxcbiAgJ251bXBhZCAvJzogMTExLFxuICAnbnVtIGxvY2snOiAxNDQsXG4gICdzY3JvbGwgbG9jayc6IDE0NSxcbiAgJ215IGNvbXB1dGVyJzogMTgyLFxuICAnbXkgY2FsY3VsYXRvcic6IDE4MyxcbiAgJzsnOiAxODYsXG4gICc9JzogMTg3LFxuICAnLCc6IDE4OCxcbiAgJy0nOiAxODksXG4gICcuJzogMTkwLFxuICAnLyc6IDE5MSxcbiAgJ2AnOiAxOTIsXG4gICdbJzogMjE5LFxuICAnXFxcXCc6IDIyMCxcbiAgJ10nOiAyMjEsXG4gIFwiJ1wiOiAyMjJcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzNCxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcclxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcclxuICBCQUNLU1BBQ0U6ICdCQUNLU1BBQ0UnLFxyXG4gIERFTEVURTogJ0RFTEVURScsXHJcbiAgVU5ETzogJ1VORE8nLFxyXG4gIFJFRE86ICdSRURPJyxcclxuICBIT01FOiAnSE9NRScsXHJcbiAgRU5EOiAnRU5EJyxcclxuICBUQUI6ICdUQUInXHJcbn1cclxuXHJcbmV4cG9ydHMuRFJBR19TVEFURVMgPSB7XHJcbiAgTk9ORTogJ05PTkUnLFxyXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxyXG4gIEVYVEVSTkFMOiAnRVhURVJOQUwnXHJcbn1cclxuXHJcbmV4cG9ydHMuUkFOR0UgPSB7XHJcbiAgQUxMOiAnQUxMJyxcclxuICBQT1NJVElWRTogJ1BPU0lUSVZFJ1xyXG59XHJcbiIsImltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xyXG5pbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENPTlNUQU5UU1xyXG4gKi9cclxuY29uc3QgREVGQVVMVFMgPSB7XHJcbiAgc2NhbGU6IDIsXHJcbiAgcmFuZ2U6IFJBTkdFLkFMTCxcclxuICBmaXhlZDogdHJ1ZSxcclxuICB0aG91c2FuZHM6ICcsJyxcclxuICBkZWNpbWFsOiAnLicsXHJcbiAgc2hvcnRjdXRzOiB7XHJcbiAgICAnayc6IDEwMDAsXHJcbiAgICAnbSc6IDEwMDAwMDAsXHJcbiAgICAnYic6IDEwMDAwMDAwMDBcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSU5QVVQgQ09NUE9ORU5UIENMQVNTXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuY2xhc3MgRmlucHV0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RPTSBFbGVtZW50fSBUaGUgbnVtYmVyIGlucHV0XHJcbiAgICogQHBhcmFtIHtPcHRpb25zfSBPcHRpb25zIGZvciB0aGUgbnVtYmVyIGlucHV0J3MgYmVoYXZpb3VyXHJcbiAgICpcclxuICAgKiBEZXRhaWxlZCBsaXN0IG9mIHBvc3NpYmxlIG9wdGlvbnM6XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNjYWxlfSBtYXhpbXVtIG51bWJlciBvZiBkZWNpbWFsIGRpZ2l0c1xyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5yYW5nZX0gV2hldGhlciBudW1iZXIgY2FuIHRha2UgYW55IHZhbHVlIG9yIG11c3QgYmUgcG9zaXRpdmVcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZml4ZWR9IEFmdGVyIGZvY3VzIGlzIGxvc3QgLSB2YWx1ZSBpcyBmb3JtYXR0ZWQgdG8gKnNjYWxlKiBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMudGhvdXNhbmRzfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgdGhvdXNhbmRzIHNlcGFyYXRvclxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5kZWNpbWFsfSBDaGFyYWN0ZXIgdG8gdXNlIGZvciB0aGUgZGVjaW1hbCBwb2ludFxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zaG9ydGN1dHN9IE9iamVjdCBtYXAgb2Ygc2hvcnRjdXQgY2hhcmFjdGVycyB0byBtdWx0aXBsaWVyIChlLmcuIHsgazogMTAwMCB9KVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgLi4uREVGQVVMVFMsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fYWN0aW9uVHlwZXMgPSB0aGlzLmNyZWF0ZUFjdGlvblR5cGVzKCk7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gbmV3IFZhbHVlSGlzdG9yeSgpO1xyXG5cclxuICAgIHRoaXMuX2xpc3RlbmVycyA9IHtcclxuICAgICAgYmx1cjogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRm9jdXNvdXQuYmluZCh0aGlzKSB9LFxyXG4gICAgICBmb2N1czogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25Gb2N1c2luLmJpbmQodGhpcykgfSxcclxuICAgICAgZHJvcDogICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJvcC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIHBhc3RlOiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vblBhc3RlLmJpbmQodGhpcykgfSxcclxuICAgICAga2V5ZG93bjogIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGlucHV0OiAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbklucHV0LmJpbmQodGhpcykgfSxcclxuXHJcbiAgICAgIGRyYWdzdGFydDogICAgeyBlbGVtZW50OiBkb2N1bWVudCwgaGFuZGxlcjogdGhpcy5vbkRyYWdzdGFydC5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGRyYWdlbmQ6ICAgIHsgZWxlbWVudDogZG9jdW1lbnQsIGhhbmRsZXI6IHRoaXMub25EcmFnZW5kLmJpbmQodGhpcykgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuICAgIGZvciAobGV0IGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XHJcbiAgICAgIHRoaXMuX2xpc3RlbmVyc1tlXS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZSwgdGhpcy5fbGlzdGVuZXJzW2VdLmhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBlbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG4gIGdldCBvcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBjb3JyZWN0IGFjdGlvbiB0eXBlIHRvIGNoYXIva2V5IGNvZGVzIGFycmF5IHdpdGggdGhlXHJcbiAgICogY29ycmVjdCBkZWNpbWFsIGFuZCB0aG91c2FuZCBzZXBhcmF0b3IgY2hhcmFjdGVycyAoZGVwZW5kaW5nIG9uIGxhbmd1YWdlKVxyXG4gICAqL1xyXG4gIGNyZWF0ZUFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5OVU1CRVIsXHJcbiAgICAgICAgbmFtZXM6IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTUlOVVMsXHJcbiAgICAgICAgbmFtZXM6IFsnLSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9NRSxcclxuICAgICAgICBuYW1lczogWydob21lJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5FTkQsXHJcbiAgICAgICAgbmFtZXM6IFsnZW5kJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5UQUIsXHJcbiAgICAgICAgbmFtZXM6IFsndGFiJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUNJTUFMLFxyXG4gICAgICAgIG5hbWVzOiBbdGhpcy5vcHRpb25zLmRlY2ltYWxdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMSU1JVEVSLFxyXG4gICAgICAgIG5hbWVzOiBbdGhpcy5vcHRpb25zLnRob3VzYW5kc11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5TSE9SVENVVCxcclxuICAgICAgICBuYW1lczogT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnNob3J0Y3V0cylcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5CQUNLU1BBQ0UsXHJcbiAgICAgICAgbmFtZXM6IFsnYmFja3NwYWNlJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxFVEUsXHJcbiAgICAgICAgbmFtZXM6IFsnZGVsZXRlJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XLFxyXG4gICAgICAgIG5hbWVzOiBbJ2xlZnQnLCAncmlnaHQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XLFxyXG4gICAgICAgIG5hbWVzOiBbJ3VwJywgJ2Rvd24nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlVORE8sXHJcbiAgICAgICAgbmFtZXM6IFsneiddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5SRURPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3knXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyB3aGF0IHR5cGUgb2YgYWN0aW9uIG5lZWRzIHRvIGJlIGRlYWx0IHdpdGggZnJvbSB0aGUgY3VycmVudFxyXG4gICAqIGtleWRvd24gZXZlbnQuIEUuZy4gdmVydGljYWwgYXJyb3cgcHJlc3NlZCwgbnVtYmVyIHByZXNzZWQgZXRjLi4uXHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIGdldEFjdGlvblR5cGUobmFtZSwgZSkge1xyXG4gICAgZm9yIChsZXQgYWN0aW9uVHlwZSBvZiB0aGlzLl9hY3Rpb25UeXBlcykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGFjdGlvblR5cGUubmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgY29uc3QgdHlwZU1hdGNoID0gaW5kZXggPiAtMTtcclxuXHJcbiAgICAgIGlmICh0eXBlTWF0Y2ggJiYgKGFjdGlvblR5cGUuY3RybCA/IGUuY3RybEtleSA6IHRydWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvblR5cGUudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFDVElPTl9UWVBFUy5VTktOT1dOO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG51bWVyaWNhbCB2YWx1ZSBvZiB0aGUgZ2l2ZW4gdmFsdWVcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gY29udmVydFxyXG4gICAqL1xyXG4gIGdldFJhd1ZhbHVlKHZhbCkge1xyXG4gICAgcmV0dXJuIE51bWJlcih0aGlzLmVsZW1lbnQudmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMub3B0aW9ucy50aG91c2FuZHMsICdnJyksICcnKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICogQHBhcmFtIHtub3ROdWxsfSBXaGVuIHRydWUsIHJlc3RyaWN0cyBzZXR0aW5nIHRoZSB2YWx1ZSBpZiBpdCBpcyBudWxsLlxyXG4gICAqL1xyXG4gIHNldFZhbHVlKHZhbCwgbm90TnVsbCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMpO1xyXG5cclxuICAgIGlmIChub3ROdWxsID8gdmFsIDogdHJ1ZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgdGhpcy5lbGVtZW50LnJhd1ZhbHVlID0gdGhpcy5nZXRSYXdWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gICAgICB0aGlzLl9oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYW5kIGZvcm1hdHMgdGhlIHZhbHVlIGZvciB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldFJhd1ZhbHVlKHZhbCkge1xyXG4gICAgbGV0IHZhbHVlO1xyXG4gICAgaWYgKCF2YWwpIHtcclxuICAgICAgdmFsdWUgPSAnJztcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbCkpIHtcclxuICAgICAgdmFsdWUgPSB2YWwudG9TdHJpbmcoKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgdmFsdWUgPSB2YWw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKHZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZShuZXdWYWx1ZSwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBFVkVOVCBIQU5ETEVSU1xyXG4gIC8vXHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzaW5nIE9VVCBvZiB0aGUgaW5wdXQgLSBmb3JtYXQgZnVsbHlcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c291dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBPVVQgZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXMgb2YgdGhlIGlucHV0IC0gU2VsZWN0IGFsbCB0ZXh0XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNpbihlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBJTiBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gMDtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQgPSB0aGlzLmVsZW1lbnQudmFsdWUubGVuZ3RoO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBkcm9wcGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXQgLSByZXBsYWNlIHRoZSBXSE9MRSB2YWx1ZVxyXG4gICAqIHdpdGggdGhpcyBuZXcgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyb3AoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJvcCBldmVudCcsIGUpO1xyXG4gICAgc3dpdGNoICh0aGlzLl9kcmFnU3RhdGUpIHtcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5JTlRFUk5BTDpcclxuICAgICAgICAvLyBUaGlzIGNhc2UgaXMgaGFuZGxlZCBieSB0aGUgJ29uSW5wdXQnIGZ1bmN0aW9uXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuRVhURVJOQUw6XHJcbiAgICAgICAgY29uc3QgdmFsID0gaGVscGVycy5wYXJzZVN0cmluZyhlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZSh2YWwsIHRydWUpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEbyBub3RoaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gc3RhcnQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ3N0YXJ0KGUpIHtcclxuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxyXG4gICAgICA/IERSQUdfU1RBVEVTLklOVEVSTkFMXHJcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLl9kcmFnU3RhdGUsIGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBlbmQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ2VuZChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIEVOREVEJywgdGhpcy5fZHJhZ1N0YXRlLCBlKTtcclxuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHBhc3Rpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBDbGlwYm9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvblBhc3RlKGUpIHtcclxuICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSwgdGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMuc2V0VmFsdWUodmFsLCB0cnVlKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcHJlc3NpbmcgYW55IGtleSBpbnNpZGUgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uS2V5ZG93bihlKSB7XHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkgPyBrZXljb2RlKGUpLnJlcGxhY2UoJ251bXBhZCAnLCAnJykgOiBudWxsLFxyXG4gICAgICBjYXJldFN0YXJ0OiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgbmV3VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSB0aGlzLmdldEFjdGlvblR5cGUoa2V5SW5mby5rZXlOYW1lLCBlKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25OdW1iZXIoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25NaW51cyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1c6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT01FOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5FTkQ6XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlRBQjpcclxuICAgICAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG4gICAgICAgIC8vIERlZmF1bHQgYmVoYXZpb3VyXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFTEVURTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlbGV0ZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgY29uc3QgY3VycmVudFZhbHVlID0ga2V5SW5mby5uZXdWYWx1ZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgIHRoaXMuZWxlbWVudC5yYXdWYWx1ZSA9IHRoaXMuZ2V0UmF3VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuXHJcbiAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcclxuICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcclxuICAgIHRoaXMuX2hpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBCYWNrdXAgZXZlbnQgaWYgaW5wdXQgY2hhbmdlcyBmb3IgYW55IG90aGVyIHJlYXNvbiwganVzdCBmb3JtYXQgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IEV2ZW50XHJcbiAgICovXHJcbiAgb25JbnB1dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdvbiBJTlBVVCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcmVtb3ZlTGlzdGVuZXJzKCkge1xyXG4gICAgZm9yIChsZXQgZSBpbiB0aGlzLl9saXN0ZW5lcnMpIHtcclxuICAgICAgdGhpcy5fbGlzdGVuZXJzW2VdLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl9saXN0ZW5lcnNbZV0uaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBGYWN0b3J5IGZ1bmN0aW9uXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuXHJcbiAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICB0aHJvdyAnSW5wdXQgZWxlbWVudCBtdXN0IGJlIHN1cHBsaWVkIGFzIGZpcnN0IGFyZ3VtZW50JztcclxuICB9XHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbmV3IEZpbnB1dChlbGVtZW50LCBvcHRpb25zIHx8IHt9KTtcclxuICBlbGVtZW50LnNldFJhd1ZhbHVlID0gKHYpID0+IGlucHV0LnNldFJhd1ZhbHVlKHYpO1xyXG4gIGVsZW1lbnQuc2V0VmFsdWUgPSAodikgPT4gaW5wdXQuc2V0VmFsdWUodik7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBpbnB1dC5yZW1vdmVMaXN0ZW5lcnMoKTtcclxuICAgIGRlbGV0ZSBlbGVtZW50LnNldFJhd1ZhbHVlO1xyXG4gICAgZGVsZXRlIGVsZW1lbnQuc2V0VmFsdWU7XHJcbiAgfVxyXG59O1xyXG4iLCJcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogRWRpdCBhIHN0cmluZyB3aXRoIGEgbmV3IHN0cmluZyB0byBhZGQuXHJcbiAqIEhhbmRsZXMgdGhlIGNhc2UgaWYgdGV4dCBpcyBoaWdobGlnaHRlZCBhbHNvLCBpbiB3aGljaCBjYXNlIHRoYXQgdGV4dFxyXG4gKiB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlICd0b0FkZCcgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnRzLmVkaXRTdHJpbmcgPSBmdW5jdGlvbihzdHIsIHRvQWRkLCBjYXJldFN0YXJ0LCBjYXJldEVuZCA9IGNhcmV0U3RhcnQpIHtcclxuICBjb25zdCBmaXJzdEhhbGYgPSBzdHIuc2xpY2UoMCwgY2FyZXRTdGFydCk7XHJcbiAgY29uc3Qgc2Vjb25kSGFsZiA9IHN0ci5zbGljZShjYXJldEVuZCwgc3RyLmxlbmd0aCk7XHJcbiAgcmV0dXJuIGAke2ZpcnN0SGFsZn0ke3RvQWRkfSR7c2Vjb25kSGFsZn1gO1xyXG59XHJcblxyXG5leHBvcnRzLmZvcm1hdFRob3VzYW5kcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGNvbnN0IHN0YXJ0SW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSAtIDFcclxuICAgIDogdmFsLmxlbmd0aCAtIDE7XHJcbiAgY29uc3QgZW5kSW5kZXggPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwO1xyXG5cclxuICAvLyBpIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8gYmVjYXVzZSBudW1iZXIgY2Fubm90IHN0YXJ0IHdpdGggY29tbWFcclxuICBsZXQgaSA9IHN0YXJ0SW5kZXg7XHJcbiAgbGV0IGogPSAxO1xyXG4gIGZvciAoaSwgajsgaSA+IGVuZEluZGV4OyBpLS0sIGorKykge1xyXG4gICAgLy8gRXZlcnkgMyBjaGFyYWNlcnMsIGFkZCBhIGNvbW1hXHJcbiAgICBpZiAoaiAlIDMgPT09IDApIHtcclxuICAgICAgdmFsID0gdGhpcy5lZGl0U3RyaW5nKHZhbCwgb3B0aW9ucy50aG91c2FuZHMsIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnRpYWxseSBmb3JtYXQgdGhlIHZhbHVlLCBvbmx5IGFkZGluZyBjb21tYXMgYXMgbmVlZGVkIChEb25lIG9uIGtleXByZXNzL2tleXVwKVxyXG4gKi9cclxuZXhwb3J0cy5wYXJ0aWFsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgdmFsID0gdmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKTtcclxuICB2YWwgPSB0aGlzLnJlbW92ZWxlYWRpbmdaZXJvcyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlRXh0cmFEZWNpbWFscyh2YWwsIG9wdGlvbnMpO1xyXG4gIHZhbCA9IHRoaXMuZm9ybWF0VGhvdXNhbmRzKHZhbCwgb3B0aW9ucyk7XHJcblxyXG4gIHJldHVybiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdWxseSBmb3JtYXQgdGhlIHZhbHVlXHJcbiAqL1xyXG5leHBvcnRzLmZ1bGxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB0aGlzLnBhcnRpYWxGb3JtYXQodmFsLCBvcHRpb25zKTtcclxuXHJcbiAgaWYgKHZhbCA9PSBudWxsIHx8IHZhbCA9PSAnJykge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgLy8gRnVsbHkgZm9ybWF0IGRlY2ltYWwgcGxhY2VzXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZShzaWduID8gMSA6IDAsIGRlY2ltYWxJbmRleCk7XHJcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBpZiAob3B0aW9ucy5maXhlZCkge1xyXG5cclxuICAgIC8vIElmIHRoZXJlIHNob3VsZCBiZSBzb21lIGRlY2ltYWxzXHJcbiAgICBpZiAob3B0aW9ucy5zY2FsZSA+IDApIHtcclxuICAgICAgZGVjaW1hbFBhcnQgPSBkZWNpbWFsUGFydC5sZW5ndGggPj0gb3B0aW9ucy5zY2FsZVxyXG4gICAgICAgID8gZGVjaW1hbFBhcnQuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSlcclxuICAgICAgICA6IGRlY2ltYWxQYXJ0ICsgQXJyYXkob3B0aW9ucy5zY2FsZSAtIGRlY2ltYWxQYXJ0Lmxlbmd0aCArIDEpLmpvaW4oJzAnKTtcclxuXHJcbiAgICAgIGlmICghaW50ZWdlclBhcnQubGVuZ3RoKSB7XHJcbiAgICAgICAgaW50ZWdlclBhcnQgPSAnMCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9JHtvcHRpb25zLmRlY2ltYWx9JHtkZWNpbWFsUGFydH1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH1gO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdmFsO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbnkgc3VycGx1cyB6ZXJvcyBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGludGVnZXIgcGFydCBvZiB0aGUgbnVtYmVyXHJcbiAqIEBwYXJhbSB7c3RyfSBUaGUgc3RyaW5nIHZhbHVlICh3aXRoIG5vIHRob3VzYW5kIHNlcGFyYXRvcnMpXHJcbiAqL1xyXG5leHBvcnRzLnJlbW92ZWxlYWRpbmdaZXJvcyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIC8vIFJlbW92ZSB1bm5lY2Vzc2FyeSB6ZXJvc1xyXG4gIGNvbnN0IGRlY2ltYWxJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpXHJcbiAgICA6IHZhbC5sZW5ndGg7XHJcblxyXG4gIGxldCBzaWduID0gdmFsWzBdID09PSAnLScgPyB2YWxbMF0gOiAnJztcclxuICBsZXQgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2Uoc2lnbiA/IDEgOiAwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbC5zbGljZShkZWNpbWFsSW5kZXggKyAxKTtcclxuXHJcbiAgbGV0IGkgPSAwO1xyXG5cclxuICB3aGlsZSAoXHJcbiAgICBpbnRlZ2VyUGFydFtpXSA9PSAwXHJcbiAgICAgICYmIGludGVnZXJQYXJ0W2kgKyAxXSAhPT0gb3B0aW9ucy5kZWNpbWFsXHJcbiAgICAgICYmIGludGVnZXJQYXJ0Lmxlbmd0aCA+IDFcclxuICApIHtcclxuICAgIGludGVnZXJQYXJ0ID0gaW50ZWdlclBhcnQuc2xpY2UoMCwgaSkgKyBpbnRlZ2VyUGFydC5zbGljZShpICsgMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuZXhwb3J0cy5yZW1vdmVFeHRyYURlY2ltYWxzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgY29uc3QgaW50ZWdlclBhcnQgPSB2YWwuc2xpY2UoMCwgZGVjaW1hbEluZGV4ICsgMSk7XHJcbiAgbGV0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpXHJcbiAgICAuc2xpY2UoMCwgb3B0aW9ucy5zY2FsZSA9PSBudWxsID8gZGVjaW1hbFBhcnQubGVuZ3RoIDogb3B0aW9ucy5zY2FsZSk7XHJcblxyXG4gIHJldHVybiBgJHtpbnRlZ2VyUGFydH0ke2RlY2ltYWxQYXJ0fWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgaG93IG1hbnkgY2hhcmFjdGVycyBoYXZlIGJlZW4gYWRkZWQgKG9yIHJlbW92ZWQpIGJlZm9yZSB0aGUgZ2l2ZW5cclxuICogY2FyZXQgcG9zaXRpb24gYWZ0ZXIgZm9ybWF0dGluZy4gQ2FyZXQgaXMgdGhlbiBhZGp1c3RlZCBieSB0aGUgcmV0dXJuZWQgb2Zmc2V0XHJcbiAqIEN1cnJlbmN5IHN5bWJvbCBvciB0aG91c2FuZCBzZXBhcmF0b3JzIG1heSBoYXZlIGJlZW4gYWRkZWRcclxuICovXHJcbmV4cG9ydHMuY2FsY3VsYXRlT2Zmc2V0ID0gZnVuY3Rpb24ocHJldiwgY3VyciwgcG9zLCBvcHRpb25zKSB7XHJcbiAgbGV0IGksIHByZXZTeW1ib2xzID0gMCwgY3VycmVudFN5bWJvbHMgPSAwO1xyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChwcmV2W2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBwcmV2U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAoY3VycltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMpIHtcclxuICAgICAgY3VycmVudFN5bWJvbHMrKztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnRTeW1ib2xzIC0gcHJldlN5bWJvbHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayAoaWYgdGhlIGNoYXIgaXMgYSB6ZXJvKSB3aGV0aGVyIG9yIG5vdCBhIHplcm8gY2FuIGJlIHBsYWNlZCBhdCB0aGlzXHJcbiAqIHBvc2l0aW9uIGluIHRoZSB2YWx1ZS4gSWYgaXQgaXMgYW4gdW5uY2Vzc2FyeSB6ZXJvIC0gZG8gbm90IGFsbG93IGl0XHJcbiAqIEBwYXJhbSB7dmFsfSB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0XHJcbiAqIEBwYXJhbSB7Y2hhcn0gdGhlIGNoYXJhY3RlciBiZWluZyBhZGRlZFxyXG4gKiBAcGFyYW0ge2NhcmV0UG9zfSBDdXJyZW50IGNhcmV0IHBvc2l0aW9uIGluIGlucHV0XHJcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnRzLmFsbG93ZWRaZXJvID0gZnVuY3Rpb24odmFsLCBjaGFyLCBjYXJldFBvcywgb3B0aW9ucykge1xyXG4gIGlmIChjaGFyICE9IDApIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgY29uc3QgaXNOZWdhdGl2ZSA9IHZhbFswXSA9PT0gJy0nO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgoaXNOZWdhdGl2ZSA/IDEgOiAwKSwgZGVjaW1hbEluZGV4KTtcclxuICBjYXJldFBvcyA9IGlzTmVnYXRpdmUgPyBjYXJldFBvcyAtIDEgOiBjYXJldFBvcztcclxuXHJcbiAgLy8gSWYgdGhlcmUgaXMgc29tZSBpbnRlZ2VyIHBhcnQgYW5kIHRoZSBjYXJldCBpcyB0byB0aGUgbGVmdCBvZlxyXG4gIC8vIHRoZSBkZWNpbWFsIHBvaW50XHJcbiAgaWYgKChpbnRlZ2VyUGFydC5sZW5ndGggPiAwKSAmJiAoY2FyZXRQb3MgPCBpbnRlZ2VyUGFydC5sZW5ndGggKyAxKSkge1xyXG4gICAgLy8gSUYgaW50ZWdlciBwYXJ0IGlzIGp1c3QgYSB6ZXJvIHRoZW4gbm8gemVyb3MgY2FuIGJlIGFkZGVkXHJcbiAgICAvLyBFTFNFIHRoZSB6ZXJvIGNhbiBub3QgYmUgYWRkZWQgYXQgdGhlIGZyb250IG9mIHRoZSB2YWx1ZVxyXG4gICAgcmV0dXJuIGludGVnZXJQYXJ0ID09IDAgPyBmYWxzZSA6IGNhcmV0UG9zID4gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIHN0cmluZyB2YWx1ZSB0byBpdHMgbnVtYmVyIGVxdWl2YWxlbnRcclxuICogQHBhcmFtIHt2YWx9IHN0cmluZyB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgbnVtYmVyXHJcbiAqIEBwYXJhbSB7b3B0aW9uc30gRmlucHV0IG9wdGlvbnMgb2JqZWN0XHJcbiAqL1xyXG5leHBvcnRzLnRvTnVtYmVyID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgcmV0dXJuIHZhbCAmJiBOdW1iZXIodmFsLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy50aG91c2FuZHN9XWAsICdnJyksICcnKSk7XHJcbn1cclxuXHJcbmV4cG9ydHMucGFyc2VTdHJpbmcgPSBmdW5jdGlvbihzdHIsIG9wdGlvbnMpIHtcclxuICBsZXQgbXVsdGlwbGllciA9IDE7XHJcbiAgbGV0IHBhcnNlZCA9ICcnO1xyXG5cclxuICBmb3IgKGxldCBjIG9mIHN0cikge1xyXG4gICAgLy8gSWYgYSBudW1iZXJcclxuICAgIGlmICghaXNOYU4oYykpIHtcclxuICAgICAgcGFyc2VkICs9IGM7XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIGRlY2ltYWwgKGFuZCBubyBkZWNpbWFscyBleGlzdCBzbyBmYXIpXHJcbiAgICBlbHNlIGlmIChjID09PSBvcHRpb25zLmRlY2ltYWwgJiYgcGFyc2VkLmluZGV4T2YoYykgPT09IC0xKSB7XHJcbiAgICAgIHBhcnNlZCArPSBvcHRpb25zLmRlY2ltYWw7XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIHNob3J0Y3V0XHJcbiAgICBlbHNlIGlmIChvcHRpb25zLnNob3J0Y3V0c1tjXSkge1xyXG4gICAgICBtdWx0aXBsaWVyICo9IG9wdGlvbnMuc2hvcnRjdXRzW2NdO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgYSBtaW51cyBzaWduIChhbmQgcGFyc2VkIHN0cmluZyBpcyBjdXJyZW50bHkgZW1wdHkpXHJcbiAgICBlbHNlIGlmIChjID09PSAnLScgJiYgIXBhcnNlZC5sZW5ndGgpIHtcclxuICAgICAgcGFyc2VkID0gYztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIE90aGVyd2lzZSBpZ25vcmUgdGhlIGNoYXJhY3RlclxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFwYXJzZWQubGVuZ3RoKSB7IHJldHVybiAnJyB9XHJcblxyXG4gIC8vIE5lZWQgdG8gZW5zdXJlIHRoYXQgZGVsaW1pdGVyIGlzIGEgJy4nIGJlZm9yZSBwYXJzaW5nIHRvIG51bWJlclxyXG4gIGNvbnN0IG5vcm1hbGlzZWROdW1iZXIgPSBOdW1iZXIocGFyc2VkLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7b3B0aW9ucy5kZWNpbWFsfV1gLCAnZycpLCAnLicpKTtcclxuICAvLyBUaGVuIHN3YXAgaXQgYmFjayBpblxyXG4gIGNvbnN0IGFkanVzdGVkID0gU3RyaW5nKG5vcm1hbGlzZWROdW1iZXIgKiBtdWx0aXBsaWVyKS5yZXBsYWNlKG5ldyBSZWdFeHAoYFtcXC5dYCwgJ2cnKSwgb3B0aW9ucy5kZWNpbWFsKTtcclxuICBjb25zdCB0b29MYXJnZSA9IGFkanVzdGVkLmluZGV4T2YoJ2UnKSAhPT0gLTE7XHJcblxyXG4gIGlmICh0b29MYXJnZSkge1xyXG4gICAgcmV0dXJuICcnXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBhZGp1c3RlZDtcclxuICB9XHJcbn1cclxuIiwiLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gICAgIEtFWSBIQU5ETEVSUyAgICAgLy9cclxuLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gQWxsIGZ1bmN0aW9ucyBkZWFsaW5nIHdpdGgga2V5cHJlc3NlcyAobGlzdGVuZWQgdG8gb24gdGhlIGtleWRvd24gZXZlbnQpXHJcbi8vIGFyZSBoZXJlLCB3aXRoIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCB0eXBlcyBvZiBrZXlcclxuXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5VTUJFUiBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIC8vIFJlbW92ZSBjaGFyYWN0ZXJzIGluIGN1cnJlbnQgc2VsZWN0aW9uXHJcbiAgICBjb25zdCB0ZW1wID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuXHJcbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cclxuICAgICAgIShrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSA9PT0gJy0nXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKVxyXG4gICAgICAmJiBoZWxwZXJzLmFsbG93ZWRaZXJvKHRlbXAsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZE51bWJlcikge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1JTlVTIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk1pbnVzOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtaW51c0FsbG93ZWQgPSBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYgKGtleUluZm8uY3VycmVudFZhbHVlWzBdICE9PSAnLScgfHwga2V5SW5mby5jYXJldEVuZCA+IDApXHJcbiAgICAgICYmIG9wdGlvbnMucmFuZ2UgIT09IFJBTkdFLlBPU0lUSVZFO1xyXG5cclxuICAgICBpZiAobWludXNBbGxvd2VkKSB7XHJcbiAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgJy0nLFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgICk7XHJcbiAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgICB9XHJcbiAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFQ0lNQUwgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvbkRlY2ltYWw6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlY2ltYWxJbmRleCA9IGtleUluZm8uY3VycmVudFZhbHVlLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXHJcbiAgICAvLyBBZGQgdGhlIGRlY2ltYWxcclxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cclxuICAgICAgb3B0aW9ucy5zY2FsZSA+IDBcclxuICAgICAgJiYgKGRlY2ltYWxJbmRleCA9PT0gLTFcclxuICAgICAgICAgIHx8IChkZWNpbWFsSW5kZXggPj0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICAgICAgJiYgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCkpXHJcblxyXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxyXG4gICAge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIG9wdGlvbnMuZGVjaW1hbCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICApO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU0hPUlRDVVQgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvblNob3J0Y3V0OiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gb3B0aW9ucy5zaG9ydGN1dHNba2V5SW5mby5rZXlOYW1lLnRvTG93ZXJDYXNlKCldIHx8IDE7XHJcbiAgICBjb25zdCBhZGp1c3RlZFZhbCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICBjb25zdCByYXdWYWx1ZSA9IChoZWxwZXJzLnRvTnVtYmVyKGFkanVzdGVkVmFsLCBvcHRpb25zKSB8fCAxKSAqIG11bHRpcGxpZXI7XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIpIHtcclxuICAgICAgLy8gSWYgbnVtYmVyIGNvbnRhaW5zICdlJyB0aGVuIGl0IGlzIHRvbyBsYXJnZSB0byBkaXNwbGF5XHJcbiAgICAgIGlmIChyYXdWYWx1ZS50b1N0cmluZygpLmluZGV4T2YoJ2UnKSA9PT0gLTEpIHtcclxuICAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gU3RyaW5nKHJhd1ZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSBrZXlJbmZvLm5ld1ZhbHVlLmxlbmd0aCArIE1hdGgubG9nMTAoMTAwMCk7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQkFDS1NQQUNFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQkVGT1JFIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XHJcbiAgICAgICAgbGV0IGNhcmV0SnVtcCA9IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XHJcblxyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0gJyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGFmdGVyIGl0XHJcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIHRob3VzYW5kcyBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZTdGFydCA9IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVU5ETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSB1bmRvXHJcbiAgICovXHJcbiAgb25VbmRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS5yZWRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxufVxyXG4iLCJcclxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gNTA7XHJcblxyXG4vKipcclxuICogVmFsdWUgSGlzdG9yeSAtIE1hbmFnZXMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHRyYWNrZWQsIHN1cHBvcnRpbmdcclxuICogdGhlIHVuZG8gYW5kIHJlZG8gb3BlcmF0aW9ucyBpbiB0aGUgaW5wdXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlSGlzdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IFtudWxsXTtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRJbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEluZGV4XTtcclxuICB9XHJcblxyXG4gIHNldCBjdXJyZW50SW5kZXgoaSkge1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaTtcclxuICB9XHJcbiAgc2V0IGhpc3RvcnkoaGlzdG9yeSkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIHByZXZpb3VzIHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZWRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIG5leHQgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgbmV3IHZhbHVlIHRvIGhpc3RvcnkgYXJyYXkuIEFueSBwb3NzaWJsZSAncmVkbydzJyBhcmUgcmVtb3ZlZCBmcm9tIGFycmF5XHJcbiAgICogYXMgYSBuZXcgJ2JyYW5jaCcgb2YgaGlzdG9yeSBpcyBjcmVhdGVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYWRkZWRcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gYWRkIHRvIGhpc3RvcnlcclxuICAgKi9cclxuICBhZGRWYWx1ZSh2YWwpIHtcclxuICAgIC8vIERlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGN1cnJlbnQgdmFsdWVcclxuICAgIGlmICh2YWwgIT09IHRoaXMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaGlzdG9yeS5zcGxpY2UodGhpcy5jdXJyZW50SW5kZXggKyAxLCBudWxsLCB2YWwpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiBNQVhfQlVGRkVSX1NJWkUpIHtcclxuICAgICAgICB0aGlzLmhpc3Rvcnkuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=
