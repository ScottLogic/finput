import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('copy and paste', () => {
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
    beforeAll(() => {
      test.withEnvironment({
        driver,
        finputElement: finputDefaultDelimiters,
        nativeText
      })
    });

    test().copyingAndPasting(`aaaaa`).shouldShow(``);
    test().copyingAndPasting(`-12`).shouldShow(`-12.00`);
    test().copyingAndPasting(`-.9`).shouldShow(`-0.90`);
    test().copyingAndPasting(`7a7a.8a.`).shouldShow(`77.80`);
  });

  describe('reversed delimiters', () => {
    beforeAll(() => {
      test.withEnvironment({
        driver,
        finputElement: finputReversedDelimiters,
        nativeText
      })
    });

    test().copyingAndPasting(`aaaaa`).shouldShow(``);
    test().copyingAndPasting(`-12`).shouldShow(`-12,00`);
    test().copyingAndPasting(`-,9`).shouldShow(`-0,90`);
    test().copyingAndPasting(`7a7a,8a,`).shouldShow(`77,80`);
  });
});
