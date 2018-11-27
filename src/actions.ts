import {ActionType} from './constants';
import * as keyHandlers from './keyHandlers';
import key from './key';
import {IActionType, IKeyInfo, IOptions} from "../index";


// Todo: This ActionType has an inner type of type with same name?
const createActionTypes = (options: IOptions): IActionType[] => [
  {
    type: ActionType.NUMBER,
    names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    modifierKeys: []
  },
  {
    type: ActionType.MINUS,
    names: ['-'],
    modifierKeys: []
  },
  {
    type: ActionType.DECIMAL,
    names: [options.decimal, 'decimal'],
    modifierKeys: []
  },
  {
    type: ActionType.THOUSANDS,
    names: [options.thousands, 'separator'],
    modifierKeys: []
  },
  {
    type: ActionType.SHORTCUT,
    names: Object.keys(options.shortcuts),
    modifierKeys: []
  },
  {
    type: ActionType.BACKSPACE,
    names: ['backspace'],
    modifierKeys: []
  },
  {
    type: ActionType.DELETE,
    names: [
      'delete', // Chrome & Firefox
      'del' // Edge & IE
    ],
    modifierKeys: []
  },
  {
    type: ActionType.UNDO,
    names: ['z'],
    modifierKeys: [key.getHistoryKey()]
  },
  {
    type: ActionType.REDO,
    names: ['y'],
    modifierKeys: [key.getHistoryKey()]
  }
];

export const getActionType = (keyInfo: IKeyInfo, options: IOptions): ActionType => {
  const actionTypes = createActionTypes(options);

  const foundType = actionTypes.find((actionType) =>
      actionType.names.indexOf(keyInfo.keyName) > -1 &&
      JSON.stringify(actionType.modifierKeys) === JSON.stringify(keyInfo.modifierKeys)
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
    [ActionType.UNKNOWN]: keyHandlers.onUnknown
  };

  return handlerForAction[action];
};


