import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // 'no-unused-vars': 'error',
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

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
