
exports.CODES = {
  'NUMBERS':      (() => {
    const array = [];
    let i, j;
    for (i = 48, j = 96; i < 58; i++, j++) {
      array.push({ key: i, char: i });
      array.push({ key: j, char: i });
    }
    return array;
  })(),
  'COMMA':        { key: 188, char: 44 },
  'MINUS':        { key: 189, char: 45 },
  'NUM_MINUS':    { key: 109, char: 45 },
  'DOT':          { key: 190, char: 46 },
  'NUMPAD_DOT':   { key: 110, char: 46 },
  'LEFT_ARROW':   { key: 37 },
  'RIGHT_ARROW':  { key: 39 },
  'UP_ARROW':     { key: 38 },
  'DOWN_ARROW':   { key: 40 },
  'BACKSPACE':    { key: 8 },
  'DELETE':       { key: 46 },
  'REDO':         { key: 89, char: 121 },
  'UNDO':         { key: 90, char: 122 }
}

exports.ACTION_TYPES = {
  NUMBER: 'NUMBER',
  SHORTCUT: 'SHORTCUT',
  DECIMAL: 'DECIMAL',
  DELIMITER: 'DELIMITER',
  MINUS: 'MINUS',
  UNKNOWN: 'UNKNOWN',
  HORIZONTAL_ARROW: 'HORIZONTAL_ARROW',
  VERTICAL_ARROW: 'VERTICAL_ARROW',
  BACKSPACE: 'BACKSPACE',
  DELETE: 'DELETE',
  UNDO: 'UNDO',
  REDO: 'REDO'
}

exports.DRAG_STATES = {
  NONE: 'NONE',
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
}
