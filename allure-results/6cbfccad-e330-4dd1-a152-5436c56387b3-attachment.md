# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login with the registered account
- Location: tests\login.spec.ts:12:5

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
  12 | test("Login with the registered account", async ({ page }) => {
  13 |     const generatedUserPath = path.resolve(process.cwd(), "test-data", "generatedUser.json");
  14 |     const generatedUser = JSON.parse(await readFile(generatedUserPath, "utf8")) as GeneratedUser;
  15 |     const loginpage = new loginPage(page);
  16 | 
  17 |     await loginpage.navigateTo();
> 18 |     await page.locator('a[href="/login"]').click();
     |                                            ^ Error: locator.click: Target page, context or browser has been closed
  19 |     await loginpage.loginToAccount(generatedUser.email, generatedUser.password);
  20 | 
  21 |     await expect(page.getByText(`Logged in as ${registerData.name}`)).toBeVisible();
  22 | });
```