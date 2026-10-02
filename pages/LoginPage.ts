import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.logoutLink = page.locator('a[href="/logout"]');
  }

  async loginToAccount(
    email: string,
    password: string
  ): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoggedInAs(name: string): Promise<void> {
    await expect(
      this.page.getByText(`Logged in as ${name}`)
    ).toBeVisible();
  }

  async logoutFromAccount(): Promise<void> {
    await this.logoutLink.click();
  }

  async verifyLoggedOut(): Promise<void> {
    await expect(this.loginLink).toBeVisible();
  }
}