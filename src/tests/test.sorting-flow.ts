import { $, $$, expect } from "@wdio/globals";
import { ChainablePromiseElement, ChainablePromiseArray } from "webdriverio";
import { Actions } from "../utils/Actions";
import { Helpers } from "../utils/Helpers";

describe("Swag Labs Android App - Sorting Flow", (): void => {
  it("should login and view details of a product", async (): Promise<void> => {
    const usernameInput: ChainablePromiseElement = $("~test-Username");
    const passwordInput: ChainablePromiseElement = $("~test-Password");
    const loginBtn: ChainablePromiseElement = $("~test-LOGIN");

    await usernameInput.setValue("standard_user");
    await passwordInput.setValue("secret_sauce");
    await loginBtn.click();

    const productList: ChainablePromiseElement = $("~test-PRODUCTS");
    await expect(productList).toBeDisplayed();

    const sortButton: ChainablePromiseElement = $(
      "~test-Modal Selector Button",
    );
    await sortButton.click();

    const sortOption: ChainablePromiseElement = $(
      "//android.widget.TextView[@text='Price (low to high)']",
    );
    await sortOption.click();

    let scrolls: number = 0;
    const sortedPrices = new Set<number>();

    while (scrolls < 10) {
      const products: ChainablePromiseArray = $$(
        '//android.widget.TextView[contains(@text, "$")]',
      );
      const count: number = await products.length;

      for (let i: number = 1; i < count; i++) {
        const productPrice: string = await products[i].getText();
        const price: number = parseFloat(productPrice.replace("$", ""));
        sortedPrices.add(price);
      }
      await Actions.scrollDownByPixels(300);
      scrolls++;
    }

    expect(Helpers.isAscending(sortedPrices)).toBeTruthy();
  });
});
