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
/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function () {

    /************************************
        Constants
    ************************************/

    var numeral,
        VERSION = '1.5.3',
        // internal storage for language config files
        languages = {},
        currentLanguage = 'en',
        zeroFormat = null,
        defaultFormat = '0,0',
        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports);


    /************************************
        Constructors
    ************************************/


    // Numeral prototype object
    function Numeral (number) {
        this._value = number;
    }

    /**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     */
    function toFixed (value, precision, roundingFunction, optionals) {
        var power = Math.pow(10, precision),
            optionalsRegExp,
            output;
            
        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
        // Multiply up by precision, round accurately, then divide and use native toFixed():
        output = (roundingFunction(value * power) / power).toFixed(precision);

        if (optionals) {
            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
            output = output.replace(optionalsRegExp, '');
        }

        return output;
    }

    /************************************
        Formatting
    ************************************/

    // determine what type of formatting we need to do
    function formatNumeral (n, format, roundingFunction) {
        var output;

        // figure out what kind of format we are dealing with
        if (format.indexOf('$') > -1) { // currency!!!!!
            output = formatCurrency(n, format, roundingFunction);
        } else if (format.indexOf('%') > -1) { // percentage
            output = formatPercentage(n, format, roundingFunction);
        } else if (format.indexOf(':') > -1) { // time
            output = formatTime(n, format);
        } else { // plain ol' numbers or bytes
            output = formatNumber(n._value, format, roundingFunction);
        }

        // return string
        return output;
    }

    // revert to number
    function unformatNumeral (n, string) {
        var stringOriginal = string,
            thousandRegExp,
            millionRegExp,
            billionRegExp,
            trillionRegExp,
            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            bytesMultiplier = false,
            power;

        if (string.indexOf(':') > -1) {
            n._value = unformatTime(string);
        } else {
            if (string === zeroFormat) {
                n._value = 0;
            } else {
                if (languages[currentLanguage].delimiters.decimal !== '.') {
                    string = string.replace(/\./g,'').replace(languages[currentLanguage].delimiters.decimal, '.');
                }

                // see if abbreviations are there so that we can multiply to the correct number
                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');

                // see if bytes are there so that we can multiply to the correct number
                for (power = 0; power <= suffixes.length; power++) {
                    bytesMultiplier = (string.indexOf(suffixes[power]) > -1) ? Math.pow(1024, power + 1) : false;

                    if (bytesMultiplier) {
                        break;
                    }
                }

                // do some math to create our number
                n._value = ((bytesMultiplier) ? bytesMultiplier : 1) * ((stringOriginal.match(thousandRegExp)) ? Math.pow(10, 3) : 1) * ((stringOriginal.match(millionRegExp)) ? Math.pow(10, 6) : 1) * ((stringOriginal.match(billionRegExp)) ? Math.pow(10, 9) : 1) * ((stringOriginal.match(trillionRegExp)) ? Math.pow(10, 12) : 1) * ((string.indexOf('%') > -1) ? 0.01 : 1) * (((string.split('-').length + Math.min(string.split('(').length-1, string.split(')').length-1)) % 2)? 1: -1) * Number(string.replace(/[^0-9\.]+/g, ''));

                // round if we are talking about bytes
                n._value = (bytesMultiplier) ? Math.ceil(n._value) : n._value;
            }
        }
        return n._value;
    }

    function formatCurrency (n, format, roundingFunction) {
        var symbolIndex = format.indexOf('$'),
            openParenIndex = format.indexOf('('),
            minusSignIndex = format.indexOf('-'),
            space = '',
            spliceIndex,
            output;

        // check for space before or after currency
        if (format.indexOf(' $') > -1) {
            space = ' ';
            format = format.replace(' $', '');
        } else if (format.indexOf('$ ') > -1) {
            space = ' ';
            format = format.replace('$ ', '');
        } else {
            format = format.replace('$', '');
        }

        // format the number
        output = formatNumber(n._value, format, roundingFunction);

        // position the symbol
        if (symbolIndex <= 1) {
            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
                output = output.split('');
                spliceIndex = 1;
                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex){
                    // the symbol appears before the "(" or "-"
                    spliceIndex = 0;
                }
                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
                output = output.join('');
            } else {
                output = languages[currentLanguage].currency.symbol + space + output;
            }
        } else {
            if (output.indexOf(')') > -1) {
                output = output.split('');
                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
                output = output.join('');
            } else {
                output = output + space + languages[currentLanguage].currency.symbol;
            }
        }

        return output;
    }

    function formatPercentage (n, format, roundingFunction) {
        var space = '',
            output,
            value = n._value * 100;

        // check for space before %
        if (format.indexOf(' %') > -1) {
            space = ' ';
            format = format.replace(' %', '');
        } else {
            format = format.replace('%', '');
        }

        output = formatNumber(value, format, roundingFunction);
        
        if (output.indexOf(')') > -1 ) {
            output = output.split('');
            output.splice(-1, 0, space + '%');
            output = output.join('');
        } else {
            output = output + space + '%';
        }

        return output;
    }

    function formatTime (n) {
        var hours = Math.floor(n._value/60/60),
            minutes = Math.floor((n._value - (hours * 60 * 60))/60),
            seconds = Math.round(n._value - (hours * 60 * 60) - (minutes * 60));
        return hours + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds);
    }

    function unformatTime (string) {
        var timeArray = string.split(':'),
            seconds = 0;
        // turn hours and minutes into seconds and add them all up
        if (timeArray.length === 3) {
            // hours
            seconds = seconds + (Number(timeArray[0]) * 60 * 60);
            // minutes
            seconds = seconds + (Number(timeArray[1]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[2]);
        } else if (timeArray.length === 2) {
            // minutes
            seconds = seconds + (Number(timeArray[0]) * 60);
            // seconds
            seconds = seconds + Number(timeArray[1]);
        }
        return Number(seconds);
    }

    function formatNumber (value, format, roundingFunction) {
        var negP = false,
            signed = false,
            optDec = false,
            abbr = '',
            abbrK = false, // force abbreviation to thousands
            abbrM = false, // force abbreviation to millions
            abbrB = false, // force abbreviation to billions
            abbrT = false, // force abbreviation to trillions
            abbrForce = false, // force abbreviation
            bytes = '',
            ord = '',
            abs = Math.abs(value),
            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            min,
            max,
            power,
            w,
            precision,
            thousands,
            d = '',
            neg = false;

        // check if number is zero and a custom zero format has been set
        if (value === 0 && zeroFormat !== null) {
            return zeroFormat;
        } else {
            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (format.indexOf('(') > -1) {
                negP = true;
                format = format.slice(1, -1);
            } else if (format.indexOf('+') > -1) {
                signed = true;
                format = format.replace(/\+/g, '');
            }

            // see if abbreviation is wanted
            if (format.indexOf('a') > -1) {
                // check if abbreviation is specified
                abbrK = format.indexOf('aK') >= 0;
                abbrM = format.indexOf('aM') >= 0;
                abbrB = format.indexOf('aB') >= 0;
                abbrT = format.indexOf('aT') >= 0;
                abbrForce = abbrK || abbrM || abbrB || abbrT;

                // check for space before abbreviation
                if (format.indexOf(' a') > -1) {
                    abbr = ' ';
                    format = format.replace(' a', '');
                } else {
                    format = format.replace('a', '');
                }

                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
                    // trillion
                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
                    value = value / Math.pow(10, 12);
                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
                    // billion
                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
                    value = value / Math.pow(10, 9);
                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
                    // million
                    abbr = abbr + languages[currentLanguage].abbreviations.million;
                    value = value / Math.pow(10, 6);
                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
                    // thousand
                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
                    value = value / Math.pow(10, 3);
                }
            }

            // see if we are formatting bytes
            if (format.indexOf('b') > -1) {
                // check for space before
                if (format.indexOf(' b') > -1) {
                    bytes = ' ';
                    format = format.replace(' b', '');
                } else {
                    format = format.replace('b', '');
                }

                for (power = 0; power <= suffixes.length; power++) {
                    min = Math.pow(1024, power);
                    max = Math.pow(1024, power+1);

                    if (value >= min && value < max) {
                        bytes = bytes + suffixes[power];
                        if (min > 0) {
                            value = value / min;
                        }
                        break;
                    }
                }
            }

            // see if ordinal is wanted
            if (format.indexOf('o') > -1) {
                // check for space before
                if (format.indexOf(' o') > -1) {
                    ord = ' ';
                    format = format.replace(' o', '');
                } else {
                    format = format.replace('o', '');
                }

                ord = ord + languages[currentLanguage].ordinal(value);
            }

            if (format.indexOf('[.]') > -1) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            w = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');

            if (precision) {
                if (precision.indexOf('[') > -1) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    d = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    d = toFixed(value, precision.length, roundingFunction);
                }

                w = d.split('.')[0];

                if (d.split('.')[1].length) {
                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
                } else {
                    d = '';
                }

                if (optDec && Number(d.slice(1)) === 0) {
                    d = '';
                }
            } else {
                w = toFixed(value, null, roundingFunction);
            }

            // format number
            if (w.indexOf('-') > -1) {
                w = w.slice(1);
                neg = true;
            }

            if (thousands > -1) {
                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                w = '';
            }

            return ((negP && neg) ? '(' : '') + ((!negP && neg) ? '-' : '') + ((!neg && signed) ? '+' : '') + w + d + ((ord) ? ord : '') + ((abbr) ? abbr : '') + ((bytes) ? bytes : '') + ((negP && neg) ? ')' : '');
        }
    }

    /************************************
        Top Level Functions
    ************************************/

    numeral = function (input) {
        if (numeral.isNumeral(input)) {
            input = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            input = 0;
        } else if (!Number(input)) {
            input = numeral.fn.unformat(input);
        }

        return new Numeral(Number(input));
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function (obj) {
        return obj instanceof Numeral;
    };

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    numeral.language = function (key, values) {
        if (!key) {
            return currentLanguage;
        }

        if (key && !values) {
            if(!languages[key]) {
                throw new Error('Unknown language : ' + key);
            }
            currentLanguage = key;
        }

        if (values || !languages[key]) {
            loadLanguage(key, values);
        }

        return numeral;
    };
    
    // This function provides access to the loaded language data.  If
    // no arguments are passed in, it will simply return the current
    // global language object.
    numeral.languageData = function (key) {
        if (!key) {
            return languages[currentLanguage];
        }
        
        if (!languages[key]) {
            throw new Error('Unknown language : ' + key);
        }
        
        return languages[key];
    };

    numeral.language('en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (~~ (number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    numeral.zeroFormat = function (format) {
        zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function (format) {
        defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    /************************************
        Helpers
    ************************************/

    function loadLanguage(key, values) {
        languages[key] = values;
    }

    /************************************
        Floating-point helpers
    ************************************/

    // The floating-point helper functions and implementation
    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/

    /**
     * Array.prototype.reduce for browsers that don't support it
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
     */
    if ('function' !== typeof Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, opt_initialValue) {
            'use strict';
            
            if (null === this || 'undefined' === typeof this) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }
            
            if ('function' !== typeof callback) {
                throw new TypeError(callback + ' is not a function');
            }

            var index,
                value,
                length = this.length >>> 0,
                isValueSet = false;

            if (1 < arguments.length) {
                value = opt_initialValue;
                isValueSet = true;
            }

            for (index = 0; length > index; ++index) {
                if (this.hasOwnProperty(index)) {
                    if (isValueSet) {
                        value = callback(value, this[index], index, this);
                    } else {
                        value = this[index];
                        isValueSet = true;
                    }
                }
            }

            if (!isValueSet) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            return value;
        };
    }

    
    /**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
    function multiplier(x) {
        var parts = x.toString().split('.');
        if (parts.length < 2) {
            return 1;
        }
        return Math.pow(10, parts[1].length);
    }

    /**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
    function correctionFactor() {
        var args = Array.prototype.slice.call(arguments);
        return args.reduce(function (prev, next) {
            var mp = multiplier(prev),
                mn = multiplier(next);
        return mp > mn ? mp : mn;
        }, -Infinity);
    }        


    /************************************
        Numeral Prototype
    ************************************/


    numeral.fn = Numeral.prototype = {

        clone : function () {
            return numeral(this);
        },

        format : function (inputString, roundingFunction) {
            return formatNumeral(this, 
                  inputString ? inputString : defaultFormat, 
                  (roundingFunction !== undefined) ? roundingFunction : Math.round
              );
        },

        unformat : function (inputString) {
            if (Object.prototype.toString.call(inputString) === '[object Number]') { 
                return inputString; 
            }
            return unformatNumeral(this, inputString ? inputString : defaultFormat);
        },

        value : function () {
            return this._value;
        },

        valueOf : function () {
            return this._value;
        },

        set : function (value) {
            this._value = Number(value);
            return this;
        },

        add : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum + corrFactor * curr;
            }
            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
            return this;
        },

        subtract : function (value) {
            var corrFactor = correctionFactor.call(null, this._value, value);
            function cback(accum, curr, currI, O) {
                return accum - corrFactor * curr;
            }
            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;            
            return this;
        },

        multiply : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) * (curr * corrFactor) /
                    (corrFactor * corrFactor);
            }
            this._value = [this._value, value].reduce(cback, 1);
            return this;
        },

        divide : function (value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = correctionFactor(accum, curr);
                return (accum * corrFactor) / (curr * corrFactor);
            }
            this._value = [this._value, value].reduce(cback);            
            return this;
        },

        difference : function (value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }

    };

    /************************************
        Exposing Numeral
    ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = numeral;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `numeral` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this['numeral'] = numeral;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return numeral;
        });
    }
}).call(this);

},{}],3:[function(require,module,exports){
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
  REDO: 'REDO'
};

exports.DRAG_STATES = {
  NONE: 'NONE',
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
};

exports.DELIMITER_STRATEGIES = {
  SKIP: 'SKIP',
  DELETE_NUMBER: 'DELETE_NUMBER'
};

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright Ali Sheehan-Dare, all rights and profits reserved.

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

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
var languageData = {
  en: {
    shortcuts: {
      'k': 3,
      'm': 6,
      'b': 9
    },
    delimiter: ',',
    decimal: '.'
  }
};

var DEFAULTS = {
  format: '0,0.00',
  lang: 'en',
  maxValue: 10e+12,
  minValue: -10e+12,
  maxLength: 15,
  valueStep: 1,
  droppableClass: 'finput-droppable',
  delimiterDeleteStrategy: _constants.DELIMITER_STRATEGIES.SKIP
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
   * @param {Options.lang} Language (used in letter abbreviations etc...)
   * @param {Options.maxValue} Limit input value to a maximum value
   * @param {Options.minValue} Limit input value to a minimum value
   * @param {Options.maxDigits} Limit input value to a maximum number of digits
   * @param {Options.valueStep OR false} Change how much the value changes when pressing up/down arrow keys
   * @param {Options.droppableClass} Class to give to the input when text drag event has started on the page
   * @param {Options.delimiterDeleteStrategy} Behaviour to apply when deleting or backspacing a delimiter
   */

  function Finput(element, options) {
    var _this = this;

    _classCallCheck(this, Finput);

    this._element = element;
    this._options = Object.assign(DEFAULTS, options);
    this._languageData = languageData[this.options.lang];
    this._actionTypes = this.createActionTypes();
    this._history = new _valueHistory2.default();

    _numeral2.default.defaultFormat(this.options.format);

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

    this.element.addEventListener('dragenter', function (e) {
      return _this.onDragenter(e);
    });
    this.element.addEventListener('dragleave', function (e) {
      return _this.onDragleave(e);
    });
  }

  // GETTERS

  _createClass(Finput, [{
    key: 'createActionTypes',

    /**
     * Creates the correct action type to char/key codes array with the
     * correct decimal and delimiter characters (depending on language)
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
        names: [this.languageData.decimal]
      }, {
        type: _constants.ACTION_TYPES.DELIMITER,
        names: [this.languageData.delimiter]
      }, {
        type: _constants.ACTION_TYPES.SHORTCUT,
        names: Object.keys(this.languageData.shortcuts)
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
     * Check value is not too large or small
     * @param {val} Value to check
     */

  }, {
    key: 'checkValueMagnitude',
    value: function checkValueMagnitude(val) {
      var num = (0, _numeral2.default)().unformat(val);
      return num ? num <= this.options.maxValue && num >= this.options.minValue : true;
    }
    /**
     * Check value is not too many characters long
     * @param {val} Value to check
     */

  }, {
    key: 'checkValueLength',
    value: function checkValueLength(val) {
      var num = (0, _numeral2.default)().unformat(val);
      return num ? num.toString().length <= this.options.maxLength : true;
    }
    /**
     * Combines the above functions to decide whether the given value is not too
     * large or to many characters
     * @param {val} Value to check
     */

  }, {
    key: 'checkValueSizing',
    value: function checkValueSizing(val) {
      return this.checkValueLength(val) && this.checkValueMagnitude(val);
    }

    /**
     * Sets the value, fully formatted, for the input
     * @param {val} New value to set
     */

  }, {
    key: 'setValue',
    value: function setValue(val) {
      var newValue = _helpers2.default.fullFormat(val, this.options.format, this.options.currency);
      var isValueValid = this.checkValueSizing(newValue);
      var valueCanChange = newValue && isValueValid;

      if (valueCanChange) {
        this.element.value = newValue;
        this.history.addValue(newValue);
      }

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
      console.log('Focus OUT event', e);
      var valueChanged = this.setValue(this.element.value);
    }
    /**
     * On focus of the input - Select all text
     * @param {e} Focus event
     */

  }, {
    key: 'onFocusin',
    value: function onFocusin(e) {
      console.log('Focus IN event', e);
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
      console.log('Drop event', e);

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
      if (this.dragState === _constants.DRAG_STATES.EXTERNAL) {
        this.element.classList.add(this.options.droppableClass);
      }
      console.log('Drag STARTED', this.dragState, e);
    }
    /**
     * On end of ANY drag on page
     * @param {e} Drag event
     */

  }, {
    key: 'onDragend',
    value: function onDragend(e) {
      console.log('Drag ENDED', this.dragState, e);
      this.dragState = _constants.DRAG_STATES.NONE;
      this.element.classList.remove(this.options.droppableClass);
    }
    /**
     * On the dragged item entering the input
     * @param {e} Drag event
     */

  }, {
    key: 'onDragenter',
    value: function onDragenter(e) {
      console.log('Drag ENTER', this.dragState, e);
    }
    /**
     * On the dragged item leaving the input
     * @param {e} Drag event
     */

  }, {
    key: 'onDragleave',
    value: function onDragleave(e) {
      console.log('Drag LEAVE', this.dragState, e);

      if (this.dragState === _constants.DRAG_STATES.EXTERNAL) {
        this.element.selectionStart = this.element.value.length;
      }
    }
    /**
     * On pasting something into the input
     * @param {e} Clipboard event
     */

  }, {
    key: 'onPaste',
    value: function onPaste(e) {
      console.log('Paste event', e);
      var chars = e.clipboardData.getData('text');
      var potentialValue = _helpers2.default.editString(this.element.value, chars, this.element.selectionStart, this.element.selectionEnd);

      var valueChanged = this.setValue(potentialValue);
      e.preventDefault();
    }
  }, {
    key: 'onKeypress',
    value: function onKeypress(e) {
      console.log('keypress', e);
    }
    /**
     * On pressing any key inside the input
     * @param {e} Keyboard event
     */

  }, {
    key: 'onKeydown',
    value: function onKeydown(e) {
      console.log('keydown', e);

      var keyInfo = {
        event: e,
        code: e.which || e.keyCode,
        keyName: (0, _keycode2.default)(e).replace('numpad ', ''),
        caretStart: this.element.selectionStart,
        caretEnd: this.element.selectionEnd,
        currentValue: this.element.value,
        newValue: this.element.value
      };

      var actionType = this.getActionType(keyInfo.keyName, e);

      switch (actionType) {
        case _constants.ACTION_TYPES.NUMBER:
          _keyHandlers2.default.onNumber(keyInfo);
          break;
        case _constants.ACTION_TYPES.DECIMAL:
          _keyHandlers2.default.onDecimal(keyInfo, this.languageData);
          break;
        case _constants.ACTION_TYPES.MINUS:
          _keyHandlers2.default.onMinus(keyInfo);
          break;
        case _constants.ACTION_TYPES.SHORTCUT:
          _keyHandlers2.default.onShortcut(keyInfo, this.languageData);
          break;
        case _constants.ACTION_TYPES.HORIZONTAL_ARROW:
          // Default behaviour
          return;
        case _constants.ACTION_TYPES.VERTICAL_ARROW:
          _keyHandlers2.default.onVerticalArrow(keyInfo, this.options.valueStep);
          break;
        case _constants.ACTION_TYPES.BACKSPACE:
          _keyHandlers2.default.onBackspace(keyInfo, this.options.delimiterDeleteStrategy, this.languageData.delimiter);
          break;
        case _constants.ACTION_TYPES.DELETE:
          _keyHandlers2.default.onDelete(keyInfo, this.options.delimiterDeleteStrategy, this.languageData.delimiter);
          break;
        case _constants.ACTION_TYPES.UNDO:
          _keyHandlers2.default.onUndo(this, e);
          return;
        case _constants.ACTION_TYPES.REDO:
          _keyHandlers2.default.onRedo(this, e);
          return;
        default:
          console.log("UNKNOWN");
          // If ctrl key modifier is pressed then allow specific event handler
          // to handle this
          if (!e.ctrlKey) {
            e.preventDefault();
          }
          return;
      }

      var newValue = _helpers2.default.partialFormat(keyInfo.newValue, this.options.currency, this.languageData);
      var currentValue = this.element.value;
      var isValueValid = this.checkValueSizing(newValue);

      this.element.value = isValueValid ? newValue : this.element.value;

      if (isValueValid) {
        var offset = _helpers2.default.calculateOffset(currentValue, this.element.value, keyInfo.caretStart, this.options.currency, this.languageData);
        var newCaretPos = keyInfo.caretStart + offset;
        this.element.setSelectionRange(newCaretPos, newCaretPos);
        this.history.addValue(newValue);
      }
    }
    /**
     * Backup event if input changes for any other reason, just format value
     * @param {e} Event
     */

  }, {
    key: 'onInput',
    value: function onInput(e) {
      console.log('on INPUT', e);
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
      return (0, _numeral2.default)().unformat(this.element.value);
    }
  }, {
    key: 'formattedValue',
    get: function get() {
      return (0, _numeral2.default)().unformat(this.element.value);
    }
  }, {
    key: 'languageData',
    get: function get() {
      return this._languageData;
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

},{"./constants":3,"./helpers":5,"./keyHandlers":6,"./valueHistory":7,"keycode":1,"numeral":2}],5:[function(require,module,exports){
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
 * Fully format the value using numeral (Done on focus out)
 */
exports.fullFormat = function (val, format, currency) {
  var fullFormat = currency ? '' + currency + format : format;

  if (!val) {
    return null;
  } else if (val.length === 1) {
    return val >= 0 && val <= 9 ? numeral(val).format(fullFormat) : null;
  } else {
    var numeralVal = numeral(val);
    if (isNaN(numeralVal.value()) || !Number.isFinite(numeralVal.value())) {
      return null;
    } else {
      return numeralVal.format(fullFormat);
    }
  }
};

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function (val, currency, languageData) {
  var str = val.replace(new RegExp('[' + (currency || '') + languageData.delimiter + ']', 'g'), '');
  var startIndex = str.indexOf(languageData.decimal) > -1 ? str.indexOf(languageData.decimal) - 1 : str.length - 1;
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
  if (currency && str && str.match(/\d/)) {
    return str[0] === '-' ? str.replace('-', '-' + currency) : '' + currency + str;
  } else {
    return str;
  }
};

/**
 * Calculate how many characters have been added (or removed) before the given
 * caret position after formatting. Caret is then adjusted by the returned offset
 * Currency symbol or delimiters may have been added
 */
exports.calculateOffset = function (prev, curr, pos, currency, languageData) {
  var i = undefined,
      j = undefined;
  for (i = 0, j = 0; i < pos; i++, j++) {
    if (prev[i] === languageData.delimiter || prev[i] === currency) {
      i++;
    }
    if (curr[j] === languageData.delimiter || curr[j] === currency) {
      j++;
    }
  }
  return j - i;
};

},{"./constants":3}],6:[function(require,module,exports){
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
      var numeralVal = numeral(keyInfo.currentValue);
      keyInfo.newValue = (numeralVal.value() ? numeralVal : numeral(1)).multiply(Math.pow(10, power)).format();

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
  onBackspace: function onBackspace(keyInfo, delimiterStrategy, delimiter) {
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
        var caretJump = delimiterStrategy === _constants.DELIMITER_STRATEGIES.DELETE_NUMBER && keyInfo.currentValue[keyInfo.caretStart - 1] === delimiter ? 2 : 1;

        caretJump = keyInfo.caretStart - caretJump > 0 ? caretJump : 0;
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
  onDelete: function onDelete(keyInfo, delimiterStrategy, delimiter) {
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
        var toDelete = delimiterStrategy === _constants.DELIMITER_STRATEGIES.DELETE_NUMBER;
        var delimiterNext = nextChar === delimiter;

        // If char to delete is delimiter and number is not to be deleted - skip over it
        keyInfo.caretStart += delimiterNext && !toDelete ? 1 : 0;

        var lastHalfStart = keyInfo.caretStart + (delimiterNext ? toDelete ? 2 : 0 : 1);
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
          keyInfo.newValue = numeral(keyInfo.currentValue).add(step).format();
          break;
        case 'down':
          keyInfo.newValue = numeral(keyInfo.currentValue).subtract(step).format();
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

},{"./constants":3,"./helpers":5}],7:[function(require,module,exports){
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
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(val);

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

},{}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9udW1lcmFsL251bWVyYWwuanMiLCJzcmNcXGNvbnN0YW50cy5qcyIsInNyY1xcZmlucHV0LmpzIiwic3JjXFxoZWxwZXJzLmpzIiwic3JjXFxrZXlIYW5kbGVycy5qcyIsInNyY1xcdmFsdWVIaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0cUJBLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDckIsUUFBTSxFQUFF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R0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM1RCxZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFdkIsWUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxlQUFlLEVBQUU7QUFDekMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjtPQUNGOztBQUVELFVBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUU1QyxhQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDMUI7Ozt3QkF0RGE7QUFDWixhQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7c0JBV1csT0FBTyxFQUFFO0FBQ25CLFVBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0tBQ3pCOzs7d0JBWmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjtzQkFLZ0IsQ0FBQyxFQUFFO0FBQ2xCLFVBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCOzs7d0JBTmtCO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDeEM7OztTQWhCa0IsWUFBWTs7O2tCQUFaLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gU291cmNlOiBodHRwOi8vanNmaWRkbGUubmV0L3ZXeDhWL1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjAzMTk1L2Z1bGwtbGlzdC1vZi1qYXZhc2NyaXB0LWtleWNvZGVzXG5cblxuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlYXJjaElucHV0KSB7XG4gIC8vIEtleWJvYXJkIEV2ZW50c1xuICBpZiAoc2VhcmNoSW5wdXQgJiYgJ29iamVjdCcgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkge1xuICAgIHZhciBoYXNLZXlDb2RlID0gc2VhcmNoSW5wdXQud2hpY2ggfHwgc2VhcmNoSW5wdXQua2V5Q29kZSB8fCBzZWFyY2hJbnB1dC5jaGFyQ29kZVxuICAgIGlmIChoYXNLZXlDb2RlKSBzZWFyY2hJbnB1dCA9IGhhc0tleUNvZGVcbiAgfVxuXG4gIC8vIE51bWJlcnNcbiAgaWYgKCdudW1iZXInID09PSB0eXBlb2Ygc2VhcmNoSW5wdXQpIHJldHVybiBuYW1lc1tzZWFyY2hJbnB1dF1cblxuICAvLyBFdmVyeXRoaW5nIGVsc2UgKGNhc3QgdG8gc3RyaW5nKVxuICB2YXIgc2VhcmNoID0gU3RyaW5nKHNlYXJjaElucHV0KVxuXG4gIC8vIGNoZWNrIGNvZGVzXG4gIHZhciBmb3VuZE5hbWVkS2V5ID0gY29kZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIGNoZWNrIGFsaWFzZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBhbGlhc2VzW3NlYXJjaC50b0xvd2VyQ2FzZSgpXVxuICBpZiAoZm91bmROYW1lZEtleSkgcmV0dXJuIGZvdW5kTmFtZWRLZXlcblxuICAvLyB3ZWlyZCBjaGFyYWN0ZXI/XG4gIGlmIChzZWFyY2gubGVuZ3RoID09PSAxKSByZXR1cm4gc2VhcmNoLmNoYXJDb2RlQXQoMClcblxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5cbi8qKlxuICogR2V0IGJ5IG5hbWVcbiAqXG4gKiAgIGV4cG9ydHMuY29kZVsnZW50ZXInXSAvLyA9PiAxM1xuICovXG5cbnZhciBjb2RlcyA9IGV4cG9ydHMuY29kZSA9IGV4cG9ydHMuY29kZXMgPSB7XG4gICdiYWNrc3BhY2UnOiA4LFxuICAndGFiJzogOSxcbiAgJ2VudGVyJzogMTMsXG4gICdzaGlmdCc6IDE2LFxuICAnY3RybCc6IDE3LFxuICAnYWx0JzogMTgsXG4gICdwYXVzZS9icmVhayc6IDE5LFxuICAnY2FwcyBsb2NrJzogMjAsXG4gICdlc2MnOiAyNyxcbiAgJ3NwYWNlJzogMzIsXG4gICdwYWdlIHVwJzogMzMsXG4gICdwYWdlIGRvd24nOiAzNCxcbiAgJ2VuZCc6IDM1LFxuICAnaG9tZSc6IDM2LFxuICAnbGVmdCc6IDM3LFxuICAndXAnOiAzOCxcbiAgJ3JpZ2h0JzogMzksXG4gICdkb3duJzogNDAsXG4gICdpbnNlcnQnOiA0NSxcbiAgJ2RlbGV0ZSc6IDQ2LFxuICAnY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY2xpY2snOiA5MyxcbiAgJ251bXBhZCAqJzogMTA2LFxuICAnbnVtcGFkICsnOiAxMDcsXG4gICdudW1wYWQgLSc6IDEwOSxcbiAgJ251bXBhZCAuJzogMTEwLFxuICAnbnVtcGFkIC8nOiAxMTEsXG4gICdudW0gbG9jayc6IDE0NCxcbiAgJ3Njcm9sbCBsb2NrJzogMTQ1LFxuICAnbXkgY29tcHV0ZXInOiAxODIsXG4gICdteSBjYWxjdWxhdG9yJzogMTgzLFxuICAnOyc6IDE4NixcbiAgJz0nOiAxODcsXG4gICcsJzogMTg4LFxuICAnLSc6IDE4OSxcbiAgJy4nOiAxOTAsXG4gICcvJzogMTkxLFxuICAnYCc6IDE5MixcbiAgJ1snOiAyMTksXG4gICdcXFxcJzogMjIwLFxuICAnXSc6IDIyMSxcbiAgXCInXCI6IDIyMixcbn1cblxuLy8gSGVscGVyIGFsaWFzZXNcblxudmFyIGFsaWFzZXMgPSBleHBvcnRzLmFsaWFzZXMgPSB7XG4gICd3aW5kb3dzJzogOTEsXG4gICfih6cnOiAxNixcbiAgJ+KMpSc6IDE4LFxuICAn4oyDJzogMTcsXG4gICfijJgnOiA5MSxcbiAgJ2N0bCc6IDE3LFxuICAnY29udHJvbCc6IDE3LFxuICAnb3B0aW9uJzogMTgsXG4gICdwYXVzZSc6IDE5LFxuICAnYnJlYWsnOiAxOSxcbiAgJ2NhcHMnOiAyMCxcbiAgJ3JldHVybic6IDEzLFxuICAnZXNjYXBlJzogMjcsXG4gICdzcGMnOiAzMixcbiAgJ3BndXAnOiAzMyxcbiAgJ3BnZG4nOiAzMyxcbiAgJ2lucyc6IDQ1LFxuICAnZGVsJzogNDYsXG4gICdjbWQnOiA5MVxufVxuXG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIiwiLyohXG4gKiBudW1lcmFsLmpzXG4gKiB2ZXJzaW9uIDogMS41LjNcbiAqIGF1dGhvciA6IEFkYW0gRHJhcGVyXG4gKiBsaWNlbnNlIDogTUlUXG4gKiBodHRwOi8vYWRhbXdkcmFwZXIuZ2l0aHViLmNvbS9OdW1lcmFsLWpzL1xuICovXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIENvbnN0YW50c1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHZhciBudW1lcmFsLFxuICAgICAgICBWRVJTSU9OID0gJzEuNS4zJyxcbiAgICAgICAgLy8gaW50ZXJuYWwgc3RvcmFnZSBmb3IgbGFuZ3VhZ2UgY29uZmlnIGZpbGVzXG4gICAgICAgIGxhbmd1YWdlcyA9IHt9LFxuICAgICAgICBjdXJyZW50TGFuZ3VhZ2UgPSAnZW4nLFxuICAgICAgICB6ZXJvRm9ybWF0ID0gbnVsbCxcbiAgICAgICAgZGVmYXVsdEZvcm1hdCA9ICcwLDAnLFxuICAgICAgICAvLyBjaGVjayBmb3Igbm9kZUpTXG4gICAgICAgIGhhc01vZHVsZSA9ICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cyk7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgQ29uc3RydWN0b3JzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICAvLyBOdW1lcmFsIHByb3RvdHlwZSBvYmplY3RcbiAgICBmdW5jdGlvbiBOdW1lcmFsIChudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBudW1iZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW1wbGVtZW50YXRpb24gb2YgdG9GaXhlZCgpIHRoYXQgdHJlYXRzIGZsb2F0cyBtb3JlIGxpa2UgZGVjaW1hbHNcbiAgICAgKlxuICAgICAqIEZpeGVzIGJpbmFyeSByb3VuZGluZyBpc3N1ZXMgKGVnLiAoMC42MTUpLnRvRml4ZWQoMikgPT09ICcwLjYxJykgdGhhdCBwcmVzZW50XG4gICAgICogcHJvYmxlbXMgZm9yIGFjY291bnRpbmctIGFuZCBmaW5hbmNlLXJlbGF0ZWQgc29mdHdhcmUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdG9GaXhlZCAodmFsdWUsIHByZWNpc2lvbiwgcm91bmRpbmdGdW5jdGlvbiwgb3B0aW9uYWxzKSB7XG4gICAgICAgIHZhciBwb3dlciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24pLFxuICAgICAgICAgICAgb3B0aW9uYWxzUmVnRXhwLFxuICAgICAgICAgICAgb3V0cHV0O1xuICAgICAgICAgICAgXG4gICAgICAgIC8vcm91bmRpbmdGdW5jdGlvbiA9IChyb3VuZGluZ0Z1bmN0aW9uICE9PSB1bmRlZmluZWQgPyByb3VuZGluZ0Z1bmN0aW9uIDogTWF0aC5yb3VuZCk7XG4gICAgICAgIC8vIE11bHRpcGx5IHVwIGJ5IHByZWNpc2lvbiwgcm91bmQgYWNjdXJhdGVseSwgdGhlbiBkaXZpZGUgYW5kIHVzZSBuYXRpdmUgdG9GaXhlZCgpOlxuICAgICAgICBvdXRwdXQgPSAocm91bmRpbmdGdW5jdGlvbih2YWx1ZSAqIHBvd2VyKSAvIHBvd2VyKS50b0ZpeGVkKHByZWNpc2lvbik7XG5cbiAgICAgICAgaWYgKG9wdGlvbmFscykge1xuICAgICAgICAgICAgb3B0aW9uYWxzUmVnRXhwID0gbmV3IFJlZ0V4cCgnMHsxLCcgKyBvcHRpb25hbHMgKyAnfSQnKTtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKG9wdGlvbmFsc1JlZ0V4cCwgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIEZvcm1hdHRpbmdcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvLyBkZXRlcm1pbmUgd2hhdCB0eXBlIG9mIGZvcm1hdHRpbmcgd2UgbmVlZCB0byBkb1xuICAgIGZ1bmN0aW9uIGZvcm1hdE51bWVyYWwgKG4sIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbikge1xuICAgICAgICB2YXIgb3V0cHV0O1xuXG4gICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCBraW5kIG9mIGZvcm1hdCB3ZSBhcmUgZGVhbGluZyB3aXRoXG4gICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignJCcpID4gLTEpIHsgLy8gY3VycmVuY3khISEhIVxuICAgICAgICAgICAgb3V0cHV0ID0gZm9ybWF0Q3VycmVuY3kobiwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignJScpID4gLTEpIHsgLy8gcGVyY2VudGFnZVxuICAgICAgICAgICAgb3V0cHV0ID0gZm9ybWF0UGVyY2VudGFnZShuLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCc6JykgPiAtMSkgeyAvLyB0aW1lXG4gICAgICAgICAgICBvdXRwdXQgPSBmb3JtYXRUaW1lKG4sIGZvcm1hdCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHBsYWluIG9sJyBudW1iZXJzIG9yIGJ5dGVzXG4gICAgICAgICAgICBvdXRwdXQgPSBmb3JtYXROdW1iZXIobi5fdmFsdWUsIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gc3RyaW5nXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgLy8gcmV2ZXJ0IHRvIG51bWJlclxuICAgIGZ1bmN0aW9uIHVuZm9ybWF0TnVtZXJhbCAobiwgc3RyaW5nKSB7XG4gICAgICAgIHZhciBzdHJpbmdPcmlnaW5hbCA9IHN0cmluZyxcbiAgICAgICAgICAgIHRob3VzYW5kUmVnRXhwLFxuICAgICAgICAgICAgbWlsbGlvblJlZ0V4cCxcbiAgICAgICAgICAgIGJpbGxpb25SZWdFeHAsXG4gICAgICAgICAgICB0cmlsbGlvblJlZ0V4cCxcbiAgICAgICAgICAgIHN1ZmZpeGVzID0gWydLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddLFxuICAgICAgICAgICAgYnl0ZXNNdWx0aXBsaWVyID0gZmFsc2UsXG4gICAgICAgICAgICBwb3dlcjtcblxuICAgICAgICBpZiAoc3RyaW5nLmluZGV4T2YoJzonKSA+IC0xKSB7XG4gICAgICAgICAgICBuLl92YWx1ZSA9IHVuZm9ybWF0VGltZShzdHJpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN0cmluZyA9PT0gemVyb0Zvcm1hdCkge1xuICAgICAgICAgICAgICAgIG4uX3ZhbHVlID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmRlbGltaXRlcnMuZGVjaW1hbCAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC4vZywnJykucmVwbGFjZShsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5kZWxpbWl0ZXJzLmRlY2ltYWwsICcuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc2VlIGlmIGFiYnJldmlhdGlvbnMgYXJlIHRoZXJlIHNvIHRoYXQgd2UgY2FuIG11bHRpcGx5IHRvIHRoZSBjb3JyZWN0IG51bWJlclxuICAgICAgICAgICAgICAgIHRob3VzYW5kUmVnRXhwID0gbmV3IFJlZ0V4cCgnW15hLXpBLVpdJyArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmFiYnJldmlhdGlvbnMudGhvdXNhbmQgKyAnKD86XFxcXCl8KFxcXFwnICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uY3VycmVuY3kuc3ltYm9sICsgJyk/KD86XFxcXCkpPyk/JCcpO1xuICAgICAgICAgICAgICAgIG1pbGxpb25SZWdFeHAgPSBuZXcgUmVnRXhwKCdbXmEtekEtWl0nICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy5taWxsaW9uICsgJyg/OlxcXFwpfChcXFxcJyArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbCArICcpPyg/OlxcXFwpKT8pPyQnKTtcbiAgICAgICAgICAgICAgICBiaWxsaW9uUmVnRXhwID0gbmV3IFJlZ0V4cCgnW15hLXpBLVpdJyArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmFiYnJldmlhdGlvbnMuYmlsbGlvbiArICcoPzpcXFxcKXwoXFxcXCcgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5jdXJyZW5jeS5zeW1ib2wgKyAnKT8oPzpcXFxcKSk/KT8kJyk7XG4gICAgICAgICAgICAgICAgdHJpbGxpb25SZWdFeHAgPSBuZXcgUmVnRXhwKCdbXmEtekEtWl0nICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy50cmlsbGlvbiArICcoPzpcXFxcKXwoXFxcXCcgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5jdXJyZW5jeS5zeW1ib2wgKyAnKT8oPzpcXFxcKSk/KT8kJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZWUgaWYgYnl0ZXMgYXJlIHRoZXJlIHNvIHRoYXQgd2UgY2FuIG11bHRpcGx5IHRvIHRoZSBjb3JyZWN0IG51bWJlclxuICAgICAgICAgICAgICAgIGZvciAocG93ZXIgPSAwOyBwb3dlciA8PSBzdWZmaXhlcy5sZW5ndGg7IHBvd2VyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZXNNdWx0aXBsaWVyID0gKHN0cmluZy5pbmRleE9mKHN1ZmZpeGVzW3Bvd2VyXSkgPiAtMSkgPyBNYXRoLnBvdygxMDI0LCBwb3dlciArIDEpIDogZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ5dGVzTXVsdGlwbGllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBkbyBzb21lIG1hdGggdG8gY3JlYXRlIG91ciBudW1iZXJcbiAgICAgICAgICAgICAgICBuLl92YWx1ZSA9ICgoYnl0ZXNNdWx0aXBsaWVyKSA/IGJ5dGVzTXVsdGlwbGllciA6IDEpICogKChzdHJpbmdPcmlnaW5hbC5tYXRjaCh0aG91c2FuZFJlZ0V4cCkpID8gTWF0aC5wb3coMTAsIDMpIDogMSkgKiAoKHN0cmluZ09yaWdpbmFsLm1hdGNoKG1pbGxpb25SZWdFeHApKSA/IE1hdGgucG93KDEwLCA2KSA6IDEpICogKChzdHJpbmdPcmlnaW5hbC5tYXRjaChiaWxsaW9uUmVnRXhwKSkgPyBNYXRoLnBvdygxMCwgOSkgOiAxKSAqICgoc3RyaW5nT3JpZ2luYWwubWF0Y2godHJpbGxpb25SZWdFeHApKSA/IE1hdGgucG93KDEwLCAxMikgOiAxKSAqICgoc3RyaW5nLmluZGV4T2YoJyUnKSA+IC0xKSA/IDAuMDEgOiAxKSAqICgoKHN0cmluZy5zcGxpdCgnLScpLmxlbmd0aCArIE1hdGgubWluKHN0cmluZy5zcGxpdCgnKCcpLmxlbmd0aC0xLCBzdHJpbmcuc3BsaXQoJyknKS5sZW5ndGgtMSkpICUgMik/IDE6IC0xKSAqIE51bWJlcihzdHJpbmcucmVwbGFjZSgvW14wLTlcXC5dKy9nLCAnJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gcm91bmQgaWYgd2UgYXJlIHRhbGtpbmcgYWJvdXQgYnl0ZXNcbiAgICAgICAgICAgICAgICBuLl92YWx1ZSA9IChieXRlc011bHRpcGxpZXIpID8gTWF0aC5jZWlsKG4uX3ZhbHVlKSA6IG4uX3ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuLl92YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRDdXJyZW5jeSAobiwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBzeW1ib2xJbmRleCA9IGZvcm1hdC5pbmRleE9mKCckJyksXG4gICAgICAgICAgICBvcGVuUGFyZW5JbmRleCA9IGZvcm1hdC5pbmRleE9mKCcoJyksXG4gICAgICAgICAgICBtaW51c1NpZ25JbmRleCA9IGZvcm1hdC5pbmRleE9mKCctJyksXG4gICAgICAgICAgICBzcGFjZSA9ICcnLFxuICAgICAgICAgICAgc3BsaWNlSW5kZXgsXG4gICAgICAgICAgICBvdXRwdXQ7XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHNwYWNlIGJlZm9yZSBvciBhZnRlciBjdXJyZW5jeVxuICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJyAkJykgPiAtMSkge1xuICAgICAgICAgICAgc3BhY2UgPSAnICc7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnICQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJyQgJykgPiAtMSkge1xuICAgICAgICAgICAgc3BhY2UgPSAnICc7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnJCAnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnJCcsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvcm1hdCB0aGUgbnVtYmVyXG4gICAgICAgIG91dHB1dCA9IGZvcm1hdE51bWJlcihuLl92YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKTtcblxuICAgICAgICAvLyBwb3NpdGlvbiB0aGUgc3ltYm9sXG4gICAgICAgIGlmIChzeW1ib2xJbmRleCA8PSAxKSB7XG4gICAgICAgICAgICBpZiAob3V0cHV0LmluZGV4T2YoJygnKSA+IC0xIHx8IG91dHB1dC5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5zcGxpdCgnJyk7XG4gICAgICAgICAgICAgICAgc3BsaWNlSW5kZXggPSAxO1xuICAgICAgICAgICAgICAgIGlmIChzeW1ib2xJbmRleCA8IG9wZW5QYXJlbkluZGV4IHx8IHN5bWJvbEluZGV4IDwgbWludXNTaWduSW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgc3ltYm9sIGFwcGVhcnMgYmVmb3JlIHRoZSBcIihcIiBvciBcIi1cIlxuICAgICAgICAgICAgICAgICAgICBzcGxpY2VJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG91dHB1dC5zcGxpY2Uoc3BsaWNlSW5kZXgsIDAsIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbCArIHNwYWNlKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQuam9pbignJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbCArIHNwYWNlICsgb3V0cHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG91dHB1dC5pbmRleE9mKCcpJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5zcGxpdCgnJyk7XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNwbGljZSgtMSwgMCwgc3BhY2UgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5jdXJyZW5jeS5zeW1ib2wpO1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5qb2luKCcnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgc3BhY2UgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5jdXJyZW5jeS5zeW1ib2w7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdFBlcmNlbnRhZ2UgKG4sIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbikge1xuICAgICAgICB2YXIgc3BhY2UgPSAnJyxcbiAgICAgICAgICAgIG91dHB1dCxcbiAgICAgICAgICAgIHZhbHVlID0gbi5fdmFsdWUgKiAxMDA7XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHNwYWNlIGJlZm9yZSAlXG4gICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignICUnKSA+IC0xKSB7XG4gICAgICAgICAgICBzcGFjZSA9ICcgJztcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCcgJScsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCclJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3V0cHV0ID0gZm9ybWF0TnVtYmVyKHZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pO1xuICAgICAgICBcbiAgICAgICAgaWYgKG91dHB1dC5pbmRleE9mKCcpJykgPiAtMSApIHtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5zcGxpdCgnJyk7XG4gICAgICAgICAgICBvdXRwdXQuc3BsaWNlKC0xLCAwLCBzcGFjZSArICclJyk7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQuam9pbignJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBzcGFjZSArICclJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZSAobikge1xuICAgICAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKG4uX3ZhbHVlLzYwLzYwKSxcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChuLl92YWx1ZSAtIChob3VycyAqIDYwICogNjApKS82MCksXG4gICAgICAgICAgICBzZWNvbmRzID0gTWF0aC5yb3VuZChuLl92YWx1ZSAtIChob3VycyAqIDYwICogNjApIC0gKG1pbnV0ZXMgKiA2MCkpO1xuICAgICAgICByZXR1cm4gaG91cnMgKyAnOicgKyAoKG1pbnV0ZXMgPCAxMCkgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcykgKyAnOicgKyAoKHNlY29uZHMgPCAxMCkgPyAnMCcgKyBzZWNvbmRzIDogc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5mb3JtYXRUaW1lIChzdHJpbmcpIHtcbiAgICAgICAgdmFyIHRpbWVBcnJheSA9IHN0cmluZy5zcGxpdCgnOicpLFxuICAgICAgICAgICAgc2Vjb25kcyA9IDA7XG4gICAgICAgIC8vIHR1cm4gaG91cnMgYW5kIG1pbnV0ZXMgaW50byBzZWNvbmRzIGFuZCBhZGQgdGhlbSBhbGwgdXBcbiAgICAgICAgaWYgKHRpbWVBcnJheS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIC8vIGhvdXJzXG4gICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIChOdW1iZXIodGltZUFycmF5WzBdKSAqIDYwICogNjApO1xuICAgICAgICAgICAgLy8gbWludXRlc1xuICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgKyAoTnVtYmVyKHRpbWVBcnJheVsxXSkgKiA2MCk7XG4gICAgICAgICAgICAvLyBzZWNvbmRzXG4gICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIE51bWJlcih0aW1lQXJyYXlbMl0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbWVBcnJheS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIC8vIG1pbnV0ZXNcbiAgICAgICAgICAgIHNlY29uZHMgPSBzZWNvbmRzICsgKE51bWJlcih0aW1lQXJyYXlbMF0pICogNjApO1xuICAgICAgICAgICAgLy8gc2Vjb25kc1xuICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgKyBOdW1iZXIodGltZUFycmF5WzFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTnVtYmVyKHNlY29uZHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdE51bWJlciAodmFsdWUsIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbikge1xuICAgICAgICB2YXIgbmVnUCA9IGZhbHNlLFxuICAgICAgICAgICAgc2lnbmVkID0gZmFsc2UsXG4gICAgICAgICAgICBvcHREZWMgPSBmYWxzZSxcbiAgICAgICAgICAgIGFiYnIgPSAnJyxcbiAgICAgICAgICAgIGFiYnJLID0gZmFsc2UsIC8vIGZvcmNlIGFiYnJldmlhdGlvbiB0byB0aG91c2FuZHNcbiAgICAgICAgICAgIGFiYnJNID0gZmFsc2UsIC8vIGZvcmNlIGFiYnJldmlhdGlvbiB0byBtaWxsaW9uc1xuICAgICAgICAgICAgYWJickIgPSBmYWxzZSwgLy8gZm9yY2UgYWJicmV2aWF0aW9uIHRvIGJpbGxpb25zXG4gICAgICAgICAgICBhYmJyVCA9IGZhbHNlLCAvLyBmb3JjZSBhYmJyZXZpYXRpb24gdG8gdHJpbGxpb25zXG4gICAgICAgICAgICBhYmJyRm9yY2UgPSBmYWxzZSwgLy8gZm9yY2UgYWJicmV2aWF0aW9uXG4gICAgICAgICAgICBieXRlcyA9ICcnLFxuICAgICAgICAgICAgb3JkID0gJycsXG4gICAgICAgICAgICBhYnMgPSBNYXRoLmFicyh2YWx1ZSksXG4gICAgICAgICAgICBzdWZmaXhlcyA9IFsnQicsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddLFxuICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgcG93ZXIsXG4gICAgICAgICAgICB3LFxuICAgICAgICAgICAgcHJlY2lzaW9uLFxuICAgICAgICAgICAgdGhvdXNhbmRzLFxuICAgICAgICAgICAgZCA9ICcnLFxuICAgICAgICAgICAgbmVnID0gZmFsc2U7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbnVtYmVyIGlzIHplcm8gYW5kIGEgY3VzdG9tIHplcm8gZm9ybWF0IGhhcyBiZWVuIHNldFxuICAgICAgICBpZiAodmFsdWUgPT09IDAgJiYgemVyb0Zvcm1hdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHplcm9Gb3JtYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzZWUgaWYgd2Ugc2hvdWxkIHVzZSBwYXJlbnRoZXNlcyBmb3IgbmVnYXRpdmUgbnVtYmVyIG9yIGlmIHdlIHNob3VsZCBwcmVmaXggd2l0aCBhIHNpZ25cbiAgICAgICAgICAgIC8vIGlmIGJvdGggYXJlIHByZXNlbnQgd2UgZGVmYXVsdCB0byBwYXJlbnRoZXNlc1xuICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCcoJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIG5lZ1AgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCcrJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIHNpZ25lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL1xcKy9nLCAnJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlZSBpZiBhYmJyZXZpYXRpb24gaXMgd2FudGVkXG4gICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ2EnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgYWJicmV2aWF0aW9uIGlzIHNwZWNpZmllZFxuICAgICAgICAgICAgICAgIGFiYnJLID0gZm9ybWF0LmluZGV4T2YoJ2FLJykgPj0gMDtcbiAgICAgICAgICAgICAgICBhYmJyTSA9IGZvcm1hdC5pbmRleE9mKCdhTScpID49IDA7XG4gICAgICAgICAgICAgICAgYWJickIgPSBmb3JtYXQuaW5kZXhPZignYUInKSA+PSAwO1xuICAgICAgICAgICAgICAgIGFiYnJUID0gZm9ybWF0LmluZGV4T2YoJ2FUJykgPj0gMDtcbiAgICAgICAgICAgICAgICBhYmJyRm9yY2UgPSBhYmJySyB8fCBhYmJyTSB8fCBhYmJyQiB8fCBhYmJyVDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZSBiZWZvcmUgYWJicmV2aWF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCcgYScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYWJiciA9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJyBhJywgJycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdhJywgJycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChhYnMgPj0gTWF0aC5wb3coMTAsIDEyKSAmJiAhYWJickZvcmNlIHx8IGFiYnJUKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRyaWxsaW9uXG4gICAgICAgICAgICAgICAgICAgIGFiYnIgPSBhYmJyICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy50cmlsbGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAvIE1hdGgucG93KDEwLCAxMik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhYnMgPCBNYXRoLnBvdygxMCwgMTIpICYmIGFicyA+PSBNYXRoLnBvdygxMCwgOSkgJiYgIWFiYnJGb3JjZSB8fCBhYmJyQikge1xuICAgICAgICAgICAgICAgICAgICAvLyBiaWxsaW9uXG4gICAgICAgICAgICAgICAgICAgIGFiYnIgPSBhYmJyICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy5iaWxsaW9uO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC8gTWF0aC5wb3coMTAsIDkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWJzIDwgTWF0aC5wb3coMTAsIDkpICYmIGFicyA+PSBNYXRoLnBvdygxMCwgNikgJiYgIWFiYnJGb3JjZSB8fCBhYmJyTSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtaWxsaW9uXG4gICAgICAgICAgICAgICAgICAgIGFiYnIgPSBhYmJyICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy5taWxsaW9uO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC8gTWF0aC5wb3coMTAsIDYpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWJzIDwgTWF0aC5wb3coMTAsIDYpICYmIGFicyA+PSBNYXRoLnBvdygxMCwgMykgJiYgIWFiYnJGb3JjZSB8fCBhYmJySykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aG91c2FuZFxuICAgICAgICAgICAgICAgICAgICBhYmJyID0gYWJiciArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmFiYnJldmlhdGlvbnMudGhvdXNhbmQ7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgLyBNYXRoLnBvdygxMCwgMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZWUgaWYgd2UgYXJlIGZvcm1hdHRpbmcgYnl0ZXNcbiAgICAgICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignYicpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igc3BhY2UgYmVmb3JlXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCcgYicpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSAnICc7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCcgYicsICcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnYicsICcnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHBvd2VyID0gMDsgcG93ZXIgPD0gc3VmZml4ZXMubGVuZ3RoOyBwb3dlcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IE1hdGgucG93KDEwMjQsIHBvd2VyKTtcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gTWF0aC5wb3coMTAyNCwgcG93ZXIrMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8IG1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZXMgPSBieXRlcyArIHN1ZmZpeGVzW3Bvd2VyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW4gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAvIG1pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZWUgaWYgb3JkaW5hbCBpcyB3YW50ZWRcbiAgICAgICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignbycpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3Igc3BhY2UgYmVmb3JlXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCcgbycpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkID0gJyAnO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnIG8nLCAnJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ28nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3JkID0gb3JkICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0ub3JkaW5hbCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignWy5dJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIG9wdERlYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ1suXScsICcuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHcgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KCcuJylbMF07XG4gICAgICAgICAgICBwcmVjaXNpb24gPSBmb3JtYXQuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgIHRob3VzYW5kcyA9IGZvcm1hdC5pbmRleE9mKCcsJyk7XG5cbiAgICAgICAgICAgIGlmIChwcmVjaXNpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJlY2lzaW9uLmluZGV4T2YoJ1snKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9IHByZWNpc2lvbi5yZXBsYWNlKCddJywgJycpO1xuICAgICAgICAgICAgICAgICAgICBwcmVjaXNpb24gPSBwcmVjaXNpb24uc3BsaXQoJ1snKTtcbiAgICAgICAgICAgICAgICAgICAgZCA9IHRvRml4ZWQodmFsdWUsIChwcmVjaXNpb25bMF0ubGVuZ3RoICsgcHJlY2lzaW9uWzFdLmxlbmd0aCksIHJvdW5kaW5nRnVuY3Rpb24sIHByZWNpc2lvblsxXS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQgPSB0b0ZpeGVkKHZhbHVlLCBwcmVjaXNpb24ubGVuZ3RoLCByb3VuZGluZ0Z1bmN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3ID0gZC5zcGxpdCgnLicpWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGQuc3BsaXQoJy4nKVsxXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZCA9IGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmRlbGltaXRlcnMuZGVjaW1hbCArIGQuc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdERlYyAmJiBOdW1iZXIoZC5zbGljZSgxKSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdyA9IHRvRml4ZWQodmFsdWUsIG51bGwsIHJvdW5kaW5nRnVuY3Rpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmb3JtYXQgbnVtYmVyXG4gICAgICAgICAgICBpZiAody5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIHcgPSB3LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIG5lZyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aG91c2FuZHMgPiAtMSkge1xuICAgICAgICAgICAgICAgIHcgPSB3LnRvU3RyaW5nKCkucmVwbGFjZSgvKFxcZCkoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnJDEnICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uZGVsaW1pdGVycy50aG91c2FuZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJy4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHcgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICgobmVnUCAmJiBuZWcpID8gJygnIDogJycpICsgKCghbmVnUCAmJiBuZWcpID8gJy0nIDogJycpICsgKCghbmVnICYmIHNpZ25lZCkgPyAnKycgOiAnJykgKyB3ICsgZCArICgob3JkKSA/IG9yZCA6ICcnKSArICgoYWJicikgPyBhYmJyIDogJycpICsgKChieXRlcykgPyBieXRlcyA6ICcnKSArICgobmVnUCAmJiBuZWcpID8gJyknIDogJycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBUb3AgTGV2ZWwgRnVuY3Rpb25zXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgbnVtZXJhbCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAobnVtZXJhbC5pc051bWVyYWwoaW5wdXQpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnZhbHVlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXQgPT09IDAgfHwgdHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaW5wdXQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKCFOdW1iZXIoaW5wdXQpKSB7XG4gICAgICAgICAgICBpbnB1dCA9IG51bWVyYWwuZm4udW5mb3JtYXQoaW5wdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBOdW1lcmFsKE51bWJlcihpbnB1dCkpO1xuICAgIH07XG5cbiAgICAvLyB2ZXJzaW9uIG51bWJlclxuICAgIG51bWVyYWwudmVyc2lvbiA9IFZFUlNJT047XG5cbiAgICAvLyBjb21wYXJlIG51bWVyYWwgb2JqZWN0XG4gICAgbnVtZXJhbC5pc051bWVyYWwgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBOdW1lcmFsO1xuICAgIH07XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIHdpbGwgbG9hZCBsYW5ndWFnZXMgYW5kIHRoZW4gc2V0IHRoZSBnbG9iYWwgbGFuZ3VhZ2UuICBJZlxuICAgIC8vIG5vIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGluLCBpdCB3aWxsIHNpbXBseSByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsXG4gICAgLy8gbGFuZ3VhZ2Uga2V5LlxuICAgIG51bWVyYWwubGFuZ3VhZ2UgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50TGFuZ3VhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5ICYmICF2YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmKCFsYW5ndWFnZXNba2V5XSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsYW5ndWFnZSA6ICcgKyBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudExhbmd1YWdlID0ga2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlcyB8fCAhbGFuZ3VhZ2VzW2tleV0pIHtcbiAgICAgICAgICAgIGxvYWRMYW5ndWFnZShrZXksIHZhbHVlcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVtZXJhbDtcbiAgICB9O1xuICAgIFxuICAgIC8vIFRoaXMgZnVuY3Rpb24gcHJvdmlkZXMgYWNjZXNzIHRvIHRoZSBsb2FkZWQgbGFuZ3VhZ2UgZGF0YS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudFxuICAgIC8vIGdsb2JhbCBsYW5ndWFnZSBvYmplY3QuXG4gICAgbnVtZXJhbC5sYW5ndWFnZURhdGEgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghbGFuZ3VhZ2VzW2tleV0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsYW5ndWFnZSA6ICcgKyBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2VzW2tleV07XG4gICAgfTtcblxuICAgIG51bWVyYWwubGFuZ3VhZ2UoJ2VuJywge1xuICAgICAgICBkZWxpbWl0ZXJzOiB7XG4gICAgICAgICAgICB0aG91c2FuZHM6ICcsJyxcbiAgICAgICAgICAgIGRlY2ltYWw6ICcuJ1xuICAgICAgICB9LFxuICAgICAgICBhYmJyZXZpYXRpb25zOiB7XG4gICAgICAgICAgICB0aG91c2FuZDogJ2snLFxuICAgICAgICAgICAgbWlsbGlvbjogJ20nLFxuICAgICAgICAgICAgYmlsbGlvbjogJ2InLFxuICAgICAgICAgICAgdHJpbGxpb246ICd0J1xuICAgICAgICB9LFxuICAgICAgICBvcmRpbmFsOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgYiA9IG51bWJlciAlIDEwO1xuICAgICAgICAgICAgcmV0dXJuICh+fiAobnVtYmVyICUgMTAwIC8gMTApID09PSAxKSA/ICd0aCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAyKSA/ICduZCcgOlxuICAgICAgICAgICAgICAgIChiID09PSAzKSA/ICdyZCcgOiAndGgnO1xuICAgICAgICB9LFxuICAgICAgICBjdXJyZW5jeToge1xuICAgICAgICAgICAgc3ltYm9sOiAnJCdcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbnVtZXJhbC56ZXJvRm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICB6ZXJvRm9ybWF0ID0gdHlwZW9mKGZvcm1hdCkgPT09ICdzdHJpbmcnID8gZm9ybWF0IDogbnVsbDtcbiAgICB9O1xuXG4gICAgbnVtZXJhbC5kZWZhdWx0Rm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgICAgICBkZWZhdWx0Rm9ybWF0ID0gdHlwZW9mKGZvcm1hdCkgPT09ICdzdHJpbmcnID8gZm9ybWF0IDogJzAuMCc7XG4gICAgfTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgSGVscGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGZ1bmN0aW9uIGxvYWRMYW5ndWFnZShrZXksIHZhbHVlcykge1xuICAgICAgICBsYW5ndWFnZXNba2V5XSA9IHZhbHVlcztcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIEZsb2F0aW5nLXBvaW50IGhlbHBlcnNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICAvLyBUaGUgZmxvYXRpbmctcG9pbnQgaGVscGVyIGZ1bmN0aW9ucyBhbmQgaW1wbGVtZW50YXRpb25cbiAgICAvLyBib3Jyb3dzIGhlYXZpbHkgZnJvbSBzaW5mdWwuanM6IGh0dHA6Ly9ndWlwbi5naXRodWIuaW8vc2luZnVsLmpzL1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkucHJvdG90eXBlLnJlZHVjZSBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IGl0XG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvUmVkdWNlI0NvbXBhdGliaWxpdHlcbiAgICAgKi9cbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UpIHtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgb3B0X2luaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobnVsbCA9PT0gdGhpcyB8fCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHRoaXMpIHtcbiAgICAgICAgICAgICAgICAvLyBBdCB0aGUgbW9tZW50IGFsbCBtb2Rlcm4gYnJvd3NlcnMsIHRoYXQgc3VwcG9ydCBzdHJpY3QgbW9kZSwgaGF2ZVxuICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiBBcnJheS5wcm90b3R5cGUucmVkdWNlLiBGb3IgaW5zdGFuY2UsIElFOFxuICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IHN1cHBvcnQgc3RyaWN0IG1vZGUsIHNvIHRoaXMgY2hlY2sgaXMgYWN0dWFsbHkgdXNlbGVzcy5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUucmVkdWNlIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihjYWxsYmFjayArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGluZGV4LFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoID4+PiAwLFxuICAgICAgICAgICAgICAgIGlzVmFsdWVTZXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKDEgPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBvcHRfaW5pdGlhbFZhbHVlO1xuICAgICAgICAgICAgICAgIGlzVmFsdWVTZXQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGluZGV4ID0gMDsgbGVuZ3RoID4gaW5kZXg7ICsraW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShpbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsdWVTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2sodmFsdWUsIHRoaXNbaW5kZXhdLCBpbmRleCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWx1ZVNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNWYWx1ZVNldCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIFxuICAgIC8qKlxuICAgICAqIENvbXB1dGVzIHRoZSBtdWx0aXBsaWVyIG5lY2Vzc2FyeSB0byBtYWtlIHggPj0gMSxcbiAgICAgKiBlZmZlY3RpdmVseSBlbGltaW5hdGluZyBtaXNjYWxjdWxhdGlvbnMgY2F1c2VkIGJ5XG4gICAgICogZmluaXRlIHByZWNpc2lvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtdWx0aXBsaWVyKHgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0geC50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5wb3coMTAsIHBhcnRzWzFdLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gYSB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLCByZXR1cm5zIHRoZSBtYXhpbXVtXG4gICAgICogbXVsdGlwbGllciB0aGF0IG11c3QgYmUgdXNlZCB0byBub3JtYWxpemUgYW4gb3BlcmF0aW9uIGludm9sdmluZ1xuICAgICAqIGFsbCBvZiB0aGVtLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvcnJlY3Rpb25GYWN0b3IoKSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIGFyZ3MucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICB2YXIgbXAgPSBtdWx0aXBsaWVyKHByZXYpLFxuICAgICAgICAgICAgICAgIG1uID0gbXVsdGlwbGllcihuZXh0KTtcbiAgICAgICAgcmV0dXJuIG1wID4gbW4gPyBtcCA6IG1uO1xuICAgICAgICB9LCAtSW5maW5pdHkpO1xuICAgIH0gICAgICAgIFxuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIE51bWVyYWwgUHJvdG90eXBlXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICBudW1lcmFsLmZuID0gTnVtZXJhbC5wcm90b3R5cGUgPSB7XG5cbiAgICAgICAgY2xvbmUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtZXJhbCh0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBmb3JtYXQgOiBmdW5jdGlvbiAoaW5wdXRTdHJpbmcsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXROdW1lcmFsKHRoaXMsIFxuICAgICAgICAgICAgICAgICAgaW5wdXRTdHJpbmcgPyBpbnB1dFN0cmluZyA6IGRlZmF1bHRGb3JtYXQsIFxuICAgICAgICAgICAgICAgICAgKHJvdW5kaW5nRnVuY3Rpb24gIT09IHVuZGVmaW5lZCkgPyByb3VuZGluZ0Z1bmN0aW9uIDogTWF0aC5yb3VuZFxuICAgICAgICAgICAgICApO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVuZm9ybWF0IDogZnVuY3Rpb24gKGlucHV0U3RyaW5nKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0U3RyaW5nKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHsgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0U3RyaW5nOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmZvcm1hdE51bWVyYWwodGhpcywgaW5wdXRTdHJpbmcgPyBpbnB1dFN0cmluZyA6IGRlZmF1bHRGb3JtYXQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbHVlIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHZhbHVlT2YgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0IDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBhZGQgOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBjb3JyRmFjdG9yID0gY29ycmVjdGlvbkZhY3Rvci5jYWxsKG51bGwsIHRoaXMuX3ZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYmFjayhhY2N1bSwgY3VyciwgY3VyckksIE8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW0gKyBjb3JyRmFjdG9yICogY3VycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gW3RoaXMuX3ZhbHVlLCB2YWx1ZV0ucmVkdWNlKGNiYWNrLCAwKSAvIGNvcnJGYWN0b3I7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBzdWJ0cmFjdCA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBjb3JyZWN0aW9uRmFjdG9yLmNhbGwobnVsbCwgdGhpcy5fdmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNiYWNrKGFjY3VtLCBjdXJyLCBjdXJySSwgTykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bSAtIGNvcnJGYWN0b3IgKiBjdXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbdmFsdWVdLnJlZHVjZShjYmFjaywgdGhpcy5fdmFsdWUgKiBjb3JyRmFjdG9yKSAvIGNvcnJGYWN0b3I7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBtdWx0aXBseSA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2JhY2soYWNjdW0sIGN1cnIsIGN1cnJJLCBPKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBjb3JyZWN0aW9uRmFjdG9yKGFjY3VtLCBjdXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjY3VtICogY29yckZhY3RvcikgKiAoY3VyciAqIGNvcnJGYWN0b3IpIC9cbiAgICAgICAgICAgICAgICAgICAgKGNvcnJGYWN0b3IgKiBjb3JyRmFjdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gW3RoaXMuX3ZhbHVlLCB2YWx1ZV0ucmVkdWNlKGNiYWNrLCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRpdmlkZSA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2JhY2soYWNjdW0sIGN1cnIsIGN1cnJJLCBPKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBjb3JyZWN0aW9uRmFjdG9yKGFjY3VtLCBjdXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGFjY3VtICogY29yckZhY3RvcikgLyAoY3VyciAqIGNvcnJGYWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbdGhpcy5fdmFsdWUsIHZhbHVlXS5yZWR1Y2UoY2JhY2spOyAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGlmZmVyZW5jZSA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG51bWVyYWwodGhpcy5fdmFsdWUpLnN1YnRyYWN0KHZhbHVlKS52YWx1ZSgpKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgRXhwb3NpbmcgTnVtZXJhbFxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIENvbW1vbkpTIG1vZHVsZSBpcyBkZWZpbmVkXG4gICAgaWYgKGhhc01vZHVsZSkge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IG51bWVyYWw7XG4gICAgfVxuXG4gICAgLypnbG9iYWwgZW5kZXI6ZmFsc2UgKi9cbiAgICBpZiAodHlwZW9mIGVuZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBoZXJlLCBgdGhpc2AgbWVhbnMgYHdpbmRvd2AgaW4gdGhlIGJyb3dzZXIsIG9yIGBnbG9iYWxgIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgLy8gYWRkIGBudW1lcmFsYCBhcyBhIGdsb2JhbCBvYmplY3QgdmlhIGEgc3RyaW5nIGlkZW50aWZpZXIsXG4gICAgICAgIC8vIGZvciBDbG9zdXJlIENvbXBpbGVyICdhZHZhbmNlZCcgbW9kZVxuICAgICAgICB0aGlzWydudW1lcmFsJ10gPSBudW1lcmFsO1xuICAgIH1cblxuICAgIC8qZ2xvYmFsIGRlZmluZTpmYWxzZSAqL1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtZXJhbDtcbiAgICAgICAgfSk7XG4gICAgfVxufSkuY2FsbCh0aGlzKTtcbiIsIlxyXG5leHBvcnRzLkFDVElPTl9UWVBFUyA9IHtcclxuICBOVU1CRVI6ICdOVU1CRVInLFxyXG4gIFNIT1JUQ1VUOiAnU0hPUlRDVVQnLFxyXG4gIERFQ0lNQUw6ICdERUNJTUFMJyxcclxuICBERUxJTUlURVI6ICdERUxJTUlURVInLFxyXG4gIE1JTlVTOiAnTUlOVVMnLFxyXG4gIFVOS05PV046ICdVTktOT1dOJyxcclxuICBIT1JJWk9OVEFMX0FSUk9XOiAnSE9SSVpPTlRBTF9BUlJPVycsXHJcbiAgVkVSVElDQUxfQVJST1c6ICdWRVJUSUNBTF9BUlJPVycsXHJcbiAgQkFDS1NQQUNFOiAnQkFDS1NQQUNFJyxcclxuICBERUxFVEU6ICdERUxFVEUnLFxyXG4gIFVORE86ICdVTkRPJyxcclxuICBSRURPOiAnUkVETydcclxufVxyXG5cclxuZXhwb3J0cy5EUkFHX1NUQVRFUyA9IHtcclxuICBOT05FOiAnTk9ORScsXHJcbiAgSU5URVJOQUw6ICdJTlRFUk5BTCcsXHJcbiAgRVhURVJOQUw6ICdFWFRFUk5BTCdcclxufVxyXG5cclxuZXhwb3J0cy5ERUxJTUlURVJfU1RSQVRFR0lFUyA9IHtcclxuICBTS0lQOiAnU0tJUCcsXHJcbiAgREVMRVRFX05VTUJFUjogJ0RFTEVURV9OVU1CRVInXHJcbn1cclxuIiwiLy8gQ29weXJpZ2h0IEFsaSBTaGVlaGFuLURhcmUsIGFsbCByaWdodHMgYW5kIHByb2ZpdHMgcmVzZXJ2ZWQuXHJcblxyXG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJztcclxuaW1wb3J0IGtleWNvZGUgZnJvbSAna2V5Y29kZSc7XHJcbmltcG9ydCBrZXlIYW5kbGVycyBmcm9tICcuL2tleUhhbmRsZXJzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuaW1wb3J0IFZhbHVlSGlzdG9yeSBmcm9tICcuL3ZhbHVlSGlzdG9yeSc7XHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBEUkFHX1NUQVRFUywgREVMSU1JVEVSX1NUUkFURUdJRVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcblxyXG4vKipcclxuICogQ09OU1RBTlRTXHJcbiAqL1xyXG5jb25zdCBsYW5ndWFnZURhdGEgPSB7XHJcbiAgZW46IHtcclxuICAgIHNob3J0Y3V0czoge1xyXG4gICAgICAnayc6IDMsXHJcbiAgICAgICdtJzogNixcclxuICAgICAgJ2InOiA5XHJcbiAgICB9LFxyXG4gICAgZGVsaW1pdGVyOiAnLCcsXHJcbiAgICBkZWNpbWFsOiAnLidcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRTID0ge1xyXG4gIGZvcm1hdDogJzAsMC4wMCcsXHJcbiAgbGFuZzogJ2VuJyxcclxuICBtYXhWYWx1ZTogMTBlKzEyLFxyXG4gIG1pblZhbHVlOiAtMTBlKzEyLFxyXG4gIG1heExlbmd0aDogMTUsXHJcbiAgdmFsdWVTdGVwOiAxLFxyXG4gIGRyb3BwYWJsZUNsYXNzOiAnZmlucHV0LWRyb3BwYWJsZScsXHJcbiAgZGVsaW1pdGVyRGVsZXRlU3RyYXRlZ3k6IERFTElNSVRFUl9TVFJBVEVHSUVTLlNLSVBcclxufVxyXG5cclxuLyoqXHJcbiAqIEZJTlBVVCBDT01QT05FTlQgQ0xBU1NcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBGaW5wdXQge1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RE9NIEVsZW1lbnR9IFRoZSBudW1iZXIgaW5wdXRcclxuICAgKiBAcGFyYW0ge09wdGlvbnN9IE9wdGlvbnMgZm9yIHRoZSBudW1iZXIgaW5wdXQncyBiZWhhdmlvdXJcclxuICAgKlxyXG4gICAqIERldGFpbGVkIGxpc3Qgb2YgcG9zc2libGUgb3B0aW9uczpcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZm9ybWF0fSBUaGUgZm9ybWF0IG9mIHRoZSBudW1iZXIgdG8gYmUgZGlzcGxheWVkIGJ5IHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5jdXJyZW5jeX0gT3B0aW9uYWwgY3VycmVuY3kgdG8gcHJlcGVuZCB0byB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5sYW5nfSBMYW5ndWFnZSAodXNlZCBpbiBsZXR0ZXIgYWJicmV2aWF0aW9ucyBldGMuLi4pXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLm1heFZhbHVlfSBMaW1pdCBpbnB1dCB2YWx1ZSB0byBhIG1heGltdW0gdmFsdWVcclxuICAgKiBAcGFyYW0ge09wdGlvbnMubWluVmFsdWV9IExpbWl0IGlucHV0IHZhbHVlIHRvIGEgbWluaW11bSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5tYXhEaWdpdHN9IExpbWl0IGlucHV0IHZhbHVlIHRvIGEgbWF4aW11bSBudW1iZXIgb2YgZGlnaXRzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLnZhbHVlU3RlcCBPUiBmYWxzZX0gQ2hhbmdlIGhvdyBtdWNoIHRoZSB2YWx1ZSBjaGFuZ2VzIHdoZW4gcHJlc3NpbmcgdXAvZG93biBhcnJvdyBrZXlzXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmRyb3BwYWJsZUNsYXNzfSBDbGFzcyB0byBnaXZlIHRvIHRoZSBpbnB1dCB3aGVuIHRleHQgZHJhZyBldmVudCBoYXMgc3RhcnRlZCBvbiB0aGUgcGFnZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5kZWxpbWl0ZXJEZWxldGVTdHJhdGVneX0gQmVoYXZpb3VyIHRvIGFwcGx5IHdoZW4gZGVsZXRpbmcgb3IgYmFja3NwYWNpbmcgYSBkZWxpbWl0ZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKERFRkFVTFRTLCBvcHRpb25zKTtcclxuICAgIHRoaXMuX2xhbmd1YWdlRGF0YSA9IGxhbmd1YWdlRGF0YVt0aGlzLm9wdGlvbnMubGFuZ107XHJcbiAgICB0aGlzLl9hY3Rpb25UeXBlcyA9IHRoaXMuY3JlYXRlQWN0aW9uVHlwZXMoKTtcclxuICAgIHRoaXMuX2hpc3RvcnkgPSBuZXcgVmFsdWVIaXN0b3J5KCk7XHJcblxyXG4gICAgbnVtZXJhbC5kZWZhdWx0Rm9ybWF0KHRoaXMub3B0aW9ucy5mb3JtYXQpO1xyXG5cclxuICAgIC8vIFNldHVwIGxpc3RlbmVyc1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4gdGhpcy5vbkZvY3Vzb3V0KGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB0aGlzLm9uRm9jdXNpbihlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChlKSA9PiB0aGlzLm9uRHJvcChlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGFzdGUnLCAoZSkgPT4gdGhpcy5vblBhc3RlKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMub25LZXlkb3duKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB0aGlzLm9uS2V5cHJlc3MoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHRoaXMub25JbnB1dChlKSk7XHJcblxyXG4gICAgLy8gRHJhZ2dpbmcgbGlzdGVuZXJzXHJcbiAgICAvLyBLZWVwIHRyYWNrIG9mIHdoZXRoZXIgYSBkcmFnIHN0YXJ0ZWQgaW50ZXJuYWxseSBvciBleHRlcm5hbGx5XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4gdGhpcy5vbkRyYWdzdGFydChlKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHRoaXMub25EcmFnZW5kKGUpKTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgKGUpID0+IHRoaXMub25EcmFnZW50ZXIoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIChlKSA9PiB0aGlzLm9uRHJhZ2xlYXZlKGUpKTtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgZWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gIH1cclxuICBnZXQgb3B0aW9ucygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuICBnZXQgdmFsdWUoKSB7XHJcbiAgICByZXR1cm4gbnVtZXJhbCgpLnVuZm9ybWF0KHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIGdldCBmb3JtYXR0ZWRWYWx1ZSgpIHtcclxuICAgIHJldHVybiBudW1lcmFsKCkudW5mb3JtYXQodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IGxhbmd1YWdlRGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZURhdGE7XHJcbiAgfVxyXG4gIGdldCBhY3Rpb25UeXBlcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9hY3Rpb25UeXBlcztcclxuICB9XHJcbiAgZ2V0IGRyYWdTdGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kcmFnU3RhdGU7XHJcbiAgfVxyXG4gIGdldCBoaXN0b3J5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3Rvcnk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gU0VUVEVSU1xyXG4gIHNldCBkcmFnU3RhdGUoc3RhdGUpIHtcclxuICAgIHRoaXMuX2RyYWdTdGF0ZSA9IHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyB0aGUgY29ycmVjdCBhY3Rpb24gdHlwZSB0byBjaGFyL2tleSBjb2RlcyBhcnJheSB3aXRoIHRoZVxyXG4gICAqIGNvcnJlY3QgZGVjaW1hbCBhbmQgZGVsaW1pdGVyIGNoYXJhY3RlcnMgKGRlcGVuZGluZyBvbiBsYW5ndWFnZSlcclxuICAgKi9cclxuICBjcmVhdGVBY3Rpb25UeXBlcygpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTlVNQkVSLFxyXG4gICAgICAgIG5hbWVzOiBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLk1JTlVTLFxyXG4gICAgICAgIG5hbWVzOiBbJy0nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFQ0lNQUwsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLmxhbmd1YWdlRGF0YS5kZWNpbWFsXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTElNSVRFUixcclxuICAgICAgICBuYW1lczogW3RoaXMubGFuZ3VhZ2VEYXRhLmRlbGltaXRlcl1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5TSE9SVENVVCxcclxuICAgICAgICBuYW1lczogT2JqZWN0LmtleXModGhpcy5sYW5ndWFnZURhdGEuc2hvcnRjdXRzKVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkJBQ0tTUEFDRSxcclxuICAgICAgICBuYW1lczogWydiYWNrc3BhY2UnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkRFTEVURSxcclxuICAgICAgICBuYW1lczogWydkZWxldGUnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLkhPUklaT05UQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsnbGVmdCcsICdyaWdodCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1csXHJcbiAgICAgICAgbmFtZXM6IFsndXAnLCAnZG93biddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuVU5ETyxcclxuICAgICAgICBuYW1lczogWyd6J10sXHJcbiAgICAgICAgY3RybDogdHJ1ZVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlJFRE8sXHJcbiAgICAgICAgbmFtZXM6IFsneSddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuICAvKipcclxuICAgKiBEZXRlcm1pbmVzIHdoYXQgdHlwZSBvZiBhY3Rpb24gbmVlZHMgdG8gYmUgZGVhbHQgd2l0aCBmcm9tIHRoZSBjdXJyZW50XHJcbiAgICoga2V5ZG93biBldmVudC4gRS5nLiB2ZXJ0aWNhbCBhcnJvdyBwcmVzc2VkLCBudW1iZXIgcHJlc3NlZCBldGMuLi5cclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgZ2V0QWN0aW9uVHlwZShuYW1lLCBlKSB7XHJcbiAgICBmb3IgKGxldCBhY3Rpb25UeXBlIG9mIHRoaXMuYWN0aW9uVHlwZXMpIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBhY3Rpb25UeXBlLm5hbWVzLmluZGV4T2YobmFtZSk7XHJcbiAgICAgIGNvbnN0IHR5cGVNYXRjaCA9IGluZGV4ID4gLTE7XHJcblxyXG4gICAgICBpZiAodHlwZU1hdGNoICYmIChhY3Rpb25UeXBlLmN0cmwgPyBlLmN0cmxLZXkgOiB0cnVlKSkge1xyXG4gICAgICAgIHJldHVybiBhY3Rpb25UeXBlLnR5cGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBBQ1RJT05fVFlQRVMuVU5LTk9XTjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIHZhbHVlIGlzIG5vdCB0b28gbGFyZ2Ugb3Igc21hbGxcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gY2hlY2tcclxuICAgKi9cclxuICBjaGVja1ZhbHVlTWFnbml0dWRlKHZhbCkge1xyXG4gICAgY29uc3QgbnVtID0gbnVtZXJhbCgpLnVuZm9ybWF0KHZhbCk7XHJcbiAgICByZXR1cm4gbnVtXHJcbiAgICAgID8gKG51bSA8PSB0aGlzLm9wdGlvbnMubWF4VmFsdWUgJiYgbnVtID49IHRoaXMub3B0aW9ucy5taW5WYWx1ZSlcclxuICAgICAgOiB0cnVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBDaGVjayB2YWx1ZSBpcyBub3QgdG9vIG1hbnkgY2hhcmFjdGVycyBsb25nXHJcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGNoZWNrXHJcbiAgICovXHJcbiAgY2hlY2tWYWx1ZUxlbmd0aCh2YWwpIHtcclxuICAgIGNvbnN0IG51bSA9IG51bWVyYWwoKS51bmZvcm1hdCh2YWwpO1xyXG4gICAgcmV0dXJuIG51bVxyXG4gICAgICA/IG51bS50b1N0cmluZygpLmxlbmd0aCA8PSB0aGlzLm9wdGlvbnMubWF4TGVuZ3RoXHJcbiAgICAgIDogdHJ1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ29tYmluZXMgdGhlIGFib3ZlIGZ1bmN0aW9ucyB0byBkZWNpZGUgd2hldGhlciB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IHRvb1xyXG4gICAqIGxhcmdlIG9yIHRvIG1hbnkgY2hhcmFjdGVyc1xyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBjaGVja1xyXG4gICAqL1xyXG4gIGNoZWNrVmFsdWVTaXppbmcodmFsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja1ZhbHVlTGVuZ3RoKHZhbCkgJiYgdGhpcy5jaGVja1ZhbHVlTWFnbml0dWRlKHZhbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSB2YWx1ZSwgZnVsbHkgZm9ybWF0dGVkLCBmb3IgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHt2YWx9IE5ldyB2YWx1ZSB0byBzZXRcclxuICAgKi9cclxuICBzZXRWYWx1ZSh2YWwpIHtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gaGVscGVycy5mdWxsRm9ybWF0KHZhbCwgdGhpcy5vcHRpb25zLmZvcm1hdCwgdGhpcy5vcHRpb25zLmN1cnJlbmN5KTtcclxuICAgIGNvbnN0IGlzVmFsdWVWYWxpZCA9IHRoaXMuY2hlY2tWYWx1ZVNpemluZyhuZXdWYWx1ZSk7XHJcbiAgICBjb25zdCB2YWx1ZUNhbkNoYW5nZSA9IChuZXdWYWx1ZSAmJiBpc1ZhbHVlVmFsaWQpO1xyXG5cclxuICAgIGlmICh2YWx1ZUNhbkNoYW5nZSkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWVDYW5DaGFuZ2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9cclxuICAvLyBFVkVOVCBIQU5ETEVSU1xyXG4gIC8vXHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzaW5nIE9VVCBvZiB0aGUgaW5wdXQgLSBmb3JtYXQgZnVsbHlcclxuICAgKiBAcGFyYW0ge2V9IEZvY3VzIGV2ZW50XHJcbiAgICovXHJcbiAgb25Gb2N1c291dChlKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XHJcbiAgICBjb25zdCB2YWx1ZUNoYW5nZWQgPSB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3VzaW4oZSkge1xyXG4gICAgY29uc29sZS5sb2coJ0ZvY3VzIElOIGV2ZW50JywgZSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSAwO1xyXG4gICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCA9IHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGg7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGRyb3BwaW5nIHNvbWV0aGluZyBpbnRvIHRoZSBpbnB1dCAtIHJlcGxhY2UgdGhlIFdIT0xFIHZhbHVlXHJcbiAgICogd2l0aCB0aGlzIG5ldyB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJvcChlKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRHJvcCBldmVudCcsIGUpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5kcmFnU3RhdGUpIHtcclxuICAgICAgY2FzZSBEUkFHX1NUQVRFUy5JTlRFUk5BTDpcclxuICAgICAgICAvLyBUaGlzIGNhc2UgaXMgaGFuZGxlZCBieSB0aGUgJ29uSW5wdXQnIGZ1bmN0aW9uXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuRVhURVJOQUw6XHJcbiAgICAgICAgY29uc3QgdmFsdWVDaGFuZ2VkID0gdGhpcy5zZXRWYWx1ZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0JykpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEbyBub3RoaW5nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gc3RhcnQgb2YgQU5ZIGRyYWcgb24gcGFnZVxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ3N0YXJ0KGUpIHtcclxuICAgIHRoaXMuZHJhZ1N0YXRlID0gKGUudGFyZ2V0ID09PSB0aGlzLmVsZW1lbnQpXHJcbiAgICAgID8gRFJBR19TVEFURVMuSU5URVJOQUxcclxuICAgICAgOiBEUkFHX1NUQVRFUy5FWFRFUk5BTDtcclxuICAgIGlmICh0aGlzLmRyYWdTdGF0ZSA9PT0gRFJBR19TVEFURVMuRVhURVJOQUwpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5vcHRpb25zLmRyb3BwYWJsZUNsYXNzKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdEcmFnIFNUQVJURUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdEcmFnIEVOREVEJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG4gICAgdGhpcy5kcmFnU3RhdGUgPSBEUkFHX1NUQVRFUy5OT05FO1xyXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLmRyb3BwYWJsZUNsYXNzKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gdGhlIGRyYWdnZWQgaXRlbSBlbnRlcmluZyB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdlbnRlcihlKSB7XHJcbiAgICBjb25zb2xlLmxvZygnRHJhZyBFTlRFUicsIHRoaXMuZHJhZ1N0YXRlLCBlKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gdGhlIGRyYWdnZWQgaXRlbSBsZWF2aW5nIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ2xlYXZlKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdEcmFnIExFQVZFJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG5cclxuICAgIGlmICh0aGlzLmRyYWdTdGF0ZSA9PT0gRFJBR19TVEFURVMuRVhURVJOQUwpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcGFzdGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IENsaXBib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uUGFzdGUoZSkge1xyXG4gICAgY29uc29sZS5sb2coJ1Bhc3RlIGV2ZW50JywgZSk7XHJcbiAgICBjb25zdCBjaGFycyA9IGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7XHJcbiAgICBjb25zdCBwb3RlbnRpYWxWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICBjaGFycyxcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHZhbHVlQ2hhbmdlZCA9IHRoaXMuc2V0VmFsdWUocG90ZW50aWFsVmFsdWUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICBvbktleXByZXNzKGUpIHtcclxuICAgY29uc29sZS5sb2coJ2tleXByZXNzJywgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHByZXNzaW5nIGFueSBrZXkgaW5zaWRlIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gS2V5Ym9hcmQgZXZlbnRcclxuICAgKi9cclxuICBvbktleWRvd24oZSkge1xyXG4gICAgY29uc29sZS5sb2coJ2tleWRvd24nLCBlKTtcclxuXHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkucmVwbGFjZSgnbnVtcGFkICcsICcnKSxcclxuICAgICAgY2FyZXRTdGFydDogdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBjYXJldEVuZDogdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgY3VycmVudFZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIG5ld1ZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3Rpb25UeXBlID0gdGhpcy5nZXRBY3Rpb25UeXBlKGtleUluZm8ua2V5TmFtZSwgZSk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk5VTUJFUjpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk51bWJlcihrZXlJbmZvKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5sYW5ndWFnZURhdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5NSU5VUzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk1pbnVzKGtleUluZm8pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMubGFuZ3VhZ2VEYXRhKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVzpcclxuICAgICAgICAvLyBEZWZhdWx0IGJlaGF2aW91clxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVkVSVElDQUxfQVJST1c6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25WZXJ0aWNhbEFycm93KGtleUluZm8sIHRoaXMub3B0aW9ucy52YWx1ZVN0ZXApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5CQUNLU1BBQ0U6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25CYWNrc3BhY2Uoa2V5SW5mbywgdGhpcy5vcHRpb25zLmRlbGltaXRlckRlbGV0ZVN0cmF0ZWd5LCB0aGlzLmxhbmd1YWdlRGF0YS5kZWxpbWl0ZXIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5ERUxFVEU6XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25EZWxldGUoa2V5SW5mbywgdGhpcy5vcHRpb25zLmRlbGltaXRlckRlbGV0ZVN0cmF0ZWd5LCB0aGlzLmxhbmd1YWdlRGF0YS5kZWxpbWl0ZXIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5VTkRPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVW5kbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlJFRE86XHJcbiAgICAgICAga2V5SGFuZGxlcnMub25SZWRvKHRoaXMsIGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlVOS05PV05cIik7XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMuY3VycmVuY3ksIHRoaXMubGFuZ3VhZ2VEYXRhKTtcclxuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuZWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IGlzVmFsdWVWYWxpZCA9IHRoaXMuY2hlY2tWYWx1ZVNpemluZyhuZXdWYWx1ZSk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LnZhbHVlID0gaXNWYWx1ZVZhbGlkID8gbmV3VmFsdWUgOiB0aGlzLmVsZW1lbnQudmFsdWU7XHJcblxyXG4gICAgaWYgKGlzVmFsdWVWYWxpZCkge1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSBoZWxwZXJzLmNhbGN1bGF0ZU9mZnNldChcclxuICAgICAgICBjdXJyZW50VmFsdWUsXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlLFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY3VycmVuY3ksXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZURhdGFcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbmV3Q2FyZXRQb3MgPSBrZXlJbmZvLmNhcmV0U3RhcnQgKyBvZmZzZXQ7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShuZXdDYXJldFBvcywgbmV3Q2FyZXRQb3MpO1xyXG4gICAgICB0aGlzLmhpc3RvcnkuYWRkVmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBCYWNrdXAgZXZlbnQgaWYgaW5wdXQgY2hhbmdlcyBmb3IgYW55IG90aGVyIHJlYXNvbiwganVzdCBmb3JtYXQgdmFsdWVcclxuICAgKiBAcGFyYW0ge2V9IEV2ZW50XHJcbiAgICovXHJcbiAgb25JbnB1dChlKSB7XHJcbiAgICBjb25zb2xlLmxvZygnb24gSU5QVVQnLCBlKTtcclxuICAgIGNvbnN0IHZhbHVlQ2hhbmdlZCA9IHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaW5wdXQ7XHJcbiIsIlxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cclxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XHJcbiAqIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgJ3RvQWRkJyBzdHJpbmdcclxuICovXHJcbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xyXG4gIGNvbnN0IGZpcnN0SGFsZiA9IHN0ci5zbGljZSgwLCBjYXJldFN0YXJ0KTtcclxuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcclxuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdWxseSBmb3JtYXQgdGhlIHZhbHVlIHVzaW5nIG51bWVyYWwgKERvbmUgb24gZm9jdXMgb3V0KVxyXG4gKi9cclxuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBmb3JtYXQsIGN1cnJlbmN5KSB7XHJcbiAgY29uc3QgZnVsbEZvcm1hdCA9IGN1cnJlbmN5ID8gYCR7Y3VycmVuY3l9JHtmb3JtYXR9YCA6IGZvcm1hdDtcclxuXHJcbiAgaWYgKCF2YWwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHZhbCA+PSAwICYmIHZhbCA8PSA5ID8gbnVtZXJhbCh2YWwpLmZvcm1hdChmdWxsRm9ybWF0KSA6IG51bGw7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IG51bWVyYWxWYWwgPSBudW1lcmFsKHZhbCk7XHJcbiAgICBpZiAoaXNOYU4obnVtZXJhbFZhbC52YWx1ZSgpKSB8fCAhTnVtYmVyLmlzRmluaXRlKG51bWVyYWxWYWwudmFsdWUoKSkpIHtcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudW1lcmFsVmFsLmZvcm1hdChmdWxsRm9ybWF0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcclxuICovXHJcbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgY3VycmVuY3ksIGxhbmd1YWdlRGF0YSkge1xyXG4gIGxldCBzdHIgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHsoY3VycmVuY3kgfHwgJycpfSR7bGFuZ3VhZ2VEYXRhLmRlbGltaXRlcn1dYCwgJ2cnKSwgJycpO1xyXG4gIGNvbnN0IHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihsYW5ndWFnZURhdGEuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyBzdHIuaW5kZXhPZihsYW5ndWFnZURhdGEuZGVjaW1hbCkgLSAxXHJcbiAgICA6IHN0ci5sZW5ndGggLSAxO1xyXG4gIGNvbnN0IGVuZEluZGV4ID0gc3RyWzBdID09PSAnLScgPyAxIDogMDtcclxuXHJcbiAgLy8gaSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvIGJlY2F1c2UgbnVtYmVyIGNhbm5vdCBzdGFydCB3aXRoIGNvbW1hXHJcbiAgbGV0IGkgPSBzdGFydEluZGV4O1xyXG4gIGxldCBqID0gMTtcclxuICBmb3IgKGksIGo7IGkgPiBlbmRJbmRleDsgaS0tLCBqKyspIHtcclxuICAgIC8vIEV2ZXJ5IDMgY2hhcmFjZXJzLCBhZGQgYSBjb21tYVxyXG4gICAgaWYgKGogJSAzID09PSAwKSB7XHJcbiAgICAgIHN0ciA9IHRoaXMuZWRpdFN0cmluZyhzdHIsICcsJywgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIE9ubHkgYWRkIGN1cnJlbmN5IHN5bWJvbCBvbiBpZiB2YWx1ZSBoYXMgYW55IG51bWJlcnNcclxuICBpZiAoY3VycmVuY3kgJiYgc3RyICYmIHN0ci5tYXRjaCgvXFxkLykpIHtcclxuICAgIHJldHVybiBzdHJbMF0gPT09ICctJyA/IHN0ci5yZXBsYWNlKCctJywgYC0ke2N1cnJlbmN5fWApIDogYCR7Y3VycmVuY3l9JHtzdHJ9YFxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIGRlbGltaXRlcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIGN1cnJlbmN5LCBsYW5ndWFnZURhdGEpIHtcclxuICBsZXQgaSwgajtcclxuICBmb3IgKGk9MCwgaj0wOyBpIDwgcG9zOyBpKyssIGorKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IGxhbmd1YWdlRGF0YS5kZWxpbWl0ZXIgfHwgcHJldltpXSA9PT0gY3VycmVuY3kpIHtcclxuICAgICAgaSsrO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJbal0gPT09IGxhbmd1YWdlRGF0YS5kZWxpbWl0ZXIgfHwgY3VycltqXSA9PT0gY3VycmVuY3kpIHtcclxuICAgICAgaisrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gaiAtIGk7XHJcbn1cclxuIiwiLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gICAgIEtFWSBIQU5ETEVSUyAgICAgLy9cclxuLy89PT09PT09PT09PT09PT09PT09PT09Ly9cclxuLy8gQWxsIGZ1bmN0aW9ucyBkZWFsaW5nIHdpdGgga2V5cHJlc3NlcyAobGlzdGVuZWQgdG8gb24gdGhlIGtleWRvd24gZXZlbnQpXHJcbi8vIGFyZSBoZXJlLCB3aXRoIHNwZWNpZmljIGltcGxlbWVudGF0aW9ucyBmb3IgbW9zdCB0eXBlcyBvZiBrZXlcclxuXHJcbmltcG9ydCB7QUNUSU9OX1RZUEVTLCBERUxJTUlURVJfU1RSQVRFR0lFU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5VTUJFUiBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25OdW1iZXI6IGZ1bmN0aW9uKGtleUluZm8pIHtcclxuICAgIGNvbnN0IGFsbG93ZWROdW1iZXIgPVxyXG4gICAgICAhKGtleUluZm8uY3VycmVudFZhbHVlWzBdID09PSAnLSdcclxuICAgICAgJiYga2V5SW5mby5jYXJldFN0YXJ0ID09PSAwXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRFbmQgPT09IDApO1xyXG5cclxuICAgIGlmIChhbGxvd2VkTnVtYmVyKSB7XHJcbiAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoa2V5SW5mby5jdXJyZW50VmFsdWUsIGtleUluZm8ua2V5TmFtZSwga2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmNhcmV0RW5kKTtcclxuICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IDE7XHJcbiAgICB9XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogTUlOVVMgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTWludXM6IGZ1bmN0aW9uKGtleUluZm8pIHtcclxuICAgIGNvbnN0IG1pbnVzQWxsb3dlZCA9IGtleUluZm8uY2FyZXRTdGFydCA9PT0gMCAmJlxyXG4gICAgICAoa2V5SW5mby5jdXJyZW50VmFsdWVbMF0gIT09ICctJyB8fCBrZXlJbmZvLmNhcmV0RW5kID4gMCk7XHJcblxyXG4gICAgIGlmIChtaW51c0FsbG93ZWQpIHtcclxuICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBoZWxwZXJzLmVkaXRTdHJpbmcoXHJcbiAgICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgICAnLScsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICAgKTtcclxuICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgIH1cclxuICAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVDSU1BTCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtsYW5ndWFnZURhdGF9IExhbmd1YWdlIHNwZWNpZmljIGluZm8gZm9yIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxyXG4gICAqL1xyXG4gIG9uRGVjaW1hbDogZnVuY3Rpb24oa2V5SW5mbywgbGFuZ3VhZ2VEYXRhKSB7XHJcbiAgICBjb25zdCBkZWNpbWFsSW5kZXggPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5pbmRleE9mKGxhbmd1YWdlRGF0YS5kZWNpbWFsKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBpcyBub3QgYWxyZWFkeSBhIGRlY2ltYWwgb3IgdGhlIG9yaWdpbmFsIHdvdWxkIGJlIHJlcGxhY2VkXHJcbiAgICAvLyBBZGQgdGhlIGRlY2ltYWxcclxuICAgIGNvbnN0IGRlY2ltYWxBbGxvd2VkID1cclxuICAgICAgKGRlY2ltYWxJbmRleCA9PT0gLTEpIHx8XHJcbiAgICAgICAgKGRlY2ltYWxJbmRleCA+PSBrZXlJbmZvLmNhcmV0U3RhcnQgJiZcclxuICAgICAgICAgZGVjaW1hbEluZGV4IDwga2V5SW5mby5jYXJldEVuZCk7XHJcblxyXG4gICAgaWYgKGRlY2ltYWxBbGxvd2VkKVxyXG4gICAge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgIGtleUluZm8uY3VycmVudFZhbHVlLFxyXG4gICAgICAgIGxhbmd1YWdlRGF0YS5kZWNpbWFsLFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0RW5kXHJcbiAgICAgICk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTSE9SVENVVCBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtsYW5ndWFnZURhdGF9IExhbmd1YWdlIHNwZWNpZmljIGluZm8gZm9yIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxyXG4gICAqL1xyXG4gIG9uU2hvcnRjdXQ6IGZ1bmN0aW9uKGtleUluZm8sIGxhbmd1YWdlRGF0YSkge1xyXG4gICAgY29uc3QgcG93ZXIgPSBsYW5ndWFnZURhdGEuc2hvcnRjdXRzW2tleUluZm8ua2V5TmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuXHJcbiAgICBpZiAocG93ZXIpIHtcclxuICAgICAgY29uc3QgbnVtZXJhbFZhbCA9IG51bWVyYWwoa2V5SW5mby5jdXJyZW50VmFsdWUpO1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gKG51bWVyYWxWYWwudmFsdWUoKSA/IG51bWVyYWxWYWwgOiBudW1lcmFsKDEpKVxyXG4gICAgICAgIC5tdWx0aXBseShNYXRoLnBvdygxMCwgcG93ZXIpKS5mb3JtYXQoKTtcclxuXHJcbiAgICAgIC8vIFRPRE8gLSBCRUhBVklPVVI6IHNob3VsZCBjYXJldCB0byBqdW1wIHRvIGVuZD8gYXMgd2hvbGUgdmFsdWUgaXNcclxuICAgICAgLy8gbXVsaXBsaWVkIGJ5IHRoZSBtdWx0aXBsZXIgLSAoZG9lc24ndCBqdXN0IGNodWNrIHplcm9zIGluIHRoZSBtaWRkbGUpXHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IGtleUluZm8ubmV3VmFsdWUubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJBQ0tTUEFDRSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICovXHJcbiAgb25CYWNrc3BhY2U6IGZ1bmN0aW9uKGtleUluZm8sIGRlbGltaXRlclN0cmF0ZWd5LCBkZWxpbWl0ZXIpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEJFRk9SRSBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9ICcnO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldFN0YXJ0LCBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIGFzIHRoZXJlIGlzIGEgY29tbWEgdGhlbiB0aGVyZSBtdXN0IGJlIGEgbnVtYmVyIGJlZm9yZSBpdFxyXG4gICAgICAgIGxldCBjYXJldEp1bXAgPVxyXG4gICAgICAgICAgKChkZWxpbWl0ZXJTdHJhdGVneSA9PT0gREVMSU1JVEVSX1NUUkFURUdJRVMuREVMRVRFX05VTUJFUilcclxuICAgICAgICAgICYmIChrZXlJbmZvLmN1cnJlbnRWYWx1ZVtrZXlJbmZvLmNhcmV0U3RhcnQgLSAxXSA9PT0gZGVsaW1pdGVyKSlcclxuICAgICAgICAgICAgPyAyXHJcbiAgICAgICAgICAgIDogMTtcclxuXHJcbiAgICAgICAgY2FyZXRKdW1wID0gKChrZXlJbmZvLmNhcmV0U3RhcnQgLSBjYXJldEp1bXApID4gMCkgPyBjYXJldEp1bXAgOiAwO1xyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCAtIGNhcmV0SnVtcCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZShrZXlJbmZvLmNhcmV0U3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IC1jYXJldEp1bXA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkRlbGV0ZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFTEVURSBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtrZXlJbmZvfSBJbmZvcm1hdGlvbiBhYm91dCB0aGUga2V5cHJlc3MvYWN0aW9uXHJcbiAgICogQHBhcmFtIHtsYW5ndWFnZURhdGF9IExhbmd1YWdlIHNwZWNpZmljIGluZm8gZm9yIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxyXG4gICAqL1xyXG4gIG9uRGVsZXRlOiBmdW5jdGlvbihrZXlJbmZvLCBkZWxpbWl0ZXJTdHJhdGVneSwgZGVsaW1pdGVyKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGNvbnN0IG5leHRDaGFyID0ga2V5SW5mby5jdXJyZW50VmFsdWVba2V5SW5mby5jYXJldFN0YXJ0XTtcclxuXHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjYXJldFxyXG4gICAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgICAgbGFzdEhhbGYgPSAnJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBBc3N1bWUgYXMgdGhlcmUgaXMgYSBjb21tYSB0aGVuIHRoZXJlIG11c3QgYmUgYSBudW1iZXIgYWZ0ZXIgaXRcclxuICAgICAgICBjb25zdCB0b0RlbGV0ZSA9IGRlbGltaXRlclN0cmF0ZWd5ID09PSBERUxJTUlURVJfU1RSQVRFR0lFUy5ERUxFVEVfTlVNQkVSO1xyXG4gICAgICAgIGNvbnN0IGRlbGltaXRlck5leHQgPSBuZXh0Q2hhciA9PT0gZGVsaW1pdGVyO1xyXG5cclxuICAgICAgICAvLyBJZiBjaGFyIHRvIGRlbGV0ZSBpcyBkZWxpbWl0ZXIgYW5kIG51bWJlciBpcyBub3QgdG8gYmUgZGVsZXRlZCAtIHNraXAgb3ZlciBpdFxyXG4gICAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSBkZWxpbWl0ZXJOZXh0ICYmICF0b0RlbGV0ZSA/IDEgOiAwO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0SGFsZlN0YXJ0ID0ga2V5SW5mby5jYXJldFN0YXJ0XHJcbiAgICAgICAgICArIChkZWxpbWl0ZXJOZXh0ID8gKHRvRGVsZXRlID8gMiA6IDApIDogMSk7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGxhc3RIYWxmU3RhcnQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNhbWUgY29kZSBhcyBvbkJhY2tzcGFjZSBoYW5kbGVyIGZvciBkZWxldGluZyBhIHNlbGVjdGlvbiByYW5nZVxyXG4gICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRFbmQsIGtleUluZm8uY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAga2V5SW5mby5uZXdWYWx1ZSA9IGZpcnN0SGFsZiArIGxhc3RIYWxmO1xyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFZFUlRJQ0FMIEFSUk9XIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge3N0ZXB9IEhvdyBtdWNoIHRvIGluY3JlYXNlL2RlY3JlYXNlIHZhbHVlIGJ5XHJcbiAgICovXHJcbiAgb25WZXJ0aWNhbEFycm93OiBmdW5jdGlvbihrZXlJbmZvLCBzdGVwKSB7XHJcbiAgICAvLyBJZiBzdGVwIGlzIDAgKG9yIGZhbHNleSkgdGhlbiBhc3N1bWUgYXJyb3cga2V5IHZhbHVlIGNoYW5naW5nIGlzIGRpc2FibGVkXHJcbiAgICBpZiAoc3RlcCAmJiAhaXNOYU4oc3RlcCkpIHtcclxuICAgICAgc3dpdGNoIChrZXlJbmZvLmtleU5hbWUpIHtcclxuICAgICAgICBjYXNlICd1cCc6XHJcbiAgICAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gbnVtZXJhbChrZXlJbmZvLmN1cnJlbnRWYWx1ZSkuYWRkKHN0ZXApLmZvcm1hdCgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZG93bic6XHJcbiAgICAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gbnVtZXJhbChrZXlJbmZvLmN1cnJlbnRWYWx1ZSkuc3VidHJhY3Qoc3RlcCkuZm9ybWF0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICB9XHJcbiAgICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBVTkRPIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2ZpbnB1dH0gdGhlIEZpbnB1dCBvYmplY3RcclxuICAgKiBAcGFyYW0ge2V2ZW50fSBUaGUga2V5ZG93biBldmVudCB3aGljaCB0cmlnZ2VyZWQgdGhlIHVuZG9cclxuICAgKi9cclxuICBvblVuZG86IGZ1bmN0aW9uKGZpbnB1dCwgZXZlbnQpIHtcclxuICAgIGZpbnB1dC5lbGVtZW50LnZhbHVlID0gZmlucHV0Lmhpc3RvcnkudW5kbygpO1xyXG4gICAgZmlucHV0LmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoLCBmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFJFRE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgcmVkb1xyXG4gICAqL1xyXG4gIG9uUmVkbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuaGlzdG9yeS5yZWRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxufVxyXG4iLCJcclxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gNTA7XHJcblxyXG4vKipcclxuICogVmFsdWUgSGlzdG9yeSAtIE1hbmFnZXMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgY2FuIGJlIHRyYWNrZWQsIHN1cHBvcnRpbmdcclxuICogdGhlIHVuZG8gYW5kIHJlZG8gb3BlcmF0aW9ucyBpbiB0aGUgaW5wdXRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlSGlzdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IFtudWxsXTtcclxuICAgIHRoaXMuX2N1cnJlbnRJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvLyBHRVRURVJTXHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRJbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50SW5kZXg7XHJcbiAgfVxyXG4gIGdldCBjdXJyZW50VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3J5W3RoaXMuY3VycmVudEluZGV4XTtcclxuICB9XHJcblxyXG4gIHNldCBjdXJyZW50SW5kZXgoaSkge1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gaTtcclxuICB9XHJcbiAgc2V0IGhpc3RvcnkoaGlzdG9yeSkge1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IGhpc3Rvcnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbmRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIHByZXZpb3VzIHZhbHVlIGluIGhpc3RvcnkgYXJyYXlcclxuICAgKi9cclxuICB1bmRvKCkge1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID4gMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleC0tO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBSZWRvIGNoYW5nZSwgc28gcmV0dXJuIHRvIG5leHQgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHJlZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmhpc3RvcnkubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBBZGQgbmV3IHZhbHVlIHRvIGhpc3RvcnkgYXJyYXkuIEFueSBwb3NzaWJsZSAncmVkbydzJyBhcmUgcmVtb3ZlZCBmcm9tIGFycmF5XHJcbiAgICogYXMgYSBuZXcgJ2JyYW5jaCcgb2YgaGlzdG9yeSBpcyBjcmVhdGVkIHdoZW4gYSBuZXcgdmFsdWUgaXMgYWRkZWRcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gYWRkIHRvIGhpc3RvcnkgXHJcbiAgICovXHJcbiAgYWRkVmFsdWUodmFsKSB7XHJcbiAgICAvLyBEZWxldGUgZXZlcnl0aGluZyBBRlRFUiBjdXJyZW50IHZhbHVlXHJcbiAgICBpZiAodmFsICE9PSB0aGlzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmhpc3RvcnkgPSB0aGlzLmhpc3Rvcnkuc2xpY2UoMCwgdGhpcy5jdXJyZW50SW5kZXggKyAxKTtcclxuICAgICAgdGhpcy5oaXN0b3J5LnB1c2godmFsKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkubGVuZ3RoID4gTUFYX0JVRkZFUl9TSVpFKSB7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5LnNoaWZ0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICB9XHJcbn1cclxuIl19
