export const config: WebdriverIO.Config = {
  user: process.env.BROWSERSTACK_USERNAME || "aravindms_MWY8zZ",
  key: process.env.BROWSERSTACK_ACCESS_KEY || "21yNs6bLpojGzojxPDc2",

  hostname: "hub.browserstack.com",

  maxInstances: 10,

  services: [
    [
      "browserstack",
      {
        browserstackLocal: true,
        app: "bs://7032a7dbaa584c483dbbcab1193ac0be2038df7d",
        accessibility: false,
        testObservabilityOptions: {
          buildName: "swag-labs-demo-Android",
          projectName: "Android Browserstack Test",
        },
      },
    ],
  ],

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Google Pixel 8",
      "appium:platformVersion": "14.0",
      "appium:automationName": "UIAutomator2",
      "bstack:options": {
        projectName: "Android Browserstack Test",
        buildName: "swag-labs-demo-Android",
        debug: true,
        networkLogs: true,
        appiumVersion: "2.0.1",
      },
    },
  ],

  specs: ["./src/tests/**/*.ts"],

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

  specFileRetries: 2,
  specFileRetriesDeferred: false,
};
