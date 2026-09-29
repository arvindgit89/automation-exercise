import { Page, expect } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import registerData from "../test-data/registerData.json";

export class signupPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private nameInput = this.page.locator('input[data-qa="signup-name"]');
    private emailInput = this.page.locator('input[data-qa="signup-email"]');
    private signupButton = this.page.locator('button[data-qa="signup-button"]');
    private passwordInput = this.page.locator('[data-qa="password"]');
    private firstNameInput = this.page.locator('[data-qa="first_name"]');
    private lastNameInput = this.page.locator('[data-qa="last_name"]');
    private addressInput = this.page.locator('[data-qa="address"]');
    private countrySelect = this.page.locator('[data-qa="country"]');
    private stateInput = this.page.locator('[data-qa="state"]');
    private cityInput = this.page.locator('[data-qa="city"]');
    private zipcodeInput = this.page.locator('[data-qa="zipcode"]');
    private mobileNumberInput = this.page.locator('[data-qa="mobile_number"]');
    private createAccountButton = this.page.locator('[data-qa="create-account"]');

    async newUserRegistration(email: string) {
        await this.nameInput.fill(registerData.name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
        await expect(this.page.getByText("Enter Account Information")).toBeVisible();
    }

    async completeRegistration() {
        await this.page.locator("#id_gender1").check();
        await this.passwordInput.fill(registerData.password);
        await this.firstNameInput.fill(registerData.firstName);
        await this.lastNameInput.fill(registerData.lastName);
        await this.addressInput.fill(registerData.address);
        await this.countrySelect.selectOption({ label: registerData.country });
        await this.stateInput.fill(registerData.state);
        await this.cityInput.fill(registerData.city);
        await this.zipcodeInput.fill(registerData.zipcode);
        await this.mobileNumberInput.fill(registerData.mobileNumber);
        await this.createAccountButton.click();
        await expect(this.page.locator('[data-qa="account-created"]')).toBeVisible();
    }

    async continueAfterRegistration() {
        await this.page.locator('[data-qa="continue-button"]').click();
        await expect(this.page.getByText(`Logged in as ${registerData.name}`)).toBeVisible();

    }
}
