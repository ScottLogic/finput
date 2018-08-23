import {ActionType, Key} from "./src/constants";

interface IState {
    value: string;
    caretStart: number;
    caretEnd: number;
    valid: boolean;
}

interface IKeyInfo {
    keyName: Key;
    modifierKeys: string[];
}

interface IOptions {
    thousands: string;
    decimal: string;
    fixed: boolean;
    range: number;
    scale: number;
    shortcuts: { [shortcut: string]: number }
}

interface IActionType {
    type: ActionType;
    names: string[];
    // TODO: does this need to be an array? seems like all options only have one
    modifierKeys: Key[];
}