module.exports = {
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    moduleNameMapper: {
      "@config": ["<rootDir>/config"],
      "@modules": ["<rootDir>/modules"],
      "@decorators": ["<rootDir>/decorators"],
      "@filters": ["<rootDir>/filters"],
      "@guards": ["<rootDir>/guards"]
    },
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node"
}