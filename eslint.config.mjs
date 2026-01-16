import { defineConfig, globalIgnores } from 'eslint/config';

import path from 'path';
import { fileURLToPath } from 'url';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import react from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalIgnore = [
  '.next/**',
  '**/.cache/**',
  'out/**',
  'build/**',
  'next-env.d.ts',
  'components/ui/**',
  'playwright-ct-report/**',
  'playwright-report/**'
]

const reactRules = {
  'react/jsx-key': 'error',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
}

const stylisticRules = {
  'jsx-quotes': ['error', 'prefer-single'],
  '@stylistic/arrow-parens': ['error', 'as-needed'],
  '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
  '@stylistic/max-statements-per-line': ['error', { max: 1 }],
  '@stylistic/no-compare-neg-zero': ['off'],
  '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  '@stylistic/object-curly-spacing': [
    'error',
    'always',
    { arraysInObjects: true, objectsInObjects: true },
  ],
  '@stylistic/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: 'return' },
    { blankLine: 'always', prev: ['const', 'let'], next: '*' },
    { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
    { blankLine: 'always', prev: 'multiline-expression', next: 'multiline-expression' },
  ],
  '@stylistic/prefer-const': ['off'],
  '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always' }],
  '@stylistic/space-before-blocks': [
    'error',
    { functions: 'always', keywords: 'always', classes: 'always' },
  ],
  '@stylistic/space-before-function-paren': [
    'error',
    { named: 'never', anonymous: 'always', asyncArrow: 'always' },
  ],
  '@stylistic/space-infix-ops': ['error'],
  '@stylistic/space-unary-ops': [2, { words: true, nonwords: false }],
};

const tsRules = {
  'no-unused-vars': 'off',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
      'varsIgnorePattern': '^[A-Z]'
    }
  ],
  '@typescript-eslint/restrict-template-expressions': 'error',
  '@stylistic/semi': ['error', 'never'],
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([...globalIgnore]),
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs','**/*.cjs'],
    plugins: {
      '@stylistic': stylistic,
      react,
    },
    rules: {
      ...stylisticRules,
      ...reactRules,
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      },
    },
    plugins: {
      react,
      '@stylistic': stylistic,
      tseslint,
    },
    rules: {
      ...stylisticRules,
      ...tsRules,
      ...reactRules,
    }
  }
]);

export default eslintConfig;
