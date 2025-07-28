// Fixed BrowserStack configuration with correct environment variables
require("dotenv").config()
const chromedriver = require("chromedriver")

module.exports = {
  test_runner: {
    type: "cucumber",
    options: {
      feature_path: "features/**/*.feature",
      require: ["features/step_definitions/**/*.js", "features/support/hooks.js"],
      format: ["progress", "json:reports/cucumber-report.json", "junit:reports/junit-report.xml"],
      tags: "",
    },
  },

  src_folders: ["features"],
  page_objects_path: ["page-objects"],
  output_folder: "reports",

  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    cli_args: [],
  },

  test_settings: {
    default: {
      launch_url: "https://www.flipkart.com",
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--disable-gpu", "--window-size=1400,900"],
        },
        loggingPrefs: {
          browser: "ALL",
        },
      },
      webdriver: {
        start_process: true,
        server_path: chromedriver.path,
      },
      screenshots: {
        enabled: true,
        path: "screenshots",
        on_failure: true,
        on_error: true,
      },
    },

    browserstack: {
      selenium: {
        start_process: false,
        host: "hub.browserstack.com",
        port: 443,
      },

      webdriver: {
        timeout_options: {
          timeout: 150000,
          retry_attempts: 3,
        },
        keep_alive: true,
        start_process: false,
      },

      desiredCapabilities: {
        "bstack:options": {
          os: "Windows",
          osVersion: "11",
          local: "false",
          seleniumVersion: "4.0.0",
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_KEY,
          buildName: "Nightwatch-Cucumber-Build",
          sessionName: "Flipkart Automation Test",
          debug: true,
          networkLogs: true,
          consoleLogs: "info",
        },
        browserName: "Chrome",
        browserVersion: "latest",
      },

      screenshots: {
        enabled: true,
        path: "screenshots",
        on_failure: true,
        on_error: true,
      },
    },
  },
}
