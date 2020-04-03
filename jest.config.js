module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testRegex: "\\.test\\.ts$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: "TS151001",
        pathRegex: /\.test\.ts$/
      }
    }
  }
};
