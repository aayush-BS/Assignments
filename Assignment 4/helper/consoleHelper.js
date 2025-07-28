// Console logging utilities
class ConsoleHelper {
  static logInfo(message) {
    console.log(`[INFO] ${message}`)
  }

  static logError(message) {
    console.error(`[ERROR] ${message}`)
  }

  static logSuccess(message) {
    console.log(`[SUCCESS] ${message}`)
  }

  static logStep(stepName) {
    console.log(`[STEP] Executing: ${stepName}`)
  }

  static logResults(message) {
    console.log(`[RESULTS] ${message}`)
  }

  static logFilter(filterType, value) {
    console.log(`[FILTER] Applied ${filterType}: ${value}`)
  }

  static logSort(sortType) {
    console.log(`[SORT] Applied sorting: ${sortType}`)
  }

  static logPrice(price, context = "") {
    console.log(`[PRICE] ${context} Price: ₹${price}`)
  }
}

module.exports = ConsoleHelper
