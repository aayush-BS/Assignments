const { automationUrl } = require("../constants");
const { callWindowHandles, switchWindow, checkUrlMatch, closeWindow } = require("../helper/webdriverHelper");

module.exports = {
    url: automationUrl,
    elements: {
      pageTitle: 'head > title',
      automationLinks: 'div.et_pb_text_inner > ul > li > a'
    },
    commands: [{
      validateTitle(expectedTitle) {
        this.api.assert.titleEquals(expectedTitle);
        return this;
      },
      validateAllLinksWorking() {
        const self = this;
      
        this.api.elements('css selector', 'div.et_pb_text_inner > ul > li > a', function (result) {
          result.value.forEach(function (elementObj, index) {
            const elementId = elementObj['element-6066-11e4-a52e-4f735466cecf'];
      
            if (elementId) {
              self.api.elementIdAttribute(elementId, 'href', function (res) {
                const href = res.value;
                // const href = 'https://www.youtube.com'
      
                if (href && href.startsWith('http')) {
                  self.api.perform(() => {
                    console.log(`Checking link #${index + 1}: ${href}`);
                  });
      
                  self.api.execute(function (url) {
                    window.open(url, '_blank');
                  }, [href]);
      
                  callWindowHandles(self, function (result) {
                    const handles = result && result.value;

                    if (Array.isArray(handles) && handles.length > 1) {
                      const newTabHandle = handles[handles.length - 1];

                      switchWindow(self, newTabHandle);

                      // href = 'https://www.youtube.com';
                      checkUrlMatch(self, href);

                      closeWindow(self);

                      switchWindow(self, handles[0]);
                    } else {
                      console.warn('Window handles not received correctly:', result);
                    }
                  });
                }
              });
            } else {
              console.warn(`Element at index ${index} does not have a valid WebDriver element ID.`);
            }
          });
        });
      
        return this;
      }                
    }]
  };
  