import { Builder, Key } from 'selenium-webdriver';

export const driver = new Builder()
  .forBrowser('chrome')
  .usingServer('http://localhost:4444/wd/hub')
    .build();
  
export const isMac = async () => {
    const capabilities = await driver.getCapabilities();
    const os = capabilities.get('platform');
    return os.toUpperCase().indexOf('MAC') >= 0;
};

export const isChrome = async () => {
    const capabilities = await driver.getCapabilities();
    const browser = capabilities.get('browserName');
    return browser.toUpperCase().indexOf('CHROME') >= 0;
};

export const getModifierKey = async () => {
  const mac = await isMac();
  return mac ? Key.COMMAND : Key.CONTROL;
};

afterAll(async () => {
  // Cleanup `process.on('exit')` event handlers to prevent a memory leak caused by the combination of `jest` & `tmp`.
  for (const listener of process.listeners('exit')) {
    listener();
    process.removeListener('exit', listener);
  }
  await driver.quit();
});

export const defaultTimeout = 10e3;