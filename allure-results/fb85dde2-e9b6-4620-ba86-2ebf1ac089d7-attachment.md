# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> User can register, logout, and login with the same credentials
- Location: tests\register.spec.ts:6:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-qa="account-created"]')
Expected substring: "ACCOUNT CREATED!"
Received string:    "Account Created!"
Timeout: 5000ms

Call log:
  - Expect "toContainText" locator('[data-qa="account-created"]') with timeout 5000ms
  - waiting for locator('[data-qa="account-created"]')
    14 × locator resolved to <h2 class="title text-center" data-qa="account-created">…</h2>
       - unexpected value "Account Created!"

```

```yaml
- heading "Account Created!" [level=2]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { signupPage } from "../pages/RegisterPage";
  3  | import { loginPage } from "../pages/LoginPage";
  4  | import registerData from "../test-data/registerData.json";
  5  | 
  6  | test("User can register, logout, and login with the same credentials", async ({ page }) => {
  7  |     const email = `arvind${Date.now()}${Math.random().toString(36).slice(2)}@gmail.com`;
  8  |     const signuppage = new signupPage(page);
  9  |     const loginpage = new loginPage(page);
  10 | 
  11 |     await signuppage.navigateTo();
  12 |     await page.locator('a[href="/login"]').click();
  13 |     await signuppage.newUserRegistration(email);
  14 |     await signuppage.completeRegistration();
> 15 |     await expect(page.locator('[data-qa="account-created"]')).toContainText("ACCOUNT CREATED!");
     |                                                               ^ Error: expect(locator).toContainText(expected) failed
  16 |     await signuppage.continueAfterRegistration();
  17 | 
  18 |     await loginpage.logoutFromAccount();
  19 |     await page.locator('a[href="/login"]').click();
  20 |     await loginpage.loginToAccount(email, registerData.password);
  21 |     await expect(page.getByText(`Logged in as ${registerData.name}`)).toBeVisible();
  22 | });
```