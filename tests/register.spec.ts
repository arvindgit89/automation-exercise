import { test, expect } from "@playwright/test";
import { writeFile } from "fs/promises";
import path from "path";
import { signupPage } from "../pages/RegisterPage";
import registerData from "../test-data/registerData.json";

test("Register a new account ", async ({ page }) => {
    const email = `arvind${Date.now()}${Math.random().toString(36).slice(2)}@gmail.com`;
    const signuppage = new signupPage(page);

    await signuppage.navigateTo();
    await page.locator('a[href="/login"]').click();
    await signuppage.newUserRegistration(email);
    await signuppage.completeRegistration();
    await expect(page.locator('[data-qa="account-created"]')).toContainText(/Account Created!/i);

    const generatedUser = {
        email,
        password: registerData.password,
    };
    const generatedUserPath = path.resolve(process.cwd(), "test-data", "generatedUser.json");
    await writeFile(generatedUserPath, JSON.stringify(generatedUser, null, 2), "utf8");
});
