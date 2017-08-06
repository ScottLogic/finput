import {Capability, Browser} from 'selenium-webdriver';


const capabilities = {
  [Capability.PLATFORM]: 'WINDOWS',
  [Capability.BROWSER_NAME]: Browser.CHROME
};

if (process.env.CI) {
  capabilities['browserstack.local'] = true;
  capabilities['browserstack.localIdentifier'] = process.env.BROWSERSTACK_LOCAL_IDENTIFIER || process.env.TRAVIS_JOB_NUMBER;
  capabilities['browserstack.networkLogs'] = true;
}

export default capabilities;