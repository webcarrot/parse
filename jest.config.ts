import type { JestConfigWithTsJest } from "ts-jest";

const configuration: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  // collectCoverage: true,
  detectOpenHandles: true,
  collectCoverageFrom: ["src/**/*.ts"],
  testTimeout: 5 * 1000,
};

export default configuration;
