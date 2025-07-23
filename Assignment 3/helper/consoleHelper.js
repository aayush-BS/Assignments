const { dynamicPause } = require('./webdriverHelper');

module.exports = {
  logConsoleErrors: function () {
    return new Promise((resolve) => {
      dynamicPause(4000);
      browser.getLog('browser', function (logs) {
        const jsErrors = logs.filter(log => log.level.name === 'SEVERE');

        if (jsErrors.length > 0) {
          console.error('JavaScript Console Errors Detected:');
          jsErrors.forEach(error => {
            console.error(`→ ${error.message}`);
          });
        } else {
          console.log('No JavaScript console errors found.');
        }

        resolve();
      });
    });
  }
};
