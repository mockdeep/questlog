import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import fp from 'eslint-plugin-fp';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import globals from 'globals';

import todoConfigs from './.eslint_todo.mjs';

export default [
  //////////////////////////////////////////////////////////////////////////////
  //
  // Global ignores
  //
  //////////////////////////////////////////////////////////////////////////////

  {
    ignores: [
      'app/assets/builds/**',
      'node_modules/**',
      'coverage/**',
      'public/**',
      'vendor/**',
      'eslint.config.mjs',
      '.eslint_todo.mjs',
    ],
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  // Base configs
  //
  //////////////////////////////////////////////////////////////////////////////

  js.configs.all,
  jsxA11y.flatConfigs.recommended,
  { plugins: { fp }, rules: fp.configs.recommended.rules },
  react.configs.flat.all,
  ...tsPlugin.configs['flat/all'],

  //////////////////////////////////////////////////////////////////////////////
  //
  // Language options, globals, and settings
  //
  //////////////////////////////////////////////////////////////////////////////

  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2018,
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2015,
        ...globals.node,
        $: 'readonly',
      },
    },
    settings: {
      react: { version: '16.0' },
    },
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  // Custom rules
  //
  //////////////////////////////////////////////////////////////////////////////

  {
    rules: {
      // Rules that depart from eslint defaults
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      camelcase: ['error', { allow: ['^UNSAFE_'] }],
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
      'func-style': ['error', 'declaration'],
      'id-length': ['error', { exceptions: ['_', '$'] }],
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'prefer-destructuring': ['error', { array: false }],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-indent': ['error', 2],
      'react/jsx-wrap-multilines': ['error', { declaration: false }],

      // Wishlist rules (inlined)
      'no-use-before-define': ['error', 'nofunc'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Rules we might want to enable
      'react/prop-types': 'off',

      // Rules we don't want to enable
      '@typescript-eslint/class-methods-use-this': 'off',
      'capitalized-comments': 'off',
      'no-inline-comments': 'off',
      'no-prototype-builtins': 'off',
      'no-ternary': 'off',
      'no-undefined': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-handler-names': 'off',
      'react/jsx-max-props-per-line': 'off',
      'react/jsx-newline': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/prefer-read-only-props': 'off',
    },
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  // Test files override
  //
  //////////////////////////////////////////////////////////////////////////////

  {
    files: ['spec/javascript/**/*.{js,jsx,ts,tsx}'],
    plugins: { jest },
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
      'jest/no-disabled-tests': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'max-statements': ['error', { max: 20 }],
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  // Type declaration override
  //
  //////////////////////////////////////////////////////////////////////////////

  {
    files: ['app/javascript/@types/**/*.{ts,d.ts}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },

  //////////////////////////////////////////////////////////////////////////////
  //
  // Todo overrides
  //
  //////////////////////////////////////////////////////////////////////////////

  ...todoConfigs,
];
