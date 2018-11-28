import { ActionType, Range, Key } from "./src/constants";

interface IState {
    value: string;
    caretStart: number;
    caretEnd: number;
    valid: boolean;
}

// TODO: Key interface doesn't list all Keys
interface IKeyInfo {
    keyName: string;
    modifierKeys: string[];
}

interface IOptions {
    thousands: string;
    decimal: string;
    fixed: boolean;
    range: Range;
    scale: number;
    shortcuts: { [shortcut: string]: number };
    onInvalidKeyCallback: (event: KeyboardEvent) => void;
    onFocusCallback: (event: FocusEvent) => ISelection | void;
}

interface IActionType {
    type: ActionType;
    names: string[];
    // TODO: does this need to be an array? seems like all options only have one
    modifierKeys: Key[];
}

// TODO: find corresponding DOM typing
interface ISelection {
    start: number;
    end: number;
}