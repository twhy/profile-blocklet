const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
