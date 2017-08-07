import { load, finputSwitchOptions } from '../pageObjects/index';
import customCommandsFactory from '../customCommands';

const { typing } = customCommandsFactory(finputSwitchOptions);

describe('Switching delimiters', () => {
  beforeAll(load);

  // only decimal
  typing('.99').thenSwitchingDelimiters().shouldShow('0,99');
  typing(',99').thenSwitchingDelimiters().shouldShow('0.99');
  typing('.99').thenSwitchingDelimiters().shouldShow('0,99');
  typing(',99').thenSwitchingDelimiters().shouldShow('0.99');

  typing('-.99').thenSwitchingDelimiters().shouldShow('-0,99');
  typing('-,99').thenSwitchingDelimiters().shouldShow('-0.99');
  typing('-.99').thenSwitchingDelimiters().shouldShow('-0,99');
  typing('-,99').thenSwitchingDelimiters().shouldShow('-0.99');

  // only thousands
  typing('1k').thenSwitchingDelimiters().shouldShow('1.000,00');
  typing('1k').thenSwitchingDelimiters().shouldShow('1,000.00');
  typing('1k').thenSwitchingDelimiters().shouldShow('1.000,00');
  typing('1k').thenSwitchingDelimiters().shouldShow('1,000.00');

  typing('-1k').thenSwitchingDelimiters().shouldShow('-1.000,00');
  typing('-1k').thenSwitchingDelimiters().shouldShow('-1,000.00');
  typing('-1k').thenSwitchingDelimiters().shouldShow('-1.000,00');
  typing('-1k').thenSwitchingDelimiters().shouldShow('-1,000.00');

  // thousands and decimals
  typing('123456.78').thenSwitchingDelimiters().shouldShow('123.456,78');
  typing('123456,78').thenSwitchingDelimiters().shouldShow('123,456.78');
  typing('123456.78').thenSwitchingDelimiters().shouldShow('123.456,78');
  typing('123456,78').thenSwitchingDelimiters().shouldShow('123,456.78');

  typing('-123456.78').thenSwitchingDelimiters().shouldShow('-123.456,78');
  typing('-123456,78').thenSwitchingDelimiters().shouldShow('-123,456.78');
  typing('-123456.78').thenSwitchingDelimiters().shouldShow('-123.456,78');
  typing('-123456,78').thenSwitchingDelimiters().shouldShow('-123,456.78');

  // many thousands
  typing('1b.99').thenSwitchingDelimiters().shouldShow('1.000.000.000,99');
  typing('1b,99').thenSwitchingDelimiters().shouldShow('1,000,000,000.99');
  typing('1b.99').thenSwitchingDelimiters().shouldShow('1.000.000.000,99');
  typing('1b,99').thenSwitchingDelimiters().shouldShow('1,000,000,000.99');

  typing('-1b.99').thenSwitchingDelimiters().shouldShow('-1.000.000.000,99');
  typing('-1b,99').thenSwitchingDelimiters().shouldShow('-1,000,000,000.99');
  typing('-1b.99').thenSwitchingDelimiters().shouldShow('-1.000.000.000,99');
  typing('-1b,99').thenSwitchingDelimiters().shouldShow('-1,000,000,000.99');
});