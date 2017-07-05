//======================//
//     KEY HANDLERS     //
//======================//
// All functions dealing with keypresses (listened to on the keydown event)
// are here, with specific implementations for most types of key

import { RANGE } from './constants';
import helpers from './helpers';

module.exports = {

  /**
   * NUMBER HANDLER
   * @param {currentState} Information about current finput state
   * @param {options} Configuration options for the input
   */
  onNumber: function (currentState, event, options) {
    // Remove characters in current selection
    const tempCurrent = helpers.editString(currentState.value, '', currentState.caretStart, currentState.caretEnd);
    const tempNew = helpers.editString(currentState.value, event.keyName, currentState.caretStart, currentState.caretEnd);

    const allowedNumber =
      !(currentState.value[0] === '-'
        && currentState.caretStart === 0
        && currentState.caretEnd === 0)
      && helpers.allowedZero(tempCurrent, event.keyName, currentState.caretStart, options)
      && helpers.allowedDecimal(tempNew, options);

    const newState = { ...currentState };
    if (allowedNumber) {
      newState.value = helpers.editString(currentState.value, event.keyName, currentState.caretStart, currentState.caretEnd);
      newState.caretStart += 1;
    } else {
      newState.valid = false;
    }

    // TODO: remove side effect
    event.preventDefault();

    return newState;
  },

  /**
   * MINUS HANDLER
   * @param {currentState} Information about current finput state
   * @param {options} Configuration options for the input
   */
  onMinus: function (currentState, event, options) {
    const minusAllowed = currentState.caretStart === 0
      && (currentState.value[0] !== '-' || currentState.caretEnd > 0)
      && options.range !== RANGE.POSITIVE;

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

    //TODO: remove side effects
    event.preventDefault();

    return newState;
  },

  /**
   * DECIMAL HANDLER
   * @param {currentState} Information about current finput state
   * @param {options} Configuration options for the input
   */
  onDecimal: function (currentState, event, options) {
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

    // TODO: remove side effect
    event.preventDefault();

    return newState;
  },

  /**
   * SHORTCUT HANDLER
   * @param {currentState} Information about current finput state
   * @param {options} Configuration options for the input
   */
  onShortcut: function (currentState, event, options) {
    const multiplier = options.shortcuts[event.keyName] || 1;
    const adjustedVal = helpers.editString(currentState.value, '', currentState.caretStart, currentState.caretEnd);
    const rawValue = (helpers.toNumber(adjustedVal, options) || 1) * multiplier;

    const newState = { ...currentState };    
    if (multiplier) {
      // If number contains 'e' then it is too large to display
      if (rawValue.toString().indexOf('e') === -1) {
        newState.value = String(rawValue);
      }
      newState.caretStart = newState.value.length + Math.log10(1000);
    }

    // TODO: remove side effect
    event.preventDefault();

    return newState;
  },

  /**
   * BACKSPACE HANDLER
   * @param {currentState} Information about current finput state
   * @param {thousands} Character used for the thousands delimiter
   */
  onBackspace: function (currentState, event, thousands) {
    let firstHalf, lastHalf;

    const newState = { ...currentState };    
    if (currentState.caretStart === currentState.caretEnd) {
      if (event.modifierKey) {
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

    // TODO: remove side effect
    event.preventDefault();

    return newState;
  },

  /**
   * DELETE HANDLER
   * @param {currentState} Information about current finput state
   * @param {thousands} Character used for the thousands delimiter
   */
  onDelete: function (currentState, event, thousands) {
    let firstHalf, lastHalf;

    const newState = { ...currentState };
    if (currentState.caretStart === currentState.caretEnd) {
      const nextChar = currentState.value[currentState.caretStart];

      if (event.modifierKey) {
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
    
    // TODO: remove side effect
    event.preventDefault();

    return newState;
  },

  /**
   * UNDO HANDLER
   * @param {currentState} Information about current finput state
   * @param {history} the history manager
   */
  onUndo: function (currentState, event, history) {
    const newState = { ...currentState };
    newState.value = history.undo();
    newState.caretStart = currentState.value.length;

    // TODO: remove side effect
    event.preventDefault();

    return newState;
  },
  /**
   * REDO HANDLER
   * @param {currentState} Information about current finput state
   * @param {history} the history manager
   */
  onRedo: function (currentState, event, history) {
    const newState = { ...currentState };
    newState.value = history.redo();
    newState.caretStart = currentState.value.length;

    // TODO: remove side effect
    event.preventDefault();

    return newState;
  }
}
