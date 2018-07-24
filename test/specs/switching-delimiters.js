import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('Switching delimiters', () => {
  
  let driver;
  let finputSwitchOptions;
  let finputSwitchOptionsButton;

  beforeAll(async () => {
    driver = getDriver();
    ({
      finputSwitchOptions, 
      finputSwitchOptionsButton
    } = await load(driver));

    itTyping.expectTyping = typing({ 
      driver,
      finputElement: finputSwitchOptions, 
      finputSwitchOptionsButton 
    });
  });

  afterAll(async () => await unload(driver));

  // only decimal
  itTyping({ tested: '.99', switchDelimiter: true , expected: '0,99' });
  itTyping({ tested: ',99', switchDelimiter: true , expected: '0.99' });
  itTyping({ tested: '.99', switchDelimiter: true , expected: '0,99' });
  itTyping({ tested: ',99', switchDelimiter: true , expected: '0.99' });

  itTyping({ tested: '-.99', switchDelimiter: true , expected: '-0,99' });
  itTyping({ tested: '-,99', switchDelimiter: true , expected: '-0.99' });
  itTyping({ tested: '-.99', switchDelimiter: true , expected: '-0,99' });
  itTyping({ tested: '-,99', switchDelimiter: true , expected: '-0.99' });

  // only thousands
  itTyping({ tested: '1k', switchDelimiter: true , expected: '1.000,00' });
  itTyping({ tested: '1k', switchDelimiter: true , expected: '1,000.00' });
  itTyping({ tested: '1k', switchDelimiter: true , expected: '1.000,00' });
  itTyping({ tested: '1k', switchDelimiter: true , expected: '1,000.00' });

  itTyping({ tested: '-1k', switchDelimiter: true , expected: '-1.000,00' });
  itTyping({ tested: '-1k', switchDelimiter: true , expected: '-1,000.00' });
  itTyping({ tested: '-1k', switchDelimiter: true , expected: '-1.000,00' });
  itTyping({ tested: '-1k', switchDelimiter: true , expected: '-1,000.00' });

  // thousands and decimals
  itTyping({ tested: '123456.78', switchDelimiter: true , expected: '123.456,78' });
  itTyping({ tested: '123456,78', switchDelimiter: true , expected: '123,456.78' });
  itTyping({ tested: '123456.78', switchDelimiter: true , expected: '123.456,78' });
  itTyping({ tested: '123456,78', switchDelimiter: true , expected: '123,456.78' });

  itTyping({ tested: '-123456.78', switchDelimiter: true , expected: '-123.456,78' });
  itTyping({ tested: '-123456,78', switchDelimiter: true , expected: '-123,456.78' });
  itTyping({ tested: '-123456.78', switchDelimiter: true , expected: '-123.456,78' });
  itTyping({ tested: '-123456,78', switchDelimiter: true , expected: '-123,456.78' });

  // many thousands
  itTyping({ tested: '1b.99', switchDelimiter: true , expected: '1.000.000.000,99' });
  itTyping({ tested: '1b,99', switchDelimiter: true , expected: '1,000,000,000.99' });
  itTyping({ tested: '1b.99', switchDelimiter: true , expected: '1.000.000.000,99' });
  itTyping({ tested: '1b,99', switchDelimiter: true , expected: '1,000,000,000.99' });

  itTyping({ tested: '-1b.99', switchDelimiter: true , expected: '-1.000.000.000,99' });
  itTyping({ tested: '-1b,99', switchDelimiter: true , expected: '-1,000,000,000.99' });
  itTyping({ tested: '-1b.99', switchDelimiter: true , expected: '-1.000.000.000,99' });
  itTyping({ tested: '-1b,99', switchDelimiter: true , expected: '-1,000,000,000.99' });
});