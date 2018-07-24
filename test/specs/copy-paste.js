import { load, unload } from '../pageObjects/index';
import { getDriver } from '../helpers';
import { copyingAndPasting, itCopyingAndPasting } from '../customCommands';

describe('copy and paste', async () => {

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
      itCopyingAndPasting.expectCopyingAndPasting = copyingAndPasting({
        driver,
        finputElement: finputDefaultDelimiters,
        nativeText
      });
    });

    itCopyingAndPasting({ tested: `aaaaa`, expected: `` });
    itCopyingAndPasting({ tested: `-12`, expected: `-12.00` });
    itCopyingAndPasting({ tested: `-.9`, expected: `-0.90` });
    itCopyingAndPasting({ tested: `7a7a.8a.`, expected: `77.80` });
  });

  describe('reversed delimiters', () => {

    beforeAll(() => {
      itCopyingAndPasting.expectCopyingAndPasting = copyingAndPasting({
        driver,
        finputElement: finputReversedDelimiters,
        nativeText
      });
    });

    itCopyingAndPasting({ tested: `aaaaa`, expected: `` });
    itCopyingAndPasting({ tested: `-12`, expected: `-12,00` });
    itCopyingAndPasting({ tested: `-,9`, expected: `-0,90` });
    itCopyingAndPasting({ tested: `7a7a,8a,`, expected: `77,80` });
  });
  
});
