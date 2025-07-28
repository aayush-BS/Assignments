// Element interaction utilities
const ConsoleHelper = require("./consoleHelper")

class ElementHelper {
  constructor(browser) {
    this.browser = browser
  }

  async waitAndClick(selector, timeout = 2000) {
    await this.browser.waitForElementVisible(selector, timeout)
    await this.browser.click(selector)
  }

  async waitAndSetValue(selector, value, timeout = 2000) {
    await this.browser.waitForElementVisible(selector, timeout)
    await this.browser.element(selector).setValue(value)
  }

  async waitForElement(selector, timeout = 2000) {
    return await this.browser.waitForElementVisible(selector, timeout)
  }

  async pause(duration = 1000) {
    await this.browser.pause(duration)
  }

  async switchToXpath() {
    this.browser.useXpath()
  }

  async switchToCss() {
    this.browser.useCss()
  }

  async checkElementsExist(xpath, callback) {
    this.browser.elements("xpath", xpath, callback)
  }

  async executeScript(script, args = []) {
    return await this.browser.execute(script, args)
  }

  async getText(selector, callback) {
    return await this.browser.getText(selector, callback)
  }

  async findByText(text) {
    const element = this.browser.element.findByText(text)
    return {
      click: async () => {
        await element.click()
      },
    }
  }

  async clickByText(text) {
    await this.browser.element.findByText(text).click()
  }

  /**
   * Waits for an element to have non-empty text content.
   * @param {string} selector The CSS selector of the element.
   * @param {number} timeout The maximum time to wait in milliseconds.
   * @param {number} pollInterval The interval to poll for text in milliseconds.
   */
  async waitForText(selector, timeout = 5000, pollInterval = 200) {
    const startTime = Date.now()
    let text = ""

    while (Date.now() - startTime < timeout) {
      try {
        const result = await this.browser.getText(selector)
        text = result.value ? result.value.trim() : ""
        if (text !== "") {
          ConsoleHelper.logInfo(`Text found for ${selector}: "${text}"`)
          return text
        }
      } catch (e) {
        // Element might not be visible yet, or other transient errors
        ConsoleHelper.logInfo(`Waiting for text in ${selector}... (Error: ${e.message})`)
      }
      await this.browser.pause(pollInterval)
    }

    ConsoleHelper.logError(`Timeout waiting for text in element: ${selector}. Current text: "${text}"`)
    throw new Error(`Timeout waiting for text in element: ${selector}`)
  }
}

module.exports = ElementHelper
