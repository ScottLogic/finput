import {load, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

const {typing} = customCommandsFactory(finputDefaultDelimiters);

describe('traversals', () => {
  beforeAll(load);

  describe('supports HOME and END keys sending caret to start / end of field', () => {
    typing(`12⇤3`).shouldShow(`312`).shouldHaveFocus(true).shouldHaveCaretAt(1);
    typing(`123⇤⇤4`).shouldShow(`4,123`).shouldHaveCaretAt(1);
    typing(`123⇤⇥4`).shouldShow(`1,234`).shouldHaveCaretAt(5);
    typing(`123⇤⇥4⇤5`).shouldShow(`51,234`).shouldHaveCaretAt(1);
  });

  describe('supports left and right ARROW keys shifting caret left / right one caret', () => {
    typing(`123456←8`).shouldShow(`1,234,586`);
    typing(`123456←←8`).shouldShow(`1,234,856`);
    typing(`123456←←←8`).shouldShow(`1,238,456`);
  });

  describe('supports up and down ARROW keys sending caret to start / end of field', () => {
    typing(`12↑3`).shouldShow(`312`).shouldHaveFocus(true).shouldHaveCaretAt(1);
    typing(`123↑↑4`).shouldShow(`4,123`).shouldHaveCaretAt(1);
    typing(`123↑↓4`).shouldShow(`1,234`).shouldHaveCaretAt(5);
    typing(`123↑↓4↑5`).shouldShow(`51,234`).shouldHaveCaretAt(1);
  });
});
