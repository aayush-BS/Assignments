@mobileTest
Feature: Flipkart Product Search and Filter

  Scenario Outline: Search and filter product on Flipkart
    Given I open Flipkart homepage
    Then I search for "<product>"
    Then I wait for results to load
    Then I verify the search results are displayed
    Then I verify the page title contains "<product>"
    Then I apply max price filter of 20000
    Then I sort by price high to low
    Then I verify the price of first listed product is below 20000

    Examples:
      | product |
      | mobiles |
