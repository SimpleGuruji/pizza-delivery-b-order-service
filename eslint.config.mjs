import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": "off", // core JS rule
      "@typescript-eslint/no-unused-vars": "off", // TS rule
    },
    ignores: [
      "dist",
      "node_modules",
      "eslint.config.mjs",
      "jest.config.js",
      "generateScripts.mjs",
      "scripts/generateScripts.mjs",
      "scripts/convertPemToJwk.mjs",
      "tests",
      "*.spec.ts",
      "coverage",
    ],
  },
];
