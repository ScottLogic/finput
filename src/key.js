// Older browsers use these for the 'key' element of KeyboardEvents for the numpad.
const numpadKeys = [
  'add',
  'subtract',
  'multiply',
  'divide'
];

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
  // TODO: remove duplication
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  let hasBrowserShortcutKey;
  if (isMac) {
    const meta = keyInfo.modifierKeys.indexOf('metaKey') > -1;
    hasBrowserShortcutKey = meta;
  } else {
    const alt = keyInfo.modifierKeys.indexOf('altKey') > -1;
    const ctrl = keyInfo.modifierKeys.indexOf('ctrlKey') > -1;
    hasBrowserShortcutKey = alt || ctrl;
  }

  const isNumpad = numpadKeys.indexOf(keyInfo.keyName) > -1;
  isOneChar = isOneChar || isNumpad;

  return (isOneChar && !hasBrowserShortcutKey);
};

export default { isPrintable };
