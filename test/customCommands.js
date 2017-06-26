'use strict';

const input = '#number-input';
const otherInput = '#text-numbers';

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

function initFinput(options) {
  var el = window.document.getElementById('number-input');
  var elClone = el.cloneNode(true);
  el.parentNode.replaceChild(elClone, el);
  var myFinput = new window.finput(elClone, options);
}

function getModifierKey() {
  var isMac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if (isMac) {
    return 'Command';
  } else {
    return 'Control';
  }
}

exports.type = function(options) {

  return function(initialKeys) {
    let activeKeys = initialKeys;
    let keys = activeKeys;
    let unfocusAfter = false;
    const chainFunctions = {};

    chainFunctions.shouldShow = function(expected) {
      let client;

      it(`should show ${expected} when ${keys} are pressed`, function*() {
        client = browser.url('/').execute(initFinput, options);
        const mappedKeys = keys.replace(/./g, (c) => keyMap[c] || c);
        yield client
          .clearElement(input)
          .leftClick(input)
          .keys(mappedKeys);

        if (unfocusAfter) {
          yield client.leftClick(otherInput);
        }

        const value = yield client.getValue(input);
        expect(value).toBe(expected);
      });
      return client;
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
    chainFunctions.thenFocusingOut = function() {
      unfocusAfter = true;
      return chainFunctions;
    }

    return chainFunctions;
  };
};

exports.copyAndPaste = function(options) {

  return function(text) {
    let unfocusAfter = false;
    const chainFunctions = {};

    chainFunctions.shouldShow = function(expected) {
      let client;

      it(`should show ${expected} when ${text} is copied and pasted`, function*() {
        client = browser.url('/').execute(initFinput, options);
        const modifierKey = (yield browser.execute(getModifierKey)).value;
        let offset;

        yield client
          .clearElement(input)
          .clearElement(otherInput)
          .leftClick(otherInput)
          .keys(text)
          .keys([modifierKey, 'a', 'NULL'])
          .keys([modifierKey, 'c', 'NULL'])
          .leftClick(input)
          .keys([modifierKey, 'v', 'NULL']);

        const value = yield client.getValue(input);
        expect(value).toBe(expected);
      });
      return client;
    }
    chainFunctions.thenFocusingOut = function() {
      unfocusAfter = true;
      return chainFunctions;
    }

    return chainFunctions;
  };
}

exports.dragAndDrop = function(options) {

  return function(text) {
    const chainFunctions = {};

    chainFunctions.shouldShow = function(expected) {
      let client;

      it(`should show ${expected} when ${text} is dragged and dropped`, function*() {
        client = browser.url('/').execute(initFinput, options);
        const modifierKey = (yield browser.execute(getModifierKey)).value;
        let offset;

        yield client
          .clearElement(input)
          .clearElement(otherInput)
          .leftClick(input)
          .keys(text)
          .keys([modifierKey, 'a', 'NULL'])
          .moveToObject(input, 18, 24)
          .buttonDown()
          .moveToObject(otherInput, 18, 24)
          .buttonUp()
          // .dragAndDrop(input, otherInput).pause(3000);

        const value = yield client.getValue(input);
        expect(value).toBe(expected);
      });
      return client;
    }

    return chainFunctions;
  };
}

exports.cut = function(options) {

  return function(count) {
    const charCount = count;
    let startPos, text;
    const chainFunctions = {};

    chainFunctions.shouldShow = function(expected) {
      let client;

      it(`should show ${expected} when ${text} is cropped`, function*() {
        client = browser.url('/').execute(initFinput, options);
        const modifierKey = (yield browser.execute(getModifierKey)).value;
        let offset;

        yield client
          .clearElement(input)
          .clearElement(otherInput)
          .leftClick(input)
          .keys(text)
          .keys([modifierKey, 'a', 'NULL', keyMap['←']])
          .keys(Array(startPos + 1).join(keyMap['→']))
          .keys(['Shift', Array(count + 1).join(keyMap['→']), 'NULL'])  // Select chars
          .keys([modifierKey, 'x', 'NULL']);

        const value = yield client.getValue(input);
        expect(value).toBe(expected);
      });
      return chainFunctions;
    }
    chainFunctions.characters = function(t) {
      return chainFunctions;
    }
    chainFunctions.from = function(t) {
      text = t;
      return chainFunctions;
    }
    chainFunctions.startingFrom = function(start) {
      startPos = start;
      return chainFunctions;
    }

    return chainFunctions;
  };
}
