import { test } from "../fixtures/test.fixture";
import registerData from "../test-data/registerData.json";
import { saveGeneratedUser } from "../utils/userData";

test("Register a new account", async ({ registerPage }) => {
  const email =
    `arvind${Date.now()}${Math.random().toString(36).slice(2)}@gmail.com`;

  await registerPage.navigateTo();
  await registerPage.navigateToLogin();

  await registerPage.startRegistration(
    registerData.name,
    email
  );

  await registerPage.completeRegistration(registerData);
  await registerPage.verifyAccountCreated();

  await saveGeneratedUser({
    email,
    password: registerData.password,
  });
});