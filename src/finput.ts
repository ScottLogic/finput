import { getActionType, getHandlerForAction } from "./actions";
import { ActionType, DragState, Range } from "./constants";
import * as helpers from "./helpers";
import * as keyUtils from "./key";
import ValueHistory from "./valueHistory";

import { IOptions } from "../index";

interface IListenerMap {
    [key: string]: { element: HTMLInputElement | Document, handler: EventListenerObject };
}

const noop = () => {/**/};

const DEFAULTS: IOptions = {
    decimal: ".",
    fixed: true,
    onFocusCallback: noop,
    onInvalidKeyCallback: noop,
    range: Range.ALL,
    scale: 2,
    shortcuts: {
        b: 1000000000,
        k: 1000,
        m: 1000000,
    },
    thousands: ",",
};

class Finput {
    public options: IOptions;
    private readonly element: HTMLInputElement;

    private readonly history: ValueHistory;
    private readonly listeners: IListenerMap;
    private dragState: DragState = DragState.NONE;

    constructor(element: HTMLInputElement, options: IOptions) {
        this.element = element;
        this.options = { ...DEFAULTS, ...options };

        this.history = new ValueHistory();

        this.listeners = {
            blur: { element: this.element, handler: this.onBlur.bind(this) },
            dragend: { element: document, handler: this.onDragend.bind(this) },
            dragstart: { element: document, handler: this.onDragstart.bind(this) },
            drop: { element: this.element, handler: this.onDrop.bind(this) },
            focus: { element: this.element, handler: this.onFocus.bind(this) },
            input: { element: this.element, handler: this.onInput.bind(this) },
            keydown: { element: this.element, handler: this.onKeydown.bind(this) },
            paste: { element: this.element, handler: this.onPaste.bind(this) },
        };

        // Setup listeners
        this.removeListeners();
        Object.keys(this.listeners)
            .forEach((key: string) => this.listeners[key].element.addEventListener(key, this.listeners[key].handler));
    }

    public setValue(val: string, notNull: boolean) {
        const newValue = helpers.fullFormat(val, this.options);

        if (notNull ? val : true) {
            this.element.value = newValue;
            this.history.addValue(newValue);
        }
    }

    public get rawValue() {
        return helpers.formattedToRaw(this.element.value, this.options);
    }

    public setRawValue(val: any) {
        let value: string;
        if (!val) {
            value = "";
        } else if (typeof val === "number" && !isNaN(val)) {
            value = helpers.rawToFormatted(val, this.options);
        } else if (typeof val === "string") {
            value = val;
        } else {
            return;
        }

        const newValue = helpers.parseString(value, this.options);
        this.setValue(newValue, false);
    }

    private onBlur() {
        this.setValue(this.element.value, false);
    }

    private onFocus(e: FocusEvent) {
        const selection = this.options.onFocusCallback(e);
        if (selection) {
            this.element.selectionStart = selection ? selection.start : 0;
            this.element.selectionEnd = selection ? selection.end : this.element.value.length;
        }
    }

    private onDrop(e: DragEvent) {
        switch (this.dragState) {
            case DragState.INTERNAL:
                // This case is handled by the 'onInput' function
                break;
            case DragState.EXTERNAL:
                const val = helpers.parseString(e.dataTransfer ? e.dataTransfer.getData("text") : "", this.options);
                this.setValue(val, true);
                e.preventDefault();
                break;
            default:
                // Do nothing;
                break;
        }
    }

    private onDragstart(e: DragEvent) {
        this.dragState = (e.target === this.element)
            ? DragState.INTERNAL
            : DragState.EXTERNAL;
    }

    private onDragend() {
        this.dragState = DragState.NONE;
    }

    private onPaste(e: ClipboardEvent) {
        // paste uses a DragEvent on IE and clipboard data is stored on the window
        const clipboardData = e.clipboardData || (window as any).clipboardData;
        const val = helpers.parseString(clipboardData.getData("text"), this.options);
        this.setValue(val, true);
        e.preventDefault();
    }

    private onKeydown(e: KeyboardEvent) {
        const currentState = {
            caretEnd: this.element.selectionEnd,
            caretStart: this.element.selectionStart,
            valid: true,
            value: this.element.value,
        };
        const keyInfo = {
            keyName: e.key.toLowerCase(),
            modifierKeys: keyUtils.getPressedModifiers(e),
        };

        const actionType = getActionType(keyInfo as any, this.options);
        const handler = getHandlerForAction(actionType);
        const newState = handler(currentState, keyInfo, this.options, this.history);

        if (!newState.valid) {
            this.options.onInvalidKeyCallback(e);
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

        const offset = helpers.calculateOffset(
            valueWithoutThousandsDelimiter,
            valueWithThousandsDelimiter,
            newState.caretStart,
            this.options,
        );
        const newCaretPos = newState.caretStart + offset;
        this.element.setSelectionRange(newCaretPos, newCaretPos);

        const shouldRecord = actionType !== ActionType.UNDO && actionType !== ActionType.REDO;
        if (shouldRecord) {
            this.history.addValue(valueWithThousandsDelimiter);
        }
    }

    private onInput() {
        this.setValue(this.element.value, false);
    }

    private removeListeners() {
        Object.keys(this.listeners)
            .forEach((key: string) =>
                this.listeners[key].element.removeEventListener(key, this.listeners[key].handler));
    }
}

export default (element: HTMLInputElement, options: IOptions) => new Finput(element, options);
