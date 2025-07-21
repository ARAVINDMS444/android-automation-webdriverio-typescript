import { Helpers } from "./src/utils/Helpers";
import { TestData } from "./src/utils/TestData";
import { Actions } from "./src/utils/Actions";

export const config: WebdriverIO.Config = {
  runner: "local",
  port: 4723,

  specs: ["./src/tests/**/*.ts"],
  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:automationName": "UIAutomator2",
      "appium:deviceName": "Pixel 8a",
      "appium:appPackage": TestData.TEST_DATA.SWAG_LABS_DEMO_APP_APP_PACKAGE,
      "appium:appActivity": TestData.TEST_DATA.SWAG_LABS_DEMO_APP_APP_ACTIVITY,
      "appium:noReset": true,
      "appium:newCommandTimeout": 300,
    },
  ],

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
          relaxedSecurity: true,
        },
      },
    ],
  ],

  framework: "mocha",

  mochaOpts: {
    ui: "bdd",
    timeout: 240000,
  },

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],
  ],

  // Retry failed spec files up to 2 times
  specFileRetries: 2,
  specFileRetriesDeferred: false,

  /**
   * Runs after all tests are done.
   */
  after: async (): Promise<void> => {
    await Helpers.logOutFromApplication();
    await Actions.closeApp(TestData.TEST_DATA.SWAG_LABS_DEMO_APP_APP_PACKAGE);
  },
};
