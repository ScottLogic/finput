import { ACTION_TYPES } from './constants';
import keyHandlers from './keyHandlers';
import key from './key';
import isEqual from 'lodash/isEqual';

/**
 * Create an array of action types with key names that map to these types and
 * whether the modifier key should be pressed.
 */
const createActionTypes = (options) => [
  {
    type: ACTION_TYPES.NUMBER,
    names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.MINUS,
    names: ['-'],
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.DECIMAL,
    names: [options.decimal, 'decimal'],
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.THOUSANDS,
    names: [options.thousands, 'separator'],
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.SHORTCUT,
    names: Object.keys(options.shortcuts),
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.BACKSPACE,
    names: ['backspace'],
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.DELETE,
    names: [
      'delete', // Chrome & Firefox
      'del' // Edge & IE
    ],
    modifierKeys: []
  },
  {
    type: ACTION_TYPES.UNDO,
    names: ['z'],
    modifierKeys: [key.getHistoryKey()]
  },
  {
    type: ACTION_TYPES.REDO,
    names: ['y'],
    modifierKeys: [key.getHistoryKey()]
  }
];

/**
 * Determines what type of action needs to be dealt with from the current
 * key information. E.g. vertical arrow pressed, number pressed etc...
 * @param {keyInfo} Information about the pressed key
 */
export const getActionType = (keyInfo, options) => {
  for (let actionType of createActionTypes(options)) {
    const typeMatch = actionType.names.indexOf(keyInfo.keyName) > -1
    let modifierMatch = isEqual(actionType.modifierKeys, keyInfo.modifierKeys);

    if (typeMatch && modifierMatch) {
      return actionType.type;
    }
  }
  return ACTION_TYPES.UNKNOWN;
}

export const getHandlerForAction = (action) => {
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


