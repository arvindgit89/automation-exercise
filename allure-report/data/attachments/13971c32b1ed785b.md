# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.ts >> Register a new account 
- Location: tests\register.spec.ts:7:5

# Error details

```
Error: page.goto: Could not resolve hostname
Call log:
  - navigating to "https://uat.example.com/", waiting until "load"

```

# Test source

```ts
  1  | import { Page, expect } from "@playwright/test";
  2  | import { envConfig } from "../config/environment";
  3  | 
  4  | export class BasePage {
  5  |   protected page: Page;
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  |   async navigateTo() {
> 10 |     await this.page.goto(envConfig.baseURL);
     |                     ^ Error: page.goto: Could not resolve hostname
  11 |   }
  12 |   async getPageTitle() {
  13 |     return this.page.title();
  14 |   }
  15 | }
  16 | 
```