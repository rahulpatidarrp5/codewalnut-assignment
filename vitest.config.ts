import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // To enable global test functions like expect
    environment: 'jsdom', // To simulate the DOM in tests (important for React)
    setupFiles: './vitest.setup.ts', // Setup file for Jest-DOM matchers
  },
});