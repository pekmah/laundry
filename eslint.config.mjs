import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Import @typescript-eslint plugin
import tsParser from "@typescript-eslint/parser"; // Import @typescript-eslint parser
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser, // Use @typescript-eslint parser
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint, // Add @typescript-eslint plugin
    },
    extends: [
      "js/recommended",
      tseslint.configs.recommended, // Extend @typescript-eslint recommended rules
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^React$" }, // Ignore unused React imports
      ],
      "@typescript-eslint/no-explicit-any": "warn", // Enable no-explicit-any rule
    },
  },
]);
