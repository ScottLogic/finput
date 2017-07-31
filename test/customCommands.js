import {Key, WebElement} from 'selenium-webdriver';
import {nativeText, finputSwitchOptionsButton} from './pageObjects/index';
import {isMac, isChrome, getModifierKey, driver} from './helpers';
import {mapKeys} from './keys';

const shouldSkipModifierKeyTest = async () => {
  const mac = await isMac();
  const chrome = await isChrome();
  return mac && chrome;
};

export default (finputElement) => {
  const typing = (keys) => {
    let unfocusAfter = false;
    let pressModifier = false;
    let switchDelimiter = false;

    const chainFunctions = {};


    chainFunctions.thenSwitchingDelimiters = () => {
      switchDelimiter = true;
      return chainFunctions;
    };

    chainFunctions.thenFocusingOut = () => {
      unfocusAfter = true;
      return chainFunctions;
    };

    chainFunctions.whileModifierPressed = () => {
      pressModifier = true;
      return chainFunctions;
    };

    chainFunctions.shouldShow = (expected) => {
      const withModifierMsg = pressModifier ? "with modifier key" : "";
      const testName = `should show "${expected}" when "${keys}" ${keys.length === 1 ? 'is' : 'are' } pressed ${withModifierMsg}`;

      it(testName, async () => {
        await finputElement().clear();
        await finputElement().click();

        if (pressModifier) {
          const mac = await isMac();
          const chrome = await isChrome();

          if (mac && chrome) {
            console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`);
            return;
          }

          const modifierKey = await getModifierKey();
          await finputElement().sendKeys(Key.chord(modifierKey, mapKeys(keys)));
        } else {
          await finputElement().sendKeys(mapKeys(keys));
        }

        if (switchDelimiter) {
          await finputSwitchOptionsButton().click();
        }

        if (unfocusAfter) {
          await nativeText().click();
        }

        const observed = await finputElement().getAttribute('value');
        expect(observed).toBe(expected);
      });

      return chainFunctions;
    };

    chainFunctions.shouldHaveFocus = (expected) => {
      it(`should have focus: ` + expected, async () => {
        const element = await finputElement();
        const activeElement = await driver.switchTo().activeElement();
        const observed = await WebElement.equals(element, activeElement);
        expect(observed).toBe(expected);
      });

      return chainFunctions;
    };

    chainFunctions.shouldHaveCaretAt = (expected) => {
      it('should have caret at index: ' + expected, async () => {
        const selection = await driver.executeScript(() => {
          return [document.activeElement.selectionStart, document.activeElement.selectionEnd];
        });

        expect(selection[0]).toEqual(selection[1]); // no selection, only caret cursor
        expect(selection[0]).toEqual(expected);
      });

      return chainFunctions;
    };

    return chainFunctions;
  };

  const copyingAndPasting = (text) => {
    const chainFunctions = {};

    chainFunctions.shouldShow = (expected) => {
      const testName = `should show "${expected}" when "${text}" is copied and pasted`;
      it(testName, async () => {
        if (await shouldSkipModifierKeyTest()) {
          console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`)
          return;
        }
        const modifierKey = await getModifierKey();

        await nativeText().clear();
        await nativeText().click();
        await nativeText().sendKeys(text);
        await nativeText().sendKeys(Key.chord(modifierKey, 'a'));
        await nativeText().sendKeys(Key.chord(modifierKey, 'c'));

        await finputElement().clear();
        await finputElement().click();
        await finputElement().sendKeys(Key.chord(modifierKey, 'v'));

        const observed = await finputElement().getAttribute('value');
        expect(observed).toBe(expected);
      });

      return chainFunctions;
    };

    return chainFunctions;
  };

  const cutting = (count) => {
    let text, startPos;
    const chainFunctions = {};

    chainFunctions.characters = () => chainFunctions;

    chainFunctions.from = (t) => {
      text = t;
      return chainFunctions;
    };

    chainFunctions.startingFrom = (start) => {
      startPos = start;
      return chainFunctions;
    };

    chainFunctions.shouldShow = (expected) => {
      const testName = `should show "${expected}" when "${text}" has chars cut`;
      it(testName, async () => {
        if (await shouldSkipModifierKeyTest()) {
          console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`)
          return;
        }
        const modifierKey = await getModifierKey();

        await finputElement().clear();
        await finputElement().click();
        await finputElement().sendKeys(text);
        await finputElement().sendKeys(Key.chord(modifierKey, 'a'));
        await finputElement().sendKeys(mapKeys('←'));
        await finputElement().sendKeys(Array(startPos + 1).join(mapKeys('→')));
        await finputElement().sendKeys(Key.chord(Key.SHIFT, Array(count + 1).join(mapKeys('→'))));
        await finputElement().sendKeys(Key.chord(modifierKey, 'x'));

        const observed = await finputElement().getAttribute('value');
        expect(observed).toBe(expected);
      });
      return chainFunctions;
    };

    return chainFunctions;
  };

  return {typing, copyingAndPasting, cutting};
};
