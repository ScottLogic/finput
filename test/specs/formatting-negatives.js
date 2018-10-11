import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('formatting negatives', () => {
  let driver;
  let finputDefaultDelimiters;
  let finputReversedDelimiters;
  let nativeText;

  const test = createCommands();

  beforeAll(async () => {
    driver = getDriver();
    ({
      finputDefaultDelimiters,
      finputReversedDelimiters,
      nativeText
    } = await load(driver));
  });

  afterAll(async () => await unload(driver));

  describe('default delimiters', () => {
    beforeAll(async () => {
      test.withEnvironment({
        driver,
        finputElement: finputDefaultDelimiters,
        nativeText
      });
    });

    describe('while focused', () => {
      test().typing(`-`).shouldShow(`-`);
      test().typing(`-0`).shouldShow(`-0`);
      test().typing(`--`).shouldShow(`-`);
      test().typing(`-←0`).shouldShow(`-`);
      test().typing(`0-`).shouldShow(`0`);
      test().typing(`0-`).shouldShow(`0`);
      test().typing(`-1000`).shouldShow(`-1,000`);
      test().typing(`-1k`).shouldShow(`-1,000`);
    });

    describe('on blur', () => {
      test().typing(`-.`).thenBlurring().shouldShow(`-0.00`);
      test().typing(`-`).thenBlurring().shouldShow(`-0.00`);
      test().typing(`-0`).thenBlurring().shouldShow(`-0.00`);
      test().typing(`-0.`).thenBlurring().shouldShow(`-0.00`);
      test().typing(`-.66`).thenBlurring().shouldShow(`-0.66`);
      test().typing(`-1000`).thenBlurring().shouldShow(`-1,000.00`);
    });
  });

  describe('reversed delimiters', () => {
    beforeAll(async () => {
      test.withEnvironment({
        driver,
        finputElement: finputReversedDelimiters,
        nativeText
      });
    });

    describe('while focused', () => {
      test().typing(`-`).shouldShow(`-`);
      test().typing(`-0`).shouldShow(`-0`);
      test().typing(`--`).shouldShow(`-`);
      test().typing(`-←0`).shouldShow(`-`);
      test().typing(`0-`).shouldShow(`0`);
      test().typing(`0-`).shouldShow(`0`);
      test().typing(`-1000`).shouldShow(`-1.000`);
      test().typing(`-1k`).shouldShow(`-1.000`);
    });

    describe('on blur', () => {
      test().typing(`-,`).thenBlurring().shouldShow(`-0,00`);
      test().typing(`-`).thenBlurring().shouldShow(`-0,00`);
      test().typing(`-0`).thenBlurring().shouldShow(`-0,00`);
      test().typing(`-0,`).thenBlurring().shouldShow(`-0,00`);
      test().typing(`-,66`).thenBlurring().shouldShow(`-0,66`);
      test().typing(`-1000`).thenBlurring().shouldShow(`-1.000,00`);
    });
  });

});
