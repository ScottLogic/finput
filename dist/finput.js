(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.finput = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.ACTION_TYPES = {
  NUMBER: 'NUMBER',
  SHORTCUT: 'SHORTCUT',
  DECIMAL: 'DECIMAL',
  DELIMITER: 'DELIMITER',
  MINUS: 'MINUS',
  UNKNOWN: 'UNKNOWN',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DELETE',
  UNDO: 'UNDO',
  REDO: 'REDO'
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

},{}],2:[function(require,module,exports){
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
  invalidKeyCallback: function invalidKeyCallback() {}

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
   * @param {Options.invalidKeyCallback} Function callback that will be called on an invalid keypress
   * @param {Options.onFocusinCallback} Function callback that will be called via the onFocusin event
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
     * Creates the invalidKeyInfo object used to call the invalidKeyCallback
     * function
     * @param {keyInfo} keyInfo object created in onKeyPress function
     */

  }, {
    key: 'createInvalidKeyInfo',
    value: function createInvalidKeyInfo(keyInfo) {
      return {
        event: keyInfo.event,
        keyName: keyInfo.keyName,
        code: keyInfo.code
      };
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
    value: function getRawValue() {
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
     * On focusing IN of the input
     * DEFAULT:  Select all text
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusin',
    value: function onFocusin(e) {
      if (this.options.onFocusinCallback) {
        
        var selection = this.options.onFocusinCallback(e);
        if (selection) {
          this.element.selectionStart = selection.start;
          this.element.selectionEnd = selection.end;
        }
      } else {
        
        this.element.selectionStart = 0;
        this.element.selectionEnd = this.element.value.length;
      }
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
        keyName: e.key.toLowerCase(),
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
          // all printable characters have a key with length of 1 
          // if a character has got this far it is an invalid character
          if (e.key.length === 1 && !e.ctrlKey) {
            this.options.invalidKeyCallback(this.createInvalidKeyInfo(keyInfo));
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

},{"./constants":1,"./helpers":3,"./keyHandlers":4,"./valueHistory":5}],3:[function(require,module,exports){
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

},{"./constants":1}],4:[function(require,module,exports){
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

},{"./constants":1,"./helpers":3}],5:[function(require,module,exports){
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

},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvbnN0YW50cy5qcyIsInNyY1xcZmlucHV0LmpzIiwic3JjXFxoZWxwZXJzLmpzIiwic3JjXFxrZXlIYW5kbGVycy5qcyIsInNyY1xcdmFsdWVIaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxRQUFRLFlBQVIsR0FBdUI7QUFDckIsVUFBUSxRQURhO0FBRXJCLFlBQVUsVUFGVztBQUdyQixXQUFTLFNBSFk7QUFJckIsYUFBVyxXQUpVO0FBS3JCLFNBQU8sT0FMYztBQU1yQixXQUFTLFNBTlk7QUFPckIsYUFBVyxXQVBVO0FBUXJCLFVBQVEsUUFSYTtBQVNyQixRQUFNLE1BVGU7QUFVckIsUUFBTTtBQVZlLENBQXZCOztBQWFBLFFBQVEsV0FBUixHQUFzQjtBQUNwQixRQUFNLE1BRGM7QUFFcEIsWUFBVSxVQUZVO0FBR3BCLFlBQVU7QUFIVSxDQUF0Qjs7QUFNQSxRQUFRLEtBQVIsR0FBZ0I7QUFDZCxPQUFLLEtBRFM7QUFFZCxZQUFVO0FBRkksQ0FBaEI7Ozs7Ozs7Ozs7Ozs7a0JDNlZlLFVBQVMsT0FBVCxFQUFrQixPQUFsQixFQUEyQjs7QUFFeEMsTUFBSSxDQUFDLE9BQUwsRUFBYztBQUNaLFVBQU0sa0RBQU47QUFDRDs7QUFFRCxNQUFNLFFBQVEsSUFBSSxNQUFKLENBQVcsT0FBWCxFQUFvQixXQUFXLEVBQS9CLENBQWQ7QUFDQSxVQUFRLFdBQVIsR0FBc0IsVUFBQyxDQUFEO0FBQUEsV0FBTyxNQUFNLFdBQU4sQ0FBa0IsQ0FBbEIsQ0FBUDtBQUFBLEdBQXRCO0FBQ0EsVUFBUSxRQUFSLEdBQW1CLFVBQUMsQ0FBRDtBQUFBLFdBQU8sTUFBTSxRQUFOLENBQWUsQ0FBZixDQUFQO0FBQUEsR0FBbkI7O0FBRUEsU0FBTyxZQUFNO0FBQ1gsVUFBTSxlQUFOO0FBQ0EsV0FBTyxRQUFRLFdBQWY7QUFDQSxXQUFPLFFBQVEsUUFBZjtBQUNE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Q0Q7QUFDRCxhQUFPLEtBQUssWUFBWjtBQUNEO0FBQ0Q7Ozs7OzsyQkFHTztBQUNMLFVBQUksS0FBSyxZQUFMLEdBQW9CLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsQ0FBOUMsRUFBaUQ7QUFDL0MsYUFBSyxZQUFMO0FBQ0Q7QUFDRCxhQUFPLEtBQUssWUFBWjtBQUNEO0FBQ0Q7Ozs7Ozs7OzZCQUtTLEcsRUFBSztBQUNaO0FBQ0EsVUFBSSxRQUFRLEtBQUssWUFBakIsRUFBK0I7QUFDN0IsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLFlBQUwsR0FBb0IsQ0FBeEMsRUFBMkMsSUFBM0MsRUFBaUQsR0FBakQ7O0FBRUEsWUFBSSxLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLGVBQTFCLEVBQTJDO0FBQ3pDLGVBQUssT0FBTCxDQUFhLEtBQWI7QUFDRDtBQUNGOztBQUVELFdBQUssWUFBTCxHQUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLENBQTFDOztBQUVBLGFBQU8sS0FBSyxZQUFaO0FBQ0Q7Ozt3QkFyRGE7QUFDWixhQUFPLEtBQUssUUFBWjtBQUNELEs7c0JBV1csTyxFQUFTO0FBQ25CLFdBQUssUUFBTCxHQUFnQixPQUFoQjtBQUNEOzs7d0JBWmtCO0FBQ2pCLGFBQU8sS0FBSyxhQUFaO0FBQ0QsSztzQkFLZ0IsQyxFQUFHO0FBQ2xCLFdBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNEOzs7d0JBTmtCO0FBQ2pCLGFBQU8sS0FBSyxPQUFMLENBQWEsS0FBSyxZQUFsQixDQUFQO0FBQ0Q7Ozs7OztrQkFoQmtCLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEJBQ0tTUEFDRTogJ0JBQ0tTUEFDRScsXHJcbiAgREVMRVRFOiAnREVMRVRFJyxcclxuICBVTkRPOiAnVU5ETycsXHJcbiAgUkVETzogJ1JFRE8nLFxyXG59XHJcblxyXG5leHBvcnRzLkRSQUdfU1RBVEVTID0ge1xyXG4gIE5PTkU6ICdOT05FJyxcclxuICBJTlRFUk5BTDogJ0lOVEVSTkFMJyxcclxuICBFWFRFUk5BTDogJ0VYVEVSTkFMJ1xyXG59XHJcblxyXG5leHBvcnRzLlJBTkdFID0ge1xyXG4gIEFMTDogJ0FMTCcsXHJcbiAgUE9TSVRJVkU6ICdQT1NJVElWRSdcclxufVxyXG4iLCJpbXBvcnQga2V5SGFuZGxlcnMgZnJvbSAnLi9rZXlIYW5kbGVycyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCBWYWx1ZUhpc3RvcnkgZnJvbSAnLi92YWx1ZUhpc3RvcnknO1xyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVMsIFJBTkdFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogQ09OU1RBTlRTXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUUyA9IHtcclxuICBzY2FsZTogMixcclxuICByYW5nZTogUkFOR0UuQUxMLFxyXG4gIGZpeGVkOiB0cnVlLFxyXG4gIHRob3VzYW5kczogJywnLFxyXG4gIGRlY2ltYWw6ICcuJyxcclxuICBzaG9ydGN1dHM6IHtcclxuICAgICdrJzogMTAwMCxcclxuICAgICdtJzogMTAwMDAwMCxcclxuICAgICdiJzogMTAwMDAwMDAwMFxyXG4gIH0sXHJcbiAgaW52YWxpZEtleUNhbGxiYWNrOiAoKSA9PiB7fVxyXG59XHJcblxyXG4vKipcclxuICogRklOUFVUIENPTVBPTkVOVCBDTEFTU1xyXG4gKiBAY2xhc3NcclxuICovXHJcbmNsYXNzIEZpbnB1dCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtET00gRWxlbWVudH0gVGhlIG51bWJlciBpbnB1dFxyXG4gICAqIEBwYXJhbSB7T3B0aW9uc30gT3B0aW9ucyBmb3IgdGhlIG51bWJlciBpbnB1dCdzIGJlaGF2aW91clxyXG4gICAqXHJcbiAgICogRGV0YWlsZWQgbGlzdCBvZiBwb3NzaWJsZSBvcHRpb25zOlxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5zY2FsZX0gbWF4aW11bSBudW1iZXIgb2YgZGVjaW1hbCBkaWdpdHNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMucmFuZ2V9IFdoZXRoZXIgbnVtYmVyIGNhbiB0YWtlIGFueSB2YWx1ZSBvciBtdXN0IGJlIHBvc2l0aXZlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmZpeGVkfSBBZnRlciBmb2N1cyBpcyBsb3N0IC0gdmFsdWUgaXMgZm9ybWF0dGVkIHRvICpzY2FsZSogbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnRob3VzYW5kc30gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZGVjaW1hbH0gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIGRlY2ltYWwgcG9pbnRcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuc2hvcnRjdXRzfSBPYmplY3QgbWFwIG9mIHNob3J0Y3V0IGNoYXJhY3RlcnMgdG8gbXVsdGlwbGllciAoZS5nLiB7IGs6IDEwMDAgfSlcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuaW52YWxpZEtleUNhbGxiYWNrfSBGdW5jdGlvbiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uIGFuIGludmFsaWQga2V5cHJlc3NcclxuICAgKiBAcGFyYW0ge09wdGlvbnMub25Gb2N1c2luQ2FsbGJhY2t9IEZ1bmN0aW9uIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgdmlhIHRoZSBvbkZvY3VzaW4gZXZlbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB7XHJcbiAgICAgIC4uLkRFRkFVTFRTLFxyXG4gICAgICAuLi5vcHRpb25zXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2FjdGlvblR5cGVzID0gdGhpcy5jcmVhdGVBY3Rpb25UeXBlcygpO1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IG5ldyBWYWx1ZUhpc3RvcnkoKTtcclxuXHJcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7XHJcbiAgICAgIGJsdXI6ICAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkZvY3Vzb3V0LmJpbmQodGhpcykgfSxcclxuICAgICAgZm9jdXM6ICAgIHsgZWxlbWVudDogdGhpcy5lbGVtZW50LCBoYW5kbGVyOiB0aGlzLm9uRm9jdXNpbi5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGRyb3A6ICAgICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbkRyb3AuYmluZCh0aGlzKSB9LFxyXG4gICAgICBwYXN0ZTogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25QYXN0ZS5iaW5kKHRoaXMpIH0sXHJcbiAgICAgIGtleWRvd246ICB7IGVsZW1lbnQ6IHRoaXMuZWxlbWVudCwgaGFuZGxlcjogdGhpcy5vbktleWRvd24uYmluZCh0aGlzKSB9LFxyXG4gICAgICBpbnB1dDogICAgeyBlbGVtZW50OiB0aGlzLmVsZW1lbnQsIGhhbmRsZXI6IHRoaXMub25JbnB1dC5iaW5kKHRoaXMpIH0sXHJcblxyXG4gICAgICBkcmFnc3RhcnQ6ICAgIHsgZWxlbWVudDogZG9jdW1lbnQsIGhhbmRsZXI6IHRoaXMub25EcmFnc3RhcnQuYmluZCh0aGlzKSB9LFxyXG4gICAgICBkcmFnZW5kOiAgICB7IGVsZW1lbnQ6IGRvY3VtZW50LCBoYW5kbGVyOiB0aGlzLm9uRHJhZ2VuZC5iaW5kKHRoaXMpIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXR1cCBsaXN0ZW5lcnNcclxuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKCk7XHJcbiAgICBmb3IgKGxldCBlIGluIHRoaXMuX2xpc3RlbmVycykge1xyXG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZV0uZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGUsIHRoaXMuX2xpc3RlbmVyc1tlXS5oYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgZWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gIH1cclxuICBnZXQgb3B0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZSB0byBjaGFyL2tleSBjb2RlcyBhcnJheSB3aXRoIHRoZVxyXG4gICAqIGNvcnJlY3QgZGVjaW1hbCBhbmQgdGhvdXNhbmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgKGRlcGVuZGluZyBvbiBsYW5ndWFnZSlcclxuICAgKi9cclxuICBjcmVhdGVBY3Rpb25UeXBlcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTlVNQkVSLFxyXG4gICAgICAgIG5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk1JTlVTLFxyXG4gICAgICAgIG5hbWVzOiBbJy0nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlVORE8sXHJcbiAgICAgICAgbmFtZXM6IFsneiddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5SRURPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3knXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgaW52YWxpZEtleUluZm8gb2JqZWN0IHVzZWQgdG8gY2FsbCB0aGUgaW52YWxpZEtleUNhbGxiYWNrXHJcbiAgICogZnVuY3Rpb25cclxuICAgKiBAcGFyYW0ge2tleUluZm99IGtleUluZm8gb2JqZWN0IGNyZWF0ZWQgaW4gb25LZXlQcmVzcyBmdW5jdGlvblxyXG4gICAqL1xyXG4gIGNyZWF0ZUludmFsaWRLZXlJbmZvKGtleUluZm8pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGV2ZW50OiBrZXlJbmZvLmV2ZW50LFxyXG4gICAgICBrZXlOYW1lOiBrZXlJbmZvLmtleU5hbWUsXHJcbiAgICAgIGNvZGU6IGtleUluZm8uY29kZVxyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuX2FjdGlvblR5cGVzKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gYWN0aW9uVHlwZS5uYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBjb25zdCB0eXBlTWF0Y2ggPSBpbmRleCA+IC0xO1xyXG5cclxuICAgICAgaWYgKHR5cGVNYXRjaCAmJiAoYWN0aW9uVHlwZS5jdHJsID8gZS5jdHJsS2V5IDogdHJ1ZSkpIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uVHlwZS50eXBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQUNUSU9OX1RZUEVTLlVOS05PV047XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgbnVtZXJpY2FsIHZhbHVlIG9mIHRoZSBnaXZlbiB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBjb252ZXJ0XHJcbiAgICovXHJcbiAgZ2V0UmF3VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyKHRoaXMuZWxlbWVudC52YWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5vcHRpb25zLnRob3VzYW5kcywgJ2cnKSwgJycpKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB2YWx1ZSwgZnVsbHkgZm9ybWF0dGVkLCBmb3IgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHt2YWx9IE5ldyB2YWx1ZSB0byBzZXRcclxuICAgKiBAcGFyYW0ge25vdE51bGx9IFdoZW4gdHJ1ZSwgcmVzdHJpY3RzIHNldHRpbmcgdGhlIHZhbHVlIGlmIGl0IGlzIG51bGwuXHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsLCBub3ROdWxsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG5vdE51bGwgPyB2YWwgOiB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICB0aGlzLmVsZW1lbnQucmF3VmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgICAgIHRoaXMuX2hpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhbmQgZm9ybWF0cyB0aGUgdmFsdWUgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0UmF3VmFsdWUodmFsKSB7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBpZiAoIXZhbCkge1xyXG4gICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICB2YWx1ZSA9IHZhbC50b1N0cmluZygpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IHZhbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFyc2VTdHJpbmcodmFsdWUsIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLnNldFZhbHVlKG5ld1ZhbHVlLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIEVWRU5UIEhBTkRMRVJTXHJcbiAgLy9cclxuXHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXNpbmcgT1VUIG9mIHRoZSBpbnB1dCAtIGZvcm1hdCBmdWxseVxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3Vzb3V0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0ZvY3VzIE9VVCBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBmb2N1c2luZyBJTiBvZiB0aGUgaW5wdXRcclxuICAgKiBERUZBVUxUOiAgU2VsZWN0IGFsbCB0ZXh0XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNpbihlKSB7XHJcbiAgICBpZih0aGlzLm9wdGlvbnMub25Gb2N1c2luQ2FsbGJhY2spe1xyXG4gICAgICBjb25zb2xlLmRlYnVnKCdDdXN0b20gRm9jdXMgSU4gZXZlbnQnLCBlKTtcclxuICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5vbkZvY3VzaW5DYWxsYmFjayhlKTtcclxuICAgICAgaWYoc2VsZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb24uc3RhcnQ7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbi5lbmQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBJTiBldmVudCcsIGUpO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcclxuICAgKiB3aXRoIHRoaXMgbmV3IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcclxuICAgIHN3aXRjaCAodGhpcy5fZHJhZ1N0YXRlKSB7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuSU5URVJOQUw6XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLkVYVEVSTkFMOlxyXG4gICAgICAgIGNvbnN0IHZhbCA9IGhlbHBlcnMucGFyc2VTdHJpbmcoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUodmFsLCB0cnVlKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG8gbm90aGluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHN0YXJ0IG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdzdGFydChlKSB7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSAoZS50YXJnZXQgPT09IHRoaXMuZWxlbWVudClcclxuICAgICAgPyBEUkFHX1NUQVRFUy5JTlRFUk5BTFxyXG4gICAgICA6IERSQUdfU1RBVEVTLkVYVEVSTkFMO1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBTVEFSVEVEJywgdGhpcy5fZHJhZ1N0YXRlLCBlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZW5kIG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdlbmQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBFTkRFRCcsIHRoaXMuX2RyYWdTdGF0ZSwgZSk7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSBEUkFHX1NUQVRFUy5OT05FO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwYXN0aW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gQ2xpcGJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25QYXN0ZShlKSB7XHJcbiAgICBjb25zdCB2YWwgPSBoZWxwZXJzLnBhcnNlU3RyaW5nKGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0JyksIHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHZhbCwgdHJ1ZSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHByZXNzaW5nIGFueSBrZXkgaW5zaWRlIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvbktleWRvd24oZSkge1xyXG4gICAgY29uc3Qga2V5SW5mbyA9IHtcclxuICAgICAgZXZlbnQ6IGUsXHJcbiAgICAgIGNvZGU6IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxyXG4gICAgICBrZXlOYW1lOiBlLmtleS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgICBjYXJldFN0YXJ0OiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgbmV3VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSB0aGlzLmdldEFjdGlvblR5cGUoa2V5SW5mby5rZXlOYW1lLCBlKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25OdW1iZXIoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25NaW51cyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkJhY2tzcGFjZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVsZXRlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVW5kbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25SZWRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBhbGwgcHJpbnRhYmxlIGNoYXJhY3RlcnMgaGF2ZSBhIGtleSB3aXRoIGxlbmd0aCBvZiAxIFxyXG4gICAgICAgIC8vIGlmIGEgY2hhcmFjdGVyIGhhcyBnb3QgdGhpcyBmYXIgaXQgaXMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcclxuICAgICAgICBpZihlLmtleS5sZW5ndGggPT09IDEgJiYgIWUuY3RybEtleSl7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuaW52YWxpZEtleUNhbGxiYWNrKHRoaXMuY3JlYXRlSW52YWxpZEtleUluZm8oa2V5SW5mbykpO1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLnBhcnRpYWxGb3JtYXQoa2V5SW5mby5uZXdWYWx1ZSwgdGhpcy5vcHRpb25zKTtcclxuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGtleUluZm8ubmV3VmFsdWU7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB0aGlzLmVsZW1lbnQucmF3VmFsdWUgPSB0aGlzLmdldFJhd1ZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcblxyXG4gICAgY29uc3Qgb2Zmc2V0ID0gaGVscGVycy5jYWxjdWxhdGVPZmZzZXQoXHJcbiAgICAgIGN1cnJlbnRWYWx1ZSxcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgKTtcclxuICAgIGNvbnN0IG5ld0NhcmV0UG9zID0ga2V5SW5mby5jYXJldFN0YXJ0ICsgb2Zmc2V0O1xyXG4gICAgdGhpcy5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKG5ld0NhcmV0UG9zLCBuZXdDYXJldFBvcyk7XHJcbiAgICB0aGlzLl9oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICB9ICBcclxuICAvKipcclxuICAgKiBCYWNrdXAgZXZlbnQgaWYgaW5wdXQgY2hhbmdlcyBmb3IgYW55IG90aGVyIHJlYXNvbiwganVzdCBmb3JtYXQgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IEV2ZW50XHJcbiAgICovXHJcbiAgb25JbnB1dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdvbiBJTlBVVCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSB0aGUgaW5wdXRcclxuICAgKi9cclxuICByZW1vdmVMaXN0ZW5lcnMoKSB7XHJcbiAgICBmb3IgKGxldCBlIGluIHRoaXMuX2xpc3RlbmVycykge1xyXG4gICAgICB0aGlzLl9saXN0ZW5lcnNbZV0uZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHRoaXMuX2xpc3RlbmVyc1tlXS5oYW5kbGVyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEZhY3RvcnkgZnVuY3Rpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xyXG5cclxuICBpZiAoIWVsZW1lbnQpIHtcclxuICAgIHRocm93ICdJbnB1dCBlbGVtZW50IG11c3QgYmUgc3VwcGxpZWQgYXMgZmlyc3QgYXJndW1lbnQnO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5wdXQgPSBuZXcgRmlucHV0KGVsZW1lbnQsIG9wdGlvbnMgfHwge30pO1xyXG4gIGVsZW1lbnQuc2V0UmF3VmFsdWUgPSAodikgPT4gaW5wdXQuc2V0UmF3VmFsdWUodik7XHJcbiAgZWxlbWVudC5zZXRWYWx1ZSA9ICh2KSA9PiBpbnB1dC5zZXRWYWx1ZSh2KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGlucHV0LnJlbW92ZUxpc3RlbmVycygpO1xyXG4gICAgZGVsZXRlIGVsZW1lbnQuc2V0UmF3VmFsdWU7XHJcbiAgICBkZWxldGUgZWxlbWVudC5zZXRWYWx1ZTtcclxuICB9XHJcbn07XHJcbiIsIlxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cclxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XHJcbiAqIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgJ3RvQWRkJyBzdHJpbmdcclxuICovXHJcbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xyXG4gIGNvbnN0IGZpcnN0SGFsZiA9IHN0ci5zbGljZSgwLCBjYXJldFN0YXJ0KTtcclxuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcclxuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XHJcbn1cclxuXHJcbmV4cG9ydHMuZm9ybWF0VGhvdXNhbmRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgY29uc3Qgc3RhcnRJbmRleCA9IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxyXG4gICAgOiB2YWwubGVuZ3RoIC0gMTtcclxuICBjb25zdCBlbmRJbmRleCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDA7XHJcblxyXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxyXG4gIGxldCBpID0gc3RhcnRJbmRleDtcclxuICBsZXQgaiA9IDE7XHJcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XHJcbiAgICAvLyBFdmVyeSAzIGNoYXJhY2VycywgYWRkIGEgY29tbWFcclxuICAgIGlmIChqICUgMyA9PT0gMCkge1xyXG4gICAgICB2YWwgPSB0aGlzLmVkaXRTdHJpbmcodmFsLCBvcHRpb25zLnRob3VzYW5kcywgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogUGFydGlhbGx5IGZvcm1hdCB0aGUgdmFsdWUsIG9ubHkgYWRkaW5nIGNvbW1hcyBhcyBuZWVkZWQgKERvbmUgb24ga2V5cHJlc3Mva2V5dXApXHJcbiAqL1xyXG5leHBvcnRzLnBhcnRpYWxGb3JtYXQgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICB2YWwgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpO1xyXG4gIHZhbCA9IHRoaXMucmVtb3ZlbGVhZGluZ1plcm9zKHZhbCwgb3B0aW9ucyk7XHJcbiAgdmFsID0gdGhpcy5yZW1vdmVFeHRyYURlY2ltYWxzKHZhbCwgb3B0aW9ucyk7XHJcbiAgdmFsID0gdGhpcy5mb3JtYXRUaG91c2FuZHModmFsLCBvcHRpb25zKTtcclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bGx5IGZvcm1hdCB0aGUgdmFsdWVcclxuICovXHJcbmV4cG9ydHMuZnVsbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIHZhbCA9IHRoaXMucGFydGlhbEZvcm1hdCh2YWwsIG9wdGlvbnMpO1xyXG5cclxuICBpZiAodmFsID09IG51bGwgfHwgdmFsID09ICcnKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICAvLyBGdWxseSBmb3JtYXQgZGVjaW1hbCBwbGFjZXNcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBsZXQgc2lnbiA9IHZhbFswXSA9PT0gJy0nID8gdmFsWzBdIDogJyc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKHNpZ24gPyAxIDogMCwgZGVjaW1hbEluZGV4KTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSk7XHJcblxyXG4gIGlmIChvcHRpb25zLmZpeGVkKSB7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgc2hvdWxkIGJlIHNvbWUgZGVjaW1hbHNcclxuICAgIGlmIChvcHRpb25zLnNjYWxlID4gMCkge1xyXG4gICAgICBkZWNpbWFsUGFydCA9IGRlY2ltYWxQYXJ0Lmxlbmd0aCA+PSBvcHRpb25zLnNjYWxlXHJcbiAgICAgICAgPyBkZWNpbWFsUGFydC5zbGljZSgwLCBvcHRpb25zLnNjYWxlKVxyXG4gICAgICAgIDogZGVjaW1hbFBhcnQgKyBBcnJheShvcHRpb25zLnNjYWxlIC0gZGVjaW1hbFBhcnQubGVuZ3RoICsgMSkuam9pbignMCcpO1xyXG5cclxuICAgICAgaWYgKCFpbnRlZ2VyUGFydC5sZW5ndGgpIHtcclxuICAgICAgICBpbnRlZ2VyUGFydCA9ICcwJztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGAke3NpZ259JHtpbnRlZ2VyUGFydH0ke29wdGlvbnMuZGVjaW1hbH0ke2RlY2ltYWxQYXJ0fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7c2lnbn0ke2ludGVnZXJQYXJ0fWA7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB2YWw7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFueSBzdXJwbHVzIHplcm9zIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgaW50ZWdlciBwYXJ0IG9mIHRoZSBudW1iZXJcclxuICogQHBhcmFtIHtzdHJ9IFRoZSBzdHJpbmcgdmFsdWUgKHdpdGggbm8gdGhvdXNhbmQgc2VwYXJhdG9ycylcclxuICovXHJcbmV4cG9ydHMucmVtb3ZlbGVhZGluZ1plcm9zID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgLy8gUmVtb3ZlIHVubmVjZXNzYXJ5IHplcm9zXHJcbiAgY29uc3QgZGVjaW1hbEluZGV4ID0gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSA+IC0xXHJcbiAgICA/IHZhbC5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbClcclxuICAgIDogdmFsLmxlbmd0aDtcclxuXHJcbiAgbGV0IHNpZ24gPSB2YWxbMF0gPT09ICctJyA/IHZhbFswXSA6ICcnO1xyXG4gIGxldCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZShzaWduID8gMSA6IDAsIGRlY2ltYWxJbmRleCArIDEpO1xyXG4gIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsLnNsaWNlKGRlY2ltYWxJbmRleCArIDEpO1xyXG5cclxuICBsZXQgaSA9IDA7XHJcblxyXG4gIHdoaWxlIChcclxuICAgIGludGVnZXJQYXJ0W2ldID09IDBcclxuICAgICAgJiYgaW50ZWdlclBhcnRbaSArIDFdICE9PSBvcHRpb25zLmRlY2ltYWxcclxuICAgICAgJiYgaW50ZWdlclBhcnQubGVuZ3RoID4gMVxyXG4gICkge1xyXG4gICAgaW50ZWdlclBhcnQgPSBpbnRlZ2VyUGFydC5zbGljZSgwLCBpKSArIGludGVnZXJQYXJ0LnNsaWNlKGkgKyAxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBgJHtzaWdufSR7aW50ZWdlclBhcnR9JHtkZWNpbWFsUGFydH1gO1xyXG59XHJcblxyXG5leHBvcnRzLnJlbW92ZUV4dHJhRGVjaW1hbHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbC5zbGljZSgwLCBkZWNpbWFsSW5kZXggKyAxKTtcclxuICBsZXQgZGVjaW1hbFBhcnQgPSB2YWwuc2xpY2UoZGVjaW1hbEluZGV4ICsgMSlcclxuICAgIC5zbGljZSgwLCBvcHRpb25zLnNjYWxlID09IG51bGwgPyBkZWNpbWFsUGFydC5sZW5ndGggOiBvcHRpb25zLnNjYWxlKTtcclxuXHJcbiAgcmV0dXJuIGAke2ludGVnZXJQYXJ0fSR7ZGVjaW1hbFBhcnR9YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIHRob3VzYW5kIHNlcGFyYXRvcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIG9wdGlvbnMpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzKSB7XHJcbiAgICAgIHByZXZTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChjdXJyW2ldID09PSBvcHRpb25zLnRob3VzYW5kcykge1xyXG4gICAgICBjdXJyZW50U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY3VycmVudFN5bWJvbHMgLSBwcmV2U3ltYm9scztcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrIChpZiB0aGUgY2hhciBpcyBhIHplcm8pIHdoZXRoZXIgb3Igbm90IGEgemVybyBjYW4gYmUgcGxhY2VkIGF0IHRoaXNcclxuICogcG9zaXRpb24gaW4gdGhlIHZhbHVlLiBJZiBpdCBpcyBhbiB1bm5jZXNzYXJ5IHplcm8gLSBkbyBub3QgYWxsb3cgaXRcclxuICogQHBhcmFtIHt2YWx9IHZhbHVlIHRvIGNoZWNrIGFnYWluc3RcclxuICogQHBhcmFtIHtjaGFyfSB0aGUgY2hhcmFjdGVyIGJlaW5nIGFkZGVkXHJcbiAqIEBwYXJhbSB7Y2FyZXRQb3N9IEN1cnJlbnQgY2FyZXQgcG9zaXRpb24gaW4gaW5wdXRcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMuYWxsb3dlZFplcm8gPSBmdW5jdGlvbih2YWwsIGNoYXIsIGNhcmV0UG9zLCBvcHRpb25zKSB7XHJcbiAgaWYgKGNoYXIgIT0gMCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWNpbWFsSW5kZXggPSB2YWwuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gdmFsLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKVxyXG4gICAgOiB2YWwubGVuZ3RoO1xyXG5cclxuICBjb25zdCBpc05lZ2F0aXZlID0gdmFsWzBdID09PSAnLSc7XHJcbiAgbGV0IGludGVnZXJQYXJ0ID0gdmFsLnNsaWNlKChpc05lZ2F0aXZlID8gMSA6IDApLCBkZWNpbWFsSW5kZXgpO1xyXG4gIGNhcmV0UG9zID0gaXNOZWdhdGl2ZSA/IGNhcmV0UG9zIC0gMSA6IGNhcmV0UG9zO1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBzb21lIGludGVnZXIgcGFydCBhbmQgdGhlIGNhcmV0IGlzIHRvIHRoZSBsZWZ0IG9mXHJcbiAgLy8gdGhlIGRlY2ltYWwgcG9pbnRcclxuICBpZiAoKGludGVnZXJQYXJ0Lmxlbmd0aCA+IDApICYmIChjYXJldFBvcyA8IGludGVnZXJQYXJ0Lmxlbmd0aCArIDEpKSB7XHJcbiAgICAvLyBJRiBpbnRlZ2VyIHBhcnQgaXMganVzdCBhIHplcm8gdGhlbiBubyB6ZXJvcyBjYW4gYmUgYWRkZWRcclxuICAgIC8vIEVMU0UgdGhlIHplcm8gY2FuIG5vdCBiZSBhZGRlZCBhdCB0aGUgZnJvbnQgb2YgdGhlIHZhbHVlXHJcbiAgICByZXR1cm4gaW50ZWdlclBhcnQgPT0gMCA/IGZhbHNlIDogY2FyZXRQb3MgPiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHZhbHVlIHRvIGl0cyBudW1iZXIgZXF1aXZhbGVudFxyXG4gKiBAcGFyYW0ge3ZhbH0gc3RyaW5nIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBudW1iZXJcclxuICogQHBhcmFtIHtvcHRpb25zfSBGaW5wdXQgb3B0aW9ucyBvYmplY3RcclxuICovXHJcbmV4cG9ydHMudG9OdW1iZXIgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcclxuICByZXR1cm4gdmFsICYmIE51bWJlcih2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpKTtcclxufVxyXG5cclxuZXhwb3J0cy5wYXJzZVN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucykge1xyXG4gIGxldCBtdWx0aXBsaWVyID0gMTtcclxuICBsZXQgcGFyc2VkID0gJyc7XHJcblxyXG4gIGZvciAobGV0IGMgb2Ygc3RyKSB7XHJcbiAgICAvLyBJZiBhIG51bWJlclxyXG4gICAgaWYgKCFpc05hTihjKSkge1xyXG4gICAgICBwYXJzZWQgKz0gYztcclxuICAgIH1cclxuICAgIC8vIElmIGEgZGVjaW1hbCAoYW5kIG5vIGRlY2ltYWxzIGV4aXN0IHNvIGZhcilcclxuICAgIGVsc2UgaWYgKGMgPT09IG9wdGlvbnMuZGVjaW1hbCAmJiBwYXJzZWQuaW5kZXhPZihjKSA9PT0gLTEpIHtcclxuICAgICAgcGFyc2VkICs9IG9wdGlvbnMuZGVjaW1hbDtcclxuICAgIH1cclxuICAgIC8vIElmIGEgc2hvcnRjdXRcclxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvcnRjdXRzW2NdKSB7XHJcbiAgICAgIG11bHRpcGxpZXIgKj0gb3B0aW9ucy5zaG9ydGN1dHNbY107XHJcbiAgICB9XHJcbiAgICAvLyBJZiBhIG1pbnVzIHNpZ24gKGFuZCBwYXJzZWQgc3RyaW5nIGlzIGN1cnJlbnRseSBlbXB0eSlcclxuICAgIGVsc2UgaWYgKGMgPT09ICctJyAmJiAhcGFyc2VkLmxlbmd0aCkge1xyXG4gICAgICBwYXJzZWQgPSBjO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gT3RoZXJ3aXNlIGlnbm9yZSB0aGUgY2hhcmFjdGVyXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoIXBhcnNlZC5sZW5ndGgpIHsgcmV0dXJuICcnIH1cclxuXHJcbiAgLy8gTmVlZCB0byBlbnN1cmUgdGhhdCBkZWxpbWl0ZXIgaXMgYSAnLicgYmVmb3JlIHBhcnNpbmcgdG8gbnVtYmVyXHJcbiAgY29uc3Qgbm9ybWFsaXNlZE51bWJlciA9IE51bWJlcihwYXJzZWQucmVwbGFjZShuZXcgUmVnRXhwKGBbJHtvcHRpb25zLmRlY2ltYWx9XWAsICdnJyksICcuJykpO1xyXG4gIC8vIFRoZW4gc3dhcCBpdCBiYWNrIGluXHJcbiAgY29uc3QgYWRqdXN0ZWQgPSBTdHJpbmcobm9ybWFsaXNlZE51bWJlciAqIG11bHRpcGxpZXIpLnJlcGxhY2UobmV3IFJlZ0V4cChgW1xcLl1gLCAnZycpLCBvcHRpb25zLmRlY2ltYWwpO1xyXG4gIGNvbnN0IHRvb0xhcmdlID0gYWRqdXN0ZWQuaW5kZXhPZignZScpICE9PSAtMTtcclxuXHJcbiAgaWYgKHRvb0xhcmdlKSB7XHJcbiAgICByZXR1cm4gJydcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGFkanVzdGVkO1xyXG4gIH1cclxufVxyXG4iLCIvLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyAgICAgS0VZIEhBTkRMRVJTICAgICAvL1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT0vL1xyXG4vLyBBbGwgZnVuY3Rpb25zIGRlYWxpbmcgd2l0aCBrZXlwcmVzc2VzIChsaXN0ZW5lZCB0byBvbiB0aGUga2V5ZG93biBldmVudClcclxuLy8gYXJlIGhlcmUsIHdpdGggc3BlY2lmaWMgaW1wbGVtZW50YXRpb25zIGZvciBtb3N0IHR5cGVzIG9mIGtleVxyXG5cclxuaW1wb3J0IHtSQU5HRX0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5VTUJFUiBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIC8vIFJlbW92ZSBjaGFyYWN0ZXJzIGluIGN1cnJlbnQgc2VsZWN0aW9uXHJcbiAgICBjb25zdCB0ZW1wID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCAnJywga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuXHJcbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cclxuICAgICAgIShrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSA9PT0gJy0nXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKVxyXG4gICAgICAmJiBoZWxwZXJzLmFsbG93ZWRaZXJvKHRlbXAsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZE51bWJlcikge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1JTlVTIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk1pbnVzOiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtaW51c0FsbG93ZWQgPSBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYgKGtleUluZm8uY3VycmVudFZhbHVlWzBdICE9PSAnLScgfHwga2V5SW5mby5jYXJldEVuZCA+IDApXHJcbiAgICAgICYmIG9wdGlvbnMucmFuZ2UgIT09IFJBTkdFLlBPU0lUSVZFO1xyXG5cclxuICAgICBpZiAobWludXNBbGxvd2VkKSB7XHJcbiAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgJy0nLFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgICk7XHJcbiAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgICB9XHJcbiAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFQ0lNQUwgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvbkRlY2ltYWw6IGZ1bmN0aW9uKGtleUluZm8sIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGRlY2ltYWxJbmRleCA9IGtleUluZm8uY3VycmVudFZhbHVlLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXHJcbiAgICAvLyBBZGQgdGhlIGRlY2ltYWxcclxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cclxuICAgICAgb3B0aW9ucy5zY2FsZSA+IDBcclxuICAgICAgJiYgKGRlY2ltYWxJbmRleCA9PT0gLTFcclxuICAgICAgICAgIHx8IChkZWNpbWFsSW5kZXggPj0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICAgICAgJiYgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCkpXHJcblxyXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxyXG4gICAge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIG9wdGlvbnMuZGVjaW1hbCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICApO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU0hPUlRDVVQgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7b3B0aW9uc30gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgaW5wdXRcclxuICAgKi9cclxuICBvblNob3J0Y3V0OiBmdW5jdGlvbihrZXlJbmZvLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gb3B0aW9ucy5zaG9ydGN1dHNba2V5SW5mby5rZXlOYW1lLnRvTG93ZXJDYXNlKCldIHx8IDE7XHJcbiAgICBjb25zdCBhZGp1c3RlZFZhbCA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwgJycsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICBjb25zdCByYXdWYWx1ZSA9IChoZWxwZXJzLnRvTnVtYmVyKGFkanVzdGVkVmFsLCBvcHRpb25zKSB8fCAxKSAqIG11bHRpcGxpZXI7XHJcblxyXG4gICAgaWYgKG11bHRpcGxpZXIpIHtcclxuICAgICAgLy8gSWYgbnVtYmVyIGNvbnRhaW5zICdlJyB0aGVuIGl0IGlzIHRvbyBsYXJnZSB0byBkaXNwbGF5XHJcbiAgICAgIGlmIChyYXdWYWx1ZS50b1N0cmluZygpLmluZGV4T2YoJ2UnKSA9PT0gLTEpIHtcclxuICAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gU3RyaW5nKHJhd1ZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSBrZXlJbmZvLm5ld1ZhbHVlLmxlbmd0aCArIE1hdGgubG9nMTAoMTAwMCk7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQkFDS1NQQUNFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQkVGT1JFIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XHJcbiAgICAgICAgbGV0IGNhcmV0SnVtcCA9IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3Rob3VzYW5kc30gQ2hhcmFjdGVyIHVzZWQgZm9yIHRoZSB0aG91c2FuZHMgZGVsaW1pdGVyXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XHJcblxyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0gJyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGFmdGVyIGl0XHJcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIHRob3VzYW5kcyBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZTdGFydCA9IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVU5ETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSB1bmRvXHJcbiAgICovXHJcbiAgb25VbmRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5faGlzdG9yeS5yZWRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxufVxyXG4iLCJcclxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gNTA7XHJcblxyXG4vKipcclxuICogVmFsdWUgSGlzdG9yeSAtIE1hbmFnZXMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHRyYWNrZWQsIHN1cHBvcnRpbmdcclxuICogdGhlIHVuZG8gYW5kIHJlZG8gb3BlcmF0aW9ucyBpbiB0aGUgaW5wdXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlSGlzdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IFtudWxsXTtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRJbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEluZGV4XTtcclxuICB9XHJcblxyXG4gIHNldCBjdXJyZW50SW5kZXgoaSkge1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaTtcclxuICB9XHJcbiAgc2V0IGhpc3RvcnkoaGlzdG9yeSkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIHByZXZpb3VzIHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZWRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIG5leHQgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgbmV3IHZhbHVlIHRvIGhpc3RvcnkgYXJyYXkuIEFueSBwb3NzaWJsZSAncmVkbydzJyBhcmUgcmVtb3ZlZCBmcm9tIGFycmF5XHJcbiAgICogYXMgYSBuZXcgJ2JyYW5jaCcgb2YgaGlzdG9yeSBpcyBjcmVhdGVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYWRkZWRcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gYWRkIHRvIGhpc3RvcnlcclxuICAgKi9cclxuICBhZGRWYWx1ZSh2YWwpIHtcclxuICAgIC8vIERlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGN1cnJlbnQgdmFsdWVcclxuICAgIGlmICh2YWwgIT09IHRoaXMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaGlzdG9yeS5zcGxpY2UodGhpcy5jdXJyZW50SW5kZXggKyAxLCBudWxsLCB2YWwpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiBNQVhfQlVGRkVSX1NJWkUpIHtcclxuICAgICAgICB0aGlzLmhpc3Rvcnkuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=
