import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('shortcuts', () => {
  let driver;
  let finputDefaultDelimiters;
  let finputReversedDelimiters;

  const test = createCommands();

  beforeAll(async () => {
    driver = getDriver();
    ({ 
      finputDefaultDelimiters,
      finputReversedDelimiters
    } = await load(driver));
  });

  afterAll(async () => await unload(driver));

  describe('default delimiters', () => {
    beforeAll(async () => {
      test.withEnvironment({
        driver,
        finputElement: finputDefaultDelimiters
      });
    });

    describe('typed into empty field', () => {
      // TODO: fix bug which causes shortcuts to be capped to a limit
      for (let i = 1; i <= 2; i++) {
        test().typing(`k`.padEnd(i, `k`)).shouldShow(`1` + `,000`.padEnd(i * 4, `,000`));
        test().typing(`m`.padEnd(i, `m`)).shouldShow(`1` + `,000`.padEnd(i * 8, `,000`));
        test().typing(`b`.padEnd(i, `b`)).shouldShow(`1` + `,000`.padEnd(i * 12, `,000`));
      }
    });

    describe('entered onto end of integer number', () => {
      test().typing(`1k`).shouldShow(`1,000`);
      test().typing(`2m`).shouldShow(`2,000,000`);
      test().typing(`3b`).shouldShow(`3,000,000,000`);

      test().typing(`1k1`).shouldShow(`10,001`);
      test().typing(`2m2`).shouldShow(`20,000,002`);
      test().typing(`3b3`).shouldShow(`30,000,000,003`);

      test().typing(`1k1k`).shouldShow(`10,001,000`);
      test().typing(`1m1m`).shouldShow(`10,000,001,000,000`);
      test().typing(`1b1b`).shouldShow(`10,000,000,001,000,000,000`);
    });

    describe('entered onto end of decimal number', () => {
      test().typing('.1k').shouldShow('100');
      test().typing('.1m').shouldShow('100,000');
      test().typing('.1b').shouldShow('100,000,000');

      test().typing('1.1k').shouldShow('1,100');
      test().typing('1.1m').shouldShow('1,100,000');
      test().typing('1.1b').shouldShow('1,100,000,000');

      test().typing('1.01k').shouldShow('1,010');
      test().typing('1.01m').shouldShow('1,010,000');
      test().typing('1.01b').shouldShow('1,010,000,000');
    });

    describe('entered into middle of whole number', () => {
      test().typing('12345←k').shouldShow('12,345,000');
      test().typing('12345←m').shouldShow('12,345,000,000');
      test().typing('12345←b').shouldShow('12,345,000,000,000');

      test().typing('12345←←k').shouldShow('12,345,000');
      test().typing('12345←←m').shouldShow('12,345,000,000');
      test().typing('12345←←b').shouldShow('12,345,000,000,000');
    });

    describe('combined', () => {
      test().typing(`kb`).shouldShow(`1,000,000,000,000`);
      test().typing(`bk`).shouldShow(`1,000,000,000,000`);

      test().typing(`km`).shouldShow(`1,000,000,000`);
      test().typing(`mk`).shouldShow(`1,000,000,000`);

      test().typing(`bm`).shouldShow(`1,000,000,000,000,000`);
      test().typing(`mb`).shouldShow(`1,000,000,000,000,000`);
    });
  });

  describe('reversed delimiters', () => {
    beforeAll(async () => {
      test.withEnvironment({
        driver,
        finputElement: finputReversedDelimiters
      });
    });

    test('typed into empty field', () => {
      // TODO: fix bug which causes shortcuts to be capped to a limit
      for (let i = 1; i <= 2; i++) {
        test().typing(`k`.padEnd(i, `k`)).shouldShow(`1` + `.000`.padEnd(i * 4, `.000`));
        test().typing(`m`.padEnd(i, `m`)).shouldShow(`1` + `.000`.padEnd(i * 8, `.000`));
        test().typing(`b`.padEnd(i, `b`)).shouldShow(`1` + `.000`.padEnd(i * 12, `.000`));
      }
    });

    describe('entered onto end of integer number', () => {
      test().typing(`1k`).shouldShow(`1.000`);
      test().typing(`2m`).shouldShow(`2.000.000`);
      test().typing(`3b`).shouldShow(`3.000.000.000`);

      test().typing(`1k1`).shouldShow(`10.001`);
      test().typing(`2m2`).shouldShow(`20.000.002`);
      test().typing(`3b3`).shouldShow(`30.000.000.003`);

      test().typing(`1k1k`).shouldShow(`10.001.000`);
      test().typing(`1m1m`).shouldShow(`10.000.001.000.000`);
      test().typing(`1b1b`).shouldShow(`10.000.000.001.000.000.000`);
    });

    describe('entered onto end of decimal number', () => {
      test().typing(',1k').shouldShow('100');
      test().typing(',1m').shouldShow('100.000');
      test().typing(',1b').shouldShow('100.000.000');

      test().typing('1,1k').shouldShow('1.100');
      test().typing('1,1m').shouldShow('1.100.000');
      test().typing('1,1b').shouldShow('1.100.000.000');

      test().typing('1,01k').shouldShow('1.010');
      test().typing('1,01m').shouldShow('1.010.000');
      test().typing('1,01b').shouldShow('1.010.000.000');
    });

    describe('entered into middle of whole number', () => {
      test().typing('12345←k').shouldShow('12.345.000');
      test().typing('12345←m').shouldShow('12.345.000.000');
      test().typing('12345←b').shouldShow('12.345.000.000.000');

      test().typing('12345←←k').shouldShow('12.345.000');
      test().typing('12345←←m').shouldShow('12.345.000.000');
      test().typing('12345←←b').shouldShow('12.345.000.000.000');
    });

    describe('combined', () => {
      test().typing(`kb`).shouldShow(`1.000.000.000.000`);
      test().typing(`bk`).shouldShow(`1.000.000.000.000`);

      test().typing(`km`).shouldShow(`1.000.000.000`);
      test().typing(`mk`).shouldShow(`1.000.000.000`);

      test().typing(`bm`).shouldShow(`1.000.000.000.000.000`);
      test().typing(`mb`).shouldShow(`1.000.000.000.000.000`);
    });
  });
});
