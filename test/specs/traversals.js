import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('traversals', () => {
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

  describe('supports HOME and END keys sending caret to start / end of field', () => {
    test().typing(`12⇤3`).shouldShow(`312`).shouldHaveFocus(true).shouldHaveCaretAt(1);
    test().typing(`123⇤⇤4`).shouldShow(`4,123`).shouldHaveCaretAt(1);
    test().typing(`123⇤⇥4`).shouldShow(`1,234`).shouldHaveCaretAt(5);
    test().typing(`123⇤⇥4⇤5`).shouldShow(`51,234`).shouldHaveCaretAt(1);
  });

  describe('supports left and right ARROW keys shifting caret left / right one caret', () => {
    test().typing(`123456←8`).shouldShow(`1,234,586`);
    test().typing(`123456←←8`).shouldShow(`1,234,856`);
    test().typing(`123456←←←8`).shouldShow(`1,238,456`);
  });

  describe('supports up and down ARROW keys sending caret to start / end of field', () => {
    test().typing(`12↑3`).shouldShow(`312`).shouldHaveFocus(true).shouldHaveCaretAt(1);
    test().typing(`123↑↑4`).shouldShow(`4,123`).shouldHaveCaretAt(1);
    test().typing(`123↑↓4`).shouldShow(`1,234`).shouldHaveCaretAt(5);
    test().typing(`123↑↓4↑5`).shouldShow(`51,234`).shouldHaveCaretAt(1);
  });
});
