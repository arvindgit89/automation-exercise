import { test } from "../fixtures/test.fixture";
import registerData from "../test-data/registerData.json";
import { getGeneratedUser } from "../utils/userData";

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