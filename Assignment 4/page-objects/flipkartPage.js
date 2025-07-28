// Page Object for Flipkart operations
const ElementHelper = require("../helper/elementHelper")
const ConsoleHelper = require("../helper/consoleHelper")
const PriceHelper = require("../helper/priceHelper")
const selectors = require("../constants/selectors")

class FlipkartPage {
  constructor(browser) {
    this.browser = browser
    this.elementHelper = new ElementHelper(browser)
  }

  async openHomepage() {
    ConsoleHelper.logStep("Opening Flipkart homepage")
    await this.browser.url("https://www.flipkart.com")
    await this.elementHelper.waitForElement(selectors.homepage.body)
  }

  async searchProduct(product) {
    ConsoleHelper.logStep(`Searching for product: ${product}`)
    await this.elementHelper.pause(1000)
    await this.elementHelper.waitAndSetValue(selectors.homepage.searchInput, product)
    await this.elementHelper.waitAndClick(selectors.homepage.searchButton)
  }

  async waitForResults() {
    ConsoleHelper.logStep("Waiting for search results to load")
    await this.elementHelper.pause(1000)
    ConsoleHelper.logResults("Results loaded")
  }

  async verifySearchResults() {
    ConsoleHelper.logStep("Verifying search results are displayed")
    await this.elementHelper.pause(1000) // Initial pause as per original logic

    // Switch to XPath if the selector is XPath
    await this.elementHelper.switchToXpath()

    // Assert that the "no results" image is NOT present.
    // Using the recommended assert.not.elementPresent()
    await this.browser.assert.not.elementPresent(
      selectors.searchResults.noResultsImage,
      "Expected search results to be displayed, but 'no records found' image was present.",
    )

    ConsoleHelper.logSuccess("Search results are displayed (no 'no records found' image detected).")

    // Switch back to CSS if needed for subsequent steps
    await this.elementHelper.switchToCss()
  }

  async verifyPageTitle(expectedProduct) {
    ConsoleHelper.logStep(`Verifying page title contains: ${expectedProduct}`)
    const title = await this.browser.getTitle()
    ConsoleHelper.logInfo(`Actual page title: "${title}"`)

    // Perform a case-insensitive check
    const titleContainsProduct = title.toLowerCase().includes(expectedProduct.toLowerCase())

    // Use Nightwatch's assert.ok for the custom assertion
    this.browser.assert.ok(
      titleContainsProduct,
      `Page title "${title}" should contain "${expectedProduct}" (case-insensitive).`,
    )

    ConsoleHelper.logSuccess(`Page title verification passed for: ${expectedProduct}`)
  }

  async applyMaxPriceFilter(maxPrice) {
    ConsoleHelper.logStep(`Applying max price filter: ${maxPrice}`)

    await this.browser.click("xpath", selectors.searchResults.priceFilter)
    await this.elementHelper.pause(2000)
    await this.elementHelper.waitForElement(selectors.searchResults.priceSelect)

    await this.elementHelper.executeScript(
      (val) => {
        const selects = document.querySelectorAll("select.Gn\\+jFg")
        if (selects.length >= 2) {
          const secondSelect = selects[1]
          secondSelect.value = val
          secondSelect.dispatchEvent(new Event("change", { bubbles: true }))
        }
      },
      [maxPrice],
    )

    ConsoleHelper.logFilter("max price", PriceHelper.formatPrice(maxPrice))
  }

  async sortByPriceHighToLow() {
    ConsoleHelper.logStep("Sorting by price high to low")
    await this.elementHelper.clickByText(selectors.searchResults.sortByPriceHighToLow)
    await this.elementHelper.pause(2000)
    ConsoleHelper.logSort("Price -- High to Low")
  }

  async verifyFirstProductPriceBelow(maxPrice) {
    ConsoleHelper.logStep(`Verifying first product price is below ${maxPrice}`)
    await this.elementHelper.pause(2000) // Initial pause as per original logic
    ConsoleHelper.logInfo("Checking first product price")

    const priceContainerSelector = selectors.searchResults.productPriceContainer // .CGtC98
    const priceTextSelector = selectors.searchResults.firstProductPrice // .Nx9bqj

    // 1. Wait for the overall product container to be visible
    await this.browser.waitForElementVisible(priceContainerSelector, 10000, false, (result) => {
      if (!result.value) {
        ConsoleHelper.logError(`Product container ${priceContainerSelector} not visible.`)
        this.browser.saveScreenshot(`./screenshots/product_container_not_visible_${Date.now()}.png`)
        this.browser.assert.fail(`Product container ${priceContainerSelector} not visible.`)
      }
    })

    // 2. Wait for the specific price text element to be visible and present
    await this.browser.waitForElementVisible(priceTextSelector, 10000, false, (result) => {
      if (!result.value) {
        ConsoleHelper.logError(`Price text element ${priceTextSelector} not visible.`)
        this.browser.saveScreenshot(`./screenshots/price_element_not_visible_${Date.now()}.png`)
        this.browser.assert.fail(`Price text element ${priceTextSelector} not visible.`)
      }
    })

    // Take a screenshot right before getting the text for debugging
    this.browser.saveScreenshot(`./screenshots/before_get_price_text_${Date.now()}.png`)
    ConsoleHelper.logInfo(`Attempting to get text from ${priceTextSelector} using executeScript.`)

    // Get the text of the price element using browser.execute
    const priceTextResult = await this.browser.execute(
      (selector) => {
        const element = document.querySelector(selector)
        return element ? element.textContent || element.innerText : null
      },
      [priceTextSelector],
    )

    const priceText = priceTextResult.value // The result from execute is in .value

    // Assert that the priceText is not empty or null
    this.browser.assert.ok(
      priceText && priceText.trim() !== "",
      `Price text from ${priceTextSelector} should not be empty or null.`,
    )

    ConsoleHelper.logInfo(`Raw price text: ${priceText}`)
    const numericPrice = PriceHelper.parsePrice(priceText)

    // Use Nightwatch's assert.lessThanOrEqual for the price comparison
    this.browser.assert.lessThanOrEqual(
      numericPrice,
      maxPrice,
      `First product price ₹${numericPrice} should be below or equal to ₹${maxPrice}.`,
    )

    ConsoleHelper.logPrice(numericPrice, `First product price is below ₹${maxPrice}`)
  }
}

module.exports = FlipkartPage
