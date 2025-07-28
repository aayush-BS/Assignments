// Updated hooks with better error handling for BrowserStack
const { Before, After } = require("@cucumber/cucumber")
const fs = require("fs")
const path = require("path")
const ConsoleHelper = require("../../helper/consoleHelper")

Before((scenario) => {
  ConsoleHelper.logInfo(`Starting scenario: ${scenario.pickle.name}`)
})

After(async function (scenario) {
  try {
    if (scenario.result.status === "FAILED") {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      const screenshotDir = "./screenshots"

      // Ensure screenshots directory exists
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true })
      }

      // Check if browser is available before taking screenshot
      if (this.browser && typeof this.browser.saveScreenshot === "function") {
        const filepath = path.resolve(`${screenshotDir}/${scenario.pickle.name}-${timestamp}.png`)
        await this.browser.saveScreenshot(filepath)
        ConsoleHelper.logError(`Scenario failed. Screenshot saved to ${filepath}`)
      } else {
        ConsoleHelper.logError(`Scenario failed. Browser not available for screenshot.`)
      }
    } else {
      ConsoleHelper.logSuccess(`Scenario completed: ${scenario.pickle.name}`)
    }

    // Close browser after each scenario (only if browser exists)
    if (this.browser && typeof this.browser.end === "function") {
      await this.browser.end()
    }
  } catch (error) {
    ConsoleHelper.logError(`Error in After hook: ${error.message}`)
  }
})
