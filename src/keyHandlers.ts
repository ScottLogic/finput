import { Key, Range } from './constants';
import * as helpers from './helpers';
import key from './key';
import {IKeyInfo, IState} from "../index";

export const onNumber = (currentState: IState, keyInfo: IKeyInfo, options) => {
  // Remove characters in current selection
  const tempCurrent = helpers.editString(currentState.value, '', currentState.caretStart, currentState.caretEnd);
  const tempNew = helpers.editString(currentState.value, keyInfo.keyName, currentState.caretStart, currentState.caretEnd);

  const allowedNumber =
    !(currentState.value[0] === '-'
      && currentState.caretStart === 0
      && currentState.caretEnd === 0)
    && helpers.allowedZero(tempCurrent, keyInfo.keyName, currentState.caretStart, options)
    && helpers.allowedDecimal(tempNew, options);

  const newState = { ...currentState };
  if (allowedNumber) {
    newState.value = helpers.editString(currentState.value, keyInfo.keyName, currentState.caretStart, currentState.caretEnd);
    newState.caretStart += 1;
  } else {
    newState.valid = false;
  }

  return newState;
};

export const onMinus = (currentState, keyInfo, options) => {
  const minusAllowed = currentState.caretStart === 0
    && (currentState.value[0] !== '-' || currentState.caretEnd > 0)
    && options.range !== Range.POSITIVE;

  const newState = { ...currentState };
  if (minusAllowed) {
    newState.value = helpers.editString(
      currentState.value,
      '-',
      currentState.caretStart,
      currentState.caretEnd
    );
    newState.caretStart += 1;
  } else {
    newState.valid = false;
  }

  return newState;
};

export const onDecimal = (currentState, keyInfo, options) => {
  const decimalIndex = currentState.value.indexOf(options.decimal);

  // If there is not already a decimal or the original would be replaced
  // Add the decimal
  const decimalAllowed =
    options.scale > 0
    && (decimalIndex === -1
      || (decimalIndex >= currentState.caretStart
        && decimalIndex < currentState.caretEnd))

  const newState = { ...currentState };
  if (decimalAllowed) {
    newState.value = helpers.editString(
      currentState.value,
      options.decimal,
      currentState.caretStart,
      currentState.caretEnd
    );
    newState.caretStart += 1;
  } else {
    newState.valid = false;
  }

  return newState;
};

export const onThousands = (currentState, keyInfo, options) => {
  const newState = { ...currentState };
  newState.valid = false;
  return newState;
};

export const onShortcut = (currentState, keyInfo, options) => {
  const multiplier = options.shortcuts[keyInfo.keyName] || 1;
  const adjustedVal = helpers.editString(currentState.value, '', currentState.caretStart, currentState.caretEnd);
  const rawValue = (helpers.formattedToRaw(adjustedVal, options) || 1) * multiplier;

  const newState = { ...currentState };
  if (multiplier) {
    // If number contains 'e' then it is too large to display
    if (rawValue.toString().indexOf('e') === -1) {
      newState.value = String(rawValue);
    }
    newState.caretStart = newState.value.length + Math.log10(1000);
  }

  return newState;
};

export const onBackspace = (currentState, keyInfo, options) => {
  const thousands = options.thousands;
  let firstHalf, lastHalf;

  const newState = { ...currentState };
  if (currentState.caretStart === currentState.caretEnd) {
    if (keyInfo.modifierKey) {
      // If CTRL key is held down - delete everything BEFORE caret
      firstHalf = '';
      lastHalf = currentState.value.slice(currentState.caretStart, currentState.value.length);
      newState.caretStart = 0;
    } else {
      // Assume as there is a comma then there must be a number before it
      let caretJump = 1;

      caretJump = ((currentState.caretStart - caretJump) >= 0) ? caretJump : 0;
      firstHalf = currentState.value.slice(0, currentState.caretStart - caretJump);
      lastHalf = currentState.value.slice(currentState.caretStart, currentState.value.length);
      newState.caretStart += -caretJump;
    }
  } else {
    // Same code as onDelete handler for deleting a selection range
    firstHalf = currentState.value.slice(0, currentState.caretStart);
    lastHalf = currentState.value.slice(currentState.caretEnd, currentState.value.length);
  }

  newState.value = firstHalf + lastHalf;

  return newState;
};

export const onDelete = (currentState, keyInfo, options) => {
  const thousands = options.thousands;
  let firstHalf, lastHalf;

  const newState = { ...currentState };
  if (currentState.caretStart === currentState.caretEnd) {
    const nextChar = currentState.value[currentState.caretStart];

    if (keyInfo.modifierKey) {
      // If CTRL key is held down - delete everything AFTER caret
      firstHalf = currentState.value.slice(0, currentState.caretStart);
      lastHalf = '';
    } else {
      // Assume as there is a comma then there must be a number after it
      const thousandsNext = nextChar === thousands;

      // If char to delete is thousands and number is not to be deleted - skip over it
      newState.caretStart += thousandsNext ? 1 : 0;

      const lastHalfStart = newState.caretStart
        + (thousandsNext ? 0 : 1);
      firstHalf = currentState.value.slice(0, newState.caretStart);
      lastHalf = currentState.value.slice(lastHalfStart, currentState.value.length);
    }
  } else {
    // Same code as onBackspace handler for deleting a selection range
    firstHalf = currentState.value.slice(0, currentState.caretStart);
    lastHalf = currentState.value.slice(currentState.caretEnd, currentState.value.length);
  }

  newState.value = firstHalf + lastHalf;

  return newState;
};

export const onUndo = (currentState, keyInfo, options, history) => {
  const newState = { ...currentState };
  newState.value = history.undo();
  newState.caretStart = newState.value.length;

  return newState;
};

export const onRedo = (currentState, keyInfo, options, history) => {
  const newState = { ...currentState };
  newState.value = history.redo();
  newState.caretStart = newState.value.length;

  return newState;
};

export const onUnknown = (currentState, keyInfo) => {
  const newState = { ...currentState };
  newState.valid = !key.isPrintable(keyInfo);

  return newState;
};