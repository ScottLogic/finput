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
  format: '0,0.00',
  maxValue: 10e+12,
  minValue: -10e+12,
  maxLength: 15,
  valueStep: 1,
  thousands: ',',
  decimal: '.',
  shortcuts: {
    'k': 3,
    'm': 6,
    'b': 9
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
   * @param {Options.format} The format of the number to be displayed by the input
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
      var newValue = _helpers2.default.fullFormat(val, this.options.format, this.options.currency);

      this.element.value = newValue;
      this.history.addValue(newValue);

      return valueCanChange;
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
      var valueChanged = this.setValue(this.element.value);
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
          var valueChanged = this.setValue(e.dataTransfer.getData('text'));
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

      var valueChanged = this.setValue(potentialValue);
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
          _keyHandlers2.default.onNumber(keyInfo);
          break;
        case _constants.ACTION_TYPES.DECIMAL:
          _keyHandlers2.default.onDecimal(keyInfo, this.options);
          break;
        case _constants.ACTION_TYPES.MINUS:
          _keyHandlers2.default.onMinus(keyInfo);
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
      var valueChanged = this.setValue(this.element.value);
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
exports.fullFormat = function (val, format, currency) {
  var fullFormat = currency ? '' + currency + format : format;

  // TODO - Full format
};

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function (val, options) {
  var str = val.replace(new RegExp('[' + (options.currency || '') + options.thousands + ']', 'g'), '');
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
  // Only add currency symbol on if value has any numbers
  if (options.currency && str && str.match(/\d/)) {
    return str[0] === '-' ? str.replace('-', '-' + options.currency) : '' + options.currency + str;
  } else {
    return str;
  }
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
    if (prev[i] === options.thousands || options.currency && prev[i] === options.currency) {
      prevSymbols++;
    }
  }
  for (i = 0; i < pos; i++) {
    if (curr[i] === options.thousands || options.currency && curr[i] === options.currency) {
      currentSymbols++;
    }
  }
  return currentSymbols - prevSymbols;
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
  onNumber: function onNumber(keyInfo) {
    var allowedNumber = !(keyInfo.currentValue[0] === '-' && keyInfo.caretStart === 0 && keyInfo.caretEnd === 0);

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
  onMinus: function onMinus(keyInfo) {
    var minusAllowed = keyInfo.caretStart === 0 && (keyInfo.currentValue[0] !== '-' || keyInfo.caretEnd > 0);

    if (minusAllowed) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, '-', keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * DECIMAL HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {languageData} Language specific info for the selected language
   */
  onDecimal: function onDecimal(keyInfo, languageData) {
    var decimalIndex = keyInfo.currentValue.indexOf(languageData.decimal);

    // If there is not already a decimal or the original would be replaced
    // Add the decimal
    var decimalAllowed = decimalIndex === -1 || decimalIndex >= keyInfo.caretStart && decimalIndex < keyInfo.caretEnd;

    if (decimalAllowed) {
      keyInfo.newValue = _helpers2.default.editString(keyInfo.currentValue, languageData.decimal, keyInfo.caretStart, keyInfo.caretEnd);
      keyInfo.caretStart += 1;
    }

    keyInfo.event.preventDefault();
  },

  /**
   * SHORTCUT HANDLER
   * @param {keyInfo} Information about the keypress/action
   * @param {languageData} Language specific info for the selected language
   */
  onShortcut: function onShortcut(keyInfo, languageData) {
    var power = languageData.shortcuts[keyInfo.keyName.toLowerCase()];

    if (power) {
      // TODO - multiply current value by shortcut

      // TODO - BEHAVIOUR: should caret to jump to end? as whole value is
      // muliplied by the multipler - (doesn't just chuck zeros in the middle)
      keyInfo.caretStart = keyInfo.newValue.length;
    }
    keyInfo.event.preventDefault();
  },

  /**
   * BACKSPACE HANDLER
   * @param {keyInfo} Information about the keypress/action
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
   * @param {languageData} Language specific info for the selected language
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUU7QUFDL0MsWUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO09BQ3JCO0FBQ0QsYUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7Ozs7Ozs7NkJBTVEsR0FBRyxFQUFFOztBQUVaLFVBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDN0IsWUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUV0RCxZQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGVBQWUsRUFBRTtBQUN6QyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCO09BQ0Y7O0FBRUQsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRTVDLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7O3dCQXJEYTtBQUNaLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0QjtzQkFXVyxPQUFPLEVBQUU7QUFDbkIsVUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7S0FDekI7Ozt3QkFaa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQzNCO3NCQUtnQixDQUFDLEVBQUU7QUFDbEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7S0FDeEI7Ozt3QkFOa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4Qzs7O1NBaEJrQixZQUFZOzs7a0JBQVosWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iLCJcclxuZXhwb3J0cy5BQ1RJT05fVFlQRVMgPSB7XHJcbiAgTlVNQkVSOiAnTlVNQkVSJyxcclxuICBTSE9SVENVVDogJ1NIT1JUQ1VUJyxcclxuICBERUNJTUFMOiAnREVDSU1BTCcsXHJcbiAgREVMSU1JVEVSOiAnREVMSU1JVEVSJyxcclxuICBNSU5VUzogJ01JTlVTJyxcclxuICBVTktOT1dOOiAnVU5LTk9XTicsXHJcbiAgSE9SSVpPTlRBTF9BUlJPVzogJ0hPUklaT05UQUxfQVJST1cnLFxyXG4gIFZFUlRJQ0FMX0FSUk9XOiAnVkVSVElDQUxfQVJST1cnLFxyXG4gIEJBQ0tTUEFDRTogJ0JBQ0tTUEFDRScsXHJcbiAgREVMRVRFOiAnREVMRVRFJyxcclxuICBVTkRPOiAnVU5ETycsXHJcbiAgUkVETzogJ1JFRE8nLFxyXG4gIEhPTUU6ICdIT01FJyxcclxuICBFTkQ6ICdFTkQnXHJcbn1cclxuXHJcbmV4cG9ydHMuRFJBR19TVEFURVMgPSB7XHJcbiAgTk9ORTogJ05PTkUnLFxyXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxyXG4gIEVYVEVSTkFMOiAnRVhURVJOQUwnXHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IEFsaSBTaGVlaGFuLURhcmUsIGFsbCByaWdodHMgYW5kIHByb2ZpdHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQga2V5Y29kZSBmcm9tICdrZXljb2RlJztcclxuaW1wb3J0IGtleUhhbmRsZXJzIGZyb20gJy4va2V5SGFuZGxlcnMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmFsdWVIaXN0b3J5IGZyb20gJy4vdmFsdWVIaXN0b3J5JztcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIENPTlNUQU5UU1xyXG4gKi9cclxuY29uc3QgREVGQVVMVFMgPSB7XHJcbiAgZm9ybWF0OiAnMCwwLjAwJyxcclxuICBtYXhWYWx1ZTogMTBlKzEyLFxyXG4gIG1pblZhbHVlOiAtMTBlKzEyLFxyXG4gIG1heExlbmd0aDogMTUsXHJcbiAgdmFsdWVTdGVwOiAxLFxyXG4gIHRob3VzYW5kczogJywnLFxyXG4gIGRlY2ltYWw6ICcuJyxcclxuICBzaG9ydGN1dHM6IHtcclxuICAgICdrJzogMyxcclxuICAgICdtJzogNixcclxuICAgICdiJzogOVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEZJTlBVVCBDT01QT05FTlQgQ0xBU1NcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBGaW5wdXQge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RE9NIEVsZW1lbnR9IFRoZSBudW1iZXIgaW5wdXRcclxuICAgKiBAcGFyYW0ge09wdGlvbnN9IE9wdGlvbnMgZm9yIHRoZSBudW1iZXIgaW5wdXQncyBiZWhhdmlvdXJcclxuICAgKlxyXG4gICAqIERldGFpbGVkIGxpc3Qgb2YgcG9zc2libGUgb3B0aW9uczpcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZm9ybWF0fSBUaGUgZm9ybWF0IG9mIHRoZSBudW1iZXIgdG8gYmUgZGlzcGxheWVkIGJ5IHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5jdXJyZW5jeX0gT3B0aW9uYWwgY3VycmVuY3kgdG8gcHJlcGVuZCB0byB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy52YWx1ZVN0ZXAgT1IgZmFsc2V9IENoYW5nZSBob3cgbXVjaCB0aGUgdmFsdWUgY2hhbmdlcyB3aGVuIHByZXNzaW5nIHVwL2Rvd24gYXJyb3cga2V5c1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVFMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fYWN0aW9uVHlwZXMgPSB0aGlzLmNyZWF0ZUFjdGlvblR5cGVzKCk7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gbmV3IFZhbHVlSGlzdG9yeSgpO1xyXG5cclxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4gdGhpcy5vbkZvY3Vzb3V0KGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB0aGlzLm9uRm9jdXNpbihlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB0aGlzLm9uRHJvcChlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoZSkgPT4gdGhpcy5vblBhc3RlKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMub25LZXlkb3duKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB0aGlzLm9uS2V5cHJlc3MoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHRoaXMub25JbnB1dChlKSk7XHJcblxyXG4gICAgLy8gRHJhZ2dpbmcgbGlzdGVuZXJzXHJcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgYSBkcmFnIHN0YXJ0ZWQgaW50ZXJuYWxseSBvciBleHRlcm5hbGx5XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4gdGhpcy5vbkRyYWdzdGFydChlKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHRoaXMub25EcmFnZW5kKGUpKTtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgZWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gIH1cclxuICBnZXQgb3B0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG4gIGdldCBmb3JtYXR0ZWRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9mb3JtYXR0ZWRWYWx1ZTtcclxuICB9XHJcbiAgZ2V0IGFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGlvblR5cGVzO1xyXG4gIH1cclxuICBnZXQgZHJhZ1N0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdTdGF0ZTtcclxuICB9XHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTRVRURVJTXHJcbiAgc2V0IGRyYWdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gc3RhdGU7XHJcbiAgfVxyXG4gIHNldCB2YWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xyXG4gIH1cclxuICBzZXQgZm9ybWF0dGVkVmFsdWUodmFsKSB7XHJcbiAgICB0aGlzLl9mb3JtYXR0ZWRWYWx1ZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGNvcnJlY3QgYWN0aW9uIHR5cGUgdG8gY2hhci9rZXkgY29kZXMgYXJyYXkgd2l0aCB0aGVcclxuICAgKiBjb3JyZWN0IGRlY2ltYWwgYW5kIHRob3VzYW5kIHNlcGFyYXRvciBjaGFyYWN0ZXJzIChkZXBlbmRpbmcgb24gbGFuZ3VhZ2UpXHJcbiAgICovXHJcbiAgY3JlYXRlQWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk5VTUJFUixcclxuICAgICAgICBuYW1lczogWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5NSU5VUyxcclxuICAgICAgICBuYW1lczogWyctJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT01FLFxyXG4gICAgICAgIG5hbWVzOiBbJ2hvbWUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkVORCxcclxuICAgICAgICBuYW1lczogWydlbmQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLm9wdGlvbnMudGhvdXNhbmRzXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlNIT1JUQ1VULFxyXG4gICAgICAgIG5hbWVzOiBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuYWN0aW9uVHlwZXMpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBhY3Rpb25UeXBlLm5hbWVzLmluZGV4T2YobmFtZSk7XHJcbiAgICAgIGNvbnN0IHR5cGVNYXRjaCA9IGluZGV4ID4gLTE7XHJcblxyXG4gICAgICBpZiAodHlwZU1hdGNoICYmIChhY3Rpb25UeXBlLmN0cmwgPyBlLmN0cmxLZXkgOiB0cnVlKSkge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25UeXBlLnR5cGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBBQ1RJT05fVFlQRVMuVU5LTk9XTjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHZhbHVlLCBmdWxseSBmb3JtYXR0ZWQsIGZvciB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge3ZhbH0gTmV3IHZhbHVlIHRvIHNldFxyXG4gICAqL1xyXG4gIHNldFZhbHVlKHZhbCkge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLmZ1bGxGb3JtYXQodmFsLCB0aGlzLm9wdGlvbnMuZm9ybWF0LCB0aGlzLm9wdGlvbnMuY3VycmVuY3kpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWVDYW5DaGFuZ2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9cclxuICAvLyBFVkVOVCBIQU5ETEVSU1xyXG4gIC8vXHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzaW5nIE9VVCBvZiB0aGUgaW5wdXQgLSBmb3JtYXQgZnVsbHlcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c291dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBPVVQgZXZlbnQnLCBlKTtcclxuICAgIGNvbnN0IHZhbHVlQ2hhbmdlZCA9IHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZm9jdXMgb2YgdGhlIGlucHV0IC0gU2VsZWN0IGFsbCB0ZXh0XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNpbihlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdGb2N1cyBJTiBldmVudCcsIGUpO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gMDtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQgPSB0aGlzLmVsZW1lbnQudmFsdWUubGVuZ3RoO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBkcm9wcGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXQgLSByZXBsYWNlIHRoZSBXSE9MRSB2YWx1ZVxyXG4gICAqIHdpdGggdGhpcyBuZXcgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyb3AoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJvcCBldmVudCcsIGUpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5kcmFnU3RhdGUpIHtcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5JTlRFUk5BTDpcclxuICAgICAgICAvLyBUaGlzIGNhc2UgaXMgaGFuZGxlZCBieSB0aGUgJ29uSW5wdXQnIGZ1bmN0aW9uXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuRVhURVJOQUw6XHJcbiAgICAgICAgY29uc3QgdmFsdWVDaGFuZ2VkID0gdGhpcy5zZXRWYWx1ZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JykpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEbyBub3RoaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gc3RhcnQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ3N0YXJ0KGUpIHtcclxuICAgIHRoaXMuZHJhZ1N0YXRlID0gKGUudGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQpXHJcbiAgICAgID8gRFJBR19TVEFURVMuSU5URVJOQUxcclxuICAgICAgOiBEUkFHX1NUQVRFUy5FWFRFUk5BTDtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgU1RBUlRFRCcsIHRoaXMuZHJhZ1N0YXRlLCBlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZW5kIG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdlbmQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRHJhZyBFTkRFRCcsIHRoaXMuZHJhZ1N0YXRlLCBlKTtcclxuICAgIHRoaXMuZHJhZ1N0YXRlID0gRFJBR19TVEFURVMuTk9ORTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcGFzdGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IENsaXBib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uUGFzdGUoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnUGFzdGUgZXZlbnQnLCBlKTtcclxuICAgIGNvbnN0IGNoYXJzID0gZS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcclxuICAgIGNvbnN0IHBvdGVudGlhbFZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGNoYXJzLFxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdmFsdWVDaGFuZ2VkID0gdGhpcy5zZXRWYWx1ZShwb3RlbnRpYWxWYWx1ZSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG4gIG9uS2V5cHJlc3MoZSkge1xyXG4gICBjb25zb2xlLmRlYnVnKCdrZXlwcmVzcycsIGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwcmVzc2luZyBhbnkga2V5IGluc2lkZSB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25LZXlkb3duKGUpIHtcclxuICAgIGNvbnN0IGtleUluZm8gPSB7XHJcbiAgICAgIGV2ZW50OiBlLFxyXG4gICAgICBjb2RlOiBlLndoaWNoIHx8IGUua2V5Q29kZSxcclxuICAgICAga2V5TmFtZToga2V5Y29kZShlKSA/IGtleWNvZGUoZSkucmVwbGFjZSgnbnVtcGFkICcsICcnKSA6IG51bGwsXHJcbiAgICAgIGNhcmV0U3RhcnQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCxcclxuICAgICAgY2FyZXRFbmQ6IHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmQsXHJcbiAgICAgIGN1cnJlbnRWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBuZXdWYWx1ZTogdGhpcy5lbGVtZW50LnZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aW9uVHlwZSA9IHRoaXMuZ2V0QWN0aW9uVHlwZShrZXlJbmZvLmtleU5hbWUsIGUpO1xyXG5cclxuICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk5VTUJFUjpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk51bWJlcihrZXlJbmZvKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuTUlOVVM6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25NaW51cyhrZXlJbmZvKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuU0hPUlRDVVQ6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25TaG9ydGN1dChrZXlJbmZvLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5IT01FOlxyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5FTkQ6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhhY3Rpb25UeXBlKTtcclxuICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW91clxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25WZXJ0aWNhbEFycm93KGtleUluZm8sIHRoaXMub3B0aW9ucy52YWx1ZVN0ZXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFTEVURTpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlbGV0ZShrZXlJbmZvLCB0aGlzLm9wdGlvbnMudGhvdXNhbmRzKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgY29uc3QgY3VycmVudFZhbHVlID0ga2V5SW5mby5uZXdWYWx1ZTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuXHJcbiAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcclxuICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG4gICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcclxuICAgIHRoaXMuaGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEJhY2t1cCBldmVudCBpZiBpbnB1dCBjaGFuZ2VzIGZvciBhbnkgb3RoZXIgcmVhc29uLCBqdXN0IGZvcm1hdCB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRXZlbnRcclxuICAgKi9cclxuICBvbklucHV0KGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ29uIElOUFVUJywgZSk7XHJcbiAgICBjb25zdCB2YWx1ZUNoYW5nZWQgPSB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlucHV0O1xyXG4iLCJcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vKipcclxuICogRWRpdCBhIHN0cmluZyB3aXRoIGEgbmV3IHN0cmluZyB0byBhZGQuXHJcbiAqIEhhbmRsZXMgdGhlIGNhc2UgaWYgdGV4dCBpcyBoaWdobGlnaHRlZCBhbHNvLCBpbiB3aGljaCBjYXNlIHRoYXQgdGV4dFxyXG4gKiB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlICd0b0FkZCcgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnRzLmVkaXRTdHJpbmcgPSBmdW5jdGlvbihzdHIsIHRvQWRkLCBjYXJldFN0YXJ0LCBjYXJldEVuZCA9IGNhcmV0U3RhcnQpIHtcclxuICBjb25zdCBmaXJzdEhhbGYgPSBzdHIuc2xpY2UoMCwgY2FyZXRTdGFydCk7XHJcbiAgY29uc3Qgc2Vjb25kSGFsZiA9IHN0ci5zbGljZShjYXJldEVuZCwgc3RyLmxlbmd0aCk7XHJcbiAgcmV0dXJuIGAke2ZpcnN0SGFsZn0ke3RvQWRkfSR7c2Vjb25kSGFsZn1gO1xyXG59XHJcblxyXG4vKipcclxuICogRnVsbHkgZm9ybWF0IHRoZSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBmb3JtYXQsIGN1cnJlbmN5KSB7XHJcbiAgY29uc3QgZnVsbEZvcm1hdCA9IGN1cnJlbmN5ID8gYCR7Y3VycmVuY3l9JHtmb3JtYXR9YCA6IGZvcm1hdDtcclxuXHJcbiAgLy8gVE9ETyAtIEZ1bGwgZm9ybWF0XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcclxuICovXHJcbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG4gIGxldCBzdHIgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHsob3B0aW9ucy5jdXJyZW5jeSB8fCAnJyl9JHtvcHRpb25zLnRob3VzYW5kc31dYCwgJ2cnKSwgJycpO1xyXG4gIGNvbnN0IHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpID4gLTFcclxuICAgID8gc3RyLmluZGV4T2Yob3B0aW9ucy5kZWNpbWFsKSAtIDFcclxuICAgIDogc3RyLmxlbmd0aCAtIDE7XHJcbiAgY29uc3QgZW5kSW5kZXggPSBzdHJbMF0gPT09ICctJyA/IDEgOiAwO1xyXG5cclxuICAvLyBpIG11c3QgYmUgZ3JlYXRlciB0aGFuIHplcm8gYmVjYXVzZSBudW1iZXIgY2Fubm90IHN0YXJ0IHdpdGggY29tbWFcclxuICBsZXQgaSA9IHN0YXJ0SW5kZXg7XHJcbiAgbGV0IGogPSAxO1xyXG4gIGZvciAoaSwgajsgaSA+IGVuZEluZGV4OyBpLS0sIGorKykge1xyXG4gICAgLy8gRXZlcnkgMyBjaGFyYWNlcnMsIGFkZCBhIGNvbW1hXHJcbiAgICBpZiAoaiAlIDMgPT09IDApIHtcclxuICAgICAgc3RyID0gdGhpcy5lZGl0U3RyaW5nKHN0ciwgJywnLCBpKTtcclxuICAgIH1cclxuICB9XHJcbiAgLy8gT25seSBhZGQgY3VycmVuY3kgc3ltYm9sIG9uIGlmIHZhbHVlIGhhcyBhbnkgbnVtYmVyc1xyXG4gIGlmIChvcHRpb25zLmN1cnJlbmN5ICYmIHN0ciAmJiBzdHIubWF0Y2goL1xcZC8pKSB7XHJcbiAgICByZXR1cm4gc3RyWzBdID09PSAnLScgPyBzdHIucmVwbGFjZSgnLScsIGAtJHtvcHRpb25zLmN1cnJlbmN5fWApIDogYCR7b3B0aW9ucy5jdXJyZW5jeX0ke3N0cn1gXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBzdHI7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIGhvdyBtYW55IGNoYXJhY3RlcnMgaGF2ZSBiZWVuIGFkZGVkIChvciByZW1vdmVkKSBiZWZvcmUgdGhlIGdpdmVuXHJcbiAqIGNhcmV0IHBvc2l0aW9uIGFmdGVyIGZvcm1hdHRpbmcuIENhcmV0IGlzIHRoZW4gYWRqdXN0ZWQgYnkgdGhlIHJldHVybmVkIG9mZnNldFxyXG4gKiBDdXJyZW5jeSBzeW1ib2wgb3IgdGhvdXNhbmQgc2VwYXJhdG9ycyBtYXkgaGF2ZSBiZWVuIGFkZGVkXHJcbiAqL1xyXG5leHBvcnRzLmNhbGN1bGF0ZU9mZnNldCA9IGZ1bmN0aW9uKHByZXYsIGN1cnIsIHBvcywgb3B0aW9ucykge1xyXG4gIGxldCBpLCBwcmV2U3ltYm9scyA9IDAsIGN1cnJlbnRTeW1ib2xzID0gMDtcclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAocHJldltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMgfHwgKG9wdGlvbnMuY3VycmVuY3kgJiYgcHJldltpXSA9PT0gb3B0aW9ucy5jdXJyZW5jeSkpIHtcclxuICAgICAgcHJldlN5bWJvbHMrKztcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKGN1cnJbaV0gPT09IG9wdGlvbnMudGhvdXNhbmRzIHx8IChvcHRpb25zLmN1cnJlbmN5ICYmIGN1cnJbaV0gPT09IG9wdGlvbnMuY3VycmVuY3kpKSB7XHJcbiAgICAgIGN1cnJlbnRTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50U3ltYm9scyAtIHByZXZTeW1ib2xzO1xyXG59XHJcbiIsIi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vICAgICBLRVkgSEFORExFUlMgICAgIC8vXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vIEFsbCBmdW5jdGlvbnMgZGVhbGluZyB3aXRoIGtleXByZXNzZXMgKGxpc3RlbmVkIHRvIG9uIHRoZSBrZXlkb3duIGV2ZW50KVxyXG4vLyBhcmUgaGVyZSwgd2l0aCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgZm9yIG1vc3QgdHlwZXMgb2Yga2V5XHJcblxyXG5pbXBvcnQge0FDVElPTl9UWVBFU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5VTUJFUiBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8pIHtcclxuICAgIGNvbnN0IGFsbG93ZWROdW1iZXIgPVxyXG4gICAgICAhKGtleUluZm8uY3VycmVudFZhbHVlWzBdID09PSAnLSdcclxuICAgICAgJiYga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRFbmQgPT09IDApO1xyXG5cclxuICAgIGlmIChhbGxvd2VkTnVtYmVyKSB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTUlOVVMgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTWludXM6IGZ1bmN0aW9uKGtleUluZm8pIHtcclxuICAgIGNvbnN0IG1pbnVzQWxsb3dlZCA9IGtleUluZm8uY2FyZXRTdGFydCA9PT0gMCAmJlxyXG4gICAgICAoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gIT09ICctJyB8fCBrZXlJbmZvLmNhcmV0RW5kID4gMCk7XHJcblxyXG4gICAgIGlmIChtaW51c0FsbG93ZWQpIHtcclxuICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgICAnLScsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICAgKTtcclxuICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgIH1cclxuICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVDSU1BTCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtsYW5ndWFnZURhdGF9IExhbmd1YWdlIHNwZWNpZmljIGluZm8gZm9yIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxyXG4gICAqL1xyXG4gIG9uRGVjaW1hbDogZnVuY3Rpb24oa2V5SW5mbywgbGFuZ3VhZ2VEYXRhKSB7XHJcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5pbmRleE9mKGxhbmd1YWdlRGF0YS5kZWNpbWFsKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXHJcbiAgICAvLyBBZGQgdGhlIGRlY2ltYWxcclxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cclxuICAgICAgKGRlY2ltYWxJbmRleCA9PT0gLTEpIHx8XHJcbiAgICAgICAgKGRlY2ltYWxJbmRleCA+PSBrZXlJbmZvLmNhcmV0U3RhcnQgJiZcclxuICAgICAgICAgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCk7XHJcblxyXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxyXG4gICAge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIGxhbmd1YWdlRGF0YS5kZWNpbWFsLFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTSE9SVENVVCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtsYW5ndWFnZURhdGF9IExhbmd1YWdlIHNwZWNpZmljIGluZm8gZm9yIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxyXG4gICAqL1xyXG4gIG9uU2hvcnRjdXQ6IGZ1bmN0aW9uKGtleUluZm8sIGxhbmd1YWdlRGF0YSkge1xyXG4gICAgY29uc3QgcG93ZXIgPSBsYW5ndWFnZURhdGEuc2hvcnRjdXRzW2tleUluZm8ua2V5TmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuXHJcbiAgICBpZiAocG93ZXIpIHtcclxuICAgICAgLy8gVE9ETyAtIG11bHRpcGx5IGN1cnJlbnQgdmFsdWUgYnkgc2hvcnRjdXRcclxuXHJcbiAgICAgIC8vIFRPRE8gLSBCRUhBVklPVVI6IHNob3VsZCBjYXJldCB0byBqdW1wIHRvIGVuZD8gYXMgd2hvbGUgdmFsdWUgaXNcclxuICAgICAgLy8gbXVsaXBsaWVkIGJ5IHRoZSBtdWx0aXBsZXIgLSAoZG9lc24ndCBqdXN0IGNodWNrIHplcm9zIGluIHRoZSBtaWRkbGUpXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IGtleUluZm8ubmV3VmFsdWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJBQ0tTUEFDRSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQkVGT1JFIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0gJyc7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYmVmb3JlIGl0XHJcbiAgICAgICAgbGV0IGNhcmV0SnVtcCA9IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge2xhbmd1YWdlRGF0YX0gTGFuZ3VhZ2Ugc3BlY2lmaWMgaW5mbyBmb3IgdGhlIHNlbGVjdGVkIGxhbmd1YWdlXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIHRob3VzYW5kcykge1xyXG4gICAgbGV0IGZpcnN0SGFsZiwgbGFzdEhhbGY7XHJcblxyXG4gICAgaWYgKGtleUluZm8uY2FyZXRTdGFydCA9PT0ga2V5SW5mby5jYXJldEVuZCkge1xyXG4gICAgICBjb25zdCBuZXh0Q2hhciA9IGtleUluZm8uY3VycmVudFZhbHVlW2tleUluZm8uY2FyZXRTdGFydF07XHJcblxyXG4gICAgICBpZiAoa2V5SW5mby5ldmVudC5jdHJsS2V5KSB7XHJcbiAgICAgICAgLy8gSWYgQ1RSTCBrZXkgaXMgaGVsZCBkb3duIC0gZGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0gJyc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGFmdGVyIGl0XHJcbiAgICAgICAgY29uc3QgdGhvdXNhbmRzTmV4dCA9IG5leHRDaGFyID09PSB0aG91c2FuZHM7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIHRob3VzYW5kcyBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IHRob3VzYW5kc05leHQgPyAxIDogMDtcclxuXHJcbiAgICAgICAgY29uc3QgbGFzdEhhbGZTdGFydCA9IGtleUluZm8uY2FyZXRTdGFydFxyXG4gICAgICAgICAgKyAodGhvdXNhbmRzTmV4dCA/IDAgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVkVSVElDQUwgQVJST1cgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7c3RlcH0gSG93IG11Y2ggdG8gaW5jcmVhc2UvZGVjcmVhc2UgdmFsdWUgYnlcclxuICAgKi9cclxuICBvblZlcnRpY2FsQXJyb3c6IGZ1bmN0aW9uKGtleUluZm8sIHN0ZXApIHtcclxuICAgIC8vIElmIHN0ZXAgaXMgMCAob3IgZmFsc2V5KSB0aGVuIGFzc3VtZSBhcnJvdyBrZXkgdmFsdWUgY2hhbmdpbmcgaXMgZGlzYWJsZWRcclxuICAgIGlmIChzdGVwICYmICFpc05hTihzdGVwKSkge1xyXG4gICAgICBzd2l0Y2ggKGtleUluZm8ua2V5TmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgIC8vIFRPRE8gLSBVcCBhcnJvdyBzdGVwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkb3duJzpcclxuICAgICAgICAgIC8vIFRPRE8gLSBEb3duIGFycm93IHN0ZXBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH1cclxuICAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVORE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xyXG4gICAqL1xyXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuaGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5oaXN0b3J5LnJlZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5jb25zdCBNQVhfQlVGRkVSX1NJWkUgPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBIaXN0b3J5IC0gTWFuYWdlcyBhbiBhcnJheSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgdHJhY2tlZCwgc3VwcG9ydGluZ1xyXG4gKiB0aGUgdW5kbyBhbmQgcmVkbyBvcGVyYXRpb25zIGluIHRoZSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVIaXN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gW251bGxdO1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuICBnZXQgY3VycmVudEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgc2V0IGN1cnJlbnRJbmRleChpKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpO1xyXG4gIH1cclxuICBzZXQgaGlzdG9yeShoaXN0b3J5KSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gaGlzdG9yeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gcHJldmlvdXMgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHVuZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gbmV4dCB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBuZXcgdmFsdWUgdG8gaGlzdG9yeSBhcnJheS4gQW55IHBvc3NpYmxlICdyZWRvJ3MnIGFyZSByZW1vdmVkIGZyb20gYXJyYXlcclxuICAgKiBhcyBhIG5ldyAnYnJhbmNoJyBvZiBoaXN0b3J5IGlzIGNyZWF0ZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhZGRlZFxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBhZGQgdG8gaGlzdG9yeVxyXG4gICAqL1xyXG4gIGFkZFZhbHVlKHZhbCkge1xyXG4gICAgLy8gRGVsZXRlIGV2ZXJ5dGhpbmcgQUZURVIgY3VycmVudCB2YWx1ZVxyXG4gICAgaWYgKHZhbCAhPT0gdGhpcy5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5oaXN0b3J5LnNwbGljZSh0aGlzLmN1cnJlbnRJbmRleCArIDEsIG51bGwsIHZhbCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IE1BWF9CVUZGRVJfU0laRSkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeS5zaGlmdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==
