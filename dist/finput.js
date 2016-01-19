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
  REDO: 'REDO',
  HOME: 'HOME',
  END: 'END'
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
        type: _constants.ACTION_TYPES.HOME,
        names: ['home']
      }, {
        type: _constants.ACTION_TYPES.END,
        names: ['end']
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
      if (this.dragState === _constants.DRAG_STATES.EXTERNAL) {
        this.element.classList.add(this.options.droppableClass);
      }
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
      this.element.classList.remove(this.options.droppableClass);
    }
    /**
     * On the dragged item entering the input
     * @param {e} Drag event
     */

  }, {
    key: 'onDragenter',
    value: function onDragenter(e) {
      console.debug('Drag ENTER', this.dragState, e);
    }
    /**
     * On the dragged item leaving the input
     * @param {e} Drag event
     */

  }, {
    key: 'onDragleave',
    value: function onDragleave(e) {
      console.debug('Drag LEAVE', this.dragState, e);

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
      console.debug('keydown', e);

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
        case _constants.ACTION_TYPES.HOME:
        case _constants.ACTION_TYPES.END:
          console.debug(actionType);
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
          console.debug("UNKNOWN");
          // If ctrl key modifier is pressed then allow specific event handler
          // to handle this
          if (!e.ctrlKey) {
            e.preventDefault();
          }
          return;
      }

      var newValue = _helpers2.default.partialFormat(keyInfo.newValue, this.options.currency, this.languageData);
      var currentValue = keyInfo.newValue;
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
      prevSymbols = 0,
      currentSymbols = 0;
  for (i = 0; i < pos; i++) {
    if (prev[i] === languageData.delimiter || currency && prev[i] === currency) {
      prevSymbols++;
    }
  }
  for (i = 0; i < pos; i++) {
    if (curr[i] === languageData.delimiter || currency && curr[i] === currency) {
      currentSymbols++;
    }
  }
  return currentSymbols - prevSymbols;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9udW1lcmFsL251bWVyYWwuanMiLCJzcmNcXGNvbnN0YW50cy5qcyIsInNyY1xcZmlucHV0LmpzIiwic3JjXFxoZWxwZXJzLmpzIiwic3JjXFxrZXlIYW5kbGVycy5qcyIsInNyY1xcdmFsdWVIaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0cUJBLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDckIsUUFBTSxFQUFF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LEVBQUU7QUFDbEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7S0FDeEI7Ozt3QkFOa0I7QUFDakIsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4Qzs7O1NBaEJrQixZQUFZOzs7a0JBQVosWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBTb3VyY2U6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvdld4OFYvXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MDMxOTUvZnVsbC1saXN0LW9mLWphdmFzY3JpcHQta2V5Y29kZXNcblxuXG5cbi8qKlxuICogQ29uZW5pZW5jZSBtZXRob2QgcmV0dXJucyBjb3JyZXNwb25kaW5nIHZhbHVlIGZvciBnaXZlbiBrZXlOYW1lIG9yIGtleUNvZGUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0ga2V5Q29kZSB7TnVtYmVyfSBvciBrZXlOYW1lIHtTdHJpbmd9XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBHZXQgYnkgbmFtZVxuICpcbiAqICAgZXhwb3J0cy5jb2RlWydlbnRlciddIC8vID0+IDEzXG4gKi9cblxudmFyIGNvZGVzID0gZXhwb3J0cy5jb2RlID0gZXhwb3J0cy5jb2RlcyA9IHtcbiAgJ2JhY2tzcGFjZSc6IDgsXG4gICd0YWInOiA5LFxuICAnZW50ZXInOiAxMyxcbiAgJ3NoaWZ0JzogMTYsXG4gICdjdHJsJzogMTcsXG4gICdhbHQnOiAxOCxcbiAgJ3BhdXNlL2JyZWFrJzogMTksXG4gICdjYXBzIGxvY2snOiAyMCxcbiAgJ2VzYyc6IDI3LFxuICAnc3BhY2UnOiAzMixcbiAgJ3BhZ2UgdXAnOiAzMyxcbiAgJ3BhZ2UgZG93bic6IDM0LFxuICAnZW5kJzogMzUsXG4gICdob21lJzogMzYsXG4gICdsZWZ0JzogMzcsXG4gICd1cCc6IDM4LFxuICAncmlnaHQnOiAzOSxcbiAgJ2Rvd24nOiA0MCxcbiAgJ2luc2VydCc6IDQ1LFxuICAnZGVsZXRlJzogNDYsXG4gICdjb21tYW5kJzogOTEsXG4gICdyaWdodCBjbGljayc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyLFxufVxuXG4vLyBIZWxwZXIgYWxpYXNlc1xuXG52YXIgYWxpYXNlcyA9IGV4cG9ydHMuYWxpYXNlcyA9IHtcbiAgJ3dpbmRvd3MnOiA5MSxcbiAgJ+KHpyc6IDE2LFxuICAn4oylJzogMTgsXG4gICfijIMnOiAxNyxcbiAgJ+KMmCc6IDkxLFxuICAnY3RsJzogMTcsXG4gICdjb250cm9sJzogMTcsXG4gICdvcHRpb24nOiAxOCxcbiAgJ3BhdXNlJzogMTksXG4gICdicmVhayc6IDE5LFxuICAnY2Fwcyc6IDIwLFxuICAncmV0dXJuJzogMTMsXG4gICdlc2NhcGUnOiAyNyxcbiAgJ3NwYyc6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDMzLFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cblxuLyohXG4gKiBQcm9ncmFtYXRpY2FsbHkgYWRkIHRoZSBmb2xsb3dpbmdcbiAqL1xuXG4vLyBsb3dlciBjYXNlIGNoYXJzXG5mb3IgKGkgPSA5NzsgaSA8IDEyMzsgaSsrKSBjb2Rlc1tTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGkgLSAzMlxuXG4vLyBudW1iZXJzXG5mb3IgKHZhciBpID0gNDg7IGkgPCA1ODsgaSsrKSBjb2Rlc1tpIC0gNDhdID0gaVxuXG4vLyBmdW5jdGlvbiBrZXlzXG5mb3IgKGkgPSAxOyBpIDwgMTM7IGkrKykgY29kZXNbJ2YnK2ldID0gaSArIDExMVxuXG4vLyBudW1wYWQga2V5c1xuZm9yIChpID0gMDsgaSA8IDEwOyBpKyspIGNvZGVzWydudW1wYWQgJytpXSA9IGkgKyA5NlxuXG4vKipcbiAqIEdldCBieSBjb2RlXG4gKlxuICogICBleHBvcnRzLm5hbWVbMTNdIC8vID0+ICdFbnRlcidcbiAqL1xuXG52YXIgbmFtZXMgPSBleHBvcnRzLm5hbWVzID0gZXhwb3J0cy50aXRsZSA9IHt9IC8vIHRpdGxlIGZvciBiYWNrd2FyZCBjb21wYXRcblxuLy8gQ3JlYXRlIHJldmVyc2UgbWFwcGluZ1xuZm9yIChpIGluIGNvZGVzKSBuYW1lc1tjb2Rlc1tpXV0gPSBpXG5cbi8vIEFkZCBhbGlhc2VzXG5mb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gIGNvZGVzW2FsaWFzXSA9IGFsaWFzZXNbYWxpYXNdXG59XG4iLCIvKiFcbiAqIG51bWVyYWwuanNcbiAqIHZlcnNpb24gOiAxLjUuM1xuICogYXV0aG9yIDogQWRhbSBEcmFwZXJcbiAqIGxpY2Vuc2UgOiBNSVRcbiAqIGh0dHA6Ly9hZGFtd2RyYXBlci5naXRodWIuY29tL051bWVyYWwtanMvXG4gKi9cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgQ29uc3RhbnRzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdmFyIG51bWVyYWwsXG4gICAgICAgIFZFUlNJT04gPSAnMS41LjMnLFxuICAgICAgICAvLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsYW5ndWFnZSBjb25maWcgZmlsZXNcbiAgICAgICAgbGFuZ3VhZ2VzID0ge30sXG4gICAgICAgIGN1cnJlbnRMYW5ndWFnZSA9ICdlbicsXG4gICAgICAgIHplcm9Gb3JtYXQgPSBudWxsLFxuICAgICAgICBkZWZhdWx0Rm9ybWF0ID0gJzAsMCcsXG4gICAgICAgIC8vIGNoZWNrIGZvciBub2RlSlNcbiAgICAgICAgaGFzTW9kdWxlID0gKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKTtcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBDb25zdHJ1Y3RvcnNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIC8vIE51bWVyYWwgcHJvdG90eXBlIG9iamVjdFxuICAgIGZ1bmN0aW9uIE51bWVyYWwgKG51bWJlcikge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG51bWJlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB0b0ZpeGVkKCkgdGhhdCB0cmVhdHMgZmxvYXRzIG1vcmUgbGlrZSBkZWNpbWFsc1xuICAgICAqXG4gICAgICogRml4ZXMgYmluYXJ5IHJvdW5kaW5nIGlzc3VlcyAoZWcuICgwLjYxNSkudG9GaXhlZCgyKSA9PT0gJzAuNjEnKSB0aGF0IHByZXNlbnRcbiAgICAgKiBwcm9ibGVtcyBmb3IgYWNjb3VudGluZy0gYW5kIGZpbmFuY2UtcmVsYXRlZCBzb2Z0d2FyZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB0b0ZpeGVkICh2YWx1ZSwgcHJlY2lzaW9uLCByb3VuZGluZ0Z1bmN0aW9uLCBvcHRpb25hbHMpIHtcbiAgICAgICAgdmFyIHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbiksXG4gICAgICAgICAgICBvcHRpb25hbHNSZWdFeHAsXG4gICAgICAgICAgICBvdXRwdXQ7XG4gICAgICAgICAgICBcbiAgICAgICAgLy9yb3VuZGluZ0Z1bmN0aW9uID0gKHJvdW5kaW5nRnVuY3Rpb24gIT09IHVuZGVmaW5lZCA/IHJvdW5kaW5nRnVuY3Rpb24gOiBNYXRoLnJvdW5kKTtcbiAgICAgICAgLy8gTXVsdGlwbHkgdXAgYnkgcHJlY2lzaW9uLCByb3VuZCBhY2N1cmF0ZWx5LCB0aGVuIGRpdmlkZSBhbmQgdXNlIG5hdGl2ZSB0b0ZpeGVkKCk6XG4gICAgICAgIG91dHB1dCA9IChyb3VuZGluZ0Z1bmN0aW9uKHZhbHVlICogcG93ZXIpIC8gcG93ZXIpLnRvRml4ZWQocHJlY2lzaW9uKTtcblxuICAgICAgICBpZiAob3B0aW9uYWxzKSB7XG4gICAgICAgICAgICBvcHRpb25hbHNSZWdFeHAgPSBuZXcgUmVnRXhwKCcwezEsJyArIG9wdGlvbmFscyArICd9JCcpO1xuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2Uob3B0aW9uYWxzUmVnRXhwLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgRm9ybWF0dGluZ1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIGRldGVybWluZSB3aGF0IHR5cGUgb2YgZm9ybWF0dGluZyB3ZSBuZWVkIHRvIGRvXG4gICAgZnVuY3Rpb24gZm9ybWF0TnVtZXJhbCAobiwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBvdXRwdXQ7XG5cbiAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IGtpbmQgb2YgZm9ybWF0IHdlIGFyZSBkZWFsaW5nIHdpdGhcbiAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCckJykgPiAtMSkgeyAvLyBjdXJyZW5jeSEhISEhXG4gICAgICAgICAgICBvdXRwdXQgPSBmb3JtYXRDdXJyZW5jeShuLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pO1xuICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdC5pbmRleE9mKCclJykgPiAtMSkgeyAvLyBwZXJjZW50YWdlXG4gICAgICAgICAgICBvdXRwdXQgPSBmb3JtYXRQZXJjZW50YWdlKG4sIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJzonKSA+IC0xKSB7IC8vIHRpbWVcbiAgICAgICAgICAgIG91dHB1dCA9IGZvcm1hdFRpbWUobiwgZm9ybWF0KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gcGxhaW4gb2wnIG51bWJlcnMgb3IgYnl0ZXNcbiAgICAgICAgICAgIG91dHB1dCA9IGZvcm1hdE51bWJlcihuLl92YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJldHVybiBzdHJpbmdcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICAvLyByZXZlcnQgdG8gbnVtYmVyXG4gICAgZnVuY3Rpb24gdW5mb3JtYXROdW1lcmFsIChuLCBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHN0cmluZ09yaWdpbmFsID0gc3RyaW5nLFxuICAgICAgICAgICAgdGhvdXNhbmRSZWdFeHAsXG4gICAgICAgICAgICBtaWxsaW9uUmVnRXhwLFxuICAgICAgICAgICAgYmlsbGlvblJlZ0V4cCxcbiAgICAgICAgICAgIHRyaWxsaW9uUmVnRXhwLFxuICAgICAgICAgICAgc3VmZml4ZXMgPSBbJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ10sXG4gICAgICAgICAgICBieXRlc011bHRpcGxpZXIgPSBmYWxzZSxcbiAgICAgICAgICAgIHBvd2VyO1xuXG4gICAgICAgIGlmIChzdHJpbmcuaW5kZXhPZignOicpID4gLTEpIHtcbiAgICAgICAgICAgIG4uX3ZhbHVlID0gdW5mb3JtYXRUaW1lKHN0cmluZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3RyaW5nID09PSB6ZXJvRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgbi5fdmFsdWUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uZGVsaW1pdGVycy5kZWNpbWFsICE9PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcLi9nLCcnKS5yZXBsYWNlKGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmRlbGltaXRlcnMuZGVjaW1hbCwgJy4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzZWUgaWYgYWJicmV2aWF0aW9ucyBhcmUgdGhlcmUgc28gdGhhdCB3ZSBjYW4gbXVsdGlwbHkgdG8gdGhlIGNvcnJlY3QgbnVtYmVyXG4gICAgICAgICAgICAgICAgdGhvdXNhbmRSZWdFeHAgPSBuZXcgUmVnRXhwKCdbXmEtekEtWl0nICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy50aG91c2FuZCArICcoPzpcXFxcKXwoXFxcXCcgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5jdXJyZW5jeS5zeW1ib2wgKyAnKT8oPzpcXFxcKSk/KT8kJyk7XG4gICAgICAgICAgICAgICAgbWlsbGlvblJlZ0V4cCA9IG5ldyBSZWdFeHAoJ1teYS16QS1aXScgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5hYmJyZXZpYXRpb25zLm1pbGxpb24gKyAnKD86XFxcXCl8KFxcXFwnICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uY3VycmVuY3kuc3ltYm9sICsgJyk/KD86XFxcXCkpPyk/JCcpO1xuICAgICAgICAgICAgICAgIGJpbGxpb25SZWdFeHAgPSBuZXcgUmVnRXhwKCdbXmEtekEtWl0nICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy5iaWxsaW9uICsgJyg/OlxcXFwpfChcXFxcJyArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbCArICcpPyg/OlxcXFwpKT8pPyQnKTtcbiAgICAgICAgICAgICAgICB0cmlsbGlvblJlZ0V4cCA9IG5ldyBSZWdFeHAoJ1teYS16QS1aXScgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5hYmJyZXZpYXRpb25zLnRyaWxsaW9uICsgJyg/OlxcXFwpfChcXFxcJyArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbCArICcpPyg/OlxcXFwpKT8pPyQnKTtcblxuICAgICAgICAgICAgICAgIC8vIHNlZSBpZiBieXRlcyBhcmUgdGhlcmUgc28gdGhhdCB3ZSBjYW4gbXVsdGlwbHkgdG8gdGhlIGNvcnJlY3QgbnVtYmVyXG4gICAgICAgICAgICAgICAgZm9yIChwb3dlciA9IDA7IHBvd2VyIDw9IHN1ZmZpeGVzLmxlbmd0aDsgcG93ZXIrKykge1xuICAgICAgICAgICAgICAgICAgICBieXRlc011bHRpcGxpZXIgPSAoc3RyaW5nLmluZGV4T2Yoc3VmZml4ZXNbcG93ZXJdKSA+IC0xKSA/IE1hdGgucG93KDEwMjQsIHBvd2VyICsgMSkgOiBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYnl0ZXNNdWx0aXBsaWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRvIHNvbWUgbWF0aCB0byBjcmVhdGUgb3VyIG51bWJlclxuICAgICAgICAgICAgICAgIG4uX3ZhbHVlID0gKChieXRlc011bHRpcGxpZXIpID8gYnl0ZXNNdWx0aXBsaWVyIDogMSkgKiAoKHN0cmluZ09yaWdpbmFsLm1hdGNoKHRob3VzYW5kUmVnRXhwKSkgPyBNYXRoLnBvdygxMCwgMykgOiAxKSAqICgoc3RyaW5nT3JpZ2luYWwubWF0Y2gobWlsbGlvblJlZ0V4cCkpID8gTWF0aC5wb3coMTAsIDYpIDogMSkgKiAoKHN0cmluZ09yaWdpbmFsLm1hdGNoKGJpbGxpb25SZWdFeHApKSA/IE1hdGgucG93KDEwLCA5KSA6IDEpICogKChzdHJpbmdPcmlnaW5hbC5tYXRjaCh0cmlsbGlvblJlZ0V4cCkpID8gTWF0aC5wb3coMTAsIDEyKSA6IDEpICogKChzdHJpbmcuaW5kZXhPZignJScpID4gLTEpID8gMC4wMSA6IDEpICogKCgoc3RyaW5nLnNwbGl0KCctJykubGVuZ3RoICsgTWF0aC5taW4oc3RyaW5nLnNwbGl0KCcoJykubGVuZ3RoLTEsIHN0cmluZy5zcGxpdCgnKScpLmxlbmd0aC0xKSkgJSAyKT8gMTogLTEpICogTnVtYmVyKHN0cmluZy5yZXBsYWNlKC9bXjAtOVxcLl0rL2csICcnKSk7XG5cbiAgICAgICAgICAgICAgICAvLyByb3VuZCBpZiB3ZSBhcmUgdGFsa2luZyBhYm91dCBieXRlc1xuICAgICAgICAgICAgICAgIG4uX3ZhbHVlID0gKGJ5dGVzTXVsdGlwbGllcikgPyBNYXRoLmNlaWwobi5fdmFsdWUpIDogbi5fdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG4uX3ZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdEN1cnJlbmN5IChuLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pIHtcbiAgICAgICAgdmFyIHN5bWJvbEluZGV4ID0gZm9ybWF0LmluZGV4T2YoJyQnKSxcbiAgICAgICAgICAgIG9wZW5QYXJlbkluZGV4ID0gZm9ybWF0LmluZGV4T2YoJygnKSxcbiAgICAgICAgICAgIG1pbnVzU2lnbkluZGV4ID0gZm9ybWF0LmluZGV4T2YoJy0nKSxcbiAgICAgICAgICAgIHNwYWNlID0gJycsXG4gICAgICAgICAgICBzcGxpY2VJbmRleCxcbiAgICAgICAgICAgIG91dHB1dDtcblxuICAgICAgICAvLyBjaGVjayBmb3Igc3BhY2UgYmVmb3JlIG9yIGFmdGVyIGN1cnJlbmN5XG4gICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignICQnKSA+IC0xKSB7XG4gICAgICAgICAgICBzcGFjZSA9ICcgJztcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCcgJCcsICcnKTtcbiAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQuaW5kZXhPZignJCAnKSA+IC0xKSB7XG4gICAgICAgICAgICBzcGFjZSA9ICcgJztcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCckICcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCckJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9ybWF0IHRoZSBudW1iZXJcbiAgICAgICAgb3V0cHV0ID0gZm9ybWF0TnVtYmVyKG4uX3ZhbHVlLCBmb3JtYXQsIHJvdW5kaW5nRnVuY3Rpb24pO1xuXG4gICAgICAgIC8vIHBvc2l0aW9uIHRoZSBzeW1ib2xcbiAgICAgICAgaWYgKHN5bWJvbEluZGV4IDw9IDEpIHtcbiAgICAgICAgICAgIGlmIChvdXRwdXQuaW5kZXhPZignKCcpID4gLTEgfHwgb3V0cHV0LmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnNwbGl0KCcnKTtcbiAgICAgICAgICAgICAgICBzcGxpY2VJbmRleCA9IDE7XG4gICAgICAgICAgICAgICAgaWYgKHN5bWJvbEluZGV4IDwgb3BlblBhcmVuSW5kZXggfHwgc3ltYm9sSW5kZXggPCBtaW51c1NpZ25JbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBzeW1ib2wgYXBwZWFycyBiZWZvcmUgdGhlIFwiKFwiIG9yIFwiLVwiXG4gICAgICAgICAgICAgICAgICAgIHNwbGljZUluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0LnNwbGljZShzcGxpY2VJbmRleCwgMCwgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uY3VycmVuY3kuc3ltYm9sICsgc3BhY2UpO1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5qb2luKCcnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uY3VycmVuY3kuc3ltYm9sICsgc3BhY2UgKyBvdXRwdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3V0cHV0LmluZGV4T2YoJyknKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnNwbGl0KCcnKTtcbiAgICAgICAgICAgICAgICBvdXRwdXQuc3BsaWNlKC0xLCAwLCBzcGFjZSArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbCk7XG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LmpvaW4oJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBzcGFjZSArIGxhbmd1YWdlc1tjdXJyZW50TGFuZ3VhZ2VdLmN1cnJlbmN5LnN5bWJvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0UGVyY2VudGFnZSAobiwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBzcGFjZSA9ICcnLFxuICAgICAgICAgICAgb3V0cHV0LFxuICAgICAgICAgICAgdmFsdWUgPSBuLl92YWx1ZSAqIDEwMDtcblxuICAgICAgICAvLyBjaGVjayBmb3Igc3BhY2UgYmVmb3JlICVcbiAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCcgJScpID4gLTEpIHtcbiAgICAgICAgICAgIHNwYWNlID0gJyAnO1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJyAlJywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQgPSBmb3JtYXROdW1iZXIodmFsdWUsIGZvcm1hdCwgcm91bmRpbmdGdW5jdGlvbik7XG4gICAgICAgIFxuICAgICAgICBpZiAob3V0cHV0LmluZGV4T2YoJyknKSA+IC0xICkge1xuICAgICAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnNwbGl0KCcnKTtcbiAgICAgICAgICAgIG91dHB1dC5zcGxpY2UoLTEsIDAsIHNwYWNlICsgJyUnKTtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dC5qb2luKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dHB1dCA9IG91dHB1dCArIHNwYWNlICsgJyUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRUaW1lIChuKSB7XG4gICAgICAgIHZhciBob3VycyA9IE1hdGguZmxvb3Iobi5fdmFsdWUvNjAvNjApLFxuICAgICAgICAgICAgbWludXRlcyA9IE1hdGguZmxvb3IoKG4uX3ZhbHVlIC0gKGhvdXJzICogNjAgKiA2MCkpLzYwKSxcbiAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLnJvdW5kKG4uX3ZhbHVlIC0gKGhvdXJzICogNjAgKiA2MCkgLSAobWludXRlcyAqIDYwKSk7XG4gICAgICAgIHJldHVybiBob3VycyArICc6JyArICgobWludXRlcyA8IDEwKSA/ICcwJyArIG1pbnV0ZXMgOiBtaW51dGVzKSArICc6JyArICgoc2Vjb25kcyA8IDEwKSA/ICcwJyArIHNlY29uZHMgOiBzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmZvcm1hdFRpbWUgKHN0cmluZykge1xuICAgICAgICB2YXIgdGltZUFycmF5ID0gc3RyaW5nLnNwbGl0KCc6JyksXG4gICAgICAgICAgICBzZWNvbmRzID0gMDtcbiAgICAgICAgLy8gdHVybiBob3VycyBhbmQgbWludXRlcyBpbnRvIHNlY29uZHMgYW5kIGFkZCB0aGVtIGFsbCB1cFxuICAgICAgICBpZiAodGltZUFycmF5Lmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgLy8gaG91cnNcbiAgICAgICAgICAgIHNlY29uZHMgPSBzZWNvbmRzICsgKE51bWJlcih0aW1lQXJyYXlbMF0pICogNjAgKiA2MCk7XG4gICAgICAgICAgICAvLyBtaW51dGVzXG4gICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIChOdW1iZXIodGltZUFycmF5WzFdKSAqIDYwKTtcbiAgICAgICAgICAgIC8vIHNlY29uZHNcbiAgICAgICAgICAgIHNlY29uZHMgPSBzZWNvbmRzICsgTnVtYmVyKHRpbWVBcnJheVsyXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGltZUFycmF5Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgLy8gbWludXRlc1xuICAgICAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgKyAoTnVtYmVyKHRpbWVBcnJheVswXSkgKiA2MCk7XG4gICAgICAgICAgICAvLyBzZWNvbmRzXG4gICAgICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyArIE51bWJlcih0aW1lQXJyYXlbMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0TnVtYmVyICh2YWx1ZSwgZm9ybWF0LCByb3VuZGluZ0Z1bmN0aW9uKSB7XG4gICAgICAgIHZhciBuZWdQID0gZmFsc2UsXG4gICAgICAgICAgICBzaWduZWQgPSBmYWxzZSxcbiAgICAgICAgICAgIG9wdERlYyA9IGZhbHNlLFxuICAgICAgICAgICAgYWJiciA9ICcnLFxuICAgICAgICAgICAgYWJicksgPSBmYWxzZSwgLy8gZm9yY2UgYWJicmV2aWF0aW9uIHRvIHRob3VzYW5kc1xuICAgICAgICAgICAgYWJick0gPSBmYWxzZSwgLy8gZm9yY2UgYWJicmV2aWF0aW9uIHRvIG1pbGxpb25zXG4gICAgICAgICAgICBhYmJyQiA9IGZhbHNlLCAvLyBmb3JjZSBhYmJyZXZpYXRpb24gdG8gYmlsbGlvbnNcbiAgICAgICAgICAgIGFiYnJUID0gZmFsc2UsIC8vIGZvcmNlIGFiYnJldmlhdGlvbiB0byB0cmlsbGlvbnNcbiAgICAgICAgICAgIGFiYnJGb3JjZSA9IGZhbHNlLCAvLyBmb3JjZSBhYmJyZXZpYXRpb25cbiAgICAgICAgICAgIGJ5dGVzID0gJycsXG4gICAgICAgICAgICBvcmQgPSAnJyxcbiAgICAgICAgICAgIGFicyA9IE1hdGguYWJzKHZhbHVlKSxcbiAgICAgICAgICAgIHN1ZmZpeGVzID0gWydCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ10sXG4gICAgICAgICAgICBtaW4sXG4gICAgICAgICAgICBtYXgsXG4gICAgICAgICAgICBwb3dlcixcbiAgICAgICAgICAgIHcsXG4gICAgICAgICAgICBwcmVjaXNpb24sXG4gICAgICAgICAgICB0aG91c2FuZHMsXG4gICAgICAgICAgICBkID0gJycsXG4gICAgICAgICAgICBuZWcgPSBmYWxzZTtcblxuICAgICAgICAvLyBjaGVjayBpZiBudW1iZXIgaXMgemVybyBhbmQgYSBjdXN0b20gemVybyBmb3JtYXQgaGFzIGJlZW4gc2V0XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gMCAmJiB6ZXJvRm9ybWF0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gemVyb0Zvcm1hdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHNlZSBpZiB3ZSBzaG91bGQgdXNlIHBhcmVudGhlc2VzIGZvciBuZWdhdGl2ZSBudW1iZXIgb3IgaWYgd2Ugc2hvdWxkIHByZWZpeCB3aXRoIGEgc2lnblxuICAgICAgICAgICAgLy8gaWYgYm90aCBhcmUgcHJlc2VudCB3ZSBkZWZhdWx0IHRvIHBhcmVudGhlc2VzXG4gICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJygnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbmVnUCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0LmluZGV4T2YoJysnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvXFwrL2csICcnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2VlIGlmIGFiYnJldmlhdGlvbiBpcyB3YW50ZWRcbiAgICAgICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignYScpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBhYmJyZXZpYXRpb24gaXMgc3BlY2lmaWVkXG4gICAgICAgICAgICAgICAgYWJicksgPSBmb3JtYXQuaW5kZXhPZignYUsnKSA+PSAwO1xuICAgICAgICAgICAgICAgIGFiYnJNID0gZm9ybWF0LmluZGV4T2YoJ2FNJykgPj0gMDtcbiAgICAgICAgICAgICAgICBhYmJyQiA9IGZvcm1hdC5pbmRleE9mKCdhQicpID49IDA7XG4gICAgICAgICAgICAgICAgYWJiclQgPSBmb3JtYXQuaW5kZXhPZignYVQnKSA+PSAwO1xuICAgICAgICAgICAgICAgIGFiYnJGb3JjZSA9IGFiYnJLIHx8IGFiYnJNIHx8IGFiYnJCIHx8IGFiYnJUO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHNwYWNlIGJlZm9yZSBhYmJyZXZpYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJyBhJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBhYmJyID0gJyAnO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnIGEnLCAnJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ2EnLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGFicyA+PSBNYXRoLnBvdygxMCwgMTIpICYmICFhYmJyRm9yY2UgfHwgYWJiclQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJpbGxpb25cbiAgICAgICAgICAgICAgICAgICAgYWJiciA9IGFiYnIgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5hYmJyZXZpYXRpb25zLnRyaWxsaW9uO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC8gTWF0aC5wb3coMTAsIDEyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFicyA8IE1hdGgucG93KDEwLCAxMikgJiYgYWJzID49IE1hdGgucG93KDEwLCA5KSAmJiAhYWJickZvcmNlIHx8IGFiYnJCKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJpbGxpb25cbiAgICAgICAgICAgICAgICAgICAgYWJiciA9IGFiYnIgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5hYmJyZXZpYXRpb25zLmJpbGxpb247XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgLyBNYXRoLnBvdygxMCwgOSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhYnMgPCBNYXRoLnBvdygxMCwgOSkgJiYgYWJzID49IE1hdGgucG93KDEwLCA2KSAmJiAhYWJickZvcmNlIHx8IGFiYnJNKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1pbGxpb25cbiAgICAgICAgICAgICAgICAgICAgYWJiciA9IGFiYnIgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5hYmJyZXZpYXRpb25zLm1pbGxpb247XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgLyBNYXRoLnBvdygxMCwgNik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhYnMgPCBNYXRoLnBvdygxMCwgNikgJiYgYWJzID49IE1hdGgucG93KDEwLCAzKSAmJiAhYWJickZvcmNlIHx8IGFiYnJLKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRob3VzYW5kXG4gICAgICAgICAgICAgICAgICAgIGFiYnIgPSBhYmJyICsgbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uYWJicmV2aWF0aW9ucy50aG91c2FuZDtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSAvIE1hdGgucG93KDEwLCAzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlZSBpZiB3ZSBhcmUgZm9ybWF0dGluZyBieXRlc1xuICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdiJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZSBiZWZvcmVcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJyBiJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBieXRlcyA9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJyBiJywgJycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdiJywgJycpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAocG93ZXIgPSAwOyBwb3dlciA8PSBzdWZmaXhlcy5sZW5ndGg7IHBvd2VyKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbWluID0gTWF0aC5wb3coMTAyNCwgcG93ZXIpO1xuICAgICAgICAgICAgICAgICAgICBtYXggPSBNYXRoLnBvdygxMDI0LCBwb3dlcisxKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPj0gbWluICYmIHZhbHVlIDwgbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBieXRlcyA9IGJ5dGVzICsgc3VmZml4ZXNbcG93ZXJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC8gbWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlZSBpZiBvcmRpbmFsIGlzIHdhbnRlZFxuICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdvJykgPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzcGFjZSBiZWZvcmVcbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJyBvJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBvcmQgPSAnICc7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCcgbycsICcnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnbycsICcnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvcmQgPSBvcmQgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5vcmRpbmFsKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdbLl0nKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgb3B0RGVjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgnWy5dJywgJy4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdyA9IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICAgIHByZWNpc2lvbiA9IGZvcm1hdC5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgdGhvdXNhbmRzID0gZm9ybWF0LmluZGV4T2YoJywnKTtcblxuICAgICAgICAgICAgaWYgKHByZWNpc2lvbikge1xuICAgICAgICAgICAgICAgIGlmIChwcmVjaXNpb24uaW5kZXhPZignWycpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uLnJlcGxhY2UoJ10nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHByZWNpc2lvbiA9IHByZWNpc2lvbi5zcGxpdCgnWycpO1xuICAgICAgICAgICAgICAgICAgICBkID0gdG9GaXhlZCh2YWx1ZSwgKHByZWNpc2lvblswXS5sZW5ndGggKyBwcmVjaXNpb25bMV0ubGVuZ3RoKSwgcm91bmRpbmdGdW5jdGlvbiwgcHJlY2lzaW9uWzFdLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZCA9IHRvRml4ZWQodmFsdWUsIHByZWNpc2lvbi5sZW5ndGgsIHJvdW5kaW5nRnVuY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHcgPSBkLnNwbGl0KCcuJylbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoZC5zcGxpdCgnLicpWzFdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkID0gbGFuZ3VhZ2VzW2N1cnJlbnRMYW5ndWFnZV0uZGVsaW1pdGVycy5kZWNpbWFsICsgZC5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQgPSAnJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0RGVjICYmIE51bWJlcihkLnNsaWNlKDEpKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ID0gdG9GaXhlZCh2YWx1ZSwgbnVsbCwgcm91bmRpbmdGdW5jdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZvcm1hdCBudW1iZXJcbiAgICAgICAgICAgIGlmICh3LmluZGV4T2YoJy0nKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdyA9IHcuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgbmVnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRob3VzYW5kcyA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdyA9IHcudG9TdHJpbmcoKS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyg/IVxcZCkpL2csICckMScgKyBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXS5kZWxpbWl0ZXJzLnRob3VzYW5kcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb3JtYXQuaW5kZXhPZignLicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdyA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKChuZWdQICYmIG5lZykgPyAnKCcgOiAnJykgKyAoKCFuZWdQICYmIG5lZykgPyAnLScgOiAnJykgKyAoKCFuZWcgJiYgc2lnbmVkKSA/ICcrJyA6ICcnKSArIHcgKyBkICsgKChvcmQpID8gb3JkIDogJycpICsgKChhYmJyKSA/IGFiYnIgOiAnJykgKyAoKGJ5dGVzKSA/IGJ5dGVzIDogJycpICsgKChuZWdQICYmIG5lZykgPyAnKScgOiAnJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgIFRvcCBMZXZlbCBGdW5jdGlvbnNcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBudW1lcmFsID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIGlmIChudW1lcmFsLmlzTnVtZXJhbChpbnB1dCkpIHtcbiAgICAgICAgICAgIGlucHV0ID0gaW5wdXQudmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dCA9PT0gMCB8fCB0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpbnB1dCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoIU51bWJlcihpbnB1dCkpIHtcbiAgICAgICAgICAgIGlucHV0ID0gbnVtZXJhbC5mbi51bmZvcm1hdChpbnB1dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IE51bWVyYWwoTnVtYmVyKGlucHV0KSk7XG4gICAgfTtcblxuICAgIC8vIHZlcnNpb24gbnVtYmVyXG4gICAgbnVtZXJhbC52ZXJzaW9uID0gVkVSU0lPTjtcblxuICAgIC8vIGNvbXBhcmUgbnVtZXJhbCBvYmplY3RcbiAgICBudW1lcmFsLmlzTnVtZXJhbCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIE51bWVyYWw7XG4gICAgfTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxhbmd1YWdlcyBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsYW5ndWFnZS4gIElmXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcbiAgICAvLyBsYW5ndWFnZSBrZXkuXG4gICAgbnVtZXJhbC5sYW5ndWFnZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlcykge1xuICAgICAgICBpZiAoIWtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRMYW5ndWFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXkgJiYgIXZhbHVlcykge1xuICAgICAgICAgICAgaWYoIWxhbmd1YWdlc1trZXldKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGxhbmd1YWdlIDogJyArIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50TGFuZ3VhZ2UgPSBrZXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWVzIHx8ICFsYW5ndWFnZXNba2V5XSkge1xuICAgICAgICAgICAgbG9hZExhbmd1YWdlKGtleSwgdmFsdWVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudW1lcmFsO1xuICAgIH07XG4gICAgXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBwcm92aWRlcyBhY2Nlc3MgdG8gdGhlIGxvYWRlZCBsYW5ndWFnZSBkYXRhLiAgSWZcbiAgICAvLyBubyBhcmd1bWVudHMgYXJlIHBhc3NlZCBpbiwgaXQgd2lsbCBzaW1wbHkgcmV0dXJuIHRoZSBjdXJyZW50XG4gICAgLy8gZ2xvYmFsIGxhbmd1YWdlIG9iamVjdC5cbiAgICBudW1lcmFsLmxhbmd1YWdlRGF0YSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZXNbY3VycmVudExhbmd1YWdlXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCFsYW5ndWFnZXNba2V5XSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGxhbmd1YWdlIDogJyArIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBsYW5ndWFnZXNba2V5XTtcbiAgICB9O1xuXG4gICAgbnVtZXJhbC5sYW5ndWFnZSgnZW4nLCB7XG4gICAgICAgIGRlbGltaXRlcnM6IHtcbiAgICAgICAgICAgIHRob3VzYW5kczogJywnLFxuICAgICAgICAgICAgZGVjaW1hbDogJy4nXG4gICAgICAgIH0sXG4gICAgICAgIGFiYnJldmlhdGlvbnM6IHtcbiAgICAgICAgICAgIHRob3VzYW5kOiAnaycsXG4gICAgICAgICAgICBtaWxsaW9uOiAnbScsXG4gICAgICAgICAgICBiaWxsaW9uOiAnYicsXG4gICAgICAgICAgICB0cmlsbGlvbjogJ3QnXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGluYWw6IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBiID0gbnVtYmVyICUgMTA7XG4gICAgICAgICAgICByZXR1cm4gKH5+IChudW1iZXIgJSAxMDAgLyAxMCkgPT09IDEpID8gJ3RoJyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDEpID8gJ3N0JyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDIpID8gJ25kJyA6XG4gICAgICAgICAgICAgICAgKGIgPT09IDMpID8gJ3JkJyA6ICd0aCc7XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbmN5OiB7XG4gICAgICAgICAgICBzeW1ib2w6ICckJ1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBudW1lcmFsLnplcm9Gb3JtYXQgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIHplcm9Gb3JtYXQgPSB0eXBlb2YoZm9ybWF0KSA9PT0gJ3N0cmluZycgPyBmb3JtYXQgOiBudWxsO1xuICAgIH07XG5cbiAgICBudW1lcmFsLmRlZmF1bHRGb3JtYXQgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgICAgIGRlZmF1bHRGb3JtYXQgPSB0eXBlb2YoZm9ybWF0KSA9PT0gJ3N0cmluZycgPyBmb3JtYXQgOiAnMC4wJztcbiAgICB9O1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBIZWxwZXJzXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZnVuY3Rpb24gbG9hZExhbmd1YWdlKGtleSwgdmFsdWVzKSB7XG4gICAgICAgIGxhbmd1YWdlc1trZXldID0gdmFsdWVzO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgRmxvYXRpbmctcG9pbnQgaGVscGVyc1xuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8vIFRoZSBmbG9hdGluZy1wb2ludCBoZWxwZXIgZnVuY3Rpb25zIGFuZCBpbXBsZW1lbnRhdGlvblxuICAgIC8vIGJvcnJvd3MgaGVhdmlseSBmcm9tIHNpbmZ1bC5qczogaHR0cDovL2d1aXBuLmdpdGh1Yi5pby9zaW5mdWwuanMvXG5cbiAgICAvKipcbiAgICAgKiBBcnJheS5wcm90b3R5cGUucmVkdWNlIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgaXRcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9SZWR1Y2UjQ29tcGF0aWJpbGl0eVxuICAgICAqL1xuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLnJlZHVjZSkge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBvcHRfaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChudWxsID09PSB0aGlzIHx8ICd1bmRlZmluZWQnID09PSB0eXBlb2YgdGhpcykge1xuICAgICAgICAgICAgICAgIC8vIEF0IHRoZSBtb21lbnQgYWxsIG1vZGVybiBicm93c2VycywgdGhhdCBzdXBwb3J0IHN0cmljdCBtb2RlLCBoYXZlXG4gICAgICAgICAgICAgICAgLy8gbmF0aXZlIGltcGxlbWVudGF0aW9uIG9mIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuIEZvciBpbnN0YW5jZSwgSUU4XG4gICAgICAgICAgICAgICAgLy8gZG9lcyBub3Qgc3VwcG9ydCBzdHJpY3QgbW9kZSwgc28gdGhpcyBjaGVjayBpcyBhY3R1YWxseSB1c2VsZXNzLlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5yZWR1Y2UgY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGNhbGxiYWNrICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaW5kZXgsXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5sZW5ndGggPj4+IDAsXG4gICAgICAgICAgICAgICAgaXNWYWx1ZVNldCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoMSA8IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG9wdF9pbml0aWFsVmFsdWU7XG4gICAgICAgICAgICAgICAgaXNWYWx1ZVNldCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaW5kZXggPSAwOyBsZW5ndGggPiBpbmRleDsgKytpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNWYWx1ZVNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSwgdGhpc1tpbmRleF0sIGluZGV4LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbHVlU2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc1ZhbHVlU2V0KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgXG4gICAgLyoqXG4gICAgICogQ29tcHV0ZXMgdGhlIG11bHRpcGxpZXIgbmVjZXNzYXJ5IHRvIG1ha2UgeCA+PSAxLFxuICAgICAqIGVmZmVjdGl2ZWx5IGVsaW1pbmF0aW5nIG1pc2NhbGN1bGF0aW9ucyBjYXVzZWQgYnlcbiAgICAgKiBmaW5pdGUgcHJlY2lzaW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG11bHRpcGxpZXIoeCkge1xuICAgICAgICB2YXIgcGFydHMgPSB4LnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLnBvdygxMCwgcGFydHNbMV0ubGVuZ3RoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIHZhcmlhYmxlIG51bWJlciBvZiBhcmd1bWVudHMsIHJldHVybnMgdGhlIG1heGltdW1cbiAgICAgKiBtdWx0aXBsaWVyIHRoYXQgbXVzdCBiZSB1c2VkIHRvIG5vcm1hbGl6ZSBhbiBvcGVyYXRpb24gaW52b2x2aW5nXG4gICAgICogYWxsIG9mIHRoZW0uXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29ycmVjdGlvbkZhY3RvcigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gYXJncy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgIHZhciBtcCA9IG11bHRpcGxpZXIocHJldiksXG4gICAgICAgICAgICAgICAgbW4gPSBtdWx0aXBsaWVyKG5leHQpO1xuICAgICAgICByZXR1cm4gbXAgPiBtbiA/IG1wIDogbW47XG4gICAgICAgIH0sIC1JbmZpbml0eSk7XG4gICAgfSAgICAgICAgXG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgTnVtZXJhbCBQcm90b3R5cGVcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuICAgIG51bWVyYWwuZm4gPSBOdW1lcmFsLnByb3RvdHlwZSA9IHtcblxuICAgICAgICBjbG9uZSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1lcmFsKHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGZvcm1hdCA6IGZ1bmN0aW9uIChpbnB1dFN0cmluZywgcm91bmRpbmdGdW5jdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE51bWVyYWwodGhpcywgXG4gICAgICAgICAgICAgICAgICBpbnB1dFN0cmluZyA/IGlucHV0U3RyaW5nIDogZGVmYXVsdEZvcm1hdCwgXG4gICAgICAgICAgICAgICAgICAocm91bmRpbmdGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKSA/IHJvdW5kaW5nRnVuY3Rpb24gOiBNYXRoLnJvdW5kXG4gICAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5mb3JtYXQgOiBmdW5jdGlvbiAoaW5wdXRTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXRTdHJpbmcpID09PSAnW29iamVjdCBOdW1iZXJdJykgeyBcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXRTdHJpbmc7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZm9ybWF0TnVtZXJhbCh0aGlzLCBpbnB1dFN0cmluZyA/IGlucHV0U3RyaW5nIDogZGVmYXVsdEZvcm1hdCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsdWUgOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsdWVPZiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXQgOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZCA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGNvcnJGYWN0b3IgPSBjb3JyZWN0aW9uRmFjdG9yLmNhbGwobnVsbCwgdGhpcy5fdmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNiYWNrKGFjY3VtLCBjdXJyLCBjdXJySSwgTykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bSArIGNvcnJGYWN0b3IgKiBjdXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbdGhpcy5fdmFsdWUsIHZhbHVlXS5yZWR1Y2UoY2JhY2ssIDApIC8gY29yckZhY3RvcjtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN1YnRyYWN0IDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgY29yckZhY3RvciA9IGNvcnJlY3Rpb25GYWN0b3IuY2FsbChudWxsLCB0aGlzLl92YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgZnVuY3Rpb24gY2JhY2soYWNjdW0sIGN1cnIsIGN1cnJJLCBPKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VtIC0gY29yckZhY3RvciAqIGN1cnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IFt2YWx1ZV0ucmVkdWNlKGNiYWNrLCB0aGlzLl92YWx1ZSAqIGNvcnJGYWN0b3IpIC8gY29yckZhY3RvcjsgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIG11bHRpcGx5IDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYmFjayhhY2N1bSwgY3VyciwgY3VyckksIE8pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29yckZhY3RvciA9IGNvcnJlY3Rpb25GYWN0b3IoYWNjdW0sIGN1cnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoYWNjdW0gKiBjb3JyRmFjdG9yKSAqIChjdXJyICogY29yckZhY3RvcikgL1xuICAgICAgICAgICAgICAgICAgICAoY29yckZhY3RvciAqIGNvcnJGYWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbdGhpcy5fdmFsdWUsIHZhbHVlXS5yZWR1Y2UoY2JhY2ssIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGl2aWRlIDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYmFjayhhY2N1bSwgY3VyciwgY3VyckksIE8pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29yckZhY3RvciA9IGNvcnJlY3Rpb25GYWN0b3IoYWNjdW0sIGN1cnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoYWNjdW0gKiBjb3JyRmFjdG9yKSAvIChjdXJyICogY29yckZhY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IFt0aGlzLl92YWx1ZSwgdmFsdWVdLnJlZHVjZShjYmFjayk7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICBkaWZmZXJlbmNlIDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMobnVtZXJhbCh0aGlzLl92YWx1ZSkuc3VidHJhY3QodmFsdWUpLnZhbHVlKCkpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICBFeHBvc2luZyBOdW1lcmFsXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgLy8gQ29tbW9uSlMgbW9kdWxlIGlzIGRlZmluZWRcbiAgICBpZiAoaGFzTW9kdWxlKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gbnVtZXJhbDtcbiAgICB9XG5cbiAgICAvKmdsb2JhbCBlbmRlcjpmYWxzZSAqL1xuICAgIGlmICh0eXBlb2YgZW5kZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGhlcmUsIGB0aGlzYCBtZWFucyBgd2luZG93YCBpbiB0aGUgYnJvd3Nlciwgb3IgYGdsb2JhbGAgb24gdGhlIHNlcnZlclxuICAgICAgICAvLyBhZGQgYG51bWVyYWxgIGFzIGEgZ2xvYmFsIG9iamVjdCB2aWEgYSBzdHJpbmcgaWRlbnRpZmllcixcbiAgICAgICAgLy8gZm9yIENsb3N1cmUgQ29tcGlsZXIgJ2FkdmFuY2VkJyBtb2RlXG4gICAgICAgIHRoaXNbJ251bWVyYWwnXSA9IG51bWVyYWw7XG4gICAgfVxuXG4gICAgLypnbG9iYWwgZGVmaW5lOmZhbHNlICovXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1lcmFsO1xuICAgICAgICB9KTtcbiAgICB9XG59KS5jYWxsKHRoaXMpO1xuIiwiXHJcbmV4cG9ydHMuQUNUSU9OX1RZUEVTID0ge1xyXG4gIE5VTUJFUjogJ05VTUJFUicsXHJcbiAgU0hPUlRDVVQ6ICdTSE9SVENVVCcsXHJcbiAgREVDSU1BTDogJ0RFQ0lNQUwnLFxyXG4gIERFTElNSVRFUjogJ0RFTElNSVRFUicsXHJcbiAgTUlOVVM6ICdNSU5VUycsXHJcbiAgVU5LTk9XTjogJ1VOS05PV04nLFxyXG4gIEhPUklaT05UQUxfQVJST1c6ICdIT1JJWk9OVEFMX0FSUk9XJyxcclxuICBWRVJUSUNBTF9BUlJPVzogJ1ZFUlRJQ0FMX0FSUk9XJyxcclxuICBCQUNLU1BBQ0U6ICdCQUNLU1BBQ0UnLFxyXG4gIERFTEVURTogJ0RFTEVURScsXHJcbiAgVU5ETzogJ1VORE8nLFxyXG4gIFJFRE86ICdSRURPJyxcclxuICBIT01FOiAnSE9NRScsXHJcbiAgRU5EOiAnRU5EJ1xyXG59XHJcblxyXG5leHBvcnRzLkRSQUdfU1RBVEVTID0ge1xyXG4gIE5PTkU6ICdOT05FJyxcclxuICBJTlRFUk5BTDogJ0lOVEVSTkFMJyxcclxuICBFWFRFUk5BTDogJ0VYVEVSTkFMJ1xyXG59XHJcblxyXG5leHBvcnRzLkRFTElNSVRFUl9TVFJBVEVHSUVTID0ge1xyXG4gIFNLSVA6ICdTS0lQJyxcclxuICBERUxFVEVfTlVNQkVSOiAnREVMRVRFX05VTUJFUidcclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgQWxpIFNoZWVoYW4tRGFyZSwgYWxsIHJpZ2h0cyBhbmQgcHJvZml0cyByZXNlcnZlZC5cclxuXHJcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnO1xyXG5pbXBvcnQga2V5Y29kZSBmcm9tICdrZXljb2RlJztcclxuaW1wb3J0IGtleUhhbmRsZXJzIGZyb20gJy4va2V5SGFuZGxlcnMnO1xyXG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2hlbHBlcnMnO1xyXG5pbXBvcnQgVmFsdWVIaXN0b3J5IGZyb20gJy4vdmFsdWVIaXN0b3J5JztcclxuaW1wb3J0IHtBQ1RJT05fVFlQRVMsIERSQUdfU1RBVEVTLCBERUxJTUlURVJfU1RSQVRFR0lFU30gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDT05TVEFOVFNcclxuICovXHJcbmNvbnN0IGxhbmd1YWdlRGF0YSA9IHtcclxuICBlbjoge1xyXG4gICAgc2hvcnRjdXRzOiB7XHJcbiAgICAgICdrJzogMyxcclxuICAgICAgJ20nOiA2LFxyXG4gICAgICAnYic6IDlcclxuICAgIH0sXHJcbiAgICBkZWxpbWl0ZXI6ICcsJyxcclxuICAgIGRlY2ltYWw6ICcuJ1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgREVGQVVMVFMgPSB7XHJcbiAgZm9ybWF0OiAnMCwwLjAwJyxcclxuICBsYW5nOiAnZW4nLFxyXG4gIG1heFZhbHVlOiAxMGUrMTIsXHJcbiAgbWluVmFsdWU6IC0xMGUrMTIsXHJcbiAgbWF4TGVuZ3RoOiAxNSxcclxuICB2YWx1ZVN0ZXA6IDEsXHJcbiAgZHJvcHBhYmxlQ2xhc3M6ICdmaW5wdXQtZHJvcHBhYmxlJyxcclxuICBkZWxpbWl0ZXJEZWxldGVTdHJhdGVneTogREVMSU1JVEVSX1NUUkFURUdJRVMuU0tJUFxyXG59XHJcblxyXG4vKipcclxuICogRklOUFVUIENPTVBPTkVOVCBDTEFTU1xyXG4gKiBAY2xhc3NcclxuICovXHJcbmNsYXNzIEZpbnB1dCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtET00gRWxlbWVudH0gVGhlIG51bWJlciBpbnB1dFxyXG4gICAqIEBwYXJhbSB7T3B0aW9uc30gT3B0aW9ucyBmb3IgdGhlIG51bWJlciBpbnB1dCdzIGJlaGF2aW91clxyXG4gICAqXHJcbiAgICogRGV0YWlsZWQgbGlzdCBvZiBwb3NzaWJsZSBvcHRpb25zOlxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5mb3JtYXR9IFRoZSBmb3JtYXQgb2YgdGhlIG51bWJlciB0byBiZSBkaXNwbGF5ZWQgYnkgdGhlIGlucHV0XHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmN1cnJlbmN5fSBPcHRpb25hbCBjdXJyZW5jeSB0byBwcmVwZW5kIHRvIHZhbHVlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmxhbmd9IExhbmd1YWdlICh1c2VkIGluIGxldHRlciBhYmJyZXZpYXRpb25zIGV0Yy4uLilcclxuICAgKiBAcGFyYW0ge09wdGlvbnMubWF4VmFsdWV9IExpbWl0IGlucHV0IHZhbHVlIHRvIGEgbWF4aW11bSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7T3B0aW9ucy5taW5WYWx1ZX0gTGltaXQgaW5wdXQgdmFsdWUgdG8gYSBtaW5pbXVtIHZhbHVlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLm1heERpZ2l0c30gTGltaXQgaW5wdXQgdmFsdWUgdG8gYSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMudmFsdWVTdGVwIE9SIGZhbHNlfSBDaGFuZ2UgaG93IG11Y2ggdGhlIHZhbHVlIGNoYW5nZXMgd2hlbiBwcmVzc2luZyB1cC9kb3duIGFycm93IGtleXNcclxuICAgKiBAcGFyYW0ge09wdGlvbnMuZHJvcHBhYmxlQ2xhc3N9IENsYXNzIHRvIGdpdmUgdG8gdGhlIGlucHV0IHdoZW4gdGV4dCBkcmFnIGV2ZW50IGhhcyBzdGFydGVkIG9uIHRoZSBwYWdlXHJcbiAgICogQHBhcmFtIHtPcHRpb25zLmRlbGltaXRlckRlbGV0ZVN0cmF0ZWd5fSBCZWhhdmlvdXIgdG8gYXBwbHkgd2hlbiBkZWxldGluZyBvciBiYWNrc3BhY2luZyBhIGRlbGltaXRlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVFMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5fbGFuZ3VhZ2VEYXRhID0gbGFuZ3VhZ2VEYXRhW3RoaXMub3B0aW9ucy5sYW5nXTtcclxuICAgIHRoaXMuX2FjdGlvblR5cGVzID0gdGhpcy5jcmVhdGVBY3Rpb25UeXBlcygpO1xyXG4gICAgdGhpcy5faGlzdG9yeSA9IG5ldyBWYWx1ZUhpc3RvcnkoKTtcclxuXHJcbiAgICBudW1lcmFsLmRlZmF1bHRGb3JtYXQodGhpcy5vcHRpb25zLmZvcm1hdCk7XHJcblxyXG4gICAgLy8gU2V0dXAgbGlzdGVuZXJzXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKSA9PiB0aGlzLm9uRm9jdXNvdXQoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKGUpID0+IHRoaXMub25Gb2N1c2luKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHRoaXMub25Ecm9wKGUpKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIChlKSA9PiB0aGlzLm9uUGFzdGUoZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4gdGhpcy5vbktleWRvd24oZSkpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHRoaXMub25LZXlwcmVzcyhlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4gdGhpcy5vbklucHV0KGUpKTtcclxuXHJcbiAgICAvLyBEcmFnZ2luZyBsaXN0ZW5lcnNcclxuICAgIC8vIEtlZXAgdHJhY2sgb2Ygd2hldGhlciBhIGRyYWcgc3RhcnRlZCBpbnRlcm5hbGx5IG9yIGV4dGVybmFsbHlcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChlKSA9PiB0aGlzLm9uRHJhZ3N0YXJ0KGUpKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4gdGhpcy5vbkRyYWdlbmQoZSkpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCAoZSkgPT4gdGhpcy5vbkRyYWdlbnRlcihlKSk7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgKGUpID0+IHRoaXMub25EcmFnbGVhdmUoZSkpO1xyXG4gIH1cclxuXHJcbiAgLy8gR0VUVEVSU1xyXG4gIGdldCBlbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgfVxyXG4gIGdldCBvcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XHJcbiAgfVxyXG4gIGdldCB2YWx1ZSgpIHtcclxuICAgIHJldHVybiBudW1lcmFsKCkudW5mb3JtYXQodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcbiAgZ2V0IGZvcm1hdHRlZFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIG51bWVyYWwoKS51bmZvcm1hdCh0aGlzLmVsZW1lbnQudmFsdWUpO1xyXG4gIH1cclxuICBnZXQgbGFuZ3VhZ2VEYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlRGF0YTtcclxuICB9XHJcbiAgZ2V0IGFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGlvblR5cGVzO1xyXG4gIH1cclxuICBnZXQgZHJhZ1N0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RyYWdTdGF0ZTtcclxuICB9XHJcbiAgZ2V0IGhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeTtcclxuICB9XHJcblxyXG5cclxuICAvLyBTRVRURVJTXHJcbiAgc2V0IGRyYWdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5fZHJhZ1N0YXRlID0gc3RhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIHRoZSBjb3JyZWN0IGFjdGlvbiB0eXBlIHRvIGNoYXIva2V5IGNvZGVzIGFycmF5IHdpdGggdGhlXHJcbiAgICogY29ycmVjdCBkZWNpbWFsIGFuZCBkZWxpbWl0ZXIgY2hhcmFjdGVycyAoZGVwZW5kaW5nIG9uIGxhbmd1YWdlKVxyXG4gICAqL1xyXG4gIGNyZWF0ZUFjdGlvblR5cGVzKCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5OVU1CRVIsXHJcbiAgICAgICAgbmFtZXM6IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuTUlOVVMsXHJcbiAgICAgICAgbmFtZXM6IFsnLSddXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuSE9NRSxcclxuICAgICAgICBuYW1lczogWydob21lJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5FTkQsXHJcbiAgICAgICAgbmFtZXM6IFsnZW5kJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUNJTUFMLFxyXG4gICAgICAgIG5hbWVzOiBbdGhpcy5sYW5ndWFnZURhdGEuZGVjaW1hbF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxJTUlURVIsXHJcbiAgICAgICAgbmFtZXM6IFt0aGlzLmxhbmd1YWdlRGF0YS5kZWxpbWl0ZXJdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBBQ1RJT05fVFlQRVMuU0hPUlRDVVQsXHJcbiAgICAgICAgbmFtZXM6IE9iamVjdC5rZXlzKHRoaXMubGFuZ3VhZ2VEYXRhLnNob3J0Y3V0cylcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5CQUNLU1BBQ0UsXHJcbiAgICAgICAgbmFtZXM6IFsnYmFja3NwYWNlJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5ERUxFVEUsXHJcbiAgICAgICAgbmFtZXM6IFsnZGVsZXRlJ11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5IT1JJWk9OVEFMX0FSUk9XLFxyXG4gICAgICAgIG5hbWVzOiBbJ2xlZnQnLCAncmlnaHQnXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XLFxyXG4gICAgICAgIG5hbWVzOiBbJ3VwJywgJ2Rvd24nXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogQUNUSU9OX1RZUEVTLlVORE8sXHJcbiAgICAgICAgbmFtZXM6IFsneiddLFxyXG4gICAgICAgIGN0cmw6IHRydWVcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6IEFDVElPTl9UWVBFUy5SRURPLFxyXG4gICAgICAgIG5hbWVzOiBbJ3knXSxcclxuICAgICAgICBjdHJsOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogRGV0ZXJtaW5lcyB3aGF0IHR5cGUgb2YgYWN0aW9uIG5lZWRzIHRvIGJlIGRlYWx0IHdpdGggZnJvbSB0aGUgY3VycmVudFxyXG4gICAqIGtleWRvd24gZXZlbnQuIEUuZy4gdmVydGljYWwgYXJyb3cgcHJlc3NlZCwgbnVtYmVyIHByZXNzZWQgZXRjLi4uXHJcbiAgICogQHBhcmFtIHtlfSBLZXlib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIGdldEFjdGlvblR5cGUobmFtZSwgZSkge1xyXG4gICAgZm9yIChsZXQgYWN0aW9uVHlwZSBvZiB0aGlzLmFjdGlvblR5cGVzKSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gYWN0aW9uVHlwZS5uYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBjb25zdCB0eXBlTWF0Y2ggPSBpbmRleCA+IC0xO1xyXG5cclxuICAgICAgaWYgKHR5cGVNYXRjaCAmJiAoYWN0aW9uVHlwZS5jdHJsID8gZS5jdHJsS2V5IDogdHJ1ZSkpIHtcclxuICAgICAgICByZXR1cm4gYWN0aW9uVHlwZS50eXBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQUNUSU9OX1RZUEVTLlVOS05PV047XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB2YWx1ZSBpcyBub3QgdG9vIGxhcmdlIG9yIHNtYWxsXHJcbiAgICogQHBhcmFtIHt2YWx9IFZhbHVlIHRvIGNoZWNrXHJcbiAgICovXHJcbiAgY2hlY2tWYWx1ZU1hZ25pdHVkZSh2YWwpIHtcclxuICAgIGNvbnN0IG51bSA9IG51bWVyYWwoKS51bmZvcm1hdCh2YWwpO1xyXG4gICAgcmV0dXJuIG51bVxyXG4gICAgICA/IChudW0gPD0gdGhpcy5vcHRpb25zLm1heFZhbHVlICYmIG51bSA+PSB0aGlzLm9wdGlvbnMubWluVmFsdWUpXHJcbiAgICAgIDogdHJ1ZTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgdmFsdWUgaXMgbm90IHRvbyBtYW55IGNoYXJhY3RlcnMgbG9uZ1xyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBjaGVja1xyXG4gICAqL1xyXG4gIGNoZWNrVmFsdWVMZW5ndGgodmFsKSB7XHJcbiAgICBjb25zdCBudW0gPSBudW1lcmFsKCkudW5mb3JtYXQodmFsKTtcclxuICAgIHJldHVybiBudW1cclxuICAgICAgPyBudW0udG9TdHJpbmcoKS5sZW5ndGggPD0gdGhpcy5vcHRpb25zLm1heExlbmd0aFxyXG4gICAgICA6IHRydWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIENvbWJpbmVzIHRoZSBhYm92ZSBmdW5jdGlvbnMgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIGdpdmVuIHZhbHVlIGlzIG5vdCB0b29cclxuICAgKiBsYXJnZSBvciB0byBtYW55IGNoYXJhY3RlcnNcclxuICAgKiBAcGFyYW0ge3ZhbH0gVmFsdWUgdG8gY2hlY2tcclxuICAgKi9cclxuICBjaGVja1ZhbHVlU2l6aW5nKHZhbCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hlY2tWYWx1ZUxlbmd0aCh2YWwpICYmIHRoaXMuY2hlY2tWYWx1ZU1hZ25pdHVkZSh2YWwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdmFsdWUsIGZ1bGx5IGZvcm1hdHRlZCwgZm9yIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7dmFsfSBOZXcgdmFsdWUgdG8gc2V0XHJcbiAgICovXHJcbiAgc2V0VmFsdWUodmFsKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMuZnVsbEZvcm1hdCh2YWwsIHRoaXMub3B0aW9ucy5mb3JtYXQsIHRoaXMub3B0aW9ucy5jdXJyZW5jeSk7XHJcbiAgICBjb25zdCBpc1ZhbHVlVmFsaWQgPSB0aGlzLmNoZWNrVmFsdWVTaXppbmcobmV3VmFsdWUpO1xyXG4gICAgY29uc3QgdmFsdWVDYW5DaGFuZ2UgPSAobmV3VmFsdWUgJiYgaXNWYWx1ZVZhbGlkKTtcclxuXHJcbiAgICBpZiAodmFsdWVDYW5DaGFuZ2UpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgIHRoaXMuaGlzdG9yeS5hZGRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlQ2FuQ2hhbmdlO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vXHJcbiAgLy8gRVZFTlQgSEFORExFUlNcclxuICAvL1xyXG5cclxuICAvKipcclxuICAgKiBPbiBmb2N1c2luZyBPVVQgb2YgdGhlIGlucHV0IC0gZm9ybWF0IGZ1bGx5XHJcbiAgICogQHBhcmFtIHtlfSBGb2N1cyBldmVudFxyXG4gICAqL1xyXG4gIG9uRm9jdXNvdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgT1VUIGV2ZW50JywgZSk7XHJcbiAgICBjb25zdCB2YWx1ZUNoYW5nZWQgPSB0aGlzLnNldFZhbHVlKHRoaXMuZWxlbWVudC52YWx1ZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGZvY3VzIG9mIHRoZSBpbnB1dCAtIFNlbGVjdCBhbGwgdGV4dFxyXG4gICAqIEBwYXJhbSB7ZX0gRm9jdXMgZXZlbnRcclxuICAgKi9cclxuICBvbkZvY3VzaW4oZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnRm9jdXMgSU4gZXZlbnQnLCBlKTtcclxuICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XHJcbiAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uRW5kID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gZHJvcHBpbmcgc29tZXRoaW5nIGludG8gdGhlIGlucHV0IC0gcmVwbGFjZSB0aGUgV0hPTEUgdmFsdWVcclxuICAgKiB3aXRoIHRoaXMgbmV3IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25Ecm9wKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0Ryb3AgZXZlbnQnLCBlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZHJhZ1N0YXRlKSB7XHJcbiAgICAgIGNhc2UgRFJBR19TVEFURVMuSU5URVJOQUw6XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIGhhbmRsZWQgYnkgdGhlICdvbklucHV0JyBmdW5jdGlvblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERSQUdfU1RBVEVTLkVYVEVSTkFMOlxyXG4gICAgICAgIGNvbnN0IHZhbHVlQ2hhbmdlZCA9IHRoaXMuc2V0VmFsdWUoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG8gbm90aGluZztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIHN0YXJ0IG9mIEFOWSBkcmFnIG9uIHBhZ2VcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdzdGFydChlKSB7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IChlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50KVxyXG4gICAgICA/IERSQUdfU1RBVEVTLklOVEVSTkFMXHJcbiAgICAgIDogRFJBR19TVEFURVMuRVhURVJOQUw7XHJcbiAgICBpZiAodGhpcy5kcmFnU3RhdGUgPT09IERSQUdfU1RBVEVTLkVYVEVSTkFMKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5kcm9wcGFibGVDbGFzcyk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIFNUQVJURUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIGVuZCBvZiBBTlkgZHJhZyBvbiBwYWdlXHJcbiAgICogQHBhcmFtIHtlfSBEcmFnIGV2ZW50XHJcbiAgICovXHJcbiAgb25EcmFnZW5kKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5ERUQnLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgICB0aGlzLmRyYWdTdGF0ZSA9IERSQUdfU1RBVEVTLk5PTkU7XHJcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMuZHJvcHBhYmxlQ2xhc3MpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiB0aGUgZHJhZ2dlZCBpdGVtIGVudGVyaW5nIHRoZSBpbnB1dFxyXG4gICAqIEBwYXJhbSB7ZX0gRHJhZyBldmVudFxyXG4gICAqL1xyXG4gIG9uRHJhZ2VudGVyKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ0RyYWcgRU5URVInLCB0aGlzLmRyYWdTdGF0ZSwgZSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIE9uIHRoZSBkcmFnZ2VkIGl0ZW0gbGVhdmluZyB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IERyYWcgZXZlbnRcclxuICAgKi9cclxuICBvbkRyYWdsZWF2ZShlKSB7XHJcbiAgICBjb25zb2xlLmRlYnVnKCdEcmFnIExFQVZFJywgdGhpcy5kcmFnU3RhdGUsIGUpO1xyXG5cclxuICAgIGlmICh0aGlzLmRyYWdTdGF0ZSA9PT0gRFJBR19TVEFURVMuRVhURVJOQUwpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5lbGVtZW50LnZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogT24gcGFzdGluZyBzb21ldGhpbmcgaW50byB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IENsaXBib2FyZCBldmVudFxyXG4gICAqL1xyXG4gIG9uUGFzdGUoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZygnUGFzdGUgZXZlbnQnLCBlKTtcclxuICAgIGNvbnN0IGNoYXJzID0gZS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTtcclxuICAgIGNvbnN0IHBvdGVudGlhbFZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIGNoYXJzLFxyXG4gICAgICB0aGlzLmVsZW1lbnQuc2VsZWN0aW9uU3RhcnQsXHJcbiAgICAgIHRoaXMuZWxlbWVudC5zZWxlY3Rpb25FbmRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdmFsdWVDaGFuZ2VkID0gdGhpcy5zZXRWYWx1ZShwb3RlbnRpYWxWYWx1ZSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG4gIG9uS2V5cHJlc3MoZSkge1xyXG4gICBjb25zb2xlLmRlYnVnKCdrZXlwcmVzcycsIGUpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBPbiBwcmVzc2luZyBhbnkga2V5IGluc2lkZSB0aGUgaW5wdXRcclxuICAgKiBAcGFyYW0ge2V9IEtleWJvYXJkIGV2ZW50XHJcbiAgICovXHJcbiAgb25LZXlkb3duKGUpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoJ2tleWRvd24nLCBlKTtcclxuXHJcbiAgICBjb25zdCBrZXlJbmZvID0ge1xyXG4gICAgICBldmVudDogZSxcclxuICAgICAgY29kZTogZS53aGljaCB8fCBlLmtleUNvZGUsXHJcbiAgICAgIGtleU5hbWU6IGtleWNvZGUoZSkucmVwbGFjZSgnbnVtcGFkICcsICcnKSxcclxuICAgICAgY2FyZXRTdGFydDogdGhpcy5lbGVtZW50LnNlbGVjdGlvblN0YXJ0LFxyXG4gICAgICBjYXJldEVuZDogdGhpcy5lbGVtZW50LnNlbGVjdGlvbkVuZCxcclxuICAgICAgY3VycmVudFZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWUsXHJcbiAgICAgIG5ld1ZhbHVlOiB0aGlzLmVsZW1lbnQudmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3Rpb25UeXBlID0gdGhpcy5nZXRBY3Rpb25UeXBlKGtleUluZm8ua2V5TmFtZSwgZSk7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb25UeXBlKSB7XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLk5VTUJFUjpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk51bWJlcihrZXlJbmZvKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVDSU1BTDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbkRlY2ltYWwoa2V5SW5mbywgdGhpcy5sYW5ndWFnZURhdGEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5NSU5VUzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vbk1pbnVzKGtleUluZm8pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5TSE9SVENVVDpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblNob3J0Y3V0KGtleUluZm8sIHRoaXMubGFuZ3VhZ2VEYXRhKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9SSVpPTlRBTF9BUlJPVzpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuSE9NRTpcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuRU5EOlxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoYWN0aW9uVHlwZSk7XHJcbiAgICAgICAgLy8gRGVmYXVsdCBiZWhhdmlvdXJcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGNhc2UgQUNUSU9OX1RZUEVTLlZFUlRJQ0FMX0FSUk9XOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uVmVydGljYWxBcnJvdyhrZXlJbmZvLCB0aGlzLm9wdGlvbnMudmFsdWVTdGVwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuQkFDS1NQQUNFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uQmFja3NwYWNlKGtleUluZm8sIHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJEZWxldGVTdHJhdGVneSwgdGhpcy5sYW5ndWFnZURhdGEuZGVsaW1pdGVyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuREVMRVRFOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uRGVsZXRlKGtleUluZm8sIHRoaXMub3B0aW9ucy5kZWxpbWl0ZXJEZWxldGVTdHJhdGVneSwgdGhpcy5sYW5ndWFnZURhdGEuZGVsaW1pdGVyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBBQ1RJT05fVFlQRVMuVU5ETzpcclxuICAgICAgICBrZXlIYW5kbGVycy5vblVuZG8odGhpcywgZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICBjYXNlIEFDVElPTl9UWVBFUy5SRURPOlxyXG4gICAgICAgIGtleUhhbmRsZXJzLm9uUmVkbyh0aGlzLCBlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlVOS05PV05cIik7XHJcbiAgICAgICAgLy8gSWYgY3RybCBrZXkgbW9kaWZpZXIgaXMgcHJlc3NlZCB0aGVuIGFsbG93IHNwZWNpZmljIGV2ZW50IGhhbmRsZXJcclxuICAgICAgICAvLyB0byBoYW5kbGUgdGhpc1xyXG4gICAgICAgIGlmICghZS5jdHJsS2V5KSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGhlbHBlcnMucGFydGlhbEZvcm1hdChrZXlJbmZvLm5ld1ZhbHVlLCB0aGlzLm9wdGlvbnMuY3VycmVuY3ksIHRoaXMubGFuZ3VhZ2VEYXRhKTtcclxuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGtleUluZm8ubmV3VmFsdWU7XHJcbiAgICBjb25zdCBpc1ZhbHVlVmFsaWQgPSB0aGlzLmNoZWNrVmFsdWVTaXppbmcobmV3VmFsdWUpO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IGlzVmFsdWVWYWxpZCA/IG5ld1ZhbHVlIDogdGhpcy5lbGVtZW50LnZhbHVlO1xyXG5cclxuICAgIGlmIChpc1ZhbHVlVmFsaWQpIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gaGVscGVycy5jYWxjdWxhdGVPZmZzZXQoXHJcbiAgICAgICAgY3VycmVudFZhbHVlLFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1cnJlbmN5LFxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VEYXRhXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5ld0NhcmV0UG9zID0ga2V5SW5mby5jYXJldFN0YXJ0ICsgb2Zmc2V0O1xyXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobmV3Q2FyZXRQb3MsIG5ld0NhcmV0UG9zKTtcclxuICAgICAgdGhpcy5oaXN0b3J5LmFkZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICogQmFja3VwIGV2ZW50IGlmIGlucHV0IGNoYW5nZXMgZm9yIGFueSBvdGhlciByZWFzb24sIGp1c3QgZm9ybWF0IHZhbHVlXHJcbiAgICogQHBhcmFtIHtlfSBFdmVudFxyXG4gICAqL1xyXG4gIG9uSW5wdXQoZSkge1xyXG4gICAgY29uc29sZS5kZWJ1Zygnb24gSU5QVVQnLCBlKTtcclxuICAgIGNvbnN0IHZhbHVlQ2hhbmdlZCA9IHRoaXMuc2V0VmFsdWUodGhpcy5lbGVtZW50LnZhbHVlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaW5wdXQ7XHJcbiIsIlxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgRFJBR19TVEFURVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8qKlxyXG4gKiBFZGl0IGEgc3RyaW5nIHdpdGggYSBuZXcgc3RyaW5nIHRvIGFkZC5cclxuICogSGFuZGxlcyB0aGUgY2FzZSBpZiB0ZXh0IGlzIGhpZ2hsaWdodGVkIGFsc28sIGluIHdoaWNoIGNhc2UgdGhhdCB0ZXh0XHJcbiAqIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgJ3RvQWRkJyBzdHJpbmdcclxuICovXHJcbmV4cG9ydHMuZWRpdFN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgdG9BZGQsIGNhcmV0U3RhcnQsIGNhcmV0RW5kID0gY2FyZXRTdGFydCkge1xyXG4gIGNvbnN0IGZpcnN0SGFsZiA9IHN0ci5zbGljZSgwLCBjYXJldFN0YXJ0KTtcclxuICBjb25zdCBzZWNvbmRIYWxmID0gc3RyLnNsaWNlKGNhcmV0RW5kLCBzdHIubGVuZ3RoKTtcclxuICByZXR1cm4gYCR7Zmlyc3RIYWxmfSR7dG9BZGR9JHtzZWNvbmRIYWxmfWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdWxseSBmb3JtYXQgdGhlIHZhbHVlIHVzaW5nIG51bWVyYWwgKERvbmUgb24gZm9jdXMgb3V0KVxyXG4gKi9cclxuZXhwb3J0cy5mdWxsRm9ybWF0ID0gZnVuY3Rpb24odmFsLCBmb3JtYXQsIGN1cnJlbmN5KSB7XHJcbiAgY29uc3QgZnVsbEZvcm1hdCA9IGN1cnJlbmN5ID8gYCR7Y3VycmVuY3l9JHtmb3JtYXR9YCA6IGZvcm1hdDtcclxuXHJcbiAgaWYgKCF2YWwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHZhbCA+PSAwICYmIHZhbCA8PSA5ID8gbnVtZXJhbCh2YWwpLmZvcm1hdChmdWxsRm9ybWF0KSA6IG51bGw7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IG51bWVyYWxWYWwgPSBudW1lcmFsKHZhbCk7XHJcbiAgICBpZiAoaXNOYU4obnVtZXJhbFZhbC52YWx1ZSgpKSB8fCAhTnVtYmVyLmlzRmluaXRlKG51bWVyYWxWYWwudmFsdWUoKSkpIHtcclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudW1lcmFsVmFsLmZvcm1hdChmdWxsRm9ybWF0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0aWFsbHkgZm9ybWF0IHRoZSB2YWx1ZSwgb25seSBhZGRpbmcgY29tbWFzIGFzIG5lZWRlZCAoRG9uZSBvbiBrZXlwcmVzcy9rZXl1cClcclxuICovXHJcbmV4cG9ydHMucGFydGlhbEZvcm1hdCA9IGZ1bmN0aW9uKHZhbCwgY3VycmVuY3ksIGxhbmd1YWdlRGF0YSkge1xyXG4gIGxldCBzdHIgPSB2YWwucmVwbGFjZShuZXcgUmVnRXhwKGBbJHsoY3VycmVuY3kgfHwgJycpfSR7bGFuZ3VhZ2VEYXRhLmRlbGltaXRlcn1dYCwgJ2cnKSwgJycpO1xyXG4gIGNvbnN0IHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihsYW5ndWFnZURhdGEuZGVjaW1hbCkgPiAtMVxyXG4gICAgPyBzdHIuaW5kZXhPZihsYW5ndWFnZURhdGEuZGVjaW1hbCkgLSAxXHJcbiAgICA6IHN0ci5sZW5ndGggLSAxO1xyXG4gIGNvbnN0IGVuZEluZGV4ID0gc3RyWzBdID09PSAnLScgPyAxIDogMDtcclxuXHJcbiAgLy8gaSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiB6ZXJvIGJlY2F1c2UgbnVtYmVyIGNhbm5vdCBzdGFydCB3aXRoIGNvbW1hXHJcbiAgbGV0IGkgPSBzdGFydEluZGV4O1xyXG4gIGxldCBqID0gMTtcclxuICBmb3IgKGksIGo7IGkgPiBlbmRJbmRleDsgaS0tLCBqKyspIHtcclxuICAgIC8vIEV2ZXJ5IDMgY2hhcmFjZXJzLCBhZGQgYSBjb21tYVxyXG4gICAgaWYgKGogJSAzID09PSAwKSB7XHJcbiAgICAgIHN0ciA9IHRoaXMuZWRpdFN0cmluZyhzdHIsICcsJywgaSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIE9ubHkgYWRkIGN1cnJlbmN5IHN5bWJvbCBvbiBpZiB2YWx1ZSBoYXMgYW55IG51bWJlcnNcclxuICBpZiAoY3VycmVuY3kgJiYgc3RyICYmIHN0ci5tYXRjaCgvXFxkLykpIHtcclxuICAgIHJldHVybiBzdHJbMF0gPT09ICctJyA/IHN0ci5yZXBsYWNlKCctJywgYC0ke2N1cnJlbmN5fWApIDogYCR7Y3VycmVuY3l9JHtzdHJ9YFxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZSBob3cgbWFueSBjaGFyYWN0ZXJzIGhhdmUgYmVlbiBhZGRlZCAob3IgcmVtb3ZlZCkgYmVmb3JlIHRoZSBnaXZlblxyXG4gKiBjYXJldCBwb3NpdGlvbiBhZnRlciBmb3JtYXR0aW5nLiBDYXJldCBpcyB0aGVuIGFkanVzdGVkIGJ5IHRoZSByZXR1cm5lZCBvZmZzZXRcclxuICogQ3VycmVuY3kgc3ltYm9sIG9yIGRlbGltaXRlcnMgbWF5IGhhdmUgYmVlbiBhZGRlZFxyXG4gKi9cclxuZXhwb3J0cy5jYWxjdWxhdGVPZmZzZXQgPSBmdW5jdGlvbihwcmV2LCBjdXJyLCBwb3MsIGN1cnJlbmN5LCBsYW5ndWFnZURhdGEpIHtcclxuICBsZXQgaSwgcHJldlN5bWJvbHMgPSAwLCBjdXJyZW50U3ltYm9scyA9IDA7XHJcbiAgZm9yIChpPTA7IGkgPCBwb3M7IGkrKykge1xyXG4gICAgaWYgKHByZXZbaV0gPT09IGxhbmd1YWdlRGF0YS5kZWxpbWl0ZXIgfHwgKGN1cnJlbmN5ICYmIHByZXZbaV0gPT09IGN1cnJlbmN5KSkge1xyXG4gICAgICBwcmV2U3ltYm9scysrO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKGk9MDsgaSA8IHBvczsgaSsrKSB7XHJcbiAgICBpZiAoY3VycltpXSA9PT0gbGFuZ3VhZ2VEYXRhLmRlbGltaXRlciB8fCAoY3VycmVuY3kgJiYgY3VycltpXSA9PT0gY3VycmVuY3kpKSB7XHJcbiAgICAgIGN1cnJlbnRTeW1ib2xzKys7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjdXJyZW50U3ltYm9scyAtIHByZXZTeW1ib2xzO1xyXG59XHJcbiIsIi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vICAgICBLRVkgSEFORExFUlMgICAgIC8vXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PS8vXHJcbi8vIEFsbCBmdW5jdGlvbnMgZGVhbGluZyB3aXRoIGtleXByZXNzZXMgKGxpc3RlbmVkIHRvIG9uIHRoZSBrZXlkb3duIGV2ZW50KVxyXG4vLyBhcmUgaGVyZSwgd2l0aCBzcGVjaWZpYyBpbXBsZW1lbnRhdGlvbnMgZm9yIG1vc3QgdHlwZXMgb2Yga2V5XHJcblxyXG5pbXBvcnQge0FDVElPTl9UWVBFUywgREVMSU1JVEVSX1NUUkFURUdJRVN9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAvKipcclxuICAgKiBOVU1CRVIgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uTnVtYmVyOiBmdW5jdGlvbihrZXlJbmZvKSB7XHJcbiAgICBjb25zdCBhbGxvd2VkTnVtYmVyID1cclxuICAgICAgIShrZXlJbmZvLmN1cnJlbnRWYWx1ZVswXSA9PT0gJy0nXHJcbiAgICAgICYmIGtleUluZm8uY2FyZXRTdGFydCA9PT0gMFxyXG4gICAgICAmJiBrZXlJbmZvLmNhcmV0RW5kID09PSAwKTtcclxuXHJcbiAgICBpZiAoYWxsb3dlZE51bWJlcikge1xyXG4gICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKGtleUluZm8uY3VycmVudFZhbHVlLCBrZXlJbmZvLmtleU5hbWUsIGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jYXJldEVuZCk7XHJcbiAgICAgIGtleUluZm8uY2FyZXRTdGFydCArPSAxO1xyXG4gICAgfVxyXG4gICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIE1JTlVTIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKi9cclxuICBvbk1pbnVzOiBmdW5jdGlvbihrZXlJbmZvKSB7XHJcbiAgICBjb25zdCBtaW51c0FsbG93ZWQgPSBrZXlJbmZvLmNhcmV0U3RhcnQgPT09IDAgJiZcclxuICAgICAgKGtleUluZm8uY3VycmVudFZhbHVlWzBdICE9PSAnLScgfHwga2V5SW5mby5jYXJldEVuZCA+IDApO1xyXG5cclxuICAgICBpZiAobWludXNBbGxvd2VkKSB7XHJcbiAgICAgICBrZXlJbmZvLm5ld1ZhbHVlID0gaGVscGVycy5lZGl0U3RyaW5nKFxyXG4gICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICAgJy0nLFxyXG4gICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAgIGtleUluZm8uY2FyZXRFbmRcclxuICAgICAgICk7XHJcbiAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgICB9XHJcbiAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERFQ0lNQUwgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7bGFuZ3VhZ2VEYXRhfSBMYW5ndWFnZSBzcGVjaWZpYyBpbmZvIGZvciB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcclxuICAgKi9cclxuICBvbkRlY2ltYWw6IGZ1bmN0aW9uKGtleUluZm8sIGxhbmd1YWdlRGF0YSkge1xyXG4gICAgY29uc3QgZGVjaW1hbEluZGV4ID0ga2V5SW5mby5jdXJyZW50VmFsdWUuaW5kZXhPZihsYW5ndWFnZURhdGEuZGVjaW1hbCk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgaXMgbm90IGFscmVhZHkgYSBkZWNpbWFsIG9yIHRoZSBvcmlnaW5hbCB3b3VsZCBiZSByZXBsYWNlZFxyXG4gICAgLy8gQWRkIHRoZSBkZWNpbWFsXHJcbiAgICBjb25zdCBkZWNpbWFsQWxsb3dlZCA9XHJcbiAgICAgIChkZWNpbWFsSW5kZXggPT09IC0xKSB8fFxyXG4gICAgICAgIChkZWNpbWFsSW5kZXggPj0ga2V5SW5mby5jYXJldFN0YXJ0ICYmXHJcbiAgICAgICAgIGRlY2ltYWxJbmRleCA8IGtleUluZm8uY2FyZXRFbmQpO1xyXG5cclxuICAgIGlmIChkZWNpbWFsQWxsb3dlZClcclxuICAgIHtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IGhlbHBlcnMuZWRpdFN0cmluZyhcclxuICAgICAgICBrZXlJbmZvLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBsYW5ndWFnZURhdGEuZGVjaW1hbCxcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQsXHJcbiAgICAgICAga2V5SW5mby5jYXJldEVuZFxyXG4gICAgICApO1xyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU0hPUlRDVVQgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7bGFuZ3VhZ2VEYXRhfSBMYW5ndWFnZSBzcGVjaWZpYyBpbmZvIGZvciB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcclxuICAgKi9cclxuICBvblNob3J0Y3V0OiBmdW5jdGlvbihrZXlJbmZvLCBsYW5ndWFnZURhdGEpIHtcclxuICAgIGNvbnN0IHBvd2VyID0gbGFuZ3VhZ2VEYXRhLnNob3J0Y3V0c1trZXlJbmZvLmtleU5hbWUudG9Mb3dlckNhc2UoKV07XHJcblxyXG4gICAgaWYgKHBvd2VyKSB7XHJcbiAgICAgIGNvbnN0IG51bWVyYWxWYWwgPSBudW1lcmFsKGtleUluZm8uY3VycmVudFZhbHVlKTtcclxuICAgICAga2V5SW5mby5uZXdWYWx1ZSA9IChudW1lcmFsVmFsLnZhbHVlKCkgPyBudW1lcmFsVmFsIDogbnVtZXJhbCgxKSlcclxuICAgICAgICAubXVsdGlwbHkoTWF0aC5wb3coMTAsIHBvd2VyKSkuZm9ybWF0KCk7XHJcblxyXG4gICAgICAvLyBUT0RPIC0gQkVIQVZJT1VSOiBzaG91bGQgY2FyZXQgdG8ganVtcCB0byBlbmQ/IGFzIHdob2xlIHZhbHVlIGlzXHJcbiAgICAgIC8vIG11bGlwbGllZCBieSB0aGUgbXVsdGlwbGVyIC0gKGRvZXNuJ3QganVzdCBjaHVjayB6ZXJvcyBpbiB0aGUgbWlkZGxlKVxyXG4gICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSBrZXlJbmZvLm5ld1ZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGtleUluZm8uZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBCQUNLU1BBQ0UgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqL1xyXG4gIG9uQmFja3NwYWNlOiBmdW5jdGlvbihrZXlJbmZvLCBkZWxpbWl0ZXJTdHJhdGVneSwgZGVsaW1pdGVyKSB7XHJcbiAgICBsZXQgZmlyc3RIYWxmLCBsYXN0SGFsZjtcclxuXHJcbiAgICBpZiAoa2V5SW5mby5jYXJldFN0YXJ0ID09PSBrZXlJbmZvLmNhcmV0RW5kKSB7XHJcbiAgICAgIGlmIChrZXlJbmZvLmV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICAvLyBJZiBDVFJMIGtleSBpcyBoZWxkIGRvd24gLSBkZWxldGUgZXZlcnl0aGluZyBCRUZPUkUgY2FyZXRcclxuICAgICAgICBmaXJzdEhhbGYgPSAnJztcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBiZWZvcmUgaXRcclxuICAgICAgICBsZXQgY2FyZXRKdW1wID1cclxuICAgICAgICAgICgoZGVsaW1pdGVyU3RyYXRlZ3kgPT09IERFTElNSVRFUl9TVFJBVEVHSUVTLkRFTEVURV9OVU1CRVIpXHJcbiAgICAgICAgICAmJiAoa2V5SW5mby5jdXJyZW50VmFsdWVba2V5SW5mby5jYXJldFN0YXJ0IC0gMV0gPT09IGRlbGltaXRlcikpXHJcbiAgICAgICAgICAgID8gMlxyXG4gICAgICAgICAgICA6IDE7XHJcblxyXG4gICAgICAgIGNhcmV0SnVtcCA9ICgoa2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKSA+PSAwKSA/IGNhcmV0SnVtcCA6IDA7XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0IC0gY2FyZXRKdW1wKTtcclxuICAgICAgICBsYXN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKGtleUluZm8uY2FyZXRTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgICBrZXlJbmZvLmNhcmV0U3RhcnQgKz0gLWNhcmV0SnVtcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uRGVsZXRlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogREVMRVRFIEhBTkRMRVJcclxuICAgKiBAcGFyYW0ge2tleUluZm99IEluZm9ybWF0aW9uIGFib3V0IHRoZSBrZXlwcmVzcy9hY3Rpb25cclxuICAgKiBAcGFyYW0ge2xhbmd1YWdlRGF0YX0gTGFuZ3VhZ2Ugc3BlY2lmaWMgaW5mbyBmb3IgdGhlIHNlbGVjdGVkIGxhbmd1YWdlXHJcbiAgICovXHJcbiAgb25EZWxldGU6IGZ1bmN0aW9uKGtleUluZm8sIGRlbGltaXRlclN0cmF0ZWd5LCBkZWxpbWl0ZXIpIHtcclxuICAgIGxldCBmaXJzdEhhbGYsIGxhc3RIYWxmO1xyXG5cclxuICAgIGlmIChrZXlJbmZvLmNhcmV0U3RhcnQgPT09IGtleUluZm8uY2FyZXRFbmQpIHtcclxuICAgICAgY29uc3QgbmV4dENoYXIgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZVtrZXlJbmZvLmNhcmV0U3RhcnRdO1xyXG5cclxuICAgICAgaWYgKGtleUluZm8uZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIC8vIElmIENUUkwga2V5IGlzIGhlbGQgZG93biAtIGRlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGNhcmV0XHJcbiAgICAgICAgZmlyc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UoMCwga2V5SW5mby5jYXJldFN0YXJ0KTtcclxuICAgICAgICBsYXN0SGFsZiA9ICcnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEFzc3VtZSBhcyB0aGVyZSBpcyBhIGNvbW1hIHRoZW4gdGhlcmUgbXVzdCBiZSBhIG51bWJlciBhZnRlciBpdFxyXG4gICAgICAgIGNvbnN0IHRvRGVsZXRlID0gZGVsaW1pdGVyU3RyYXRlZ3kgPT09IERFTElNSVRFUl9TVFJBVEVHSUVTLkRFTEVURV9OVU1CRVI7XHJcbiAgICAgICAgY29uc3QgZGVsaW1pdGVyTmV4dCA9IG5leHRDaGFyID09PSBkZWxpbWl0ZXI7XHJcblxyXG4gICAgICAgIC8vIElmIGNoYXIgdG8gZGVsZXRlIGlzIGRlbGltaXRlciBhbmQgbnVtYmVyIGlzIG5vdCB0byBiZSBkZWxldGVkIC0gc2tpcCBvdmVyIGl0XHJcbiAgICAgICAga2V5SW5mby5jYXJldFN0YXJ0ICs9IGRlbGltaXRlck5leHQgJiYgIXRvRGVsZXRlID8gMSA6IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGxhc3RIYWxmU3RhcnQgPSBrZXlJbmZvLmNhcmV0U3RhcnRcclxuICAgICAgICAgICsgKGRlbGltaXRlck5leHQgPyAodG9EZWxldGUgPyAyIDogMCkgOiAxKTtcclxuICAgICAgICBmaXJzdEhhbGYgPSBrZXlJbmZvLmN1cnJlbnRWYWx1ZS5zbGljZSgwLCBrZXlJbmZvLmNhcmV0U3RhcnQpO1xyXG4gICAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2UobGFzdEhhbGZTdGFydCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2FtZSBjb2RlIGFzIG9uQmFja3NwYWNlIGhhbmRsZXIgZm9yIGRlbGV0aW5nIGEgc2VsZWN0aW9uIHJhbmdlXHJcbiAgICAgIGZpcnN0SGFsZiA9IGtleUluZm8uY3VycmVudFZhbHVlLnNsaWNlKDAsIGtleUluZm8uY2FyZXRTdGFydCk7XHJcbiAgICAgIGxhc3RIYWxmID0ga2V5SW5mby5jdXJyZW50VmFsdWUuc2xpY2Uoa2V5SW5mby5jYXJldEVuZCwga2V5SW5mby5jdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBrZXlJbmZvLm5ld1ZhbHVlID0gZmlyc3RIYWxmICsgbGFzdEhhbGY7XHJcbiAgICBrZXlJbmZvLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogVkVSVElDQUwgQVJST1cgSEFORExFUlxyXG4gICAqIEBwYXJhbSB7a2V5SW5mb30gSW5mb3JtYXRpb24gYWJvdXQgdGhlIGtleXByZXNzL2FjdGlvblxyXG4gICAqIEBwYXJhbSB7c3RlcH0gSG93IG11Y2ggdG8gaW5jcmVhc2UvZGVjcmVhc2UgdmFsdWUgYnlcclxuICAgKi9cclxuICBvblZlcnRpY2FsQXJyb3c6IGZ1bmN0aW9uKGtleUluZm8sIHN0ZXApIHtcclxuICAgIC8vIElmIHN0ZXAgaXMgMCAob3IgZmFsc2V5KSB0aGVuIGFzc3VtZSBhcnJvdyBrZXkgdmFsdWUgY2hhbmdpbmcgaXMgZGlzYWJsZWRcclxuICAgIGlmIChzdGVwICYmICFpc05hTihzdGVwKSkge1xyXG4gICAgICBzd2l0Y2ggKGtleUluZm8ua2V5TmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ3VwJzpcclxuICAgICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBudW1lcmFsKGtleUluZm8uY3VycmVudFZhbHVlKS5hZGQoc3RlcCkuZm9ybWF0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdkb3duJzpcclxuICAgICAgICAgIGtleUluZm8ubmV3VmFsdWUgPSBudW1lcmFsKGtleUluZm8uY3VycmVudFZhbHVlKS5zdWJ0cmFjdChzdGVwKS5mb3JtYXQoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgIH1cclxuICAgICAga2V5SW5mby5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFVORE8gSEFORExFUlxyXG4gICAqIEBwYXJhbSB7ZmlucHV0fSB0aGUgRmlucHV0IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7ZXZlbnR9IFRoZSBrZXlkb3duIGV2ZW50IHdoaWNoIHRyaWdnZXJlZCB0aGUgdW5kb1xyXG4gICAqL1xyXG4gIG9uVW5kbzogZnVuY3Rpb24oZmlucHV0LCBldmVudCkge1xyXG4gICAgZmlucHV0LmVsZW1lbnQudmFsdWUgPSBmaW5wdXQuaGlzdG9yeS51bmRvKCk7XHJcbiAgICBmaW5wdXQuZWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShmaW5wdXQuZWxlbWVudC52YWx1ZS5sZW5ndGgsIGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUkVETyBIQU5ETEVSXHJcbiAgICogQHBhcmFtIHtmaW5wdXR9IHRoZSBGaW5wdXQgb2JqZWN0XHJcbiAgICogQHBhcmFtIHtldmVudH0gVGhlIGtleWRvd24gZXZlbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSByZWRvXHJcbiAgICovXHJcbiAgb25SZWRvOiBmdW5jdGlvbihmaW5wdXQsIGV2ZW50KSB7XHJcbiAgICBmaW5wdXQuZWxlbWVudC52YWx1ZSA9IGZpbnB1dC5oaXN0b3J5LnJlZG8oKTtcclxuICAgIGZpbnB1dC5lbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGZpbnB1dC5lbGVtZW50LnZhbHVlLmxlbmd0aCwgZmlucHV0LmVsZW1lbnQudmFsdWUubGVuZ3RoKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG59XHJcbiIsIlxyXG5jb25zdCBNQVhfQlVGRkVSX1NJWkUgPSA1MDtcclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBIaXN0b3J5IC0gTWFuYWdlcyBhbiBhcnJheSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgdHJhY2tlZCwgc3VwcG9ydGluZ1xyXG4gKiB0aGUgdW5kbyBhbmQgcmVkbyBvcGVyYXRpb25zIGluIHRoZSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVIaXN0b3J5IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gW251bGxdO1xyXG4gICAgdGhpcy5fY3VycmVudEluZGV4ID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEdFVFRFUlNcclxuICBnZXQgaGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9oaXN0b3J5O1xyXG4gIH1cclxuICBnZXQgY3VycmVudEluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRJbmRleDtcclxuICB9XHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhpc3RvcnlbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgc2V0IGN1cnJlbnRJbmRleChpKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBpO1xyXG4gIH1cclxuICBzZXQgaGlzdG9yeShoaXN0b3J5KSB7XHJcbiAgICB0aGlzLl9oaXN0b3J5ID0gaGlzdG9yeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gcHJldmlvdXMgdmFsdWUgaW4gaGlzdG9yeSBhcnJheVxyXG4gICAqL1xyXG4gIHVuZG8oKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPiAwKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4LS07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFJlZG8gY2hhbmdlLCBzbyByZXR1cm4gdG8gbmV4dCB2YWx1ZSBpbiBoaXN0b3J5IGFycmF5XHJcbiAgICovXHJcbiAgcmVkbygpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMuaGlzdG9yeS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEFkZCBuZXcgdmFsdWUgdG8gaGlzdG9yeSBhcnJheS4gQW55IHBvc3NpYmxlICdyZWRvJ3MnIGFyZSByZW1vdmVkIGZyb20gYXJyYXlcclxuICAgKiBhcyBhIG5ldyAnYnJhbmNoJyBvZiBoaXN0b3J5IGlzIGNyZWF0ZWQgd2hlbiBhIG5ldyB2YWx1ZSBpcyBhZGRlZFxyXG4gICAqIEBwYXJhbSB7dmFsfSBWYWx1ZSB0byBhZGQgdG8gaGlzdG9yeSBcclxuICAgKi9cclxuICBhZGRWYWx1ZSh2YWwpIHtcclxuICAgIC8vIERlbGV0ZSBldmVyeXRoaW5nIEFGVEVSIGN1cnJlbnQgdmFsdWVcclxuICAgIGlmICh2YWwgIT09IHRoaXMuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaGlzdG9yeSA9IHRoaXMuaGlzdG9yeS5zbGljZSgwLCB0aGlzLmN1cnJlbnRJbmRleCArIDEpO1xyXG4gICAgICB0aGlzLmhpc3RvcnkucHVzaCh2YWwpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaGlzdG9yeS5sZW5ndGggPiBNQVhfQlVGRkVSX1NJWkUpIHtcclxuICAgICAgICB0aGlzLmhpc3Rvcnkuc2hpZnQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aCAtIDE7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=
