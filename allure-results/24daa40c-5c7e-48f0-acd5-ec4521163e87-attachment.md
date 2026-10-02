# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login with the registered account
- Location: tests\login.spec.ts:5:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://automationexercise.com/", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { envConfig } from "../config/environment";
  3  | 
  4  | export class BasePage {
  5  |   protected readonly page: Page;
  6  |   protected readonly loginLink: Locator;
  7  | 
  8  |   constructor(page: Page) {
  9  |     this.page = page;
  10 |     this.loginLink = page.locator('a[href="/login"]');
  11 |   }
  12 | 
  13 |   async navigateTo(): Promise<void> {
> 14 |     await this.page.goto(envConfig.baseURL, {
     |                     ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  15 |       waitUntil: "domcontentloaded",
  16 |     });
  17 | 
  18 |     await this.handleConsentPopup();
  19 |   }
  20 | 
  21 |   async navigateToLogin(): Promise<void> {
  22 |     await this.loginLink.click();
  23 |   }
  24 | 
  25 |   async getPageTitle(): Promise<string> {
  26 |     return this.page.title();
  27 |   }
  28 | 
  29 |   private async handleConsentPopup(): Promise<void> {
  30 |     const consentButton = this.page
  31 |       .locator(
  32 |         '.fc-cta-consent, button:has-text("Consent"), button:has-text("Accept")'
  33 |       )
  34 |       .first();
  35 | 
  36 |     try {
  37 |       await consentButton.click({ timeout: 5000 });
  38 |     } catch {
  39 |       // Consent dialog is optional and may not appear.
  40 |     }
  41 |   }
  42 | }
```