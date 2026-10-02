# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> User Registration
- Location: tests\register.spec.ts:4:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('input[data-qa="signup-name"]')

```

# Test source

```ts
  1  | import{Page, expect} from "@playwright/test";
  2  | import { BasePage } from "../pages/BasePage";
  3  | import registerData from "../test-data/registerData.json";
  4  | 
  5  | export class signupPage extends BasePage {
  6  | 
  7  |     constructor(page: Page) {
  8  |         super(page);
  9  |     }
  10 | 
  11 |     private nameInput = this.page.locator('input[data-qa="signup-name"]');
  12 |     private emailInput = this.page.locator('input[data-qa="signup-email"]');
  13 |     private signupButton = this.page.locator('button[data-qa="signup-button"]');
  14 | 
  15 |     async newUserRegistration() {
> 16 |         await this.nameInput.fill(registerData.name);
     |                              ^ Error: locator.fill: Target page, context or browser has been closed
  17 |         await this.emailInput.fill(registerData.email);
  18 |         await this.signupButton.click();
  19 |         expect(this.page).toHaveURL("/signup/");
  20 | 
  21 |     }
  22 | }
  23 | 
```