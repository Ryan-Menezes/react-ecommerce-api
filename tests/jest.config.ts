import setupJest from '../jest.config';

export default {
  ...setupJest,
  displayName: 'integration-tests',
  setupFilesAfterEnv: ['<rootDir>/tests/setup-jest-integration.ts'],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
};
