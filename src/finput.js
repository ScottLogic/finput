import keyHandlers from './keyHandlers';
import helpers from './helpers';
import ValueHistory from './valueHistory';
import {ACTION_TYPES, DRAG_STATES, RANGE} from './constants';

/**
 * CONSTANTS
 */
const DEFAULTS = {
  scale: 2,
  range: RANGE.ALL,
  fixed: true,
  thousands: ',',
  decimal: '.',
  shortcuts: {
    'k': 1000,
    'm': 1000000,
    'b': 1000000000
  },
  invalidKeyCallback: () => {}
};

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
   * @param {Options.scale} maximum number of decimal digits
   * @param {Options.range} Whether number can take any value or must be positive
   * @param {Options.fixed} After focus is lost - value is formatted to *scale* number of decimal places
   * @param {Options.thousands} Character to use for the thousands separator
   * @param {Options.decimal} Character to use for the decimal point
   * @param {Options.shortcuts} Object map of shortcut characters to multiplier (e.g. { k: 1000 })
   * @param {Options.invalidKeyCallback} Function callback that will be called on an invalid keypress
   * @param {Options.onFocusinCallback} Function callback that will be called via the onFocusin event
   */
  constructor(element, options) {
    this._element = element;
    this._options = {
      ...DEFAULTS,
      ...options
    };

    this._actionTypes = this.createActionTypes();
    this._history = new ValueHistory();

    this._listeners = {
      blur:     { element: this.element, handler: this.onFocusout.bind(this) },
      focus:    { element: this.element, handler: this.onFocusin.bind(this) },
      drop:     { element: this.element, handler: this.onDrop.bind(this) },
      paste:    { element: this.element, handler: this.onPaste.bind(this) },
      keydown:  { element: this.element, handler: this.onKeydown.bind(this) },
      input:    { element: this.element, handler: this.onInput.bind(this) },

      dragstart:    { element: document, handler: this.onDragstart.bind(this) },
      dragend:    { element: document, handler: this.onDragend.bind(this) }
    };

    // Setup listeners
    this.removeListeners();
    for (let e in this._listeners) {
      this._listeners[e].element.addEventListener(e, this._listeners[e].handler);
    }
  }

  // GETTERS
  get element() {
    return this._element;
  }

  get options() {
    return {
      ...this._options
    };
  }
  set options(options) {
    this._options = {
      ...this._options,
      ...options
    };
  }

  /**
   * Creates the correct action type to char/key codes array with the
   * correct decimal and thousand separator characters (depending on language)
   */
  createActionTypes() {
    return [
      {
        type: ACTION_TYPES.NUMBER,
        names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      },
      {
        type: ACTION_TYPES.MINUS,
        names: ['-']
      },
      {
        type: ACTION_TYPES.DECIMAL,
        names: [this.options.decimal, 'decimal']
      },
      {
        type: ACTION_TYPES.THOUSANDS,
        names: [this.options.thousands, 'separator']
      },
      {
        type: ACTION_TYPES.SHORTCUT,
        names: Object.keys(this.options.shortcuts)
      },
      {
        type: ACTION_TYPES.BACKSPACE,
        names: ['backspace']
      },
      {
        type: ACTION_TYPES.DELETE,
        names: [
          'delete', // Chrome & Firefox
          'del' // Edge & IE
        ]
      },
      {
        type: ACTION_TYPES.UNDO,
        names: ['z'],
        ctrl: true
      },
      {
        type: ACTION_TYPES.REDO,
        names: ['y'],
        ctrl: true
      }
    ]
  }
  
  /**
   * Determines what type of action needs to be dealt with from the current
   * keydown event. E.g. vertical arrow pressed, number pressed etc...
   * @param {e} Keyboard event
   */
  getActionType(event) {
    for (let actionType of this._actionTypes) {
      const index = actionType.names.indexOf(event.keyName);
      const typeMatch = index > -1;

      if (typeMatch && (actionType.modifierKey ? event.modifierKey : true)) {
        return actionType.type;
      }
    }
    return ACTION_TYPES.UNKNOWN;
  }

  getHandlerForAction(action) {
    const handlerForAction = {
      [ACTION_TYPES.NUMBER]: keyHandlers.onNumber,
      [ACTION_TYPES.DECIMAL]: keyHandlers.onDecimal,
      [ACTION_TYPES.THOUSANDS]: keyHandlers.onThousands,
      [ACTION_TYPES.MINUS]: keyHandlers.onMinus,
      [ACTION_TYPES.SHORTCUT]: keyHandlers.onShortcut,
      [ACTION_TYPES.BACKSPACE]: keyHandlers.onBackspace,
      [ACTION_TYPES.DELETE]: keyHandlers.onDelete,
      [ACTION_TYPES.UNDO]: keyHandlers.onUndo,
      [ACTION_TYPES.REDO]: keyHandlers.onRedo,
      [ACTION_TYPES.UNKNOWN]: keyHandlers.onUnknown
    };

    return handlerForAction[action];
  }

  /**
   * Get numerical value of the given value
   * @param {value} Value to convert
   */
  getRawValue(value) {
    return helpers.formattedToRaw(value, this.options);
  }


  /**
   * Sets the value, fully formatted, for the input
   * @param {val} New value to set
   * @param {notNull} When true, restricts setting the value if it is null.
   */
  setValue(val, notNull) {
    const newValue = helpers.fullFormat(val, this.options);

    if (notNull ? val : true) {
      this.element.value = newValue;
      this.element.rawValue = this.getRawValue(this.element.value);
      this._history.addValue(newValue);
    }
  }

  /**
   * Sets and formats the value for the input
   * @param {val} New value to set
   */
  setRawValue(val) {
    let value;
    if (!val) {
      value = '';
    } else if (typeof val === 'number' && !isNaN(val)) {
      value = helpers.rawToFormatted(val, this.options);
    } else if (typeof val === 'string') {
      value = val;
    } else {
      return;
    }

    const newValue = helpers.parseString(value, this.options);
    this.setValue(newValue, false);
  }

  /**
   * Returns whether a modifier key has been pressed
   * 
   * On macOS the Command (meta) key is the modifier key.
   * On Windows the Control (ctrl) key is the modifier key.
   * Note that on Windows the meta key is the Windows key.
   * 
   * @param {e} Key event 
   */
  isModifierKeyPressed(e) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    return isMac ? e.metaKey : e.ctrlKey;
  }

  //
  // EVENT HANDLERS
  //

  /**
   * On focusing OUT of the input - format fully
   * @param {e} Focus event
   */
  onFocusout(e) {
    this.setValue(this.element.value);
  }

  /**
   * On focusing IN of the input
   * DEFAULT:  Select all text
   * @param {e} Focus event
   */
  onFocusin(e) {
    if(this.options.onFocusinCallback){
      let selection = this.options.onFocusinCallback(e);
      if(selection){
        this.element.selectionStart = selection.start;
        this.element.selectionEnd = selection.end;
      }
    }
    else {
      this.element.selectionStart = 0;
      this.element.selectionEnd = this.element.value.length;
    }
  }

  /**
   * On dropping something into the input - replace the WHOLE value
   * with this new value
   * @param {e} Drag event
   */
  onDrop(e) {
    switch (this._dragState) {
      case DRAG_STATES.INTERNAL:
        // This case is handled by the 'onInput' function
        break;
      case DRAG_STATES.EXTERNAL:
        const val = helpers.parseString(e.dataTransfer.getData('text'), this.options);
        this.setValue(val, true);
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
    this._dragState = (e.target === this.element)
      ? DRAG_STATES.INTERNAL
      : DRAG_STATES.EXTERNAL;
  }

  /**
   * On end of ANY drag on page
   * @param {e} Drag event
   */
  onDragend(e) {
    this._dragState = DRAG_STATES.NONE;
  }

  /**
   * On pasting something into the input
   * @param {e} Clipboard event
   */
  onPaste(e) {
    // paste uses a DragEvent on IE and clipboard data is stored on the window
    const clipboardData = e.clipboardData || window.clipboardData;
    const val = helpers.parseString(clipboardData.getData('text'), this.options);
    this.setValue(val, true);
    e.preventDefault();
  }

  /**
   * On pressing any key inside the input
   * @param {e} Keyboard event
   */
  onKeydown(e) {
    const currentState = {
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      value: this.element.value,
      valid: true
    };
    const keyInfo = {
      keyName: e.key.toLowerCase(),
      modifierKey: this.isModifierKeyPressed(e)
    };

    const actionType = this.getActionType(keyInfo);
    const handler = this.getHandlerForAction(actionType);
    const newState = handler(currentState, keyInfo, this.options, this._history);

    if (!newState.valid) {
      this.options.invalidKeyCallback(e);
      e.preventDefault();
      return;
    }

    const shouldHandleValue = actionType !== ACTION_TYPES.UNKNOWN;
    if (!shouldHandleValue) {
      return;
    }

    e.preventDefault();

    const valueWithThousandsDelimiter = helpers.partialFormat(newState.value, this.options);
    const valueWithoutThousandsDelimiter = newState.value;

    this.element.value = valueWithThousandsDelimiter;
    this.element.rawValue = this.getRawValue(this.element.value);

    const offset = helpers.calculateOffset(
      valueWithoutThousandsDelimiter,
      valueWithThousandsDelimiter,
      newState.caretStart,
      this.options
    );
    const newCaretPos = newState.caretStart + offset;
    this.element.setSelectionRange(newCaretPos, newCaretPos);
    
    const shouldRecord = actionType !== ACTION_TYPES.UNDO && actionType !== ACTION_TYPES.REDO;
    if (shouldRecord) {
      this._history.addValue(valueWithThousandsDelimiter);
    }
  }

  /**
   * Backup event if input changes for any other reason, just format value
   * @param {e} Event
   */
  onInput(e) {
    this.setValue(this.element.value);
  }

  /**
   * Removes all listeners from the input
   */
  removeListeners() {
    for (let e in this._listeners) {
      this._listeners[e].element.removeEventListener(e, this._listeners[e].handler);
    }
  }
}

// Factory function
export default function(element, options) {

  if (!element) {
    throw 'Input element must be supplied as first argument';
  }

  const input = new Finput(element, options || {});
  element.setRawValue = (v) => input.setRawValue(v);
  element.setValue = (v) => input.setValue(v);
  element.getOptions = () => input.options;
  element.setOptions = (o) => input.options = o;

  return () => {
    input.removeListeners();
    delete element.setRawValue;
    delete element.setValue;
    delete element.getOptions;
    delete element.setOptions;
  }
};
