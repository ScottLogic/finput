import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('formatting decimals', () => {
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

  describe('default delimiters', () => {
    beforeAll(async () => {
      test.withEnvironment({
        driver,
        finputElement: finputDefaultDelimiters,
        nativeText
      });
    });

    describe('while focused', () => {
      test().typing(`0`).shouldShow(`0`);
      test().typing(`10`).shouldShow(`10`);
      test().typing(`1←0`).shouldShow(`1`);
      test().typing(`0.5←0`).shouldShow(`0.05`);
      test().typing(`0.5←0`).shouldShow(`0.05`);
      test().typing(`0.5←←0`).shouldShow(`0.5`);
      test().typing(`1.5←←0`).shouldShow(`10.5`);
      test().typing(`0.5←←7`).shouldShow(`7.5`);
      test().typing(`0.5←←←0`).shouldShow(`0.5`);
      test().typing(`.8`).shouldShow(`.8`);
      test().typing(`.8←0`).shouldShow(`.08`);
      test().typing(`.8←←0`).shouldShow(`0.8`);
      test().typing(`123456←←←←←.`).shouldShow(`12.34`);
      test().typing(`12.345`).shouldShow(`12.34`);
      test().typing(`12.34←←↚`).shouldShow(`1,234`);
      test().typing(`12.34←←↚`).shouldShow(`1,234`);
    });

    describe('on blur', () => {
      test().typing(`0.8`).thenBlurring().shouldShow(`0.80`);
      test().typing(`.8`).thenBlurring().shouldShow(`0.80`);
      test().typing(`8.88`).thenBlurring().shouldShow(`8.88`);
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
      test().typing(`0`).shouldShow(`0`);
      test().typing(`10`).shouldShow(`10`);
      test().typing(`1←0`).shouldShow(`1`);
      test().typing(`0,5←0`).shouldShow(`0,05`);
      test().typing(`0,5←0`).shouldShow(`0,05`);
      test().typing(`0,5←←0`).shouldShow(`0,5`);
      test().typing(`1,5←←0`).shouldShow(`10,5`);
      test().typing(`0,5←←7`).shouldShow(`7,5`);
      test().typing(`0,5←←←0`).shouldShow(`0,5`);
      test().typing(`,8`).shouldShow(`,8`);
      test().typing(`,8←0`).shouldShow(`,08`);
      test().typing(`,8←←0`).shouldShow(`0,8`);
      test().typing(`123456←←←←←,`).shouldShow(`12,34`);
      test().typing(`12,345`).shouldShow(`12,34`);
      test().typing(`12,34←←↚`).shouldShow(`1.234`);
      test().typing(`12,34←←↚`).shouldShow(`1.234`);
    });

    describe('on blur', () => {
      test().typing(`0,8`).thenBlurring().shouldShow(`0,80`);
      test().typing(`,8`).thenBlurring().shouldShow(`0,80`);
      test().typing(`8,88`).thenBlurring().shouldShow(`8,88`);
    })
  });

});
