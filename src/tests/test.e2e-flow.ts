// Test Scenario
// 1. Login to Swag labs app
// 2. Sort by price ascending and select the cheapest and second cheapest product
// 3. Add the cheapest product and second cheapest to the cart
// 4. Checkout
// 5. Fill checkout information
// 6. Checkout Overview
// 7. Verify the total amount in cart is equal to total cart amount
// 8. Complete the order
// 9. Verify success message

import { $, expect } from "@wdio/globals";
import { Actions } from "../utils/Actions.ts";
import { ChainablePromiseElement } from "webdriverio";

describe("Swag Labs iOS App - E2E Flow", (): void => {
  it("should login and add the cheapest and second cheapest product to cart and validate", async (): Promise<void> => {
    // Step 1: Open the app and login
    const usernameInput: ChainablePromiseElement = $("~test-Username");
    const passwordInput: ChainablePromiseElement = $("~test-Password");
    const loginBtn: ChainablePromiseElement = $("~test-LOGIN");

    await usernameInput.setValue("standard_user");
    await passwordInput.setValue("secret_sauce");
    await loginBtn.click();
    await Actions.waitForSeconds(2000);

    // Step 2: Sort by price ascending and select the cheapest and second cheapest product
    const sortButton: ChainablePromiseElement = $(
      "~test-Modal Selector Button",
    );
    await sortButton.click();

    const sortOption: ChainablePromiseElement = $(
      "//android.widget.TextView[@text='Price (low to high)']",
    );
    await sortOption.click();

    // Step 3: Add the cheapest product and second cheapest to the cart.
    const productCheapestPrice: ChainablePromiseElement = $(
      '(//android.widget.TextView[contains(@text, "$")])[1]',
    );
    const productSecondCheapestPrice: ChainablePromiseElement = $(
      '(//android.widget.TextView[contains(@text, "$")])[2]',
    );
    const productCheapestPriceString: string =
      await productCheapestPrice.getText();
    const productSecondCheapestPriceString: string =
      await productSecondCheapestPrice.getText();
    const productCheapestPriceNumeric: number = Number(
      productCheapestPriceString.replace("$", ""),
    );
    const productSecondCheapestPriceNumeric: number = Number(
      productSecondCheapestPriceString.replace("$", ""),
    );
    const addToCartButtonCheapest: ChainablePromiseElement = $(
      '(//android.widget.TextView[@text="ADD TO CART"])[1]',
    );
    await addToCartButtonCheapest.click();
    const addToCartButtonSecondCheapest: ChainablePromiseElement = $(
      '(//android.widget.TextView[@text="ADD TO CART"])[1]',
    );
    await addToCartButtonSecondCheapest.click();
    await Actions.waitForSeconds(2000);

    // Step 4: Checkout cart
    const cartButton: ChainablePromiseElement = $(
      '//android.view.ViewGroup[@content-desc="test-Cart"]/android.view.ViewGroup/android.widget.ImageView',
    );
    await cartButton.click();
    await Actions.waitForSeconds(2000);
    await Actions.scrollToEnd();
    const checkoutButton: ChainablePromiseElement = $(
      '//android.widget.TextView[@text="CHECKOUT"]',
    );
    await checkoutButton.click();
    await Actions.waitForSeconds(2000);

    // Step 5: Fill checkout information
    const firstNameTextbox: ChainablePromiseElement = $("~test-First Name");
    const lastNameTextbox: ChainablePromiseElement = $("~test-Last Name");
    const zipTextbox: ChainablePromiseElement = $("~test-Zip/Postal Code");
    const continueButton: ChainablePromiseElement = $(
      '//android.widget.TextView[@text="CONTINUE"]',
    );

    await firstNameTextbox.setValue("John");
    await lastNameTextbox.setValue("Doe");
    await zipTextbox.setValue("87882");
    await continueButton.click();
    await Actions.waitForSeconds(3000);

    // Step 6: Checkout Overview
    await Actions.scrollDownByPixels(1500);

    // Step 7: Verify the total amount in cart is equal to total cart amount
    const totalItemPriceText: string = await $(
      '//android.widget.TextView[contains(@text, "Item total")]',
    ).getText();
    const expectedPrice: number = Number(
      totalItemPriceText.replace("Item total: $", ""),
    );
    expect(expectedPrice).toBe(
      productCheapestPriceNumeric + productSecondCheapestPriceNumeric,
    );

    // Step 8: Complete the order
    const finishButton: ChainablePromiseElement = $(
      '//android.widget.TextView[@text="FINISH"]',
    );
    await finishButton.click();

    // Step 9: Verify success message
    const completeMessage: ChainablePromiseElement = $(
      '//android.widget.TextView[@text="CHECKOUT: COMPLETE!"]',
    );
    const sucessMessage: ChainablePromiseElement = $(
      '//android.widget.TextView[@text="THANK YOU FOR YOU ORDER"]',
    );
    expect(await completeMessage.getText()).toEqual("CHECKOUT: COMPLETE!");
    expect(await sucessMessage.getText()).toEqual("THANK YOU FOR YOU ORDER");
  });
});
