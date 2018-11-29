import {load, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

const {typing} = customCommandsFactory(finputDefaultDelimiters);

describe('modifiers', () => {
  beforeAll(load);

  describe('are not blocked from activating keyboard shortcuts', () => {
    // TODO: find a way to test browser shortcuts blur the input (not currently working with chromedriver)
    typing('k').whileModifierPressed().shouldShow('1,000');
    typing('m').whileModifierPressed().shouldShow('1,000,000');
    typing('b').whileModifierPressed().shouldShow('1,000,000,000');

    typing('0').whileModifierPressed().shouldShow('0');
    typing('1').whileModifierPressed().shouldShow('1');
    typing('2').whileModifierPressed().shouldShow('2');
    typing('3').whileModifierPressed().shouldShow('3');

    typing('-').whileModifierPressed().shouldShow('-');
    typing('+').whileModifierPressed().shouldShow('');
    typing('.').whileModifierPressed().shouldShow('.');
    typing(',').whileModifierPressed().shouldShow('');
  });
});
