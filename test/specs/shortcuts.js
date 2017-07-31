import {load, finputReversedDelimiters, finputDefaultDelimiters} from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

describe('shortcuts', () => {
  beforeAll(load);

  describe('default delimiters', () => {
    const {typing} = customCommandsFactory(finputDefaultDelimiters);

    describe('typed into empty field', () => {
      // TODO: fix bug which causes shortcuts to be capped to a limit
      for (let i = 1; i <= 2; i++) {
        typing(`k`.padEnd(i, `k`)).shouldShow(`1` + `,000`.padEnd(i * 4, `,000`));
        typing(`m`.padEnd(i, `m`)).shouldShow(`1` + `,000`.padEnd(i * 8, `,000`));
        typing(`b`.padEnd(i, `b`)).shouldShow(`1` + `,000`.padEnd(i * 12, `,000`));
      }
    });

    describe('entered onto end of integer number', () => {
      typing(`1k`).shouldShow(`1,000`);
      typing(`2m`).shouldShow(`2,000,000`);
      typing(`3b`).shouldShow(`3,000,000,000`);

      typing(`1k1`).shouldShow(`10,001`);
      typing(`2m2`).shouldShow(`20,000,002`);
      typing(`3b3`).shouldShow(`30,000,000,003`);

      typing(`1k1k`).shouldShow(`10,001,000`);
      typing(`1m1m`).shouldShow(`10,000,001,000,000`);
      typing(`1b1b`).shouldShow(`10,000,000,001,000,000,000`);
    });

    describe('entered onto end of decimal number', () => {
      typing('.1k').shouldShow('100');
      typing('.1m').shouldShow('100,000');
      typing('.1b').shouldShow('100,000,000');

      typing('1.1k').shouldShow('1,100');
      typing('1.1m').shouldShow('1,100,000');
      typing('1.1b').shouldShow('1,100,000,000');

      typing('1.01k').shouldShow('1,010');
      typing('1.01m').shouldShow('1,010,000');
      typing('1.01b').shouldShow('1,010,000,000');
    });

    describe('entered into middle of whole number', () => {
      typing('12345←k').shouldShow('12,345,000');
      typing('12345←m').shouldShow('12,345,000,000');
      typing('12345←b').shouldShow('12,345,000,000,000');

      typing('12345←←k').shouldShow('12,345,000');
      typing('12345←←m').shouldShow('12,345,000,000');
      typing('12345←←b').shouldShow('12,345,000,000,000');
    });

    describe('combined', () => {
      typing(`kb`).shouldShow(`1,000,000,000,000`);
      typing(`bk`).shouldShow(`1,000,000,000,000`);

      typing(`km`).shouldShow(`1,000,000,000`);
      typing(`mk`).shouldShow(`1,000,000,000`);

      typing(`bm`).shouldShow(`1,000,000,000,000,000`);
      typing(`mb`).shouldShow(`1,000,000,000,000,000`);
    });
  });

  describe('reversed delimiters', () => {
    const {typing} = customCommandsFactory(finputReversedDelimiters);

    test('typed into empty field', () => {
      // TODO: fix bug which causes shortcuts to be capped to a limit
      for (let i = 1; i <= 2; i++) {
        typing(`k`.padEnd(i, `k`)).shouldShow(`1` + `.000`.padEnd(i * 4, `.000`));
        typing(`m`.padEnd(i, `m`)).shouldShow(`1` + `.000`.padEnd(i * 8, `.000`));
        typing(`b`.padEnd(i, `b`)).shouldShow(`1` + `.000`.padEnd(i * 12, `.000`));
      }
    });

    describe('entered onto end of integer number', () => {
      typing(`1k`).shouldShow(`1.000`);
      typing(`2m`).shouldShow(`2.000.000`);
      typing(`3b`).shouldShow(`3.000.000.000`);

      typing(`1k1`).shouldShow(`10.001`);
      typing(`2m2`).shouldShow(`20.000.002`);
      typing(`3b3`).shouldShow(`30.000.000.003`);

      typing(`1k1k`).shouldShow(`10.001.000`);
      typing(`1m1m`).shouldShow(`10.000.001.000.000`);
      typing(`1b1b`).shouldShow(`10.000.000.001.000.000.000`);
    });

    describe('entered onto end of decimal number', () => {
      typing(',1k').shouldShow('100');
      typing(',1m').shouldShow('100.000');
      typing(',1b').shouldShow('100.000.000');

      typing('1,1k').shouldShow('1.100');
      typing('1,1m').shouldShow('1.100.000');
      typing('1,1b').shouldShow('1.100.000.000');

      typing('1,01k').shouldShow('1.010');
      typing('1,01m').shouldShow('1.010.000');
      typing('1,01b').shouldShow('1.010.000.000');
    });

    describe('entered into middle of whole number', () => {
      typing('12345←k').shouldShow('12.345.000');
      typing('12345←m').shouldShow('12.345.000.000');
      typing('12345←b').shouldShow('12.345.000.000.000');

      typing('12345←←k').shouldShow('12.345.000');
      typing('12345←←m').shouldShow('12.345.000.000');
      typing('12345←←b').shouldShow('12.345.000.000.000');
    });

    describe('combined', () => {
      typing(`kb`).shouldShow(`1.000.000.000.000`);
      typing(`bk`).shouldShow(`1.000.000.000.000`);

      typing(`km`).shouldShow(`1.000.000.000`);
      typing(`mk`).shouldShow(`1.000.000.000`);

      typing(`bm`).shouldShow(`1.000.000.000.000.000`);
      typing(`mb`).shouldShow(`1.000.000.000.000.000`);
    });
  });
});
