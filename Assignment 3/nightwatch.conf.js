require('dotenv').config();

module.exports = {
  src_folders:['features'],
  page_objects_path: ['page-objects'],

  // webdriver: {
  //   start_process: true,
  //   server_path: require('chromedriver').path,
  //   port: 9515,
  // },

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features/**/*.feature',
      require: [
        'features/step_definitions/**/*.js',
        'features/support/hooks.js'
      ]
    }
  },

  // test_settings: {
  //   default: {
  //     desiredCapabilities: {
  //       browserName: 'chrome',
  //       chromeOptions: {
  //         args: ['--no-sandbox', '--disable-gpu']
  //       },
  //       loggingPrefs: {
  //         browser: 'ALL'
  //       }
  //     }
  //   }
  // },
webdriver: {
  start_process: false,
  host: 'hub.browserstack.com',
  port: 443
},    
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--no-sandbox', '--disable-gpu']
        },
        loggingPrefs: {
          browser: 'ALL'
        }
      }
    },
  
    browserstack: {
      webdriver: {
        start_process: false,
        keep_alive: true,
      },
      desiredCapabilities: {
        'bstack:options': {
          os: 'Windows',
          osVersion: '11',
          local: 'false',
          seleniumVersion: '4.0.0',
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
          buildName: 'Nightwatch-Cucumber-Build',
          sessionName: 'Automation Scenario'
        },
        browserName: 'Chrome',
        browserVersion: 'latest'
      }
    }
  }
  
};