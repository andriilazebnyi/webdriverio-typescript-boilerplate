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
