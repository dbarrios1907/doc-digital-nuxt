module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: [
    // add more generic rulesets here, such as:
    // 'plugin:vue/essential',
    // 'prettier',
    'plugin:prettier/recommended',
    // 'airbnb',
    'eslint:recommended',
    'plugin:vue/recommended', // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'consistent-return': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-classes-per-file': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',

    // turns off two ESLint core rules that unfortunately are problematic with prettier plugin
    'prefer-arrow-callback': 'off',
    'arrow-body-style': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 150,
        tabWidth: 2,
        bracketSpacing: true,
        trailingComma: 'es5',
        semi: false,
        useTabs: false,
        arrowParens: 'avoid',
      },
    ],

    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
    // allow paren-less arrow functions
    'arrow-parens': ['error', 'as-needed'],
    // set maximum line characters
    'max-len': [
      'error',
      150,
      4,
      {
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'max-statements': ['error', 24],
    // 'comma-dangle': ['error', 'always'],

    'no-return-assign': 'off',
    'no-empty': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'no-return-await': 'warn',
    'object-shorthand': ['error', 'always'],
    'no-extra-semi': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true,
      },
    ],
    'no-prototype-builtins': 'off',
    'no-void': 'off',
    'no-case-declarations': 'off',

    // Not in override, these apply to non-.vue files too
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/one-component-per-file': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/max-len': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
}
