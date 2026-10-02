# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: logout.spec.ts >> Logout from the registered account @smoke
- Location: tests\logout.spec.ts:12:5

# Error details

```
Error: page.goto: NS_ERROR_UNKNOWN_HOST
Call log:
  - navigating to "https://uat.example.com/", waiting until "load"

```

# Page snapshot

```yaml
- article [ref=e3]:
  - generic [ref=e6]:
    - heading "Server Not Found" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - text: Nightly can’t connect to the server at
      - strong [ref=e9]: uat.example.com
      - text: .
    - generic [ref=e10]:
      - heading "What can you do about it?" [level=3] [ref=e11]
      - list [ref=e12]:
        - listitem [ref=e13]: Check to make sure you’ve typed the website address correctly and try again in a few moments.
        - listitem [ref=e14]: Check your network connection.
        - listitem [ref=e15]: Check that Nightly has permission to access the web (you might be connected but behind a firewall).
    - paragraph [ref=e16]:
      - link "Learn more…" [ref=e17] [cursor=pointer]:
        - /url: https://support.mozilla.org/1/firefox/155.0/WINNT/en-US/server-not-found-connection-problem
    - button "Try Again" [ref=e20]
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
     |                     ^ Error: page.goto: NS_ERROR_UNKNOWN_HOST
  11 |   }
  12 |   async getPageTitle() {
  13 |     return this.page.title();
  14 |   }
  15 | }
  16 | 
```