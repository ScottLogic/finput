import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('shortcuts', () => {
  
  let driver;
  let finputDefaultDelimiters;
  let finputReversedDelimiters;

  beforeAll(async () => {
    driver = getDriver();
    ({ 
      finputDefaultDelimiters,
      finputReversedDelimiters
    } = await load(driver));
  });

  afterAll(async () => await unload(driver));

  describe('default delimiters', () => {

    beforeAll(() => {
      itTyping.expectTyping = typing({
        driver,
        finputElement: finputDefaultDelimiters
      });
    });

    describe('typed into empty field', () => {
      // TODO: fix bug which causes shortcuts to be capped to a limit
      for (let i = 1; i <= 2; i++) {
        itTyping({ tested: `k`.padEnd(i, `k`), expected: `1` + `,000`.padEnd(i * 4, `,000`) });
        itTyping({ tested: `m`.padEnd(i, `m`), expected: `1` + `,000`.padEnd(i * 8, `,000`) });
        itTyping({ tested: `b`.padEnd(i, `b`), expected: `1` + `,000`.padEnd(i * 12, `,000`) });
      }
    });

    describe('entered onto end of integer number', () => {
      itTyping({ tested: `1k`, expected: `1,000` });
      itTyping({ tested: `2m`, expected: `2,000,000` });
      itTyping({ tested: `3b`, expected: `3,000,000,000` });

      itTyping({ tested: `1k1`, expected: `10,001` });
      itTyping({ tested: `2m2`, expected: `20,000,002` });
      itTyping({ tested: `3b3`, expected: `30,000,000,003` });

      itTyping({ tested: `1k1k`, expected: `10,001,000` });
      itTyping({ tested: `1m1m`, expected: `10,000,001,000,000` });
      itTyping({ tested: `1b1b`, expected: `10,000,000,001,000,000,000` });
    });

    describe('entered onto end of decimal number', () => {
      itTyping({ tested: '.1k', expected: '100' });
      itTyping({ tested: '.1m', expected: '100,000' });
      itTyping({ tested: '.1b', expected: '100,000,000' });

      itTyping({ tested: '1.1k', expected: '1,100' });
      itTyping({ tested: '1.1m', expected: '1,100,000' });
      itTyping({ tested: '1.1b', expected: '1,100,000,000' });

      itTyping({ tested: '1.01k', expected: '1,010' });
      itTyping({ tested: '1.01m', expected: '1,010,000' });
      itTyping({ tested: '1.01b', expected: '1,010,000,000' });
    });

    describe('entered into middle of whole number', () => {
      itTyping({ tested: '12345←k', expected: '12,345,000' });
      itTyping({ tested: '12345←m', expected: '12,345,000,000' });
      itTyping({ tested: '12345←b', expected: '12,345,000,000,000' });

      itTyping({ tested: '12345←←k', expected: '12,345,000' });
      itTyping({ tested: '12345←←m', expected: '12,345,000,000' });
      itTyping({ tested: '12345←←b', expected: '12,345,000,000,000' });
    });

    describe('combined', () => {
      itTyping({ tested: `kb`, expected: `1,000,000,000,000` });
      itTyping({ tested: `bk`, expected: `1,000,000,000,000` });

      itTyping({ tested: `km`, expected: `1,000,000,000` });
      itTyping({ tested: `mk`, expected: `1,000,000,000` });

      itTyping({ tested: `bm`, expected: `1,000,000,000,000,000` });
      itTyping({ tested: `mb`, expected: `1,000,000,000,000,000` });
    });
  });

  describe('reversed delimiters', () => {

    beforeAll(() => {
      itTyping.expectTyping = typing({
        driver,
        finputElement: finputReversedDelimiters
      });
    });

    test('typed into empty field', () => {
      // TODO: fix bug which causes shortcuts to be capped to a limit
      for (let i = 1; i <= 2; i++) {
        itTyping({ tested: `k`.padEnd(i, `k`), expected: `1` + `.000`.padEnd(i * 4, `.000`) });
        itTyping({ tested: `m`.padEnd(i, `m`), expected: `1` + `.000`.padEnd(i * 8, `.000`) });
        itTyping({ tested: `b`.padEnd(i, `b`), expected: `1` + `.000`.padEnd(i * 12, `.000`) });
      }
    });

    describe('entered onto end of integer number', () => {
      itTyping({ tested: `1k`, expected: `1.000` });
      itTyping({ tested: `2m`, expected: `2.000.000` });
      itTyping({ tested: `3b`, expected: `3.000.000.000` });

      itTyping({ tested: `1k1`, expected: `10.001` });
      itTyping({ tested: `2m2`, expected: `20.000.002` });
      itTyping({ tested: `3b3`, expected: `30.000.000.003` });

      itTyping({ tested: `1k1k`, expected: `10.001.000` });
      itTyping({ tested: `1m1m`, expected: `10.000.001.000.000` });
      itTyping({ tested: `1b1b`, expected: `10.000.000.001.000.000.000` });
    });

    describe('entered onto end of decimal number', () => {
      itTyping({ tested: ',1k', expected: '100' });
      itTyping({ tested: ',1m', expected: '100.000' });
      itTyping({ tested: ',1b', expected: '100.000.000' });

      itTyping({ tested: '1,1k', expected: '1.100' });
      itTyping({ tested: '1,1m', expected: '1.100.000' });
      itTyping({ tested: '1,1b', expected: '1.100.000.000' });

      itTyping({ tested: '1,01k', expected: '1.010' });
      itTyping({ tested: '1,01m', expected: '1.010.000' });
      itTyping({ tested: '1,01b', expected: '1.010.000.000' });
    });

    describe('entered into middle of whole number', () => {
      itTyping({ tested: '12345←k', expected: '12.345.000' });
      itTyping({ tested: '12345←m', expected: '12.345.000.000' });
      itTyping({ tested: '12345←b', expected: '12.345.000.000.000' });

      itTyping({ tested: '12345←←k', expected: '12.345.000' });
      itTyping({ tested: '12345←←m', expected: '12.345.000.000' });
      itTyping({ tested: '12345←←b', expected: '12.345.000.000.000' });
    });

    describe('combined', () => {
      itTyping({ tested: `kb`, expected: `1.000.000.000.000` });
      itTyping({ tested: `bk`, expected: `1.000.000.000.000` });

      itTyping({ tested: `km`, expected: `1.000.000.000` });
      itTyping({ tested: `mk`, expected: `1.000.000.000` });

      itTyping({ tested: `bm`, expected: `1.000.000.000.000.000` });
      itTyping({ tested: `mb`, expected: `1.000.000.000.000.000` });
    });
  });
});
