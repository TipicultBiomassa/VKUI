const config = require('./jest.config.js');

module.exports = {
  ...config,
  displayName: 'a11y',
  testMatch: ['**/*.a11y.test.{ts,tsx}'],
  collectCoverageFrom: ['src/components/**/**.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '\\.d\\.ts$',
    'types\\.ts$',
    'use*.+\\.tsx$',
    'test\\.tsx$',
    'e2e\\.tsx$',
    'icons\\.tsx',
  ],
};
