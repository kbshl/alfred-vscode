module.exports = {
  'extends': [
    'airbnb-base',
    'plugin:security/recommended',
  ],
  'plugins': [
    'security',
    'json',
  ],
  'env': {
    browser: false,
    es6: true,
    commonjs: true,
    jquery: false,
    node: true
  },
  'settings': {
    'import/external-module-folders': ['node_modules', 'modules'],
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.json'],
      }
    },
    'import/extensions': [
      '.js',
    ],
  },
  'globals': {},
  'rules': {
    // Custom rules
    'padded-blocks': 0,
    'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: 'never',
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],
  },
};
