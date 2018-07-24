import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('traversals', () => {

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

  describe('supports HOME and END keys sending caret to start / end of field', () => {
    itTyping({ tested: `12⇤3`, expected: `312`, expectFocus: true, expectCaretAt: 1 });
    itTyping({ tested: `123⇤⇤4`, expected: `4,123`, expectCaretAt: 1 });
    itTyping({ tested: `123⇤⇥4`, expected: `1,234`, expectCaretAt: 5 });
    itTyping({ tested: `123⇤⇥4⇤5`, expected: `51,234`, expectCaretAt: 1 });
  });

  describe('supports left and right ARROW keys shifting caret left / right one caret', () => {
    itTyping({ tested: `123456←8`, expected: `1,234,586` });
    itTyping({ tested: `123456←←8`, expected: `1,234,856` });
    itTyping({ tested: `123456←←←8`, expected: `1,238,456` });
  });

  describe('supports up and down ARROW keys sending caret to start / end of field', () => {
    itTyping({ tested: `12↑3`, expected: `312`, expectFocus: true, expectCaretAt: 1 });
    itTyping({ tested: `123↑↑4`, expected: `4,123`, expectCaretAt: 1 });
    itTyping({ tested: `123↑↓4`, expected: `1,234`, expectCaretAt: 5 });
    itTyping({ tested: `123↑↓4↑5`, expected: `51,234`, expectCaretAt: 1 });
  });
});
