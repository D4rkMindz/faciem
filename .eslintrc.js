module.exports = {
  root: true,
  env: {
    'browser': true,
    'node': true,
    'cypress/globals': true,
  },
  parserOptions: {
    'parser': 'babel-eslint',
  },
  plugins: [
    'cypress',
  ],
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:cypress/recommended'],
  // add your custom rules here
  rules: {
    'vue/require-component-is': 'off',
    'semi': [2, 'always'],
    'comma-dangle': [2, 'always-multiline'],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': true,
      },
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never',
    }],
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'always',
        'component': 'always',
      },
      'svg': 'always',
      'math': 'always',
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always',
    }],
  },
};
