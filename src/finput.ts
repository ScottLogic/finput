import key from './key';
import * as helpers from './helpers';
import { getActionType, getHandlerForAction } from './actions';
import ValueHistory from './valueHistory';
import {ActionType, DragState, Range} from './constants';

const DEFAULTS = {
  scale: 2,
  range: Range.ALL,
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

type FinputElement = HTMLInputElement & { rawValue: number };

class Finput {
  private readonly _element: FinputElement;
  private _options: any;
  private readonly _history: ValueHistory;
  private readonly _listeners: { [key: string]: { element: HTMLInputElement | Document, handler: EventListenerObject }};
  private _dragState: DragState;

  constructor(element, options) {
    this._element = element;
    this._options = {
      ...DEFAULTS,
      ...options
    };

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

  getRawValue(value) {
    return helpers.formattedToRaw(value, this.options);
  }

  setValue(val, notNull) {
    const newValue = helpers.fullFormat(val, this.options);

    if (notNull ? val : true) {
      this.element.value = newValue;
      this.element.rawValue = this.getRawValue(this.element.value);
      this._history.addValue(newValue);
    }
  }

  setRawValue(val: any) {
    let value: string;
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

  onFocusout() {
    this.setValue(this.element.value, false);
  }

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

  onDrop(e) {
    switch (this._dragState) {
      case DragState.INTERNAL:
        // This case is handled by the 'onInput' function
        break;
      case DragState.EXTERNAL:
        const val = helpers.parseString(e.dataTransfer.getData('text'), this.options);
        this.setValue(val, true);
        e.preventDefault();
        break;
      default:
        // Do nothing;
        break;
    }
  }

  onDragstart(e) {
    this._dragState = (e.target === this.element)
      ? DragState.INTERNAL
      : DragState.EXTERNAL;
  }

  onDragend(e) {
    this._dragState = DragState.NONE;
  }

  onPaste(e: ClipboardEvent) {
    // paste uses a DragEvent on IE and clipboard data is stored on the window
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const val = helpers.parseString(clipboardData.getData('text'), this.options);
    this.setValue(val, true);
    e.preventDefault();
  }

  onKeydown(e: KeyboardEvent) {
    const currentState = {
      caretStart: this.element.selectionStart,
      caretEnd: this.element.selectionEnd,
      value: this.element.value,
      valid: true
    };
    const keyInfo = {
      keyName: e.key.toLowerCase(),
      modifierKeys: key.getPressedModifiers(e)
    };

    const actionType = getActionType(keyInfo as any, this.options);
    const handler = getHandlerForAction(actionType);
    const newState = handler(currentState, keyInfo, this.options, this._history);

    if (!newState.valid) {
      this.options.invalidKeyCallback();
      e.preventDefault();
      return;
    }

    const shouldHandleValue = actionType !== ActionType.UNKNOWN;
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
    
    const shouldRecord = actionType !== ActionType.UNDO && actionType !== ActionType.REDO;
    if (shouldRecord) {
      this._history.addValue(valueWithThousandsDelimiter);
    }
  }

  onInput() {
    this.setValue(this.element.value, false);
  }

  removeListeners() {
    for (let e in this._listeners) {
      this._listeners[e].element.removeEventListener(e, this._listeners[e].handler);
    }
  }
}

export default function(element, options) {

  if (!element) {
    throw 'Input element must be supplied as first argument';
  }

  const input = new Finput(element, options || {});
  element.setRawValue = (v) => input.setRawValue(v);
  element.setValue = (v) => input.setValue(v, false);
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
