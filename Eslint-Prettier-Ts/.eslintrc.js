module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'tsdoc', 'prettier', 'jest', 'jest-formatting', 'etc'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
  ],
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: { order: 'asc' },
      },
    ],
    // Typescript
    // disable the rule for all files
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Airbnb naming convention settings with added filter for `_id` variable and selector for
    // enum member
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables
      // (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        filter: {
          regex: '_id',
          match: false,
        },
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make
      // TypeScript recommendations, we are assuming this rule would similarly apply to anything
      // "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
    ],
    // TS doc
    'tsdoc/syntax': 'warn',
    // Etc
    'etc/no-commented-out-code': 'warn',

    // Overall code style
    'max-len': [
      'error',
      {
        code: 140,
        comments: 140,
        tabWidth: 2,
      },
    ],
    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: `for..in loops iterate over the entire prototype chain, which is virtually never
          what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.`,
      },
      {
        selector: 'LabeledStatement',
        message: `Labels are a form of GOTO; using them makes code confusing and hard to maintain
          and understand.`,
      },
      {
        selector: 'WithStatement',
        message: `with statement is disallowed in strict mode because it makes code impossible to
          predict and optimize.`,
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'function-declaration',
            unnamedComponents: 'function-expression',
          },
        ],
      },
    },
    {
      files: ['src/store/**/*Slice.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, //
      },
    },
  },
};

// Jest
// {
//   files: ['*.spec.ts', 'jest.config.js'],
//   rules: {
//     'jest/expect-expect': 'off',
//     'max-len': 'off',
//   },
// },