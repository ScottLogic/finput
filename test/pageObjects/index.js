import {until} from 'selenium-webdriver';
import {driver, defaultTimeout} from '../helpers';

const rootSelector = {css: '#root'};
const finputDefaultSelector = {css: '#finput-default'};
const finputReversedDelimitersSelector = {css: '#finput-reversed-delimiters'};
const finputSwitchOptionsSelector = {css: '#finput-switch-options'};
const finputSwitchOptionsButtonSelector = {css: '#finput-switch-options-button'};
const nativeTextSelector = {css: '#native-text'};

export const load = async (driver) => {
  await driver.get(`${__baseUrl__}/`);

  const root = () => driver.findElement(rootSelector);
  await driver.wait(until.elementLocated(root), defaultTimeout);

  return {
    driver,
    finputDefaultDelimiters: () => driver.findElement(finputDefaultSelector),
    finputReversedDelimiters: () => driver.findElement(finputReversedDelimitersSelector),
    finputSwitchOptions: () => driver.findElement(finputSwitchOptionsSelector),
    finputSwitchOptionsButton: () => driver.findElement(finputSwitchOptionsButtonSelector),
    nativeText: () => driver.findElement(nativeTextSelector)
  };
};

export const unload = async (driver) => await driver.quit();
