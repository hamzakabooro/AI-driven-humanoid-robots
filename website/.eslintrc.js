module.exports = {
  root: true,
  extends: [
    '@docusaurus',
    'plugin:markdown/recommended',
  ],
  plugins: [
    'markdown',
  ],
  rules: {
    // Add custom rules for documentation validation
    'no-console': 'off', // Allow console logs in documentation
    'no-unused-vars': 'warn', // Warn about unused variables instead of error
  },
  overrides: [
    {
      files: ['**/*.md'],
      rules: {
        // Specific rules for markdown files
        'no-undef': 'off', // Allow references to global variables in markdown
        'no-unused-vars': 'off', // Allow unused variables in markdown
      },
    },
  ],
};