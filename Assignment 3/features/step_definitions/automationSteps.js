const { Given, Then } = require('@cucumber/cucumber');
const { logConsoleErrors } = require('../../helper/consoleHelper');
const { getAutomationPage } = require('../../helper/webdriverHelper');

Given('launch the automation practice page', function () {
  const page = getAutomationPage();
  return page.navigate().waitForElementVisible('body', 2000);
});

Then('the browser title should match {string}', function (expectedTitle) {
  const page = getAutomationPage();
  return page.validateTitle(expectedTitle);
});

Then('All automation hyperlinks must be functional', function () {
  const page = getAutomationPage();
  return page.validateAllLinksWorking();
});

Then('Record any JS errors from the browser console', function () {
  return logConsoleErrors();
});