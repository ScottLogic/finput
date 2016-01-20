
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
  const decimalIndex = val.indexOf(options.decimal) > -1
    ? val.indexOf(options.decimal)
    : val.length;

  const integerPart = val.slice(0, decimalIndex);
  let decimalPart = val.slice(decimalIndex + 1);

  if (options.fixed) {
    // If there should be some decimals
    if (options.scale > 0) {
      decimalPart = decimalPart.length >= options.scale
        ? decimalPart.slice(0, options.scale)
        : decimalPart + Array(options.scale - decimalPart.length + 1).join('0');
      return `${integerPart}${options.decimal}${decimalPart}`;
    } else {
      return integerPart;
    }
  } else {
    return val;
  }
}

/**
 * Remove any surplus zeros from the beginning of the integer part of the number
 * @param {str} The string value (with no thousand separators)
 */
function removeleadingZeros(val, options) {
  // Remove unnecessary zeros
  const decimalIndex = val.indexOf(options.decimal) > -1
    ? val.indexOf(options.decimal)
    : val.length;

  let integerPart = val.slice(0, decimalIndex + 1);
  const decimalPart = val.slice(decimalIndex + 1);

  let i = (integerPart[0] === '-') ? 1 : 0;

  while (
    integerPart[i] == 0
      && integerPart[i + 1] !== options.decimal
      && integerPart.length > 1
  ) {
    integerPart = integerPart.slice(0, i) + integerPart.slice(i + 1);
  }

  return `${integerPart}${decimalPart}`;
}

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function(val, options) {
  let str = val.replace(new RegExp(`[${options.thousands}]`, 'g'), '');

  str = removeleadingZeros(str, options);

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

  return str;
}

/**
 * Calculate how many characters have been added (or removed) before the given
 * caret position after formatting. Caret is then adjusted by the returned offset
 * Currency symbol or thousand separators may have been added
 */
exports.calculateOffset = function(prev, curr, pos, options) {
  let i, prevSymbols = 0, currentSymbols = 0;
  for (i=0; i < pos; i++) {
    if (prev[i] === options.thousands) {
      prevSymbols++;
    }
  }
  for (i=0; i < pos; i++) {
    if (curr[i] === options.thousands) {
      currentSymbols++;
    }
  }
  return currentSymbols - prevSymbols;
}

/**
 * Check (if the char is a zero) whether or not a zero can be placed at this
 * position in the value. If it is an unncessary zero - do not allow it
 * @param {val} value to check against
 * @param {char} the character being added
 * @param {caretPos} Current caret position in input
 * @param {options} Finput options object
 */
exports.allowedZero = function(val, char, caretPos, options) {
  if (char != 0) {
    return true;
  }

  const decimalIndex = val.indexOf(options.decimal) > -1
    ? val.indexOf(options.decimal)
    : val.length;

  const isNegative = val[0] === '-';
  let integerPart = val.slice((isNegative ? 1 : 0), decimalIndex);
  caretPos = isNegative ? caretPos - 1 : caretPos;

  if (integerPart) {
    // IF integer part is just a zero then no zeros can be added
    // ELSE the zero can not be added at the front of the value
    return integerPart == 0 ? false : caretPos > 0;
  } else {
    return true;
  }
}

/**
 * Convert a string value to its number equivalent
 * @param {val} string value to convert to a number
 * @param {options} Finput options object
 */
exports.toNumber = function(val, options) {
  return val && Number(val.replace(new RegExp(`[${options.thousands}]`, 'g'), ''));
}
