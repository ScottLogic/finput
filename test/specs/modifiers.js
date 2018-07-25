import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('modifiers', () => {
  let driver;
  let finputDefaultDelimiters;

  const test = createCommands();

  beforeAll(async () => {
    driver = getDriver();
    ({ finputDefaultDelimiters } = await load(driver));

    test.withEnvironment({
      driver,
      finputElement: finputDefaultDelimiters
    });
  });

  afterAll(async () => await unload(driver));

  describe('are not blocked from activating keyboard shortcuts', () => {
    // TODO: find a way to test browser shortcuts blur the input (not currently working with chromedriver)
    test().typing('k').whileModifierPressed().shouldShow('');
    test().typing('m').whileModifierPressed().shouldShow('');
    test().typing('b').whileModifierPressed().shouldShow('');
    test().typing('l').whileModifierPressed().shouldShow('');
    test().typing('h').whileModifierPressed().shouldShow('');

    test().typing('0').whileModifierPressed().shouldShow('');
    test().typing('1').whileModifierPressed().shouldShow('');
    test().typing('2').whileModifierPressed().shouldShow('');
    test().typing('3').whileModifierPressed().shouldShow('');

    test().typing('-').whileModifierPressed().shouldShow('');
    test().typing('+').whileModifierPressed().shouldShow('');
    test().typing('.').whileModifierPressed().shouldShow('');
    test().typing(',').whileModifierPressed().shouldShow('');
  });
});
;