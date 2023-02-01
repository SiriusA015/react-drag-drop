module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    '<rootDir>/tests',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'lcov',
    'cobertura',
  ],
  forceCoverageMatch: ['<rootDir>/src'],
  setupFilesAfterEnv: [
  ],
  testTimeout: 20000,
};
