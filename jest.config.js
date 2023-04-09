/** @type {import('ts-jest').JestConfigWithTsJest} */
/*
*/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@jumploops/magic$": "/usr/local/lib/node_modules/@jumploops/magic"
  },
  testTimeout: 15000,
  testPathIgnorePatterns: [
    '/node_modules/', // ignore tests in the "node_modules" folder
    '/dist/', // ignore tests in the specified folder
  ],
};
