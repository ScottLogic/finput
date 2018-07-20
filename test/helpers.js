import {Builder, Key, Capability, Browser} from 'selenium-webdriver';
import capabilities from './capabilities';

const Platform = {
  MAC: 'MAC'
};

const getSeleniumURL = () => {
  console.log('******');
  console.log(process.env.BROWSERSTACK_USERNAME, process.env.BROWSERSTACK_ACCESS_KEY);
  if(process.env.BROWSERSTACK_USERNAME && process.env.BROWSERSTACK_ACCESS_KEY) {
    return `http://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}` +
      `@hub-cloud.browserstack.com/wd/hub`;
  }

  return 'http://localhost:4444/wd/hub'
};



export const driver = new Builder()
  .withCapabilities(capabilities)
  .usingServer(getSeleniumURL())
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
