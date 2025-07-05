import { ChainablePromiseElement } from "webdriverio";
import { driver } from "@wdio/globals";

export class Actions {
  /**
   * Launches an Android activity using the specified app package and activity name.
   * @param appPackage - The package name of the target app.
   * @param appActivity - The full name of the activity to start.
   */
  static async startActivity(
    appPackage: string,
    appActivity: string,
  ): Promise<void> {
    await driver.startActivity(appPackage, appActivity);
  }

  /**
   * Waits for a specified number of seconds.
   * @param seconds - The number of seconds to wait.
   */
  static async waitForSeconds(seconds: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, seconds));
  }

  /**
   * Waits for an element to be displayed.
   * @param element - The element to wait for.
   * @param timeout - Optional timeout in milliseconds (default is 90000).
   */
  static async waitForElementToBeDisplayed(
    element: ChainablePromiseElement,
    timeout: number = 90000,
  ): Promise<void> {
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Waits for an element to be clickable.
   * @param element - The element to wait for.
   * @param timeout - Optional timeout in milliseconds (default is 5000).
   */
  static async waitForElementToBeClickable(
    element: ChainablePromiseElement,
    timeout: number = 5000,
  ): Promise<void> {
    await element.waitForClickable({ timeout });
  }

  /**
   * Taps on an element.
   * @param element - The element to tap on.
   */
  static async tapOnElement(element: ChainablePromiseElement): Promise<void> {
    await element.click();
  }

  /**
   * Performs multiple taps on the specified element.
   *
   * @param element - The WebdriverIO element to tap on.
   * @param times - The number of times to tap the element (default is 1).
   */
  static async tapMultipleTimesOnElement(
    element: ChainablePromiseElement,
    times: number = 1,
  ): Promise<void> {
    for (let i: number = 0; i < times; i++) {
      await element.click();
    }
  }

  /**
   * Hovers over an element.
   * @param element - The element to hover over.
   */
  static async hoverOnElement(element: ChainablePromiseElement): Promise<void> {
    await element.moveTo();
  }

  /**
   * Enters text into a field.
   * @param element - The input field element.
   * @param text - The text to enter.
   */
  static async enterText(
    element: ChainablePromiseElement,
    text: string,
  ): Promise<void> {
    await element.setValue(text);
  }

  /**
   * Clears text from a field.
   * @param element - The input field element.
   */
  static async clearText(element: ChainablePromiseElement): Promise<void> {
    await element.clearValue();
  }

  /**
   * Gets the text of an element.
   * @param element - The element to get text from.
   * @returns The text of the element.
   */
  static async getTextOfElement(
    element: ChainablePromiseElement,
  ): Promise<string> {
    return await element.getText();
  }

  /**
   * Checks if an element is displayed and asserts that it is truthy.
   * @param element - The element to check.
   */
  static async isElementDisplayed(
    element: ChainablePromiseElement,
  ): Promise<void> {
    const isDisplayed: boolean = await element.isDisplayed();
    expect(isDisplayed).toBeTruthy();
  }

  /**
   * Verifies if the provided text contains the expected text.
   * @param actualText - The full text to search within.
   * @param expectedText - The text to look for.
   * @returns True if the actual text contains the expected text, otherwise false.
   */
  static isTextDisplayed(actualText: string, expectedText: string): boolean {
    return actualText.includes(expectedText);
  }

  /**
   * Opens notifications.
   */
  static async openNotifications(): Promise<void> {
    await driver.openNotifications();
  }

  /**
   * Navigates back within the app.
   */
  static async navigateBack(): Promise<void> {
    await driver.back();
  }

  /**
   * Hides the keyboard.
   */
  static async hideKeyboard(): Promise<void> {
    await driver.hideKeyboard();
  }

  /**
   * Press Done Button on the keyboard.
   */
  static async pressDoneButtonOnKeyboard(): Promise<void> {
    await driver.pressKeyCode(66);
  }

  /**
   * Gets the value of the 'text' attribute from an element.
   * @param element - The element to get the 'text' attribute value from.
   * @returns The value of the 'text' attribute.
   */
  static async getTextAttributeOfElement(
    element: ChainablePromiseElement,
  ): Promise<string> {
    return await element.getAttribute("text");
  }

  /**
   * Gets the value of a specified attribute from an element.
   * @param element - The element to get the attribute value from.
   * @param attribute - The name of the attribute to retrieve.
   * @returns The value of the specified attribute.
   */
  static async getAttributeValueOfElement(
    element: ChainablePromiseElement,
    attribute: string,
  ): Promise<string> {
    return await element.getAttribute(attribute);
  }

  /**
   * Scrolls to the end of a scrollable view.
   * This method uses UiScrollable to scroll until the end of the view is reached.
   * Adjusts the scroll step size and duration as needed.
   */
  static async scrollToEnd(): Promise<void> {
    $(
      "android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)",
    );
  }

  /**
   * Scrolls the scrollable view horizontally one step forward.
   * This method uses UiScrollable to scroll horizontally.
   */
  static async scrollHorizontal(): Promise<void> {
    $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()`,
    );
  }

  /**
   * Reactivates an already running Android app without resetting its state.
   * @param appPackage - The package name of the app to bring to the foreground
   */
  static async activateApp(appPackage: string): Promise<void> {
    await driver.activateApp(appPackage);
  }

  /**
   * Scrolls to the top of a scrollable view.
   * This method uses UiScrollable to scroll until the beginning of the view is reached.
   * Adjusts the scroll step size and duration as needed.
   */
  static async scrollToTop(): Promise<void> {
    await driver.execute("mobile: scroll", {
      strategy: "-android uiautomator",
      selector:
        "new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollToBeginning(1)",
    });
  }

  /**
   * Scrolls the scrollable view until the specified text is visible.
   * This method uses UiScrollable to scroll until the specified text is visible.
   * @param text - The text to scroll into view.
   */
  static async scrollIntoView(text: string): Promise<void> {
    const maxRetries = 20;
    let retries = 0;
    let isTextVisible = false;

    while (retries < maxRetries && !isTextVisible) {
      try {
        // Attempt to scroll to the text
        await driver.execute("mobile: scroll", {
          strategy: "-android uiautomator",
          selector: `new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`,
        });

        // Check if the text is now visible
        const element = await $(`android=new UiSelector().text("${text}")`);
        isTextVisible = await element.isDisplayed();

        if (!isTextVisible) {
          retries++;
        }
      } catch (err) {
        console.error("Error scrolling to text:", err);
        break;
      }
    }

    if (!isTextVisible) {
      console.warn(`Text "${text}" was not found after ${maxRetries} retries.`);
    }
  }

  /**
   * Scrolls the scrollable view horizontally one step forward.
   * This method uses UiScrollable to scroll horizontally.
   */
  static async scrollHorizontalForward(): Promise<void> {
    $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()`,
    );
  }

  /**
   * Scrolls the scrollable view horizontally one step backward.
   * This method uses UiScrollable to scroll horizontally.
   */
  static async scrollHorizontalBackward(): Promise<void> {
    $(
      `android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()`,
    );
  }

  /**
   * Asserts that a specific element is visible on the page with a customizable timeout.
   * @param element - The WebdriverIO Element for the element to be checked.
   * @param timeout - Timeout in milliseconds (default: 50000 ms).
   */
  static async assertElementIsVisible(
    element: WebdriverIO.Element,
    timeout: number = 50000,
  ): Promise<void> {
    await element.waitForDisplayed({ timeout });
    const isDisplayed: boolean = await element.isDisplayed();
    expect(isDisplayed).toBeTruthy();
  }

  /**
   * Asserts that a specific element is hidden on the page with a customizable timeout.
   * @param element - The WebdriverIO Element for the element to be checked.
   * @param timeout - Timeout in milliseconds (default: 50000 ms).
   */
  static async assertElementIsHidden(
    element: WebdriverIO.Element,
    timeout: number = 50000,
  ): Promise<void> {
    await element.waitForDisplayed({ timeout, reverse: true });
    const isDisplayed: boolean = await element.isDisplayed();
    expect(isDisplayed).toBeFalsy();
  }

  /**
   * Asserts if the actual text exactly matches the expected text.
   * @param actualText - The full text to compare.
   * @param expectedText - The expected text to compare against.
   */
  static async assertTextStrictEqual(
    actualText: string,
    expectedText: string,
  ): Promise<void> {
    expect(actualText).toStrictEqual(expectedText);
  }

  /**
   * Performs a horizontal swipe on a specified element in the given direction.
   * @param element The WebdriverIO element to perform the swipe on.
   * @param direction The direction of the swipe ('left' or 'right').
   * @param offsetX The horizontal offset in pixels for the swipe. Default is 20% of the element width.
   * @param offsetY The vertical offset in pixels from the element's center. Default is 0 (center).
   */
  static async swipeOnElement(
    element: ChainablePromiseElement,
    direction: "left" | "right",
    offsetX: number | null = null,
    offsetY: number = 0,
  ): Promise<void> {
    // Resolve the element
    const resolvedElement = element;

    // Ensure elementId is valid
    if (!resolvedElement.elementId) {
      throw new Error(
        "Element ID is undefined. Ensure the element is present before performing a swipe.",
      );
    }

    // Fetch the element's rectangle
    const rect = await driver.getElementRect(await resolvedElement.elementId);

    // Default offsets
    const defaultOffsetX = rect.width * 0.2; // 20% of the element width

    // Calculate swipe coordinates
    const startX =
      direction === "left"
        ? rect.x + rect.width - (offsetX ?? defaultOffsetX)
        : rect.x + (offsetX ?? defaultOffsetX);
    const endX =
      direction === "left"
        ? rect.x + (offsetX ?? defaultOffsetX)
        : rect.x + rect.width - (offsetX ?? defaultOffsetX);
    const posY = rect.y + rect.height / 2 + offsetY; // Vertical center + offset

    // Perform the swipe action using touchPerform
    await driver.touchPerform([
      { action: "press", options: { x: startX, y: posY } },
      { action: "wait", options: { ms: 500 } },
      { action: "moveTo", options: { x: endX, y: posY } },
      { action: "release" },
    ]);
  }

  /**
   * Performs a drag-and-drop operation between two elements using touch actions.
   *
   * @param sourceElement The source WebdriverIO element to drag.
   * @param targetElement The target WebdriverIO element where the source element will be dropped.
   */
  static async dragAndDrop(
    sourceElement: ChainablePromiseElement,
    targetElement: ChainablePromiseElement,
  ): Promise<void> {
    // Get the source element's coordinates and size
    const sourceLocation = await sourceElement.getLocation();
    const sourceSize = await sourceElement.getSize();
    const startX = Math.floor(sourceLocation.x + sourceSize.width / 2);
    const startY = Math.floor(sourceLocation.y + sourceSize.height / 2);

    // Get the target element's coordinates and size
    const targetLocation = await targetElement.getLocation();
    const targetSize = await targetElement.getSize();
    const endX = Math.floor(targetLocation.x + targetSize.width / 2);
    const endY = Math.floor(targetLocation.y + targetSize.height / 2);

    // Perform drag-and-drop using touch actions
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 500 }, // Optional pause for realism
          { type: "pointerMove", duration: 1000, x: endX, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // Release the touch actions
    await driver.releaseActions();
  }

  /**
   * Scrolls down by a specified number of pixels.
   * @param pixels - The number of pixels to scroll down.
   */
  static async scrollDownByPixels(pixels: number): Promise<void> {
    const screenSize = await driver.getWindowRect();
    const startX = screenSize.width / 2;
    const startY = screenSize.height / 2;
    const endY = startY - pixels;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown" },
          { type: "pointerMove", duration: 1000, x: startX, y: endY },
          { type: "pointerUp" },
        ],
      },
    ]);
  }

  /**
   * Scrolls horizontally by a specified number of pixels.
   * @param pixels - The number of pixels to scroll horizontally. Positive values scroll right, negative values scroll left.
   */
  static async scrollHorizontallyByPixels(pixels: number): Promise<void> {
    const screenSize = await driver.getWindowRect();
    const startX = screenSize.width / 2;
    const startY = screenSize.height / 2;
    const endX = startX + pixels; // Scroll horizontally by the specified pixels

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown" },
          { type: "pointerMove", duration: 1000, x: endX, y: startY },
          { type: "pointerUp" },
        ],
      },
    ]);
  }

  /**
   * Scrolls in a specified direction until the given element is visible or until the maximum number of scrolls is reached.
   * @param {string} elementSelector - The selector of the element to be found.
   * @param {"up" | "down" | "left" | "right"} direction - The direction to scroll in.
   * @param {number} [maxScrolls=50] - The maximum number of scroll attempts before failing.
   * @throws {Error} If the element is not found after the maximum number of scrolls.
   */
  static async scrollUntilVisible(
    elementSelector: string,
    direction: "up" | "down" | "left" | "right",
    maxScrolls: number = 50,
  ): Promise<void> {
    let scrolls = 0;

    while (scrolls < maxScrolls) {
      // Check if the element is visible
      const element = $(elementSelector);
      const isVisible = await element.isDisplayed().catch(() => false);

      if (isVisible) {
        return; // Stop scrolling once the element is visible
      }

      // Perform scrolling based on the direction
      switch (direction) {
        case "up":
          await driver.execute("mobile: swipe", { direction: "up" });
          break;
        case "down":
          await driver.execute("mobile: swipe", { direction: "down" });
          break;
        case "left":
          await driver.execute("mobile: swipe", { direction: "left" });
          break;
        case "right":
          await driver.execute("mobile: swipe", { direction: "right" });
          break;
        default:
          throw new Error(`Invalid direction: ${direction}`);
      }

      scrolls++;
    }

    // If the loop completes without finding the element
    throw new Error(
      `Element ${elementSelector} not found after ${maxScrolls} scrolls`,
    );
  }

  /**
   * Launches the specified app by providing the app's package and activity name.
   * @param appPackage The package name of the app.
   * @param appActivity The main activity of the app.
   */
  static async launchApp(
    appPackage: string,
    appActivity: string,
  ): Promise<void> {
    await driver.startActivity(appPackage, appActivity);
  }

  /**
   * Closes the specified app by providing the app's package name.
   * @param appPackage The package name of the app.
   */
  static async closeApp(appPackage: string): Promise<void> {
    await driver.terminateApp(appPackage);
  }
}
