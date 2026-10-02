# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> Register a new account
- Location: tests\register.spec.ts:5:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { expect, Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export interface RegistrationData {
  5  |   name: string;
  6  |   password: string;
  7  |   firstName: string;
  8  |   lastName: string;
  9  |   address: string;
  10 |   country: string;
  11 |   state: string;
  12 |   city: string;
  13 |   zipcode: string;
  14 |   mobileNumber: string;
  15 | }
  16 | 
  17 | export class RegisterPage extends BasePage {
  18 |   private readonly nameInput: Locator;
  19 |   private readonly emailInput: Locator;
  20 |   private readonly signupButton: Locator;
  21 |   private readonly genderMaleRadio: Locator;
  22 |   private readonly passwordInput: Locator;
  23 |   private readonly firstNameInput: Locator;
  24 |   private readonly lastNameInput: Locator;
  25 |   private readonly addressInput: Locator;
  26 |   private readonly countrySelect: Locator;
  27 |   private readonly stateInput: Locator;
  28 |   private readonly cityInput: Locator;
  29 |   private readonly zipcodeInput: Locator;
  30 |   private readonly mobileNumberInput: Locator;
  31 |   private readonly createAccountButton: Locator;
  32 |   private readonly accountCreatedMessage: Locator;
  33 | 
  34 |   constructor(page: Page) {
  35 |     super(page);
  36 | 
  37 |     this.nameInput = page.locator('[data-qa="signup-name"]');
  38 |     this.emailInput = page.locator('[data-qa="signup-email"]');
  39 |     this.signupButton = page.locator('[data-qa="signup-button"]');
  40 |     this.genderMaleRadio = page.locator("#id_gender1");
  41 |     this.passwordInput = page.locator('[data-qa="password"]');
  42 |     this.firstNameInput = page.locator('[data-qa="first_name"]');
  43 |     this.lastNameInput = page.locator('[data-qa="last_name"]');
  44 |     this.addressInput = page.locator('[data-qa="address"]');
  45 |     this.countrySelect = page.locator('[data-qa="country"]');
  46 |     this.stateInput = page.locator('[data-qa="state"]');
  47 |     this.cityInput = page.locator('[data-qa="city"]');
  48 |     this.zipcodeInput = page.locator('[data-qa="zipcode"]');
  49 |     this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
  50 |     this.createAccountButton = page.locator(
  51 |       '[data-qa="create-account"]'
  52 |     );
  53 |     this.accountCreatedMessage = page.locator(
  54 |       '[data-qa="account-created"]'
  55 |     );
  56 |   }
  57 | 
  58 |   async startRegistration(
  59 |     name: string,
  60 |     email: string
  61 |   ): Promise<void> {
> 62 |     await this.nameInput.fill(name);
     |                          ^ Error: locator.fill: Target page, context or browser has been closed
  63 |     await this.emailInput.fill(email);
  64 |     await this.signupButton.click();
  65 | 
  66 |     await expect(
  67 |       this.page.getByText("Enter Account Information")
  68 |     ).toBeVisible();
  69 |   }
  70 | 
  71 |   async completeRegistration(
  72 |     data: RegistrationData
  73 |   ): Promise<void> {
  74 |     await this.genderMaleRadio.check();
  75 |     await this.passwordInput.fill(data.password);
  76 |     await this.firstNameInput.fill(data.firstName);
  77 |     await this.lastNameInput.fill(data.lastName);
  78 |     await this.addressInput.fill(data.address);
  79 | 
  80 |     await this.countrySelect.selectOption({
  81 |       label: data.country,
  82 |     });
  83 | 
  84 |     await this.stateInput.fill(data.state);
  85 |     await this.cityInput.fill(data.city);
  86 |     await this.zipcodeInput.fill(data.zipcode);
  87 |     await this.mobileNumberInput.fill(data.mobileNumber);
  88 | 
  89 |     await this.createAccountButton.click();
  90 |   }
  91 | 
  92 |   async verifyAccountCreated(): Promise<void> {
  93 |     await expect(
  94 |       this.accountCreatedMessage
  95 |     ).toContainText(/Account Created!/i);
  96 |   }
  97 | }
```