import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { typing, itTyping } from '../customCommands';

describe('formatting decimals', () => {

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
      itTyping({ tested: `0`, expected: `0` });
      itTyping({ tested: `10`, expected: `10` });
      itTyping({ tested: `1←0`, expected: `1` });
      itTyping({ tested: `0.5←0`, expected: `0.05` });
      itTyping({ tested: `0.5←0`, expected: `0.05` });
      itTyping({ tested: `0.5←←0`, expected: `0.5` });
      itTyping({ tested: `1.5←←0`, expected: `10.5` });
      itTyping({ tested: `0.5←←7`, expected: `7.5` });
      itTyping({ tested: `0.5←←←0`, expected: `0.5` });
      itTyping({ tested: `.8`, expected: `.8` });
      itTyping({ tested: `.8←0`, expected: `.08` });
      itTyping({ tested: `.8←←0`, expected: `0.8` });
      itTyping({ tested: `123456←←←←←.`, expected: `12.34` });
      itTyping({ tested: `12.345`, expected: `12.34` });
      itTyping({ tested: `12.34←←↚`, expected: `1,234` });
      itTyping({ tested: `12.34←←↚`, expected: `1,234` });
    });

    describe('on blur', () => {
      itTyping({ tested: `0.8`, blurAfter: true, expected: `0.80` });
      itTyping({ tested: `.8`, blurAfter: true, expected: `0.80` });
      itTyping({ tested: `8.88`, blurAfter: true, expected: `8.88` });
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
      itTyping({ tested: `0`, expected: `0` });
      itTyping({ tested: `10`, expected: `10` });
      itTyping({ tested: `1←0`, expected: `1` });
      itTyping({ tested: `0,5←0`, expected: `0,05` });
      itTyping({ tested: `0,5←0`, expected: `0,05` });
      itTyping({ tested: `0,5←←0`, expected: `0,5` });
      itTyping({ tested: `1,5←←0`, expected: `10,5` });
      itTyping({ tested: `0,5←←7`, expected: `7,5` });
      itTyping({ tested: `0,5←←←0`, expected: `0,5` });
      itTyping({ tested: `,8`, expected: `,8` });
      itTyping({ tested: `,8←0`, expected: `,08` });
      itTyping({ tested: `,8←←0`, expected: `0,8` });
      itTyping({ tested: `123456←←←←←,`, expected: `12,34` });
      itTyping({ tested: `12,345`, expected: `12,34` });
      itTyping({ tested: `12,34←←↚`, expected: `1.234` });
      itTyping({ tested: `12,34←←↚`, expected: `1.234` });
    });

    describe('on blur', () => {
      itTyping({ tested: `0,8`, blurAfter: true, expected: `0,80` });
      itTyping({ tested: `,8`, blurAfter: true, expected: `0,80` });
      itTyping({ tested: `8,88`, blurAfter: true, expected: `8,88` });
    })
  });

});
