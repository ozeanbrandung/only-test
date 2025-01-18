module.exports = {
  files: ["src/**/*.{js,jsx,ts,tsx}"],
  ignores: ["**/*.config.js", "!**/eslint.config.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  rules: {},
  env: {
    browser: true,
  },
};
