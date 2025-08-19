import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  globalIgnores(['html*', 'playwright-report', 'test-results', 'node_modules', 'allure-report']),
  {
    ...pluginJs.configs.recommended,
    ...playwright.configs['flat/recommended'],
    // ...tseslint.configs.recommended,
    files: ['**/*.ts', '**/*.mjs'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      playwright: playwright.configs['flat/recommended'].plugins.playwright,
      tseslint: tseslint,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'always'],
      '@stylistic/js/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      'no-unused-vars': 0,
      '@stylistic/js/indent': ['error', 2, { 'SwitchCase': 2 }],
      '@stylistic/js/space-in-parens': ['error', 'never'],
      'no-undef': 'warn'
    },
  },
]);