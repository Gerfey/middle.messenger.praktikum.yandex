// eslint-disable-next-line no-undef
module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'yandex',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'html',
        '@typescript-eslint',
    ],
    'rules': {
        'no-allowIndentationTabs-escape': 0,
        'no-useless-escape': 'off',
        'no-shadow': 'off',
        'max-len': 'off',
        'eqeqeq': 'off',
        'linebreak-style': ['error', 'windows'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.ts'],
                'moduleDirectory': ['node_modules', 'src'],
            }
        }
    }
};
