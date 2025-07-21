import { $, expect } from "@wdio/globals";

describe("Swag Labs Android App - Purchase Flow", (): void => {
  it("should login and add an item to cart", async (): Promise<void> => {
    // Wait for login screen
    const usernameField: ChainablePromiseElement = $("~test-Username");
    const passwordField: ChainablePromiseElement = $("~test-Password");
    const loginButton: ChainablePromiseElement = $("~test-LOGIN");

    await expect(usernameField).toBeDisplayed();
    await usernameField.setValue("standard_user");
    await passwordField.setValue("secret_sauce");
    await loginButton.click();

    // Verify Products Text is visible
    const productsTitle: ChainablePromiseElement = $(
      '//android.widget.TextView[@text="PRODUCTS"]',
    );
    await expect(productsTitle).toBeDisplayed();

    // Wait for inventory screen
    const firstProduct: ChainablePromiseElement = $(
      '(//android.view.ViewGroup[@content-desc="test-Item"])[1]',
    );
    await expect(firstProduct).toBeDisplayed();

    // Add first product to cart
    const addToCartButton: ChainablePromiseElement = $(
      '(//android.view.ViewGroup[@content-desc="test-ADD TO CART"])[1]',
    );
    await addToCartButton.click();

    // Checkout item (validate REMOVE button appears after adding to cart)
    const removeButton: ChainablePromiseElement = $("~test-REMOVE");
    await expect(removeButton).toBeDisplayed();
    await removeButton.click();
  });
});
