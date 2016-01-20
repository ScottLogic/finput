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
  valueStep: 1,
  thousands: ',',
  decimal: '.',
  range: _constants.RANGE.ALL,
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
   * @param {Options.thousands} Character to use for the thousands separator
   * @param {Options.decimal} Character to use for the decimal point
   * @param {Options.range} Whether number can take any value or must be positive
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

  // TODO - Full format

  return val;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsInNyY1xcY29uc3RhbnRzLmpzIiwic3JjXFxmaW5wdXQuanMiLCJzcmNcXGhlbHBlcnMuanMiLCJzcmNcXGtleUhhbmRsZXJzLmpzIiwic3JjXFx2YWx1ZUhpc3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDN0IsWUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUV0RCxZQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLGVBQWUsRUFBRTtBQUN6QyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3RCO09BQ0Y7O0FBRUQsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRTVDLGFBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7O3dCQXJEYTtBQUNaLGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0QjtzQkFXVyxPQUFPLEVBQUU7QUFDbkIsVUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7S0FDekI7Ozt3QkFaa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQzNCO3NCQUtnQixDQUFDLEVBQUU7QUFDbEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7S0FDeEI7Ozt3QkFOa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4Qzs7O1NBaEJrQixZQUFZOzs7a0JBQVosWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iLCJcclxuZXhwb3J0cy5BQ1RJT05fVFlQRVMgPSB7XHJcbiAgTlVNQkVSOiAnTlVNQkVSJyxcclxuICBTSE9SVENVVDogJ1NIT1JUQ1VUJyxcclxuICBERUNJTUFMOiAnREVDSU1BTCcsXHJcbiAgREVMSU1JVEVSOiAnREVMSU1JVEVSJyxcclxuICBNSU5VUzogJ01JTlVTJyxcclxuICBVTktOT1dOOiAnVU5LTk9XTicsXHJcbiAgSE9SSVpPTlRBTF9BUlJPVzogJ0hPUklaT05UQUxfQVJST1cnLFxyXG4gIFZFUlRJQ0FMX0FSUk9XOiAnVkVSVElDQUxfQVJST1cnLFxyXG4gIEJBQ0tTUEFDRTogJ0JBQ0tTUEFDRScsXHJcbiAgREVMRVRFOiAnREVMRVRFJyxcclxuICBVTkRPOiAnVU5ETycsXHJcbiAgUkVETzogJ1JFRE8nLFxyXG4gIEhPTUU6ICdIT01FJyxcclxuICBFTkQ6ICdFTkQnXHJcbn1cclxuXHJcbmV4cG9ydHMuRFJBR19TVEFURVMgPSB7XHJcbiAgTk9ORTogJ05PTkUnLFxyXG4gIElOVEVSTkFMOiAnSU5URVJOQUwnLFxyXG4gIEVYVEVSTkFMOiAnRVhURVJOQUwnXHJcbn1cclxuXHJcbmV4cG9ydHMuUkFOR0UgPSB7XHJcbiAgQUxMOiAnQUxMJyxcclxuICBQT1NJVElWRTogJ1BPU0lUSVZFJ1xyXG59XHJcbiIsIi8vIENvcHlyaWdodCBBbGkgU2hlZWhhbi1EYXJlLCBhbGwgcmlnaHRzIGFuZCBwcm9maXRzIHJlc2VydmVkLlxyXG5cclxuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XHJcbmltcG9ydCBrZXlIYW5kbGVycyBmcm9tICcuL2tleUhhbmRsZXJzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IFZhbHVlSGlzdG9yeSBmcm9tICcuL3ZhbHVlSGlzdG9yeSc7XHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFUywgUkFOR0V9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcblxyXG4vKipcclxuICogQ09OU1RBTlRTXHJcbiAqL1xyXG5jb25zdCBERUZBVUxUUyA9IHtcclxuICB2YWx1ZVN0ZXA6IDEsXHJcbiAgdGhvdXNhbmRzOiAnLCcsXHJcbiAgZGVjaW1hbDogJy4nLFxyXG4gIHJhbmdlOiBSQU5HRS5BTEwsXHJcbiAgc2hvcnRjdXRzOiB7XHJcbiAgICAnayc6IDMsXHJcbiAgICAnbSc6IDYsXHJcbiAgICAnYic6IDlcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGSU5QVVQgQ09NUE9ORU5UIENMQVNTXHJcbiAqIEBjbGFzc1xyXG4gKi9cclxuY2xhc3MgRmlucHV0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RPTSBFbGVtZW50fSBUaGUgbnVtYmVyIGlucHV0XHJcbiAgICogQHBhcmFtIHtPcHRpb25zfSBPcHRpb25zIGZvciB0aGUgbnVtYmVyIGlucHV0J3MgYmVoYXZpb3VyXHJcbiAgICpcclxuICAgKiBEZXRhaWxlZCBsaXN0IG9mIHBvc3NpYmxlIG9wdGlvbnM6XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnRob3VzYW5kc30gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIHRob3VzYW5kcyBzZXBhcmF0b3JcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZGVjaW1hbH0gQ2hhcmFjdGVyIHRvIHVzZSBmb3IgdGhlIGRlY2ltYWwgcG9pbnRcclxuICAgKiBAcGFyYW0ge09wdGlvbnMucmFuZ2V9IFdoZXRoZXIgbnVtYmVyIGNhbiB0YWtlIGFueSB2YWx1ZSBvciBtdXN0IGJlIHBvc2l0aXZlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnNob3J0Y3V0c30gT2JqZWN0IG1hcCBvZiBzaG9ydGN1dCBjaGFyYWN0ZXJzIHRvIG11bHRpcGxpZXIgKGUuZy4geyBrOiAxMDAwIH0pXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmN1cnJlbmN5fSBPcHRpb25hbCBjdXJyZW5jeSB0byBwcmVwZW5kIHRvIHZhbHVlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnZhbHVlU3RlcCBPUiBmYWxzZX0gQ2hhbmdlIGhvdyBtdWNoIHRoZSB2YWx1ZSBjaGFuZ2VzIHdoZW4gcHJlc3NpbmcgdXAvZG93biBhcnJvdyBrZXlzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbihERUZBVUxUUywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLl9hY3Rpb25UeXBlcyA9IHRoaXMuY3JlYXRlQWN0aW9uVHlwZXMoKTtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XHJcblxyXG4gICAgLy8gU2V0dXAgbGlzdGVuZXJzXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB0aGlzLm9uRm9jdXNvdXQoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHRoaXMub25Gb2N1c2luKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHRoaXMub25Ecm9wKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIChlKSA9PiB0aGlzLm9uUGFzdGUoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gdGhpcy5vbktleWRvd24oZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHRoaXMub25LZXlwcmVzcyhlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gdGhpcy5vbklucHV0KGUpKTtcclxuXHJcbiAgICAvLyBEcmFnZ2luZyBsaXN0ZW5lcnNcclxuICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hldGhlciBhIGRyYWcgc3RhcnRlZCBpbnRlcm5hbGx5IG9yIGV4dGVybmFsbHlcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB0aGlzLm9uRHJhZ3N0YXJ0KGUpKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4gdGhpcy5vbkRyYWdlbmQoZSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBlbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG4gIGdldCBvcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgZ2V0IGZvcm1hdHRlZFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZFZhbHVlO1xyXG4gIH1cclxuICBnZXQgYWN0aW9uVHlwZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aW9uVHlwZXM7XHJcbiAgfVxyXG4gIGdldCBkcmFnU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZHJhZ1N0YXRlO1xyXG4gIH1cclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuXHJcblxyXG4gIC8vIFNFVFRFUlNcclxuICBzZXQgZHJhZ1N0YXRlKHN0YXRlKSB7XHJcbiAgICB0aGlzLl9kcmFnU3RhdGUgPSBzdGF0ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHZhbCkge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWw7XHJcbiAgfVxyXG4gIHNldCBmb3JtYXR0ZWRWYWx1ZSh2YWwpIHtcclxuICAgIHRoaXMuX2Zvcm1hdHRlZFZhbHVlID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZSB0byBjaGFyL2tleSBjb2RlcyBhcnJheSB3aXRoIHRoZVxyXG4gICAqIGNvcnJlY3QgZGVjaW1hbCBhbmQgdGhvdXNhbmQgc2VwYXJhdG9yIGNoYXJhY3RlcnMgKGRlcGVuZGluZyBvbiBsYW5ndWFnZSlcclxuICAgKi9cclxuICBjcmVhdGVBY3Rpb25UeXBlcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTlVNQkVSLFxyXG4gICAgICAgIG5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk1JTlVTLFxyXG4gICAgICAgIG5hbWVzOiBbJy0nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPTUUsXHJcbiAgICAgICAgbmFtZXM6IFsnaG9tZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuRU5ELFxyXG4gICAgICAgIG5hbWVzOiBbJ2VuZCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVDSU1BTCxcclxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy5kZWNpbWFsXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTElNSVRFUixcclxuICAgICAgICBuYW1lczogW3RoaXMub3B0aW9ucy50aG91c2FuZHNdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuU0hPUlRDVVQsXHJcbiAgICAgICAgbmFtZXM6IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5zaG9ydGN1dHMpXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuQkFDS1NQQUNFLFxyXG4gICAgICAgIG5hbWVzOiBbJ2JhY2tzcGFjZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuREVMRVRFLFxyXG4gICAgICAgIG5hbWVzOiBbJ2RlbGV0ZSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVyxcclxuICAgICAgICBuYW1lczogWydsZWZ0JywgJ3JpZ2h0J11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5WRVJUSUNBTF9BUlJPVyxcclxuICAgICAgICBuYW1lczogWyd1cCcsICdkb3duJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5VTkRPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3onXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuUkVETyxcclxuICAgICAgICBuYW1lczogWyd5J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIERldGVybWluZXMgd2hhdCB0eXBlIG9mIGFjdGlvbiBuZWVkcyB0byBiZSBkZWFsdCB3aXRoIGZyb20gdGhlIGN1cnJlbnRcclxuICAgKiBrZXlkb3duIGV2ZW50LiBFLmcuIHZlcnRpY2FsIGFycm93IHByZXNzZWQsIG51bWJlciBwcmVzc2VkIGV0Yy4uLlxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBnZXRBY3Rpb25UeXBlKG5hbWUsIGUpIHtcclxuICAgIGZvciAobGV0IGFjdGlvblR5cGUgb2YgdGhpcy5hY3Rpb25UeXBlcykge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGFjdGlvblR5cGUubmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgY29uc3QgdHlwZU1hdGNoID0gaW5kZXggPiAtMTtcclxuXHJcbiAgICAgIGlmICh0eXBlTWF0Y2ggJiYgKGFjdGlvblR5cGUuY3RybCA/IGUuY3RybEtleSA6IHRydWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvblR5cGUudHlwZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFDVElPTl9UWVBFUy5VTktOT1dOO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB0aGlzLmhpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vXHJcbiAgLy8gRVZFTlQgSEFORExFUlNcclxuICAvL1xyXG5cclxuICAvKipcclxuICAgKiBPbiBmb2N1c2luZyBPVVQgb2YgdGhlIGlucHV0IC0gZm9ybWF0IGZ1bGx5XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNvdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3VzaW4oZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgSU4gZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcclxuICAgKiB3aXRoIHRoaXMgbmV3IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZHJhZ1N0YXRlKSB7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuSU5URVJOQUw6XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLkVYVEVSTkFMOlxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG8gbm90aGluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHN0YXJ0IG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdzdGFydChlKSB7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxyXG4gICAgICA/IERSQUdfU1RBVEVTLklOVEVSTkFMXHJcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHBhc3Rpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBDbGlwYm9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvblBhc3RlKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ1Bhc3RlIGV2ZW50JywgZSk7XHJcbiAgICBjb25zdCBjaGFycyA9IGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICBjb25zdCBwb3RlbnRpYWxWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBjaGFycyxcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuc2V0VmFsdWUocG90ZW50aWFsVmFsdWUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICBvbktleXByZXNzKGUpIHtcclxuICAgY29uc29sZS5kZWJ1Zygna2V5cHJlc3MnLCBlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcHJlc3NpbmcgYW55IGtleSBpbnNpZGUgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uS2V5ZG93bihlKSB7XHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkgPyBrZXljb2RlKGUpLnJlcGxhY2UoJ251bXBhZCAnLCAnJykgOiBudWxsLFxyXG4gICAgICBjYXJldFN0YXJ0OiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIGNhcmV0RW5kOiB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kLFxyXG4gICAgICBjdXJyZW50VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgbmV3VmFsdWU6IHRoaXMuZWxlbWVudC52YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSB0aGlzLmdldEFjdGlvblR5cGUoa2V5SW5mby5rZXlOYW1lLCBlKTtcclxuXHJcbiAgICBjb25zb2xlLmRlYnVnKGFjdGlvblR5cGUpO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uVHlwZSkge1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5OVU1CRVI6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25OdW1iZXIoa2V5SW5mbyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLkRFQ0lNQUw6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWNpbWFsKGtleUluZm8sIHRoaXMub3B0aW9ucyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk1JTlVTOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uTWludXMoa2V5SW5mbyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlNIT1JUQ1VUOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uU2hvcnRjdXQoa2V5SW5mbywgdGhpcy5vcHRpb25zKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVzpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9NRTpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuRU5EOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBiZWhhdmlvdXJcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVmVydGljYWxBcnJvdyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMudmFsdWVTdGVwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuQkFDS1NQQUNFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uQmFja3NwYWNlKGtleUluZm8sIHRoaXMub3B0aW9ucy50aG91c2FuZHMpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5ERUxFVEU6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWxldGUoa2V5SW5mbywgdGhpcy5vcHRpb25zLnRob3VzYW5kcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlVORE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25VbmRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuUkVETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblJlZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIElmIGN0cmwga2V5IG1vZGlmaWVyIGlzIHByZXNzZWQgdGhlbiBhbGxvdyBzcGVjaWZpYyBldmVudCBoYW5kbGVyXHJcbiAgICAgICAgLy8gdG8gaGFuZGxlIHRoaXNcclxuICAgICAgICBpZiAoIWUuY3RybEtleSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBoZWxwZXJzLnBhcnRpYWxGb3JtYXQoa2V5SW5mby5uZXdWYWx1ZSwgdGhpcy5vcHRpb25zKTtcclxuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGtleUluZm8ubmV3VmFsdWU7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG4gICAgY29uc3Qgb2Zmc2V0ID0gaGVscGVycy5jYWxjdWxhdGVPZmZzZXQoXHJcbiAgICAgIGN1cnJlbnRWYWx1ZSxcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgIHRoaXMub3B0aW9uc1xyXG4gICAgKTtcclxuICAgIGNvbnN0IG5ld0NhcmV0UG9zID0ga2V5SW5mby5jYXJldFN0YXJ0ICsgb2Zmc2V0O1xyXG4gICAgdGhpcy5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKG5ld0NhcmV0UG9zLCBuZXdDYXJldFBvcyk7XHJcbiAgICB0aGlzLmhpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBCYWNrdXAgZXZlbnQgaWYgaW5wdXQgY2hhbmdlcyBmb3IgYW55IG90aGVyIHJlYXNvbiwganVzdCBmb3JtYXQgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IEV2ZW50XHJcbiAgICovXHJcbiAgb25JbnB1dChlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdvbiBJTlBVVCcsIGUpO1xyXG4gICAgdGhpcy5zZXRWYWx1ZSh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbnB1dDtcclxuIiwiXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLyoqXHJcbiAqIEVkaXQgYSBzdHJpbmcgd2l0aCBhIG5ldyBzdHJpbmcgdG8gYWRkLlxyXG4gKiBIYW5kbGVzIHRoZSBjYXNlIGlmIHRleHQgaXMgaGlnaGxpZ2h0ZWQgYWxzbywgaW4gd2hpY2ggY2FzZSB0aGF0IHRleHRcclxuICogd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSAndG9BZGQnIHN0cmluZ1xyXG4gKi9cclxuZXhwb3J0cy5lZGl0U3RyaW5nID0gZnVuY3Rpb24oc3RyLCB0b0FkZCwgY2FyZXRTdGFydCwgY2FyZXRFbmQgPSBjYXJldFN0YXJ0KSB7XHJcbiAgY29uc3QgZmlyc3RIYWxmID0gc3RyLnNsaWNlKDAsIGNhcmV0U3RhcnQpO1xyXG4gIGNvbnN0IHNlY29uZEhhbGYgPSBzdHIuc2xpY2UoY2FyZXRFbmQsIHN0ci5sZW5ndGgpO1xyXG4gIHJldHVybiBgJHtmaXJzdEhhbGZ9JHt0b0FkZH0ke3NlY29uZEhhbGZ9YDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bGx5IGZvcm1hdCB0aGUgdmFsdWVcclxuICovXHJcbmV4cG9ydHMuZnVsbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xyXG5cclxuICAvLyBUT0RPIC0gRnVsbCBmb3JtYXRcclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnRpYWxseSBmb3JtYXQgdGhlIHZhbHVlLCBvbmx5IGFkZGluZyBjb21tYXMgYXMgbmVlZGVkIChEb25lIG9uIGtleXByZXNzL2tleXVwKVxyXG4gKi9cclxuZXhwb3J0cy5wYXJ0aWFsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgbGV0IHN0ciA9IHZhbC5yZXBsYWNlKG5ldyBSZWdFeHAoYFskeyhvcHRpb25zLmN1cnJlbmN5IHx8ICcnKX0ke29wdGlvbnMudGhvdXNhbmRzfV1gLCAnZycpLCAnJyk7XHJcbiAgY29uc3Qgc3RhcnRJbmRleCA9IHN0ci5pbmRleE9mKG9wdGlvbnMuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyBzdHIuaW5kZXhPZihvcHRpb25zLmRlY2ltYWwpIC0gMVxyXG4gICAgOiBzdHIubGVuZ3RoIC0gMTtcclxuICBjb25zdCBlbmRJbmRleCA9IHN0clswXSA9PT0gJy0nID8gMSA6IDA7XHJcblxyXG4gIC8vIGkgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVybyBiZWNhdXNlIG51bWJlciBjYW5ub3Qgc3RhcnQgd2l0aCBjb21tYVxyXG4gIGxldCBpID0gc3RhcnRJbmRleDtcclxuICBsZXQgaiA9IDE7XHJcbiAgZm9yIChpLCBqOyBpID4gZW5kSW5kZXg7IGktLSwgaisrKSB7XHJcbiAgICAvLyBFdmVyeSAzIGNoYXJhY2VycywgYWRkIGEgY29tbWFcclxuICAgIGlmIChqICUgMyA9PT0gMCkge1xyXG4gICAgICBzdHIgPSB0aGlzLmVkaXRTdHJpbmcoc3RyLCAnLCcsIGkpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBPbmx5IGFkZCBjdXJyZW5jeSBzeW1ib2wgb24gaWYgdmFsdWUgaGFzIGFueSBudW1iZXJzXHJcbiAgaWYgKG9wdGlvbnMuY3VycmVuY3kgJiYgc3RyICYmIHN0ci5tYXRjaCgvXFxkLykpIHtcclxuICAgIHJldHVybiBzdHJbMF0gPT09ICctJyA/IHN0ci5yZXBsYWNlKCctJywgYC0ke29wdGlvbnMuY3VycmVuY3l9YCkgOiBgJHtvcHRpb25zLmN1cnJlbmN5fSR7c3RyfWBcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxjdWxhdGUgaG93IG1hbnkgY2hhcmFjdGVycyBoYXZlIGJlZW4gYWRkZWQgKG9yIHJlbW92ZWQpIGJlZm9yZSB0aGUgZ2l2ZW5cclxuICogY2FyZXQgcG9zaXRpb24gYWZ0ZXIgZm9ybWF0dGluZy4gQ2FyZXQgaXMgdGhlbiBhZGp1c3RlZCBieSB0aGUgcmV0dXJuZWQgb2Zmc2V0XHJcbiAqIEN1cnJlbmN5IHN5bWJvbCBvciB0aG91c2FuZCBzZXBhcmF0b3JzIG1heSBoYXZlIGJlZW4gYWRkZWRcclxuICovXHJcbmV4cG9ydHMuY2FsY3VsYXRlT2Zmc2V0ID0gZnVuY3Rpb24ocHJldiwgY3VyciwgcG9zLCBvcHRpb25zKSB7XHJcbiAgbGV0IGksIHByZXZTeW1ib2xzID0gMCwgY3VycmVudFN5bWJvbHMgPSAwO1xyXG4gIGZvciAoaT0wOyBpIDwgcG9zOyBpKyspIHtcclxuICAgIGlmIChwcmV2W2ldID09PSBvcHRpb25zLnRob3VzYW5kcyB8fCAob3B0aW9ucy5jdXJyZW5jeSAmJiBwcmV2W2ldID09PSBvcHRpb25zLmN1cnJlbmN5KSkge1xyXG4gICAgICBwcmV2U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAoY3VycltpXSA9PT0gb3B0aW9ucy50aG91c2FuZHMgfHwgKG9wdGlvbnMuY3VycmVuY3kgJiYgY3VycltpXSA9PT0gb3B0aW9ucy5jdXJyZW5jeSkpIHtcclxuICAgICAgY3VycmVudFN5bWJvbHMrKztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnRTeW1ib2xzIC0gcHJldlN5bWJvbHM7XHJcbn1cclxuIiwiLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gICAgIEtFWSBIQU5ETEVSUyAgICAgLy9cclxuLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gQWxsIGZ1bmN0aW9ucyBkZWFsaW5nIHdpdGgga2V5cHJlc3NlcyAobGlzdGVuZWQgdG8gb24gdGhlIGtleWRvd24gZXZlbnQpXHJcbi8vIGFyZSBoZXJlLCB3aXRoIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCB0eXBlcyBvZiBrZXlcclxuXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4vaGVscGVycyc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgLyoqXHJcbiAgICogTlVNQkVSIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk51bWJlcjogZnVuY3Rpb24oa2V5SW5mbykge1xyXG4gICAgY29uc3QgYWxsb3dlZE51bWJlciA9XHJcbiAgICAgICEoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gPT09ICctJ1xyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDBcclxuICAgICAgJiYga2V5SW5mby5jYXJldEVuZCA9PT0gMCk7XHJcblxyXG4gICAgaWYgKGFsbG93ZWROdW1iZXIpIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhrZXlJbmZvLmN1cnJlbnRWYWx1ZSwga2V5SW5mby5rZXlOYW1lLCBrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY2FyZXRFbmQpO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBNSU5VUyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25NaW51czogZnVuY3Rpb24oa2V5SW5mbykge1xyXG4gICAgY29uc3QgbWludXNBbGxvd2VkID0ga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwICYmXHJcbiAgICAgIChrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSAhPT0gJy0nIHx8IGtleUluZm8uY2FyZXRFbmQgPiAwKTtcclxuXHJcbiAgICAgaWYgKG1pbnVzQWxsb3dlZCkge1xyXG4gICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgICctJyxcclxuICAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICApO1xyXG4gICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICAgfVxyXG4gICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUNJTUFMIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge2xhbmd1YWdlRGF0YX0gTGFuZ3VhZ2Ugc3BlY2lmaWMgaW5mbyBmb3IgdGhlIHNlbGVjdGVkIGxhbmd1YWdlXHJcbiAgICovXHJcbiAgb25EZWNpbWFsOiBmdW5jdGlvbihrZXlJbmZvLCBsYW5ndWFnZURhdGEpIHtcclxuICAgIGNvbnN0IGRlY2ltYWxJbmRleCA9IGtleUluZm8uY3VycmVudFZhbHVlLmluZGV4T2YobGFuZ3VhZ2VEYXRhLmRlY2ltYWwpO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGlzIG5vdCBhbHJlYWR5IGEgZGVjaW1hbCBvciB0aGUgb3JpZ2luYWwgd291bGQgYmUgcmVwbGFjZWRcclxuICAgIC8vIEFkZCB0aGUgZGVjaW1hbFxyXG4gICAgY29uc3QgZGVjaW1hbEFsbG93ZWQgPVxyXG4gICAgICAoZGVjaW1hbEluZGV4ID09PSAtMSkgfHxcclxuICAgICAgICAoZGVjaW1hbEluZGV4ID49IGtleUluZm8uY2FyZXRTdGFydCAmJlxyXG4gICAgICAgICBkZWNpbWFsSW5kZXggPCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuXHJcbiAgICBpZiAoZGVjaW1hbEFsbG93ZWQpXHJcbiAgICB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAga2V5SW5mby5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgbGFuZ3VhZ2VEYXRhLmRlY2ltYWwsXHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0LFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNIT1JUQ1VUIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge2xhbmd1YWdlRGF0YX0gTGFuZ3VhZ2Ugc3BlY2lmaWMgaW5mbyBmb3IgdGhlIHNlbGVjdGVkIGxhbmd1YWdlXHJcbiAgICovXHJcbiAgb25TaG9ydGN1dDogZnVuY3Rpb24oa2V5SW5mbywgbGFuZ3VhZ2VEYXRhKSB7XHJcbiAgICBjb25zdCBwb3dlciA9IGxhbmd1YWdlRGF0YS5zaG9ydGN1dHNba2V5SW5mby5rZXlOYW1lLnRvTG93ZXJDYXNlKCldO1xyXG5cclxuICAgIGlmIChwb3dlcikge1xyXG4gICAgICAvLyBUT0RPIC0gbXVsdGlwbHkgY3VycmVudCB2YWx1ZSBieSBzaG9ydGN1dFxyXG5cclxuICAgICAgLy8gVE9ETyAtIEJFSEFWSU9VUjogc2hvdWxkIGNhcmV0IHRvIGp1bXAgdG8gZW5kPyBhcyB3aG9sZSB2YWx1ZSBpc1xyXG4gICAgICAvLyBtdWxpcGxpZWQgYnkgdGhlIG11bHRpcGxlciAtIChkb2Vzbid0IGp1c3QgY2h1Y2sgemVyb3MgaW4gdGhlIG1pZGRsZSlcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ID0ga2V5SW5mby5uZXdWYWx1ZS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQkFDS1NQQUNFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbkJhY2tzcGFjZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBCRUZPUkUgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSAnJztcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBiZWZvcmUgaXRcclxuICAgICAgICBsZXQgY2FyZXRKdW1wID0gMTtcclxuXHJcbiAgICAgICAgY2FyZXRKdW1wID0gKChrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApID49IDApID8gY2FyZXRKdW1wIDogMDtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAtY2FyZXRKdW1wO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25EZWxldGUgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcclxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBERUxFVEUgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7bGFuZ3VhZ2VEYXRhfSBMYW5ndWFnZSBzcGVjaWZpYyBpbmZvIGZvciB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcclxuICAgKi9cclxuICBvbkRlbGV0ZTogZnVuY3Rpb24oa2V5SW5mbywgdGhvdXNhbmRzKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGNvbnN0IG5leHRDaGFyID0ga2V5SW5mby5jdXJyZW50VmFsdWVba2V5SW5mby5jYXJldFN0YXJ0XTtcclxuXHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSAnJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYWZ0ZXIgaXRcclxuICAgICAgICBjb25zdCB0aG91c2FuZHNOZXh0ID0gbmV4dENoYXIgPT09IHRob3VzYW5kcztcclxuXHJcbiAgICAgICAgLy8gSWYgY2hhciB0byBkZWxldGUgaXMgdGhvdXNhbmRzIGFuZCBudW1iZXIgaXMgbm90IHRvIGJlIGRlbGV0ZWQgLSBza2lwIG92ZXIgaXRcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gdGhvdXNhbmRzTmV4dCA/IDEgOiAwO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0SGFsZlN0YXJ0ID0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICArICh0aG91c2FuZHNOZXh0ID8gMCA6IDEpO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShsYXN0SGFsZlN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTYW1lIGNvZGUgYXMgb25CYWNrc3BhY2UgaGFuZGxlciBmb3IgZGVsZXRpbmcgYSBzZWxlY3Rpb24gcmFuZ2VcclxuICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0RW5kLCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8ubmV3VmFsdWUgPSBmaXJzdEhhbGYgKyBsYXN0SGFsZjtcclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBWRVJUSUNBTCBBUlJPVyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtzdGVwfSBIb3cgbXVjaCB0byBpbmNyZWFzZS9kZWNyZWFzZSB2YWx1ZSBieVxyXG4gICAqL1xyXG4gIG9uVmVydGljYWxBcnJvdzogZnVuY3Rpb24oa2V5SW5mbywgc3RlcCkge1xyXG4gICAgLy8gSWYgc3RlcCBpcyAwIChvciBmYWxzZXkpIHRoZW4gYXNzdW1lIGFycm93IGtleSB2YWx1ZSBjaGFuZ2luZyBpcyBkaXNhYmxlZFxyXG4gICAgaWYgKHN0ZXAgJiYgIWlzTmFOKHN0ZXApKSB7XHJcbiAgICAgIHN3aXRjaCAoa2V5SW5mby5rZXlOYW1lKSB7XHJcbiAgICAgICAgY2FzZSAndXAnOlxyXG4gICAgICAgICAgLy8gVE9ETyAtIFVwIGFycm93IHN0ZXBcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2Rvd24nOlxyXG4gICAgICAgICAgLy8gVE9ETyAtIERvd24gYXJyb3cgc3RlcFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIC8vIERvIG5vdGhpbmdcclxuICAgICAgfVxyXG4gICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVU5ETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSB1bmRvXHJcbiAgICovXHJcbiAgb25VbmRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5oaXN0b3J5LnVuZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBSRURPIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHJlZG9cclxuICAgKi9cclxuICBvblJlZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcclxuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Lmhpc3RvcnkucmVkbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcbn1cclxuIiwiXHJcbmNvbnN0IE1BWF9CVUZGRVJfU0laRSA9IDUwO1xyXG5cclxuLyoqXHJcbiAqIFZhbHVlIEhpc3RvcnkgLSBNYW5hZ2VzIGFuIGFycmF5IG9mIHZhbHVlcyB0aGF0IGNhbiBiZSB0cmFja2VkLCBzdXBwb3J0aW5nXHJcbiAqIHRoZSB1bmRvIGFuZCByZWRvIG9wZXJhdGlvbnMgaW4gdGhlIGlucHV0XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYWx1ZUhpc3Rvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBbbnVsbF07XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBoaXN0b3J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50SW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xyXG4gIH1cclxuICBnZXQgY3VycmVudFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yeVt0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgfVxyXG5cclxuICBzZXQgY3VycmVudEluZGV4KGkpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IGk7XHJcbiAgfVxyXG4gIHNldCBoaXN0b3J5KGhpc3RvcnkpIHtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBoaXN0b3J5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVW5kbyBjaGFuZ2UsIHNvIHJldHVybiB0byBwcmV2aW91cyB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgdW5kbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgtLTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogUmVkbyBjaGFuZ2UsIHNvIHJldHVybiB0byBuZXh0IHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICByZWRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQWRkIG5ldyB2YWx1ZSB0byBoaXN0b3J5IGFycmF5LiBBbnkgcG9zc2libGUgJ3JlZG8ncycgYXJlIHJlbW92ZWQgZnJvbSBhcnJheVxyXG4gICAqIGFzIGEgbmV3ICdicmFuY2gnIG9mIGhpc3RvcnkgaXMgY3JlYXRlZCB3aGVuIGEgbmV3IHZhbHVlIGlzIGFkZGVkXHJcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGFkZCB0byBoaXN0b3J5XHJcbiAgICovXHJcbiAgYWRkVmFsdWUodmFsKSB7XHJcbiAgICAvLyBEZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjdXJyZW50IHZhbHVlXHJcbiAgICBpZiAodmFsICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmhpc3Rvcnkuc3BsaWNlKHRoaXMuY3VycmVudEluZGV4ICsgMSwgbnVsbCwgdmFsKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gTUFYX0JVRkZFUl9TSVpFKSB7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5LnNoaWZ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbn1cclxuIl19
