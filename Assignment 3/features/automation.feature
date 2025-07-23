Feature: Automation Practice Page

  Scenario: Navigate to the automation practice page
    Given launch the automation practice page
    Then the browser title should match "Automation Practice - Ultimate QA"
    Then All automation hyperlinks must be functional
    Then Record any JS errors from the browser console