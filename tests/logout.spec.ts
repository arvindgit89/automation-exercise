import { test, expect } from "@playwright/test";
import { readFile } from "fs/promises";
import path from "path";
import { loginPage } from "../pages/LoginPage";
import registerData from "../test-data/registerData.json";

type GeneratedUser = {
    email: string;
    password: string;
};

test("Logout from the registered account @smoke", async ({ page }) => {
    const generatedUserPath = path.resolve(process.cwd(), "test-data", "generatedUser.json");
    const generatedUser = JSON.parse(await readFile(generatedUserPath, "utf8")) as GeneratedUser;
    const loginpage = new loginPage(page);
    const loggedInAs = page.getByText(`Logged in as ${registerData.name}`);

    await loginpage.navigateTo();
    await page.locator('a[href="/login"]').click();
    await loginpage.loginToAccount(generatedUser.email, generatedUser.password);
    await expect(loggedInAs).toBeVisible();

    await loginpage.logoutFromAccount();
    await expect(page.locator('a[href="/login"]')).toBeVisible();
    await expect(loggedInAs).toHaveCount(0);
});