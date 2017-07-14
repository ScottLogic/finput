import { KEYS } from './constants';

const isMac = () => navigator.platform.toUpperCase().indexOf('MAC') >= 0;

/**
 * Return if the key combined with the modifier key(s) is printable.
 *
 * Examples:
 * - Windows: Alt+D does not print anything in input field
 * - macOS: Alt+D prints ∂
 *
 * Generally we find that:
 * - Windows: Alt and Ctrl are reserved for browser shortcuts and stops chars
 * from printing
 * - macOS: Command is reserved for browser shortcuts and stops chars from
 * printing
 *
 * @param {keyInfo} Information about the pressed key 
 */
const isPrintable = (keyInfo) => {
  let isOneChar = keyInfo.keyName.length === 1;
  let hasBrowserShortcutKey;
  if (isMac()) {
    const meta = keyInfo.modifierKeys.indexOf(KEYS.meta) > -1;
    hasBrowserShortcutKey = meta;
  } else {
    const alt = keyInfo.modifierKeys.indexOf(KEYS.alt) > -1;
    const ctrl = keyInfo.modifierKeys.indexOf(KEYS.ctrl) > -1;
    hasBrowserShortcutKey = alt || ctrl;
  }

  // Older browsers use these for the 'key' element of KeyboardEvents for the numpad.
  const numpadKeys = [
    KEYS.numpadAdd,
    KEYS.numpadSubtract,
    KEYS.numpadMultiply,
    KEYS.numpadDivide
  ];

  const isNumpad = numpadKeys.indexOf(keyInfo.keyName) > -1;
  isOneChar = isOneChar || isNumpad;

  return (isOneChar && !hasBrowserShortcutKey);
};

/**
 * Returns an array of pressed modifier keys.
 *
 * The elements of the array are strings used by KeyboardEvent.key to represent
 * modifier keys:
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
 *
 * @param {KeyboardEvent} The native event to inspect for modifier keys 
 */
const getPressedModifiers = (nativeEvent) => {
  const modifierKeys = [
    KEYS.meta,
    KEYS.ctrl,
    KEYS.shift,
    KEYS.alt
  ];
  const pressedModifierKeys = modifierKeys.filter(key => nativeEvent[key]);
  return pressedModifierKeys;
};

const getHistoryKey = () => {
  return isMac() ? KEYS.meta : KEYS.ctrl; 
};

export default { isPrintable, getPressedModifiers, getHistoryKey };
