'use strict';

describe('my feature', function() {

  const input = '#number-input';

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
    '⑨': '\u{e023}',
  };

  function typing(keys) {
    return {
      shouldShow(expected) {
        it(`should show ${expected} when ${keys} are pressed`, function*() {
          const mappedKeys = keys.replace(/./g, (c) => keyMap[c] || c);
          yield browser.url('/')
            .leftClick(input)
            .keys(mappedKeys);
          const value = yield browser.getValue(input);
          expect(value).toBe(expected);
        });
      }
    };
  }

  typing('k').shouldShow('1,000');
  typing('m').shouldShow('1,000,000');
  typing('b').shouldShow('1,000,000,000');

  typing('1k').shouldShow('1,000');
  typing('2m').shouldShow('2,000,000');
  // typing('③b').shouldShow('3,000,000,000');

  typing('1k1').shouldShow('10,001');
  typing('2m2').shouldShow('20,000,002');
  // typing('③b③').shouldShow('30,000,000,003');
  typing('1k1k').shouldShow('10,001,000');

  typing('bk').shouldShow('1,000,000,000,000');
  // typing('bkkkk').shouldShow('1,000,000,000,000,000,000');

  typing(`1k⇤1`).shouldShow('11,000');
  typing(`1k⇤⇥1`).shouldShow('10,001');

  typing(`1↚`).shouldShow('');
  typing(`10↚`).shouldShow('1');
  typing(`1k↚`).shouldShow('100');
  typing(`10k↚`).shouldShow('1,000');

  // typing(`1k←←←↚`).shouldShow('1,000');
  // typing(`1k⇤↛`).shouldShow('0');
});
