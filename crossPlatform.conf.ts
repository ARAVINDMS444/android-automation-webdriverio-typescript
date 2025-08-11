import { TestData } from "./src/utils/TestData";

export const config: WebdriverIO.MultiremoteConfig = {
  runner: "local",

  specs: ["./src/tests/test.cross-platform-flow.ts"],
  maxInstances: 1,

  capabilities: {
    android: {
      port: 4723,
      capabilities: {
        platformName: "Android",
        "appium:automationName": "UIAutomator2",
        "appium:deviceName": "Pixel 8a",
        "appium:appPackage": TestData.TEST_DATA.SWAG_LABS_DEMO_APP_APP_PACKAGE,
        "appium:appActivity": TestData.TEST_DATA.SWAG_LABS_DEMO_APP_APP_ACTIVITY,
        "appium:noReset": true,
        "appium:newCommandTimeout": 300
      }
    },
    web: {
      capabilities: {
        browserName: "chrome"
      }
    }
  },

  logLevel: "info",
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  services: [
    [
      "appium",
      {
        args: {
          relaxedSecurity: true
        }
      }
    ],
  ],

  framework: "mocha",

  mochaOpts: {
    ui: "bdd",
    timeout: 240000
  },

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true
      }
    ]
  ],

  specFileRetries: 2,
  specFileRetriesDeferred: false,
};