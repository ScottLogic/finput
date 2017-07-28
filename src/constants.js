exports.KEYS = {
  numpadAdd: 'add',
  numpadSubtract: 'subtract',
  numpadMultiply: 'multiply',
  numpadDivide: 'divide',
  meta: 'metaKey',
  ctrl: 'ctrlKey',
  shift: 'shiftKey',
  alt: 'altKey'
}

exports.ACTION_TYPES = {
  NUMBER: 'NUMBER',
  SHORTCUT: 'SHORTCUT',
  DECIMAL: 'DECIMAL',
  THOUSANDS: 'THOUSANDS',
  MINUS: 'MINUS',
  UNKNOWN: 'UNKNOWN',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DELETE',
  UNDO: 'UNDO',
  REDO: 'REDO',
};

exports.DRAG_STATES = {
  NONE: 'NONE',
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
};

exports.RANGE = {
  ALL: 'ALL',
  POSITIVE: 'POSITIVE'
};
