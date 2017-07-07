import { until } from 'selenium-webdriver';
import { driver, defaultTimeout } from '../helpers';

const rootSelector = { css: '#root' };
const finputDefaultSelector = { css: '#finput-default' };
const finputReversedDelimitersSelector = { css: '#finput-reversed-delimiters' };
const finputSwitchOptionsSelector = { css: '#finput-switch-options' }; 
const finputSwitchOptionsButtonSelector = { css: '#finput-switch-options-button' }; 
const nativeTextSelector = { css: '#native-text' };

export const finputDefault = () => driver.findElement(finputDefaultSelector);
export const finputReversedDelimiters = () => driver.findElement(finputReversedDelimitersSelector);
export const finputSwitchOptions = () => driver.findElement(finputSwitchOptionsSelector);
export const finputSwitchOptionsButton = () => driver.findElement(finputSwitchOptionsButtonSelector);
export const nativeText = () => driver.findElement(nativeTextSelector);

const root = () => driver.findElement(rootSelector);
export const load = async () => {
    await driver.get(`${__baseUrl__}/`);
    await driver.wait(until.elementLocated(root), defaultTimeout);
};