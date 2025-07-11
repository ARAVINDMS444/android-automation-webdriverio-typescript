export class LogoutPage {
  static get menuButton(): ChainablePromiseElement {
    return $("~test-Menu");
  }

  static get logoutButton(): ChainablePromiseElement {
    return $("~test-LOGOUT");
  }

  static get loginButton(): ChainablePromiseElement {
    return $("~test-LOGIN");
  }
}
