module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  plugins: ['vue', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // -- vue essential
    'vue/no-deprecated-slot-attribute': 'off', // - clashes with ionic slots

    // -- vue strongly recommended
    'vue/component-definition-name-casing': ['warn', 'PascalCase'], // - match component file name
    'vue/no-multi-spaces': 'warn', // - readability
    'vue/no-spaces-around-equal-signs-in-attribute': 'warn', // - readability
    'vue/no-template-shadow': 'warn', // - prevent variable shadowing in v-for
    'vue/one-component-per-file': 'error',
    'vue/prop-name-casing': 'error', // - enforce proper casing (camelCase)
    'vue/require-prop-types': 'warn', // - props should at least have a type
    'vue/v-bind-style': ['warn', 'shorthand'], // - use :name over v-bind:name
    'vue/v-on-style': ['warn', 'shorthand'], // - use @name over v-on:name
    'vue/require-explicit-emits': 'warn', // - provides self documenting code

    // -- vue recommended
    'vue/attributes-order': 'warn', // - readability
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style:not([scoped])', 'style[scoped]']
      }
    ],
    'vue/no-lone-template': 'warn', // - prevent redundant templates
    'vue/no-v-html': 'error', // - reduce risk of XSS attacks
    'vue/order-in-components': 'error', // - readability
    'vue/this-in-template': 'error', // - readability

    // -- vue extension rules
    'vue/no-constant-condition': 'warn', // - prevent redundant conditions

    // -- typescript
    '@typescript-eslint/no-explicit-any': 'off',

    // -- eslint
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'warn', // - use variables with block scope over function scope
    'prefer-const': 'warn', // - better unchanging variable declaration
    indent: ['warn', 2, { SwitchCase: 1 }],
    eqeqeq: ['error', 'smart'], // - enforce '===',' unless special '== undefined | null' check
    'object-shorthand': ['warn', 'properties'] // - readability - shorter object declarations
  }
};
