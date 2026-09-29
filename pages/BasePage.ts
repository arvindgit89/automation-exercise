import { Page, expect } from "@playwright/test";
import { envConfig } from "../config/environment";

export class BasePage {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async navigateTo() {
    await this.page.goto(envConfig.baseURL);
  }
  async getPageTitle() {
    return this.page.title();
  }
}
