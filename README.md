# Playwright Test Automation Framework

A lightweight UI automation framework built using **Playwright, TypeScript, and the Page Object Model (POM)** for testing core user journeys on the Automation Exercise application.

The framework is designed to provide:

- Clear separation between tests and page interactions
- Reusable Page Objects
- Playwright fixtures for Page Object management
- Externalised test data
- Environment-based configuration
- Cross-browser execution
- Smoke test execution using tags
- Playwright HTML reporting
- Allure reporting
- Trace support for test investigation

---

## Application Under Test

**Automation Exercise**

`https://automationexercise.com/`

---

## Automated Test Scenarios

| Test Scenario | Description | Tag |
|---|---|---|
| Register Account | Creates a new user using a dynamically generated email address | Regression |
| Login | Logs in using registered user credentials | Regression |
| Logout | Verifies that a registered user can successfully log out | `@smoke` |

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Playwright | Browser automation |
| TypeScript | Test development |
| Node.js | Runtime environment |
| Playwright Test | Test runner and assertions |
| Page Object Model | Separation of test logic and page interactions |
| Playwright Fixtures | Page Object dependency management |
| JSON | Test data management |
| Playwright HTML Report | Native test reporting |
| Allure | Enhanced test reporting |

---

## Framework Architecture

```text
automation-exercise/
│
├── config/
│   └── environment.ts
│
├── fixtures/
│   └── test.fixture.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── RegisterPage.ts
│
├── test-data/
│   ├── generatedUser.json
│   └── registerData.json
│
├── tests/
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   └── register.spec.ts
│
├── utils/
│   └── userData.ts
│
├── docs/
│   └── screenshots/
│       ├── test-execution.png
│       ├── playwright-report.png
│       └── allure-report.png
│
├── playwright.config.ts
├── package.json
├── .gitignore
└── README.md
```

### Framework Components

**Tests — `tests/`**

Contains the business-level test scenarios. Tests remain readable and do not contain UI selectors, Page Object construction, or filesystem implementation logic.

**Page Objects — `pages/`**

Contains page-specific locators and reusable actions.

- `BasePage.ts` — common navigation and consent-dialog handling
- `LoginPage.ts` — login, logout and related verification
- `RegisterPage.ts` — registration actions and account-creation verification

**Fixtures — `fixtures/`**

`test.fixture.ts` creates and provides Page Object instances to tests using Playwright fixtures.

**Utilities — `utils/`**

`userData.ts` handles reading and writing dynamically generated user credentials.

**Test Data — `test-data/`**

Contains reusable registration data and generated user credentials.

**Configuration — `config/`**

`environment.ts` contains environment-specific application configuration.

---

# Prerequisites

Before executing the tests, install:

- Node.js
- npm
- Git

Versions can be checked using:

```bash
node --version
npm --version
git --version
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd automation-exercise
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Install Playwright Browsers

```bash
npx playwright install
```

For environments requiring browser system dependencies:

```bash
npx playwright install --with-deps
```

---

# Test Execution

The framework provides npm scripts for common execution options.

## Default Test Execution

```bash
npm test
```

Runs the default test suite in Chrome.

## Chrome

```bash
npm run test:chrome
```
![!\[img.png\](img.png)](docs/screenshots/execution_chrome.png)

## Firefox

```bash
npm run test:firefox
```

## WebKit

```bash
npm run test:webkit
```

## All Configured Browsers

```bash
npm run test:all
```

## Headed Execution

To observe the browser during execution:

```bash
npm run test:headed
```

## Smoke Tests

The logout scenario is currently tagged with `@smoke`.

Execute smoke tests using:

```bash
npm run test:smoke
```

---

## Available Commands

| Command | Description |
|---|---|
| `npm test` | Run the default Chrome test suite |
| `npm run test:chrome` | Run tests in Chrome |
| `npm run test:firefox` | Run tests in Firefox |
| `npm run test:webkit` | Run tests in WebKit |
| `npm run test:all` | Run tests across all configured browsers |
| `npm run test:headed` | Run Chrome tests in headed mode |
| `npm run test:smoke` | Run tests tagged with `@smoke` |
| `npm run report` | Open Playwright HTML report |
| `npm run allure:generate` | Generate the Allure HTML report |
| `npm run allure:open` | Open the generated Allure report |

---

# Environment Configuration

Environment configuration is maintained in:

```text
config/environment.ts
```

The framework currently supports:

- QA
- UAT

QA is the default environment.

Example:

```ts
export const environments = {
  QA: {
    baseURL: "https://automationexercise.com/"
  },

  UAT: {
    baseURL: "https://uat.example.com"
  }
};
```

### Git Bash / Linux / macOS

```bash
ENVIRONMENT=QA npm test
```

### PowerShell

```powershell
$env:ENVIRONMENT="QA"
npm test
```

If `ENVIRONMENT` is not provided, the framework defaults to QA.

> The current UAT URL is a placeholder and should be replaced with a valid application URL when available.

---

# Test Data Management

Registration data is stored in:

```text
test-data/registerData.json
```

A unique email address is dynamically generated during registration to avoid conflicts with existing users.

The generated credentials are stored in:

```text
test-data/generatedUser.json
```

Reading and writing this data is handled by:

```text
utils/userData.ts
```

This keeps filesystem operations separate from test implementation.

---

# Locator Strategy

Page selectors are maintained inside Page Objects rather than test files.

The preferred locator order is:

1. Accessible locators such as `getByRole()` or `getByLabel()`
2. Stable automation attributes such as `data-qa`
3. Stable visible text
4. Stable element IDs
5. CSS selectors where necessary
6. XPath only when a more maintainable option is unavailable

Example:

```ts
this.emailInput = page.locator('[data-qa="login-email"]');
this.passwordInput = page.locator('[data-qa="login-password"]');
this.loginButton = page.locator('[data-qa="login-button"]');
```

This allows selector changes to be maintained within Page Objects without modifying the business-level tests.

---

# Reporting

The framework supports both **Playwright HTML** and **Allure** reporting.

## Playwright HTML Report

Run the tests:

```bash
npm run test:chrome
```

Open the Playwright HTML report:

```bash
npm run report
```

The report provides:

- Test status
- Execution duration
- Browser/project information
- Failure details
- Test attachments
- Trace information when configured

---

## Allure Report

After test execution, generate the Allure report:

```bash
npm run allure:generate
```

Open the generated report:

```bash
npm run allure:open
```

Allure provides an additional visual view of:

- Overall execution status
- Passed and failed tests
- Test suites
- Execution duration
- Historical/report information where available

---

# Execution Evidence

The following screenshots demonstrate successful execution and reporting.
![!\[img_2.png\](img_2.png)](docs/screenshots/allure_report.png)


## 1. Successful Test Execution

The following example shows the complete Chrome suite executing successfully.

```bash
npm run test:chrome
```

<!--
SCREENSHOT LOCATION:
docs/screenshots/test-execution.png

Capture:
Terminal showing:
Running 3 tests using 1 worker
3 passed
-->

![Successful Test Execution](docs/screenshots/test-execution.png)

---

## 2. Playwright HTML Report

The Playwright HTML report provides detailed results for the automated scenarios.

```bash
npm run report
```

<!--
SCREENSHOT LOCATION:
docs/screenshots/playwright-report.png

Capture:
Playwright HTML report showing the successful
Register, Login and Logout tests.
-->

![Playwright HTML Report](docs/screenshots/playwright-report.png)

---

## 3. Allure Report

The Allure report provides an additional visual overview of the automation execution.

```bash
npm run allure:generate
npm run allure:open
```

<!--
SCREENSHOT LOCATION:
docs/screenshots/allure-report.png

Capture:
Allure Overview page showing successful execution.
Try to include the Passed percentage and test-suite summary.
-->

![Allure Report](docs/screenshots/allure-report.png)

---

# Example Test

Tests are kept at the business-flow level:

```ts
test("Login with the registered account", async ({ loginPage }) => {
  const generatedUser = await getGeneratedUser();

  await loginPage.navigateTo();
  await loginPage.navigateToLogin();

  await loginPage.loginToAccount(
    generatedUser.email,
    generatedUser.password
  );

  await loginPage.verifyLoggedInAs(registerData.name);
});
```

The test does not contain:

- UI selectors
- Direct Page Object construction
- Filesystem implementation
- Environment URLs

These responsibilities are delegated to the appropriate framework layers.

---

# Failure Investigation

Playwright provides trace and error information to assist with failed-test investigation.

A trace can be opened using:

```bash
npx playwright show-trace <path-to-trace.zip>
```

For example:

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

This can provide browser actions, DOM snapshots, network activity and execution details for debugging.

---

# Design Decisions

### Page Object Model

Selectors and reusable page interactions are encapsulated within Page Objects to reduce duplication and improve maintainability.

### Playwright Fixtures

Page Objects are supplied through Playwright fixtures instead of being manually instantiated within every test.

### Externalised Test Data

Reusable registration information is stored separately from test implementation.

### User Data Utility

Generated-user persistence is handled through a dedicated utility rather than direct filesystem operations inside test scenarios.

### Centralised Common Behaviour

Common functionality such as application navigation and optional consent-dialog handling is maintained in `BasePage`.

### Lightweight Architecture

The framework intentionally avoids unnecessary abstraction for the current test scope.

Additional components or service layers can be introduced as the framework grows and when they provide clear value.

---

# Cross-Browser Support

The framework supports execution against multiple Playwright browser projects.

```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

To execute all configured browser projects:

```bash
npm run test:all
```
![!\[img_1.png\](img_1.png)](docs/screenshots/execution_all.png)

---

# CI/CD

The same npm commands used locally can be executed from a CI/CD pipeline.

A typical workflow is:

```text
Checkout Repository
        ↓
Install Node.js
        ↓
Install Dependencies
        ↓
Install Playwright Browsers
        ↓
Execute Automated Tests
        ↓
Generate Test Reports
        ↓
Publish Test Results
```

This ensures local and CI execution use consistent commands.

---

# Summary

This framework demonstrates a maintainable Playwright automation solution using:

- TypeScript
- Page Object Model
- Playwright fixtures
- Centralised locator management
- Externalised test data
- Environment configuration
- Dynamic user generation
- Smoke tagging
- Cross-browser execution
- Playwright HTML reporting
- Allure reporting

The framework is intentionally lightweight while remaining structured and extensible.