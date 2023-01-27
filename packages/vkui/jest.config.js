const path = require('path');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(`${__dirname}/package.swcrc`, 'utf-8'));
config.exclude = [];

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { ...config }],
  },
  displayName: 'unit',
  roots: [path.join(__dirname, 'src')],
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.js')],
  collectCoverage: true,
  collectCoverageFrom: ['src/*/**/{!(*.e2e),}.{ts,tsx}'],
  coveragePathIgnorePatterns: ['\\.d\\.ts$', 'src/types', 'src/testing'],
};
