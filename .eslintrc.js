module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: [
    'svelte3'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // have an issue with svelte
    // https://github.com/sveltejs/eslint-plugin-svelte3/issues/41
    'no-multiple-empty-lines': 'off'
  }
}
