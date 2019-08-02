module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleNameMapper: {
    "@webcarrot/parse/(.*)": "<rootDir>/src/$1"
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
