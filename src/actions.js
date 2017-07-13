import { ACTION_TYPES } from './constants';
import keyHandlers from './keyHandlers';

/**
 * Create an array of action types with key names that map to these types and
 * whether the modifier key should be pressed.
 */
const createActionTypes = (options) => [
  {
    type: ACTION_TYPES.NUMBER,
    names: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    modifierKey: false
  },
  {
    type: ACTION_TYPES.MINUS,
    names: ['-'],
    modifierKey: false
  },
  {
    type: ACTION_TYPES.DECIMAL,
    names: [this.options.decimal, 'decimal'],
    modifierKey: false
  },
  {
    type: ACTION_TYPES.THOUSANDS,
    names: [this.options.thousands, 'separator'],
    modifierKey: false
  },
  {
    type: ACTION_TYPES.SHORTCUT,
    names: Object.keys(this.options.shortcuts),
    modifierKey: false
  },
  {
    type: ACTION_TYPES.BACKSPACE,
    names: ['backspace'],
    modifierKey: false
  },
  {
    type: ACTION_TYPES.DELETE,
    names: [
      'delete', // Chrome & Firefox
      'del' // Edge & IE
    ],
    modifierKey: false
  },
  {
    type: ACTION_TYPES.UNDO,
    names: ['z'],
    modifierKey: true
  },
  {
    type: ACTION_TYPES.REDO,
    names: ['y'],
    modifierKey: true
  }
];

/**
 * Determines what type of action needs to be dealt with from the current
 * key information. E.g. vertical arrow pressed, number pressed etc...
 * @param {keyInfo} Information about the pressed key
 */
export const getActionType = (keyInfo, options) => {
  for (let actionType of createActionTypes(options)) {
    const index = actionType.names.indexOf(keyInfo.keyName);
    const typeMatch = index > -1;

    if (typeMatch && (actionType.modifierKey === keyInfo.modifierKey)) {
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


