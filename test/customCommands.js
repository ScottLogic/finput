import {Key, WebElement} from 'selenium-webdriver';
import {isMac, isChrome, getModifierKey, driver} from './helpers';
import { getDriver, load, unload } from './pageObjects/index';
import {mapKeys} from './keys';

const shouldSkipModifierKeyTest = async (driver) => {
  const mac = await isMac(driver);
  const chrome = await isChrome(driver);
  return mac && chrome;
};

export const copyingAndPasting = ({ driver, finputElement, nativeText }) => 
  async ({ tested, expected }) => {

    if (await shouldSkipModifierKeyTest(driver)) {
      console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`)
      return;
    }
    const modifierKey = await getModifierKey(driver);

    await nativeText().clear();
    await nativeText().click();
    await nativeText().sendKeys(tested);
    await nativeText().sendKeys(Key.chord(modifierKey, 'a'));
    await nativeText().sendKeys(Key.chord(modifierKey, 'c'));
    await nativeText().clear();
    
    await finputElement().clear();
    await finputElement().click();
    await finputElement().sendKeys(Key.chord(modifierKey, 'v'));

    const observed = await finputElement().getAttribute('value');
    expect(observed).toBe(expected);
  };

export const cutting = ({ driver, finputElement }) => 
  async ({ cut, startingFrom, tested, expected }) => {

    if (await shouldSkipModifierKeyTest(driver)) {
      console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`)
      return;
    }
    const modifierKey = await getModifierKey(driver);

    await finputElement().clear();
    await finputElement().click();
    await finputElement().sendKeys(tested);
    await finputElement().sendKeys(Key.chord(modifierKey, 'a'));
    await finputElement().sendKeys(mapKeys('←'));
    await finputElement().sendKeys(Array(startingFrom + 1).join(mapKeys('→')));
    await finputElement().sendKeys(Key.chord(Key.SHIFT, Array(cut + 1).join(mapKeys('→'))));
    await finputElement().sendKeys(Key.chord(modifierKey, 'x'));

    const observed = await finputElement().getAttribute('value');
    expect(observed).toBe(expected);
  };

export const typing = ({ 
  driver, 
  finputElement, 
  finputSwitchOptionsButton, 
  nativeText 
}) => 
  async ({ 
    blurAfter = false,
    pressModifier = false,
    switchDelimiter = false,
    tested, 
    expected,
    expectedCaret,
    expectedFocus
  }) => {

    await finputElement().clear();
    await finputElement().click();

    if (pressModifier) {
      const mac = await isMac(driver);
      const chrome = await isChrome(driver);

      if (mac && chrome) {
        console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`);
        return;
      }

      const modifierKey = await getModifierKey(driver);
      await finputElement().sendKeys(Key.chord(modifierKey, mapKeys(tested)));
    } else {
      await finputElement().sendKeys(mapKeys(tested));
    }

    if (switchDelimiter) {
      await finputSwitchOptionsButton().click();
    }

    if (blurAfter) {
      await nativeText().click();
    }

    const observed = await finputElement().getAttribute('value');
    expect(observed).toBe(expected);

    if (expectedCaret !== undefined) {
      const selection = await driver.executeScript(() => {
        return [document.activeElement.selectionStart, document.activeElement.selectionEnd];
      });

      expect(selection[0]).toEqual(selection[1]); // no selection, only caret cursor
      expect(selection[0]).toEqual(expectedCaret);
    }

    if (expectedFocus !== undefined) {
      const element = await finputElement();
      const activeElement = await driver.switchTo().activeElement();
      const observedFocus = await WebElement.equals(element, activeElement);
      expect(observedFocus).toBe(expectedFocus);
    }
  };

export const itCopyingAndPasting = ({ tested, expected }) => {
  it(`should show "${expected}" when "${tested}" is copied and pasted`, 
    async () => await itCopyingAndPasting.expectCopyingAndPasting({ 
      tested, 
      expected 
    }));
};

export const itCutting = ({ 
  cut, 
  startingFrom, 
  tested,
  expected
}) => {
  it(
    `should show "${expected} when "${tested}" ` +
    `has ${cut} chars cut starting from ${startingFrom}`, 
    async () => await itCutting.expectCutting({ 
      cut, 
      startingFrom, 
      tested,
      expected
    }));
};

export const itTyping = ({ 
  blurAfter,
  pressModifier,
  switchDelimiter,
  tested, 
  expected,
  expectedCaret,
  expectedFocus
}) => {
  it(
    `should show "${expected}"` +
    ` when "${tested}" ${tested.length === 1 ? 'is' : 'are'} pressed` +
    `${pressModifier ? " with modifier key" : ""}` + 
    `${expectedCaret !== undefined ? (" should have caret at index: " + expectedCaret) : ""}` +
    `${expectedFocus !== undefined ? (" should have focus: " + expectedFocus): ""}`,
    async () => await itTyping.expectTyping({
      blurAfter,
      pressModifier,
      switchDelimiter,
      tested, 
      expected,
      expectedCaret,
      expectedFocus        
    }));
};

/*
  const withModifierMsg = pressModifier ? "with modifier key" : "";
  const testName = `should show "${expected}" when "${keys}" ${keys.length === 1 ? 'is' : 'are' } pressed ${withModifierMsg}`;

  'should have caret at index: ' + expected
  `should have focus: ` + expected
  */