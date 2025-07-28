// Price parsing and validation utilities
const ConsoleHelper = require("./consoleHelper")

class PriceHelper {
  static parsePrice(priceText) {
    const numericPrice = Number.parseInt(priceText.replace(/[^0-9]/g, ""), 10)

    if (isNaN(numericPrice)) {
      throw new Error(`Could not parse price from: ${priceText}`)
    }

    return numericPrice
  }

  static validatePriceBelow(actualPrice, maxPrice) {
    const numericPrice = this.parsePrice(actualPrice.toString())

    if (numericPrice > maxPrice) {
      throw new Error(`Product price ₹${numericPrice} is above ₹${maxPrice}`)
    }

    ConsoleHelper.logPrice(numericPrice, `First product price is below ₹${maxPrice}`)
    return true
  }

  static formatPrice(price) {
    return `₹${price}`
  }
}

module.exports = PriceHelper
