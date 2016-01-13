// Copyright Ali Sheehan-Dare, all rights and profits reserved.

import numeral from 'numeral';

const CODES = {
  'COMMA':        { key: 188, char: 44 },
  'MINUS':        { key: 189, char: 45 },
  'DOT':          { key: 190, char: 46 },
  'LEFT_ARROW':   { key: 37 },
  'RIGHT_ARROW':  { key: 39 },
  'UP_ARROW':     { key: 38 },
  'DOWN_ARROW':   { key: 40 },
  'BACKSPACE':    { key: 8 },
  'DELETE':       { key: 46 }
}

// Char types
const CHAR_TYPES = {
  NUMBER: 'NUMBER',
  SHORTCUT: 'SHORTCUT',
  DECIMAL: 'DECIMAL',
  DELIMITER: 'DELIMITER',
  MINUS: 'MINUS',
  UNKNOWN: 'UNKNOWN',
  HORIZONTAL_ARROW: 'HORIZONTAL_ARROW',
  VERTICAL_ARROW: 'VERTICAL_ARROW',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DELETE'
}


/**
 * CONSTANTS
 */
const languageData = {
  en: {
    shortcuts: {
      'k': 3,
      'm': 6,
      'b': 9
    },
    delimiter: CODES.COMMA,
    decimal: CODES.DOT
  }
}
const DEFAULTS = {
  format: '0,0',
  lang: 'en',
  maxValue: 10e+12,
  minValue: -10e+12,
  maxLength: 30
}

/**
 * FINPUT COMPONENT CLASS
 * @class
 */
class Finput {

  /**
   * Constructor
   * @param {DOM Element} The number input
   * @param {Options} Options for the number input's behaviour
   *
   * Detailed list of possible options:
   * @param {Options.format} The format of the number to be displayed by the input
   * @param {Options.lang} Language (used in letter abbreviations etc...)
   * @param {Options.maxValue} Limit input value to a maximum value
   * @param {Options.minValue} Limit input value to a minimum value
   * @param {Options.maxDigits} Limit input value to a maximum number of digits
   */
  constructor(element, options) {
    this._element = element;
    this._options = Object.assign(options, DEFAULTS);
    this._languageData = languageData[this.options.lang];
    this._charTypes = this.getCharTypes();

    numeral.defaultFormat(this.options.format);

    // Setup listeners
    // this.element.addEventListener('keypress', (e) => this.onKeypress(e));
    this.element.addEventListener('blur', (e) => this.onFocusout(e));
    this.element.addEventListener('focus', (e) => this.onFocusin(e));
    // this.element.addEventListener('input', (e) => this.onInput(e));
    this.element.addEventListener('paste', (e) => this.onPaste(e));
    this.element.addEventListener('keydown', (e) => this.onKeydown(e));
  }

  // GETTERS
  get element() {
    return this._element;
  }
  get options() {
    return this._options;
  }
  get value() {
    return numeral().unformat(this.element.value);
  }
  get formattedValue() {
    return numeral().unformat(this.element.value);
  }
  get languageData() {
    return this._languageData;
  }
  get charTypes() {
    return this._charTypes;
  }

  getCharTypes() {
    return [
      {
        name: CHAR_TYPES.NUMBER,
        minCode: { key: 48, char: 48 },
        maxCode: { key: 57, char: 57 }
      },
      {
        name: CHAR_TYPES.MINUS,
        code: CODES.MINUS
      },
      {
        name: CHAR_TYPES.DECIMAL,
        code: this.languageData.decimal
      },
      {
        name: CHAR_TYPES.DELIMITER,
        code: this.languageData.delimiter
      },
      {
        name: CHAR_TYPES.SHORTCUT,
        codes: Object.keys(this.languageData.shortcuts).map((s) => {
          const code = s.toUpperCase().charCodeAt(0);
          return { key: code, code: code };
        })
      },
      {
        name: CHAR_TYPES.HORIZONTAL_ARROW,
        codes: [CODES.RIGHT_ARROW, CODES.LEFT_ARROW]
      },
      {
        name: CHAR_TYPES.VERTICAL_ARROW,
        codes: [CODES.UP_ARROW, CODES.DOWN_ARROW]
      }
    ]
  }
  getKeyType(e) {
    const code = e.which;
    for (let type of this.charTypes) {
      let typeMatch = false;

      if (type.code) {
        typeMatch = type.code.key === code;
      } else if (type.codes) {
        typeMatch = type.codes.map((c) => c.key).indexOf(code) > -1;
      } else if (type.minCode && type.maxCode) {
        typeMatch = type.minCode.key <= code && code <= type.maxCode.key;
      }

      if (typeMatch) {
        return type.name;
      }
    }
    return CHAR_TYPES.UNKNOWN;
  }
  //
  // // HELPERS
  // isCharValid(keyInfo) {
  //   const validChar = keyInfo.char.match(this.validCharRegex);
  //
  //   switch (keyInfo.char) {
  //     // When inputting minuses, caret must be at the start and there must not be
  //     // a minus sign there already
  //     case String.fromCharCode(CHAR_CODES.MINUS):
  //       return validChar
  //         && keyInfo.caretStart === 0
  //         // Allow for highlighted text to be replaced by a minus
  //         && (keyInfo.originalVal[0] !== String.fromCharCode(CHAR_CODES.MINUS) || keyInfo.caretEnd > 0);
  //     default:
  //       return validChar;
  //   }
  // }
  // isNumberValid(keyInfo) {
  //   return !isNaN(numeral(keyInfo.potentialVal));
  // }
  // generateValidCharRegex(languageData) {
  //   return new RegExp(`\[\\d\\-\\`
  //     + `${this.languageData.decimal}`
  //     + `${Object.keys(this.languageData.shortcuts).join('')}`
  //     + `\]`
  //   );
  // }

  // Check potential value is not going to be too large or too small
  // in relation to limits set in options
  checkValueSize(keyInfo) {
    const numberValue = numeral().unformat(keyInfo.potentialVal);

    // If the value is too large or too small, then set input value back
    // to original value
    if (numberValue > this.options.maxValue) {
      keyInfo.charsToAdd = '';
    }
    if (numberValue < this.options.minValue) {
      keyInfo.charsToAdd = '';
    }
  }
  checkValueLength(val) {
    if (val.length > this.options.maxLength) {
      keyInfo.charsToAdd = '';
    }
  }
  setValue(keyInfo) {
    const finalValue = this.editString(
      keyInfo.originalVal,
      keyInfo.charsToAdd,
      keyInfo.caretStart,
      keyInfo.caretEnd
    );
    keyInfo.event.preventDefault();

    // Add necessary commas
    this.element.value = this.partialFormat(finalValue);

    const offset = this.calculateOffset(
      finalValue,
      this.element.value,
      keyInfo.caretStart + keyInfo.charsToAdd.length
    );
    this.setCaret(keyInfo.caretStart + keyInfo.charsToAdd.length + offset);
  }
  /**
   * Fully format the value using numeral (Done on focus out)
   */
  fullFormat(val) {
    return val && numeral(val).format();
  }
  /**
   * Partially format the value, only adding commas as needed (Done on keypress/keyup)
   */
  partialFormat(val) {
    let str = val.replace(/\,/g, '');
    const startIndex = str.indexOf('.') > -1
      ? str.indexOf('.') - 1
      : str.length - 1;
    const endIndex = str[0] === String.fromCharCode(CODES.MINUS.char) ? 1 : 0;

    // i must be greater than zero because number cannot start with comma
    let i = startIndex;
    let j = 1;
    for (i, j; i > endIndex; i--, j++) {
      // Every 3 characers, add a comma
      if (j % 3 === 0) {
        str = this.editString(str, ',', i);
      }
    }
    return str;
  }
  setCaret(pos) {
    this.element.setSelectionRange(pos, pos);
  }
  editString(str, toAdd, caretStart, caretEnd = caretStart) {
    const firstHalf = str.slice(0, caretStart);
    const secondHalf = str.slice(caretEnd, str.length);
    return `${firstHalf}${toAdd}${secondHalf}`;
  }
  /**
   * Calculate how many characters have been added (or removed) before the given
   * caret position after formatting. Caret is then adjusted by the returned offset
   */
  calculateOffset(prev, curr, pos) {
    let i, j;
    for (i=0, j=0; i < pos; i++, j++) {
      if (prev[i] === ',') {
        i++;
      }
      if (curr[j] === ',') {
        j++;
      }
    }
    return j - i;
  }


  // EVENTS
  onKeypress(e) {
    console.log('Keypress event', e);
    const char = String.fromCharCode(e.which);
    const keyInfo = {
      event: e,
      char: char,
      charsToAdd: char,
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      originalVal: `${this.element.value}`,
      // TODO NEED TO PUT CHAR IN THE CORRECT PLACE USING THE CARET
      potentialVal: this.editString(this.element.value, char, this.element.selectionStart, this.element.selectionEnd)
    }

    if (!this.isCharValid(keyInfo) ||
        !this.isNumberValid(keyInfo))
    {
      e.preventDefault();
      return false;
    }

    // this.checkValueSize(keyInfo);
    // this.checkValueLength(this.partialFormat(keyInfo.potentialVal));

    this.setValue(keyInfo);
  }
  // Force format on every change of input (done by setValue function)
  // NOTE: ONLY CALLED WHEN DELETE OR BACKSPACE IS PRESSED
  onInput(e) {
    console.log('Input event', e);
    const keyInfo = {
      event: e,
      char: '',
      charsToAdd: '',
      caretStart: this.element.selectionStart,
      originalVal: `${this.element.value}`
    }

    // this.setValue(keyInfo);
  }
  /**
   * On focusOUT of the input - fully format the value
   */
  onFocusout(e) {
    console.log('Focus OUT event', e);
    this.element.value = this.fullFormat(this.element.value);
  }
  /**
   * On focus of the input - Select all text
   */
  onFocusin(e) {
    console.log('Focus IN event', e);
    this.element.selectionStart = 0;
    this.element.selectionEnd = this.element.value.length;
  }
  onPaste(e) {
    console.log('Paste event', e);
    const chars = e.clipboardData.getData('text');
    const potentialValue = this.editString(
      this.element.value,
      chars,
      this.element.selectionStart,
      this.element.selectionEnd
    );

    const newVal = numeral(potentialValue);
    if (!isNaN(newVal.value())) {
      this.element.value = newVal.format();
    }
  }
  onKeydown(e) {
    console.log('Keydown event', e);

    const keyInfo = {
      event: e,
      char: String.fromCharCode(e.which),
      charsToAdd: String.fromCharCode(e.which),
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      currentValue: this.element.value
    }

    switch (this.getKeyType(e)) {
      case CHAR_TYPES.NUMBER:
        this.handleNumber(keyInfo);
        break;
      case CHAR_TYPES.DECIMAL:
        this.handleDecimal(keyInfo);
        break;
      case CHAR_TYPES.MINUS:
        this.handleMinus(keyInfo);
        break;
      case CHAR_TYPES.SHORTCUT:
        this.handleShortcut(keyInfo);
        break;
      case CHAR_TYPES.HORIZONTAL_ARROW:
        console.log('HORIZONTAL ARROW');
        break;
      case CHAR_TYPES.VERTICAL_ARROW:
        console.log('VERTICAL ARROW');
        break;
      case CHAR_TYPES.BACKSPACE:
        console.log('BACKSPACE');
        break;
      case CHAR_TYPES.DELETE:
        console.log('DELETE');
        break;
      default:
        console.log("UNKNOWN")
    }

    if (keyInfo.newValue) {
      this.element.value = this.partialFormat(keyInfo.newValue);

      const lengthIncrease = keyInfo.newValue.length - keyInfo.currentValue.length;
      const offset = this.calculateOffset(
        keyInfo.newValue,
        this.element.value,
        keyInfo.caretStart + lengthIncrease
      );
      this.setCaret(keyInfo.caretStart + lengthIncrease + offset);
    }
  }

  //==================//
  //     HANDLERS     //
  //==================//
  handleNumber(keyInfo) {
    console.log('handle NUMBER');
    const allowedNumber =
      !(keyInfo.currentValue[0] === String.fromCharCode(CODES.MINUS.char)
      && keyInfo.caretStart === 0
      && keyInfo.caretEnd === 0);

    if (allowedNumber) {
      keyInfo.newValue = this.editString(keyInfo.currentValue, keyInfo.char, keyInfo.caretStart, keyInfo.caretEnd);
    }
    keyInfo.event.preventDefault();
  }
  handleMinus(keyInfo) {
    console.log('handle MINUS');
    const minusAllowed = keyInfo.caretStart === 0 &&
      (keyInfo.currentValue[0] !== String.fromCharCode(CODES.MINUS.char) || keyInfo.caretEnd > 0);

     if (minusAllowed) {
       keyInfo.newValue = this.editString(
         keyInfo.currentValue,
         String.fromCharCode(CODES.MINUS.char),
         keyInfo.caretStart,
         keyInfo.caretEnd
       );
     }
     keyInfo.event.preventDefault();
  }
  handleDecimal(keyInfo) {
    console.log('handle DECIMAL');
    const decimalIndex = keyInfo.currentValue.indexOf(String.fromCharCode(this.languageData.decimal.char));

    // If there is not already a decimal or the original would be replaced
    // Add the decimal
    const decimalAllowed =
      decimalIndex === -1 ||
        (decimalIndex >= this.element.selectionStart &&
         decimalIndex < this.selectionEnd);

    if (decimalAllowed)
    {
      keyInfo.newValue = this.editString(
        keyInfo.currentValue,
        String.fromCharCode(this.languageData.decimal.char),
        keyInfo.caretStart,
        keyInfo.caretEnd
      );
    }

    keyInfo.event.preventDefault();
  }
  handleShortcut(keyInfo) {
    console.log('handle SHORTCUT');
    const power = this.languageData.shortcuts[keyInfo.char.toLowerCase()];
    if (power) {
      keyInfo.newValue = numeral(keyInfo.currentValue).multiply(Math.pow(10, power)).format();
    }
    keyInfo.event.preventDefault();

    // HACK / TODO - Fix
    keyInfo.caretStart += power;
  }
}

export default Finput;
