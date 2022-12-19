// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */
const { EsLint, merge } = require('@snailicide/build-config')

module.exports = merge(EsLint.typeScriptOptions, {
    ignorePatterns: ['src/**/*.test.ts'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
    },
})
