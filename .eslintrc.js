const path = require('path');

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    // "extends": "eslint:recommended",
    extends: 'airbnb/base',
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: path.resolve('webpack.config.dev5.js'),
            },
        },
    },
    globals: {
        $: true,
        CSS_ROOT_PATH: true,
        CSS_HASH: true,
        CSS_LAZY_LOAD_ENABLE: true,
        WEBPACK_MODE: true,
        BASE_PATH: true,
        PHP_SERVER_URL: true,
    },
    rules: {
        'no-console': 'off',
        'no-bitwise': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'no-useless-constructor': 'off',
        'no-unused-vars': 'warn',
        'class-methods-use-this': 'off',
        'no-plusplus': 'off',
        'max-classes-per-file': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-underscore-dangle': 'off',
        'max-len': 'off',
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'windows',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
    },
};
