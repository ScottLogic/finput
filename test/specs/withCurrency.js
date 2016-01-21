'use strict';

const commands = require('../customCommands');

const options = {
  valueStep: 100,
  currency: '£',
  delimiterDeleteStrategy: 'DELETE_NUMBER'
}

const typing = commands.type(options);
const copyingAndPasting = commands.copyAndPaste(options);

describe('With currency', function() {

  // // Shortcuts
  // typing('k').shouldShow('£1,000');
  // typing('m').shouldShow('£1,000,000');
  // typing('b').shouldShow('£1,000,000,000');
});
