import path from 'path';

import {defineConfig} from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'app/javascript/src'),
      '_test_helpers': path.resolve(__dirname, 'spec/javascript/_test_helpers'),
      'controllers': path.resolve(__dirname, 'app/javascript/controllers'),
      'javascript': path.resolve(__dirname, 'app/javascript'),
      'packs': path.resolve(__dirname, 'app/javascript/packs'),
      'dnd-core': 'dnd-core/dist/cjs',
      'react-dnd': 'react-dnd/dist/cjs',
      'react-dnd-html5-backend': 'react-dnd-html5-backend/dist/cjs',
    },
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://test.host',
      },
    },
    globals: true,
    include: ['spec/javascript/**/*_spec.{ts,tsx}'],
    setupFiles: ['spec/javascript/test_helper.ts'],
    coverage: {
      provider: 'v8',
      include: ['app/javascript/**/*.{js,ts,tsx}'],
      exclude: ['**/*.d.ts'],
      reporter: ['json', 'lcov'],
      thresholds: {
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    pool: 'vmForks',
    maxWorkers: 2,
    deps: {
      moduleDirectories: ['node_modules', 'vendor/assets/javascripts'],
    },
  },
});
