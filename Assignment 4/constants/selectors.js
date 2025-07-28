// All selectors organized in one place
module.exports = {
  homepage: {
    searchInput: 'input[name="q"]',
    searchButton: 'button[type="submit"]',
    body: "body",
    url: "https://www.flipkart.com",
  },

  searchResults: {
    container: '//*[@id="container"]/div/div[3]/div/div/img',
    noResultsImage: '//*[@id="container"]/div/div[3]/div/div/img',
    priceFilter: '//*[@id="container"]/div/div[3]/div[1]/div[1]/div/div[1]/div/section[2]/div[4]/div[3]/select',
    priceSelect: "select.Gn\\+jFg",
    sortByPriceHighToLow: "Price -- High to Low",
    firstProductPrice: ".Nx9bqj",
    productPriceContainer: ".CGtC98",
  },
}
