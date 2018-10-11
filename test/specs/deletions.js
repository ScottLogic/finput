import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('deletions', () => {
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

  describe('deletes digit', () => {
    describe('when BACKSPACE is pressed while caret is positioned directly ahead of it', () => {
      test().typing('123456.78↚').shouldShow('123,456.7').shouldHaveCaretAt(9);
      test().typing('123456.78↚↚').shouldShow('123,456.').shouldHaveCaretAt(8);
      test().typing('123456.78↚↚↚').shouldShow('123,456').shouldHaveCaretAt(7);
      test().typing('123456.78↚↚↚↚').shouldShow('12,345').shouldHaveCaretAt(6);
      test().typing('123456.78↚↚↚↚↚').shouldShow('1,234').shouldHaveCaretAt(5);
      test().typing('123456.78↚↚↚↚↚↚').shouldShow('123').shouldHaveCaretAt(3);
      test().typing('123456.78↚↚↚↚↚↚↚').shouldShow('12').shouldHaveCaretAt(2);
      test().typing('123456.78↚↚↚↚↚↚↚↚').shouldShow('1').shouldHaveCaretAt(1);

      test().typing('123456←↚').shouldShow('12,346').shouldHaveCaretAt(5);
      test().typing('123456←←↚').shouldShow('12,356').shouldHaveCaretAt(4);
      test().typing('123456←←←←↚').shouldShow('12,456').shouldHaveCaretAt(2);
      test().typing('123456←←←←←←↚').shouldShow('23,456').shouldHaveCaretAt(0);
    });

    describe('when DELETE is pressed while caret is positioned directly behind of it', () => {
      test().typing('123456.78⇤↛').shouldShow('23,456.78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛').shouldShow('3,456.78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛').shouldShow('456.78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛↛').shouldShow('56.78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛↛↛').shouldShow('6.78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛↛↛↛').shouldShow('.78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛↛↛↛↛').shouldShow('78').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛↛↛↛↛↛').shouldShow('8').shouldHaveCaretAt(0);
      test().typing('123456.78⇤↛↛↛↛↛↛↛↛↛').shouldShow('').shouldHaveCaretAt(0);

      test().typing('123456.78←↛').shouldShow('123,456.7').shouldHaveCaretAt(9);
      test().typing('123456.78←←↛').shouldShow('123,456.8').shouldHaveCaretAt(8);
      test().typing('123456.78←←←←↛').shouldShow('12,345.78').shouldHaveCaretAt(6);
      test().typing('123456.78←←←←←↛').shouldShow('12,346.78').shouldHaveCaretAt(5);
    });
  });

  describe('traverses thousands delimiter', () => {
    describe('backwards one place if BACKSPACE is pressed when caret is positioned directly ahead of it', () => {
      test().typing('123456←←←↚').shouldShow('123,456').shouldHaveCaretAt(3);
    });

    describe('forwards one place if DELETE is pressed when caret is positioned directly behind of it', () => {
      test().typing('123456←←←←↛').shouldShow('123,456').shouldHaveCaretAt(4);
    });
  });

  describe('deletes decimal delimiter', () => {
    describe('when BACKSPACE is pressed while caret is positioned directly ahead of it', () => {
      test().typing('123456.78←←↚').shouldShow('12,345,678').shouldHaveCaretAt(8);
      test().typing('123456.78←←↚.↚').shouldShow('12,345,678').shouldHaveCaretAt(8);
    });

    describe('when DELETE is pressed while caret is positioned directly behind of it', () => {
      test().typing('123456.78←←←↛').shouldShow('12,345,678').shouldHaveCaretAt(8);
      test().typing('123456.78←←←↛.←↛').shouldShow('12,345,678').shouldHaveCaretAt(8);
    });
  })
});
