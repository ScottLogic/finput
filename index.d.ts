import { ActionType, Key, Range } from "./src/constants";
import ValueHistory from "./src/valueHistory";

interface IState {
    value: string;
    caretStart: number;
    caretEnd: number;
    valid: boolean;
}

interface IKeyInfo {
    name: string;
    modifiers: string[];
}

interface IOptions {
    thousands: string;
    decimal: string;
    fixed: boolean;
    range: Range;
    scale: number;
    shortcuts: { [shortcut: string]: number };
    onInvalidKey: (event: KeyboardEvent) => void;
    onFocus: (event: FocusEvent) => ISelection | void;
}

interface IAction {
    type: ActionType;
    names: string[];
    modifiers?: Key[];
}

interface ISelection {
    start: number;
    end: number;
}

type ActionHandler = (currentState: IState, keyInfo: IKeyInfo, options: IOptions, history: ValueHistory) => IState;
