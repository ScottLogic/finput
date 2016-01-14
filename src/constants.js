
exports.CODES = {
  'COMMA':        { key: 188, char: 44 },
  'MINUS':        { key: 189, char: 45 },
  'DOT':          { key: 190, char: 46 },
  'LEFT_ARROW':   { key: 37 },
  'RIGHT_ARROW':  { key: 39 },
  'UP_ARROW':     { key: 38 },
  'DOWN_ARROW':   { key: 40 },
  'BACKSPACE':    { key: 8 },
  'DELETE':       { key: 46 }
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
  DELETE: 'DELETE'
}

exports.DRAG_STATES = {
  NONE: 'NONE',
  INTERNAL: 'INTERNAL',
  EXTERNAL: 'EXTERNAL'
}
