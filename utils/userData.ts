import { readFile, writeFile } from "fs/promises";
import path from "path";

export type GeneratedUser = {
  email: string;
  password: string;
};

const generatedUserPath = path.resolve(
  process.cwd(),
  "test-data",
  "generatedUser.json"
);

export async function getGeneratedUser(): Promise<GeneratedUser> {
  const data = await readFile(generatedUserPath, "utf8");

  return JSON.parse(data) as GeneratedUser;
}

export async function saveGeneratedUser(
  user: GeneratedUser
): Promise<void> {
  await writeFile(
    generatedUserPath,
    JSON.stringify(user, null, 2),
    "utf8"
  );
}