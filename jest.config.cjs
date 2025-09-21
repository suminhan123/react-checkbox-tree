/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@hooks$": "<rootDir>/src/hooks",
    "^@Tree/(.*)$": "<rootDir>/src/Tree/$1",
    "^@Checkbox/(.*)$": "<rootDir>/src/Checkbox/$1",
    "^@InlineInput/(.*)$": "<rootDir>/src/InlineInput/$1",
    "^@App$": "<rootDir>/src/App.tsx",
    "^@dummy$": "<rootDir>/src/dummy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
    "^.+\\.(js|cjs|jsx)$": "babel-jest",
  },
};
