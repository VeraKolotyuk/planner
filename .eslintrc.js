module.exports = {
    globals: {
        'React': true,
        'PropTypes': true
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        'jest': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['warn', 'single'],
        semi: ['error', 'always'],
        'react/prop-types': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
};
