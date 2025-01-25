/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  importOrder: [
    "react",
    "<THIRD_PARTY_MODULES>",
    "^@/app/(.*)$",
    "^@/modules/types/(.*)$",
    "^@/modules/hooks/(.*)$",
    "^@/modules/ui/(.*)$",
    "^@/shared/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
};

export default config;
