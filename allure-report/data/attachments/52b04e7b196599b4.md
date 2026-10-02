# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: logout.spec.ts >> Logout from an authenticated account
- Location: tests\logout.spec.ts:5:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Logged in as Arvind')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Logged in as Arvind') with timeout 5000ms
  - waiting for getByText('Logged in as Arvind')
  - Target page, context or browser has been closed

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
  - insertion:
    - heading "These are topics related to the article that might interest you" [level=2]: Discover more
    - link "Signup form builder"
    - link "User signup forms"
    - link "Software testing training"
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { loginPage } from "../pages/LoginPage";
  3  | import registerData from "../test-data/registerData.json";
  4  | 
  5  | test("Logout from an authenticated account", async ({ page }) => {
  6  |     const loginpage = new loginPage(page);
  7  |     const loggedInAs = page.getByText(`Logged in as ${registerData.name}`);
  8  | 
  9  |     await loginpage.navigateTo();
  10 |     await page.locator('a[href="/login"]').click();
  11 |     await loginpage.loginToAccount(registerData.email, registerData.password);
> 12 |     await expect(loggedInAs).toBeVisible();
     |                              ^ Error: expect(locator).toBeVisible() failed
  13 | 
  14 |     await loginpage.logoutFromAccount();
  15 |     await expect(page.locator('a[href="/login"]')).toBeVisible();
  16 |     await expect(loggedInAs).toHaveCount(0);
  17 | });
```