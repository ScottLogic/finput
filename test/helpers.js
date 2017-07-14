import { Builder, Key, Capability, Browser } from 'selenium-webdriver';

const Platform = {
  MAC: 'MAC'
};

export const driver = new Builder()
  .forBrowser(Browser.CHROME)
  .withCapabilities({
    'browserstack.local': true,
    'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER || process.env.TRAVIS_JOB_NUMBER
  })
  .usingServer('http://localhost:4444/wd/hub')
  .build();
  
export const isMac = async () => {
  const capabilities = await driver.getCapabilities();
  const os = capabilities.get(Capability.PLATFORM);
  return os.toUpperCase().indexOf(Platform.MAC) >= 0;
};

export const isBrowser = async (browserName) => {
  const capabilities = await driver.getCapabilities();
  const browser = capabilities.get(Capability.BROWSER_NAME);
  return browser.indexOf(browserName) >= 0;
};

export const isChrome = async () => isBrowser(Browser.CHROME);

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
