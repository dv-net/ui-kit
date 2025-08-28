import pluginJs from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
export default [
  { ignores: ["dist/", "storybook-static/"] },
  {
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^.+\\.vue$"], ["^@?\\w"], ["^\\."], ["^"]]
        }
      ]
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends"
        }
      ],
      "@typescript-eslint/no-explicit-any": [
        "off",
        {
          fixToUnknown: true,
          ignoreRestArgs: true
        }
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } }
];
