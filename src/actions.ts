import { ActionType } from "./constants";
import * as keyUtils from "./key";
import * as keyHandlers from "./keyHandlers";

import { IActionType, IKeyInfo, IOptions } from "../index";

// Todo: This ActionType has an inner type of type with same name?
const createActionTypes = (options: IOptions): IActionType[] => [
    {
        modifierKeys: [],
        names: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        type: ActionType.NUMBER,
    },
    {
        modifierKeys: [],
        names: ["-"],
        type: ActionType.MINUS,
    },
    {
        modifierKeys: [],
        names: [options.decimal, "decimal"],
        type: ActionType.DECIMAL,
    },
    {
        modifierKeys: [],
        names: [options.thousands, "separator"],
        type: ActionType.THOUSANDS,
    },
    {
        modifierKeys: [],
        names: Object.keys(options.shortcuts),
        type: ActionType.SHORTCUT,
    },
    {
        modifierKeys: [],
        names: ["backspace"],
        type: ActionType.BACKSPACE,
    },
    {
        modifierKeys: [],
        names: [
            "delete", // Chrome & Firefox
            "del", // Edge & IE
        ],
        type: ActionType.DELETE,
    },
    {
        modifierKeys: [keyUtils.getHistoryKey()],
        names: ["z"],
        type: ActionType.UNDO,
    },
    {
        modifierKeys: [keyUtils.getHistoryKey()],
        names: ["y"],
        type: ActionType.REDO,
    },
];

export const getActionType = (keyInfo: IKeyInfo, options: IOptions): ActionType => {
    const actionTypes = createActionTypes(options);

    const foundType = actionTypes.find((actionType) =>
        actionType.names.indexOf(keyInfo.keyName) > -1 &&
        JSON.stringify(actionType.modifierKeys) === JSON.stringify(keyInfo.modifierKeys),
    );

    return foundType ? foundType.type : ActionType.UNKNOWN;
};

// TODO: consistent type for handler functions?
export const getHandlerForAction = (action: ActionType): any => {
    const handlerForAction = {
        [ActionType.NUMBER]: keyHandlers.onNumber,
        [ActionType.DECIMAL]: keyHandlers.onDecimal,
        [ActionType.THOUSANDS]: keyHandlers.onThousands,
        [ActionType.MINUS]: keyHandlers.onMinus,
        [ActionType.SHORTCUT]: keyHandlers.onShortcut,
        [ActionType.BACKSPACE]: keyHandlers.onBackspace,
        [ActionType.DELETE]: keyHandlers.onDelete,
        [ActionType.UNDO]: keyHandlers.onUndo,
        [ActionType.REDO]: keyHandlers.onRedo,
        [ActionType.UNKNOWN]: keyHandlers.onUnknown,
    };

    return handlerForAction[action];
};
