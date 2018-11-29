import { ActionType } from "./constants";
import * as keyUtils from "./key";
import * as keyHandlers from "./keyHandlers";

import { ActionHandler, IAction, IKeyInfo, IOptions } from "../index";

const createActions = (options: IOptions): IAction[] => [
    {
        names: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        type: ActionType.NUMBER,
    },
    {
        names: ["-"],
        type: ActionType.MINUS,
    },
    {
        names: [options.decimal, "decimal"],
        type: ActionType.DECIMAL,
    },
    {
        names: [options.thousands, "separator"],
        type: ActionType.THOUSANDS,
    },
    {
        names: Object.keys(options.shortcuts),
        type: ActionType.SHORTCUT,
    },
    {
        names: ["backspace"],
        type: ActionType.BACKSPACE,
    },
    {
        names: [
            "delete", // Chrome & Firefox
            "del", // Edge & IE
        ],
        type: ActionType.DELETE,
    },
    {
        modifiers: [keyUtils.getHistoryKey()],
        names: ["z"],
        type: ActionType.UNDO,
    },
    {
        modifiers: [keyUtils.getHistoryKey()],
        names: ["y"],
        type: ActionType.REDO,
    },
];

export const getActionType = (keyInfo: IKeyInfo, options: IOptions): ActionType => {
    const actionTypes = createActions(options);

    const foundType = actionTypes.find((actionType) =>
        actionType.names.indexOf(keyInfo.name) > -1 &&
        JSON.stringify(keyInfo.modifiers) === JSON.stringify(keyInfo.modifiers),
    );

    return foundType ? foundType.type : ActionType.UNKNOWN;
};

export const getHandlerForAction = (action: ActionType): ActionHandler => {
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
