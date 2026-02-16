import {defineConfig} from "vitest/config";
import path from "node:path";

const root = __dirname;

function appPath(subpath: string): string {
  return `${path.resolve(root, "app/javascript", subpath)}/`;
}

export default defineConfig({
  resolve: {
    alias: [
      {find: /^_test_helpers\//u, replacement: `${path.resolve(root, "spec/javascript/_test_helpers")}/`},
      {find: /^channels\//u, replacement: appPath("channels")},
      {find: /^controllers\//u, replacement: appPath("controllers")},
      {find: /^helpers\//u, replacement: appPath("helpers")},
      {find: /^helpers$/u, replacement: `${path.resolve(root, "app/javascript/helpers/index.ts")}`},
      {find: /^javascript\//u, replacement: appPath("")},
      {find: /^packs\//u, replacement: appPath("packs")},
      {find: /^spec\//u, replacement: `${path.resolve(root, "spec")}/`},
      {find: /^src\//u, replacement: appPath("src")},
    ],
  },
  test: {
    coverage: {
      exclude: ["app/javascript/@types/**"],
      include: ["app/javascript/**/*.ts"],
      provider: "v8",
      reportsDirectory: "coverage/vitest",
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 0,
        statements: 0,
      },
    },
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: "http://test.host",
      },
    },
    include: ["spec/javascript/**/*_spec.ts"],
    outputFile: {
      junit: "/tmp/test-results/junit.xml",
    },
    reporters: ["default", "junit"],
    restoreMocks: true,
    root: ".",
    setupFiles: ["spec/javascript/setup.ts"],
  },
});
