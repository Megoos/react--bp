module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__tests__/transform/fileTransform.js',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: '/__tests__/.*\\.test.(ts|tsx)$',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__tests__/__mocks__/styleMock.ts',
    '^src(.*)$': '<rootDir>/src/$1',
  },
};
