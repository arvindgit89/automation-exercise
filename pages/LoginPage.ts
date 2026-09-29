import { Page, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class loginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }
    private emailInput = this.page.locator('input[data-qa="login-email"]');
    private passwordInput = this.page.locator('input[data-qa="login-password"]')
    private loginButton = this.page.locator('button[data-qa="login-button"]');

    async loginToAccount(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logoutFromAccount() {
        await this.page.locator('a[href="/logout"]').click();
        await expect(this.page.locator('a[href="/login"]')).toBeVisible();
    }
}