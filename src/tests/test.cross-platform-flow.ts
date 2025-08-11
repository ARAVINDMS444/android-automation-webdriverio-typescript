import { expect } from "@wdio/globals";
import { Actions } from "../utils/Actions";
import { TestData } from "../utils/TestData";

describe("Swag Labs - Cross Platform Flow", () => {
  it("should login+logout on Android, then login+logout on Web", async () => {
    const multi = browser as unknown as WebdriverIO.MultiRemoteBrowser;

    const android = multi.getInstance("android");
    const web = multi.getInstance("web");

    // Android Flow
    const usernameInputMobile = android.$("~test-Username");
    const passwordInputMobile = android.$("~test-Password");
    const loginBtnMobile = android.$("~test-LOGIN");

    await usernameInputMobile.setValue("standard_user");
    await passwordInputMobile.setValue("secret_sauce");
    await loginBtnMobile.click();

    const productListMobile = android.$("~test-PRODUCTS");
    await expect(productListMobile).toBeDisplayed();

    const menuButtonMobile = android.$("~test-Menu");
    const logoutButtonMobile = android.$("~test-LOGOUT");

    await menuButtonMobile.click();
    await Actions.waitForSeconds(3000);
    await logoutButtonMobile.click();
    await Actions.waitForSeconds(3000);
    await expect(loginBtnMobile).toBeDisplayed();

    await android.execute("mobile: terminateApp", {
      appId: TestData.TEST_DATA.SWAG_LABS_DEMO_APP_APP_PACKAGE,
    });

    // Web Flow
    await web.url("https://www.saucedemo.com/v1/index.html");

    const usernameInputWeb = web.$("#user-name");
    const passwordInputWeb = web.$("#password");
    const loginBtnWeb = web.$("#login-button");

    await usernameInputWeb.setValue("standard_user");
    await passwordInputWeb.setValue("secret_sauce");
    await loginBtnWeb.click();

    await Actions.waitForSeconds(3000);

    const menuBtnWeb = web.$("//button[normalize-space()='Open Menu']");
    await menuBtnWeb.click();

    const logoutBtnWeb = web.$("(//a[normalize-space()='Logout'])[1]");
    await logoutBtnWeb.click();

    await expect(usernameInputWeb).toBeDisplayed();
  });
});
