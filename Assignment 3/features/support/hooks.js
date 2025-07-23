const { Before, After } = require('@cucumber/cucumber');

Before(function (scenario) {
    console.log(`Starting Scenario: ${scenario.pickle.name}`);
  });

After(async function (scenario) {
  console.log('[After Hook] Finished scenario:', scenario.pickle.name);

  if (scenario.result.status === 'FAILED') {
    const screenshotPath = `./screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`;
    await browser.saveScreenshot(screenshotPath);
    console.log(`Screenshot saved to ${screenshotPath}`);
  }
});
