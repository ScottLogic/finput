import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { cutting, itCutting } from '../customCommands';

describe('cutting', () => {

  let driver;
  let finputDefaultDelimiters;
  let finputReversedDelimiters;

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
      itCutting.expectCutting = cutting({
        driver,
        finputElement: finputDefaultDelimiters
      });
    });

    // Cutting from input (should fully format unless no characters selected)
    // None selected
    itCutting({ cut: 0, startingFrom: 0, tested: `123456`, expected: `123,456` });
    itCutting({ cut: 2, startingFrom: 2, tested: `12`, expected: `12` });
    itCutting({ cut: 4, startingFrom: 1, tested: `123456`, expected: `156.00` });
    itCutting({ cut: 5, startingFrom: 0, tested: `1234`, expected: `` });
  });

  describe('reversed delimiters', () => {

    beforeAll(() => {
      itCutting.expectCutting = cutting({
        driver,
        finputElement: finputReversedDelimiters
      });
    });

    // Cutting from input (should fully format unless no characters selected)
    // None selected
    itCutting({ cut: 0, startingFrom: 0, tested: `123456`, expected: `123.456` });
    itCutting({ cut: 2, startingFrom: 2, tested: `12`, expected: `12` });
    itCutting({ cut: 4, startingFrom: 1, tested: `123456`, expected: `156,00` });
    itCutting({ cut: 5, startingFrom: 0, tested: `1234`,expected: `` });    
  });
  
});