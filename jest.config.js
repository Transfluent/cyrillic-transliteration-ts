module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  testEnvironment: "node",
  maxWorkers: "50%",
  preset: "ts-jest",
  coverageProvider: "v8",
};
