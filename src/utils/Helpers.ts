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

  /**
   * Checks whether the given collection is in ascending order.
   * Supports arrays of numbers, arrays of numeric strings, Java-style lists (Array<number>),
   * and sets of numbers. String arrays are internally converted to numbers for comparison.
   * @param a - The collection to check. Can be number[], string[], Array<number>, or Set<number>.
   * @returns True if the collection is sorted in ascending order, otherwise false.
   * @throws Error if the provided type is unsupported.
   */
  static isAscending(a: any): boolean {
    let arr: number[] = [];

    if (Array.isArray(a)) {
      // Convert strings to numbers if needed
      if (typeof a[0] === "string") {
        arr = a.map((v) => parseFloat(v as string));
      } else {
        arr = a as number[];
      }
    } else if (a instanceof Set) {
      arr = Array.from(a);
    } else {
      throw new Error("Unsupported type");
    }

    // Check ascending order
    for (let i: number = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }
}
