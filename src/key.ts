import { IKeyInfo } from "../index";
import { Key } from "./constants";

const isMac = (): boolean => navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const isPrintable = (keyInfo: IKeyInfo) => {
    let isOneChar: boolean = keyInfo.name.length === 1;
    let hasBrowserShortcutKey: boolean;

    if (isMac()) {
        hasBrowserShortcutKey = keyInfo.modifiers.indexOf(Key.META) > -1;
    } else {
        const alt = keyInfo.modifiers.indexOf(Key.ALT) > -1;
        const ctrl = keyInfo.modifiers.indexOf(Key.CTRL) > -1;
        hasBrowserShortcutKey = alt || ctrl;
    }

    // Older browsers use these for the 'key' element of KeyboardEvents for the numpad.
    const numpadKeys: string[] = [Key.NUMPAD_ADD, Key.NUMPAD_SUBTRACT, Key.NUMPAD_MULTIPLY, Key.NUMPAD_DIVIDE];
    const isNumpad: boolean = numpadKeys.indexOf(keyInfo.name) > -1;
    isOneChar = isOneChar || isNumpad;

    return (isOneChar && !hasBrowserShortcutKey);
};

export const getPressedModifiers = (event: KeyboardEvent): string[] => {
    const modifierKeys: Array<keyof KeyboardEvent> = [Key.META, Key.CTRL, Key.SHIFT, Key.ALT];
    return modifierKeys.filter((key: keyof KeyboardEvent) => event[key]);
};

export const getHistoryKey = (): Key => {
    return isMac() ? Key.META : Key.CTRL;
};
