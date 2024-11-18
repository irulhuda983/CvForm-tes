/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // testMatch: ['**/**/*.test.ts'],
  testMatch: [
    '**/**/profile.test.ts',
    '**/**/photo.test.ts',
    '**/**/workingExperience.test.ts',
    '**/**/employment.test.ts',
    '**/**/education.test.ts',
    '**/**/skill.test.ts',
  ],
  verbose: true,
  forceExit: true,
};