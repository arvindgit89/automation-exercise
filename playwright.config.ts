import { defineConfig , devices} from "@playwright/test";
import { envConfig } from "./config/environment";

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,

  fullyParallel: true,

  forbidOnly:false,

  retries:0,

  workers:4,

  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
  {
    name: 'chrome',
    use: { ...devices['Desktop Chrome'] },
  },

  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },

  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
],
});