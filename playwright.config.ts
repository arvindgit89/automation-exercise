import { defineConfig , devices} from "@playwright/test";
import { envConfig } from "./config/environment";

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly:false,

  retries:0,

  workers:4,

  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  use: {
     trace: 'on',
     headless: false,
     baseURL: envConfig.baseURL,
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