'use strict';

const commands = require('../customCommands');
const options = {};

const typing = commands.type(options);
const copyingAndPasting = commands.copyAndPaste(options);
const draggingAndDropping = commands.dragAndDrop(options);
const cutting = commands.cut(options);

describe('Default options', function() {

  // Shortcuts
  typing('k').shouldShow('1,000');
  typing('m').shouldShow('1,000,000');
  typing('b').shouldShow('1,000,000,000');

  // Number with shortcuts
  typing('1k').shouldShow('1,000');
  typing('2m').shouldShow('2,000,000');
  typing('3b').shouldShow('3,000,000,000');
  typing('1k1').shouldShow('10,001');
  typing('2m2').shouldShow('20,000,002');
  typing('3b3').shouldShow('30,000,000,003');
  typing('1k1k').shouldShow('10,001,000');

  // Combining shortcuts
  typing('bk').shouldShow('1,000,000,000,000');

  // HOME and END key functionality
  typing(`1k⇤1`).shouldShow('11,000');
  typing(`1k⇤⇥1`).shouldShow('10,001');

  // BACKSPACE key
  typing(`1↚`).shouldShow('');
  typing(`10↚`).shouldShow('1');
  typing(`1k↚`).shouldShow('100');
  typing(`10k↚`).shouldShow('1,000');

  // DELETE key
  typing(`1←↛`).shouldShow('');
  typing(`10←↛`).shouldShow('1');
  typing(`1k←↛`).shouldShow('100');
  typing(`10k←↛`).shouldShow('1,000');

  // Incrementing and decrementing with ARROW keys
  // typing(`↑`).shouldShow('100');
  // typing(`↑↓`).shouldShow('0');
  // typing(`↑`).nTimes(10).shouldShow('1,000');
  // typing(`↑`).nTimes(10).thenTyping(`↓`).nTimes(10).shouldShow('0');
  // typing(`↓`).shouldShow('-100');
  // typing(`↓↑`).shouldShow('0');

  // Testing 0 and decimal formatting
  typing(`0`).shouldShow('0');
  typing(`10`).shouldShow('10');
  typing(`1←0`).shouldShow('1');
  typing(`0.5←0`).shouldShow('0.05');
  typing(`0.5←0`).shouldShow('0.05');
  typing(`0.5←←0`).shouldShow('0.5');
  typing(`1.5←←0`).shouldShow('10.5');
  typing(`0.5←←7`).shouldShow('7.5');
  typing(`0.5←←←0`).shouldShow('0.5');
  typing(`.8`).shouldShow('.8');
  typing(`.8←0`).shouldShow('.08');
  typing(`.8←←0`).shouldShow('0.8');
  typing(`123456←←←←←.`).shouldShow('12.34');
  typing(`12.345`).shouldShow('12.34');
  typing(`12.34←←↚`).shouldShow('1,234');
  typing(`12.34←←↚`).shouldShow('1,234');

  typing(`0.8`).thenFocusingOut().shouldShow('0.80');
  typing(`.8`).thenFocusingOut().shouldShow('0.80');
  typing(`8.88`).thenFocusingOut().shouldShow('8.88');

  // Negative values
  typing(`-`).shouldShow('-');
  typing(`-0`).shouldShow('-0');
  typing(`--`).shouldShow('-');
  typing(`-←0`).shouldShow('-');
  typing(`0-`).shouldShow('0');
  typing(`0-`).shouldShow('0');
  typing(`-1000`).shouldShow('-1,000');
  typing(`-1k`).shouldShow('-1,000');

  typing(`-.`).thenFocusingOut().shouldShow('-0.00');
  typing(`-`).thenFocusingOut().shouldShow('-0.00');
  typing(`-0`).thenFocusingOut().shouldShow('-0.00');
  typing(`-0.`).thenFocusingOut().shouldShow('-0.00');
  typing(`-.66`).thenFocusingOut().shouldShow('-0.66');
  typing(`-1000`).thenFocusingOut().shouldShow('-1,000.00');

  // Copy and Paste
  copyingAndPasting('aaaaa').shouldShow('');
  copyingAndPasting('-12').shouldShow('-12.00');
  copyingAndPasting('-.9').shouldShow('-0.90');
  copyingAndPasting('7a7a.8a.').shouldShow('77.80');

  // Cutting from input (should fully format unless no characters selected)

  // None selected
  cutting(0).characters().from('123456').startingFrom(0).shouldShow('123,456');
  cutting(2).characters().from('12').startingFrom(2).shouldShow('12');

  cutting(4).characters().from('123456').startingFrom(1).shouldShow('156.00');
  cutting(5).characters().from('1234').startingFrom(0).shouldShow('');

  // Drag and Drop
  // draggingAndDropping('12').shouldShow('12');
});
