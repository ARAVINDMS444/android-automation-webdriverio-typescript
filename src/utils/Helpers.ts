import { Actions } from "./Actions";
import { LogoutPage } from "../pageobjects/LogoutPage";

export class Helpers {
  /**
   * Logout from the application by navigating back and selecting the sign-out option on the sign-up page.
   */
  static async logOutFromApplication(): Promise<void> {
    await Actions.tapOnElement(LogoutPage.menuButton);
    await Actions.waitForElementToBeDisplayed(LogoutPage.logoutButton);
    await Actions.tapOnElement(LogoutPage.logoutButton);
    await Actions.waitForElementToBeDisplayed(LogoutPage.loginButton);
    await Actions.isElementDisplayed(LogoutPage.loginButton);
  }
}
