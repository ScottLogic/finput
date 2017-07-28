const keyMap = {
  '↚': '\u{e003}', // BACKSPACE
  '↛': '\u{e017}', // DEL
  '←': '\u{e012}', // ARROW KEYS
  '↑': '\u{e013}',
  '→': '\u{e014}',
  '↓': '\u{e015}',
  '⇤': '\u{e011}', // HOME
  '⇥': '\u{e010}', // END
  '⓪': '\u{e01a}', // NUM KEYS
  '①': '\u{e01b}',
  '②': '\u{e01c}',
  '③': '\u{e01d}',
  '④': '\u{e01e}',
  '⑤': '\u{e01f}',
  '⑥': '\u{e020}',
  '⑦': '\u{e021}',
  '⑧': '\u{e022}',
  '⑨': '\u{e023}'
};

export const mapKeys = (keys) => keys.replace(/./g, (c) => keyMap[c] || c);
