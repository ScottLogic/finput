import { Capability, Browser } from 'selenium-webdriver';

export default () => {
  let capabilities = {
      BROWSER_NAME: Browser.CHROME,
  };
  if (process.env.CI) {
    const ciCapabilities = {
      'browserstack.local': true,
      'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER || process.env.TRAVIS_JOB_NUMBER
    };
    capabilities = {
      ...ciCapabilities
    };
  }
  return capabilities;
};
