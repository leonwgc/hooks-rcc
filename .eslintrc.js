module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  globals: {
    __client__: true,
    __production__: true,
    __dev__: true,
    __env__: true,
    iHealthBridge: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/prop-types': 0,
    'arrow-body-style': [0, 'as-needed'],
    'class-methods-use-this': 0,
    'import/imports-first': 0,
    'no-unused-vars': 0,
    'no-undef': 2,
    'no-prototype-builtins': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 2,
    'no-use-before-define': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
    'no-empty': 0,
  },
};
