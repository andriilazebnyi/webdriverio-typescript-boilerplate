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
