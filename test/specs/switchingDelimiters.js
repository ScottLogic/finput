import { load, finputSwitchOptions, finputSwitchOptionsButton } from '../pageObjects/index';
import { mapKeys } from '../keys';

const typing = (keys) => {
  let times = 1;
  const chainFunctions = {};

  chainFunctions.thenSwitchingOptions = (n) => {
    times = n;

    return chainFunctions;
  };

  chainFunctions.shouldShow = (expected) => {
    it(`should show "${expected}" when "${keys}" are pressed then delimiters are switched ${times} times`, async () => {
      await finputSwitchOptions().clear();
      await finputSwitchOptions().click();
      await finputSwitchOptions().sendKeys(mapKeys(keys));

      for (var index = 0; index < times; index++) {
        await finputSwitchOptionsButton().click();
      }

      const observed = await finputSwitchOptions().getAttribute('value');
      expect(observed).toBe(expected);
    });

    return chainFunctions;
  };

  return chainFunctions;
};

describe('Switching delimiters', () => {
  beforeEach(async () => {
    await load();
  });

  // only decimal
  typing('.99').thenSwitchingOptions(1).shouldShow('0,99');
  typing('.99').thenSwitchingOptions(2).shouldShow('0.99');
  typing('.99').thenSwitchingOptions(3).shouldShow('0,99');
  typing('.99').thenSwitchingOptions(4).shouldShow('0.99');
  typing('-.99').thenSwitchingOptions(1).shouldShow('-0,99');
  typing('-.99').thenSwitchingOptions(2).shouldShow('-0.99');
  typing('-.99').thenSwitchingOptions(3).shouldShow('-0,99');
  typing('-.99').thenSwitchingOptions(4).shouldShow('-0.99');

  // only thousands
  typing('1k').thenSwitchingOptions(1).shouldShow('1.000,00');
  typing('1k').thenSwitchingOptions(2).shouldShow('1,000.00');
  typing('1k').thenSwitchingOptions(3).shouldShow('1.000,00');
  typing('1k').thenSwitchingOptions(4).shouldShow('1,000.00');
  typing('-1k').thenSwitchingOptions(1).shouldShow('-1.000,00');
  typing('-1k').thenSwitchingOptions(2).shouldShow('-1,000.00');
  typing('-1k').thenSwitchingOptions(3).shouldShow('-1.000,00');
  typing('-1k').thenSwitchingOptions(4).shouldShow('-1,000.00');

  // thousands and decimals
  typing('123456.78').thenSwitchingOptions(1).shouldShow('123.456,78');
  typing('123456.78').thenSwitchingOptions(2).shouldShow('123,456.78');
  typing('123456.78').thenSwitchingOptions(3).shouldShow('123.456,78');
  typing('123456.78').thenSwitchingOptions(4).shouldShow('123,456.78');
  typing('-123456.78').thenSwitchingOptions(1).shouldShow('-123.456,78');
  typing('-123456.78').thenSwitchingOptions(2).shouldShow('-123,456.78');
  typing('-123456.78').thenSwitchingOptions(3).shouldShow('-123.456,78');
  typing('-123456.78').thenSwitchingOptions(4).shouldShow('-123,456.78');

  // many thousands
  typing('1b.99').thenSwitchingOptions(1).shouldShow('1.000.000.000,99');
  typing('1b.99').thenSwitchingOptions(2).shouldShow('1,000,000,000.99');
  typing('1b.99').thenSwitchingOptions(3).shouldShow('1.000.000.000,99');
  typing('1b.99').thenSwitchingOptions(4).shouldShow('1,000,000,000.99');
  typing('-1b.99').thenSwitchingOptions(1).shouldShow('-1.000.000.000,99');
  typing('-1b.99').thenSwitchingOptions(2).shouldShow('-1,000,000,000.99');
  typing('-1b.99').thenSwitchingOptions(3).shouldShow('-1.000.000.000,99');
  typing('-1b.99').thenSwitchingOptions(4).shouldShow('-1,000,000,000.99');
});