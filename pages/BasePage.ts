import { Locator, Page } from "@playwright/test";
import { envConfig } from "../config/environment";

export class BasePage {
  protected readonly page: Page;
  protected readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('a[href="/login"]');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(envConfig.baseURL, {
      waitUntil: "domcontentloaded",
    });

    await this.handleConsentPopup();
  }

  async navigateToLogin(): Promise<void> {
    await this.loginLink.click();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  private async handleConsentPopup(): Promise<void> {
    const consentButton = this.page
      .locator(
        '.fc-cta-consent, button:has-text("Consent"), button:has-text("Accept")'
      )
      .first();

    try {
      await consentButton.click({ timeout: 5000 });
    } catch {
      // Consent dialog is optional and may not appear.
    }
  }
}