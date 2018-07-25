import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import createCommands from '../customCommands';

describe('Switching delimiters', () => {
  let driver;
  let finputSwitchOptions;
  let finputSwitchOptionsButton;

  const test = createCommands();

  beforeAll(async () => {
    driver = getDriver();
    ({
      finputSwitchOptions, 
      finputSwitchOptionsButton
    } = await load(driver));

    test.withEnvironment({
      driver,
      finputElement: finputSwitchOptions, 
      finputSwitchOptionsButton 
    });
  });

  afterAll(async () => await unload(driver));

  // only decimal
  test().typing('.99').thenSwitchingDelimiters().shouldShow('0,99');
  test().typing(',99').thenSwitchingDelimiters().shouldShow('0.99');
  test().typing('.99').thenSwitchingDelimiters().shouldShow('0,99');
  test().typing(',99').thenSwitchingDelimiters().shouldShow('0.99');

  test().typing('-.99').thenSwitchingDelimiters().shouldShow('-0,99');
  test().typing('-,99').thenSwitchingDelimiters().shouldShow('-0.99');
  test().typing('-.99').thenSwitchingDelimiters().shouldShow('-0,99');
  test().typing('-,99').thenSwitchingDelimiters().shouldShow('-0.99');

  // only thousands
  test().typing('1k').thenSwitchingDelimiters().shouldShow('1.000,00');
  test().typing('1k').thenSwitchingDelimiters().shouldShow('1,000.00');
  test().typing('1k').thenSwitchingDelimiters().shouldShow('1.000,00');
  test().typing('1k').thenSwitchingDelimiters().shouldShow('1,000.00');

  test().typing('-1k').thenSwitchingDelimiters().shouldShow('-1.000,00');
  test().typing('-1k').thenSwitchingDelimiters().shouldShow('-1,000.00');
  test().typing('-1k').thenSwitchingDelimiters().shouldShow('-1.000,00');
  test().typing('-1k').thenSwitchingDelimiters().shouldShow('-1,000.00');

  // thousands and decimals
  test().typing('123456.78').thenSwitchingDelimiters().shouldShow('123.456,78');
  test().typing('123456,78').thenSwitchingDelimiters().shouldShow('123,456.78');
  test().typing('123456.78').thenSwitchingDelimiters().shouldShow('123.456,78');
  test().typing('123456,78').thenSwitchingDelimiters().shouldShow('123,456.78');

  test().typing('-123456.78').thenSwitchingDelimiters().shouldShow('-123.456,78');
  test().typing('-123456,78').thenSwitchingDelimiters().shouldShow('-123,456.78');
  test().typing('-123456.78').thenSwitchingDelimiters().shouldShow('-123.456,78');
  test().typing('-123456,78').thenSwitchingDelimiters().shouldShow('-123,456.78');

  // many thousands
  test().typing('1b.99').thenSwitchingDelimiters().shouldShow('1.000.000.000,99');
  test().typing('1b,99').thenSwitchingDelimiters().shouldShow('1,000,000,000.99');
  test().typing('1b.99').thenSwitchingDelimiters().shouldShow('1.000.000.000,99');
  test().typing('1b,99').thenSwitchingDelimiters().shouldShow('1,000,000,000.99');

  test().typing('-1b.99').thenSwitchingDelimiters().shouldShow('-1.000.000.000,99');
  test().typing('-1b,99').thenSwitchingDelimiters().shouldShow('-1,000,000,000.99');
  test().typing('-1b.99').thenSwitchingDelimiters().shouldShow('-1.000.000.000,99');
  test().typing('-1b,99').thenSwitchingDelimiters().shouldShow('-1,000,000,000.99');
});