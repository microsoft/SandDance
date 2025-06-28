import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([{
    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended'),

    plugins: {
        react,
        '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.mocha,
            ...globals.node,
            Atomics: 'readonly',
            SharedArrayBuffer: 'readonly',
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: 'module',

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'no-inner-declarations': ['off'],
        'no-mixed-spaces-and-tabs': ['off'],
        'no-prototype-builtins': ['off'],

        'indent': ['error', 4, {
            SwitchCase: 1,
        }],

        'no-unused-vars': ['off'],
        'prefer-spread': ['off'],
        'quote-props': ['error', 'consistent-as-needed'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
    },
}]);