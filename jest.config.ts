// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1", // Adjust for your file paths if you use alias imports
  },
};
