import {Capability, Browser} from 'selenium-webdriver';


export default () => {
  const capabilities = {
    [Capability.BROWSER_NAME]: Browser.CHROME
  };

  if (process.env.CI) {
    return {
      ...capabilities,
      'browserstack.local': true,
      'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER || process.env.TRAVIS_JOB_NUMBER
    };
  }

  return capabilities;
};