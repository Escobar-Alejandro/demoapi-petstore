import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(

    eslint.configs.recommended,
    {
        // Note: there should be no other properties in this object
        ignores: ['playwright-report', 'playwright', 'node-modules', 'test-results']
    },
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**'],
    },
    {
        files: ['tests/**'],
        rules: {
            // Customize Playwright rules
            'playwright/no-conditional-expect': 'off',
            'playwright/no-conditional-in-test': 'off',
            'playwright/no-skipped-test': 'off',
            'playwright/no-networkidle': 'off',
            'playwright/expect-expect': 'off',
            'playwright/no-nested-step': 'off'
        },
    },
    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
            '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
            '@stylistic/brace-style': ['error', '1tbs'],
            '@stylistic/comma-dangle': ['error', 'only-multiline'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/comma-spacing': ['error'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/no-trailing-spaces': ['error'],
            '@stylistic/no-multi-spaces': ['error'],
            'no-empty-pattern': ['error', { allowObjectPatternsAsParameters: true }]
        }
    },
    {
        files: ['/page-objects//*.ts'],
        rules: {
            '@stylistic/brace-style': 'off'
        }
    }
);