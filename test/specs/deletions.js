import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('deletions', () => {
  
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

  describe('deletes digit', () => {
    describe('when BACKSPACE is pressed while caret is positioned directly ahead of it', () => {
      itTyping({ tested: '123456.78↚', expected: '123,456.7', expectedCaretAt: 9 });
      itTyping({ tested: '123456.78↚↚', expected: '123,456.', expectedCaretAt: 8 });
      itTyping({ tested: '123456.78↚↚↚', expected: '123,456', expectedCaretAt: 7 });
      itTyping({ tested: '123456.78↚↚↚↚', expected: '12,345', expectedCaretAt: 6 });
      itTyping({ tested: '123456.78↚↚↚↚↚', expected: '1,234', expectedCaretAt: 5 });
      itTyping({ tested: '123456.78↚↚↚↚↚↚', expected: '123', expectedCaretAt: 3 });
      itTyping({ tested: '123456.78↚↚↚↚↚↚↚', expected: '12', expectedCaretAt: 2 });
      itTyping({ tested: '123456.78↚↚↚↚↚↚↚↚', expected: '1', expectedCaretAt: 1 });
      
      itTyping({ tested: '123456←↚', expected: '12,346', expectedCaretAt: 5 });
      itTyping({ tested: '123456←←↚', expected: '12,356', expectedCaretAt: 4 });
      itTyping({ tested: '123456←←←←↚', expected: '12,456', expectedCaretAt: 2 });
      itTyping({ tested: '123456←←←←←←↚', expected: '23,456', expectedCaretAt: 0 });
    });

    describe('when DELETE is pressed while caret is positioned directly behind of it', () => {
      itTyping({ tested: '123456.78⇤↛', expected: '23,456.78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛', expected: '3,456.78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛', expected: '456.78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛↛', expected: '56.78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛↛↛', expected: '6.78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛↛↛↛', expected: '.78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛↛↛↛↛', expected: '78', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛↛↛↛↛↛', expected: '8', expectedCaretAt: 0 });
      itTyping({ tested: '123456.78⇤↛↛↛↛↛↛↛↛↛', expected: '', expectedCaretAt: 0 });

      itTyping({ tested: '123456.78←↛', expected: '123,456.7', expectedCaretAt: 9 });
      itTyping({ tested: '123456.78←←↛', expected: '123,456.8', expectedCaretAt: 8 });
      itTyping({ tested: '123456.78←←←←↛', expected: '12,345.78', expectedCaretAt: 6 });
      itTyping({ tested: '123456.78←←←←←↛', expected: '12,346.78', expectedCaretAt: 5 });
    });
  });

  describe('traverses thousands delimiter', () => {
    describe('backwards one place if BACKSPACE is pressed when caret is positioned directly ahead of it', () => {
      itTyping({ tested: '123456←←←↚', expected: '123,456', expectedCaretAt: 3 });
    });

    describe('forwards one place if DELETE is pressed when caret is positioned directly behind of it', () => {
      itTyping({ tested: '123456←←←←↛', expected: '123,456', expectedCaretAt: 4 });
    });
  });

  describe('deletes decimal delimiter', () => {
    describe('when BACKSPACE is pressed while caret is positioned directly ahead of it', () => {
      itTyping({ tested: '123456.78←←↚', expected: '12,345,678', expectedCaretAt: 8 });
      itTyping({ tested: '123456.78←←↚.↚', expected: '12,345,678', expectedCaretAt: 8 });
    });

    describe('when DELETE is pressed while caret is positioned directly behind of it', () => {
      itTyping({ tested: '123456.78←←←↛', expected: '12,345,678', expectedCaretAt: 8 });
      itTyping({ tested: '123456.78←←←↛.←↛', expected: '12,345,678', expectedCaretAt: 8 });
    });
  });
  
});
