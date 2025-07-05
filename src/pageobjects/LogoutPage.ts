export class LogoutPage {
  static menuButton(): ChainablePromiseElement {
    return $("~test-Menu");
  }

  static logoutButton(): ChainablePromiseElement {
    return $("~test-LOGOUT");
  }

  static loginButton(): ChainablePromiseElement {
    return $("~test-LOGIN");
  }
}
