import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('formatting negatives', () => {
  
  let driver;
  let finputDefaultDelimiters;
  let finputReversedDelimiters;
  let nativeText;

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
      itTyping.expectTyping = typing({
        driver,
        finputElement: finputDefaultDelimiters,
        nativeText
      });
    });

    describe('while focused', () => {
      itTyping({ tested: `-`, expected: `-` });
      itTyping({ tested: `-0`, expected: `-0` });
      itTyping({ tested: `--`, expected: `-` });
      itTyping({ tested: `-←0`, expected: `-` });
      itTyping({ tested: `0-`, expected: `0` });
      itTyping({ tested: `0-`, expected: `0` });
      itTyping({ tested: `-1000`, expected: `-1,000` });
      itTyping({ tested: `-1k`, expected: `-1,000` });
    });

    describe('on blur', () => {
      itTyping({ tested: `-.`, blurAfter: true, expected: `-0.00` });
      itTyping({ tested: `-`, blurAfter: true, expected: `-0.00` });
      itTyping({ tested: `-0`, blurAfter: true, expected: `-0.00` });
      itTyping({ tested: `-0.`, blurAfter: true, expected: `-0.00` });
      itTyping({ tested: `-.66`, blurAfter: true, expected: `-0.66` });
      itTyping({ tested: `-1000`, blurAfter: true, expected: `-1,000.00` });
    });
  });

  describe('reversed delimiters', () => {

    beforeAll(() => {
      itTyping.expectTyping = typing({
        driver,
        finputElement: finputReversedDelimiters,
        nativeText
      });
    });

    describe('while focused', () => {
      itTyping({ tested: `-`, expected: `-` });
      itTyping({ tested: `-0`, expected: `-0` });
      itTyping({ tested: `--`, expected: `-` });
      itTyping({ tested: `-←0`, expected: `-` });
      itTyping({ tested: `0-`, expected: `0` });
      itTyping({ tested: `0-`, expected: `0` });
      itTyping({ tested: `-1000`, expected: `-1.000` });
      itTyping({ tested: `-1k`, expected: `-1.000` });
    });

    describe('on blur', () => {
      itTyping({ tested: `-,`, blurAfter: true, expected: `-0,00` });
      itTyping({ tested: `-`, blurAfter: true, expected: `-0,00` });
      itTyping({ tested: `-0`, blurAfter: true, expected: `-0,00` });
      itTyping({ tested: `-0,`, blurAfter: true, expected: `-0,00` });
      itTyping({ tested: `-,66`, blurAfter: true, expected: `-0,66` });
      itTyping({ tested: `-1000`, blurAfter: true, expected: `-1.000,00` });
    });
  });

});
