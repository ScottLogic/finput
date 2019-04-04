import is from "is_js";
import { IOptions } from "../index";

const getDecimalIndex = (val: string, decimal: string): number =>
    val.indexOf(decimal) > -1
        ? val.indexOf(decimal)
        : val.length;

export const editString = (str: string, toAdd: string, caretStart: number, caretEnd: number = caretStart): string =>
    `${str.slice(0, caretStart)}${toAdd}${str.slice(caretEnd, str.length)}`;

export const formatThousands = (val: string, options: IOptions): string => {
    const startIndex = val.indexOf(options.decimal) > -1
        ? val.indexOf(options.decimal) - 1
        : val.length - 1;
    const endIndex = val[0] === "-" ? 1 : 0;

    // i must be greater than zero because number cannot start with comma
    let i = startIndex;
    let j = 1;
    while (i > endIndex) {
        // Every 3 characters, add a comma
        if (j % 3 === 0) {
            val = editString(val, options.thousands, i);
        }
        i--;
        j++;
    }

    return val;
};

export const partialFormat = (val: string, options: IOptions): string => {
    val = val.replace(new RegExp(`[${options.thousands}]`, "g"), "");
    val = removeLeadingZeros(val, options);
    val = removeExtraDecimals(val, options);
    val = formatThousands(val, options);

    return val;
};

export const fullFormat = (val: string, options: IOptions): string => {
    val = partialFormat(val, options);

    if (val === "") {
        return "";
    }

    // Fully format decimal places
    const decimalIndex = getDecimalIndex(val, options.decimal);
    const sign = val[0] === "-" ? val[0] : "";
    let integerPart = val.slice(sign ? 1 : 0, decimalIndex);
    let decimalPart = val.slice(decimalIndex + 1);

    if (options.fixed) {

        // If there should be some decimals
        if (options.scale > 0) {
            decimalPart = decimalPart.length >= options.scale
                ? decimalPart.slice(0, options.scale)
                : decimalPart + Array(options.scale - decimalPart.length + 1).join("0");

            if (!integerPart.length) {
                integerPart = "0";
            }

            return `${sign}${integerPart}${options.decimal}${decimalPart}`;
        } else {
            return `${sign}${integerPart}`;
        }
    } else {
        return val;
    }
};

const removeLeadingZeros = (val: string, options: IOptions): string => {
    const decimalIndex = getDecimalIndex(val, options.decimal);
    const sign = val[0] === "-" ? val[0] : "";
    let integerPart = val.slice(sign ? 1 : 0, decimalIndex + 1);
    const decimalPart = val.slice(decimalIndex + 1);

    const i = 0;

    while (
        integerPart[i] === "0"
        && integerPart[i + 1] !== options.decimal
        && integerPart.length > 1
        ) {
        integerPart = integerPart.slice(0, i) + integerPart.slice(i + 1);
    }

    return `${sign}${integerPart}${decimalPart}`;
};

const removeExtraDecimals = (val: string, options: IOptions): string => {
    const decimalIndex = getDecimalIndex(val, options.decimal);
    const integerPart = val.slice(0, decimalIndex + 1);
    const decimalPart = val.slice(decimalIndex + 1)
    .slice(0, options.scale);

    return `${integerPart}${decimalPart}`;
};

export const allowedDecimal = (val: string, options: IOptions): boolean => {
    const decimalPart = val.slice(getDecimalIndex(val, options.decimal) + 1);
    return decimalPart.length <= options.scale;
};

export const calculateOffset = (prev: string, curr: string, pos: number, options: IOptions): number => {
    let i;
    let prevSymbols = 0;
    let currentSymbols = 0;

    for (i = 0; i < pos; i++) {
        if (prev[i] === options.thousands) {
            prevSymbols++;
        }
    }
    for (i = 0; i < pos; i++) {
        if (curr[i] === options.thousands) {
            currentSymbols++;
        }
    }
    return currentSymbols - prevSymbols;
};

export const allowedZero = (val: string, char: string, caretPos: number, options: IOptions): boolean => {
    if (char !== "0") {
        return true;
    }

    const isNegative = val[0] === "-";
    const integerPart = val.slice((isNegative ? 1 : 0), getDecimalIndex(val, options.decimal));
    caretPos = isNegative ? caretPos - 1 : caretPos;

    // If there is some integer part and the caret is to the left of
    // the decimal point
    if ((integerPart.length > 0) && (caretPos < integerPart.length + 1)) {
        // IF integer part is just a zero then no zeros can be added
        // ELSE the zero can not be added at the front of the value
        return integerPart === "0" ? false : caretPos > 0;
    } else {
        return true;
    }
};

export const formattedToRaw = (formattedValue: string, options: IOptions): number | undefined => {
    if (is.not.string(formattedValue)) {
        return NaN;
    }

    if (!formattedValue.length) {
        return undefined;
    }

    // Number(...) accepts thousands ',' or '' and decimal '.' so we must:

    // 1. Remove thousands delimiter to cover case it is not ','
    // Cannot replace with ',' in case decimal uses this
    formattedValue = formattedValue.replace(new RegExp(`[${options.thousands}]`, "g"), "");

    // 2. Replace decimal with '.' to cover case it is not '.'
    // Ok to replace as thousands delimiter removed above
    formattedValue = formattedValue.replace(new RegExp(`[${options.decimal}]`, "g"), ".");
    return Number(formattedValue);
};

export const rawToFormatted = (rawValue: number, options: IOptions): string => {
    if (is.not.number(rawValue) || is.not.finite(rawValue)) {
        return "";
    }

    let stringValue = String(rawValue);

    // String(...) has normalised formatting of:
    const rawThousands = ",";
    const rawDecimal = ".";

    // ensure string we are returning adheres to options
    stringValue = stringValue.replace(new RegExp(`[${rawThousands}]`, "g"), options.thousands);
    stringValue = stringValue.replace(new RegExp(`[${rawDecimal}]`, "g"), options.decimal);

    return stringValue;
};

export const parseString = (str: string, options: IOptions): string => {
    let multiplier = 1;
    let parsed = "";

    for (const c of str) {
        if (!isNaN(Number(c))) { // If a number
            parsed += c;
        } else if (c === options.decimal && parsed.indexOf(c) === -1) { // If a decimal (and no decimals exist so far)
            parsed += options.decimal;
        } else if (options.shortcuts[c]) { // If a shortcut
            multiplier *= options.shortcuts[c];
        } else if (c === "-" && !parsed.length) { // If a minus sign (and parsed string is currently empty)
            parsed = c;
        }
    }

    if (!parsed.length) {
        return "";
    }

    // Need to ensure that delimiter is a '.' before parsing to number
    const normalisedNumber = formattedToRaw(parsed, options);
    // Then swap it back in
    const adjusted = rawToFormatted((normalisedNumber || 0) * multiplier, options);
    const tooLarge = adjusted.indexOf("e") !== -1;

    if (tooLarge) {
        return "";
    } else {
        return adjusted;
    }
};
