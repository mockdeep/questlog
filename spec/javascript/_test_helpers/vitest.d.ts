import type {
  ExpectStatic,
  vi as Vi,
} from "vitest";

import "@testing-library/jest-dom/vitest";

declare global {
  const vi: typeof Vi;
  const expect: ExpectStatic;
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => Promise<void>): void;
  function it(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function afterEach(fn: () => void): void;
  function beforeAll(fn: () => void): void;
  function afterAll(fn: () => void): void;
}
