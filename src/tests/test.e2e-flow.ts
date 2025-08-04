import { $, $$, expect } from "@wdio/globals";
import { Actions } from "../utils/Actions.ts";
import { ChainablePromiseElement } from "webdriverio";

describe("Swag Labs iOS App - E2E Flow", (): void => {
  it("should login and find the cheapeast product and add to cart and validate", async (): Promise<void> => {
    const usernameInput: ChainablePromiseElement = $("~test-Username");
    const passwordInput: ChainablePromiseElement = $("~test-Password");
    const loginBtn: ChainablePromiseElement = $("~test-LOGIN");

    await usernameInput.setValue("standard_user");
    await passwordInput.setValue("secret_sauce");
    await loginBtn.click();
    await Actions.waitForSeconds(2000);

    const products: { price: number; index: number }[] = [];
    const seenPrices = new Set<string>();

    let scrollCount: number = 0;
    while (scrollCount < 5) {
      const priceElements = $$(
        '//android.widget.TextView[contains(@text, "$")]',
      );

      for (let i: number = 0; i < (await priceElements.length); i++) {
        const priceText: string = await priceElements[i].getText();
        if (!seenPrices.has(priceText)) {
          seenPrices.add(priceText);
          const numericPrice: number = Number(priceText.replace("$", ""));
          products.push({ price: numericPrice, index: i });
        }
      }

      await Actions.scrollDownByPixels(400);
      await Actions.waitForSeconds(1000);
      scrollCount++;
    }

    products.sort((a, b) => a.price - b.price);
    const cheapestProduct = products[0];
    const actualPrice: number = cheapestProduct.price;
    const addToCartIndex: number = cheapestProduct.index + 1;

    console.log("Product List:", products);

    const addToCartButton: ChainablePromiseElement = $(
      `(//android.widget.TextView[@text="ADD TO CART"])[${addToCartIndex}]`,
    );
    await addToCartButton.click();
    await Actions.waitForSeconds(2000);

    const cartButton: ChainablePromiseElement = $("~test-Cart");
    await cartButton.click();
    await Actions.waitForSeconds(2000);

    const cartItemPriceText: string = await $(
      '//android.widget.TextView[contains(@text, "$")]',
    ).getText();
    const expectedPrice: number = Number(cartItemPriceText.replace("$", ""));

    expect(expectedPrice).toBe(actualPrice);
  });
});
