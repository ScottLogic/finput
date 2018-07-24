import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('modifiers', () => {

  let driver;
  let finputDefaultDelimiters;

  beforeAll(async () => {
    driver = getDriver();
    ({ finputDefaultDelimiters } = await load(driver));
    
    itTyping.expectTyping = typing({
      driver,
      finputElement: finputDefaultDelimiters
    });
  });

  afterAll(async () => await unload(driver));

  describe('are not blocked from activating keyboard shortcuts', () => {
    // TODO: find a way to test browser shortcuts blur the input (not currently working with chromedriver)
    itTyping({ tested: 'k', pressModifier: true, expected: '' });
    itTyping({ tested: 'm', pressModifier: true, expected: '' });
    itTyping({ tested: 'b', pressModifier: true, expected: '' });
    itTyping({ tested: 'l', pressModifier: true, expected: '' });
    itTyping({ tested: 'h', pressModifier: true, expected: '' });

    itTyping({ tested: '0', pressModifier: true, expected: '' });
    itTyping({ tested: '1', pressModifier: true, expected: '' });
    itTyping({ tested: '2', pressModifier: true, expected: '' });
    itTyping({ tested: '3', pressModifier: true, expected: '' });

    itTyping({ tested: '-', pressModifier: true, expected: '' });
    itTyping({ tested: '+', pressModifier: true, expected: '' });
    itTyping({ tested: '.', pressModifier: true, expected: '' });
    itTyping({ tested: ',', pressModifier: true, expected: '' });
  });
});
;