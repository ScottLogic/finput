// Copyright Ali Sheehan-Dare, all rights and profits reserved.

import numeral from 'numeral';
import keyHandlers from './keyHandlers';
import helpers from './helpers';
import {CODES, CHAR_TYPES} from './constants';

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
  maxLength: 30,
  valueStep: 1
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
   * @param {Options.valueStep OR false} Change how much the value changes when pressing up/down arrow keys
   */
  constructor(element, options) {
    this._element = element;
    this._options = Object.assign(options, DEFAULTS);
    this._languageData = languageData[this.options.lang];
    this._charTypes = this.createCharTypes();

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

  createCharTypes() {
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
        CODES: Object.keys(this.languageData.shortcuts).map((s) => {
          const code = s.toUpperCase().charCodeAt(0);
          return { key: code, code: code };
        })
      },
      {
        name: CHAR_TYPES.BACKSPACE,
        code: CODES.BACKSPACE
      },
      {
        name: CHAR_TYPES.DELETE,
        code: CODES.DELETE
      },
      {
        name: CHAR_TYPES.HORIZONTAL_ARROW,
        CODES: [CODES.RIGHT_ARROW, CODES.LEFT_ARROW]
      },
      {
        name: CHAR_TYPES.VERTICAL_ARROW,
        CODES: [CODES.UP_ARROW, CODES.DOWN_ARROW]
      }
    ]
  }
  getKeyType(e) {
    const code = e.which;
    for (let type of this.charTypes) {
      let typeMatch = false;

      if (type.code) {
        typeMatch = type.code.key === code;
      } else if (type.CODES) {
        typeMatch = type.CODES.map((c) => c.key).indexOf(code) > -1;
      } else if (type.minCode && type.maxCode) {
        typeMatch = type.minCode.key <= code && code <= type.maxCode.key;
      }

      if (typeMatch) {
        return type.name;
      }
    }
    return CHAR_TYPES.UNKNOWN;
  }

  // Check potential value is not going to be too large or too small
  // in relation to limits set in options
  // checkValueSize(keyInfo) {
  //   const numberValue = numeral().unformat(keyInfo.potentialVal);
  //
  //   // If the value is too large or too small, then set input value back
  //   // to original value
  //   if (numberValue > this.options.maxValue) {
  //     keyInfo.charsToAdd = '';
  //   }
  //   if (numberValue < this.options.minValue) {
  //     keyInfo.charsToAdd = '';
  //   }
  // }
  // checkValueLength(val) {
  //   if (val.length > this.options.maxLength) {
  //     keyInfo.charsToAdd = '';
  //   }
  // }


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
        str = helpers.editString(str, ',', i);
      }
    }
    return str;
  }
  setCaret(pos) {
    this.element.setSelectionRange(pos, pos);
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

  /**
   * On focusing OUT of the input - format fully
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
  /**
   * On pasting something into the input
   */
  onPaste(e) {
    console.log('Paste event', e);
    const chars = e.clipboardData.getData('text');
    const potentialValue = helpers.editString(
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
  /**
   * On pressing a key in the input
   */
  onKeydown(e) {
    console.log(e);
    const keyInfo = {
      event: e,
      code: e.which || e.keyCode,
      char: String.fromCharCode(e.which),
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      currentValue: this.element.value,
      newValue: this.element.value
    }

    switch (this.getKeyType(e)) {
      case CHAR_TYPES.NUMBER:
        keyHandlers.onNumber(keyInfo);
        break;
      case CHAR_TYPES.DECIMAL:
        keyHandlers.onDecimal(keyInfo, this.languageData);
        break;
      case CHAR_TYPES.MINUS:
        keyHandlers.onMinus(keyInfo);
        break;
      case CHAR_TYPES.SHORTCUT:
        keyHandlers.onShortcut(keyInfo, this.languageData);
        break;
      case CHAR_TYPES.HORIZONTAL_ARROW:
        // Default behaviour
        console.log('HORIZONTAL ARROW');
        break;
      case CHAR_TYPES.VERTICAL_ARROW:
        keyHandlers.onVerticalArrow(keyInfo, this.options.valueStep);
        break;
      case CHAR_TYPES.BACKSPACE:
        keyHandlers.onBackspace(keyInfo);
        break;
      case CHAR_TYPES.DELETE:
        keyHandlers.onDelete(keyInfo, this.languageData);
        break;
      default:
        console.log("UNKNOWN");
        e.preventDefault();
    }

    this.element.value = this.partialFormat(keyInfo.newValue);

    const offset = this.calculateOffset(
      keyInfo.newValue,
      this.element.value,
      keyInfo.caretStart
    );
    this.setCaret(keyInfo.caretStart + offset);
  }

}

export default Finput;
