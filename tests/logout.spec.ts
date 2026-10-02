import { test } from "../fixtures/test.fixture";
import registerData from "../test-data/registerData.json";
import { getGeneratedUser } from "../utils/userData";

test(
  "Logout from the registered account @smoke",
  async ({ loginPage }) => {
    const generatedUser = await getGeneratedUser();

    await loginPage.navigateTo();
    await loginPage.navigateToLogin();

    await loginPage.loginToAccount(
      generatedUser.email,
      generatedUser.password
    );

    await loginPage.verifyLoggedInAs(registerData.name);

    await loginPage.logoutFromAccount();
    await loginPage.verifyLoggedOut();
  }
);