import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export interface RegistrationData {
  name: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class RegisterPage extends BasePage {
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly signupButton: Locator;
  private readonly genderMaleRadio: Locator;
  private readonly passwordInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;
  private readonly accountCreatedMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.nameInput = page.locator('[data-qa="signup-name"]');
    this.emailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.genderMaleRadio = page.locator("#id_gender1");
    this.passwordInput = page.locator('[data-qa="password"]');
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator(
      '[data-qa="create-account"]'
    );
    this.accountCreatedMessage = page.locator(
      '[data-qa="account-created"]'
    );
  }

  async startRegistration(
    name: string,
    email: string
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();

    await expect(
      this.page.getByText("Enter Account Information")
    ).toBeVisible();
  }

  async completeRegistration(
    data: RegistrationData
  ): Promise<void> {
    await this.genderMaleRadio.check();
    await this.passwordInput.fill(data.password);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.addressInput.fill(data.address);

    await this.countrySelect.selectOption({
      label: data.country,
    });

    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);

    await this.createAccountButton.click();
  }

  async verifyAccountCreated(): Promise<void> {
    await expect(
      this.accountCreatedMessage
    ).toContainText(/Account Created!/i);
  }
}