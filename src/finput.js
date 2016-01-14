// Copyright Ali Sheehan-Dare, all rights and profits reserved.

import numeral from 'numeral';
import keyHandlers from './keyHandlers';
import helpers from './helpers';
import {CODES, ACTION_TYPES, DRAG_STATES} from './constants';

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
  valueStep: 1,
  droppableClass: 'finput-droppable'
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
   * @param {Options.droppableClass} Class to give to the input when text drag event has started on the page
   */
  constructor(element, options) {
    this._element = element;
    this._options = Object.assign(options, DEFAULTS);
    this._languageData = languageData[this.options.lang];
    this._charTypes = this.createCharTypes();

    numeral.defaultFormat(this.options.format);

    // Setup listeners
    this.element.addEventListener('blur', (e) => this.onFocusout(e));
    this.element.addEventListener('focus', (e) => this.onFocusin(e));
    this.element.addEventListener('drop', (e) => this.onDrop(e));
    this.element.addEventListener('beforepaste', (e) => this.onPaste(e));
    this.element.addEventListener('paste', (e) => this.onPaste(e));
    this.element.addEventListener('keydown', (e) => this.onKeydown(e));
    this.element.addEventListener('input', (e) => this.onInput(e));

    // Dragging listeners
    // Keep track of whether a drag started internally or externally
    document.addEventListener('dragstart', (e) => this.onDragstart(e));
    document.addEventListener('dragend', (e) => this.onDragend(e));

    this.element.addEventListener('dragenter', (e) => this.onDragenter(e));
    this.element.addEventListener('dragleave', (e) => this.onDragleave(e));
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
  get dragState() {
    return this._dragState;
  }

  // SETTERS
  set dragState(state) {
    this._dragState = state;
  }

  createCharTypes() {
    return [
      {
        name: ACTION_TYPES.NUMBER,
        minCode: { key: 48, char: 48 },
        maxCode: { key: 57, char: 57 }
      },
      {
        name: ACTION_TYPES.MINUS,
        code: CODES.MINUS
      },
      {
        name: ACTION_TYPES.DECIMAL,
        code: this.languageData.decimal
      },
      {
        name: ACTION_TYPES.DELIMITER,
        code: this.languageData.delimiter
      },
      {
        name: ACTION_TYPES.SHORTCUT,
        CODES: Object.keys(this.languageData.shortcuts).map((s) => {
          const code = s.toUpperCase().charCodeAt(0);
          return { key: code, code: code };
        })
      },
      {
        name: ACTION_TYPES.BACKSPACE,
        code: CODES.BACKSPACE
      },
      {
        name: ACTION_TYPES.DELETE,
        code: CODES.DELETE
      },
      {
        name: ACTION_TYPES.HORIZONTAL_ARROW,
        CODES: [CODES.RIGHT_ARROW, CODES.LEFT_ARROW]
      },
      {
        name: ACTION_TYPES.VERTICAL_ARROW,
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
    return ACTION_TYPES.UNKNOWN;
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
    if (val.length === 1) {
      return val == 0 ? 0 : null;
    } else {
      const numeralVal = numeral(val);
      return isNaN(numeralVal.value()) ? null : numeralVal.format();
    }
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

  //
  // EVENT HANDLERS
  //

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
   * On dropping something into the input - replace the WHOLE value
   * with this new value
   */
  onDrop(e) {
    console.log('Drop event', e);
    const oldValue = this.element.value;

    switch (this.dragState) {
      case DRAG_STATES.INTERNAL:

        break;
      case DRAG_STATES.EXTERNAL:
        const newValue = this.fullFormat(e.dataTransfer.getData('text'));
        this.element.value = newValue || oldValue;
        e.preventDefault();
        break;
      default:
        // Do nothing;
        break;
    }
  }

  /**
   * On start of ANY drag on page
   */
  onDragstart(e) {
    this.dragState = (e.target === this.element)
      ? DRAG_STATES.INTERNAL
      : DRAG_STATES.EXTERNAL;
    if (this.dragState === DRAG_STATES.EXTERNAL) {
      this.element.classList.add(this.options.droppableClass);
    }
    console.log('Drag STARTED', this.dragState, e);
  }
  /**
   * On end of ANY drag on page
   */
  onDragend(e) {
    console.log('Drag ENDED', this.dragState, e);
    this.dragState = DRAG_STATES.NONE;
    this.element.classList.remove(this.options.droppableClass);
  }
  /**
   * On entering or leaving the input
   */
  onDragenter(e) {
    console.log('Drag ENTER', this.dragState, e);

    // if (this.dragState === DRAG_STATES.EXTERNAL) {
    //   this.element.selectionStart = 0;
    //   this.element.selectionEnd = this.element.value.length;
    // }
  }
  onDragleave(e) {
    console.log('Drag LEAVE', this.dragState, e);

    if (this.dragState === DRAG_STATES.EXTERNAL) {
      this.element.selectionStart = this.element.value.length;
    }
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
      case ACTION_TYPES.NUMBER:
        keyHandlers.onNumber(keyInfo);
        break;
      case ACTION_TYPES.DECIMAL:
        keyHandlers.onDecimal(keyInfo, this.languageData);
        break;
      case ACTION_TYPES.MINUS:
        keyHandlers.onMinus(keyInfo);
        break;
      case ACTION_TYPES.SHORTCUT:
        keyHandlers.onShortcut(keyInfo, this.languageData);
        break;
      case ACTION_TYPES.HORIZONTAL_ARROW:
        // Default behaviour
        console.log('HORIZONTAL ARROW');
        break;
      case ACTION_TYPES.VERTICAL_ARROW:
        keyHandlers.onVerticalArrow(keyInfo, this.options.valueStep);
        break;
      case ACTION_TYPES.BACKSPACE:
        keyHandlers.onBackspace(keyInfo);
        break;
      case ACTION_TYPES.DELETE:
        keyHandlers.onDelete(keyInfo, this.languageData);
        break;
      // case ACTION_TYPES.CLIPBOARD:
      //   if (e.ctrlKey) {
      //   }
      //   break;
      default:
        console.log("UNKNOWN");
        e.preventDefault();
        return;
    }

    this.element.value = this.partialFormat(keyInfo.newValue);

    const offset = this.calculateOffset(
      keyInfo.newValue,
      this.element.value,
      keyInfo.caretStart
    );
    this.setCaret(keyInfo.caretStart + offset);
  }
  /**
   * Backup event if input changes for any other reason, just format value
   */
  onInput() {
    const currentValue = this.element.value;
    const newValue = this.fullFormat(currentValue);

    this.element.value = newValue || currentValue;
  }

}

export default Finput;
