export class Generators {
  /**
   * Generates a random string of uppercase letters of the specified length.
   * @param length - The length of the random string.
   * @returns A random string with uppercase letters only.
   */
  static generateRandomUppercaseString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");
  }

  /**
   * Generates a random string of lowercase letters of the specified length.
   * @param length - The length of the random string.
   * @returns A random string with lowercase letters only.
   */
  static generateRandomLowercaseString(length: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");
  }

  /**
   * Generates a random string of both uppercase and lowercase letters of the specified length.
   * @param length - The length of the random string.
   * @returns A random string with both uppercase and lowercase letters.
   */
  static generateRandomCaseSensitiveString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");
  }

  /**
   * Generates a random number between the specified min and max values.
   * @param min - The minimum value (inclusive).
   * @param max - The maximum value (inclusive).
   * @returns A random number between min and max.
   */
  static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random string of uppercase letters and numbers of the specified length.
   * @param length - The length of the random string.
   * @returns A random string of uppercase letters and numbers.
   */
  static generateRandomStringAndNumbersUppercase(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");
  }

  /**
   * Generates a random string of lowercase letters and numbers of the specified length.
   * @param length - The length of the random string.
   * @returns A random string of lowercase letters and numbers.
   */
  static generateRandomStringAndNumbersLowercase(length: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");
  }

  /**
   * Generates a random string of uppercase and lowercase letters, and numbers of the specified length.
   * @param length - The length of the random string.
   * @returns A random string of uppercase letters, lowercase letters, and numbers.
   */
  static generateRandomStringAndNumbersCaseSensitive(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join("");
  }

  /**
   * Generates a random phone number of the specified length.
   * @param length - The length of the random phone number.
   * @returns A random phone number as a string.
   */
  static generatePhoneNumber(length: number): string {
    const numbers = "0123456789";
    return Array.from({ length }, () =>
      numbers.charAt(Math.floor(Math.random() * numbers.length)),
    ).join("");
  }
}
