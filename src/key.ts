import { IKeyInfo } from "../index";
import { Key } from "./constants";

const isMac = (): boolean => navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const isPrintable = (keyInfo: IKeyInfo) => {
    let isOneChar: boolean = keyInfo.keyName.length === 1;
    let hasBrowserShortcutKey: boolean;

    if (isMac()) {
        hasBrowserShortcutKey = keyInfo.modifierKeys.indexOf(Key.META) > -1;
    } else {
        const alt = keyInfo.modifierKeys.indexOf(Key.ALT) > -1;
        const ctrl = keyInfo.modifierKeys.indexOf(Key.CTRL) > -1;
        hasBrowserShortcutKey = alt || ctrl;
    }

    // Older browsers use these for the 'key' element of KeyboardEvents for the numpad.
    const numpadKeys: Key[] = [
        Key.NUMPAD_ADD,
        Key.NUMPAD_SUBTRACT,
        Key.NUMPAD_MULTIPLY,
        Key.NUMPAD_DIVIDE,
    ];

    // TODO: remove any
    const isNumpad: boolean = numpadKeys.indexOf(keyInfo.keyName as any) > -1;
    isOneChar = isOneChar || isNumpad;

    return (isOneChar && !hasBrowserShortcutKey);
};

export const getPressedModifiers = (nativeEvent: Event): string[] => {
    const modifierKeys: Key[] = [Key.META, Key.CTRL, Key.SHIFT, Key.ALT];
    return modifierKeys.filter((key: Key) => key in nativeEvent);
};

export const getHistoryKey = (): Key => {
    return isMac() ? Key.META : Key.CTRL;
};
