'use strict';

const typing = require('../customCommands')({
  valueStep: 100,
  delimiterDeleteStrategy: 'DELETE_NUMBER'
});

describe('Without currency', function() {

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
  typing(`↑`).shouldShow('100');
  typing(`↑↓`).shouldShow('0');
  typing(`↑`).nTimes(10).shouldShow('1,000');
  typing(`↑`).nTimes(10).thenTyping(`↓`).nTimes(10).shouldShow('0');
  typing(`↓`).shouldShow('-100');
  typing(`↓↑`).shouldShow('0');

  // Testing 0 and decimal formatting
  typing(`0`).shouldShow('0');
  typing(`10`).shouldShow('10');
  typing(`1←0`).shouldShow('1');
  typing(`0.5←0`).shouldShow('0.05');
  typing(`0.5←←0`).shouldShow('0.5');
  typing(`0.5←←←0`).shouldShow('0.5');
  typing(`.8`).shouldShow('.8');
  typing(`.8←0`).shouldShow('.08');
  typing(`.8←←`).shouldShow('0.8');


});
