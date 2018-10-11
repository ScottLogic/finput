import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('cutting', () => {
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
    beforeAll(() => {
      test.withEnvironment({
        driver,
        finputElement: finputDefaultDelimiters
      });
    });

    // Cutting from input (should fully format unless no characters selected)
    // None selected
    test().cutting(0).characters().from(`123456`).startingFrom(0).shouldShow(`123,456`);
    test().cutting(2).characters().from(`12`).startingFrom(2).shouldShow(`12`);

    test().cutting(4).characters().from(`123456`).startingFrom(1).shouldShow(`156.00`);
    test().cutting(5).characters().from(`1234`).startingFrom(0).shouldShow(``);
  });

  describe('reversed delimiters', () => {
    beforeAll(() => {
      test.withEnvironment({
        driver,
        finputElement: finputReversedDelimiters
      });
    });

    // Cutting from input (should fully format unless no characters selected)
    // None selected
    test().cutting(0).characters().from(`123456`).startingFrom(0).shouldShow(`123.456`);
    test().cutting(2).characters().from(`12`).startingFrom(2).shouldShow(`12`);

    test().cutting(4).characters().from(`123456`).startingFrom(1).shouldShow(`156,00`);
    test().cutting(5).characters().from(`1234`).startingFrom(0).shouldShow(``);
  });
});