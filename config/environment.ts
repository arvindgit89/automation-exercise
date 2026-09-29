export const environments = {
    QA: {
        baseURL: "https://automationexercise.com/"
    },

    UAT: {
        baseURL: "https://uat.example.com"
    }
};

const selectedEnvironment =
    (process.env.ENVIRONMENT || "QA").trim().toUpperCase();

if (!Object.prototype.hasOwnProperty.call(environments, selectedEnvironment)) {
    throw new Error(`Unsupported ENVIRONMENT "${selectedEnvironment}". Use "QA" or "UAT".`);
}

export const currentEnvironment =
    selectedEnvironment as keyof typeof environments;

export const envConfig =
    environments[currentEnvironment];