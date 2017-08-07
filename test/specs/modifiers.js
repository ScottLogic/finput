import {load, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

const {typing} = customCommandsFactory(finputDefaultDelimiters);

describe('modifiers', () => {
  beforeAll(load);

  describe('are not blocked from activating keyboard shortcuts', () => {
    // TODO: find a way to test browser shortcuts blur the input (not currently working with chromedriver)
    typing('k').whileModifierPressed().shouldShow('');
    typing('m').whileModifierPressed().shouldShow('');
    typing('b').whileModifierPressed().shouldShow('');
    typing('l').whileModifierPressed().shouldShow('');
    typing('h').whileModifierPressed().shouldShow('');

    typing('0').whileModifierPressed().shouldShow('');
    typing('1').whileModifierPressed().shouldShow('');
    typing('2').whileModifierPressed().shouldShow('');
    typing('3').whileModifierPressed().shouldShow('');

    typing('-').whileModifierPressed().shouldShow('');
    typing('+').whileModifierPressed().shouldShow('');
    typing('.').whileModifierPressed().shouldShow('');
    typing(',').whileModifierPressed().shouldShow('');
  });
});
;