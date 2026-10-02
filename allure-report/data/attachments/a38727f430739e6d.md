# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> User Login
- Location: tests\login.spec.ts:4:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/account\/$/
Received string:  "https://automationexercise.com/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "https://automationexercise.com/login"

```

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Signup / Login":
        - /url: /login
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
- heading "Login to your account" [level=2]
- textbox "Email Address": arvind@gmail.com
- textbox "Password": admin@123
- paragraph: Your email or password is incorrect!
- button "Login"
- heading "OR" [level=2]
- heading "New User Signup!" [level=2]
- textbox "Name"
- textbox "Email Address"
- button "Signup"
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
  1  | import {Page, expect} from "@playwright/test";
  2  | import { BasePage } from "../pages/BasePage";
  3  | import registerData from "../test-data/registerData.json";
  4  | 
  5  | export class loginPage extends BasePage {
  6  | 
  7  |     constructor(page: Page) {
  8  |         super(page);
  9  |     }
  10 |     private emailInput = this.page.locator('input[data-qa="login-email"]');
  11 |     private passwordInput = this.page.locator('input[data-qa="login-password"]')
  12 |     private loginButton = this.page.locator('button[data-qa="login-button"]');
  13 | 
  14 |     async loginToAccount() {
  15 |         await this.emailInput.fill(registerData.email);
  16 |         await this.passwordInput.fill(registerData.password);
  17 |         await this.loginButton.click();
> 18 |         await expect(this.page).toHaveURL(/\/account\/$/);
     |                                 ^ Error: expect(page).toHaveURL(expected) failed
  19 | 
  20 |     }
  21 | 
  22 | }
```