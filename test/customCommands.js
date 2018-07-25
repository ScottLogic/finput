import {Key, WebElement} from 'selenium-webdriver';
import {isMac, isChrome, getModifierKey} from './helpers';
import {mapKeys} from './keys';

const shouldSkipModifierKeyTest = async (driver) => {
  const mac = await isMac(driver);
  const chrome = await isChrome(driver);
  return mac && chrome;
};

export default () => {

  let driver;
  let finputElement;
  let finputSwitchOptionsButton;
  let nativeText;

  const test = () => {
    const chainFunctions = {};
    const commands = [];
    let testMessage = '';

    let startPos;
    let textCut;
    let blurAfter = false;
    let pressModifier = false;
    let switchDelimiter = false;

    chainFunctions.copyingAndPasting = (text) => {
      commands.push({
        action: async () => {
          const modifierKey = await getModifierKey(driver);
          
          await nativeText().clear();
          await nativeText().click();
          await nativeText().sendKeys(text);
          await nativeText().sendKeys(Key.chord(modifierKey, 'a'));
          await nativeText().sendKeys(Key.chord(modifierKey, 'c'));
          await nativeText().clear();
          
          await finputElement().clear();
          await finputElement().click();
          await finputElement().sendKeys(Key.chord(modifierKey, 'v'));
        },
        message: `copying and pasting "${text}" `
      });

      return chainFunctions;
    };

    chainFunctions.cutting = (count) => {
      commands.push({
        action: async () => {
          const modifierKey = await getModifierKey(driver);

          await finputElement().clear();
          await finputElement().click();
          await finputElement().sendKeys(textCut);
          await finputElement().sendKeys(Key.chord(modifierKey, 'a'));
          await finputElement().sendKeys(mapKeys('←'));
          await finputElement().sendKeys(Array(startPos + 1).join(mapKeys('→')));
          await finputElement().sendKeys(Key.chord(Key.SHIFT, Array(count + 1).join(mapKeys('→'))));
          await finputElement().sendKeys(Key.chord(modifierKey, 'x'));
        },
        message: `cutting "${count}" `
      });

      return chainFunctions;
    };

    chainFunctions.characters = () => {
      commands.push({
        action: () => {},
        message: `characters `,
        setup: true
      });

      return chainFunctions;
    };

    chainFunctions.from = (text) => {
      commands.push({
        action: () => (textCut = text),
        message: `from "${text}" `,
        setup: true
      });

      return chainFunctions;
    };

    chainFunctions.startingFrom = (start) => {
      commands.push({
        action: () => (startPos = start),
        message: `starting from "${start}" `,
        setup: true
      });

      return chainFunctions;
    };

    chainFunctions.typing = (keys) => {
      commands.push({
        action: async () => {
          await finputElement().clear();
          await finputElement().click();

          if (pressModifier) {
            const mac = await isMac(driver);
            const chrome = await isChrome(driver);

            if (mac && chrome) {
              console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`);
              return false;
            }

            const modifierKey = await getModifierKey(driver);
            await finputElement().sendKeys(Key.chord(modifierKey, mapKeys(keys)));
          } else {
            await finputElement().sendKeys(mapKeys(keys));
          }

          if (switchDelimiter) {
            await finputSwitchOptionsButton().click();
          }

          if (blurAfter) {
            await nativeText().click();
          }
        },
        message: `typing "${keys}" `
      });

      return chainFunctions;
    };

    chainFunctions.thenSwitchingDelimiters = () => {
      commands.push({
        action: () => (switchDelimiter = true),
        message: `then switching delimiters `,
        setup: true
      });

      return chainFunctions;
    };

    chainFunctions.thenBlurring = () => {
      commands.push({
        action: () => (blurAfter = true),
        message: `then blurring `,
        setup: true
      });

      return chainFunctions;
    };

    chainFunctions.whileModifierPressed = () => {
      commands.push({
        action: () => (pressModifier = true),
        message: `with modifier key `,
        setup: true
      });

      return chainFunctions;
    };

    chainFunctions.shouldShow = (expected) => {
      const testMessage = 
        commands
          .map(command => command.message)
          .join('')
          .concat(`should show "${expected}" `);

      it(testMessage, async () => {
        if (await shouldSkipModifierKeyTest(driver)) {
          console.warn(`Skipping test as Command key fails on Chrome/Mac. Note that this will show as a passing test. Test: '${testName}'`)
          return;
        }

        const execCommands = [];

        for (let command of commands)
          if (command.setup === true)
            await command.action();
          else 
            execCommands.push(command);

        let result;
        for (let command of execCommands) {
          result = await command.action();
          if (result === false)
            return;
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

  test.withEnvironment = (env) => {
    ({
      driver,
      finputElement,
      finputSwitchOptionsButton,
      nativeText
    } = env);
  };

  return test;
};
