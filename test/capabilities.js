import {Capability, Browser} from 'selenium-webdriver';

const capabilities = {
  [Capability.PLATFORM]: 'WINDOWS',
  [Capability.BROWSER_NAME]: Browser.CHROME,
  [Capability.VERSION]: 73,
};

// browserstack specific capabilities - https://www.browserstack.com/automate/capabilities
if (process.env.CI) {
  capabilities['browserstack.local'] = true;
  capabilities['browserstack.localIdentifier'] = process.env.BROWSERSTACK_LOCAL_IDENTIFIER || process.env.TRAVIS_JOB_NUMBER;
  capabilities['browserstack.networkLogs'] = true;
  capabilities.os = 'WINDOWS';
  capabilities.os_version = '10';
  capabilities.browser = Browser.CHROME;
  capabilities.browser_version = '73';
}

export default capabilities;