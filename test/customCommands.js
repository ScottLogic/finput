'use strict';

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

function initFinput(options) {
  var el = window.document.getElementById('number-input');
  var elClone = el.cloneNode(true);
  el.parentNode.replaceChild(elClone, el);
  var myFinput = new window.Finput(elClone, options);
}

module.exports = function(options) {

  return function(initialKeys) {
    let activeKeys = initialKeys;
    let keys = activeKeys;
    const chainFunctions = {};

    chainFunctions.shouldShow = function(expected) {
      it(`should show ${expected} when ${keys} are pressed`, function*() {
        const mappedKeys = keys.replace(/./g, (c) => keyMap[c] || c);
        yield browser.url('/')
          .execute(initFinput, options)
          .leftClick(input)
          .keys(mappedKeys);
        const value = yield browser.getValue(input);
        expect(value).toBe(expected);
      });
      return chainFunctions;
    }
    chainFunctions.nTimes = function(times) {
      keys += Array(times).join(activeKeys);
      return chainFunctions;
    }
    chainFunctions.thenTyping = function(newKeys) {
      activeKeys = newKeys;
      keys += newKeys;
      return chainFunctions;
    }

    return chainFunctions;
  };
};
