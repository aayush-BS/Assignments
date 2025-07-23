module.exports = {
    dynamicPause: function (ms = 3000) {
      return browser.pause(ms);
    },
  
    waitForVisible: function (selector, timeout = 5000) {
      return browser.waitForElementVisible(selector, timeout);
    },

    waitForText: function (selector, expectedText, timeout = 5000) {
      return browser.waitForElementPresent(selector, timeout)
                   .assert.containsText(selector, expectedText);
    },

    getAutomationPage: function(){
        return browser.page.automationPage();
    },

    callWindowHandles: function(self,callback){
      self.api.windowHandles(callback);
    },

    switchWindow: function(self,newTabHandle){
      self.api.switchWindow(newTabHandle);
    },

    checkUrlMatch: function(self,href){
      self.api.url(function (urlResult) {
        const currentUrl = urlResult.value;
        // const currentUrl = 'https://www.youtube.com'; 
        self.api.assert.ok(currentUrl.includes(new URL(href).hostname), `URL matches: ${currentUrl}`);
      });
    },

    closeWindow: function(self){
      self.api.closeWindow()
    }
  };
  