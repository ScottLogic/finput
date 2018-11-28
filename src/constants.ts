// TODO: do these need to be string enum?
export enum Key {
    NUMPAD_ADD = "add",
    NUMPAD_SUBTRACT = "subtract",
    NUMPAD_MULTIPLY = "multiply",
    NUMPAD_DIVIDE = "divide",
    META = "metaKey",
    CTRL = "ctrlKey",
    SHIFT = "shiftKey",
    ALT = "altKey",
}

export enum ActionType {
    NUMBER = "NUMBER",
    SHORTCUT = "SHORTCUT",
    DECIMAL = "DECIMAL",
    THOUSANDS = "THOUSANDS",
    MINUS = "MINUS",
    UNKNOWN = "UNKNOWN",
    BACKSPACE = "BACKSPACE",
    DELETE = "DELETE",
    UNDO = "UNDO",
    REDO = "REDO",
}

export enum DragState {
    NONE = "NONE",
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL",
}

export enum Range {
    ALL = "ALL",
    POSITIVE = "POSITIVE",
}
