import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  clearMocks: true,
  restoreMocks: true,
};
export default config;
