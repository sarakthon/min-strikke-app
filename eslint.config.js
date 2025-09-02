import { default as defaultConfig } from "@epic-web/config/eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  ...defaultConfig,
  // add custom config objects here:
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    rules: {
      "import/consistent-type-specifier-style": ["off"],
    },
  },
  {
    ignores: [".react-router/*"],
  },
];
