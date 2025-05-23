module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "projects/**/src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/dist/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  reporters: ["default", "jest-sonar-reporter"],
  roots: ["<rootDir>/projects"],
};
