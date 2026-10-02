# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> Register a new account
- Location: tests\register.spec.ts:7:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://automationexercise.com/", waiting until "load"

```

# Test source

```ts
  1  | import { Page, expect } from "@playwright/test";
  2  | import configData from "../config/configData.json";
  3  | export class BasePage {
  4  |   protected page: Page;
  5  |   constructor(page: Page) {
  6  |     this.page = page;
  7  |   }
  8  |   async navigateTo() {
> 9  |     await this.page.goto(configData.baseURL);
     |                     ^ Error: page.goto: Test timeout of 30000ms exceeded.
  10 |   }
  11 |   async getPageTitle() {
  12 |     return this.page.title();
  13 |   }
  14 | }
  15 | 
```