# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: logout.spec.ts >> Logout from the registered account @smoke
- Location: tests\logout.spec.ts:12:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('a[href="/login"]')
    - locator resolved to <a href="/login">…</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { readFile } from "fs/promises";
  3  | import path from "path";
  4  | import { loginPage } from "../pages/LoginPage";
  5  | import registerData from "../test-data/registerData.json";
  6  | 
  7  | type GeneratedUser = {
  8  |     email: string;
  9  |     password: string;
  10 | };
  11 | 
  12 | test("Logout from the registered account @smoke", async ({ page }) => {
  13 |     const generatedUserPath = path.resolve(process.cwd(), "test-data", "generatedUser.json");
  14 |     const generatedUser = JSON.parse(await readFile(generatedUserPath, "utf8")) as GeneratedUser;
  15 |     const loginpage = new loginPage(page);
  16 |     const loggedInAs = page.getByText(`Logged in as ${registerData.name}`);
  17 | 
  18 |     await loginpage.navigateTo();
> 19 |     await page.locator('a[href="/login"]').click();
     |                                            ^ Error: locator.click: Target page, context or browser has been closed
  20 |     await loginpage.loginToAccount(generatedUser.email, generatedUser.password);
  21 |     await expect(loggedInAs).toBeVisible();
  22 | 
  23 |     await loginpage.logoutFromAccount();
  24 |     await expect(page.locator('a[href="/login"]')).toBeVisible();
  25 |     await expect(loggedInAs).toHaveCount(0);
  26 | });
```