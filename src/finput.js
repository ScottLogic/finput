// Copyright Ali Sheehan-Dare, all rights and profits reserved.

import numeral from 'numeral';
import keyHandlers from './keyHandlers';
import helpers from './helpers';
import ValueHistory from './valueHistory';
import {CODES, ACTION_TYPES, DRAG_STATES, DELIMITER_STRATEGIES} from './constants';


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
    delimiter: [CODES.COMMA],
    decimal: [CODES.DOT, CODES.NUMPAD_DOT]
  }
}

const DEFAULTS = {
  format: '0,0.00',
  lang: 'en',
  maxValue: 10e+12,
  minValue: -10e+12,
  maxLength: 15,
  valueStep: 1,
  droppableClass: 'finput-droppable',
  delimiterDeleteStrategy: DELIMITER_STRATEGIES.SKIP
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
   * @param {Options.currency} Optional currency to prepend to value
   * @param {Options.lang} Language (used in letter abbreviations etc...)
   * @param {Options.maxValue} Limit input value to a maximum value
   * @param {Options.minValue} Limit input value to a minimum value
   * @param {Options.maxDigits} Limit input value to a maximum number of digits
   * @param {Options.valueStep OR false} Change how much the value changes when pressing up/down arrow keys
   * @param {Options.droppableClass} Class to give to the input when text drag event has started on the page
   * @param {Options.delimiterDeleteStrategy} Behaviour to apply when deleting or backspacing a delimiter
   */
  constructor(element, options) {
    this._element = element;
    this._options = Object.assign(DEFAULTS, options);
    this._languageData = languageData[this.options.lang];
    this._actionTypes = this.createActionTypes();
    this._history = new ValueHistory();

    numeral.defaultFormat(this.options.format);

    // Setup listeners
    this.element.addEventListener('blur', (e) => this.onFocusout(e));
    this.element.addEventListener('focus', (e) => this.onFocusin(e));
    this.element.addEventListener('drop', (e) => this.onDrop(e));
    this.element.addEventListener('paste', (e) => this.onPaste(e));
    this.element.addEventListener('keypress', (e) => this.onKeypress(e));
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
  get history() {
    return this._history;
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
        codes: CODES.NUMBERS
      },
      {
        name: ACTION_TYPES.MINUS,
        codes: [CODES.MINUS, CODES.NUM_MINUS]
      },
      {
        name: ACTION_TYPES.DECIMAL,
        codes: this.languageData.decimal
      },
      {
        name: ACTION_TYPES.DELIMITER,
        codes: this.languageData.delimiter
      },
      {
        name: ACTION_TYPES.SHORTCUT,
        codes: Object.keys(this.languageData.shortcuts).map((s) => {
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
        codes: [CODES.RIGHT_ARROW, CODES.LEFT_ARROW]
      },
      {
        name: ACTION_TYPES.VERTICAL_ARROW,
        codes: [CODES.UP_ARROW, CODES.DOWN_ARROW]
      },
      {
        name: ACTION_TYPES.UNDO,
        code: CODES.UNDO,
        ctrl: true
      },
      {
        name: ACTION_TYPES.REDO,
        code: CODES.REDO,
        ctrl: true
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
      let codes;

      if (type.code) {
        typeMatch = type.code.key === code;
        codes = type.code;
      } else if (type.codes) {
        const index = type.codes.map((c) => c.key).indexOf(code);
        typeMatch = index > -1;
        codes = type.codes[index];
      }

      if (typeMatch && (type.ctrl ? e.ctrlKey : true)) {
        return {
          name: type.name,
          codes: codes
        };
      }
    }
    return { name: ACTION_TYPES.UNKNOWN };
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

  /**
   * Sets the value, fully formatted, for the input
   * @param {val} New value to set
   */
  setValue(val) {
    const newValue = helpers.fullFormat(val, this.options.format, this.options.currency);
    const isValueValid = this.checkValueSizing(newValue);
    const valueCanChange = (newValue && isValueValid);

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
  onFocusout(e) {
    console.log('Focus OUT event', e);
    const valueChanged = this.setValue(this.element.value);
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

    switch (this.dragState) {
      case DRAG_STATES.INTERNAL:
        // This case is handled by the 'onInput' function
        break;
      case DRAG_STATES.EXTERNAL:
        const valueChanged = this.setValue(e.dataTransfer.getData('text'));
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

    const valueChanged = this.setValue(potentialValue);
    e.preventDefault();
  }
  onKeypress(e) {
   console.log('keypress', e);
  }
  /**
   * On pressing any key inside the input
   * @param {e} Keyboard event
   */
  onKeydown(e) {
    console.log('keydown', e);
    const keyInfo = {
      event: e,
      code: e.which || e.keyCode,
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      currentValue: this.element.value,
      newValue: this.element.value
    }

    const actionType = this.getActionType(e);
    const codes = actionType.codes;
    keyInfo.char = codes && String.fromCharCode(codes.char);

    switch (actionType.name) {
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
        return;
      case ACTION_TYPES.VERTICAL_ARROW:
        keyHandlers.onVerticalArrow(keyInfo, this.options.valueStep);
        break;
      case ACTION_TYPES.BACKSPACE:
        keyHandlers.onBackspace(keyInfo, this.options.delimiterDeleteStrategy, this.languageData.delimiter[0]);
        break;
      case ACTION_TYPES.DELETE:
        keyHandlers.onDelete(keyInfo, this.options.delimiterDeleteStrategy, this.languageData.delimiter[0]);
        break;
      case ACTION_TYPES.UNDO:
        keyHandlers.onUndo(this, e);
        return;
      case ACTION_TYPES.REDO:
        keyHandlers.onRedo(this, e);
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

    const newValue = helpers.partialFormat(keyInfo.newValue, this.options.currency);
    const currentValue = this.element.value;
    const isValueValid = this.checkValueSizing(newValue);

    this.element.value = isValueValid ? newValue : this.element.value;

    if (isValueValid) {
      const offset = helpers.calculateOffset(
        currentValue,
        this.element.value,
        keyInfo.caretStart,
        this.options.currency,
        this.languageData
      );
      const newCaretPos = keyInfo.caretStart + offset;
      this.element.setSelectionRange(newCaretPos, newCaretPos);
      this.history.addValue(newValue);
    }
  }
  /**
   * Backup event if input changes for any other reason, just format value
   * @param {e} Event
   */
  onInput(e) {
    console.log('on INPUT', e);
    const valueChanged = this.setValue(this.element.value);
  }

}

export default Finput;
