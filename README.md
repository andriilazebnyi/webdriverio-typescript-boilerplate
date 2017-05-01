# WebdriverIO TypeScript Boilerplate

Quick start with WebdriverIO + TypeScript + Mocha.

## Getting Started

Clone this repo
```bash
git clone git@github.com:andriilazebnyi/webdriverio-typescript-boilerplate.git
```

Install dependencies
```bash
npm install
```

or

```bash
yarn install
```

Run test examples
```bash
npm test
```

## Wdio services

The following Wdio services are used by default:
- [wdio-selenium-standalone-service](https://github.com/webdriverio/wdio-selenium-standalone-service) - takes care of Selenium server start and stop.
- [wdio-screenshots-cleanup-service](https://github.com/andriilazebnyi/wdio-screenshots-cleanup-service) - cleans up failure screenshots folder before tests run.

List of Wdio services can be found on [webdriver.io](http://webdriver.io/) (see Services documentation).

## Wdio reporters

The following Wdio reporters are used by default:
- [wdio-spec-reporter](https://github.com/webdriverio/wdio-spec-reporter) - reports results in spec style. 

List of Wdio reporters can be found on [webdriver.io](http://webdriver.io/) (see Reporters documentation).

## Testing frameworks/Assertion libraries

**Framework:** [Mocha](https://mochajs.org/) with [wdio-mocha-framework](https://github.com/webdriverio/wdio-mocha-framework). More details on frameworks can be found [here](http://webdriver.io/guide/testrunner/frameworks.html).

**Assertion library**: [Chai](http://chaijs.com/). With Chai you can use BDD or TDD style for your tests.

## Browser

Default browser is Chrome. Other can be added via capabilities.
 
## Browser profiles and extensions

### Chrome

There is no Wdio service yet that can create custom Chrome profile. However, ChromeOptions can be used to achieve that.

ChromeOptions (and Capabilities also) documentation can be found [here](https://sites.google.com/a/chromium.org/chromedriver/capabilities).

Use `--user-data-dir` to load your custom profile.

```typescript
  // wdio.conf.ts
  ...
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--user-data-dir=/path/to/your/custom/profile']
    }
  }
```

Or use `--load-extension` if you just want to add Chrome extension to clear Chrome profile.
```typescript
  // wdio.conf.ts
  ...
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--load-extension=/path/to/your/unzipped/chrome/extension']
    }
  }
```

However, you will need to encode your extension in `base64` format in order to use it with remote webdriver and use `extesnsions` ChromeOptions property instead of `args`.

**NOTE.** Extension should be packed as `.zip` or `.crx` file.

```typescript
  // wdio.conf.ts
  ...
  const chromeExtBase64 = fs.readFileSync('/path/to/your/packed/chrome/extension.zip', 'base64')
  ...
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      extensions: [chromeExtBase64]
    }
  }
```

**What about Chrome preferences?**

Just use `prefs` property to add/change Chrome preferences.

E.g., this is how you can disable password manager.

```typescript
  // wdio.conf.ts
  ...
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      prefs: {
        'credentials_enable_service': false,
        'profile': {
          'password_manager_enabled': false
        }
      }
    }
  }
```

### Firefox

 You need to use [wdio-firefox-profile-service](https://github.com/webdriverio/wdio-firefox-profile-service) in order to be able to use custom Firefox profile and install Firefox extensions.

 See its readme for details.

## Cloud services

By default, any of cloud service is used. However, you can easily add one (like TestingBot, Sauce Labs or BrowserStack).

Check cloud services section in Wdio [doumentation](http://webdriver.io/guide/usage/cloudservices.html).

## Tests examples

### With Page Object pattern

```typescript
  // src/pages/google-search-page.ts
  class GoogleSearchPage {
    public open() {
      browser.url('https://google.com')
    }

    public search(query: string) {
      browser.waitForVisible('input[name=q]')
      browser.setValue('input[name=q]', query)
    }

    public getAllLinksText() {
      browser.waitForVisible('h3 > a')
      return browser.getText('h3 > a')
    }
  }

  const googleSearchPage = new GoogleSearchPage()
  export default googleSearchPage

  // src/specs/google-search-page.ts
  import { expect } from 'chai'
  import googleSearchPage from '../pages/google-search-page'

  describe('Google search feature', () => {
    it('Search for WebdriverIO', () => {
      googleSearchPage.open()
      googleSearchPage.search('WebdriverIO')
      expect(googleSearchPage.getAllLinksText())
        .includes('WebdriverIO - Selenium 2.0 javascript bindings for nodejs',
        'Failed to search WebdriverIO')
    })
  })
```

### Without Page Object pattern

If for some reason you don't like Page Objects 😉

```typescript
  // src/pages/google-search-page.ts
  export function open() {
    browser.url('https://google.com')
  }

  export function search(query: string) {
    browser.waitForVisible('input[name=q]')
    browser.setValue('input[name=q]', query)
  }

  export function getAllLinksText() {
    browser.waitForVisible('h3 > a')
    return browser.getText('h3 > a')
  }

  // src/specs/google-search-page.ts
  import { expect } from 'chai'
  import * as googleSearchPage from '../pages/google-search-page'

  describe('Google search feature', () => {
    it('Search for WebdriverIO', () => {
      googleSearchPage.open()
      googleSearchPage.search('WebdriverIO')
      expect(googleSearchPage.getAllLinksText())
        .includes('WebdriverIO - Selenium 2.0 javascript bindings for nodejs',
        'Failed to search WebdriverIO')
    })
  })
```
