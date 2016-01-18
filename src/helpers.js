
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
 * Fully format the value using numeral (Done on focus out)
 */
exports.fullFormat = function(val, format, currency) {
  const fullFormat = currency ? `${currency}${format}` : format;

  if (!val) {
    return null;
  } else if (val.length === 1) {
    return val >= 0 && val <= 9 ? numeral(val).format(fullFormat) : null;
  } else {
    const numeralVal = numeral(val);
    if (isNaN(numeralVal.value()) || !Number.isFinite(numeralVal.value())) {
      return null
    } else {
      return numeralVal.format(fullFormat);
    }
  }
}

/**
 * Partially format the value, only adding commas as needed (Done on keypress/keyup)
 */
exports.partialFormat = function(val, currency, languageData) {
  let str = val.replace(new RegExp(`[${(currency || '')}${languageData.delimiter}]`, 'g'), '');
  const startIndex = str.indexOf(languageData.decimal) > -1
    ? str.indexOf(languageData.decimal) - 1
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
  if (currency && str && str.match(/\d/)) {
    return str[0] === '-' ? str.replace('-', `-${currency}`) : `${currency}${str}`
  } else {
    return str;
  }
}

/**
 * Calculate how many characters have been added (or removed) before the given
 * caret position after formatting. Caret is then adjusted by the returned offset
 * Currency symbol or delimiters may have been added
 */
exports.calculateOffset = function(prev, curr, pos, currency, languageData) {
  let i, j;
  for (i=0, j=0; i < pos; i++, j++) {
    if (prev[i] === languageData.delimiter || prev[i] === currency) {
      i++;
    }
    if (curr[j] === languageData.delimiter || curr[j] === currency) {
      j++;
    }
  }
  return j - i;
}
