// Copyright Ali Sheehan-Dare, all rights and profits reserved.

import numeral from 'numeral';

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
    delimiter: ',',
    decimal: '.'
  }
}
const DEFAULTS = {
  format: '0,0[.]00',
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

    this.languageData = languageData[this.options.lang];
    this.validCharRegex = this.generateValidCharRegex(this.languageData);

    numeral.defaultFormat(this.options.format);

    // Setup listeners
    this.element.addEventListener('keypress', (e) => this.onKeypress(e));
    this.element.addEventListener('input', (e) => this.onInput(e));
    this.element.addEventListener('blur', (e) => this.onFocusout(e));
    this.element.addEventListener('focus', (e) => this.onFocusin(e));
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

  // HELPERS
  isCharValid(keyInfo) {
    return keyInfo.char.match(this.validCharRegex);
  }
  isNumberValid(keyInfo) {
    return !isNaN(numeral(keyInfo.potentialVal));
  }
  generateValidCharRegex(languageData) {
    return new RegExp(`\[\\d\\-\\`
      + `${this.languageData.decimal}`
      + `${Object.keys(this.languageData.shortcuts).join('')}`
      + `\]`
    );
  }
  checkForShortcut(keyInfo) {
    const zeros = this.languageData.shortcuts[keyInfo.char];
    if (zeros) {
      keyInfo.charsToAdd = Array(zeros + 1).join('0');
      keyInfo.potentialVal = this.editString(
        keyInfo.originalVal,
        keyInfo.charsToAdd,
        keyInfo.caretStart,
        keyInfo.caretEnd
      );
    }
  }

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
    return numeral(val).format();
  }
  /**
   * Partially format the value, only adding commas as needed (Done on keypress/keyup)
   */
  partialFormat(val) {
    let str = val.replace(/\,/g, '');
    const startIndex = str.indexOf('.') > -1
      ? str.indexOf('.') - 1
      : str.length - 1;

    // i must be greater than zero because number cannot start with comma
    let i = startIndex;
    let j = 1;
    for (i, j; i > 0; i--, j++) {
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

    this.checkForShortcut(keyInfo);
    // this.checkValueSize(keyInfo);
    // this.checkValueLength(this.partialFormat(keyInfo.potentialVal));

    this.setValue(keyInfo);
  }
  // Force format on every change of input (done by setValue function)
  onInput(e) {
    console.log(e);
    const keyInfo = {
      event: e,
      char: '',
      charsToAdd: '',
      caretStart: this.element.selectionStart,
      originalVal: `${this.element.value}`
    }

    this.setValue(keyInfo);
  }
  /**
   * On focusOUT of the input - fully format the value
   */
  onFocusout(e) {
    console.log(e);
    this.element.value = this.fullFormat(this.element.value);
  }
  /**
   * On focus of the input - Select all text
   */
  onFocusin(e) {
    console.log(e);
    this.element.selectionStart = 0;
    this.element.selectionEnd = this.element.value.length;
  }
}

export default Finput;
