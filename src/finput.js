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
  format: '$0.0a',
  lang: 'en',
  maxValue: 10e+12,
  minValue: -10e+12,
  maxLength: 15,
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
    this._actionTypes = this.createActionTypes();

    numeral.defaultFormat(this.options.format);

    // Setup listeners
    this.element.addEventListener('blur', (e) => this.onFocusout(e));
    this.element.addEventListener('focus', (e) => this.onFocusin(e));
    this.element.addEventListener('drop', (e) => this.onDrop(e));
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
  get actionTypes() {
    return this._actionTypes;
  }
  get dragState() {
    return this._dragState;
  }

  // SETTERS
  set dragState(state) {
    this._dragState = state;
  }

  /**
   * Creates the correct action type to char/key codes array with the
   * correct decimal and delimiter characters (depending on language)
   */
  createActionTypes() {
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
  /**
   * Determines what type of action needs to be dealt with from the current
   * keydown event. E.g. vertical arrow pressed, number pressed etc...
   * @param {e} Keyboard event
   */
  getActionType(e) {
    const code = e.which;
    for (let type of this.actionTypes) {
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

  /**
   * Check value is not too large or small
   * @param {val} Value to check
   */
  checkValueMagnitude(val) {
    const num = numeral().unformat(val);
    return num <= this.options.maxValue && num >= this.options.minValue;
  }
  /**
   * Check value is not too many characters long
   * @param {val} Value to check
   */
  checkValueLength(val) {
    const num = numeral().unformat(val);
    return num.toString().length <= this.options.maxLength
  }
  /**
   * Combines the above functions to decide whether the given value is not too
   * large or to many characters
   * @param {val} Value to check
   */
  checkValueSizing(val) {
    return this.checkValueLength(val) && this.checkValueMagnitude(val);
  }


  //
  // EVENT HANDLERS
  //

  /**
   * On focusing OUT of the input - format fully
   * @param {e} Focus event
   */
  onFocusout(e) {
    console.log('Focus OUT event', e);
    const newValue = helpers.fullFormat(this.element.value, this.options.format);
    const isValueValid = this.checkValueSizing(newValue);
    this.element.value = (newValue && isValueValid) ? newValue : this.element.value;

  }
  /**
   * On focus of the input - Select all text
   * @param {e} Focus event
   */
  onFocusin(e) {
    console.log('Focus IN event', e);
    this.element.selectionStart = 0;
    this.element.selectionEnd = this.element.value.length;
  }
  /**
   * On dropping something into the input - replace the WHOLE value
   * with this new value
   * @param {e} Drag event
   */
  onDrop(e) {
    console.log('Drop event', e);
    const oldValue = this.element.value;

    switch (this.dragState) {
      case DRAG_STATES.INTERNAL:
        // This case is handled by the 'onInput' function
        break;
      case DRAG_STATES.EXTERNAL:
        const newValue = helpers.fullFormat(e.dataTransfer.getData('text'), this.options.format);
        const isValueValid = this.checkValueSizing(newValue);
        this.element.value = (newValue && isValueValid) ? newValue : oldValue;
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
   * @param {e} Drag event
   */
  onDragend(e) {
    console.log('Drag ENDED', this.dragState, e);
    this.dragState = DRAG_STATES.NONE;
    this.element.classList.remove(this.options.droppableClass);
  }
  /**
   * On the dragged item entering the input
   * @param {e} Drag event
   */
  onDragenter(e) {
    console.log('Drag ENTER', this.dragState, e);
  }
  /**
   * On the dragged item leaving the input
   * @param {e} Drag event
   */
  onDragleave(e) {
    console.log('Drag LEAVE', this.dragState, e);

    if (this.dragState === DRAG_STATES.EXTERNAL) {
      this.element.selectionStart = this.element.value.length;
    }
  }
  /**
   * On pasting something into the input
   * @param {e} Clipboard event
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

    const newValue = helpers.fullFormat(potentialValue, this.options.format);
    const isValueValid = this.checkValueSizing(newValue);
    this.element.value = (newValue && isValueValid) ? newValue : this.element.value;

    e.preventDefault();
  }
  /**
   * On pressing any key inside the input
   * @param {e} Keyboard event
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

    switch (this.getActionType(e)) {
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
      default:
        console.log("UNKNOWN");
        // If ctrl key modifier is pressed then allow specific event handler
        // to handle this
        if (!e.ctrlKey) {
          e.preventDefault();
        }
        return;
    }

    const newValue = helpers.partialFormat(keyInfo.newValue);
    const isValueValid = this.checkValueSizing(newValue);

    this.element.value = isValueValid ? newValue : this.element.value;

    if (isValueValid) {
      const offset = helpers.calculateOffset(
        keyInfo.newValue,
        this.element.value,
        keyInfo.caretStart
      );
      const newCaretPos = keyInfo.caretStart + offset;
      this.element.setSelectionRange(newCaretPos, newCaretPos);
    }
  }
  /**
   * Backup event if input changes for any other reason, just format value
   * @param {e} Event
   */
  onInput(e) {
    console.log('on INPUT', e);
    const currentValue = this.element.value;
    const newValue = helpers.fullFormat(currentValue, this.options.format);
    const isValueValid = this.checkValueSizing(newValue);
    this.element.value = (newValue && isValueValid) ? newValue : currentValue;
  }

}

export default Finput;
