// Modular step definitions
const { Given, Then } = require("@cucumber/cucumber")
const FlipkartPage = require("../../page-objects/flipkartPage")

// Initialize page object
let flipkartPage

Given("I open Flipkart homepage", async function () {
  flipkartPage = new FlipkartPage(this.browser)
  await flipkartPage.openHomepage()
})

Then("I search for {string}", async (product) => {
  await flipkartPage.searchProduct(product)
})

Then("I wait for results to load", async () => {
  await flipkartPage.waitForResults()
})

Then("I verify the search results are displayed", async () => {
  await flipkartPage.verifySearchResults()
})

Then("I verify the page title contains {string}", async (product) => {
  await flipkartPage.verifyPageTitle(product)
})

Then("I apply max price filter of {int}", async (maxPrice) => {
  await flipkartPage.applyMaxPriceFilter(maxPrice)
})

Then("I sort by price high to low", async () => {
  await flipkartPage.sortByPriceHighToLow()
})

Then("I verify the price of first listed product is below 20000", async () => {
  await flipkartPage.verifyFirstProductPriceBelow(20000)
})
