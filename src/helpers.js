
import {ACTION_TYPES, DRAG_STATES} from './constants';

/**
 * Edit a string with a new string to add.
 * Handles the case if text is highlighted also, in which case that text
 * will be replaced with the 'toAdd' string
 */
exports.editString = function(str, toAdd, caretStart, caretEnd = caretStart) {
  const firstHalf = str.slice(0, caretStart);
  const secondHalf = str.slice(caretEnd, str.length);
  return `${firstHalf}${toAdd}${secondHalf}`;
}

/**
 * Fully format the value
 */
exports.fullFormat = function(val, options) {

  // TODO - Full format

  return val;
}

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function(val, options) {
  let str = val.replace(new RegExp(`[${(options.currency || '')}${options.thousands}]`, 'g'), '');
  const startIndex = str.indexOf(options.decimal) > -1
    ? str.indexOf(options.decimal) - 1
    : str.length - 1;
  const endIndex = str[0] === '-' ? 1 : 0;

  // i must be greater than zero because number cannot start with comma
  let i = startIndex;
  let j = 1;
  for (i, j; i > endIndex; i--, j++) {
    // Every 3 characers, add a comma
    if (j % 3 === 0) {
      str = this.editString(str, ',', i);
    }
  }
  // Only add currency symbol on if value has any numbers
  if (options.currency && str && str.match(/\d/)) {
    return str[0] === '-' ? str.replace('-', `-${options.currency}`) : `${options.currency}${str}`
  } else {
    return str;
  }
}

/**
 * Calculate how many characters have been added (or removed) before the given
 * caret position after formatting. Caret is then adjusted by the returned offset
 * Currency symbol or thousand separators may have been added
 */
exports.calculateOffset = function(prev, curr, pos, options) {
  let i, prevSymbols = 0, currentSymbols = 0;
  for (i=0; i < pos; i++) {
    if (prev[i] === options.thousands || (options.currency && prev[i] === options.currency)) {
      prevSymbols++;
    }
  }
  for (i=0; i < pos; i++) {
    if (curr[i] === options.thousands || (options.currency && curr[i] === options.currency)) {
      currentSymbols++;
    }
  }
  return currentSymbols - prevSymbols;
}
